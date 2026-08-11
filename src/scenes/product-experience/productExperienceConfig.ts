import type { ChapterId } from "../../data/contentTypes";
import { connectedIntelligenceFeatures, type ConnectedFeature } from "../../content/connectedIntelligenceFeatures";
import { featureStories, type FeatureStory, type FeatureStoryId } from "../../content/featureStories";

export type ProductSceneMode =
  | "flagship-reveal"
  | "task-state"
  | "sit-stand"
  | "monitor-system"
  | "chair-relationship"
  | "rotatable-console"
  | "cable-management"
  | "technology-integration"
  | "materials"
  | "modular-construction"
  | "configuration"
  | "comparison"
  | "room-context";

export type ProductCalloutState = "hidden" | "available" | "focused" | "active" | "explored" | "recommended" | "technical" | "presenter-only";

export type ProductModule = {
  id: string;
  productName: string;
  category: string;
  mode: ProductSceneMode;
  reveal: string;
  featureName: string;
  operatorValue: string;
  technicalDetail: string;
  approvedClaim: string;
  restrictedClaim: string;
  mediaReadiness: string;
  assetRequirement: string;
  sourceStatus: "verified" | "internally planned" | "confirmation required";
  relatedFeature?: FeatureStory;
  relatedConnectedFeature?: ConnectedFeature;
};

export type ProductExperience = {
  chapterId: ChapterId;
  flagshipProduct: string;
  productStatement: string;
  modules: ProductModule[];
  taskStates: Array<{
    id: string;
    label: string;
    description: string;
    supportedBy: string[];
  }>;
  configurationChoices: Array<{
    id: string;
    label: string;
    outcome: string;
    supported: boolean;
  }>;
  claimBoundary: string;
  autoplayMs: number;
};

const storyById = Object.fromEntries(featureStories.map((story) => [story.id, story]));
const connectedById = Object.fromEntries(connectedIntelligenceFeatures.map((feature) => [feature.id, feature]));

export const productExperienceChapterIds: ChapterId[] = ["console-portfolio"];

export const productExperiences: ProductExperience[] = [
  {
    chapterId: "console-portfolio",
    flagshipProduct: "Control-room console system",
    productStatement: "Console capability anchors the operator environment.",
    modules: [
      moduleFromConnected("operator-console", "Control-room console", "Operator console system", "flagship-reveal", {
        reveal: "Structural form, operator-facing geometry and complete product-in-context reveal.",
        restrictedClaim: "Do not imply unlisted console dimensions, materials or certifications.",
        assetRequirement: "Approved full-product console hero image or transparent render.",
      }),
      moduleFromStory("adaptive-sit-stand-console", "Adaptive sit-stand operator console", "Sit-stand workstation", "sit-stand", {
        reveal: "Seated focus, height adjustment concept, standing collaboration and return to preferred position.",
        restrictedClaim: "Do not invent height range, load rating, drive system, preset memory or health benefit.",
        assetRequirement: "Matched seated and standing workstation views, cable-continuity view.",
      }),
      moduleFromConnected("monitor-arm", "Automatic articulated monitor arm", "Monitor and display positioning", "monitor-system", {
        reveal: "Monitor alignment path, viewing zone and cable-routing relationship.",
        restrictedClaim: "Do not invent display load, movement range, motor type or safety limits.",
        assetRequirement: "Monitor-arm close-up, side view and cable-routing detail.",
      }),
      moduleFromStory("intelligent-operator-chair", "Intelligent operator chair", "Operator chair", "chair-relationship", {
        reveal: "Chair-to-console relationship, posture support zones and operator-use view.",
        restrictedClaim: "Do not make medical claims or imply one setting fits all operators.",
        assetRequirement: "Chair image in console context and approved adjustment-detail imagery.",
      }),
      {
        id: "cable-management-system",
        productName: "Cable and equipment integration",
        category: "Cable management",
        mode: "cable-management",
        reveal: "Surface access, cable path, service zone and return to clean product state.",
        featureName: "Organised power, data and service access",
        operatorValue: "Keeps the command surface visually and operationally organised.",
        technicalDetail: "Cable capacity, power/data routing, ventilation and service-access details require approved product data.",
        approvedClaim: "Technology and service access are planned as part of the console system.",
        restrictedClaim: "Do not show unsupported electrical architecture or cable capacity.",
        mediaReadiness: "Conceptual layer only.",
        assetRequirement: "Open cable tray, rear service access and equipment-housing views.",
        sourceStatus: "confirmation required",
      },
      {
        id: "materials-finishes",
        productName: "Console materials and finishes",
        category: "Materials and finishes",
        mode: "materials",
        reveal: "Edge, surface, touch point and full-product finish comparison.",
        featureName: "Material and finish coordination",
        operatorValue: "Supports a refined control-room interior without distracting from work.",
        technicalDetail: "Approved material names, finish codes, cleaning notes and durability claims are required before publication.",
        approvedClaim: "Finish and material decisions are part of the product engineering conversation.",
        restrictedClaim: "Do not invent material names, suppliers, fire ratings, cleanability or durability claims.",
        mediaReadiness: "Placeholder requirement only.",
        assetRequirement: "Macro material crops, edge detail and finish comparison images.",
        sourceStatus: "confirmation required",
      },
      {
        id: "modular-construction",
        productName: "Modular console construction",
        category: "Modular construction",
        mode: "modular-construction",
        reveal: "Conceptual component layers clearly labelled as conceptual until true exploded assets exist.",
        featureName: "Structured console modules",
        operatorValue: "Shows how workstation capability can be planned as an organised system.",
        technicalDetail: "Frame, top, panels, cabinets, accessories and upgrade paths require real product architecture data.",
        approvedClaim: "Standard ranges and custom consoles are presented as one operator-console system.",
        restrictedClaim: "Do not create false exploded engineering geometry.",
        mediaReadiness: "Conceptual layer only.",
        assetRequirement: "True exploded components or approved engineering diagram.",
        sourceStatus: "confirmation required",
      },
      {
        id: "configuration-path",
        productName: "Console configuration",
        category: "Product configuration",
        mode: "configuration",
        reveal: "Small number of choices that update outcome language without becoming a sales configurator.",
        featureName: "Task-led configuration",
        operatorValue: "Connects standard ranges, custom builds and integration to operational need.",
        technicalDetail: "Supported options and impossible combinations require approved product catalogue data.",
        approvedClaim: "Standard ranges, custom consoles, command desks, ATC/AOC environments and equipment integration are in scope.",
        restrictedClaim: "Do not expose pricing or unsupported combinations.",
        mediaReadiness: "Text and derived geometry only.",
        assetRequirement: "Alternative configuration imagery.",
        sourceStatus: "confirmation required",
      },
      {
        id: "product-in-room",
        productName: "Console in control-room environment",
        category: "Product-to-room relationship",
        mode: "room-context",
        reveal: "Pull from product focus to room context, showing display, chair, lighting and circulation relationship.",
        featureName: "Product as part of the room",
        operatorValue: "Shows why the console is planned with the complete operating environment.",
        technicalDetail: "Room context uses approved control-room imagery and chapter content.",
        approvedClaim: "Console capability anchors the operator environment.",
        restrictedClaim: "Do not use unrelated stock rooms or imply unapproved project scope.",
        mediaReadiness: "Approved control-room images exist for environment context.",
        assetRequirement: "Product-specific room-context hero image.",
        sourceStatus: "verified",
      },
    ],
    taskStates: [
      { id: "seated-monitoring", label: "Seated monitoring", description: "Focused work with displays and controls aligned to the operator.", supportedBy: ["Control-room console", "Intelligent operator chair", "Monitor arm"] },
      { id: "standing-collaboration", label: "Standing collaboration", description: "A task state for discussion, review or active response where supported by workstation scope.", supportedBy: ["Adaptive sit-stand operator console", "Monitor arm", "Cable management"] },
      { id: "service-access", label: "Service access", description: "Technology and cable access remain part of the workstation system.", supportedBy: ["Cable and equipment integration", "Modular console construction"] },
      { id: "room-context", label: "Room context", description: "The product reconnects to displays, lighting, chair, circulation and room architecture.", supportedBy: ["Console in control-room environment"] },
    ],
    configurationChoices: [
      { id: "operator-count", label: "Operator position", outcome: "Defines console scale, displays, reach and chair relationship.", supported: true },
      { id: "adjustability", label: "Adjustability", outcome: "Sit-stand or fixed configuration depends on approved product scope.", supported: true },
      { id: "monitor-layout", label: "Monitor layout", outcome: "Display count and mounting are confirmed through product engineering.", supported: true },
      { id: "finish-family", label: "Finish family", outcome: "Finish selection requires approved material imagery and codes.", supported: false },
    ],
    claimBoundary:
      "Product dimensions, materials, load ratings, motor specifications, certifications, patents, electrical details and compatibility statements require approved product data.",
    autoplayMs: 58_000,
  },
];

