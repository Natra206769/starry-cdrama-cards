/* Starry C-Drama Cards — app shell cache and user-approved updates.
   For every future release, change CACHE_NAME (for example v11 -> v12).
   Never clear localStorage or IndexedDB here: those hold the user's collection. */
const CACHE_NAME = "starry-cdrama-shell-v39";
const APP_SHELL = [
  "./",
  "./index.html",
  "./css/base.css",
  "./css/manager.css",
  "./css/detail.css",
  "./css/collection.css",
  "./css/screens.css",
  "./css/update-banner.css",
  "./css/viewport.css",
  "./css/rarity.css",
  "./css/summon.css",
  "./css/suggestions.css",
  "./css/leaderboard.css",
  "./assets/champion-fire-overlay.svg",
  "./css/collection-tools.css",
  "./css/upgrade.css",
  "./js/config.js",
  "./data/characters.js",
  "./js/state.js",
  "./js/utils.js",
  "./js/rarity.js",
  "./js/gacha.js",
  "./js/collection.js",
  "./js/library.js",
  "./js/movie-manager.js",
  "./js/bulk-movie-import.js",
  "./js/tmdb-lookup.js",
  "./js/upgrade.js",
  "./js/detail.js",
  "./js/leaderboard.js",
  "./js/app.js",
  "./js/storage.js",
  "./js/manager.js",
  "./js/bulk-import.js",
  "./js/main.js",
  "./js/pwa.js",
  "./manifest.webmanifest",
  "./favicon.ico",
  "./favicon-32.png",
  "./apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];
const APP_SHELL_URLS = APP_SHELL.map((path) => new URL(path, self.registration.scope).href);

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.all(APP_SHELL_URLS.map(async (url) => {
      const response = await fetch(url, { cache: "reload" });
      if (!response.ok) throw new Error(`Could not cache ${url}: ${response.status}`);
      await cache.put(url, response);
    }));
    // Intentionally do not call skipWaiting() here. The player decides when to update.
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter((key) => key.startsWith("starry-cdrama-shell-") && key !== CACHE_NAME)
      .map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // Do not cache external photos or APIs.

  // App files are cache-first: the newly installed worker already cached the new release.
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;

    try {
      const response = await fetch(request);
      if (response.ok && url.pathname.startsWith(new URL(self.registration.scope).pathname)) {
        await cache.put(request, response.clone());
      }
      return response;
    } catch (error) {
      if (request.mode === "navigate") {
        const shell = await cache.match(new URL("./index.html", self.registration.scope).href);
        if (shell) return shell;
      }
      throw error;
    }
  })());
});
