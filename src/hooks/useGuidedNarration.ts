import { useCallback, useEffect, useRef, useState } from "react";
import type { NarrationSegment } from "../content/slideNarration";

export type GuidedNarration = {
  /** Segment being spoken, which is also the id of the section to highlight. */
  activeId: string | null;
  activeIndex: number;
  activeSegment: NarrationSegment | null;
  /** True while this section is the one being explained. */
  isSpeaking: (id: string) => boolean;
  /** True when a section has narration assigned at all. */
  hasSegment: (id: string) => boolean;
  isPlaying: boolean;
  isLoading: boolean;
  hasStarted: boolean;
  /** 0..1 through the current segment, for the progress bar. */
  progress: number;
  total: number;
  error: string | null;
  toggle: () => void;
  play: () => void;
  pause: () => void;
  stop: () => void;
  next: () => void;
  previous: () => void;
  replay: () => void;
  playSegment: (id: string) => void;
};

const EMPTY: NarrationSegment[] = [];

/**
 * Plays a slide walkthrough one segment at a time.
 *
 * One file per section is what keeps the highlight exactly in step with the
 * voice: the scene highlights whatever `activeId` names, and the next file
 * starts only when the current one has finished. A section whose file is not
 * there yet is skipped rather than stalling the walkthrough, so narration can
 * be added a section at a time.
 */
