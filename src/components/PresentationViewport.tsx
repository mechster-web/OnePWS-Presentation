import type { ReactNode } from "react";

export function PresentationViewport({
  children,
  presenterPreview = false,
}: {
  children: ReactNode;
  presenterPreview?: boolean;
}) {
  return (
    <section
      className={`relative z-10 grid place-items-center overflow-hidden ${
        presenterPreview ? "h-full w-full p-3" : "h-dvh w-dvw p-3"
      }`}
    >
      <div
        aria-label="OnePWS interactive presentation stage"
        className={`relative overflow-hidden border border-control-line/70 bg-control-deep/95 shadow-control ${
          presenterPreview ? "presenter-stage-preview" : "presentation-stage"
        }`}
      >
        <div className="pointer-events-none absolute inset-4 border border-control-line/35" />
        {children}
      </div>
    </section>
  );
}
