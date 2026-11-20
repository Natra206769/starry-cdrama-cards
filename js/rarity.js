/* rarity.js — Rarity weights and SSR+ pity protection. */
const PITY_RARITIES=new Set(["SSR","SSR+","UR","SP"]);
function isPityRarity(rarity){return PITY_RARITIES.has(String(rarity||"").toUpperCase());}
function renderRarityControls(){
 const select=$("fieldRarity"),legend=$("rarityLegend");
 if(select){select.replaceChildren();for(const [rarity,info] of Object.entries(rarityInfo)){const option=document.createElement("option");option.value=rarity;option.textContent=rarity+" · "+info.shortLabel;select.appendChild(option);}select.value="SSR";}
 if(legend){legend.replaceChildren();for(const [rarity,info] of Object.entries(rarityInfo)){const row=document.createElement("span"),dot=document.createElement("i"),name=document.createTextNode(" "+rarity+" "),description=document.createElement("small");dot.className="dot "+info.effect;dot.setAttribute("aria-hidden","true");description.textContent=info.shortLabel;row.append(dot,name,description);legend.appendChild(row);}}
}
renderRarityControls();
function getAvailableRarityWeights(){
 const available=Object.entries(rarityInfo).filter(([rarity])=>characters.some(card=>card.rarity===rarity));if(!available.length)return [];
 const spAvailable=available.some(([rarity])=>rarity==="SP"),nonSp=available.filter(([rarity])=>rarity!=="SP"),nonSpTotal=nonSp.reduce((sum,[,info])=>sum+info.weight,0);
 if(spAvailable&&nonSpTotal>0)return available.map(([rarity,info])=>({rarity,info,weight:rarity==="SP"?rarityInfo.SP.weight:info.weight*(TOTAL_RARITY_WEIGHT-rarityInfo.SP.weight)/nonSpTotal}));
 const total=available.reduce((sum,[,info])=>sum+info.weight,0);return available.map(([rarity,info])=>({rarity,info,weight:total?info.weight*TOTAL_RARITY_WEIGHT/total:0}));
}
function getPityAdjustedRarityWeights(){
 const available=getAvailableRarityWeights(),total=available.reduce((sum,item)=>sum+item.weight,0);if(!total)return [];
 const rare=available.filter(item=>isPityRarity(item.rarity)),common=available.filter(item=>!isPityRarity(item.rarity));
 const rareBase=rare.reduce((sum,item)=>sum+item.weight,0),commonBase=common.reduce((sum,item)=>sum+item.weight,0);
 if(!rareBase||!commonBase)return available;
 const misses=typeof getConsecutiveRareMisses==="function"?getConsecutiveRareMisses():0,baseProbability=rareBase/total;
 let rareProbability=baseProbability;
 if(misses>=PITY_START_AFTER_MISSES){
  const steps=Math.min(PITY_GUARANTEE_AFTER_MISSES-PITY_START_AFTER_MISSES,misses-PITY_START_AFTER_MISSES+1);
  rareProbability=baseProbability+(1-baseProbability)*steps/(PITY_GUARANTEE_AFTER_MISSES-PITY_START_AFTER_MISSES);
 }
 return available.map(item=>({...item,weight:isPityRarity(item.rarity)?item.weight*(rareProbability*total/rareBase):item.weight*((1-rareProbability)*total/commonBase)}));
}
function renderRarityOdds(){
 const target=$("rarityOdds");if(!target)return;const available=getPityAdjustedRarityWeights(),total=available.reduce((sum,item)=>sum+item.weight,0);
 if(!total){target.textContent="Kho thẻ đang trống.";return;}
 const odds=available.map(({rarity,weight})=>rarity+" "+(weight/total*100).toLocaleString("vi-VN",{maximumFractionDigits:2})+"%");
 let hint="";
 if(!characters.some(card=>isPityRarity(card.rarity)))hint="Kho chưa có thẻ hiếm.";
 else{const misses=typeof getConsecutiveRareMisses==="function"?getConsecutiveRareMisses():0,rarePct=available.filter(item=>isPityRarity(item.rarity)).reduce((sum,item)=>sum+item.weight,0)/total*100;
  hint=misses>=PITY_GUARANTEE_AFTER_MISSES-1?"Thẻ hiếm: 100% lượt kế tiếp.":misses>=PITY_START_AFTER_MISSES?"Thẻ hiếm: "+rarePct.toLocaleString("vi-VN",{maximumFractionDigits:2})+"% · hụt "+misses+".":"Bảo hiểm: "+misses+"/"+PITY_START_AFTER_MISSES+" lượt hụt.";
 }
 target.textContent="Tỉ lệ: "+odds.join(" · ")+" · "+hint;
}
function weightedRandom(){
 if(!characters.length)return null;const available=getPityAdjustedRarityWeights(),total=available.reduce((sum,item)=>sum+item.weight,0);if(!total)return null;
 let roll=Math.random()*total,chosen=available[0].rarity;for(const item of available){roll-=item.weight;if(roll<0){chosen=item.rarity;break;}}
 const pool=characters.filter(card=>card.rarity===chosen);return pool[Math.floor(Math.random()*pool.length)]||null;
}
