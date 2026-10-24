/* state.js — Biến trạng thái dùng chung, đọc/ghi localStorage, bộ hẹn giờ mở x10
   state = {owned, favorites, cardProgress}. Khóa localStorage nằm trong config.js.
*/

let state = loadState();
let activeFilter = "all";
let lastCharacter = null;
let lastBatchCards = [];
let managerData = {custom:[],overrides:{},hidden:[],deleted:[],movieMetadata:{},moviePreferences:{},collectionPresets:[]};
const UI_PREFERENCES_KEY = "starry-cdrama-ui-preferences-v1";
function normalizeUiPreferences(value){
  const raw=value&&typeof value==="object"?value:{};
  const themes=["classic","rose","ocean","jade","violet"];
  return {theme:themes.includes(raw.theme)?raw.theme:"classic",density:raw.density==="compact"?"compact":"comfortable"};
}
function readUiPreferences(){
  try{return normalizeUiPreferences(JSON.parse(localStorage.getItem(UI_PREFERENCES_KEY)||"{}"));}
  catch(error){console.warn("Không đọc được tùy chỉnh giao diện:",error);return normalizeUiPreferences(null);}
}
let uiPreferences = readUiPreferences();
function persistUiPreferences(){
  try{localStorage.setItem(UI_PREFERENCES_KEY,JSON.stringify(normalizeUiPreferences(uiPreferences)));return true;}
  catch(error){console.warn("Không thể lưu tùy chỉnh giao diện:",error);return false;}
}
let pendingPhotoData = null;
let editingId = null;
let cachedEditPhoto = null;
let dbPromise = null;
let currentDetailId = null;
let currentUpgradeId = null;
let upgradeAttemptInProgress = false;
let upgradeAnimationTimer = null;
let toastTimer;
let batchTimerIds = [];
let skipBatchFlow = null;
const $ = id => document.getElementById(id);

function loadState(){
  try {
    const parsed=JSON.parse(localStorage.getItem(STORAGE_KEY));
    if(parsed&&typeof parsed==="object")return {
      owned:parsed.owned&&typeof parsed.owned==="object"?parsed.owned:{},
      favorites:Array.isArray(parsed.favorites)?parsed.favorites:[],
      cardProgress:parsed.cardProgress&&typeof parsed.cardProgress==="object"?parsed.cardProgress:{}
    };
  } catch(error){console.warn("Không thể đọc bộ sưu tập đã lưu:",error);}
  return {owned:{},favorites:[],cardProgress:{}};
}
function genderLabel(gender){return gender==="male"?"Nam":gender==="female"?"Nữ":"Khác / nhóm";}
function saveState(){
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}
  catch(error){showToast("Không thể lưu dữ liệu. Hãy kiểm tra dung lượng trình duyệt.");}
}

function clearBatchTimers(){for(const timerId of batchTimerIds)clearTimeout(timerId);batchTimerIds=[];}
function scheduleBatchTimer(callback,delay){
  const timerId=window.setTimeout(()=>{batchTimerIds=batchTimerIds.filter(item=>item!==timerId);callback();},delay);
  batchTimerIds.push(timerId);return timerId;
}
