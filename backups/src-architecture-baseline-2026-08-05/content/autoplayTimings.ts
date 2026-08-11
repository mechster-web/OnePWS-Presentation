import { enabledChapters } from "./chapters";
import type { ChapterId } from "../data/contentTypes";

export type AutoPlayChapterTiming = {
  chapterId: ChapterId;
  durationMs: number;
  pauseForMediaMs?: number;
  narrationStartDelayMs: number;
  skipTechnicalLayers: boolean;
};

export const autoPlayConfig = {
  inactivityRestartMs: 150_000,
  endHoldMs: 9_000,
  returnToOpening: true,
  requireInteractionForAudio: true,
  defaultNarrationStartDelayMs: 1_200,
};

export const selfGuidedConfig = {
  instructionAutoHideMs: 18_000,
  inactivityHintMs: 90_000,
  restartAfterInactivityMs: autoPlayConfig.inactivityRestartMs,
  suggestedNextLabel: "Suggested next",
  exploreFeatureChapterId: "complete-ecosystem",
  mainMenuLabel: "Open journey menu",
};

export const autoPlayTimings: AutoPlayChapterTiming[] = enabledChapters.map((chapter, index) => ({
  chapterId: chapter.id,
  durationMs: chapter.durationMs,
  pauseForMediaMs: index === 0 ? 3_000 : undefined,
  narrationStartDelayMs: index === 0 ? 3_800 : autoPlayConfig.defaultNarrationStartDelayMs,
  skipTechnicalLayers: true,
}));

export function getAutoPlayTiming(chapterId: ChapterId) {
  return (
    autoPlayTimings.find((timing) => timing.chapterId === chapterId) ?? {
      chapterId,
      durationMs: 40_000,
      narrationStartDelayMs: autoPlayConfig.defaultNarrationStartDelayMs,
      skipTechnicalLayers: true,
    }
  );
}
