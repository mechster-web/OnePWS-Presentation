import { enabledChapters } from "../../content/chapters";
import type { Chapter, ChapterId } from "../../data/contentTypes";
import {
  defaultMovementDesign,
  movementDesignByChapter,
  signatureMomentChapterIds,
  type ChapterMovementDesign,
} from "./finalExperienceConfig";

export type ExperienceMovement = {
  chapterId: ChapterId;
  title: string;
  order: number;
  design: ChapterMovementDesign;
  signatureMoment: boolean;
  supportingScene: boolean;
  meaningfulEventEveryMs: number;
  connectionToNext: string;
  pauseDesign: {
    silence: boolean;
    applausePause: boolean;
    discussionPause: boolean;
    presenterInterruptible: boolean;
    resumeCue: string;
  };
};

export type ExperienceFlow = {
  movements: ExperienceMovement[];
  emotionalCurve: Array<{ chapterId: ChapterId; goal: ChapterMovementDesign["emotionalGoal"]; energy: number }>;
  signatureMoments: ExperienceMovement[];
  finalSynthesisChapterId: ChapterId;
  futureChapterId: ChapterId;
};

export function buildExperienceFlow(chapters: Chapter[] = enabledChapters): ExperienceFlow {
  const movements = chapters.map((chapter, index) => buildMovement(chapter, chapters[index + 1]));

  return {
    movements,
    emotionalCurve: movements.map((movement) => ({
      chapterId: movement.chapterId,
      goal: movement.design.emotionalGoal,
      energy: movement.design.attentionLevel,
    })),
    signatureMoments: movements.filter((movement) => movement.signatureMoment),
    finalSynthesisChapterId: "complete-ecosystem",
    futureChapterId: "logo-finale",
  };
}

export function movementForChapter(chapterId: ChapterId, chapters: Chapter[] = enabledChapters) {
  return buildExperienceFlow(chapters).movements.find((movement) => movement.chapterId === chapterId) ?? null;
}

function buildMovement(chapter: Chapter, nextChapter?: Chapter): ExperienceMovement {
  const design = {
    ...defaultMovementDesign,
    ...movementDesignByChapter[chapter.id],
  };
  const interactionDensity = chapter.experience?.interactionLevel ?? design.interactionDensity;
  const meaningfulEventEveryMs = Math.min(
    30_000,
    Math.max(8_000, Math.round(chapter.durationMs / Math.max(1, chapter.beats.length + interactionDensity))),
  );

  return {
    chapterId: chapter.id,
    title: chapter.title,
    order: chapter.order,
    design,
    signatureMoment: signatureMomentChapterIds.includes(chapter.id),
    supportingScene: !signatureMomentChapterIds.includes(chapter.id),
    meaningfulEventEveryMs,
    connectionToNext: nextChapter ? connectMotifs(design.connectionMotif, nextChapter.id) : "settle into final memory",
    pauseDesign: {
      silence: design.sound === "silence",
      applausePause: signatureMomentChapterIds.includes(chapter.id) && ["final-memory", "excitement", "trust"].includes(design.emotionalGoal),
      discussionPause: chapter.chapterPurpose === "proof" || chapter.experience?.memoryMoment === true,
      presenterInterruptible: true,
      resumeCue: nextChapter ? `Resume through ${movementDesignByChapter[nextChapter.id]?.connectionMotif ?? "story continuity"}` : "Resume to close",
    },
  };
}

function connectMotifs(currentMotif: string, nextChapterId: ChapterId) {
  const nextMotif = movementDesignByChapter[nextChapterId]?.connectionMotif ?? "story continuity";
  return `${currentMotif} becomes ${nextMotif}`;
}
