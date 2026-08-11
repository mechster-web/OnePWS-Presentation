# Human-Performance Redesign

Date: 2026-08-05

## Story Objective

The human-performance chapter group reframes control-room design around the operator. The customer experiences how pressure accumulates, how geometry affects repeated effort, how visibility changes situational awareness, and how the room can align as one coordinated environment.

No medical outcomes, injury-prevention promises or invented ergonomic dimensions were added.

## Chapter Sequence

1. `mission-control-definition` - the operator is the centre of the decision environment.
2. `operator-challenges` - pressure accumulates through multiple small factors.
3. `poor-design-risk` - poor sightlines and planning expose avoidable effort.
4. `sightline-comfort` - reach zones, sightlines and comfort become visual and interactive.
5. `ergonomic-methodology` - repeated effort is handled through study, ISO 11064 methodology and validation.
6. `human-centred-philosophy` - memory moment: align the room around the operator.
7. `incident-response` - collaboration under pressure remains conceptual and controlled.

## Operator Profile Framework

Implemented in `src/scenes/human-performance/humanPerformanceConfig.ts`.

Profiles are synthetic and store no personal data. Fields include role, shift type, task type, work duration, displays, collaboration need, control intensity, posture preference, reach profile, environmental conditions, accessibility needs and scenario objective.

Current profiles:

- Process operator
- Supervisor

## Scene Designs

- Operator-centred introduction: abstracted field of work with displays, desk, operator position and sightline.
- Pressure accumulation: selectable pressure factors, capped at three active factors for clarity.
- Reach and movement: qualitative comfortable/extended reach zones, seated/standing toggle.
- Sightline and visibility: conceptual sightline field and before/after response.
- Fatigue over time: shift/study stages through existing beats and technical layers.
- Collaboration under pressure: calm transition from individual focus to shared response.
- Human transformation: coordinated response path for desk, display, lighting, acoustic focus and collaboration.

## Interaction Model

Self-guided users can select factors, toggle posture, reveal technical detail, activate response and reset. Presenter mode can use the same controls quickly, skip to the response state, or keep the technical layer hidden. Autoplay introduces factors sequentially and activates the response without waiting for manual completion.

## Narration Approach

Optional narration cues are stored in `src/scenes/human-performance/humanPerformanceNarration.ts`. Scripts are short, caption-compatible and skippable. They use careful language such as "pressure often builds" and "support awareness" rather than claims of prevention, cure or guaranteed performance.

## Technical Detail Layers

Layer 1 keeps the main story visible. Layer 2 is the interactive factor/response layer. Layer 3 is an explicit technical detail layer that preserves `technicalLayers`, presenter notes, profile accessibility considerations and claim boundaries.

## Standards Treatment

`ISO 11064` is preserved exactly where it appears in approved chapter content. The redesign treats it as methodology/guidance content unless certification scope is separately confirmed. Standards appear in optional technical detail, not as the main emotional story.

## Presenter Behaviour

Presenter can show challenge, activate response, reveal/hide technical detail, reset the scene, compare seated/standing where relevant, and move forward without waiting for animation. The controls are customer-safe but concise; presenter notes remain in the existing presenter systems.

## Autoplay And Condensed Route

Autoplay triggers up to three pressure factors, pauses briefly, activates the response and continues. A new `human-performance-executive` journey supports a 2-4 minute route:

`operator-challenges` -> `sightline-comfort` -> `human-centred-philosophy` -> `why-onepws`

## Reduced Motion And Performance

Reduced motion uses stepped reveals, static overlays and short fades. Reduced performance keeps still abstract geometry, avoids heavy blur and limits simultaneous movement while preserving all interactions and content access.

## Accessibility

All factor controls are buttons, focusable by keyboard and touch. Drag is not required. State is described in text and not only by colour. Technical diagrams use visible labels such as comfortable reach, extended reach, conceptual sightline, lighting balance and acoustic focus.

## Claim Boundaries

- No medical diagnosis.
- No injury-prevention claim.
- No unsupported fatigue score.
- No invented reach dimensions.
- No unsupported response-time improvement.
- No unconfirmed AI, SCADA or SOP integration claim.

## Asset Requirements

Approved operator-view, over-shoulder, workstation and matched before/after imagery would improve the final visual quality. The current implementation uses abstracted architectural diagrams rather than unrelated stock photography.

## Remaining Risks

The abstract stage is intentionally conservative. Future visual migration should replace derived geometry with approved OnePWS imagery or renders, then validate crop, contrast, captions and touch targets.
