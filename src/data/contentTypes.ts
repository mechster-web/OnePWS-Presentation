export type PresentationMode = "presenter" | "selfGuided" | "autoPlay";

export type ChapterId = string;

export type MotionPreset = "fade" | "scan" | "layerReveal" | "projectWall" | "calmDolly";

export type SceneType =
  | "cinematic-opening"
  | "chapter-title"
  | "immersive-environment"
  | "product-hero"
  | "product-exploded-view"
  | "interactive-hotspot"
  | "operator-perspective"
  | "problem-solution"
  | "before-after"
  | "system-connection"
  | "data-story"
  | "feature-orbit"
  | "spatial-journey"
  | "process-sequence"
  | "comparison"
  | "evidence-proof"
  | "customer-choice"
  | "voice-guided"
  | "panoramic-room"
  | "cinematic-closing";

export type InteractionType =
  | "passive"
  | "guided-continue"
  | "hotspot-discovery"
  | "step-through"
  | "branching-choice"
  | "simulation-control"
  | "media-playback"
  | "comparison-scrub"
  | "orbit-explore";

export type TransitionFamily =
  | "quiet-fade"
  | "spatial-dolly"
  | "light-sweep"
  | "layer-reveal"
  | "match-cut"
  | "data-scan"
  | "blackout-reset"
  | "fade-through-black"
  | "fade-through-light"
  | "depth-push"
  | "lateral-architectural-wipe"
  | "vertical-structural-reveal"
  | "aperture-open"
  | "focus-pull"
  | "media-match-cut"
  | "data-trace-transition"
  | "spatial-pan"
  | "object-led-transition"
  | "split-panel-transition"
  | "blur-resolve"
  | "controlled-hard-cut";

export type SceneThemeVariant =
  | "cinematic-dark"
  | "architectural-light"
  | "operational-dark"
  | "product-light"
  | "data-dark"
  | "immersive-neutral"
  | "alert-state"
  | "calm-state";

export type PerformanceMode = "premium" | "balanced" | "reduced";

export type NavigationVisibility = "visible" | "minimal" | "hidden-cinematic";

export type ChapterMood =
  | "calm"
  | "urgent"
  | "technical"
  | "assured"
  | "human"
  | "cinematic"
  | "evidence-led";

export type ChapterIntensity = "low" | "medium" | "high" | "peak";

export type BackgroundTreatment =
  | "legacy"
  | "full-bleed-media"
  | "architectural-depth"
  | "technical-schematic"
  | "split-spatial"
  | "dark-cinematic"
  | "light-gallery";

export type ChapterPurpose =
  | "opening"
  | "context"
  | "positioning"
  | "problem"
  | "solution"
  | "product"
  | "methodology"
  | "proof"
  | "decision"
  | "closing";

export type ChapterExperienceMetadata = {
  energyLevel: 1 | 2 | 3 | 4 | 5;
  informationDensity: 1 | 2 | 3 | 4 | 5;
  interactionLevel: 0 | 1 | 2 | 3 | 4 | 5;
  visualIntensity: 1 | 2 | 3 | 4 | 5;
  recommendedDurationMs: number;
  narrationRecommended: boolean;
  userInputExpected: boolean;
  memoryMoment: boolean;
  skippableInAutoplay: boolean;
  optionalInPresenterMode: boolean;
};

export type ChapterBeat = {
  id: string;
  label: string;
  supportingLabel?: string;
  startsAtMs: number;
  durationMs: number;
  motionPreset: MotionPreset;
};

export type Chapter = {
  id: ChapterId;
  enabled?: boolean;
  order: number;
  title: string;
  eyebrow: string;
  headline: string;
  supportingMessage: string;
  subtitle?: string;
  narrative?: string;
  supportingCopy?: string;
  sceneType?: SceneType;
  mood?: ChapterMood;
  intensity?: ChapterIntensity;
  chapterPurpose?: ChapterPurpose;
  audience?: string[];
  interactionType?: InteractionType;
  transitionIn?: TransitionFamily;
  transitionOut?: TransitionFamily;
  backgroundTreatment?: BackgroundTreatment;
  themeVariant?: SceneThemeVariant;
  navigationVisibility?: NavigationVisibility;
  durationMs: number;
  visualNote: string;
  presenterTalkingPoint: string;
  technicalLayers: string[];
  beats: ChapterBeat[];
  media?: {
    backgroundVideoAssetId?: string;
    fallbackImageAssetId?: string;
    narrationAssetId?: string;
  };
  narration?: {
    recommended?: boolean;
    assetId?: string;
  };
  hotspots?: Array<{
    id: string;
    label: string;
    description?: string;
    mediaAssetId?: string;
  }>;
  callToAction?: {
    label: string;
    destinationChapterId?: ChapterId;
  };
  duration?: number;
  presenterNotes?: string;
  optionalNextDestinations?: ChapterId[];
  experience?: ChapterExperienceMetadata;
  redesignStatus?: "legacy" | "mapped" | "redesigned";
};

export type Asset = {
  id: string;
  type: "image" | "video" | "audio" | "caption" | "logo";
  src?: string;
  alt?: string;
  language?: string;
  publicSafe: boolean;
};
