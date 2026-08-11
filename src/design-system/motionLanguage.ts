import type { Transition } from "framer-motion";
import type { PresentationMode, TransitionFamily } from "../data/contentTypes";
import { designTokens } from "./tokens";

export type MotionFamily =
  | "architectural-reveal"
  | "cinematic-reveal"
  | "operational-response"
  | "human-focus"
  | "product-precision"
  | "data-intelligence";

const duration = designTokens.motion.duration;
const easing = designTokens.motion.easing;

export function motionFamilyTransition(family: MotionFamily, reducedMotion: boolean, delay = 0): Transition {
  if (reducedMotion) {
    return { duration: duration.instant, delay: 0 };
  }

  switch (family) {
    case "architectural-reveal":
      return { duration: duration.deliberate, delay, ease: easing.architectural };
    case "cinematic-reveal":
      return { duration: duration.cinematic, delay, ease: easing.cinematic };
    case "operational-response":
      return { duration: duration.fast, delay, ease: easing.response };
    case "human-focus":
      return { duration: duration.deliberate, delay, ease: easing.human };
    case "product-precision":
      return { duration: duration.normal, delay, ease: easing.precision };
    case "data-intelligence":
      return { duration: duration.normal, delay, ease: easing.data };
  }
}

export function sceneTransition(
  family: TransitionFamily | undefined,
  mode: PresentationMode,
  reducedMotion: boolean,
): Transition {
  if (reducedMotion || mode === "presenter") {
    return { duration: mode === "presenter" ? 0.18 : 0.01, ease: easing.architectural };
  }

  const baseDuration = mode === "autoPlay" ? duration.cinematic : duration.deliberate;
  switch (family) {
    case "controlled-hard-cut":
      return { duration: duration.instant };
    case "fade-through-black":
    case "blackout-reset":
      return { duration: baseDuration, ease: easing.cinematic };
    case "fade-through-light":
    case "light-sweep":
      return { duration: duration.deliberate, ease: easing.human };
    case "depth-push":
    case "spatial-dolly":
    case "spatial-pan":
      return { duration: baseDuration, ease: easing.architectural };
    case "data-trace-transition":
    case "data-scan":
      return { duration: duration.normal, ease: easing.data };
    case "object-led-transition":
    case "media-match-cut":
    case "match-cut":
      return { duration: duration.normal, ease: easing.precision };
    case "lateral-architectural-wipe":
    case "vertical-structural-reveal":
    case "split-panel-transition":
    case "layer-reveal":
    case "aperture-open":
    case "focus-pull":
    case "blur-resolve":
    case "quiet-fade":
    default:
      return { duration: duration.deliberate, ease: easing.architectural };
  }
}

export function transitionInitial(family: TransitionFamily | undefined, reducedMotion: boolean) {
  if (reducedMotion) {
    return { opacity: 0 };
  }

  switch (family) {
    case "depth-push":
    case "spatial-dolly":
      return { opacity: 0, scale: 1.025, filter: "blur(10px)" };
    case "lateral-architectural-wipe":
      return { opacity: 0, clipPath: "inset(0 100% 0 0)" };
    case "vertical-structural-reveal":
      return { opacity: 0, clipPath: "inset(100% 0 0 0)" };
    case "aperture-open":
      return { opacity: 0, clipPath: "inset(45% 45% 45% 45%)" };
    case "focus-pull":
    case "blur-resolve":
      return { opacity: 0, filter: "blur(16px)" };
    case "controlled-hard-cut":
      return { opacity: 1 };
    default:
      return { opacity: 0 };
  }
}

export function transitionAnimate() {
  return { opacity: 1, scale: 1, filter: "blur(0px)", clipPath: "inset(0 0 0 0)" };
}