export const executiveProductRoute = {
  id: "product-executive",
  label: "Executive product route",
  durationLabel: "5-7 min",
  sequence: ["console-portfolio", "room-sounds-right", "room-built-to-protect", "room-engineered-to-last", "unified-control-room", "sightline-comfort", "complete-ecosystem", "why-onepws"] as ChapterId[],
};

export function getProductExperience(chapterId: ChapterId) {
  return productExperiences.find((experience) => experience.chapterId === chapterId);
}

function moduleFromConnected(
  id: string,
  productName: string,
  category: string,
  mode: ProductSceneMode,
  overrides: Pick<ProductModule, "reveal" | "restrictedClaim" | "assetRequirement">,
): ProductModule {
  const feature = connectedById[id];
  return {
    id,
    productName,
    category,
    mode,
    reveal: overrides.reveal,
    featureName: feature.name,
    operatorValue: feature.userBenefit,
    technicalDetail: feature.technicalDetail,
    approvedClaim: feature.benefit,
    restrictedClaim: overrides.restrictedClaim,
    mediaReadiness: feature.sourceStatus === "verified" ? "Approved environment support exists; product-specific views still recommended." : "Confirmation required.",
    assetRequirement: overrides.assetRequirement,
    sourceStatus: feature.sourceStatus,
    relatedConnectedFeature: feature,
    relatedFeature: storyById[feature.featureStoryId],
  };
}

function moduleFromStory(
  id: FeatureStoryId,
  productName: string,
  category: string,
  mode: ProductSceneMode,
  overrides: Pick<ProductModule, "reveal" | "restrictedClaim" | "assetRequirement">,
): ProductModule {
  const story = storyById[id];
  return {
    id,
    productName,
    category,
    mode,
    reveal: overrides.reveal,
    featureName: story.title,
    operatorValue: story.userBenefit,
    technicalDetail: story.technicalDetails.join(" "),
    approvedClaim: story.valueProposition,
    restrictedClaim: overrides.restrictedClaim,
    mediaReadiness: "Feature story exists; product-specific media requires approval.",
    assetRequirement: overrides.assetRequirement,
    sourceStatus: "confirmation required",
    relatedFeature: story,
  };
}
