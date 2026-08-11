# OnePWS Scene Archetype Library

Date: 2026-08-05

## Purpose

The scene-archetype library turns OnePWS chapters into deliberately different full-screen presentation experiences while preserving shared behaviour, accessibility, presenter control, autoplay readiness, reduced-motion support and legacy fallback.

The library is implemented through:

- `src/experience/archetypes/types.ts` for the typed `SceneArchetype` contract.
- `src/experience/archetypes/archetypeLibrary.ts` for archetype metadata, variants and behaviour rules.
- `src/experience/archetypes/components/ArchetypeRuntime.tsx` for lifecycle, interaction completion, narration/caption affordances, performance mode and validation.
- `src/experience/archetypes/ArchetypeScenes.tsx` for modular archetype components.
- `src/experience/archetypes/archetypeValidation.ts` for development warnings.
- `/dev/design-system` for the internal archetype gallery.

## Shared Contract

Every archetype declares id, name, purpose, supported content/media/interaction types, default and supported themes, motion family, transition families, navigation state, density and interaction ranges, duration range, audience fit, presentation-mode support, narration/hotspot/autoplay/touch/keyboard/reduced-motion support, memory-moment support, required fields, optional fields, fallback behaviour, validation rules, variants and differentiation metadata.

## Archetypes

| Archetype | Purpose | Best use | Poor use | Navigation | Motion | Key variants |
|---|---|---|---|---|---|---|
| cinematic-opening | Major opening, reset or memory moment | Opening, brand reveal, chapter reset | Dense body copy or feature list | hidden-cinematic | cinematic-reveal | system awakening, brand reveal, chapter reset |
| chapter-title | Section rhythm reset | New section or proof point | Repeated title slide | minimal | architectural-reveal | geometry title, media strip, marker |
| immersive-environment | Make the room feel present | Full-room environments | Long text panels over imagery | minimal | cinematic-reveal | full-room, zone focus, ambient loop |
| product-hero | Make a product dominant | Consoles, chairs, arms, major systems | Generic product card layout | visible | product-precision | dark spotlight, light studio, material detail |
| product-exploded-view | Explain construction or integration | Assembly, service access, room layers | Fake engineering geometry | visible | product-precision | conceptual layers, assembly steps |
| interactive-hotspot | Explore focused features | Product/environment details | Too many simultaneous hotspots | visible | architectural-reveal | product detail, room systems, operator impact |
| operator-perspective | Human-centred operating scenario | Fatigue, reach, sightlines, response | Gamified disaster scenario | minimal | human-focus | focus narrowing, comfort change |
| problem-solution | Transform challenge into response | Risk-to-solution stories | Static two-column problem/solution | visible | operational-response | constraint collapse, fragment alignment |
| before-after | Visual comparison | Design transformation | Unrelated images as exact comparison | visible | architectural-reveal | drag divider, tap toggle |
| system-connection | Show connected room ecosystem | Console, displays, lighting, OAMS, AI | Generic node diagram | visible | data-intelligence | room ecosystem, service path |
| data-story | One progressive evidence insight | KPI, timeline, measurement | Dashboard or invented metric | visible | data-intelligence | single metric, chart, timeline |
| feature-orbit | Focus features around a core subject | Product layers or benefits | Weak central subject | visible | product-precision | operator features, room capabilities |
| spatial-journey | Move through zones or projects | Room zones, project proof | Free roaming without orientation | minimal | cinematic-reveal | room zones, guided path |
| process-sequence | Explain workflow one stage at a time | Delivery, study, response process | Row of numbered boxes | visible | architectural-reveal | delivery path, lifecycle |
| comparison | Compare options or attributes | Configurations, approaches | Spreadsheet as primary visual | visible | architectural-reveal | visual switch, attribute spotlight |
| evidence-proof | Present credibility | Certifications, projects, quality | Wall of tiny logos | visible | data-intelligence | proof theme, verification layer |
| customer-choice | Intentional decision point | Journey, role, outcome selection | Hover-triggered navigation | minimal | architectural-reveal | spatial destinations, role choice |
| voice-guided | Optional narration-led scene | Scenario guidance | Audio-only communication | minimal | human-focus | caption-led, voice checkpoints |
| panoramic-room | Wide room-scale storytelling | Environment zones | Endless horizontal scroll | minimal | cinematic-reveal | wide room, zone-by-zone |
| cinematic-closing | Confident conclusion | Journey close or ambient loop | Dense thank-you/contact slide | minimal | cinematic-reveal | final hold, discussion pause |

## Behaviour Rules

- Presenter mode can advance internal sequences, skip animation, jump to final state and continue immediately.
- Autoplay uses configured duration, auto-completes optional interactions and fails forward on missing media.
- Reduced motion replaces spatial movement with fades, stepped states or static highlighted end states.
- Responsive behaviour remains scene-based: small/portrait views use anchored selectors, zone focus and static arrangements rather than long webpages.
- Accessibility requires keyboard operation, visible focus, touch targets, captions, alternatives to drag/hover and logical focus order.
- Performance modes reduce depth, blur, parallax and simultaneous animation while preserving composition.

## Validation

Development validation warns about missing required fields, density mismatch, interaction mismatch, duration mismatch and archetype-specific risks such as product hero without dominant media, hotspot overpopulation, before-after without two states, data story without context, process sequence without stage order, customer choice without confirmation, voice-guided scenes without silent fallback and closing scenes without next action.

## Anti-Patterns

- One universal scene component with dozens of conditionals.
- Copying the same left/right image-text composition into every archetype.
- Generic card grids as the primary spatial system.
- Unsupported metrics, claims, fake integrations or fake 3D.
- Permanent heavy motion, neon effects, fake HUD decoration or inaccessible hover-only interactions.
