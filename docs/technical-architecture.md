# Technical Architecture

This document plans the first-version technical architecture for the interactive Pyrotech Workspace Control Room presentation. It is a frontend-only application: no backend, no external APIs, and no runtime network dependency.

## Technology stack

- **React** for component-driven scenes, overlays and reusable presentation UI.
- **TypeScript** for structured presentation data, mode logic, asset manifests and safer refactoring.
- **Vite** for fast local development and static production builds.
- **Tailwind CSS** for a compact design system, responsive layouts and predictable 1920x1080 composition.
- **Framer Motion** for cinematic transitions, chapter reveals, overlays and reduced-motion variants.
- **Lucide icons** for controls: play, pause, volume, captions, fullscreen, chapter map, proof drawer, back, close, keyboard, touch and settings.
- **HTML5 audio/video** for narration, ambient loops, project clips and showroom videos.
- **Lightweight local state** using React context plus `useReducer`, with small focused hooks. Avoid Redux, MobX or heavy state frameworks in v1.

## Application shape

The app should behave like a local cinematic presentation runtime, not a routed website.

```text
src/
  app/
    App.tsx
    PresentationShell.tsx
    FullscreenGate.tsx
    ErrorBoundary.tsx
  content/
    presentation.ts
    chapters.ts
    projects.ts
    proof.ts
    solutions.ts
    narration.ts
    config.ts
  data/
    schemas.ts
    contentTypes.ts
  components/
    scene/
    controls/
    overlays/
    media/
    motion/
    accessibility/
  chapters/
    ChapterWorldNeverStops.tsx
    ChapterContinuousAwareness.tsx
    ...
  state/
    presentationReducer.ts
    PresentationProvider.tsx
    selectors.ts
  hooks/
    useKeyboardControls.ts
    usePointerActivity.ts
    useAutoplayTimeline.ts
    useNarration.ts
    useFullscreen.ts
    useReducedMotionMode.ts
  assets/
    images/
    video/
    audio/
    captions/
    logos/
```

The exact file names can change during implementation, but the separation should remain: structured content is separate from rendering components, and assets are referenced by content records rather than hardcoded into chapter components.

## Runtime architecture

### Presentation shell

The `PresentationShell` owns the full-screen stage, mode controls, chapter rail, overlays, narration controls and global input handling.

Responsibilities:

- Lock the main experience to a cinematic stage.
- Maintain current chapter, current beat, mode and overlay state.
- Provide global controls for next, previous, pause, chapter map, mode switch, narration, captions, proof drawer and fullscreen.
- Handle keyboard, mouse and touch consistently.
- Keep the main story running unless the user opens a detail layer that intentionally pauses it.

### Chapter scenes

Each chapter is a scene component driven by structured data.

Responsibilities:

- Render the chapter headline, supporting message, visual assets, motion sequence and interaction hotspots.
- Expose optional detail layers without owning global navigation.
- Support Presenter, Self-Guided and Auto-Play behavior through props from the shell.
- Provide reduced-motion variants.

Chapter components should not contain customer facts, project lists or asset paths inline. They should consume chapter data.

### Overlay system

Overlays should be centralized so the app feels consistent.

Overlay types:

- Chapter map.
- Project card.
- Proof drawer.
- Technical-details layer.
- Product/system layer explorer.
- Configurator panel.
- Captions/transcript.
- Settings and mode switcher.

Overlays should preserve the underlying chapter state. Closing an overlay returns the user to the same chapter and beat.

## Local state-management approach

Use a single lightweight presentation reducer for global runtime state.

Suggested state shape:

```ts
type PresentationMode = "presenter" | "selfGuided" | "autoPlay";

type PresentationState = {
  mode: PresentationMode;
  chapterId: string;
  beatId?: string;
  isPlaying: boolean;
  narrationEnabled: boolean;
  captionsEnabled: boolean;
  fullscreenRequested: boolean;
  reducedMotion: boolean;
  language: string;
  activeOverlay:
    | { type: "chapterMap" }
    | { type: "project"; projectId: string }
    | { type: "proof"; section?: string }
    | { type: "technical"; chapterId: string; layerId: string }
    | { type: "systemExplorer"; layerId?: string }
    | { type: "configurator" }
    | null;
  lastInteractionAt: number;
  publicSafeMode: boolean;
};
```

Keep state local to the app. Use `localStorage` only for non-sensitive preferences such as last mode, captions, reduced motion, language and public-safe mode. Do not store confidential customer data.

## Mode behavior

### Presenter Mode

- Manual progression only.
- Narration off by default.
- Presenter can open proof, projects and technical layers without timeouts.
- Keyboard and clicker support: next, previous, pause/play, open chapter map, close overlay.
- Project values and sensitive proof can be enabled if `publicSafeMode` is off.

