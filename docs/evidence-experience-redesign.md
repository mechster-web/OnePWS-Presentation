# Evidence Experience Redesign

## Journey Objective

Make credibility answer customer-risk questions instead of pausing for a company profile.

## Customer-Trust Structure

1. Can OnePWS deliver this?
2. Can it design and engineer accurately?
3. Can it manufacture consistently?
4. Can it control quality?
5. What independent evidence exists?
6. Has it delivered relevant projects?
7. What happens after installation?
8. Why should the customer trust OnePWS?

## EvidenceExperience Framework

Implemented in `src/scenes/evidence-experience/`:

- `evidenceExperienceConfig.ts`: proof items, trust states, source access and executive route.
- `EvidenceExperienceScene.tsx`: relevance/evidence/verification stage, proof selector and source viewer.
- `EvidenceExperienceArchetypes.tsx`: evidence-aware adapters with fallback to existing human, room and operations adapters.
- `evidenceValidation.ts`: development validator for missing sources and trust violations.
- `evidenceAnalytics.ts`: local non-personal event hooks.
- `evidenceNarration.ts`: optional proof narration cues.

## Proof Hierarchy

- Layer 1: customer relevance.
- Layer 2: evidence.
- Layer 3: verification.

Only one layer is foregrounded at a time.

## Treatments

- Company introduction: concise current-credential proof, no long history block.
- Manufacturing: process/quality proof connected to repeatable delivery.
- Engineering: requirement-to-handoff process.
- R&D: supported only through patents-applied and innovation references; no fabricated prototypes.
- Quality: management-system and quality references, no zero-defect claim.
- Certification: exact names visible where sourced; scope and validity gaps documented.
- Standards: only sourced management-system and ergonomic references remain.
- Patent: “15 patents applied” only; no granted-patent claim added.
- Awards: listed in claim register; not migrated as a customer-facing wall.
- Project map: featured project proof and location list, no decorative world map.
- Sector: curated customer presence; logo wall remains presenter/review restricted.
- Case study: project records support situation/evidence/source fields but no fabricated outcomes.
- Installation/service: delivery methodology and traceability references support lifecycle discussion.
- Source viewer: shows source document, page, trust state, access and restrictions.

## Trust-State Model

States: `verified`, `approved`, `approved-anonymised`, `pending-review`, `expired`, `historical`, `confidential`, `conceptual`, `unavailable`.

Pending-review and confidential evidence is not exposed as ordinary customer proof.

## Redaction

No original assets are modified. Redaction needs are documented in `docs/evidence-redaction-register.md`.

## Presenter / Self-Guided / Autoplay

Presenter can select proof, open source, and show verification. Self-guided mode sees customer-safe proof first. Autoplay cycles through the strongest visible proof and avoids opening every document.

## Accessibility / Performance / Reduced Motion

Proof items are keyboard buttons, source viewer has a dialog label, maps have text fallback, and reduced motion uses static state switching. No heavy map or document rendering dependency was added.

## Risks

- Certificate documents and validity/scope are not present.
- Customer logo permissions require confirmation.
- Some project values are marked non-public and stay presenter-only.
- Case-study outcomes remain unavailable for most projects.
