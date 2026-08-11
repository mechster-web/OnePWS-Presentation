import { useEffect } from "react";
import { usePresentation } from "../state/PresentationProvider";

export function usePointerActivity() {
  const { dispatch } = usePresentation();

  useEffect(() => {
    function markInteraction() {
      dispatch({ type: "MARK_INTERACTION" });
    }

    function markPointerInteraction(event: PointerEvent | TouchEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-preserve-autoplay='true']")) {
        dispatch({ type: "UNLOCK_AUDIO" });
        return;
      }

      markInteraction();
    }

    function markKeyboardInteraction(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-preserve-autoplay='true']")) {
        dispatch({ type: "UNLOCK_AUDIO" });
        return;
      }

      markInteraction();
    }

    window.addEventListener("pointerdown", markPointerInteraction);
    window.addEventListener("touchstart", markPointerInteraction);
    window.addEventListener("keydown", markKeyboardInteraction);
    return () => {
      window.removeEventListener("pointerdown", markPointerInteraction);
      window.removeEventListener("touchstart", markPointerInteraction);
      window.removeEventListener("keydown", markKeyboardInteraction);
    };
  }, [dispatch]);
}
