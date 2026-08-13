import { enabledChapters } from "../content/chapters";
import { presentationConfig } from "../content/config";
import {
  getPrioritizedChapterSequence,
  type CustomerPathSelection,
} from "../content/customerPaths";
import { navigationConfig, navigationJourneys, optionalBranches } from "../config/navigation";
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
  transitionDirection: "forward" | "backward" | "direct";
  exploredSceneIds: ChapterId[];
  completedInteractionChapterIds: ChapterId[];
  developmentOverlayActive: boolean;
  activeJourneyId?: string;
  branchStack: Array<{ parentChapterId: ChapterId; returnDestination: ChapterId; branchId: string }>;
  skippedChapterIds: ChapterId[];
  temporaryRouteChapterIds: ChapterId[];
  temporaryRouteActive: boolean;
  selfGuidedHintsSeen: string[];
  navigationControlsRevealed: boolean;
};

export type PresentationAction =
  | { type: "SYNC_REMOTE_STATE"; state: PresentationState }
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
  | { type: "MARK_INTERACTION" }
  | { type: "MARK_SCENE_EXPLORED"; chapterId?: ChapterId }
  | { type: "MARK_REQUIRED_INTERACTION_COMPLETE"; chapterId?: ChapterId }
  | { type: "SET_DEVELOPMENT_OVERLAY"; active: boolean }
  | { type: "SET_ACTIVE_JOURNEY"; journeyId?: string; startAtOpeningDestination?: boolean }
  | { type: "OPEN_OPTIONAL_BRANCH"; branchId: string }
  | { type: "RETURN_TO_JOURNEY" }
  | { type: "MARK_CHAPTER_SKIPPED"; chapterId?: ChapterId }
  | { type: "ADD_TEMPORARY_ROUTE_CHAPTER"; chapterId: ChapterId }
  | { type: "REMOVE_TEMPORARY_ROUTE_CHAPTER"; chapterId: ChapterId }
  | { type: "MOVE_TEMPORARY_ROUTE_CHAPTER"; chapterId: ChapterId; direction: "up" | "down" }
  | { type: "START_TEMPORARY_ROUTE" }
  | { type: "RESET_TEMPORARY_ROUTE" }
  | { type: "MARK_SELF_GUIDED_HINT"; hintId: string }
  | { type: "SET_NAVIGATION_CONTROLS_REVEALED"; revealed: boolean };

const storedMode = window.sessionStorage.getItem("presentation-mode") as PresentationMode | null;
const restoredMode = storedMode === "autoPlay" ? null : storedMode;
const storedReducedMotion = window.localStorage.getItem("reduced-motion") === "true";
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const storedCustomerPath = parseStoredCustomerPath();
const storedBookmarks = parseStoredBookmarks();
const storedFeatureBookmarks = parseStoredFeatureBookmarks();
const storedExploredFeatures = parseStoredExploredFeatures();
const storedConceptSelection = parseStoredConceptSelection();
const storedVisitedChapters = parseStoredVisitedChapters();
const storedExploredScenes = parseStoredExploredScenes();
const storedCompletedInteractions = parseStoredCompletedInteractions();
const storedSkippedChapters = parseStoredSkippedChapters();
const storedTemporaryRoute = parseStoredTemporaryRoute();
const storedActiveJourneyId = window.sessionStorage.getItem("active-journey-id") ?? undefined;
const storedSelfGuidedHints = parseStoredSelfGuidedHints();
const initialChapter = parseInitialChapter();

