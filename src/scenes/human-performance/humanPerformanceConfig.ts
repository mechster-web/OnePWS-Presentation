import type { ChapterId } from "../../data/contentTypes";

export type OperatorState =
  | "focused"
  | "pressured"
  | "fatigued"
  | "collaborating"
  | "adjusting"
  | "supported"
  | "alert"
  | "recovering"
  | "transitioning";

export type OperatorProfile = {
  id: string;
  role: string;
  shiftType: string;
  taskType: string;
  workDuration: string;
  primaryDisplays: string;
  collaborationRequirement: string;
  controlIntensity: "low" | "moderate" | "high";
  posturePreference: "seated" | "standing" | "sit-stand";
  reachProfile: "compact" | "balanced" | "extended";
  environmentalConditions: string[];
  accessibilityNeeds: string;
  scenarioObjective: string;
};

export type HumanScenario = {
  chapterId: ChapterId;
  scenarioRole: string;
  operatorProfileId: string;
  sceneKind:
    | "operator-centre"
    | "pressure-accumulation"
    | "reach-movement"
    | "sightline-visibility"
    | "posture-adjustability"
    | "fatigue-timeline"
    | "lighting-alertness"
    | "acoustic-comfort"
    | "information-overload"
    | "collaboration-pressure"
    | "inclusive-design"
    | "human-transformation";
  emotionalPurpose: string;
  technicalPurpose: string;
  operatorStates: OperatorState[];
  factors: string[];
  responses: string[];
  mainPrompt: string;
  technicalDetailPrompt: string;
  autoplayMs: number;
  condensed: boolean;
  claimBoundary: string;
};

export const operatorProfiles: OperatorProfile[] = [
  {
    id: "process-operator-standard-shift",
    role: "Process operator",
    shiftType: "Continuous operations shift",
    taskType: "Monitoring, response and escalation",
    workDuration: "Long-duration workstation use",
    primaryDisplays: "Console displays and shared control-room display",
    collaborationRequirement: "Supervisor and team coordination when events require escalation",
    controlIntensity: "high",
    posturePreference: "sit-stand",
    reachProfile: "balanced",
    environmentalConditions: ["Lighting balance", "Acoustic comfort", "Display visibility", "Thermal comfort"],
    accessibilityNeeds: "Different body profiles and task preferences should remain configurable where project scope supports it.",
    scenarioObjective: "Keep the operator centred while room, workstation and information layers support the task.",
  },
  {
    id: "supervisor-collaboration",
    role: "Supervisor",
    shiftType: "Escalation and handover windows",
    taskType: "Shared awareness and decision coordination",
    workDuration: "Focused collaboration periods within a shift",
    primaryDisplays: "Shared video wall, operator displays and collaboration points",
    collaborationRequirement: "Rapid movement from individual monitoring to shared response",
    controlIntensity: "moderate",
    posturePreference: "standing",
    reachProfile: "compact",
    environmentalConditions: ["Shared sightline", "Speech clarity", "Room orientation"],
    accessibilityNeeds: "Clear paths, readable information and flexible collaboration positions.",
    scenarioObjective: "Support collaboration without pulling operators away from focused work unnecessarily.",
  },
];

