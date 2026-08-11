import { MonitorPlay, Presentation, UserRound } from "lucide-react";
import type { PresentationMode } from "../../data/contentTypes";
import { usePresentation } from "../../state/PresentationProvider";

const modes: Array<{ mode: PresentationMode; label: string; icon: typeof Presentation }> = [
  { mode: "presenter", label: "Presenter", icon: Presentation },
  { mode: "selfGuided", label: "Self-guided", icon: UserRound },
  { mode: "autoPlay", label: "Auto-play", icon: MonitorPlay },
];

export function ModeToggle() {
  const { dispatch, state } = usePresentation();

  return (
    <div aria-label="Presentation mode" className="architectural-panel hidden p-1 sm:flex" role="group">
      {modes.map(({ icon: Icon, label, mode }) => {
        const isActive = state.mode === mode;
        return (
          <button
            aria-pressed={isActive}
            className={`inline-flex h-10 items-center gap-2 px-3 text-xs transition ${
              isActive
                ? "bg-control-warm text-white"
                : "text-control-muted hover:bg-control-panel/80 hover:text-control-text"
            }`}
            key={mode}
            onClick={() => dispatch({ type: "SET_MODE", mode })}
            type="button"
          >
            <Icon aria-hidden="true" size={15} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
