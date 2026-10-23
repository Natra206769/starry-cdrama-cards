// Starry C-Drama Cards V8.0 — bộ sưu tập tìm kiếm và xếp hạng từ toàn bộ kho phim/thẻ.
let characters = [
  {id:"xiao-zhan",movie:"Bộ sưu tập chân dung",role:"Chân dung sự kiện",name:"Tiêu Chiến",chinese:"肖战",gender:"male",style:"Hiện đại",rarity:"SSR",quote:"Một ánh nhìn, vạn câu chuyện.",symbol:"✦",initials:"肖战",art1:"#34445c",art2:"#101522",accent:"#b8a5d0",photo:"https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/Xiao_Zhan_at_the_Weibo_Night_Ceremony_January_11_2020.jpg/330px-Xiao_Zhan_at_the_Weibo_Night_Ceremony_January_11_2020.jpg",photoFallback:"https://commons.wikimedia.org/wiki/Special:FilePath/Xiao_Zhan_at_the_Weibo_Night_Ceremony_January_11_2020.jpg?width=700",photoCredit:"Pobediti丨肖战",photoLicense:"CC BY-SA 4.0",photoSource:"https://commons.wikimedia.org/wiki/File:Xiao_Zhan_at_the_Weibo_Night_Ceremony_January_11_2020.jpg"},
  {id:"wang-yibo",movie:"Bộ sưu tập chân dung",role:"Chân dung sự kiện",name:"Vương Nhất Bác",chinese:"王一博",gender:"male",style:"Hiện đại",rarity:"SR",quote:"Tự do là phong cách của riêng mình.",symbol:"✧",initials:"王博",art1:"#214b57",art2:"#101a25",accent:"#6ec6c2",photo:"https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9a/%E7%8E%8B%E4%B8%80%E5%8D%9A.jpg/500px-%E7%8E%8B%E4%B8%80%E5%8D%9A.jpg",photoFallback:"https://commons.wikimedia.org/wiki/Special:FilePath/%E7%8E%8B%E4%B8%80%E5%8D%9A.jpg?width=700",photoCredit:"Aco",photoLicense:"CC BY 2.5",photoSource:"https://commons.wikimedia.org/wiki/File:王一博.jpg"},
  {id:"cheng-yi",movie:"Bộ sưu tập chân dung",role:"Chân dung sự kiện",name:"Thành Nghị",chinese:"成毅",gender:"male",style:"Cổ trang",rarity:"UR",quote:"Kiếm ý như sương, lòng sáng tựa trăng.",symbol:"☾",initials:"成毅",art1:"#4b3047",art2:"#171322",accent:"#d6a0c8",photo:"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/Cheng_Yi_actor.jpg/960px-Cheng_Yi_actor.jpg",photoFallback:"https://commons.wikimedia.org/wiki/Special:FilePath/Cheng_Yi_actor.jpg?width=700",photoCredit:"Kiwiyi",photoLicense:"CC BY-SA 4.0",photoSource:"https://commons.wikimedia.org/wiki/File:Cheng_Yi_actor.jpg"},
  {id:"gong-jun",movie:"Bộ sưu tập chân dung",role:"Chân dung sự kiện",name:"Cung Tuấn",chinese:"龚俊",gender:"male",style:"Cổ trang",rarity:"SR",quote:"Phong độ ung dung, khí chất tự nhiên.",symbol:"❖",initials:"龚俊",art1:"#47506c",art2:"#121726",accent:"#9cb5e5",photo:"https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d8/GJ_Cannes.jpg/330px-GJ_Cannes.jpg",photoFallback:"https://commons.wikimedia.org/wiki/Special:FilePath/GJ_Cannes.jpg?width=700",photoCredit:"99_开心果",photoLicense:"CC BY 4.0",photoSource:"https://commons.wikimedia.org/wiki/File:GJ_Cannes.jpg"},
  {id:"dylan-wang",movie:"Bộ sưu tập chân dung",role:"Chân dung sự kiện",name:"Vương Hạc Đệ",chinese:"王鹤棣",gender:"male",style:"Hiện đại",rarity:"R",quote:"Năng lượng nổi bật giữa đám đông.",symbol:"⚡",initials:"鹤棣",art1:"#5b422e",art2:"#1c1716",accent:"#e6b875",photo:"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/76/Dylan_Wang.jpg/330px-Dylan_Wang.jpg",photoFallback:"https://commons.wikimedia.org/wiki/Special:FilePath/Dylan_Wang.jpg?width=700",photoCredit:"SR98·王鹤棣",photoLicense:"CC BY 4.0",photoSource:"https://commons.wikimedia.org/wiki/File:Dylan_Wang.jpg"},
  {id:"yang-yang",movie:"Bộ sưu tập chân dung",role:"Chân dung sự kiện",name:"Dương Dương",chinese:"杨洋",gender:"male",style:"Cổ trang",rarity:"SSR",quote:"Thanh phong minh nguyệt, phong thái như ngọc.",symbol:"☼",initials:"杨洋",art1:"#33485c",art2:"#111724",accent:"#91c2df",photo:"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/55/Yang_Yang_at_the_Bvlgari_Serpenti_75_Years_of_Infinite_Tales_exhibition_in_Shanghai_in_March_2023_%282%29.png/1280px-Yang_Yang_at_the_Bvlgari_Serpenti_75_Years_of_Infinite_Tales_exhibition_in_Shanghai_in_March_2023_%282%29.png",photoFallback:"https://commons.wikimedia.org/wiki/Special:FilePath/Yang_Yang_at_the_Bvlgari_Serpenti_75_Years_of_Infinite_Tales_exhibition_in_Shanghai_in_March_2023_%282%29.png?width=700",photoCredit:"Play大明星",photoLicense:"CC BY 3.0",photoSource:"https://commons.wikimedia.org/wiki/File:Yang_Yang_at_the_Bvlgari_Serpenti_75_Years_of_Infinite_Tales_exhibition_in_Shanghai_in_March_2023_(2).png"},
  {id:"zhao-lusi",movie:"Bộ sưu tập chân dung",role:"Chân dung sự kiện",name:"Triệu Lộ Tư",chinese:"赵露思",gender:"female",style:"Cổ trang",rarity:"SSR",quote:"Nụ cười dịu dàng, ánh mắt lanh lợi.",symbol:"❀",initials:"露思",art1:"#69445c",art2:"#211725",accent:"#f1a8c7",photo:"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/ZHAO_LUSI_%28%E8%B6%99%E9%9C%B2%E6%80%9D%29_P1.jpg/1280px-ZHAO_LUSI_%28%E8%B6%99%E9%9C%B2%E6%80%9D%29_P1.jpg",photoFallback:"https://commons.wikimedia.org/wiki/Special:FilePath/ZHAO_LUSI_%28%E8%B6%99%E9%9C%B2%E6%80%9D%29_P1.jpg?width=700",photoCredit:"Play大明星",photoLicense:"CC BY 3.0",photoSource:"https://commons.wikimedia.org/wiki/File:ZHAO_LUSI_(趙露思)_P1.jpg"},
  {id:"tian-xiwei",movie:"Bộ sưu tập chân dung",role:"Chân dung sự kiện",name:"Điền Hi Vi",chinese:"田曦薇",gender:"female",style:"Hiện đại",rarity:"UR",quote:"Rực rỡ như nắng sớm đầu xuân.",symbol:"✿",initials:"曦薇",art1:"#7a4d54",art2:"#261824",accent:"#f0b6a4",photo:"https://upload.wikimedia.org/wikipedia/commons/6/68/Tian_Xiwei.jpg",photoFallback:"https://commons.wikimedia.org/wiki/Special:FilePath/Tian_Xiwei.jpg?width=700",photoCredit:"iQIYI Indonesia",photoLicense:"CC BY 3.0",photoSource:"https://commons.wikimedia.org/wiki/File:Tian_Xiwei.jpg"},
  {id:"zhao-liying",movie:"Bộ sưu tập chân dung",role:"Chân dung sự kiện",name:"Triệu Lệ Dĩnh",chinese:"赵丽颖",gender:"female",style:"Hiện đại",rarity:"SSR",quote:"Kiên định đi qua mọi chương đời.",symbol:"❋",initials:"丽颖",art1:"#485d6b",art2:"#141a29",accent:"#b4d5d5",photo:"https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f3/Zanilia_Zhao_from_%22The_Unseen_Sister%22_at_Red_Carpet_of_the_Tokyo_International_Film_Festival_2024_%2854578224190%29.jpg/960px-Zanilia_Zhao_from_%22The_Unseen_Sister%22_at_Red_Carpet_of_the_Tokyo_International_Film_Festival_2024_%2854578224190%29.jpg",photoFallback:"https://commons.wikimedia.org/wiki/Special:FilePath/Zanilia_Zhao_from_%22The_Unseen_Sister%22_at_Red_Carpet_of_the_Tokyo_International_Film_Festival_2024_%2854578224190%29.jpg?width=700",photoCredit:"Dick Thomas Johnson",photoLicense:"CC BY 2.0",photoSource:"https://commons.wikimedia.org/wiki/File:Zanilia_Zhao_from_%22The_Unseen_Sister%22_at_Red_Carpet_of_the_Tokyo_International_Film_Festival_2024_(54578224190).jpg"},
  {id:"dilraba",movie:"Bộ sưu tập chân dung",role:"Chân dung sự kiện",name:"Địch Lệ Nhiệt Ba",chinese:"迪丽热巴",gender:"female",style:"Hiện đại",rarity:"SR",quote:"Lấp lánh theo cách không ai thay thế.",symbol:"✧",initials:"热巴",art1:"#6b3b48",art2:"#211520",accent:"#ef9bb2",photo:"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a4/Dilraba_Dilmurat.jpg/330px-Dilraba_Dilmurat.jpg",photoFallback:"https://commons.wikimedia.org/wiki/Special:FilePath/Dilraba_Dilmurat.jpg?width=700",photoCredit:"PlayIn",photoLicense:"CC BY 3.0",photoSource:"https://commons.wikimedia.org/wiki/File:Dilraba_Dilmurat.jpg"},
  {id:"yang-zi",movie:"Bộ sưu tập chân dung",role:"Chân dung sự kiện",name:"Dương Tử",chinese:"杨紫",gender:"female",style:"Hiện đại",rarity:"R",quote:"Sự ấm áp khiến câu chuyện gần hơn.",symbol:"♡",initials:"杨紫",art1:"#67513f",art2:"#1c1a1b",accent:"#e6c69c",photo:"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/Yang_Zi_at_Ryo_band_promotion%2C_Wuhan_of_China%2C_12_April_2019.jpg/330px-Yang_Zi_at_Ryo_band_promotion%2C_Wuhan_of_China%2C_12_April_2019.jpg",photoFallback:"https://commons.wikimedia.org/wiki/Special:FilePath/Yang_Zi_at_Ryo_band_promotion%2C_Wuhan_of_China%2C_12_April_2019.jpg?width=700",photoCredit:"Nascent·恆星",photoLicense:"CC BY-SA 4.0",photoSource:"https://commons.wikimedia.org/wiki/File:Yang_Zi_at_Ryo_band_promotion,_Wuhan_of_China,_12_April_2019.jpg"},
  {id:"bai-lu",movie:"Bộ sưu tập chân dung",role:"Chân dung sự kiện",name:"Bạch Lộc",chinese:"白鹿",gender:"female",style:"Cổ trang",rarity:"SR",quote:"Dịu dàng cũng có thể đầy bản lĩnh.",symbol:"☾",initials:"白鹿",art1:"#45415e",art2:"#171526",accent:"#b7a9ef",photo:"https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Bai_Lu.jpg/330px-Bai_Lu.jpg",photoFallback:"https://commons.wikimedia.org/wiki/Special:FilePath/Bai_Lu.jpg?width=700",photoCredit:"iQIYI Indonesia",photoLicense:"CC BY 3.0",photoSource:"https://commons.wikimedia.org/wiki/File:Bai_Lu.jpg"},
];
const baseCharacters = characters.map(c => ({...c}));
/* Single source for tier order, labels, collection/reveal palettes and gacha weights.
   Weights total 1000: N 39.8%, R 28.7%, SR 18%, SSR 10.2%, UR 3%, SP 0.3%.
   When SP exists in the deck, its chance is kept at exactly 0.3%; remaining tiers
   share the remaining 99.7% in proportion to their configured weights. */
