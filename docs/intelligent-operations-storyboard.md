# Intelligent Operations Storyboard

| Chapter ID | Existing Title | System | Original Content Retained | Scene Archetype | Main View | Main Message | Interaction | Technical Detail | Narration | Motion | Transition | Presenter Action | Self-Guided Behaviour | Autoplay Timing | Reduced Motion | Asset Dependency | Validation Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `intelligent-features` | Intelligent Features | AI assistant, OAMS, voice, display, lighting, supervisor and workstation support | Yes | `feature-orbit` with operations adapter | Calm operations room with connected capability layer | Intelligence supports. The operator decides. | Select capability, confirm next action, open integration boundary. | Feature story details plus confirmation boundary. | Optional text cues only. | Data-intelligence and operational-response restraint. | `data-scan` in/out. | Jump to capability, show boundary, route to incident. | Explore any capability; no required sequence. | 50s capability cycle. | Static state switching. | Needs approved UI/device imagery; no fake screenshots used. | Typecheck passed; build pending. |
| `incident-response` | When Every Second Matters. | Conceptual incident response and collaboration workflow | Yes | `voice-guided` with operations adapter | Event signal, operator zone, video wall, supervisor and collaboration zones | The room supports the response. The operator remains accountable. | Select step, confirm action, inspect boundary, reset to normal. | Incident disclaimer plus chapter technical layers. | Optional text cues only. | Controlled event emphasis, signal path, decision rail. | `blackout-reset` in, `quiet-fade` out. | Manual step, reveal all, confirm, reset. | Step through timeline; can continue at any point. | 68s incident sequence. | Static step reveal. | Needs approved incident UI if future detail is required. | Typecheck passed; build pending. |

## Full Intelligent Sequence

1. Normal operations.
2. Neutral event appears.
3. Supporting signals remain secondary.
4. Relevant context is prioritised.
5. AI/support layer recommends.
6. Operator confirms.
7. Display, lighting and collaboration support response.
8. Event is acknowledged and resolved.
9. Summary is prepared for review.

## Dependencies

- Feature data: `featureStories.ts`, `connectedIntelligenceFeatures.ts`.
- Timeline data: `incidentSimulation.ts`.
- Voiceover metadata: `voiceovers.ts`.
- Scene framework: `src/scenes/intelligent-operations/`.
