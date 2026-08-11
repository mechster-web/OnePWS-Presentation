import type { OpeningStageId } from "./openingConfig";

export function OpeningProgress({
  sequence,
  currentStage,
  progress,
  visible,
}: {
  sequence: OpeningStageId[];
  currentStage: OpeningStageId;
  progress: number;
  visible: boolean;
}) {
  if (!visible) {
    return null;
  }

  return (
    <div className="absolute left-[var(--stage-safe-x)] right-[var(--stage-safe-x)] top-[var(--stage-safe-y)] z-[32]">
      <div className="h-px bg-white/12">
        <div className="h-px bg-[var(--pws-red)] transition-[width] duration-500" style={{ width: `${progress * 100}%` }} />
      </div>
      <div className="mt-3 flex items-center gap-2">
        {sequence.map((stage) => (
          <span
            aria-label={stage}
            className={`h-1 flex-1 ${stage === currentStage ? "bg-[var(--pws-red)]" : "bg-white/18"}`}
            key={stage}
          />
        ))}
      </div>
    </div>
  );
}
