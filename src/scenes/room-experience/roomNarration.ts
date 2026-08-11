import type { ChapterId } from "../../data/contentTypes";

export type RoomNarrationCue = {
  atMs: number;
  text: string;
};

export const roomNarration: Record<ChapterId, RoomNarrationCue[]> = {
  "architectural-systems": [
    { atMs: 0, text: "The room envelope is operational infrastructure." },
    { atMs: 9_000, text: "Ceiling, lighting, floor, wall and video-wall integration shape how the room works." },
    { atMs: 24_000, text: "The architectural system matters when every layer supports focus, access and continuity." },
  ],
  "complete-ecosystem": [
    { atMs: 0, text: "The operator experiences the room as one continuous environment." },
    { atMs: 10_000, text: "The floor carries infrastructure. The walls organise technology and acoustics." },
    { atMs: 25_000, text: "The ceiling controls light, services and visual order." },
    { atMs: 40_000, text: "Architecture becomes operational when every layer is coordinated around the task." },
  ],
};
