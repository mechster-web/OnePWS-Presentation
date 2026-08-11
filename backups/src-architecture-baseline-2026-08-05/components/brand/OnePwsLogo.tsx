type Props = {
  compact?: boolean;
  lightOnDark?: boolean;
};

export function OnePwsLogo({ compact = false, lightOnDark = false }: Props) {
  return (
    <div
      className={`inline-flex items-center ${
        lightOnDark ? "bg-white px-3 py-2 shadow-[0_16px_40px_rgba(0,0,0,0.16)]" : ""
      }`}
      aria-label="OnePWS Private Limited"
    >
      <img
        src="/assets/brand/onepws-logo-black.png"
        alt="OnePWS Private Limited"
        className={`${compact ? "h-[38px] w-[134px]" : "h-[54px] w-[189px]"} object-contain`}
        draggable={false}
      />
    </div>
  );
}
