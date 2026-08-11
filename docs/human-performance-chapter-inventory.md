# Human-Performance Chapter Inventory

Date: 2026-08-05

## Relevant Chapters

| Chapter ID | Current title | Current content retained | Current media | Current interaction | Narration | Current layout | Current journeys | Duration | Proposed archetype | Scenario role | Proposed interaction | Emotional purpose | Technical purpose | Migration risk |
|---|---|---|---|---|---|---|---|---:|---|---|---|---|---|---|
| mission-control-definition | What Defines a Mission-Critical Control Room | Continuous operation, awareness, response speed, ergonomic performance, maintainable infrastructure | Visual note only | guided continue | recommended by metadata only if available | legacy image/copy | complete/story-adjacent search and map | 38s | operator-perspective | Operator-centred introduction | Follow operator field | Centre the person making decisions | Connect room definition to operator work | Needs approved operator-view asset |
| operator-challenges | Operator Challenges | Fatigue, overload, posture, glare, noise, fragmented displays, escalation | Visual note only | hotspot discovery | none explicit | legacy image/copy | complete, operations, operator-performance | 42s | operator-perspective | Pressure accumulation | Select up to three factors, reset, show response | Make strain understandable without panic | Keep qualitative pressure factors visible | Avoid medical claims |
| poor-design-risk | Operational Risks of Poor Design | Sightlines, maintenance disruption, comfort, expansion | Visual note only | comparison scrub | none explicit | legacy image/copy | reachable via map/search | 40s | before-after | Sightline and risk comparison | Toggle current/improved state | Show avoidable exposure as correctable | Preserve planning-risk layers | Before/after is conceptual unless matched media exists |
| human-centred-philosophy | Human-Centred Philosophy | Human factors, task alignment, room behaviour | Visual note only | step-through | none explicit | validation operator scene | complete, architect, operator-performance | 38s | operator-perspective | Human-performance transformation | Align the room around operator | Memory moment for this group | Show room, console and environment planned around human decisions | Avoid quantified performance promises |
| ergonomic-methodology | ISO 11064 and Ergonomic Study | ISO 11064 methodology, task analysis, sightline geometry, reach, posture, work-zone validation | Visual note only | step-through | none explicit | legacy image/copy | complete and optional ergonomic branches | 48s | process-sequence | Fatigue over time and standards care | Move through shift/study stages | Make repeated effort visible | Preserve standard and study deliverables | Standards wording must remain careful |
| sightline-comfort | Sightlines, Reach and Comfort | Viewing cones, reach zones, posture, lighting, glare, acoustics, thermal comfort | Visual note only | hotspot discovery | none explicit | legacy image/copy | architect, operator-performance | 45s | interactive-hotspot | Reach, movement and visibility | Choose task zone, seated/standing, technical detail | Make geometry tangible | Preserve viewing/reach/comfort content | No invented ergonomic dimensions |
| incident-response | When Every Second Matters. | Conceptual response sequence and integration-scope disclaimer | Visual note only | simulation control | none explicit | bespoke simulation | complete, operations, technology | 68s | voice-guided | Collaboration under pressure | Trigger collaboration mode, reveal conceptual integration | Show calm team transition | Preserve project-confirmation boundaries | Must not imply unsupported software/AI deployment |

## Chapters Reviewed But Not Migrated In This Stage

- `intelligent-features` contains alertness management, voice command, RFID adjustment and movement safety, but it is a product/technology feature chapter and remains out of scope for this human-performance migration.
- `architectural-systems` contains ceiling, lighting, raised floor and video-wall integration, but it is an architectural/environmental systems chapter and remains out of scope.
- `complete-ecosystem` remains a previous validation memory moment and was not redesigned in this stage.

## Migration Group

Migrated now: `mission-control-definition`, `operator-challenges`, `poor-design-risk`, `human-centred-philosophy`, `ergonomic-methodology`, `sightline-comfort`, `incident-response`.

Legacy fallback remains available through the existing feature flag and `redesignStatus` mapping strategy.
