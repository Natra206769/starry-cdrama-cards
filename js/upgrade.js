/* upgrade.js — Nâng cấp thẻ: đập sao, nâng level bằng phôi. Số liệu lấy từ config.js

*/

// V9.1 — standalone enhancement workshop. Legacy collections without cardProgress start at 1★ / Lv.1.
function getCardProgress(id){
  if(!state.cardProgress||typeof state.cardProgress!=="object")state.cardProgress={};
  const saved=state.cardProgress[id]&&typeof state.cardProgress[id]==="object"?state.cardProgress[id]:{};
  const stars=Math.max(1,Math.min(5,Math.floor(Number(saved.stars)||1)));
  const level=Math.max(1,Math.min(MAX_CARD_LEVEL,Math.floor(Number(saved.level)||1)));
  const needed=level>=MAX_CARD_LEVEL?0:(levelExpRequirements[level-1]||0);
  const exp=needed?Math.max(0,Math.min(needed-1,Math.floor(Number(saved.exp)||0))):0;
  const progress={stars,level,exp};
  state.cardProgress[id]=progress;
  return progress;
}
function requiredLevelExp(level){return level>=MAX_CARD_LEVEL?0:(levelExpRequirements[level-1]||0);}
function renderUpgradePreview(card){
  const preview=$("upgradePreviewCard");
  if(!preview||!card)return;
  const progress=getCardProgress(card.id);
  const info=rarityInfo[card.rarity]||rarityInfo.R;
  preview.hidden=false;
  preview.style.setProperty("--preview-rarity",info.color);
  preview.style.setProperty("--preview-art1",card.art1||"#292f46");
  preview.style.setProperty("--preview-art2",card.art2||"#111522");
  preview.style.setProperty("--preview-accent",card.accent||info.color);
  preview.classList.remove("star-level-1","star-level-2","star-level-3","star-level-4","star-level-5","has-photo");
  preview.classList.add("star-level-"+progress.stars);
  $("upgradePreviewInitials").textContent=card.initials||makeInitials(card.chinese,card.name);
  $("upgradePreviewTier").textContent="★ "+progress.stars+"/5";
  $("upgradePreviewStars").textContent="★".repeat(progress.stars);
  const foil=$("upgradePreviewFoil");
  if(foil)foil.className="ascension-preview-foil star-level-"+progress.stars;
  const image=$("upgradePreviewPhoto");
  if(!image)return;
  image.hidden=true;
  image.removeAttribute("src");
  image.dataset.fallbackTried="0";
  image.alt="Ảnh "+card.name+" trong "+(card.movie||"bộ sưu tập");
  image.onload=()=>preview.classList.add("has-photo");
  image.onerror=()=>{
    if(card.photoFallback&&image.dataset.fallbackTried!=="1"){
      image.dataset.fallbackTried="1";
      image.src=card.photoFallback;
    }else{
      image.hidden=true;
      preview.classList.remove("has-photo");
    }
  };
  if(card.photo){
    preview.classList.remove("has-photo");
    image.hidden=false;
    image.src=card.photo;
  }else{
    preview.classList.remove("has-photo");
  }
}
function renderCardUpgradePanel(card){
  const panel=$("cardUpgradePanel");if(!panel)return;
  const owned=Math.max(0,Number(state.owned[card.id])||0);
  panel.hidden=owned<1;
  if(owned<1)return;
  const progress=getCardProgress(card.id);
  $("upgradeStarsDisplay").textContent="★".repeat(progress.stars)+"☆".repeat(5-progress.stars)+` (${progress.stars}/5)`;
  $("upgradeLevelDisplay").textContent=`Lv.${progress.level}`;
  const needed=requiredLevelExp(progress.level);
  $("upgradeLevelExp").textContent=progress.level>=MAX_CARD_LEVEL?"Đã đạt level tối đa":`${progress.exp} / ${needed} EXP`;
  $("upgradeExpFill").style.width=needed?`${Math.min(100,progress.exp/needed*100)}%`:"100%";
  const starRule=starUpgradeRules[progress.stars];
  const starBtn=$("upgradeStarBtn");
  if(!starRule){$("upgradeStarRule").textContent="Thẻ đã đạt tối đa 5★.";starBtn.textContent="Đã tối đa sao";starBtn.disabled=true;}
  else{
    const availableCopies=Math.max(0,owned-1);
    $("upgradeStarRule").textContent=`${progress.stars}★ → ${starRule.next}★ · Tỉ lệ cố định ${starRule.rate}% mỗi lần thử · Cần ${starRule.cost} bản sao cùng thẻ. ${availableCopies} bản sao hiện có thể dùng.`;
    starBtn.textContent=`Đập sao ${progress.stars}★ → ${starRule.next}★ · ${starRule.rate}%`;
    starBtn.disabled=availableCopies<starRule.cost||upgradeAttemptInProgress;
  }
  renderUpgradeFodderList(card);
}
function renderUpgradeCardSelector(){
  const container=$("upgradeCardSelector");if(!container)return;
  container.replaceChildren();
  const query=normalizedSearchKey($("upgradeCardSearch")?.value||"");
  const ownedCards=characters.filter(card=>(Number(state.owned[card.id])||0)>0)
    .sort((a,b)=>compareVietnamese(a.name,b.name)||compareVietnamese(a.movie,b.movie));
  const matching=ownedCards.filter(card=>normalizedSearchKey([card.name,card.chinese,card.movie,card.role,card.rarity].join(" ")).includes(query));
  $("upgradeCardCount").textContent=query?`${matching.length} / ${ownedCards.length} thẻ phù hợp`:`${ownedCards.length} thẻ có thể nâng cấp`;
  for(const card of matching){
    const progress=getCardProgress(card.id),info=rarityInfo[card.rarity]||rarityInfo.R;
    const button=document.createElement("button");button.type="button";button.className="upgrade-card-option"+(card.id===currentUpgradeId?" is-selected":"");button.dataset.cardId=card.id;button.dataset.search=normalizedSearchKey([card.name,card.chinese,card.movie,card.role,card.rarity].join(" "));button.style.setProperty("--rarity",info.color);button.setAttribute("aria-pressed",String(card.id===currentUpgradeId));
    const tier=document.createElement("span");tier.className="upgrade-card-tier rarity-"+rarityCssKey(card.rarity||"R");tier.textContent=card.rarity||"R";
    const copy=document.createElement("span");copy.className="upgrade-card-option-copy";
    const name=document.createElement("strong");name.textContent=card.name;
    const movie=document.createElement("small");movie.textContent=`${card.movie||"Bộ sưu tập chân dung"} · sở hữu ×${state.owned[card.id]}`;
    const stars=document.createElement("span");stars.className="upgrade-card-option-progress";stars.textContent=`${"★".repeat(progress.stars)}${"☆".repeat(5-progress.stars)} · Lv.${progress.level}`;
    copy.append(name,movie,stars);
    const chevron=document.createElement("span");chevron.className="upgrade-card-option-chevron";chevron.textContent=card.id===currentUpgradeId?"✓":"›";
    button.append(tier,copy,chevron);button.addEventListener("click",()=>{if(upgradeAttemptInProgress)return;currentUpgradeId=card.id;renderUpgradePage(card.id);});container.appendChild(button);
  }
  if(query&&!matching.length){const noMatch=document.createElement("p");noMatch.className="upgrade-card-search-empty";noMatch.textContent="Không tìm thấy thẻ phù hợp với từ khóa này.";container.appendChild(noMatch);}
}
function renderUpgradePage(preferredId){
  const ownedCards=characters.filter(card=>(Number(state.owned[card.id])||0)>0).sort((a,b)=>compareVietnamese(a.name,b.name)||compareVietnamese(a.movie,b.movie));
  if(preferredId&&ownedCards.some(card=>card.id===preferredId))currentUpgradeId=preferredId;
  if(!ownedCards.some(card=>card.id===currentUpgradeId))currentUpgradeId=ownedCards[0]?.id||null;
  const card=ownedCards.find(item=>item.id===currentUpgradeId)||null;
  $("upgradeNoCards").hidden=ownedCards.length>0;
  $("upgradeWorkbench").hidden=!card;
  renderUpgradeCardSelector();
  if(!card){$("cardUpgradePanel").hidden=true;const preview=$("upgradePreviewCard");if(preview)preview.hidden=true;return;}
  $("upgradeSelectedCardTitle").textContent=card.name;
  $("upgradeSelectedCardMeta").textContent=(card.movie||"Bộ sưu tập chân dung")+" · "+card.rarity+" · đang sở hữu ×"+state.owned[card.id];
  renderUpgradePreview(card);
  renderCardUpgradePanel(card);
}
function renderUpgradeFodderList(mainCard){
  const list=$("upgradeFodderList");if(!list)return;
  list.replaceChildren();
  const search=normalizedSearchKey($("upgradeFodderSearch")?.value||"");
  const fodderCards=characters.filter(card=>card.id!==mainCard.id&&(Number(state.owned[card.id])||0)>1)
    .sort((a,b)=>compareVietnamese(a.name,b.name)||compareVietnamese(a.movie,b.movie));
  if(!fodderCards.length){
    const empty=document.createElement("p");empty.className="upgrade-fodder-empty";empty.textContent="Chưa có thẻ nào đủ điều kiện làm phôi. Bạn cần sở hữu ít nhất 2 bản của một thẻ khác để dùng phôi và vẫn giữ lại 1 bản.";list.appendChild(empty);
  }else{
    for(const card of fodderCards){
      const owned=Number(state.owned[card.id])||0,available=owned-1,exp=levelExpByRarity[card.rarity]||10;
      const key=normalizedSearchKey([card.name,card.movie,card.role,card.rarity].join(" "));
      const row=document.createElement("label");row.className="upgrade-fodder-row";row.dataset.search=key;
      if(search&&!key.includes(search))row.hidden=true;
      const identity=document.createElement("span");identity.className="upgrade-fodder-identity";
      const name=document.createElement("strong");name.textContent=card.name;
      const meta=document.createElement("small");meta.textContent=`${card.rarity} · ${card.movie} · sở hữu ×${owned} · ${exp} EXP/thẻ`;
      identity.append(name,meta);
      const quantityWrap=document.createElement("span");quantityWrap.className="upgrade-fodder-quantity";
      const quantityLabel=document.createElement("small");quantityLabel.textContent="Số phôi";
      const input=document.createElement("input");input.type="number";input.min="0";input.max=String(available);input.step="1";input.value="0";input.inputMode="numeric";input.dataset.fodderId=card.id;input.dataset.exp=String(exp);input.setAttribute("aria-label",`Số bản ${card.name} dùng làm phôi, tối đa ${available}`);
      input.addEventListener("input",updateLevelUpgradeSummary);
      quantityWrap.append(quantityLabel,input);row.append(identity,quantityWrap);list.appendChild(row);
    }
  }
  updateLevelUpgradeSummary();
}
function updateLevelUpgradeSummary(){
  const list=$("upgradeFodderList");if(!list)return;
  let totalExp=0,totalCards=0;
  for(const input of list.querySelectorAll("input[data-fodder-id]")){
    const id=input.dataset.fodderId,owned=Math.max(0,Number(state.owned[id])||0),max=Math.max(0,owned-1);
    let count=Math.floor(Number(input.value)||0);count=Math.max(0,Math.min(max,count));input.value=String(count);input.max=String(max);
    totalCards+=count;totalExp+=count*(Number(input.dataset.exp)||0);
  }
  $("upgradeSelectedExp").textContent=`${totalExp.toLocaleString("vi-VN")} EXP · ${totalCards} thẻ`;
  const card=characters.find(item=>item.id===currentUpgradeId);
  const progress=card?getCardProgress(card.id):{level:1,exp:0};
  const maxed=progress.level>=MAX_CARD_LEVEL;
  const needed=requiredLevelExp(progress.level);
  const button=$("upgradeLevelBtn");button.disabled=maxed||totalExp<1||upgradeAttemptInProgress;
  $("upgradeLevelSummary").textContent=maxed?"Thẻ đã đạt level tối đa.":totalExp<1?`Cần thêm ${Math.max(0,needed-progress.exp)} EXP để lên Lv.${progress.level+1}.`:`Có thể nhận ${totalExp} EXP; cần ${Math.max(0,needed-progress.exp)} EXP để lên level tiếp.`;
}
function setUpgradeAnimation(phase,stars,title,message){
  const stage=$("upgradeAnimationStage");if(!stage)return;
  stage.classList.remove("is-charging","is-success","is-failed","tier-2","tier-3","tier-4","tier-5");
  stage.dataset.phase=phase;stage.dataset.stars=String(stars||1);
  if(phase!=="idle")stage.classList.add("is-"+phase);
  if(phase==="success")stage.classList.add("tier-"+Math.max(2,Math.min(5,Number(stars)||2)));
  $("upgradeAnimationSigil").textContent=phase==="charging"?"✦":phase==="success"?"★":phase==="failed"?"✧":"✧";
  $("upgradeAnimationTitle").textContent=title;
  $("upgradeAnimationMessage").textContent=message;
}
function clearUpgradeAnimationLater(delay=2700){
  if(upgradeAnimationTimer)clearTimeout(upgradeAnimationTimer);
  upgradeAnimationTimer=window.setTimeout(()=>{
    if(!upgradeAttemptInProgress){setUpgradeAnimation("idle",currentUpgradeId?getCardProgress(currentUpgradeId).stars:1,"Tinh quang đang chờ","Chọn thao tác nâng sao để bắt đầu nghi thức.");}
    upgradeAnimationTimer=null;
  },delay);
}
function waitForUpgradeAnimation(ms){return new Promise(resolve=>window.setTimeout(resolve,ms));}
$("upgradeFodderSearch")?.addEventListener("input",()=>{
  const search=normalizedSearchKey($("upgradeFodderSearch").value);
  for(const row of $("upgradeFodderList").querySelectorAll(".upgrade-fodder-row"))row.hidden=!!search&&!row.dataset.search.includes(search);
});
$("upgradeCardSearch")?.addEventListener("input",()=>renderUpgradeCardSelector());
$("upgradeOpenCardsBtn")?.addEventListener("click",()=>showAppPage("open"));
$("upgradeStarBtn")?.addEventListener("click",async()=>{
  if(upgradeAttemptInProgress)return;
  const id=currentUpgradeId,card=characters.find(item=>item.id===id);if(!card)return;
  const owned=Math.max(0,Number(state.owned[id])||0),progress=getCardProgress(id),rule=starUpgradeRules[progress.stars];
  if(!rule||owned-1<rule.cost){showToast("Không đủ bản sao của chính thẻ này để nâng sao.");renderUpgradePage(id);return;}
  if(!confirm(`Đập ${progress.stars}★ → ${rule.next}★ với tỉ lệ ${rule.rate}%?\n\nTiêu hao ${rule.cost} bản sao cùng thẻ dù thành công hay thất bại. Thẻ chính vẫn được giữ lại.`))return;
  upgradeAttemptInProgress=true;
  $("upgradeStarBtn").disabled=true;$("upgradeLevelBtn").disabled=true;
  setUpgradeAnimation("charging",rule.next,"Đang tích tụ tinh quang…",`Nghi thức ${progress.stars}★ → ${rule.next}★ · xác suất ${rule.rate}%`);
  await waitForUpgradeAnimation(820);
  // Recheck inventory immediately before spending because the attempt is now committed.
  if((Number(state.owned[id])||0)-1<rule.cost){upgradeAttemptInProgress=false;renderUpgradePage(id);setUpgradeAnimation("idle",progress.stars,"Chưa đủ phôi","Số lượng thẻ đã thay đổi; chưa tiêu hao nguyên liệu.");showToast("Số lượng thẻ đã thay đổi; không đủ phôi.");return;}
  state.owned[id]=(Number(state.owned[id])||0)-rule.cost;
  const success=Math.random()*100<rule.rate;
  if(success)progress.stars=rule.next;
  saveState();renderCollection();updateStats();
  upgradeAttemptInProgress=false;renderUpgradePage(id);
  setUpgradeAnimation(success?"success":"failed",success?rule.next:progress.stars,
    success?`THÀNH CÔNG · ${rule.next}★`:`CHƯA THÀNH CÔNG · ${progress.stars}★`,
    success?`Thẻ đã thăng lên ${rule.next} sao. Hiệu ứng tăng theo cấp sao đạt được!`:`Phôi đã tiêu hao, nhưng thẻ chính vẫn giữ nguyên ${progress.stars} sao. Lần sau vẫn là ${rule.rate}%.`);
  clearUpgradeAnimationLater(3000);
  showToast(success?`✨ Thành công! Thẻ đã lên ${rule.next}★.`:`✧ Thất bại. Thẻ vẫn giữ ${progress.stars}★; phôi đã bị tiêu hao.`);
});
$("upgradeLevelBtn")?.addEventListener("click",()=>{
  if(upgradeAttemptInProgress)return;
  const id=currentUpgradeId,card=characters.find(item=>item.id===id);if(!card)return;
  let totalExp=0,totalCards=0;const selected=[];
  for(const input of $("upgradeFodderList").querySelectorAll("input[data-fodder-id]")){
    const fodderId=input.dataset.fodderId,count=Math.floor(Number(input.value)||0),fodder=characters.find(item=>item.id===fodderId);
    if(!fodder||fodderId===id||count<1)continue;
    const owned=Math.max(0,Number(state.owned[fodderId])||0),max=Math.max(0,owned-1);
    if(count>max){showToast(`Không đủ phôi ${fodder.name}; mỗi thẻ phải giữ lại ít nhất 1 bản.`);renderUpgradePage(id);return;}
    const exp=(levelExpByRarity[fodder.rarity]||10)*count;selected.push({id:fodderId,count,exp,name:fodder.name});totalExp+=exp;totalCards+=count;
  }
  const progress=getCardProgress(id);if(progress.level>=MAX_CARD_LEVEL){showToast("Thẻ đã đạt level tối đa.");return;}
  if(!totalCards){showToast("Hãy chọn ít nhất một thẻ làm phôi.");return;}
  const summary=selected.map(item=>`${item.name} ×${item.count}`).join("\n");
  if(!confirm(`Dùng ${totalCards} thẻ làm phôi để nhận ${totalExp} EXP?\n\n${summary}\n\nMỗi thẻ làm phôi sẽ được giữ lại tối thiểu 1 bản. Nâng level không trượt.`))return;
  for(const item of selected){if((Number(state.owned[item.id])||0)-item.count<1){showToast("Số lượng phôi đã thay đổi; chưa có thẻ nào bị tiêu hao.");renderUpgradePage(id);return;}}
  for(const item of selected)state.owned[item.id]=(Number(state.owned[item.id])||0)-item.count;
  progress.exp+=totalExp;
  const oldLevel=progress.level;while(progress.level<MAX_CARD_LEVEL){const needed=requiredLevelExp(progress.level);if(!needed||progress.exp<needed)break;progress.exp-=needed;progress.level++;}
  if(progress.level>=MAX_CARD_LEVEL)progress.exp=0;const leveled=progress.level-oldLevel;
  saveState();renderCollection();updateStats();renderUpgradePage(id);
  setUpgradeAnimation("idle",progress.stars,"Đã nạp EXP thành công",`+${totalExp} EXP · ${leveled?`đã lên ${leveled} level`:"tiến độ EXP đã cập nhật"}.`);
  showToast(leveled?`⬆ Đã lên ${leveled} level, hiện tại Lv.${progress.level}.`:`Đã nạp ${totalExp} EXP; hiện tại Lv.${progress.level}.`);
});

