// Starry C-Drama Cards V7.1 — thẻ độc lập theo phim / vai diễn / trang phục.
let characters = [
  {id:"xiao-zhan",movie:"Bộ sưu tập chân dung",role:"Chân dung sự kiện",costume:"Ảnh sự kiện",name:"Tiêu Chiến",chinese:"肖战",gender:"male",style:"Hiện đại",rarity:"SSR",quote:"Một ánh nhìn, vạn câu chuyện.",symbol:"✦",initials:"肖战",art1:"#34445c",art2:"#101522",accent:"#b8a5d0",photo:"https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/Xiao_Zhan_at_the_Weibo_Night_Ceremony_January_11_2020.jpg/330px-Xiao_Zhan_at_the_Weibo_Night_Ceremony_January_11_2020.jpg",photoFallback:"https://commons.wikimedia.org/wiki/Special:FilePath/Xiao_Zhan_at_the_Weibo_Night_Ceremony_January_11_2020.jpg?width=700",photoCredit:"Pobediti丨肖战",photoLicense:"CC BY-SA 4.0",photoSource:"https://commons.wikimedia.org/wiki/File:Xiao_Zhan_at_the_Weibo_Night_Ceremony_January_11_2020.jpg"},
  {id:"wang-yibo",movie:"Bộ sưu tập chân dung",role:"Chân dung sự kiện",costume:"Ảnh sự kiện",name:"Vương Nhất Bác",chinese:"王一博",gender:"male",style:"Hiện đại",rarity:"SR",quote:"Tự do là phong cách của riêng mình.",symbol:"✧",initials:"王博",art1:"#214b57",art2:"#101a25",accent:"#6ec6c2",photo:"https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9a/%E7%8E%8B%E4%B8%80%E5%8D%9A.jpg/500px-%E7%8E%8B%E4%B8%80%E5%8D%9A.jpg",photoFallback:"https://commons.wikimedia.org/wiki/Special:FilePath/%E7%8E%8B%E4%B8%80%E5%8D%9A.jpg?width=700",photoCredit:"Aco",photoLicense:"CC BY 2.5",photoSource:"https://commons.wikimedia.org/wiki/File:王一博.jpg"},
  {id:"cheng-yi",movie:"Bộ sưu tập chân dung",role:"Chân dung sự kiện",costume:"Ảnh sự kiện",name:"Thành Nghị",chinese:"成毅",gender:"male",style:"Cổ trang",rarity:"UR",quote:"Kiếm ý như sương, lòng sáng tựa trăng.",symbol:"☾",initials:"成毅",art1:"#4b3047",art2:"#171322",accent:"#d6a0c8",photo:"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/Cheng_Yi_actor.jpg/960px-Cheng_Yi_actor.jpg",photoFallback:"https://commons.wikimedia.org/wiki/Special:FilePath/Cheng_Yi_actor.jpg?width=700",photoCredit:"Kiwiyi",photoLicense:"CC BY-SA 4.0",photoSource:"https://commons.wikimedia.org/wiki/File:Cheng_Yi_actor.jpg"},
  {id:"gong-jun",movie:"Bộ sưu tập chân dung",role:"Chân dung sự kiện",costume:"Ảnh sự kiện",name:"Cung Tuấn",chinese:"龚俊",gender:"male",style:"Cổ trang",rarity:"SR",quote:"Phong độ ung dung, khí chất tự nhiên.",symbol:"❖",initials:"龚俊",art1:"#47506c",art2:"#121726",accent:"#9cb5e5",photo:"https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d8/GJ_Cannes.jpg/330px-GJ_Cannes.jpg",photoFallback:"https://commons.wikimedia.org/wiki/Special:FilePath/GJ_Cannes.jpg?width=700",photoCredit:"99_开心果",photoLicense:"CC BY 4.0",photoSource:"https://commons.wikimedia.org/wiki/File:GJ_Cannes.jpg"},
  {id:"dylan-wang",movie:"Bộ sưu tập chân dung",role:"Chân dung sự kiện",costume:"Ảnh sự kiện",name:"Vương Hạc Đệ",chinese:"王鹤棣",gender:"male",style:"Hiện đại",rarity:"R",quote:"Năng lượng nổi bật giữa đám đông.",symbol:"⚡",initials:"鹤棣",art1:"#5b422e",art2:"#1c1716",accent:"#e6b875",photo:"https://thumb.wikimedia.org/wikipedia/commons/thumb/7/76/Dylan_Wang.jpg/330px-Dylan_Wang.jpg",photoFallback:"https://commons.wikimedia.org/wiki/Special:FilePath/Dylan_Wang.jpg?width=700",photoCredit:"SR98·王鹤棣",photoLicense:"CC BY 4.0",photoSource:"https://commons.wikimedia.org/wiki/File:Dylan_Wang.jpg"},
  {id:"yang-yang",movie:"Bộ sưu tập chân dung",role:"Chân dung sự kiện",costume:"Ảnh sự kiện",name:"Dương Dương",chinese:"杨洋",gender:"male",style:"Cổ trang",rarity:"SSR",quote:"Thanh phong minh nguyệt, phong thái như ngọc.",symbol:"☼",initials:"杨洋",art1:"#33485c",art2:"#111724",accent:"#91c2df",photo:"https://thumb.wikimedia.org/wikipedia/commons/thumb/5/55/Yang_Yang_at_the_Bvlgari_Serpenti_75_Years_of_Infinite_Tales_exhibition_in_Shanghai_in_March_2023_%282%29.png/1280px-Yang_Yang_at_the_Bvlgari_Serpenti_75_Years_of_Infinite_Tales_exhibition_in_Shanghai_in_March_2023_%282%29.png",photoFallback:"https://commons.wikimedia.org/wiki/Special:FilePath/Yang_Yang_at_the_Bvlgari_Serpenti_75_Years_of_Infinite_Tales_exhibition_in_Shanghai_in_March_2023_%282%29.png?width=700",photoCredit:"Play大明星",photoLicense:"CC BY 3.0",photoSource:"https://commons.wikimedia.org/wiki/File:Yang_Yang_at_the_Bvlgari_Serpenti_75_Years_of_Infinite_Tales_exhibition_in_Shanghai_in_March_2023_(2).png"},
  {id:"zhao-lusi",movie:"Bộ sưu tập chân dung",role:"Chân dung sự kiện",costume:"Ảnh sự kiện",name:"Triệu Lộ Tư",chinese:"赵露思",gender:"female",style:"Cổ trang",rarity:"SSR",quote:"Nụ cười dịu dàng, ánh mắt lanh lợi.",symbol:"❀",initials:"露思",art1:"#69445c",art2:"#211725",accent:"#f1a8c7",photo:"https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/ZHAO_LUSI_%28%E8%B6%99%E9%9C%B2%E6%80%9D%29_P1.jpg/1280px-ZHAO_LUSI_%28%E8%B6%99%E9%9C%B2%E6%80%9D%29_P1.jpg",photoFallback:"https://commons.wikimedia.org/wiki/Special:FilePath/ZHAO_LUSI_%28%E8%B6%99%E9%9C%B2%E6%80%9D%29_P1.jpg?width=700",photoCredit:"Play大明星",photoLicense:"CC BY 3.0",photoSource:"https://commons.wikimedia.org/wiki/File:ZHAO_LUSI_(趙露思)_P1.jpg"},
  {id:"tian-xiwei",movie:"Bộ sưu tập chân dung",role:"Chân dung sự kiện",costume:"Ảnh sự kiện",name:"Điền Hi Vi",chinese:"田曦薇",gender:"female",style:"Hiện đại",rarity:"UR",quote:"Rực rỡ như nắng sớm đầu xuân.",symbol:"✿",initials:"曦薇",art1:"#7a4d54",art2:"#261824",accent:"#f0b6a4",photo:"https://upload.wikimedia.org/wikipedia/commons/6/68/Tian_Xiwei.jpg",photoFallback:"https://commons.wikimedia.org/wiki/Special:FilePath/Tian_Xiwei.jpg?width=700",photoCredit:"iQIYI Indonesia",photoLicense:"CC BY 3.0",photoSource:"https://commons.wikimedia.org/wiki/File:Tian_Xiwei.jpg"},
  {id:"zhao-liying",movie:"Bộ sưu tập chân dung",role:"Chân dung sự kiện",costume:"Ảnh sự kiện",name:"Triệu Lệ Dĩnh",chinese:"赵丽颖",gender:"female",style:"Hiện đại",rarity:"SSR",quote:"Kiên định đi qua mọi chương đời.",symbol:"❋",initials:"丽颖",art1:"#485d6b",art2:"#141a29",accent:"#b4d5d5",photo:"https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f3/Zanilia_Zhao_from_%22The_Unseen_Sister%22_at_Red_Carpet_of_the_Tokyo_International_Film_Festival_2024_%2854578224190%29.jpg/960px-Zanilia_Zhao_from_%22The_Unseen_Sister%22_at_Red_Carpet_of_the_Tokyo_International_Film_Festival_2024_%2854578224190%29.jpg",photoFallback:"https://commons.wikimedia.org/wiki/Special:FilePath/Zanilia_Zhao_from_%22The_Unseen_Sister%22_at_Red_Carpet_of_the_Tokyo_International_Film_Festival_2024_%2854578224190%29.jpg?width=700",photoCredit:"Dick Thomas Johnson",photoLicense:"CC BY 2.0",photoSource:"https://commons.wikimedia.org/wiki/File:Zanilia_Zhao_from_%22The_Unseen_Sister%22_at_Red_Carpet_of_the_Tokyo_International_Film_Festival_2024_(54578224190).jpg"},
  {id:"dilraba",movie:"Bộ sưu tập chân dung",role:"Chân dung sự kiện",costume:"Ảnh sự kiện",name:"Địch Lệ Nhiệt Ba",chinese:"迪丽热巴",gender:"female",style:"Hiện đại",rarity:"SR",quote:"Lấp lánh theo cách không ai thay thế.",symbol:"✧",initials:"热巴",art1:"#6b3b48",art2:"#211520",accent:"#ef9bb2",photo:"https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a4/Dilraba_Dilmurat.jpg/330px-Dilraba_Dilmurat.jpg",photoFallback:"https://commons.wikimedia.org/wiki/Special:FilePath/Dilraba_Dilmurat.jpg?width=700",photoCredit:"PlayIn",photoLicense:"CC BY 3.0",photoSource:"https://commons.wikimedia.org/wiki/File:Dilraba_Dilmurat.jpg"},
  {id:"yang-zi",movie:"Bộ sưu tập chân dung",role:"Chân dung sự kiện",costume:"Ảnh sự kiện",name:"Dương Tử",chinese:"杨紫",gender:"female",style:"Hiện đại",rarity:"R",quote:"Sự ấm áp khiến câu chuyện gần hơn.",symbol:"♡",initials:"杨紫",art1:"#67513f",art2:"#1c1a1b",accent:"#e6c69c",photo:"https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/Yang_Zi_at_Ryo_band_promotion%2C_Wuhan_of_China%2C_12_April_2019.jpg/330px-Yang_Zi_at_Ryo_band_promotion%2C_Wuhan_of_China%2C_12_April_2019.jpg",photoFallback:"https://commons.wikimedia.org/wiki/Special:FilePath/Yang_Zi_at_Ryo_band_promotion%2C_Wuhan_of_China%2C_12_April_2019.jpg?width=700",photoCredit:"Nascent·恆星",photoLicense:"CC BY-SA 4.0",photoSource:"https://commons.wikimedia.org/wiki/File:Yang_Zi_at_Ryo_band_promotion,_Wuhan_of_China,_12_April_2019.jpg"},
  {id:"bai-lu",movie:"Bộ sưu tập chân dung",role:"Chân dung sự kiện",costume:"Ảnh sự kiện",name:"Bạch Lộc",chinese:"白鹿",gender:"female",style:"Cổ trang",rarity:"SR",quote:"Dịu dàng cũng có thể đầy bản lĩnh.",symbol:"☾",initials:"白鹿",art1:"#45415e",art2:"#171526",accent:"#b7a9ef",photo:"https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Bai_Lu.jpg/330px-Bai_Lu.jpg",photoFallback:"https://commons.wikimedia.org/wiki/Special:FilePath/Bai_Lu.jpg?width=700",photoCredit:"iQIYI Indonesia",photoLicense:"CC BY 3.0",photoSource:"https://commons.wikimedia.org/wiki/File:Bai_Lu.jpg"},
];
const baseCharacters = characters.map(c => ({...c}));
const rarityInfo = {
  R:{label:"R · COMMON",color:"#aab5c9",weight:48,luck:25},
  SR:{label:"SR · RARE",color:"#72b6ff",weight:30,luck:50},
  SSR:{label:"SSR · SUPER RARE",color:"#c18aff",weight:17,luck:78},
  UR:{label:"UR · LEGENDARY",color:"#ffca75",weight:5,luck:100}
};
// Giữ nguyên khóa localStorage cũ để dữ liệu sở hữu V5 vẫn được đọc.
const STORAGE_KEY = "starry-cbiz-cards-v1";
const DB_NAME="starry-cbiz-manager-db";
const DB_VERSION=1;
const DB_STORE="appData";
let state = loadState();
let activeFilter = "all";
let lastCharacter = null;
let managerData = {custom:[],overrides:{},hidden:[],deleted:[]};
let pendingPhotoData = null;
let editingId = null;
let cachedEditPhoto = null;
let dbPromise = null;
let currentDetailId = null;
let toastTimer;
const $ = id => document.getElementById(id);

