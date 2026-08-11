import type { SceneType } from "../data/contentTypes";
import { availableSceneArchetypes } from "../config/experience-redesign";
import {
  ChapterTitleArchetype,
  CinematicClosingArchetype,
  CinematicOpeningArchetype,
  CustomerChoiceArchetype,
  ImmersiveEnvironmentArchetype,
} from "./archetypes/ArchetypeScenes";
import {
  HumanBeforeAfterArchetype,
  HumanInteractiveHotspotArchetype,
  HumanOperatorPerspectiveArchetype,
  HumanProblemSolutionArchetype,
} from "../scenes/human-performance/HumanPerformanceArchetypes";
import { ProductHeroExperienceArchetype } from "../scenes/product-experience/ProductExperienceArchetypes";
import {
  RoomExplodedArchetype,
  RoomPanoramicArchetype,
} from "../scenes/room-experience/RoomExperienceArchetypes";
import {
  OperationsFeatureOrbitArchetype,
  OperationsSystemConnectionArchetype,
  OperationsVoiceGuidedArchetype,
} from "../scenes/intelligent-operations/IntelligentOperationsArchetypes";
import {
  EvidenceComparisonExperienceArchetype,
  EvidenceDataStoryExperienceArchetype,
  EvidenceProcessExperienceArchetype,
  EvidenceProofExperienceArchetype,
  EvidenceSpatialExperienceArchetype,
} from "../scenes/evidence-experience/EvidenceExperienceArchetypes";
import type { SceneComponent } from "./scenes/SceneTypes";

export const sceneRegistry: Record<SceneType, SceneComponent> = {
  "cinematic-opening": CinematicOpeningArchetype,
  "chapter-title": ChapterTitleArchetype,
  "immersive-environment": ImmersiveEnvironmentArchetype,
  "product-hero": ProductHeroExperienceArchetype,
  "product-exploded-view": RoomExplodedArchetype,
  "interactive-hotspot": HumanInteractiveHotspotArchetype,
  "operator-perspective": HumanOperatorPerspectiveArchetype,
  "problem-solution": HumanProblemSolutionArchetype,
  "before-after": HumanBeforeAfterArchetype,
  "system-connection": OperationsSystemConnectionArchetype,
  "data-story": EvidenceDataStoryExperienceArchetype,
  "feature-orbit": OperationsFeatureOrbitArchetype,
  "spatial-journey": EvidenceSpatialExperienceArchetype,
  "process-sequence": EvidenceProcessExperienceArchetype,
  "comparison": EvidenceComparisonExperienceArchetype,
  "evidence-proof": EvidenceProofExperienceArchetype,
  "customer-choice": CustomerChoiceArchetype,
  "voice-guided": OperationsVoiceGuidedArchetype,
  "panoramic-room": RoomPanoramicArchetype,
  "cinematic-closing": CinematicClosingArchetype,
};

export function getSceneComponent(sceneType: SceneType) {
  return sceneRegistry[sceneType] ?? sceneRegistry["chapter-title"];
}

export function validateSceneRegistry() {
  return availableSceneArchetypes.every((sceneType) => Boolean(sceneRegistry[sceneType]));
}
