import type { FeatureStoryId } from "./featureStories";

export type ConnectedFeature = {
  id: string;
  featureStoryId: FeatureStoryId;
  name: string;
  shortName: string;
  benefit: string;
  x: number;
  y: number;
  tourOrder: number;
  group: "operator" | "console" | "room" | "infrastructure" | "supervision";
  sourceStatus: "verified" | "internally planned" | "confirmation required";
  operationalValue: string;
  userBenefit: string;
  architecturalIntegration: string;
  technicalDetail: string;
  relatedProject?: {
    name: string;
    note: string;
  };
  voiceover: string;
  animation:
    | "console"
    | "adjustment"
    | "alertness"
    | "voice"
    | "controller"
    | "safety"
    | "rfid"
    | "lighting"
    | "monitorArm"
    | "chair"
    | "wall"
    | "acoustic"
    | "wallSystem"
    | "floor"
    | "supervisor";
};

const confirmationRequired = "Technical specification is defined during OnePWS engineering review.";

export const connectedIntelligenceVisual = {
  assetId: "ambient-control-room",
  note:
    "OnePWS control-room environment visual.",
};

export const connectedIntelligenceFeatures: ConnectedFeature[] = [
  {
    id: "operator-console",
    featureStoryId: "adaptive-sit-stand-console",
    name: "Operator console",
    shortName: "Console",
    benefit: "Organizes displays, controls, power and service access around the operator position.",
    x: 46,
    y: 65,
    tourOrder: 1,
    group: "console",
    sourceStatus: "verified",
    operationalValue: "Creates the primary command position for continuous monitoring and response.",
    userBenefit: "Reduces reach strain and keeps critical controls within the active work zone.",
    architecturalIntegration: "Aligns with video-wall sightlines, cable routes, chair clearance and maintenance access.",
    technicalDetail:
      "Console dimensions, materials, ventilation, monitor mounting and cable capacity are defined from approved OnePWS product data.",
    relatedProject: {
      name: "Control Room Interiors references",
      note: "Specific console usage is reviewed from approved project records.",
    },
    voiceover:
      "The operator console is the command surface where displays, controls and service access come together around the operator.",
    animation: "console",
  },
  {
    id: "adaptive-adjustment",
    featureStoryId: "adaptive-sit-stand-console",
    name: "Adaptive adjustment",
    shortName: "Adaptive",
    benefit: "Supports posture variation while preserving the relationship between screens and controls.",
    x: 39,
    y: 71,
    tourOrder: 2,
    group: "console",
    sourceStatus: "verified",
    operationalValue: "Helps the workstation adapt across shifts and operator preferences.",
    userBenefit: "Allows operators to change posture without leaving the command position.",
    architecturalIntegration: "Requires coordination with monitor arms, chair movement, cable routing and floor service zones.",
    technicalDetail: confirmationRequired,
    relatedProject: {
      name: "Control room project reference",
      note: "Delivered adaptive-adjustment example requires confirmation.",
    },
    voiceover:
      "Adaptive adjustment supports posture change while keeping the command geometry stable for the operator.",
    animation: "adjustment",
  },
  {
    id: "alertness-management",
    featureStoryId: "operator-alertness-management",
    name: "Operator Alertness Management System",
    shortName: "Alertness",
    benefit: "Adds a fatigue-aware layer around operator readiness and shift risk.",
    x: 33,
    y: 58,
    tourOrder: 3,
    group: "operator",
    sourceStatus: "internally planned",
    operationalValue: "Supports supervisors in identifying when fatigue support or rotation may be needed.",
    userBenefit: "Keeps human readiness visible as part of the operating environment.",
    architecturalIntegration: "Coordinates with operator position planning, privacy controls, lighting strategy and supervisor visibility.",
    technicalDetail:
      "Sensor method, privacy approach, data retention, alert thresholds and compliance model require confirmation.",
    voiceover:
      "Alertness management treats operator readiness as a mission-critical variable, not an afterthought.",
    animation: "alertness",
  },
  {
    id: "voice-command",
    featureStoryId: "voice-enabled-interaction",
    name: "Voice command",
    shortName: "Voice",
    benefit: "Creates a hands-light interaction layer for selected room or console commands.",
    x: 52,
    y: 59,
    tourOrder: 4,
    group: "console",
    sourceStatus: "internally planned",
    operationalValue: "Can reduce manual input for approved commands during high-pressure moments.",
    userBenefit: "Lets operators trigger selected actions without leaving the active viewing position.",
    architecturalIntegration: "Requires acoustic planning, microphone placement, security rules and command-scope definition.",
    technicalDetail:
      "Supported commands, recognition engine, authentication and customer-system integrations require confirmation.",
    voiceover:
      "Voice command is planned as a controlled interaction layer for selected actions, only after the approved command scope is defined.",
    animation: "voice",
  },
  {
    id: "universal-controller",
    featureStoryId: "voice-enabled-interaction",
    name: "Single-touch universal controller",
    shortName: "Controller",
    benefit: "Consolidates selected room, display or environment controls into one operator interface.",
    x: 58,
    y: 68,
    tourOrder: 5,
    group: "console",
    sourceStatus: "internally planned",
    operationalValue: "Can reduce fragmented control points when integrations are approved.",
    userBenefit: "Gives operators a clearer place to trigger routine room or display actions.",
    architecturalIntegration: "Must coordinate with BMS, AV, lighting, video-wall and customer IT/security requirements.",
    technicalDetail:
      "Supported integrations, control protocol and fail-safe behavior require project-specific confirmation.",
    voiceover:
      "A single-touch controller can simplify selected room actions when the connected systems and permissions are confirmed.",
    animation: "controller",
  },
  {
    id: "anti-collision",
    featureStoryId: "adaptive-sit-stand-console",
    name: "Safe anti-collision",
    shortName: "Safety",
    benefit: "Supports safer movement for adjustable workstation elements.",
    x: 41,
    y: 78,
    tourOrder: 6,
    group: "console",
    sourceStatus: "internally planned",
    operationalValue: "Reduces movement-related risk around adjustable console components.",
    userBenefit: "Helps protect operators, equipment and nearby objects during adjustment.",
    architecturalIntegration: "Requires clearance envelopes, cable movement planning and adjacent workstation coordination.",
    technicalDetail:
      "Sensor method, stop force, certification and test conditions require confirmation from approved product data.",
    voiceover:
      "Anti-collision safety protects the adjustment path, so movement does not become a new operating risk.",
    animation: "safety",
  },
  {
    id: "rfid-adjustment",
    featureStoryId: "personal-environment-bubble",
    name: "RFID-controlled user adjustment",
    shortName: "RFID",
    benefit: "Can recall approved user preferences for workstation or environment settings.",
    x: 50,
    y: 75,
    tourOrder: 7,
    group: "operator",
    sourceStatus: "internally planned",
    operationalValue: "Supports consistency when multiple operators use the same command position.",
    userBenefit: "Reduces setup friction at shift change.",
    architecturalIntegration: "Requires user profiles, access rules, console controls and privacy governance.",
    technicalDetail:
      "Stored preferences, authentication method, profile ownership and data policy require confirmation.",
    voiceover:
      "RFID-controlled adjustment can help a shared workstation return to approved user settings quickly.",
    animation: "rfid",
  },
  {
    id: "situational-lighting",
    featureStoryId: "situational-awareness-lighting",
    name: "Situational-awareness lighting",
    shortName: "Awareness light",
    benefit: "Uses room lighting states to reinforce operational attention.",
    x: 73,
    y: 41,
    tourOrder: 8,
    group: "room",
    sourceStatus: "verified",
    operationalValue: "Can support state changes such as normal monitoring, escalation or collaboration.",
    userBenefit: "Provides environmental cues without adding another display to watch.",
    architecturalIntegration: "Coordinates with ceiling design, wall finishes, glare control and video-wall readability.",
    technicalDetail:
      "Lighting scenes, control protocol, emergency behavior and integration scope require design confirmation.",
    relatedProject: {
      name: "Smart City / ICCC references",
      note: "Specific situational-lighting deployment details require confirmation.",
    },
    voiceover:
      "Situational lighting lets the room communicate state gently, reinforcing attention without visual clutter.",
    animation: "lighting",
  },
  {
    id: "monitor-arm",
    featureStoryId: "adaptive-sit-stand-console",
    name: "Automatic articulated monitor arm",
    shortName: "Monitor arm",
    benefit: "Helps tune display position to operator posture, reach and sightline needs.",
    x: 45,
    y: 54,
    tourOrder: 9,
    group: "console",
    sourceStatus: "internally planned",
    operationalValue: "Keeps individual screens aligned to changing operator requirements.",
    userBenefit: "Reduces awkward viewing and manual repositioning during long use.",
    architecturalIntegration: "Works with console depth, cable routing, display weight and sightline geometry.",
    technicalDetail:
      "Movement range, display load, drive system and safety limits require approved product confirmation.",
    voiceover:
      "The automatic monitor arm is planned to support display positioning as part of the operator's ergonomic setup.",
    animation: "monitorArm",
  },
  {
    id: "operator-chair",
    featureStoryId: "intelligent-operator-chair",
    name: "Ergonomic operator chair",
    shortName: "Chair",
    benefit: "Supports posture and movement through long-duration shifts.",
    x: 34,
    y: 73,
    tourOrder: 10,
    group: "operator",
    sourceStatus: "verified",
    operationalValue: "Keeps operator comfort stable through extended monitoring periods.",
    userBenefit: "Improves seated support, reach comfort and shift-to-shift consistency.",
    architecturalIntegration: "Works with console clearance, floor finish, circulation and operator sightline planning.",
    technicalDetail:
      "Chair model, adjustment range, upholstery and certification details are defined during engineering review.",
    relatedProject: {
      name: "Control Room Interiors references",
      note: "Specific chair usage is reviewed from approved project records.",
    },
    voiceover:
      "The ergonomic operator chair is part of the command position, supporting posture and movement across long shifts.",
    animation: "chair",
  },
  {
    id: "video-wall",
    featureStoryId: "scada-triggered-video-wall",
    name: "Video-wall integration",
    shortName: "Video wall",
    benefit: "Creates shared situational awareness at room scale.",
    x: 63,
    y: 30,
    tourOrder: 11,
    group: "room",
    sourceStatus: "verified",
    operationalValue: "Makes critical information visible to operators and supervisors at the same time.",
    userBenefit: "Reduces context switching between individual screens and shared operational status.",
    architecturalIntegration: "Defines room sightlines, seating geometry, lighting control and wall-system coordination.",
    technicalDetail:
      "Display technology, pixel pitch, controller scope and source integration are defined during engineering review.",
    relatedProject: {
      name: "WDFCC / Dedicated Freight Corridor, Ahmedabad",
      note: "Project imagery confirms control-room interior and video-wall environment; detailed scope is reviewed with the OnePWS team.",
    },
    voiceover:
      "The video wall is the room's shared field of awareness and must be planned with sightlines, content hierarchy and lighting.",
    animation: "wall",
  },
  {
    id: "acoustic-environment",
    featureStoryId: "intelligent-acoustic-environment",
    name: "Acoustic environment",
    shortName: "Acoustics",
    benefit: "Controls sound so teams can focus and coordinate clearly.",
    x: 22,
    y: 49,
    tourOrder: 12,
    group: "room",
    sourceStatus: "verified",
    operationalValue: "Reduces distraction and supports calmer communication during incidents.",
    userBenefit: "Makes the room easier to work in for long monitoring periods.",
    architecturalIntegration: "Integrates with wall panels, ceiling systems, room geometry and collaboration zones.",
    technicalDetail:
      "Acoustic targets, materials, test method and performance values are defined during project engineering.",
    voiceover:
      "Acoustic design is invisible when it works. It helps the room stay calm when operations become complex.",
    animation: "acoustic",
  },
  {
    id: "intelligent-lighting",
    featureStoryId: "circadian-lighting",
    name: "Intelligent lighting",
    shortName: "Lighting",
    benefit: "Balances visibility, comfort, glare control and operating state.",
    x: 31,
    y: 34,
    tourOrder: 13,
    group: "room",
    sourceStatus: "verified",
    operationalValue: "Supports visual comfort across long operating cycles.",
    userBenefit: "Improves comfort by tuning light quality to time, task and shift context.",
    architecturalIntegration: "Works with ceiling layout, lux planning, finish reflectance and screen glare control.",
    technicalDetail:
      "Lux levels, color-temperature strategy, dimming behavior and controls are defined during engineering review.",
    voiceover:
      "Intelligent lighting balances visibility, comfort and operating state across long control-room shifts.",
    animation: "lighting",
  },
  {
    id: "wall-ceiling-systems",
    featureStoryId: "environment-intelligence",
    name: "Wall and ceiling systems",
    shortName: "Envelope",
    benefit: "Integrates display surfaces, acoustic treatment, lighting, access and room identity.",
    x: 82,
    y: 34,
    tourOrder: 14,
    group: "infrastructure",
    sourceStatus: "verified",
    operationalValue: "Keeps technology and architectural finishes aligned instead of assembled separately.",
    userBenefit: "Creates a clearer, more consistent room with less visual distraction.",
    architecturalIntegration: "Coordinates video wall, acoustic cladding, lighting, access panels and brand expression.",
    technicalDetail:
      "Panel system, finish, access and fire-performance data are defined from approved specifications.",
    voiceover:
      "Wall and ceiling systems turn the room envelope into an engineered layer rather than a decorative finish.",
    animation: "wallSystem",
  },
  {
    id: "raised-access-floor",
    featureStoryId: "environment-intelligence",
    name: "Raised access floor",
    shortName: "Access floor",
    benefit: "Keeps power, data and service routes accessible below the room.",
    x: 53,
    y: 84,
    tourOrder: 15,
    group: "infrastructure",
    sourceStatus: "verified",
    operationalValue: "Makes maintenance and future changes less disruptive to live operations.",
    userBenefit: "Keeps visible room surfaces cleaner and reduces service interruptions.",
    architecturalIntegration: "Connects console layout, cable routing, equipment ventilation and expansion planning.",
    technicalDetail:
      "Load rating, finish, fire performance, static control and cable-routing standards are defined during engineering review.",
    voiceover:
      "The raised access floor is the hidden service layer that keeps the room maintainable and ready for change.",
    animation: "floor",
  },
  {
    id: "supervisor-area",
    featureStoryId: "supervisor-oversight-system",
    name: "Supervisor area",
    shortName: "Supervisor",
    benefit: "Gives supervisors clear oversight without interrupting operators.",
    x: 75,
    y: 67,
    tourOrder: 16,
    group: "supervision",
    sourceStatus: "verified",
    operationalValue: "Supports escalation, monitoring and coordination from a dedicated position.",
    userBenefit: "Helps supervisors intervene at the right moment with better visibility.",
    architecturalIntegration: "Aligns with operator rows, video wall, collaboration paths and acoustic separation.",
    technicalDetail:
      "Supervisor console, display needs and room position should be defined from operating procedures.",
    relatedProject: {
      name: "Smart City / ICCC references",
      note: "Supervisor area details by project require confirmation.",
    },
    voiceover:
      "The supervisor area gives leadership a clear operating position without crowding the live operator floor.",
    animation: "supervisor",
  },
];
