import type { Chapter } from "../../data/contentTypes";
import { buildExperienceFlow } from "./ExperienceFlowEngine";
import { finalExperienceRules } from "./finalExperienceConfig";

export type VariationWarning = {
  code: string;
  message: string;
  chapterIds: string[];
};

export function validateExperienceVariation(chapters: Chapter[]) {
  const warnings: VariationWarning[] = [];
  const flow = buildExperienceFlow(chapters);

  chapters.forEach((chapter, index) => {
    const previous = chapters[index - 1];
    const movement = flow.movements[index];
    const previousMovement = flow.movements[index - 1];
    if (!previous || !previousMovement) {
      return;
    }

    compare(warnings, "scene-type", previous.sceneType, chapter.sceneType, [previous.id, chapter.id]);
    compare(warnings, "interaction-type", previous.interactionType, chapter.interactionType, [previous.id, chapter.id]);
    compare(warnings, "transition", previous.transitionIn, chapter.transitionIn, [previous.id, chapter.id]);
    compare(warnings, "camera", previousMovement.design.camera, movement.design.camera, [previous.id, chapter.id]);
    compare(warnings, "light", previousMovement.design.light, movement.design.light, [previous.id, chapter.id]);

    if (movement.meaningfulEventEveryMs > finalExperienceRules.maxPassiveMs) {
      warnings.push({
        code: "thirty-second-rule",
        message: "A chapter risks passive viewing beyond 30 seconds.",
        chapterIds: [chapter.id],
      });
    }
  });

  if (
    flow.signatureMoments.length < finalExperienceRules.signatureMomentMin ||
    flow.signatureMoments.length > finalExperienceRules.signatureMomentMax
  ) {
    warnings.push({
      code: "signature-moment-count",
      message: "Signature moment count should remain between 8 and 10.",
      chapterIds: flow.signatureMoments.map((moment) => moment.chapterId),
    });
  }

  return warnings;
}

export function warnExperienceVariation(chapters: Chapter[]) {
  if (!import.meta.env.DEV) {
    return;
  }

  validateExperienceVariation(chapters).forEach((warning) => {
    console.warn(`[Experience variation] ${warning.code}: ${warning.message}`, warning.chapterIds);
  });
}

function compare(warnings: VariationWarning[], code: string, previous: unknown, current: unknown, chapterIds: string[]) {
  if (previous && current && previous === current) {
    warnings.push({
      code: `repeated-${code}`,
      message: `Consecutive chapters repeat ${code}.`,
      chapterIds,
    });
  }
}
