import { useEffect, useMemo, useState } from "react";
import type { PerformanceMode } from "../data/contentTypes";

const storageKey = "onepws-performance-mode";

export function usePerformanceMode() {
  const [overrideMode, setOverrideMode] = useState<PerformanceMode | "auto">(() => {
    const stored = window.localStorage.getItem(storageKey);
    return stored === "premium" || stored === "balanced" || stored === "reduced" ? stored : "auto";
  });

  const detectedMode = useMemo<PerformanceMode>(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const deviceMemory = "deviceMemory" in navigator ? Number(navigator.deviceMemory) : 8;
    const cores = navigator.hardwareConcurrency ?? 8;

    if (reducedMotion || deviceMemory <= 4 || cores <= 4) {
      return "reduced";
    }

    if (deviceMemory >= 8 && cores >= 8) {
      return "premium";
    }

    return "balanced";
  }, []);

  const mode = overrideMode === "auto" ? detectedMode : overrideMode;

  useEffect(() => {
    document.documentElement.dataset.performanceMode = mode;
    document.documentElement.classList.remove("pws-performance-premium", "pws-performance-balanced", "pws-performance-reduced");
    document.documentElement.classList.add(`pws-performance-${mode}`);
  }, [mode]);

  function setPerformanceMode(nextMode: PerformanceMode | "auto") {
    setOverrideMode(nextMode);
    if (nextMode === "auto") {
      window.localStorage.removeItem(storageKey);
    } else {
      window.localStorage.setItem(storageKey, nextMode);
    }
  }

  return { mode, overrideMode, detectedMode, setPerformanceMode };
}
