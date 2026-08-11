import { useEffect } from "react";
import { experienceRedesignFlags } from "../config/experience-redesign";
import { usePresentation } from "../state/PresentationProvider";

export function useDevelopmentOverlayToggle() {
  const { dispatch, state } = usePresentation();
  const enabled =
    experienceRedesignFlags.enableDevelopmentOverlay ||
    experienceRedesignFlags.forceDevelopmentOverlayInProduction;

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (!(event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "d")) {
        return;
      }

      event.preventDefault();
      dispatch({ type: "SET_DEVELOPMENT_OVERLAY", active: !state.developmentOverlayActive });
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch, enabled, state.developmentOverlayActive]);
}
