import { motion } from "framer-motion";
import { getAsset } from "../../content/assetManifest";
import { usePresentation } from "../../state/PresentationProvider";

type MediaStageProps = {
  assetId?: string;
  alt?: string;
  fit?: "cover" | "contain";
  focalPoint?: string;
  scale?: number;
  panDirection?: "none" | "left" | "right" | "up" | "down";
  panDistance?: number;
  reveal?: "none" | "fade" | "masked" | "aperture";
  overlayStrength?: "none" | "soft" | "medium" | "strong";
  vignette?: boolean;
  blur?: "none" | "soft" | "depth";
  parallaxIntensity?: number;
  className?: string;
};

export function MediaStage({
  assetId,
  alt,
  fit = "cover",
  focalPoint = "center",
  scale = 1,
  panDirection = "none",
  panDistance = 2,
  reveal = "fade",
  overlayStrength = "medium",
  vignette = true,
  blur = "none",
  parallaxIntensity = 0.5,
  className = "",
}: MediaStageProps) {
  const { state } = usePresentation();
  const asset = assetId ? getAsset(assetId) : null;
  const reduced = state.reducedMotion || parallaxIntensity === 0;
  const pan = reduced ? {} : panVector(panDirection, panDistance);

  return (
    <figure className={`absolute inset-0 z-[2] overflow-hidden bg-[var(--pws-theme-bg)] ${className}`}>
      {asset?.src ? (
        <motion.img
          alt={asset.alt ?? alt ?? "OnePWS presentation media"}
          animate={{ opacity: 1, scale: reduced ? scale : scale + 0.025 * parallaxIntensity, ...pan }}
          className={`h-full w-full ${fit === "cover" ? "object-cover" : "object-contain"}`}
          draggable={false}
          initial={revealInitial(reveal)}
          src={asset.src}
          style={{
            objectPosition: focalPoint,
            filter: blur === "depth" ? "blur(var(--pws-media-blur))" : blur === "soft" ? "blur(2px)" : "none",
          }}
          transition={{ duration: reduced ? 0.01 : 7.5, ease: [0.33, 1, 0.68, 1] }}
        />
      ) : (
        <MissingMedia alt={alt} />
      )}
      {overlayStrength !== "none" ? <div className={`absolute inset-0 pws-media-overlay-${overlayStrength}`} /> : null}
      {vignette ? <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,transparent_0%,rgb(0_0_0/0.12)_48%,rgb(0_0_0/0.58)_100%)]" /> : null}
    </figure>
  );
}

function panVector(direction: MediaStageProps["panDirection"], distance: number): { x?: string; y?: string } {
  const value = `${distance}%`;
  switch (direction) {
    case "left":
      return { x: `-${value}` };
    case "right":
      return { x: value };
    case "up":
      return { y: `-${value}` };
    case "down":
      return { y: value };
    default:
      return {};
  }
}

function revealInitial(reveal: MediaStageProps["reveal"]) {
  switch (reveal) {
    case "masked":
      return { opacity: 0, clipPath: "inset(0 22% 0 22%)" };
    case "aperture":
      return { opacity: 0, clipPath: "inset(42% 42% 42% 42%)" };
    case "none":
      return { opacity: 1 };
    case "fade":
    default:
      return { opacity: 0 };
  }
}

function MissingMedia({ alt }: { alt?: string }) {
  return (
    <div className="grid h-full w-full place-items-center bg-[linear-gradient(135deg,var(--pws-graphite-900),var(--pws-steel-700))] text-center text-sm text-[var(--pws-theme-muted)]">
      <div>
        <p className="pws-technical-label">Control-room environment</p>
        <p className="mt-3 max-w-sm">
          {alt ?? "A calm mission-critical environment view is prepared for this scene."}
        </p>
      </div>
    </div>
  );
}
