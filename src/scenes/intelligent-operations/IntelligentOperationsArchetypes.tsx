import type { SceneComponentProps } from "../../experience/scenes/SceneTypes";
import {
  DataStoryArchetype,
  FeatureOrbitArchetype,
  SystemConnectionArchetype,
  VoiceGuidedArchetype,
} from "../../experience/archetypes/ArchetypeScenes";
import { getIntelligentOperationsScenario } from "./intelligentOperationsConfig";
import { IntelligentOperationsScene } from "./IntelligentOperationsScene";
import { IntelligentRoomReferenceScene } from "./IntelligentRoomReferenceScene";

export function OperationsFeatureOrbitArchetype(props: SceneComponentProps) {
  const fallback = <FeatureOrbitArchetype {...props} />;
  return hasOperationsScenario(props) || props.chapter.id === "mechanical-strength-console"
    ? <IntelligentOperationsScene chapter={props.chapter} fallback={fallback} />
    : fallback;
}

export function OperationsVoiceGuidedArchetype(props: SceneComponentProps) {
  const fallback = <VoiceGuidedArchetype {...props} />;
  return hasOperationsScenario(props) ? <IntelligentOperationsScene chapter={props.chapter} fallback={fallback} /> : fallback;
}

export function OperationsSystemConnectionArchetype(props: SceneComponentProps) {
  if (
    props.chapter.id === "room-recognizes-you" ||
    props.chapter.id === "console-understands-task" ||
    props.chapter.id === "information-comes-operator" ||
    props.chapter.id === "operational-state-room-responds" ||
    props.chapter.id === "room-protects-human-performance" ||
    props.chapter.id === "personal-workspace" ||
    props.chapter.id === "intelligence-beyond-desk" ||
    props.chapter.id === "digital-twin-control-room" ||
    props.chapter.id === "ai-silent-assistant" ||
    props.chapter.id === "software-defined-control-room"
  ) {
    return <IntelligentRoomReferenceScene chapter={props.chapter} />;
  }

  const fallback = <SystemConnectionArchetype {...props} />;
  return hasOperationsScenario(props) ? <IntelligentOperationsScene chapter={props.chapter} fallback={fallback} /> : fallback;
}

export function OperationsDataStoryArchetype(props: SceneComponentProps) {
  const fallback = <DataStoryArchetype {...props} />;
  return hasOperationsScenario(props) || props.chapter.id === "mechanical-strength-console"
    ? <IntelligentOperationsScene chapter={props.chapter} fallback={fallback} />
    : fallback;
}

function hasOperationsScenario({ chapter }: SceneComponentProps) {
  return Boolean(getIntelligentOperationsScenario(chapter.id));
}
