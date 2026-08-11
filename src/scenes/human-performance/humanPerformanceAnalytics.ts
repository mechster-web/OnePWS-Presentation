import type { ChapterId } from "../../data/contentTypes";

export type HumanPerformanceEvent =
  | "human_journey_started"
  | "pressure_factor_selected"
  | "reach_comparison_viewed"
  | "sightline_comparison_viewed"
  | "posture_state_selected"
  | "lighting_state_selected"
  | "acoustic_state_compared"
  | "information_response_activated"
  | "collaboration_mode_activated"
  | "operator_profile_changed"
  | "human_transformation_activated"
  | "technical_detail_opened"
  | "human_journey_completed";

export function recordHumanPerformanceEvent(event: HumanPerformanceEvent, payload: { chapterId: ChapterId; detail?: string }) {
  if (!import.meta.env.DEV) {
    return;
  }

  console.info("[OnePWS human performance]", event, payload);
}