### Self-Guided Mode

- Visitor chooses chapters, projects and product layers.
- Narration optional.
- Touch-first controls.
- Idle timer can close overlays and return to an ambient chapter menu.
- After a longer idle timeout, the app can enter Auto-Play Mode.

### Auto-Play Mode

- Timeline-driven playback.
- Narration on by default.
- Captions on or off based on configuration.
- Any user input interrupts Auto-Play and switches to Self-Guided Mode at the current chapter.
- Auto-play must use chapter-level audio files and chapter durations from data.
- Auto-play should not rely on reading small text.

## Structured content model

Store the presentation in typed data files. The first version can use TypeScript files for stronger typing and simpler imports. Later, the same shapes can be moved to JSON if non-developers need to edit content.

### Presentation config

```ts
type PresentationConfig = {
  title: string;
  defaultMode: PresentationMode;
  defaultLanguage: string;
  supportedLanguages: string[];
  targetResolution: { width: 1920; height: 1080 };
  idleTimeoutMs: number;
  autoPlayResumeMs: number;
  publicSafeModeDefault: boolean;
};
```

### Chapter data

```ts
type Chapter = {
  id: string;
  order: number;
  title: string;
  purpose: string;
  headline: string;
  supportingMessage: string;
  durationMs: number;
  visual: {
    type: "image" | "video" | "scene" | "modelPlaceholder";
    assetId?: string;
    fallbackAssetId?: string;
  };
  narration?: NarrationRef;
  captions?: CaptionRef[];
  beats: ChapterBeat[];
  interactions: InteractionDefinition[];
  technicalLayers: TechnicalLayer[];
  presenterTalkingPoint: string;
};
```

### Assets

```ts
type Asset = {
  id: string;
  type: "image" | "video" | "audio" | "caption" | "logo";
  src: string;
  alt?: string;
  language?: string;
  durationMs?: number;
  publicSafe: boolean;
  credit?: string;
};
```

All images, video, narration audio and logo files should be referenced by `assetId`. Replacing a file should only require updating the asset manifest or replacing the file at the same path.

### Projects

```ts
type Project = {
  id: string;
  name: string;
  sector: string[];
  location?: string;
  approvedImages: string[];
  approvedValue?: string;
  showValueInPublicSafeMode: boolean;
  description?: string;
  confirmationRequired?: string[];
};
```

Project records should support the references from the PDF: WDFCC Ahmedabad, Noida ITMS, Chandigarh ICCC Smart City, Ahmedabad Police, RTGC Andhra Pradesh, ISRO IET, ISRO ICET, DRDO Balasore, Dangote Refinery Nigeria, RCAT Jaipur, Bhamashah Techno-HUB and others.

## Asset strategy

### Replaceable media

- Store assets in stable folders: `src/assets/images`, `src/assets/video`, `src/assets/audio`, `src/assets/captions`, `src/assets/logos`.
- Reference assets through content records, not component imports scattered across the app.
- Use predictable naming: `chapter-01-world-never-stops-bg.webp`, `chapter-08-incident-response-en.mp3`, `project-wdfcc-ahmedabad-01.webp`.
- Keep an asset manifest with ID, file path, type, language, alt text and public-safe status.

### Images

- Use optimized `.webp` or `.avif` where possible, with fallback if needed.
- Export primary full-screen images at 1920x1080 or higher where justified.
- Avoid shipping extracted PDF slide images as final production assets.
- Use separate thumbnails for project grids or overlays.

### Video

- Use local `.mp4` files with H.264 for broad playback.
- Keep short ambient loops muted unless narration is active.
- Provide poster images for every video.
- Avoid autoplaying audio except in Auto-Play Mode after the user or installation has chosen that mode.

### Audio and narration

- Use one audio file per chapter per language.
- Store captions/transcripts alongside audio.
- Future multilingual structure:

```text
assets/audio/en/chapter-01.mp3
assets/audio/hi/chapter-01.mp3
assets/captions/en/chapter-01.vtt
assets/captions/hi/chapter-01.vtt
```

- Narration references should include language and duration so Auto-Play timing remains data-driven.

## Offline strategy

The v1 app should be a fully static build.

Recommended first-version packaging:

- `vite build` produces a static `dist/` folder.
- The app can be served locally through a small static server or packaged later as a desktop app if required.
- All assets ship in the build or public asset folder.
- No CDN fonts, no external icon fetches, no online map tiles, no analytics SDK, no API calls.

Optional offline hardening:

- Add a service worker only after the core app is stable, using a minimal Vite PWA setup or custom service worker.
- Cache the app shell, content data and all required assets.
- Provide an offline asset preflight screen for showroom machines.