export function useGuidedNarration(segments: NarrationSegment[] | null): GuidedNarration {
  const list = segments ?? EMPTY;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const preloadRef = useRef<HTMLAudioElement | null>(null);
  const indexRef = useRef(-1);
  const segmentsRef = useRef(list);
  segmentsRef.current = list;

  /**
   * Pausing or skipping rejects the pending play() promise. That rejection is
   * normal, so it is matched against the request that is current now and
   * ignored when it belongs to a superseded one.
   */
  const requestRef = useRef(0);
  /** Set the moment a click lands, before play() has resolved. */
  const intentRef = useRef<"playing" | "paused">("paused");
  /** Files that answered with an error, so a rerun does not retry them forever. */
  const missingRef = useRef(new Set<string>());

  const [activeIndex, setActiveIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const setIndex = useCallback((next: number) => {
    indexRef.current = next;
    setActiveIndex(next);
  }, []);

  const reportPlayFailure = useCallback((request: number, reason: unknown) => {
    if (request !== requestRef.current) {
      return;
    }

    const name = reason instanceof DOMException ? reason.name : "";
    if (name === "AbortError") {
      return;
    }

    intentRef.current = "paused";
    setIsPlaying(false);
    setIsLoading(false);
    setError(
      name === "NotAllowedError"
        ? "Narration needs a tap first. Tap play again."
        : "Narration could not play. Check that the audio file is in place.",
    );
  }, []);

  /** Warms the next file so one section runs into the next without a gap. */
  const preload = useCallback((index: number) => {
    const upcoming = segmentsRef.current[index];
    if (!upcoming || missingRef.current.has(upcoming.file)) {
      return;
    }
    const warmer = preloadRef.current ?? new Audio();
    warmer.preload = "auto";
    if (warmer.src !== upcoming.file) {
      warmer.src = upcoming.file;
      warmer.load();
    }
    preloadRef.current = warmer;
  }, []);

  const playIndex = useCallback(
    (next: number, direction: 1 | -1 = 1) => {
      const items = segmentsRef.current;
      const audio = audioRef.current;
      if (!audio) {
        return;
      }

      // Step over sections whose audio is not in place yet.
      let target = next;
      while (target >= 0 && target < items.length && missingRef.current.has(items[target].file)) {
        target += direction;
      }

      if (target < 0 || target >= items.length) {
        audio.pause();
        intentRef.current = "paused";
        setIndex(-1);
        setIsPlaying(false);
        setIsLoading(false);
        setProgress(0);
        return;
      }

      setIndex(target);
      setError(null);
      setIsLoading(true);
      setProgress(0);
      intentRef.current = "playing";
      const request = ++requestRef.current;
      audio.src = items[target].file;
      audio.currentTime = 0;
      void audio
        .play()
        .then(() => {
          if (request !== requestRef.current) {
            return;
          }
          setIsPlaying(true);
          setIsLoading(false);
          setError(null);
          preload(target + 1);
        })
        .catch((reason) => reportPlayFailure(request, reason));
    },
    [preload, reportPlayFailure, setIndex],
  );

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "auto";
    audioRef.current = audio;

    // Advancing on `ended` is what keeps voice and highlight in step.
    const handleEnded = () => playIndex(indexRef.current + 1);
    const handleTime = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        setProgress(audio.currentTime / audio.duration);
      }
    };
    const handleError = () => {
      const current = segmentsRef.current[indexRef.current];
      if (!current) {
        return;
      }
      // A section without audio should not stall the rest of the walkthrough.
      missingRef.current.add(current.file);
      if (intentRef.current === "playing") {
        playIndex(indexRef.current + 1);
        return;
      }
      setIsPlaying(false);
      setIsLoading(false);
      setError("Narration file is missing. Run: npm run voiceover:segments");
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("timeupdate", handleTime);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("timeupdate", handleTime);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
      preloadRef.current = null;
    };
  }, [playIndex]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !segmentsRef.current.length) {
      return;
    }

    // Resume where the walkthrough was paused, otherwise start from the top.
    if (indexRef.current >= 0 && audio.src && !audio.ended) {
      intentRef.current = "playing";
      const request = ++requestRef.current;
      setError(null);
      void audio
        .play()
        .then(() => {
          if (request !== requestRef.current) {
            return;
          }
          setIsPlaying(true);
          setIsLoading(false);
          setError(null);
        })
        .catch((reason) => reportPlayFailure(request, reason));
      return;
    }

    playIndex(0);
  }, [playIndex, reportPlayFailure]);

  const pause = useCallback(() => {
    // Bumping the request first tells the pending play() rejection to stay quiet.
    requestRef.current += 1;
    intentRef.current = "paused";
    audioRef.current?.pause();
    setIsPlaying(false);
    setIsLoading(false);
    setError(null);
  }, []);

  const stop = useCallback(() => {
    requestRef.current += 1;
    intentRef.current = "paused";
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setIndex(-1);
    setIsPlaying(false);
    setIsLoading(false);
    setProgress(0);
    setError(null);
  }, [setIndex]);

  const toggle = useCallback(() => {
    // Reads the intent rather than the state: a second click that lands before
    // play() has resolved should still pause, not start over.
    if (intentRef.current === "playing") {
      pause();
      return;
    }
    play();
  }, [pause, play]);

  const next = useCallback(() => playIndex(Math.max(indexRef.current, -1) + 1), [playIndex]);
  const previous = useCallback(() => playIndex(Math.max(indexRef.current - 1, 0), -1), [playIndex]);
  const replay = useCallback(() => playIndex(Math.max(indexRef.current, 0)), [playIndex]);

  const playSegment = useCallback(
    (id: string) => {
      const index = segmentsRef.current.findIndex((segment) => segment.id === id);
      if (index >= 0) {
        playIndex(index);
      }
    },
    [playIndex],
  );

  const activeSegment = activeIndex >= 0 ? list[activeIndex] ?? null : null;
  const activeId = activeSegment?.id ?? null;

  const isSpeaking = useCallback((id: string) => activeId === id, [activeId]);
  const hasSegment = useCallback((id: string) => list.some((segment) => segment.id === id), [list]);

  return {
    activeId,
    activeIndex,
    activeSegment,
    isSpeaking,
    hasSegment,
    isPlaying,
    isLoading,
    hasStarted: activeIndex >= 0,
    progress,
    total: list.length,
    error,
    toggle,
    play,
    pause,
    stop,
    next,
    previous,
    replay,
    playSegment,
  };
}
