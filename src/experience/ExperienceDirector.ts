import { enabledChapters } from "../content/chapters";
import { getPrioritizedChapterSequence, type CustomerPathSelection } from "../content/customerPaths";
import { getVoiceover } from "../content/voiceovers";
import type { Chapter, ChapterId, PresentationMode } from "../data/contentTypes";
import type { PresentationState } from "../state/presentationReducer";

export type InteractionCompletionState = "not-required" | "pending" | "complete";

export type DirectedExperienceState = {
  currentChapter: Chapter;
  previousChapter: Chapter | null;
  nextChapter: Chapter | null;
  selectedCustomerJourney: CustomerPathSelection;
  sequence: ChapterId[];
  transitionDirection: "forward" | "backward" | "direct";
  presentationMode: PresentationMode;
  narrationState: {
    enabled: boolean;
    recommended: boolean;
    assetId?: string;
  };
  captionsEnabled: boolean;
  interactionState: {
    sceneExplored: boolean;
    requiredInteractionsCompleted: boolean;
    completion: InteractionCompletionState;
    interactionType: Chapter["interactionType"];
  };
  optionalBranching: {
    destinations: ChapterId[];
    suggestedNextDestination: ChapterId | null;
    returnToMainJourneyDestination: ChapterId | null;
  };
};

export function createDirectedExperienceState(state: PresentationState): DirectedExperienceState {
  const sequence = getPrioritizedChapterSequence(state.customerPath);
  const currentIndex = Math.max(0, sequence.findIndex((chapterId) => chapterId === state.chapterId));
  const currentChapter = chapterById(sequence[currentIndex]) ?? enabledChapters[0];
  const previousChapter = currentIndex > 0 ? chapterById(sequence[currentIndex - 1]) : null;
  const nextChapter = currentIndex < sequence.length - 1 ? chapterById(sequence[currentIndex + 1]) : null;
  const sceneExplored = state.exploredSceneIds.includes(currentChapter.id);
  const requiredInteractionComplete = state.completedInteractionChapterIds.includes(currentChapter.id);
  const requiresInteraction = Boolean(currentChapter.experience?.userInputExpected);
  const chapterVoiceover = getVoiceover("chapter", currentChapter.id);

  return {
    currentChapter,
    previousChapter,
    nextChapter,
    selectedCustomerJourney: state.customerPath,
    sequence,
    transitionDirection: state.transitionDirection,
    presentationMode: state.mode,
    narrationState: {
      enabled: state.narrationEnabled,
      recommended: Boolean(currentChapter.narration?.recommended),
      assetId: currentChapter.narration?.assetId ?? chapterVoiceover?.id,
    },
    captionsEnabled: state.captionsEnabled,
    interactionState: {
      sceneExplored,
      requiredInteractionsCompleted: !requiresInteraction || requiredInteractionComplete || sceneExplored,
      completion: !requiresInteraction ? "not-required" : requiredInteractionComplete || sceneExplored ? "complete" : "pending",
      interactionType: currentChapter.interactionType,
    },
    optionalBranching: {
      destinations: currentChapter.optionalNextDestinations ?? [],
      suggestedNextDestination: (currentChapter.optionalNextDestinations ?? [nextChapter?.id]).find(Boolean) ?? null,
      returnToMainJourneyDestination: nextChapter?.id ?? null,
    },
  };
}

function chapterById(chapterId?: ChapterId) {
  return enabledChapters.find((chapter) => chapter.id === chapterId) ?? null;
}
