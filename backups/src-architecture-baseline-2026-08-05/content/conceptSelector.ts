import {
  getCustomerPathRecommendations,
  industries,
  type CustomerIndustry,
} from "./customerPaths";
import { enabledChapters } from "./chapters";
import { featureStories, type FeatureStoryId } from "./featureStories";
import { projects } from "./projects";
import type { ChapterId } from "../data/contentTypes";

export type OperatorCount = "1-4" | "5-12" | "13-24" | "25+" | "Confirmation required";
export type OperatingPattern = "Business hours" | "Extended shifts" | "24/7 operations" | "Crisis / event-based";
export type ConsolePreference = "Straight" | "Curved" | "Rotatable" | "Open to recommendation";
export type OperationalPriority =
  | "Operator comfort"
  | "Incident response"
  | "Shared situational awareness"
  | "Maintainability"
  | "Scalability"
  | "Executive visibility";
export type VisualCharacter =
  | "Futuristic"
  | "Contemporary"
  | "Grand institutional"
  | "Industrial premium"
  | "Minimal technology"
  | "Mission-critical";
export type IntegrationLevel = "Foundational" | "Connected room" | "Intelligent assisted" | "Confirmation required";
export type RequirementLevel = "Required" | "Optional" | "Not required" | "Confirmation required";

export type ConceptSelection = {
  industry: CustomerIndustry;
  operators: OperatorCount;
  operatingPattern: OperatingPattern;
  consolePreference: ConsolePreference;
  priority: OperationalPriority;
  visualCharacter: VisualCharacter;
  integrationLevel: IntegrationLevel;
  supervisorRequirement: RequirementLevel;
  emergencyCollaborationRequirement: RequirementLevel;
  visitorGalleryRequirement: RequirementLevel;
};

export type ConceptRecommendation = {
  layoutDirection: string;
  featureIds: FeatureStoryId[];
  productCategories: string[];
  chapterIds: ChapterId[];
  projectIds: string[];
  nextDesignSteps: string[];
  notes: string[];
};

export const conceptOptions = {
  industries,
  operators: ["1-4", "5-12", "13-24", "25+", "Confirmation required"] as OperatorCount[],
  operatingPatterns: ["Business hours", "Extended shifts", "24/7 operations", "Crisis / event-based"] as OperatingPattern[],
  consolePreferences: ["Straight", "Curved", "Rotatable", "Open to recommendation"] as ConsolePreference[],
  priorities: [
    "Operator comfort",
    "Incident response",
    "Shared situational awareness",
    "Maintainability",
    "Scalability",
    "Executive visibility",
  ] as OperationalPriority[],
  visualCharacters: [
    "Futuristic",
    "Contemporary",
    "Grand institutional",
    "Industrial premium",
    "Minimal technology",
    "Mission-critical",
  ] as VisualCharacter[],
  integrationLevels: ["Foundational", "Connected room", "Intelligent assisted", "Confirmation required"] as IntegrationLevel[],
  requirementLevels: ["Required", "Optional", "Not required", "Confirmation required"] as RequirementLevel[],
};

export const defaultConceptSelection: ConceptSelection = {
  industry: "Smart cities",
  operators: "5-12",
  operatingPattern: "24/7 operations",
  consolePreference: "Curved",
  priority: "Shared situational awareness",
  visualCharacter: "Mission-critical",
  integrationLevel: "Connected room",
  supervisorRequirement: "Required",
  emergencyCollaborationRequirement: "Optional",
  visitorGalleryRequirement: "Optional",
};

const priorityFeatures: Record<OperationalPriority, FeatureStoryId[]> = {
  "Operator comfort": ["adaptive-sit-stand-console", "intelligent-operator-chair", "personal-environment-bubble"],
  "Incident response": ["ai-incident-copilot", "supervisor-oversight-system", "situational-awareness-lighting"],
  "Shared situational awareness": ["scada-triggered-video-wall", "supervisor-oversight-system", "situational-awareness-lighting"],
  Maintainability: ["adaptive-sit-stand-console", "environment-intelligence", "intelligent-acoustic-environment"],
  Scalability: ["adaptive-sit-stand-console", "scada-triggered-video-wall", "environment-intelligence"],
  "Executive visibility": ["supervisor-oversight-system", "scada-triggered-video-wall", "intelligent-acoustic-environment"],
};

