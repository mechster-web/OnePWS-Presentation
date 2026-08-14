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
        className={`architectural-panel absolute bottom-[calc(var(--stage-safe-y)+2rem)] right-[var(--stage-safe-x)] z-40 hidden px-2.5 py-2 text-control-soft shadow-control ${
          active ? "lg:flex" : "lg:hidden"
        }`}
      >
        <div className="relative flex items-center gap-1.5">
          <div className="absolute -top-2 left-2 right-2 h-0.5 bg-control-line" aria-hidden="true">
            <div className="h-0.5 bg-control-warm" style={{ width: `${progress * 100}%` }} />
          </div>
            <button
              aria-label={isPlaying ? "Pause voiceover" : "Play voiceover"}
              className="control-button !h-9 !w-9"
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
              title={isPlaying ? "Pause narration" : "Play narration"}
              type="button"
            >
              {isPlaying ? <Pause aria-hidden="true" size={16} /> : <Play aria-hidden="true" size={16} />}
            </button>
            <button
              aria-label="Replay voiceover"
              className="control-button !h-9 !w-9"
              disabled={!active && !chapterVoiceover}
              onClick={() => {
                dispatch({ type: "UNLOCK_AUDIO" });
                if (active) {
                  replay();
                } else if (chapterVoiceover) {
                  play(chapterVoiceover);
                }
              }}
              title="Replay narration"
              type="button"
            >
              <RotateCcw aria-hidden="true" size={16} />
            </button>
            <button
              aria-label={muted ? "Unmute voiceover" : "Mute voiceover"}
              className="control-button !h-9 !w-9"
              onClick={toggleMute}
              title={muted ? "Unmute narration" : "Mute narration"}
              type="button"
            >
              {muted ? <VolumeX aria-hidden="true" size={16} /> : <Volume2 aria-hidden="true" size={16} />}
            </button>
            <button
              aria-label={subtitlesVisible ? "Hide subtitles" : "Show subtitles"}
              className={`control-button !h-9 !w-9 ${subtitlesVisible ? "border-control-warm text-control-text" : ""}`}
              onClick={toggleSubtitles}
              title={subtitlesVisible ? "Hide captions" : "Show captions"}
              type="button"
            >
              <Captions aria-hidden="true" size={16} />
            </button>
          {message ? <span className="sr-only">{message}</span> : null}
        </div>
      </section>

      {subtitlesVisible && active && subtitle ? (
        <div className="architectural-panel absolute bottom-[calc(var(--stage-safe-y)+5.4rem)] right-[var(--stage-safe-x)] z-40 hidden w-[min(27rem,30cqw)] px-4 py-3 text-left text-xs leading-5 text-control-soft shadow-control lg:block">
          {subtitle}
        </div>
      ) : null}
    </>
  );
}
