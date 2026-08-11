import { useEffect } from "react";
import { enabledChapters } from "../content/chapters";
import { getChapterPreloadUrls, getInitialOfflineUrls } from "../content/mediaPreload";
import { preloadPwaAssets } from "../pwa/registerServiceWorker";
import { usePresentation } from "../state/PresentationProvider";

export function useMediaPreloader() {
  const { state } = usePresentation();

  useEffect(() => {
    preloadPwaAssets(getInitialOfflineUrls());
  }, []);

  useEffect(() => {
    const index = enabledChapters.findIndex((chapter) => chapter.id === state.chapterId);
    const nextChapter = enabledChapters[index + 1];

    if (!nextChapter) {
      return;
    }

    preloadPwaAssets(getChapterPreloadUrls(nextChapter.id));
  }, [state.chapterId]);
}
