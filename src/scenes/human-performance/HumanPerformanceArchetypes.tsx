import type { SceneComponentProps } from "../../experience/scenes/SceneTypes";
import {
  BeforeAfterArchetype,
  InteractiveHotspotArchetype,
  OperatorPerspectiveArchetype,
  ProblemSolutionArchetype,
  ProcessSequenceArchetype,
  VoiceGuidedArchetype,
} from "../../experience/archetypes/ArchetypeScenes";
import { getHumanScenario } from "./humanPerformanceConfig";
import { OperatorPerspectiveStage } from "./OperatorPerspectiveStage";

export function HumanOperatorPerspectiveArchetype(props: SceneComponentProps) {
  const fallback = <OperatorPerspectiveArchetype {...props} />;
  return hasHumanScenario(props) ? <OperatorPerspectiveStage chapter={props.chapter} fallback={fallback} /> : fallback;
}

export function HumanProblemSolutionArchetype(props: SceneComponentProps) {
  const fallback = <ProblemSolutionArchetype {...props} />;
  return hasHumanScenario(props) ? <OperatorPerspectiveStage chapter={props.chapter} fallback={fallback} /> : fallback;
}

export function HumanBeforeAfterArchetype(props: SceneComponentProps) {
  const fallback = <BeforeAfterArchetype {...props} />;
  return hasHumanScenario(props) ? <OperatorPerspectiveStage chapter={props.chapter} fallback={fallback} /> : fallback;
}

export function HumanInteractiveHotspotArchetype(props: SceneComponentProps) {
  const fallback = <InteractiveHotspotArchetype {...props} />;
  return hasHumanScenario(props) ? <OperatorPerspectiveStage chapter={props.chapter} fallback={fallback} /> : fallback;
}

export function HumanProcessSequenceArchetype(props: SceneComponentProps) {
  const fallback = <ProcessSequenceArchetype {...props} />;
  return hasHumanScenario(props) ? <OperatorPerspectiveStage chapter={props.chapter} fallback={fallback} /> : fallback;
}

export function HumanVoiceGuidedArchetype(props: SceneComponentProps) {
  const fallback = <VoiceGuidedArchetype {...props} />;
  return hasHumanScenario(props) ? <OperatorPerspectiveStage chapter={props.chapter} fallback={fallback} /> : fallback;
}

function hasHumanScenario({ chapter }: SceneComponentProps) {
  return Boolean(getHumanScenario(chapter.id));
}
