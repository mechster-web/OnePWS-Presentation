import { enabledChapters } from "../content/chapters";
import { presentationConfig } from "../content/config";
import {
  getPrioritizedChapterSequence,
  type CustomerPathSelection,
} from "../content/customerPaths";
import type { ConceptSelection } from "../content/conceptSelector";
import type { FeatureStoryId } from "../content/featureStories";
import type { ChapterId, PresentationMode } from "../data/contentTypes";

export type ActiveOverlay =
  | { type: "chapterMap" }
  | { type: "customerPath" }
  | { type: "technical"; chapterId: ChapterId; layer: string }
  | { type: "audio" }
  | null;

export type PresentationState = {
  mode: PresentationMode;
  chapterId: ChapterId;
  isPlaying: boolean;
  narrationEnabled: boolean;
  captionsEnabled: boolean;
  reducedMotion: boolean;
  activeOverlay: ActiveOverlay;
  lastInteractionAt: number;
  publicSafeMode: boolean;
  customerPath: CustomerPathSelection;
  bookmarks: ChapterId[];
  blankScreenActive: boolean;
  audioUnlocked: boolean;
  exploredFeatureIds: FeatureStoryId[];
  bookmarkedFeatureIds: FeatureStoryId[];
  conceptSelection?: ConceptSelection;
  visitedChapterIds: ChapterId[];
};

export type PresentationAction =
  | { type: "SET_MODE"; mode: PresentationMode }
  | { type: "NEXT_CHAPTER" }
  | { type: "PREVIOUS_CHAPTER" }
  | { type: "GO_TO_CHAPTER"; chapterId: ChapterId }
  | { type: "SET_PLAYING"; isPlaying: boolean }
  | { type: "TOGGLE_NARRATION" }
  | { type: "TOGGLE_CAPTIONS" }
  | { type: "SET_REDUCED_MOTION"; reducedMotion: boolean }
  | { type: "SET_CUSTOMER_PATH"; selection: CustomerPathSelection }
  | { type: "TOGGLE_BOOKMARK"; chapterId: ChapterId }
  | { type: "MARK_FEATURE_EXPLORED"; featureId: FeatureStoryId }
  | { type: "TOGGLE_FEATURE_BOOKMARK"; featureId: FeatureStoryId }
  | { type: "SET_CONCEPT_SELECTION"; selection: ConceptSelection }
  | { type: "SET_BLANK_SCREEN"; active: boolean }
  | { type: "RESET_PRESENTATION" }
  | { type: "START_AUTOPLAY"; restartFromOpening?: boolean }
  | { type: "UNLOCK_AUDIO" }
  | { type: "SET_OVERLAY"; overlay: ActiveOverlay }
  | { type: "MARK_INTERACTION" };

const storedMode = window.sessionStorage.getItem("presentation-mode") as PresentationMode | null;
const storedReducedMotion = window.localStorage.getItem("reduced-motion") === "true";
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const storedCustomerPath = parseStoredCustomerPath();
const storedBookmarks = parseStoredBookmarks();
const storedFeatureBookmarks = parseStoredFeatureBookmarks();
const storedExploredFeatures = parseStoredExploredFeatures();
const storedConceptSelection = parseStoredConceptSelection();
const storedVisitedChapters = parseStoredVisitedChapters();
const initialChapter = parseInitialChapter();

export const initialPresentationState: PresentationState = {
  mode: storedMode ?? presentationConfig.defaultMode,
  chapterId: initialChapter,
  isPlaying: false,
  narrationEnabled: false,
  captionsEnabled: true,
  reducedMotion: storedReducedMotion || prefersReducedMotion,
  activeOverlay: null,
  lastInteractionAt: Date.now(),
  publicSafeMode: presentationConfig.publicSafeModeDefault,
  customerPath: storedCustomerPath,
  bookmarks: storedBookmarks,
  blankScreenActive: false,
  audioUnlocked: false,
  exploredFeatureIds: storedExploredFeatures,
  bookmarkedFeatureIds: storedFeatureBookmarks,
  conceptSelection: storedConceptSelection,
  visitedChapterIds: uniqueChapterIds([initialChapter, ...storedVisitedChapters]),
};

function parseStoredCustomerPath(): CustomerPathSelection {
  try {
    return JSON.parse(window.sessionStorage.getItem("customer-path") ?? "{}") as CustomerPathSelection;
  } catch {
    return {};
  }
}

