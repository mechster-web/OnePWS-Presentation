import { useEffect } from "react";
import { autoPlayConfig, selfGuidedConfig } from "../content/autoplayTimings";
import { usePresentation } from "../state/PresentationProvider";

export function useShowroomAutoPlayRecovery() {
  const { dispatch, state } = usePresentation();

  useEffect(() => {
    if (!autoPlayConfig.enableInactivityAutoPlay || state.mode !== "selfGuided") {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      const inactiveFor = Date.now() - state.lastInteractionAt;
      if (inactiveFor >= selfGuidedConfig.restartAfterInactivityMs) {
        dispatch({ type: "START_AUTOPLAY", restartFromOpening: true });
      }
    }, selfGuidedConfig.restartAfterInactivityMs);

    return () => window.clearTimeout(timeout);
  }, [dispatch, state.lastInteractionAt, state.mode]);
}
