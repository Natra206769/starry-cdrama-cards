/* V11.3 — browser-only TMDB lookup. Tokens are never persisted by this app. */
(function initTmdbLookup(){
 const $t=id=>document.getElementById(id);
 const TOKEN_KEY="tmdbReadAccessToken";
 const FIELDS=["originalTitle","year","genres","description","poster"];
 const MAX_CACHE_AGE=180*24*60*60*1000;
 let selected=null,searchResults=[],requestNumber=0,expiryRunning=false;
 function setStatus(message,kind=""){const el=$t("tmdbSearchStatus");el.textContent=message;el.classList.toggle("is-error",kind==="error");el.classList.toggle("is-ready",kind==="ready");}
 function readToken(){return String($t("tmdbReadAccessToken").value||"").trim();}
 function makeUrl(path,params){
  const query=new URLSearchParams(params);return "https://api.themoviedb.org/3/"+path+"?"+query.toString();
 }
 async function apiRequest(path,params,token){
  const response=await fetch(makeUrl(path,params),{method:"GET",headers:{Authorization:"Bearer "+token,Accept:"application/json"}});
  if(response.status===401)throw new Error("TMDB từ chối token (401). Hãy kiểm tra Read Access Token.");
  if(response.status===403)throw new Error("TMDB không cho phép yêu cầu (403). Kiểm tra quyền API hoặc giới hạn sử dụng.");
  if(response.status===429)throw new Error("Bạn đã gửi quá nhiều yêu cầu. Hãy đợi một lúc rồi thử lại.");
  if(!response.ok)throw new Error("TMDB phản hồi HTTP "+response.status+".");
  return response.json();
 }
 function yearFrom(item,type){const date=String(type==="tv"?(item.first_air_date||""):(item.release_date||""));return /^\d{4}/.test(date)?date.slice(0,4):"";}
 function imageUrl(path,size="w500"){return path?"https://image.tmdb.org/t/p/"+size+path:"";}
 function resultTitle(item,type){return String(item.name||item.title||(type==="tv"?item.original_name:item.original_title)||"").trim();}
 function resultOriginal(item,type){return String(item.original_name||item.original_title||"").trim();}
 function imageNode(path,alt,className){
  const box=document.createElement("div");box.className=className;
  if(path){const img=document.createElement("img");img.src=imageUrl(path,"w185");img.alt=alt;img.loading="lazy";img.referrerPolicy="no-referrer";img.onerror=()=>img.remove();box.appendChild(img);}
  else{const fallback=document.createElement("span");fallback.textContent="✦";box.appendChild(fallback);}
  return box;
 }
 function renderSearchResults(){
  const root=$t("tmdbSearchResults");root.replaceChildren();root.hidden=!searchResults.length;
  searchResults.forEach((entry,index)=>{
   const card=document.createElement("article");card.className="tmdb-result-card";
   const poster=imageNode(entry.item.poster_path,"Poster "+resultTitle(entry.item,entry.type),"tmdb-result-poster");
   const copy=document.createElement("div");copy.className="tmdb-result-copy";
   const title=document.createElement("strong");title.textContent=resultTitle(entry.item,entry.type)||"Không có tên";
   const original=document.createElement("small");original.textContent=[entry.type==="tv"?"Phim bộ":"Điện ảnh",resultOriginal(entry.item,entry.type),yearFrom(entry.item,entry.type)].filter(Boolean).join(" · ");
   const overview=document.createElement("p");overview.textContent=String(entry.item.overview||"Chưa có mô tả trên nguồn dữ liệu.").slice(0,240);
   const button=document.createElement("button");button.type="button";button.className="outline-btn compact-btn";button.textContent="Chọn kết quả";
   button.addEventListener("click",()=>chooseResult(index,button));
   copy.append(title,original,overview,button);card.append(poster,copy);root.appendChild(card);
  });
 }
 async function search(){
  const token=readToken(),query=$t("tmdbSearchQuery").value.trim(),type=$t("tmdbSearchType").value;
  if(!token){setStatus("Hãy nhập TMDB Read Access Token. Ứng dụng không lưu token khi bạn đóng tab.","error");$t("tmdbReadAccessToken").focus();return;}
  if(!query){setStatus("Hãy nhập tên phim cần tìm.","error");$t("tmdbSearchQuery").focus();return;}
  if(query.length>120){setStatus("Tên tìm kiếm quá dài.","error");return;}
  const request=++requestNumber;$t("tmdbSearchBtn").disabled=true;$t("tmdbSearchBtn").textContent="Đang tìm…";
  selected=null;$t("tmdbSelectedResult").hidden=true;$t("tmdbSearchResults").hidden=true;$t("tmdbSearchResults").replaceChildren();
  setStatus("Đang tìm trên TMDB…");
  try{
   const types=type==="both"?["tv","movie"]:[type];
   const payloads=await Promise.all(types.map(async kind=>({kind,data:await apiRequest("search/"+kind,{query,language:"vi-VN",include_adult:"false",page:"1"},token)})));
   if(request!==requestNumber)return;
   searchResults=payloads.flatMap(payload=>(Array.isArray(payload.data.results)?payload.data.results:[]).filter(item=>!item.adult).map((item,index)=>({type:payload.kind,item,rank:index})));
   // Preserve TMDB relevance order within each search instead of promoting popular but unrelated titles.
   searchResults.sort((a,b)=>a.rank-b.rank||(a.type===b.type?0:(a.type==="tv"?-1:1)));
   searchResults=searchResults.slice(0,12);
   renderSearchResults();
   setStatus(searchResults.length?"Tìm thấy "+searchResults.length+" kết quả. Chọn một kết quả để xem dữ liệu chi tiết trước khi lưu.":"Không tìm thấy kết quả. Thử tên gốc, tên tiếng Trung hoặc tên tiếng Anh.",searchResults.length?"ready":"");
  }catch(error){if(request===requestNumber)setStatus(error.message||"Không thể kết nối TMDB. Kiểm tra mạng và thử lại.","error");}
  finally{if(request===requestNumber){$t("tmdbSearchBtn").disabled=false;$t("tmdbSearchBtn").textContent="⌕ Tìm trên TMDB";}}
 }
 function renderSelectedPreview(){
  if(!selected){$t("tmdbSelectedResult").hidden=true;return;}
  const record=selected.detail,type=selected.type,title=resultTitle(record,type)||resultTitle(selected.item,type);
  $t("tmdbSelectedResult").hidden=false;
  $t("tmdbSelectedTitle").textContent=title||"Không có tên";
  $t("tmdbSelectedOriginal").textContent="Tên gốc: "+(resultOriginal(record,type)||"Chưa có dữ liệu");
  $t("tmdbSelectedFacts").textContent=["Loại: "+(type==="tv"?"Phim bộ":"Điện ảnh"),"Năm: "+(yearFrom(record,type)||"Chưa rõ"),"Thể loại: "+(selected.genres.length?selected.genres.join(", "):"Chưa rõ")].join(" · ");
  $t("tmdbSelectedOverview").textContent=String(record.overview||"Chưa có mô tả trên nguồn dữ liệu.").trim();
  $t("tmdbSelectedSource").textContent="TMDB ID "+record.id+" · "+(type==="tv"?"TV":"Movie");
  const url="https://www.themoviedb.org/"+type+"/"+encodeURIComponent(String(record.id));
  $t("tmdbSelectedLink").href=url;
  const poster=$t("tmdbSelectedPoster");poster.replaceChildren();
  if(record.poster_path){const img=document.createElement("img");img.src=imageUrl(record.poster_path,"w500");img.alt="Poster "+title;img.loading="lazy";img.referrerPolicy="no-referrer";img.onerror=()=>{img.remove();};poster.appendChild(img);}
  else{const span=document.createElement("span");span.textContent="✦";poster.appendChild(span);}
 }
 async function chooseResult(index,button){
  const entry=searchResults[index];if(!entry)return;
  const token=readToken();if(!token){setStatus("Token đã bị xóa khỏi ô nhập. Hãy nhập lại rồi chọn kết quả.","error");return;}
  const title=resultTitle(entry.item,entry.type);
  if(!$t("tmdbTargetTitle").dataset.userEdited||!$t("tmdbTargetTitle").value.trim())$t("tmdbTargetTitle").value=$t("tmdbSearchQuery").value.trim()||title;
  $t("tmdbSelectedResult").hidden=true;
  if(button){button.disabled=true;button.textContent="Đang tải…";}
  setStatus("Đang lấy metadata chi tiết cho "+title+"…");
  try{
   let detail=entry.item;
   try{detail=await apiRequest(entry.type+"/"+encodeURIComponent(String(entry.item.id)),{language:"vi-VN"},token);}
   catch(error){detail=entry.item;setStatus("Không tải được chi tiết đầy đủ; dùng dữ liệu từ kết quả tìm kiếm. "+error.message,"error");}
   const current={type:entry.type,item:entry.item,detail,genres:Array.isArray(detail.genres)?detail.genres.map(x=>String(x.name||"").trim()).filter(Boolean):[]};
   selected=current;renderSelectedPreview();
   if(!$t("tmdbSearchStatus").classList.contains("is-error"))setStatus("Đã chọn kết quả. Kiểm tra tên phim đích và metadata trước khi lưu.","ready");
  }catch(error){setStatus(error.message||"Không thể đọc chi tiết phim.","error");}
  finally{if(button){button.disabled=false;button.textContent="Chọn kết quả";}}
 }
 function nonEmpty(value){if(Array.isArray(value))return value.length>0;return Boolean(String(value??"").trim());}
 function mergeSelectedMetadata(existing,incoming,preserve){
  const old=existing&&typeof existing==="object"?existing:{},sourceFields={...(old.tmdbSource?.fields||{})},out={title:String(old.title||incoming.title||"").trim()};
  for(const field of FIELDS){
   const prior=old[field],next=incoming[field];
   if(nonEmpty(next)&&(!preserve||!nonEmpty(prior))){out[field]=next;sourceFields[field]=Date.now();}
   else{out[field]=prior??(field==="genres"?[]:"");}
  }
  if(Object.keys(sourceFields).length)out.tmdbSource={id:incoming.tmdbId,mediaType:incoming.tmdbMediaType,url:incoming.tmdbUrl,fields:sourceFields};
  else out.tmdbSource={id:incoming.tmdbId,mediaType:incoming.tmdbMediaType,url:incoming.tmdbUrl,fields:{}};
  return out;
 }
 async function saveSelected(){
  if(!selected){setStatus("Hãy chọn một kết quả trước khi lưu.","error");return;}
  const target=titleCaseName($t("tmdbTargetTitle").value),type=selected.type,record=selected.detail;
  if(!target){setStatus("Hãy nhập tên phim trong danh mục Starry.","error");$t("tmdbTargetTitle").focus();return;}
  if(target.length>100){setStatus("Tên phim trong Starry không được quá 100 ký tự.","error");return;}
  const key=movieMetadataKey(target);if(!key){setStatus("Tên phim không hợp lệ.","error");return;}
  const sourceTitle=resultTitle(record,type)||resultTitle(selected.item,type),poster=imageUrl(record.poster_path||selected.item.poster_path,"w500");
  const incoming={title:target,originalTitle:resultOriginal(record,type)||resultOriginal(selected.item,type),year:yearFrom(record,type)||yearFrom(selected.item,type),
   genres:Array.isArray(record.genres)?record.genres.map(g=>String(g.name||"").trim()).filter(Boolean):[],
   description:String(record.overview||selected.item.overview||"").trim(),poster,
   tmdbId:String(record.id||selected.item.id),tmdbMediaType:type,tmdbUrl:"https://www.themoviedb.org/"+type+"/"+encodeURIComponent(String(record.id||selected.item.id))};
  if(!confirm("LƯU METADATA TỪ TMDB\n\nTên trong Starry: "+target+"\nKết quả nguồn: "+sourceTitle+"\nNăm: "+(incoming.year||"Chưa rõ")+"\nThể loại: "+(incoming.genres.join(", ")||"Chưa rõ")+"\n\n"+($t("tmdbPreserveExisting").checked?"Thông tin đã có được giữ nguyên; chỉ điền trường còn trống.":"Trường có dữ liệu từ kết quả mới có thể cập nhật metadata hiện tại.")+"\n\nLưu vào danh mục phim?"))return;
  const previous=JSON.parse(JSON.stringify(managerData));
  try{
   if(!managerData.movieMetadata||typeof managerData.movieMetadata!=="object"||Array.isArray(managerData.movieMetadata))managerData.movieMetadata={};
   const existing=managerData.movieMetadata[key]||{};
   managerData.movieMetadata[key]=mergeSelectedMetadata(existing,incoming,$t("tmdbPreserveExisting").checked);
   if(!await persistManagerData()){managerData=normalizeManagerData(previous);setStatus("Không lưu được metadata. Dữ liệu hiện có đã được giữ lại.","error");return;}
   if(typeof renderMovieMetadataManager==="function")renderMovieMetadataManager();
   if($t("movieMetadataSelect")){$t("movieMetadataSelect").value=key;if(typeof loadMovieMetadataForm==="function")loadMovieMetadataForm();}
   if(typeof renderCollection==="function")renderCollection();
   if(typeof currentLibraryProfile!=="undefined"&&currentLibraryProfile?.type==="movie"&&movieMetadataKey(currentLibraryProfile.value)===key&&typeof renderLibraryProfile==="function")renderLibraryProfile();
   setStatus("Đã lưu thông tin phim vào Starry. Các trường lấy từ TMDB sẽ hết hạn sau 180 ngày trừ khi bạn chỉnh sửa thủ công.","ready");
   showToast("Đã lưu metadata TMDB cho "+target+".");
  }catch(error){managerData=normalizeManagerData(previous);setStatus(error.message||"Không thể lưu metadata.","error");}
 }
 function toggleToken(){
  const field=$t("tmdbReadAccessToken"),visible=field.type==="password";field.type=visible?"text":"password";
  $t("toggleTmdbTokenVisibility").textContent=visible?"Ẩn":"Hiện";$t("toggleTmdbTokenVisibility").setAttribute("aria-pressed",String(visible));
 }
 function clearSearch(){
  requestNumber++;selected=null;searchResults=[];$t("tmdbSearchQuery").value="";$t("tmdbTargetTitle").value="";$t("tmdbTargetTitle").dataset.userEdited="";$t("tmdbSearchResults").replaceChildren();$t("tmdbSearchResults").hidden=true;$t("tmdbSelectedResult").hidden=true;setStatus("Đã xóa tìm kiếm và kết quả. Token chưa được lưu vào thiết bị.");
 }
 function expireTmdbCachedMetadata(){
  if(expiryRunning||!managerData?.movieMetadata||typeof managerData.movieMetadata!=="object")return;
  const now=Date.now(),expired=[];
  for(const [key,meta] of Object.entries(managerData.movieMetadata)){
   if(!meta||typeof meta!=="object"||!meta.tmdbSource?.fields)continue;
   for(const [field,timestamp] of Object.entries(meta.tmdbSource.fields)){
    const time=Number(timestamp);
    if(!FIELDS.includes(field)||!Number.isFinite(time)||time<=0||now-time>=MAX_CACHE_AGE)expired.push({key,field});
   }
  }
  if(!expired.length)return;
  expiryRunning=true;const previous=JSON.parse(JSON.stringify(managerData));
  for(const item of expired){
   const meta=managerData.movieMetadata[item.key];if(!meta||!meta.tmdbSource?.fields)continue;
   if(item.field==="genres")meta.genres=[];
   else meta[item.field]="";
   delete meta.tmdbSource.fields[item.field];
   if(!Object.keys(meta.tmdbSource.fields).length)delete meta.tmdbSource;
  }
  persistManagerData().then(ok=>{
   expiryRunning=false;
   if(!ok){managerData=normalizeManagerData(previous);return;}
   showToast("Đã làm mới dữ liệu TMDB quá hạn 180 ngày. Bạn có thể tìm lại phim để bổ sung thông tin.");
   if(typeof renderMovieMetadataManager==="function")renderMovieMetadataManager();
   if(typeof renderCollection==="function")renderCollection();
   if(typeof currentLibraryProfile!=="undefined"&&currentLibraryProfile?.type==="movie"&&typeof renderLibraryProfile==="function")renderLibraryProfile();
  }).catch(()=>{expiryRunning=false;managerData=normalizeManagerData(previous);});
 }
 $t("tmdbSearchBtn").addEventListener("click",search);
 $t("tmdbSearchQuery").addEventListener("keydown",event=>{if(event.key==="Enter"){event.preventDefault();search();}});
 $t("tmdbSearchQuery").addEventListener("input",()=>{if(!$t("tmdbTargetTitle").dataset.userEdited)$t("tmdbTargetTitle").value=$t("tmdbSearchQuery").value;});
 $t("tmdbTargetTitle").addEventListener("input",()=>{$t("tmdbTargetTitle").dataset.userEdited="1";});
 $t("tmdbTargetTitle").addEventListener("blur",()=>{$t("tmdbTargetTitle").value=titleCaseName($t("tmdbTargetTitle").value);});
 $t("toggleTmdbTokenVisibility").addEventListener("click",toggleToken);
 $t("saveTmdbResultBtn").addEventListener("click",saveSelected);
 $t("clearTmdbSearchBtn").addEventListener("click",clearSearch);
 $t("tmdbLookupPanel").addEventListener("toggle",()=>{if($t("tmdbLookupPanel").open&&!$t("tmdbSearchQuery").value.trim()&&$t("movieMetadataSelect")?.value){const title=movieMetadataFormTitle();$t("tmdbSearchQuery").value=title;$t("tmdbTargetTitle").value=title;$t("tmdbTargetTitle").dataset.userEdited="";}});
 window.addEventListener("pagehide",()=>{$t("tmdbReadAccessToken").value="";});
})();