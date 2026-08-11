# OnePWS Cinematic Design System

Date: 2026-08-05

## Visual Philosophy

The presentation should feel like a premium control room interior: precise, engineered, spatial, layered, calm, intelligent and purposeful. Cinematic behavior is restrained: slow media movement, controlled depth, intentional light, large moments of stillness and selective surprise. Technology is always tied back to operator focus, situational awareness, ergonomics, collaboration, response quality and operational confidence.

## Colour System

The core palette uses near-black graphite, charcoal, dark metallic surfaces, warm white text, cool white text and selective OnePWS red. Red is reserved for active navigation, key interactions, system connections, important highlights and memory moments. Supporting status colours are operational green, information blue and alert red.

Scene variants:

- `cinematic-dark`
- `architectural-light`
- `operational-dark`
- `product-light`
- `data-dark`
- `immersive-neutral`
- `alert-state`
- `calm-state`

Tokens live in `src/styles/global.css` as CSS variables and in `src/design-system/tokens.ts`.

## Typography

The system uses the existing offline-safe system stack. Hierarchy includes display headline, chapter title, section title, product title, supporting title, body copy, narrative copy, technical label, caption, navigation label, statistic, data label, presenter note and hotspot label.

Large text uses careful `clamp()` sizing and slight negative tracking only for display scale. Uppercase is reserved for eyebrows, technical labels, small navigation indicators and selected statuses.

## Layout Grid

Reusable primitives live in `src/design-system/components/ScenePrimitives.tsx`:

- `SceneCanvas`
- `SafeArea`
- `CinematicGrid`
- `NarrativePanel`
- `AmbientLayer`
- `StructuralLayer`
- `FocusLayer`
- `InteractionLayer`
- `CaptionLayer`

These support full-bleed media, split screen, asymmetric editorial layout, floating panels, product staging, panoramic scenes, layered depth, process rails, immersive hotspots and data overlays.

## Depth Model

Each redesigned scene is composed in this order:

1. Base background
2. Environmental media
3. Atmospheric treatment
4. Structural graphics
5. Main subject
6. Narrative content
7. Interactive elements
8. Navigation and controls

Available subtle depth effects include vignette, grain, linework, data traces, bloom, focus masks and structural guide lines. Do not apply all effects to one scene.

## Media Treatments

`MediaStage` supports full-bleed media, darkened media, edge fade, masked reveal, slow zoom, controlled parallax, depth blur, foreground isolation, pan movement and product/detail crops. Motion is slow and disabled or reduced when reduced-motion or reduced performance is active.

## Motion Families

Defined in `src/design-system/motionLanguage.ts`:

- `architectural-reveal`: directional, clipped, structured.
- `cinematic-reveal`: atmospheric, slow, depth-based.
- `operational-response`: fast, refined, status-aware.
- `human-focus`: soft, calm, comfort-oriented.
- `product-precision`: mechanical, detailed, exact.
- `data-intelligence`: traced paths, nodes and progressive disclosure.

Durations: instant, fast, normal, deliberate, cinematic and ambient.

## Transition Families

Supported transitions include `fade-through-black`, `fade-through-light`, `depth-push`, `lateral-architectural-wipe`, `vertical-structural-reveal`, `aperture-open`, `focus-pull`, `media-match-cut`, `data-trace-transition`, `light-sweep`, `spatial-pan`, `object-led-transition`, `split-panel-transition`, `blur-resolve` and `controlled-hard-cut`.

Presenter mode uses shorter transitions. Reduced-motion mode falls back to simple opacity or near-instant movement.

## Micro-Interactions

Reusable interaction components:

- `PrecisionButton`
- `HotspotCallout`
- `InteractionCue`
- `AudioPulse`

Interactions should feel precise and grounded. Avoid bounce, decorative cursor effects, generic hover tricks and hover-only controls.

## Navigation States

Chapter metadata can select:

- `visible`
- `minimal`
- `hidden-cinematic`

Navigation should recede during immersive scenes and return quickly for presenter control.

## Audio States

`AudioPulse` supports narration available, playing, paused, loading, completed, captions active, voice-guided and unavailable. It is intentionally minimal and does not resemble a music player.

## Memory Moments

`MemoryMoment` supports controlled visual takeover, intro timing, optional interaction lock, presenter override affordance and reduced-motion fallback. Use it for selected peaks only.

## Performance Modes

Modes are `premium`, `balanced` and `reduced`. `usePerformanceMode` detects reduced motion, device memory and hardware concurrency, with a localStorage override. Reduced mode minimizes blur, parallax and complex movement while preserving readability and interaction.

## Accessibility Rules

- Preserve keyboard navigation and visible focus.
- Do not rely on colour alone for status.
- Respect reduced motion.
- Keep captions and narration controls reachable.
- Maintain touch targets.
- Avoid text over busy imagery without media overlays.
- Keep presenter navigation responsive.

## Usage Examples

Use `SceneCanvas` with a theme, add `MediaStage`, choose one or two atmospheric layers, place copy in `NarrativePanel`, and put interactions in `InteractionLayer`. Select a motion family based on scene purpose rather than reusing the same reveal everywhere.

## Anti-Patterns

- Generic dashboards or SaaS cards
- Repetitive centred text blocks
- Uncontrolled gradients
- Fake HUD graphics
- Excessive glass effects
- Neon decoration
- Constant particles
- Motion that delays presenter control
- Image crops that hide the subject

## Future Chapter Guidance

Promote one chapter at a time to `redesignStatus: "redesigned"`. Keep copy in chapter content, use metadata for theme/transition/navigation, and create a dedicated scene component if the archetype needs different interaction behavior.
