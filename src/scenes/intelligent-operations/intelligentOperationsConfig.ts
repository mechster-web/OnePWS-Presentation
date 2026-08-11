import { connectedIntelligenceFeatures, type ConnectedFeature } from "../../content/connectedIntelligenceFeatures";
import { featureStories, type FeatureStory, type FeatureStoryId } from "../../content/featureStories";
import { incidentOutcomeSummary, incidentSimulationSteps, type IncidentSimulationStep } from "../../content/incidentSimulation";
import type { ChapterId } from "../../data/contentTypes";

export type OperationsPhase =
  | "normal"
  | "event"
  | "prioritised"
  | "recommended"
  | "operator-confirmation"
  | "response"
  | "collaboration"
  | "resolved"
  | "summary";

export type HumanLoopStage =
  | "system-observation"
  | "system-recommendation"
  | "operator-confirmation"
  | "operator-action"
  | "system-response"
  | "recorded-outcome";

export type OperationsCapability = {
  id: string;
  name: string;
  category:
    | "ai-assistance"
    | "oams"
    | "voice-control"
    | "display-orchestration"
    | "environmental-response"
    | "operator-support"
    | "collaboration"
    | "connected-workstation";
  phase: OperationsPhase;
  humanLoopStage: HumanLoopStage;
  approvedCapability: string;
  integrationBoundary: string;
  operatorRole: string;
  visualRole: string;
  sourceStatus: "verified" | "internally planned" | "confirmation required";
  featureStory?: FeatureStory;
  connectedFeature?: ConnectedFeature;
};

export type OperationsScenario = {
  chapterId: ChapterId;
  title: string;
  statement: string;
  mode: "capability-map" | "incident-sequence";
  principle: string;
  capabilities: OperationsCapability[];
  timeline: IncidentSimulationStep[];
  decisionPoints: Array<{ id: string; label: string; stage: HumanLoopStage; description: string }>;
  claimBoundary: string;
  autoplayMs: number;
  memoryMoment: boolean;
};

const featureById = Object.fromEntries(featureStories.map((feature) => [feature.id, feature]));
const connectedByFeatureId = Object.fromEntries(connectedIntelligenceFeatures.map((feature) => [feature.featureStoryId, feature]));

const confirmationBoundary =
  "Capability is shown as a conceptual or approved-scope interaction only. System integrations, AI behavior, automation rules, APIs, data governance and response workflows require project confirmation.";

export const intelligentOperationsChapterIds: ChapterId[] = ["intelligent-features", "incident-response"];

