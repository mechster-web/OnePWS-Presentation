# OnePWS Check Build

## macOS

The review build is available at:

`output/OnePWS Control Room.app`

Double-click the app to open the local presentation build. The app starts a local server on `127.0.0.1` and opens the presentation in the browser.

If macOS blocks it because it is unsigned, right-click the app, choose **Open**, then confirm.

## iOS

A true iOS executable (`.ipa`) requires an Xcode native wrapper, Apple signing identity and provisioning profile. This repository is currently a Vite web app, so the fastest iPhone/iPad review route is:

1. Host or serve the production `dist` folder on the local network.
2. Open it in Safari on the iOS device.
3. Use **Share > Add to Home Screen** for a PWA-style review experience.

For a signed iOS build later, add Capacitor or a native WebView shell, then build and sign from Xcode.
