import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  message?: string;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Presentation runtime error", error, errorInfo);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <main className="grid min-h-dvh place-items-center bg-control-black p-8 text-control-text">
        <section className="w-full max-w-2xl border border-control-line bg-control-panel/80 p-8 shadow-control">
          <div className="mb-6 flex h-12 w-12 items-center justify-center border border-control-warm/50 text-control-warm">
            <AlertTriangle aria-hidden="true" size={24} />
          </div>
          <h1 className="text-2xl font-semibold tracking-normal">Presentation paused</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-control-soft">
            The control-room presentation encountered an error. Refresh the runtime to restart the
            local experience.
          </p>
          {this.state.message ? (
            <p className="mt-4 border-l border-control-warm/50 pl-4 text-xs text-control-muted">
              {this.state.message}
            </p>
          ) : null}
          <button
            className="mt-8 inline-flex items-center gap-2 border border-control-line px-4 py-3 text-sm text-control-text transition hover:border-control-warm hover:text-control-warm"
            onClick={() => window.location.reload()}
            type="button"
          >
            <RotateCcw aria-hidden="true" size={16} />
            Restart presentation
          </button>
        </section>
      </main>
    );
  }
}
