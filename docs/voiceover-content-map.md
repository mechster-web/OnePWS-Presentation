# Voiceover Content Map

Primary rule: voiceovers are user-controlled and stored separately from visual scene content.  
No fake audio files are generated. Placeholder connections point to planned file paths only.

## Voiceover Levels

| Level | Recommended duration | User action | Auto behaviour |
| --- | --- | --- | --- |
| Chapter narration | 20-45 seconds | Scene `Listen` button | Sequential in Auto-Play after user audio unlock; optional in Presenter Mode when narration and play are enabled. |
| Feature explanation | 15-30 seconds | Feature `Listen` button | Not automatic in Self-Guided Mode. Can be enabled later for guided product demos. |
| Hotspot explanation | 8-15 seconds | Hotspot `Listen` button | Not automatic in Self-Guided Mode. Used for concise explanations only. |

## Runtime Behaviour

- Only one voiceover can be active at a time.
- Starting a new voiceover stops the current narration.
- Missing audio shows a non-breaking pending-audio message.
- Subtitles can show approved script text even before the audio file exists.
- Self-Guided Mode never starts narration unexpectedly.
- Presenter Mode can start chapter narration when the presenter enables narration and presses play.
- Auto-Play Mode can play chapter narrations sequentially after the browser receives initial user interaction.
- Feature and hotspot narrations are connected through metadata and will be exposed in their respective exploration scenes.

## File Placement

Recommended English paths:

- Chapter narration: `/assets/audio/en/chapters/NN-scene-id.mp3`
- Feature explanation: `/assets/audio/en/features/feature-id.mp3`
- Hotspot explanation: `/assets/audio/en/hotspots/hotspot-id.mp3`
- Incident/simulation hotspot narration: `/assets/audio/en/simulation/step-id.mp3`

Future language paths should mirror the same structure:

- `/assets/audio/hi/chapters/NN-scene-id.mp3`
- `/assets/audio/ar/features/feature-id.mp3`

## Recommended Chapter Voiceovers

| Scene | Voiceover purpose | Planned file |
| --- | --- | --- |
| OnePWS Control Room Capability | Set brand, scope and presentation intent. | `/assets/audio/en/chapters/01-opening-cover.mp3` |
| Control Rooms Are Mission-Critical | Establish customer operating context. | `/assets/audio/en/chapters/02-mission-critical-environments.mp3` |
| OnePWS Positioning | Explain consoles, ergonomics and design-build positioning. | `/assets/audio/en/chapters/03-onepws-positioning.mp3` |
| Presentation Roadmap | Explain core journey and optional depth. | `/assets/audio/en/chapters/04-journey-roadmap.mp3` |
| OnePWS At A Glance | Introduce approved proof points without over-reading numbers. | `/assets/audio/en/chapters/05-company-at-a-glance.mp3` |
| Group Strength and Growth | Explain continuity and group/growth proof with confirmation caution. | `/assets/audio/en/chapters/06-group-and-growth.mp3` |
| What Defines a Mission-Critical Control Room | Define control rooms as decision environments. | `/assets/audio/en/chapters/07-mission-control-definition.mp3` |
| Operator Challenges | Frame fatigue, overload and escalation pressure. | `/assets/audio/en/chapters/08-operator-challenges.mp3` |
| Operational Risks of Poor Design | Link room design to operational exposure. | `/assets/audio/en/chapters/09-poor-design-risk.mp3` |
| Human-Centred Philosophy | Transition from problem to human-centred solution logic. | `/assets/audio/en/chapters/10-human-centred-philosophy.mp3` |
| Complete Control-Room Ecosystem | Introduce the room as one connected system. | `/assets/audio/en/chapters/11-complete-ecosystem.mp3` |
| Control-Room Console Portfolio | Introduce console capability and optional product depth. | `/assets/audio/en/chapters/12-console-portfolio.mp3` |
| Intelligent Features | Introduce intelligent product and room-state features cautiously. | `/assets/audio/en/chapters/13-intelligent-features.mp3` |
| ISO 11064 and Ergonomic Study | Explain ergonomic study as an engineering deliverable. | `/assets/audio/en/chapters/14-ergonomic-methodology.mp3` |
| Sightlines, Reach and Comfort | Explain human geometry and comfort factors. | `/assets/audio/en/chapters/15-sightline-comfort.mp3` |
| Integrated Design-Build Approach | Explain integrated delivery capability. | `/assets/audio/en/chapters/16-design-build-approach.mp3` |
| Architectural and Environmental Systems | Explain room envelope as operational infrastructure. | `/assets/audio/en/chapters/17-architectural-systems.mp3` |
| Engineering and Project Methodology | Explain design-to-handover process. | `/assets/audio/en/chapters/18-delivery-methodology.mp3` |
| Manufacturing and Quality | Introduce manufacturing and quality proof. | `/assets/audio/en/chapters/19-manufacturing-quality.mp3` |
| International Certifications | Explain compliance overview and detail-on-demand model. | `/assets/audio/en/chapters/20-certification-overview.mp3` |
| Project Credentials | Introduce project browser and proof rules. | `/assets/audio/en/chapters/21-project-portfolio.mp3` |
| Customers and Global Presence | Introduce curated customer and presence proof. | `/assets/audio/en/chapters/22-customer-presence.mp3` |
| Why OnePWS | Summarise differentiated buying case. | `/assets/audio/en/chapters/23-why-onepws.mp3` |
| Next Steps and Closing | Move into consultation, concept layout and appendix access. | `/assets/audio/en/chapters/24-next-steps-closing.mp3` |