export const intelligentOperationsScenarios: OperationsScenario[] = [
  {
    chapterId: "intelligent-features",
    title: "Intelligent feature layers",
    statement: "Intelligence supports. The operator decides.",
    mode: "capability-map",
    principle: "Intelligence supports. The operator decides.",
    autoplayMs: 50_000,
    memoryMoment: false,
    capabilities: [
      capability("onehub-ai-desk-hub", "ai-assistance", "recommended", "system-recommendation", {
        operatorRole: "Reviews contextual support before acting.",
        visualRole: "Concise guidance appears beside the operator position, not as a generic chat window.",
        integrationBoundary: "AI model, data sources, privacy and governance require approval.",
      }),
      capability("operator-alertness-management", "oams", "prioritised", "system-observation", {
        operatorRole: "Remains accountable while supervisors use readiness context responsibly.",
        visualRole: "Human-readiness context is shown as a subtle supervisory layer.",
        integrationBoundary: "Sensor method, privacy, consent, indicators and retention policy require confirmation.",
      }),
      capability("voice-enabled-interaction", "voice-control", "operator-confirmation", "operator-confirmation", {
        operatorRole: "Initiates or confirms approved commands through voice or manual controls.",
        visualRole: "A restrained transcript and confirmation state appear near the relevant system.",
        integrationBoundary: "No live microphone capture or external audio processing is added in this prompt.",
      }),
      capability("scada-triggered-video-wall", "display-orchestration", "response", "system-response", {
        operatorRole: "Confirms or uses the shared display context during escalation.",
        visualRole: "Relevant information moves from workstation scale to shared-room scale.",
        integrationBoundary: "SCADA integration method, controller scope and content routing require engineering review.",
      }),
      capability("situational-awareness-lighting", "environmental-response", "response", "system-response", {
        operatorRole: "Receives a room-state cue without losing control of the event.",
        visualRole: "Light changes support attention with calm, controlled emphasis.",
        integrationBoundary: "Lighting scenes, controls and operational triggers require project confirmation.",
      }),
      capability("supervisor-oversight-system", "collaboration", "collaboration", "operator-action", {
        operatorRole: "Escalates or coordinates with supervisors without crowding the operator workflow.",
        visualRole: "Supervisor and collaboration zones activate as a response path.",
        integrationBoundary: "Escalation workflow, display needs and operating procedures require confirmation.",
      }),
      capability("personal-environment-bubble", "connected-workstation", "normal", "system-observation", {
        operatorRole: "Uses comfort support as part of the workstation environment.",
        visualRole: "A local comfort layer forms around the operator position.",
        integrationBoundary: "Comfort parameters, HVAC integration and sensor placement require confirmation.",
      }),
    ],
    timeline: incidentSimulationSteps.slice(0, 6),
    decisionPoints: defaultDecisionPoints(),
    claimBoundary: confirmationBoundary,
  },
  {
    chapterId: "incident-response",
    title: "Conceptual intelligent operations response",
    statement: "The room supports the response. The operator remains accountable.",
    mode: "incident-sequence",
    principle: "Intelligence supports. The operator decides.",
    autoplayMs: 68_000,
    memoryMoment: true,
    capabilities: [
      capability("ai-incident-copilot", "ai-assistance", "recommended", "system-recommendation", {
        operatorRole: "Reviews the structured incident context before acknowledging.",
        visualRole: "A compact recommendation sits next to the event context.",
        integrationBoundary: "AI workflow, data sources, audit trail and human approval flow require confirmation.",
      }),
      capability("scada-triggered-video-wall", "display-orchestration", "response", "system-response", {
        operatorRole: "Uses the video wall as shared context, not as an autonomous decision engine.",
        visualRole: "Event context is elevated to the shared awareness wall.",
        integrationBoundary: "Shown as conceptual room behavior unless project-specific scope is verified.",
      }),
      capability("situational-awareness-lighting", "environmental-response", "response", "system-response", {
        operatorRole: "Receives environmental support while retaining command responsibility.",
        visualRole: "Room lighting shifts to a focused incident state.",
        integrationBoundary: "Actual lighting integration requires confirmation for each deployed project.",
      }),
      capability("supervisor-oversight-system", "collaboration", "collaboration", "operator-action", {
        operatorRole: "Escalates and coordinates with the supervisor layer.",
        visualRole: "Supervisor and collaboration zones receive the event summary.",
        integrationBoundary: "Procedure-specific escalation rules are not claimed.",
      }),
    ],
    timeline: incidentSimulationSteps,
    decisionPoints: defaultDecisionPoints(),
    claimBoundary: incidentOutcomeSummary.disclaimer,
  },
];

export const executiveIntelligentOperationsRoute = {
  id: "intelligent-operations-executive",
  label: "Executive intelligent operations route",
  durationLabel: "5-7 min",
  sequence: ["intelligent-features", "incident-response", "complete-ecosystem", "why-onepws"] as ChapterId[],
};

export function getIntelligentOperationsScenario(chapterId: ChapterId) {
  return intelligentOperationsScenarios.find((scenario) => scenario.chapterId === chapterId);
}

function capability(
  featureStoryId: FeatureStoryId,
  category: OperationsCapability["category"],
  phase: OperationsPhase,
  humanLoopStage: HumanLoopStage,
  overrides: Pick<OperationsCapability, "operatorRole" | "visualRole" | "integrationBoundary">,
): OperationsCapability {
  const story = featureById[featureStoryId];
  const connectedFeature = connectedByFeatureId[featureStoryId];
  return {
    id: featureStoryId,
    name: story.title,
    category,
    phase,
    humanLoopStage,
    approvedCapability: story.valueProposition,
    integrationBoundary: overrides.integrationBoundary,
    operatorRole: overrides.operatorRole,
    visualRole: overrides.visualRole,
    sourceStatus: connectedFeature?.sourceStatus ?? "confirmation required",
    featureStory: story,
    connectedFeature,
  };
}

function defaultDecisionPoints() {
  return [
    {
      id: "observe",
      label: "Observe",
      stage: "system-observation" as const,
      description: "The system surfaces context without deciding for the operator.",
    },
    {
      id: "recommend",
      label: "Recommend",
      stage: "system-recommendation" as const,
      description: "A concise support layer explains what may need attention.",
    },
    {
      id: "confirm",
      label: "Confirm",
      stage: "operator-confirmation" as const,
      description: "The operator or presenter confirms the next action where required.",
    },
    {
      id: "respond",
      label: "Respond",
      stage: "system-response" as const,
      description: "Approved room systems change state after the relevant trigger or confirmation.",
    },
    {
      id: "record",
      label: "Record",
      stage: "recorded-outcome" as const,
      description: "The outcome is preserved for review where reporting scope is approved.",
    },
  ];
}
