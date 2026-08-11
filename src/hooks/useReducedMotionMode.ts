import { useEffect } from "react";
import { usePresentation } from "../state/PresentationProvider";

export function useReducedMotionMode() {
  const { dispatch } = usePresentation();

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => dispatch({ type: "SET_REDUCED_MOTION", reducedMotion: media.matches });

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [dispatch]);
}
