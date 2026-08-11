import type { ChapterId } from "../../data/contentTypes";

export type RoomExperienceEvent =
  | "architectural_journey_started"
  | "room_shell_viewed"
  | "wall_layer_activated"
  | "panel_pattern_selected"
  | "video_wall_integration_viewed"
  | "ceiling_layer_activated"
  | "lighting_state_selected"
  | "floor_opened"
  | "floor_system_compared"
  | "service_path_followed"
  | "acoustic_state_compared"
  | "material_palette_selected"
  | "room_zone_selected"
  | "collaboration_mode_activated"
  | "room_exploded"
  | "room_reassembled"
  | "complete_room_activated"
  | "architectural_journey_completed";

export function recordRoomExperienceEvent(event: RoomExperienceEvent, payload: { chapterId: ChapterId; detail?: string }) {
  if (!import.meta.env.DEV) {
    return;
  }

  console.info("[OnePWS room experience]", event, payload);
}
