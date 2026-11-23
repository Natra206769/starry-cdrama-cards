/* config.js — MỌI SỐ LIỆU CÂN BẰNG GAME NẰM Ở ĐÂY
   Chỉnh tỉ lệ, số phôi, EXP, điểm xếp hạng, thời gian hiệu ứng tại đây rồi tải lại trang.
   Chữ hướng dẫn trên giao diện (tỉ lệ hiện tại, quy tắc nâng sao) tự đọc lại từ các giá trị này.
   Tệp này phải được nạp ĐẦU TIÊN (xem thứ tự thẻ <script> trong index.html).
*/

// ---- Khóa lưu trữ (KHÔNG đổi, nếu đổi người chơi sẽ mất dữ liệu cũ) ----
// Giữ nguyên khóa localStorage cũ để dữ liệu sở hữu V5 vẫn được đọc.
const STORAGE_KEY = "starry-cbiz-cards-v1";
const DB_NAME="starry-cbiz-manager-db";
const DB_VERSION=1;
const DB_STORE="appData";

const RARITY_SCHEMA_VERSION = 2;
const rarityInfo = {
  R:  {label:"R · RARE",           shortLabel:"Hiếm",          color:"#aab5c9", weight:685, luck:25,  revealDelay:700,  effect:"r",  toastPrefix:"✧ HIẾM! ",        art:["#67513f","#1c1a1b","#e6c69c"]},
  SR: {label:"SR · SUPER RARE",    shortLabel:"Siêu hiếm",     color:"#72b6ff", weight:180, luck:50,  revealDelay:980,  effect:"sr", toastPrefix:"✦ SIÊU HIẾM! ",   art:["#214b57","#101a25","#6ec6c2"]},
  SSR:{label:"SSR · SUPER RARE",   shortLabel:"Rất hiếm",      color:"#c18aff", weight:80,  luck:78,  revealDelay:1320, effect:"ssr",toastPrefix:"✦ RẤT HIẾM! ",    art:["#45415e","#171526","#b7a9ef"]},
  UR: {label:"UR · ULTRA RARE",    shortLabel:"Cực hiếm",      color:"#ffca75", weight:22,  luck:88,  revealDelay:1450, effect:"ur", toastPrefix:"✨ HUYỀN THOẠI! ", art:["#5a3d29","#1b1520","#ffca75"]},
  LR: {label:"LR · LEGENDARY RARE",shortLabel:"Huyền thoại",   color:"#ff5b6e", weight:30,  luck:94,  revealDelay:1750, effect:"lr", toastPrefix:"🔥 HUYỀN THOẠI! ", art:["#5e2736","#1b111c","#ff8493"]},
  MR: {label:"MR · MYTHIC RARE",   shortLabel:"Thần thoại",    color:"#4b9dff", weight:3,   luck:99,  revealDelay:2300, effect:"mr", toastPrefix:"❄️ THẦN THOẠI! ",  art:["#244b78","#101a2d","#8ac7ff"]},
  SP: {label:"SP · SPECIAL",       shortLabel:"Đặc biệt",      color:"#ff85d4", weight:0,   luck:100, revealDelay:2700, effect:"sp", toastPrefix:"🌟 ĐẶC BIỆT! ",    art:["#682a67","#190f2b","#ff85d4"]}
};
// Tổng trọng số của sáu bậc thông thường là 1000. SP là nhánh đặc biệt, không nằm trong lượt rút thường.
const TOTAL_RARITY_WEIGHT = 1000;

// Pity: tăng tỉ lệ từ bậc SSR trở lên sau 10 lượt hụt; lượt hụt thứ 20 được bảo hiểm.
const PITY_START_AFTER_MISSES = 10;
const PITY_GUARANTEE_AFTER_MISSES = 20;

// ---- Nâng sao: tỉ lệ thành công (%), số bản sao cùng thẻ bị tiêu hao, sao đạt được ----
// Khóa là số sao hiện tại. Ví dụ 1:{rate:80,cost:2,next:2} = 1★→2★ thành công 80%, tốn 2 bản sao.
const starUpgradeRules = {
  1:{rate:80,cost:2,next:2},
  2:{rate:60,cost:3,next:3},
  3:{rate:40,cost:4,next:4},
  4:{rate:25,cost:6,next:5}
};
const levelExpByRarity = {R:20,SR:40,SSR:80,UR:100,LR:150,MR:250,SP:250};
// Giữ nguyên EXP các cấp Lv.1–10; từ Lv.10 trở đi tăng thêm 50 EXP cho mỗi cấp.
const levelExpRequirements = Array.from({length:49},(_,index)=>index<9?[30,50,75,100,140,180,230,290,360][index]:360+(index-8)*50);
const MAX_CARD_LEVEL = 50;
function getMaxCardLevel(stars){return Math.max(1,Math.min(5,Math.floor(Number(stars)||1)))*10;}

// ---- Điểm Nhan sắc theo độ hiếm của mỗi biến thể thẻ trong bảng xếp hạng ----
const leaderboardRarityPoints = {R:3,SR:5,SSR:8,UR:11,LR:15,MR:20};

// ---- Thời gian (ms) giữ màn hình khi mở x10: thẻ chính sau khi lật, và màn spotlight ----
const BATCH_REVEAL_HOLD_MS = {R:800,SR:1000,SSR:1320,UR:1450,LR:1750,MR:2050,SP:2400};
const BATCH_REVEAL_HOLD_DEFAULT_MS = 1100;
const BATCH_SPOTLIGHT_HOLD_MS = {SSR:2050,UR:2150,LR:2300,MR:2600,SP:2900};
const BATCH_SPOTLIGHT_HOLD_DEFAULT_MS = 1750;
