/* V11.1 — Bulk card import; append-only for custom cards and never rewrites player state. */
(function initBulkImport(){
 const $b=id=>document.getElementById(id),styles=["Cổ trang","Thanh xuân vườn trường","Công sở","Tiên hiệp","Dân quốc","Khác"];
 const aliases={name:["ten dien vien","dien vien","actor","actor name","name","ten","ten nhan vat"],movie:["ten phim","phim","movie","drama","title","movie title","bo suu tap"],role:["vai dien","vai","role","character role"],chinese:["ten tieng trung","tieng trung","chinese","chinese name","han tu"],gender:["gioi tinh","gender","sex"],style:["phong cach","style","card style"],rarity:["do hiem","rarity","tier","cap hiem"],quote:["mo ta","trich dan","cau trich dan","quote","description"],photo:["anh url","url anh","anh dai dien","photo url","image url","photo","image","anh"]};
 let rows=[],sourceCount=0;
 function status(message,kind=""){const el=$b("bulkImportStatus");el.textContent=message;el.classList.toggle("is-error",kind==="error");el.classList.toggle("is-ready",kind==="ready");}
 function headerKey(s){return normalizedSearchKey(s).replace(/[_-]+/g," ").replace(/[()[\]]/g,"").trim();}
 function delimiterOf(text){
   const line=String(text).replace(/^\uFEFF/,"").split(/\r\n|\n|\r/).find(s=>s.trim())||"",opts=[",","\t",";"];
   const scores=opts.map(delim=>{let n=0,q=false;for(let i=0;i<line.length;i++){if(line[i]==='"'&&q&&line[i+1]==='"'){i++;continue;}if(line[i]==='"'){q=!q;continue;}if(!q&&line[i]===delim)n++;}return {delim,n};}).sort((a,b)=>b.n-a.n);
   return scores[0].n?scores[0].delim:"\t";
 }
 function parseText(text,delim){
   const result=[];let row=[],cell="",q=false;const source=String(text).replace(/^\uFEFF/,"");
   for(let i=0;i<source.length;i++){const ch=source[i];
    if(ch==='"'){if(q&&source[i+1]==='"'){cell+='"';i++;}else q=!q;}
    else if(ch===delim&&!q){row.push(cell);cell="";}
    else if((ch==="\n"||ch==="\r")&&!q){if(ch==="\r"&&source[i+1]==="\n")i++;row.push(cell);if(row.some(x=>String(x).trim()))result.push(row);row=[];cell="";}
    else cell+=ch;
   }
   if(q)throw Error("Có dấu ngoặc kép chưa đóng. Hãy kiểm tra ô chứa dấu phẩy hoặc xuống dòng.");
   row.push(cell);if(row.some(x=>String(x).trim()))result.push(row);
   return result.map(r=>r.map(x=>String(x??"").trim()));
 }
 function genderOf(s){const k=normalizedSearchKey(s);if(["female","f","nu"].includes(k))return "female";if(["male","m","nam"].includes(k))return "male";if(!k||["other","khac","group","nhom"].includes(k))return "other";return null;}
 function styleOf(s){const k=normalizedSearchKey(s);if(!k)return {value:"Khác",warning:"Thiếu phong cách, dùng “Khác”."};const hit=styles.find(x=>normalizedSearchKey(x)===k);if(hit)return {value:hit,warning:""};if(["hien dai","modern","contemporary","other"].includes(k))return {value:"Khác",warning:"Phong cách được đổi thành “Khác”."};return {value:"Khác",warning:"Phong cách chưa nhận diện, dùng “Khác”."};}
 function rarityOf(s){const k=normalizedSearchKey(s).toUpperCase(),map={"NORMAL":"R","COMMON":"R","RARE":"SR","SUPER RARE":"SSR","LEGENDARY":"UR","SPECIAL":"SP","THUONG":"R","PHO BIEN":"R","HIEM":"SR","SIEU HIEM":"SSR","HUYEN THOAI":"UR","DAC BIET":"SP"},raw=map[k]||k,v=raw==="N"?"R":raw;return rarityInfo[v]?v:null;}
 function photoOf(s){if(!s)return {value:"",error:""};try{const u=new URL(s);return ["http:","https:"].includes(u.protocol)?{value:u.href,error:""}:{value:"",error:"Ảnh URL phải bắt đầu bằng http:// hoặc https://."};}catch{return {value:"",error:"Ảnh URL không hợp lệ."};}}
 function signature(c){return normalizedSearchKey([c.name,c.movie,c.role,c.rarity].join("|"));}
 function parseSource(text){
  const matrix=parseText(text,delimiterOf(text));if(matrix.length<2)throw Error("Cần có dòng tiêu đề và ít nhất một dòng dữ liệu.");
  const headers=matrix[0].map(headerKey),map={};for(const [field,names] of Object.entries(aliases)){const i=headers.findIndex(h=>names.includes(h));if(i>=0)map[field]=i;}
  if(map.name===undefined||map.movie===undefined)throw Error("Thiếu tiêu đề cột bắt buộc. Hãy dùng “Tên diễn viên” và “Tên phim”, hoặc tải mẫu CSV.");
  const src=matrix.slice(1).filter(r=>r.some(Boolean));if(src.length>500)throw Error("Mỗi lần chỉ nhập tối đa 500 dòng. Hãy chia tệp nhỏ hơn.");
  const existing=new Set((characters||[]).map(signature)),seen=new Set();
  return src.map((cells,i)=>{
   const get=f=>map[f]===undefined?"":String(cells[map[f]]||"").trim(),name=titleCaseName(get("name")),movie=titleCaseName(get("movie")),role=titleCaseName(get("role")),chinese=get("chinese"),gender=genderOf(get("gender")),style=styleOf(get("style")),rarity=rarityOf(get("rarity")||"SSR"),quote=get("quote"),photo=photoOf(get("photo")),errors=[],warnings=[];
   if(!name)errors.push("Thiếu tên diễn viên.");if(!movie)errors.push("Thiếu tên phim.");
   if(name.length>60)errors.push("Tên diễn viên quá 60 ký tự.");if(movie.length>100)errors.push("Tên phim quá 100 ký tự.");if(role.length>80)errors.push("Vai diễn quá 80 ký tự.");if(chinese.length>30)errors.push("Tên tiếng Trung quá 30 ký tự.");if(quote.length>180)errors.push("Mô tả quá 180 ký tự.");
   if(!gender)errors.push("Giới tính không hợp lệ.");if(!rarity)errors.push("Độ hiếm phải là R/SR/SSR/SSR+/UR/SP.");if(photo.error)errors.push(photo.error);if(style.warning)warnings.push(style.warning);
   const card={name,movie,role,chinese,gender:gender||"other",style:style.value,rarity:rarity||"SSR",quote:quote||"Một ngôi sao, một câu chuyện.",photo:photo.value},sig=signature(card);
   const duplicateExisting=Boolean(name&&movie&&existing.has(sig)),duplicateBatch=Boolean(name&&movie&&seen.has(sig));if(name&&movie)seen.add(sig);
   return {line:i+2,card,errors,warnings,duplicateExisting,duplicateBatch};
  });
 }
 function skip(row){return row.errors.length>0||($b("bulkSkipDuplicates").checked&&(row.duplicateExisting||row.duplicateBatch));}
 function render(){
  const preview=$b("bulkImportPreview"),tbody=$b("bulkPreviewRows");if(!rows.length){preview.hidden=true;$b("commitBulkImportBtn").disabled=true;return;}preview.hidden=false;tbody.replaceChildren();
  let good=0,bad=0,dupes=0,add=0;
  for(const row of rows){
   if(row.errors.length)bad++;else{good++;if(row.duplicateExisting||row.duplicateBatch)dupes++;}if(!skip(row))add++;
   const tr=document.createElement("tr"),line=document.createElement("td"),data=document.createElement("td"),name=document.createElement("strong"),sub=document.createElement("small"),cell=document.createElement("td"),state=document.createElement("span");
   line.textContent=String(row.line);data.className="bulk-preview-card";name.textContent=row.card.name||"(Thiếu tên diễn viên)";sub.textContent=(row.card.movie||"(Thiếu tên phim)")+(row.card.role?" · "+row.card.role:"")+" · "+row.card.rarity;data.append(name,sub);state.className="bulk-preview-status";
   if(row.errors.length){state.classList.add("is-bad");state.textContent="Lỗi: "+row.errors.join(" ");}
   else if(row.duplicateExisting||row.duplicateBatch){state.classList.add("is-duplicate");state.textContent=(row.duplicateExisting?"Đã có trong kho":"")+(row.duplicateExisting&&row.duplicateBatch?"; ":"")+(row.duplicateBatch?"Trùng dòng trong tệp":"")+(skip(row)?" · bỏ qua":" · vẫn nhập");}
   else{state.classList.add("is-good");state.textContent="Sẵn sàng nhập"+(row.warnings.length?" · "+row.warnings.join(" "):"");}
   cell.append(state);tr.append(line,data,cell);tbody.append(tr);
  }
  $b("bulkPreviewSummary").textContent=rows.length+" dòng · "+good+" hợp lệ · "+bad+" lỗi · "+dupes+" dòng trùng";
  $b("commitBulkImportBtn").disabled=add===0;$b("commitBulkImportBtn").textContent="Nhập "+add+" thẻ";$b("bulkCommitHint").textContent=bad?bad+" dòng lỗi sẽ không được nhập.":"Chỉ dữ liệu hợp lệ sẽ được lưu.";
  status("Đã kiểm tra "+sourceCount+" dòng. Có thể nhập "+add+" thẻ; "+bad+" dòng lỗi sẽ bị bỏ qua."+(dupes?" Phát hiện "+dupes+" dòng trùng.":""),bad?"error":(add?"ready":""));
 }
 function analyze(){
  const text=$b("bulkImportText").value;if(!text.trim()){rows=[];render();status("Hãy chọn tệp CSV/TSV hoặc dán bảng trước.","error");return;}
  try{rows=parseSource(text);sourceCount=rows.length;render();if(!rows.length)status("Không có dòng dữ liệu sau tiêu đề.","error");}
  catch(e){rows=[];sourceCount=0;render();status(e.message||"Không thể đọc bảng dữ liệu.","error");}
 }
 function downloadTemplate(){
  const headers=["Tên diễn viên","Tên phim","Vai diễn","Tên tiếng Trung","Giới tính","Phong cách","Độ hiếm","Mô tả","Ảnh URL"];
  const csv="\uFEFF"+headers.map(v=>'"'+v.replace(/"/g,'""')+'"').join(",")+"\r\n",blob=new Blob([csv],{type:"text/csv;charset=utf-8"}),url=URL.createObjectURL(blob),a=document.createElement("a");
  a.href=url;a.download="starry-cdrama-import-template.csv";a.click();window.setTimeout(()=>URL.revokeObjectURL(url),1000);showToast("Đã tải mẫu CSV nhập hàng loạt.");
 }
 function newId(){return "card-"+(globalThis.crypto?.randomUUID?.()||(Date.now().toString(36)+Math.random().toString(36).slice(2,10)));}
 async function commit(){
  const add=rows.filter(r=>!skip(r)),bad=rows.filter(r=>r.errors.length).length,dupes=rows.filter(r=>!r.errors.length&&$b("bulkSkipDuplicates").checked&&(r.duplicateExisting||r.duplicateBatch)).length;
  if(!add.length){status("Không có thẻ hợp lệ để nhập.","error");return;}
  if(!confirm("XÁC NHẬN NHẬP HÀNG LOẠT\n\nSẽ thêm: "+add.length+" thẻ\nBỏ qua vì lỗi: "+bad+"\nBỏ qua vì trùng: "+dupes+"\n\nKhông thay thế dữ liệu sưu tầm hiện có. Tiếp tục?"))return;
  const previous=JSON.parse(JSON.stringify(managerData));
  try{
   for(const item of add){const c=item.card;managerData.custom.push({id:newId(),...c,initials:makeInitials(c.chinese,c.name),symbol:"✦",...makeArt(c.rarity),photoFallback:null,...(c.photo?{photoCredit:"Ảnh từ URL nhập hàng loạt",photoLicense:"Không khai báo",photoSource:c.photo}:{photoCredit:"",photoLicense:"",photoSource:""})});}
   if(!await persistManagerData()){managerData=normalizeManagerData(previous);status("Lưu thất bại. Dữ liệu cũ được giữ nguyên; thử chia tệp nhỏ hơn.","error");return;}
   rebuildCharacters();const count=add.length;$b("bulkImportText").value="";$b("bulkImportFile").value="";rows=[];sourceCount=0;render();status("Đã nhập thành công "+count+" thẻ. Dữ liệu sở hữu và thẻ có sẵn được giữ nguyên.","ready");showToast("Đã nhập "+count+" thẻ hàng loạt.");
  }catch(e){managerData=normalizeManagerData(previous);status(e.message||"Có lỗi khi nhập; dữ liệu cũ chưa bị thay đổi.","error");}
 }
 $b("analyzeBulkImportBtn").addEventListener("click",analyze);
 $b("bulkSkipDuplicates").addEventListener("change",()=>{if(rows.length)render();});
 $b("downloadBulkTemplateBtn").addEventListener("click",downloadTemplate);
 $b("clearBulkImportBtn").addEventListener("click",()=>{$b("bulkImportText").value="";$b("bulkImportFile").value="";rows=[];sourceCount=0;render();status("Đã xóa nội dung bảng nhập.");});
 $b("bulkImportFile").addEventListener("change",async event=>{const file=event.target.files?.[0];if(!file)return;if(file.size>2*1024*1024){status("Tệp lớn hơn 2 MB. Hãy chia tệp nhỏ hơn.","error");event.target.value="";return;}try{$b("bulkImportText").value=await file.text();analyze();}catch(e){status(e.message||"Không đọc được tệp.","error");}});
 $b("commitBulkImportBtn").addEventListener("click",commit);
})();