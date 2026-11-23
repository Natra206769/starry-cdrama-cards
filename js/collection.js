/* collection.js — Bộ sưu tập thẻ, tìm kiếm và liên kết phim/diễn viên. */
let collectionMode="library";
function collectionMatchesFilter(card){
 const owned=(Number(state.owned[card.id])||0)>0;if(collectionMode==="library"&&!owned)return false;
 const query=normalizedSearchKey($("collectionSearch")?.value||"");if(!query)return true;
 return normalizedSearchKey([card.movie,card.name,card.chinese,card.role,displayStyleLabel(card.style),card.rarity].filter(Boolean).join(" ")).includes(query);
}
function syncCollectionControls(){
 document.querySelectorAll("[data-collection-mode]").forEach(button=>{const active=button.dataset.collectionMode===collectionMode;button.classList.toggle("active",active);button.setAttribute("aria-selected",String(active));});
 if($("collectionTitlePrefix"))$("collectionTitlePrefix").textContent=collectionMode==="library"?"Thư viện":"Khám phá";
 if($("collectionTitleEm"))$("collectionTitleEm").textContent=collectionMode==="library"?"của tôi":"kho thẻ";
 if($("collectionEyebrow"))$("collectionEyebrow").textContent=collectionMode==="library"?"YOUR PERSONAL DRAMA LIBRARY":"EXPLORE THE FULL CARD CATALOG";
 if($("collectionSearch"))$("collectionSearch").setAttribute("aria-label",collectionMode==="library"?"Tìm trong thư viện của tôi":"Tìm trong toàn bộ kho thẻ");
}
function renderCollectionOverview(){
 const overview=$("collectionOverview");if(!overview)return;
 const ownedCards=characters.filter(card=>(Number(state.owned[card.id])||0)>0),sourceCards=collectionMode==="library"?ownedCards:characters;
 const movies=new Set(sourceCards.map(card=>String(card.movie||"").trim()).filter(movie=>movie&&!isGenericCollectionTitle(movie)));
 const actors=new Set(sourceCards.map(card=>normalizedSearchKey(card.name)).filter(Boolean)),uniqueOwned=ownedCards.length,completion=characters.length?Math.round(uniqueOwned/characters.length*100):0;
 const stats=[
  {label:collectionMode==="library"?"Phim trong thư viện":"Phim trong kho",value:movies.size},
  {label:collectionMode==="library"?"Diễn viên đã có":"Diễn viên trong kho",value:actors.size},
  {label:collectionMode==="library"?"Thẻ trong thư viện":"Tổng biến thể thẻ",value:collectionMode==="library"?uniqueOwned:characters.length},
  {label:"Tiến độ sưu tầm",value:completion+"%"}
 ];
 overview.replaceChildren();for(const item of stats){const card=document.createElement("div");card.className="collection-stat-card";const label=document.createElement("span");label.textContent=item.label;const value=document.createElement("strong");value.textContent=String(item.value);card.append(label,value);overview.appendChild(card);}
 const raritySummary=document.createElement("div");raritySummary.className="collection-global-rarity";raritySummary.setAttribute("aria-label","Số lượng thẻ từng độ hiếm trên toàn hệ thống");
 const rarityHeading=document.createElement("strong");rarityHeading.className="collection-global-rarity-title";rarityHeading.textContent="SỐ THẺ THEO ĐỘ HIẾM · TOÀN HỆ THỐNG";raritySummary.appendChild(rarityHeading);
 const rarityCounts=document.createElement("div");rarityCounts.className="collection-global-rarity-list";
 for(const rarity of Object.keys(rarityInfo)){const item=document.createElement("span");item.className="collection-global-rarity-item rarity-"+rarityCssKey(rarity);item.style.setProperty("--rarity",rarityInfo[rarity].color);const tier=document.createElement("strong");tier.textContent=rarity;const quantity=document.createElement("small");quantity.textContent=String(characters.filter(card=>String(card.rarity||"R").toUpperCase()===rarity).length)+" thẻ";item.append(tier,quantity);rarityCounts.appendChild(item);}
 raritySummary.appendChild(rarityCounts);overview.appendChild(raritySummary);
}
function animateCollectionCard(article,afterAnimation){
 if(!article||article.dataset.tapBusy==="1")return;article.dataset.tapBusy="1";article.classList.remove("is-tapped");void article.offsetWidth;article.classList.add("is-tapped");
 window.setTimeout(()=>{article.classList.remove("is-tapped");delete article.dataset.tapBusy;if(article.isConnected&&article.closest("#page-collection")?.classList.contains("active")&&typeof afterAnimation==="function")afterAnimation();},360);
}
function renderCollection(){
 const container=$("collectionSets");if(!container)return;container.replaceChildren();syncCollectionControls();renderCollectionOverview();
 const grouped=new Map();
 for(const card of characters){const movie=String(card.movie||"Bộ sưu tập chân dung").trim().replace(/\s+/g," ")||"Bộ sưu tập chân dung";const key=normalizedSearchKey(movie);if(!grouped.has(key))grouped.set(key,{movie,cards:[]});grouped.get(key).cards.push(card);}
 const rarityOrder={SP:0,MR:1,LR:2,UR:3,SSR:4,SR:5,R:6},movieGroups=[...grouped.values()].sort((a,b)=>compareVietnamese(a.movie,b.movie));
 let visibleCount=0,visibleMovies=0;
 for(const {movie,cards:allCards} of movieGroups){
  const cards=allCards.filter(collectionMatchesFilter).sort((a,b)=>(rarityOrder[a.rarity]??99)-(rarityOrder[b.rarity]??99)||compareVietnamese(a.name,b.name));if(!cards.length)continue;
  visibleCount+=cards.length;visibleMovies++;const ownedUnique=allCards.filter(card=>(Number(state.owned[card.id])||0)>0).length;
  const set=document.createElement("section");set.className="film-set";const head=document.createElement("div");head.className="film-set-heading";
  const titleWrap=document.createElement("div");titleWrap.className="film-set-title-wrap";const eyebrow=document.createElement("p");eyebrow.className="film-set-eyebrow";eyebrow.textContent="DRAMA COLLECTION";
  const titleRow=document.createElement("div");titleRow.className="film-title-row";const title=document.createElement("h3");title.textContent=movie;
  const openMovieBtn=document.createElement("button");openMovieBtn.type="button";openMovieBtn.className="film-open-profile";openMovieBtn.textContent="Chi tiết ↗";openMovieBtn.setAttribute("aria-label","Mở trang phim "+movie);openMovieBtn.addEventListener("click",event=>{event.preventDefault();event.stopPropagation();openMovieProfile(movie);});
  titleRow.append(title,openMovieBtn);const count=document.createElement("p");count.className="film-set-count";count.textContent=ownedUnique+" thẻ đã sưu tầm";titleWrap.append(eyebrow,titleRow,count);
  const progress=document.createElement("div");progress.className="film-progress";progress.setAttribute("role","progressbar");progress.setAttribute("aria-valuemin","0");progress.setAttribute("aria-valuemax",String(allCards.length));progress.setAttribute("aria-valuenow",String(ownedUnique));progress.setAttribute("aria-label","Tiến độ "+movie);
  const fill=document.createElement("span");fill.style.width=(allCards.length?ownedUnique/allCards.length*100:0)+"%";progress.appendChild(fill);head.append(titleWrap,progress);set.appendChild(head);
  const stats=document.createElement("div");stats.className="film-rarity-stats";stats.setAttribute("aria-label","Số thẻ đã sở hữu theo độ hiếm của "+movie);
  for(const rarity of Object.keys(rarityInfo)){const tierCards=allCards.filter(card=>card.rarity===rarity);if(!tierCards.length)continue;const ownedTier=tierCards.filter(card=>(Number(state.owned[card.id])||0)>0).length;const stat=document.createElement("span");stat.className="film-rarity-stat rarity-"+rarityCssKey(rarity);const tier=document.createElement("strong");tier.textContent=rarity;const quantity=document.createElement("small");quantity.textContent=ownedTier+" có";stat.append(tier,quantity);stats.appendChild(stat);}
  set.appendChild(stats);const grid=document.createElement("div");grid.className="collection-grid";
  for(const card of cards){
   const owned=(Number(state.owned[card.id])||0)>0,info=rarityInfo[card.rarity]||rarityInfo.R,article=document.createElement("article");article.className="mini-card rarity-"+rarityCssKey(card.rarity||"SR")+(owned?"":" is-locked");
   if(owned){const progressData=getCardProgress(card.id);article.classList.add("owned-star-level-"+progressData.stars);const starFrame=document.createElement("span");starFrame.className="mini-star-frame star-frame-"+progressData.stars;starFrame.setAttribute("aria-hidden","true");article.appendChild(starFrame);article.setAttribute("role","button");article.setAttribute("tabindex","0");article.setAttribute("aria-label","Xem thẻ "+card.name+" trong phim "+movie+", "+progressData.stars+" sao");article.title="Nhấn để xem thẻ "+card.name;const activate=()=>animateCollectionCard(article,()=>showCharacterDetails(card.id));article.addEventListener("click",activate);article.addEventListener("keydown",event=>{if((event.key==="Enter"||event.key===" ")&&event.target===article){event.preventDefault();activate();}});}
   else{article.setAttribute("aria-label","Chưa sở hữu thẻ "+card.name+" trong phim "+movie);article.title="Mở thẻ ngẫu nhiên để sưu tầm thẻ này";article.addEventListener("click",()=>animateCollectionCard(article,()=>showToast("Bạn chưa sở hữu thẻ này. Hãy mở thẻ ngẫu nhiên nhé.")));}
   article.style.setProperty("--rarity",info.color);article.style.setProperty("--art1",card.art1||"#292f46");article.style.setProperty("--art2",card.art2||"#111522");article.style.setProperty("--accent",card.accent||"#a1a8c9");
   const art=document.createElement("div");art.className="mini-art";const initials=document.createElement("strong");initials.textContent=card.initials||makeInitials(card.chinese,card.name);art.appendChild(initials);setCardImage(art,card,"mini-photo","Ảnh "+card.name+" trong "+movie);
   if(owned){const starProgress=getCardProgress(card.id);art.classList.add("star-art-level-"+starProgress.stars);const foil=document.createElement("span");foil.className="mini-star-art-overlay star-art-level-"+starProgress.stars;foil.setAttribute("aria-hidden","true");art.appendChild(foil);}
   article.appendChild(art);const countBadge=document.createElement("span");countBadge.className="mini-count";countBadge.textContent=owned?"×"+state.owned[card.id]:"✧ Chưa có";article.appendChild(countBadge);
   const infoBox=document.createElement("div");infoBox.className="mini-info";const rarity=document.createElement("div");rarity.className="mini-rarity";rarity.textContent=card.rarity+" · "+displayStyleLabel(card.style).toUpperCase();const name=document.createElement("h3");name.textContent=card.name;const meta=document.createElement("p");meta.textContent=[card.role,card.chinese,genderLabel(card.gender)].filter(Boolean).join(" · ");infoBox.append(rarity,name,meta);
   if(owned){const progressData=getCardProgress(card.id),upgradeMark=document.createElement("small");upgradeMark.className="mini-upgrade-progress";upgradeMark.textContent="★".repeat(progressData.stars)+"☆".repeat(5-progressData.stars)+" · Lv."+progressData.level;upgradeMark.setAttribute("aria-label",progressData.stars+" sao, level "+progressData.level);infoBox.appendChild(upgradeMark);}
   article.appendChild(infoBox);
   if(owned){const fav=document.createElement("button");fav.className="favorite-btn"+(state.favorites.includes(card.id)?" active":"");fav.textContent=state.favorites.includes(card.id)?"♥":"♡";fav.title=state.favorites.includes(card.id)?"Bỏ yêu thích":"Đánh dấu yêu thích";fav.setAttribute("aria-label",fav.title+" "+card.name);fav.addEventListener("click",event=>{event.stopPropagation();toggleFavorite(card.id);});article.appendChild(fav);}
   grid.appendChild(article);
  }
  set.appendChild(grid);container.appendChild(set);
 }
 const ownedCount=characters.filter(card=>(Number(state.owned[card.id])||0)>0).length,query=String($("collectionSearch")?.value||"").trim(),empty=$("emptyState");
 const emptyTitle=empty.querySelector("h3"),emptyText=empty.querySelector("p"),emptyButton=$("emptyOpenBtn"),noOwnedLibrary=collectionMode==="library"&&ownedCount===0&&!query,showEmpty=visibleCount===0||noOwnedLibrary;empty.hidden=!showEmpty;
 if(noOwnedLibrary){emptyTitle.textContent="Thư viện còn trống";emptyText.textContent="Mở thẻ để bắt đầu.";if(emptyButton)emptyButton.hidden=false;}
 else if(visibleCount===0){emptyTitle.textContent="Không có thẻ phù hợp";emptyText.textContent="Thử từ khóa khác.";if(emptyButton)emptyButton.hidden=true;}
 else if(emptyButton)emptyButton.hidden=true;
 const result=$("collectionResultCount");if(result)result.textContent=collectionMode==="library"?visibleMovies+" phim · "+visibleCount+" thẻ trong thư viện":visibleMovies+" phim · "+visibleCount+" thẻ trong kho";
}
function renderCharacterRelations(card){
 const section=$("detailRelations"),groups=$("detailRelationGroups");if(!section||!groups)return;groups.replaceChildren();
 const relations=getCharacterRelations(card);
 const addGroup=(title,items,type)=>{if(!items.length)return;const group=document.createElement("section");group.className="detail-relation-group";const heading=document.createElement("div");heading.className="detail-relation-heading";const titleEl=document.createElement("h4");titleEl.textContent=title;heading.append(titleEl);group.appendChild(heading);const list=document.createElement("div");list.className="detail-relation-list";list.setAttribute("role","list");
  for(const related of items){const button=document.createElement("button");button.type="button";button.className="detail-relation-card";button.setAttribute("role","listitem");button.setAttribute("aria-label","Xem hồ sơ "+related.name+" trong "+related.movie);const mark=document.createElement("span");mark.className="relation-rarity rarity-"+rarityCssKey(related.rarity||"R");mark.textContent=related.rarity||"R";const info=document.createElement("span");info.className="detail-relation-info";const name=document.createElement("strong");name.textContent=related.name;const meta=document.createElement("small");meta.textContent=type==="same-actor"?[related.movie,related.role].filter(Boolean).join(" · "):([related.role].filter(Boolean).join(" · ")||related.movie);info.append(name,meta);const count=document.createElement("span");count.className="detail-relation-owned";count.textContent=(Number(state.owned[related.id])||0)>0?"×"+state.owned[related.id]:"Chưa sở hữu";button.append(mark,info,count);button.addEventListener("click",()=>showCharacterDetails(related.id,true));list.appendChild(button);}
  group.appendChild(list);groups.appendChild(group);
 };
 addGroup("Các thẻ khác của diễn viên này",relations.sameActor,"same-actor");
 addGroup("Bạn diễn trong cùng phim",relations.coStars,"co-star");
}
