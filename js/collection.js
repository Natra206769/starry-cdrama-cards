/* collection.js — Thư viện, danh mục toàn hệ thống, lọc và liên kết diễn viên */
let collectionMode = "library";
let collectionViewMode = "grid";
let collectionSortMode = "rarity";
let collectionRarityFilter = "all";
let collectionStyleFilter = "all";
let collectionDisplayMode = "cards";
let collectionShelfGenreFilter = "all";
let collectionShelfYearFilter = "all";
let collectionShelfSortMode = "title";
let collectionShelfFocusFilter = "all";
let collectionSelectedPresetId = "";
let collectionShelfStatusFilter = "all";

function collectionMatchesFilter(card){
  const owned=(Number(state.owned[card.id])||0)>0;
  if(collectionMode==="library"&&!owned)return false;
  if(activeFilter==="male"&&card.gender!=="male")return false;
  if(activeFilter==="female"&&card.gender!=="female")return false;
  if(activeFilter==="favorites"&&!state.favorites.includes(card.id))return false;
  if(activeFilter==="missing"&&(collectionMode==="library"||owned))return false;
  if(collectionRarityFilter!=="all"&&card.rarity!==collectionRarityFilter)return false;
  if(collectionStyleFilter!=="all"&&normalizedSearchKey(displayStyleLabel(card.style))!==normalizedSearchKey(collectionStyleFilter))return false;
  const query=normalizedSearchKey($("collectionSearch")?.value||"");
  if(query){
    const haystack=normalizedSearchKey([card.movie,card.name,card.chinese,card.role,displayStyleLabel(card.style),card.rarity].filter(Boolean).join(" "));
    if(!haystack.includes(query))return false;
  }
  return true;
}
function readCollectionProgressForSort(id){
  const saved=state.cardProgress&&typeof state.cardProgress==="object"?state.cardProgress[id]:null;
  if(!saved||typeof saved!=="object")return {stars:1,level:1};
  return {
    stars:Math.max(1,Math.min(5,Math.floor(Number(saved.stars)||1))),
    level:Math.max(1,Math.min(MAX_CARD_LEVEL,Math.floor(Number(saved.level)||1)))
  };
}
function compareCollectionCards(a,b,rarityOrder){
  const ownedA=Number(state.owned[a.id])||0,ownedB=Number(state.owned[b.id])||0;
  if(collectionSortMode==="name")return compareVietnamese(a.name,b.name)||compareVietnamese(a.movie,b.movie);
  if(collectionSortMode==="copies")return ownedB-ownedA||compareVietnamese(a.name,b.name);
  if(collectionSortMode==="stars"){
    if(Boolean(ownedA)!==Boolean(ownedB))return Number(Boolean(ownedB))-Number(Boolean(ownedA));
    const progressA=readCollectionProgressForSort(a.id),progressB=readCollectionProgressForSort(b.id);
    return (progressB.stars-progressA.stars)||(progressB.level-progressA.level)||compareVietnamese(a.name,b.name);
  }
  if(collectionSortMode==="level"){
    if(Boolean(ownedA)!==Boolean(ownedB))return Number(Boolean(ownedB))-Number(Boolean(ownedA));
    const progressA=readCollectionProgressForSort(a.id),progressB=readCollectionProgressForSort(b.id);
    return (progressB.level-progressA.level)||(progressB.stars-progressA.stars)||compareVietnamese(a.name,b.name);
  }
  return (rarityOrder[a.rarity]??99)-(rarityOrder[b.rarity]??99)||compareVietnamese(a.name,b.name);
}
function getMoviePreference(movieName){
  const key=typeof movieMetadataKey==="function"?movieMetadataKey(movieName):normalizedSearchKey(movieName);
  const raw=managerData?.moviePreferences?.[key];
  return {favorite:Boolean(raw?.favorite),pinned:Boolean(raw?.pinned),wantToCollect:Boolean(raw?.wantToCollect)};
}
async function toggleMoviePreference(movieName,field){
  if(!["favorite","pinned","wantToCollect"].includes(field))return false;
  const key=typeof movieMetadataKey==="function"?movieMetadataKey(movieName):normalizedSearchKey(movieName);
  if(!key)return false;
  const before=JSON.parse(JSON.stringify(managerData||{}));
  if(!managerData.moviePreferences||typeof managerData.moviePreferences!=="object"||Array.isArray(managerData.moviePreferences))managerData.moviePreferences={};
  const current=getMoviePreference(movieName);
  managerData.moviePreferences[key]={...current,[field]:!current[field]};
  if(await persistManagerData()){
    renderCollection();
    if(typeof currentLibraryProfile!=="undefined"&&currentLibraryProfile?.type==="movie"&&normalizedSearchKey(currentLibraryProfile.value)===normalizedSearchKey(movieName))renderLibraryProfile();
    const labels={favorite:"yêu thích phim",pinned:"ghim phim",wantToCollect:"danh sách muốn sưu tầm"};
    showToast((!current[field]?"Đã thêm vào ":"Đã bỏ khỏi ")+labels[field]+": "+movieName);
    return true;
  }
  managerData=normalizeManagerData(before);return false;
}
function captureCollectionPresetSettings(){
  return {collectionMode,collectionDisplayMode,collectionViewMode,collectionSortMode,activeFilter,collectionRarityFilter,collectionStyleFilter,
    collectionShelfGenreFilter,collectionShelfYearFilter,collectionShelfSortMode,collectionShelfStatusFilter,collectionShelfFocusFilter,
    search:String($("collectionSearch")?.value||"")};
}
function renderCollectionPresetOptions(){
  const select=$("collectionPresetSelect");if(!select)return;
  const presets=Array.isArray(managerData?.collectionPresets)?managerData.collectionPresets:[];
  const selected=collectionSelectedPresetId||select.value;
  select.replaceChildren();
  const placeholder=document.createElement("option");placeholder.value="";placeholder.textContent="Chọn bộ lọc đã lưu…";select.appendChild(placeholder);
  presets.forEach(preset=>{const option=document.createElement("option");option.value=preset.id;option.textContent=preset.name;select.appendChild(option);});
  collectionSelectedPresetId=presets.some(preset=>preset.id===selected)?selected:"";
  select.value=collectionSelectedPresetId;
  const remove=$("deleteCollectionPresetBtn");if(remove)remove.disabled=!collectionSelectedPresetId;
}
async function saveCollectionPreset(){
  const rawName=prompt("Đặt tên cho bộ lọc hiện tại (ví dụ: Phim cổ trang còn thiếu):");
  const name=String(rawName||"").trim().slice(0,60);if(!name)return;
  const before=JSON.parse(JSON.stringify(managerData||{}));
  if(!Array.isArray(managerData.collectionPresets))managerData.collectionPresets=[];
  const existing=managerData.collectionPresets.find(item=>normalizedSearchKey(item.name)===normalizedSearchKey(name));
  if(existing&&!confirm("Đã có bộ lọc tên “"+existing.name+"”. Ghi đè bằng thiết lập hiện tại?"))return;
  const preset=existing||{id:"filter-"+(globalThis.crypto?.randomUUID?.()||Date.now().toString(36)+Math.random().toString(36).slice(2,8)),name};
  preset.name=name;preset.settings=captureCollectionPresetSettings();
  if(existing)managerData.collectionPresets=managerData.collectionPresets.map(item=>item.id===existing.id?preset:item);
  else{
    if(managerData.collectionPresets.length>=50){showToast("Bạn đã lưu tối đa 50 bộ lọc. Hãy xóa một bộ lọc cũ trước.");managerData=normalizeManagerData(before);return;}
    managerData.collectionPresets.push(preset);
  }
  if(await persistManagerData()){collectionSelectedPresetId=preset.id;renderCollection();showToast("Đã lưu bộ lọc “"+name+"”.");}
  else managerData=normalizeManagerData(before);
}
function applyCollectionPreset(id){
  const preset=(managerData?.collectionPresets||[]).find(item=>item.id===id);if(!preset?.settings)return;
  const settings=preset.settings;
  collectionMode=["library","discover"].includes(settings.collectionMode)?settings.collectionMode:"library";
  collectionDisplayMode=["cards","movies"].includes(settings.collectionDisplayMode)?settings.collectionDisplayMode:"cards";
  collectionViewMode=["grid","list"].includes(settings.collectionViewMode)?settings.collectionViewMode:"grid";
  collectionSortMode=["rarity","name","stars","level","copies"].includes(settings.collectionSortMode)?settings.collectionSortMode:"rarity";
  activeFilter=["all","missing","male","female","favorites"].includes(settings.activeFilter)?settings.activeFilter:"all";
  const savedRarity=settings.collectionRarityFilter==="N"?"R":settings.collectionRarityFilter;
  collectionRarityFilter=["all","R","SR","SSR","SSR+","UR","SP"].includes(savedRarity)?savedRarity:"all";
  collectionStyleFilter=String(settings.collectionStyleFilter||"all");
  collectionShelfGenreFilter=String(settings.collectionShelfGenreFilter||"all");
  collectionShelfYearFilter=String(settings.collectionShelfYearFilter||"all");
  collectionShelfSortMode=["title","year","progress","cards"].includes(settings.collectionShelfSortMode)?settings.collectionShelfSortMode:"title";
  collectionShelfStatusFilter=["all","in-progress","complete","not-started"].includes(settings.collectionShelfStatusFilter)?settings.collectionShelfStatusFilter:"all";
  collectionShelfFocusFilter=["all","favorites","watchlist","pinned"].includes(settings.collectionShelfFocusFilter)?settings.collectionShelfFocusFilter:"all";
  collectionSelectedPresetId=preset.id;
  if($("collectionSearch"))$("collectionSearch").value=String(settings.search||"");
  if($("clearCollectionSearch"))$("clearCollectionSearch").hidden=!String(settings.search||"");
  if($("collectionSortSelect"))$("collectionSortSelect").value=collectionSortMode;
  if($("collectionRarityFilter"))$("collectionRarityFilter").value=collectionRarityFilter;
  if($("collectionMovieSortSelect"))$("collectionMovieSortSelect").value=collectionShelfSortMode;
  if($("collectionMovieStatusFilter"))$("collectionMovieStatusFilter").value=collectionShelfStatusFilter;
  if($("collectionMovieFocusFilter"))$("collectionMovieFocusFilter").value=collectionShelfFocusFilter;
  renderCollection();showToast("Đã áp dụng bộ lọc “"+preset.name+"”.");
}
async function deleteCollectionPreset(){
  const id=$("collectionPresetSelect")?.value;
  const preset=(managerData?.collectionPresets||[]).find(item=>item.id===id);if(!preset)return;
  if(!confirm("Xóa bộ lọc đã lưu “"+preset.name+"”?"))return;
  const before=JSON.parse(JSON.stringify(managerData||{}));
  managerData.collectionPresets=managerData.collectionPresets.filter(item=>item.id!==id);
  collectionSelectedPresetId="";if(await persistManagerData()){renderCollection();showToast("Đã xóa bộ lọc đã lưu.");}
  else managerData=normalizeManagerData(before);
}
function syncCollectionControls(){
  document.querySelectorAll("[data-collection-mode]").forEach(button=>{
    const active=button.dataset.collectionMode===collectionMode;
    button.classList.toggle("active",active);button.setAttribute("aria-selected",String(active));
  });
  document.querySelectorAll("[data-collection-view]").forEach(button=>{
    const active=button.dataset.collectionView===collectionViewMode;
    button.classList.toggle("active",active);button.setAttribute("aria-pressed",String(active));
  });
  document.querySelectorAll("[data-collection-display]").forEach(button=>{
    const active=button.dataset.collectionDisplay===collectionDisplayMode;
    button.classList.toggle("active",active);button.setAttribute("aria-pressed",String(active));
  });
  const shelfMode=collectionDisplayMode==="movies";
  const filters=$("collectionShelfFilters"),shelf=$("collectionMovieShelf"),sets=$("collectionSets");
  if(filters)filters.hidden=!shelfMode;
  if(shelf)shelf.hidden=!shelfMode;
  if(sets)sets.hidden=shelfMode;
  const cardFilters=document.querySelector(".collection-filter-panel"),raritySummary=$("collectionRaritySummary"),rarityPanel=$("collectionRarityPanel");
  if(cardFilters)cardFilters.hidden=shelfMode;
  if(rarityPanel)rarityPanel.hidden=shelfMode;
  if(raritySummary)raritySummary.hidden=false;
  const cardSort=$("collectionSortSelect")?.closest(".collection-select-wrap");
  if(cardSort)cardSort.hidden=shelfMode;
  const viewSwitch=document.querySelector(".collection-view-switch");
  if(viewSwitch)viewSwitch.hidden=shelfMode;
  document.querySelectorAll(".filter").forEach(button=>{
    const active=button.dataset.filter===activeFilter;
    button.classList.toggle("active",active);button.setAttribute("aria-pressed",String(active));
    if(button.dataset.filter==="missing")button.hidden=collectionMode==="library";
  });
  if($("collectionTitlePrefix"))$("collectionTitlePrefix").textContent=collectionMode==="library"?"Thư viện":"Khám phá";
  if($("collectionTitleEm"))$("collectionTitleEm").textContent=collectionMode==="library"?"của tôi":"kho thẻ";
  if($("collectionEyebrow"))$("collectionEyebrow").textContent=collectionMode==="library"?"YOUR PERSONAL DRAMA LIBRARY":"EXPLORE THE FULL CARD CATALOG";
  if($("collectionSubtitle"))$("collectionSubtitle").textContent=collectionMode==="library"?"Những thẻ bạn đã sở hữu, các phiên bản đã nâng cấp và phim đang sưu tầm.":"Tra cứu toàn bộ thẻ trên hệ thống, xem thẻ còn thiếu và khám phá diễn viên theo từng phim.";
  if($("countAllLabel"))$("countAllLabel").textContent=collectionMode==="library"?"Thẻ của tôi":"Toàn bộ kho";
  if($("collectionSearch"))$("collectionSearch").setAttribute("aria-label",collectionMode==="library"?"Tìm trong thư viện của tôi":"Tìm trong toàn bộ kho thẻ");
  renderCollectionPresetOptions();
}
function renderCollectionStyleOptions(){
  const select=$("collectionStyleFilter");if(!select)return;
  const current=collectionStyleFilter;
  const styles=[...new Set(characters.map(card=>displayStyleLabel(card.style)).filter(Boolean))].sort(compareVietnamese);
  select.replaceChildren();
  const all=document.createElement("option");all.value="all";all.textContent="Tất cả";select.appendChild(all);
  for(const style of styles){const option=document.createElement("option");option.value=style;option.textContent=style;select.appendChild(option);}
  select.value=styles.includes(current)?current:"all";
  collectionStyleFilter=select.value;
}
function renderCollectionOverview(){
  const overview=$("collectionOverview");if(!overview)return;
  const ownedCards=characters.filter(card=>(Number(state.owned[card.id])||0)>0);
  const sourceCards=collectionMode==="library"?ownedCards:characters;
  const movies=new Set(sourceCards.map(card=>String(card.movie||"").trim()).filter(movie=>movie&&!isGenericCollectionTitle(movie)));
  const actors=new Set(sourceCards.map(card=>normalizedSearchKey(card.name)).filter(Boolean));
  const uniqueOwned=ownedCards.length;
  const completion=characters.length?Math.round(uniqueOwned/characters.length*100):0;
  const stats=[
    {label:collectionMode==="library"?"Phim trong thư viện":"Phim trong kho",value:movies.size,detail:"Bộ phim khác nhau"},
    {label:collectionMode==="library"?"Diễn viên đã có":"Diễn viên trong kho",value:actors.size,detail:"Tên diễn viên khác nhau"},
    {label:collectionMode==="library"?"Thẻ trong thư viện":"Tổng biến thể thẻ",value:collectionMode==="library"?uniqueOwned:characters.length,detail:"Thẻ khác nhau"},
    {label:"Tiến độ sưu tầm",value:completion+"%",detail:uniqueOwned+" / "+characters.length+" thẻ"}
  ];
  overview.replaceChildren();
  for(const item of stats){
    const card=document.createElement("div");card.className="collection-stat-card";
    const label=document.createElement("span");label.textContent=item.label;
    const value=document.createElement("strong");value.textContent=String(item.value);
    const detail=document.createElement("small");detail.textContent=item.detail;
    card.append(label,value,detail);overview.appendChild(card);
  }
}
// Small tactile reveal when a collection card is tapped. This is purely visual;
// ownership, favorites, localStorage and IndexedDB are not modified by the effect.
function animateCollectionCard(article, afterAnimation){
  if(!article || article.dataset.tapBusy === "1")return;
  article.dataset.tapBusy = "1";
  article.classList.remove("is-tapped");
  void article.offsetWidth;
  article.classList.add("is-tapped");
  window.setTimeout(()=>{
    article.classList.remove("is-tapped");
    delete article.dataset.tapBusy;
    if(article.isConnected && article.closest("#page-collection")?.classList.contains("active")){
      if(typeof afterAnimation === "function")afterAnimation();
    }
  }, 360);
}
function renderCollectionRaritySummary(){
  const summary=$("collectionRaritySummary");if(!summary)return;
  summary.replaceChildren();
  const heading=document.createElement("div");heading.className="collection-rarity-summary-heading";
  const title=document.createElement("strong");title.textContent=collectionMode==="library"?"Tiến độ thư viện theo độ hiếm":"Tiến độ kho thẻ toàn hệ thống";
  const note=document.createElement("small");note.textContent="Đã sưu tầm / tổng số thẻ khác nhau trong kho";
  heading.append(title,note);summary.appendChild(heading);
  const tiers=document.createElement("div");tiers.className="collection-rarity-summary-tiers";
  for(const [rarity,info] of Object.entries(rarityInfo)){
    const tierCards=characters.filter(card=>card.rarity===rarity);
    // Hide rarity tiers that do not exist anywhere in the system catalog.
    if(!tierCards.length)continue;
    const owned=tierCards.filter(card=>(Number(state.owned[card.id])||0)>0).length;
    const item=document.createElement("div");item.className="collection-rarity-total rarity-"+rarityCssKey(rarity);
    const label=document.createElement("strong");label.textContent=rarity;
    const count=document.createElement("span");count.textContent=`${owned} / ${tierCards.length}`;
    const caption=document.createElement("small");caption.textContent="đã có / tổng";
    const track=document.createElement("span");track.className="collection-rarity-track";track.setAttribute("aria-hidden","true");
    const fill=document.createElement("i");fill.style.width=(owned/tierCards.length*100)+"%";track.appendChild(fill);
    item.setAttribute("aria-label",`${rarity}: đã sưu tầm ${owned} trên tổng ${tierCards.length} thẻ trong toàn bộ phim`);
    item.append(label,count,caption,track);tiers.appendChild(item);
  }
  if(!tiers.children.length){const empty=document.createElement("p");empty.className="collection-rarity-summary-empty";empty.textContent="Kho thẻ chưa có dữ liệu để thống kê.";summary.appendChild(empty);return;}
  summary.appendChild(tiers);
}
function collectionMovieGroups(){
  const grouped=new Map();
  for(const card of characters){
    const movie=String(card.movie||"").trim().replace(/\s+/g," ");
    if(!movie||isGenericCollectionTitle(movie))continue;
    const key=normalizedSearchKey(movie);if(!key)continue;
    if(!grouped.has(key))grouped.set(key,{key,movie,cards:[]});
    grouped.get(key).cards.push(card);
  }
  // The movie catalog is independent from cards, so registered no-card movies stay visible.
  if(typeof movieMetadataEntries==="function")for(const entry of movieMetadataEntries()){
    if(!grouped.has(entry.key))grouped.set(entry.key,{key:entry.key,movie:entry.title,cards:[]});
  }
  return [...grouped.values()].map(group=>{
    const metadata=typeof getMovieMetadata==="function"?getMovieMetadata(group.movie):null;
    const ownedCards=group.cards.filter(card=>(Number(state.owned[card.id])||0)>0);
    return {...group,isStandalone:group.cards.length===0,metadata,ownedUnique:ownedCards.length,ownedCopies:ownedCards.reduce((sum,card)=>sum+(Number(state.owned[card.id])||0),0),
      genres:(metadata?.genres||[]).map(value=>String(value).trim()).filter(Boolean),year:String(metadata?.year||"").trim(),
      posterCard:ownedCards.find(card=>card.photo)||group.cards.find(card=>card.photo)||group.cards[0]};
  });
}
function collectionSetOptions(select,items,current,allLabel,noneLabel){
  if(!select)return "all";
  const previous=current,unique=new Map();
  items.forEach(item=>{const value=String(item.value||"").trim();if(value&&!unique.has(value))unique.set(value,String(item.label||value));});
  select.replaceChildren();
  const all=document.createElement("option");all.value="all";all.textContent=allLabel;select.appendChild(all);
  [...unique.entries()].sort((a,b)=>compareVietnamese(a[1],b[1])).forEach(([value,label])=>{
    const option=document.createElement("option");option.value=value;option.textContent=label;select.appendChild(option);
  });
  if(noneLabel){const none=document.createElement("option");none.value="__none__";none.textContent=noneLabel;select.appendChild(none);}
  select.value=[...select.options].some(option=>option.value===previous)?previous:"all";
  return select.value;
}
function renderCollectionMovieFilterOptions(movies){
  const genres=new Map();movies.forEach(movie=>movie.genres.forEach(genre=>{const key=normalizedSearchKey(genre);if(key&&!genres.has(key))genres.set(key,genre);}));
  collectionShelfGenreFilter=collectionSetOptions($("collectionMovieGenreFilter"),[...genres].map(([value,label])=>({value,label})),collectionShelfGenreFilter,"Tất cả thể loại","Chưa phân loại");
  const years=[...new Set(movies.map(movie=>movie.year).filter(Boolean))].sort((a,b)=>Number(b)-Number(a));
  const select=$("collectionMovieYearFilter"),previous=collectionShelfYearFilter;
  if(select){
    select.replaceChildren();const all=document.createElement("option");all.value="all";all.textContent="Tất cả năm";select.appendChild(all);
    years.forEach(year=>{const option=document.createElement("option");option.value=year;option.textContent=year;select.appendChild(option);});
    const none=document.createElement("option");none.value="__none__";none.textContent="Chưa có năm";select.appendChild(none);
    select.value=[...select.options].some(option=>option.value===previous)?previous:"all";collectionShelfYearFilter=select.value;
  }
  const focus=$("collectionMovieFocusFilter");if(focus)focus.value=collectionShelfFocusFilter;
}
function collectionMovieStatus(movie){
  if(!movie.ownedUnique)return "not-started";
  if(movie.ownedUnique>=movie.cards.length)return "complete";
  return "in-progress";
}
function collectionMovieMatchesShelfQuery(movie,query){
  if(collectionShelfYearFilter==="__none__"&&movie.year)return false;
  if(collectionShelfYearFilter!=="all"&&collectionShelfYearFilter!=="__none__"&&movie.year!==collectionShelfYearFilter)return false;
  if(collectionShelfGenreFilter==="__none__"&&movie.genres.length)return false;
  if(collectionShelfGenreFilter!=="all"&&collectionShelfGenreFilter!=="__none__"&&!movie.genres.some(genre=>normalizedSearchKey(genre)===collectionShelfGenreFilter))return false;
  const preference=getMoviePreference(movie.movie);
  if(collectionShelfFocusFilter==="favorites"&&!preference.favorite)return false;
  if(collectionShelfFocusFilter==="watchlist"&&!preference.wantToCollect)return false;
  if(collectionShelfFocusFilter==="pinned"&&!preference.pinned)return false;
  if(query){
    const searchable=[movie.movie,movie.year,movie.metadata?.originalTitle,movie.metadata?.description,...movie.genres,...movie.cards.flatMap(card=>[card.name,card.role,card.chinese])].filter(Boolean).join(" ");
    if(!normalizedSearchKey(searchable).includes(query))return false;
  }
  return true;
}
function collectionMakeContinueCard(movie){
  const button=document.createElement("button");button.type="button";button.className="movie-continue-card";
  const imageWrap=document.createElement("span");imageWrap.className="movie-continue-poster";
  const fallback=document.createElement("strong");fallback.textContent=movie.posterCard?.initials||makeInitials(movie.posterCard?.chinese,movie.movie);imageWrap.appendChild(fallback);
  const source=movie.metadata?.poster||movie.posterCard?.photo||movie.posterCard?.photoFallback;
  if(source){
    const img=document.createElement("img");img.alt="";img.loading="lazy";img.referrerPolicy="no-referrer";img.src=source;
    img.onload=()=>imageWrap.classList.add("has-poster");img.onerror=()=>img.remove();imageWrap.appendChild(img);
  }
  const copy=document.createElement("span");copy.className="movie-continue-copy";
  const title=document.createElement("strong");title.textContent=movie.movie;
  const count=document.createElement("small");count.textContent=movie.ownedUnique+"/"+movie.cards.length+" phiên bản";
  const progress=document.createElement("span");progress.className="movie-shelf-progress";
  const fill=document.createElement("span");fill.style.width=(movie.ownedUnique/movie.cards.length*100)+"%";progress.appendChild(fill);
  const action=document.createElement("span");action.className="movie-continue-action";action.textContent="Tiếp tục →";
  copy.append(title,count,progress,action);button.append(imageWrap,copy);
  button.setAttribute("aria-label","Tiếp tục sưu tầm "+movie.movie+", đã có "+movie.ownedUnique+" trên "+movie.cards.length+" phiên bản");
  button.addEventListener("click",()=>openMovieProfile(movie.movie));
  return button;
}
function renderCollectionMovieShelf(){
  const shelf=$("collectionMovieShelf"),empty=$("emptyState");if(!shelf||!empty)return;
  shelf.replaceChildren();
  const allMovies=collectionMovieGroups();renderCollectionMovieFilterOptions(allMovies);
  const statusSelect=$("collectionMovieStatusFilter");
  if(statusSelect)statusSelect.value=collectionShelfStatusFilter;
  const query=normalizedSearchKey($("collectionSearch")?.value||"");
  const matchesQuery=movie=>collectionMovieMatchesShelfQuery(movie,query);
  if(collectionShelfStatusFilter==="all"||collectionShelfStatusFilter==="in-progress"){
    const continueMovies=allMovies.filter(movie=>collectionMovieStatus(movie)==="in-progress"&&matchesQuery(movie))
      .sort((a,b)=>(b.ownedUnique/b.cards.length)-(a.ownedUnique/a.cards.length)||compareVietnamese(a.movie,b.movie)).slice(0,4);
    if(continueMovies.length){
      const section=document.createElement("section");section.className="movie-continue-section";
      const heading=document.createElement("div");heading.className="movie-continue-heading";
      const title=document.createElement("h3");title.textContent="Tiếp tục sưu tầm";
      const caption=document.createElement("p");caption.textContent="Các phim bạn đã bắt đầu, ưu tiên phim gần hoàn thành.";
      heading.append(title,caption);
      const cards=document.createElement("div");cards.className="movie-continue-grid";
      continueMovies.forEach(movie=>cards.appendChild(collectionMakeContinueCard(movie)));
      section.append(heading,cards);shelf.appendChild(section);
    }
  }
  const movies=allMovies.filter(movie=>{
    if(collectionMode==="library"&&!movie.ownedUnique&&!movie.isStandalone&&collectionShelfStatusFilter!=="not-started")return false;
    if(collectionShelfStatusFilter!=="all"&&collectionMovieStatus(movie)!==collectionShelfStatusFilter)return false;
    return matchesQuery(movie);
  });
  movies.sort((a,b)=>{
    const prefA=getMoviePreference(a.movie),prefB=getMoviePreference(b.movie);
    if(prefA.pinned!==prefB.pinned)return Number(prefB.pinned)-Number(prefA.pinned);
    if(prefA.favorite!==prefB.favorite)return Number(prefB.favorite)-Number(prefA.favorite);
    if(collectionShelfSortMode==="year")return (Number(b.year)||0)-(Number(a.year)||0)||compareVietnamese(a.movie,b.movie);
    if(collectionShelfSortMode==="progress")return (b.ownedUnique/Math.max(1,b.cards.length))-(a.ownedUnique/Math.max(1,a.cards.length))||compareVietnamese(a.movie,b.movie);
    if(collectionShelfSortMode==="cards")return b.cards.length-a.cards.length||compareVietnamese(a.movie,b.movie);
    return compareVietnamese(a.movie,b.movie);
  });
  for(const movie of movies){
    const card=document.createElement("article");card.className="movie-shelf-card";
    const status=collectionMovieStatus(movie);
    const statusBadge=document.createElement("span");statusBadge.className="movie-shelf-status status-"+status;
    statusBadge.textContent=status==="complete"?"✓ Hoàn thành":status==="in-progress"?"Đang sưu tầm":"Chưa bắt đầu";
    const info=rarityInfo[movie.posterCard?.rarity]||rarityInfo.R;
    card.style.setProperty("--movie-accent",movie.posterCard?.accent||info.color);
    const poster=document.createElement("span");poster.className="movie-shelf-poster";
    const fallback=document.createElement("span");fallback.className="movie-shelf-fallback";fallback.textContent=movie.posterCard?.initials||makeInitials(movie.posterCard?.chinese,movie.movie);poster.appendChild(fallback);
    const sources=[movie.metadata?.poster,movie.posterCard?.photo,movie.posterCard?.photoFallback].filter((value,index,array)=>value&&array.indexOf(value)===index);
    if(sources.length){
      const image=document.createElement("img");image.alt="Poster "+movie.movie;image.loading="lazy";image.referrerPolicy="no-referrer";
      let sourceIndex=0;image.onerror=()=>{sourceIndex++;if(sourceIndex<sources.length){image.src=sources[sourceIndex];return;}image.remove();poster.classList.add("is-placeholder");};
      image.onload=()=>poster.classList.add("has-poster");image.src=sources[sourceIndex];poster.appendChild(image);
    }else poster.classList.add("is-placeholder");
    const topper=document.createElement("span");topper.className="movie-shelf-topline";topper.textContent=movie.year||"PHIM";poster.appendChild(topper);
    const body=document.createElement("span");body.className="movie-shelf-copy";
    const title=document.createElement("strong");title.textContent=movie.movie;
    const original=document.createElement("small");original.className="movie-shelf-original";original.textContent=movie.metadata?.originalTitle||"Chưa bổ sung tên gốc";
    const genres=document.createElement("span");genres.className="movie-shelf-genres";genres.textContent=movie.genres.slice(0,3).join(" · ")||(movie.metadata?.year?"Chưa phân loại":"Bổ sung thể loại trong Quản lý phim");
    const progressText=document.createElement("span");progressText.className="movie-shelf-progress-text";progressText.textContent=movie.cards.length?movie.ownedUnique+"/"+movie.cards.length+" phiên bản · "+movie.ownedCopies+" bản sao":"Chưa có thẻ liên kết";
    const progress=document.createElement("span");progress.className="movie-shelf-progress"+(!movie.cards.length?" is-empty":"");progress.setAttribute("role","progressbar");progress.setAttribute("aria-valuemin","0");progress.setAttribute("aria-valuemax",String(Math.max(1,movie.cards.length)));progress.setAttribute("aria-valuenow",String(movie.ownedUnique));progress.setAttribute("aria-label","Tiến độ sưu tầm "+movie.movie);
    const fill=document.createElement("span");fill.style.width=(movie.cards.length?movie.ownedUnique/movie.cards.length*100:0)+"%";progress.appendChild(fill);
    const action=document.createElement("span");action.className="movie-shelf-action";action.textContent="Mở hồ sơ phim ↗";
    body.append(title,original,genres,progressText,progress,action);
    const openButton=document.createElement("button");openButton.type="button";openButton.className="movie-shelf-open";openButton.setAttribute("aria-label","Mở hồ sơ phim "+movie.movie+". Đã sưu tầm "+movie.ownedUnique+" trên "+movie.cards.length+" phiên bản.");
    openButton.append(poster,body);openButton.addEventListener("click",event=>{event.preventDefault();event.stopPropagation();openMovieProfile(movie.movie);});
    const actions=document.createElement("div");actions.className="movie-shelf-actions";
    const preference=getMoviePreference(movie.movie);
    const createMovieAction=(field,activeIcon,inactiveIcon,activeLabel,inactiveLabel)=>{
      const button=document.createElement("button");button.type="button";button.className="movie-shelf-action-btn"+(preference[field]?" is-active":"");
      button.textContent=preference[field]?activeIcon:inactiveIcon;button.title=preference[field]?activeLabel:inactiveLabel;
      button.setAttribute("aria-label",button.title+" · "+movie.movie);button.setAttribute("aria-pressed",String(preference[field]));
      button.addEventListener("click",()=>toggleMoviePreference(movie.movie,field));return button;
    };
    actions.append(createMovieAction("favorite","♥","♡","Bỏ yêu thích phim","Yêu thích phim"),
      createMovieAction("wantToCollect","✓","＋","Bỏ khỏi danh sách muốn sưu tầm","Muốn sưu tầm phim"),
      createMovieAction("pinned","⌖","⌁","Bỏ ghim phim","Ghim phim lên đầu kệ"));
    card.append(openButton,statusBadge,actions);shelf.appendChild(card);
  }
  const noOwned=collectionMode==="library"&&allMovies.every(movie=>!movie.ownedUnique);
  const showEmpty=movies.length===0;
  empty.hidden=!showEmpty;
  const title=empty.querySelector("h3"),description=empty.querySelector("p"),button=$("emptyOpenBtn");
  if(noOwned&&showEmpty){title.textContent="Chưa có phim trong thư viện";description.textContent="Khi bạn sở hữu thẻ thuộc một bộ phim, phim đó sẽ xuất hiện trên kệ. Bạn cũng có thể chuyển sang Khám phá kho thẻ.";button.hidden=false;}
  else if(showEmpty){title.textContent="Không có phim phù hợp";description.textContent="Thử từ khóa khác hoặc đổi bộ lọc năm/thể loại để xem thêm phim.";button.hidden=true;}
  else{button.hidden=true;}
  const result=$("collectionResultCount");if(result)result.textContent=movies.length+" phim · "+(collectionMode==="library"?"đang sưu tầm":"trong danh mục")+" · Kệ phim";
  $("countAll").textContent=collectionMode==="library"?characters.filter(card=>(Number(state.owned[card.id])||0)>0).length:characters.length;
}
function renderCollection(){
  const container=$("collectionSets");if(!container)return;container.replaceChildren();
  syncCollectionControls();
  renderCollectionStyleOptions();
  renderCollectionOverview();
  if(collectionDisplayMode==="movies"){
    renderCollectionMovieShelf();
    renderCollectionRaritySummary();
    return;
  }
  renderCollectionRaritySummary();
  const grouped=new Map();
  for(const card of characters){
    const movie=String(card.movie||"Bộ sưu tập chân dung").trim().replace(/\s+/g," ")||"Bộ sưu tập chân dung";
    const key=normalizedSearchKey(movie);
    if(!grouped.has(key))grouped.set(key,{movie,cards:[]});
    grouped.get(key).cards.push(card);
  }
  const rarityOrder={SP:0,UR:1,"SSR+":2,SSR:3,SR:4,R:5};
  const movieGroups=[...grouped.values()].sort((a,b)=>compareVietnamese(a.movie,b.movie));
  let visibleCount=0,visibleMovies=0;
  for(const {movie,cards:allCards} of movieGroups){
    const cards=allCards.filter(collectionMatchesFilter).sort((a,b)=>compareCollectionCards(a,b,rarityOrder));
    if(!cards.length)continue;
    visibleCount+=cards.length;visibleMovies++;
    const ownedUnique=allCards.filter(card=>(Number(state.owned[card.id])||0)>0).length;
    const missingUnique=allCards.length-ownedUnique;
    const set=document.createElement("section");set.className="film-set";
    const head=document.createElement("div");head.className="film-set-heading";
    const titleWrap=document.createElement("div");titleWrap.className="film-set-title-wrap";
    const eyebrow=document.createElement("p");eyebrow.className="film-set-eyebrow";eyebrow.textContent="DRAMA COLLECTION";
    const titleRow=document.createElement("div");titleRow.className="film-title-row";
    const title=document.createElement("h3");title.textContent=movie;
    titleRow.appendChild(title);
    const openMovieBtn=document.createElement("button");openMovieBtn.type="button";openMovieBtn.className="film-open-profile";openMovieBtn.textContent="Chi tiết ↗";openMovieBtn.setAttribute("aria-label","Mở trang phim "+movie);
    openMovieBtn.addEventListener("click",event=>{event.preventDefault();event.stopPropagation();openMovieProfile(movie);});
    titleRow.appendChild(openMovieBtn);
    const count=document.createElement("p");count.className="film-set-count";count.textContent=`${ownedUnique} / ${allCards.length} thẻ đã sưu tầm · ${missingUnique} thẻ còn thiếu`;
    titleWrap.append(eyebrow,titleRow,count);
    const progress=document.createElement("div");progress.className="film-progress";progress.setAttribute("role","progressbar");progress.setAttribute("aria-valuemin","0");progress.setAttribute("aria-valuemax",String(allCards.length));progress.setAttribute("aria-valuenow",String(ownedUnique));progress.setAttribute("aria-label","Tiến độ "+movie);
    const fill=document.createElement("span");fill.style.width=(allCards.length?ownedUnique/allCards.length*100:0)+"%";progress.appendChild(fill);
    head.append(titleWrap,progress);set.appendChild(head);

    // Always show all six rarity tiers. Counts measure distinct card entries owned at least once,
    // not duplicate copies, and remain based on the complete system catalog even when filtered.
    const stats=document.createElement("div");stats.className="film-rarity-stats";stats.setAttribute("aria-label","Thống kê đã có và còn thiếu theo độ hiếm của "+movie);
    for(const rarity of Object.keys(rarityInfo)){
      const tierCards=allCards.filter(card=>card.rarity===rarity);
      if(!tierCards.length)continue;
      const ownedTier=tierCards.filter(card=>(Number(state.owned[card.id])||0)>0).length;
      const missingTier=tierCards.length-ownedTier;
      const stat=document.createElement("span");stat.className="film-rarity-stat rarity-"+rarityCssKey(rarity);
      const tier=document.createElement("strong");tier.textContent=rarity;
      const quantity=document.createElement("small");quantity.textContent=`${ownedTier} có / ${missingTier} thiếu`;
      stat.append(tier,quantity);stats.appendChild(stat);
    }
    set.appendChild(stats);

    const grid=document.createElement("div");grid.className="collection-grid"+(collectionViewMode==="list"?" collection-list-view":"");
    for(const card of cards){
      const owned=(Number(state.owned[card.id])||0)>0;const info=rarityInfo[card.rarity]||rarityInfo.R;
      const article=document.createElement("article");article.className="mini-card rarity-"+rarityCssKey(card.rarity||"SR")+(owned?"":" is-locked");
      if(owned){
        const progress=getCardProgress(card.id);article.classList.add("owned-star-level-"+progress.stars);
        const starFrame=document.createElement("span");starFrame.className="mini-star-frame star-frame-"+progress.stars;starFrame.setAttribute("aria-hidden","true");article.appendChild(starFrame);
        article.setAttribute("role","button");article.setAttribute("tabindex","0");article.setAttribute("aria-label","Xem thẻ "+card.name+" trong phim "+movie+", "+progress.stars+" sao");article.title="Nhấn để xem thẻ "+card.name;
        const activateOwnedCard=()=>animateCollectionCard(article,()=>showCharacterDetails(card.id));
        article.addEventListener("click",activateOwnedCard);
        article.addEventListener("keydown",event=>{if((event.key==="Enter"||event.key===" ")&&event.target===article){event.preventDefault();activateOwnedCard();}});
      }else{
        article.setAttribute("aria-label","Chưa sở hữu thẻ "+card.name+" trong phim "+movie);article.title="Mở thẻ ngẫu nhiên để sưu tầm thẻ này";
        article.addEventListener("click",()=>animateCollectionCard(article,()=>showToast("Bạn chưa sở hữu thẻ này. Hãy mở thẻ ngẫu nhiên nhé.")));
      }
      article.style.setProperty("--rarity",info.color);article.style.setProperty("--art1",card.art1||"#292f46");article.style.setProperty("--art2",card.art2||"#111522");article.style.setProperty("--accent",card.accent||"#a1a8c9");
      const art=document.createElement("div");art.className="mini-art";const initials=document.createElement("strong");initials.textContent=card.initials||makeInitials(card.chinese,card.name);art.appendChild(initials);setCardImage(art,card,"mini-photo","Ảnh "+card.name+" trong "+movie);
      if(owned){
        const starProgress=getCardProgress(card.id);
        art.classList.add("star-art-level-"+starProgress.stars);
        const foil=document.createElement("span");
        foil.className="mini-star-art-overlay star-art-level-"+starProgress.stars;
        foil.setAttribute("aria-hidden","true");
        art.appendChild(foil);
      }
      article.appendChild(art);
      const countBadge=document.createElement("span");countBadge.className="mini-count";countBadge.textContent=owned?"×"+state.owned[card.id]:"✧ Chưa có";article.appendChild(countBadge);
      const infoBox=document.createElement("div");infoBox.className="mini-info";
      const rarity=document.createElement("div");rarity.className="mini-rarity";rarity.textContent=card.rarity+" · "+displayStyleLabel(card.style).toUpperCase();
      const name=document.createElement("h3");name.textContent=card.name;
      const meta=document.createElement("p");meta.textContent=[card.role,card.chinese,genderLabel(card.gender)].filter(Boolean).join(" · ");
      infoBox.append(rarity,name,meta);
      if(owned){const progress=getCardProgress(card.id);const upgradeMark=document.createElement("small");upgradeMark.className="mini-upgrade-progress";upgradeMark.textContent=`${"★".repeat(progress.stars)}${"☆".repeat(5-progress.stars)} · Lv.${progress.level}`;upgradeMark.setAttribute("aria-label",`${progress.stars} sao, level ${progress.level}`);infoBox.appendChild(upgradeMark);}
      article.appendChild(infoBox);
      if(owned){const fav=document.createElement("button");fav.className="favorite-btn"+(state.favorites.includes(card.id)?" active":"");fav.textContent=state.favorites.includes(card.id)?"♥":"♡";fav.title=state.favorites.includes(card.id)?"Bỏ yêu thích":"Đánh dấu yêu thích";fav.setAttribute("aria-label",fav.title+" "+card.name);fav.addEventListener("click",event=>{event.stopPropagation();toggleFavorite(card.id);});article.appendChild(fav);}
      grid.appendChild(article);
    }
    set.appendChild(grid);container.appendChild(set);
  }
  const ownedCount=characters.filter(card=>(Number(state.owned[card.id])||0)>0).length;
  const empty=$("emptyState");
  const query=String($("collectionSearch")?.value||"").trim();
  const noOwnedLibrary=collectionMode==="library"&&ownedCount===0&&activeFilter==="all"&&!query&&collectionRarityFilter==="all"&&collectionStyleFilter==="all";
  const showEmpty=visibleCount===0||noOwnedLibrary;
  empty.hidden=!showEmpty;
  const emptyTitle=empty.querySelector("h3"),emptyText=empty.querySelector("p"),emptyButton=$("emptyOpenBtn");
  if(noOwnedLibrary){
    emptyTitle.textContent="Thư viện còn trống";
    emptyText.textContent="Bạn chưa sở hữu thẻ nào. Mở thẻ đầu tiên hoặc chuyển sang Khám phá kho thẻ để xem toàn bộ danh mục.";
    if(emptyButton)emptyButton.hidden=false;
  }else if(visibleCount===0){
    emptyTitle.textContent="Không có thẻ phù hợp";
    emptyText.textContent=activeFilter==="missing"?"Không còn thẻ chưa sưu tầm phù hợp với bộ lọc hiện tại. Hãy thử tiêu chí khác.":"Thử từ khóa khác hoặc điều chỉnh bộ lọc để khám phá thêm thẻ.";
    if(emptyButton)emptyButton.hidden=true;
  }else if(emptyButton){emptyButton.hidden=true;}
  const searchStatus=$("collectionResultCount");
  if(searchStatus)searchStatus.textContent=collectionMode==="library"?`${visibleMovies} phim · ${visibleCount} thẻ trong thư viện`:`${visibleMovies} phim · ${visibleCount} thẻ trong kho`;
  $("countAll").textContent=collectionMode==="library"?ownedCount:characters.length;
}
function renderCharacterRelations(card){
  const section=$("detailRelations"),groups=$("detailRelationGroups"),summary=$("detailRelationSummary");
  if(!section||!groups||!summary)return;
  groups.replaceChildren();
  const relations=getCharacterRelations(card),total=relations.sameActor.length+relations.coStars.length;
  summary.textContent=total?"Liên kết được suy ra từ tên diễn viên và tên phim trong kho thẻ của bạn.":"Khi thêm nhiều thẻ của cùng diễn viên hoặc nhiều diễn viên cùng một phim, các liên kết sẽ tự xuất hiện tại đây.";
  const addGroup=(title,description,items,type)=>{
    if(!items.length)return;
    const group=document.createElement("section");group.className="detail-relation-group";
    const heading=document.createElement("div");heading.className="detail-relation-heading";
    const titleEl=document.createElement("h4");titleEl.textContent=title;
    const desc=document.createElement("p");desc.textContent=description;
    heading.append(titleEl,desc);group.appendChild(heading);
    const list=document.createElement("div");list.className="detail-relation-list";list.setAttribute("role","list");
    for(const related of items){
      const button=document.createElement("button");button.type="button";button.className="detail-relation-card";button.setAttribute("role","listitem");
      button.setAttribute("aria-label","Xem hồ sơ "+related.name+" trong "+related.movie);
      const mark=document.createElement("span");mark.className="relation-rarity rarity-"+rarityCssKey(related.rarity||"R");mark.textContent=related.rarity||"R";
      const info=document.createElement("span");info.className="detail-relation-info";
      const name=document.createElement("strong");name.textContent=related.name;
      const meta=document.createElement("small");meta.textContent=type==="same-actor"?[related.movie,related.role].filter(Boolean).join(" · "):([related.role].filter(Boolean).join(" · ")||related.movie);
      info.append(name,meta);
      const count=document.createElement("span");count.className="detail-relation-owned";count.textContent=(Number(state.owned[related.id])||0)>0?"×"+state.owned[related.id]:"Chưa sở hữu";
      button.append(mark,info,count);button.addEventListener("click",()=>showCharacterDetails(related.id,true));list.appendChild(button);
    }
    group.appendChild(list);groups.appendChild(group);
  };
  addGroup("Các thẻ khác của diễn viên này","Cùng tên diễn viên · có thể khác phim hoặc vai diễn",relations.sameActor,"same-actor");
  addGroup("Bạn diễn trong cùng phim",card.movie,relations.coStars,"co-star");
}
