import type { ChapterId } from "../../data/contentTypes";

export type IntelligentOperationsEvent =
  | "intelligent_operations_started"
  | "normal_state_viewed"
  | "event_detected"
  | "alert_prioritised"
  | "ai_assistant_previewed"
  | "voice_command_previewed"
  | "oams_layer_viewed"
  | "display_orchestration_viewed"
  | "environmental_response_previewed"
  | "operator_confirmation_selected"
  | "collaboration_workflow_activated"
  | "incident_step_selected"
  | "incident_resolved"
  | "intelligent_operations_completed";

export function recordIntelligentOperationsEvent(event: IntelligentOperationsEvent, payload: { chapterId: ChapterId; detail?: string }) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent("onepws:intelligent-operations-event", { detail: { name: event, ...payload } }));

  if (import.meta.env.DEV) {
    console.info(`[Intelligent operations event] ${event}`, payload);
  }
}
