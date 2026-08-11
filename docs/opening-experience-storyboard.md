# Opening Experience Storyboard

Date: 2026-08-05

Concept: **Before the room responds, it must understand.**

The opening is implemented as an internal six-stage sequence inside `opening-cover`, not as six separate chapters. It preserves existing opening content and leads into the existing journey/chapter system.

## Storyboard

| # | Scene | Purpose | Duration | Visual | Text | Narration | Interaction | Motion family | Transition | Navigation state | Audio state | Presenter behaviour | Self-guided behaviour | Autoplay behaviour | Reduced-motion behaviour | Performance fallback |
|---:|---|---|---:|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | System awakening | Curiosity before full reveal | 12s | Near-black room fragments, line trace, faint media | “Before the room responds...” then “...it must understand.” | Cue 1, optional | Tap, click, Space, ArrowRight; skip after delay | Cinematic reveal + architectural reveal | fade-through-black | hidden-cinematic | Available only after user unlock | Manual advance, skip to journey | Tap/key advance | Advances automatically | Static reveal, no parallax | Still image, low overlay complexity |
| 2 | Human challenge | Connect room to operator pressure | 12s | Operational environment under restrained visual tension | “More information.” “Less time.” “No room for hesitation.” | Cue 2, optional | Explore up to four signals | Operational response | focus-pull | minimal progress visible | Optional | Manual advance; presenter label visible | Signal tap optional | Auto-continues | Sequential opacity reveals | Fewer simultaneous animations |
| 3 | Environment response | First memory moment | 14s | Room shifts from stressed/detailed to calm/wide | “What if the room could respond to the operator?” then “Not as separate products...” | Cue 3, optional | Activate responsive environment | Human focus | aperture-open | minimal | Optional | Presenter can pause before activation | User can activate or advance | Auto-activates then continues | Immediate before/after state | Still image swap, no heavy blur |
| 4 | Connected intelligence | Show environment as ecosystem | 13s | Embedded system nodes over room | Existing connected-environment copy direction | Cue 4, optional | Explore system connections | Data intelligence | data-trace-transition | minimal | Optional | Manual advance, connection exploration optional | Connection exploration optional | Auto-continues | Nodes appear without path animation | Reduced line/overlay count |
| 5 | OnePWS reveal | Earned brand confidence | 11s | Full environment clear, restrained wordmark | “Maximising human potential at work” plus existing capability line | Cue 5, optional | Continue, replay, narration | Cinematic reveal | light-sweep | minimal | Available | Manual advance | Tap/key advance | Auto-continues | Static wordmark reveal | Still frame only |
| 6 | Journey selection | Customer participation | 18s | Environment remains central; choices as perspective destinations | “What would you like this control room to achieve?” | Cue 6, optional | Preview and select journey | Human focus + architectural reveal | spatial-pan | controls restored through scene | Optional | Direct exit to map or next journey | Intentional click/tap required | Can select default complete journey through timer path | Clear selector, no spatial motion | Vertical selector on small screens |

## Timing

- Full opening: approximately 80 seconds including journey selection.
- Condensed opening: approximately 22 seconds via `?opening=condensed`.
- Exhibition mode: ambient activation route via `?opening=exhibition`; shows a restrained “Touch to activate the control room” prompt, then starts the standard sequence.

## Scene Dependencies

- `src/scenes/opening/OpeningExperienceScene.tsx`
- `OpeningDirector.ts`
- `openingConfig.ts`
- `openingNarration.ts`
- `OpeningProgress.tsx`
- Individual opening scene components

## Asset Dependencies

- `opening-control-room-fallback`
- `ambient-control-room`
- `showroom-control-room-detail`
- `showroom-control-room-wide`
- `onepws-wordmark-source`

## Narration Dependencies

- Script timing is stored in `openingNarration.ts`.
- Existing planned audio ID: `opening-voiceover-en`.
- Audio remains optional and requires user unlock where the browser requires it.
- The sequence works without sound through on-screen text and captions.

## Risks

- Opening video asset is referenced but not present.
- No actual opening audio file is present yet.
- Operator-perspective imagery is limited; current opening uses room imagery and abstract signal overlays.
- Browser-level visual inspection should be done on the target showroom display.

## Fallbacks

- Missing media uses `MediaStage` fallback.
- Reduced motion uses fades and static states.
- Reduced performance limits parallax and heavy blur.
- Presenter mode remains manually advanceable and avoids blocking global navigation.
- Journey selection uses existing `SET_CUSTOMER_PATH` and existing chapter sequencing.
