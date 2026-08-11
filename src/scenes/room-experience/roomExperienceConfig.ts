import type { ChapterId } from "../../data/contentTypes";
import { connectedIntelligenceFeatures, type ConnectedFeature } from "../../content/connectedIntelligenceFeatures";

export type RoomLayerMode =
  | "empty-shell"
  | "wall-system"
  | "perforated-panel"
  | "video-wall-integration"
  | "ceiling-system"
  | "lighting-journey"
  | "flooring-system"
  | "underfloor-services"
  | "acoustic-environment"
  | "material-coordination"
  | "spatial-zoning"
  | "circulation-maintenance"
  | "collaboration-zone"
  | "exploded-room"
  | "complete-room";

export type RoomLayer = {
  id: string;
  system: string;
  category: string;
  mode: RoomLayerMode;
  spatialRole: string;
  approvedClaim: string;
  technicalDetail: string;
  restrictedClaim: string;
  assetRequirement: string;
  sourceStatus: "verified" | "internally planned" | "confirmation required";
  relatedFeature?: ConnectedFeature;
};

export type RoomExperience = {
  chapterId: ChapterId;
  title: string;
  statement: string;
  layers: RoomLayer[];
  roomStates: Array<{ id: string; label: string; description: string; activeLayers: string[] }>;
  claimBoundary: string;
  autoplayMs: number;
  memoryMoment: boolean;
};

const connectedById = Object.fromEntries(connectedIntelligenceFeatures.map((feature) => [feature.id, feature]));

export const roomExperienceChapterIds: ChapterId[] = ["architectural-systems", "complete-ecosystem"];

