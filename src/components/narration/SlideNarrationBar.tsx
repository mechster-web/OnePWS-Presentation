import { Pause, Play, RotateCcw, SkipBack, SkipForward, Square } from "lucide-react";
import type { GuidedNarration } from "../../hooks/useGuidedNarration";

type Props = {
  narration: GuidedNarration;
  /** Called before playback starts, to unlock audio and silence other players. */
  onBeforePlay?: () => void;
  className?: string;
};

const CONTROL =
  "grid place-items-center rounded-full border border-slate-300/80 bg-white/86 text-control-text shadow-[0_0.4rem_1rem_rgb(15_23_42/0.08)] transition hover:border-control-warm hover:text-control-warm disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-300/80 disabled:hover:text-control-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-control-warm/60";

/**
 * Transport for a slide walkthrough.
 *
 * Kept scene-agnostic: it drives whatever segment list the scene passes, so a
 * new narrated slide needs no new controls of its own.
 */
export function SlideNarrationBar({ narration, onBeforePlay, className = "" }: Props) {
  if (!narration.total) {
    return null;
  }

  const start = (action: () => void) => () => {
    onBeforePlay?.();
    action();
  };

  const position = narration.hasStarted ? `${narration.activeIndex + 1} / ${narration.total}` : `${narration.total} sections`;
  const status = narration.error
    ? narration.error
    : narration.isLoading
      ? "Loading narration..."
      : narration.hasStarted
        ? narration.activeSegment?.label ?? ""
        : "Guided walkthrough";

  return (
    <div
      className={`inline-flex max-w-full items-center gap-[0.45cqw] rounded-full border border-slate-200/90 bg-white/78 px-[0.7cqw] py-[0.42cqh] shadow-[0_0.7rem_1.7rem_rgb(15_23_42/0.08)] backdrop-blur-xl ${className}`}
    >
      <button
        aria-label={narration.isPlaying ? "Pause narration" : "Play narration"}
        aria-pressed={narration.isPlaying}
        className={`${CONTROL} h-[2rem] w-[2rem] border-control-warm bg-control-warm text-white hover:bg-control-warm hover:text-white`}
        onClick={start(narration.toggle)}
        type="button"
      >
        {narration.isPlaying ? <Pause size={15} strokeWidth={2.1} /> : <Play className="translate-x-[6%]" size={15} strokeWidth={2.1} />}
      </button>

      <button aria-label="Previous section" className={`${CONTROL} h-[1.7rem] w-[1.7rem]`} disabled={narration.activeIndex <= 0} onClick={start(narration.previous)} type="button">
        <SkipBack size={12} strokeWidth={2} />
      </button>
      <button aria-label="Replay this section" className={`${CONTROL} h-[1.7rem] w-[1.7rem]`} disabled={!narration.hasStarted} onClick={start(narration.replay)} type="button">
        <RotateCcw size={12} strokeWidth={2} />
      </button>
      <button
        aria-label="Next section"
        className={`${CONTROL} h-[1.7rem] w-[1.7rem]`}
        disabled={narration.hasStarted && narration.activeIndex >= narration.total - 1}
        onClick={start(narration.next)}
        type="button"
      >
        <SkipForward size={12} strokeWidth={2} />
      </button>
      <button aria-label="Stop narration" className={`${CONTROL} h-[1.7rem] w-[1.7rem]`} disabled={!narration.hasStarted} onClick={narration.stop} type="button">
        <Square size={11} strokeWidth={2.4} />
      </button>

      <span className="min-w-0 pl-[0.35cqw]">
        <span className="block truncate text-[clamp(0.58rem,0.66cqw,0.76rem)] font-semibold uppercase tracking-[0.12em] text-control-warm">
          {position}
        </span>
        <span className="block truncate text-[clamp(0.56rem,0.64cqw,0.74rem)] font-medium text-control-muted" title={narration.activeSegment?.text}>
          {status}
        </span>
      </span>

      <span aria-hidden="true" className="ml-[0.35cqw] h-[0.24rem] w-[3.4rem] shrink-0 overflow-hidden rounded-full bg-slate-200">
        <span
          className="block h-full rounded-full bg-control-warm transition-[width] duration-200"
          style={{ width: `${Math.round((narration.hasStarted ? narration.progress : 0) * 100)}%` }}
        />
      </span>
    </div>
  );
}
