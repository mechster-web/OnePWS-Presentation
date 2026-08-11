import {
  Captions,
  ChevronLeft,
  ChevronRight,
  Home,
  LayoutGrid,
  Maximize2,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useFullscreen } from "../../hooks/useFullscreen";
import { usePresentation } from "../../state/PresentationProvider";
import { ModeToggle } from "./ModeToggle";

export function MainNavigation() {
  const { dispatch, state } = usePresentation();
  const { toggleFullscreen } = useFullscreen();

  return (
    <nav
      aria-label="Presentation controls"
      className="absolute inset-x-[var(--stage-safe-x)] bottom-[var(--stage-safe-y)] z-30 flex items-end justify-between gap-5"
    >
      <div className="flex items-center gap-2">
        <button
          aria-label="Previous chapter"
          className="control-button"
          onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })}
          type="button"
        >
          <ChevronLeft aria-hidden="true" size={18} />
        </button>
        <button
          aria-label={state.isPlaying ? "Pause presentation" : "Play presentation"}
          className="control-button"
          onClick={() => dispatch({ type: "SET_PLAYING", isPlaying: !state.isPlaying })}
          type="button"
        >
          {state.isPlaying ? <Pause aria-hidden="true" size={18} /> : <Play aria-hidden="true" size={18} />}
        </button>
        <button
          aria-label="Next chapter"
          className="control-button"
          onClick={() => dispatch({ type: "NEXT_CHAPTER" })}
          type="button"
        >
          <ChevronRight aria-hidden="true" size={18} />
        </button>
        <button
          aria-label="Open chapter menu"
          className="control-button ml-2"
          onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })}
          type="button"
        >
          <LayoutGrid aria-hidden="true" size={18} />
        </button>
        <button
          aria-label="Return to main journey"
          className="control-button hidden sm:flex"
          onClick={() => dispatch({ type: "GO_TO_CHAPTER", chapterId: "opening-cover" })}
          type="button"
        >
          <Home aria-hidden="true" size={17} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          aria-label={state.narrationEnabled ? "Sound on" : "Sound off"}
          className="control-button"
          onClick={() => dispatch({ type: "TOGGLE_NARRATION" })}
          type="button"
        >
          {state.narrationEnabled ? <Volume2 aria-hidden="true" size={18} /> : <VolumeX aria-hidden="true" size={18} />}
        </button>
        <button
          aria-label={state.captionsEnabled ? "Subtitles on" : "Subtitles off"}
          className={`control-button ${state.captionsEnabled ? "border-control-warm text-control-text" : ""}`}
          onClick={() => dispatch({ type: "TOGGLE_CAPTIONS" })}
          type="button"
        >
          <Captions aria-hidden="true" size={18} />
        </button>
        <button
          aria-label="Toggle full screen"
          className="control-button"
          onClick={() => void toggleFullscreen()}
          type="button"
        >
          <Maximize2 aria-hidden="true" size={18} />
        </button>
        <ModeToggle />
      </div>
    </nav>
  );
}
