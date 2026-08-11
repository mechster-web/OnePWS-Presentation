import { enabledChapters } from "../content/chapters";
import { certificationReferences } from "../content/credentials";
import { featureStories } from "../content/featureStories";
import { projects } from "../content/projects";
import { getPrioritizedChapterSequence } from "../content/customerPaths";
import type { Chapter, ChapterId } from "../data/contentTypes";
import type { PresentationState } from "../state/presentationReducer";

export type PresenterModel = {
  currentChapter: Chapter;
  nextChapter: Chapter;
  previousChapter: Chapter;
  chapterSequence: Chapter[];
  bookmarkChapters: Chapter[];
  quickProjects: typeof projects;
  quickFeatures: typeof featureStories;
  quickCertifications: typeof certificationReferences;
  technicalLayers: string[];
};

function chapterById(chapterId: ChapterId) {
  return enabledChapters.find((chapter) => chapter.id === chapterId) ?? enabledChapters[0];
}

export function buildPresenterModel(state: PresentationState): PresenterModel {
  const sequence = getPrioritizedChapterSequence(state.customerPath);
  const currentIndex = Math.max(0, sequence.findIndex((chapterId) => chapterId === state.chapterId));
  const chapterSequence = sequence.map(chapterById);
  const currentChapter = chapterById(state.chapterId);

  return {
    currentChapter,
    nextChapter: chapterById(sequence[Math.min(currentIndex + 1, sequence.length - 1)]),
    previousChapter: chapterById(sequence[Math.max(currentIndex - 1, 0)]),
    chapterSequence,
    bookmarkChapters: state.bookmarks.map(chapterById),
    quickProjects: projects,
    quickFeatures: featureStories,
    quickCertifications: certificationReferences,
    technicalLayers: currentChapter.technicalLayers,
  };
}
