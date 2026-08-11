import { ErrorBoundary } from "./ErrorBoundary";
import { PresentationProvider } from "../state/PresentationProvider";
import { PresentationShell } from "./PresentationShell";
import { VoiceoverProvider } from "../voiceover/VoiceoverProvider";

export function App() {
  return (
    <ErrorBoundary>
      <PresentationProvider>
        <VoiceoverProvider>
          <PresentationShell />
        </VoiceoverProvider>
      </PresentationProvider>
    </ErrorBoundary>
  );
}
