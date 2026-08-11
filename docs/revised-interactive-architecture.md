# Revised Interactive Architecture

Primary deliverable: a premium browser-based interactive presentation for **OnePWS Private Limited**.  
Secondary deliverable: a simplified PowerPoint backup may be exported later, but PowerPoint no longer defines the main experience.

Existing documents retained as valid foundations:

- `docs/source-presentation-analysis.md`
- `docs/final-presentation-structure.md`
- `docs/presentation-design-system.md`

The experience must behave like a full-screen presentation, not a website:

- One scene or chapter at a time.
- No normal vertical page scrolling.
- 16:9 presentation canvas.
- Full-screen operation.
- Keyboard, mouse and touchscreen navigation.
- Cinematic transitions.
- Interactive hotspots, overlays, drawers, voiceovers, videos and animations.
- Presenter Mode, Self-Guided Mode and Auto-Play Mode.
- Offline-capable first version.

## 1. Converting Slide Architecture Into Interactive Chapters

The 65-slide corporate structure becomes a smaller set of interactive chapters. The slide architecture still controls content sequence, but individual slides are no longer treated as separate web pages.

Recommended chapter model:

| Interactive chapter | Source slide range | Experience role |
| --- | --- | --- |
| Opening and positioning | Slides 1-4 | Cinematic opening and chapter roadmap. |
| OnePWS credentials | Slides 5-13 | Progressive company proof and credibility metrics. |
| Mission-critical control rooms | Slides 14-18 | Problem framing and human-centred design logic. |
| Products and intelligent features | Slides 19-26 | Interactive product exploration. |
| Ergonomic engineering | Slides 27-32 | Guided methodology with optional technical layers. |
| Integrated design-build | Slides 33-35 | Scope and under-one-roof capability story. |
| Architectural/environmental systems | Slides 36-40 | Room-system exploration scene. |
| Engineering methodology | Slides 41-45 | Process sequence and delivery assurance. |
| Manufacturing and quality | Slides 46-49 | Manufacturing proof and quality system walkthrough. |
| International certifications | Slides 50-51 | Certification overview with detail drawer. |
| Project credentials | Slides 52-59 | Project gallery and case-study browser. |
| Customers and presence | Slide 60 | Logo wall, sector grouping and global reach. |
| Why OnePWS | Slides 61-62 | Consolidated differentiator sequence. |
| Next steps and closing | Slides 63-65 | Engagement path, contact and technical appendix entry. |

The core guided experience should feel like a 12-15 chapter presentation, with internal scenes inside each chapter when useful.

## 2. Linear Scenes

Some slide content should remain linear because it needs controlled pacing and presenter clarity.

Linear scenes:

- Cover/opening title.
- Positioning statement.
- Presentation roadmap.
- OnePWS at a glance.
- Formerly Pyrotech continuity statement.
- Pyrotech Group strength.
- Growth journey.
- Awards and exhibitions summary.
- What defines a mission-critical control room.
- Human-centred philosophy.
- Design-to-delivery process.
- FAT/SAT/handover process.
- Why OnePWS.
- Engagement process.
- Closing transformation statement.

Linear scenes should use:

- Simple next/back navigation.
- Keyboard arrow support.
- Optional voiceover.
- Presenter notes.
- No scrolling.
- Carefully timed motion between content states.

## 3. Interactive Exploration Scenes

The following content should become interactive exploration rather than fixed slides:

| Content area | Interactive treatment |
| --- | --- |
| Complete control-room ecosystem | Full-screen room scene with clickable zones for consoles, video wall, lighting, acoustics, raised floor, supervisor area and emergency room. |
| Product and intelligent features | Product overview with hotspots and feature story panels. |
| Ergonomic engineering | Methodology path where users can open task analysis, sightlines, reach zones, lighting/glare and comfort layers. |
| Architectural/environmental systems | Layered room assembly showing ceiling, lighting, wall, acoustic, raised floor and video-wall integration. |
| Manufacturing and quality | Factory capability scene with selectable equipment, raw-material quality and process-improvement proof. |
| International certifications | Certification matrix with selectable safety, sustainability, ergonomics and material categories. |
| Project credentials | Filterable project gallery and featured case studies. |
| Customers and presence | Sector-based customer wall and global presence browser. |

