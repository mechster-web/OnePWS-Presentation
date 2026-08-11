# Offline Installation Guide

The presentation is an installable Progressive Web App. It can be installed from a supported browser on Windows or macOS and used offline after the app shell and approved assets have been cached.

## Supported Installation Targets

- Windows laptop using Microsoft Edge or Google Chrome.
- Mac using Google Chrome, Microsoft Edge or Safari where PWA installation is available.

Use Chrome or Edge for the most reliable full-screen showroom installation.

## Build and Serve

Create the production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Open the preview URL shown by Vite, usually:

```text
http://127.0.0.1:4173/
```

Service workers do not run in the normal Vite development server. Test offline behaviour from the production preview or a deployed static build.

## Install on Windows

1. Open the production URL in Microsoft Edge or Google Chrome.
2. Wait for the presentation to load once.
3. Use the browser install button in the address bar, or open browser menu and choose **Install app**.
4. Name the app if prompted.
5. Launch it from the Start menu or desktop shortcut.

## Install on Mac

Chrome or Edge:

1. Open the production URL.
2. Wait for the first load to complete.
3. Use the install button in the address bar, or choose **Install Page as App** from the browser menu.
4. Launch it from Applications or the browser apps list.

Safari support depends on macOS version and browser capabilities. If Safari does not offer installation, use Chrome or Edge.

## Offline Behaviour

The service worker caches:

- App shell.
- Manifest and icon.
- Local placeholder/control-room images.
- Local audio/image assets requested during the experience.
- Next-chapter safe preload assets.

The service worker avoids preloading large video files automatically. Videos are fetched when needed and are not aggressively cached unless browser/runtime behaviour allows it safely.

## Controlled Media Preload Strategy

The app preloads only safe local assets through:

```text
src/content/mediaPreload.ts
```

The preload strategy currently includes:

- Opening and next-chapter images.
- Approved narration assets where they are listed in the asset manifest.
- No automatic large video preloading.

Large videos should be compressed and tested individually before showroom deployment.

## Offline Status Indicator

The app shows an online/offline status indicator at the lower-left of the presentation.

- **Online** means the browser reports network availability.
- **Offline mode** means the app is running without network access.

## Clear Cache and Reload

In Presenter Mode:

1. Open Presenter Mode.
2. Use the **Cache** button in the presenter panel footer.
3. Confirm the clear-cache prompt.
4. The app clears presentation caches and reloads.

Use this after replacing media files or updating the production build.

## Session Privacy

The app does not permanently store customer-specific selections.

Stored only for the current browser session:

- Selected presentation mode.
- Customer-path selections.
- Bookmarks.
- Explored products.
- Concept-selector choices.

Stored as a longer-term local preference:

- Reduced-motion preference.

Do not put confidential proposal content directly into public static files unless the build is intended for that specific customer/device.

## Testing Offline

Recommended manual test:

1. Run `npm run build`.
2. Run `npm run preview`.
3. Open the preview URL in Chrome or Edge.
4. Install the app.
5. Navigate through the opening and at least the first few chapters.
6. Turn off Wi-Fi or use DevTools Application > Service Workers > Offline.
7. Reload the installed app.
8. Confirm the opening and cached assets still load.
9. Confirm the offline indicator changes to **Offline mode**.
10. Return online and use Presenter Mode > **Cache** after content updates.

## Editing PWA Files

Manifest:

```text
public/manifest.webmanifest
```

Service worker:

```text
public/sw.js
```

Icon:

```text
public/assets/icons/pwa-icon.svg
```

PWA registration:

```text
src/pwa/registerServiceWorker.ts
```

Avoid caching all large videos by default. Add specific video caching only after confirming file sizes and showroom device storage.
