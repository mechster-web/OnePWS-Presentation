import { useEffect } from "react";
import { usePresentation } from "../state/PresentationProvider";

export function useKeyboardControls() {
  const { dispatch, state } = usePresentation();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const isEditableTarget =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable;
      const isInteractiveTarget = Boolean(target?.closest("button, a, input, textarea, select, [role='button']"));

      if (isEditableTarget || isInteractiveTarget) {
        return;
      }

      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        dispatch({ type: "NEXT_CHAPTER" });
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        dispatch({ type: "PREVIOUS_CHAPTER" });
      }
      if (event.key === "Escape") {
        dispatch({ type: "SET_OVERLAY", overlay: null });
      }
      if (event.key.toLowerCase() === "m") {
        dispatch({ type: "TOGGLE_NARRATION" });
      }
      if (event.key.toLowerCase() === "c") {
        dispatch({ type: "TOGGLE_CAPTIONS" });
      }
      if (event.key.toLowerCase() === "g") {
        dispatch({ type: "SET_OVERLAY", overlay: state.activeOverlay ? null : { type: "chapterMap" } });
      }
      if (event.key.toLowerCase() === "p") {
        dispatch({ type: "SET_PLAYING", isPlaying: !state.isPlaying });
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch, state.activeOverlay, state.isPlaying]);
}
