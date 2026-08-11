# Motion System

The presentation motion language is inspired by physical control-room systems: displays activate, architectural lighting shifts, room layers assemble, information resolves into focus and the camera moves calmly through space.

Motion should support comprehension. It must never delay access to the message.

## Principles

1. **System movement, not slide movement**  
   Transitions should feel like moving through zones of a control room, not flipping PowerPoint slides.

2. **Activation before decoration**  
   Use motion for display activation, lighting state changes, layer assembly, focus shifts and panel reveal.

3. **Calm mechanical precision**  
   Movement should be deliberate, short and damped. Avoid random zooming, bouncing, gaming effects and continuous decorative motion.

4. **Information remains stable**  
   Headlines and important text should mostly fade or resolve into focus. Avoid excessive flying text.

5. **State changes are visible**  
   Incident mode, selected hotspots, project detail changes and concept selections should transition through opacity, scale, line activation or controlled lighting shifts.

## Durations

Use the shared values in `src/motion/motionSystem.ts`.

| Token | Duration | Use |
| --- | ---: | --- |
| `micro` | 160ms | Button hover, tiny UI response |
| `control` | 240ms | Hotspot label, small panel state |
| `focus` | 420ms | Information focusing, selected panel reveal |
| `layer` | 620ms | Display activation, layer assembly |
| `spatial` | 900ms | Chapter-zone movement, room focus |
| `environmental` | 1200ms | Lighting and room-state changes |

## Easing

| Token | Curve | Use |
| --- | --- | --- |
| `system` | `[0.22, 1, 0.36, 1]` | General premium UI movement |
| `mechanical` | `[0.16, 1, 0.3, 1]` | Layer assembly and controlled spatial movement |
| `lighting` | `[0.33, 1, 0.68, 1]` | Display activation and environmental shifts |
| `linear` | `linear` | Progress bars only |

## Hierarchy

Primary spatial transitions:
- Chapter changes
- Room focus shifts
- Feature-story open/close

Secondary system transitions:
- Display activation
- Video-wall state changes
- Incident zones
- Console layer assembly

Tertiary UI transitions:
- Hotspot labels
- Drawers
- Filters
- Presenter controls

Text transitions:
- Eyebrows and support copy may rise 6-8px.
- Headlines should primarily fade/focus, not travel.
- Avoid staggered text cascades longer than 300ms total.

## Patterns

Display activation:
- Start low opacity.
- Scale or reveal on one axis only when useful.
- Resolve within `layer` duration.

Architectural-light transition:
- Use opacity or color intensity.
- Use `environmental` duration.
- Do not pulse continuously unless representing a temporary incident state.

Layer assembly:
- Use `scaleX`, `scaleY`, opacity or small `y` offsets.
- Movement should settle into a stable assembled state.

Camera movement through spaces:
- Use small scale changes only, normally under 1.015.
- Use small x/y shifts, normally under 8px.
- Avoid random zooming.

Information focusing:
- Use opacity plus light blur-to-clear.
- Keep blur below 4px.
- Use for chapter transitions and major headline reveals.

System-state changes:
- Incident, selected feature and active project states should change through controlled highlighting, not neon glow.

## Reduced Motion

When reduced motion is active:
- Durations collapse to `0.01s`.
- Spatial offsets are removed.
- Continuous or repeated movement is disabled.
- State changes still occur through near-instant opacity/color changes.
- Content remains fully accessible.

## Performance

Preferred animated properties:
- `opacity`
- `transform`
- `filter` only for short, low-radius focus transitions

Avoid animating:
- Large layout dimensions where transform can work
- Box-shadow intensity on large elements
- Continuous background-position movement
- Complex clip paths in repeated loops

Continuous animation policy:
- No decorative infinite loops.
- Infinite motion is allowed only for explicit media/progress/temporary simulation states.
- Prefer state-based transitions that settle.

## Current Implementation Notes

Shared motion tokens live in:

```text
src/motion/motionSystem.ts
```

Updated patterns include:
- Chapter transitions now use information focus instead of generic slide movement.
- Opening chapter uses display activation and architectural line reveal.
- Connected-room focus uses small spatial movement and settled state changes.
- Feature stories use layer assembly rather than decorative looping.
- Incident simulation uses system-state transitions for video wall, lighting and zones.
- Project browser panels activate as proof surfaces instead of continuously shimmering.
