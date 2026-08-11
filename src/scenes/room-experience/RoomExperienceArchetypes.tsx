import type { SceneComponentProps } from "../../experience/scenes/SceneTypes";
import {
  ImmersiveEnvironmentArchetype,
  PanoramicRoomArchetype,
  ProductExplodedViewArchetype,
  SpatialJourneyArchetype,
} from "../../experience/archetypes/ArchetypeScenes";
import { getRoomExperience } from "./roomExperienceConfig";
import { RoomExperienceScene } from "./RoomExperienceScene";

export function RoomPanoramicArchetype(props: SceneComponentProps) {
  const fallback = <PanoramicRoomArchetype {...props} />;
  return getRoomExperience(props.chapter.id) ? <RoomExperienceScene chapter={props.chapter} fallback={fallback} /> : fallback;
}

export function RoomExplodedArchetype(props: SceneComponentProps) {
  const fallback = <ProductExplodedViewArchetype {...props} />;
  return getRoomExperience(props.chapter.id) ? <RoomExperienceScene chapter={props.chapter} fallback={fallback} /> : fallback;
}

export function RoomImmersiveArchetype(props: SceneComponentProps) {
  const fallback = <ImmersiveEnvironmentArchetype {...props} />;
  return getRoomExperience(props.chapter.id) ? <RoomExperienceScene chapter={props.chapter} fallback={fallback} /> : fallback;
}

export function RoomSpatialJourneyArchetype(props: SceneComponentProps) {
  const fallback = <SpatialJourneyArchetype {...props} />;
  return getRoomExperience(props.chapter.id) ? <RoomExperienceScene chapter={props.chapter} fallback={fallback} /> : fallback;
}