const rarityInfo = {
  N:  {label:"N · NORMAL",     shortLabel:"Thường",     color:"#b8c4d9", weight:398, luck:8,   revealDelay:530, effect:"n",  toastPrefix:"✧ THƯỜNG! ",     art:["#39455c","#111522","#b8c4d9"]},
  R:  {label:"R · COMMON",     shortLabel:"Phổ biến",   color:"#aab5c9", weight:287, luck:25,  revealDelay:700, effect:"r",  toastPrefix:"✧ ",             art:["#67513f","#1c1a1b","#e6c69c"]},
  SR: {label:"SR · RARE",      shortLabel:"Hiếm",       color:"#72b6ff", weight:180, luck:50,  revealDelay:980, effect:"sr", toastPrefix:"✧ HIẾM! ",       art:["#214b57","#101a25","#6ec6c2"]},
  SSR:{label:"SSR · SUPER RARE",shortLabel:"Siêu hiếm", color:"#c18aff", weight:102, luck:78,  revealDelay:1320,effect:"ssr",toastPrefix:"✦ SIÊU HIẾM! ",  art:["#45415e","#171526","#b7a9ef"]},
  UR: {label:"UR · LEGENDARY", shortLabel:"Huyền thoại",color:"#ffca75", weight:30,  luck:94,  revealDelay:1750,effect:"ur", toastPrefix:"✨ HUYỀN THOẠI! ",art:["#5a3d29","#1b1520","#ffca75"]},
  SP: {label:"SP · SPECIAL",   shortLabel:"Đặc biệt",   color:"#ff85d4", weight:3,   luck:100, revealDelay:2300,effect:"sp", toastPrefix:"🌟 ĐẶC BIỆT! ",  art:["#682a67","#190f2b","#ff85d4"]}
};
// Giữ nguyên khóa localStorage cũ để dữ liệu sở hữu V5 vẫn được đọc.
const STORAGE_KEY = "starry-cbiz-cards-v1";
const DB_NAME="starry-cbiz-manager-db";
const DB_VERSION=1;
const DB_STORE="appData";
let state = loadState();
let activeFilter = "all";
let lastCharacter = null;
let lastBatchCards = [];
let managerData = {custom:[],overrides:{},hidden:[],deleted:[]};
let pendingPhotoData = null;
let editingId = null;
let cachedEditPhoto = null;
let dbPromise = null;
let currentDetailId = null;
let toastTimer;
let batchTimerIds = [];
let skipBatchFlow = null;
const $ = id => document.getElementById(id);

// Thẻ trùng đổi thành Bụi Sao; các giá trị này là điểm nội bộ, không phải tiền thật.
const DUPLICATE_DUST = {N:1,R:2,SR:5,SSR:12,UR:35,SP:100};
function duplicateDustFor(card){return DUPLICATE_DUST[card?.rarity] || 1;}
function clearBatchTimers(){for(const timerId of batchTimerIds)clearTimeout(timerId);batchTimerIds=[];}
function scheduleBatchTimer(callback,delay){
  const timerId=window.setTimeout(()=>{batchTimerIds=batchTimerIds.filter(item=>item!==timerId);callback();},delay);
  batchTimerIds.push(timerId);return timerId;
}

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

function renderRarityControls(){
  const select=$("fieldRarity"),legend=$("rarityLegend");
  if(select){
    select.replaceChildren();
    for(const [rarity,info] of Object.entries(rarityInfo)){
      const option=document.createElement("option");option.value=rarity;option.textContent=rarity+" · "+info.shortLabel;
      select.appendChild(option);
    }
    select.value="SSR";
  }
  if(legend){
    legend.replaceChildren();
    for(const [rarity,info] of Object.entries(rarityInfo)){
      const row=document.createElement("span"),dot=document.createElement("i"),name=document.createTextNode(" "+rarity+" "),description=document.createElement("small");
      dot.className="dot "+info.effect;dot.setAttribute("aria-hidden","true");description.textContent=info.shortLabel;
      row.append(dot,name,description);legend.appendChild(row);
    }
  }
}
renderRarityControls();

function getAvailableRarityWeights(){
  const available=Object.entries(rarityInfo).filter(([rarity])=>characters.some(card=>card.rarity===rarity));
  if(!available.length)return [];
  const spAvailable=available.some(([rarity])=>rarity==="SP");
  const nonSp=available.filter(([rarity])=>rarity!=="SP");
  const nonSpTotal=nonSp.reduce((sum,[,info])=>sum+info.weight,0);
  if(spAvailable&&nonSpTotal>0){
    return available.map(([rarity,info])=>({rarity,info,weight:rarity==="SP"?3:info.weight*997/nonSpTotal}));
  }
  // If SP is unavailable (or is the only remaining tier), normalize the pool
  // rather than assigning probability to tiers with no cards.
  const total=available.reduce((sum,[,info])=>sum+info.weight,0);
  return available.map(([rarity,info])=>({rarity,info,weight:total?info.weight*1000/total:0}));
}
function renderRarityOdds(){
  const target=$("rarityOdds");if(!target)return;
  const available=getAvailableRarityWeights();
  const total=available.reduce((sum,item)=>sum+item.weight,0);
  target.textContent=total?"Tỉ lệ hiện tại: "+available.map(({rarity,weight})=>rarity+" "+(weight/total*100).toLocaleString("vi-VN",{maximumFractionDigits:2})+"%").join(" · "):"Kho thẻ đang trống.";
}

