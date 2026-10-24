/* utils.js — Hàm tiện ích: chuẩn hóa tên, tìm kiếm không dấu, chuẩn hóa thẻ, nạp ảnh thẻ

*/

// Title Case cho tên diễn viên, nhân vật/vai diễn và phim; hỗ trợ đầy đủ Unicode/tiếng Việt.
function titleCaseName(value){
  return String(value ?? "").trim().replace(/\s+/g," ").toLocaleLowerCase("vi").replace(/(^|[\s\-–—'’])([\p{L}])/gu,(_,separator,letter)=>separator+letter.toLocaleUpperCase("vi"));
}
function normalizeSavedNameFields(card){
  if(!card || typeof card!=="object")return card;
  for(const field of ["name","movie","role"]){
    if(typeof card[field]==="string"&&card[field].trim())card[field]=titleCaseName(card[field]);
  }
  return card;
}

// Search keys ignore accents and case, while displayed text preserves Vietnamese diacritics.
function normalizedSearchKey(value){
  return String(value||"").replace(/[Đđ]/g,"d").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase("vi").replace(/\s+/g," ").trim();
}
function isGenericCollectionTitle(value){
  return new Set(["bo suu tap chan dung","bo suu tap","chan dung su kien"]).has(normalizedSearchKey(value));
}
function displayStyleLabel(value){
  return normalizedSearchKey(value)==="hien dai" ? "Chưa phân loại" : (String(value||"").trim()||"Chưa phân loại");
}
function getCharacterRelations(card){
  const targetName=normalizedSearchKey(card.name),targetMovie=normalizedSearchKey(card.movie);
  const sameActor=characters.filter(other=>other.id!==card.id&&targetName&&normalizedSearchKey(other.name)===targetName);
  const coStars=!isGenericCollectionTitle(card.movie)&&targetMovie
    ?characters.filter(other=>other.id!==card.id&&normalizedSearchKey(other.movie)===targetMovie&&normalizedSearchKey(other.name)!==targetName)
    :[];
  return {sameActor,coStars};
}

function makeInitials(chinese,name){
  return (chinese&&chinese.trim()?Array.from(chinese.trim()).slice(-2).join(""):String(name||"").trim().split(/\s+/).slice(-2).map(part=>Array.from(part)[0]||"").join(""))||"✦";
}
function makeArt(rarity){
  const art=(rarityInfo[rarity]||rarityInfo.SR).art;
  return {art1:art[0],art2:art[1],accent:art[2]};
}
function normalizeCard(card,fallback={}){
  const result={...fallback,...(card||{})};
  result.name=titleCaseName(result.name||"Chưa đặt tên");
  result.movie=titleCaseName(String(result.movie||"").trim()||"Bộ sưu tập chân dung");
  result.role=titleCaseName(String(result.role||"").trim());
  delete result.costume; // Ignore legacy outfit metadata; cards are no longer split by costume.
  result.quote=String(result.quote||"").trim()||"Một ngôi sao, một câu chuyện.";
  result.symbol=result.symbol||result.icon||"✦";
  result.initials=result.initials||makeInitials(result.chinese,result.name);
  result.gender=result.gender||"other";
  result.style=result.style||"Khác";
  result.rarity=rarityInfo[result.rarity]?result.rarity:"SR";
  return result;
}

function setCardImage(wrapper,card,imageClass,altText){
  if(!card.photo)return;
  const photo=document.createElement("img");photo.className=imageClass;photo.src=card.photo;photo.alt=altText||("Ảnh thẻ của "+card.name);photo.loading=imageClass==="actor-photo"?"eager":"lazy";photo.referrerPolicy="no-referrer";photo.dataset.fallbackTried="0";
  photo.onerror=()=>{
    if(photo.dataset.fallbackTried==="0"&&card.photoFallback){photo.dataset.fallbackTried="1";photo.src=card.photoFallback;return;}
    photo.remove();wrapper.classList.remove("has-photo");wrapper.classList.remove("has-detail-photo");
  };
  photo.onload=()=>{wrapper.classList.add(imageClass==="detail-photo"?"has-detail-photo":"has-photo");};
  wrapper.prepend(photo);
}
