import { motion } from "framer-motion";

export type AudioVisualState =
  | "available"
  | "playing"
  | "paused"
  | "loading"
  | "completed"
  | "captions-active"
  | "voice-guided"
  | "unavailable";

export function AudioPulse({ state = "available", reducedMotion = false }: { state?: AudioVisualState; reducedMotion?: boolean }) {
  const active = state === "playing" || state === "loading" || state === "voice-guided";
  return (
    <div className="inline-flex items-center gap-2 text-xs text-[var(--pws-theme-muted)]" aria-label={`Narration ${state}`}>
      <span className="relative inline-grid h-8 w-8 place-items-center border border-[var(--pws-theme-line)]">
        <span className="h-1.5 w-1.5 bg-[var(--pws-red)]" />
        {active ? (
          <motion.span
            animate={reducedMotion ? { opacity: 0.4 } : { opacity: [0.15, 0.65, 0.15], scale: [0.6, 1.35, 0.6] }}
            className="absolute inset-1 border border-[var(--pws-red)]"
            transition={{ duration: state === "loading" ? 0.8 : 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : null}
      </span>
      <span>{labelForState(state)}</span>
    </div>
  );
}

function labelForState(state: AudioVisualState) {
  switch (state) {
    case "playing":
      return "Narration playing";
    case "paused":
      return "Narration paused";
    case "loading":
      return "Narration loading";
    case "completed":
      return "Narration complete";
    case "captions-active":
      return "Captions active";
    case "voice-guided":
      return "Voice-guided scene";
    case "unavailable":
      return "Narration unavailable";
    case "available":
    default:
      return "Narration available";
  }
}
