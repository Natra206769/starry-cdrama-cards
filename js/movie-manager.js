/* movie-manager.js — Quản lý metadata dùng chung cho từng phim.
   Lưu trong managerData.movieMetadata, được bảo toàn bởi IndexedDB và bản sao lưu JSON. */
let moviePosterValue = "";
function movieMetadataKey(movieName){return normalizedSearchKey(movieName);}
function getMovieMetadata(movieName){
  const raw=managerData?.movieMetadata?.[movieMetadataKey(movieName)];
  if(!raw||typeof raw!=="object")return null;
  return {title:String(raw.title||movieName||""),originalTitle:String(raw.originalTitle||""),year:String(raw.year||""),
    genres:Array.isArray(raw.genres)?raw.genres.map(String).filter(Boolean):String(raw.genres||"").split(/[，,、]/).map(x=>x.trim()).filter(Boolean),
    description:String(raw.description||""),poster:String(raw.poster||"")};
}
function movieMetadataEntries(){
  const grouped=new Map();
  for(const card of characters){
    const title=String(card.movie||"").trim(),key=movieMetadataKey(title);
    if(!title||isGenericCollectionTitle(title)||!key)continue;
    if(!grouped.has(key))grouped.set(key,{key,title,cards:[]});
    grouped.get(key).cards.push(card);
  }
  return [...grouped.values()].sort((a,b)=>compareVietnamese(a.title,b.title));
}
function movieMetadataHasContent(meta){
  if(!meta)return false;
  return Boolean(String(meta.originalTitle||"").trim()||String(meta.year||"").trim()||
    (Array.isArray(meta.genres)?meta.genres.length:String(meta.genres||"").trim())||
    String(meta.description||"").trim()||String(meta.poster||"").trim());
}
function movieMetadataShowPosterPreview(src){
  const root=$("movieMetadataPosterPreview"),label=$("movieMetadataPosterLabel");if(!root)return;
  root.replaceChildren();
  if(!src){const placeholder=document.createElement("span");placeholder.textContent="✦";root.appendChild(placeholder);if(label)label.textContent="Chưa có poster";return;}
  const image=document.createElement("img");image.alt="Poster xem trước";image.src=src;
  image.onerror=()=>{image.remove();const placeholder=document.createElement("span");placeholder.textContent="✦";root.appendChild(placeholder);if(label)label.textContent="Không tải được poster — hãy kiểm tra ảnh hoặc đường dẫn.";};
  image.onload=()=>{if(label)label.textContent="Poster xem trước";};root.appendChild(image);
}
function movieMetadataFormTitle(){
  const key=$("movieMetadataSelect")?.value;
  return movieMetadataEntries().find(entry=>entry.key===key)?.title||"";
}
function loadMovieMetadataForm(){
  const select=$("movieMetadataSelect");if(!select)return;
  const key=select.value,title=movieMetadataFormTitle(),meta=key?getMovieMetadata(title):null;
  $("movieMetadataFormTitle").textContent=title?(meta&&movieMetadataHasContent(meta)?"Sửa thông tin: "+title:"Bổ sung thông tin: "+title):"Chọn phim để chỉnh sửa";
  $("movieMetadataOriginalTitle").value=meta?.originalTitle||"";$("movieMetadataYear").value=meta?.year||"";
  $("movieMetadataGenres").value=(meta?.genres||[]).join(", ");$("movieMetadataDescription").value=meta?.description||"";
  moviePosterValue=meta?.poster||"";$("movieMetadataPosterUrl").value=moviePosterValue.startsWith("data:image/")?"":moviePosterValue;
  $("movieMetadataPosterFile").value="";movieMetadataShowPosterPreview(moviePosterValue);
  $("movieMetadataSaveState").textContent=title?(meta&&movieMetadataHasContent(meta)?"Đã có dữ liệu":"Sẵn sàng nhập"):"Chọn phim trước khi lưu";
  $("saveMovieMetadataBtn").disabled=!title;
}
function renderMovieMetadataManager(){
  const select=$("movieMetadataSelect"),list=$("movieMetadataList");if(!select||!list)return;
  const previous=select.value,entries=movieMetadataEntries(),validKeys=new Set(entries.map(entry=>entry.key));
  select.replaceChildren();const placeholder=document.createElement("option");placeholder.value="";placeholder.textContent="Chọn một phim…";select.appendChild(placeholder);
  entries.forEach(entry=>{const option=document.createElement("option");option.value=entry.key;option.textContent=entry.title;select.appendChild(option);});
  select.value=validKeys.has(previous)?previous:"";
  $("movieMetadataCount").textContent=entries.length+" phim trong kho";
  $("movieMetadataManagedCount").textContent=entries.length+" phim · "+Object.keys(managerData.movieMetadata||{}).length+" hồ sơ đã lưu";
  const query=normalizedSearchKey($("movieMetadataSearch")?.value||"");
  const filtered=entries.filter(entry=>normalizedSearchKey(entry.title).includes(query));list.replaceChildren();
  if(!filtered.length){const empty=document.createElement("p");empty.className="movie-metadata-empty";empty.textContent=entries.length?"Không tìm thấy phim phù hợp.":"Hãy thêm thẻ có tên phim trước; các phim sẽ tự động xuất hiện trong danh sách này.";list.appendChild(empty);}
  filtered.forEach(entry=>{
    const meta=getMovieMetadata(entry.title),ready=movieMetadataHasContent(meta),row=document.createElement("article");row.className="movie-metadata-row";
    const thumb=document.createElement("div");thumb.className="movie-metadata-thumb";const mark=document.createElement("span");mark.textContent="✦";thumb.appendChild(mark);
    if(meta?.poster){const image=document.createElement("img");image.alt="";image.loading="lazy";image.src=meta.poster;image.onerror=()=>image.remove();thumb.appendChild(image);}
    const copy=document.createElement("div");copy.className="movie-metadata-row-copy";
    const title=document.createElement("strong");title.textContent=entry.title;
    const subtitle=document.createElement("small");subtitle.textContent=[meta?.originalTitle,meta?.year,(meta?.genres||[]).join(" · ")].filter(Boolean).join(" · ")||"Chưa có tên gốc, năm, thể loại hoặc mô tả";
    const status=document.createElement("span");status.className="movie-metadata-row-status"+(ready?" is-ready":"");status.textContent=ready?"✓ Đã bổ sung dữ liệu":"Chưa thiết lập hồ sơ";copy.append(title,subtitle,status);
    const actions=document.createElement("div");actions.className="movie-metadata-row-actions";
    const edit=document.createElement("button");edit.type="button";edit.className="outline-btn compact-btn";edit.textContent="Sửa";
    edit.addEventListener("click",()=>{select.value=entry.key;loadMovieMetadataForm();$("movieMetadataForm").scrollIntoView({behavior:"smooth",block:"start"});});actions.appendChild(edit);
    const remove=document.createElement("button");remove.type="button";remove.className="outline-btn compact-btn danger-btn";remove.textContent="Xóa dữ liệu";remove.disabled=!managerData.movieMetadata?.[entry.key];
    remove.addEventListener("click",async()=>{
      if(!managerData.movieMetadata?.[entry.key])return;
      if(!confirm("Chỉ xóa metadata của phim "+entry.title+"? Thẻ, ảnh thẻ, số lượng sở hữu và tiến trình nâng cấp sẽ được giữ nguyên."))return;
      const previousData=JSON.parse(JSON.stringify(managerData));delete managerData.movieMetadata[entry.key];
      if(await persistManagerData()){
        renderMovieMetadataManager();if(select.value===entry.key)loadMovieMetadataForm();
        if(currentLibraryProfile?.type==="movie"&&movieMetadataKey(currentLibraryProfile.value)===entry.key)renderLibraryProfile();
        showToast("Đã xóa dữ liệu riêng của phim "+entry.title+".");
      }else{managerData=normalizeManagerData(previousData);renderMovieMetadataManager();}
    });actions.appendChild(remove);
    row.append(thumb,copy,actions);list.appendChild(row);
  });
  if(select.value!==previous||!select.value)loadMovieMetadataForm();
}
function openMovieMetadataEditor(movieName){
  const key=movieMetadataKey(movieName),select=$("movieMetadataSelect");
  if(!select||![...select.options].some(option=>option.value===key)){showToast("Phim này chưa có trong danh mục thẻ để quản lý metadata.");return;}
  select.value=key;loadMovieMetadataForm();showAppPage("manager");
  $("movieLibraryManager").scrollIntoView({behavior:"smooth",block:"start"});
  $("movieMetadataOriginalTitle").focus({preventScroll:true});
}
$("movieMetadataSelect").addEventListener("change",loadMovieMetadataForm);
$("movieMetadataSearch").addEventListener("input",renderMovieMetadataManager);
$("movieMetadataPosterUrl").addEventListener("input",event=>{moviePosterValue=event.target.value.trim();movieMetadataShowPosterPreview(moviePosterValue);$("movieMetadataPosterFile").value="";});
$("movieMetadataPosterFile").addEventListener("change",async event=>{
  const file=event.target.files?.[0];if(!file)return;$("movieMetadataSaveState").textContent="Đang nén poster…";
  try{moviePosterValue=await fileToCompressedDataUrl(file);$("movieMetadataPosterUrl").value="";movieMetadataShowPosterPreview(moviePosterValue);$("movieMetadataSaveState").textContent="Poster đã sẵn sàng để lưu";}
  catch(error){event.target.value="";showToast(error.message||"Không thể xử lý poster.");$("movieMetadataSaveState").textContent="Không xử lý được poster";}
});
$("clearMovieMetadataPosterBtn").addEventListener("click",()=>{moviePosterValue="";$("movieMetadataPosterUrl").value="";$("movieMetadataPosterFile").value="";movieMetadataShowPosterPreview("");$("movieMetadataSaveState").textContent="Poster sẽ được bỏ khi lưu";});
$("movieMetadataForm").addEventListener("submit",async event=>{
  event.preventDefault();const key=$("movieMetadataSelect").value,title=movieMetadataFormTitle();
  if(!key||!title){showToast("Hãy chọn một phim trong danh mục trước khi lưu.");return;}
  const yearText=$("movieMetadataYear").value.trim();
  if(yearText&&(Number(yearText)<1900||Number(yearText)>2100||!Number.isInteger(Number(yearText)))){showToast("Năm phát hành phải là số nguyên từ 1900 đến 2100.");return;}
  const genres=[...new Set($("movieMetadataGenres").value.split(/[，,、]/).map(value=>value.trim()).filter(Boolean))];
  const next={title,originalTitle:$("movieMetadataOriginalTitle").value.trim(),year:yearText,genres,description:$("movieMetadataDescription").value.trim(),poster:moviePosterValue};
  const previousData=JSON.parse(JSON.stringify(managerData));
  if(!managerData.movieMetadata||typeof managerData.movieMetadata!=="object"||Array.isArray(managerData.movieMetadata))managerData.movieMetadata={};
  managerData.movieMetadata[key]=next;$("saveMovieMetadataBtn").disabled=true;$("movieMetadataSaveState").textContent="Đang lưu…";
  if(await persistManagerData()){
    renderMovieMetadataManager();loadMovieMetadataForm();
    if(currentLibraryProfile?.type==="movie"&&movieMetadataKey(currentLibraryProfile.value)===key)renderLibraryProfile();
    showToast("Đã lưu dữ liệu phim "+title+". Các thẻ cùng phim sẽ dùng chung thông tin.");
  }else{managerData=normalizeManagerData(previousData);renderMovieMetadataManager();$("movieMetadataSaveState").textContent="Không lưu được dữ liệu";}
});