import { enabledChapters } from "../content/chapters";
import type { ChapterId } from "../data/contentTypes";

export function getChapter(chapterId: ChapterId) {
  return enabledChapters.find((chapter) => chapter.id === chapterId) ?? enabledChapters[0];
}

export function getChapterProgress(chapterId: ChapterId) {
  const index = Math.max(0, enabledChapters.findIndex((chapter) => chapter.id === chapterId));
  return {
    index,
    total: enabledChapters.length,
    percent: ((index + 1) / enabledChapters.length) * 100,
  };
}
