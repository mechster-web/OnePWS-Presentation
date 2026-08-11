import type { ChapterId } from "../../data/contentTypes";

export type EvidenceEvent =
  | "evidence_journey_started"
  | "capability_viewed"
  | "manufacturing_stage_opened"
  | "engineering_stage_opened"
  | "innovation_viewed"
  | "quality_checkpoint_opened"
  | "certification_opened"
  | "standard_opened"
  | "patent_opened"
  | "award_opened"
  | "project_region_selected"
  | "sector_selected"
  | "project_opened"
  | "case_study_started"
  | "case_study_completed"
  | "installation_stage_opened"
  | "support_service_opened"
  | "evidence_source_opened"
  | "trust_moment_completed"
  | "evidence_journey_completed";

export function recordEvidenceEvent(event: EvidenceEvent, payload: { chapterId: ChapterId; detail?: string }) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent("onepws:evidence-event", { detail: { name: event, ...payload } }));

  if (import.meta.env.DEV) {
    console.info(`[Evidence event] ${event}`, payload);
  }
}
