# OnePWS Interactive Scene Mapping

Primary deliverable: browser-based full-screen interactive presentation.  
Source foundation: `docs/final-presentation-structure.md`, `docs/source-presentation-analysis.md`, and `docs/presentation-design-system.md`.  
Rule: do not turn the 65-slide architecture into 65 linear browser scenes.

## Experience Organisation

The approved 65-slide structure is converted into five presentation layers.

| Layer | Purpose | Treatment |
| --- | --- | --- |
| A. Core customer journey | 10-15 minute guided presentation | 24 linear scenes, one scene at a time. |
| B. Interactive feature exploration | Product and technology depth | Optional hotspots, feature stories and drawers. |
| C. Project credentials | Proof and case-study browsing | Optional project browser, galleries and case-study overlays. |
| D. Company credentials | Company, manufacturing and certification proof | Optional credential overlays and proof walls. |
| E. Technical appendix | Detailed backup and confirmation-required content | Accessible only when selected from overlays or closing scene. |

## Core Customer Journey

The first runtime implementation uses these 24 core scenes. Content is structured as approved placeholders so that exact company facts, photographs, statistics and claims can be inserted only after confirmation.

| Core scene | Source slide logic | Runtime role |
| --- | --- | --- |
| 1. OnePWS Control Room Capability | Slides 1 and 3 | Opening and positioning. |
| 2. Control Rooms Are Mission-Critical | Slide 2 | Operational context. |
| 3. OnePWS Positioning | Slide 3 | Capability framing. |
| 4. Presentation Roadmap | Slide 4 | Navigation promise and optional-depth model. |
| 5. OnePWS At A Glance | Slide 5 | Sourced proof-point entry. |
| 6. Group Strength and Growth | Slides 6-8 | Continuity, group strength and growth proof. |
| 7. What Defines a Mission-Critical Control Room | Slide 14 | Category education. |
| 8. Operator Challenges | Slide 15 | Problem framing. |
| 9. Operational Risks of Poor Design | Slide 16 | Risk and design-gap framing. |
| 10. Human-Centred Philosophy | Slide 17 | Solution philosophy. |
| 11. Complete Control-Room Ecosystem | Slide 18 | Whole-room system view. |
| 12. Control-Room Console Portfolio | Slides 19-20 | Product family entry. |
| 13. Intelligent Features | Slides 21-26 | Intelligent product feature entry. |
| 14. ISO 11064 and Ergonomic Study | Slides 27-28 and 32 | Ergonomic method. |
| 15. Sightlines, Reach and Comfort | Slides 29-31 | Human geometry and comfort. |
| 16. Integrated Design-Build Approach | Slides 33-35 | Design-build capability. |
| 17. Architectural and Environmental Systems | Slides 36-40 | Room envelope and systems. |
| 18. Engineering and Project Methodology | Slides 41-45 | Delivery process. |
| 19. Manufacturing and Quality | Slides 46-49 | Manufacturing and quality proof entry. |
| 20. International Certifications | Slides 50-51 | Compliance proof entry. |
| 21. Project Credentials | Slides 52-59 | Project proof entry. |
| 22. Customers and Global Presence | Slide 60 | Customer proof entry. |
| 23. Why OnePWS | Slides 61-62 | Buying-case summary. |
| 24. Next Steps and Closing | Slides 63-65 | Engagement path, closing and appendix access. |

Approximate guided runtime using configured durations: about 16 minutes if every scene is held for its full Auto-Play duration. Presenter-led or self-guided delivery can remain inside 10-15 minutes by moving faster through proof-entry scenes and opening optional details only when relevant.

## Slide-by-Slide Conversion

