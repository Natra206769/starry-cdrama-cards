/* collection.js — Thư viện, danh mục toàn hệ thống, lọc và liên kết diễn viên */
let collectionMode = "library";
let collectionViewMode = "grid";
let collectionSortMode = "rarity";
let collectionRarityFilter = "all";
let collectionStyleFilter = "all";

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
function syncCollectionControls(){
  document.querySelectorAll("[data-collection-mode]").forEach(button=>{
    const active=button.dataset.collectionMode===collectionMode;
    button.classList.toggle("active",active);button.setAttribute("aria-selected",String(active));
  });
  document.querySelectorAll("[data-collection-view]").forEach(button=>{
    const active=button.dataset.collectionView===collectionViewMode;
    button.classList.toggle("active",active);button.setAttribute("aria-pressed",String(active));
  });
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
  const movies=new Set(sourceCards.map(card=>String(card.movie||"").trim()).filter(movie=>movie&&!isGenericCollectionTitle(movie).valueOf()));
  const actors=new Set(sourceCards.map(card=>normalizedSearchKey(card.name)).filter(Boolean));
  const uniqueOwned=ownedCards.length;
  const copies=Object.values(state.owned).reduce((sum,value)=>sum+(Number(value)||0),0);
  const completion=characters.length?Math.round(uniqueOwned/characters.length*100):0;
  const stats=[
    {label:collectionMode==="library"?"Phim trong thư viện":"Phim trong kho",value:movies.size,detail:"Bộ phim khác nhau"},
    {label:collectionMode==="library"?"Diễn viên đã có":"Diễn viên trong kho",value:actors.size,detail:"Tên diễn viên khác nhau"},
    {label:collectionMode==="library"?"Thẻ trong thư viện":"Tổng biến thể thẻ",value:collectionMode==="library"?uniqueOwned:characters.length,detail:"Thẻ khác nhau"},
    {label:"Bản sao sở hữu",value:copies,detail:"Tính cả thẻ trùng"},
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
    const item=document.createElement("div");item.className="collection-rarity-total rarity-"+rarity.toLowerCase();
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
function renderCollection(){
  const container=$("collectionSets");if(!container)return;container.replaceChildren();
  syncCollectionControls();
  renderCollectionStyleOptions();
  renderCollectionOverview();
  renderCollectionRaritySummary();
  const grouped=new Map();
  for(const card of characters){
    const movie=String(card.movie||"Bộ sưu tập chân dung").trim().replace(/\s+/g," ")||"Bộ sưu tập chân dung";
    const key=normalizedSearchKey(movie);
    if(!grouped.has(key))grouped.set(key,{movie,cards:[]});
    grouped.get(key).cards.push(card);
  }
  const rarityOrder={SP:0,UR:1,SSR:2,SR:3,R:4,N:5};
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
    const title=document.createElement("h3");title.textContent=movie;
    const count=document.createElement("p");count.className="film-set-count";count.textContent=`${ownedUnique} / ${allCards.length} thẻ đã sưu tầm · ${missingUnique} thẻ còn thiếu`;
    titleWrap.append(eyebrow,title,count);
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
      const stat=document.createElement("span");stat.className="film-rarity-stat rarity-"+rarity.toLowerCase();
      const tier=document.createElement("strong");tier.textContent=rarity;
      const quantity=document.createElement("small");quantity.textContent=`${ownedTier} có / ${missingTier} thiếu`;
      stat.append(tier,quantity);stats.appendChild(stat);
    }
    set.appendChild(stats);

    const grid=document.createElement("div");grid.className="collection-grid"+(collectionViewMode==="list"?" collection-list-view":"");
    for(const card of cards){
      const owned=(Number(state.owned[card.id])||0)>0;const info=rarityInfo[card.rarity]||rarityInfo.R;
      const article=document.createElement("article");article.className="mini-card rarity-"+String(card.rarity||"SR").toLowerCase()+(owned?"":" is-locked");
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
      const mark=document.createElement("span");mark.className="relation-rarity rarity-"+String(related.rarity||"R").toLowerCase();mark.textContent=related.rarity||"N";
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
