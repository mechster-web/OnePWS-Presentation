import type { CustomerPathSelection } from "../../content/customerPaths";

export type OpeningStageId =
  | "system-awakening"
  | "human-challenge"
  | "environment-response"
  | "connected-intelligence"
  | "onepws-reveal"
  | "journey-selection";

export type OpeningMode = "standard" | "condensed" | "exhibition";

export type OpeningStageTiming = {
  id: OpeningStageId;
  standardMs: number;
  condensedMs: number;
  exhibitionMs: number;
};

export const openingTiming = {
  developmentMultiplier: import.meta.env.DEV ? 1 : 1,
  transitionLockMs: 720,
  skipAvailableAfterMs: 3_200,
  ambientResetMs: 90_000,
  defaultAutoplayJourney: {} satisfies CustomerPathSelection,
  returningVisitorDefault: "full" as "full" | "condensed" | "journey-selection",
  stages: [
    { id: "system-awakening", standardMs: 12_000, condensedMs: 4_000, exhibitionMs: 8_000 },
    { id: "human-challenge", standardMs: 12_000, condensedMs: 0, exhibitionMs: 0 },
    { id: "environment-response", standardMs: 14_000, condensedMs: 5_000, exhibitionMs: 7_000 },
    { id: "connected-intelligence", standardMs: 13_000, condensedMs: 0, exhibitionMs: 0 },
    { id: "onepws-reveal", standardMs: 11_000, condensedMs: 5_000, exhibitionMs: 6_000 },
    { id: "journey-selection", standardMs: 18_000, condensedMs: 8_000, exhibitionMs: 0 },
  ] satisfies OpeningStageTiming[],
};

export const openingAssets = {
  video: "opening-background-video",
  firstFrame: "opening-control-room-fallback",
  environment: "ambient-control-room",
  detail: "showroom-control-room-detail",
  wide: "showroom-control-room-wide",
  brand: "onepws-wordmark-source",
};

export const openingSignals = [
  {
    id: "sightline",
    label: "Sightline",
    outcome: "Every sightline affects how teams monitor, coordinate and respond.",
  },
  {
    id: "fatigue",
    label: "Fatigue",
    outcome: "The room must reduce pressure on the people making critical decisions.",
  },
  {
    id: "information-load",
    label: "Information load",
    outcome: "Information overload can reduce decision quality.",
  },
  {
    id: "escalation",
    label: "Escalation",
    outcome: "Fragmented escalation adds avoidable pressure inside the room.",
  },
];

export const openingConnections = [
  { id: "operator", label: "Operator", outcome: "Better focus" },
  { id: "console", label: "Console", outcome: "Supported movement" },
  { id: "lighting", label: "Lighting", outcome: "Balanced visibility" },
  { id: "acoustics", label: "Acoustics", outcome: "Reduced distraction" },
  { id: "video-wall", label: "Video wall", outcome: "Shared awareness" },
  { id: "supervision", label: "Collaboration", outcome: "Faster coordination" },
];

export const openingJourneyOptions = [
  {
    id: "complete",
    title: "Experience the complete story",
    outcome: "See the full OnePWS control-room capability journey.",
    duration: "12-15 min",
    selection: {} satisfies CustomerPathSelection,
    recommended: true,
  },
  {
    id: "operations",
    title: "Operations leader",
    outcome: "Focus on awareness, response and operational continuity.",
    duration: "8-10 min",
    selection: { role: "Operations head" } satisfies CustomerPathSelection,
  },
  {
    id: "architect",
    title: "Architect or consultant",
    outcome: "Explore spatial planning, ergonomics and architectural integration.",
    duration: "8-10 min",
    selection: { role: "Architect" } satisfies CustomerPathSelection,
  },
  {
    id: "technology",
    title: "Technology leader",
    outcome: "Review connected systems, data readiness and interaction layers.",
    duration: "7-9 min",
    selection: { role: "IT or technology head" } satisfies CustomerPathSelection,
  },
  {
    id: "management",
    title: "Senior management",
    outcome: "Understand strategic confidence, proof and next decisions.",
    duration: "6-8 min",
    selection: { role: "Senior management" } satisfies CustomerPathSelection,
  },
];

export function durationForStage(stage: OpeningStageId, mode: OpeningMode, reducedMotion: boolean) {
  const timing = openingTiming.stages.find((item) => item.id === stage);
  if (!timing) {
    return 8_000;
  }

  const value =
    mode === "condensed" ? timing.condensedMs : mode === "exhibition" ? timing.exhibitionMs : timing.standardMs;

  return Math.max(reducedMotion ? 1_800 : 0, value * openingTiming.developmentMultiplier);
}

export function sequenceForMode(mode: OpeningMode): OpeningStageId[] {
  return openingTiming.stages
    .filter((stage) => (mode === "standard" ? stage.standardMs : mode === "condensed" ? stage.condensedMs : stage.exhibitionMs) > 0)
    .map((stage) => stage.id);
}