function loadState(){
  try {
    const parsed=JSON.parse(localStorage.getItem(STORAGE_KEY));
    if(parsed&&typeof parsed==="object")return {
      owned:parsed.owned&&typeof parsed.owned==="object"?parsed.owned:{},
      favorites:Array.isArray(parsed.favorites)?parsed.favorites:[],
      stardust:Math.max(0,Number(parsed.stardust)||0)
    };
  } catch(error){console.warn("Không thể đọc bộ sưu tập đã lưu:",error);}
  return {owned:{},favorites:[],stardust:0};
}
function genderLabel(gender){return gender==="male"?"Nam":gender==="female"?"Nữ":"Khác / nhóm";}
function saveState(){
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}
  catch(error){showToast("Không thể lưu dữ liệu. Hãy kiểm tra dung lượng trình duyệt.");}
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
function weightedRandom(){
  if(!characters.length)return null;
  const available=getAvailableRarityWeights();
  const total=available.reduce((sum,item)=>sum+item.weight,0);
  if(!total)return null;
  let roll=Math.random()*total,chosen=available[0].rarity;
  for(const item of available){roll-=item.weight;if(roll<0){chosen=item.rarity;break;}}
  const pool=characters.filter(card=>card.rarity===chosen);
  return pool[Math.floor(Math.random()*pool.length)]||null;
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
function displayMainCard(card){
  const info=rarityInfo[card.rarity]||rarityInfo.SR;
  lastCharacter=card;
  $("cardRarity").textContent=info.label;$("cardRarity").style.setProperty("--rarity",info.color);
  $("cardName").textContent=card.name;$("cardChinese").textContent=card.chinese||"";
  $("cardGender").textContent=genderLabel(card.gender);$("cardStyle").textContent=displayStyleLabel(card.style);
  $("cardMovie").textContent=card.movie+(card.role?" · "+card.role:"");
  $("cardQuote").textContent="“"+card.quote+"”";$("artSymbol").textContent=card.symbol||"✦";
  $("artCaption").textContent=card.movie.toUpperCase();$("portraitInitials").textContent=card.initials||makeInitials(card.chinese,card.name);
  const art=$("cardArt");art.style.setProperty("--art1",card.art1);art.style.setProperty("--art2",card.art2);art.style.setProperty("--accent",card.accent);
  art.classList.remove("has-photo");art.querySelectorAll(".actor-photo").forEach(img=>img.remove());setCardImage(art,card,"actor-photo","Ảnh "+card.name+" trong "+card.movie);
  const visibleCard=$("characterCard");visibleCard.classList.remove(...Object.values(rarityInfo).map(item=>"rarity-"+item.effect));visibleCard.classList.add("rarity-"+info.effect);
  visibleCard.style.setProperty("--rarity",info.color);visibleCard.style.setProperty("--art1",card.art1);visibleCard.style.setProperty("--art2",card.art2);visibleCard.style.setProperty("--accent",card.accent);
  visibleCard.classList.remove("hidden");$("cardBack").classList.add("hidden");
  return info;
}
function resetBatchExperience(){
  clearBatchTimers();skipBatchFlow=null;
  const page=$("page-open");page.classList.remove("is-batch-focus");
  $("batchReveal").hidden=true;$("batchSpotlight").hidden=true;$("batchSummaryStats").hidden=true;
  $("batchResultsHeading").hidden=true;$("batchGrid").hidden=true;$("batchFooterActions").hidden=true;
  $("batchGrid").replaceChildren();$("batchShowAllBtn").hidden=false;
  $("summonKicker").hidden=true;$("skipBatchBtn").hidden=true;
  const stage=document.querySelector(".stage");stage.classList.remove("batch-summoning");
  $("openBtn").disabled=false;$("openTenBtn").disabled=false;
}
function openCard(){
  if(!characters.length){showToast("Kho thẻ đang trống. Hãy thêm thẻ hoặc khôi phục thẻ mẫu.");return;}
  resetBatchExperience();
  const btn=$("openBtn"),tenBtn=$("openTenBtn");btn.disabled=true;if(tenBtn)tenBtn.disabled=true;$("againBtn").hidden=true;
  $("revealHint").textContent="Ánh sao đang hội tụ…";
  $("characterCard").classList.add("hidden");$("cardBack").classList.remove("hidden");$("cardBack").style.opacity="1";$("cardBack").style.transform="rotateY(0)";
  const card=weightedRandom();
  if(!card){btn.disabled=false;if(tenBtn)tenBtn.disabled=false;return;}
  const stage=document.querySelector(".stage");
  stage.style.setProperty("--rarity",rarityInfo[card.rarity].color);
  const openingClasses=Object.values(rarityInfo).map(info=>"opening-rarity-"+info.effect);
  stage.classList.remove(...openingClasses);
  $("cardBack").classList.remove("charging");
  stage.classList.add("opening-rarity-"+card.rarity.toLowerCase());
  $("cardBack").classList.add("charging");
  const revealDelay=rarityInfo[card.rarity]?.revealDelay||650;
  setTimeout(()=>{
    $("cardBack").classList.remove("charging");
    stage.classList.remove(...openingClasses);
    const info=displayMainCard(card);
    const isDuplicate=(Number(state.owned[card.id])||0)>0;
    const dustReward=isDuplicate?duplicateDustFor(card):0;
    $("revealHint").textContent=isDuplicate?"Bạn đã sở hữu phiên bản này rồi! +"+dustReward+" Bụi Sao":"Một thẻ mới gia nhập bộ sưu tập!";
    state.owned[card.id]=(Number(state.owned[card.id])||0)+1;
    if(dustReward)state.stardust=(Number(state.stardust)||0)+dustReward;
    saveState();renderCollection();updateStats();
    $("luckLabel").textContent=card.rarity;$("luckBar").style.width=info.luck+"%";$("againBtn").hidden=false;btn.disabled=false;if(tenBtn)tenBtn.disabled=false;
    showToast(info.toastPrefix+card.name+" · "+card.movie+(dustReward?" · +"+dustReward+" Bụi Sao":""));
  },revealDelay);
}
function renderBatchSpotlight(card,result){
  const info=rarityInfo[card.rarity]||rarityInfo.R,art=$("batchSpotlightArt"),spotlight=$("batchSpotlight");
  spotlight.className="batch-spotlight rarity-"+card.rarity.toLowerCase();spotlight.style.setProperty("--rarity",info.color);
  art.className="spotlight-art rarity-"+card.rarity.toLowerCase();
  art.style.setProperty("--rarity",info.color);art.style.setProperty("--art1",card.art1||info.art[0]);art.style.setProperty("--art2",card.art2||info.art[1]);art.style.setProperty("--accent",card.accent||info.art[2]);
  art.querySelectorAll("img.spotlight-photo").forEach(image=>image.remove());art.classList.remove("has-photo");
  $("batchSpotlightInitials").textContent=card.initials||makeInitials(card.chinese,card.name);
  $("batchSpotlightTier").textContent=card.rarity;$("batchSpotlightRarity").textContent=info.label;$("batchSpotlightRarity").style.color=info.color;
  $("batchSpotlightName").textContent=card.name;$("batchSpotlightMovie").textContent=card.movie+(card.role?" · "+card.role:"");
  $("batchSpotlightQuote").textContent="“"+(card.quote||"Một ngôi sao, một câu chuyện.")+"”";
  $("batchSpotlightCopy").textContent=result.duplicate?"↻ Bản trùng · ×"+result.copyNumber+" · nhận "+duplicateDustFor(card)+" Bụi Sao":"✦ Lần đầu sở hữu thẻ này";
  setCardImage(art,card,"spotlight-photo","Ảnh nổi bật của "+card.name+" trong "+card.movie);
}
function openTenCards(){
  if(!characters.length){showToast("Kho thẻ đang trống. Hãy thêm thẻ hoặc khôi phục thẻ mẫu.");return;}
  resetBatchExperience();
  const buttons=[$("openBtn"),$("openTenBtn")];buttons.forEach(button=>{if(button)button.disabled=true;});
  $("againBtn").hidden=true;$("characterCard").classList.add("hidden");$("cardBack").classList.remove("hidden");$("cardBack").style.opacity="1";$("cardBack").style.transform="rotateY(0)";
  $("revealHint").textContent="Mười lá bài đang được gọi về…";$("summonKicker").hidden=false;$("skipBatchBtn").hidden=false;lastBatchCards=[];
  const pulled=Array.from({length:10},()=>weightedRandom()).filter(Boolean);
  if(!pulled.length){buttons.forEach(button=>{if(button)button.disabled=false;});$("summonKicker").hidden=true;$("skipBatchBtn").hidden=true;return;}
  const rarityRank={N:0,R:1,SR:2,SSR:3,UR:4,SP:5};
  const orderedPulled=pulled.map((card,index)=>({card,index})).sort((a,b)=>rarityRank[b.card.rarity]-rarityRank[a.card.rarity]||a.index-b.index).map(item=>item.card);
  const highlight=orderedPulled[0],seen=new Map();
  const results=orderedPulled.map(card=>{
    const previous=(Number(state.owned[card.id])||0)+(seen.get(card.id)||0);
    seen.set(card.id,(seen.get(card.id)||0)+1);
    return {card,duplicate:previous>0,copyNumber:previous+1};
  });
  lastBatchCards=orderedPulled.slice();
  const duplicateCount=results.filter(result=>result.duplicate).length;
  const newCount=results.length-duplicateCount;
  const dustEarned=results.reduce((sum,result)=>sum+(result.duplicate?duplicateDustFor(result.card):0),0);
  const stage=document.querySelector(".stage"),openingClasses=Object.values(rarityInfo).map(info=>"opening-rarity-"+info.effect);
  // Intentionally use the exact same rarity classes and delay as openCard(). The former
  // batch-summoning class overrode some tier effects and made UR/SP feel rushed.
  stage.classList.remove(...openingClasses,"batch-summoning");stage.style.setProperty("--rarity",rarityInfo[highlight.rarity].color);
  $("cardBack").classList.remove("charging");stage.classList.add("opening-rarity-"+highlight.rarity.toLowerCase());$("cardBack").classList.add("charging");
  const reducedMotion=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wait=reducedMotion?80:rarityInfo[highlight.rarity].revealDelay;
  let heroCommitted=false,spotlightShown=false,allResultsShown=false;
  function enterSpotlight(){
    if(spotlightShown)return;
    spotlightShown=true;
    renderBatchSpotlight(highlight,results[0]);
    $("batchSpotlight").hidden=false;$("batchReveal").hidden=false;
    $("batchSummary").textContent="Thẻ nổi bật đã lộ diện. Những lá còn lại sắp được lật.";
    $("page-open").classList.add("is-batch-focus");$("skipBatchBtn").hidden=true;$("summonKicker").hidden=true;
    $("batchReveal").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});
    if(!reducedMotion){
      const spotlightHold=highlight.rarity==="SP"?2600:highlight.rarity==="UR"?2300:highlight.rarity==="SSR"?2050:1750;
      scheduleBatchTimer(showResults,spotlightHold);
    }
  }
  function showHero(){
    if(heroCommitted)return;
    heroCommitted=true;
    $("cardBack").classList.remove("charging");stage.classList.remove(...openingClasses,"batch-summoning");
    const bestInfo=displayMainCard(highlight),firstResult=results[0];
    $("revealHint").textContent="Thẻ cao nhất trong 10 thẻ: "+highlight.rarity+" · "+highlight.name+(firstResult.duplicate?" (bản trùng).":"!");
    // Hold the central card reveal briefly, then transition to the full results scene.
    for(const card of orderedPulled)state.owned[card.id]=(Number(state.owned[card.id])||0)+1;
    state.stardust=(Number(state.stardust)||0)+dustEarned;
    saveState();renderCollection();updateStats();
    $("luckLabel").textContent=highlight.rarity;$("luckBar").style.width=bestInfo.luck+"%";
    if(reducedMotion){enterSpotlight();showResults();}
    else {
      // Let the same full-card reveal animation finish before transitioning to spotlight.
      const revealAnimationHold={N:750,R:800,SR:1000,SSR:1320,UR:1750,SP:2050}[highlight.rarity]||1100;
      scheduleBatchTimer(enterSpotlight,revealAnimationHold);
    }
  }
  function showResults(){
    if(allResultsShown)return;
    if(!heroCommitted)showHero();
    if(!spotlightShown)enterSpotlight();
    allResultsShown=true;clearBatchTimers();
    renderBatchResults(results);$("batchGrid").hidden=false;$("batchSummaryStats").hidden=false;$("batchResultsHeading").hidden=false;$("batchFooterActions").hidden=false;
    $("batchNewCount").textContent=String(newCount);$("batchDuplicateCount").textContent=String(duplicateCount);
    $("batchDustEarned").textContent="+"+dustEarned.toLocaleString("vi-VN");$("batchDustBalance").textContent=(Number(state.stardust)||0).toLocaleString("vi-VN");
    $("batchSummary").textContent="10 lượt mở · "+newCount+" thẻ mới · "+duplicateCount+" thẻ trùng · độ hiếm cao nhất: "+highlight.rarity+".";
    $("batchShowAllBtn").hidden=true;$("skipBatchBtn").hidden=true;$("summonKicker").hidden=true;
    buttons.forEach(button=>{if(button)button.disabled=false;});skipBatchFlow=null;
    showToast("✦ Mở x10 hoàn tất · "+highlight.rarity+" là cấp cao nhất · +"+dustEarned+" Bụi Sao.");
  }
  skipBatchFlow=()=>{clearBatchTimers();if(!heroCommitted)showHero();if(!spotlightShown)enterSpotlight();showResults();};
  scheduleBatchTimer(showHero,wait);
}
function renderBatchResults(results){
  const grid=$("batchGrid");grid.replaceChildren();
  for(const result of results){
    const card=normalizeCard(result.card),info=rarityInfo[card.rarity]||rarityInfo.R;
    const article=document.createElement("article");article.className="batch-card rarity-"+card.rarity.toLowerCase();
    article.setAttribute("role","button");article.setAttribute("tabindex","0");article.setAttribute("aria-label","Xem chi tiết thẻ "+card.name+" trong phim "+card.movie);article.title="Nhấn để xem hồ sơ chi tiết";
    const openDetails=()=>showCharacterDetails(card.id);article.addEventListener("click",openDetails);article.addEventListener("keydown",event=>{if((event.key==="Enter"||event.key===" ")&&event.target===article){event.preventDefault();openDetails();}});
    article.style.setProperty("--rarity",info.color);article.style.setProperty("--art1",card.art1||info.art[0]);article.style.setProperty("--art2",card.art2||info.art[1]);article.style.setProperty("--accent",card.accent||info.art[2]);
    const art=document.createElement("div");art.className="batch-art";
    const initials=document.createElement("strong");initials.className="batch-initials";initials.textContent=card.initials||makeInitials(card.chinese,card.name);
    const tier=document.createElement("span");tier.className="batch-art-tier";tier.textContent=card.rarity;
    const glow=document.createElement("span");glow.className="batch-starfield";glow.setAttribute("aria-hidden","true");art.append(initials,tier,glow);
    setCardImage(art,card,"batch-photo","Ảnh "+card.name+" trong "+card.movie);article.appendChild(art);
    const content=document.createElement("div");content.className="batch-info";
    const rarity=document.createElement("p");rarity.className="batch-rarity";rarity.textContent=info.label;
    const name=document.createElement("h3");name.textContent=card.name;
    const movie=document.createElement("p");movie.className="batch-movie";movie.textContent=card.movie;
    const role=document.createElement("p");role.className="batch-role";role.textContent=card.role||displayStyleLabel(card.style)||"Thẻ phim";
    const copy=document.createElement("span");copy.className="batch-copy"+(result.duplicate?" is-duplicate":"");copy.textContent=result.duplicate?"↻ Trùng · ×"+result.copyNumber+" · +"+duplicateDustFor(card)+" Bụi Sao":"✦ Mới sở hữu";
    content.append(rarity,name,movie,role,copy);article.appendChild(content);grid.appendChild(article);
  }
}
function closeBatchExperience(){
  resetBatchExperience();$("page-open").scrollTop=0;showAppPage("open");
  $("revealHint").textContent="Tập trung năng lượng… ngôi sao đang chờ bạn.";
}
$("openTenBtn").addEventListener("click",openTenCards);
$("skipBatchBtn").addEventListener("click",()=>{if(skipBatchFlow)skipBatchFlow();});
$("batchShowAllBtn").addEventListener("click",()=>{if(skipBatchFlow)skipBatchFlow();});
$("batchCloseBtn").addEventListener("click",closeBatchExperience);
$("batchCollectionBtn").addEventListener("click",()=>{closeBatchExperience();showAppPage("collection");});
$("batchAgainBtn").addEventListener("click",()=>{closeBatchExperience();openTenCards();});

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
        article.setAttribute("role","button");article.setAttribute("tabindex","0");article.setAttribute("aria-label","Xem thẻ "+card.name+" trong phim "+movie);article.title="Nhấn để xem thẻ "+card.name;
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
      infoBox.append(rarity,name,meta);article.appendChild(infoBox);
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

