import { Captions, MousePointer2, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { getAutoPlayTiming } from "../../content/autoplayTimings";
import { usePresentation } from "../../state/PresentationProvider";
import { getChapterProgress } from "../../state/selectors";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";

export function AutoPlayShowroomControls() {
  const { dispatch, state } = usePresentation();
  const voiceover = useVoiceover();
  const progress = getChapterProgress(state.chapterId);
  const timing = getAutoPlayTiming(state.chapterId);

  if (state.mode !== "autoPlay") {
    return null;
  }

  return (
    <div className="absolute inset-x-6 bottom-6 z-30 flex items-end justify-between gap-4 md:inset-x-10 md:bottom-8">
      <div className="w-[min(520px,52vw)]">
        <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-control-muted">
          <span>Auto-play showroom mode</span>
          <span>{Math.round(progress.percent)}%</span>
        </div>
        <div className="h-1 bg-control-line">
          <div className="h-1 bg-control-warm" style={{ width: `${progress.percent}%` }} />
        </div>
        <p className="mt-3 text-xs text-control-muted">
          Chapter timing: {Math.round((timing.durationMs + (timing.pauseForMediaMs ?? 0)) / 1000)}s
        </p>
      </div>

      <div className="flex flex-wrap justify-end gap-2">
        <button
          className="inline-flex min-h-11 items-center gap-2 border border-control-line bg-control-black/55 px-4 py-3 text-sm text-control-soft backdrop-blur transition hover:border-control-warm hover:text-control-warm"
          onClick={() => dispatch({ type: "MARK_INTERACTION" })}
          type="button"
        >
          <MousePointer2 aria-hidden="true" size={16} />
          Explore
        </button>
        <button
          aria-label={voiceover.muted ? "Unmute narration" : "Mute narration"}
          className="control-button"
          data-preserve-autoplay="true"
          onClick={() => {
            dispatch({ type: "UNLOCK_AUDIO" });
            voiceover.toggleMute();
          }}
          type="button"
        >
          {voiceover.muted ? <VolumeX aria-hidden="true" size={18} /> : <Volume2 aria-hidden="true" size={18} />}
        </button>
        <button
          aria-label="Toggle subtitles"
          className={`control-button ${voiceover.subtitlesVisible ? "text-control-warm" : ""}`}
          data-preserve-autoplay="true"
          onClick={voiceover.toggleSubtitles}
          type="button"
        >
          <Captions aria-hidden="true" size={18} />
        </button>
        <button
          aria-label="Restart auto-play from opening"
          className="control-button"
          data-preserve-autoplay="true"
          onClick={() => dispatch({ type: "START_AUTOPLAY", restartFromOpening: true })}
          type="button"
        >
          <RotateCcw aria-hidden="true" size={18} />
        </button>
      </div>
    </div>
  );
}
