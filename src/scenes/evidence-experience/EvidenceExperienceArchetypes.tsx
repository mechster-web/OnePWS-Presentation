import type { SceneComponentProps } from "../../experience/scenes/SceneTypes";
import {
  ComparisonArchetype,
  EvidenceProofArchetype,
} from "../../experience/archetypes/ArchetypeScenes";
import { HumanProcessSequenceArchetype } from "../human-performance/HumanPerformanceArchetypes";
import { OperationsDataStoryArchetype } from "../intelligent-operations/IntelligentOperationsArchetypes";
import { RoomSpatialJourneyArchetype } from "../room-experience/RoomExperienceArchetypes";
import { getEvidenceExperience } from "./evidenceExperienceConfig";
import { ProjectExperienceChapter } from "../../components/scene/ProjectExperienceChapter";
import { DesignBuildReferenceScene } from "./DesignBuildReferenceScene";
import { EvidenceExperienceScene } from "./EvidenceExperienceScene";

const projectCredentialChapterIds = new Set([
  "project-portfolio",
  "project-credentials-chandigarh-iccc",
  "project-credentials-adani-khavda",
  "project-credentials-rtgc-andhra",
  "project-credentials-acpo-ahmedabad",
  "project-credentials-itms-noida",
  "project-credentials-shell-brunei",
]);

export function EvidenceProofExperienceArchetype(props: SceneComponentProps) {
  const fallback = <EvidenceProofArchetype {...props} />;
  return hasEvidenceExperience(props) ? <EvidenceExperienceScene chapter={props.chapter} fallback={fallback} /> : fallback;
}

export function EvidenceProcessExperienceArchetype(props: SceneComponentProps) {
  if (props.chapter.id === "design-build-approach") {
    return <DesignBuildReferenceScene chapter={props.chapter} />;
  }

  const fallback = <HumanProcessSequenceArchetype {...props} />;
  return hasEvidenceExperience(props) ? <EvidenceExperienceScene chapter={props.chapter} fallback={fallback} /> : fallback;
}

export function EvidenceSpatialExperienceArchetype(props: SceneComponentProps) {
  if (projectCredentialChapterIds.has(props.chapter.id)) {
    return <ProjectExperienceChapter chapter={props.chapter} />;
  }

  const fallback = <RoomSpatialJourneyArchetype {...props} />;
  return hasEvidenceExperience(props) ? <EvidenceExperienceScene chapter={props.chapter} fallback={fallback} /> : fallback;
}

export function EvidenceDataStoryExperienceArchetype(props: SceneComponentProps) {
  const fallback = <OperationsDataStoryArchetype {...props} />;
  return hasEvidenceExperience(props) ? <EvidenceExperienceScene chapter={props.chapter} fallback={fallback} /> : fallback;
}

export function EvidenceComparisonExperienceArchetype(props: SceneComponentProps) {
  const fallback = <ComparisonArchetype {...props} />;
  return hasEvidenceExperience(props) ? <EvidenceExperienceScene chapter={props.chapter} fallback={fallback} /> : fallback;
}

function hasEvidenceExperience({ chapter }: SceneComponentProps) {
  return Boolean(getEvidenceExperience(chapter.id));
}