function showCharacterDetails(id,allowUnowned=false){
  const card=characters.find(item=>item.id===id);if(!card||(!allowUnowned&&!(state.owned[id]>0)))return;
  currentDetailId=id;const dialog=$("characterDetailDialog"),visual=$("detailVisual"),photo=$("detailPhoto"),initials=$("detailInitials");const info=rarityInfo[card.rarity]||rarityInfo.R;visual.classList.remove(...Object.values(rarityInfo).map(item=>"rarity-"+item.effect));visual.classList.add("rarity-"+info.effect);visual.style.setProperty("--rarity",info.color);
  $("detailName").textContent=card.name||"Chưa đặt tên";$("detailChinese").textContent=card.chinese||"Chưa có tên tiếng Trung";
  $("detailGender").textContent=genderLabel(card.gender);$("detailStyle").textContent=displayStyleLabel(card.style);$("detailRarity").textContent=info.label;$("detailRarity").style.color=info.color;
  $("detailCount").textContent="×"+(state.owned[id]||0);$("detailQuote").textContent=card.quote||"Một ngôi sao, một câu chuyện.";
  $("detailMovie").textContent=card.movie||"Bộ sưu tập chân dung";$("detailRole").textContent=card.role||"Chưa nhập";
  visual.style.setProperty("--art1",card.art1||"#292f46");visual.style.setProperty("--art2",card.art2||"#111522");visual.style.setProperty("--accent",card.accent||"#a1a8c9");
  initials.textContent=card.initials||makeInitials(card.chinese,card.name);photo.hidden=true;photo.removeAttribute("src");photo.dataset.fallbackTried="0";photo.alt="Ảnh "+card.name+" trong "+card.movie;visual.classList.remove("has-detail-photo");
  if(card.photo){photo.hidden=false;photo.src=card.photo;photo.onerror=()=>{if(card.photoFallback&&photo.dataset.fallbackTried!=="1"){photo.dataset.fallbackTried="1";photo.src=card.photoFallback;}else{photo.hidden=true;visual.classList.remove("has-detail-photo");}};photo.onload=()=>visual.classList.add("has-detail-photo");}
  const isOwned=(Number(state.owned[id])||0)>0;
  const favorite=$("detailFavoriteBtn");favorite.hidden=!isOwned;favorite.textContent=state.favorites.includes(id)?"♥ Đã yêu thích · Bỏ đánh dấu":"♡ Thêm yêu thích";favorite.classList.toggle("is-favorite",state.favorites.includes(id));
  $("detailDeleteBtn").hidden=!isOwned;
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
// Bảng xếp hạng dùng dữ liệu trong toàn bộ kho thẻ hiện có, không đọc state sở hữu.
// Nhan sắc = P / N + N; P là tổng điểm các biến thể thẻ khác nhau, N là số phim khác nhau.
let leaderboardGender = "female";
let leaderboardMode = "hot";
const leaderboardRarityPoints = {N:1,R:2,SR:4,SSR:7,UR:12,SP:20};
function buildActorRankingData(){
  const byName=new Map();
  for(const card of characters){
    const actorKey=normalizedSearchKey(card.name);
    if(!actorKey)continue;
    if(!byName.has(actorKey))byName.set(actorKey,{key:actorKey,name:card.name,cards:[],genderCounts:{male:0,female:0},movies:new Set()});
    const actor=byName.get(actorKey);actor.cards.push(card);
    if(card.gender==="male"||card.gender==="female")actor.genderCounts[card.gender]++;
    const movie=String(card.movie||"").trim();
    if(movie&&!isGenericCollectionTitle(movie))actor.movies.add(normalizedSearchKey(movie));
  }
  return [...byName.values()].map(actor=>{
    actor.gender=actor.genderCounts.female>actor.genderCounts.male?"female":actor.genderCounts.male>actor.genderCounts.female?"male":(actor.cards.find(card=>card.gender==="male"||card.gender==="female")?.gender||"other");
    // A catalog card is distinct by film + role + rarity for one actor. Legacy outfit labels
    // and player-owned copies do not create extra ranking points.
    actor.systemCards=[...new Map(actor.cards.map((card,index)=>{
      const identity=[normalizedSearchKey(card.movie),normalizedSearchKey(card.role),String(card.rarity||"N").toUpperCase()].join("::");
      return [identity||String(card.id||`${actor.key}-card-${index}`),card];
    })).values()];
    actor.hotScore=actor.movies.size;
    actor.catalogCardPoints=actor.systemCards.reduce((sum,card)=>sum+(leaderboardRarityPoints[card.rarity]||1),0);
    actor.cardCount=actor.systemCards.length;
    // A defined score requires at least one concrete film; portrait-only entries have N = 0.
    actor.beautyScore=actor.hotScore>0?(actor.catalogCardPoints/actor.hotScore)+actor.hotScore:0;
    return actor;
  });
}
function compareVietnamese(a,b){return String(a).localeCompare(String(b),"vi",{sensitivity:"base"});}
function getActorRankingAvatar(actor,mode){
  const candidates=actor.systemCards||actor.cards;
  const rarityOrder={SP:6,UR:5,SSR:4,SR:3,R:2,N:1};
  return [...candidates].sort((a,b)=>(rarityOrder[b.rarity]||0)-(rarityOrder[a.rarity]||0)||compareVietnamese(a.movie,b.movie))[0]||null;
}
function makeLeaderboardAvatar(actor,mode){
  const avatar=document.createElement("div");avatar.className="leaderboard-avatar";
  const card=getActorRankingAvatar(actor,mode);
  if(card){
    const image=document.createElement("img");image.alt="Ảnh đại diện thẻ của "+actor.name;image.loading="lazy";image.referrerPolicy="no-referrer";
    image.onerror=()=>{image.remove();const mark=document.createElement("span");mark.textContent=card.initials||makeInitials(card.chinese,actor.name);avatar.appendChild(mark);};
    image.src=card.photo||"";
    if(card.photo){avatar.appendChild(image);}else{const mark=document.createElement("span");mark.textContent=card.initials||makeInitials(card.chinese,actor.name);avatar.appendChild(mark);}
    avatar.style.setProperty("--avatar-accent",card.accent||"#c18aff");
  }else{const mark=document.createElement("span");mark.textContent=makeInitials("",actor.name);avatar.appendChild(mark);}
  return avatar;
}
function makeLeaderboardEntry(actor,rank,mode,podium=false){
  const item=document.createElement(podium?"article":"li");item.className="leaderboard-entry rank-"+rank+(podium?" is-podium":"");
  const rankBadge=document.createElement("span");rankBadge.className="leaderboard-rank-badge";rankBadge.textContent=rank===1?"♛ "+rank:String(rank).padStart(2,"0");
  const avatar=makeLeaderboardAvatar(actor,mode);
  const identity=document.createElement("div");identity.className="leaderboard-identity";
  const name=document.createElement("strong");name.textContent=actor.name;
  const sub=document.createElement("small");
  if(mode==="hot")sub.textContent=actor.hotScore+" phim khác nhau · "+actor.cardCount+" biến thể trong kho";
  else sub.textContent="N = "+actor.hotScore+" phim · P = "+actor.catalogCardPoints+" điểm thẻ trong kho";
  identity.append(name,sub);
  const metric=document.createElement("div");metric.className="leaderboard-metric";
  const score=document.createElement("strong");
  score.textContent=mode==="hot"?String(actor.hotScore):actor.beautyScore.toLocaleString("vi-VN",{maximumFractionDigits:2});
  const label=document.createElement("span");label.textContent=mode==="hot"?"PHIM":"ĐIỂM";metric.append(score,label);
  item.append(rankBadge,avatar,identity,metric);
  return item;
}
function renderLeaderboard(){
  const page=$("page-leaderboard");if(!page)return;
  const podium=$("leaderboardPodium"),list=$("leaderboardList"),empty=$("leaderboardEmpty");
  podium.replaceChildren();list.replaceChildren();podium.hidden=true;list.hidden=true;
  document.querySelectorAll("[data-rank-gender]").forEach(button=>{const active=button.dataset.rankGender===leaderboardGender;button.classList.toggle("active",active);button.setAttribute("aria-pressed",String(active));});
  document.querySelectorAll("[data-rank-mode]").forEach(button=>{const active=button.dataset.rankMode===leaderboardMode;button.classList.toggle("active",active);button.setAttribute("aria-pressed",String(active));});
  const allActors=buildActorRankingData();
  const actors=allActors.filter(actor=>actor.gender===leaderboardGender);
  $("leaderboardRules").textContent=leaderboardMode==="hot"
    ?"Độ hot = số phim khác nhau ghi nhận trong kho dữ liệu hệ thống. Các thẻ cùng một phim chỉ tính một phim; mục “Bộ sưu tập chân dung” không tính là phim."
    :"Điểm Nhan sắc = P / N + N. P là tổng điểm các thẻ khác nhau trong kho hệ thống (N = 1 · R = 2 · SR = 4 · SSR = 7 · UR = 12 · SP = 20); N là số phim khác nhau có trong dữ liệu của diễn viên. Không phụ thuộc thẻ người chơi sở hữu hay số bản trùng. Thẻ chỉ thuộc bộ sưu tập chân dung không được tính là một phim.";
  const sorted=actors.filter(actor=>actor.hotScore>0).sort((a,b)=>{
    const scoreKey=leaderboardMode==="hot"?"hotScore":"beautyScore";
    return b[scoreKey]-a[scoreKey]||b.hotScore-a.hotScore||b.catalogCardPoints-a.catalogCardPoints||compareVietnamese(a.name,b.name);
  });
  $("leaderboardActorCount").textContent=sorted.length;
  empty.hidden=sorted.length>0;
  if(!sorted.length){
    $("leaderboardEmptyTitle").textContent=leaderboardMode==="hot"?"Chưa có dữ liệu phim cụ thể":"Chưa có dữ liệu phim để tính điểm nhan sắc";
    $("leaderboardEmptyText").textContent=leaderboardMode==="hot"
      ?"Các thẻ mẫu hiện là ảnh chân dung, chưa gắn với tên phim. Vào Quản lý thẻ để thêm thẻ có tên phim cụ thể; bảng xếp hạng sẽ tự cập nhật và đếm phim không trùng."
      :"Hãy ghi tên phim cụ thể trong kho thẻ. Điểm được tính từ toàn bộ biến thể thẻ và phim hiện có trong hệ thống, không phụ thuộc những thẻ bạn đã sưu tầm.";
    return;
  }
  if(sorted.length>=3){
    podium.hidden=false;list.hidden=sorted.length<=3;
    const podiumActors=sorted.slice(0,3);
    // Center the winner visually while preserving rank labels: 2nd, 1st, 3rd.
    const displayOrder=[podiumActors[1],podiumActors[0],podiumActors[2]];
    displayOrder.forEach(actor=>podium.appendChild(makeLeaderboardEntry(actor,sorted.indexOf(actor)+1,leaderboardMode,true)));
    sorted.slice(3).forEach((actor,index)=>list.appendChild(makeLeaderboardEntry(actor,index+4,leaderboardMode,false)));
  }else{
    // Until three actors have meaningful scores, show full-width ranked rows rather than an awkward half-empty podium.
    list.hidden=false;
    sorted.forEach((actor,index)=>list.appendChild(makeLeaderboardEntry(actor,index+1,leaderboardMode,false)));
  }
}
for(const button of document.querySelectorAll("[data-rank-gender]"))button.addEventListener("click",()=>{leaderboardGender=button.dataset.rankGender;renderLeaderboard();});
for(const button of document.querySelectorAll("[data-rank-mode]"))button.addEventListener("click",()=>{leaderboardMode=button.dataset.rankMode;renderLeaderboard();});
$("leaderboardAddCardsBtn").addEventListener("click",()=>{showAppPage("manager");startAddCharacter();});

function updateStats(){
  const total=Object.values(state.owned).reduce((sum,value)=>sum+(Number(value)||0),0);
  const unique=characters.filter(card=>(state.owned[card.id]||0)>0).length;
  $("totalOwned").textContent=total;$("uniqueOwned").textContent=unique;$("totalCards").textContent=characters.length;
  const dust=$("stardustBalance");if(dust)dust.textContent=(Number(state.stardust)||0).toLocaleString("vi-VN");
  if($("page-leaderboard")?.classList.contains("active"))renderLeaderboard();
}
function showToast(message){const toast=$("toast");toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2800);}


