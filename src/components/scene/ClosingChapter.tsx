import { motion } from "framer-motion";
import {
  Accessibility, Box, CalendarCheck2, CheckCircle2, ChevronLeft, ChevronRight,
  ClipboardCheck, Expand, FileText, Headphones, LayoutDashboard, Map, MonitorCog,
  Network, Ruler, Search, ShieldCheck, Target, Users, type LucideIcon,
} from "lucide-react";
import { getVoiceover } from "../../content/voiceovers";
import type { Chapter } from "../../data/contentTypes";
import { useFullscreen } from "../../hooks/useFullscreen";
import { usePresentation } from "../../state/PresentationProvider";
import { useVoiceover } from "../../voiceover/VoiceoverProvider";

type Item = { title: string; detail: string; Icon: LucideIcon; color?: string };

const processSteps: Item[] = [
  { title: "Discovery", detail: "Confirm mission, operators, workflows, site constraints and success criteria.", Icon: Search },
  { title: "Site Inputs", detail: "Collect room dimensions, utilities, display needs, system interfaces and timelines.", Icon: Ruler },
  { title: "Ergonomic Study", detail: "Validate sightlines, reach, seating, console posture and operator movement.", Icon: Accessibility },
  { title: "Concept Layout", detail: "Translate requirements into room zoning, console positions and operating modes.", Icon: LayoutDashboard },
  { title: "Engineering Proposal", detail: "Define technical scope, materials, systems and manufacturing approach.", Icon: FileText },
  { title: "Technical Review", detail: "Align stakeholders before final design, production and implementation.", Icon: ClipboardCheck },
];

const needed: Item[] = [
  { title: "Mission & Workflow", detail: "Your operational objectives and workflows", Icon: Target, color: "text-red-600" },
  { title: "Room Dimensions", detail: "Room size, height, obstructions and utilities", Icon: Box, color: "text-violet-600" },
  { title: "Operator Details", detail: "Operator count, roles and shift patterns", Icon: Users, color: "text-blue-600" },
  { title: "Displays & Systems", detail: "Display requirements, systems and interface needs", Icon: MonitorCog, color: "text-orange-500" },
  { title: "Timeline & Priorities", detail: "Key milestones, preferences and priorities", Icon: CalendarCheck2, color: "text-green-600" },
];

const receive: Item[] = [
  { title: "Concept Layout", detail: "Initial room layout with console placement", Icon: LayoutDashboard, color: "text-red-600" },
  { title: "Ergonomic Validation", detail: "Sightlines, reach and comfort validated per standards", Icon: ShieldCheck, color: "text-violet-600" },
  { title: "Technical Proposal", detail: "Recommended solution, scope, budget and specifications", Icon: FileText, color: "text-blue-600" },
  { title: "Implementation Roadmap", detail: "Phased plan for execution, production and support", Icon: Network, color: "text-green-600" },
];

const outcomes = ["Clear next steps", "Aligned stakeholders", "Faster project start", "Better project outcomes"];

