import type { ReactNode } from "react";
import type { PerformanceMode, SceneThemeVariant } from "../../data/contentTypes";

type SceneCanvasProps = {
  children: ReactNode;
  theme?: SceneThemeVariant;
  performanceMode?: PerformanceMode;
  className?: string;
};

export function SceneCanvas({
  children,
  theme = "cinematic-dark",
  performanceMode = "balanced",
  className = "",
}: SceneCanvasProps) {
  return (
    <article className={`pws-scene-canvas pws-theme-${theme} pws-performance-${performanceMode} ${className}`}>
      {children}
    </article>
  );
}

export function SafeArea({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`pws-safe-area ${className}`}>{children}</section>;
}

export function CinematicGrid({
  children,
  layout = "balanced",
  className = "",
}: {
  children: ReactNode;
  layout?: "balanced" | "asymmetric" | "editorial";
  className?: string;
}) {
  return (
    <div className={`pws-cinematic-grid ${className}`} data-layout={layout}>
      {children}
    </div>
  );
}

export function AmbientLayer({
  atmosphere = "vignette",
  intensity = "medium",
}: {
  atmosphere?: "none" | "vignette" | "grain" | "linework" | "data-trace" | "bloom";
  intensity?: "low" | "medium" | "high";
}) {
  if (atmosphere === "none") {
    return null;
  }

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 z-[4] pws-atmosphere-${atmosphere} pws-atmosphere-${intensity}`} />
  );
}

export function StructuralLayer({ variant = "architectural" }: { variant?: "architectural" | "data" | "focus" }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 z-[8] pws-structure-${variant}`}>
      <div className="absolute left-[var(--stage-safe-x)] right-[var(--stage-safe-x)] top-[22%] h-px bg-[var(--pws-theme-line)]" />
      <div className="absolute bottom-[18%] left-[var(--stage-safe-x)] right-[var(--stage-safe-x)] h-px bg-[var(--pws-theme-line)]" />
      <div className="absolute bottom-[var(--stage-safe-y)] top-[var(--stage-safe-y)] left-[28%] w-px bg-[var(--pws-theme-line)] opacity-60" />
    </div>
  );
}

export function NarrativePanel({
  eyebrow,
  title,
  copy,
  meta,
  className = "",
}: {
  eyebrow: string;
  title: string;
  copy: string;
  meta?: string;
  className?: string;
}) {
  return (
    <div className={`pws-narrative-panel relative z-[18] ${className}`}>
      <p className="pws-technical-label">{eyebrow}</p>
      <h1 className="pws-display-headline mt-[var(--pws-space-3)]">{title}</h1>
      <p className="pws-body-copy mt-[var(--pws-space-4)] max-w-[44rem]">{copy}</p>
      {meta ? <p className="mt-[var(--pws-space-3)] text-sm text-[var(--pws-theme-muted)]">{meta}</p> : null}
    </div>
  );
}

export function FocusLayer({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`relative z-[18] ${className}`}>{children}</div>;
}

export function InteractionLayer({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`relative z-[24] ${className}`}>{children}</div>;
}

export function CaptionLayer({ children }: { children: ReactNode }) {
  return <div className="pointer-events-none absolute inset-x-[var(--stage-safe-x)] bottom-[calc(var(--stage-safe-y)+4.5rem)] z-[30]">{children}</div>;
}
