export const motionEase = {
  system: [0.22, 1, 0.36, 1] as const,
  mechanical: [0.16, 1, 0.3, 1] as const,
  lighting: [0.33, 1, 0.68, 1] as const,
  linear: "linear" as const,
};

export const motionDuration = {
  micro: 0.16,
  control: 0.24,
  focus: 0.42,
  layer: 0.62,
  spatial: 0.9,
  environmental: 1.2,
};

type MotionEase = readonly [number, number, number, number] | "linear";

export function reducedTransition(
  reducedMotion: boolean,
  duration: number,
  delay = 0,
  ease: MotionEase = motionEase.system,
) {
  return {
    duration: reducedMotion ? 0.01 : duration,
    delay: reducedMotion ? 0 : delay,
    ease,
  };
}

export function revealTransition(reducedMotion: boolean, delay = 0) {
  return reducedTransition(reducedMotion, motionDuration.focus, delay, motionEase.system);
}

export function layerTransition(reducedMotion: boolean, delay = 0) {
  return reducedTransition(reducedMotion, motionDuration.layer, delay, motionEase.mechanical);
}

export function spatialTransition(reducedMotion: boolean, delay = 0) {
  return reducedTransition(reducedMotion, motionDuration.spatial, delay, motionEase.mechanical);
}

export const entrance = {
  quietReveal: (reducedMotion: boolean, y = 8) => ({
    initial: { opacity: 0, y: reducedMotion ? 0 : y },
    animate: { opacity: 1, y: 0 },
  }),
  informationFocus: (reducedMotion: boolean) => ({
    initial: { opacity: 0, filter: reducedMotion ? "none" : "blur(3px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
  }),
};
