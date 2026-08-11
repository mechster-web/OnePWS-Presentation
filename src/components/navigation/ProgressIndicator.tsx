import { useMemo } from "react";
import { buildNavigationModel } from "../../navigation/navigationModel";
import { usePresentation } from "../../state/PresentationProvider";
import { getChapter } from "../../state/selectors";
import { OnePwsLogo } from "../brand/OnePwsLogo";

export function ProgressIndicator() {
  const { state } = usePresentation();
  const model = useMemo(() => buildNavigationModel(state), [state]);
  const chapter = getChapter(state.chapterId);
  const displayShortTitle =
    chapter.id === "mission-control-definition"
      ? "Mission-Critical Insight"
      : chapter.id === "human-centred-philosophy"
        ? "Human-Centred Philosophy"
        : chapter.id === "ergonomic-methodology"
          ? "ISO 11064 & Ergonomics"
          : chapter.id === "sightline-comfort"
            ? "Sightlines, Reach & Comfort"
            : chapter.id === "design-build-approach"
              ? "Integrated Design-Build"
              : chapter.id === "room-sounds-right"
                ? "Acoustic Performance"
                : chapter.id === "room-built-to-protect"
                  ? "Fire Safety"
                  : chapter.id === "room-engineered-to-last"
                    ? "Durability Performance"
                    : chapter.id === "unified-control-room"
                      ? "Unified Control Room"
                      : chapter.id === "architectural-systems"
                        ? "Architectural Systems"
                        : chapter.id === "room-recognizes-you"
                  ? "Room Recognizes You"
                  : chapter.id === "console-understands-task"
                    ? "Console Understands"
                    : chapter.id === "information-comes-operator"
                      ? "Information Delivery"
                      : chapter.id === "operational-state-room-responds"
                        ? "Operational State"
                        : chapter.id === "room-protects-human-performance"
                          ? "Human Performance"
                          : chapter.id === "personal-workspace"
                            ? "Personal Workspace"
                            : chapter.id === "intelligence-beyond-desk"
                              ? "Beyond the Desk"
                              : chapter.id === "digital-twin-control-room"
                                ? "Digital Twin"
                                : chapter.id === "ai-silent-assistant"
                                  ? "Silent Assistant"
                                  : chapter.id === "software-defined-control-room"
                                    ? "Software-Defined"
                                    : chapter.id === "customer-presence"
                                      ? "Customers & Presence"
                                      : chapter.id === "why-onepws"
                                        ? "Why OnePWS"
                                        : chapter.id === "next-steps-closing"
                                          ? "Future Starts Here"
                                          : chapter.id === "logo-finale"
                                            ? "OnePWS"
      : model.currentDestination.shortTitle;
  const isDarkScene =
    chapter.themeVariant === "cinematic-dark" ||
    chapter.themeVariant === "operational-dark" ||
    chapter.themeVariant === "data-dark" ||
    chapter.themeVariant === "alert-state";
  const immersiveFocusMode = chapter.id === "mission-critical-environments";
  const navigationState =
    state.navigationControlsRevealed || state.mode === "presenter"
      ? "visible"
      : model.currentDestination.chapterId === "opening-cover"
        ? "hidden-cinematic"
        : model.currentDestination.memoryMoment
          ? "minimal"
          : "visible";

  return (
    <header className={`pointer-events-none absolute inset-x-[var(--stage-safe-x)] top-[var(--stage-safe-y)] z-30 transition-opacity duration-300 pws-nav-${navigationState} ${isDarkScene ? "pws-progress-on-dark" : ""}`}>
      <div className="flex items-start justify-between gap-5">
        <div className="pointer-events-auto min-w-[12rem]">
          <OnePwsLogo compact lightOnDark={isDarkScene} />
        </div>
        <div className={`pointer-events-auto mt-2 hidden min-w-0 max-w-[42rem] flex-1 md:block ${immersiveFocusMode ? "opacity-70" : ""}`}>
          <p className="truncate text-center text-xs uppercase tracking-[0.22em] text-control-muted">
            {model.journey.name}
          </p>
          <div className="mx-auto mt-3 h-px max-w-[32rem] bg-control-line">
            <div className="h-px bg-control-warm" style={{ width: `${model.progressPercent}%` }} />
          </div>
        </div>
        {immersiveFocusMode ? <div className="min-w-40" /> : (
          <div className="pointer-events-auto min-w-40 text-right">
            <p className="truncate text-xs uppercase tracking-[0.22em] text-control-warm" title={displayShortTitle}>
              {displayShortTitle}
            </p>
            <p className="mt-2 text-xs text-control-muted">
              {Math.max(0, Math.round(model.remainingDurationMs / 60_000))} min remaining
            </p>
          </div>
        )}
      </div>
    </header>
  );
}
