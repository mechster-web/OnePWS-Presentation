import { clientLogos } from "../../content/clientLogos";

type Props = {
  className?: string;
  /** Seconds for one full pass. Longer reads calmer behind a spoken slide. */
  durationSeconds?: number;
  /** Mark height, so the ribbon can sit in a thin footer or carry a page. */
  logoHeightClass?: string;
  reducedMotion?: boolean;
};

/**
 * Continuous ribbon of client marks.
 *
 * The list is rendered twice and the track is shifted by exactly half its
 * width, so the loop meets itself with no visible jump. Under reduced motion it
 * simply sits still and scrolls by hand.
 */
export function ClientLogoRibbon({ className = "", durationSeconds = 90, logoHeightClass = "h-[2.2cqh]", reducedMotion = false }: Props) {
  if (!clientLogos.length) {
    return null;
  }

  const pass = [...clientLogos, ...clientLogos];

  return (
    <div className={`pws-logo-ribbon relative overflow-hidden ${className}`}>
      <div
        className={`flex w-max items-center gap-[2.2cqw] ${reducedMotion ? "overflow-x-auto" : "pws-logo-ribbon-track"}`}
        style={reducedMotion ? undefined : { animationDuration: `${durationSeconds}s` }}
      >
        {pass.map((src, index) => (
          <img
            alt=""
            aria-hidden="true"
            className={`${logoHeightClass} w-auto max-w-[7rem] shrink-0 object-contain transition duration-300`}
            draggable={false}
            key={`${src}-${index}`}
            loading="lazy"
            src={src}
          />
        ))}
      </div>
      {/* Soft edges so marks fade rather than being cut by the frame. */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-[6cqw] bg-[linear-gradient(90deg,rgb(255_255_255/0.96),transparent)]" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-[6cqw] bg-[linear-gradient(270deg,rgb(255_255_255/0.96),transparent)]" />
    </div>
  );
}
