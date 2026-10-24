/* detail.js — Hộp thoại hồ sơ thẻ, yêu thích

*/

function showCharacterDetails(id,allowUnowned=false){
  const card=characters.find(item=>item.id===id);if(!card||(!allowUnowned&&!(state.owned[id]>0)))return;
  currentDetailId=id;const dialog=$("characterDetailDialog"),visual=$("detailVisual"),photo=$("detailPhoto"),initials=$("detailInitials");const info=rarityInfo[card.rarity]||rarityInfo.R;visual.classList.remove(...Object.values(rarityInfo).map(item=>"rarity-"+item.effect));visual.classList.add("rarity-"+info.effect);visual.style.setProperty("--rarity",info.color);
  $("detailName").textContent=card.name||"Chưa đặt tên";$("detailChinese").textContent=card.chinese||"Chưa có tên tiếng Trung";
  $("detailGender").textContent=genderLabel(card.gender);$("detailStyle").textContent=displayStyleLabel(card.style);$("detailRarity").textContent=info.label;$("detailRarity").style.color=info.color;
  $("detailCount").textContent="×"+(state.owned[id]||0);$("detailQuote").textContent=card.quote||"Một ngôi sao, một câu chuyện.";
  $("detailMovie").textContent=card.movie||"Bộ sưu tập chân dung";$("detailRole").textContent=card.role||"Chưa nhập";
  $("detailOpenMovieBtn").textContent=isGenericCollectionTitle(card.movie)?"Xem nhóm thẻ ↗":"▣ Xem trang phim";
  visual.style.setProperty("--art1",card.art1||"#292f46");visual.style.setProperty("--art2",card.art2||"#111522");visual.style.setProperty("--accent",card.accent||"#a1a8c9");
  initials.textContent=card.initials||makeInitials(card.chinese,card.name);photo.hidden=true;photo.removeAttribute("src");photo.dataset.fallbackTried="0";photo.alt="Ảnh "+card.name+" trong "+card.movie;visual.classList.remove("has-detail-photo");
  if(card.photo){photo.hidden=false;photo.src=card.photo;photo.onerror=()=>{if(card.photoFallback&&photo.dataset.fallbackTried!=="1"){photo.dataset.fallbackTried="1";photo.src=card.photoFallback;}else{photo.hidden=true;visual.classList.remove("has-detail-photo");}};photo.onload=()=>visual.classList.add("has-detail-photo");}
  const isOwned=(Number(state.owned[id])||0)>0;
  const starProgress=isOwned?getCardProgress(id):null;
  visual.classList.remove("star-level-1","star-level-2","star-level-3","star-level-4","star-level-5");
  const detailFoil=$("detailStarArtOverlay");
  if(isOwned&&starProgress){
    visual.classList.add("star-level-"+starProgress.stars);
    visual.dataset.stars=String(starProgress.stars);
    if(detailFoil)detailFoil.className="detail-star-art-overlay star-level-"+starProgress.stars;
  }else{
    delete visual.dataset.stars;
    if(detailFoil)detailFoil.className="detail-star-art-overlay";
  }
  const favorite=$("detailFavoriteBtn");favorite.hidden=!isOwned;favorite.textContent=state.favorites.includes(id)?"♥ Đã yêu thích · Bỏ đánh dấu":"♡ Thêm yêu thích";favorite.classList.toggle("is-favorite",state.favorites.includes(id));
  $("detailDeleteBtn").hidden=!isOwned;
  $("detailUpgradeBtn").hidden=!isOwned;
  $("detailCount").closest(".detail-owned").hidden=!isOwned;
  $("detailHint").textContent=isOwned?"Hồ sơ này được đồng bộ với thẻ trong bộ sưu tập của bạn.":"Đây là hồ sơ xem trước từ mạng lưới liên kết; bạn chưa sở hữu thẻ này.";
  renderCharacterRelations(card);
  if(typeof dialog.showModal==="function"){if(!dialog.open)dialog.showModal();}else dialog.setAttribute("open","");
}
function closeCharacterDetails(){const dialog=$("characterDetailDialog");if(typeof dialog.close==="function"&&dialog.open)dialog.close();else dialog.removeAttribute("open");currentDetailId=null;}
function toggleFavorite(id){state.favorites=state.favorites.includes(id)?state.favorites.filter(item=>item!==id):[...state.favorites,id];saveState();renderCollection();if($("characterDetailDialog").open&&currentDetailId===id)showCharacterDetails(id);}
$("detailCloseBtn").addEventListener("click",closeCharacterDetails);
$("characterDetailDialog").addEventListener("click",event=>{if(event.target===$("characterDetailDialog"))closeCharacterDetails();});
$("characterDetailDialog").addEventListener("cancel",()=>{currentDetailId=null;});
$("detailFavoriteBtn").addEventListener("click",()=>{if(currentDetailId)toggleFavorite(currentDetailId);});
$("detailDeleteBtn").addEventListener("click",()=>{if(currentDetailId)deleteCharacter(currentDetailId);});
$("detailUpgradeBtn").addEventListener("click",()=>{const id=currentDetailId;if(!id)return;currentUpgradeId=id;closeCharacterDetails();showAppPage("upgrade");renderUpgradePage(id);});
$("detailOpenMovieBtn").addEventListener("click",()=>{const id=currentDetailId,card=characters.find(item=>item.id===id);if(!card)return;openMovieProfile(card.movie,{returnToCard:id});});
$("detailOpenActorBtn").addEventListener("click",()=>{const id=currentDetailId;if(!id)return;openActorProfile(id,{returnToCard:id});});
