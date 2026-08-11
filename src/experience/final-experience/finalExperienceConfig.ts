import type { ChapterId } from "../../data/contentTypes";

export type EmotionalGoal =
  | "curiosity"
  | "discovery"
  | "understanding"
  | "excitement"
  | "confidence"
  | "trust"
  | "inspiration"
  | "vision"
  | "final-memory";

export type CameraGrammar =
  | "reveal"
  | "orbit"
  | "approach"
  | "focus"
  | "inspect"
  | "expand"
  | "transform"
  | "retreat"
  | "observe"
  | "celebrate";

export type SoundCue =
  | "silence"
  | "room-ambience"
  | "soft-transition"
  | "mechanical-precision"
  | "material-movement"
  | "confirmation"
  | "focus"
  | "environment-activation"
  | "ai-acknowledgement";

export type LightCue =
  | "soft-glow"
  | "focus-highlight"
  | "environment-activation"
  | "spot-reveal"
  | "material-reflection"
  | "operator-focus"
  | "video-wall-emphasis"
  | "settle-calm";

export type ChapterMovementDesign = {
  emotionalGoal: EmotionalGoal;
  attentionLevel: 1 | 2 | 3 | 4 | 5;
  interactionDensity: 0 | 1 | 2 | 3 | 4 | 5;
  visualDensity: 1 | 2 | 3 | 4 | 5;
  narrationDensity: 0 | 1 | 2 | 3 | 4 | 5;
  transitionSpeed: "instant" | "fast" | "normal" | "deliberate" | "cinematic";
  camera: CameraGrammar;
  sound: SoundCue;
  light: LightCue;
  microSurprise?: string;
  connectionMotif: string;
};

export const signatureMomentChapterIds: ChapterId[] = [
  "opening-cover",
  "operator-challenges",
  "human-centred-philosophy",
  "console-portfolio",
  "complete-ecosystem",
  "incident-response",
  "project-portfolio",
  "manufacturing-quality",
  "next-steps-closing",
  "logo-finale",
];

export const finalExperienceModes = {
  ceo: {
    journeyId: "ceo-5",
    label: "CEO mode",
    durationLabel: "5 min",
    intent: "Big ideas, proof, vision and next action.",
  },
  technical: {
    journeyId: "technical-deep",
    label: "Technical mode",
    durationLabel: "Deep dive",
    intent: "Expose engineering, evidence sources and technical layers on demand.",
  },
  consultant: {
    journeyId: "consultant-workshop",
    label: "Consultant mode",
    durationLabel: "Workshop",
    intent: "Ask customer questions, branch accordingly and skip irrelevant sections.",
  },
};

export const defaultMovementDesign: ChapterMovementDesign = {
  emotionalGoal: "understanding",
  attentionLevel: 3,
  interactionDensity: 2,
  visualDensity: 3,
  narrationDensity: 2,
  transitionSpeed: "normal",
  camera: "observe",
  sound: "room-ambience",
  light: "soft-glow",
  connectionMotif: "story continuity",
};