export function ClosingChapter({ chapter }: { chapter: Chapter }) {
  const { dispatch } = usePresentation();
  const { toggleFullscreen } = useFullscreen();
  const voiceover = useVoiceover();
  const chapterVoiceover = getVoiceover("chapter", chapter.id);

  return (
    <article className="relative h-full w-full overflow-hidden bg-[#fbfcfd] text-slate-950">
      <div className="pointer-events-none absolute inset-x-0 top-[8.55cqh] h-px bg-slate-200/90" />
      <main className="relative z-10 grid h-full grid-cols-[minmax(0,0.965fr)_minmax(0,1.035fr)] grid-rows-[45.9cqh_16.9cqh_7.7cqh] gap-x-[2.1cqw] gap-y-[2.1cqh] px-[2.1cqw] pb-[1.9cqh] pt-[10.6cqh]">
        <motion.section animate={{ opacity: 1, y: 0 }} className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-[1.8cqh]" initial={false} transition={{ duration: 0.55 }}>
          <header>
            <h1 className="text-[2.55cqw] font-bold uppercase leading-[0.98] tracking-normal text-black">
              <span className="block">The Future</span>
              <span className="block text-control-warm">Starts Here.</span>
            </h1>
            <div className="mt-[1.9cqh] h-[3px] w-[3rem] bg-control-warm" />
            <p className="mt-[1.8cqh] max-w-[43rem] text-[0.8cqw] font-medium leading-[1.45] text-slate-900">
              The next step is a structured design process that turns your mission, operators,
              systems and room constraints into one complete control-room environment.
            </p>
          </header>

          <div className="relative min-h-0 overflow-hidden rounded-[0.55rem] border border-slate-200 bg-white shadow-[0_0.9rem_2.5rem_rgb(15_23_42/0.08)]">
            <img alt="Futuristic operations control room" className="absolute inset-0 h-full w-full object-cover object-center" draggable={false} src="/assets/generated/final/futuristic-blue-operations-control-room.png" />
            <div className="absolute left-[1.15cqw] top-[1.45cqh] w-[15.2cqw] rounded-[0.45rem] border border-white/30 bg-slate-950/72 px-[1cqw] py-[1.45cqh] text-white shadow-xl backdrop-blur-md">
              <p className="text-[0.92cqw] font-semibold uppercase leading-[1.35]">From presentation<br />to project direction.</p>
              <div className="mt-[1.1cqh] h-[2px] w-[2.4rem] bg-control-warm" />
              <p className="mt-[1.15cqh] text-[0.71cqw] font-medium leading-[1.5] text-white/90">We move from what the room can become to what the first technical discussion should confirm.</p>
            </div>
          </div>
        </motion.section>

        <motion.section animate={{ opacity: 1, y: 0 }} className="flex min-h-0 flex-col rounded-[0.55rem] border border-slate-200 bg-white px-[1.45cqw] py-[1.8cqh] shadow-[0_0.8rem_2.2rem_rgb(15_23_42/0.06)]" initial={false} transition={{ duration: 0.55, delay: 0.05 }}>
          <h2 className="text-[1.22cqw] font-semibold uppercase">Start the Design Process</h2>
          <div className="mt-[0.8cqh] h-[3px] w-[2.75rem] bg-control-warm" />
          <div className="mt-[1.4cqh] grid min-h-0 flex-1 grid-cols-3 grid-rows-2">
            {processSteps.map((step, index) => <ProcessStep index={index} key={step.title} step={step} />)}
          </div>
        </motion.section>

        <InfoPanel className="" items={needed} title="What We Need From You" />
        <InfoPanel className="" items={receive} title="What You Receive Next" />

        <motion.section animate={{ opacity: 1 }} className="col-span-2 grid min-h-0 grid-cols-[39cqw_repeat(4,minmax(0,1fr))] items-center overflow-hidden rounded-[0.5rem] bg-red-50/90" initial={false} transition={{ duration: 0.5, delay: 0.14 }}>
          <div className="flex h-full items-center gap-[1.2cqw] border-r border-red-100 px-[1.65cqw]">
            <span className="grid size-[3.1rem] shrink-0 place-items-center rounded-full bg-control-warm text-white"><ChevronRight size={30} strokeWidth={2.5} /></span>
            <p className="whitespace-nowrap text-[1.05cqw] font-medium">Next decision: <span className="font-semibold text-control-warm">approve the technical discovery.</span></p>
          </div>
          {outcomes.map((outcome) => (
            <div className="flex h-[56%] items-center justify-center gap-[0.65cqw] border-r border-red-100 px-[0.8cqw] last:border-r-0" key={outcome}>
              <CheckCircle2 className="shrink-0 text-control-warm" size={20} strokeWidth={1.8} />
              <span className="text-[0.72cqw] font-semibold leading-tight text-slate-800">{outcome}</span>
            </div>
          ))}
        </motion.section>
      </main>

      <div className="pws-scene-control-dock absolute bottom-[0.55cqh] left-[2.1cqw] z-40 justify-start">
        <button aria-label="Previous scene" className="pws-scene-control" onClick={() => dispatch({ type: "PREVIOUS_CHAPTER" })} title="Previous" type="button"><ChevronLeft size={22} /></button>
        <button aria-label="Continue to next scene" className="pws-scene-control pws-scene-control-primary" onClick={() => dispatch({ type: "NEXT_CHAPTER" })} title="Continue" type="button"><ChevronRight size={23} /></button>
        <button aria-label="Open experience map" className="pws-scene-control" onClick={() => dispatch({ type: "SET_OVERLAY", overlay: { type: "chapterMap" } })} title="Experience Map" type="button"><Map size={22} /></button>
        <button aria-label="Play narration" className="pws-scene-control" onClick={() => chapterVoiceover ? voiceover.play(chapterVoiceover) : dispatch({ type: "TOGGLE_NARRATION" })} title="Narration" type="button"><Headphones size={22} /></button>
        <button aria-label="Toggle fullscreen" className="pws-scene-control" onClick={() => void toggleFullscreen()} title="Fullscreen" type="button"><Expand size={22} /></button>
      </div>
    </article>
  );
}

