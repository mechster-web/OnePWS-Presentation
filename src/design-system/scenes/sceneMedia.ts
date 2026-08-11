import type { Chapter } from "../../data/contentTypes";

const fallbackMediaByChapterId: Record<string, string> = {
  "mission-critical-environments": "ambient-control-room",
  "console-portfolio": "showroom-control-room-detail",
  "company-at-a-glance": "customer-logo-wall-source",
};

export function mediaAssetForChapter(chapter: Chapter) {
  return chapter.media?.fallbackImageAssetId ?? fallbackMediaByChapterId[chapter.id] ?? "ambient-control-room";
}
