export type PresentationMode = "presenter" | "selfGuided" | "autoPlay";

export type ChapterId = string;

export type MotionPreset = "fade" | "scan" | "layerReveal" | "projectWall" | "calmDolly";

export type ChapterBeat = {
  id: string;
  label: string;
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
};

export type Asset = {
  id: string;
  type: "image" | "video" | "audio" | "caption" | "logo";
  src?: string;
  alt?: string;
  language?: string;
  publicSafe: boolean;
};
