import type { PresentationMode } from "../data/contentTypes";

export const presentationConfig = {
  title: "OnePWS Control Room Capability Presentation",
  defaultMode: "selfGuided" as PresentationMode,
  defaultLanguage: "en",
  supportedLanguages: ["en"],
  targetResolution: { width: 1920, height: 1080 },
  idleTimeoutMs: 120_000,
  autoPlayResumeMs: 240_000,
  publicSafeModeDefault: true,
};
