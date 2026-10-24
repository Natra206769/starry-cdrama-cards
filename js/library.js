/* library.js — Trang phim và hồ sơ diễn viên được tổng hợp từ kho thẻ hiện có.
   Không tạo dữ liệu game mới; chỉ trình bày các thẻ trong characters và tiến trình hiện có. */
let currentLibraryProfile = null;
function libraryMovieCards(movieName){const key=normalizedSearchKey(movieName);return characters.filter(card=>normalizedSearchKey(card.movie||"Bộ sưu tập chân dung")===key);}
function libraryActorCards(cardOrName){
  const target=typeof cardOrName==="string"?(characters.find(card=>card.id===cardOrName)||characters.find(card=>normalizedSearchKey(card.name)===normalizedSearchKey(cardOrName))):cardOrName;
  if(!target)return [];const key=normalizedSearchKey(target.name);return characters.filter(card=>key&&normalizedSearchKey(card.name)===key);
}
function libraryUniqueBy(items,keyFn){const seen=new Set(),result=[];for(const item of items){const key=keyFn(item);if(!key||seen.has(key))continue;seen.add(key);result.push(item);}return result;}
function libraryMakeSection(title,caption){
  const section=document.createElement("section");section.className="library-profile-section";
  const heading=document.createElement("div");heading.className="library-profile-section-heading";
  const h3=document.createElement("h3");h3.textContent=title;heading.appendChild(h3);
  if(caption){const small=document.createElement("small");small.textContent=caption;heading.appendChild(small);}
  section.appendChild(heading);return {section,heading};
}
function libraryMakeChip(title,subtitle,count,activate){
  const button=document.createElement("button");button.type="button";button.className="library-profile-chip";
  const textWrap=document.createElement("span"),strong=document.createElement("strong");strong.textContent=title;textWrap.appendChild(strong);
  if(subtitle){const small=document.createElement("small");small.textContent=subtitle;textWrap.appendChild(small);}
  button.appendChild(textWrap);
  if(count!==undefined&&count!==null){const tally=document.createElement("span");tally.className="chip-count";tally.textContent=String(count);button.appendChild(tally);}
  button.addEventListener("click",activate);return button;
}
function readLibraryProgress(id){
  const saved=state.cardProgress&&typeof state.cardProgress==="object"?state.cardProgress[id]:null;
  if(!saved||typeof saved!=="object")return {stars:1,level:1};
  return {stars:Math.max(1,Math.min(5,Math.floor(Number(saved.stars)||1))),level:Math.max(1,Math.min(MAX_CARD_LEVEL,Math.floor(Number(saved.level)||1)))};
}
function libraryMakeVariantCard(card,context){
  const owned=(Number(state.owned[card.id])||0)>0,info=rarityInfo[card.rarity]||rarityInfo.R;
  const button=document.createElement("button");button.type="button";button.className="library-variant-card";button.style.setProperty("--rarity",info.color);
  button.style.setProperty("--art1",card.art1||"#292f46");button.style.setProperty("--art2",card.art2||"#111522");button.style.setProperty("--accent",card.accent||info.color);
  const art=document.createElement("div");art.className="library-variant-art";
  const initials=document.createElement("strong");initials.textContent=card.initials||makeInitials(card.chinese,card.name);art.appendChild(initials);
  if(card.photo){
    const photo=document.createElement("img");photo.className="library-variant-photo";photo.alt="Ảnh "+card.name+" trong "+(card.movie||"bộ sưu tập");photo.loading="lazy";photo.referrerPolicy="no-referrer";photo.src=card.photo;photo.dataset.fallbackTried="0";
    photo.onerror=()=>{if(card.photoFallback&&photo.dataset.fallbackTried!=="1"){photo.dataset.fallbackTried="1";photo.src=card.photoFallback;}else{photo.remove();art.classList.remove("has-photo");}};
    photo.onload=()=>art.classList.add("has-photo");art.appendChild(photo);
  }
  const badge=document.createElement("span");badge.className="library-variant-owned";badge.textContent=owned?"Sở hữu ×"+(Number(state.owned[card.id])||0):"Chưa sở hữu";art.appendChild(badge);button.appendChild(art);
  const copy=document.createElement("span");copy.className="library-variant-copy";
  const rarity=document.createElement("span");rarity.className="library-variant-rarity";rarity.textContent=card.rarity+" · "+displayStyleLabel(card.style).toUpperCase();
  const title=document.createElement("strong");title.textContent=context==="movie"?card.name:(card.role||card.name);
  const meta=document.createElement("small");meta.textContent=context==="movie"?([card.role,card.chinese].filter(Boolean).join(" · ")||card.movie):([card.movie,card.role].filter(Boolean).join(" · ")||card.name);
  copy.append(rarity,title,meta);
  if(owned){const progress=readLibraryProgress(card.id),level=document.createElement("small");level.textContent="★".repeat(progress.stars)+"☆".repeat(5-progress.stars)+" · Lv."+progress.level;copy.appendChild(level);}
  button.appendChild(copy);button.setAttribute("aria-label","Mở hồ sơ thẻ "+card.name+" trong "+(card.movie||"bộ sưu tập"));
  button.addEventListener("click",()=>{const id=card.id;closeLibraryProfile();showCharacterDetails(id,true);});return button;
}
function librarySetHeroVisual(visual,card,poster=""){
  visual.replaceChildren();visual.className="library-profile-art";
  visual.style.setProperty("--rarity",(rarityInfo[card?.rarity]||rarityInfo.R).color);
  visual.style.setProperty("--art1",card?.art1||"#292f46");visual.style.setProperty("--art2",card?.art2||"#111522");visual.style.setProperty("--accent",card?.accent||"#a1a8c9");
  const initials=document.createElement("span");initials.className="library-profile-initials";initials.textContent=card?(card.initials||makeInitials(card.chinese,card.name)):"星光";visual.appendChild(initials);
  const source=poster||card?.photo;
  if(source){
    const photo=document.createElement("img");photo.className="library-profile-photo"+(poster?" library-movie-poster":"");photo.alt=poster?"Poster phim "+(card?.movie||""):"Ảnh minh họa "+(card?.movie||card?.name||"");photo.loading="eager";photo.referrerPolicy="no-referrer";photo.src=source;photo.dataset.sourceKind=poster?"poster":"card";photo.dataset.fallbackTried="0";
    photo.onerror=()=>{
      if(photo.dataset.sourceKind==="poster"&&card?.photo&&card.photo!==source){photo.dataset.sourceKind="card";photo.src=card.photo;return;}
      if(photo.dataset.fallbackTried==="0"&&card?.photoFallback){photo.dataset.fallbackTried="1";photo.src=card.photoFallback;return;}
      photo.remove();visual.classList.remove("has-photo");
    };
    photo.onload=()=>visual.classList.add("has-photo");visual.appendChild(photo);
  }
}
function libraryBuildStat(label,value){
  const stat=document.createElement("div");stat.className="library-profile-stat";const strong=document.createElement("strong");strong.textContent=String(value);
  const small=document.createElement("small");small.textContent=label;stat.append(strong,small);return stat;
}
function openMovieProfile(movieName,options={}){
  const cards=libraryMovieCards(movieName);if(!cards.length){showToast("Không tìm thấy bộ phim trong kho thẻ.");return;}
  currentLibraryProfile={type:"movie",value:cards[0].movie||movieName,returnToCard:options.returnToCard||null};
  if($("characterDetailDialog").open)closeCharacterDetails();
  renderLibraryProfile();const dialog=$("libraryProfileDialog");
  if(typeof dialog.showModal==="function"){if(!dialog.open)dialog.showModal();}else dialog.setAttribute("open","");
}
function openActorProfile(cardOrId,options={}){
  const cards=libraryActorCards(cardOrId);if(!cards.length){showToast("Không tìm thấy diễn viên trong kho thẻ.");return;}
  currentLibraryProfile={type:"actor",value:cards[0].name,returnToCard:options.returnToCard||null};
  if($("characterDetailDialog").open)closeCharacterDetails();
  renderLibraryProfile();const dialog=$("libraryProfileDialog");
  if(typeof dialog.showModal==="function"){if(!dialog.open)dialog.showModal();}else dialog.setAttribute("open","");
}
function closeLibraryProfile(){
  const dialog=$("libraryProfileDialog");if(typeof dialog.close==="function"&&dialog.open)dialog.close();else dialog.removeAttribute("open");
  currentLibraryProfile=null;
}
function renderLibraryProfile(){
  const profile=currentLibraryProfile;if(!profile)return;const root=$("libraryProfileContent");if(!root)return;root.replaceChildren();
  $("libraryProfileBackBtn").hidden=!profile.returnToCard;
  const isMovie=profile.type==="movie",cards=isMovie?libraryMovieCards(profile.value):libraryActorCards(profile.value);
  if(!cards.length){const empty=document.createElement("p");empty.className="library-profile-empty";empty.textContent="Hồ sơ này không còn thẻ trong kho.";root.appendChild(empty);return;}
  const ownedCards=cards.filter(card=>(Number(state.owned[card.id])||0)>0),ownedCount=ownedCards.length,copies=cards.reduce((sum,card)=>sum+(Number(state.owned[card.id])||0),0);
  const metadata=isMovie&&typeof getMovieMetadata==="function"?getMovieMetadata(profile.value):null;
  const heroCard=ownedCards.find(card=>card.photo)||cards.find(card=>card.photo)||ownedCards[0]||cards[0];
  const hero=document.createElement("section");hero.className="library-profile-hero";
  const visual=document.createElement("div");librarySetHeroVisual(visual,heroCard,metadata?.poster||"");hero.appendChild(visual);
  const copy=document.createElement("div");copy.className="library-profile-hero-copy";
  const eyebrow=document.createElement("p");eyebrow.className="library-profile-eyebrow";eyebrow.textContent=isMovie?"DRAMA · MOVIE FILE":"ACTOR · PERSONAL DOSSIER";
  const title=document.createElement("h2");title.id="libraryProfileTitle";title.textContent=profile.value;
  const description=document.createElement("p");description.className="library-profile-description";
  description.textContent=isMovie?(metadata?.description||(isGenericCollectionTitle(profile.value)?"Nhóm thẻ chân dung chưa gán vào một bộ phim cụ thể. Các phiên bản bên dưới được tổng hợp trực tiếp từ kho thẻ.":"Trang phim được tổng hợp từ các thẻ đã có trong hệ thống; bổ sung dữ liệu trong mục Quản lý thẻ phim để hoàn thiện hồ sơ.")):"Hồ sơ tổng hợp theo tên diễn viên trong kho thẻ. Các phiên bản có thể khác phim, vai diễn, độ hiếm hoặc phong cách.";
  copy.append(eyebrow,title,description);
  if(isMovie&&metadata){
    const metaLine=document.createElement("div");metaLine.className="library-profile-metadata";
    if(metadata.originalTitle){const original=document.createElement("span");original.className="metadata-original-title";original.textContent=metadata.originalTitle;metaLine.appendChild(original);}
    if(metadata.year){const year=document.createElement("span");year.textContent=metadata.year;metaLine.appendChild(year);}
    for(const genre of metadata.genres||[]){const chip=document.createElement("span");chip.textContent=genre;metaLine.appendChild(chip);}
    if(metaLine.children.length)copy.appendChild(metaLine);
  }
  const stats=document.createElement("div");stats.className="library-profile-stats";
  if(isMovie){const actors=libraryUniqueBy(cards,card=>normalizedSearchKey(card.name));stats.append(libraryBuildStat("Diễn viên",actors.length),libraryBuildStat("Phiên bản thẻ",cards.length),libraryBuildStat("Đã sở hữu",ownedCount),libraryBuildStat("Bản sao",copies));}
  else{const movies=libraryUniqueBy(cards.filter(card=>!isGenericCollectionTitle(card.movie)),card=>normalizedSearchKey(card.movie));stats.append(libraryBuildStat("Phim",movies.length),libraryBuildStat("Phiên bản thẻ",cards.length),libraryBuildStat("Phiên bản đã có",ownedCount),libraryBuildStat("Bản sao",copies));}
  copy.appendChild(stats);
  const progress=document.createElement("div");progress.className="library-profile-progress";progress.setAttribute("role","progressbar");progress.setAttribute("aria-valuemin","0");progress.setAttribute("aria-valuemax",String(cards.length));progress.setAttribute("aria-valuenow",String(ownedCount));progress.setAttribute("aria-label","Tiến độ sưu tầm của "+profile.value);
  const progressFill=document.createElement("span");progressFill.style.width=(cards.length?ownedCount/cards.length*100:0)+"%";progress.appendChild(progressFill);copy.appendChild(progress);
  if(isMovie){
    const editMetadata=document.createElement("button");editMetadata.type="button";editMetadata.className="outline-btn library-edit-metadata-btn";editMetadata.textContent="✎ Chỉnh sửa thông tin phim";
    editMetadata.addEventListener("click",()=>{const name=profile.value;closeLibraryProfile();openMovieMetadataEditor(name);});
    copy.appendChild(editMetadata);
  }
  hero.appendChild(copy);root.appendChild(hero);
  const body=document.createElement("div");body.className="library-profile-body";
  if(isMovie){
    const actors=libraryUniqueBy(cards,card=>normalizedSearchKey(card.name)).sort((a,b)=>compareVietnamese(a.name,b.name));
    const section=libraryMakeSection("Dàn diễn viên",actors.length+" người"),chipList=document.createElement("div");chipList.className="library-profile-chip-list";
    actors.forEach(actor=>{const variants=cards.filter(card=>normalizedSearchKey(card.name)===normalizedSearchKey(actor.name)),actorOwned=variants.filter(card=>(Number(state.owned[card.id])||0)>0).length;chipList.appendChild(libraryMakeChip(actor.name,variants.length+" phiên bản · "+actorOwned+" đã có",variants.length,()=>openActorProfile(actor.id,{returnToCard:profile.returnToCard})));});
    section.section.appendChild(chipList);body.appendChild(section);
  }else{
    const movies=libraryUniqueBy(cards.filter(card=>!isGenericCollectionTitle(card.movie)),card=>normalizedSearchKey(card.movie)).sort((a,b)=>compareVietnamese(a.movie,b.movie));
    const section=libraryMakeSection("Các phim đã xuất hiện",movies.length+" phim"),chipList=document.createElement("div");chipList.className="library-profile-chip-list";
    movies.forEach(movie=>{const variants=cards.filter(card=>normalizedSearchKey(card.movie)===normalizedSearchKey(movie.movie)),movieOwned=variants.filter(card=>(Number(state.owned[card.id])||0)>0).length;chipList.appendChild(libraryMakeChip(movie.movie,variants.length+" phiên bản · "+movieOwned+" đã có",variants.length,()=>openMovieProfile(movie.movie,{returnToCard:profile.returnToCard})));});
    if(!movies.length){const empty=document.createElement("p");empty.className="library-profile-empty";empty.textContent="Các thẻ hiện tại chưa gắn tên phim riêng.";section.section.appendChild(empty);}else section.section.appendChild(chipList);body.appendChild(section);
  }
  const rarityOrder={SP:0,UR:1,SSR:2,SR:3,R:4,N:5},ordered=cards.slice().sort((a,b)=>(rarityOrder[a.rarity]??99)-(rarityOrder[b.rarity]??99)||compareVietnamese(a.name,b.name));
  const section=libraryMakeSection(isMovie?"Các thẻ thuộc phim":"Các phiên bản thẻ của diễn viên",ordered.length+" phiên bản"),grid=document.createElement("div");grid.className="library-profile-card-grid";
  ordered.forEach(card=>grid.appendChild(libraryMakeVariantCard(card,isMovie?"movie":"actor")));
  section.section.appendChild(grid);body.appendChild(section);root.appendChild(body);
}
$("libraryProfileCloseBtn").addEventListener("click",closeLibraryProfile);
$("libraryProfileBackBtn").addEventListener("click",()=>{const id=currentLibraryProfile?.returnToCard||null;closeLibraryProfile();if(id)showCharacterDetails(id,true);});
$("libraryProfileDialog").addEventListener("click",event=>{if(event.target===$("libraryProfileDialog"))closeLibraryProfile();});
$("libraryProfileDialog").addEventListener("cancel",()=>{currentLibraryProfile=null;});
