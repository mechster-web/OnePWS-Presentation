import type { ChapterId } from "../../data/contentTypes";

export const intelligentOperationsNarration: Partial<Record<ChapterId, Array<{ atMs: number; text: string }>>> = {
  "intelligent-features": [
    { atMs: 0, text: "The connected room begins in a stable operating state." },
    { atMs: 10_000, text: "Intelligent layers support attention, comfort, display hierarchy and collaboration." },
    { atMs: 24_000, text: "Each proposed action remains bounded by operator confirmation and approved integrations." },
    { atMs: 38_000, text: "The point is not autonomy. The point is clearer human control." },
  ],
  "incident-response": [
    { atMs: 0, text: "A neutral operational event enters the room." },
    { atMs: 14_000, text: "Signals are organised so the operator can see what matters." },
    { atMs: 32_000, text: "Displays, lighting and collaboration zones support the response." },
    { atMs: 52_000, text: "The operator acknowledges, resolves and reviews the event trail." },
  ],
};
