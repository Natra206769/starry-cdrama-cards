/* gacha.js — Vé quay tự cộng mỗi giờ, không giới hạn số dư. */

const TICKET_STATE_KEY = "starry-cdrama-ticket-state-v1";
const TICKET_INTERVAL_MS = 60 * 60 * 1000;
let drawAnimationInProgress = false;
let ticketState = null;

function localDayKey(timestamp=Date.now()){
  const d=new Date(timestamp);
  return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
}
function loadTicketState(){
  const now=Date.now(),today=localDayKey(now);
  let saved=null;
  try{saved=JSON.parse(localStorage.getItem(TICKET_STATE_KEY)||"null");}catch(error){}
  if(!saved||!Number.isFinite(Number(saved.lastAccrualAt))){
    ticketState={tickets:1,earnedToday:1,day:today,lastAccrualAt:now};
    saveTicketState();
    return;
  }
  ticketState={
    tickets:Math.max(0,Math.floor(Number(saved.tickets)||0)),
    earnedToday:Math.max(0,Math.floor(Number(saved.earnedToday)||0)),
    day:typeof saved.day==="string"?saved.day:today,
    lastAccrualAt:Math.min(now,Math.max(0,Number(saved.lastAccrualAt)||now))
  };
  if(ticketState.day!==today){ticketState.day=today;ticketState.earnedToday=0;}
  accrueHourlyTickets(now);
}
function saveTicketState(){
  try{localStorage.setItem(TICKET_STATE_KEY,JSON.stringify(ticketState));}catch(error){}
}
function accrueHourlyTickets(now=Date.now()){
  if(!ticketState)return;
  const today=localDayKey(now);
  if(ticketState.day!==today){ticketState.day=today;ticketState.earnedToday=0;}
  const elapsed=Math.max(0,now-ticketState.lastAccrualAt);
  const due=Math.floor(elapsed/TICKET_INTERVAL_MS);
  if(due>0){
    const earned=due;
    ticketState.tickets+=earned;
    ticketState.earnedToday+=earned;
    ticketState.lastAccrualAt+=due*TICKET_INTERVAL_MS;

    saveTicketState();
  }
}
function formatTicketTime(ms){
  const seconds=Math.max(0,Math.ceil(ms/1000)),hours=Math.floor(seconds/3600),minutes=Math.floor((seconds%3600)/60),secs=seconds%60;
  if(hours>0)return hours+" giờ "+minutes+" phút";
  if(minutes>0)return minutes+" phút "+secs+" giây";
  return secs+" giây";
}
function nextTicketRemaining(){
  if(!ticketState)return 0;
  return Math.max(0,TICKET_INTERVAL_MS-(Date.now()-ticketState.lastAccrualAt));
}
function updateDrawControls(){
  if(ticketState)accrueHourlyTickets();
  const tickets=ticketState?ticketState.tickets:0;
  const locked=drawAnimationInProgress;
  ["openBtn","openTenBtn","againBtn","batchAgainBtn"].forEach(id=>{const button=$(id);if(button)button.disabled=locked||tickets< (id==="openTenBtn"||id==="batchAgainBtn"?3:1);});
  const status=$("drawCooldownStatus");
  if(status){
    let text="Vé hiện có: "+tickets+" · Hôm nay đã nhận "+(ticketState?.earnedToday||0)+" vé";
    if(drawAnimationInProgress)text+=" · Đang mở thẻ…";
    else text+=" · Vé tiếp theo sau "+formatTicketTime(nextTicketRemaining());
    status.textContent=text;
    status.classList.toggle("is-cooldown",tickets===0);
  }
}
function canStartDraw(cost=1){
  if(!ticketState)loadTicketState();
  accrueHourlyTickets();
  if(drawAnimationInProgress)return false;
  if(ticketState.tickets<cost){
    showToast(cost===3?"Cần 3 vé để mở 3 thẻ. Bạn nhận 1 vé tự động mỗi giờ, không giới hạn số vé.":"Bạn đã hết vé. Vé tiếp theo sẽ tự động được cộng sau mỗi giờ, không giới hạn số vé nhận mỗi ngày.");
    updateDrawControls();return false;
  }
  return true;
}
function consumeTickets(count){
  accrueHourlyTickets();
  if(!ticketState||ticketState.tickets<count)return false;
  ticketState.tickets-=count;
  saveTicketState();updateDrawControls();return true;
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
  drawAnimationInProgress=false;updateDrawControls();
}
function openCard(){
  if(!canStartDraw(1))return;
  if(!characters.length){showToast("Kho thẻ đang trống. Hãy thêm thẻ hoặc khôi phục thẻ mẫu.");return;}
  resetBatchExperience();
  const btn=$("openBtn"),tenBtn=$("openTenBtn");btn.disabled=true;if(tenBtn)tenBtn.disabled=true;$("againBtn").hidden=true;
  $("revealHint").textContent="Ánh sao đang hội tụ…";
  $("characterCard").classList.add("hidden");$("cardBack").classList.remove("hidden");$("cardBack").style.opacity="1";$("cardBack").style.transform="rotateY(0)";
  const card=weightedRandom();
  if(!card){btn.disabled=false;if(tenBtn)tenBtn.disabled=false;updateDrawControls();return;}
  if(!consumeTickets(1)){drawAnimationInProgress=false;updateDrawControls();return;}
  drawAnimationInProgress=true;updateDrawControls();
  const stage=document.querySelector(".stage");
  stage.style.setProperty("--rarity",rarityInfo[card.rarity].color);
  const openingClasses=Object.keys(rarityInfo).map(rarity=>"opening-rarity-"+rarityCssKey(rarity));
  stage.classList.remove(...openingClasses);
  $("cardBack").classList.remove("charging");
  stage.classList.add("opening-rarity-"+rarityCssKey(card.rarity));
  $("cardBack").classList.add("charging");
  const revealDelay=rarityInfo[card.rarity]?.revealDelay||650;
  setTimeout(()=>{
    $("cardBack").classList.remove("charging");
    stage.classList.remove(...openingClasses);
    const info=displayMainCard(card);
    const isDuplicate=(Number(state.owned[card.id])||0)>0;
    $("revealHint").textContent=isDuplicate?"Bạn đã sở hữu phiên bản này rồi! Bản trùng dùng làm phôi nâng cấp.":"Một thẻ mới gia nhập bộ sưu tập!";
    state.owned[card.id]=(Number(state.owned[card.id])||0)+1;
    saveState();renderCollection();updateStats();
    $("luckLabel").textContent=card.rarity;$("luckBar").style.width=info.luck+"%";$("againBtn").hidden=false;drawAnimationInProgress=false;updateDrawControls();
    showToast(info.toastPrefix+card.name+" · "+card.movie+(isDuplicate?" · bản trùng":""));
  },revealDelay);
}
function renderBatchSpotlight(card,result){
  const info=rarityInfo[card.rarity]||rarityInfo.R,art=$("batchSpotlightArt"),spotlight=$("batchSpotlight");
  spotlight.className="batch-spotlight rarity-"+rarityCssKey(card.rarity);spotlight.style.setProperty("--rarity",info.color);
  art.className="spotlight-art rarity-"+rarityCssKey(card.rarity);
  art.style.setProperty("--rarity",info.color);art.style.setProperty("--art1",card.art1||info.art[0]);art.style.setProperty("--art2",card.art2||info.art[1]);art.style.setProperty("--accent",card.accent||info.art[2]);
  art.querySelectorAll("img.spotlight-photo").forEach(image=>image.remove());art.classList.remove("has-photo");
  $("batchSpotlightInitials").textContent=card.initials||makeInitials(card.chinese,card.name);
  $("batchSpotlightTier").textContent=card.rarity;$("batchSpotlightRarity").textContent=info.label;$("batchSpotlightRarity").style.color=info.color;
  $("batchSpotlightName").textContent=card.name;$("batchSpotlightMovie").textContent=card.movie+(card.role?" · "+card.role:"");
  $("batchSpotlightQuote").textContent="“"+(card.quote||"Một ngôi sao, một câu chuyện.")+"”";
  $("batchSpotlightCopy").textContent=result.duplicate?"↻ Bản trùng · ×"+result.copyNumber+" · dùng làm phôi nâng cấp":"✦ Lần đầu sở hữu thẻ này";
  setCardImage(art,card,"spotlight-photo","Ảnh nổi bật của "+card.name+" trong "+card.movie);
}
function openThreeCards(){
  if(!canStartDraw(3))return;
  if(!characters.length){showToast("Kho thẻ đang trống. Hãy thêm thẻ hoặc khôi phục thẻ mẫu.");return;}
  resetBatchExperience();
  const buttons=[$("openBtn"),$("openTenBtn")];buttons.forEach(button=>{if(button)button.disabled=true;});
  $("againBtn").hidden=true;$("characterCard").classList.add("hidden");$("cardBack").classList.remove("hidden");$("cardBack").style.opacity="1";$("cardBack").style.transform="rotateY(0)";
  $("revealHint").textContent="Ba lá bài đang được gọi về…";$("summonKicker").hidden=false;$("skipBatchBtn").hidden=false;lastBatchCards=[];
  const pulled=Array.from({length:3},()=>weightedRandom()).filter(Boolean);
  if(!pulled.length){buttons.forEach(button=>{if(button)button.disabled=false;});$("summonKicker").hidden=true;$("skipBatchBtn").hidden=true;updateDrawControls();return;}
  if(!consumeTickets(3)){drawAnimationInProgress=false;updateDrawControls();return;}
  drawAnimationInProgress=true;updateDrawControls();
  const rarityRank={R:1,SR:2,SSR:3,"SSR+":4,UR:5,SP:6};
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
  const stage=document.querySelector(".stage"),openingClasses=Object.keys(rarityInfo).map(rarity=>"opening-rarity-"+rarityCssKey(rarity));
  // Intentionally use the exact same rarity classes and delay as openCard(). The former
  // batch-summoning class overrode some tier effects and made UR/SP feel rushed.
  stage.classList.remove(...openingClasses,"batch-summoning");stage.style.setProperty("--rarity",rarityInfo[highlight.rarity].color);
  $("cardBack").classList.remove("charging");stage.classList.add("opening-rarity-"+rarityCssKey(highlight.rarity));$("cardBack").classList.add("charging");
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
      const spotlightHold=BATCH_SPOTLIGHT_HOLD_MS[highlight.rarity]||BATCH_SPOTLIGHT_HOLD_DEFAULT_MS;
      scheduleBatchTimer(showResults,spotlightHold);
    }
  }
  function showHero(){
    if(heroCommitted)return;
    heroCommitted=true;
    $("cardBack").classList.remove("charging");stage.classList.remove(...openingClasses,"batch-summoning");
    const bestInfo=displayMainCard(highlight),firstResult=results[0];
    $("revealHint").textContent="Thẻ cao nhất trong 3 thẻ: "+highlight.rarity+" · "+highlight.name+(firstResult.duplicate?" (bản trùng).":"!");
    // Hold the central card reveal briefly, then transition to the full results scene.
    for(const card of orderedPulled)state.owned[card.id]=(Number(state.owned[card.id])||0)+1;
    saveState();renderCollection();updateStats();
    $("luckLabel").textContent=highlight.rarity;$("luckBar").style.width=bestInfo.luck+"%";
    if(reducedMotion){enterSpotlight();showResults();}
    else {
      // Let the same full-card reveal animation finish before transitioning to spotlight.
      const revealAnimationHold=BATCH_REVEAL_HOLD_MS[highlight.rarity]||BATCH_REVEAL_HOLD_DEFAULT_MS;
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
    $("batchSummary").textContent="3 thẻ đã mở · "+newCount+" thẻ mới · "+duplicateCount+" thẻ trùng · độ hiếm cao nhất: "+highlight.rarity+".";
    $("batchShowAllBtn").hidden=true;$("skipBatchBtn").hidden=true;$("summonKicker").hidden=true;
    drawAnimationInProgress=false;updateDrawControls();skipBatchFlow=null;
    showToast("✦ Mở 3 thẻ hoàn tất · "+highlight.rarity+" là cấp cao nhất.");
  }
  skipBatchFlow=()=>{clearBatchTimers();if(!heroCommitted)showHero();if(!spotlightShown)enterSpotlight();showResults();};
  scheduleBatchTimer(showHero,wait);
}
function renderBatchResults(results){
  const grid=$("batchGrid");grid.replaceChildren();
  for(const result of results){
    const card=normalizeCard(result.card),info=rarityInfo[card.rarity]||rarityInfo.R;
    const article=document.createElement("article");article.className="batch-card rarity-"+rarityCssKey(card.rarity);
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
    const copy=document.createElement("span");copy.className="batch-copy"+(result.duplicate?" is-duplicate":"");copy.textContent=result.duplicate?"↻ Trùng · ×"+result.copyNumber:"✦ Mới sở hữu";
    content.append(rarity,name,movie,role,copy);article.appendChild(content);grid.appendChild(article);
  }
}
function closeBatchExperience(){
  resetBatchExperience();$("page-open").scrollTop=0;showAppPage("open");
  $("revealHint").textContent="Tập trung năng lượng… ngôi sao đang chờ bạn.";
}
$("openTenBtn").addEventListener("click",openThreeCards);
$("skipBatchBtn").addEventListener("click",()=>{if(skipBatchFlow)skipBatchFlow();});
$("batchShowAllBtn").addEventListener("click",()=>{if(skipBatchFlow)skipBatchFlow();});
$("batchCloseBtn").addEventListener("click",closeBatchExperience);
$("batchCollectionBtn").addEventListener("click",()=>{closeBatchExperience();showAppPage("collection");});
$("batchAgainBtn").addEventListener("click",()=>{closeBatchExperience();openTenCards();});

loadTicketState();updateDrawControls();window.setInterval(updateDrawControls,1000);
