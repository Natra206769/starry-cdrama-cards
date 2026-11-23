/* leaderboard.js — Actor rankings use the complete system catalog, never player ownership. */
let leaderboardGender = "all";
const MAX_LEADERBOARD_ENTRIES = 100;

function leaderboardTextKey(value){return normalizedSearchKey(String(value||"").trim());}
function leaderboardMovieTitle(card){const title=String(card.movie||"").trim();return title&&!isGenericCollectionTitle(title)?title:"";}
function leaderboardCardIdentity(card){
  const movie=leaderboardTextKey(card.movie),role=leaderboardTextKey(card.role);
  const rarity=String(card.rarity||"R").toUpperCase();
  return [movie,role,rarity].join("::");
}
function leaderboardDistinctCards(cards){
  const map=new Map();
  cards.forEach((card,index)=>{
    const identity=leaderboardCardIdentity(card);
    map.set(identity||String(card.id||index),card);
  });
  return [...map.values()];
}
function rarityPoints(card){
  const rarity=String(card.rarity||"R").toUpperCase();
  if(rarity==="SP")return 20;
  return leaderboardRarityPoints[rarity]??3;
}

function buildActorRankingData(){
  const byName=new Map();
  for(const card of characters){
    const key=leaderboardTextKey(card.name);if(!key)continue;
    if(!byName.has(key))byName.set(key,{key,name:String(card.name||"").trim(),cards:[],genderCounts:{male:0,female:0},movies:new Set()});
    const actor=byName.get(key);actor.cards.push(card);
    const movie=leaderboardMovieTitle(card);
    if(movie)actor.movies.add(leaderboardTextKey(movie));
  }
  return [...byName.values()].map(actor=>{
    actor.systemCards=leaderboardDistinctCards(actor.cards);
    for(const card of actor.systemCards)if(card.gender==="male"||card.gender==="female")actor.genderCounts[card.gender]++;
    actor.gender=actor.genderCounts.female>actor.genderCounts.male?"female":actor.genderCounts.male>actor.genderCounts.female?"male":(actor.systemCards.find(card=>card.gender==="male"||card.gender==="female")?.gender||"other");
    actor.filmCount=actor.movies.size;
    actor.catalogCardPoints=actor.systemCards.reduce((sum,card)=>sum+rarityPoints(card),0);
    actor.cardCount=actor.systemCards.length;
    // Bonus per film: 1–2 films = 0; 3–4 = 0.5; 5–9 = 0.75; 10+ = 1.
    actor.filmBonusPerFilm=actor.filmCount>=10?1:actor.filmCount>=5?0.75:actor.filmCount>=3?0.5:0;
    actor.spCardCount=actor.systemCards.filter(card=>String(card.rarity||"R").toUpperCase()==="SP").length;
    actor.spBonusPoints=actor.spCardCount*2;
    // Base score = P for one film; otherwise P / N + N × the applicable per-film bonus.
    // Add +2 for every SP card only after the base actor formula has been calculated.
    const baseBeautyScore=actor.filmCount===1
      ?actor.catalogCardPoints
      :actor.filmCount>1
        ?(actor.catalogCardPoints/actor.filmCount)+(actor.filmCount*actor.filmBonusPerFilm)
        :0;
    actor.beautyScore=baseBeautyScore+actor.spBonusPoints;
    return actor;
  });
}

