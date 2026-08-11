import { ChevronRight, CircleDot, Headphones, MousePointerClick, MoveHorizontal, Radio } from "lucide-react";
import type { ReactNode } from "react";

export type InteractionCueKind =
  | "tap"
  | "select"
  | "drag"
  | "swipe"
  | "hotspot"
  | "listen"
  | "expand"
  | "rotate"
  | "reveal"
  | "autoplay";

export function InteractionCue({ kind, label }: { kind: InteractionCueKind; label: string }) {
  return (
    <div className="pws-interaction-cue">
      <CueIcon kind={kind} />
      <span>{label}</span>
    </div>
  );
}

export function PrecisionButton({
  children,
  onClick,
  variant = "quiet",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "quiet" | "primary";
}) {
  return (
    <button className={variant === "primary" ? "premium-action px-5" : "quiet-action px-5"} onClick={onClick} type="button">
      {children}
    </button>
  );
}

export function HotspotCallout({
  label,
  description,
  active = false,
  onClick,
}: {
  label: string;
  description?: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button className={`pws-hotspot ${active ? "border-[var(--pws-red)]" : ""}`} onClick={onClick} type="button">
      <span className="text-left">
        <span className="block text-sm font-semibold">{label}</span>
        {description ? <span className="mt-1 block max-w-[16rem] text-xs text-[var(--pws-theme-muted)]">{description}</span> : null}
      </span>
    </button>
  );
}

function CueIcon({ kind }: { kind: InteractionCueKind }) {
  switch (kind) {
    case "listen":
      return <Headphones aria-hidden="true" size={15} />;
    case "drag":
    case "swipe":
      return <MoveHorizontal aria-hidden="true" size={15} />;
    case "hotspot":
    case "select":
      return <CircleDot aria-hidden="true" size={15} />;
    case "autoplay":
      return <Radio aria-hidden="true" size={15} />;
    case "tap":
    case "expand":
    case "rotate":
    case "reveal":
    default:
      return <MousePointerClick aria-hidden="true" size={15} />;
  }
}

export function ContinueCue() {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--pws-theme-muted)]">
      Continue <ChevronRight aria-hidden="true" size={15} />
    </span>
  );
}
