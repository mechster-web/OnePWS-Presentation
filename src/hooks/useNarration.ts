import { useEffect, useRef } from "react";
import { getChapter } from "../state/selectors";
import { usePresentation } from "../state/PresentationProvider";

export function useNarration() {
  const { state } = usePresentation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chapter = getChapter(state.chapterId);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.pause();
    audio.currentTime = 0;
  }, [chapter.id]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (state.narrationEnabled && state.isPlaying) {
      void audio.play().catch(() => {
        // Browsers may block audio until a user gesture. The UI still exposes controls.
      });
      return;
    }

    audio.pause();
  }, [state.isPlaying, state.narrationEnabled]);

  return { audioRef, chapter };
}