function showAppPage(pageName){
  const allowed=["open","collection","leaderboard","manager","info"];
  const page=allowed.includes(pageName)?pageName:"open";
  document.querySelectorAll("[data-app-page]").forEach(section=>{
    const active=section.dataset.appPage===page;
    section.hidden=!active;
    section.classList.toggle("active",active);
  });
  document.querySelectorAll(".nav-tab[data-page]").forEach(button=>{
    const active=button.dataset.page===page;
    button.classList.toggle("active",active);
    if(active)button.setAttribute("aria-current","page");else button.removeAttribute("aria-current");
  });
  // Keep the overall app frame still; reset only the newly selected page's
  // own scroll area instead of moving the browser window.
  const activeSection=document.querySelector(`[data-app-page="${page}"]`);
  if(activeSection)activeSection.scrollTop=0;
  if(page==="leaderboard")renderLeaderboard();
}
document.querySelectorAll(".nav-tab[data-page]").forEach(button=>button.addEventListener("click",()=>showAppPage(button.dataset.page)));
document.querySelector(".brand")?.addEventListener("click",event=>{event.preventDefault();showAppPage("open");});

$("openBtn").addEventListener("click",openCard);$("againBtn").addEventListener("click",openCard);
$("emptyOpenBtn").addEventListener("click",()=>{showAppPage("open");openCard();});
document.querySelectorAll(".filter").forEach(button=>button.addEventListener("click",()=>{
  document.querySelectorAll(".filter").forEach(item=>{const active=item===button;item.classList.toggle("active",active);item.setAttribute("aria-pressed",String(active));});activeFilter=button.dataset.filter;renderCollection();
}));
const collectionSearchInput=$("collectionSearch"),clearCollectionSearchButton=$("clearCollectionSearch");
collectionSearchInput.addEventListener("input",()=>{clearCollectionSearchButton.hidden=!collectionSearchInput.value;renderCollection();});
clearCollectionSearchButton.addEventListener("click",()=>{collectionSearchInput.value="";clearCollectionSearchButton.hidden=true;renderCollection();collectionSearchInput.focus();});
$("resetBtn").addEventListener("click",()=>{
  if(!Object.keys(state.owned).length&&!state.favorites.length&&!(Number(state.stardust)||0)){showToast("Bạn chưa có tiến độ nào cần đặt lại.");return;}
  if(confirm("Xóa toàn bộ tiến độ sưu tầm, yêu thích và Bụi Sao? Danh sách thẻ/phim sẽ được giữ nguyên.")){
    state={owned:{},favorites:[],stardust:0};saveState();renderCollection();updateStats();resetBatchExperience();lastBatchCards=[];$("characterCard").classList.add("hidden");$("cardBack").classList.remove("hidden");$("againBtn").hidden=true;$("revealHint").textContent="Tập trung năng lượng… ngôi sao đang chờ bạn.";$("luckLabel").textContent="Đang chờ";$("luckBar").style.width="15%";showToast("Đã đặt lại tiến độ sưu tầm.");
  }
});

