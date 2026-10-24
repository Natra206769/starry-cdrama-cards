/* main.js — Điểm khởi động: nạp dữ liệu IndexedDB rồi dựng kho thẻ. Phải nạp sau các tệp khác.

*/

(async function initApp(){managerData=await readManagerData();rebuildCharacters();})();
