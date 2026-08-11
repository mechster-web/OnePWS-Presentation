import { Captions, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef } from "react";
import { autoPlayConfig, getAutoPlayTiming } from "../../content/autoplayTimings";
import { getVoiceover } from "../../content/voiceovers";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";

export function AudioManager() {
  const { dispatch, state } = usePresentation();
  const voiceover = useVoiceover();
  const {
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
    subtitle,
    subtitlesVisible,
    toggleMute,
    toggleSubtitles,
    volume,
  } = voiceover;
  const previousMode = useRef(state.mode);
  const chapterVoiceover = getVoiceover("chapter", state.chapterId);
  const isActiveChapterVoiceover = active?.id === chapterVoiceover?.id;
  const isPlaying = status === "playing" || status === "loading";
  const canUseAudio = Boolean(chapterVoiceover);

  useEffect(() => {
    if (state.mode === "selfGuided" && previousMode.current !== "selfGuided") {
      stop();
    }

    previousMode.current = state.mode;
  }, [state.mode, stop]);

  useEffect(() => {
    if (state.mode === "selfGuided") {
      return undefined;
    }

    if (!state.narrationEnabled || !state.isPlaying || !chapterVoiceover) {
      return undefined;
    }

    if (state.mode === "autoPlay" && autoPlayConfig.requireInteractionForAudio && !state.audioUnlocked) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      play(chapterVoiceover);
    }, getAutoPlayTiming(state.chapterId).narrationStartDelayMs);

    return () => window.clearTimeout(timeout);
  }, [
    chapterVoiceover,
    state.audioUnlocked,
    state.chapterId,
    state.isPlaying,
    state.mode,
    state.narrationEnabled,
    play,
  ]);

  useEffect(() => {
    if (active?.scope === "chapter" && active.ownerId !== state.chapterId) {
      stop();
    }
  }, [active, state.chapterId, stop]);

  return (
    <>
      <section
        aria-label="Voiceover controls"
        className={`architectural-panel absolute bottom-[calc(var(--stage-safe-y)+4.4rem)] right-[var(--stage-safe-x)] z-30 hidden w-[min(34rem,42vw)] px-3 py-3 text-control-soft ${
          active ? "lg:block" : "lg:hidden"
        }`}
      >
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <div className="min-w-0">
            <div className="flex items-center justify-between gap-3">
              <p className="truncate text-xs uppercase tracking-[0.26em] text-control-muted">
                {active ? active.scope : "Narration"}
              </p>
              <p className="shrink-0 text-xs text-control-muted">{Math.round(progress * 100)}%</p>
            </div>
            <p className="mt-1 truncate text-sm font-medium text-control-text">
              {active?.title ?? chapterVoiceover?.title ?? "No narration selected"}
            </p>
            <div className="mt-3 h-1 bg-control-line">
              <div className="h-1 bg-control-warm" style={{ width: `${progress * 100}%` }} />
            </div>
            {message ? (
              <p className="mt-2 truncate text-xs text-control-muted">{message}</p>
            ) : null}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              aria-label={isPlaying ? "Pause voiceover" : "Play voiceover"}
              className="control-button !h-10 !w-10"
              disabled={!canUseAudio && !voiceover.active}
              onClick={() => {
                dispatch({ type: "UNLOCK_AUDIO" });
                if (isPlaying) {
                  pause();
                  return;
                }
                if (status === "paused") {
                  resume();
                  return;
                }
                if (active && !isActiveChapterVoiceover) {
                  replay();
                  return;
                }
                if (chapterVoiceover) {
                  play(chapterVoiceover);
                }
              }}
              type="button"
            >
              {isPlaying ? <Pause aria-hidden="true" size={16} /> : <Play aria-hidden="true" size={16} />}
            </button>
            <button
              aria-label="Replay voiceover"
              className="control-button !h-10 !w-10"
              disabled={!active && !chapterVoiceover}
              onClick={() => {
                dispatch({ type: "UNLOCK_AUDIO" });
                if (active) {
                  replay();
                } else if (chapterVoiceover) {
                  play(chapterVoiceover);
                }
              }}
              type="button"
            >
              <RotateCcw aria-hidden="true" size={16} />
            </button>
            <button
              aria-label={muted ? "Unmute voiceover" : "Mute voiceover"}
              className="control-button !h-10 !w-10"
              onClick={toggleMute}
              type="button"
            >
              {muted ? <VolumeX aria-hidden="true" size={16} /> : <Volume2 aria-hidden="true" size={16} />}
            </button>
            <button
              aria-label={subtitlesVisible ? "Hide subtitles" : "Show subtitles"}
              className={`control-button !h-10 !w-10 ${subtitlesVisible ? "border-control-warm text-control-text" : ""}`}
              onClick={toggleSubtitles}
              type="button"
            >
              <Captions aria-hidden="true" size={16} />
            </button>
          </div>
        </div>

        <label className="mt-3 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-control-muted">
          Volume
          <input
            aria-label="Voiceover volume"
            className="h-1 flex-1 accent-control-warm"
            max={1}
            min={0}
            onChange={(event) => setVolume(Number(event.target.value))}
            step={0.01}
            type="range"
            value={volume}
          />
        </label>
      </section>

      {subtitlesVisible && active && subtitle ? (
        <div className="architectural-panel absolute bottom-[calc(var(--stage-safe-y)+9.2rem)] left-1/2 z-30 w-[min(760px,70vw)] -translate-x-1/2 px-5 py-3 text-center text-sm leading-6 text-control-soft">
          {subtitle}
        </div>
      ) : null}
    </>
  );
}
