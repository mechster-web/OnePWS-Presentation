import { enabledChapters } from "../content/chapters";
import { getPrioritizedChapterSequence, type CustomerPathSelection } from "../content/customerPaths";
import { narrationDurationFor } from "../content/narrationDurations";
import { getVoiceover } from "../content/voiceovers";
import {
  navigationConfig,
  navigationJourneys,
  navigationMapGroups,
  optionalBranches,
  sectionBoundaries,
  type NavigationJourney,
} from "../config/navigation";
import type { Chapter, ChapterId, SceneType } from "../data/contentTypes";
import type { PresentationState } from "../state/presentationReducer";

export type NavigationDestination = {
  id: string;
  chapterId: ChapterId;
  journeyId: string;
  parentId?: string;
  title: string;
  shortTitle: string;
  customerLabel: string;
  description: string;
  sceneType?: SceneType;
  navigationType: "main" | "milestone" | "optional" | "branch" | "closing";
  order: number;
  duration: number;
  optional: boolean;
  hidden: boolean;
  presenterOnly: boolean;
  autoplayEnabled: boolean;
  selfGuidedEnabled: boolean;
  completed: boolean;
  explored: boolean;
  available: boolean;
  locked: boolean;
  recommended: boolean;
  memoryMoment: boolean;
  returnDestination?: ChapterId;
  nextDestinations: ChapterId[];
  previousDestination?: ChapterId;
  relatedDestinations: ChapterId[];
  mapPosition: { x: number; y: number };
  mapGroup: string;
  navigationTheme: string;
  thumbnail?: string;
  narrationAvailable: boolean;
  completionState: "viewed" | "explored" | "completed" | "skipped" | "partially-explored" | "available";
};

export type NavigationModel = {
  journey: NavigationJourney;
  route: ChapterId[];
  destinations: NavigationDestination[];
  currentDestination: NavigationDestination;
  previousDestination: NavigationDestination | null;
  nextDestination: NavigationDestination | null;
  routePosition: number;
  progressPercent: number;
  remainingDurationMs: number;
  optionalBranches: ReturnType<typeof branchesForChapter>;
  recommendations: NavigationRecommendation[];
  mapGroups: typeof navigationMapGroups;
  warnings: NavigationWarning[];
};

export type NavigationRecommendation = {
  id: string;
  label: string;
  chapterId: ChapterId;
  reason: string;
  durationMs: number;
};

export type NavigationWarning = {
  code: string;
  message: string;
  chapterIds: ChapterId[];
};

/**
 * Formats the countdown. Narration-timed chapters can leave well under a
 * minute, where "0 min remaining" would read as finished.
 */
