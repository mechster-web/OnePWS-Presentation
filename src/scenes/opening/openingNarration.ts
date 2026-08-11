import type { OpeningStageId } from "./openingConfig";

export type OpeningNarrationCue = {
  stageId: OpeningStageId;
  startsAtMs: number;
  caption: string;
};

export const openingNarrationScript = {
  language: "en",
  assetId: "opening-voiceover-en",
  recommended: true,
  cues: [
    { stageId: "system-awakening", startsAtMs: 1_600, caption: "Before the room responds, it must understand." },
    { stageId: "human-challenge", startsAtMs: 13_000, caption: "Every critical decision begins with a person watching, interpreting and responding." },
    { stageId: "environment-response", startsAtMs: 26_000, caption: "As systems become more complex, the room around that person must do more." },
    { stageId: "connected-intelligence", startsAtMs: 42_000, caption: "It must reduce distraction, improve visibility and connect information." },
    { stageId: "onepws-reveal", startsAtMs: 56_000, caption: "OnePWS brings operators, technology and infrastructure into one coordinated environment." },
    { stageId: "journey-selection", startsAtMs: 67_000, caption: "Choose the perspective from which you want to explore the future of operations." },
  ] satisfies OpeningNarrationCue[],
};
