import type { ChapterId } from "../../data/contentTypes";

export type HumanNarrationCue = {
  atMs: number;
  text: string;
  pauseAfterMs?: number;
};

export const humanPerformanceNarration: Record<ChapterId, HumanNarrationCue[]> = {
  "mission-control-definition": [
    { atMs: 0, text: "A control room begins with the operator." },
    { atMs: 7_000, text: "The room, the displays and the infrastructure all shape how decisions are made." },
    { atMs: 18_000, text: "The environment has to support awareness without adding effort." },
  ],
  "operator-challenges": [
    { atMs: 0, text: "Pressure often builds through small conditions." },
    { atMs: 8_000, text: "An extra reach. A poor sightline. A distraction competing for attention." },
    { atMs: 22_000, text: "The goal is not drama. The goal is to remove unnecessary strain from critical work." },
  ],
  "poor-design-risk": [
    { atMs: 0, text: "When the room is poorly planned, the operator works around the environment." },
    { atMs: 14_000, text: "Sightlines, access and comfort become design decisions, not finishing details." },
  ],
  "human-centred-philosophy": [
    { atMs: 0, text: "The operator does not experience products separately." },
    { atMs: 10_000, text: "They experience one working environment.", pauseAfterMs: 900 },
    { atMs: 22_000, text: "Human-centred design aligns the room around the task." },
  ],
  "ergonomic-methodology": [
    { atMs: 0, text: "Long shifts make repeated effort visible." },
    { atMs: 12_000, text: "Ergonomic study turns tasks, sightlines and reach into design decisions." },
    { atMs: 26_000, text: "Standards belong in the technical layer, connected to what the operator actually does." },
  ],
  "sightline-comfort": [
    { atMs: 0, text: "A comfortable zone is not decorative." },
    { atMs: 10_000, text: "It is where frequently used information and controls become easier to reach, see and use." },
  ],
  "incident-response": [
    { atMs: 0, text: "When the work changes, the room has to support the change." },
    { atMs: 15_000, text: "Individual focus can become shared response without losing clarity." },
  ],
};
