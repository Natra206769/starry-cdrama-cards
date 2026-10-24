/* storage.js — IndexedDB: thẻ tùy chỉnh, chỉnh sửa thẻ mẫu, ẩn/xóa; dựng lại kho thẻ

*/

// IndexedDB stores custom cards, modified built-in cards, visibility and deleted built-ins.
function openDatabase(){
  if(dbPromise)return dbPromise;
  dbPromise=new Promise((resolve,reject)=>{
    if(!( "indexedDB" in window)){reject(new Error("Trình duyệt không hỗ trợ IndexedDB"));return;}
    const request=indexedDB.open(DB_NAME,DB_VERSION);
    request.onupgradeneeded=()=>{const database=request.result;if(!database.objectStoreNames.contains(DB_STORE))database.createObjectStore(DB_STORE);};
    request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error||new Error("Không mở được cơ sở dữ liệu"));
  });return dbPromise;
}
async function dbGet(key){const database=await openDatabase();return new Promise((resolve,reject)=>{const request=database.transaction(DB_STORE,"readonly").objectStore(DB_STORE).get(key);request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);});}
async function dbPut(key,value){const database=await openDatabase();return new Promise((resolve,reject)=>{const tx=database.transaction(DB_STORE,"readwrite");tx.objectStore(DB_STORE).put(value,key);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error||new Error("Không thể lưu dữ liệu"));tx.onabort=()=>reject(tx.error||new Error("Đã hủy lưu dữ liệu"));});}
function normalizeManagerData(saved){
  const raw=saved&&typeof saved==="object"?saved:{};
  const overrides=raw.overrides&&typeof raw.overrides==="object"?Object.fromEntries(Object.entries(raw.overrides).map(([id,card])=>{const clean=normalizeSavedNameFields({...card});delete clean.costume;return [id,clean];})):{};
  const movieMetadata=raw.movieMetadata&&typeof raw.movieMetadata==="object"&&!Array.isArray(raw.movieMetadata)?raw.movieMetadata:{};
  const rawPreferences=raw.moviePreferences&&typeof raw.moviePreferences==="object"&&!Array.isArray(raw.moviePreferences)?raw.moviePreferences:{};
  const moviePreferences=Object.fromEntries(Object.entries(rawPreferences).map(([key,value])=>[String(key),{
    favorite:Boolean(value&&value.favorite),pinned:Boolean(value&&value.pinned),wantToCollect:Boolean(value&&value.wantToCollect)
  }]));
  const collectionPresets=Array.isArray(raw.collectionPresets)?raw.collectionPresets.filter(item=>item&&typeof item==="object"&&String(item.name||"").trim()&&item.settings&&typeof item.settings==="object").slice(0,50).map(item=>({
    id:String(item.id||""),name:String(item.name).trim().slice(0,60),settings:item.settings
  })):[];
  return {custom:Array.isArray(raw.custom)?raw.custom.map(card=>normalizeCard(card)):[],overrides,hidden:Array.isArray(raw.hidden)?raw.hidden:[],deleted:Array.isArray(raw.deleted)?raw.deleted:[],movieMetadata,moviePreferences,collectionPresets};
}
async function readManagerData(){
  try{
    const saved=await dbGet("managerData");
    if(!saved||typeof saved!=="object")return normalizeManagerData(saved);
    // Migrate only the three requested display-name fields. All other user data, including photos,
    // IDs, ownership, favorites, hidden/deleted flags and custom metadata, stays intact.
    const migrated=JSON.parse(JSON.stringify(saved));
    if(Array.isArray(migrated.custom))migrated.custom.forEach(normalizeSavedNameFields);
    if(migrated.overrides&&typeof migrated.overrides==="object")Object.values(migrated.overrides).forEach(normalizeSavedNameFields);
    const changed=JSON.stringify(migrated)!==JSON.stringify(saved);
    if(changed){
      try{await dbPut("managerData",migrated);}
      catch(migrationError){console.warn("Không thể lưu chuẩn hóa chữ hoa; sẽ dùng bản đã chuẩn hóa trong phiên này:",migrationError);}
    }
    return normalizeManagerData(migrated);
  }
  catch(error){console.warn("Không đọc được IndexedDB:",error);showToast("Không đọc được ảnh/hồ sơ đã lưu. Hãy mở bằng Chrome/Edge hoặc localhost.");return normalizeManagerData(null);}
}
async function persistManagerData(){
  try{await dbPut("managerData",managerData);return true;}
  catch(error){console.error(error);showToast("Không lưu được thẻ/ảnh. Hãy kiểm tra dung lượng trình duyệt.");return false;}
}
function rebuildCharacters(){
  characters=baseCharacters.filter(card=>!managerData.hidden.includes(card.id)&&!managerData.deleted.includes(card.id)).map(base=>normalizeCard({...base,...(managerData.overrides[base.id]||{})},base)).concat(managerData.custom.map(card=>normalizeCard(card)));
  const activeIds=new Set(characters.map(card=>card.id));let changed=false;
  for(const id of Object.keys(state.owned)){if(!activeIds.has(id)){delete state.owned[id];changed=true;}}
  const favoriteCount=state.favorites.length;state.favorites=state.favorites.filter(id=>activeIds.has(id));if(state.favorites.length!==favoriteCount)changed=true;
  if(changed)saveState();
  renderCollection();updateStats();renderManagerList();renderRarityOdds();
  if(typeof renderMovieMetadataManager==="function")renderMovieMetadataManager();
  for(const fieldId of Object.keys(AUTOCOMPLETE_CONFIG||{})){if($(fieldId)&&$(fieldId).value.trim())renderAutocomplete(fieldId);}
}
function getAnyCharacter(id){
  const custom=managerData.custom.find(card=>card.id===id);if(custom)return normalizeCard(custom);
  const base=baseCharacters.find(card=>card.id===id);return base?normalizeCard({...base,...(managerData.overrides[id]||{})},base):null;
}
