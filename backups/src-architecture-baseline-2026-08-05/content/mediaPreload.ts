import { getAsset } from "./assetManifest";
import { enabledChapters } from "./chapters";
import type { ChapterId } from "../data/contentTypes";

function assetUrl(assetId?: string) {
  return getAsset(assetId)?.src;
}

export function getChapterPreloadUrls(chapterId: ChapterId) {
  const chapter = enabledChapters.find((item) => item.id === chapterId);
  if (!chapter) return [];

  return [
    assetUrl(chapter.media?.fallbackImageAssetId),
    assetUrl(chapter.media?.narrationAssetId),
  ].filter((url): url is string => Boolean(url));
}

export function getInitialOfflineUrls() {
  return enabledChapters.slice(0, 2).flatMap((chapter) => getChapterPreloadUrls(chapter.id));
}
