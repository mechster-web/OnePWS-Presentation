# OnePWS Navigation Experience System

Date: 2026-08-05

## Audit Findings

The previous navigation worked mechanically: next/previous, keyboard arrows, swipe, hash links, chapter map, presenter mode, autoplay and inactivity recovery were present. The main problems were experiential: navigation felt like slide controls, progress led with slide numbering, the map used section buttons rather than a spatial ecosystem, customer-path IDs contained some stale references, optional branches had no explicit return stack, presenter search did not exist, and temporary presenter routes required source-code changes.

## Philosophy

Navigation now has three layers:

- Immediate navigation: contextual edge zones and compact controls for previous/next movement.
- Journey navigation: a milestone trace showing current route, completed areas, memory moments and remaining duration.
- Experience map: a full-screen spatial ecosystem with zoom levels for zones, chapters and destination previews.

## Journey Types

Supported through `src/config/navigation.ts`:

- Guided journey
- Exploratory journey foundation
- Role-based journeys
- Outcome-based journeys
- Presenter-curated temporary route
- Autoplay journey

## Progress System

The primary progress signal is a restrained architectural route trace. It shows completed destinations, current destination, memory moments and route position without permanently exposing every chapter title.

## Experience Map

The map has three levels:

1. Complete ecosystem: major OnePWS zones.
2. Zone view: chapters inside a selected zone.
3. Destination preview: chapter purpose, duration, scene type and entry action.

Zones include opening, human performance, control room environment, workstations and consoles, design and engineering, evidence and capability, and future vision.

## Branching Model

Optional branches are defined centrally and include parent chapter, destination, return destination, added duration and autoplay behavior. Opening a branch stores a stack entry so returning goes to the correct main-route destination.

## Presenter Navigation

Presenter mode now includes route intelligence, current route position, remaining estimated time, presenter search, temporary route creation, start/reset temporary route, return-to-journey, closing jump, notes, media/audio controls and chapter shortcuts.

## Self-Guided Navigation

Self-guided users get map access, edge navigation, route trace, branch chips and recommendations. Guidance state is stored in session so future prompts can reduce hints after the user demonstrates understanding.

## Autoplay Navigation

Autoplay uses the active navigation route instead of only raw chapter order. It respects temporary route state and active journey state, and can return to the opening at the end of unattended routes.

## Time-Aware Routes

Configured routes include 5-minute overview, 10-minute executive journey, 20-minute focused journey and 30-minute complete experience. These compose chapter IDs without duplicating content.

## Deep Links

Existing hash-based chapter deep links remain stable. Internal opening stages and map zoom levels do not create duplicate chapter definitions or public URLs.

## Completion States

Destinations support available, viewed, explored, completed, skipped and partially explored states. Current implementation marks visited and completed through existing reducer state; presenter skip records skipped chapters.

## Recommendations

Recommendations are deterministic and local: optional branches for the current chapter plus the next unvisited route destination.

## Inactivity

Existing self-guided recovery remains active. Navigation config now centralizes prompt/reset timings for future smooth reset behavior.

## Accessibility

Navigation preserves keyboard, swipe and pointer control. Map entries are buttons with labels, focus states are visible, Escape reveals controls, and map search is keyboard accessible.

## Keyboard Shortcuts

- Right Arrow / Space / PageDown: next
- Left Arrow / PageUp: previous
- `g`: map
- `m`: narration
- `c`: captions
- `p`: play or pause route
- `h`: opening/home
- `End`: closing
- `s`: mark skipped and continue
- `r`: restart current chapter
- Escape: reveal controls / close overlay

## Anti-Patterns

Avoid permanent sidebars, dense chapter lists, generic cards, browser-like arrows, hover-only access, long route animations and presenter actions that delay customer-facing movement.

## Future Guidance

Future prompts should move stale customer-path IDs into the new journey model, add richer route-preview animation, and expand self-guided hint reduction without changing chapter content.
