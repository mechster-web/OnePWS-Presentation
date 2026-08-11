export type FeatureStoryId =
  | "adaptive-sit-stand-console"
  | "rotatable-operator-desk"
  | "onehub-ai-desk-hub"
  | "operator-alertness-management"
  | "intelligent-operator-chair"
  | "scada-triggered-video-wall"
  | "situational-awareness-lighting"
  | "circadian-lighting"
  | "environment-intelligence"
  | "voice-enabled-interaction"
  | "ai-incident-copilot"
  | "personal-environment-bubble"
  | "supervisor-oversight-system"
  | "intelligent-acoustic-environment";

export type FeatureStory = {
  id: FeatureStoryId;
  title: string;
  headline: string;
  valueProposition: string;
  operationalBenefits: [string, string, string];
  heroVisual: {
    assetId?: string;
    fallbackLabel: string;
  };
  media: {
    animationLabel: string;
    videoAssetId?: string;
    voiceoverAssetId?: string;
  };
  voiceoverText: string;
  operationalValue: string;
  userBenefit: string;
  architecturalIntegration: string;
  technicalDetails: string[];
  relatedProject: {
    name: string;
    note: string;
  };
  presenterNotes: string;
};

const confirmationRequired = "defined during engineering review";

export const featureStories: FeatureStory[] = [
  {
    id: "adaptive-sit-stand-console",
    title: "Adaptive sit-stand operator console",
    headline: "A console that adapts to the operator and the shift.",
    valueProposition:
      "Supports posture variation while keeping displays, controls and cable access aligned to the mission.",
    operationalBenefits: [
      "Supports long-duration monitoring with posture flexibility.",
      "Keeps operator controls organized around the active work zone.",
      "Improves future serviceability when integrated with access-floor planning.",
    ],
    heroVisual: { fallbackLabel: "Sit-stand console cinematic visual" },
    media: { animationLabel: "Console height transition and cable-route reveal" },
    voiceoverText:
      "The adaptive sit-stand operator console supports posture variation while preserving the geometry of screens, controls and service access.",
    operationalValue:
      "Keeps the operator workstation usable across long shifts and changing operational demands.",
    userBenefit:
      "Gives operators a more comfortable posture range without breaking their relationship to screens and controls.",
    architecturalIntegration:
      "Must coordinate with display sightlines, chair clearance, cable routing, floor service zones and room circulation.",
    technicalDetails: [
      `Height range: ${confirmationRequired}.`,
      `Load rating: ${confirmationRequired}.`,
      `Drive system and control method: ${confirmationRequired}.`,
      `Cable-chain capacity and service access: ${confirmationRequired}.`,
    ],
    relatedProject: {
      name: "Control room project reference",
      note: "Specific console installation reference requires confirmation from approved project records.",
    },
    presenterNotes:
      "Use this when the buyer is concerned about long shifts, posture variation or future workstation adaptability.",
  },
  {
    id: "rotatable-operator-desk",
    title: "Rotatable operator desk",
    headline: "A desk orientation that can support changing tasks.",
    valueProposition:
      "Allows the operator position to respond to collaboration, supervision and display-viewing needs.",
    operationalBenefits: [
      "Supports task shifts between monitoring, coordination and review.",
      "Can improve collaboration without adding furniture clutter.",
      "Helps the room adapt to different operational modes.",
    ],
    heroVisual: { fallbackLabel: "Rotatable operator desk visual" },
    media: { animationLabel: "Desk rotation from monitoring to collaboration position" },
    voiceoverText:
      "A rotatable operator desk can support different working modes, from individual monitoring to quick collaboration.",
    operationalValue:
      "Adds flexibility where operators need to move between focused monitoring and shared decision-making.",
    userBenefit:
      "Reduces awkward body rotation and supports a more natural relationship between desk, display wall and team.",
    architecturalIntegration:
      "Requires clearances for rotation, chair movement, cable movement, floor interfaces and adjacent workstation spacing.",
    technicalDetails: [
      `Rotation mechanism: ${confirmationRequired}.`,
      `Locking positions: ${confirmationRequired}.`,
      `Cable-routing method during rotation: ${confirmationRequired}.`,
      `Clearance envelope: ${confirmationRequired}.`,
    ],
    relatedProject: {
      name: "Design consultancy reference",
      note: "Related delivered example requires confirmation.",
    },
    presenterNotes:
      "Position this as a flexible-workflow feature, not a novelty. Confirm feasibility per room geometry.",
  },
  {
    id: "onehub-ai-desk-hub",
    title: "OneHub or personal AI desk hub",
    headline: "A personal intelligence point at the operator desk.",
    valueProposition:
      "Creates a focused hub for prompts, summaries and task context when connected to approved systems.",
    operationalBenefits: [
      "Can reduce manual search during complex events.",
      "Can centralize operator task support in one place.",
      "Can support future AI-assisted workflows after system approval.",
    ],
    heroVisual: { fallbackLabel: "OneHub AI desk hub visual" },
    media: { animationLabel: "Operator prompt summary appearing beside active feeds" },
    voiceoverText:
      "OneHub is planned as a personal intelligence point, helping the operator receive context and support at the desk.",
    operationalValue:
      "Supports faster interpretation by bringing relevant prompts and summaries closer to the operator workflow.",
    userBenefit:
      "Reduces the need to search across disconnected sources during pressure moments.",
    architecturalIntegration:
      "Should sit within the console without compromising input-device placement, sightlines or service access.",
    technicalDetails: [
      `AI model capability: ${confirmationRequired}.`,
      `Approved system integrations: ${confirmationRequired}.`,
      `Data governance and privacy: ${confirmationRequired}.`,
      `User interface hardware: ${confirmationRequired}.`,
    ],
    relatedProject: {
      name: "Future intelligent-room reference",
      note: "Project proof can be reviewed after the intelligent-room scope is defined.",
    },
    presenterNotes:
      "Clearly frame AI content as future/approved integration. Do not claim deployed software capability from the source PDF.",
  },
  {
    id: "operator-alertness-management",
    title: "Operator Alertness Management System",
    headline: "A room-level lens on operator readiness.",
    valueProposition:
      "Supports fatigue-aware operations by surfacing alertness indicators for supervisors and teams.",
    operationalBenefits: [
      "Supports fatigue risk awareness.",
      "Can inform shift support and escalation decisions.",
      "Adds a human-readiness layer to the control-room environment.",
    ],
    heroVisual: { fallbackLabel: "Operator alertness management visual" },
    media: { animationLabel: "Alertness status moves from operator position to supervisor view" },
    voiceoverText:
      "Alertness management treats operator readiness as part of mission performance, supporting fatigue-aware operations.",
    operationalValue:
      "Helps the control room account for human readiness alongside system status.",
    userBenefit:
      "Can support timely intervention before fatigue becomes an operational risk.",
    architecturalIntegration:
      "Connects operator positions, supervisor oversight, lighting strategy and privacy-aware interface planning.",
    technicalDetails: [
      `Sensor method: ${confirmationRequired}.`,
      `Alertness indicators: ${confirmationRequired}.`,
      `Privacy and consent model: ${confirmationRequired}.`,
      `Data retention policy: ${confirmationRequired}.`,
    ],
    relatedProject: {
      name: "Human performance feature",
      note: "Project proof can be reviewed after the human-performance scope is defined.",
    },
    presenterNotes:
      "Use carefully. Buyers may ask about privacy, consent and data governance before technology details.",
  },
  {
    id: "intelligent-operator-chair",
    title: "Intelligent operator chair",
    headline: "Seating designed as part of the command position.",
    valueProposition:
      "Supports long-duration operator comfort when planned with console geometry and room layout.",
    operationalBenefits: [
      "Supports posture through extended shifts.",
      "Improves consistency across operator positions.",
      "Works with console clearance and circulation planning.",
    ],
    heroVisual: { fallbackLabel: "Intelligent operator chair visual" },
    media: { animationLabel: "Chair support zones align to console reach envelope" },
    voiceoverText:
      "The intelligent operator chair is part of the command position, supporting posture and movement across long shifts.",
    operationalValue:
      "Keeps operator comfort stable in spaces designed for continuous monitoring.",
    userBenefit:
      "Improves seated support and reduces physical strain during repeated tasks.",
    architecturalIntegration:
      "Must align with console height, monitor position, floor surface, circulation and workstation spacing.",
    technicalDetails: [
      `Adjustment range: ${confirmationRequired}.`,
      `Chair model and upholstery: ${confirmationRequired}.`,
      `Certification details: ${confirmationRequired}.`,
      `Warranty/service model: ${confirmationRequired}.`,
    ],
    relatedProject: {
      name: "Control Room Interiors references",
      note: "Specific chair usage per completed project requires confirmation.",
    },
    presenterNotes:
      "Tie this to the operator-position system: console, chair, monitor and room geometry together.",
  },
  {
    id: "scada-triggered-video-wall",
    title: "SCADA-triggered intelligent video wall",
    headline: "A shared awareness wall that responds to operational state.",
    valueProposition:
      "Prioritizes the room’s attention by connecting display hierarchy to operational triggers.",
    operationalBenefits: [
      "Improves shared situational awareness.",
      "Can elevate critical information to room scale.",
      "Supports faster supervisor and team alignment.",
    ],
    heroVisual: { fallbackLabel: "SCADA-triggered video wall visual" },
    media: { animationLabel: "SCADA event expands from operator screen to shared wall" },
    voiceoverText:
      "A SCADA-triggered intelligent video wall can elevate critical operational states into the room's shared field of awareness.",
    operationalValue:
      "Helps teams see priority changes together instead of relying only on individual workstation screens.",
    userBenefit:
      "Reduces context switching and makes escalation easier to recognize.",
    architecturalIntegration:
      "Defines sightlines, content zones, lighting control, wall structure and supervisor positioning.",
    technicalDetails: [
      `SCADA integration method: ${confirmationRequired}.`,
      `Video wall technology and pixel pitch: ${confirmationRequired}.`,
      `Controller and source routing: ${confirmationRequired}.`,
      `Failover behavior: ${confirmationRequired}.`,
    ],
    relatedProject: {
      name: "WDFCC Ahmedabad / Chandigarh ICCC Smart City",
      note: "Source presentation includes control-room imagery; software-trigger behavior is scoped project by project.",
    },
    presenterNotes:
      "Do not imply software integration was delivered unless confirmed. Present as a target intelligent capability.",
  },
  {
    id: "situational-awareness-lighting",
    title: "Situational awareness lighting",
    headline: "Lighting that supports room awareness.",
    valueProposition:
      "Uses environmental lighting states to reinforce operating context without adding visual clutter.",
    operationalBenefits: [
      "Supports awareness of room states.",
      "Can reinforce escalation or collaboration modes.",
      "Improves ambience without distracting from displays.",
    ],
    heroVisual: { fallbackLabel: "Situational awareness lighting visual" },
    media: { animationLabel: "Room lighting shifts from normal monitoring to escalation state" },
    voiceoverText:
      "Situational awareness lighting lets the room gently communicate operational state through the environment itself.",
    operationalValue:
      "Adds a non-screen cue layer for room state and escalation context.",
    userBenefit:
      "Helps operators perceive changes without another dashboard demanding attention.",
    architecturalIntegration:
      "Coordinates with ceiling design, wall finishes, video wall brightness, glare control and control protocols.",
    technicalDetails: [
      `Lighting scenes: ${confirmationRequired}.`,
      `Control protocol: ${confirmationRequired}.`,
      `Emergency state behavior: ${confirmationRequired}.`,
      `Integration with operational triggers: ${confirmationRequired}.`,
    ],
    relatedProject: {
      name: "Control Room Interiors references",
      note: "Lighting design appears in project imagery; intelligent trigger behavior is scoped project by project.",
    },
    presenterNotes:
      "Keep the language subtle. This is environmental support, not theatrical lighting.",
  },
  {
    id: "circadian-lighting",
    title: "Circadian lighting",
    headline: "Light quality designed for continuous teams.",
    valueProposition:
      "Supports visual comfort and shift rhythm through planned light states.",
    operationalBenefits: [
      "Supports comfort over long operating cycles.",
      "Can tune light quality by time, task or shift.",
      "Reduces harsh environmental contrast around displays.",
    ],
    heroVisual: { fallbackLabel: "Circadian lighting visual" },
    media: { animationLabel: "Lighting temperature transitions through a shift cycle" },
    voiceoverText:
      "Circadian lighting gives the control room a more considered light rhythm for teams working long and changing shifts.",
    operationalValue:
      "Creates a more stable lighting environment for continuous operations.",
    userBenefit:
      "Improves comfort and reduces the feeling of static artificial lighting across extended shifts.",
    architecturalIntegration:
      "Works with ceiling layout, lux planning, finish reflectance, screen glare and HVAC comfort planning.",
    technicalDetails: [
      `Lux levels: ${confirmationRequired}.`,
      `Color temperature range: ${confirmationRequired}.`,
      `Scene schedule: ${confirmationRequired}.`,
      `Controls and commissioning method: ${confirmationRequired}.`,
    ],
    relatedProject: {
      name: "Design Consultancy capability",
      note: "Source presentation mentions lux level calculations; project-specific proof is reviewed during design scoping.",
    },
    presenterNotes:
      "Connect to human-centred design and lux planning, but avoid health claims unless validated.",
  },
  {
    id: "environment-intelligence",
    title: "Environment intelligence",
    headline: "The room senses and supports its operating conditions.",
    valueProposition:
      "Brings environmental comfort signals into the control-room design conversation.",
    operationalBenefits: [
      "Supports more consistent room conditions.",
      "Can reveal comfort or environmental anomalies.",
      "Helps facilities teams tune the room over time.",
    ],
    heroVisual: { fallbackLabel: "Environment intelligence visual" },
    media: { animationLabel: "Temperature, air and light indicators stabilize around operator zones" },
    voiceoverText:
      "Environment intelligence considers the room's comfort conditions as part of operational performance.",
    operationalValue:
      "Makes environmental quality visible so the room can be tuned and maintained more deliberately.",
    userBenefit:
      "Supports a more predictable experience across operator positions.",
    architecturalIntegration:
      "Connects HVAC, lighting, acoustics, finishes, sensor placement and supervisor/facility visibility.",
    technicalDetails: [
      `Sensors and measured parameters: ${confirmationRequired}.`,
      `Dashboard or display method: ${confirmationRequired}.`,
      `HVAC integration: ${confirmationRequired}.`,
      `Alert thresholds: ${confirmationRequired}.`,
    ],
    relatedProject: {
      name: "Design Consultancy capability",
      note: "Source mentions HVAC calculations; environment intelligence implementation is reviewed during design scoping.",
    },
    presenterNotes:
      "Frame as a future intelligent layer unless implementation details are confirmed.",
  },
  {
    id: "voice-enabled-interaction",
    title: "Voice-enabled interaction layer",
    headline: "Hands-free support for room interaction.",
    valueProposition:
      "Can let approved voice commands support navigation, summaries or presentation control.",
    operationalBenefits: [
      "Supports hands-free interaction during briefings.",
      "Can reduce manual interface switching.",
      "Can assist showroom or presenter-led demonstrations.",
    ],
    heroVisual: { fallbackLabel: "Voice interaction visual" },
    media: { animationLabel: "Voice command opens a relevant room layer" },
    voiceoverText:
      "A voice-enabled interaction layer can help teams access room functions or presentation content without adding another manual step.",
    operationalValue:
      "Creates a faster command path for approved interactions and guided demonstrations.",
    userBenefit:
      "Allows operators or presenters to keep focus on the room while requesting information.",
    architecturalIntegration:
      "Requires microphone placement, acoustic planning, privacy design and integration with approved command surfaces.",
    technicalDetails: [
      `Command vocabulary: ${confirmationRequired}.`,
      `Speech recognition system: ${confirmationRequired}.`,
      `Privacy and recording policy: ${confirmationRequired}.`,
      `Operational system permissions: ${confirmationRequired}.`,
    ],
    relatedProject: {
      name: "Future interaction layer",
      note: "Project proof can be reviewed after the interaction scope is defined.",
    },
    presenterNotes:
      "Avoid implying live control of client systems. Treat as an optional interaction layer.",
  },
  {
    id: "ai-incident-copilot",
    title: "AI incident copilot",
    headline: "Decision support for incident context.",
    valueProposition:
      "Can assist teams by summarizing context and prompting response steps when connected to approved data sources.",
    operationalBenefits: [
      "Can shorten context-building during incidents.",
      "Can support consistent response prompts.",
      "Can help supervisors track event progression.",
    ],
    heroVisual: { fallbackLabel: "AI incident copilot visual" },
    media: { animationLabel: "Incident signal becomes a structured response summary" },
    voiceoverText:
      "An AI incident copilot can help structure incident context, but only through approved data, workflows and governance.",
    operationalValue:
      "Supports faster interpretation of complex events where many signals arrive together.",
    userBenefit:
      "Reduces the burden of manually assembling context during pressure moments.",
    architecturalIntegration:
      "Lives across the operator hub, supervisor area, video wall hierarchy and incident collaboration workflow.",
    technicalDetails: [
      `Data sources: ${confirmationRequired}.`,
      `AI model and deployment approach: ${confirmationRequired}.`,
      `Human approval workflow: ${confirmationRequired}.`,
      `Audit trail and governance: ${confirmationRequired}.`,
    ],
    relatedProject: {
      name: "Future AI workflow",
      note: "Project proof can be reviewed after AI workflow governance is defined.",
    },
    presenterNotes:
      "Be especially careful: no performance claims, no safety claims, no autonomous-action claims.",
  },
  {
    id: "personal-environment-bubble",
    title: "Personal environment bubble",
    headline: "Localized comfort around the operator position.",
    valueProposition:
      "Can support operator-level comfort tuning without compromising the shared room environment.",
    operationalBenefits: [
      "Supports individual comfort preferences.",
      "Can reduce discomfort across different operators and shifts.",
      "Keeps comfort strategy connected to the workstation.",
    ],
    heroVisual: { fallbackLabel: "Personal environment bubble visual" },
    media: { animationLabel: "Localized comfort zone forms around an operator position" },
    voiceoverText:
      "A personal environment bubble can tune comfort around the operator position while remaining part of the larger room strategy.",
    operationalValue:
      "Helps manage comfort variation in rooms used by multiple operators over long periods.",
    userBenefit:
      "Gives the operator a more supportive local environment at the workstation.",
    architecturalIntegration:
      "Requires coordination with HVAC distribution, console design, sensor placement, floor routing and room acoustics.",
    technicalDetails: [
      `Comfort parameters: ${confirmationRequired}.`,
      `Local control method: ${confirmationRequired}.`,
      `HVAC integration: ${confirmationRequired}.`,
      `Sensor placement: ${confirmationRequired}.`,
    ],
    relatedProject: {
      name: "Future comfort feature",
      note: "Project proof can be reviewed after the comfort-control scope is defined.",
    },
    presenterNotes:
      "Present as a concept/intelligent layer until product definition is approved.",
  },
  {
    id: "supervisor-oversight-system",
    title: "Supervisor oversight system",
    headline: "A dedicated layer for escalation and room leadership.",
    valueProposition:
      "Gives supervisors a clearer view of room status, operators and incident progression.",
    operationalBenefits: [
      "Supports escalation decisions.",
      "Improves visibility across operator positions.",
      "Connects supervisor review to shared room displays.",
    ],
    heroVisual: { fallbackLabel: "Supervisor oversight system visual" },
    media: { animationLabel: "Supervisor view connects operator rows and video wall state" },
    voiceoverText:
      "The supervisor oversight system gives room leadership a dedicated position for visibility, escalation and coordination.",
    operationalValue:
      "Supports faster leadership intervention and clearer coordination during abnormal events.",
    userBenefit:
      "Helps supervisors monitor without crowding the operator floor.",
    architecturalIntegration:
      "Aligns supervisor seating, displays, video wall sightlines, acoustic separation and collaboration paths.",
    technicalDetails: [
      `Supervisor display requirements: ${confirmationRequired}.`,
      `Escalation workflow: ${confirmationRequired}.`,
      `Console or desk specification: ${confirmationRequired}.`,
      `Room position and sightline validation: ${confirmationRequired}.`,
    ],
    relatedProject: {
      name: "Noida ITMS / Chandigarh ICCC Smart City",
      note: "Source includes control-room imagery; supervisor-system scope is defined project by project.",
    },
    presenterNotes:
      "Use with stakeholders focused on room management, escalation and operational command hierarchy.",
  },
  {
    id: "intelligent-acoustic-environment",
    title: "Intelligent acoustic environment",
    headline: "A calmer acoustic field for critical decisions.",
    valueProposition:
      "Combines acoustic architecture and potential sensing to reduce distraction and support communication.",
    operationalBenefits: [
      "Reduces distraction in continuous monitoring spaces.",
      "Supports clearer communication during incidents.",
      "Can help separate collaboration from live monitoring.",
    ],
    heroVisual: { fallbackLabel: "Intelligent acoustic environment visual" },
    media: { animationLabel: "Sound waves soften around operator and collaboration zones" },
    voiceoverText:
      "An intelligent acoustic environment helps the room stay calm, focused and communicative when operations become complex.",
    operationalValue:
      "Improves the quality of communication and attention in rooms with many people and systems.",
    userBenefit:
      "Makes long periods in the room less fatiguing and incident discussions easier to follow.",
    architecturalIntegration:
      "Coordinates wall panels, ceiling systems, room geometry, collaboration rooms and material selection.",
    technicalDetails: [
      `Acoustic targets: ${confirmationRequired}.`,
      `Panel materials and placement: ${confirmationRequired}.`,
      `Measurement method: ${confirmationRequired}.`,
      `Sensing or adaptive behavior: ${confirmationRequired}.`,
    ],
    relatedProject: {
      name: "Architectural / Control Room Interiors references",
      note: "Acoustic material proof by project requires confirmation.",
    },
    presenterNotes:
      "Connect to architectural fit-out capability, but do not claim acoustic ratings without source documents.",
  },
];

export function getFeatureStory(id: string | null | undefined) {
  if (!id) {
    return null;
  }

  return featureStories.find((feature) => feature.id === id) ?? null;
}

export function getAdjacentFeatureStories(id: FeatureStoryId) {
  const index = featureStories.findIndex((feature) => feature.id === id);
  return {
    previous: featureStories[(index - 1 + featureStories.length) % featureStories.length],
    next: featureStories[(index + 1) % featureStories.length],
  };
}
