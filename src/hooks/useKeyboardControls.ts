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

      if (event.key === "ArrowRight" || event.key === " " || event.key === "PageDown") {
        event.preventDefault();
        dispatch({ type: "NEXT_CHAPTER" });
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        dispatch({ type: "PREVIOUS_CHAPTER" });
      }
      if (event.key === "Escape") {
        dispatch({ type: "SET_NAVIGATION_CONTROLS_REVEALED", revealed: !state.navigationControlsRevealed });
        dispatch({ type: "SET_OVERLAY", overlay: state.activeOverlay ? null : state.activeOverlay });
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
      if (event.key.toLowerCase() === "h") {
        dispatch({ type: "GO_TO_CHAPTER", chapterId: "opening-cover" });
      }
      if (event.key === "End") {
        dispatch({ type: "GO_TO_CHAPTER", chapterId: "next-steps-closing" });
      }
      if (event.key.toLowerCase() === "s") {
        dispatch({ type: "MARK_CHAPTER_SKIPPED" });
        dispatch({ type: "NEXT_CHAPTER" });
      }
      if (event.key.toLowerCase() === "r") {
        dispatch({ type: "GO_TO_CHAPTER", chapterId: state.chapterId });
      }
      if (event.key.toLowerCase() === "p") {
        dispatch({ type: "SET_PLAYING", isPlaying: !state.isPlaying });
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch, state.activeOverlay, state.chapterId, state.isPlaying, state.navigationControlsRevealed]);
}