Interactive scenes should still feel like presentation chapters. They should not become dashboard pages with dense controls.

## 4. Overlays And Detail Drawers

Primary slide/chapter content stays clean. Supporting detail opens only on demand.

Overlay types:

- **Technical detail drawer**: Opens from the right or bottom; contains specifications, standards, confirmation-required notes and source references.
- **Project detail overlay**: Shows location, sector, OnePWS scope, delivered systems, available proof points and image gallery.
- **Certification detail drawer**: Explains certificate meaning, product scope and confirmation status.
- **Presenter note layer**: Visible only in Presenter Mode.
- **Customer wall appendix**: Searchable and filterable, opened from the customer/presence chapter.
- **Source/confirmation layer**: Internal-only layer for unverified claims and source slide references.

Overlay rules:

- Overlay must never replace the main navigation.
- Overlay close button must be large enough for touch.
- Overlay should pause Auto-Play while open.
- Overlay should not create vertical page scrolling in the main canvas.
- Long detail can scroll inside the drawer only, not the whole presentation.

## 5. Clickable Voiceovers

Voiceover is part of the presentation system, not a browser autoplay trick.

Voiceover model:

- Each chapter can have one main narration track.
- Each interactive feature can have an optional short voiceover.
- Each hotspot can have an optional short explanation.
- Only one audio track plays at a time.
- Starting a new narration fades or stops the current one.
- Missing audio files show a graceful “voiceover unavailable” state.

Controls:

- Listen button on chapter, feature and hotspot panels.
- Play, pause, replay, mute and volume controls.
- Subtitle toggle.
- Progress indicator for active narration.

Mode behaviour:

- Presenter Mode: narration can be enabled or disabled by presenter.
- Self-Guided Mode: voiceovers play only after visitor clicks Listen.
- Auto-Play Mode: approved voiceovers play sequentially after the browser has received initial user interaction.

Data structure:

- `src/data/voiceovers.ts`
- Track metadata: `id`, `chapterId`, `featureId`, `hotspotId`, `language`, `src`, `duration`, `subtitleSrc`, `fallbackText`, `autoplayApproved`.

## 6. Project Galleries

Project credentials should become one of the strongest interactive sections.

Project chapter structure:

- Project portfolio overview.
- Featured project sequence.
- Filterable project gallery.
- Detail view per project.
- Optional full-screen image mode.

Filters:

- Industry/sector.
- Country/location.
- Control-room type.
- Scope.
- Project scale, only where verified.
- Operator count, only where verified.

Project detail fields:

- Project name.
- Location.
- Sector.
- Customer challenge.
- OnePWS scope.
- Key delivered systems.
- Available proof points.
- Image gallery.
- Related features.
- Information unavailable where source does not provide details.
- Source slide/page reference.

Rules:

- Do not invent outcomes, statistics or operator counts.
- Use approved project photographs only.
- Photos with political leaders, client screens or sensitive facilities require confirmation before public use.
- If exact geographic coordinates are not verified, use country/region grouping rather than precise map pins.

## 7. Presenter Mode

Presenter Mode is for sales-led meetings. It should control the customer-facing experience without exposing internal controls on the main presentation screen.

First-version Presenter Mode:

- Single-screen presenter panel overlay or side panel.
- Current chapter and scene title.
- Next chapter preview.
- Presenter notes.
- Chapter navigation.
- Presentation timer.
- Voiceover enable/disable and audio controls.
- Auto-Play controls.
- Bookmark products/projects.
- Quick access to projects.
- Quick access to technical detail layers.
- Emergency blank-screen button.
- Reset presentation button.
- Clear cache/reload option for offline media.

Future architecture:

- Presenter state separated from customer scene state.
- A future second-screen presenter console can subscribe to the same local state model.
- No backend required in first version.

Data structures:

- `src/data/presenterNotes.ts`
- `src/state/presentationStore.ts`
- `src/state/bookmarkStore.ts`

## 8. Self-Guided Mode

Self-Guided Mode is for showroom visitors and independent exploration.

