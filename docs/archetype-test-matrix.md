# Archetype Test Matrix

Date: 2026-08-05

All archetypes are previewable through `/dev/design-system` in development only. The gallery supports archetype selection, theme switching, presenter/self-guided/autoplay mode preview, reduced motion, narration/captions, performance modes, missing media simulation, long text simulation, small viewport simulation, restart and validation warning inspection.

| Archetype | Presenter | Self-guided | Autoplay | Reduced motion | Premium/reduced performance | Keyboard | Touch | Offline/missing media | Long content | Small viewport |
|---|---|---|---|---|---|---|---|---|---|---|
| cinematic-opening | Opening director advance/skip | Continue/skip | Timed sequence | Immediate reveal | Existing opening fallbacks | Space/arrows | Tap | Fallback image | Minimal copy rule | Condensed flow |
| chapter-title | Skip title | Continue | Short timed hold | Fade/marker | Structural only | Buttons | Tap | No-media layout | Section preview only | Center marker |
| immersive-environment | Advance zones | Explore zones | Auto-complete | Static room | Reduced parallax | Hotspot buttons | Tap | Media fallback | Minimal text | Lower rail |
| product-hero | Reveal/final state | Feature select | Auto-cycle | Static callouts | Product silhouette fallback | Feature buttons | Tap | Derived product silhouette | Detail rail | Product above/rail below |
| product-exploded-view | Assembled/exploded | Step layers | Auto step | Static layers | No blur/parallax | Layer buttons | Tap | Conceptual labelled layers | Right rail scroll-safe | Step focus |
| interactive-hotspot | Jump detail | Hotspot explore | Auto explore first | Static markers | Limited overlays | Hotspot tab order | Tap targets | Branded fallback | Detail panel | Anchored panel |
| operator-perspective | Scenario skip | Step pressure | Timed beats | Fade states | No focus drift | Beat rail | Tap | Structural field | Concise scenario | Copy first |
| problem-solution | Jump response | Activate stages | Auto resolve | State toggle | Reduced layers | Step controls | Tap | Derived transform | Dense copy retained | Vertical transform |
| before-after | Final state | Toggle/drag alternative | Auto toggle | Static toggle | No sweep | Toggle button | Tap | Labelled concept | Copy side rail | Single comparison field |
| system-connection | Reveal all | Select node | Auto trace | Highlight final path | Fewer traces | Node buttons | Tap | Derived nodes | Outcome rail | Sequential nodes |
| data-story | Jump insight | Step insight | Auto reveal | Static highlight | Fewer lines | Insight buttons | Tap | No media required | Progressive rail | One-column insights |
| feature-orbit | Jump feature | Select feature | Auto cycle | Static list/orbit | No continuous motion | Node buttons | Tap | Derived central subject | Feature focus | List fallback |
| spatial-journey | Jump zone | Select destination | Guided path | Zone switch | Still overview | Destination buttons | Tap | Derived route | Preview only | Horizontal selector |
| process-sequence | Jump stage | Advance/select | Auto stages | Static stage | Simple stage theatre | Step buttons | Tap | No media required | One stage active | Step focus |
| comparison | Criteria jump | Select criteria | Auto compare | Static switch | Minimal layers | Criteria buttons | Tap | Derived criteria | Summary retained | Stacked criteria |
| evidence-proof | Open proof | Explore proof | Auto first proof | Static reveal | Reduced traces | Proof buttons | Tap | No media required | Progressive detail | Proof list |
| customer-choice | Confirm route | Preview/confirm | Default route | Static destinations | No spatial drift | Choice buttons | Tap | Derived environment | One-line outcomes | Anchored selector |
| voice-guided | Play/skip | Optional audio | Narration-aware timing | Captions-first | Still image | Beat/audio controls | Tap | Silent fallback | Caption rail | Copy/caption focus |
| panoramic-room | Jump zone | Zone select | Guided pan | Zone switch | Still panorama | Zone buttons | Tap | Media fallback | Minimal overlay | Zone-by-zone |
| cinematic-closing | Replay/map/next | Replay/continue | Loop or default route | Static final hold | Low layers | Action buttons | Tap | Fallback image | Secondary contact only | Center close |

## Current Validation Result

`npm run typecheck` passed after the archetype library integration. Production build and smoke checks should be rerun after every chapter migration.