For the first implementation, avoid adding a PWA plugin unless offline caching requirements cannot be satisfied by the installation/package approach.

## Full-screen and display behavior

### 1920x1080 primary stage

- Design the primary stage for 16:9 at 1920x1080.
- Use a `Stage` component that maintains 16:9 composition with responsive scaling.
- On 16:9 displays, fill the viewport.
- On non-16:9 laptops, letterbox or adapt safely without cropping critical UI.
- Keep all primary controls inside safe margins.

### Full-screen

- Provide a full-screen entry button on startup.
- Use the browser Fullscreen API.
- If full-screen is denied, continue in browser full-window mode with a visible prompt.
- Hide cursor after inactivity in Auto-Play Mode and large-display mode; reveal on movement/touch.

### Laptop adaptation

- Preserve the cinematic layout.
- Scale large-display text down through breakpoints, not viewport-width font formulas.
- Keep project overlays and technical drawers scrollable if vertical space is limited.

### Touchscreen adaptation

- Use large controls and visible tap targets.
- Avoid hover-only interactions.
- Use pointer events for unified mouse/touch support.
- Disable accidental text selection and double-tap zoom on presentation controls.

## Input model

Support keyboard, mouse and touch from the start.

Keyboard:

- `ArrowRight` / `Space`: next beat or chapter.
- `ArrowLeft`: previous beat or chapter.
- `Escape`: close overlay or exit detail layer.
- `M`: mute/unmute narration.
- `C`: captions toggle.
- `F`: fullscreen toggle.
- `P`: play/pause Auto-Play.
- `G`: chapter map.

Mouse:

- Click controls.
- Click hotspots.
- Drag optional product/model scenes.
- Cursor hides during inactive Auto-Play.

Touch:

- Tap controls and hotspots.
- Swipe next/previous where it does not conflict with product exploration.
- Drag/rotate product layers where available.
- Pinch zoom only for project images or maps if implemented cleanly.

## Motion architecture

Use Framer Motion for:

- Chapter transitions.
- Beat transitions.
- Overlay enter/exit.
- Proof drawer and chapter map.
- Timeline markers.
- Reduced-motion alternatives.

Avoid building a complex custom animation engine in v1. The auto-play timeline can be data-driven with `setTimeout`, `requestAnimationFrame` where needed, and Framer Motion transition callbacks.

Each chapter should define beats:

```ts
type ChapterBeat = {
  id: string;
  startsAtMs: number;
  durationMs: number;
  headline?: string;
  assetId?: string;
  motionPreset?: "fade" | "dolly" | "scan" | "layerReveal" | "projectWall";
};
```

## Audio/video architecture

Use native HTML5 media elements wrapped in React components.

Components:

- `AudioNarration`: loads chapter audio, syncs play/pause with state, emits ended/progress events.
- `CaptionTrack`: renders VTT or structured captions as large on-screen captions.
- `AmbientVideo`: muted loop or chapter video background with poster fallback.
- `MediaPreloader`: preloads current and next chapter media.

Rules:

- Audio is chapter-based, not one long file.
- Auto-Play uses chapter durations and audio events together. If audio ends early, hold the final beat until chapter duration completes; if audio fails, continue with captions and visual timing.
- Presenter Mode never starts narration without user action.
- Self-Guided Mode remembers the visitor’s narration preference for the session.

## Accessibility architecture

Build accessibility into the component contracts.

- Every chapter has text equivalents for headline and supporting message.
- Every meaningful image asset has alt text in the asset manifest.
- Captions are available for every narrated chapter.
- Reduced motion is available globally.
- Keyboard focus is visible and trapped inside active overlays.
- Controls use semantic buttons.
- Icons have labels via accessible names.
- Color is never the only indicator of active mode, current chapter or alert state.
- Auto-play can always be paused.

## Content governance

The app must preserve the “do not invent facts” rule.

- Store unconfirmed items in data as `confirmationRequired`.
- Add `publicSafe` flags to assets and proof records.
- Hide project values, full logo wall and partner claims in public-safe mode.
- Keep factual proof linked to source notes from `docs/existing-presentation-analysis.md`.
- Do not hardcode customer logos into decorative UI without approval metadata.

## Recommended minimal dependencies

Use:

- `@vitejs/plugin-react`
- `typescript`
- `react`
- `react-dom`
- `tailwindcss`
- `framer-motion`
- `lucide-react`

Avoid in v1:

- Redux or large state frameworks.
- Heavy 3D engines unless product exploration cannot be achieved with layered 2D/2.5D visuals.
- Online map libraries.
- Animation libraries beyond Framer Motion.
- CMS, backend, auth or analytics SDKs.
- Component libraries that fight the bespoke presentation design.