export const initialPresentationState: PresentationState = {
  mode: restoredMode ?? presentationConfig.defaultMode,
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
  transitionDirection: "direct",
  exploredSceneIds: uniqueChapterIds([initialChapter, ...storedExploredScenes]),
  completedInteractionChapterIds: storedCompletedInteractions,
  developmentOverlayActive: false,
  activeJourneyId: storedActiveJourneyId,
  branchStack: [],
  skippedChapterIds: storedSkippedChapters,
  temporaryRouteChapterIds: storedTemporaryRoute,
  temporaryRouteActive: false,
  selfGuidedHintsSeen: storedSelfGuidedHints,
  navigationControlsRevealed: false,
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

function parseStoredExploredScenes(): ChapterId[] {
  try {
    return JSON.parse(window.sessionStorage.getItem("explored-scenes") ?? "[]") as ChapterId[];
  } catch {
    return [];
  }
}

function parseStoredCompletedInteractions(): ChapterId[] {
  try {
    return JSON.parse(window.sessionStorage.getItem("completed-interactions") ?? "[]") as ChapterId[];
  } catch {
    return [];
  }
}

function parseStoredSkippedChapters(): ChapterId[] {
  try {
    return JSON.parse(window.sessionStorage.getItem("skipped-chapters") ?? "[]") as ChapterId[];
  } catch {
    return [];
  }
}

function parseStoredTemporaryRoute(): ChapterId[] {
  try {
    return JSON.parse(window.localStorage.getItem("presenter-temporary-route") ?? "[]") as ChapterId[];
  } catch {
    return [];
  }
}

function parseStoredSelfGuidedHints(): string[] {
  try {
    return JSON.parse(window.sessionStorage.getItem("self-guided-hints") ?? "[]") as string[];
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

function withStoredChapterId(key: string, current: ChapterId[], chapterId: ChapterId) {
  const chapterIds = uniqueChapterIds([...current, chapterId]);
  window.sessionStorage.setItem(key, JSON.stringify(chapterIds));
  return chapterIds;
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

function routeForState(state: PresentationState) {
  if (state.temporaryRouteActive && state.temporaryRouteChapterIds.length > 0) {
    return state.temporaryRouteChapterIds.filter((chapterId) => enabledChapters.some((chapter) => chapter.id === chapterId));
  }
  const activeJourney = navigationJourneys.find((journey) => journey.id === state.activeJourneyId);
  if (activeJourney) {
    return activeJourney.sequence.filter((chapterId) => enabledChapters.some((chapter) => chapter.id === chapterId));
  }
  const matchingJourney = navigationJourneys.find((journey) => selectionMatches(journey.selection, state.customerPath));
  const defaultJourney = navigationJourneys.find((journey) => journey.id === navigationConfig.defaultJourneyId);
  const resolvedJourney = matchingJourney ?? defaultJourney;
  const route = resolvedJourney?.sequence.filter((chapterId) => enabledChapters.some((chapter) => chapter.id === chapterId)) ?? [];
  return route.length > 0 ? route : getPrioritizedChapterSequence(state.customerPath);
}

function selectionMatches(selection: CustomerPathSelection | undefined, current: CustomerPathSelection) {
  if (!selection) {
    return false;
  }
  return (!selection.role || selection.role === current.role) && (!selection.industry || selection.industry === current.industry);
}

function chapterByRouteIndex(state: PresentationState, index: number) {
  const sequence = routeForState(state);
  const nextId = sequence[Math.min(Math.max(index, 0), sequence.length - 1)];
  return enabledChapters.find((chapter) => chapter.id === nextId) ?? enabledChapters[0];
}

function routeIndex(state: PresentationState) {
  return routeForState(state).findIndex((id) => id === state.chapterId);
}

export function presentationReducer(
  state: PresentationState,
  action: PresentationAction,
): PresentationState {
  switch (action.type) {
    case "SYNC_REMOTE_STATE":
      return {
        ...action.state,
        developmentOverlayActive: false,
        lastInteractionAt: Date.now(),
      };
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
        transitionDirection: chapterIndex(chapterId, state.customerPath) >= chapterIndex(state.chapterId, state.customerPath)
          ? "forward"
          : "backward",
        lastInteractionAt: Date.now(),
        visitedChapterIds: withVisitedChapter(state, chapterId),
        exploredSceneIds: withStoredChapterId("explored-scenes", state.exploredSceneIds, chapterId),
      };
    }
    case "NEXT_CHAPTER": {
      const next = chapterByRouteIndex(state, routeIndex(state) + 1);
      return {
        ...state,
        chapterId: next.id,
        activeOverlay: null,
        transitionDirection: "forward",
        lastInteractionAt: Date.now(),
        visitedChapterIds: withVisitedChapter(state, next.id),
        exploredSceneIds: withStoredChapterId("explored-scenes", state.exploredSceneIds, next.id),
      };
    }
    case "PREVIOUS_CHAPTER": {
      const previous = chapterByRouteIndex(state, routeIndex(state) - 1);
      return {
        ...state,
        chapterId: previous.id,
        activeOverlay: null,
        transitionDirection: "backward",
        lastInteractionAt: Date.now(),
        visitedChapterIds: withVisitedChapter(state, previous.id),
        exploredSceneIds: withStoredChapterId("explored-scenes", state.exploredSceneIds, previous.id),
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
        transitionDirection: "direct",
        lastInteractionAt: Date.now(),
        visitedChapterIds: withVisitedChapter(state, action.chapterId),
        exploredSceneIds: withStoredChapterId("explored-scenes", state.exploredSceneIds, action.chapterId),
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
        activeJourneyId: undefined,
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
        transitionDirection: "direct",
        exploredSceneIds: [enabledChapters[0].id],
        completedInteractionChapterIds: [],
        branchStack: [],
        skippedChapterIds: [],
        temporaryRouteActive: false,
        navigationControlsRevealed: false,
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
        transitionDirection: "direct",
        lastInteractionAt: Date.now(),
        visitedChapterIds: withVisitedChapter(
          state,
          action.restartFromOpening === false ? state.chapterId : enabledChapters[0].id,
        ),
        exploredSceneIds: withStoredChapterId(
          "explored-scenes",
          state.exploredSceneIds,
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
    case "MARK_SCENE_EXPLORED": {
      const chapterId = action.chapterId ?? state.chapterId;
      return {
        ...state,
        exploredSceneIds: withStoredChapterId("explored-scenes", state.exploredSceneIds, chapterId),
        lastInteractionAt: Date.now(),
      };
    }
    case "MARK_REQUIRED_INTERACTION_COMPLETE": {
      const chapterId = action.chapterId ?? state.chapterId;
      return {
        ...state,
        completedInteractionChapterIds: withStoredChapterId(
          "completed-interactions",
          state.completedInteractionChapterIds,
          chapterId,
        ),
        exploredSceneIds: withStoredChapterId("explored-scenes", state.exploredSceneIds, chapterId),
        lastInteractionAt: Date.now(),
      };
    }
    case "SET_DEVELOPMENT_OVERLAY":
      return { ...state, developmentOverlayActive: action.active, lastInteractionAt: Date.now() };
    case "SET_ACTIVE_JOURNEY": {
      const journey = navigationJourneys.find((item) => item.id === action.journeyId);
      if (action.journeyId) {
        window.sessionStorage.setItem("active-journey-id", action.journeyId);
      } else {
        window.sessionStorage.removeItem("active-journey-id");
      }
      const chapterId = action.startAtOpeningDestination && journey ? journey.openingDestination : state.chapterId;
      return {
        ...state,
        activeJourneyId: action.journeyId,
        customerPath: journey?.selection ? { ...state.customerPath, ...journey.selection } : state.customerPath,
        chapterId,
        activeOverlay: null,
        transitionDirection: "direct",
        visitedChapterIds: withVisitedChapter(state, chapterId),
        exploredSceneIds: withStoredChapterId("explored-scenes", state.exploredSceneIds, chapterId),
        lastInteractionAt: Date.now(),
      };
    }
    case "OPEN_OPTIONAL_BRANCH": {
      const branch = optionalBranches.find((item) => item.id === action.branchId);
      if (!branch) {
        return { ...state, lastInteractionAt: Date.now() };
      }
      return {
        ...state,
        chapterId: branch.destinationChapterId,
        branchStack: [...state.branchStack, {
          parentChapterId: state.chapterId,
          returnDestination: branch.returnDestination,
          branchId: branch.id,
        }],
        activeOverlay: null,
        transitionDirection: "direct",
        visitedChapterIds: withVisitedChapter(state, branch.destinationChapterId),
        exploredSceneIds: withStoredChapterId("explored-scenes", state.exploredSceneIds, branch.destinationChapterId),
        lastInteractionAt: Date.now(),
      };
    }
    case "RETURN_TO_JOURNEY": {
      const branch = state.branchStack.at(-1);
      if (!branch) {
        return { ...state, lastInteractionAt: Date.now() };
      }
      const branchStack = state.branchStack.slice(0, -1);
      return {
        ...state,
        chapterId: branch.returnDestination,
        branchStack,
        activeOverlay: null,
        transitionDirection: "backward",
        visitedChapterIds: withVisitedChapter(state, branch.returnDestination),
        exploredSceneIds: withStoredChapterId("explored-scenes", state.exploredSceneIds, branch.returnDestination),
        lastInteractionAt: Date.now(),
      };
    }
    case "MARK_CHAPTER_SKIPPED": {
      const chapterId = action.chapterId ?? state.chapterId;
      const skippedChapterIds = withStoredChapterId("skipped-chapters", state.skippedChapterIds, chapterId);
      return { ...state, skippedChapterIds, lastInteractionAt: Date.now() };
    }
    case "ADD_TEMPORARY_ROUTE_CHAPTER": {
      const temporaryRouteChapterIds = uniqueChapterIds([...state.temporaryRouteChapterIds, action.chapterId]);
      window.localStorage.setItem("presenter-temporary-route", JSON.stringify(temporaryRouteChapterIds));
      return { ...state, temporaryRouteChapterIds, lastInteractionAt: Date.now() };
    }
    case "REMOVE_TEMPORARY_ROUTE_CHAPTER": {
      const temporaryRouteChapterIds = state.temporaryRouteChapterIds.filter((chapterId) => chapterId !== action.chapterId);
      window.localStorage.setItem("presenter-temporary-route", JSON.stringify(temporaryRouteChapterIds));
      return { ...state, temporaryRouteChapterIds, lastInteractionAt: Date.now() };
    }
    case "MOVE_TEMPORARY_ROUTE_CHAPTER": {
      const index = state.temporaryRouteChapterIds.indexOf(action.chapterId);
      if (index < 0) {
        return state;
      }
      const nextIndex = action.direction === "up" ? Math.max(0, index - 1) : Math.min(state.temporaryRouteChapterIds.length - 1, index + 1);
      const temporaryRouteChapterIds = [...state.temporaryRouteChapterIds];
      temporaryRouteChapterIds.splice(index, 1);
      temporaryRouteChapterIds.splice(nextIndex, 0, action.chapterId);
      window.localStorage.setItem("presenter-temporary-route", JSON.stringify(temporaryRouteChapterIds));
      return { ...state, temporaryRouteChapterIds, lastInteractionAt: Date.now() };
    }
    case "START_TEMPORARY_ROUTE": {
      const chapterId = state.temporaryRouteChapterIds[0] ?? state.chapterId;
      return {
        ...state,
        temporaryRouteActive: true,
        chapterId,
        activeOverlay: null,
        transitionDirection: "direct",
        visitedChapterIds: withVisitedChapter(state, chapterId),
        exploredSceneIds: withStoredChapterId("explored-scenes", state.exploredSceneIds, chapterId),
        lastInteractionAt: Date.now(),
      };
    }
    case "RESET_TEMPORARY_ROUTE":
      window.localStorage.removeItem("presenter-temporary-route");
      return { ...state, temporaryRouteChapterIds: [], temporaryRouteActive: false, lastInteractionAt: Date.now() };
    case "MARK_SELF_GUIDED_HINT": {
      const selfGuidedHintsSeen = Array.from(new Set([...state.selfGuidedHintsSeen, action.hintId]));
      window.sessionStorage.setItem("self-guided-hints", JSON.stringify(selfGuidedHintsSeen));
      return { ...state, selfGuidedHintsSeen, lastInteractionAt: Date.now() };
    }
    case "SET_NAVIGATION_CONTROLS_REVEALED":
      return { ...state, navigationControlsRevealed: action.revealed, lastInteractionAt: Date.now() };
    default:
      return state;
  }
}