function unique<T>(items: T[]) {
  return Array.from(new Set(items));
}

export function generateConceptRecommendation(selection: ConceptSelection): ConceptRecommendation {
  const path = getCustomerPathRecommendations({ industry: selection.industry });
  const featureIds = unique([
    ...path.recommendedProducts,
    ...priorityFeatures[selection.priority],
    ...(selection.consolePreference === "Rotatable" ? ["rotatable-operator-desk" as const] : []),
    ...(selection.integrationLevel === "Intelligent assisted"
      ? (["onehub-ai-desk-hub", "ai-incident-copilot", "voice-enabled-interaction"] as FeatureStoryId[])
      : []),
    ...(selection.supervisorRequirement === "Required" ? ["supervisor-oversight-system" as const] : []),
    ...(selection.emergencyCollaborationRequirement === "Required" ? ["situational-awareness-lighting" as const] : []),
  ]).slice(0, 8);

  const chapterIds = unique([
    ...path.recommendedChapters,
    "connected-environment" as const,
    "incident-response" as const,
    "proven-environments" as const,
    "configure-direction" as const,
  ]).slice(0, 6);

  const productCategories = unique([
    "Operator consoles",
    selection.consolePreference === "Rotatable" ? "Rotatable desk concept" : `${selection.consolePreference} console direction`,
    "Video wall and display hierarchy",
    selection.supervisorRequirement === "Required" ? "Supervisor oversight area" : "Supervisor provision to be confirmed",
    selection.emergencyCollaborationRequirement === "Required" ? "Emergency collaboration room" : "Collaboration provision to be confirmed",
    selection.integrationLevel === "Intelligent assisted" ? "AI-assisted interaction layer" : "Room integration layer",
    "Lighting, acoustics and architectural envelope",
  ]);

  return {
    layoutDirection: buildLayoutDirection(selection),
    featureIds,
    productCategories,
    chapterIds,
    projectIds: path.surfacedProjects,
    nextDesignSteps: [
      "Confirm operator count, shift pattern, room dimensions and adjacency requirements.",
      "Run task analysis, sightline study, console geometry review and circulation planning.",
      "Confirm integration boundaries for video wall, lighting, BMS, SCADA, AI or reporting systems.",
      "Prepare a concept layout, mood direction and budgetary scope after engineering inputs are verified.",
    ],
    notes: [
      "Early conceptual recommendation only. This is not an engineered design, technical specification or quotation.",
      path.neutralRecommendations[0] ?? "Relevant source-backed project detail may require confirmation.",
    ],
  };
}

function buildLayoutDirection(selection: ConceptSelection) {
  const scale =
    selection.operators === "1-4"
      ? "compact operator room"
      : selection.operators === "5-12"
        ? "mid-size command room"
        : selection.operators === "13-24"
          ? "multi-row operations centre"
          : selection.operators === "25+"
            ? "large command-centre floor"
            : "operator-count-led room";

  const console =
    selection.consolePreference === "Open to recommendation"
      ? "console geometry to be decided after task and sightline analysis"
      : `${selection.consolePreference.toLowerCase()} console direction`;

  return `${scale} with ${console}, tuned for ${selection.operatingPattern.toLowerCase()} and a ${selection.visualCharacter.toLowerCase()} visual character.`;
}

export function resolveConceptNames(recommendation: ConceptRecommendation) {
  return {
    features: recommendation.featureIds.map((id) => featureStories.find((feature) => feature.id === id)?.title ?? id),
    chapters: recommendation.chapterIds.map((id) => enabledChapters.find((chapter) => chapter.id === id)?.title ?? id),
    projects: recommendation.projectIds.map((id) => projects.find((project) => project.id === id)?.name ?? id),
  };
}
