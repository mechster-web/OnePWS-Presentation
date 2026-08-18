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

  /**
   * Pausing or skipping rejects the pending play() promise. That rejection is
   * normal, so it is matched against the request that is current now and
   * ignored when it belongs to a superseded one.
   */
  const requestRef = useRef(0);
  /** Set the moment a click lands, before play() has resolved. */
  const intentRef = useRef<"playing" | "paused">("paused");

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
        ? "Narration needs a tap first. Tap the headline again."
        : "Narration could not play. Check that the audio files are in place.",
    );
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
      intentRef.current = "playing";
      const request = ++requestRef.current;
      audio.src = list[next].file;
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
        })
        .catch((reason) => reportPlayFailure(request, reason));
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
