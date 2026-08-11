# Archetype Selection Guide

Date: 2026-08-05

## Decision Framework

Choose an archetype by starting with chapter purpose, not by starting with layout.

| Question | Direction |
|---|---|
| Is the chapter creating a major emotional reset? | Use `cinematic-opening`, `chapter-title` or `cinematic-closing`. |
| Should the customer feel inside a room? | Use `immersive-environment` or `panoramic-room`. |
| Is one product the hero? | Use `product-hero`; use `product-exploded-view` only when construction or integration is the story. |
| Is the human operator the centre of the story? | Use `operator-perspective`, `problem-solution` or `before-after`. |
| Is the content about connected systems? | Use `system-connection` or `feature-orbit`. |
| Is the content proof or measurement? | Use `data-story` for one insight; use `evidence-proof` for credibility layers. |
| Is the chapter a workflow? | Use `process-sequence`. |
| Is the customer deciding a route or depth? | Use `customer-choice`. |
| Does narration guide the timing? | Use `voice-guided`, while keeping the scene complete without audio. |

## Inputs To Check

- Audience: operations leaders need outcomes and risk framing; architects need spatial logic; technology leaders need system connection; senior management needs proof and decision confidence.
- Emotional goal: curiosity, calm confidence, urgency, proof, participation or closure.
- Information density: keep dense chapters progressive; never remove source content.
- Media availability: full-bleed scenes need strong approved media; product scenes need dominant product visuals or documented placeholders.
- Interaction potential: only add interaction where it helps discovery, control or presenter pacing.
- Duration: short titles and resets should not hold the presenter; memory moments can hold longer but must be skippable.
- Narration: optional and caption-backed.
- Memory moment: reserve for opening, ecosystem, incident response, project proof and closing.
- Presenter requirements: every archetype supports skip, final state and next destination.

## Migration Guidance

Promote a chapter to `redesignStatus: "redesigned"` only after the chosen archetype has been verified with the real chapter content, media, captions, narration and presenter notes. Keep `enableLegacyFallback` enabled until every customer-facing chapter has been migrated intentionally.
