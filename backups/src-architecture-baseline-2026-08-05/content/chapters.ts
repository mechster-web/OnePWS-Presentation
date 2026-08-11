import type { Chapter } from "../data/contentTypes";

export const chapters: Chapter[] = [
  {
    id: "opening-cover",
    order: 1,
    title: "OnePWS Control Room Capability",
    eyebrow: "Mission-Critical Control Rooms",
    headline: "Control Room Consoles, Design-Build Solutions & Ergonomic Engineering.",
    supportingMessage:
      "OnePWS Private Limited creates control-room environments where operators, technology and infrastructure work as one coordinated system.",
    durationMs: 32_000,
    visualNote: "Opening view of a OnePWS control-room environment.",
    presenterTalkingPoint:
      "Set the scope clearly: OnePWS is presenting a complete control-room capability, not isolated furniture.",
    technicalLayers: ["Company continuity", "Capability scope", "Brand assets"],
    media: {
      backgroundVideoAssetId: "opening-background-video",
      fallbackImageAssetId: "opening-control-room-fallback",
      narrationAssetId: "opening-voiceover-en",
    },
    beats: [
      { id: "brand", label: "OnePWS", startsAtMs: 0, durationMs: 9_000, motionPreset: "fade" },
      { id: "scope", label: "Consoles + rooms", startsAtMs: 9_000, durationMs: 12_000, motionPreset: "layerReveal" },
      { id: "enter", label: "Begin", startsAtMs: 21_000, durationMs: 11_000, motionPreset: "calmDolly" },
    ],
  },
  {
    id: "mission-critical-environments",
    order: 2,
    title: "Control Rooms Are Mission-Critical",
    eyebrow: "Continuous Operations",
    headline: "Control rooms are mission-critical environments.",
    supportingMessage:
      "Every sightline, console, display, light level and service route affects how teams monitor, coordinate and respond.",
    durationMs: 35_000,
    visualNote: "Mission-critical control-room photo or refined architectural render.",
    presenterTalkingPoint:
      "Start with the customer's operational reality before talking about OnePWS.",
    technicalLayers: ["Operating context", "Room definition", "Decision flow"],
    beats: [
      { id: "monitor", label: "Monitor", startsAtMs: 0, durationMs: 11_000, motionPreset: "fade" },
      { id: "coordinate", label: "Coordinate", startsAtMs: 11_000, durationMs: 12_000, motionPreset: "scan" },
      { id: "decide", label: "Decide", startsAtMs: 23_000, durationMs: 12_000, motionPreset: "layerReveal" },
    ],
  },
  {
    id: "onepws-positioning",
    order: 3,
    title: "OnePWS Positioning",
    eyebrow: "Integrated OnePWS Capability",
    headline: "One partner for consoles, ergonomics and integrated control-room environments.",
    supportingMessage:
      "OnePWS combines engineered consoles, ergonomic study, manufacturing and room delivery so the environment is planned as a complete operating system.",
    durationMs: 35_000,
    visualNote: "Three-part capability diagram.",
    presenterTalkingPoint:
      "Use this scene to explain the breadth without overloading the customer with company history.",
    technicalLayers: ["Capability scope", "Company continuity", "Engagement model"],
    beats: [
      { id: "consoles", label: "Consoles", startsAtMs: 0, durationMs: 10_000, motionPreset: "layerReveal" },
      { id: "ergonomics", label: "Ergonomics", startsAtMs: 10_000, durationMs: 12_000, motionPreset: "layerReveal" },
      { id: "design-build", label: "Design-build", startsAtMs: 22_000, durationMs: 13_000, motionPreset: "layerReveal" },
    ],
  },
  {
    id: "journey-roadmap",
    order: 4,
    title: "Guided Capability Journey",
    eyebrow: "Choose The Depth",
    headline: "A concise main story with proof available on demand.",
    supportingMessage:
      "The main journey stays focused. Product detail, project proof, credentials and technical notes open only when the discussion needs more depth.",
    durationMs: 30_000,
    visualNote: "Core journey plus optional exploration routes.",
    presenterTalkingPoint:
      "Tell the audience they can choose depth without slowing the main story.",
    technicalLayers: ["Main journey", "Feature exploration", "Technical reference"],
    beats: [
      { id: "core", label: "Main story", startsAtMs: 0, durationMs: 10_000, motionPreset: "fade" },
      { id: "optional", label: "Deeper proof", startsAtMs: 10_000, durationMs: 10_000, motionPreset: "scan" },
      { id: "technical", label: "Technical depth", startsAtMs: 20_000, durationMs: 10_000, motionPreset: "layerReveal" },
    ],
  },
  {
    id: "company-at-a-glance",
    order: 5,
    title: "OnePWS At A Glance",
    eyebrow: "Verified Company Strength",
    headline: "OnePWS brings scale, manufacturing depth and control-room experience.",
    supportingMessage:
      "Key credentials are kept concise in the main journey, with manufacturing, certifications, customers and history available when selected.",
    durationMs: 40_000,
    visualNote: "Concise company proof wall.",
    presenterTalkingPoint:
      "Do not use older Pyrotech statistics when current OnePWS values exist.",
    technicalLayers: ["Current metrics", "Company credentials", "Manufacturing proof"],
    beats: [
      { id: "scale", label: "Scale", startsAtMs: 0, durationMs: 13_000, motionPreset: "fade" },
      { id: "reach", label: "Reach", startsAtMs: 13_000, durationMs: 13_000, motionPreset: "scan" },
      { id: "proof", label: "Proof", startsAtMs: 26_000, durationMs: 14_000, motionPreset: "layerReveal" },
    ],
  },
  {
    id: "group-and-growth",
    order: 6,
    title: "Group Strength and Growth",
    eyebrow: "Continuity With Scale",
    headline: "OnePWS carries forward a specialist control-room legacy.",
    supportingMessage:
      "Historical continuity, group strength and growth are presented as credibility context, not as a long company-history detour.",
    durationMs: 35_000,
    visualNote: "Company continuity and growth timeline.",
    presenterTalkingPoint:
      "Use 'Formerly Pyrotech Workspace Solutions Pvt. Ltd.' only where historical continuity is needed.",
    technicalLayers: ["Group strength", "Company continuity", "Growth record"],
    beats: [
      { id: "continuity", label: "Continuity", startsAtMs: 0, durationMs: 12_000, motionPreset: "fade" },
      { id: "group", label: "Group strength", startsAtMs: 12_000, durationMs: 12_000, motionPreset: "layerReveal" },
      { id: "growth", label: "Growth", startsAtMs: 24_000, durationMs: 11_000, motionPreset: "scan" },
    ],
  },
  {
    id: "mission-control-definition",
    order: 7,
    title: "What Defines a Mission-Critical Control Room",
    eyebrow: "Decision Environment",
    headline: "A control room is a decision environment.",
    supportingMessage:
      "Continuous operation, operator awareness, response speed, ergonomic performance and maintainable infrastructure define the room.",
    durationMs: 38_000,
    visualNote: "Control-room ecosystem illustration.",
    presenterTalkingPoint:
      "Shift the discussion from furniture and screens to operational decision support.",
    technicalLayers: ["Control-room ecosystem", "Response speed", "Maintainable infrastructure"],
    beats: [
      { id: "awareness", label: "Awareness", startsAtMs: 0, durationMs: 12_000, motionPreset: "fade" },
      { id: "response", label: "Response", startsAtMs: 12_000, durationMs: 13_000, motionPreset: "scan" },
      { id: "infrastructure", label: "Infrastructure", startsAtMs: 25_000, durationMs: 13_000, motionPreset: "layerReveal" },
    ],
  },
  {
    id: "operator-challenges",
    order: 8,
    title: "Operator Challenges",
    eyebrow: "Operator Pressure",
    headline: "The room must reduce pressure on the people making critical decisions.",
    supportingMessage:
      "Fatigue, information overload, poor posture, glare, noise, fragmented displays and difficult escalation all reduce decision quality.",
    durationMs: 42_000,
    visualNote: "Conventional control-room pressure points.",
    presenterTalkingPoint:
      "Keep challenge wording qualitative unless a verified source statistic is added.",
    technicalLayers: ["Fatigue hotspot", "Information load hotspot", "Escalation hotspot"],
    beats: [
      { id: "fatigue", label: "Fatigue", startsAtMs: 0, durationMs: 14_000, motionPreset: "fade" },
      { id: "load", label: "Information load", startsAtMs: 14_000, durationMs: 14_000, motionPreset: "scan" },
      { id: "escalation", label: "Escalation", startsAtMs: 28_000, durationMs: 14_000, motionPreset: "layerReveal" },
    ],
  },
  {
    id: "poor-design-risk",
    order: 9,
    title: "Operational Risks of Poor Design",
    eyebrow: "Operational Exposure",
    headline: "Poor room design creates avoidable operational exposure.",
    supportingMessage:
      "Poor sightlines, service disruption, thermal or acoustic discomfort and unmanaged expansion create avoidable pressure inside the room.",
    durationMs: 40_000,
    visualNote: "Control-room planning risk layers.",
    presenterTalkingPoint:
      "Connect design decisions to operational exposure without claiming unverified outcomes.",
    technicalLayers: ["Sightline risk", "Maintenance disruption", "Expansion planning"],
    beats: [
      { id: "sightlines", label: "Sightlines", startsAtMs: 0, durationMs: 13_000, motionPreset: "fade" },
      { id: "maintenance", label: "Maintenance", startsAtMs: 13_000, durationMs: 14_000, motionPreset: "scan" },
      { id: "expansion", label: "Expansion", startsAtMs: 27_000, durationMs: 13_000, motionPreset: "layerReveal" },
    ],
  },
  {
    id: "human-centred-philosophy",
    order: 10,
    title: "Human-Centred Philosophy",
    eyebrow: "Human-Centred Control",
    headline: "The room, console and environment are planned around human decisions.",
    supportingMessage:
      "Human factors connect the mission, the operator position, the video wall, supervision and the surrounding room architecture.",
    durationMs: 38_000,
    visualNote: "Human-factors graphic with operator, wall and supervisor relationships.",
    presenterTalkingPoint:
      "This is the transition from problem to OnePWS solution logic.",
    technicalLayers: ["Human factors", "Task alignment", "Room behaviour"],
    beats: [
      { id: "operator", label: "Operator", startsAtMs: 0, durationMs: 12_000, motionPreset: "fade" },
      { id: "task", label: "Task", startsAtMs: 12_000, durationMs: 13_000, motionPreset: "calmDolly" },
      { id: "environment", label: "Environment", startsAtMs: 25_000, durationMs: 13_000, motionPreset: "layerReveal" },
    ],
  },
  {
    id: "complete-ecosystem",
    order: 11,
    title: "One Environment. Connected Intelligence.",
    eyebrow: "Connected Room System",
    headline: "One Environment. Connected Intelligence.",
    supportingMessage:
      "Consoles, video wall, lighting, acoustics, raised floor, wall systems, supervisor areas and intelligent layers are explored as one connected environment.",
    durationMs: 45_000,
    visualNote: "Full-room capability exploration.",
    presenterTalkingPoint:
      "Use this scene to prepare the audience for optional feature exploration.",
    technicalLayers: ["Console layer", "Room architecture", "Service access"],
    beats: [
      { id: "products", label: "Operator systems", startsAtMs: 0, durationMs: 15_000, motionPreset: "layerReveal" },
      { id: "architecture", label: "Architecture", startsAtMs: 15_000, durationMs: 15_000, motionPreset: "layerReveal" },
      { id: "service", label: "Service", startsAtMs: 30_000, durationMs: 15_000, motionPreset: "scan" },
    ],
  },
  {
    id: "console-portfolio",
    order: 12,
    title: "Control-Room Console Portfolio",
    eyebrow: "Operator Console System",
    headline: "Console capability anchors the operator environment.",
    supportingMessage:
      "Standard ranges, custom consoles, command desks, ATC/AOC environments and equipment integration are presented as one operator-console system.",
    durationMs: 40_000,
    visualNote: "Control-room console capability view.",
    presenterTalkingPoint:
      "Keep this overview concise; detailed range names open in feature exploration.",
    technicalLayers: ["Console ranges", "Custom builds", "Product families"],
    beats: [
      { id: "standard", label: "Range", startsAtMs: 0, durationMs: 13_000, motionPreset: "fade" },
      { id: "custom", label: "Customisation", startsAtMs: 13_000, durationMs: 14_000, motionPreset: "scan" },
      { id: "integration", label: "Integration", startsAtMs: 27_000, durationMs: 13_000, motionPreset: "layerReveal" },
    ],
  },
  {
    id: "intelligent-features",
    order: 13,
    title: "Intelligent Features",
    eyebrow: "Intelligent Feature Layers",
    headline: "Intelligent features support operators, supervisors and room state.",
    supportingMessage:
      "Alertness management, voice command, universal control, situational awareness, RFID adjustment and movement safety are optional product layers.",
    durationMs: 45_000,
    visualNote: "Console feature callout system.",
    presenterTalkingPoint:
      "Do not present software integrations or deployments unless they are confirmed.",
    technicalLayers: ["Operator Alertness Management System", "Voice command", "Safety and movement systems"],
    beats: [
      { id: "operator", label: "Operator", startsAtMs: 0, durationMs: 15_000, motionPreset: "fade" },
      { id: "room-state", label: "Room state", startsAtMs: 15_000, durationMs: 15_000, motionPreset: "scan" },
      { id: "safety", label: "Safety", startsAtMs: 30_000, durationMs: 15_000, motionPreset: "layerReveal" },
    ],
  },
  {
    id: "incident-response",
    order: 14,
    title: "When Every Second Matters.",
    eyebrow: "Incident Response Logic",
    headline: "When Every Second Matters.",
    supportingMessage:
      "A conceptual control-room response story showing how room zones, people and information layers can coordinate during an event.",
    durationMs: 68_000,
    visualNote: "Full-screen incident-response simulation with timeline, guided mode and manual stepping.",
    presenterTalkingPoint:
      "State clearly that the sequence is conceptual. Actual software, SCADA, AI, SOP, lighting, video wall and reporting integrations require project confirmation.",
    technicalLayers: ["Response sequence", "Integration scope", "Project-specific software"],
    beats: [
      { id: "normal", label: "Normal operation", startsAtMs: 0, durationMs: 10_000, motionPreset: "fade" },
      { id: "detect", label: "Detect and focus", startsAtMs: 10_000, durationMs: 22_000, motionPreset: "scan" },
      { id: "coordinate", label: "Coordinate response", startsAtMs: 32_000, durationMs: 22_000, motionPreset: "layerReveal" },
      { id: "resolve", label: "Resolve and summarise", startsAtMs: 54_000, durationMs: 14_000, motionPreset: "fade" },
    ],
  },
  {
    id: "ergonomic-methodology",
    order: 15,
    title: "ISO 11064 and Ergonomic Study",
    eyebrow: "Ergonomic Engineering",
    headline: "Ergonomic study turns operator needs into validated room decisions.",
    supportingMessage:
      "ISO 11064 methodology, task analysis, sightline geometry, reach, posture and work-zone validation turn comfort into engineered decisions.",
    durationMs: 48_000,
    visualNote: "Methodology flow with optional detailed layers.",
    presenterTalkingPoint:
      "Make ergonomics tangible as a deliverable, not an abstract claim.",
    technicalLayers: ["ISO 11064", "Task and workflow analysis", "Study deliverables"],
    beats: [
      { id: "standard", label: "Method", startsAtMs: 0, durationMs: 16_000, motionPreset: "fade" },
      { id: "analysis", label: "Task study", startsAtMs: 16_000, durationMs: 16_000, motionPreset: "scan" },
      { id: "deliverables", label: "Validation", startsAtMs: 32_000, durationMs: 16_000, motionPreset: "layerReveal" },
    ],
  },
  {
    id: "sightline-comfort",
    order: 16,
    title: "Sightlines, Reach and Comfort",
    eyebrow: "Sightline Geometry",
    headline: "Viewing geometry and comfort shape the room before finishes are selected.",
    supportingMessage:
      "Sightlines, viewing cones, reach zones, posture, lighting, glare, acoustics and thermal comfort shape the room before finishes are selected.",
    durationMs: 45_000,
    visualNote: "Viewing cone and comfort-zone diagram.",
    presenterTalkingPoint:
      "Explain the human geometry before showing architecture and interiors.",
    technicalLayers: ["Viewing geometry", "Reach and posture", "Lighting and comfort"],
    beats: [
      { id: "viewing", label: "Viewing", startsAtMs: 0, durationMs: 15_000, motionPreset: "calmDolly" },
      { id: "reach", label: "Reach", startsAtMs: 15_000, durationMs: 15_000, motionPreset: "scan" },
      { id: "comfort", label: "Comfort", startsAtMs: 30_000, durationMs: 15_000, motionPreset: "layerReveal" },
    ],
  },
  {
    id: "design-build-approach",
    order: 17,
    title: "Integrated Design-Build Approach",
    eyebrow: "Integrated Delivery",
    headline: "One integrated approach connects study, design, manufacturing and site execution.",
    supportingMessage:
      "Architecture, interiors, wall systems, cladding, acoustics, manufacturing and site execution are coordinated as one delivery path.",
    durationMs: 44_000,
    visualNote: "End-to-end scope diagram.",
    presenterTalkingPoint:
      "Avoid unapproved exclusivity claims; describe accountable integrated delivery.",
    technicalLayers: ["Architecture and interiors", "Wall and acoustic systems", "Delivery scope"],
    beats: [
      { id: "study", label: "Study", startsAtMs: 0, durationMs: 14_000, motionPreset: "fade" },
      { id: "design", label: "Design", startsAtMs: 14_000, durationMs: 15_000, motionPreset: "layerReveal" },
      { id: "execute", label: "Deliver", startsAtMs: 29_000, durationMs: 15_000, motionPreset: "scan" },
    ],
  },
  {
    id: "architectural-systems",
    order: 18,
    title: "Architectural and Environmental Systems",
    eyebrow: "Operational Envelope",
    headline: "The room envelope is operational infrastructure.",
    supportingMessage:
      "Ceiling, lighting, raised access flooring, video-wall integration, supervisor areas and collaboration spaces are treated as operational infrastructure.",
    durationMs: 48_000,
    visualNote: "Architectural systems as layered room assembly.",
    presenterTalkingPoint:
      "Show the control room as an integrated environment, not a collection of finishes.",
    technicalLayers: ["Ceiling and lighting", "Raised access flooring", "Video-wall integration"],
    beats: [
      { id: "ceiling", label: "Ceiling", startsAtMs: 0, durationMs: 16_000, motionPreset: "layerReveal" },
      { id: "floor", label: "Floor", startsAtMs: 16_000, durationMs: 16_000, motionPreset: "layerReveal" },
      { id: "wall", label: "Video wall", startsAtMs: 32_000, durationMs: 16_000, motionPreset: "scan" },
    ],
  },
  {
    id: "delivery-methodology",
    order: 19,
    title: "Engineering and Project Methodology",
    eyebrow: "Controlled Execution",
    headline: "A structured process takes the room from design intent to handover.",
    supportingMessage:
      "Discovery, design, engineering coordination, manufacturing, FAT, installation, SAT, handover, warranty and lifecycle support form the delivery journey.",
    durationMs: 48_000,
    visualNote: "Editable process timeline.",
    presenterTalkingPoint:
      "This is where the buyer sees delivery confidence, not just design capability.",
    technicalLayers: ["Design-to-delivery process", "Engineering coordination", "FAT/SAT and lifecycle support"],
    beats: [
      { id: "design", label: "Design", startsAtMs: 0, durationMs: 16_000, motionPreset: "fade" },
      { id: "build", label: "Build", startsAtMs: 16_000, durationMs: 16_000, motionPreset: "scan" },
      { id: "handover", label: "Handover", startsAtMs: 32_000, durationMs: 16_000, motionPreset: "layerReveal" },
    ],
  },
  {
    id: "manufacturing-quality",
    order: 20,
    title: "Manufacturing and Quality",
    eyebrow: "Manufacturing Discipline",
    headline: "Manufacturing and quality systems support repeatable delivery.",
    supportingMessage:
      "In-house manufacturing, equipment capability, material control, component quality and improvement systems support repeatable delivery.",
    durationMs: 45_000,
    visualNote: "Manufacturing and quality proof wall.",
    presenterTalkingPoint:
      "Keep every machine name, supplier name and quality claim sourced and confirm permissions.",
    technicalLayers: ["In-house manufacturing", "Major equipment", "Quality-improvement programme"],
    beats: [
      { id: "manufacture", label: "Factory", startsAtMs: 0, durationMs: 15_000, motionPreset: "fade" },
      { id: "materials", label: "Materials", startsAtMs: 15_000, durationMs: 15_000, motionPreset: "scan" },
      { id: "quality", label: "Quality", startsAtMs: 30_000, durationMs: 15_000, motionPreset: "layerReveal" },
    ],
  },
  {
    id: "certification-overview",
    order: 21,
    title: "International Certifications",
    eyebrow: "International Compliance",
    headline: "Certification proof supports trust without cluttering the story.",
    supportingMessage:
      "The main scene shows certification categories. Scope, validity, product coverage and source references remain available in focused detail layers.",
    durationMs: 38_000,
    visualNote: "International certification proof matrix.",
    presenterTalkingPoint:
      "Use certification categories in the journey; open detailed proof only when the audience needs it.",
    technicalLayers: ["Safety certifications", "Sustainability certifications", "Ergonomic certifications"],
    beats: [
      { id: "safety", label: "Safety", startsAtMs: 0, durationMs: 12_000, motionPreset: "fade" },
      { id: "sustainability", label: "Sustainability", startsAtMs: 12_000, durationMs: 13_000, motionPreset: "scan" },
      { id: "ergonomics", label: "Ergonomics", startsAtMs: 25_000, durationMs: 13_000, motionPreset: "layerReveal" },
    ],
  },
  {
    id: "project-portfolio",
    order: 22,
    title: "Project Credentials",
    eyebrow: "Project Credentials",
    headline: "Project references become focused proof, not a static gallery.",
    supportingMessage:
      "The core scene introduces selected references. Featured projects, filters, galleries and case-study detail open only when selected.",
    durationMs: 48_000,
    visualNote: "Interactive project browser with source project imagery.",
    presenterTalkingPoint:
      "Keep project detail concise; deeper scope can be reviewed with the OnePWS team.",
    technicalLayers: ["Project browser", "Featured case studies", "Project image gallery"],
    beats: [
      { id: "portfolio", label: "References", startsAtMs: 0, durationMs: 16_000, motionPreset: "projectWall" },
      { id: "featured", label: "Case study", startsAtMs: 16_000, durationMs: 16_000, motionPreset: "calmDolly" },
      { id: "gallery", label: "Gallery", startsAtMs: 32_000, durationMs: 16_000, motionPreset: "layerReveal" },
    ],
  },
  {
    id: "customer-presence",
    order: 23,
    title: "Customers and Global Presence",
    eyebrow: "Customer Reach",
    headline: "Customer and presence proof stays curated in the main journey.",
    supportingMessage:
      "The core scene shows customer reach and global presence. The wider customer wall opens only when the audience wants more proof.",
    durationMs: 35_000,
    visualNote: "Curated customer and presence proof.",
    presenterTalkingPoint:
      "Final logo assets and usage rights must be confirmed before public deployment.",
    technicalLayers: ["Customer wall", "Global presence", "Brand artwork"],
    beats: [
      { id: "customers", label: "Customers", startsAtMs: 0, durationMs: 12_000, motionPreset: "fade" },
      { id: "presence", label: "Presence", startsAtMs: 12_000, durationMs: 12_000, motionPreset: "scan" },
      { id: "proof", label: "More proof", startsAtMs: 24_000, durationMs: 11_000, motionPreset: "layerReveal" },
    ],
  },
  {
    id: "why-onepws",
    order: 24,
    title: "Why OnePWS",
    eyebrow: "Why OnePWS",
    headline: "OnePWS brings the complete control room into one accountable capability.",
    supportingMessage:
      "Integrated design, ergonomic engineering, manufacturing capability, compliance, project proof and lifecycle support are consolidated into the buying case.",
    durationMs: 42_000,
    visualNote: "Six-pillar differentiator layout.",
    presenterTalkingPoint:
      "Summarise the differentiated value without turning the close into a company-profile recap.",
    technicalLayers: ["Differentiators", "Integrated delivery", "Decision support"],
    beats: [
      { id: "integrated", label: "Integrated", startsAtMs: 0, durationMs: 14_000, motionPreset: "fade" },
      { id: "engineered", label: "Engineered", startsAtMs: 14_000, durationMs: 14_000, motionPreset: "scan" },
      { id: "proven", label: "Proven", startsAtMs: 28_000, durationMs: 14_000, motionPreset: "layerReveal" },
    ],
  },
  {
    id: "next-steps-closing",
    order: 25,
    title: "The Future Starts Here",
    eyebrow: "Start The Design Process",
    headline: "The future of control rooms starts with a better design process.",
    supportingMessage:
      "Close with a clear path: discovery, site inputs, ergonomic study, concept layout, engineering proposal and technical review.",
    durationMs: 45_000,
    visualNote: "Closing scene with next actions.",
    presenterTalkingPoint:
      "Do not end with a generic thank-you. Move into consultation and concept layout.",
    technicalLayers: ["Engagement process", "Technical reference index", "Next-step planning"],
    beats: [
      { id: "discover", label: "Discover", startsAtMs: 0, durationMs: 15_000, motionPreset: "fade" },
      { id: "concept", label: "Concept", startsAtMs: 15_000, durationMs: 15_000, motionPreset: "layerReveal" },
      { id: "proposal", label: "Proposal", startsAtMs: 30_000, durationMs: 15_000, motionPreset: "scan" },
    ],
  },
];

export const enabledChapters = chapters
  .filter((chapter) => chapter.enabled !== false)
  .sort((a, b) => a.order - b.order);
