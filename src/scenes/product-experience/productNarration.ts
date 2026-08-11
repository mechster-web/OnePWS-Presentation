import type { ChapterId } from "../../data/contentTypes";

export type ProductNarrationCue = {
  atMs: number;
  text: string;
};

export const productNarration: Record<ChapterId, ProductNarrationCue[]> = {
  "console-portfolio": [
    { atMs: 0, text: "A control workstation is not defined by its surface alone." },
    { atMs: 8_000, text: "Its geometry shapes reach, viewing and the operator's relationship to the room." },
    { atMs: 18_000, text: "Its structure carries technology, service access and future configuration decisions." },
    { atMs: 32_000, text: "The product becomes valuable when every element works as one system around the operator." },
  ],
};
