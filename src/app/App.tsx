import { lazy, Suspense } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { PresentationProvider } from "../state/PresentationProvider";
import { PresentationShell } from "./PresentationShell";
import { VoiceoverProvider } from "../voiceover/VoiceoverProvider";

const DevDesignSystemShowcase = import.meta.env.DEV
  ? lazy(() => import("../design-system/showcase/DesignSystemShowcase"))
  : null;

export function App() {
  const showDesignSystem = Boolean(DevDesignSystemShowcase) && window.location.pathname === "/dev/design-system";

  return (
    <ErrorBoundary>
      <PresentationProvider>
        <VoiceoverProvider>
          {showDesignSystem && DevDesignSystemShowcase ? (
            <Suspense fallback={null}>
              <DevDesignSystemShowcase />
            </Suspense>
          ) : (
            <PresentationShell />
          )}
        </VoiceoverProvider>
      </PresentationProvider>
    </ErrorBoundary>
  );
}