function parseStoredBookmarks(): ChapterId[] {
  try {
    return JSON.parse(window.sessionStorage.getItem("presentation-bookmarks") ?? "[]") as ChapterId[];
  } catch {
    return [];
  }
}

function parseStoredFeatureBookmarks(): FeatureStoryId[] {
  try {
    return JSON.parse(window.sessionStorage.getItem("feature-bookmarks") ?? "[]") as FeatureStoryId[];
  } catch {
    return [];
  }
}

function parseStoredExploredFeatures(): FeatureStoryId[] {
  try {
    return JSON.parse(window.sessionStorage.getItem("explored-features") ?? "[]") as FeatureStoryId[];
  } catch {
    return [];
  }
}

function parseStoredConceptSelection(): ConceptSelection | undefined {
  try {
    const stored = window.sessionStorage.getItem("concept-selection");
    return stored ? (JSON.parse(stored) as ConceptSelection) : undefined;
  } catch {
    return undefined;
  }
}

function parseStoredVisitedChapters(): ChapterId[] {
  try {
    return JSON.parse(window.sessionStorage.getItem("visited-chapters") ?? "[]") as ChapterId[];
  } catch {
    return [];
  }
}

function uniqueChapterIds(chapterIds: ChapterId[]) {
  return Array.from(new Set(chapterIds));
}

function withVisitedChapter(state: PresentationState, chapterId: ChapterId) {
  const visitedChapterIds = uniqueChapterIds([...state.visitedChapterIds, chapterId]);
  window.sessionStorage.setItem("visited-chapters", JSON.stringify(visitedChapterIds));
  return visitedChapterIds;
}