// IndexedDB stores custom cards, modified built-in cards, visibility and deleted built-ins.
function openDatabase(){
  if(dbPromise)return dbPromise;
  dbPromise=new Promise((resolve,reject)=>{
    if(!( "indexedDB" in window)){reject(new Error("Trình duyệt không hỗ trợ IndexedDB"));return;}
    const request=indexedDB.open(DB_NAME,DB_VERSION);
    request.onupgradeneeded=()=>{const database=request.result;if(!database.objectStoreNames.contains(DB_STORE))database.createObjectStore(DB_STORE);};
    request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error||new Error("Không mở được cơ sở dữ liệu"));
  });return dbPromise;
}
async function dbGet(key){const database=await openDatabase();return new Promise((resolve,reject)=>{const request=database.transaction(DB_STORE,"readonly").objectStore(DB_STORE).get(key);request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);});}
async function dbPut(key,value){const database=await openDatabase();return new Promise((resolve,reject)=>{const tx=database.transaction(DB_STORE,"readwrite");tx.objectStore(DB_STORE).put(value,key);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error||new Error("Không thể lưu dữ liệu"));tx.onabort=()=>reject(tx.error||new Error("Đã hủy lưu dữ liệu"));});}
function normalizeManagerData(saved){
  const raw=saved&&typeof saved==="object"?saved:{};
  const overrides=raw.overrides&&typeof raw.overrides==="object"?Object.fromEntries(Object.entries(raw.overrides).map(([id,card])=>{const clean=normalizeSavedNameFields({...card});delete clean.costume;return [id,clean];})):{};
  return {custom:Array.isArray(raw.custom)?raw.custom.map(card=>normalizeCard(card)):[],overrides,hidden:Array.isArray(raw.hidden)?raw.hidden:[],deleted:Array.isArray(raw.deleted)?raw.deleted:[]};
}
async function readManagerData(){
  try{
    const saved=await dbGet("managerData");
    if(!saved||typeof saved!=="object")return normalizeManagerData(saved);
    // Migrate only the three requested display-name fields. All other user data, including photos,
    // IDs, ownership, favorites, hidden/deleted flags and custom metadata, stays intact.
    const migrated=JSON.parse(JSON.stringify(saved));
    if(Array.isArray(migrated.custom))migrated.custom.forEach(normalizeSavedNameFields);
    if(migrated.overrides&&typeof migrated.overrides==="object")Object.values(migrated.overrides).forEach(normalizeSavedNameFields);
    const changed=JSON.stringify(migrated)!==JSON.stringify(saved);
    if(changed){
      try{await dbPut("managerData",migrated);}
      catch(migrationError){console.warn("Không thể lưu chuẩn hóa chữ hoa; sẽ dùng bản đã chuẩn hóa trong phiên này:",migrationError);}
    }
    return normalizeManagerData(migrated);
  }
  catch(error){console.warn("Không đọc được IndexedDB:",error);showToast("Không đọc được ảnh/hồ sơ đã lưu. Hãy mở bằng Chrome/Edge hoặc localhost.");return normalizeManagerData(null);}
}
async function persistManagerData(){
  try{await dbPut("managerData",managerData);return true;}
  catch(error){console.error(error);showToast("Không lưu được thẻ/ảnh. Hãy kiểm tra dung lượng trình duyệt.");return false;}
}
function rebuildCharacters(){
  characters=baseCharacters.filter(card=>!managerData.hidden.includes(card.id)&&!managerData.deleted.includes(card.id)).map(base=>normalizeCard({...base,...(managerData.overrides[base.id]||{})},base)).concat(managerData.custom.map(card=>normalizeCard(card)));
  const activeIds=new Set(characters.map(card=>card.id));let changed=false;
  for(const id of Object.keys(state.owned)){if(!activeIds.has(id)){delete state.owned[id];changed=true;}}
  const favoriteCount=state.favorites.length;state.favorites=state.favorites.filter(id=>activeIds.has(id));if(state.favorites.length!==favoriteCount)changed=true;
  if(changed)saveState();
  renderCollection();updateStats();renderManagerList();renderRarityOdds();
  for(const fieldId of Object.keys(AUTOCOMPLETE_CONFIG||{})){if($(fieldId)&&$(fieldId).value.trim())renderAutocomplete(fieldId);}
}
function getAnyCharacter(id){
  const custom=managerData.custom.find(card=>card.id===id);if(custom)return normalizeCard(custom);
  const base=baseCharacters.find(card=>card.id===id);return base?normalizeCard({...base,...(managerData.overrides[id]||{})},base):null;
}
function buildPreview(photo,label){
  const preview=$("photoPreview");preview.innerHTML="";
  if(!photo){const span=document.createElement("span");span.textContent="Ảnh xem trước";preview.appendChild(span);return;}
  const img=document.createElement("img");img.src=photo;img.alt=label||"Ảnh xem trước";img.onerror=()=>{preview.innerHTML="";const span=document.createElement("span");span.textContent="Không tải được ảnh xem trước";preview.appendChild(span);};preview.appendChild(img);
}
function clearCharacterForm(){
  $("characterForm").reset();$("characterId").value="";$("fieldStyle").querySelectorAll("option[data-legacy-style]").forEach(option=>option.remove());$("fieldStyle").value="";$("fieldRarity").value="SSR";editingId=null;pendingPhotoData=null;cachedEditPhoto=null;
  for(const fieldId of ["fieldName","fieldMovie","fieldRole"]){
    const config=AUTOCOMPLETE_CONFIG[fieldId];if(config){closeAutocomplete(fieldId);const note=$(config.noteId);note.textContent="";note.classList.remove("has-match");}
  }
  $("formTitle").textContent="Thêm thẻ mới";$("saveCharacterBtn").textContent="Lưu thẻ";$("imageRequiredLabel").textContent="(bắt buộc khi thêm)";$("photoStatus").textContent="Ảnh đại diện thuộc về thẻ này.";buildPreview(null);$("characterForm").hidden=true;$("managerToggle").textContent="＋ Thêm thẻ";
}
function startAddCharacter(){clearCharacterForm();$("characterForm").hidden=false;$("managerToggle").textContent="＋ Đang thêm thẻ";$("characterForm").scrollIntoView({behavior:"smooth",block:"start"});$("fieldName").focus();}
function editCharacter(id){
  const card=getAnyCharacter(id);if(!card)return;
  editingId=id;cachedEditPhoto=card.photo||null;pendingPhotoData=null;
  $("characterId").value=id;$("fieldName").value=card.name||"";$("fieldChinese").value=card.chinese||"";$("fieldMovie").value=card.movie||"Bộ sưu tập chân dung";$("fieldRole").value=card.role||"";
  for(const fieldId of ["fieldName","fieldMovie","fieldRole"]){const config=AUTOCOMPLETE_CONFIG[fieldId];if(config){closeAutocomplete(fieldId);const note=$(config.noteId);note.textContent="";note.classList.remove("has-match");}}
  $("fieldGender").value=card.gender||"female";
  const styleSelect=$("fieldStyle");styleSelect.querySelectorAll("option[data-legacy-style]").forEach(option=>option.remove());
  const savedStyle=card.style||"";
  if(savedStyle&&!Array.from(styleSelect.options).some(option=>option.value===savedStyle)){
    const legacyOption=document.createElement("option");legacyOption.value="__legacy__:"+savedStyle;legacyOption.textContent=savedStyle+" (dữ liệu cũ · cần phân loại)";legacyOption.dataset.legacyStyle="true";styleSelect.appendChild(legacyOption);
  }
  styleSelect.value=Array.from(styleSelect.options).some(option=>option.value===savedStyle)?savedStyle:(savedStyle?"__legacy__:"+savedStyle:"");
  $("fieldRarity").value=card.rarity||"SR";$("fieldQuote").value=card.quote||"";$("fieldPhoto").value="";
  $("formTitle").textContent="Sửa thẻ: "+card.name;$("saveCharacterBtn").textContent="Lưu thay đổi";$("imageRequiredLabel").textContent="(để trống nếu giữ ảnh hiện tại)";$("photoStatus").textContent=card.photo?"Đang dùng ảnh của thẻ này. Chọn ảnh mới nếu muốn thay.":"Chưa có ảnh; bạn có thể thêm ở đây.";
  buildPreview(card.photo,card.name);$("characterForm").hidden=false;$("managerToggle").textContent="✎ Đang sửa thẻ";$("characterForm").scrollIntoView({behavior:"smooth",block:"start"});
}
function renderManagerList(){
  const list=$("managerList");if(!list)return;list.innerHTML="";
  const entries=baseCharacters.filter(base=>!managerData.deleted.includes(base.id)).map(base=>({...normalizeCard({...base,...(managerData.overrides[base.id]||{})},base),_builtIn:true,_hidden:managerData.hidden.includes(base.id)})).concat(managerData.custom.map(card=>({...normalizeCard(card),_builtIn:false,_hidden:false})));
  const search=normalizedSearchKey($("managerSearch")?.value||"");
  const visibleEntries=entries.filter(card=>normalizedSearchKey([card.name,card.chinese,card.movie,card.role,card.style,card.rarity].filter(Boolean).join(" ")).includes(search));
  $("managerCount").textContent=entries.filter(card=>!card._hidden).length+" thẻ đang dùng · "+entries.length+" hồ sơ";
  if(!visibleEntries.length){const empty=document.createElement("p");empty.className="manager-empty";empty.textContent="Không tìm thấy thẻ phù hợp.";list.appendChild(empty);return;}
  visibleEntries.forEach(card=>{
    const row=document.createElement("article");row.className="manager-item"+(card._hidden?" is-hidden":"");
    const thumb=document.createElement("div");thumb.className="manager-thumb";
    if(card.photo){const img=document.createElement("img");img.src=card.photo;img.alt="";img.loading="lazy";img.onerror=()=>{img.remove();thumb.textContent=card.initials||"✦";};thumb.appendChild(img);}else thumb.textContent=card.initials||"✦";
    const detail=document.createElement("div");detail.className="manager-item-detail";
    const title=document.createElement("strong");title.textContent=card.name;
    const meta=document.createElement("small");meta.textContent=[card.movie,card.role,card.chinese,card.rarity,displayStyleLabel(card.style)].filter(Boolean).join(" · ");
    const status=document.createElement("span");status.className="manager-status";status.textContent=card._hidden?"Đang ẩn":(card._builtIn?"Thẻ mẫu":"Thẻ của bạn");detail.append(title,meta,status);
    const actions=document.createElement("div");actions.className="manager-item-actions";
    const edit=document.createElement("button");edit.className="outline-btn compact-btn";edit.type="button";edit.textContent="Sửa";edit.addEventListener("click",()=>editCharacter(card.id));actions.appendChild(edit);
    const toggle=document.createElement("button");toggle.className="outline-btn compact-btn";toggle.type="button";toggle.textContent=card._hidden?"Hiện":"Ẩn";toggle.addEventListener("click",()=>toggleCharacterVisibility(card.id));actions.appendChild(toggle);
    const del=document.createElement("button");del.className="outline-btn compact-btn danger-btn";del.type="button";del.textContent="Xóa hẳn";del.title="Xóa thẻ khỏi trò chơi và bộ sưu tập";del.addEventListener("click",()=>deleteCharacter(card.id));actions.appendChild(del);
    row.append(thumb,detail,actions);list.appendChild(row);
  });
}
async function toggleCharacterVisibility(id){
  const wasHidden=managerData.hidden.includes(id);const previous=JSON.parse(JSON.stringify(managerData));
  managerData.hidden=wasHidden?managerData.hidden.filter(item=>item!==id):[...managerData.hidden,id];
  if(await persistManagerData()){
    if(!wasHidden){delete state.owned[id];state.favorites=state.favorites.filter(item=>item!==id);saveState();}
    rebuildCharacters();showToast(wasHidden?"Đã hiện lại thẻ.":"Đã ẩn thẻ và xóa tiến độ sở hữu của thẻ này.");
  }else managerData=normalizeManagerData(previous);
}
async function deleteCharacter(id){
  const card=getAnyCharacter(id);if(!card)return;
  const label='"'+card.name+'"'+(card.movie?" trong phim "+card.movie:"");
  if(!confirm("XÓA HẲN thẻ "+label+"?\n\nThẻ sẽ bị loại khỏi danh sách mở thẻ và bộ sưu tập; số lượng sở hữu, yêu thích và ảnh riêng của thẻ cũng bị xóa. Thao tác này không thể hoàn tác bằng Sửa."))return;
  const previous=JSON.parse(JSON.stringify(managerData));
  const isBuiltIn=baseCharacters.some(item=>item.id===id);
  if(isBuiltIn){managerData.deleted=[...new Set([...managerData.deleted,id])];managerData.hidden=managerData.hidden.filter(item=>item!==id);delete managerData.overrides[id];}
  else managerData.custom=managerData.custom.filter(item=>item.id!==id);
  if(!(await persistManagerData())){managerData=normalizeManagerData(previous);return;}
  delete state.owned[id];state.favorites=state.favorites.filter(item=>item!==id);saveState();
  if(editingId===id)clearCharacterForm();
  if(currentDetailId===id)closeCharacterDetails();
  if(lastCharacter?.id===id){lastCharacter=null;$("characterCard").classList.add("hidden");$("cardBack").classList.remove("hidden");$("againBtn").hidden=true;$("revealHint").textContent="Thẻ đã được xóa khỏi kho.";}
  if(lastBatchCards.some(card=>card.id===id)){$("batchReveal").hidden=true;lastBatchCards=[];}
  rebuildCharacters();showToast("Đã xóa hẳn thẻ "+card.name+".");
}
function fileToCompressedDataUrl(file){
  return new Promise((resolve,reject)=>{
    if(!file||!file.type.startsWith("image/")){reject(new Error("Hãy chọn một tệp ảnh."));return;}
    if(file.size>12*1024*1024){reject(new Error("Ảnh gốc lớn hơn 12 MB. Hãy chọn ảnh nhỏ hơn."));return;}
    const reader=new FileReader();reader.onerror=()=>reject(new Error("Không đọc được ảnh."));reader.onload=()=>{
      const img=new Image();img.onerror=()=>reject(new Error("Tệp này không phải ảnh hợp lệ."));img.onload=()=>{
        const maxW=1000,maxH=1400,scale=Math.min(1,maxW/img.naturalWidth,maxH/img.naturalHeight);const canvas=document.createElement("canvas");canvas.width=Math.max(1,Math.round(img.naturalWidth*scale));canvas.height=Math.max(1,Math.round(img.naturalHeight*scale));
        const ctx=canvas.getContext("2d");ctx.fillStyle="#fff";ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);
        try{resolve(canvas.toDataURL("image/jpeg",0.84));}catch(error){reject(new Error("Không chuyển đổi được ảnh."));}
      };img.src=reader.result;
    };reader.readAsDataURL(file);
  });
}
$("managerToggle").addEventListener("click",()=>{if($("characterForm").hidden)startAddCharacter();else clearCharacterForm();});
$("cancelEditBtn").addEventListener("click",clearCharacterForm);
$("clearFormBtn").addEventListener("click",()=>{if(editingId)editCharacter(editingId);else clearCharacterForm();});
$("managerSearch").addEventListener("input",renderManagerList);
const AUTOCOMPLETE_CONFIG={
  fieldName:{suggestionId:"fieldNameSuggestions",noteId:"fieldNameSuggestionNote",label:"diễn viên",value:card=>card.name,meta:card=>[card.movie,card.role].filter(Boolean).join(" · ")},
  fieldMovie:{suggestionId:"fieldMovieSuggestions",noteId:"fieldMovieSuggestionNote",label:"phim / bộ sưu tập",value:card=>card.movie,meta:card=>card.name+(card.role?" · "+card.role:"")},
  fieldRole:{suggestionId:"fieldRoleSuggestions",noteId:"fieldRoleSuggestionNote",label:"vai diễn",value:card=>card.role,meta:card=>card.name+" · "+card.movie}
};
function getAutocompleteEntries(fieldId){
  const config=AUTOCOMPLETE_CONFIG[fieldId],entries=new Map();
  for(const card of characters){
    const value=String(config.value(card)||"").trim();if(!value)continue;
    const key=normalizedSearchKey(value);if(!key)return;
    if(!entries.has(key))entries.set(key,{value,count:0,meta:config.meta(card),card});
    const entry=entries.get(key);entry.count+=1;if(!entry.meta)entry.meta=config.meta(card);
  }
  return [...entries.values()].sort((a,b)=>a.value.localeCompare(b.value,"vi"));
}
function closeAutocomplete(fieldId){
  const config=AUTOCOMPLETE_CONFIG[fieldId];if(!config)return;
  const list=$(config.suggestionId),input=$(fieldId);list.hidden=true;list.replaceChildren();input.setAttribute("aria-expanded","false");
}
function renderAutocomplete(fieldId){
  const config=AUTOCOMPLETE_CONFIG[fieldId],input=$(fieldId),list=$(config.suggestionId),note=$(config.noteId),query=normalizedSearchKey(input.value);
  list.replaceChildren();note.textContent="";note.classList.remove("has-match");
  if(!query){closeAutocomplete(fieldId);return;}
  const entries=getAutocompleteEntries(fieldId),exact=entries.find(entry=>normalizedSearchKey(entry.value)===query);
  const matches=entries.map(entry=>({...entry,key:normalizedSearchKey(entry.value)}))
    .filter(entry=>entry.key.includes(query))
    .sort((a,b)=>(a.key.startsWith(query)?0:1)-(b.key.startsWith(query)?0:1)||a.value.localeCompare(b.value,"vi"))
    .slice(0,6);
  if(exact){
    note.classList.add("has-match");
    note.textContent=fieldId==="fieldName"?`Đã có ${exact.count} thẻ dùng tên này. Có thể chọn gợi ý để điền nhanh hoặc tiếp tục tạo thẻ khác.`:fieldId==="fieldMovie"?`Đã có ${exact.count} thẻ trong phim/bộ sưu tập này; diễn viên cùng phim sẽ được liên kết tự động.`:`Tên vai diễn này đã xuất hiện ở ${exact.count} thẻ.`;
  }
  for(const entry of matches){
    const button=document.createElement("button");button.type="button";button.className="field-suggestion";button.setAttribute("role","option");button.setAttribute("aria-selected","false");
    const main=document.createElement("span");main.className="field-suggestion-main";main.textContent=entry.value;
    const meta=document.createElement("small");meta.className="field-suggestion-meta";
    meta.textContent=fieldId==="fieldName"?`${entry.count} thẻ · ${entry.meta||"đã có trong kho"}`:fieldId==="fieldMovie"?`${entry.count} thẻ · ${entry.meta||"bộ sưu tập đã có"}`:`${entry.count} thẻ · ${entry.meta||"đã có trong kho"}`;
    button.append(main,meta);
    // Keep mouse focus on the input until click selects the option; click also supports keyboard activation.
    button.addEventListener("pointerdown",event=>{if(event.pointerType==="mouse")event.preventDefault();});
    button.addEventListener("click",event=>{event.preventDefault();selectAutocompleteEntry(fieldId,entry);});
    list.appendChild(button);
  }
  list.hidden=!matches.length;input.setAttribute("aria-expanded",String(matches.length>0));
}
function selectAutocompleteEntry(fieldId,entry){
  const config=AUTOCOMPLETE_CONFIG[fieldId];$(fieldId).value=entry.value;closeAutocomplete(fieldId);
  if(fieldId==="fieldName"&&entry.card){
    if(!$('fieldChinese').value.trim()&&entry.card.chinese)$('fieldChinese').value=entry.card.chinese;
    $('fieldGender').value=entry.card.gender||$('fieldGender').value;
    $(config.noteId).textContent=`Đã chọn diễn viên có sẵn (${entry.count} thẻ). Bạn vẫn có thể thêm thẻ cho phim hoặc vai diễn khác.`;
  }else if(fieldId==="fieldMovie"){
    $(config.noteId).textContent=`Đã chọn phim có ${entry.count} thẻ. Liên kết bạn diễn sẽ được tạo tự động dựa trên tên phim này.`;
  }else $(config.noteId).textContent=`Đã điền vai diễn có sẵn từ ${entry.count} thẻ.`;
  $(config.noteId).classList.add("has-match");
}
for(const fieldId of Object.keys(AUTOCOMPLETE_CONFIG)){
  $(fieldId).setAttribute("autocomplete","off");$(fieldId).setAttribute("aria-autocomplete","list");$(fieldId).setAttribute("aria-controls",AUTOCOMPLETE_CONFIG[fieldId].suggestionId);$(fieldId).setAttribute("aria-expanded","false");
  $(fieldId).addEventListener("input",()=>renderAutocomplete(fieldId));
  $(fieldId).addEventListener("focus",()=>{if($(fieldId).value.trim())renderAutocomplete(fieldId);});
  $(fieldId).addEventListener("blur",event=>{
    event.target.value=titleCaseName(event.target.value);
    window.setTimeout(()=>closeAutocomplete(fieldId),160);
  });
}
$("fieldPhoto").addEventListener("change",async event=>{
  const file=event.target.files?.[0];if(!file)return;$("photoStatus").textContent="Đang xử lý ảnh…";
  try{pendingPhotoData=await fileToCompressedDataUrl(file);buildPreview(pendingPhotoData,file.name);$("photoStatus").textContent="Ảnh mới đã sẵn sàng để lưu cho thẻ này.";}
  catch(error){pendingPhotoData=null;event.target.value="";$("photoStatus").textContent=error.message;showToast(error.message);}
});
$("characterForm").addEventListener("submit",async event=>{
  event.preventDefault();
  const name=titleCaseName($("fieldName").value),movie=titleCaseName($("fieldMovie").value),role=titleCaseName($("fieldRole").value),style=$("fieldStyle").value;
  $("fieldName").value=name;$("fieldMovie").value=movie;$("fieldRole").value=role;
  if(!name||!movie){showToast("Hãy nhập tên diễn viên và tên phim / bộ sưu tập.");return;}
  if(!style||style.startsWith("__legacy__:")){showToast("Thẻ này dùng phong cách ‘Hiện đại’ từ dữ liệu cũ. Hãy phân loại thành Thanh xuân vườn trường hoặc Công sở, nếu phù hợp; nếu không, chọn Cổ trang, Tiên hiệp, Dân quốc hoặc Khác.");return;}
  if(!editingId&&!pendingPhotoData){showToast("Hãy chọn ảnh đại diện khi thêm thẻ mới.");return;}
  if(!editingId){
    const sameCard=characters.some(card=>normalizedSearchKey(card.name)===normalizedSearchKey(name)&&normalizedSearchKey(card.movie)===normalizedSearchKey(movie)&&normalizedSearchKey(card.role)===normalizedSearchKey(role)&&String(card.rarity||"")===String($("fieldRarity").value||""));
    if(sameCard&&!confirm(`Đã có thẻ ${name} · ${movie}${role?" · "+role:""} · ${$("fieldRarity").value}. Bạn vẫn muốn thêm một thẻ trùng thông tin?`))return;
  }
  const wasEditing=Boolean(editingId),rarity=$("fieldRarity").value,current=editingId?getAnyCharacter(editingId):null,art=makeArt(rarity);
  const changedPhoto=Boolean(pendingPhotoData);
  const fields={name,chinese:$("fieldChinese").value.trim(),movie,role,gender:$("fieldGender").value,style,rarity,quote:$("fieldQuote").value.trim()||"Một ngôi sao, một câu chuyện.",initials:makeInitials($("fieldChinese").value,name),photo:pendingPhotoData||current?.photo||"",photoFallback:changedPhoto?null:(current?.photoFallback||null),...art};
  const previous=JSON.parse(JSON.stringify(managerData));
  if(editingId){
    if(managerData.custom.some(card=>card.id===editingId))managerData.custom=managerData.custom.map(card=>{
      if(card.id!==editingId)return card;const updated={...card,...fields,...(changedPhoto?{photoCredit:"Ảnh do người dùng thêm",photoLicense:"Ảnh cá nhân",photoSource:""}:{})};delete updated.costume;return updated;
    });
    else {const updated={...(current||{}),...fields,...(changedPhoto?{photoCredit:"Ảnh do người dùng thêm",photoLicense:"Ảnh cá nhân",photoSource:""}:{})};delete updated.costume;managerData.overrides[editingId]=updated;}
  }else{
    const randomId=globalThis.crypto?.randomUUID?.()||(Date.now().toString(36)+Math.random().toString(36).slice(2,10));
    managerData.custom.push({id:"card-"+randomId,...fields,photoCredit:"Ảnh do người dùng thêm",photoLicense:"Ảnh cá nhân",photoSource:""});
  }
  if(await persistManagerData()){clearCharacterForm();rebuildCharacters();showToast(wasEditing?"Đã cập nhật thẻ.":"Đã thêm thẻ mới vào phim "+movie+".");}
  else managerData=normalizeManagerData(previous);
});
$("restoreDefaultsBtn").addEventListener("click",async()=>{
  if(!managerData.hidden.length&&!Object.keys(managerData.overrides).length&&!managerData.deleted.length){showToast("Các thẻ mẫu đang ở trạng thái ban đầu.");return;}
  if(!confirm("Khôi phục toàn bộ thẻ mẫu đã ẩn / xóa và hoàn tác chỉnh sửa của thẻ mẫu? Thẻ do bạn tự thêm và tiến độ sở hữu của thẻ mẫu đã xóa sẽ không được khôi phục."))return;
  const previous=JSON.parse(JSON.stringify(managerData));managerData.hidden=[];managerData.overrides={};managerData.deleted=[];
  if(await persistManagerData()){rebuildCharacters();showToast("Đã khôi phục các thẻ mẫu.");}else managerData=normalizeManagerData(previous);
});
$("exportBtn").addEventListener("click",()=>{
  const backup={app:"Starry C-Drama Cards",version:3,createdAt:new Date().toISOString(),managerData,state};
  const blob=new Blob([JSON.stringify(backup,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="starry-cbiz-backup-"+new Date().toISOString().slice(0,10)+".json";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);showToast("Đã tạo bản sao lưu JSON.");
});
$("importBtn").addEventListener("click",()=>$("importFile").click());
$("importFile").addEventListener("change",async event=>{
  const file=event.target.files?.[0];if(!file)return;
  try{
    const backup=JSON.parse(await file.text());if(backup.app!=="Starry C-Drama Cards"||!backup.managerData||!backup.state)throw new Error("Tệp không đúng định dạng sao lưu của game.");
    if(!confirm("Khôi phục sẽ thay thế thẻ cá nhân, chỉnh sửa, danh sách thẻ đã xóa/ẩn và bộ sưu tập hiện tại. Bạn có chắc không?"))return;
    const previous=JSON.parse(JSON.stringify(managerData));managerData=normalizeManagerData(backup.managerData);
    if(await persistManagerData()){
      state={owned:backup.state.owned&&typeof backup.state.owned==="object"?backup.state.owned:{},favorites:Array.isArray(backup.state.favorites)?backup.state.favorites:[],stardust:Math.max(0,Number(backup.state.stardust)||0)};
      saveState();clearCharacterForm();rebuildCharacters();showToast("Đã khôi phục dữ liệu từ bản sao lưu.");
    }else managerData=normalizeManagerData(previous);
  }catch(error){showToast(error.message||"Không thể đọc tệp sao lưu.");}
  finally{event.target.value="";}
});
(async function initApp(){managerData=await readManagerData();rebuildCharacters();})();

// Progressive Web App update prompt. This code does not read, rewrite, or clear game data.
(function setupAppUpdates(){
  if (!("serviceWorker" in navigator)) return;
  if (location.protocol !== "https:" && location.hostname !== "localhost" && location.hostname !== "127.0.0.1") return;

  let registrationRef = null;
  let acceptedUpdate = false;
  let reloading = false;
  let banner = null;
  let updateButton = null;

  function hideBanner(){
    if (banner) banner.hidden = true;
  }

  function showUpdateBanner(){
    if (!banner){
      banner = document.createElement("aside");
      banner.className = "app-update-banner";
      banner.setAttribute("role", "status");
      banner.setAttribute("aria-live", "polite");

      const copy = document.createElement("div");
      copy.className = "app-update-copy";
      const title = document.createElement("p");
      title.className = "app-update-title";
      title.textContent = "Có bản cập nhật mới ✨";
      const message = document.createElement("p");
      message.className = "app-update-message";
      message.textContent = "Bản mới đã sẵn sàng. Bộ sưu tập hiện tại sẽ được giữ nguyên.";
      copy.append(title, message);

      const actions = document.createElement("div");
      actions.className = "app-update-actions";
      updateButton = document.createElement("button");
      updateButton.type = "button";
      updateButton.className = "app-update-button app-update-button-primary";
      updateButton.textContent = "Cập nhật";
      updateButton.addEventListener("click", async () => {
        if (!registrationRef) return;
        acceptedUpdate = true;
        updateButton.disabled = true;
        updateButton.textContent = "Đang cập nhật…";
        const waitingWorker = registrationRef.waiting;
        if (waitingWorker){
          waitingWorker.postMessage({type: "SKIP_WAITING"});
        }else{
          try{ await registrationRef.update(); }catch(error){ console.warn("Không kiểm tra lại được bản cập nhật:", error); }
          const newWaitingWorker = registrationRef.waiting;
          if (newWaitingWorker) newWaitingWorker.postMessage({type: "SKIP_WAITING"});
          else{
            updateButton.disabled = false;
            updateButton.textContent = "Thử lại";
            acceptedUpdate = false;
            return;
          }
        }
        // A controllerchange event will reload after the waiting worker activates.
      });

      const laterButton = document.createElement("button");
      laterButton.type = "button";
      laterButton.className = "app-update-button app-update-button-secondary";
      laterButton.textContent = "Để sau";
      laterButton.addEventListener("click", hideBanner);
      actions.append(updateButton, laterButton);
      banner.append(copy, actions);
      document.body.appendChild(banner);
    }
    banner.hidden = false;
    if (updateButton){updateButton.disabled = false;updateButton.textContent = "Cập nhật";}
  }

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (acceptedUpdate && !reloading){
      reloading = true;
      location.reload();
    }
  });

  navigator.serviceWorker.register("./service-worker.js", {updateViaCache: "none"})
    .then((registration) => {
      registrationRef = registration;

      const watchInstallingWorker = () => {
        const installing = registration.installing;
        if (!installing) return;
        installing.addEventListener("statechange", () => {
          if (installing.state === "installed" && navigator.serviceWorker.controller){
            showUpdateBanner();
          }
        });
      };

      registration.addEventListener("updatefound", watchInstallingWorker);
      if (registration.waiting && navigator.serviceWorker.controller) showUpdateBanner();
      watchInstallingWorker();
      // Check on each app open instead of forcing an update during play.
      registration.update().catch((error) => console.info("Chưa thể kiểm tra bản cập nhật:", error));
    })
    .catch((error) => console.warn("Không thể bật tính năng cập nhật của app:", error));
})();