If 3D becomes essential later, evaluate Three.js separately in a future phase, but keep v1 achievable with cinematic 2D, layered images, video and SVG/CSS overlays.

## Testing and validation plan

Manual and automated checks should focus on presentation reliability.

- Build check: `npm run build`.
- Type check: TypeScript strict enough to catch broken content references.
- Asset manifest validation: every referenced asset exists.
- 1920x1080 visual QA: core chapters fit, captions do not cover critical content, controls remain in safe margins.
- Laptop QA: 1366x768 and 1440x900.
- Touch QA: tap targets, swipe behavior, overlay close behavior, idle return.
- Keyboard QA: full chapter navigation and overlay access.
- Offline QA: run without network and verify no console errors for missing external resources.
- Auto-Play QA: full loop runs through all chapters with narration and no stuck states.
- Reduced-motion QA: all chapters remain understandable.

## Implementation roadmap

### Phase 1: Project foundation

- Scaffold React + TypeScript + Vite.
- Add Tailwind CSS, Framer Motion and Lucide icons.
- Define app shell, 16:9 stage and base design tokens.
- Add global CSS for full-screen presentation behavior.
- Establish folder structure for content, components, chapters, state and assets.
- Add basic build/type-check scripts.

Deliverable: blank but full-screen-capable presentation shell at 1920x1080.

### Phase 2: Structured content system

- Define TypeScript content schemas for chapters, beats, assets, projects, proof and narration.
- Convert the 11-chapter storyline into structured data.
- Create the asset manifest with placeholder assets.
- Add content selectors and validation utilities.
- Add public-safe flags and confirmation-required fields.

Deliverable: data-driven presentation content that can render placeholder chapter scenes.

### Phase 3: Presentation runtime and modes

- Implement `PresentationProvider` and reducer.
- Add Presenter, Self-Guided and Auto-Play modes.
- Implement next/previous chapter logic, beat timing and mode switching.
- Add idle detection and Auto-Play interruption behavior.
- Add chapter rail and control map.

Deliverable: navigable presentation runtime with all modes working using placeholder visuals.

### Phase 4: Media system

- Implement image, video and audio wrappers.
- Add narration playback with chapter-level audio references.
- Add captions/transcript support.
- Add media preloading for current and next chapters.
- Add poster/fallback handling.
- Add mute, captions and full-screen controls.

Deliverable: offline-capable media playback system with placeholder audio/video.

### Phase 5: Core visual scenes

- Build the 11 guided chapter scenes.
- Use Framer Motion presets for cinematic transitions and beat reveals.
- Implement the operational-world opener, awareness room, operator pressure, legacy-room contrast, intelligent-room reveal and connected-system explorer.
- Build incident-response scenario as a timed visual sequence.
- Build credibility/project wall and configure-your-direction scene.

Deliverable: complete guided experience with placeholder or approved first-pass assets.

### Phase 6: Interactive detail layers

- Implement proof drawer, project cards, technical-details layers and system explorer overlays.
- Add public-safe behavior for sensitive content.
- Add sector filtering and project map/list view without external map APIs.
- Add configurator choices and summary view.
- Ensure overlays pause/resume the main story correctly.

Deliverable: self-guided exploration without interrupting the main storyline.

### Phase 7: Responsive and input refinement

- Tune 1920x1080 layout.
- Add laptop breakpoints and safe letterboxing behavior.
- Optimize touchscreen controls and pointer interactions.
- Complete keyboard shortcuts.
- Add large-display cursor hiding and idle behavior.

Deliverable: polished behavior across desktop, laptop, touchscreen and large displays.

### Phase 8: Offline packaging and asset replacement workflow

- Verify static build works with no external network.
- Add asset manifest validation.
- Document how to replace images, video and narration files without changing components.
- Add a public-safe configuration profile.
- Decide whether a service worker or simple packaged static build is enough for installation.

Deliverable: installable/offline-ready build process and replacement workflow.

### Phase 9: Accessibility and performance hardening

- Add reduced-motion mode.
- Verify captions and transcript flow.
- Test keyboard focus and overlay focus traps.
- Optimize image/video sizes.
- Validate 60fps target on showroom hardware.
- Run full Auto-Play loop soak testing.

Deliverable: accessible, reliable presentation runtime ready for showroom rehearsal.

### Phase 10: Content integration and final QA

- Replace placeholders with approved Pyrotech imagery, logos, audio and videos.
- Confirm all customer logos, project values, partner claims and technical facts.
- Add final narration files and captions for the first language.
- Run final QA across Presenter, Self-Guided and Auto-Play modes.
- Freeze v1 content manifest.

Deliverable: first production-ready offline interactive presentation.