function ProcessStep({ step, index }: { step: Item; index: number }) {
  const hasRightDivider = index % 3 !== 2;
  const hasBottomDivider = index < 3;
  return (
    <article className={`relative flex min-h-0 flex-col items-center justify-center px-[1.1cqw] text-center ${hasRightDivider ? "border-r border-dashed border-slate-200" : ""} ${hasBottomDivider ? "border-b border-dashed border-slate-200" : ""}`}>
      <span className="text-[0.92cqw] font-bold text-control-warm">{String(index + 1).padStart(2, "0")}</span>
      <span className="mt-[0.75cqh] grid size-[3.5rem] place-items-center rounded-full bg-red-50 text-control-warm"><step.Icon size={32} strokeWidth={1.7} /></span>
      <h3 className="mt-[0.75cqh] text-[0.82cqw] font-bold uppercase leading-tight">{step.title}</h3>
      <p className="mt-[0.45cqh] max-w-[12rem] text-[0.65cqw] font-medium leading-[1.35] text-slate-800">{step.detail}</p>
      {hasRightDivider ? <ChevronRight className="absolute -right-[0.7rem] top-1/2 z-10 -translate-y-1/2 rounded-full border border-red-300 bg-white p-1 text-control-warm" size={24} /> : null}
    </article>
  );
}

function InfoPanel({ title, items, className }: { title: string; items: Item[]; className: string }) {
  return (
    <motion.section animate={{ opacity: 1 }} className={`min-h-0 rounded-[0.55rem] border border-slate-200 bg-white px-[1.25cqw] py-[1.4cqh] shadow-[0_0.8rem_2.2rem_rgb(15_23_42/0.055)] ${className}`} initial={false} transition={{ duration: 0.55, delay: 0.1 }}>
      <h2 className="text-[1.05cqw] font-semibold uppercase">{title}</h2>
      <div className="mt-[0.7cqh] h-[3px] w-[2.6rem] bg-control-warm" />
      <div className={`mt-[1.15cqh] grid h-[calc(100%-3.2cqh)] divide-x divide-slate-200 ${items.length === 5 ? "grid-cols-5" : "grid-cols-4"}`}>
        {items.map((item) => (
          <article className="flex min-w-0 flex-col items-center px-[0.75cqw] text-center" key={item.title}>
            <item.Icon className={item.color} size={28} strokeWidth={1.7} />
            <h3 className="mt-[0.7cqh] text-[0.7cqw] font-bold leading-tight">{item.title}</h3>
            <p className="mt-[0.45cqh] text-[0.58cqw] font-medium leading-[1.3] text-slate-800">{item.detail}</p>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