function compareVietnamese(a,b){return String(a).localeCompare(String(b),"vi",{sensitivity:"base"});}
function leaderboardRarityColor(rarity){
  const colors={R:"#aab5c9",SR:"#72b6ff",SSR:"#c18aff",UR:"#ffca75",LR:"#ff5b6e",MR:"#4b9dff",SP:"#ff85d4"};
  return colors[String(rarity||"R").toUpperCase()]||colors.R;
}
function leaderboardAvatarSource(item){
  const rarityOrder={SP:7,MR:6,LR:5,UR:4,SSR:3,SR:2,R:1};
  const card=[...(item.systemCards||item.cards||[])].sort((a,b)=>(rarityOrder[String(b.rarity||"R").toUpperCase()]||0)-(rarityOrder[String(a.rarity||"R").toUpperCase()]||0)||compareVietnamese(a.movie,b.movie))[0];
  return card?{src:card.photo||"",alt:"Ảnh đại diện thẻ của "+item.name,accent:leaderboardRarityColor(card.rarity),initials:card.initials||makeInitials(card.chinese,item.name),fallback:card.photoFallback||""}:{src:"",alt:"",accent:leaderboardRarityColor("R"),initials:makeInitials("",item.name),fallback:""};
}
function makeLeaderboardAvatar(item){
  const avatar=document.createElement("div");avatar.className="leaderboard-avatar";
  const source=leaderboardAvatarSource(item);avatar.style.setProperty("--avatar-accent",source?.accent||leaderboardRarityColor("R"));
  const initials=source?.initials||makeInitials("",item.name);
  const mark=document.createElement("span");mark.textContent=initials;avatar.appendChild(mark);
  if(source?.src){
    const image=document.createElement("img");image.alt=source.alt;image.loading="lazy";image.referrerPolicy="no-referrer";
    image.onerror=()=>{
      if(source.fallback&&image.dataset.fallbackTried!=="1"){image.dataset.fallbackTried="1";image.src=source.fallback;}
      else image.remove();
    };
    image.src=source.src;avatar.appendChild(image);
  }
  return avatar;
}
function showLeaderboardCardImage(item,imageSrc){
  const source=leaderboardAvatarSource(item);
  const src=imageSrc||source?.src;
  if(!src){showToast("Thẻ này chưa có ảnh để hiển thị.");return;}
  let dialog=$("leaderboardImageLightbox");
  if(!dialog){
    dialog=document.createElement("dialog");dialog.id="leaderboardImageLightbox";dialog.className="leaderboard-image-lightbox";
    const image=document.createElement("img");image.id="leaderboardImageLightboxPhoto";image.alt="";image.decoding="async";image.draggable=false;
    dialog.appendChild(image);
    dialog.addEventListener("click",event=>{if(event.target===dialog)dialog.close();});
    document.body.appendChild(dialog);
  }
  const image=$("leaderboardImageLightboxPhoto");image.alt="Ảnh thẻ nhân vật của "+item.name;image.src=src;
  if(!dialog.open)dialog.showModal();
}
function leaderboardOpenEntry(item){openActorProfile(item.name);}
function makeLeaderboardEntry(item,rank,podium=false){
  const element=document.createElement(podium?"article":"li");
  element.className="leaderboard-entry rank-"+rank+(podium?" is-podium":"")+(rank>=4&&rank<=10?" is-top-ten":"");
  element.tabIndex=0;element.setAttribute("role","button");
  element.setAttribute("aria-label","Hạng "+rank+": "+item.name+". Mở hồ sơ diễn viên.");
  element.title="Nhấn để mở hồ sơ diễn viên";
  const badge=document.createElement("span");badge.className="leaderboard-rank-badge";badge.textContent=rank===1?"♛ "+rank:String(rank).padStart(2,"0");
  const avatar=makeLeaderboardAvatar(item);
  avatar.classList.add("leaderboard-avatar-zoom");avatar.tabIndex=0;avatar.setAttribute("role","button");avatar.setAttribute("aria-label","Mở ảnh thẻ rõ nét của "+item.name);avatar.title="Nhấn để xem ảnh thẻ rõ nét";
  avatar.addEventListener("click",event=>{event.stopPropagation();showLeaderboardCardImage(item,avatar.querySelector("img")?.currentSrc||avatar.querySelector("img")?.src);});
  avatar.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();event.stopPropagation();showLeaderboardCardImage(item,avatar.querySelector("img")?.currentSrc||avatar.querySelector("img")?.src);}});
  const identity=document.createElement("div");identity.className="leaderboard-identity";
  const name=document.createElement("strong");name.textContent=item.name;
  identity.append(name);
  const metric=document.createElement("div");metric.className="leaderboard-metric";
  const score=document.createElement("strong"),label=document.createElement("span");
  score.textContent=item.beautyScore.toLocaleString("vi-VN",{maximumFractionDigits:2});
  label.textContent="ĐIỂM NHAN SẮC";
  metric.append(score,label);element.append(badge,avatar,identity,metric);
  element.addEventListener("click",()=>leaderboardOpenEntry(item));
  element.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();leaderboardOpenEntry(item);}});
  return element;
}

