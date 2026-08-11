const CACHE_VERSION = "pws-control-room-v1";
const SHELL_CACHE = `${CACHE_VERSION}-shell`;
const MEDIA_CACHE = `${CACHE_VERSION}-media`;
const MAX_AUTO_CACHE_BYTES = 18 * 1024 * 1024;

const SHELL_ASSETS = [
  "/",
  "/manifest.webmanifest",
  "/assets/icons/pwa-icon.svg",
  "/assets/placeholders/opening-control-room.svg",
  "/assets/placeholders/ambient-control-room.svg"
];

function isLocalAsset(url) {
  return url.origin === self.location.origin && url.pathname.startsWith("/assets/");
}

function isLargeMedia(url) {
  return /\.(mp4|mov|webm|m4v)$/i.test(url.pathname);
}

async function cacheShell() {
  const cache = await caches.open(SHELL_CACHE);
  await cache.addAll(SHELL_ASSETS);
  await cacheDiscoveredBuildAssets(cache);
}

async function cacheDiscoveredBuildAssets(cache) {
  try {
    const response = await fetch("/", { cache: "reload" });
    const html = await response.clone().text();
    await cache.put("/", response);
    const assetUrls = Array.from(html.matchAll(/(?:src|href)="([^"]+)"/g))
      .map((match) => match[1])
      .filter((url) => url.startsWith("/assets/") && !isLargeMedia(new URL(url, self.location.origin)));
    await Promise.all(assetUrls.map((url) => cache.add(url).catch(() => undefined)));
  } catch {
    // If discovery fails, the explicit shell assets still provide a minimal offline shell.
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(cacheShell().then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => !key.startsWith(CACHE_VERSION)).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  const { type, urls = [] } = event.data || {};

  if (type === "CACHE_URLS") {
    event.waitUntil(cacheUrls(urls));
  }

  if (type === "CLEAR_PWS_CACHES") {
    event.waitUntil(
      caches
        .keys()
        .then((keys) => Promise.all(keys.filter((key) => key.startsWith("pws-control-room")).map((key) => caches.delete(key))))
        .then(() => event.source?.postMessage({ type: "PWS_CACHES_CLEARED" })),
    );
  }
});

async function cacheUrls(urls) {
  const cache = await caches.open(MEDIA_CACHE);
  await Promise.all(
    urls.map(async (url) => {
      const requestUrl = new URL(url, self.location.origin);
      if (!isLocalAsset(requestUrl) || isLargeMedia(requestUrl)) return;
      try {
        const response = await fetch(requestUrl, { cache: "reload" });
        if (response.ok) await cache.put(requestUrl, response);
      } catch {
        // Controlled preload is best-effort; the presentation still runs from available cache.
      }
    }),
  );
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(networkFirstShell(request));
    return;
  }

  if (isLocalAsset(url)) {
    event.respondWith(assetStrategy(request, url));
    return;
  }

  event.respondWith(cacheFirst(request, SHELL_CACHE));
});

async function networkFirstShell(request) {
  const cache = await caches.open(SHELL_CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) await cache.put("/", response.clone());
    return response;
  } catch {
    return (await cache.match("/")) || Response.error();
  }
}

async function assetStrategy(request, url) {
  if (isLargeMedia(url)) {
    return networkThenCacheFallback(request, MEDIA_CACHE, false);
  }

  return cacheFirstAsset(request);
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok) {
    const contentLength = Number(response.headers.get("content-length") || "0");
    if (!contentLength || contentLength <= MAX_AUTO_CACHE_BYTES) {
      await cache.put(request, response.clone());
    }
  }
  return response;
}

async function cacheFirstAsset(request) {
  const mediaCache = await caches.open(MEDIA_CACHE);
  const shellCache = await caches.open(SHELL_CACHE);
  const cached = (await mediaCache.match(request)) || (await shellCache.match(request));
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok) {
    const contentLength = Number(response.headers.get("content-length") || "0");
    if (!contentLength || contentLength <= MAX_AUTO_CACHE_BYTES) {
      await mediaCache.put(request, response.clone());
    }
  }
  return response;
}

async function networkThenCacheFallback(request, cacheName, shouldCache = true) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (shouldCache && response.ok) await cache.put(request, response.clone());
    return response;
  } catch {
    const cached = await cache.match(request);
    return cached || Response.error();
  }
}
