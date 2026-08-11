import type { ChapterId } from "../../data/contentTypes";

export type ProductExperienceEvent =
  | "product_journey_started"
  | "product_revealed"
  | "product_feature_opened"
  | "product_state_changed"
  | "product_exploded"
  | "product_reassembled"
  | "material_selected"
  | "monitor_mode_selected"
  | "sit_stand_state_selected"
  | "cable_path_explored"
  | "technology_layer_opened"
  | "configuration_changed"
  | "product_compared"
  | "technical_detail_opened"
  | "product_room_viewed"
  | "product_journey_completed";

export function recordProductExperienceEvent(event: ProductExperienceEvent, payload: { chapterId: ChapterId; detail?: string }) {
  if (!import.meta.env.DEV) {
    return;
  }

  console.info("[OnePWS product experience]", event, payload);
}
