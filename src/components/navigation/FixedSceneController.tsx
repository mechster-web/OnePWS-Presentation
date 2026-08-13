import { ChevronLeft, ChevronRight, Expand, Headphones, Map } from "lucide-react";
import { useMemo } from "react";
import { useFullscreen } from "../../hooks/useFullscreen";
import { buildNavigationModel } from "../../navigation/navigationModel";
import { usePresentation } from "../../state/PresentationProvider";

export function FixedSceneController() {
  const { dispatch, state } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const model = useMemo(() => buildNavigationModel(state), [state]);

  return (
    <div aria-label="Presentation controls" className="pws-fixed-scene-controller" role="group">
      <button
        aria-label={model.previousDestination ? `Previous: ${model.previousDestination.shortTitle}` : "Previous scene"}
        className="pws-fixed-scene-control"
        disabled={!model.previousDestination}
        onClick={() => {
          if (model.previousDestination) {
            dispatch({ type: "GO_TO_CHAPTER", chapterId: model.previousDestination.chapterId });
          }
        }}
        title={model.previousDestination ? `Previous: ${model.previousDestination.shortTitle}` : "Previous"}
        type="button"
      >
        <ChevronLeft aria-hidden="true" size={20} />
      </button>
      <button
        aria-label={model.nextDestination ? `Next: ${model.nextDestination.shortTitle}` : "Next scene"}
        className="pws-fixed-scene-control pws-fixed-scene-control-primary"
        disabled={!model.nextDestination}
        onClick={() => {
          if (model.nextDestination) {
            dispatch({ type: "GO_TO_CHAPTER", chapterId: model.nextDestination.chapterId });
          }
        }}
        title={model.nextDestination ? `Next: ${model.nextDestination.shortTitle}` : "Next"}
        type="button"
      >
        <ChevronRight aria-hidden="true" size={21} />
      </button>
      <button aria-label="Open experience map" className="pws-fixed-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button">
        <Map aria-hidden="true" size={20} />
      </button>
      <button
        aria-label={state.narrationEnabled ? "Disable narration" : "Enable narration"}
        className="pws-fixed-scene-control"
        onClick={() => {
          dispatch({ type: "UNLOCK_AUDIO" });
          dispatch({ type: "TOGGLE_NARRATION" });
        }}
        title="Narration"
        type="button"
      >
        <Headphones aria-hidden="true" size={20} />
      </button>
      <button aria-label="Toggle fullscreen" className="pws-fixed-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button">
        <Expand aria-hidden="true" size={20} />
      </button>
    </div>
  );
}