Behaviour:

- Visitor controls pace.
- Main navigation visible but restrained.
- Chapter menu available anytime.
- Interactive hotspots and detail drawers available.
- Voiceovers do not autoplay.
- User selections can personalize recommended products/projects, but do not hide the full deck.
- Inactivity prompt can offer to continue, restart or switch to Auto-Play.

Controls:

- Next/previous.
- Chapter menu.
- Explore buttons.
- Listen buttons.
- Back to overview.
- Full-screen toggle.
- Mute/subtitle controls.

Self-guided should feel calm and premium, not like browsing a website.

## 9. Auto-Play Mode

Auto-Play Mode is for unattended showroom use.

Behaviour:

- Starts from cinematic opening.
- Moves chapter by chapter using configurable timing.
- Plays approved narration sequentially after user interaction unlocks audio.
- Skips optional technical drawers.
- Allows visitor interruption at any time.
- Converts to Self-Guided Mode when visitor interacts.
- Resumes or restarts after inactivity.
- Returns to opening when the experience ends.
- Never traps the visitor.

Config:

- `src/data/autoplayTimings.ts`
- Per chapter: `duration`, `voiceoverId`, `holdForVideo`, `allowInteractionPause`, `nextChapterId`.

Controls:

- Auto-Play on/off.
- Pause/resume.
- Restart.
- Mute.
- Subtitles.
- Exit to Self-Guided.

## 10. Offline Operation

The application must work without a backend in the first version.

Offline architecture:

- Vite-built static application.
- Local structured data files.
- Local images, videos, audio and subtitles.
- Service worker for app shell and selected media caching.
- Installable PWA for Windows and Mac.
- No external APIs.

Caching strategy:

- App shell cached immediately.
- Core images and chapter thumbnails preloaded.
- Large videos cached on demand or by selected preload profile.
- Voiceovers cached per language and chapter.
- Presenter Mode includes clear-cache and reload option.

Data privacy:

- Presentation mode and temporary visitor selections may persist for the current session.
- Do not store confidential customer data permanently.
- Bookmarks can be session-only unless explicit export is added later.

Offline indicators:

- Small online/offline status.
- Missing media fallback.
- Media preload status for presenter.

## 11. Simplified PowerPoint Backup Export

PowerPoint remains a secondary deliverable.

Backup strategy:

- Keep the existing PowerPoint foundation as a fallback generator.
- Export a simplified linear version later using the same structured content data.
- PowerPoint export should not include interactive overlays, hotspot behaviour or Auto-Play logic.
- It should flatten each interactive chapter into selected representative slides.

Possible export mapping:

- Opening chapter -> 3-4 slides.
- Credentials chapter -> 5-7 slides.
- Product exploration -> product overview plus selected feature slides.
- Ergonomic engineering -> methodology slides.
- Design-build and environment systems -> capability slides.
- Project gallery -> selected case-study slides.
- Closing -> next-step/contact slide.

PowerPoint export rules:

- Use sourced data only.
- Preserve OnePWS design system.
- Mark confirmation-required items before external sharing.
- Keep the PowerPoint as backup, leave-behind or offline meeting collateral, not the main experience.

## Recommended Technical Foundation

Stack:

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide icons
- HTML5 audio and video
- Local structured data
- PWA/service worker
- No backend

Core implementation modules:

- `src/data/chapters.ts`
- `src/data/features.ts`
- `src/data/projects.ts`
- `src/data/companyProof.ts`
- `src/data/certifications.ts`
- `src/data/voiceovers.ts`
- `src/data/autoplayTimings.ts`
- `src/components/presentation/PresentationCanvas.tsx`
- `src/components/navigation/ChapterNavigator.tsx`
- `src/components/audio/AudioManager.tsx`
- `src/components/presenter/PresenterPanel.tsx`
- `src/components/overlays/DetailDrawer.tsx`
- `src/components/projects/ProjectGallery.tsx`

## Immediate Next Step

Before implementation, translate the 65-slide structure into `chapter -> scene -> interaction` data. This will prevent the browser experience from becoming a website and keep it aligned to a premium presentation flow.