function renderLeaderboard(){
  const page=$("page-leaderboard");if(!page)return;
  const podium=$("leaderboardPodium"),list=$("leaderboardList"),empty=$("leaderboardEmpty"),topTenLabel=$("leaderboardTopTenLabel");
  podium.replaceChildren();list.replaceChildren();podium.hidden=true;list.hidden=true;if(topTenLabel)topTenLabel.hidden=true;
  document.querySelectorAll("[data-rank-gender]").forEach(button=>{
    const active=button.dataset.rankGender===leaderboardGender;button.classList.toggle("active",active);button.setAttribute("aria-pressed",String(active));
  });
  const query=leaderboardTextKey($("leaderboardSearch")?.value||"");
  const matches=buildActorRankingData().filter(actor=>(leaderboardGender==="all"||actor.gender===leaderboardGender)&&actor.filmCount>0&&leaderboardTextKey(actor.name).includes(query))
    .sort((a,b)=>b.beautyScore-a.beautyScore||b.filmCount-a.filmCount||b.catalogCardPoints-a.catalogCardPoints||compareVietnamese(a.name,b.name));
  const sorted=matches.slice(0,MAX_LEADERBOARD_ENTRIES);
  $("leaderboardActorCount").textContent=String(sorted.length);
  $("leaderboardCountLabel").textContent="diễn viên · top 100";
  $("leaderboardRules").textContent="Điểm diễn viên: 1 phim = P; từ 2 phim = P/N + N×điểm cộng mỗi phim (1–2 phim: 0; 3–4: 0,5; 5–9: 0,75; từ 10: 1). P = tổng điểm thẻ, N = số phim. Điểm thẻ: R 3 · SR 5 · SSR 8 · UR 11 · LR 15 · MR 20 · SP 20. Sau công thức điểm diễn viên, mỗi thẻ SP được cộng thêm 2 điểm thưởng.";
  empty.hidden=sorted.length>0;
  if(!sorted.length){
    $("leaderboardEmptyTitle").textContent=query?"Không tìm thấy kết quả phù hợp":"Chưa có dữ liệu diễn viên để tính điểm";
    $("leaderboardEmptyText").textContent=query?"Thử từ khóa khác hoặc xóa nội dung tìm kiếm.":"Hãy gắn tên phim cụ thể vào thẻ trong kho. Thứ hạng dùng toàn bộ dữ liệu hệ thống, không phải thẻ bạn sở hữu.";
    return;
  }
  if(sorted.length>=3){
    podium.hidden=false;list.hidden=sorted.length<=3;if(topTenLabel)topTenLabel.hidden=sorted.length<=3;
    const top=sorted.slice(0,3),displayOrder=[top[1],top[0],top[2]];
    displayOrder.forEach(item=>podium.appendChild(makeLeaderboardEntry(item,sorted.indexOf(item)+1,true)));
    sorted.slice(3).forEach((item,index)=>list.appendChild(makeLeaderboardEntry(item,index+4,false)));
  }else{
    list.hidden=false;sorted.forEach((item,index)=>list.appendChild(makeLeaderboardEntry(item,index+1,false)));
  }
}
for(const button of document.querySelectorAll("[data-rank-gender]"))button.addEventListener("click",()=>{leaderboardGender=button.dataset.rankGender;renderLeaderboard();});
$("leaderboardSearch")?.addEventListener("input",renderLeaderboard);
$("leaderboardAddCardsBtn").addEventListener("click",()=>{showAppPage("manager");startAddCharacter();});
