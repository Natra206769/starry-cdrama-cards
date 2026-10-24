/* collection.js — Bộ sưu tập: lọc, tìm kiếm, thống kê độ hiếm, liên kết diễn viên

*/

function collectionMatchesFilter(card){
  if(activeFilter==="male"&&card.gender!=="male")return false;
  if(activeFilter==="female"&&card.gender!=="female")return false;
  if(activeFilter==="favorites"&&!state.favorites.includes(card.id))return false;
  if(activeFilter==="missing"&&(Number(state.owned[card.id])||0)>0)return false;
  const query=normalizedSearchKey($("collectionSearch")?.value||"");
  if(query){
    const haystack=normalizedSearchKey([card.movie,card.name,card.chinese,card.role,displayStyleLabel(card.style),card.rarity].filter(Boolean).join(" "));
    if(!haystack.includes(query))return false;
  }
  return true;
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
  const title=document.createElement("strong");title.textContent="Tổng thẻ toàn bộ phim";
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
    const cards=allCards.filter(collectionMatchesFilter).sort((a,b)=>(rarityOrder[a.rarity]??99)-(rarityOrder[b.rarity]??99)||compareVietnamese(a.name,b.name));
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

    const grid=document.createElement("div");grid.className="collection-grid";
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
      const art=document.createElement("div");art.className="mini-art";const initials=document.createElement("strong");initials.textContent=card.initials||makeInitials(card.chinese,card.name);art.appendChild(initials);setCardImage(art,card,"mini-photo","Ảnh "+card.name+" trong "+movie);article.appendChild(art);
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
  const showEmpty=(activeFilter==="all"&&!query&&ownedCount===0)||visibleCount===0;
  empty.hidden=!showEmpty;
  const emptyTitle=empty.querySelector("h3"),emptyText=empty.querySelector("p");
  if(visibleCount===0){emptyTitle.textContent="Không có thẻ phù hợp";emptyText.textContent=activeFilter==="missing"?"Bạn đã sưu tầm đủ các thẻ trong phạm vi đang xem, hoặc hãy thử từ khóa khác.":"Thử một từ khóa khác hoặc chọn bộ lọc khác để xem các thẻ trong bộ sưu tập phim.";}
  else if(ownedCount===0&&!query&&activeFilter==="all"){emptyTitle.textContent="Chưa mở thẻ nào";emptyText.textContent="Những thẻ mờ bên dưới đang chờ bạn sưu tầm. Dùng tìm kiếm hoặc bộ lọc ‘Chưa có’ để tìm thẻ nhanh hơn.";}
  const searchStatus=$("collectionResultCount");if(searchStatus)searchStatus.textContent=`${visibleMovies} phim · ${visibleCount} thẻ phù hợp`;
  $("countAll").textContent=ownedCount;
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
