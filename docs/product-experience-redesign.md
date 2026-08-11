# Product Experience Redesign

Date: 2026-08-05

## Objective

The product redesign turns `console-portfolio` from a static product overview into a premium workstation-system experience. The console is presented as a product engineered around the operator, not as an isolated furniture item or catalogue entry.

## Product Grouping

- Flagship product: control-room console system.
- Operator support modules: sit-stand console, monitor arm, operator chair.
- Hidden engineering: cable/equipment integration, service access, modular construction.
- Choice and finish: configuration and material/finish moments.
- Room relationship: console in control-room environment.

## ProductExperience Framework

Implemented in `src/scenes/product-experience/`.

The framework includes:

- Product module metadata and claim boundaries.
- Product stage visual.
- Feature callout layer.
- Product task-state switcher.
- Technical detail layer.
- Product narration cues.
- Local analytics hooks.
- Product hero adapter for the scene registry.

## Flagship Reveal

The reveal starts with a restrained product silhouette, edge light and monitor glow, then exposes product modules through callouts. It supports presenter jump-to-reveal, technical detail, task states and autoplay feature progression.

## Scene Treatments

- Flagship desk: cinematic product hero.
- Sit-stand: task-state transition between seated monitoring and standing collaboration.
- Monitor system: alignment and cable-routing relationship, conceptual only until assets exist.
- Chair: shown as part of console geometry, not an isolated catalogue item.
- Rotatable console: documented for future asset-backed migration; no fake rotation was added.
- Cable management: conceptual internal path and service-access layer.
- Technology integration: represented as physical console integration; AI/software chapters are not redesigned here.
- Materials: material lens and asset requirement, no invented material names.
- Modular construction: conceptual layers only, not false engineering geometry.
- Configuration: limited presentation choices, not a sales configurator.
- Comparison: planned as a future product comparison module when approved product facts exist.
- Product in room: branch to existing control-room ecosystem.

## Narration

Product narration cues are concise and purpose-led. They connect geometry, technology, movement and organisation to operator use without reading specification lists.

## Presenter Behaviour

Presenter can reveal product, select modules, choose task states, open technical detail, hide detail, move to operator relationship or room context branches, and continue immediately.

## Autoplay

Autoplay reveals the product, highlights a limited set of product modules, demonstrates task state conceptually and returns to the complete product without opening every detail.

## Executive Route

New route: `product-executive`, 5-7 minutes.

Sequence:

`console-portfolio` -> `sightline-comfort` -> `complete-ecosystem` -> `why-onepws`

## Reduced Motion, Accessibility And Performance

Reduced motion uses stepped states instead of mechanical movement. All callouts and task states are keyboard-accessible buttons. Technical detail remains available through explicit controls. Reduced performance uses still geometry, limits blur and avoids heavy 3D.

## Claims And Risks

No dimensions, materials, load ratings, motor specifications, certifications, patent claims or compatibility statements were added. Missing data is marked as review-required in `docs/product-claim-register.md`.

## Asset Requirements

See `docs/product-asset-audit.md`. The final product experience needs approved product-specific hero imagery, detailed views, material crops, cable/service access photos and true exploded assets before it can move beyond conceptual engineering visuals.
