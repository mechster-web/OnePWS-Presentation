import { motion } from "framer-motion";
import {
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Expand,
  Factory,
  Headphones,
  Landmark,
  Map,
  RadioTower,
  Route,
  ShieldCheck,
  Sparkles,
  TrainFront,
  UsersRound,
  Zap,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { navigationJourneys } from "../../config/navigation";
import { industries, roles, type CustomerIndustry, type CustomerRole } from "../../content/customerPaths";
import type { Chapter } from "../../data/contentTypes";
import { useFullscreen } from "../../hooks/useFullscreen";
import { usePresentation } from "../../state/PresentationProvider";

const sectorIcons: Record<CustomerIndustry, typeof Factory> = {
  "Oil and gas": Factory,
  "Power and utilities": Zap,
  "Defence and aerospace": ShieldCheck,
  "Smart cities": Building2,
  Transportation: TrainFront,
  Manufacturing: Factory,
  "Data centres": Cpu,
  "Emergency response": RadioTower,
  "Government command centres": Landmark,
};

const roleIcons: Record<CustomerRole, typeof UsersRound> = {
  "Operations head": RadioTower,
  "Plant head": Factory,
  Architect: Building2,
  Consultant: Route,
  "IT or technology head": Cpu,
  Procurement: ShieldCheck,
  "Senior management": UsersRound,
};

const routeByRole: Record<CustomerRole, string> = {
  "Operations head": "operations-leader",
  "Plant head": "operator-performance",
  Architect: "architect-consultant",
  Consultant: "consultant-workshop",
  "IT or technology head": "technology-leader",
  Procurement: "credibility-executive",
  "Senior management": "ceo-5",
};

const civicSectors: CustomerIndustry[] = ["Smart cities", "Transportation", "Emergency response", "Government command centres"];

function recommendedJourneyId(sector: CustomerIndustry, role: CustomerRole) {
  if (role === "Senior management") return "ceo-5";
  if (role === "Procurement") return "credibility-executive";
  if (role === "Architect" || role === "Consultant") return routeByRole[role];
  if (role === "IT or technology head") return civicSectors.includes(sector) ? "intelligent-operations-executive" : "technology-leader";
  if (sector === "Defence and aerospace") return "technical-deep";
  if (civicSectors.includes(sector)) return "intelligent-operations-executive";
  return routeByRole[role];
}

const routeHighlights: Record<string, string[]> = {
  "operations-leader": ["Operational risk", "Incident response", "Decision clarity"],
  "operator-performance": ["Fatigue reduction", "Ergonomics", "Human performance"],
  "architect-consultant": ["Sightlines", "Room envelope", "Design-build process"],
  "consultant-workshop": ["Question-led path", "Technical proof", "Project references"],
  "technology-leader": ["Connected systems", "Intelligent features", "Room architecture"],
  "intelligent-operations-executive": ["AI-ready operations", "Proactive information", "Room response"],
  "credibility-executive": ["Manufacturing", "Certifications", "Project credentials"],
  "ceo-5": ["Executive story", "Strategic proof", "Next steps"],
  "technical-deep": ["Engineering depth", "Console systems", "Compliance proof"],
};

export function PresentationFlowSelectorChapter({ chapter }: { chapter: Chapter }) {
  const { dispatch, state } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const [sector, setSector] = useState<CustomerIndustry>(state.customerPath.industry ?? "Power and utilities");
  const [role, setRole] = useState<CustomerRole>(state.customerPath.role ?? "Operations head");
  const journeyId = recommendedJourneyId(sector, role);
  const journey = useMemo(() => navigationJourneys.find((item) => item.id === journeyId), [journeyId]);
  const highlights = routeHighlights[journeyId] ?? ["Focused route", "Relevant proof", "Clear next step"];
  const duration = state.reducedMotion ? 0.01 : 0.58;

  function beginSelectedFlow() {
    dispatch({ type: "SET_CUSTOMER_PATH", selection: { industry: sector, role } });
    dispatch({ type: "SET_ACTIVE_JOURNEY", journeyId, startAtOpeningDestination: true });
  }

  function beginCompleteStory() {
    dispatch({ type: "SET_CUSTOMER_PATH", selection: { industry: sector, role } });
    dispatch({ type: "SET_ACTIVE_JOURNEY", journeyId: "complete-story" });
    dispatch({ type: "GO_TO_CHAPTER", chapterId: "products-transforming-spaces" });
  }

  return (
    <article className="relative h-full w-full overflow-hidden bg-white text-control-text">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,#ffffff_0%,#fbfcfd_52%,#eef5f8_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgb(16_18_22/0.018)_1px,transparent_1px),linear-gradient(90deg,rgb(16_18_22/0.018)_1px,transparent_1px)] bg-[length:5.2rem_5.2rem] opacity-55" />
      <div className="absolute right-[-8cqw] top-[-18cqh] h-[42cqh] w-[44cqw] rounded-full bg-red-500/5 blur-3xl" />

      <section className="absolute inset-x-[2.2cqw] bottom-[10.2cqh] top-[11.4cqh] z-20 grid grid-cols-[minmax(20rem,0.42fr)_minmax(0,1fr)_minmax(20rem,0.36fr)] gap-[1.25cqw]">
        <motion.aside animate={{ opacity: 1, x: 0 }} className="flex min-h-0 flex-col justify-between" initial={state.reducedMotion ? false : { opacity: 0, x: -18 }} transition={{ duration }}>
          <div>
            <p className="text-[0.86rem] font-semibold uppercase tracking-[0.28em] text-red-600">{chapter.eyebrow}</p>
            <h1 className="mt-[2cqh] text-balance text-[clamp(3.1rem,4.6cqw,6rem)] font-extrabold leading-[1] tracking-normal text-slate-950 md:text-[4cqw]">
              Choose <br /> the
              <span className="block text-red-600">Right<br /> flow.</span>
            </h1>
            <div className="mt-[2.1cqh] h-[3px] w-[4.2rem] rounded-full bg-red-600" />
            <p className="mt-[2.2cqh] max-w-[30rem] text-[clamp(1rem,1.12cqw,1.35rem)] font-medium leading-[1.45] text-slate-700 md:text-[0.8cqw]">
              Select the sector and audience so the presentation starts with what matters most.
            </p>
          </div>

          <div className="rounded-[1.15rem] border border-white/80 bg-white/76 p-[1.25rem] shadow-[0_1.4rem_3.4rem_rgb(15_23_42/0.11)] backdrop-blur-2xl">
            <div className="flex items-center gap-4">
              <span className="grid size-14 place-items-center rounded-full bg-red-50 text-red-600 ring-1 ring-red-100">
                <Sparkles aria-hidden="true" size={26} strokeWidth={1.7} />
              </span>
              <p className="text-[1rem] font-bold leading-6 text-slate-900">
                Presenter-led or customer self-guided.
                <span className="block text-red-600">Same content. Smarter order.</span>
              </p>
            </div>
          </div>
        </motion.aside>

        <motion.main animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[auto_auto_minmax(0,1fr)] gap-[1cqh]" initial={state.reducedMotion ? false : { opacity: 0, y: 18 }} transition={{ duration, delay: 0.06 }}>
          <FlowCard label="1. Select sector" support="Industry context changes proof and emphasis.">
            <div className="grid grid-cols-3 gap-[0.65rem]">
              {industries.map((item) => {
                const Icon = sectorIcons[item];
                const active = item === sector;
                return (
                  <button className={`flex min-h-[5.35rem] items-center gap-3 rounded-[0.85rem] border px-4 text-left transition ${active ? "border-red-200 bg-red-50/85 text-red-700 shadow-[0_0.8rem_1.8rem_rgb(220_38_38/0.13)]" : "border-white/80 bg-white/70 text-slate-700 shadow-[0_0.65rem_1.5rem_rgb(15_23_42/0.06)] hover:-translate-y-0.5 hover:bg-white"}`} key={item} onClick={() => setSector(item)} type="button">
                    <span className={`grid size-11 shrink-0 place-items-center rounded-full ${active ? "bg-red-600 text-white" : "bg-slate-50 text-slate-700 ring-1 ring-slate-200"}`}>
                      <Icon aria-hidden="true" size={21} strokeWidth={1.8} />
                    </span>
                    <span className="text-[0.9rem] font-semibold leading-tight">{item}</span>
                  </button>
                );
              })}
            </div>
          </FlowCard>

          <FlowCard label="2. Select audience" support="Persona changes the depth and opening chapter.">
            <div className="grid grid-cols-7 gap-[0.55rem]">
              {roles.map((item) => {
                const Icon = roleIcons[item];
                const active = item === role;
                return (
                  <button className={`flex min-h-[5.15rem] flex-col items-center justify-center gap-2 rounded-[0.85rem] border px-2 text-center transition ${active ? "border-blue-200 bg-blue-50/90 text-blue-700 shadow-[0_0.8rem_1.8rem_rgb(37_99_235/0.12)]" : "border-white/80 bg-white/70 text-slate-700 shadow-[0_0.65rem_1.4rem_rgb(15_23_42/0.055)] hover:-translate-y-0.5 hover:bg-white"}`} key={item} onClick={() => setRole(item)} type="button">
                    <Icon aria-hidden="true" size={23} strokeWidth={1.8} />
                    <span className="text-[0.72rem] font-semibold leading-tight">{item}</span>
                  </button>
                );
              })}
            </div>
          </FlowCard>

          <div className="grid min-h-0 grid-cols-3 gap-[0.8rem]">
            {highlights.map((label, index) => (
              <div className="rounded-[1rem] border border-white/80 bg-white/68 p-[1rem] shadow-[0_1rem_2.4rem_rgb(15_23_42/0.08)] backdrop-blur-2xl" key={label}>
                <p className="text-[0.78rem] font-semibold text-red-600">0{index + 1}</p>
                <p className="mt-2 text-[1rem] font-semibold leading-tight text-slate-950">{label}</p>
                <p className="mt-2 text-[0.82rem] font-medium leading-5 text-slate-600">Included in the recommended route for this audience.</p>
              </div>
            ))}
          </div>
        </motion.main>

        <motion.aside animate={{ opacity: 1, x: 0 }} className="flex min-h-0 flex-col gap-[1rem]" initial={state.reducedMotion ? false : { opacity: 0, x: 18 }} transition={{ duration, delay: 0.12 }}>
          <div className="rounded-[1.2rem] border border-white/85 bg-white/80 p-[1.25rem] shadow-[0_1.35rem_3.4rem_rgb(15_23_42/0.11)] backdrop-blur-2xl">
            <p className="text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-slate-950">Recommended Flow</p>
            <div className="mt-3 h-[2px] w-12 rounded-full bg-red-600" />
            <h2 className="mt-5 text-[clamp(1.7rem,2cqw,2.45rem)] font-semibold leading-tight text-slate-950">{journey?.name ?? "Focused OnePWS route"}</h2>
            <p className="mt-3 text-[1rem] font-semibold leading-6 text-slate-600">{journey?.audienceOrOutcome}</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Metric label="Duration" value={journey?.durationLabel ?? "Focused"} tone="text-red-600" />
              <Metric label="Slides" value={String(journey?.sequence.length ?? 0)} tone="text-blue-700" />
            </div>
            <button className="mt-5 inline-flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-5 text-[1rem] font-semibold text-white shadow-[0_1rem_2rem_rgb(220_38_38/0.26)] transition hover:-translate-y-0.5 hover:bg-red-700" onClick={beginSelectedFlow} type="button">
              Begin Selected Flow
              <ChevronRight aria-hidden="true" size={22} />
            </button>
            <button className="mt-3 inline-flex h-12 w-full items-center justify-center rounded-xl border border-slate-200 bg-white/80 px-5 text-[0.92rem] font-semibold text-slate-800 shadow-[0_0.75rem_1.5rem_rgb(15_23_42/0.07)] transition hover:-translate-y-0.5 hover:bg-white" onClick={beginCompleteStory} type="button">
              Full Complete Story
            </button>
          </div>

          <div className="flex-1 rounded-[1.2rem] border border-[#082c5b]/20 bg-slate-50 p-[1.2rem] text-black shadow-[0_1.35rem_3.2rem_rgb(8_44_91/0.18)]">
            <p className="text-[1.15rem] font-semibold leading-tight">Selected context</p>
            <p className="mt-3 text-[0.95rem] font-semibold leading-6 text-white/78">{sector}<span className="mx-2 text-red-600">/</span>{role}</p>
            <div className="mt-7 space-y-3">
              {["Story opens at the most relevant chapter.", "Experience map follows the selected route.", "Sector and role are saved for recommendations."].map((item) => (
                <p className="flex items-start gap-3 text-[0.9rem] font-semibold leading-5 text-black" key={item}>
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 shrink-0 text-red-600" size={18} />
                  {item}
                </p>
              ))}
            </div>
          </div>
        </motion.aside>
      </section>

      <div className="absolute bottom-[1.7rem] left-[2.8rem] z-40 flex items-center gap-3">
        <button aria-label="Previous" className="inline-flex h-14 items-center gap-3 rounded-xl border border-white/75 bg-white/78 px-5 text-sm font-semibold text-slate-800 shadow-[0_14px_36px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} type="button"><ChevronLeft aria-hidden="true" size={20} />Previous</button>
        <button aria-label="Next" className="inline-flex size-14 items-center justify-center rounded-xl bg-red-600 text-white shadow-[0_16px_34px_rgba(220,38,38,0.26)] transition hover:-translate-y-0.5 hover:bg-red-700" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} type="button"><ChevronRight aria-hidden="true" size={23} /></button>
        <button aria-label="Experience Map" className="inline-flex size-14 items-center justify-center rounded-xl border border-white/75 bg-white/78 text-slate-800 shadow-[0_14px_36px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button"><Map aria-hidden="true" size={21} /></button>
        <button aria-label="Narration" className="inline-flex size-14 items-center justify-center rounded-xl border border-white/75 bg-white/78 text-slate-800 shadow-[0_14px_36px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white" onClick={() => dispatch({ type: "TOGGLE_NARRATION" })} title="Narration" type="button"><Headphones aria-hidden="true" size={21} /></button>
        <button aria-label="Full Screen" className="inline-flex size-14 items-center justify-center rounded-xl border border-white/75 bg-white/78 text-slate-800 shadow-[0_14px_36px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition hover:-translate-y-0.5 hover:bg-white" onClick={() => void toggleFullscreen()} title="Full Screen" type="button"><Expand aria-hidden="true" size={20} /></button>
      </div>
    </article>
  );
}

function FlowCard({ children, label, support }: { children: ReactNode; label: string; support: string }) {
  return (
    <div className="rounded-[1.15rem] border border-white/80 bg-white/74 p-[1.1rem] shadow-[0_1.2rem_3rem_rgb(15_23_42/0.1)] backdrop-blur-2xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-slate-950">{label}</p>
          <div className="mt-2 h-[2px] w-12 rounded-full bg-red-600" />
        </div>
        <p className="text-sm font-semibold text-slate-500">{support}</p>
      </div>
      <div className="mt-[1rem]">{children}</div>
    </div>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="rounded-[0.85rem] bg-slate-50 p-4 ring-1 ring-slate-200/80">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className={`mt-2 text-2xl font-semibold ${tone}`}>{value}</p>
    </div>
  );
}



