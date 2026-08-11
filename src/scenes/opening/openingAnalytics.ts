export type OpeningEventName =
  | "opening_started"
  | "opening_skipped"
  | "opening_completed"
  | "opening_replayed"
  | "signal_explored"
  | "environment_activated"
  | "system_connection_explored"
  | "journey_previewed"
  | "journey_selected"
  | "condensed_opening_used"
  | "exhibition_mode_activated";

export function recordOpeningEvent(name: OpeningEventName, detail: Record<string, string | number | boolean> = {}) {
  window.dispatchEvent(new CustomEvent("onepws:opening-event", { detail: { name, ...detail } }));

  if (import.meta.env.DEV) {
    console.info(`[Opening event] ${name}`, detail);
  }
}
