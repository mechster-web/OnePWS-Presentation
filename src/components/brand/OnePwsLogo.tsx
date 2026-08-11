type Props = {
  compact?: boolean;
  lightOnDark?: boolean;
};

export function OnePwsLogo({ compact = false, lightOnDark = false }: Props) {
  return (
    <div
      className="inline-flex items-center"
      aria-label="OnePWS Private Limited"
    >
      <img
        src={lightOnDark ? "/assets/brand/onepws-logo-white.png" : "/assets/brand/onepws-logo-black.png"}
        alt="OnePWS Private Limited"
        className={`${compact ? "h-[38px] w-[134px]" : "h-[54px] w-[189px]"} object-contain`}
        draggable={false}
      />
    </div>
  );
}
