/* leaderboard.js — Xếp hạng toàn kho phim và diễn viên.
   Chỉ dùng danh mục hệ thống; dữ liệu sở hữu của người chơi không ảnh hưởng thứ hạng. */
let leaderboardGender = "female";
let leaderboardMode = "hot";
let leaderboardKind = "actor";
let leaderboardQuery = "";

function leaderboardTextKey(value){return normalizedSearchKey(String(value||"").trim());}
function leaderboardMovieTitle(card){const title=String(card.movie||"").trim();return title&&!isGenericCollectionTitle(title)?title:"";}
function leaderboardCardIdentity(card,scope){
  const movie=leaderboardTextKey(card.movie),actor=leaderboardTextKey(card.name),role=leaderboardTextKey(card.role);
  const rarity=String(card.rarity||"N").toUpperCase();
  return scope==="actor" ? [movie,role,rarity].join("::") : [actor,role,rarity].join("::");
}
function leaderboardDistinctCards(cards,scope){
  const map=new Map();
  cards.forEach((card,index)=>{
    const identity=leaderboardCardIdentity(card,scope);
    map.set(identity||String(card.id||index),card);
  });
  return [...map.values()];
}
function leaderboardCardPoints(cards){
  return leaderboardDistinctCards(cards,"movie").reduce((sum,card)=>sum+(leaderboardRarityPoints[String(card.rarity||"N").toUpperCase()]||1),0);
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
    actor.systemCards=leaderboardDistinctCards(actor.cards,"actor");
    // Gender is inferred from distinct catalog entries, not player-owned copies.
    for(const card of actor.systemCards)if(card.gender==="male"||card.gender==="female")actor.genderCounts[card.gender]++;
    actor.gender=actor.genderCounts.female>actor.genderCounts.male?"female":actor.genderCounts.male>actor.genderCounts.female?"male":(actor.systemCards.find(card=>card.gender==="male"||card.gender==="female")?.gender||"other");
    actor.hotScore=actor.movies.size;
    actor.catalogCardPoints=actor.systemCards.reduce((sum,card)=>sum+(leaderboardRarityPoints[String(card.rarity||"N").toUpperCase()]||1),0);
    actor.cardCount=actor.systemCards.length;
    // Keep the existing agreed formula: score = P / N + N.
    // P: rarity-weighted points from distinct catalog variants; N: distinct concrete films.
    actor.beautyScore=actor.hotScore>0?(actor.catalogCardPoints/actor.hotScore)+actor.hotScore:0;
    return actor;
  });
}
function buildMovieRankingData(){
  const byMovie=new Map();
  for(const card of characters){
    const title=leaderboardMovieTitle(card),key=leaderboardTextKey(title);if(!key)continue;
    if(!byMovie.has(key))byMovie.set(key,{key,title,cards:[],actors:new Set()});
    const movie=byMovie.get(key);movie.cards.push(card);
    const actor=leaderboardTextKey(card.name);if(actor)movie.actors.add(actor);
  }
  // Include explicitly registered film records even when no cards are linked yet.
  if(typeof movieMetadataEntries==="function"){
    for(const entry of movieMetadataEntries()){
      const key=leaderboardTextKey(entry.title);
      if(key&&!byMovie.has(key))byMovie.set(key,{key,title:entry.title,cards:[],actors:new Set()});
    }
  }
  return [...byMovie.values()].map(movie=>{
    movie.systemCards=leaderboardDistinctCards(movie.cards,"movie");
    movie.actorCount=movie.actors.size;
    movie.cardCount=movie.systemCards.length;
    movie.cardPoints=movie.systemCards.reduce((sum,card)=>sum+(leaderboardRarityPoints[String(card.rarity||"N").toUpperCase()]||1),0);
    movie.metadata=typeof getMovieMetadata==="function"?getMovieMetadata(movie.title):null;
    return movie;
  });
}
function compareVietnamese(a,b){return String(a).localeCompare(String(b),"vi",{sensitivity:"base"});}
function leaderboardAvatarSource(item){
  if(leaderboardKind==="movie"){
    const meta=item.metadata||{};
    if(meta.poster)return {src:meta.poster,alt:"Poster phim "+item.title,accent:"#d8bb86",fallback:item.systemCards.find(card=>card.photo)?.photo||""};
    const card=item.systemCards.find(card=>card.photo);
    return card?{src:card.photo,alt:"Ảnh minh họa phim "+item.title,accent:card.accent||"#d8bb86",fallback:""}:null;
  }
  const rarityOrder={SP:6,UR:5,SSR:4,SR:3,R:2,N:1};
  const card=[...(item.systemCards||item.cards||[])].sort((a,b)=>(rarityOrder[String(b.rarity||"N").toUpperCase()]||0)-(rarityOrder[String(a.rarity||"N").toUpperCase()]||0)||compareVietnamese(a.movie,b.movie))[0];
  return card?{src:card.photo||"",alt:"Ảnh đại diện thẻ của "+item.name,accent:card.accent||"#c18aff",initials:card.initials||makeInitials(card.chinese,item.name),fallback:card.photoFallback||""}:{src:"",alt:"",accent:"#c18aff",initials:makeInitials("",item.name),fallback:""};
}
function makeLeaderboardAvatar(item){
  const avatar=document.createElement("div");avatar.className="leaderboard-avatar";
  const source=leaderboardAvatarSource(item);avatar.style.setProperty("--avatar-accent",source?.accent||"#c18aff");
  const initials=source?.initials||makeInitials("",leaderboardKind==="movie"?item.title:item.name);
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
function leaderboardOpenEntry(item){
  if(leaderboardKind==="movie")openMovieProfile(item.title);
  else openActorProfile(item.name);
}
function makeLeaderboardEntry(item,rank,podium=false){
  const element=document.createElement(podium?"article":"li");
  element.className="leaderboard-entry rank-"+rank+(podium?" is-podium":"");
  element.tabIndex=0;element.setAttribute("role","button");
  element.setAttribute("aria-label","Hạng "+rank+": "+(leaderboardKind==="movie"?item.title:item.name)+". Mở hồ sơ.");
  element.title="Nhấn để mở hồ sơ";
  const badge=document.createElement("span");badge.className="leaderboard-rank-badge";badge.textContent=rank===1?"♛ "+rank:String(rank).padStart(2,"0");
  const avatar=makeLeaderboardAvatar(item);
  const identity=document.createElement("div");identity.className="leaderboard-identity";
  const name=document.createElement("strong");name.textContent=leaderboardKind==="movie"?item.title:item.name;
  const sub=document.createElement("small");
  if(leaderboardKind==="movie"){
    const meta=item.metadata||{};
    sub.textContent=[meta.year,item.actorCount+" diễn viên",item.cardCount+" biến thể"].filter(Boolean).join(" · ");
  }else if(leaderboardMode==="hot")sub.textContent=item.hotScore+" phim khác nhau · "+item.cardCount+" biến thể trong kho";
  else sub.textContent="N = "+item.hotScore+" phim · P = "+item.catalogCardPoints+" điểm thẻ";
  identity.append(name,sub);
  const metric=document.createElement("div");metric.className="leaderboard-metric";
  const score=document.createElement("strong");
  const label=document.createElement("span");
  if(leaderboardKind==="movie"){
    score.textContent=String(leaderboardMode==="cast"?item.actorCount:item.cardPoints);
    label.textContent=leaderboardMode==="cast"?"DIỄN VIÊN":"ĐIỂM THẺ";
  }else{
    score.textContent=leaderboardMode==="hot"?String(item.hotScore):item.beautyScore.toLocaleString("vi-VN",{maximumFractionDigits:2});
    label.textContent=leaderboardMode==="hot"?"PHIM":"ĐIỂM";
  }
  metric.append(score,label);element.append(badge,avatar,identity,metric);
  element.addEventListener("click",()=>leaderboardOpenEntry(item));
  element.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();leaderboardOpenEntry(item);}});
  return element;
}
function renderLeaderboard(){
  const page=$("page-leaderboard");if(!page)return;
  const podium=$("leaderboardPodium"),list=$("leaderboardList"),empty=$("leaderboardEmpty");
  podium.replaceChildren();list.replaceChildren();podium.hidden=true;list.hidden=true;
  document.querySelectorAll("[data-rank-kind]").forEach(button=>{
    const active=button.dataset.rankKind===leaderboardKind;button.classList.toggle("active",active);button.setAttribute("aria-pressed",String(active));
  });
  document.querySelectorAll("[data-rank-gender]").forEach(button=>{
    const active=button.dataset.rankGender===leaderboardGender;button.classList.toggle("active",active);button.setAttribute("aria-pressed",String(active));
  });
  document.querySelectorAll("[data-rank-mode]").forEach(button=>{
    const active=button.dataset.rankMode===leaderboardMode;button.classList.toggle("active",active);button.setAttribute("aria-pressed",String(active));
  });
  const genderControls=$("leaderboardGenderControls");
  const modeGroup=$("leaderboardModeControls");
  if(genderControls)genderControls.hidden=leaderboardKind!=="actor";
  if(modeGroup){
    modeGroup.querySelectorAll("[data-rank-mode]").forEach(button=>{
      const isMovieMode=button.dataset.rankMode==="cast"||button.dataset.rankMode==="points";
      button.hidden=leaderboardKind==="movie"?!isMovieMode:isMovieMode;
    });
  }
  const query=leaderboardTextKey($("leaderboardSearch")?.value||"");
  leaderboardQuery=query;
  const allActors=buildActorRankingData();
  const allMovies=buildMovieRankingData();
  let sorted;
  if(leaderboardKind==="movie"){
    sorted=allMovies.filter(movie=>leaderboardTextKey(movie.title).includes(query))
      .filter(movie=>leaderboardMode==="cast"?movie.actorCount>0:movie.cardCount>0)
      .sort((a,b)=>(leaderboardMode==="cast"?b.actorCount-a.actorCount:b.cardPoints-a.cardPoints)||b.cardCount-a.cardCount||compareVietnamese(a.title,b.title));
    $("leaderboardActorCount").textContent=sorted.length;
    $("leaderboardCountLabel").textContent="phim";
    $("leaderboardRules").textContent=leaderboardMode==="cast"
      ?"Dàn diễn viên = số tên diễn viên khác nhau được liên kết với từng phim trong toàn bộ kho thẻ. Mỗi diễn viên chỉ tính một lần cho mỗi phim; không phụ thuộc bộ sưu tập cá nhân."
      :"Điểm kho thẻ = tổng điểm độ hiếm của các biến thể thẻ khác nhau thuộc phim (N = 1 · R = 2 · SR = 4 · SSR = 7 · UR = 12 · SP = 20). Bản sao sở hữu không được cộng điểm.";
  }else{
    const actors=allActors.filter(actor=>actor.gender===leaderboardGender);
    sorted=actors.filter(actor=>actor.hotScore>0&&leaderboardTextKey(actor.name).includes(query))
      .sort((a,b)=>(leaderboardMode==="hot"?b.hotScore-a.hotScore:b.beautyScore-a.beautyScore)||b.hotScore-a.hotScore||b.catalogCardPoints-a.catalogCardPoints||compareVietnamese(a.name,b.name));
    $("leaderboardActorCount").textContent=sorted.length;
    $("leaderboardCountLabel").textContent="diễn viên";
    $("leaderboardRules").textContent=leaderboardMode==="hot"
      ?"Độ hot = số phim khác nhau có tên diễn viên trong toàn bộ kho hệ thống. Mỗi phim chỉ tính một lần; dữ liệu sở hữu và bản sao của người chơi không ảnh hưởng thứ hạng."
      :"Điểm Nhan sắc (chỉ số giải trí) = P / N + N. P là tổng điểm độ hiếm của các biến thể thẻ khác nhau trong kho hệ thống (N = 1 · R = 2 · SR = 4 · SSR = 7 · UR = 12 · SP = 20); N là số phim khác nhau. Không đánh giá khách quan ngoại hình.";
  }
  empty.hidden=sorted.length>0;
  if(!sorted.length){
    $("leaderboardEmptyTitle").textContent=query?"Không tìm thấy kết quả phù hợp":leaderboardKind==="movie"?"Chưa có dữ liệu phim để xếp hạng":leaderboardMode==="hot"?"Chưa có dữ liệu phim cụ thể":"Chưa có dữ liệu phim để tính điểm";
    $("leaderboardEmptyText").textContent=query?"Thử từ khóa khác hoặc xóa nội dung tìm kiếm.":leaderboardKind==="movie"?"Thêm phim có thẻ liên kết hoặc bổ sung dữ liệu phim trong mục Quản lý thẻ.":"Hãy gắn tên phim cụ thể vào thẻ trong kho. Thứ hạng luôn dựa trên toàn bộ dữ liệu hệ thống, không phải thẻ bạn sở hữu.";
    return;
  }
  if(sorted.length>=3){
    podium.hidden=false;list.hidden=sorted.length<=3;
    const top=sorted.slice(0,3),displayOrder=[top[1],top[0],top[2]];
    displayOrder.forEach(item=>podium.appendChild(makeLeaderboardEntry(item,sorted.indexOf(item)+1,true)));
    sorted.slice(3).forEach((item,index)=>list.appendChild(makeLeaderboardEntry(item,index+4,false)));
  }else{
    list.hidden=false;sorted.forEach((item,index)=>list.appendChild(makeLeaderboardEntry(item,index+1,false)));
  }
}
for(const button of document.querySelectorAll("[data-rank-kind]"))button.addEventListener("click",()=>{leaderboardKind=button.dataset.rankKind;leaderboardMode=leaderboardKind==="movie"?"cast":"hot";renderLeaderboard();});
for(const button of document.querySelectorAll("[data-rank-gender]"))button.addEventListener("click",()=>{leaderboardGender=button.dataset.rankGender;renderLeaderboard();});
for(const button of document.querySelectorAll("[data-rank-mode]"))button.addEventListener("click",()=>{leaderboardMode=button.dataset.rankMode;renderLeaderboard();});
$("leaderboardSearch")?.addEventListener("input",renderLeaderboard);
$("leaderboardAddCardsBtn").addEventListener("click",()=>{showAppPage("manager");startAddCharacter();});