| Slide | Approved slide title | Interactive treatment | Destination |
| --- | --- | --- | --- |
| 1 | OnePWS Control Room Capability Presentation | Converted into core opening scene. | Core scene 1 |
| 2 | Control Rooms Are Mission-Critical Environments | Converted into linear operating-context scene. | Core scene 2 |
| 3 | OnePWS Positioning Statement | Converted into linear positioning scene; deeper statement approval opens in overlay. | Core scene 3 + overlay |
| 4 | Presentation Roadmap | Converted into scene-level journey map. | Core scene 4 |
| 5 | OnePWS At A Glance | Converted into proof-point scene; detailed metrics stay in credential overlay. | Core scene 5 + company credentials |
| 6 | Formerly Pyrotech Workspace Solutions | Combined with group/growth continuity. | Core scene 6 + company credentials |
| 7 | Pyrotech Group Strength | Combined with group/growth continuity; detailed group proof stays optional. | Core scene 6 + company credentials |
| 8 | OnePWS Growth Journey | Combined with group/growth continuity; chart values require confirmation. | Core scene 6 + company credentials |
| 9 | Manufacturing Footprint | Moved out of early profile section and reintroduced in manufacturing proof. | Core scene 19 + company credentials |
| 10 | Global Customer Reach | Moved to customer/presence scene and credentials overlay. | Core scene 22 + company credentials |
| 11 | Awards And Recognition | Moved to company credentials overlay. | Company credentials |
| 12 | International Exhibitions | Moved to company credentials overlay. | Company credentials |
| 13 | Management Systems And SAP | Moved to company credentials and technical appendix. | Company credentials + appendix |
| 14 | What Defines A Mission-Critical Control Room | Converted into core category scene. | Core scene 7 |
| 15 | Challenges Faced By Operators | Converted into core challenge scene; future details become hotspots. | Core scene 8 + hotspots |
| 16 | Operational Risks Of Poor Design | Converted into core risk scene; details in overlay. | Core scene 9 + overlay |
| 17 | Human-Centred Control-Room Philosophy | Converted into core philosophy scene. | Core scene 10 |
| 18 | Complete Control-Room Ecosystem | Converted into ecosystem scene; room layers become future hotspots. | Core scene 11 + hotspots |
| 19 | Control-Room Console Portfolio | Converted into product entry scene. | Core scene 12 |
| 20 | Standard And Custom Console Ranges | Combined with console portfolio; detailed range matrix moves to feature exploration. | Core scene 12 + feature exploration |
| 21 | Adaptive Console Systems | Converted into feature exploration scene. | Feature exploration |
| 22 | Operator Intelligence Features | Converted into feature exploration hotspots. | Feature exploration |
| 23 | Situational Awareness And Room-State Features | Converted into feature exploration hotspots. | Feature exploration |
| 24 | Safety And Movement Systems | Converted into feature detail drawer. | Feature exploration + appendix |
| 25 | Intelligent Operator Chair And Workstation Pairing | Converted into optional feature story; specifications confirmation required. | Feature exploration |
| 26 | Cable And Equipment Integration | Converted into technical product layer. | Feature exploration + technical appendix |
| 27 | ISO 11064 Methodology | Converted into ergonomic method scene. | Core scene 14 |
| 28 | Task And Workflow Analysis | Combined into ergonomic method scene; details in overlay. | Core scene 14 + technical appendix |
| 29 | Sightline And Viewing Geometry | Combined into human-geometry scene. | Core scene 15 + technical appendix |
| 30 | Reach, Posture And Work-Zone Validation | Combined into human-geometry scene. | Core scene 15 + technical appendix |
| 31 | Lighting, Glare, Acoustic And Thermal Comfort | Combined into human-geometry scene and environmental systems scene. | Core scenes 15 and 17 |
| 32 | Ergonomic Study Deliverables | Combined into ergonomic method scene; detailed sample deliverables in appendix. | Core scene 14 + technical appendix |
| 33 | Integrated Design-Build Approach | Converted into core design-build scene. | Core scene 16 |
| 34 | Architecture And Interior Design | Combined into design-build scene; details in overlay. | Core scene 16 + overlay |
| 35 | Wall, Cladding And Acoustic Systems | Combined into design-build and architectural systems. | Core scenes 16 and 17 |
| 36 | Ceiling And Lighting Systems | Converted into architectural/environmental system layer. | Core scene 17 + hotspots |
| 37 | Raised Access Flooring | Converted into architectural/environmental system layer. | Core scene 17 + hotspots |
| 38 | Video-Wall Integration | Converted into architectural/environmental system layer. | Core scene 17 + hotspots |
| 39 | Supervisor And Collaboration Areas | Converted into architectural/environmental system layer. | Core scene 17 + hotspots |
| 40 | Emergency And War-Room Spaces | Converted into optional system layer; capability confirmation required. | Core scene 17 + technical appendix |
| 41 | Design-To-Delivery Process | Converted into methodology scene. | Core scene 18 |
| 42 | Engineering Coordination | Combined into methodology scene; detail matrix in appendix. | Core scene 18 + technical appendix |
| 43 | Project Planning And Execution | Combined into methodology scene. | Core scene 18 |
| 44 | FAT, SAT And Handover | Combined into methodology scene; checklist detail in appendix. | Core scene 18 + technical appendix |
| 45 | Warranty, AMC And Lifecycle Support | Combined into methodology scene and closing next-step logic. | Core scenes 18 and 24 |
| 46 | In-House Manufacturing Strength | Converted into manufacturing proof-entry scene. | Core scene 19 |
| 47 | Major Manufacturing Equipment | Moved into manufacturing overlay. | Company credentials + appendix |
| 48 | Raw-Material And Component Quality | Moved into manufacturing overlay and appendix. | Company credentials + appendix |
| 49 | Internal Quality-Improvement Programme | Moved into manufacturing overlay and appendix. | Company credentials + appendix |
| 50 | International Compliance Overview | Converted into certification entry scene. | Core scene 20 |
| 51 | Safety, Sustainability And Ergonomic Certifications | Moved into certification detail overlays and appendix. | Company credentials + technical appendix |
| 52 | Project Portfolio Overview | Converted into project credentials entry scene. | Core scene 21 |
| 53 | DFCC Ahmedabad | Converted into featured project case study. | Project credentials |
| 54 | Chandigarh ICCC And ITMS Noida | Converted into featured project/case-study options. | Project credentials |
| 55 | Adani Khavda, Kutch | Converted into project case-study option. | Project credentials |
| 56 | RTGC Andhra Pradesh | Converted into project case-study option. | Project credentials |
| 57 | ACPO/APCO Ahmedabad And Shell Brunei | Converted into project case-study options; spelling and claim confirmation required. | Project credentials |
| 58 | Other Selected Project References | Moved into project browser and appendix list. | Project credentials + appendix |
| 59 | OnePWS Experience Centre | Converted into optional project/showroom proof layer. | Project credentials |
| 60 | Esteemed Customers And Global Presence | Converted into customer/presence scene; full logo wall optional. | Core scene 22 + company credentials |
| 61 | Why OnePWS | Converted into core buying-case scene. | Core scene 23 |
| 62 | One Partner Across The Complete Control Room | Combined into buying-case scene; avoid unapproved exclusivity claims. | Core scene 23 |
| 63 | Engagement Process | Converted into closing next-step scene. | Core scene 24 |
| 64 | The Future Of Control Rooms Starts Here | Converted into closing headline. | Core scene 24 |
| 65 | Contact, Confidentiality And Technical Appendix Index | Moved into closing actions and technical appendix entry. | Core scene 24 + technical appendix |

