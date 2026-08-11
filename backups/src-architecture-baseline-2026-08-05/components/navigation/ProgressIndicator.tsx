import { enabledChapters } from "../../content/chapters";
import { usePresentation } from "../../state/PresentationProvider";
import { getChapterProgress } from "../../state/selectors";
import { OnePwsLogo } from "../brand/OnePwsLogo";

export function ProgressIndicator() {
  const { dispatch, state } = usePresentation();
  const progress = getChapterProgress(state.chapterId);

  return (
    <header className="pointer-events-none absolute inset-x-[var(--stage-safe-x)] top-[var(--stage-safe-y)] z-30">
      <div className="absolute -left-[var(--stage-safe-x)] -right-[var(--stage-safe-x)] -top-[var(--stage-safe-y)] h-2 bg-control-warm" />
      <div className="flex items-start justify-between gap-5">
        <div className="pointer-events-auto min-w-[17rem]">
          <OnePwsLogo compact />
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-control-muted">
            Private Limited
          </p>
          <p className="mt-2 text-xs text-control-muted">
            {progress.index + 1} / {progress.total}
          </p>
        </div>
        <div className="pointer-events-auto mt-3 hidden max-w-[48rem] flex-1 items-center gap-2 md:flex">
          {enabledChapters.map((chapter) => (
            <button
              aria-label={`Go to ${chapter.title}`}
              className={`h-[0.22rem] flex-1 transition ${
                chapter.id === state.chapterId
                  ? "bg-control-warm shadow-glow"
                  : "bg-control-line hover:bg-control-muted"
              }`}
              key={chapter.id}
              onClick={() => dispatch({ type: "GO_TO_CHAPTER", chapterId: chapter.id })}
              type="button"
            />
          ))}
        </div>
        <div className="pointer-events-auto min-w-36 text-right text-xs uppercase tracking-[0.22em] text-control-muted">
          <span className="text-control-warm">Confidential</span>
          <span className="mt-2 block text-control-muted">{state.mode.replace(/([A-Z])/g, " $1")}</span>
        </div>
      </div>
      <div className="mt-5 h-px w-full bg-control-line md:hidden">
        <div className="h-px bg-control-warm" style={{ width: `${progress.percent}%` }} />
      </div>
    </header>
  );
}
