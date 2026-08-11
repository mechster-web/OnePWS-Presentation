import type { PerformanceMode, SceneThemeVariant } from "../data/contentTypes";

export const sceneThemeVariants: SceneThemeVariant[] = [
  "cinematic-dark",
  "architectural-light",
  "operational-dark",
  "product-light",
  "data-dark",
  "immersive-neutral",
  "alert-state",
  "calm-state",
];

export const performanceModes: PerformanceMode[] = ["premium", "balanced", "reduced"];

export const designTokens = {
  colors: {
    graphite950: "#050607",
    graphite900: "#0b0d10",
    graphite850: "#11151a",
    graphite800: "#171c22",
    steel700: "#252c34",
    steel500: "#68727e",
    lineDark: "rgb(255 255 255 / 0.14)",
    lineLight: "rgb(18 22 28 / 0.14)",
    warmWhite: "#f7f2ea",
    coolWhite: "#eef4f7",
    mutedDark: "#aab4be",
    mutedLight: "#59616c",
    onepwsRed: "#cf1f2b",
    alertRed: "#e13b43",
    operationalGreen: "#39a86b",
    informationBlue: "#6aa8ff",
    lightSurface: "#f4f1ea",
  },
  radii: {
    none: "0",
    hairline: "2px",
    control: "4px",
    panel: "6px",
  },
  blur: {
    none: "0",
    soft: "10px",
    glass: "18px",
    depth: "28px",
  },
  shadows: {
    stage: "0 30px 90px rgb(0 0 0 / 0.34)",
    soft: "0 18px 60px rgb(0 0 0 / 0.20)",
    light: "0 22px 70px rgb(17 22 29 / 0.13)",
  },
  motion: {
    duration: {
      instant: 0.01,
      fast: 0.18,
      normal: 0.36,
      deliberate: 0.72,
      cinematic: 1.15,
      ambient: 8,
    },
    easing: {
      architectural: [0.16, 1, 0.3, 1] as const,
      cinematic: [0.22, 1, 0.36, 1] as const,
      response: [0.19, 1, 0.22, 1] as const,
      human: [0.33, 1, 0.68, 1] as const,
      precision: [0.2, 0.8, 0.2, 1] as const,
      data: [0.4, 0, 0.2, 1] as const,
    },
  },
  z: {
    base: 0,
    media: 2,
    atmosphere: 4,
    structure: 8,
    subject: 12,
    content: 18,
    interaction: 24,
    navigation: 30,
    overlay: 70,
    diagnostics: 90,
  },
} as const;

export function performanceClass(mode: PerformanceMode) {
  return `pws-performance-${mode}`;
}