// Giữ chữ hướng dẫn trên giao diện luôn khớp với config.js.
function renderUpgradeFootnote(){
  const note=$("upgradeFootnote");if(!note)return;
  const stars=Object.entries(starUpgradeRules).map(([from,rule])=>`${from}★→${rule.next}★ ${rule.rate}% (${rule.cost} phôi)`).join(", ");
  const exp=Object.entries(levelExpByRarity).map(([rarity,value])=>`${rarity} ${value}`).join(" · ");
  note.textContent=`Nâng sao: ${stars}. Nâng level: ${exp} EXP mỗi phôi.`;
}
renderUpgradeFootnote();


// V11.6 — isolated preview lab. It never consumes cards/tickets and never saves state.
(function initEffectPreviewLab(){
 const stage=document.getElementById("effectLabStage");if(!stage)return;
 const raritySelect=document.getElementById("effectLabRarity"),starsSelect=document.getElementById("effectLabStars");
 const summonButton=document.getElementById("effectLabSummonBtn"),upgradeButton=document.getElementById("effectLabUpgradeBtn");
 const status=document.getElementById("effectLabStatus"),hint=document.getElementById("effectLabHint");
 const back=document.getElementById("effectLabCardBack"),card=document.getElementById("effectLabCharacterCard");
 const art=document.getElementById("effectLabCardArt"),badge=document.getElementById("effectLabStarBadge");
 const tierLabel=document.getElementById("effectLabTierLabel"),cardName=document.getElementById("effectLabCardName"),quote=document.getElementById("effectLabQuote");
 if(!raritySelect||!starsSelect||!summonButton||!upgradeButton||!status||!back||!card||!art)return;
 const effectFor=tier=>(rarityInfo[tier]||rarityInfo.UR).effect;
 const stageClassFor=tier=>"opening-rarity-"+(tier==="SSR+"?"ssr":tier.toLowerCase());
 const stageClasses=[...new Set(Object.keys(rarityInfo).map(stageClassFor))];
 const cardClasses=[...new Set(Object.values(rarityInfo).map(info=>"rarity-"+info.effect))];
 let timer=null,runId=0;
 const reducedMotion=()=>Boolean(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches);
 function resetTimer(){if(timer!==null){window.clearTimeout(timer);timer=null;}return ++runId;}
 function selectedTier(){return rarityInfo[raritySelect.value]?raritySelect.value:"UR";}
 function applyTier(tier){
  const info=rarityInfo[tier]||rarityInfo.UR;
  stage.classList.remove(...stageClasses,"is-lab-charging","is-lab-upgrade");
  card.classList.remove(...cardClasses,"lab-reveal","lab-upgrade-pop");card.classList.add("rarity-"+effectFor(tier));
  stage.style.setProperty("--rarity",info.color);back.style.setProperty("--rarity",info.color);
  card.style.setProperty("--rarity",info.color);card.style.setProperty("--art1",info.art[0]);card.style.setProperty("--art2",info.art[1]);card.style.setProperty("--accent",info.art[2]);
  art.style.setProperty("--art1",info.art[0]);art.style.setProperty("--art2",info.art[1]);art.style.setProperty("--accent",info.art[2]);
  if(tierLabel)tierLabel.textContent=tier+" · "+info.shortLabel.toLocaleUpperCase("vi-VN");
  if(cardName)cardName.textContent=tier==="SP"?"Ngôi Sao Đặc Biệt":tier==="UR"?"Thẻ Huyền Thoại":"Thẻ "+tier+" xem thử";
  if(quote)quote.textContent=tier==="SP"?"Một khoảnh khắc đặc biệt giữa ngân hà.":tier==="UR"?"Ánh vàng hội tụ trước khi huyền thoại xuất hiện.":"Một ngôi sao, một câu chuyện.";
  if(badge)badge.textContent="★ 1/5";stage.dataset.labRarity=tier;stage.dataset.labPhase="idle";stage.dataset.labStars="1";
 }
 function showCardImmediately(tier){
  applyTier(tier);back.classList.remove("charging");back.classList.add("hidden");
  card.classList.remove("hidden");card.classList.add("lab-reveal");stage.dataset.labPhase="revealed";
 }
 summonButton.addEventListener("click",()=>{
  const id=resetTimer(),tier=selectedTier(),info=rarityInfo[tier]||rarityInfo.UR;applyTier(tier);
  card.classList.add("hidden");card.classList.remove("lab-reveal","lab-upgrade-pop");
  back.classList.remove("hidden");back.classList.add("charging");back.style.opacity="1";back.style.transform="rotateY(0)";
  stage.classList.add(stageClassFor(tier),"is-lab-charging");stage.dataset.labPhase="charging";
  status.textContent="Đang mô phỏng triệu hồi "+tier+"… không tiêu hao vé hay thẻ.";
  if(hint)hint.textContent="Ánh sao đang hội tụ…";
  timer=window.setTimeout(()=>{
   if(id!==runId)return;
   back.classList.remove("charging");back.classList.add("hidden");stage.classList.remove(...stageClasses,"is-lab-charging");
   card.classList.remove("hidden");card.classList.add("lab-reveal");stage.dataset.labPhase="revealed";
   status.textContent="Đã xem thử hiệu ứng "+tier+". Bộ sưu tập và số vé không thay đổi.";
   if(hint)hint.textContent=tier+" · xem thử hoàn tất";timer=null;
  },reducedMotion()?80:(Number(info.revealDelay)||900));
 });
 upgradeButton.addEventListener("click",()=>{
  const id=resetTimer(),tier=selectedTier(),stars=Math.max(2,Math.min(5,Number(starsSelect.value)||5));
  showCardImmediately(tier);stage.classList.add("is-lab-upgrade");stage.dataset.labPhase="upgrade";stage.dataset.labStars=String(stars);
  card.classList.remove("lab-reveal","lab-upgrade-pop");void card.offsetWidth;card.classList.add("lab-upgrade-pop");
  if(badge)badge.textContent="★ "+stars+"/5";
  status.textContent="Đang mô phỏng nâng sao thành công lên "+stars+"★… không tiêu hao nguyên liệu.";
  if(hint)hint.textContent="Tinh quang đang bùng nở…";
  timer=window.setTimeout(()=>{
   if(id!==runId)return;stage.classList.remove("is-lab-upgrade");stage.dataset.labPhase="upgrade-complete";
   status.textContent="Mô phỏng nâng sao "+stars+"★ hoàn tất. Không có dữ liệu nào được lưu hoặc tiêu hao.";
   if(hint)hint.textContent="★ "+stars+"/5 · mô phỏng hoàn tất";timer=null;
  },reducedMotion()?80:1250);
 });
 raritySelect.addEventListener("change",()=>{
  resetTimer();const tier=selectedTier();applyTier(tier);back.classList.remove("hidden","charging");card.classList.add("hidden");
  status.textContent="Đã chọn "+tier+". Nhấn thử triệu hồi hoặc thử nâng sao.";
  if(hint)hint.textContent="Hiệu ứng sẽ xuất hiện tại đây.";
 });
 applyTier(selectedTier());
})();