function parseInitialChapter(): ChapterId {
  const hashChapterId = window.location.hash.replace(/^#/, "");
  if (enabledChapters.some((chapter) => chapter.id === hashChapterId)) {
    return hashChapterId as ChapterId;
  }

  return enabledChapters[0].id;
}

function chapterIndex(chapterId: ChapterId, customerPath: CustomerPathSelection) {
  return getPrioritizedChapterSequence(customerPath).findIndex((id) => id === chapterId);
}

function chapterBySequenceIndex(index: number, customerPath: CustomerPathSelection) {
  const sequence = getPrioritizedChapterSequence(customerPath);
  const nextId = sequence[Math.min(Math.max(index, 0), sequence.length - 1)];
  return enabledChapters.find((chapter) => chapter.id === nextId) ?? enabledChapters[0];
}

export function presentationReducer(
  state: PresentationState,
  action: PresentationAction,
): PresentationState {
  switch (action.type) {
    case "SET_MODE": {
      window.sessionStorage.setItem("presentation-mode", action.mode);
      const chapterId = action.mode === "autoPlay" ? enabledChapters[0].id : state.chapterId;
      return {
        ...state,
        mode: action.mode,
        chapterId,
        isPlaying: action.mode === "autoPlay",
        narrationEnabled: action.mode === "autoPlay" ? true : state.narrationEnabled,
        activeOverlay: action.mode === "autoPlay" ? null : state.activeOverlay,
        blankScreenActive: action.mode === "autoPlay" ? false : state.blankScreenActive,
        lastInteractionAt: Date.now(),
        visitedChapterIds: withVisitedChapter(state, chapterId),
      };
    }
    case "NEXT_CHAPTER": {
      const next = chapterBySequenceIndex(chapterIndex(state.chapterId, state.customerPath) + 1, state.customerPath);
      return {
        ...state,
        chapterId: next.id,
        activeOverlay: null,
        lastInteractionAt: Date.now(),
        visitedChapterIds: withVisitedChapter(state, next.id),
      };
    }
    case "PREVIOUS_CHAPTER": {
      const previous = chapterBySequenceIndex(chapterIndex(state.chapterId, state.customerPath) - 1, state.customerPath);
      return {
        ...state,
        chapterId: previous.id,
        activeOverlay: null,
        lastInteractionAt: Date.now(),
        visitedChapterIds: withVisitedChapter(state, previous.id),
      };
    }
    case "GO_TO_CHAPTER":
      if (!enabledChapters.some((chapter) => chapter.id === action.chapterId)) {
        return { ...state, lastInteractionAt: Date.now() };
      }
      return {
        ...state,
        chapterId: action.chapterId,
        activeOverlay: null,
        lastInteractionAt: Date.now(),
        visitedChapterIds: withVisitedChapter(state, action.chapterId),
      };
    case "SET_PLAYING":
      return { ...state, isPlaying: action.isPlaying, lastInteractionAt: Date.now() };
    case "TOGGLE_NARRATION":
      return { ...state, narrationEnabled: !state.narrationEnabled, lastInteractionAt: Date.now() };
    case "TOGGLE_CAPTIONS":
      return { ...state, captionsEnabled: !state.captionsEnabled, lastInteractionAt: Date.now() };
    case "SET_REDUCED_MOTION":
      window.localStorage.setItem("reduced-motion", String(action.reducedMotion));
      return { ...state, reducedMotion: action.reducedMotion };
    case "SET_CUSTOMER_PATH":
      window.sessionStorage.setItem("customer-path", JSON.stringify(action.selection));
      return {
        ...state,
        customerPath: action.selection,
        lastInteractionAt: Date.now(),
      };
    case "TOGGLE_BOOKMARK": {
      const bookmarks = state.bookmarks.includes(action.chapterId)
        ? state.bookmarks.filter((chapterId) => chapterId !== action.chapterId)
        : [...state.bookmarks, action.chapterId];
      window.sessionStorage.setItem("presentation-bookmarks", JSON.stringify(bookmarks));
      return { ...state, bookmarks, lastInteractionAt: Date.now() };
    }
    case "MARK_FEATURE_EXPLORED": {
      if (state.exploredFeatureIds.includes(action.featureId)) {
        return { ...state, lastInteractionAt: Date.now() };
      }
      const exploredFeatureIds = [...state.exploredFeatureIds, action.featureId];
      window.sessionStorage.setItem("explored-features", JSON.stringify(exploredFeatureIds));
      return { ...state, exploredFeatureIds, lastInteractionAt: Date.now() };
    }
    case "TOGGLE_FEATURE_BOOKMARK": {
      const bookmarkedFeatureIds = state.bookmarkedFeatureIds.includes(action.featureId)
        ? state.bookmarkedFeatureIds.filter((featureId) => featureId !== action.featureId)
        : [...state.bookmarkedFeatureIds, action.featureId];
      window.sessionStorage.setItem("feature-bookmarks", JSON.stringify(bookmarkedFeatureIds));
      return { ...state, bookmarkedFeatureIds, lastInteractionAt: Date.now() };
    }
    case "SET_CONCEPT_SELECTION":
      window.sessionStorage.setItem("concept-selection", JSON.stringify(action.selection));
      return { ...state, conceptSelection: action.selection, lastInteractionAt: Date.now() };
    case "SET_BLANK_SCREEN":
      return { ...state, blankScreenActive: action.active, lastInteractionAt: Date.now() };
    case "RESET_PRESENTATION":
      window.sessionStorage.setItem("visited-chapters", JSON.stringify([enabledChapters[0].id]));
      return {
        ...state,
        chapterId: enabledChapters[0].id,
        isPlaying: false,
        narrationEnabled: false,
        activeOverlay: null,
        blankScreenActive: false,
        lastInteractionAt: Date.now(),
        visitedChapterIds: [enabledChapters[0].id],
      };
    case "START_AUTOPLAY":
      window.sessionStorage.setItem("presentation-mode", "autoPlay");
      return {
        ...state,
        mode: "autoPlay",
        chapterId: action.restartFromOpening === false ? state.chapterId : enabledChapters[0].id,
        isPlaying: true,
        narrationEnabled: true,
        activeOverlay: null,
        blankScreenActive: false,
        lastInteractionAt: Date.now(),
        visitedChapterIds: withVisitedChapter(
          state,
          action.restartFromOpening === false ? state.chapterId : enabledChapters[0].id,
        ),
      };
    case "UNLOCK_AUDIO":
      return { ...state, audioUnlocked: true, lastInteractionAt: Date.now() };
    case "SET_OVERLAY":
      return { ...state, activeOverlay: action.overlay, lastInteractionAt: Date.now() };
    case "MARK_INTERACTION":
      return {
        ...state,
        mode: state.mode === "autoPlay" ? "selfGuided" : state.mode,
        isPlaying: state.mode === "autoPlay" ? false : state.isPlaying,
        audioUnlocked: true,
        lastInteractionAt: Date.now(),
      };
    default:
      return state;
  }
}
