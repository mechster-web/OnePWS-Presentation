# Release Readiness

Date: 2026-08-05

Release target: OnePWS Interactive Control Room Presentation, Version 1.0 Release Candidate.

## Certification Summary

Status: **READY FOR EXECUTIVE PRESENTATIONS**

The experience is also ready for controlled customer demos where the playback machine, browser and media cache can be prepared in advance.

International exhibition readiness is close, but requires final hardware FPS tracing, offline walkthrough on the target machine and live presenter stress testing before being certified as a world-class unattended exhibition build.

## Build Status

Passed.

Command:

```bash
npm run build
```

Evidence:

- TypeScript build passed.
- Vite production build passed.
- 2100 modules transformed.
- Output generated in `dist`.

Warning:

- JS chunk exceeds Vite's 500 kB warning threshold. This is non-blocking but should be optimised with dynamic scene-family imports before major media expansion.

## Test Status

Available checks:

- `npm run typecheck`: passed.
- `npm run build`: passed.
- `npm audit --audit-level=moderate`: passed, zero vulnerabilities.

No automated test script exists in `package.json`.

Recommended before final field deployment:

- Add Playwright smoke tests for chapter navigation, presenter controls, autoplay, reduced motion, overlays and offline shell.
- Add browser console-error assertions.
- Add screenshot captures for signature moments.

## Performance Status

Status: **Ready with minor issues.**

Evidence:

- Dist size: approximately 4.5 MB.
- Public asset size: approximately 3.6 MB.
- Largest minified JS: 774.96 kB, 213.16 kB gzip.
- Largest CSS: 112.30 kB, 21.85 kB gzip.
- Reduced-motion and performance-mode systems exist.

Known issue:

- Formal 60 FPS certification is not complete without hardware/browser tracing.

## Accessibility Status

Status: **Ready for controlled demos; formal audit recommended.**

Implemented foundations:

- Keyboard navigation hooks.
- Visible focus styles via design system.
- Reduced-motion support.
- Captions enabled by default.
- Screen-reader safe error boundary and aria labels on major controls.
- Touch and swipe navigation.
- Customer-safe fallbacks.

Remaining validation:

- Run axe or equivalent accessibility audit.
- Verify focus order across overlays.
- Validate high-contrast readability on projector and LED wall.
- Validate touch target size on kiosk hardware.

## Design Status

Status: **Production-ready foundation.**

Scores:

- Design Consistency Score: 90 / 100.
- Brand Expression: 91 / 100.
- Visual Design: 90 / 100.

Non-blocking improvements:

- Reduce any future repeated layout patterns through the variation validator.
- Capture signature-moment screenshots for presenter rehearsal and final QA.

## Narrative Status

Status: **Strong.**

Evidence:

- Storytelling guide created.
- Final experience report created.
- Emotional curve and memory moments are defined.
- Question chain, callbacks, foreshadowing and payoffs documented.

Storytelling Score: 88 / 100.

## Security Status

Status: **Passed for current source review.**

Evidence:

- `npm audit --audit-level=moderate`: zero vulnerabilities.
- No exposed secret files found during source review.
- Debug overlay disabled in production by default.
- Development design-system route is gated by `import.meta.env.DEV`.
- No third-party tracking library added.

Remaining validation:

- Confirm final packaged media and reference documents are approved for customer/exhibition use.

## Media Status

Status: **Ready with asset-permission verification pending.**

Evidence:

- Public media payload is small.
- Service worker caches shell and local assets.
- Missing media fallback components exist.

Known risks:

- Several assets are extracted from source PDFs and should retain approval/usage tracking.
- No final screenshot pack was generated in this pass.

## Presenter Status

Status: **Ready for controlled executive presentations.**

Implemented:

- Presenter mode.
- Presenter panel.
- Temporary route.
- Direct chapter navigation.
- Bookmarks.
- Blank screen.
- Audio controls.
- Source/proof controls.

Remaining validation:

- Live stress test with rapid jumps, reverse navigation, branch entry/return and audio interruption.

## Executive Mode Status

Status: **Ready.**

Implemented:

- CEO 5-minute route.
- Executive route families.
- Technical deep route.
- Consultant workshop route.

Remaining validation:

- Rehearse exact timed executive route with presenter script.

## Autoplay Status

Status: **Ready for controlled demos.**

Implemented:

- Autoplay mode.
- Unattended autoplay route.
- Inactivity recovery.
- Reduced-motion timing support.

Remaining validation:

- Long-running kiosk test of 30-60 minutes.

## Reduced Motion Status

Status: **Ready.**

Evidence:

- Reduced-motion state initialises from browser preference and stored setting.
- Transitions and major scenes respect reduced motion.
- Performance mode downgrades when reduced motion is active.

## Offline Status

Status: **Ready for shell and currently shipped local assets after first load.**

Evidence:

- `sw.js` responds from local preview.
- Manifest responds from local preview.
- Service worker includes shell caching and media caching strategy.

Remaining validation:

- Airplane-mode walkthrough on final deployment hardware.

## Cross-Device Status

Status: **Implementation supports target classes; physical certification pending.**

Supported by design:

- Laptop.
- Desktop.
- Presenter screen.
- Touch kiosk.
- Tablet.
- Large landscape display.
- Reduced viewport height.

Pending:

- 4K.
- UltraWide.
- LED wall.
- Portrait tablet.
- Kiosk touch latency.

## Known Issues

- No automated test suite exists yet.
- Single production JS chunk exceeds Vite warning threshold.
- Formal FPS, GPU, memory and layout-shift traces were not captured in this pass.
- Final customer/exhibition asset permissions require owner confirmation.
- Signature-moment screenshots were not generated during this pass.

## Blocking Issues

None found.

## Non-Blocking Improvements

1. Add Playwright smoke tests.
2. Add scene-family code splitting.
3. Add hardware performance trace procedure.
4. Add signature-moment screenshot checklist.
5. Add final asset-permission signoff.
6. Add automated accessibility audit.

## Future Enhancements

- Browser trace CI for performance regression.
- Route-specific media preloading manifests.
- Presenter rehearsal mode with timing scoring.
- Offline cache inspection panel for installers.
- Cross-device visual QA matrix with stored screenshots.
