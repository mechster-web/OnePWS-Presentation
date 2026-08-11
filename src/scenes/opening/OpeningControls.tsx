import { Headphones, Map, RotateCcw, SkipForward } from "lucide-react";

export function OpeningControls({
  skipAvailable,
  onSkip,
  onReplay,
  onChapterMap,
  onNarration,
}: {
  skipAvailable: boolean;
  onSkip: () => void;
  onReplay: () => void;
  onChapterMap: () => void;
  onNarration: () => void;
}) {
  return (
    <div aria-label="Opening controls" className="pws-opening-control-dock">
      {skipAvailable ? (
        <button
          aria-label="Skip opening and choose a journey"
          className="pws-opening-control pws-opening-control-primary"
          onClick={onSkip}
          title="Skip to journey selection"
          type="button"
        >
          <SkipForward aria-hidden="true" size={16} />
          <span>Skip to journeys</span>
        </button>
      ) : null}
      <button
        aria-label="Replay opening"
        className="pws-opening-control"
        onClick={onReplay}
        title="Replay opening"
        type="button"
      >
        <RotateCcw aria-hidden="true" size={16} />
        <span>Replay</span>
      </button>
      <button
        aria-label="Enable narration"
        className="pws-opening-control"
        onClick={onNarration}
        title="Enable narration"
        type="button"
      >
        <Headphones aria-hidden="true" size={16} />
        <span>Narration</span>
      </button>
      <button
        aria-label="Open experience map"
        className="pws-opening-control"
        onClick={onChapterMap}
        title="Open experience map"
        type="button"
      >
        <Map aria-hidden="true" size={16} />
        <span>Map</span>
      </button>
    </div>
  );
}
