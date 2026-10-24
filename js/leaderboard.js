/* leaderboard.js — Bảng xếp hạng diễn viên (Độ hot / Nhan sắc)

*/

// Bảng xếp hạng dùng dữ liệu trong toàn bộ kho thẻ hiện có, không đọc state sở hữu.
// Nhan sắc = P / N + N; P là tổng điểm các biến thể thẻ khác nhau, N là số phim khác nhau.
let leaderboardGender = "female";
let leaderboardMode = "hot";
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
