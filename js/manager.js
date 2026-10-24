/* manager.js — Quản lý thẻ: form thêm/sửa, gợi ý tên, ảnh, xóa, sao lưu/khôi phục JSON

*/

function buildPreview(photo,label){
  const preview=$("photoPreview");preview.innerHTML="";
  if(!photo){const span=document.createElement("span");span.textContent="Ảnh xem trước";preview.appendChild(span);return;}
  const img=document.createElement("img");img.src=photo;img.alt=label||"Ảnh xem trước";img.onerror=()=>{preview.innerHTML="";const span=document.createElement("span");span.textContent="Không tải được ảnh xem trước";preview.appendChild(span);};preview.appendChild(img);
}
function clearCharacterForm(){
  $("characterForm").reset();$("characterId").value="";$("fieldStyle").querySelectorAll("option[data-legacy-style]").forEach(option=>option.remove());$("fieldStyle").value="";$("fieldRarity").value="SSR";editingId=null;pendingPhotoData=null;cachedEditPhoto=null;
  for(const fieldId of ["fieldName","fieldMovie","fieldRole"]){
    const config=AUTOCOMPLETE_CONFIG[fieldId];if(config){closeAutocomplete(fieldId);const note=$(config.noteId);note.textContent="";note.classList.remove("has-match");}
  }
  $("formTitle").textContent="Thêm thẻ mới";$("saveCharacterBtn").textContent="Lưu thẻ";$("imageRequiredLabel").textContent="(bắt buộc khi thêm)";$("photoStatus").textContent="Ảnh đại diện thuộc về thẻ này.";buildPreview(null);$("characterForm").hidden=true;$("managerToggle").textContent="＋ Thêm thẻ";
}
function startAddCharacter(){clearCharacterForm();$("characterForm").hidden=false;$("managerToggle").textContent="＋ Đang thêm thẻ";$("characterForm").scrollIntoView({behavior:"smooth",block:"start"});$("fieldName").focus();}
function editCharacter(id){
  const card=getAnyCharacter(id);if(!card)return;
  editingId=id;cachedEditPhoto=card.photo||null;pendingPhotoData=null;
  $("characterId").value=id;$("fieldName").value=card.name||"";$("fieldChinese").value=card.chinese||"";$("fieldMovie").value=card.movie||"Bộ sưu tập chân dung";$("fieldRole").value=card.role||"";
  for(const fieldId of ["fieldName","fieldMovie","fieldRole"]){const config=AUTOCOMPLETE_CONFIG[fieldId];if(config){closeAutocomplete(fieldId);const note=$(config.noteId);note.textContent="";note.classList.remove("has-match");}}
  $("fieldGender").value=card.gender||"female";
  const styleSelect=$("fieldStyle");styleSelect.querySelectorAll("option[data-legacy-style]").forEach(option=>option.remove());
  const savedStyle=card.style||"";
  if(savedStyle&&!Array.from(styleSelect.options).some(option=>option.value===savedStyle)){
    const legacyOption=document.createElement("option");legacyOption.value="__legacy__:"+savedStyle;legacyOption.textContent=savedStyle+" (dữ liệu cũ · cần phân loại)";legacyOption.dataset.legacyStyle="true";styleSelect.appendChild(legacyOption);
  }
  styleSelect.value=Array.from(styleSelect.options).some(option=>option.value===savedStyle)?savedStyle:(savedStyle?"__legacy__:"+savedStyle:"");
  $("fieldRarity").value=card.rarity||"SR";$("fieldQuote").value=card.quote||"";$("fieldPhoto").value="";
  $("formTitle").textContent="Sửa thẻ: "+card.name;$("saveCharacterBtn").textContent="Lưu thay đổi";$("imageRequiredLabel").textContent="(để trống nếu giữ ảnh hiện tại)";$("photoStatus").textContent=card.photo?"Đang dùng ảnh của thẻ này. Chọn ảnh mới nếu muốn thay.":"Chưa có ảnh; bạn có thể thêm ở đây.";
  buildPreview(card.photo,card.name);$("characterForm").hidden=false;$("managerToggle").textContent="✎ Đang sửa thẻ";$("characterForm").scrollIntoView({behavior:"smooth",block:"start"});
}
function renderManagerList(){
  const list=$("managerList");if(!list)return;list.innerHTML="";
  const entries=baseCharacters.filter(base=>!managerData.deleted.includes(base.id)).map(base=>({...normalizeCard({...base,...(managerData.overrides[base.id]||{})},base),_builtIn:true,_hidden:managerData.hidden.includes(base.id)})).concat(managerData.custom.map(card=>({...normalizeCard(card),_builtIn:false,_hidden:false})));
  const search=normalizedSearchKey($("managerSearch")?.value||"");
  const visibleEntries=entries.filter(card=>normalizedSearchKey([card.name,card.chinese,card.movie,card.role,card.style,card.rarity].filter(Boolean).join(" ")).includes(search));
  $("managerCount").textContent=entries.filter(card=>!card._hidden).length+" thẻ đang dùng · "+entries.length+" hồ sơ";
  if(!visibleEntries.length){const empty=document.createElement("p");empty.className="manager-empty";empty.textContent="Không tìm thấy thẻ phù hợp.";list.appendChild(empty);return;}
  visibleEntries.forEach(card=>{
    const row=document.createElement("article");row.className="manager-item"+(card._hidden?" is-hidden":"");
    const thumb=document.createElement("div");thumb.className="manager-thumb";
    if(card.photo){const img=document.createElement("img");img.src=card.photo;img.alt="";img.loading="lazy";img.onerror=()=>{img.remove();thumb.textContent=card.initials||"✦";};thumb.appendChild(img);}else thumb.textContent=card.initials||"✦";
    const detail=document.createElement("div");detail.className="manager-item-detail";
    const title=document.createElement("strong");title.textContent=card.name;
    const meta=document.createElement("small");meta.textContent=[card.movie,card.role,card.chinese,card.rarity,displayStyleLabel(card.style)].filter(Boolean).join(" · ");
    const status=document.createElement("span");status.className="manager-status";status.textContent=card._hidden?"Đang ẩn":(card._builtIn?"Thẻ mẫu":"Thẻ của bạn");detail.append(title,meta,status);
    const actions=document.createElement("div");actions.className="manager-item-actions";
    const edit=document.createElement("button");edit.className="outline-btn compact-btn";edit.type="button";edit.textContent="Sửa";edit.addEventListener("click",()=>editCharacter(card.id));actions.appendChild(edit);
    const toggle=document.createElement("button");toggle.className="outline-btn compact-btn";toggle.type="button";toggle.textContent=card._hidden?"Hiện":"Ẩn";toggle.addEventListener("click",()=>toggleCharacterVisibility(card.id));actions.appendChild(toggle);
    const del=document.createElement("button");del.className="outline-btn compact-btn danger-btn";del.type="button";del.textContent="Xóa hẳn";del.title="Xóa thẻ khỏi trò chơi và bộ sưu tập";del.addEventListener("click",()=>deleteCharacter(card.id));actions.appendChild(del);
    row.append(thumb,detail,actions);list.appendChild(row);
  });
}
async function toggleCharacterVisibility(id){
  const wasHidden=managerData.hidden.includes(id);const previous=JSON.parse(JSON.stringify(managerData));
  managerData.hidden=wasHidden?managerData.hidden.filter(item=>item!==id):[...managerData.hidden,id];
  if(await persistManagerData()){
    if(!wasHidden){delete state.owned[id];state.favorites=state.favorites.filter(item=>item!==id);if(state.cardProgress)delete state.cardProgress[id];saveState();}
    rebuildCharacters();showToast(wasHidden?"Đã hiện lại thẻ.":"Đã ẩn thẻ và xóa tiến độ sở hữu của thẻ này.");
  }else managerData=normalizeManagerData(previous);
}
async function deleteCharacter(id){
  const card=getAnyCharacter(id);if(!card)return;
  const label='"'+card.name+'"'+(card.movie?" trong phim "+card.movie:"");
  if(!confirm("XÓA HẲN thẻ "+label+"?\n\nThẻ sẽ bị loại khỏi danh sách mở thẻ và bộ sưu tập; số lượng sở hữu, yêu thích và ảnh riêng của thẻ cũng bị xóa. Thao tác này không thể hoàn tác bằng Sửa."))return;
  const previous=JSON.parse(JSON.stringify(managerData));
  const isBuiltIn=baseCharacters.some(item=>item.id===id);
  if(isBuiltIn){managerData.deleted=[...new Set([...managerData.deleted,id])];managerData.hidden=managerData.hidden.filter(item=>item!==id);delete managerData.overrides[id];}
  else managerData.custom=managerData.custom.filter(item=>item.id!==id);
  if(!(await persistManagerData())){managerData=normalizeManagerData(previous);return;}
  delete state.owned[id];state.favorites=state.favorites.filter(item=>item!==id);if(state.cardProgress)delete state.cardProgress[id];saveState();
  if(editingId===id)clearCharacterForm();
  if(currentDetailId===id)closeCharacterDetails();
  if(lastCharacter?.id===id){lastCharacter=null;$("characterCard").classList.add("hidden");$("cardBack").classList.remove("hidden");$("againBtn").hidden=true;$("revealHint").textContent="Thẻ đã được xóa khỏi kho.";}
  if(lastBatchCards.some(card=>card.id===id)){$("batchReveal").hidden=true;lastBatchCards=[];}
  rebuildCharacters();if(currentUpgradeId===id)currentUpgradeId=null;renderUpgradePage();showToast("Đã xóa hẳn thẻ "+card.name+".");
}
function fileToCompressedDataUrl(file){
  return new Promise((resolve,reject)=>{
    if(!file||!file.type.startsWith("image/")){reject(new Error("Hãy chọn một tệp ảnh."));return;}
    if(file.size>12*1024*1024){reject(new Error("Ảnh gốc lớn hơn 12 MB. Hãy chọn ảnh nhỏ hơn."));return;}
    const reader=new FileReader();reader.onerror=()=>reject(new Error("Không đọc được ảnh."));reader.onload=()=>{
      const img=new Image();img.onerror=()=>reject(new Error("Tệp này không phải ảnh hợp lệ."));img.onload=()=>{
        const maxW=1000,maxH=1400,scale=Math.min(1,maxW/img.naturalWidth,maxH/img.naturalHeight);const canvas=document.createElement("canvas");canvas.width=Math.max(1,Math.round(img.naturalWidth*scale));canvas.height=Math.max(1,Math.round(img.naturalHeight*scale));
        const ctx=canvas.getContext("2d");ctx.fillStyle="#fff";ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);
        try{resolve(canvas.toDataURL("image/jpeg",0.84));}catch(error){reject(new Error("Không chuyển đổi được ảnh."));}
      };img.src=reader.result;
    };reader.readAsDataURL(file);
  });
}
$("managerToggle").addEventListener("click",()=>{if($("characterForm").hidden)startAddCharacter();else clearCharacterForm();});
$("cancelEditBtn").addEventListener("click",clearCharacterForm);
$("clearFormBtn").addEventListener("click",()=>{if(editingId)editCharacter(editingId);else clearCharacterForm();});
$("managerSearch").addEventListener("input",renderManagerList);
const AUTOCOMPLETE_CONFIG={
  fieldName:{suggestionId:"fieldNameSuggestions",noteId:"fieldNameSuggestionNote",label:"diễn viên",value:card=>card.name,meta:card=>[card.movie,card.role].filter(Boolean).join(" · ")},
  fieldMovie:{suggestionId:"fieldMovieSuggestions",noteId:"fieldMovieSuggestionNote",label:"phim / bộ sưu tập",value:card=>card.movie,meta:card=>card.name+(card.role?" · "+card.role:"")},
  fieldRole:{suggestionId:"fieldRoleSuggestions",noteId:"fieldRoleSuggestionNote",label:"vai diễn",value:card=>card.role,meta:card=>card.name+" · "+card.movie}
};
function getAutocompleteEntries(fieldId){
  const config=AUTOCOMPLETE_CONFIG[fieldId],entries=new Map();
  for(const card of characters){
    const value=String(config.value(card)||"").trim();if(!value)continue;
    const key=normalizedSearchKey(value);if(!key)return;
    if(!entries.has(key))entries.set(key,{value,count:0,meta:config.meta(card),card});
    const entry=entries.get(key);entry.count+=1;if(!entry.meta)entry.meta=config.meta(card);
  }
  return [...entries.values()].sort((a,b)=>a.value.localeCompare(b.value,"vi"));
}
function closeAutocomplete(fieldId){
  const config=AUTOCOMPLETE_CONFIG[fieldId];if(!config)return;
  const list=$(config.suggestionId),input=$(fieldId);list.hidden=true;list.replaceChildren();input.setAttribute("aria-expanded","false");
}
function renderAutocomplete(fieldId){
  const config=AUTOCOMPLETE_CONFIG[fieldId],input=$(fieldId),list=$(config.suggestionId),note=$(config.noteId),query=normalizedSearchKey(input.value);
  list.replaceChildren();note.textContent="";note.classList.remove("has-match");
  if(!query){closeAutocomplete(fieldId);return;}
  const entries=getAutocompleteEntries(fieldId),exact=entries.find(entry=>normalizedSearchKey(entry.value)===query);
  const matches=entries.map(entry=>({...entry,key:normalizedSearchKey(entry.value)}))
    .filter(entry=>entry.key.includes(query))
    .sort((a,b)=>(a.key.startsWith(query)?0:1)-(b.key.startsWith(query)?0:1)||a.value.localeCompare(b.value,"vi"))
    .slice(0,6);
  if(exact){
    note.classList.add("has-match");
    note.textContent=fieldId==="fieldName"?`Đã có ${exact.count} thẻ dùng tên này. Có thể chọn gợi ý để điền nhanh hoặc tiếp tục tạo thẻ khác.`:fieldId==="fieldMovie"?`Đã có ${exact.count} thẻ trong phim/bộ sưu tập này; diễn viên cùng phim sẽ được liên kết tự động.`:`Tên vai diễn này đã xuất hiện ở ${exact.count} thẻ.`;
  }
  for(const entry of matches){
    const button=document.createElement("button");button.type="button";button.className="field-suggestion";button.setAttribute("role","option");button.setAttribute("aria-selected","false");
    const main=document.createElement("span");main.className="field-suggestion-main";main.textContent=entry.value;
    const meta=document.createElement("small");meta.className="field-suggestion-meta";
    meta.textContent=fieldId==="fieldName"?`${entry.count} thẻ · ${entry.meta||"đã có trong kho"}`:fieldId==="fieldMovie"?`${entry.count} thẻ · ${entry.meta||"bộ sưu tập đã có"}`:`${entry.count} thẻ · ${entry.meta||"đã có trong kho"}`;
    button.append(main,meta);
    // Keep mouse focus on the input until click selects the option; click also supports keyboard activation.
    button.addEventListener("pointerdown",event=>{if(event.pointerType==="mouse")event.preventDefault();});
    button.addEventListener("click",event=>{event.preventDefault();selectAutocompleteEntry(fieldId,entry);});
    list.appendChild(button);
  }
  list.hidden=!matches.length;input.setAttribute("aria-expanded",String(matches.length>0));
}
function selectAutocompleteEntry(fieldId,entry){
  const config=AUTOCOMPLETE_CONFIG[fieldId];$(fieldId).value=entry.value;closeAutocomplete(fieldId);
  if(fieldId==="fieldName"&&entry.card){
    if(!$('fieldChinese').value.trim()&&entry.card.chinese)$('fieldChinese').value=entry.card.chinese;
    $('fieldGender').value=entry.card.gender||$('fieldGender').value;
    $(config.noteId).textContent=`Đã chọn diễn viên có sẵn (${entry.count} thẻ). Bạn vẫn có thể thêm thẻ cho phim hoặc vai diễn khác.`;
  }else if(fieldId==="fieldMovie"){
    $(config.noteId).textContent=`Đã chọn phim có ${entry.count} thẻ. Liên kết bạn diễn sẽ được tạo tự động dựa trên tên phim này.`;
  }else $(config.noteId).textContent=`Đã điền vai diễn có sẵn từ ${entry.count} thẻ.`;
  $(config.noteId).classList.add("has-match");
}
for(const fieldId of Object.keys(AUTOCOMPLETE_CONFIG)){
  $(fieldId).setAttribute("autocomplete","off");$(fieldId).setAttribute("aria-autocomplete","list");$(fieldId).setAttribute("aria-controls",AUTOCOMPLETE_CONFIG[fieldId].suggestionId);$(fieldId).setAttribute("aria-expanded","false");
  $(fieldId).addEventListener("input",()=>renderAutocomplete(fieldId));
  $(fieldId).addEventListener("focus",()=>{if($(fieldId).value.trim())renderAutocomplete(fieldId);});
  $(fieldId).addEventListener("blur",event=>{
    event.target.value=titleCaseName(event.target.value);
    window.setTimeout(()=>closeAutocomplete(fieldId),160);
  });
}
$("fieldPhoto").addEventListener("change",async event=>{
  const file=event.target.files?.[0];if(!file)return;$("photoStatus").textContent="Đang xử lý ảnh…";
  try{pendingPhotoData=await fileToCompressedDataUrl(file);buildPreview(pendingPhotoData,file.name);$("photoStatus").textContent="Ảnh mới đã sẵn sàng để lưu cho thẻ này.";}
  catch(error){pendingPhotoData=null;event.target.value="";$("photoStatus").textContent=error.message;showToast(error.message);}
});
$("characterForm").addEventListener("submit",async event=>{
  event.preventDefault();
  const name=titleCaseName($("fieldName").value),movie=titleCaseName($("fieldMovie").value),role=titleCaseName($("fieldRole").value),style=$("fieldStyle").value;
  $("fieldName").value=name;$("fieldMovie").value=movie;$("fieldRole").value=role;
  if(!name||!movie){showToast("Hãy nhập tên diễn viên và tên phim / bộ sưu tập.");return;}
  if(!style||style.startsWith("__legacy__:")){showToast("Thẻ này dùng phong cách ‘Hiện đại’ từ dữ liệu cũ. Hãy phân loại thành Thanh xuân vườn trường hoặc Công sở, nếu phù hợp; nếu không, chọn Cổ trang, Tiên hiệp, Dân quốc hoặc Khác.");return;}
  if(!editingId&&!pendingPhotoData){showToast("Hãy chọn ảnh đại diện khi thêm thẻ mới.");return;}
  if(!editingId){
    const sameCard=characters.some(card=>normalizedSearchKey(card.name)===normalizedSearchKey(name)&&normalizedSearchKey(card.movie)===normalizedSearchKey(movie)&&normalizedSearchKey(card.role)===normalizedSearchKey(role)&&String(card.rarity||"")===String($("fieldRarity").value||""));
    if(sameCard&&!confirm(`Đã có thẻ ${name} · ${movie}${role?" · "+role:""} · ${$("fieldRarity").value}. Bạn vẫn muốn thêm một thẻ trùng thông tin?`))return;
  }
  const wasEditing=Boolean(editingId),rarity=$("fieldRarity").value,current=editingId?getAnyCharacter(editingId):null,art=makeArt(rarity);
  const changedPhoto=Boolean(pendingPhotoData);
  const fields={name,chinese:$("fieldChinese").value.trim(),movie,role,gender:$("fieldGender").value,style,rarity,quote:$("fieldQuote").value.trim()||"Một ngôi sao, một câu chuyện.",initials:makeInitials($("fieldChinese").value,name),photo:pendingPhotoData||current?.photo||"",photoFallback:changedPhoto?null:(current?.photoFallback||null),...art};
  const previous=JSON.parse(JSON.stringify(managerData));
  if(editingId){
    if(managerData.custom.some(card=>card.id===editingId))managerData.custom=managerData.custom.map(card=>{
      if(card.id!==editingId)return card;const updated={...card,...fields,...(changedPhoto?{photoCredit:"Ảnh do người dùng thêm",photoLicense:"Ảnh cá nhân",photoSource:""}:{})};delete updated.costume;return updated;
    });
    else {const updated={...(current||{}),...fields,...(changedPhoto?{photoCredit:"Ảnh do người dùng thêm",photoLicense:"Ảnh cá nhân",photoSource:""}:{})};delete updated.costume;managerData.overrides[editingId]=updated;}
  }else{
    const randomId=globalThis.crypto?.randomUUID?.()||(Date.now().toString(36)+Math.random().toString(36).slice(2,10));
    managerData.custom.push({id:"card-"+randomId,...fields,photoCredit:"Ảnh do người dùng thêm",photoLicense:"Ảnh cá nhân",photoSource:""});
  }
  if(await persistManagerData()){clearCharacterForm();rebuildCharacters();showToast(wasEditing?"Đã cập nhật thẻ.":"Đã thêm thẻ mới vào phim "+movie+".");}
  else managerData=normalizeManagerData(previous);
});
$("restoreDefaultsBtn").addEventListener("click",async()=>{
  if(!managerData.hidden.length&&!Object.keys(managerData.overrides).length&&!managerData.deleted.length){showToast("Các thẻ mẫu đang ở trạng thái ban đầu.");return;}
  if(!confirm("Khôi phục toàn bộ thẻ mẫu đã ẩn / xóa và hoàn tác chỉnh sửa của thẻ mẫu? Thẻ do bạn tự thêm và tiến độ sở hữu của thẻ mẫu đã xóa sẽ không được khôi phục."))return;
  const previous=JSON.parse(JSON.stringify(managerData));managerData.hidden=[];managerData.overrides={};managerData.deleted=[];
  if(await persistManagerData()){rebuildCharacters();showToast("Đã khôi phục các thẻ mẫu.");}else managerData=normalizeManagerData(previous);
});
function summarizeBackupForRestore(backup){
  const raw=backup.managerData||{},custom=Array.isArray(raw.custom)?raw.custom:[],ids=new Set(),duplicateIds=new Set(),signatures=new Set(),duplicateEntries=new Set();
  custom.forEach(card=>{
    const id=String(card?.id||"");
    if(id&&(ids.has(id)||baseCharacters.some(base=>base.id===id)))duplicateIds.add(id);
    if(id)ids.add(id);
    const signature=normalizedSearchKey([card?.name,card?.movie,card?.role,card?.rarity].join("|"));
    if(signature&&signatures.has(signature))duplicateEntries.add(signature);
    if(signature)signatures.add(signature);
  });
  const owned=backup.state?.owned&&typeof backup.state.owned==="object"&&!Array.isArray(backup.state.owned)?backup.state.owned:{};
  const copies=Object.values(owned).reduce((sum,value)=>sum+Math.max(0,Number(value)||0),0);
  const unique=Object.values(owned).filter(value=>(Number(value)||0)>0).length;
  const hidden=new Set(Array.isArray(raw.hidden)?raw.hidden:[]),deleted=new Set(Array.isArray(raw.deleted)?raw.deleted:[]);
  const allowedIds=new Set(baseCharacters.filter(card=>!hidden.has(card.id)&&!deleted.has(card.id)).map(card=>card.id));
  custom.forEach(card=>{if(card?.id)allowedIds.add(String(card.id));});
  const staleOwned=Object.entries(owned).filter(([id,value])=>(Number(value)||0)>0&&!allowedIds.has(id)).length;
  return {customCount:custom.length,metadataCount:Object.keys(raw.movieMetadata&&typeof raw.movieMetadata==="object"?raw.movieMetadata:{}).length,
    preferenceCount:Object.keys(raw.moviePreferences&&typeof raw.moviePreferences==="object"?raw.moviePreferences:{}).length,
    presetCount:Array.isArray(raw.collectionPresets)?raw.collectionPresets.length:0,copies,unique,duplicateIds:duplicateIds.size,
    duplicateEntries:duplicateEntries.size,staleOwned};
}
$("exportBtn").addEventListener("click",()=>{
  const backup={app:"Starry C-Drama Cards",version:5,createdAt:new Date().toISOString(),managerData,state,uiPreferences};
  const blob=new Blob([JSON.stringify(backup,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="starry-cbiz-backup-"+new Date().toISOString().slice(0,10)+".json";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);showToast("Đã tạo bản sao lưu JSON V5.");
});
$("importBtn").addEventListener("click",()=>$("importFile").click());
$("importFile").addEventListener("change",async event=>{
  const file=event.target.files?.[0];if(!file)return;
  try{
    const backup=JSON.parse(await file.text());
    if(backup.app!=="Starry C-Drama Cards"||!backup.managerData||typeof backup.managerData!=="object"||!backup.state||typeof backup.state!=="object"||Array.isArray(backup.state))
      throw new Error("Tệp không đúng định dạng sao lưu của game.");
    const report=summarizeBackupForRestore(backup);
    const created=backup.createdAt?new Date(backup.createdAt).toLocaleString():"Không rõ";
    const summary="BẢN XEM TRƯỚC KHÔI PHỤC\n\nNgày tạo: "+created+
      "\nThẻ tự thêm: "+report.customCount+"\nHồ sơ metadata phim: "+report.metadataCount+
      "\nPhim yêu thích/ghim: "+report.preferenceCount+"\nBộ lọc đã lưu: "+report.presetCount+
      "\nThẻ sở hữu khác nhau: "+report.unique+"\nTổng bản sao: "+report.copies+
      "\nID thẻ trùng: "+report.duplicateIds+"\nThẻ tự thêm trùng thông tin: "+report.duplicateEntries+
      "\nMục sở hữu không khớp danh mục trong tệp: "+report.staleOwned+
      "\n\nKhôi phục sẽ thay thế dữ liệu hiện tại. Bạn chỉ nên tiếp tục khi đây là đúng tệp sao lưu.";
    if(!confirm(summary))return;
    if(report.duplicateIds||report.duplicateEntries||report.staleOwned){
      const warning="CẢNH BÁO KIỂM TRA\n"+
        (report.duplicateIds?"• Có "+report.duplicateIds+" ID thẻ bị trùng.\n":"")+
        (report.duplicateEntries?"• Có "+report.duplicateEntries+" thẻ tự thêm trùng thông tin.\n":"")+
        (report.staleOwned?"• Có "+report.staleOwned+" mục sở hữu không khớp danh mục.\n":"")+
        "\nTiếp tục có thể tạo dữ liệu lặp hoặc mục sở hữu bị bỏ qua. Bạn vẫn muốn khôi phục?";
      if(!confirm(warning))return;
    }
    const previous=JSON.parse(JSON.stringify(managerData));managerData=normalizeManagerData(backup.managerData);
    if(await persistManagerData()){
      const rawOwned=backup.state.owned&&typeof backup.state.owned==="object"&&!Array.isArray(backup.state.owned)?backup.state.owned:{};
      state={owned:rawOwned,favorites:Array.isArray(backup.state.favorites)?backup.state.favorites:[],cardProgress:backup.state.cardProgress&&typeof backup.state.cardProgress==="object"&&!Array.isArray(backup.state.cardProgress)?backup.state.cardProgress:{}};
      saveState();
      if(backup.uiPreferences&&typeof backup.uiPreferences==="object"){
        uiPreferences=normalizeUiPreferences(backup.uiPreferences);persistUiPreferences();applyUiPreferencesToPage();
      }
      clearCharacterForm();rebuildCharacters();showToast("Đã khôi phục dữ liệu từ bản sao lưu.");
    }else managerData=normalizeManagerData(previous);
  }catch(error){showToast(error.message||"Không thể đọc tệp sao lưu.");}
  finally{event.target.value="";}
});
