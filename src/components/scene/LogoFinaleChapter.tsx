import { motion } from "framer-motion";

export function LogoFinaleChapter() {
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <article className="relative grid h-full w-full place-items-center overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[linear-gradient(116deg,#ffffff_0%,#fbfcfd_56%,#eef3f7_100%)]" />
      <motion.div
        animate={{ opacity: [0.18, 0.28, 0.18] }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgb(2_6_23/0.055),transparent_34%)]"
        initial={false}
        transition={{ duration: 7.2, ease: "easeInOut", repeat: Infinity }}
      />
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(90deg,#94a3b8_1px,transparent_1px),linear-gradient(#94a3b8_1px,transparent_1px)] [background-size:7.5rem_7.5rem] [mask-image:radial-gradient(circle_at_50%_46%,#000,transparent_68%)]" />
      <motion.div
        animate={{ scaleX: 1, opacity: 1 }}
        className="absolute left-1/2 top-[31vh] h-px w-[min(50vw,48rem)] origin-center -translate-x-1/2 bg-[linear-gradient(90deg,transparent,#cbd5e1_18%,#e30613_50%,#cbd5e1_82%,transparent)]"
        initial={{ scaleX: 0, opacity: 0 }}
        transition={{ duration: 1.8, ease, delay: 0.15 }}
      />
      <motion.div
        animate={{ scaleX: 1, opacity: 0.72 }}
        className="absolute left-1/2 top-[68vh] h-px w-[min(36vw,34rem)] origin-center -translate-x-1/2 bg-[linear-gradient(90deg,transparent,#cbd5e1,transparent)]"
        initial={{ scaleX: 0, opacity: 0 }}
        transition={{ duration: 1.55, ease, delay: 0.42 }}
      />
      <motion.div
        animate={{
          opacity: [0, 1],
          y: [18, 0],
          scale: [0.975, 1],
          filter: ["blur(8px)", "blur(0px)"],
        }}
        className="relative"
        initial={false}
        transition={{ duration: 1.45, ease, delay: 0.28 }}
      >
        <motion.div
          animate={{
            opacity: [0.2, 0.34, 0.2],
            scale: [0.96, 1.035, 0.96],
          }}
          className="absolute inset-[-22%] rounded-full bg-slate-900/[0.045] blur-[56px]"
          initial={false}
          transition={{ duration: 6.4, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.div
          animate={{ scaleX: [0, 1], opacity: [0, 1, 0.82] }}
          className="absolute left-[11%] top-1/2 h-[3px] w-[15%] origin-right -translate-y-1/2 rounded-full bg-control-warm"
          initial={false}
          transition={{ duration: 1.05, ease, delay: 0.92, times: [0, 0.78, 1] }}
        />
        <img
          alt="OnePWS"
          className="relative h-auto w-[min(50vw,48rem)] select-none object-contain drop-shadow-[0_1.35rem_3rem_rgb(15_23_42/0.12)]"
          draggable={false}
          src="/assets/brand/onepws-logo-black.png"
        />
      </motion.div>
      <motion.p
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-[18vh] text-center text-[0.9rem] font-semibold uppercase tracking-[0.42em] text-slate-500"
        initial={{ opacity: 0, y: 10 }}
        transition={{ duration: 1.1, ease, delay: 1.05 }}
      >
        One Environment. Connected Intelligence.
      </motion.p>
    </article>
  );
}
