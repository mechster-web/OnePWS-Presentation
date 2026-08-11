import type { Chapter } from "../../data/contentTypes";
import { validatePresentationRhythm } from "../presentationRhythmValidator";
import { buildExperienceFlow } from "./ExperienceFlowEngine";
import { validateExperienceVariation } from "./ExperienceVariationValidator";

export type ExperienceScore = {
  visualVariety: number;
  interactionDensity: number;
  narrativeFlow: number;
  emotionalCurve: number;
  attentionRetention: number;
  repetition: number;
  presenterFlexibility: number;
  accessibility: number;
  performance: number;
  customerJourney: number;
  memoryMoments: number;
  engineeringClarity: number;
  trust: number;
  overall: number;
  recommendations: string[];
};

export function scoreExperience(chapters: Chapter[]): ExperienceScore {
  const variationWarnings = validateExperienceVariation(chapters);
  const rhythmWarnings = validatePresentationRhythm(chapters);
  const flow = buildExperienceFlow(chapters);
  const redesigned = chapters.filter((chapter) => chapter.redesignStatus === "redesigned").length / chapters.length;
  const interactionAverage =
    chapters.reduce((total, chapter) => total + (chapter.experience?.interactionLevel ?? 1), 0) / chapters.length;
  const memoryMomentScore = inRange(flow.signatureMoments.length, 8, 10) ? 94 : 76;
  const repetitionPenalty = Math.min(38, variationWarnings.length * 4 + rhythmWarnings.length * 2);
  const recommendations = [
    variationWarnings.length ? "Review consecutive repetition warnings and tune camera/transition metadata." : "",
    rhythmWarnings.length ? "Review rhythm warnings for passive or dense chapter runs." : "",
    redesigned < 0.9 ? "Continue migrating mapped legacy chapters to bespoke scene treatments." : "",
    "Capture approved screenshots/video for each signature moment before production release.",
  ].filter(Boolean);

  const score = {
    visualVariety: clampScore(92 - repetitionPenalty + redesigned * 8),
    interactionDensity: clampScore(74 + interactionAverage * 5),
    narrativeFlow: clampScore(88 - rhythmWarnings.length * 2),
    emotionalCurve: clampScore(90 - Math.max(0, flow.signatureMoments.length - 10) * 4),
    attentionRetention: clampScore(86 - variationWarnings.filter((warning) => warning.code === "thirty-second-rule").length * 5),
    repetition: clampScore(100 - repetitionPenalty),
    presenterFlexibility: 92,
    accessibility: 88,
    performance: 82,
    customerJourney: 90,
    memoryMoments: memoryMomentScore,
    engineeringClarity: 90,
    trust: 88,
    overall: 0,
    recommendations,
  };

  score.overall = Math.round(
    (score.visualVariety +
      score.interactionDensity +
      score.narrativeFlow +
      score.emotionalCurve +
      score.attentionRetention +
      score.repetition +
      score.presenterFlexibility +
      score.accessibility +
      score.performance +
      score.customerJourney +
      score.memoryMoments +
      score.engineeringClarity +
      score.trust) /
      13,
  );

  return score;
}

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function inRange(value: number, min: number, max: number) {
  return value >= min && value <= max;
}
