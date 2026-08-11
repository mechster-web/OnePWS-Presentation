import type { ChapterId } from "../../data/contentTypes";

export const evidenceNarration: Partial<Record<ChapterId, Array<{ atMs: number; text: string }>>> = {
  "company-at-a-glance": [
    { atMs: 0, text: "Confidence begins with evidence that connects to delivery risk." },
    { atMs: 18_000, text: "Scale is shown only where the source supports it." },
  ],
  "manufacturing-quality": [
    { atMs: 0, text: "Manufacturing proof matters when it protects consistency." },
    { atMs: 20_000, text: "Quality evidence stays connected to what the customer receives." },
  ],
  "project-portfolio": [
    { atMs: 0, text: "Project proof is specific, sourced and relevant." },
    { atMs: 24_000, text: "The experience avoids invented outcomes and lets the evidence carry the story." },
  ],
};
