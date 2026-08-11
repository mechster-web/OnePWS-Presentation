# Intelligent Operations Redesign

## Objective

Turn intelligent features from a list of software/product ideas into a spatial operational story: normal state, event, prioritisation, recommendation, operator confirmation, coordinated room response, collaboration, resolution and review.

## Human-In-The-Loop Principle

Global rule: **Intelligence supports. The operator decides.**

Each migrated scene distinguishes:

- System observation.
- System recommendation.
- Operator confirmation.
- Operator action.
- System response.
- Recorded outcome.

## Framework

Implemented in `src/scenes/intelligent-operations/`:

- `intelligentOperationsConfig.ts`: scenarios, capabilities, human-loop stages, claim boundaries and executive route.
- `IntelligentOperationsScene.tsx`: stage controller for active capability, incident step, technical boundary and operator confirmation.
- `IntelligentOperationsArchetypes.tsx`: operations-aware archetype adapters with legacy fallback.
- `intelligentOperationsNarration.ts`: optional narration cue structure.
- `intelligentOperationsAnalytics.ts`: local non-personal event hooks.

## Scene Treatments

- Normal operations: calm control-room state with restrained information flow.
- Event detection: one neutral event source, no fake operational data.
- Alert prioritisation: information is organised conceptually without confidence scores or invented severity values.
- AI assistant: shown as contextual support beside the relevant object, not an unrestricted chat surface.
- Voice control: simulated command preview only; no microphone capture or external audio processing.
- OAMS/operator assistance: shown as an operator-support layer with privacy and sensor boundaries.
- Connected workstation: desk, displays, environment and supervisor layer connect with purpose.
- Display orchestration: relevant context can move to shared display scale, with SCADA/controller scope marked as confirmation required.
- Environmental response: lighting/room state supports attention without flashing, alarms or theatrical effects.
- Collaboration workflow: supervisor and collaboration zones activate while operator accountability remains visible.
- Insight summary: event trail is shown as review-ready only where reporting scope is approved.

## Presenter Behaviour

Presenter can jump to a capability, step through incident states, confirm action, open integration boundary, reset to normal, and continue without waiting for long animation.

## Self-Guided Behaviour

Self-guided users can inspect one capability or incident step, confirm the next action, view claim boundaries and continue without exploring every feature.

## Autoplay

Autoplay cycles through selected capabilities and incident states, automatically sets confirmation partway through the sequence and returns to stable flow. It never traps the app at a pending confirmation.

## Executive Route

`intelligent-operations-executive`: `intelligent-features` -> `incident-response` -> `complete-ecosystem` -> `why-onepws`, estimated 5-7 minutes.

## Reduced Motion

Reduced motion preserves spatial order with static state switching, short fades and no signal movement dependence.

## Accessibility

Capabilities and timeline steps are keyboard-accessible buttons with `aria-pressed`. Visual status has text equivalents in the recommendation, decision rail and technical boundary.

## Performance Fallback

The scene uses CSS linework and lightweight transforms. No external data streams, no canvas-heavy effects, no live video dependency and no third-party tracking.

## Claims

No new AI capability, autonomous action, predictive analytics, API, external integration, response-time improvement, accuracy score, cybersecurity claim or software screenshot was added.
