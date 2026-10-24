/* rarity.js — Điều khiển độ hiếm: danh sách chọn/chú thích, tỉ lệ hiện tại, rút thẻ ngẫu nhiên theo trọng số

*/

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
    return available.map(([rarity,info])=>({rarity,info,weight:rarity==="SP"?rarityInfo.SP.weight:info.weight*(TOTAL_RARITY_WEIGHT-rarityInfo.SP.weight)/nonSpTotal}));
  }
  // If SP is unavailable (or is the only remaining tier), normalize the pool
  // rather than assigning probability to tiers with no cards.
  const total=available.reduce((sum,[,info])=>sum+info.weight,0);
  return available.map(([rarity,info])=>({rarity,info,weight:total?info.weight*TOTAL_RARITY_WEIGHT/total:0}));
}
function renderRarityOdds(){
  const target=$("rarityOdds");if(!target)return;
  const available=getAvailableRarityWeights();
  const total=available.reduce((sum,item)=>sum+item.weight,0);
  target.textContent=total?"Tỉ lệ hiện tại: "+available.map(({rarity,weight})=>rarity+" "+(weight/total*100).toLocaleString("vi-VN",{maximumFractionDigits:2})+"%").join(" · "):"Kho thẻ đang trống.";
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