export const roomExperiences: RoomExperience[] = [
  {
    chapterId: "architectural-systems",
    title: "Architectural and environmental systems",
    statement: "The room envelope is operational infrastructure.",
    memoryMoment: false,
    autoplayMs: 48_000,
    layers: [
      layer("wall-ceiling-systems", "Wall and ceiling systems", "Wall systems and technical envelope", "wall-system", {
        spatialRole: "Defines the room identity, integrates technology and keeps finishes aligned.",
        restrictedClaim: "Do not invent panel system, material, fire performance or access-panel specification.",
        assetRequirement: "Wall construction, cladding/perforation and service-access detail views.",
      }),
      layer("video-wall", "Video-wall integration", "Video-wall surroundings", "video-wall-integration", {
        spatialRole: "Frames shared awareness as part of the room architecture.",
        restrictedClaim: "Do not claim unapproved controller, ventilation, maintenance or display specifications.",
        assetRequirement: "Video-wall surround, service view and operator sightline view.",
      }),
      layer("intelligent-lighting", "Integrated lighting", "Ceiling and lighting", "lighting-journey", {
        spatialRole: "Balances visibility, comfort, glare control and operating state.",
        restrictedClaim: "Do not invent lux values, colour temperature range, circadian-health claim or control protocol.",
        assetRequirement: "Lighting states, ceiling detail and room perspective under different approved states.",
      }),
      layer("raised-access-floor", "Raised access floor", "Flooring and underfloor services", "flooring-system", {
        spatialRole: "Carries power, data and service routes below a clean room surface.",
        restrictedClaim: "Do not invent load rating, fire performance, static control or floor height.",
        assetRequirement: "Floor cutaway, tile-open view, pedestal/service-route imagery.",
      }),
      layer("acoustic-environment", "Acoustic environment", "Acoustic comfort", "acoustic-environment", {
        spatialRole: "Controls distraction and supports calmer communication.",
        restrictedClaim: "Do not invent NRC, STC, dB, test method or material rating.",
        assetRequirement: "Acoustic panel detail, treated/untreated comparison, collaboration-zone view.",
      }),
      {
        id: "material-coordination",
        system: "Material coordination",
        category: "Materials and finishes",
        mode: "material-coordination",
        spatialRole: "Coordinates wall, ceiling, floor and workstation finishes into one room identity.",
        approvedClaim: "Architecture, interiors, wall systems, cladding and acoustics are coordinated as one delivery path.",
        technicalDetail: "Approved material names, finish codes, ratings and maintenance information are required before publication.",
        restrictedClaim: "Do not invent material specifications, fire ratings, acoustic performance or texture assets.",
        assetRequirement: "Wall, ceiling, floor and console material close-ups.",
        sourceStatus: "confirmation required",
      },
    ],
    roomStates: [
      { id: "empty-shell", label: "Empty shell", description: "Floor, walls, ceiling volume, display zone and circulation are visible before finish layers activate.", activeLayers: [] },
      { id: "technical-envelope", label: "Technical envelope", description: "Walls, ceiling and floor begin carrying services, display integration and access logic.", activeLayers: ["wall-ceiling-systems", "raised-access-floor", "video-wall"] },
      { id: "environmental-calm", label: "Environmental calm", description: "Lighting, acoustic treatment and material coordination shape a quieter room identity.", activeLayers: ["intelligent-lighting", "acoustic-environment", "material-coordination"] },
    ],
    claimBoundary:
      "Architectural dimensions, ratings, materials, fire performance, acoustic data, floor height, load capacity, lighting values and certifications require approved specifications.",
  },
  {
    chapterId: "complete-ecosystem",
    title: "One environment. Connected intelligence.",
    statement: "Consoles, video wall, lighting, acoustics, raised floor, wall systems and supervisor areas are explored as one connected environment.",
    memoryMoment: true,
    autoplayMs: 58_000,
    layers: [
      layer("raised-access-floor", "Floor infrastructure", "Technical floor", "underfloor-services", {
        spatialRole: "Keeps service routes accessible while the room remains visually clean.",
        restrictedClaim: "Do not invent electrical architecture, floor height or load values.",
        assetRequirement: "Underfloor service path and workstation entry imagery.",
      }),
      layer("wall-ceiling-systems", "Wall and ceiling envelope", "Room envelope", "exploded-room", {
        spatialRole: "Turns the room envelope into an engineered layer.",
        restrictedClaim: "Do not imply unapproved fire/acoustic/material specifications.",
        assetRequirement: "Transparent wall/ceiling layer assets or approved section diagram.",
      }),
      layer("intelligent-lighting", "Lighting layer", "Lighting", "lighting-journey", {
        spatialRole: "Supports room state through controlled illumination, not decoration.",
        restrictedClaim: "Do not invent lighting-performance or health claims.",
        assetRequirement: "Approved lighting-state media.",
      }),
      layer("acoustic-environment", "Acoustic layer", "Acoustics", "acoustic-environment", {
        spatialRole: "Creates focus and communication zones with restrained acoustic treatment.",
        restrictedClaim: "Do not invent acoustic ratings.",
        assetRequirement: "Acoustic field/detail visuals.",
      }),
      layer("video-wall", "Video-wall integration", "Integrated display wall", "video-wall-integration", {
        spatialRole: "Connects shared information to sightlines, lighting and wall framing.",
        restrictedClaim: "Do not imply software-trigger behaviour or controller scope.",
        assetRequirement: "Video wall surround and service view.",
      }),
      layer("supervisor-area", "Supervisor and collaboration zone", "Spatial zoning", "collaboration-zone", {
        spatialRole: "Supports escalation and collaboration without crowding operators.",
        restrictedClaim: "Do not invent compliance distances or procedure-specific workflows.",
        assetRequirement: "Plan view, collaboration state and circulation path imagery.",
      }),
    ],
    roomStates: [
      { id: "shell", label: "Operational shell", description: "The room begins as a spatial framework.", activeLayers: [] },
      { id: "exploded", label: "Exploded room", description: "Floor, envelope, lighting, acoustics, display and collaboration layers isolate one by one.", activeLayers: ["raised-access-floor", "wall-ceiling-systems", "intelligent-lighting"] },
      { id: "complete", label: "Complete environment", description: "All architectural systems align around the operator and operational task.", activeLayers: ["raised-access-floor", "wall-ceiling-systems", "intelligent-lighting", "acoustic-environment", "video-wall", "supervisor-area"] },
    ],
    claimBoundary:
      "Complete-room integration is shown as a coordinated design approach using existing chapter content; project-specific specifications require engineering review.",
  },
];

export const executiveArchitecturalRoute = {
  id: "architecture-executive",
  label: "Executive architectural route",
  durationLabel: "4-6 min",
  sequence: ["architectural-systems", "complete-ecosystem", "console-portfolio", "room-sounds-right", "room-built-to-protect", "room-engineered-to-last", "unified-control-room", "why-onepws"] as ChapterId[],
};

export function getRoomExperience(chapterId: ChapterId) {
  return roomExperiences.find((experience) => experience.chapterId === chapterId);
}

function layer(
  connectedId: string,
  system: string,
  category: string,
  mode: RoomLayerMode,
  overrides: Pick<RoomLayer, "spatialRole" | "restrictedClaim" | "assetRequirement">,
): RoomLayer {
  const feature = connectedById[connectedId];
  return {
    id: connectedId,
    system,
    category,
    mode,
    spatialRole: overrides.spatialRole,
    approvedClaim: feature.benefit,
    technicalDetail: feature.technicalDetail,
    restrictedClaim: overrides.restrictedClaim,
    assetRequirement: overrides.assetRequirement,
    sourceStatus: feature.sourceStatus,
    relatedFeature: feature,
  };
}