export const movementDesignByChapter: Record<ChapterId, Partial<ChapterMovementDesign>> = {
  "opening-cover": {
    emotionalGoal: "curiosity",
    attentionLevel: 5,
    interactionDensity: 2,
    visualDensity: 5,
    narrationDensity: 2,
    transitionSpeed: "cinematic",
    camera: "reveal",
    sound: "silence",
    light: "spot-reveal",
    microSurprise: "The room reveals itself as if it is being understood.",
    connectionMotif: "architectural line",
  },
  "mission-critical-environments": {
    emotionalGoal: "discovery",
    camera: "approach",
    sound: "room-ambience",
    light: "focus-highlight",
    connectionMotif: "operator awareness",
  },
  "operator-challenges": {
    emotionalGoal: "understanding",
    attentionLevel: 5,
    visualDensity: 4,
    interactionDensity: 4,
    camera: "focus",
    sound: "focus",
    light: "operator-focus",
    microSurprise: "Signals compete until the operator perspective clarifies the pressure.",
    connectionMotif: "human pressure",
  },
  "human-centred-philosophy": {
    emotionalGoal: "discovery",
    attentionLevel: 4,
    camera: "transform",
    sound: "soft-transition",
    light: "environment-activation",
    microSurprise: "The room begins to align around the person.",
    connectionMotif: "operator geometry",
  },
  "console-portfolio": {
    emotionalGoal: "excitement",
    attentionLevel: 4,
    interactionDensity: 4,
    visualDensity: 4,
    camera: "orbit",
    sound: "mechanical-precision",
    light: "material-reflection",
    microSurprise: "Product detail appears as engineered movement rather than feature listing.",
    connectionMotif: "desk edge",
  },
  "complete-ecosystem": {
    emotionalGoal: "excitement",
    attentionLevel: 5,
    interactionDensity: 4,
    visualDensity: 5,
    narrationDensity: 2,
    transitionSpeed: "cinematic",
    camera: "expand",
    sound: "environment-activation",
    light: "environment-activation",
    microSurprise: "The control room builds as one operating environment.",
    connectionMotif: "room geometry",
  },
  "intelligent-features": {
    emotionalGoal: "discovery",
    camera: "inspect",
    sound: "ai-acknowledgement",
    light: "video-wall-emphasis",
    microSurprise: "Intelligence appears beside the object it supports, not as a dashboard.",
    connectionMotif: "signal path",
  },
  "incident-response": {
    emotionalGoal: "excitement",
    attentionLevel: 5,
    interactionDensity: 4,
    visualDensity: 5,
    transitionSpeed: "deliberate",
    camera: "transform",
    sound: "confirmation",
    light: "video-wall-emphasis",
    microSurprise: "The room supports response while the operator stays accountable.",
    connectionMotif: "event trail",
  },
  "architectural-systems": {
    emotionalGoal: "confidence",
    camera: "inspect",
    sound: "material-movement",
    light: "material-reflection",
    connectionMotif: "wall line",
  },
  "manufacturing-quality": {
    emotionalGoal: "trust",
    attentionLevel: 4,
    interactionDensity: 3,
    camera: "inspect",
    sound: "mechanical-precision",
    light: "focus-highlight",
    microSurprise: "Factory proof is revealed as process control, not a collage.",
    connectionMotif: "process proof",
  },
  "project-portfolio": {
    emotionalGoal: "trust",
    attentionLevel: 5,
    interactionDensity: 4,
    visualDensity: 4,
    camera: "retreat",
    sound: "soft-transition",
    light: "focus-highlight",
    microSurprise: "Proof moves from place to relevance to verification.",
    connectionMotif: "evidence trail",
  },
  "why-onepws": {
    emotionalGoal: "inspiration",
    attentionLevel: 4,
    camera: "observe",
    sound: "room-ambience",
    light: "soft-glow",
    connectionMotif: "accountable capability",
  },
  "next-steps-closing": {
    emotionalGoal: "final-memory",
    attentionLevel: 5,
    interactionDensity: 2,
    visualDensity: 5,
    narrationDensity: 2,
    transitionSpeed: "cinematic",
    camera: "celebrate",
    sound: "silence",
    light: "settle-calm",
    microSurprise: "The whole environment settles into a calm future-facing invitation.",
    connectionMotif: "settling room",
  },
  "logo-finale": {
    emotionalGoal: "final-memory",
    attentionLevel: 5,
    interactionDensity: 0,
    visualDensity: 1,
    narrationDensity: 0,
    transitionSpeed: "cinematic",
    camera: "celebrate",
    sound: "silence",
    light: "settle-calm",
    microSurprise: "The final brand mark arrives with a quiet premium shimmer.",
    connectionMotif: "brand memory",
  },
};

export const finalExperienceRules = {
  maxRepeatedCameraGrammar: 1,
  maxRepeatedInteractionType: 1,
  maxRepeatedTransition: 1,
  maxRepeatedSceneType: 1,
  maxPassiveMs: 30_000,
  signatureMomentMin: 8,
  signatureMomentMax: 10,
};
