import { useCallback, useEffect, useRef, useState } from "react";
import type { NarrationSegment } from "../content/slideNarration";

export type GuidedNarration = {
  /** Segment currently being spoken, so the scene can highlight that section. */
  activeId: string | null;
  activeIndex: number;
  activeSegment: NarrationSegment | null;
  isPlaying: boolean;
  isLoading: boolean;
  hasStarted: boolean;
  total: number;
  error: string | null;
  /** Plays from the top, or resumes a paused walkthrough. */
  toggle: () => void;
  play: () => void;
  pause: () => void;
  stop: () => void;
  playSegment: (id: string) => void;
};

/**
 * Plays a slide walkthrough one segment at a time.
 *
 * Splitting the narration into a file per section keeps the highlight exactly
 * in step with the voice: the scene highlights whatever `activeId` names, and
 * the next file starts only when the current one has finished.
 */
export function useGuidedNarration(segments: NarrationSegment[] | null): GuidedNarration {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const indexRef = useRef(-1);
  const segmentsRef = useRef(segments);
  segmentsRef.current = segments;

  const [activeIndex, setActiveIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setIndex = useCallback((next: number) => {
    indexRef.current = next;
    setActiveIndex(next);
  }, []);

  const playIndex = useCallback(
    (next: number) => {
      const list = segmentsRef.current;
      const audio = audioRef.current;
      if (!list || !audio) {
        return;
      }

      if (next < 0 || next >= list.length) {
        audio.pause();
        setIndex(-1);
        setIsPlaying(false);
        setIsLoading(false);
        return;
      }

      setIndex(next);
      setError(null);
      setIsLoading(true);
      audio.src = list[next].file;
      audio.currentTime = 0;
      void audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch(() => {
          setIsPlaying(false);
          setIsLoading(false);
          setError("Narration could not start. Interact with the page and try again.");
        });
    },
    [setIndex],
  );

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "auto";
    audioRef.current = audio;

    // Advancing on `ended` is what keeps voice and highlight in step.
    const handleEnded = () => playIndex(indexRef.current + 1);
    const handleError = () => {
      setIsPlaying(false);
      setIsLoading(false);
      setError("Narration file is missing. Run: npm run voiceover:segments");
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [playIndex]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !segmentsRef.current?.length) {
      return;
    }

    // Resume where the walkthrough was paused, otherwise start from the top.
    if (indexRef.current >= 0 && audio.src && audio.currentTime > 0 && !audio.ended) {
      void audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setError("Narration could not resume."));
      return;
    }

    playIndex(0);
  }, [playIndex]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setIndex(-1);
    setIsPlaying(false);
    setIsLoading(false);
  }, [setIndex]);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
      return;
    }
    play();
  }, [isPlaying, pause, play]);

  const playSegment = useCallback(
    (id: string) => {
      const list = segmentsRef.current;
      if (!list) {
        return;
      }
      const next = list.findIndex((segment) => segment.id === id);
      if (next >= 0) {
        playIndex(next);
      }
    },
    [playIndex],
  );

  const activeSegment = segments && activeIndex >= 0 ? segments[activeIndex] ?? null : null;

  return {
    activeId: activeSegment?.id ?? null,
    activeIndex,
    activeSegment,
    isPlaying,
    isLoading,
    hasStarted: activeIndex >= 0,
    total: segments?.length ?? 0,
    error,
    toggle,
    play,
    pause,
    stop,
    playSegment,
  };
}
