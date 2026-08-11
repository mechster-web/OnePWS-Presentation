import { useEffect, useState } from "react";

export type SceneState =
  | "entering"
  | "ready"
  | "exploring"
  | "detail-open"
  | "narration-playing"
  | "interaction-complete"
  | "preparing-exit"
  | "exiting";

export function useSceneState(readyDelayMs = 420) {
  const [sceneState, setSceneState] = useState<SceneState>("entering");

  useEffect(() => {
    const timeout = window.setTimeout(() => setSceneState("ready"), readyDelayMs);
    return () => window.clearTimeout(timeout);
  }, [readyDelayMs]);

  return { sceneState, setSceneState, interactionReady: sceneState !== "entering" && sceneState !== "exiting" };
}