export const humanPerformanceScenarios: HumanScenario[] = [
  {
    chapterId: "mission-control-definition",
    scenarioRole: "Operator-centred introduction",
    operatorProfileId: "process-operator-standard-shift",
    sceneKind: "operator-centre",
    emotionalPurpose: "Reframe the room around the person making decisions.",
    technicalPurpose: "Connect awareness, response speed, ergonomic performance and maintainable infrastructure.",
    operatorStates: ["focused", "transitioning"],
    factors: ["Continuous operation", "Operator awareness", "Response speed"],
    responses: ["Task alignment", "Room behaviour", "Maintainable infrastructure"],
    mainPrompt: "Follow the operator's field of work",
    technicalDetailPrompt: "Open decision-environment layers",
    autoplayMs: 34_000,
    condensed: true,
    claimBoundary: "No response-time or performance metric is claimed without approved evidence.",
  },
  {
    chapterId: "operator-challenges",
    scenarioRole: "Pressure accumulation",
    operatorProfileId: "process-operator-standard-shift",
    sceneKind: "pressure-accumulation",
    emotionalPurpose: "Show how small environmental issues can accumulate without dramatizing risk.",
    technicalPurpose: "Preserve fatigue, information overload, posture, glare, noise, fragmented display and escalation content.",
    operatorStates: ["focused", "pressured", "fatigued"],
    factors: ["Fatigue", "Information overload", "Poor posture", "Glare", "Noise", "Fragmented displays", "Difficult escalation"],
    responses: ["Reduce unnecessary reach", "Improve visibility", "Support posture variation", "Coordinate escalation"],
    mainPrompt: "Select up to three pressure factors",
    technicalDetailPrompt: "View operator-pressure details",
    autoplayMs: 42_000,
    condensed: true,
    claimBoundary: "Qualitative strain language only; no medical diagnosis or injury-prevention claim.",
  },
  {
    chapterId: "poor-design-risk",
    scenarioRole: "Sightline and risk comparison",
    operatorProfileId: "process-operator-standard-shift",
    sceneKind: "sightline-visibility",
    emotionalPurpose: "Make avoidable exposure feel visible and correctable.",
    technicalPurpose: "Preserve sightline risk, maintenance disruption and expansion planning layers.",
    operatorStates: ["pressured", "transitioning", "supported"],
    factors: ["Poor sightlines", "Service disruption", "Thermal or acoustic discomfort", "Unmanaged expansion"],
    responses: ["Improved layout", "Service access planning", "Comfort planning", "Expansion paths"],
    mainPrompt: "Compare the sightline",
    technicalDetailPrompt: "Open planning-risk layers",
    autoplayMs: 38_000,
    condensed: false,
    claimBoundary: "Before/after is conceptual unless matched project media is supplied.",
  },
  {
    chapterId: "human-centred-philosophy",
    scenarioRole: "Human-performance transformation",
    operatorProfileId: "process-operator-standard-shift",
    sceneKind: "human-transformation",
    emotionalPurpose: "Create the memory moment where the room aligns around the operator.",
    technicalPurpose: "Preserve human factors, task alignment and room behaviour content.",
    operatorStates: ["pressured", "adjusting", "supported", "focused"],
    factors: ["Operator", "Task", "Environment"],
    responses: ["Desk relationship", "Display alignment", "Lighting balance", "Collaboration orientation", "Environmental calm"],
    mainPrompt: "Align the room around the operator",
    technicalDetailPrompt: "Reveal human-factors logic",
    autoplayMs: 48_000,
    condensed: true,
    claimBoundary: "Use human-centred design language; do not promise quantified performance improvement.",
  },
  {
    chapterId: "ergonomic-methodology",
    scenarioRole: "Fatigue over time and standards care",
    operatorProfileId: "process-operator-standard-shift",
    sceneKind: "fatigue-timeline",
    emotionalPurpose: "Show how repeated effort matters across a shift without making medical claims.",
    technicalPurpose: "Preserve ISO 11064, task analysis, sightline geometry, reach, posture and work-zone validation content.",
    operatorStates: ["focused", "fatigued", "adjusting", "supported"],
    factors: ["Task and workflow analysis", "Sightline geometry", "Reach", "Posture", "Work-zone validation"],
    responses: ["Study method", "Task mapping", "Visual geometry", "Deliverable validation"],
    mainPrompt: "Move through the shift",
    technicalDetailPrompt: "View ISO 11064 and study detail",
    autoplayMs: 46_000,
    condensed: false,
    claimBoundary: "Preserve ISO 11064 as methodology/guidance unless certification scope is separately confirmed.",
  },
  {
    chapterId: "sightline-comfort",
    scenarioRole: "Reach, movement and visibility",
    operatorProfileId: "process-operator-standard-shift",
    sceneKind: "reach-movement",
    emotionalPurpose: "Make repeated reach and viewing geometry tangible.",
    technicalPurpose: "Preserve viewing cones, reach zones, posture, lighting, glare, acoustics and thermal comfort content.",
    operatorStates: ["adjusting", "supported", "focused"],
    factors: ["Viewing geometry", "Reach and posture", "Lighting and comfort"],
    responses: ["Comfortable reach", "Extended reach", "Primary information", "Shared display", "Comfort zone"],
    mainPrompt: "Choose a task zone",
    technicalDetailPrompt: "View reach and sightline layers",
    autoplayMs: 45_000,
    condensed: true,
    claimBoundary: "Use qualitative zones unless approved numeric ergonomic limits are added.",
  },
  {
    chapterId: "incident-response",
    scenarioRole: "Collaboration under pressure",
    operatorProfileId: "supervisor-collaboration",
    sceneKind: "collaboration-pressure",
    emotionalPurpose: "Show a calm transition from individual monitoring to coordinated response.",
    technicalPurpose: "Preserve conceptual response sequence and project-confirmation disclaimers.",
    operatorStates: ["focused", "collaborating", "transitioning"],
    factors: ["Normal operation", "Detect and focus", "Coordinate response", "Resolve and summarise"],
    responses: ["Supervisor joins", "Shared display activates", "Collaboration zone engages", "Operator returns to focused work"],
    mainPrompt: "Trigger collaboration mode",
    technicalDetailPrompt: "View conceptual integration scope",
    autoplayMs: 60_000,
    condensed: false,
    claimBoundary: "Conceptual only; software/SCADA/AI/SOP integrations require project confirmation.",
  },
];

export const humanPerformanceChapterIds = humanPerformanceScenarios.map((scenario) => scenario.chapterId);

export const executiveHumanPerformanceRoute = {
  id: "human-performance-executive",
  label: "Executive human-performance route",
  durationLabel: "2-4 min",
  sequence: ["operator-challenges", "sightline-comfort", "human-centred-philosophy", "why-onepws"] as ChapterId[],
};

export function getHumanScenario(chapterId: ChapterId) {
  return humanPerformanceScenarios.find((scenario) => scenario.chapterId === chapterId);
}

export function getOperatorProfile(profileId: string) {
  return operatorProfiles.find((profile) => profile.id === profileId) ?? operatorProfiles[0];
}
