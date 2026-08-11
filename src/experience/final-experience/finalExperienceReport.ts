import type { Chapter } from "../../data/contentTypes";
import { buildExperienceFlow } from "./ExperienceFlowEngine";
import { scoreExperience } from "./ExperienceScore";
import { validateExperienceVariation } from "./ExperienceVariationValidator";

export function buildFinalExperienceSummary(chapters: Chapter[]) {
  const flow = buildExperienceFlow(chapters);
  const score = scoreExperience(chapters);
  const warnings = validateExperienceVariation(chapters);

  return {
    flow,
    score,
    warnings,
    signatureMomentIds: flow.signatureMoments.map((moment) => moment.chapterId),
    releaseRecommendation:
      score.overall >= 88 && warnings.length <= 12
        ? "Release candidate after visual QA and approved signature-moment captures."
        : "Not yet production-final; address variation warnings and capture missing assets.",
  };
}
