# OnePWS Presentation Experience Audit

Date: 2026-08-05

## Baseline

- Backup: `backups/src-architecture-baseline-2026-08-05`
- Build command: `npm run build`
- Baseline build: passed before code changes.
- Pre-existing build warning: Vite reports the main JavaScript chunk is larger than 500 kB after minification.
- Git status: this workspace is not a Git repository, so a backup folder was created instead of a branch.

## Existing Application Architecture

The app is a React/Vite full-screen presentation. `src/app/PresentationShell.tsx` owns the stage, loading state, touch navigation, hash sync, mode-specific presenter layout, chapter map, offline indicator, autoplay controls, audio manager and blank-screen layer. `src/state/presentationReducer.ts` centralizes mode, current chapter, playback, narration, captions, customer path, bookmarks, overlays, inactivity timestamp, audio unlock, concept selections and visited chapters.

Content is concentrated in `src/content/chapters.ts`, with media IDs resolved by `src/content/assets.ts` and `src/content/assetManifest.ts`. Narration metadata lives in `src/content/voiceovers.ts`, subtitles in `src/content/subtitles.ts`, customer journey prioritization in `src/content/customerPaths.ts`, and autoplay duration in `src/content/autoplayTimings.ts`.

Rendering was previously coupled in `src/components/scene/ChapterScene.tsx`: most chapters used one repeated image/text composition, while a few chapter IDs branched to bespoke components such as connected intelligence, credibility, incident simulation and project experience.

## Features To Protect

- Full-screen 16:9 presentation stage
- Presenter, self-guided and autoplay modes
- Customer-path prioritization
- Chapter map and journey selector overlays
- Presenter panel and presenter preview
- Keyboard controls, touch/swipe controls and hash navigation
- Narration controls, captions and subtitle display
- Autoplay timing and inactivity recovery
- Offline service worker and offline status indicator
- Reduced-motion handling
- Existing chapter copy, media IDs, narration IDs, beats, technical layers and presenter talking points

## Repetition Problems

Most default chapters use the same left-copy/right-image structure, the same background treatment, similar CTA placement and similar reveal timing. Images act mainly as static atmosphere. Beat data exists, but most chapters reveal information in predictable blocks rather than distinct scenario, spatial, product, proof or decision experiences.

## Current Chapter Inventory

1. `opening-cover` - OnePWS Control Room Capability
2. `mission-critical-environments` - Control Rooms Are Mission-Critical
3. `onepws-positioning` - OnePWS Positioning
4. `journey-roadmap` - Guided Capability Journey
5. `company-at-a-glance` - OnePWS At A Glance
6. `group-and-growth` - Group Strength and Growth
7. `mission-control-definition` - What Defines a Mission-Critical Control Room
8. `operator-challenges` - Operator Challenges
9. `poor-design-risk` - Operational Risks of Poor Design
10. `human-centred-philosophy` - Human-Centred Philosophy
11. `complete-ecosystem` - One Environment. Connected Intelligence.
12. `console-portfolio` - Control-Room Console Portfolio
13. `intelligent-features` - Intelligent Features
14. `incident-response` - When Every Second Matters.
15. `ergonomic-methodology` - ISO 11064 and Ergonomic Study
16. `sightline-comfort` - Sightlines, Reach and Comfort
17. `design-build-approach` - Integrated Design-Build Approach
18. `architectural-systems` - Architectural and Environmental Systems
19. `delivery-methodology` - Engineering and Project Methodology
20. `manufacturing-quality` - Manufacturing and Quality
21. `certification-overview` - International Certifications
22. `project-portfolio` - Project Credentials
23. `customer-presence` - Customers and Global Presence
24. `why-onepws` - Why OnePWS
25. `next-steps-closing` - The Future Starts Here

## Current Patterns

- Default chapters: image-backed architectural background plus copy, CTA buttons and beat tiles.
- Special chapters: connected intelligence, credibility, incident simulation and project experience provide richer interaction.
- Interaction patterns: continue, journey map, listen, feature exploration, incident stepping, bookmarks and customer path selection.
- Transition patterns: global fade/blur between chapters plus beat-level motion presets.
- Media and narration: chapters store media IDs; voiceover metadata resolves by chapter ID and is managed globally by `AudioManager`.

## Customer Journeys

Journey selection combines industry and role mappings, then prioritizes matching chapters before returning to the main enabled chapter sequence. Pre-existing risk: several journey mappings reference older chapter IDs such as `operator-pressure`, `connected-environment`, `proven-environments`, `traditional-limits`, `intelligent-layers`, `configure-direction`, `world-never-stops` and `command-advantage`. The current prioritization filters unknown IDs out, so the app still works, but these mappings should be reconciled during content migration.

## New Architectural Foundation

- `src/config/experience-redesign.ts` defines scene archetypes, interactions, transitions, moods, rhythm rules, feature flags, fallbacks and legacy compatibility notes.
- `src/data/contentTypes.ts` now supports scene metadata, chapter purpose, audience, interaction type, transitions, background treatment, narration, hotspots, CTA, presenter notes, optional destinations and internal rhythm metadata.
- `src/content/chapters.ts` preserves original content and adds compatibility metadata through a mapping layer.
- `src/experience/SceneRenderer.tsx` selects either the legacy renderer or a registry scene.
- `src/experience/sceneRegistry.ts` maps all 20 archetypes to modular scene components. The 2026-08-05 archetype-library stage replaced placeholder registry entries with differentiated archetype components and development preview data.
- `src/experience/ExperienceDirector.ts` centralizes a directed read model for current chapter, journey, mode, narration, captions, interaction completion, branching and next destination.
- `src/experience/presentationRhythmValidator.ts` warns in development when rhythm rules are violated.
- `src/components/dev/ExperienceDebugOverlay.tsx` shows internal diagnostics with `Ctrl+Shift+D` in development only.

## Recommended Archetypes

See `docs/chapter-redesign-map.md` for the chapter-by-chapter migration plan. Major memory moments should be `opening-cover`, `complete-ecosystem`, `incident-response`, `project-portfolio` and `next-steps-closing`.

## Chapters To Condense Visually Without Deleting Content

`group-and-growth`, `certification-overview`, `customer-presence`, `manufacturing-quality` and parts of `delivery-methodology` should become denser visual experiences with progressive disclosure. Content should remain available through presenter notes, overlays, layers or interactions rather than being removed.

## Technical Risks

- Several customer path IDs are stale and currently filtered out.
- `ChapterScene.tsx` still contains legacy chapter-ID branching and stale image-map keys.
- Some narration assets are planned but may not have actual audio files yet.
- Large bundle warning existed before and after this work.
- The scene registry now has production-ready archetype components, but most customer-facing chapters still intentionally render through legacy fallback until migrated one by one.

## Migration Plan

1. Keep legacy fallback enabled while migrating one chapter at a time.
2. Promote a chapter to `redesignStatus: "redesigned"` only after its archetype component is complete.
3. Move bespoke ID branches out of `ChapterScene.tsx` into registry components.
4. Reconcile customer path IDs with the current 25 chapter IDs.
5. Use the rhythm validator after every content or archetype migration.
6. Preserve content fields and migrate visual behavior through metadata and scene components.
