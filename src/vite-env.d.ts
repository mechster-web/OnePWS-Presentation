/// <reference types="vite/client" />

import type { DetailedHTMLProps, HTMLAttributes } from "react";

type ModelViewerAttributes = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  alt?: string;
  "auto-rotate"?: boolean;
  "camera-controls"?: boolean;
  "camera-orbit"?: string;
  "camera-target"?: string;
  "disable-tap"?: boolean;
  "environment-image"?: string;
  exposure?: string;
  "field-of-view"?: string;
  "interaction-prompt"?: string;
  "max-camera-orbit"?: string;
  "min-camera-orbit"?: string;
  poster?: string;
  "shadow-intensity"?: string;
  "shadow-softness"?: string;
  src?: string;
};

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerAttributes;
    }
  }
}

export {};
