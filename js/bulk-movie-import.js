/* V11.2 — bulk movie metadata importer. Records can exist without character cards. */
(function initBulkMovieImport(){
 const $m=id=>document.getElementById(id);
 const columns={title:["ten phim","phim","movie","drama","title","movie title"],originalTitle:["ten goc","ten tieng trung","original title","originaltitle","chinese title","ten trung"],year:["nam phat hanh","nam","year","release year","releaseyear"],genres:["the loai","genres","genre"],description:["mo ta","gioi thieu","description","synopsis","plot"],poster:["poster url","poster","posterurl","anh poster","duong dan poster","image url","poster link"]};
 let rows=[],totalRows=0;
 function status(msg,kind=""){const el=$m("movieBulkImportStatus");el.textContent=msg;el.classList.toggle("is-error",kind==="error");el.classList.toggle("is-ready",kind==="ready");}
 function headerKey(value){return normalizedSearchKey(value).replace(/[_-]+/g," ").trim();}
 function delimiterOf(text){const line=String(text).replace(/^\uFEFF/,"").split(/\r\n|\n|\r/).find(x=>x.trim())||"";return [",","\t",";"].map(delim=>{let count=0,q=false;for(let i=0;i<line.length;i++){if(line[i]==='"'&&q&&line[i+1]==='"'){i++;continue;}if(line[i]==='"'){q=!q;continue;}if(!q&&line[i]===delim)count++;}return {delim,count};}).sort((a,b)=>b.count-a.count)[0].delim;}
 function parseTable(text,delim){const out=[];let row=[],cell="",q=false;const src=String(text).replace(/^\uFEFF/,"");for(let i=0;i<src.length;i++){const ch=src[i];if(ch==='"'){if(q&&src[i+1]==='"'){cell+='"';i++;}else q=!q;}else if(ch===delim&&!q){row.push(cell);cell="";}else if((ch==="\r"||ch==="\n")&&!q){if(ch==="\r"&&src[i+1]==="\n")i++;row.push(cell);if(row.some(x=>String(x).trim()))out.push(row);row=[];cell="";}else cell+=ch;}if(q)throw Error("Có dấu ngoặc kép chưa đóng trong tệp phim.");row.push(cell);if(row.some(x=>String(x).trim()))out.push(row);return out.map(r=>r.map(x=>String(x??"").trim()));}
 function posterValue(value){if(!value)return {value:"",error:""};try{const u=new URL(value);return u.protocol==="http:"||u.protocol==="https:"?{value:u.href,error:""}:{value:"",error:"Poster URL phải dùng http:// hoặc https://."};}catch{return {value:"",error:"Poster URL không hợp lệ."};}}
 function parseSource(text){
  const table=parseTable(text,delimiterOf(text));if(table.length<2)throw Error("Cần dòng tiêu đề và ít nhất một dòng phim.");
  const heads=table[0].map(headerKey),map={};for(const [field,names] of Object.entries(columns)){const i=heads.findIndex(h=>names.includes(h));if(i>=0)map[field]=i;}
  if(map.title===undefined)throw Error("Thiếu cột bắt buộc “Tên phim”. Hãy tải mẫu CSV phim.");
  const input=table.slice(1).filter(r=>r.some(Boolean));if(input.length>500)throw Error("Mỗi lần chỉ nhập tối đa 500 phim. Hãy chia tệp nhỏ hơn.");
  const existing=new Set(Object.keys(managerData.movieMetadata||{})),seen=new Set();
  return input.map((cells,i)=>{
   const get=k=>map[k]===undefined?"":String(cells[map[k]]||"").trim(),title=titleCaseName(get("title")),originalTitle=get("originalTitle"),year=get("year"),rawGenres=get("genres"),description=get("description"),poster=posterValue(get("poster")),errors=[],warnings=[];
   if(!title)errors.push("Thiếu tên phim.");if(title.length>100)errors.push("Tên phim vượt 100 ký tự.");if(originalTitle.length>120)errors.push("Tên gốc vượt 120 ký tự.");
   if(year&&(!/^\d{4}$/.test(year)||Number(year)<1900||Number(year)>2100))errors.push("Năm phải là số từ 1900 đến 2100.");
   if(description.length>1200)errors.push("Mô tả vượt 1200 ký tự.");if(rawGenres.length>180)errors.push("Thể loại vượt 180 ký tự.");if(poster.error)errors.push(poster.error);
   let genres=[...new Set(rawGenres.split(/[;，、|]/).flatMap(x=>x.split(",")).map(x=>x.trim()).filter(Boolean))];if(genres.length>12){warnings.push("Chỉ giữ 12 thể loại đầu.");genres=genres.slice(0,12);}
   const key=movieMetadataKey(title),duplicateExisting=Boolean(key&&existing.has(key)),duplicateBatch=Boolean(key&&seen.has(key));if(key)seen.add(key);
   return {line:i+2,title,key,meta:{title,originalTitle,year,genres,description,poster:poster.value},errors,warnings,duplicateExisting,duplicateBatch};
  });
 }
 function keepOld(){return $m("movieBulkPreserveExisting").checked;}
 function skip(row){return row.errors.length>0||row.duplicateBatch;}
 function render(){
  const pane=$m("movieBulkImportPreview"),body=$m("movieBulkPreviewRows");if(!rows.length){pane.hidden=true;$m("commitMovieBulkBtn").disabled=true;return;}pane.hidden=false;body.replaceChildren();
  let valid=0,bad=0,existing=0,repeated=0,save=0;
  for(const row of rows){if(row.errors.length)bad++;else{valid++;if(row.duplicateExisting)existing++;if(row.duplicateBatch)repeated++;}if(!skip(row))save++;
   const tr=document.createElement("tr"),line=document.createElement("td"),data=document.createElement("td"),title=document.createElement("strong"),sub=document.createElement("small"),cell=document.createElement("td"),msg=document.createElement("span");
   line.textContent=String(row.line);data.className="bulk-preview-card";title.textContent=row.title||"(Thiếu tên phim)";sub.textContent=[row.meta.originalTitle,row.meta.year,row.meta.genres.join(" · ")].filter(Boolean).join(" · ")||"Chưa có metadata bổ sung";data.append(title,sub);msg.className="bulk-preview-status";
   if(row.errors.length){msg.classList.add("is-bad");msg.textContent="Lỗi: "+row.errors.join(" ");}
   else if(row.duplicateBatch){msg.classList.add("is-duplicate");msg.textContent="Trùng tên với dòng trước trong tệp · sẽ bỏ qua";}
   else if(row.duplicateExisting){msg.classList.add("is-duplicate");msg.textContent=keepOld()?"Hồ sơ đã có · chỉ bổ sung trường trống":"Hồ sơ đã có · trường CSV không trống sẽ cập nhật";}
   else{msg.classList.add("is-good");msg.textContent="Phim mới"+(row.warnings.length?" · "+row.warnings.join(" "):"");}
   cell.append(msg);tr.append(line,data,cell);body.append(tr);
  }
  $m("movieBulkPreviewSummary").textContent=rows.length+" dòng · "+valid+" hợp lệ · "+bad+" lỗi · "+existing+" phim đã có · "+repeated+" dòng lặp";
  $m("commitMovieBulkBtn").disabled=save===0;$m("commitMovieBulkBtn").textContent="Lưu "+save+" phim";$m("movieBulkCommitHint").textContent=bad?bad+" dòng lỗi và "+repeated+" dòng lặp sẽ bị bỏ qua.":"Các dòng hợp lệ sẽ được gộp vào danh mục phim.";
  status("Đã kiểm tra "+totalRows+" dòng. Sẽ xử lý "+save+" hồ sơ; "+bad+" dòng lỗi sẽ bị bỏ qua.",bad?"error":(save?"ready":""));
 }
 function analyze(){const text=$m("movieBulkImportText").value;if(!text.trim()){rows=[];render();status("Hãy chọn tệp hoặc dán bảng danh mục phim.","error");return;}try{rows=parseSource(text);totalRows=rows.length;render();if(!rows.length)status("Không tìm thấy phim sau dòng tiêu đề.","error");}catch(e){rows=[];totalRows=0;render();status(e.message||"Không đọc được danh mục phim.","error");}}
 function downloadTemplate(){const cols=["Tên phim","Tên gốc","Năm phát hành","Thể loại","Mô tả","Poster URL"],csv="\uFEFF"+cols.map(x=>'"'+x.replace(/"/g,'""')+'"').join(",")+"\r\n",blob=new Blob([csv],{type:"text/csv;charset=utf-8"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="starry-cdrama-movies-template.csv";a.click();window.setTimeout(()=>URL.revokeObjectURL(url),1000);showToast("Đã tải mẫu CSV danh mục phim.");}
 function merge(previous,incoming,preserve){
  const old=previous&&typeof previous==="object"?previous:{},oldGenres=Array.isArray(old.genres)?old.genres.map(String):String(old.genres||"").split(/[，,、]/).map(x=>x.trim()).filter(Boolean),out={title:String(old.title||incoming.title||"").trim()};
  for(const key of ["originalTitle","year","description","poster"]){const before=String(old[key]||"").trim(),next=String(incoming[key]||"").trim();out[key]=(preserve&&before)?before:(next||before);}
  out.genres=preserve&&oldGenres.length?oldGenres:(incoming.genres.length?incoming.genres:oldGenres);return out;
 }
 async function commit(){
  const valid=rows.filter(r=>!skip(r)),bad=rows.filter(r=>r.errors.length).length,repeated=rows.filter(r=>r.duplicateBatch).length,preserve=keepOld();
  if(!valid.length){status("Không có dòng hợp lệ để nhập.","error");return;}
  const msg="XÁC NHẬN NHẬP DANH MỤC PHIM\n\nThêm / cập nhật: "+valid.length+" phim\nDòng lỗi: "+bad+"\nDòng lặp bị bỏ qua: "+repeated+"\n"+(preserve?"Giữ metadata cũ, chỉ điền trường trống.":"Giá trị không trống trong CSV có thể cập nhật trường đã có.")+"\n\nKhông xóa thẻ hoặc tiến độ sưu tầm. Tiếp tục?";
  if(!confirm(msg))return;
  const previous=JSON.parse(JSON.stringify(managerData));
  try{
   if(!managerData.movieMetadata||typeof managerData.movieMetadata!=="object"||Array.isArray(managerData.movieMetadata))managerData.movieMetadata={};
   for(const row of valid)managerData.movieMetadata[row.key]=merge(managerData.movieMetadata[row.key],row.meta,preserve);
   if(!await persistManagerData()){managerData=normalizeManagerData(previous);status("Không lưu được danh mục phim; dữ liệu cũ được giữ nguyên.","error");return;}
   renderMovieMetadataManager();if(currentLibraryProfile?.type==="movie"&&valid.some(r=>movieMetadataKey(currentLibraryProfile.value)===r.key))renderLibraryProfile();
   const count=valid.length;$m("movieBulkImportText").value="";$m("movieBulkImportFile").value="";rows=[];totalRows=0;render();status("Đã lưu "+count+" hồ sơ phim. Phim chưa có thẻ vẫn xuất hiện trong danh mục và kệ phim.","ready");showToast("Đã nhập "+count+" hồ sơ phim.");
  }catch(e){managerData=normalizeManagerData(previous);status(e.message||"Có lỗi khi lưu; dữ liệu cũ chưa bị thay đổi.","error");}
 }
 $m("analyzeMovieBulkBtn").addEventListener("click",analyze);
 $m("movieBulkPreserveExisting").addEventListener("change",()=>{if(rows.length)render();});
 $m("downloadMovieTemplateBtn").addEventListener("click",downloadTemplate);
 $m("clearMovieBulkBtn").addEventListener("click",()=>{$m("movieBulkImportText").value="";$m("movieBulkImportFile").value="";rows=[];totalRows=0;render();status("Đã xóa nội dung bảng nhập phim.");});
 $m("movieBulkImportFile").addEventListener("change",async event=>{const file=event.target.files?.[0];if(!file)return;if(file.size>2*1024*1024){status("Tệp lớn hơn 2 MB. Hãy chia tệp nhỏ hơn.","error");event.target.value="";return;}try{$m("movieBulkImportText").value=await file.text();analyze();}catch(e){status(e.message||"Không đọc được tệp.","error");}});
 $m("commitMovieBulkBtn").addEventListener("click",commit);
})();