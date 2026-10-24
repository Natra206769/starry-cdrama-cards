/* gacha.js — Mở 1 thẻ, mở 10 thẻ (hiệu ứng triệu hồi, spotlight, tổng kết)

*/

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
    $("revealHint").textContent=isDuplicate?"Bạn đã sở hữu phiên bản này rồi! Bản trùng dùng làm phôi nâng cấp.":"Một thẻ mới gia nhập bộ sưu tập!";
    state.owned[card.id]=(Number(state.owned[card.id])||0)+1;
    saveState();renderCollection();updateStats();
    $("luckLabel").textContent=card.rarity;$("luckBar").style.width=info.luck+"%";$("againBtn").hidden=false;btn.disabled=false;if(tenBtn)tenBtn.disabled=false;
    showToast(info.toastPrefix+card.name+" · "+card.movie+(isDuplicate?" · bản trùng":""));
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
  $("batchSpotlightCopy").textContent=result.duplicate?"↻ Bản trùng · ×"+result.copyNumber+" · dùng làm phôi nâng cấp":"✦ Lần đầu sở hữu thẻ này";
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
      const spotlightHold=BATCH_SPOTLIGHT_HOLD_MS[highlight.rarity]||BATCH_SPOTLIGHT_HOLD_DEFAULT_MS;
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
    $("batchSummary").textContent="10 lượt mở · "+newCount+" thẻ mới · "+duplicateCount+" thẻ trùng · độ hiếm cao nhất: "+highlight.rarity+".";
    $("batchShowAllBtn").hidden=true;$("skipBatchBtn").hidden=true;$("summonKicker").hidden=true;
    buttons.forEach(button=>{if(button)button.disabled=false;});skipBatchFlow=null;
    showToast("✦ Mở x10 hoàn tất · "+highlight.rarity+" là cấp cao nhất.");
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
    const copy=document.createElement("span");copy.className="batch-copy"+(result.duplicate?" is-duplicate":"");copy.textContent=result.duplicate?"↻ Trùng · ×"+result.copyNumber:"✦ Mới sở hữu";
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
