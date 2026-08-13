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
        presenterPreview ? "h-full w-full" : "h-dvh w-dvw"
      }`}
    >
      <div
        aria-label="OnePWS interactive presentation stage"
        className={`relative overflow-hidden bg-control-deep/95 ${
          presenterPreview ? "presenter-stage-preview" : "presentation-stage"
        }`}
      >
        {children}
      </div>
    </section>
  );
}