function loadState(){
  try {
    const parsed=JSON.parse(localStorage.getItem(STORAGE_KEY));
    if(parsed&&typeof parsed==="object")return {owned:parsed.owned||{},favorites:Array.isArray(parsed.favorites)?parsed.favorites:[]};
  } catch(error){console.warn("Không thể đọc bộ sưu tập đã lưu:",error);}
  return {owned:{},favorites:[]};
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
  const map={R:["#67513f","#1c1a1b","#e6c69c"],SR:["#214b57","#101a25","#6ec6c2"],SSR:["#45415e","#171526","#b7a9ef"],UR:["#7a4d54","#261824","#f0b6a4"]};
  const a=map[rarity]||map.SR;return {art1:a[0],art2:a[1],accent:a[2]};
}
function normalizeCard(card,fallback={}){
  const result={...fallback,...(card||{})};
  result.movie=String(result.movie||"").trim()||"Bộ sưu tập chân dung";
  result.role=String(result.role||"").trim();
  result.costume=String(result.costume||"").trim()||"Phiên bản mặc định";
  result.quote=String(result.quote||"").trim()||"Một ngôi sao, một câu chuyện.";
  result.symbol=result.symbol||"✦";
  result.initials=result.initials||makeInitials(result.chinese,result.name);
  result.gender=result.gender||"other";
  result.style=result.style||"Khác";
  result.rarity=rarityInfo[result.rarity]?result.rarity:"SR";
  return result;
}
function weightedRandom(){
  if(!characters.length)return null;
  const available=Object.entries(rarityInfo).filter(([rarity])=>characters.some(card=>card.rarity===rarity));
  const total=available.reduce((sum,[,info])=>sum+info.weight,0);
  let roll=Math.random()*total,chosen=available[0][0];
  for(const [rarity,info] of available){roll-=info.weight;if(roll<0){chosen=rarity;break;}}
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
function openCard(){
  if(!characters.length){showToast("Kho thẻ đang trống. Hãy thêm thẻ hoặc khôi phục thẻ mẫu.");return;}
  const btn=$("openBtn");btn.disabled=true;$("againBtn").hidden=true;$("revealHint").textContent="Ánh sao đang hội tụ…";
  $("characterCard").classList.add("hidden");$("cardBack").classList.remove("hidden");$("cardBack").style.opacity="1";$("cardBack").style.transform="rotateY(0)";
  const card=weightedRandom();
  if(!card){btn.disabled=false;return;}
  const stage=document.querySelector(".stage");
  stage.style.setProperty("--rarity",rarityInfo[card.rarity].color);
  const openingClasses=["opening-rarity-r","opening-rarity-sr","opening-rarity-ssr","opening-rarity-ur"];
  stage.classList.remove(...openingClasses);
  $("cardBack").classList.remove("charging");
  stage.classList.add("opening-rarity-"+card.rarity.toLowerCase());
  $("cardBack").classList.add("charging");
  const revealDelay={R:480,SR:720,SSR:1020,UR:1420}[card.rarity]||650;
  setTimeout(()=>{
    $("cardBack").classList.remove("charging");
    stage.classList.remove(...openingClasses);
    const info=rarityInfo[card.rarity];
    lastCharacter=card;
    $("cardRarity").textContent=info.label;$("cardRarity").style.setProperty("--rarity",info.color);
    $("cardName").textContent=card.name;$("cardChinese").textContent=card.chinese||"";
    $("cardGender").textContent=genderLabel(card.gender);$("cardStyle").textContent=card.style;
    $("cardMovie").textContent=card.movie+(card.role?" · "+card.role:"");
    $("cardQuote").textContent="“"+card.quote+"”";$("artSymbol").textContent=card.symbol||"✦";
    $("artCaption").textContent=card.movie.toUpperCase();$("portraitInitials").textContent=card.initials||makeInitials(card.chinese,card.name);
    const art=$("cardArt");art.style.setProperty("--art1",card.art1);art.style.setProperty("--art2",card.art2);art.style.setProperty("--accent",card.accent);
    art.classList.remove("has-photo");art.querySelectorAll(".actor-photo").forEach(img=>img.remove());setCardImage(art,card,"actor-photo","Ảnh "+card.name+" trong "+card.movie);
    const visibleCard=$("characterCard");visibleCard.classList.remove("rarity-r","rarity-sr","rarity-ssr","rarity-ur");visibleCard.classList.add("rarity-"+card.rarity.toLowerCase());
    visibleCard.style.setProperty("--rarity",info.color);visibleCard.style.setProperty("--art1",card.art1);visibleCard.style.setProperty("--art2",card.art2);visibleCard.style.setProperty("--accent",card.accent);
    visibleCard.classList.remove("hidden");$("cardBack").classList.add("hidden");
    const isDuplicate=(state.owned[card.id]||0)>0;
    $("revealHint").textContent=isDuplicate?"Bạn đã sở hữu phiên bản này rồi!":"Một phiên bản mới gia nhập bộ sưu tập!";
    state.owned[card.id]=(state.owned[card.id]||0)+1;saveState();renderCollection();updateStats();
    $("luckLabel").textContent=card.rarity;$("luckBar").style.width=info.luck+"%";$("againBtn").hidden=false;btn.disabled=false;
    showToast((card.rarity==="UR"?"✨ HUYỀN THOẠI! ":card.rarity==="SSR"?"✦ SIÊU HIẾM! ":card.rarity==="SR"?"✧ HIẾM! ":"✧ ")+card.name+" · "+card.movie);
  },revealDelay);
}
function collectionMatchesFilter(card){
  if(activeFilter==="male")return card.gender==="male";
  if(activeFilter==="female")return card.gender==="female";
  if(activeFilter==="favorites")return state.favorites.includes(card.id);
  return true;
}
// Small tactile reveal when a collection card is tapped. This is purely visual;
// ownership, favorites, localStorage and IndexedDB are not modified by the effect.
function animateCollectionCard(article, afterAnimation){
  if(!article || article.dataset.tapBusy === "1")return;
  article.dataset.tapBusy = "1";
  article.classList.remove("is-tapped");
  void article.offsetWidth; // restart the CSS animation on repeated taps
  article.classList.add("is-tapped");
  window.setTimeout(()=>{
    article.classList.remove("is-tapped");
    delete article.dataset.tapBusy;
    if(article.isConnected && article.closest("#page-collection")?.classList.contains("active")){
      if(typeof afterAnimation === "function")afterAnimation();
    }
  }, 360);
}
function renderCollection(){
  const container=$("collectionSets");if(!container)return;container.innerHTML="";
  const grouped=new Map();
  for(const card of characters){
    const movie=String(card.movie||"Bộ sưu tập chân dung").trim().replace(/\s+/g," ")||"Bộ sưu tập chân dung";
    const key=movie.toLocaleLowerCase("vi");
    if(!grouped.has(key))grouped.set(key,{movie,cards:[]});
    grouped.get(key).cards.push(card);
  }
  let visibleCount=0;
  for(const {movie, cards:allCards} of grouped.values()){
    const cards=allCards.filter(collectionMatchesFilter);if(!cards.length)continue;visibleCount+=cards.length;
    const ownedUnique=allCards.filter(card=>(state.owned[card.id]||0)>0).length;
    const set=document.createElement("section");set.className="film-set";
    const head=document.createElement("div");head.className="film-set-heading";
    const titleWrap=document.createElement("div");titleWrap.className="film-set-title-wrap";
    const eyebrow=document.createElement("p");eyebrow.className="film-set-eyebrow";eyebrow.textContent="DRAMA COLLECTION";
    const title=document.createElement("h3");title.textContent=movie;
    const count=document.createElement("p");count.className="film-set-count";count.textContent=ownedUnique+" / "+allCards.length+" phiên bản đã sưu tầm";
    titleWrap.append(eyebrow,title,count);
    const progress=document.createElement("div");progress.className="film-progress";progress.setAttribute("role","progressbar");progress.setAttribute("aria-valuemin","0");progress.setAttribute("aria-valuemax",String(allCards.length));progress.setAttribute("aria-valuenow",String(ownedUnique));progress.setAttribute("aria-label","Tiến độ "+movie);
    const fill=document.createElement("span");fill.style.width=(allCards.length?ownedUnique/allCards.length*100:0)+"%";progress.appendChild(fill);
    head.append(titleWrap,progress);set.appendChild(head);
    const grid=document.createElement("div");grid.className="collection-grid";
    for(const card of cards){
      const owned=(state.owned[card.id]||0)>0;const info=rarityInfo[card.rarity]||rarityInfo.R;
      const article=document.createElement("article");article.className="mini-card"+(owned?"":" is-locked");
      if(owned){
        article.setAttribute("role","button");article.setAttribute("tabindex","0");article.setAttribute("aria-label","Xem thẻ "+card.name+" trong phim "+movie);article.title="Nhấn để xem thẻ "+card.name;
        const activateOwnedCard=()=>animateCollectionCard(article,()=>showCharacterDetails(card.id));
        article.addEventListener("click",activateOwnedCard);
        article.addEventListener("keydown",event=>{if((event.key==="Enter"||event.key===" ")&&event.target===article){event.preventDefault();activateOwnedCard();}});
      }
      else{
        article.setAttribute("aria-label","Chưa sở hữu thẻ "+card.name+" trong phim "+movie);article.title="Mở thẻ ngẫu nhiên để sưu tầm phiên bản này";
        article.addEventListener("click",()=>animateCollectionCard(article,()=>showToast("Bạn chưa sở hữu phiên bản này. Hãy mở thẻ ngẫu nhiên nhé.")));
      }
      article.style.setProperty("--rarity",info.color);article.style.setProperty("--art1",card.art1||"#292f46");article.style.setProperty("--art2",card.art2||"#111522");article.style.setProperty("--accent",card.accent||"#a1a8c9");
      const art=document.createElement("div");art.className="mini-art";const initials=document.createElement("strong");initials.textContent=card.initials||makeInitials(card.chinese,card.name);art.appendChild(initials);setCardImage(art,card,"mini-photo","Ảnh "+card.name+" trong "+movie);article.appendChild(art);
      const countBadge=document.createElement("span");countBadge.className="mini-count";countBadge.textContent=owned?"×"+state.owned[card.id]:"✧ Chưa có";article.appendChild(countBadge);
      const infoBox=document.createElement("div");infoBox.className="mini-info";
      const rarity=document.createElement("div");rarity.className="mini-rarity";rarity.textContent=card.rarity+" · "+String(card.style||"Khác").toUpperCase();
      const name=document.createElement("h3");name.textContent=card.name;
      const meta=document.createElement("p");meta.textContent=[card.role,card.costume,card.chinese,genderLabel(card.gender)].filter(Boolean).join(" · ");
      infoBox.append(rarity,name,meta);article.appendChild(infoBox);
      if(owned){const fav=document.createElement("button");fav.className="favorite-btn"+(state.favorites.includes(card.id)?" active":"");fav.textContent=state.favorites.includes(card.id)?"♥":"♡";fav.title=state.favorites.includes(card.id)?"Bỏ yêu thích":"Đánh dấu yêu thích";fav.setAttribute("aria-label",fav.title+" "+card.name);fav.addEventListener("click",event=>{event.stopPropagation();toggleFavorite(card.id);});article.appendChild(fav);}
      grid.appendChild(article);
    }
    set.appendChild(grid);container.appendChild(set);
  }
  const ownedCount=characters.filter(card=>(state.owned[card.id]||0)>0).length;
  const empty=$("emptyState");
  const showEmpty=(activeFilter==="all"&&ownedCount===0)||visibleCount===0;
  empty.hidden=!showEmpty;
  const emptyTitle=empty.querySelector("h3"),emptyText=empty.querySelector("p");
  if(visibleCount===0){emptyTitle.textContent="Không có thẻ phù hợp";emptyText.textContent="Thử chọn bộ lọc khác để xem các thẻ trong bộ sưu tập phim.";}
  else if(ownedCount===0){emptyTitle.textContent="Chưa mở thẻ nào";emptyText.textContent="Những thẻ mờ bên dưới đang chờ bạn sưu tầm. Khi sở hữu các thẻ cùng phim, tiến độ của bộ sẽ tăng lên.";}
  $("countAll").textContent=ownedCount;
}
function showCharacterDetails(id){
  const card=characters.find(item=>item.id===id);if(!card||!(state.owned[id]>0))return;
  currentDetailId=id;const dialog=$("characterDetailDialog"),visual=$("detailVisual"),photo=$("detailPhoto"),initials=$("detailInitials");const info=rarityInfo[card.rarity]||rarityInfo.R;
  $("detailName").textContent=card.name||"Chưa đặt tên";$("detailChinese").textContent=card.chinese||"Chưa có tên tiếng Trung";
  $("detailGender").textContent=genderLabel(card.gender);$("detailStyle").textContent=card.style||"Chưa phân loại";$("detailRarity").textContent=info.label;$("detailRarity").style.color=info.color;
  $("detailCount").textContent="×"+(state.owned[id]||0);$("detailQuote").textContent=card.quote||"Một ngôi sao, một câu chuyện.";
  $("detailMovie").textContent=card.movie||"Bộ sưu tập chân dung";$("detailRole").textContent=card.role||"Chưa nhập";$("detailCostume").textContent=card.costume||"Phiên bản mặc định";
  visual.style.setProperty("--art1",card.art1||"#292f46");visual.style.setProperty("--art2",card.art2||"#111522");visual.style.setProperty("--accent",card.accent||"#a1a8c9");
  initials.textContent=card.initials||makeInitials(card.chinese,card.name);photo.hidden=true;photo.removeAttribute("src");photo.dataset.fallbackTried="0";photo.alt="Ảnh "+card.name+" trong "+card.movie;visual.classList.remove("has-detail-photo");
  if(card.photo){photo.hidden=false;photo.src=card.photo;photo.onerror=()=>{if(card.photoFallback&&photo.dataset.fallbackTried!=="1"){photo.dataset.fallbackTried="1";photo.src=card.photoFallback;}else{photo.hidden=true;visual.classList.remove("has-detail-photo");}};photo.onload=()=>visual.classList.add("has-detail-photo");}
  const favorite=$("detailFavoriteBtn");favorite.textContent=state.favorites.includes(id)?"♥ Đã yêu thích · Bỏ đánh dấu":"♡ Thêm yêu thích";favorite.classList.toggle("is-favorite",state.favorites.includes(id));
  if(typeof dialog.showModal==="function"){if(!dialog.open)dialog.showModal();}else dialog.setAttribute("open","");
}
function closeCharacterDetails(){const dialog=$("characterDetailDialog");if(typeof dialog.close==="function"&&dialog.open)dialog.close();else dialog.removeAttribute("open");currentDetailId=null;}
function toggleFavorite(id){state.favorites=state.favorites.includes(id)?state.favorites.filter(item=>item!==id):[...state.favorites,id];saveState();renderCollection();if($("characterDetailDialog").open&&currentDetailId===id)showCharacterDetails(id);}
$("detailCloseBtn").addEventListener("click",closeCharacterDetails);
$("characterDetailDialog").addEventListener("click",event=>{if(event.target===$("characterDetailDialog"))closeCharacterDetails();});
$("characterDetailDialog").addEventListener("cancel",()=>{currentDetailId=null;});
$("detailFavoriteBtn").addEventListener("click",()=>{if(currentDetailId)toggleFavorite(currentDetailId);});
$("detailDeleteBtn").addEventListener("click",()=>{if(currentDetailId)deleteCharacter(currentDetailId);});
function updateStats(){
  const total=Object.values(state.owned).reduce((sum,value)=>sum+(Number(value)||0),0);
  const unique=characters.filter(card=>(state.owned[card.id]||0)>0).length;
  $("totalOwned").textContent=total;$("uniqueOwned").textContent=unique;$("totalCards").textContent=characters.length;
}
function showToast(message){const toast=$("toast");toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2800);}


