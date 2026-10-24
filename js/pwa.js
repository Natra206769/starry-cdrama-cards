/* pwa.js — Đăng ký Service Worker và thông báo cập nhật (không đụng dữ liệu game)

*/

// Progressive Web App update prompt. This code does not read, rewrite, or clear game data.
(function setupAppUpdates(){
  if (!("serviceWorker" in navigator)) return;
  if (location.protocol !== "https:" && location.hostname !== "localhost" && location.hostname !== "127.0.0.1") return;

  let registrationRef = null;
  let acceptedUpdate = false;
  let reloading = false;
  let banner = null;
  let updateButton = null;

  function hideBanner(){
    if (banner) banner.hidden = true;
  }

  function showUpdateBanner(){
    if (!banner){
      banner = document.createElement("aside");
      banner.className = "app-update-banner";
      banner.setAttribute("role", "status");
      banner.setAttribute("aria-live", "polite");

      const copy = document.createElement("div");
      copy.className = "app-update-copy";
      const title = document.createElement("p");
      title.className = "app-update-title";
      title.textContent = "Có bản cập nhật mới ✨";
      const message = document.createElement("p");
      message.className = "app-update-message";
      message.textContent = "Bản mới đã sẵn sàng. Bộ sưu tập hiện tại sẽ được giữ nguyên.";
      copy.append(title, message);

      const actions = document.createElement("div");
      actions.className = "app-update-actions";
      updateButton = document.createElement("button");
      updateButton.type = "button";
      updateButton.className = "app-update-button app-update-button-primary";
      updateButton.textContent = "Cập nhật";
      updateButton.addEventListener("click", async () => {
        if (!registrationRef) return;
        acceptedUpdate = true;
        updateButton.disabled = true;
        updateButton.textContent = "Đang cập nhật…";
        const waitingWorker = registrationRef.waiting;
        if (waitingWorker){
          waitingWorker.postMessage({type: "SKIP_WAITING"});
        }else{
          try{ await registrationRef.update(); }catch(error){ console.warn("Không kiểm tra lại được bản cập nhật:", error); }
          const newWaitingWorker = registrationRef.waiting;
          if (newWaitingWorker) newWaitingWorker.postMessage({type: "SKIP_WAITING"});
          else{
            updateButton.disabled = false;
            updateButton.textContent = "Thử lại";
            acceptedUpdate = false;
            return;
          }
        }
        // A controllerchange event will reload after the waiting worker activates.
      });

      const laterButton = document.createElement("button");
      laterButton.type = "button";
      laterButton.className = "app-update-button app-update-button-secondary";
      laterButton.textContent = "Để sau";
      laterButton.addEventListener("click", hideBanner);
      actions.append(updateButton, laterButton);
      banner.append(copy, actions);
      document.body.appendChild(banner);
    }
    banner.hidden = false;
    if (updateButton){updateButton.disabled = false;updateButton.textContent = "Cập nhật";}
  }

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (acceptedUpdate && !reloading){
      reloading = true;
      location.reload();
    }
  });

  navigator.serviceWorker.register("./service-worker.js", {updateViaCache: "none"})
    .then((registration) => {
      registrationRef = registration;

      const watchInstallingWorker = () => {
        const installing = registration.installing;
        if (!installing) return;
        installing.addEventListener("statechange", () => {
          if (installing.state === "installed" && navigator.serviceWorker.controller){
            showUpdateBanner();
          }
        });
      };

      registration.addEventListener("updatefound", watchInstallingWorker);
      if (registration.waiting && navigator.serviceWorker.controller) showUpdateBanner();
      watchInstallingWorker();
      // Check on each app open instead of forcing an update during play.
      registration.update().catch((error) => console.info("Chưa thể kiểm tra bản cập nhật:", error));
    })
    .catch((error) => console.warn("Không thể bật tính năng cập nhật của app:", error));
})();
