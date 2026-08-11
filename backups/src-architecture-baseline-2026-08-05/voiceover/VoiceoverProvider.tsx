import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { VoiceoverMeta } from "../content/voiceovers";

type VoiceoverStatus = "idle" | "loading" | "playing" | "paused" | "ended" | "missing" | "error";

type VoiceoverState = {
  active: VoiceoverMeta | null;
  status: VoiceoverStatus;
  muted: boolean;
  volume: number;
  progress: number;
  subtitlesVisible: boolean;
  subtitle?: string;
  message?: string;
};

type VoiceoverContextValue = VoiceoverState & {
  play: (voiceover: VoiceoverMeta) => void;
  resume: () => void;
  pause: () => void;
  replay: () => void;
  stop: () => void;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  toggleSubtitles: () => void;
};

const VoiceoverContext = createContext<VoiceoverContextValue | null>(null);

export function VoiceoverProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<number | null>(null);
  const [active, setActive] = useState<VoiceoverMeta | null>(null);
  const [status, setStatus] = useState<VoiceoverStatus>("idle");
  const [muted, setMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.82);
  const [progress, setProgress] = useState(0);
  const [subtitlesVisible, setSubtitlesVisible] = useState(true);
  const [message, setMessage] = useState<string | undefined>();

  const clearFadeTimer = useCallback(() => {
    if (fadeTimerRef.current) {
      window.clearInterval(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  }, []);

  const fadeAndStopAudio = useCallback(
    (reset = true) => {
      const audio = audioRef.current;
      if (!audio) {
        return;
      }

      clearFadeTimer();
      const startVolume = audio.volume;
      const steps = 8;
      let step = 0;

      fadeTimerRef.current = window.setInterval(() => {
        step += 1;
        audio.volume = Math.max(0, startVolume * (1 - step / steps));
        if (step >= steps) {
          clearFadeTimer();
          audio.pause();
          if (reset) {
            audio.currentTime = 0;
          }
          audio.volume = muted ? 0 : volume;
        }
      }, 24);
    },
    [clearFadeTimer, muted, volume],
  );

  const stop = useCallback(() => {
    fadeAndStopAudio();
    setStatus("idle");
    setActive(null);
    setProgress(0);
    setMessage(undefined);
  }, [fadeAndStopAudio]);

  const play = useCallback(
    (voiceover: VoiceoverMeta) => {
      fadeAndStopAudio();
      setActive(voiceover);
      setProgress(0);
      setMessage(undefined);

      if (!voiceover.src) {
        setStatus("missing");
        setMessage(`Audio file pending: ${voiceover.plannedFile}`);
        return;
      }

      const audio = audioRef.current;
      if (!audio) {
        setStatus("error");
        setMessage("Narration is not ready for this section.");
        return;
      }

      setStatus("loading");
      audio.src = voiceover.src;
      audio.muted = muted;
      audio.volume = muted ? 0 : volume;
      audio.currentTime = 0;
      void audio
        .play()
        .then(() => {
          setStatus("playing");
          setMessage(undefined);
        })
        .catch(() => {
          setStatus("error");
          setMessage("Audio could not start. Browser interaction or file replacement may be required.");
        });
    },
    [fadeAndStopAudio, muted, volume],
  );

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (audio && !audio.paused) {
      audio.pause();
      setStatus("paused");
    }
  }, []);

  const resume = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !active?.src) {
      return;
    }

    void audio
      .play()
      .then(() => setStatus("playing"))
      .catch(() => {
        setStatus("error");
        setMessage("Audio could not resume.");
      });
  }, [active]);

  const replay = useCallback(() => {
    if (active) {
      play(active);
    }
  }, [active, play]);

  const setVolume = useCallback(
    (nextVolume: number) => {
      const clamped = Math.min(1, Math.max(0, nextVolume));
      setVolumeState(clamped);
      if (audioRef.current) {
        audioRef.current.volume = muted ? 0 : clamped;
      }
    },
    [muted],
  );

  const toggleMute = useCallback(() => {
    setMuted((current) => {
      const next = !current;
      if (audioRef.current) {
        audioRef.current.muted = next;
        audioRef.current.volume = next ? 0 : volume;
      }
      return next;
    });
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return undefined;
    }

    function handleTimeUpdate() {
      if (audio && Number.isFinite(audio.duration) && audio.duration > 0) {
        setProgress(audio.currentTime / audio.duration);
      }
    }

    function handleEnded() {
      setProgress(1);
      setStatus("ended");
    }

    function handleError() {
      setStatus("error");
      setMessage("Narration is not available for this section yet.");
    }

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      clearFadeTimer();
    };
  }, [clearFadeTimer]);

  const value = useMemo(
    () => ({
      active,
      status,
      muted,
      volume,
      progress,
      subtitlesVisible,
      subtitle: active?.subtitle,
      message,
      play,
      resume,
      pause,
      replay,
      stop,
      toggleMute,
      setVolume,
      toggleSubtitles: () => setSubtitlesVisible((visible) => !visible),
    }),
    [
      active,
      message,
      muted,
      pause,
      play,
      progress,
      replay,
      resume,
      setVolume,
      status,
      stop,
      subtitlesVisible,
      toggleMute,
      volume,
    ],
  );

  return (
    <VoiceoverContext.Provider value={value}>
      {children}
      <audio ref={audioRef} preload="metadata" />
    </VoiceoverContext.Provider>
  );
}

export function useVoiceover() {
  const context = useContext(VoiceoverContext);
  if (!context) {
    throw new Error("useVoiceover must be used inside VoiceoverProvider");
  }
  return context;
}
