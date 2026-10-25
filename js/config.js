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

// ---- Độ hiếm: nhãn, màu, trọng số rút thẻ (tổng 1000), thời gian lật thẻ ----
/* Single source for tier order, labels, collection/reveal palettes and gacha weights.
   R absorbs the retired N tier. SSR+ shares the SSR visual frame but has a distinct tier key.
   Configured weights total 1000; when SP exists, its chance remains exactly 0.3%. */
const rarityInfo = {
  R:   {label:"R · RARE",        shortLabel:"Hiếm",       color:"#aab5c9", weight:685, luck:25,  revealDelay:700,  effect:"r",   toastPrefix:"✧ HIẾM! ",        art:["#67513f","#1c1a1b","#e6c69c"]},
  SR:  {label:"SR · SUPER RARE", shortLabel:"Siêu hiếm",  color:"#72b6ff", weight:180, luck:50,  revealDelay:980,  effect:"sr",  toastPrefix:"✦ SIÊU HIẾM! ",   art:["#214b57","#101a25","#6ec6c2"]},
  SSR: {label:"SSR · SUPER RARE",shortLabel:"Siêu hiếm",  color:"#c18aff", weight:80,  luck:78,  revealDelay:1320, effect:"ssr", toastPrefix:"✦ SIÊU HIẾM! ",   art:["#45415e","#171526","#b7a9ef"]},
  "SSR+":{label:"SSR+ · SUPER RARE+",shortLabel:"Siêu hiếm+",color:"#c18aff",weight:22,luck:88,revealDelay:1450,effect:"ssr",toastPrefix:"✦ SIÊU HIẾM+! ",art:["#45415e","#171526","#b7a9ef"]},
  UR:  {label:"UR · ULTRA RARE",  shortLabel:"Cực hiếm",   color:"#ffca75", weight:30,  luck:94,  revealDelay:1750, effect:"ur",  toastPrefix:"✨ HUYỀN THOẠI! ", art:["#5a3d29","#1b1520","#ffca75"]},
  SP:  {label:"SP · SPECIAL",     shortLabel:"Đặc biệt",   color:"#ff85d4", weight:3,   luck:100, revealDelay:2300, effect:"sp",  toastPrefix:"🌟 ĐẶC BIỆT! ",    art:["#682a67","#190f2b","#ff85d4"]}
};
// Tổng trọng số danh nghĩa. SP được giữ đúng rarityInfo.SP.weight / TOTAL_RARITY_WEIGHT khi kho có SP.
const TOTAL_RARITY_WEIGHT = 1000;

// ---- Nâng sao: tỉ lệ thành công (%), số bản sao cùng thẻ bị tiêu hao, sao đạt được ----
// Khóa là số sao hiện tại. Ví dụ 1:{rate:80,cost:2,next:2} = 1★→2★ thành công 80%, tốn 2 bản sao.
const starUpgradeRules = {
  1:{rate:80,cost:2,next:2},
  2:{rate:60,cost:3,next:3},
  3:{rate:40,cost:4,next:4},
  4:{rate:25,cost:6,next:5}
};
const levelExpByRarity = {R:20,SR:40,SSR:80,"SSR+":100,UR:150,SP:250};
const levelExpRequirements = [30,50,75,100,140,180,230,290,360];
const MAX_CARD_LEVEL = 10;

// ---- Điểm Nhan sắc theo độ hiếm của mỗi biến thể thẻ trong bảng xếp hạng ----
const leaderboardRarityPoints = {R:3,SR:5,SSR:9,"SSR+":11,UR:17,SP:25};

// ---- Thời gian (ms) giữ màn hình khi mở x10: thẻ chính sau khi lật, và màn spotlight ----
const BATCH_REVEAL_HOLD_MS = {R:800,SR:1000,SSR:1320,"SSR+":1450,UR:1750,SP:2050};
const BATCH_REVEAL_HOLD_DEFAULT_MS = 1100;
const BATCH_SPOTLIGHT_HOLD_MS = {SSR:2050,"SSR+":2050,UR:2300,SP:2600};
const BATCH_SPOTLIGHT_HOLD_DEFAULT_MS = 1750;
