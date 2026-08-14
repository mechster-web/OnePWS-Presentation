import { motion } from "framer-motion";

export function LoadingScreen() {
  return (
    <main className="grid min-h-dvh place-items-center overflow-hidden bg-[var(--pws-graphite-950)] text-[var(--pws-warm-white)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_38%,rgba(207,31,43,0.16),transparent_24%),linear-gradient(135deg,#050607_0%,#11151a_58%,#050607_100%)]" />
      <div className="absolute inset-[8%] border border-white/10" />
      <div className="absolute left-[12%] right-[12%] top-1/2 h-px bg-white/10" />
      <div className="absolute bottom-[18%] left-[18%] right-[18%] h-px bg-[var(--pws-red)]/60" />
      <section className="relative w-[min(720px,86vw)]">
        <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-[var(--pws-red)] to-transparent" />
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 14 }}
          transition={{ duration: 0.7 }}
        >
          <p className="pws-technical-label">OnePWS Private Limited</p>
          <h1 className="mt-5 text-balance text-[clamp(1.9rem,5.2vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.01em]">
            Control-room experience activating
          </h1>
          <p className="mt-5 max-w-xl text-[clamp(0.85rem,1.6vw,1rem)] leading-[1.6] text-[var(--pws-muted-dark)]">
            Initialising presentation modules, media references and narration controls.
          </p>
        </motion.div>
        <div className="mt-10 h-px w-full overflow-hidden bg-white/16">
          <motion.div
            animate={{ x: ["-100%", "0%"] }}
            className="h-full w-full bg-[var(--pws-red)]"
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2 text-[10px] uppercase tracking-[0.18em] text-[var(--pws-muted-dark)]">
          <span>Stage</span>
          <span>Media</span>
          <span>Narration</span>
        </div>
      </section>
    </main>
  );
}