## Optional Exploration Model

### Interactive Feature Exploration

Feature exploration is not part of the main 24-scene path unless selected. The first implementation uses content placeholders and technical-layer buttons. Later feature scenes should include:

- Console portfolio and range matrix.
- Adaptive sit-stand console.
- Rotatable console concept, marked confirmation required unless approved.
- Operator Alertness Management System.
- Voice command.
- Situational awareness and RFID adjustment.
- Anti-collision and monitor-arm systems.
- Intelligent chair and workstation pairing.
- Cable and equipment integration.

### Project Credentials

Project credentials open from core scene 21. The project browser should eventually include:

- Portfolio overview.
- Featured project sequence.
- Filterable project gallery.
- Detail view per project.
- Full-screen image mode.
- “Information unavailable” fields where source detail is missing.

No operator count, outcome statistic, integration scope or project result should be invented.

### Company Credentials

Company credentials open from scenes 5, 6, 19, 20 and 22. They should eventually include:

- OnePWS at-a-glance metrics from current source.
- Former company-name continuity.
- Pyrotech Group strength where approved.
- Growth journey.
- Awards and exhibitions.
- Manufacturing footprint.
- Management systems and SAP.
- Certification detail.
- Customer wall and global presence.

### Technical Appendix

The technical appendix is not part of the core journey. It is selected explicitly from technical-layer buttons or closing scene 24. It should contain:

- Certification scope, expiry and product coverage.
- ISO/ergonomics methodology details.
- Raw-material and component tables.
- Manufacturing equipment list.
- FAT/SAT and handover checklists.
- Project values and source references where approved.
- Full customer wall.
- Contact, confidentiality and confirmation-required notes.

## Implementation Notes

- The runtime now uses 24 enabled scene entries in `src/content/chapters.ts`.
- Scene IDs are data-driven strings, allowing the approved architecture to evolve without rewriting a TypeScript union for every new scene.
- The first implementation intentionally uses approved content placeholders and source-reference labels rather than new company claims.
- Feature, project, credential and appendix depth is represented through `technicalLayers` buttons and overlay destinations until dedicated exploration components are built.