function showAppPage(pageName){
  const allowed=["open","collection","manager","info"];
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
}
document.querySelectorAll(".nav-tab[data-page]").forEach(button=>button.addEventListener("click",()=>showAppPage(button.dataset.page)));
document.querySelector(".brand")?.addEventListener("click",event=>{event.preventDefault();showAppPage("open");});

$("openBtn").addEventListener("click",openCard);$("againBtn").addEventListener("click",openCard);
$("emptyOpenBtn").addEventListener("click",()=>{showAppPage("open");openCard();});
document.querySelectorAll(".filter").forEach(button=>button.addEventListener("click",()=>{
  document.querySelectorAll(".filter").forEach(item=>item.classList.remove("active"));button.classList.add("active");activeFilter=button.dataset.filter;renderCollection();
}));
$("resetBtn").addEventListener("click",()=>{
  if(!Object.keys(state.owned).length){showToast("Bạn chưa có thẻ nào cần đặt lại.");return;}
  if(confirm("Xóa toàn bộ tiến độ sưu tầm và yêu thích? Danh sách thẻ/phim sẽ được giữ nguyên.")){
    state={owned:{},favorites:[]};saveState();renderCollection();updateStats();$("characterCard").classList.add("hidden");$("cardBack").classList.remove("hidden");$("againBtn").hidden=true;$("revealHint").textContent="Tập trung năng lượng… ngôi sao đang chờ bạn.";$("luckLabel").textContent="Đang chờ";$("luckBar").style.width="15%";showToast("Đã đặt lại tiến độ sưu tầm.");
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
  return {custom:Array.isArray(raw.custom)?raw.custom.map(card=>normalizeCard(card)):[],overrides:raw.overrides&&typeof raw.overrides==="object"?raw.overrides:{},hidden:Array.isArray(raw.hidden)?raw.hidden:[],deleted:Array.isArray(raw.deleted)?raw.deleted:[]};
}
async function readManagerData(){
  try{return normalizeManagerData(await dbGet("managerData"));}
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
  renderCollection();updateStats();renderManagerList();
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
  $("characterForm").reset();$("characterId").value="";$("fieldSymbol").value="✦";editingId=null;pendingPhotoData=null;cachedEditPhoto=null;
  $("formTitle").textContent="Thêm thẻ mới";$("saveCharacterBtn").textContent="Lưu thẻ";$("imageRequiredLabel").textContent="(bắt buộc khi thêm)";$("photoStatus").textContent="Ảnh gắn riêng với phiên bản thẻ này.";buildPreview(null);$("characterForm").hidden=true;$("managerToggle").textContent="＋ Thêm thẻ";
}
function startAddCharacter(){clearCharacterForm();$("characterForm").hidden=false;$("managerToggle").textContent="＋ Đang thêm thẻ";$("characterForm").scrollIntoView({behavior:"smooth",block:"start"});$("fieldName").focus();}
function editCharacter(id){
  const card=getAnyCharacter(id);if(!card)return;
  editingId=id;cachedEditPhoto=card.photo||null;pendingPhotoData=null;
  $("characterId").value=id;$("fieldName").value=card.name||"";$("fieldChinese").value=card.chinese||"";$("fieldMovie").value=card.movie||"Bộ sưu tập chân dung";$("fieldRole").value=card.role||"";$("fieldCostume").value=card.costume||"Phiên bản mặc định";
  $("fieldGender").value=card.gender||"female";$("fieldStyle").value=card.style||"Hiện đại";$("fieldRarity").value=card.rarity||"SR";$("fieldSymbol").value=card.symbol||"✦";$("fieldQuote").value=card.quote||"";$("fieldPhoto").value="";
  $("formTitle").textContent="Sửa thẻ: "+card.name;$("saveCharacterBtn").textContent="Lưu thay đổi";$("imageRequiredLabel").textContent="(để trống nếu giữ ảnh hiện tại)";$("photoStatus").textContent=card.photo?"Đang dùng ảnh của phiên bản này. Chọn ảnh mới nếu muốn thay.":"Chưa có ảnh; bạn có thể thêm ở đây.";
  buildPreview(card.photo,card.name);$("characterForm").hidden=false;$("managerToggle").textContent="✎ Đang sửa thẻ";$("characterForm").scrollIntoView({behavior:"smooth",block:"start"});
}
function renderManagerList(){
  const list=$("managerList");if(!list)return;list.innerHTML="";
  const entries=baseCharacters.filter(base=>!managerData.deleted.includes(base.id)).map(base=>({...normalizeCard({...base,...(managerData.overrides[base.id]||{})},base),_builtIn:true,_hidden:managerData.hidden.includes(base.id)})).concat(managerData.custom.map(card=>({...normalizeCard(card),_builtIn:false,_hidden:false})));
  const search=String($("managerSearch")?.value||"").trim().toLocaleLowerCase("vi");
  const visibleEntries=entries.filter(card=>[card.name,card.chinese,card.movie,card.role,card.costume].join(" ").toLocaleLowerCase("vi").includes(search));
  $("managerCount").textContent=entries.filter(card=>!card._hidden).length+" thẻ đang dùng · "+entries.length+" hồ sơ";
  if(!visibleEntries.length){const empty=document.createElement("p");empty.className="manager-empty";empty.textContent="Không tìm thấy thẻ phù hợp.";list.appendChild(empty);return;}
  visibleEntries.forEach(card=>{
    const row=document.createElement("article");row.className="manager-item"+(card._hidden?" is-hidden":"");
    const thumb=document.createElement("div");thumb.className="manager-thumb";
    if(card.photo){const img=document.createElement("img");img.src=card.photo;img.alt="";img.loading="lazy";img.onerror=()=>{img.remove();thumb.textContent=card.initials||"✦";};thumb.appendChild(img);}else thumb.textContent=card.initials||"✦";
    const detail=document.createElement("div");detail.className="manager-item-detail";
    const title=document.createElement("strong");title.textContent=card.name;
    const meta=document.createElement("small");meta.textContent=[card.movie,card.role,card.costume,card.chinese,card.rarity].filter(Boolean).join(" · ");
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
    rebuildCharacters();showToast(wasHidden?"Đã hiện lại thẻ.":"Đã ẩn thẻ và xóa tiến độ sở hữu của phiên bản này.");
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
$("fieldPhoto").addEventListener("change",async event=>{
  const file=event.target.files?.[0];if(!file)return;$("photoStatus").textContent="Đang xử lý ảnh…";
  try{pendingPhotoData=await fileToCompressedDataUrl(file);buildPreview(pendingPhotoData,file.name);$("photoStatus").textContent="Ảnh mới đã sẵn sàng để lưu cho đúng phiên bản thẻ này.";}
  catch(error){pendingPhotoData=null;event.target.value="";$("photoStatus").textContent=error.message;showToast(error.message);}
});
$("characterForm").addEventListener("submit",async event=>{
  event.preventDefault();
  const name=$("fieldName").value.trim(),movie=$("fieldMovie").value.trim(),costume=$("fieldCostume").value.trim();
  if(!name||!movie||!costume){showToast("Hãy nhập tên diễn viên, tên phim và phiên bản trang phục.");return;}
  if(!editingId&&!pendingPhotoData){showToast("Hãy chọn ảnh đúng phiên bản thẻ khi thêm thẻ mới.");return;}
  const wasEditing=Boolean(editingId),rarity=$("fieldRarity").value,current=editingId?getAnyCharacter(editingId):null,art=makeArt(rarity);
  const changedPhoto=Boolean(pendingPhotoData);
  const fields={name,chinese:$("fieldChinese").value.trim(),movie,role:$("fieldRole").value.trim(),costume,gender:$("fieldGender").value,style:$("fieldStyle").value,rarity,quote:$("fieldQuote").value.trim()||"Một ngôi sao, một câu chuyện.",symbol:$("fieldSymbol").value.trim()||"✦",initials:makeInitials($("fieldChinese").value,name),photo:pendingPhotoData||current?.photo||"",photoFallback:changedPhoto?null:(current?.photoFallback||null),...art};
  const previous=JSON.parse(JSON.stringify(managerData));
  if(editingId){
    if(managerData.custom.some(card=>card.id===editingId))managerData.custom=managerData.custom.map(card=>card.id===editingId?{...card,...fields,...(changedPhoto?{photoCredit:"Ảnh do người dùng thêm",photoLicense:"Ảnh cá nhân",photoSource:""}:{})}:card);
    else managerData.overrides[editingId]={...(current||{}),...fields,...(changedPhoto?{photoCredit:"Ảnh do người dùng thêm",photoLicense:"Ảnh cá nhân",photoSource:""}:{})};
  }else{
    const randomId=globalThis.crypto?.randomUUID?.()||(Date.now().toString(36)+Math.random().toString(36).slice(2,10));
    managerData.custom.push({id:"card-"+randomId,...fields,photoCredit:"Ảnh do người dùng thêm",photoLicense:"Ảnh cá nhân",photoSource:""});
  }
  if(await persistManagerData()){clearCharacterForm();rebuildCharacters();showToast(wasEditing?"Đã cập nhật phiên bản thẻ.":"Đã thêm thẻ mới vào phim "+movie+".");}
  else managerData=normalizeManagerData(previous);
});
$("restoreDefaultsBtn").addEventListener("click",async()=>{
  if(!managerData.hidden.length&&!Object.keys(managerData.overrides).length&&!managerData.deleted.length){showToast("Các thẻ mẫu đang ở trạng thái ban đầu.");return;}
  if(!confirm("Khôi phục toàn bộ thẻ mẫu đã ẩn / xóa và hoàn tác chỉnh sửa của thẻ mẫu? Thẻ do bạn tự thêm và tiến độ sở hữu của thẻ mẫu đã xóa sẽ không được khôi phục."))return;
  const previous=JSON.parse(JSON.stringify(managerData));managerData.hidden=[];managerData.overrides={};managerData.deleted=[];
  if(await persistManagerData()){rebuildCharacters();showToast("Đã khôi phục các thẻ mẫu.");}else managerData=normalizeManagerData(previous);
});
$("exportBtn").addEventListener("click",()=>{
  const backup={app:"Starry C-Drama Cards",version:2,createdAt:new Date().toISOString(),managerData,state};
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
      state={owned:backup.state.owned&&typeof backup.state.owned==="object"?backup.state.owned:{},favorites:Array.isArray(backup.state.favorites)?backup.state.favorites:[]};
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
