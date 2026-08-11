import type {
  BackgroundTreatment,
  ChapterIntensity,
  ChapterMood,
  InteractionType,
  SceneType,
  TransitionFamily,
} from "../data/contentTypes";

export const experienceRedesignFlags = {
  enableNewSceneRenderer: true,
  enableCinematicTransitions: false,
  enableAdvancedHotspots: false,
  enableInteractiveJourney: false,
  enableVoiceGuidance: false,
  enableMemoryMoments: true,
  enableLegacyFallback: true,
  enableDevelopmentOverlay: import.meta.env.DEV,
  forceDevelopmentOverlayInProduction: false,
} as const;

export const availableSceneArchetypes: SceneType[] = [
  "cinematic-opening",
  "chapter-title",
  "immersive-environment",
  "product-hero",
  "product-exploded-view",
  "interactive-hotspot",
  "operator-perspective",
  "problem-solution",
  "before-after",
  "system-connection",
  "data-story",
  "feature-orbit",
  "spatial-journey",
  "process-sequence",
  "comparison",
  "evidence-proof",
  "customer-choice",
  "voice-guided",
  "panoramic-room",
  "cinematic-closing",
];

export const availableInteractionTypes: InteractionType[] = [
  "passive",
  "guided-continue",
  "hotspot-discovery",
  "step-through",
  "branching-choice",
  "simulation-control",
  "media-playback",
  "comparison-scrub",
  "orbit-explore",
];

export const availableTransitionFamilies: TransitionFamily[] = [
  "quiet-fade",
  "spatial-dolly",
  "light-sweep",
  "layer-reveal",
  "match-cut",
  "data-scan",
  "blackout-reset",
  "fade-through-black",
  "fade-through-light",
  "depth-push",
  "lateral-architectural-wipe",
  "vertical-structural-reveal",
  "aperture-open",
  "focus-pull",
  "media-match-cut",
  "data-trace-transition",
  "spatial-pan",
  "object-led-transition",
  "split-panel-transition",
  "blur-resolve",
  "controlled-hard-cut",
];

export const moodOptions: ChapterMood[] = [
  "calm",
  "urgent",
  "technical",
  "assured",
  "human",
  "cinematic",
  "evidence-led",
];

export const intensityOptions: ChapterIntensity[] = ["low", "medium", "high", "peak"];

export const backgroundTreatmentOptions: BackgroundTreatment[] = [
  "legacy",
  "full-bleed-media",
  "architectural-depth",
  "technical-schematic",
  "split-spatial",
  "dark-cinematic",
  "light-gallery",
];

export const presentationRhythmRules = {
  maxSameSceneTypeInARow: 2,
  maxLowInteractionScenesInARow: 3,
  maxHighDensityScenesInARow: 3,
  maxChaptersWithoutMemoryMoment: 6,
  maxSameTransitionInARow: 3,
  maxSameBackgroundTreatmentInARow: 3,
  maxPassiveScenesInARow: 3,
  maxSameVisualIntensityInARow: 4,
} as const;

export const experienceFallbacks = {
  sceneType: "chapter-title" as SceneType,
  interactionType: "guided-continue" as InteractionType,
  transitionIn: "quiet-fade" as TransitionFamily,
  transitionOut: "quiet-fade" as TransitionFamily,
  mood: "assured" as ChapterMood,
  intensity: "medium" as ChapterIntensity,
  backgroundTreatment: "legacy" as BackgroundTreatment,
};

export const legacyCompatibility = {
  renderLegacyChaptersThroughExistingComponent: true,
  preserveExistingChapterIds: true,
  preserveExistingMediaReferences: true,
  preserveExistingNarrationReferences: true,
  preserveExistingAutoplayDurations: true,
  preserveExistingPresenterNotes: true,
} as const;

/*
  Future migration guidance:
  1. Keep source chapter copy in content files and only add experience metadata.
  2. Move one chapter at a time from redesignStatus "mapped" to "redesigned".
  3. Build each scene archetype in src/experience/scenes as its own component.
  4. Avoid adding chapter-specific layout conditionals to SceneRenderer.
  5. Keep enableLegacyFallback true until every customer-facing chapter has a designed archetype.
*/