/** Clock form for a single narration length, e.g. 0:31. */
export function formatClock(ms: number) {
  const seconds = Math.max(0, Math.round(ms / 1000));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

export function formatRemaining(ms: number) {
  const seconds = Math.max(0, Math.round(ms / 1000));
  if (seconds >= 60) {
    return `${Math.round(seconds / 60)} min remaining`;
  }
  return seconds > 0 ? `${seconds} sec remaining` : "Last slide";
}

export function buildNavigationModel(state: PresentationState): NavigationModel {
  const journey = resolveJourney(state);
  const route = resolveRoute(state, journey);
  const destinations = route.map((chapterId, index) => buildDestination(state, journey, route, chapterId, index));
  const routePosition = Math.max(0, route.findIndex((chapterId) => chapterId === state.chapterId));
  const currentDestination =
    destinations.find((destination) => destination.chapterId === state.chapterId) ??
    buildDestination(state, journey, route, state.chapterId, routePosition);
  const previousDestination = routePosition > 0 ? destinations[routePosition - 1] : null;
  const nextDestination = routePosition >= 0 && routePosition < destinations.length - 1 ? destinations[routePosition + 1] : null;
  const remainingDurationMs = destinations
    .slice(Math.max(routePosition + 1, 0))
    .reduce((total, destination) => total + destination.duration, 0);

  return {
    journey,
    route,
    destinations,
    currentDestination,
    previousDestination,
    nextDestination,
    routePosition,
    progressPercent: destinations.length <= 1 ? 100 : ((routePosition + 1) / destinations.length) * 100,
    remainingDurationMs,
    optionalBranches: branchesForChapter(state.chapterId),
    recommendations: buildRecommendations(state, journey, route),
    mapGroups: navigationMapGroups,
    warnings: validateNavigationModel(journey, route),
  };
}

export function resolveJourney(state: PresentationState) {
  if (state.activeJourneyId) {
    return navigationJourneys.find((journey) => journey.id === state.activeJourneyId) ?? navigationJourneys[0];
  }

  const matching = navigationJourneys.find((journey) => selectionMatches(journey.selection, state.customerPath));
  return matching ?? navigationJourneys.find((journey) => journey.id === navigationConfig.defaultJourneyId) ?? navigationJourneys[0];
}

export function resolveRoute(state: PresentationState, journey = resolveJourney(state)) {
  if (state.temporaryRouteActive && state.temporaryRouteChapterIds.length > 0) {
    return state.temporaryRouteChapterIds.filter(isEnabledChapter);
  }

  const route = journey.sequence.filter(isEnabledChapter);
  const customerPathRoute = getPrioritizedChapterSequence(state.customerPath);
  return route.length > 0 ? route : customerPathRoute;
}

export function chapterForDestination(chapterId: ChapterId) {
  return enabledChapters.find((chapter) => chapter.id === chapterId) ?? enabledChapters[0];
}

export function branchesForChapter(chapterId: ChapterId) {
  return optionalBranches.filter((branch) => branch.parentChapterId === chapterId);
}

export function destinationSearch(query: string, state: PresentationState) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return [];
  }
  const model = buildNavigationModel(state);
  return enabledChapters
    .map((chapter) => {
      const destination = buildDestination(state, model.journey, model.route, chapter.id, chapter.order - 1);
      const searchable = [
        chapter.id,
        chapter.title,
        chapter.eyebrow,
        chapter.headline,
        chapter.supportingMessage,
        chapter.sceneType,
        chapter.chapterPurpose,
        chapter.technicalLayers.join(" "),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return { destination, score: searchable.includes(normalized) ? normalized.length / searchable.length : 0 };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map((result) => result.destination);
}

function buildDestination(
  state: PresentationState,
  journey: NavigationJourney,
  route: ChapterId[],
  chapterId: ChapterId,
  index: number,
): NavigationDestination {
  const chapter = chapterForDestination(chapterId);
  const mapGroup = navigationMapGroups.find((group) => group.chapterIds.includes(chapterId)) ?? navigationMapGroups[0];
  const previousDestination = index > 0 ? route[index - 1] : undefined;
  const nextDestination = index < route.length - 1 ? route[index + 1] : undefined;
  const optional = !route.includes(chapterId) || optionalBranches.some((branch) => branch.destinationChapterId === chapterId);
  const explored = state.exploredSceneIds.includes(chapterId);
  const completed = state.completedInteractionChapterIds.includes(chapterId) || state.visitedChapterIds.includes(chapterId);
  const skipped = state.skippedChapterIds.includes(chapterId);

  return {
    id: `${journey.id}:${chapterId}`,
    chapterId,
    journeyId: journey.id,
    parentId: state.branchStack.at(-1)?.parentChapterId,
    title: chapter.title,
    shortTitle: shortTitle(chapter),
    customerLabel: chapter.eyebrow,
    description: chapter.supportingMessage,
    sceneType: chapter.sceneType,
    navigationType: chapter.chapterPurpose === "closing" ? "closing" : sectionBoundaries.includes(chapterId) ? "milestone" : optional ? "optional" : "main",
    order: index + 1,
    // Recorded narration is what the audience actually sits through, so it wins
    // over the written estimate wherever a chapter has been voiced.
    duration: narrationDurationFor(chapterId) ?? chapter.durationMs,
    optional,
    hidden: chapter.enabled === false,
    presenterOnly: false,
    autoplayEnabled: !chapter.experience?.skippableInAutoplay,
    selfGuidedEnabled: true,
    completed,
    explored,
    available: chapter.enabled !== false,
    locked: false,
    recommended: journey.sequence.includes(chapterId),
    memoryMoment: Boolean(chapter.experience?.memoryMoment),
    returnDestination: state.branchStack.at(-1)?.returnDestination,
    nextDestinations: nextDestination ? [nextDestination] : [],
    previousDestination,
    relatedDestinations: mapGroup.chapterIds.filter((id) => id !== chapterId),
    mapPosition: mapPositionForChapter(mapGroup, chapter, index),
    mapGroup: mapGroup.id,
    navigationTheme: mapGroup.theme,
    thumbnail: chapter.media?.fallbackImageAssetId,
    narrationAvailable: Boolean(getVoiceover("chapter", chapterId)),
    completionState: skipped ? "skipped" : completed ? "completed" : explored ? "explored" : state.visitedChapterIds.includes(chapterId) ? "viewed" : "available",
  };
}

function buildRecommendations(
  state: PresentationState,
  journey: NavigationJourney,
  route: ChapterId[],
): NavigationRecommendation[] {
  const unvisited = route.filter((chapterId) => !state.visitedChapterIds.includes(chapterId));
  const branchRecommendations = branchesForChapter(state.chapterId).map((branch) => ({
    id: branch.id,
    label: branch.title,
    chapterId: branch.destinationChapterId,
    reason: branch.value,
    durationMs: branch.additionalDurationMs,
  }));
  const next = unvisited[0]
    ? [{
        id: `next-${unvisited[0]}`,
        label: "Recommended next",
        chapterId: unvisited[0],
        reason: `Continues the ${journey.name}.`,
        durationMs: chapterForDestination(unvisited[0]).durationMs,
      }]
    : [];
  return [...branchRecommendations, ...next].slice(0, 3);
}

function validateNavigationModel(journey: NavigationJourney, route: ChapterId[]): NavigationWarning[] {
  const warnings: NavigationWarning[] = [];
  const seen = new Set<ChapterId>();
  route.forEach((chapterId) => {
    if (seen.has(chapterId)) {
      warnings.push({ code: "duplicate-route-chapter", message: "Duplicate chapter in route.", chapterIds: [chapterId] });
    }
    seen.add(chapterId);
    if (!isEnabledChapter(chapterId)) {
      warnings.push({ code: "inaccessible-chapter", message: "Route includes a missing or disabled chapter.", chapterIds: [chapterId] });
    }
  });
  optionalBranches.forEach((branch) => {
    if (branch.destinationChapterId === branch.returnDestination) {
      warnings.push({ code: "circular-branch-loop", message: "Optional branch returns to itself.", chapterIds: [branch.destinationChapterId] });
    }
    if (!isEnabledChapter(branch.returnDestination)) {
      warnings.push({ code: "missing-return-destination", message: "Optional branch return destination is missing.", chapterIds: [branch.returnDestination] });
    }
  });
  if (route.length === 0) {
    warnings.push({ code: "broken-journey-route", message: `Journey ${journey.id} has no reachable chapters.`, chapterIds: [] });
  }
  return warnings;
}

function selectionMatches(selection: CustomerPathSelection | undefined, current: CustomerPathSelection) {
  if (!selection) {
    return false;
  }
  return (!selection.role || selection.role === current.role) && (!selection.industry || selection.industry === current.industry);
}

function isEnabledChapter(chapterId: ChapterId) {
  return enabledChapters.some((chapter) => chapter.id === chapterId);
}

function shortTitle(chapter: Chapter) {
  if (chapter.id.startsWith("project-credentials-") || chapter.id === "project-portfolio") {
    return chapter.headline;
  }

  return chapter.title.length > 28 ? chapter.title.replace(/^OnePWS\s+/i, "").slice(0, 26).trim() : chapter.title;
}

function mapPositionForChapter(mapGroup: (typeof navigationMapGroups)[number], chapter: Chapter, index: number) {
  const offset = (index % 5) * 3;
  return { x: Math.min(92, mapGroup.position.x + offset), y: Math.min(88, mapGroup.position.y + (chapter.order % 3) * 4) };
}