## Recommended Feature Voiceovers

Feature explanations should be concise, product-led and careful about unverified specifications.

| Feature | Voiceover purpose | Planned file |
| --- | --- | --- |
| Adaptive sit-stand operator console | Explain posture variation and workstation geometry. | `/assets/audio/en/features/adaptive-sit-stand-console.mp3` |
| Rotatable operator desk | Explain task-mode flexibility; specifications confirmation required. | `/assets/audio/en/features/rotatable-operator-desk.mp3` |
| OneHub or personal AI desk hub | Explain future intelligence point; integrations confirmation required. | `/assets/audio/en/features/onehub-ai-desk-hub.mp3` |
| Operator Alertness Management System | Explain fatigue-aware operations; privacy and sensor method confirmation required. | `/assets/audio/en/features/operator-alertness-management.mp3` |
| Intelligent operator chair | Explain chair-console pairing; current product data confirmation required. | `/assets/audio/en/features/intelligent-operator-chair.mp3` |
| SCADA-triggered intelligent video wall | Explain shared awareness wall; integration confirmation required. | `/assets/audio/en/features/scada-triggered-video-wall.mp3` |
| Situational awareness lighting | Explain room-state lighting cues. | `/assets/audio/en/features/situational-awareness-lighting.mp3` |
| Circadian lighting | Explain long-shift visual comfort. | `/assets/audio/en/features/circadian-lighting.mp3` |
| Environment intelligence | Explain coordinated room environment behaviour. | `/assets/audio/en/features/environment-intelligence.mp3` |
| Voice-enabled interaction layer | Explain command interaction; software scope confirmation required. | `/assets/audio/en/features/voice-enabled-interaction.mp3` |
| AI incident copilot | Explain conceptual AI support; deployed capability confirmation required. | `/assets/audio/en/features/ai-incident-copilot.mp3` |
| Personal environment bubble | Explain user comfort-zone concept; specifications confirmation required. | `/assets/audio/en/features/personal-environment-bubble.mp3` |
| Supervisor oversight system | Explain supervisor visibility and escalation support. | `/assets/audio/en/features/supervisor-oversight-system.mp3` |
| Intelligent acoustic environment | Explain acoustic comfort and coordination. | `/assets/audio/en/features/intelligent-acoustic-environment.mp3` |

## Recommended Challenge Hotspot Voiceovers

| Hotspot | Voiceover purpose | Planned file |
| --- | --- | --- |
| Operator fatigue | Explain fatigue as a room-design issue. | `/assets/audio/en/hotspots/operator-fatigue.mp3` |
| Information overload | Explain hierarchy instead of visual noise. | `/assets/audio/en/hotspots/information-overload.mp3` |
| Poor ergonomics | Explain console, chair, screens and geometry as one position. | `/assets/audio/en/hotspots/poor-ergonomics.mp3` |
| Fragmented systems | Explain fragmented attention and coordination. | `/assets/audio/en/hotspots/fragmented-systems.mp3` |
| Slow incident response | Explain detection, ownership and coordination clarity. | `/assets/audio/en/hotspots/slow-response.mp3` |
| Inconsistent environments | Explain seat-to-seat consistency. | `/assets/audio/en/hotspots/inconsistent-environments.mp3` |
| Difficult maintenance | Explain service access and lifecycle disruption. | `/assets/audio/en/hotspots/difficult-maintenance.mp3` |
| Limited scalability | Explain future expansion as an early design decision. | `/assets/audio/en/hotspots/limited-scalability.mp3` |

