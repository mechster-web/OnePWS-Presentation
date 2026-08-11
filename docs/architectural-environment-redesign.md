# Architectural Environment Redesign

## Journey Objective

Transform architectural systems from interior-product information into a spatial control-room journey. The customer should understand the room as a coordinated operating environment: floor, walls, ceiling, lighting, acoustics, video-wall surroundings, circulation and collaboration all shape operator focus and operational confidence.

## System Grouping

- Spatial foundation: empty shell, operator zone, collaboration zone, circulation.
- Vertical architecture: wall and ceiling systems, cladding intent, video-wall surroundings.
- Environmental systems: lighting, acoustic comfort, material coordination.
- Technical infrastructure: raised access flooring, underfloor services, equipment access.
- Memory moment: exploded room and complete-room transformation.

## RoomExperience Framework

Implemented in `src/scenes/room-experience/`:

- `roomExperienceConfig.ts`: room layer data, claim boundaries, executive route sequence.
- `RoomExperienceScene.tsx`: stage controller for active layer, room state, technical overlay and autoplay layer sequence.
- `RoomExperienceArchetypes.tsx`: modular adapters for panoramic, exploded and spatial scene archetypes.
- `roomNarration.ts`: optional narration cue structure.
- `roomAnalytics.ts`: local development-only event hooks.

## Scene Treatments

- Empty shell: conceptual floor, wall, ceiling, display, operator, collaboration and circulation planes.
- Wall-system scene: wall/ceiling system layer with video-wall framing and material coordination.
- Perforated-panel scene: supported as a future layer detail; no pattern names or performance data added.
- Video-wall integration: display wall is framed spatially and tied to sightlines and room envelope.
- Ceiling treatment: ceiling plane and lighting field reveal the overhead system role.
- Lighting journey: room light field changes through restrained state selection; no lux, circadian or health-performance claims added.
- Flooring treatment: floor plane can be opened conceptually through flooring and underfloor-service modes.
- Underfloor services: service path is shown as a controlled route, not a detailed electrical design.
- Acoustic treatment: acoustic field shows disturbance-to-calm logic without acoustic values.
- Material coordination: warm neutral material field ties room surfaces together without naming unapproved materials.
- Zoning and circulation: operator zone, collaboration zone and circulation path remain visible in the spatial shell.
- Collaboration: supervisor/collaboration layer is included through `supervisor-area`.
- Exploded room: conceptual stepped stack isolates architectural systems.
- Complete-room memory moment: `complete-ecosystem` reassembles room layers as one coordinated environment.

## Narration

Narration remains optional and skippable. The cue structure uses short architectural lines and avoids product lists or unsupported technical claims.

## Presenter Behaviour

Presenter can activate layers, switch room state, open technical detail, build the environment, and move onward without waiting for long animation. The executive route gives a 4-6 minute architectural path.

## Self-Guided Behaviour

Self-guided users can select architectural layers, choose room states, open technical detail and build the completed room. Exploration is optional; autoplay is not blocked by unvisited layers.

## Autoplay

Autoplay advances through room states and the first five architectural layers, then assembles the complete room before exit. It does not stop in an open floor or exploded state.

## Executive Route

`architecture-executive`: `architectural-systems` -> `complete-ecosystem` -> `console-portfolio` -> `why-onepws`, estimated 4-6 minutes.

## Reduced Motion

Reduced motion uses static layer switching and quick opacity changes. Spatial logic is preserved without camera movement, parallax or complex animation.

## Accessibility

Layer buttons and room state buttons are keyboard accessible, use `aria-pressed`, and have accessible labels. Technical overlays provide text equivalents for visual layer states.

## Performance Fallback

The room journey is CSS-based and avoids heavy 3D, external assets, particles and large blur stacks. Reduced-performance mode disables complex movement through existing performance and reduced-motion hooks.

## Claims

All technical values remain pending engineering review. No acoustic rating, fire rating, load rating, floor-height range, material specification, lighting value, standard or certification was added.

## Asset Requirements

Future refinement needs approved empty-room, completed-room, wall layer, reflected ceiling plan, floor cutaway, acoustic detail, material close-up, plan view, section view and maintenance/service-access imagery.

## Risks

- Current visuals are conceptual CSS layers, not approved construction details.
- Dedicated architectural product chapters do not exist yet.
- Claims must remain qualitative until specifications are supplied.
- Real visual peak quality depends on future approved room assets.
