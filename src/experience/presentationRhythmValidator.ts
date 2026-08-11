import { presentationRhythmRules } from "../config/experience-redesign";
import type { Chapter } from "../data/contentTypes";
import { validateSceneRegistry } from "./sceneRegistry";

type RhythmWarning = {
  rule: string;
  message: string;
  chapterIds: string[];
};

export function validatePresentationRhythm(chapters: Chapter[]) {
  const warnings: RhythmWarning[] = [];

  collectRepeatedWarnings(warnings, chapters, "sceneType", presentationRhythmRules.maxSameSceneTypeInARow);
  collectRepeatedWarnings(warnings, chapters, "transitionIn", presentationRhythmRules.maxSameTransitionInARow);
  collectRepeatedWarnings(
    warnings,
    chapters,
    "backgroundTreatment",
    presentationRhythmRules.maxSameBackgroundTreatmentInARow,
  );

  collectExperienceRunWarning(
    warnings,
    chapters,
    "low-interaction",
    presentationRhythmRules.maxLowInteractionScenesInARow,
    (chapter) => (chapter.experience?.interactionLevel ?? 0) <= 1,
  );
  collectExperienceRunWarning(
    warnings,
    chapters,
    "high-density",
    presentationRhythmRules.maxHighDensityScenesInARow,
    (chapter) => (chapter.experience?.informationDensity ?? 1) >= 4,
  );
  collectExperienceRunWarning(
    warnings,
    chapters,
    "passive-scenes",
    presentationRhythmRules.maxPassiveScenesInARow,
    (chapter) => chapter.interactionType === "passive" || (chapter.experience?.interactionLevel ?? 0) <= 1,
  );
  collectExperienceRunWarning(
    warnings,
    chapters,
    "visual-intensity-plateau",
    presentationRhythmRules.maxSameVisualIntensityInARow,
    (_chapter, index, sequence) =>
      index > 0 && sequence[index - 1].experience?.visualIntensity === sequence[index].experience?.visualIntensity,
  );
  collectMemoryMomentWarnings(warnings, chapters);

  if (!validateSceneRegistry()) {
    warnings.push({
      rule: "scene-registry",
      message: "One or more declared scene archetypes are missing from the scene registry.",
      chapterIds: [],
    });
  }

  return warnings;
}

export function warnPresentationRhythm(chapters: Chapter[]) {
  if (!import.meta.env.DEV) {
    return;
  }

  const warnings = validatePresentationRhythm(chapters);
  warnings.forEach((warning) => {
    console.warn(`[Presentation rhythm] ${warning.rule}: ${warning.message}`, warning.chapterIds);
  });
}

function collectRepeatedWarnings(
  warnings: RhythmWarning[],
  chapters: Chapter[],
  key: "sceneType" | "transitionIn" | "backgroundTreatment",
  maxRun: number,
) {
  collectExperienceRunWarning(
    warnings,
    chapters,
    `repeated-${key}`,
    maxRun,
    (chapter, index, sequence) => index > 0 && chapter[key] === sequence[index - 1][key],
  );
}

function collectExperienceRunWarning(
  warnings: RhythmWarning[],
  chapters: Chapter[],
  rule: string,
  maxRun: number,
  predicate: (chapter: Chapter, index: number, sequence: Chapter[]) => boolean,
) {
  let run: Chapter[] = [];

  chapters.forEach((chapter, index) => {
    if (predicate(chapter, index, chapters)) {
      run = run.length ? [...run, chapter] : [chapters[index - 1], chapter].filter(Boolean);
    } else {
      pushRunWarning(warnings, rule, run, maxRun);
      run = [];
    }
  });

  pushRunWarning(warnings, rule, run, maxRun);
}

function collectMemoryMomentWarnings(warnings: RhythmWarning[], chapters: Chapter[]) {
  let sinceMemoryMoment: Chapter[] = [];

  chapters.forEach((chapter) => {
    sinceMemoryMoment.push(chapter);
    if (chapter.experience?.memoryMoment) {
      sinceMemoryMoment = [];
      return;
    }

    if (sinceMemoryMoment.length > presentationRhythmRules.maxChaptersWithoutMemoryMoment) {
      warnings.push({
        rule: "memory-moment-spacing",
        message: "A long chapter interval has no marked memory moment.",
        chapterIds: sinceMemoryMoment.map((item) => item.id),
      });
      sinceMemoryMoment = [];
    }
  });
}

function pushRunWarning(warnings: RhythmWarning[], rule: string, run: Chapter[], maxRun: number) {
  if (run.length > maxRun) {
    warnings.push({
      rule,
      message: `More than ${maxRun} chapters repeat the same rhythm characteristic.`,
      chapterIds: run.map((chapter) => chapter.id),
    });
  }
}
