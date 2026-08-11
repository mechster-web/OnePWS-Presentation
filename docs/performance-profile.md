# Performance Profile

Date: 2026-08-05

Scope: static performance review, Vite production build output, asset payload audit, runtime architecture review and local preview smoke checks. True FPS/GPU certification requires browser trace capture on target hardware and is listed as a remaining release task.

## Build Metrics

Production build command:

```bash
npm run build
```

Result:

- TypeScript project build: passed.
- Vite production build: passed.
- Modules transformed: 2100.
- Build time: approximately 4.38 seconds.

Output:

| Asset | Size | Gzip |
|---|---:|---:|
| `dist/index.html` | 0.80 kB | 0.39 kB |
| `dist/assets/index-BvRqrNe_.css` | 112.30 kB | 21.85 kB |
| `dist/assets/index-BwHaaNok.js` | 774.96 kB | 213.16 kB |

Vite warning:

- One JS chunk is larger than 500 kB after minification.
- This is non-blocking for current demos, but it is the primary performance optimization before heavy media, video or additional 3D scenes are added.

## Asset Payload

| Area | Approximate Size |
|---|---:|
| `public` | 3.6 MB |
| `public/assets` | 3.6 MB |
| `public/assets/source-pdf` | 3.5 MB |
| `dist` | 4.5 MB |
| `src` | 1.2 MB |

Largest public assets:

- `p13_043_1451x733.png`: 288 kB.
- `p33_061_2088x1172.jpg`: 192 kB.
- `p28_058_1898x1063.jpg`: 184 kB.
- `p31_059_2078x1168.jpg`: 176 kB.
- Multiple project/control-room reference images between 100 kB and 160 kB.

Assessment: media payload is currently acceptable for offline demos and exhibitions. Future premium video or large 4K imagery should be lazy-loaded and included in the service-worker media strategy deliberately.

## Runtime Performance Review

### Strengths

- Presentation is full-screen and scene-based; no long scroll layout or document-style rendering.
- Reduced-motion mode is present and used in transitions and scenes.
- Performance mode hook selects `premium`, `balanced` or `reduced` based on reduced-motion preference, device memory and CPU cores.
- PWA cache strategy separates shell assets from media assets.
- Heavy media auto-caching is capped by `MAX_AUTO_CACHE_BYTES`.
- Navigation and overlays are reducer-driven, avoiding scattered global state.
- Design-system effects are tokenised and can be reduced centrally.

### Risks

- Framer Motion transitions are used globally and across many scene families. Hardware trace testing is still needed for 60 FPS certification on LED-wall machines and touch kiosks.
- Several large scene components combine rendering, interaction and local state. They are stable but can create unnecessary re-render surfaces if expanded.
- A single JS chunk increases first-interaction cost on lower-powered hardware.
- Large blur, backdrop and shadow effects should remain constrained in reduced-performance mode.

## 60 FPS Certification Status

Status: **Conditionally ready; hardware trace required for formal 60 FPS certification.**

Verified:

- Production build succeeds.
- Static review found reduced-motion and performance-mode fallbacks.
- Asset payload is modest.
- No very large videos or 3D textures are present.

Not verified in this pass:

- Real FPS.
- GPU overdraw.
- CPU timeline.
- Memory timeline.
- React render profiling.
- Layout shift trace.
- Interaction latency measured with browser performance APIs.

Required before international exhibition deployment:

1. Run Chrome Performance trace on target laptop and LED-wall playback machine.
2. Record transitions across opening, product reveal, incident response, project proof and final synthesis.
3. Confirm no long task above 50 ms during presenter navigation.
4. Confirm animation frames remain near 16.7 ms in premium mode and degrade gracefully in balanced/reduced modes.

## Memory Leak Review

Static review covered listeners, intervals, timeouts, audio listeners and service-worker listeners.

No confirmed leak found.

Watch areas:

- `VoiceoverProvider` audio lifecycle during rapid skip/replay.
- Opening and scene autoplay timers during mode changes.
- Incident simulation timers during presenter interruption.
- Window-level keyboard/touch/wheel listeners during remount.

Recommended test: run a 20-minute presenter stress session while monitoring heap snapshots before and after repeated route changes.

## Interaction Latency

Expected status: good.

Reasons:

- Most navigation actions dispatch reducer events directly.
- Presenter mode uses immediate controls and shorter transition timing.
- Reduced-motion mode shortens or bypasses movement.

Remaining validation:

- Measure keyboard next/previous latency.
- Measure tap latency on kiosk hardware.
- Measure presenter panel rapid-jump recovery.

## Offline Performance

Service worker:

- Caches shell.
- Discovers build assets from `/`.
- Caches local assets with cache-first strategy.
- Avoids automatically caching large video formats.
- Provides cache fallback for shell navigation.

Status: **Ready for offline shell and currently shipped media.**

Remaining validation:

- Full offline walkthrough in a browser after a first online load.
- Confirm all route assets are cached by expected presenter flow.
- Confirm missing media fallback visuals remain customer-safe.

## Performance Score

**84 / 100**

Drivers:

- Strong asset discipline and reduced-motion support.
- Clean production build.
- Modest image payload.
- Deduction for single large JS chunk and lack of hardware FPS trace.

## Recommended Optimizations Before Final International Exhibition Build

1. Split scene families with dynamic imports.
2. Add automated trace capture for five signature moments.
3. Add a production browser smoke test that asserts no console errors during chapter navigation.
4. Add image dimension manifest and preload priority checks for opening and final synthesis assets.
5. Keep premium blur/shadow effects disabled in reduced-performance mode.