## Recommended Connected-Room Hotspot Voiceovers

| Hotspot | Voiceover purpose | Planned file |
| --- | --- | --- |
| Intelligent operator console | Explain command surface and service access. | `/assets/audio/en/hotspots/intelligent-console.mp3` |
| Intelligent operator chair | Explain chair as part of the control-room system. | `/assets/audio/en/hotspots/operator-chair.mp3` |
| Personal AI desk hub | Explain focused support point; approval required. | `/assets/audio/en/hotspots/ai-desk-hub.mp3` |
| Operator Alertness Management System | Explain readiness layer. | `/assets/audio/en/hotspots/alertness-management.mp3` |
| Intelligent video wall | Explain shared field of awareness. | `/assets/audio/en/hotspots/video-wall.mp3` |
| Situational awareness lighting | Explain environmental status cues. | `/assets/audio/en/hotspots/situational-lighting.mp3` |
| Circadian lighting | Explain shift comfort. | `/assets/audio/en/hotspots/circadian-lighting.mp3` |
| Acoustic architecture | Explain calm communication. | `/assets/audio/en/hotspots/acoustic-architecture.mp3` |
| Unified wall system | Explain display, access, acoustics and finish integration. | `/assets/audio/en/hotspots/unified-wall-system.mp3` |
| Raised access floor | Explain hidden service layer. | `/assets/audio/en/hotspots/raised-access-floor.mp3` |
| Supervisor area | Explain oversight without operator interruption. | `/assets/audio/en/hotspots/supervisor-area.mp3` |
| Emergency collaboration room | Explain escalation space; project confirmation required. | `/assets/audio/en/hotspots/emergency-collaboration-room.mp3` |

## Recommended Incident / Simulation Voiceovers

These remain conceptual and must not imply confirmed deployed integrations.

| Step | Voiceover purpose | Planned file |
| --- | --- | --- |
| Operational anomaly detected | Introduce conceptual anomaly detection. | `/assets/audio/en/simulation/anomaly-detected.mp3` |
| Relevant console and zone highlighted | Explain ownership and attention. | `/assets/audio/en/simulation/zone-highlight.mp3` |
| Situational-awareness lighting changes | Explain room-state cue. | `/assets/audio/en/simulation/lighting-change.mp3` |
| Video wall changes to incident content | Explain shared operating picture. | `/assets/audio/en/simulation/video-wall-update.mp3` |
| Affected operator receives prioritised information | Explain reduced search and cognitive load. | `/assets/audio/en/simulation/operator-prioritised.mp3` |
| AI incident copilot displays recommended SOP | Explain conceptual SOP support; no deployment claim. | `/assets/audio/en/simulation/copilot-sop.mp3` |
| Supervisor receives alert and task overview | Explain supervisory coordination. | `/assets/audio/en/simulation/supervisor-alert.mp3` |
| Emergency collaboration area activated | Explain specialist coordination. | `/assets/audio/en/simulation/collaboration-activated.mp3` |
| Incident acknowledged, managed and resolved | Explain return to stable monitoring. | `/assets/audio/en/simulation/managed-resolved.mp3` |
| Shift and incident summary produced | Explain review output; reporting integrations confirmation required. | `/assets/audio/en/simulation/incident-summary.mp3` |

## Implementation Status

- `src/content/voiceovers.ts` stores metadata separately from visual content.
- Core scenes show a `Listen` button connected to chapter narration metadata.
- `AudioManager` provides play, pause, replay, progress, mute, volume and subtitle controls.
- Missing audio paths are displayed as pending instead of breaking the presentation.
- Feature and hotspot metadata connections exist and should be surfaced when the dedicated feature and hotspot exploration components are added back into the core runtime.
