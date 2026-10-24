/* app.js — Khung ứng dụng: thống kê đầu trang, thông báo, chuyển trang, nút điều hướng, đặt lại tiến độ

*/

function updateStats(){
  const total=Object.values(state.owned).reduce((sum,value)=>sum+(Number(value)||0),0);
  const unique=characters.filter(card=>(state.owned[card.id]||0)>0).length;
  $("totalOwned").textContent=total;$("uniqueOwned").textContent=unique;$("totalCards").textContent=characters.length;
  if($("page-leaderboard")?.classList.contains("active"))renderLeaderboard();
}
function showToast(message){const toast=$("toast");toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2800);}
function applyUiPreferencesToPage(){
  uiPreferences=normalizeUiPreferences(uiPreferences);
  document.body.dataset.uiTheme=uiPreferences.theme;document.body.dataset.cardDensity=uiPreferences.density;
  if($("uiThemeSelect"))$("uiThemeSelect").value=uiPreferences.theme;
  if($("uiDensitySelect"))$("uiDensitySelect").value=uiPreferences.density;
}
function saveUiPreferencesFromControls(){
  uiPreferences=normalizeUiPreferences({theme:$("uiThemeSelect")?.value,density:$("uiDensitySelect")?.value});
  if(persistUiPreferences()){
    applyUiPreferencesToPage();$("uiPreferencesNote").textContent="Đã lưu giao diện trên thiết bị này.";showToast("Đã áp dụng giao diện.");
  }else{$("uiPreferencesNote").textContent="Không thể lưu tùy chỉnh. Hãy kiểm tra dung lượng trình duyệt.";showToast("Không lưu được tùy chỉnh giao diện.");}
}
applyUiPreferencesToPage();


function showAppPage(pageName){
  const allowed=["open","collection","upgrade","leaderboard","manager","info"];
  const page=allowed.includes(pageName)?pageName:"open";
  document.querySelectorAll("[data-app-page]").forEach(section=>{
    const active=section.dataset.appPage===page;
    section.hidden=!active;
    section.classList.toggle("active",active);
  });
  document.querySelectorAll(".nav-tab[data-page]").forEach(button=>{
    const active=button.dataset.page===page;
    button.classList.toggle("active",active);
    if(active)button.setAttribute("aria-current","page");else button.removeAttribute("aria-current");
  });
  // Keep the overall app frame still; reset only the newly selected page's
  // own scroll area instead of moving the browser window.
  const activeSection=document.querySelector(`[data-app-page="${page}"]`);
  if(activeSection)activeSection.scrollTop=0;
  if(page==="leaderboard")renderLeaderboard();
  if(page==="upgrade")renderUpgradePage();
}
document.querySelectorAll(".nav-tab[data-page]").forEach(button=>button.addEventListener("click",()=>showAppPage(button.dataset.page)));
document.querySelector(".brand")?.addEventListener("click",event=>{event.preventDefault();showAppPage("open");});

$("openBtn").addEventListener("click",openCard);$("againBtn").addEventListener("click",openCard);
$("emptyOpenBtn").addEventListener("click",()=>{showAppPage("open");openCard();});
document.querySelectorAll(".filter").forEach(button=>button.addEventListener("click",()=>{
  document.querySelectorAll(".filter").forEach(item=>{const active=item===button;item.classList.toggle("active",active);item.setAttribute("aria-pressed",String(active));});activeFilter=button.dataset.filter;renderCollection();
}));
const collectionSearchInput=$("collectionSearch"),clearCollectionSearchButton=$("clearCollectionSearch");
collectionSearchInput.addEventListener("input",()=>{clearCollectionSearchButton.hidden=!collectionSearchInput.value;renderCollection();});
clearCollectionSearchButton.addEventListener("click",()=>{collectionSearchInput.value="";clearCollectionSearchButton.hidden=true;renderCollection();collectionSearchInput.focus();});
document.querySelectorAll("[data-collection-mode]").forEach(button=>button.addEventListener("click",()=>{
  collectionMode=button.dataset.collectionMode;
  collectionShelfStatusFilter="all";
  activeFilter="all";
  renderCollection();
}));
document.querySelectorAll("[data-collection-view]").forEach(button=>button.addEventListener("click",()=>{
  collectionViewMode=button.dataset.collectionView;
  renderCollection();
}));
$("collectionSortSelect").addEventListener("change",event=>{collectionSortMode=event.target.value;renderCollection();});
$("collectionRarityFilter").addEventListener("change",event=>{collectionRarityFilter=event.target.value;renderCollection();});
$("collectionStyleFilter").addEventListener("change",event=>{collectionStyleFilter=event.target.value;renderCollection();});
document.querySelectorAll("[data-collection-display]").forEach(button=>button.addEventListener("click",()=>{
  collectionDisplayMode=button.dataset.collectionDisplay;
  renderCollection();
}));
$("collectionMovieGenreFilter").addEventListener("change",event=>{collectionShelfGenreFilter=event.target.value;renderCollection();});
$("collectionMovieYearFilter").addEventListener("change",event=>{collectionShelfYearFilter=event.target.value;renderCollection();});
$("collectionMovieSortSelect").addEventListener("change",event=>{collectionShelfSortMode=event.target.value;renderCollection();});
$("collectionMovieStatusFilter").addEventListener("change",event=>{collectionShelfStatusFilter=event.target.value;renderCollection();});
$("collectionMovieFocusFilter").addEventListener("change",event=>{collectionShelfFocusFilter=event.target.value;renderCollection();});
$("collectionPresetSelect").addEventListener("change",event=>{collectionSelectedPresetId=event.target.value;if(collectionSelectedPresetId)applyCollectionPreset(collectionSelectedPresetId);else renderCollectionPresetOptions();});
$("saveCollectionPresetBtn").addEventListener("click",saveCollectionPreset);
$("deleteCollectionPresetBtn").addEventListener("click",deleteCollectionPreset);
$("saveUiPrefsBtn").addEventListener("click",saveUiPreferencesFromControls);
$("resetUiPrefsBtn").addEventListener("click",()=>{
  uiPreferences={theme:"classic",density:"comfortable"};
  if(persistUiPreferences()){applyUiPreferencesToPage();$("uiPreferencesNote").textContent="Đã khôi phục giao diện mặc định.";showToast("Đã đặt lại giao diện.");}
  else showToast("Không thể lưu tùy chỉnh giao diện.");
});
$("resetBtn").addEventListener("click",()=>{
  if(!Object.keys(state.owned).length&&!state.favorites.length&&!Object.keys(state.cardProgress||{}).length){showToast("Bạn chưa có tiến độ nào cần đặt lại.");return;}
  if(confirm("Xóa toàn bộ tiến độ sưu tầm và yêu thích? Danh sách thẻ/phim sẽ được giữ nguyên.")){
    state={owned:{},favorites:[],cardProgress:{}};saveState();renderCollection();updateStats();resetBatchExperience();lastBatchCards=[];$("characterCard").classList.add("hidden");$("cardBack").classList.remove("hidden");$("againBtn").hidden=true;$("revealHint").textContent="Tập trung năng lượng… ngôi sao đang chờ bạn.";$("luckLabel").textContent="Đang chờ";$("luckBar").style.width="15%";showToast("Đã đặt lại tiến độ sưu tầm.");
  }
});
