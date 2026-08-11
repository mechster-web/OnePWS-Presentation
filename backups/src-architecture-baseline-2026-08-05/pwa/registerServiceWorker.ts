export function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || import.meta.env.DEV) {
    return;
  }

  window.addEventListener("load", () => {
    void navigator.serviceWorker.register("/sw.js").catch(() => {
      // Offline install remains unavailable if the browser blocks service workers.
    });
  });
}

export async function clearPwaCaches() {
  const registrations = await navigator.serviceWorker?.getRegistrations?.();
  const controller = navigator.serviceWorker?.controller;

  if (controller) {
    controller.postMessage({ type: "CLEAR_PWS_CACHES" });
  }

  if ("caches" in window) {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith("pws-control-room")).map((key) => caches.delete(key)));
  }

  await Promise.all((registrations ?? []).map((registration) => registration.update()));
}

export function preloadPwaAssets(urls: string[]) {
  if (!navigator.serviceWorker?.controller || urls.length === 0) {
    return;
  }

  navigator.serviceWorker.controller.postMessage({ type: "CACHE_URLS", urls });
}
