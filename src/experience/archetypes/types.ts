import type {
  Chapter,
  InteractionType,
  NavigationVisibility,
  PerformanceMode,
  PresentationMode,
  SceneThemeVariant,
  SceneType,
  TransitionFamily,
} from "../../data/contentTypes";
import type { MotionFamily } from "../../design-system/motionLanguage";

export type ArchetypeContentType =
  | "opening"
  | "section"
  | "environment"
  | "product"
  | "system"
  | "operator"
  | "process"
  | "proof"
  | "choice"
  | "closing";

export type ArchetypeMediaType = "image" | "video" | "audio" | "caption" | "none" | "derived";

export type ArchetypeVariant = {
  id: string;
  name: string;
  description: string;
  recommendedTheme?: SceneThemeVariant;
};

export type ArchetypeValidationRule = {
  id: string;
  severity: "info" | "warning" | "error";
  description: string;
};

export type ArchetypeBehaviour = {
  presenter: string[];
  autoplay: string[];
  reducedMotion: string[];
  responsive: string[];
  performance: Record<PerformanceMode, string[]>;
};

export type SceneArchetype = {
  id: SceneType;
  name: string;
  purpose: string;
  supportedContentTypes: ArchetypeContentType[];
  supportedMediaTypes: ArchetypeMediaType[];
  supportedInteractionTypes: InteractionType[];
  defaultTheme: SceneThemeVariant;
  supportedThemes: SceneThemeVariant[];
  defaultMotionFamily: MotionFamily;
  supportedTransitions: TransitionFamily[];
  defaultNavigationState: NavigationVisibility;
  informationDensityRange: [number, number];
  interactionLevelRange: [number, number];
  recommendedDurationRange: [number, number];
  suitableAudiences: string[];
  suitablePresentationModes: PresentationMode[];
  supportsNarration: boolean;
  supportsHotspots: boolean;
  supportsAutoplay: boolean;
  supportsReducedMotion: boolean;
  supportsTouch: boolean;
  supportsKeyboard: boolean;
  supportsMemoryMoment: boolean;
  requiredFields: Array<keyof Chapter>;
  optionalFields: Array<keyof Chapter>;
  fallbackBehaviour: string;
  validationRules: ArchetypeValidationRule[];
  variants: ArchetypeVariant[];
  behaviour: ArchetypeBehaviour;
  differentiation: {
    primaryLayout: string;
    textPosition: string;
    mediaPosition: string;
    revealPattern: string;
    backgroundTreatment: string;
  };
};

export type ArchetypeValidationWarning = {
  archetypeId: SceneType;
  chapterId?: string;
  ruleId: string;
  severity: ArchetypeValidationRule["severity"];
  message: string;
};
