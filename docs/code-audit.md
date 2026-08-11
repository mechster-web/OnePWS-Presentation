# Code Audit

Date: 2026-08-05

Scope: production source under `src`, shipped assets under `public`, Vite build output, navigation/orchestration configuration, presentation state, PWA shell, accessibility surface and release documentation.

## Executive Summary

The application is in a strong release-candidate state. The redesigned experience has a coherent architecture, typed content, modular scene rendering, central navigation state, reduced-motion support, offline shell support and production build success.

No blocking code issue was found during this pass. One release hygiene fix was completed: Finder `.DS_Store` metadata files were removed from `public` and `src`.

## Project Shape

- Source files: 149 total files under `src` before cleanup scan; 147 TypeScript/TSX files in the import-graph audit.
- TypeScript source size: approximately 21,093 lines.
- Public asset payload: approximately 3.6 MB.
- Built distribution: approximately 4.5 MB.
- Largest production JS bundle: `dist/assets/index-BwHaaNok.js`, 774.96 kB minified, 213.16 kB gzip.
- Largest production CSS bundle: `dist/assets/index-BvRqrNe_.css`, 112.30 kB minified, 21.85 kB gzip.

## Architecture Review

### Strengths

- `PresentationShell` owns global presentation composition, overlays, navigation, autoplay, audio controls, pointer handling, keyboard controls and scene transitions.
- `PresentationProvider` centralises presentation state through a reducer.
- `SceneRenderer` isolates scene selection and preserves legacy fallback compatibility.
- `sceneRegistry` maps scene archetypes to modular implementations rather than one conditional component.
- `ExperienceDirector`, `ExperienceFlowEngine`, `ExperienceVariationValidator` and `ExperienceScore` provide the final orchestration layer.
- Customer journeys, optional branches, executive routes, autoplay route and navigation visibility are configured through `src/config/navigation.ts`.
- Design-system, motion, performance and scene primitives exist as reusable foundations.
- Development overlay and design-system showcase are gated by `import.meta.env.DEV` or explicit flags.

### Simplification Opportunities

- Several legacy scene components remain large and should be decomposed only when they are next edited:
  - `ProjectExperienceChapter.tsx` around 686 lines.
  - `CredibilityChapter.tsx` around 568 lines.
  - `PresenterPanel.tsx` around 568 lines.
  - `IncidentSimulationChapter.tsx` around 552 lines.
- `chapters.ts`, `projects.ts`, `credentials.ts` and `featureStories.ts` are content-heavy and appropriate for now, but long-term editing would benefit from splitting by chapter family.
- The build currently emits a single large JS chunk. Dynamic imports for heavy scene families would improve first-load resilience for exhibition hardware.

## Unused and Duplicate Code Findings

Static import-graph audit from `src/main.tsx` found no blocking runtime orphan. It identified several likely intentional non-route or legacy-support files:

- Development validation scenes:
  - `src/design-system/scenes/ImmersiveEnvironmentScene.tsx`
  - `src/design-system/scenes/ProductHeroValidationScene.tsx`
  - `src/design-system/scenes/InformationStoryScene.tsx`
- Older legacy chapter components not directly imported by `ChapterScene`:
  - `OpeningChapter.tsx`
  - `TraditionalLimitsChapter.tsx`
  - `CriticalOperationsChapter.tsx`
  - `HumanCentredRoomChapter.tsx`
  - `ContinuousAwarenessChapter.tsx`
  - `ConceptSelectorChapter.tsx`
  - `ClosingChapter.tsx`
- Documentation/report generator:
  - `src/experience/final-experience/finalExperienceReport.ts`
- Legacy scene placeholders:
  - `src/experience/scenes/CinematicOpeningScene.tsx`
  - `src/experience/scenes/ProductHeroScene.tsx`
  - `src/experience/scenes/PlaceholderScene.tsx`
- Compatibility hooks/content:
  - `src/hooks/useNarration.ts`
  - `src/scenes/opening/openingNarration.ts`

Recommendation: do not delete these before launch unless the owner confirms they are not needed by presenter rehearsal, future migration, generated docs or compatibility paths.

## Circular Imports

The import-graph check flagged `subtitles.ts` and `voiceovers.ts`; inspection shows this is type-only usage (`import type { VoiceoverScope }`) plus voiceover subtitle lookup. This is not a blocking runtime cycle in the TypeScript/Vite build.

## Timers, Listeners and Cleanup

Reviewed usage of:

- `addEventListener`
- `setTimeout`
- `setInterval`
- media/audio event listeners
- service-worker events
- keyboard and pointer hooks

Most hooks and components return cleanup functions. Areas to watch during future edits:

- Scene-specific autoplay timers should continue to clear arrays of timeout IDs on unmount.
- Voiceover fade timers and audio listeners must remain tightly cleaned up during chapter skipping.
- Opening director transition locks should remain guarded against duplicate navigation.

No blocking leak was confirmed in static review.

## Debug and Console Surface

- Development validators use dev-only or intentional console warnings.
- Experience debug overlay is gated through `enableDevelopmentOverlay: import.meta.env.DEV` and `forceDevelopmentOverlayInProduction: false`.
- `/dev/design-system` only lazy-loads the showcase in development builds.
- Error boundary logs technical detail to console while showing a customer-safe fallback.

Recommendation: keep `forceDevelopmentOverlayInProduction` false for all demo builds.

## Assets

- Public assets are modest in size, approximately 3.6 MB.
- Largest source assets are compressed PDF-derived images under 300 kB each.
- No video, audio or 3D asset payload currently dominates the build.
- Removed release-noise files:
  - `public/.DS_Store`
  - `public/assets/.DS_Store`
  - `src/.DS_Store`

## Dependency Review

Runtime dependencies are focused:

- React 19
- Vite React plugin
- Framer Motion
- Lucide React
- pptxgenjs

`npm audit --audit-level=moderate` reported zero vulnerabilities.

## Blocking Issues

None found.

## Non-Blocking Recommendations

1. Add route-level or scene-family dynamic imports to reduce initial JS chunk size.
2. Add automated browser smoke tests with Playwright for keyboard navigation, route changes, overlays and reduced motion.
3. Add Lighthouse or trace-based performance captures on the actual showroom/LED-wall hardware.
4. Decompose largest scene and presenter files only when actively editing them.
5. Confirm all source-derived media has final usage permissions for customer and exhibition contexts.
