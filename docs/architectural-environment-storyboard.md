# Architectural Environment Storyboard

| Chapter ID | Existing Title | System | Original Content Retained | Scene Archetype | Main Room View | Main Message | Interaction | Technical Detail | Narration | Motion | Transition | Presenter Action | Self-Guided Behaviour | Autoplay Timing | Reduced Motion | Asset Dependency | Validation Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `architectural-systems` | Architectural and Environmental Systems | Wall, ceiling, lighting, raised floor, acoustic, material and video-wall surroundings | Yes | `product-exploded-view` with `RoomExplodedArchetype` | Empty shell and layer-isolated perspective | The room envelope is operational infrastructure. | Activate architectural layers, switch room states, open technical detail, build environment. | Chapter technical layers plus claim boundary and related feature technical detail. | Optional cue structure only. | Architectural reveal, layer isolation, restrained light field. | `layer-reveal` in, `spatial-dolly` out. | Show empty shell, activate layer, open technical, build room. | Explore any layer; no required completion. | 48s: shell, technical envelope, layer sequence, environmental calm. | Static layer selection and opacity reveal. | Needs approved wall, ceiling, floor, acoustic and material detail assets. | Typecheck passed; build pending. |
| `complete-ecosystem` | One Environment. Connected Intelligence. | Complete room environment | Yes | `panoramic-room` with `RoomPanoramicArchetype` | Complete-room perspective with exploded option | The environment is explored as one connected room. | Layer isolate, explode room, reassemble complete environment. | Room architecture, service access, claim boundary. | Optional cue structure only. | Cinematic room assembly and complete-room memory moment. | `spatial-dolly` in, `layer-reveal` out. | Build environment, show technical, jump to console context. | Explore hotspots or continue. | 58s: shell, exploded layers, complete environment. | Stepped reveal and static assembled state. | Needs transparent layer assets and approved completed-room visual. | Typecheck passed; build pending. |

## Executive Architectural Timing

- `architectural-systems`: 90-120s.
- `complete-ecosystem`: 120-150s.
- `console-portfolio`: 60-90s contextual link.
- `why-onepws`: 60-90s close of route.

## Branch Behaviour

- `architecture-room-envelope`: architectural systems to complete ecosystem, returns to complete ecosystem.
- `architecture-product-context`: complete ecosystem to console portfolio, returns to why OnePWS.

## Dependencies

- Source data: `chapters.ts`, `connectedIntelligenceFeatures.ts`.
- Visual assets: local room placeholders only; detailed architectural assets required.
- Narration: text cue structure; no audio generation or new audio dependency.
