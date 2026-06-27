const CACHE_NAME = "vibe-timer-v9";
const APP_SHELL = [
  ".",
  "index.html",
  "styles.css",
  "app.js",
  "manifest.webmanifest",
  "assets/icon.svg",
];
const APP_SHELL_URLS = new Set(APP_SHELL.map((path) => new URL(path, self.registration.scope).href));

function cacheAppShellResponse(request, response) {
  if (!response.ok || response.type !== "basic") {
    return Promise.resolve(response);
  }

  const copy = response.clone();
  return caches
    .open(CACHE_NAME)
    .then((cache) => cache.put(request, copy))
    .catch(() => {})
    .then(() => response);
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const url = new URL(event.request.url);
  if (url.origin !== location.origin) {
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match("index.html").then((cached) => cached || Response.error())),
    );
    return;
  }

  if (!APP_SHELL_URLS.has(url.href)) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => cacheAppShellResponse(event.request, response))
      .catch(() => caches.match(event.request).then((cached) => cached || Response.error())),
  );
});
