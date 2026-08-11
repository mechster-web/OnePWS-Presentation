import { motion } from "framer-motion";

export function LogoFinaleChapter() {
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <article className="relative grid h-full w-full place-items-center overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgb(239_68_68/0.08),transparent_32%),linear-gradient(116deg,#ffffff_0%,#fbfcfd_56%,#eef3f7_100%)]" />
      <motion.div
        animate={{
          opacity: [0, 1, 1],
          scale: [0.82, 1.04, 1],
          filter: ["blur(14px)", "blur(0px)", "blur(0px)"],
        }}
        className="relative"
        initial={false}
        transition={{ duration: 1.55, ease, times: [0, 0.72, 1] }}
      >
        <motion.div
          animate={{
            opacity: [0, 0.9, 0.36],
            scale: [0.82, 1.08, 1.18],
          }}
          className="absolute inset-[-18%] rounded-full bg-control-warm/10 blur-[42px]"
          initial={false}
          transition={{ duration: 2.8, ease, repeat: Infinity, repeatType: "mirror" }}
        />
        <motion.div
          animate={{ x: ["-120%", "120%"], opacity: [0, 0.95, 0] }}
          className="pointer-events-none absolute inset-y-[-35%] left-0 w-[32%] rotate-12 bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.9),transparent)] blur-sm"
          initial={false}
          transition={{ duration: 2.6, delay: 1.05, ease, repeat: Infinity, repeatDelay: 3.4 }}
        />
        <img
          alt="OnePWS"
          className="relative h-auto w-[min(48vw,46rem)] select-none object-contain drop-shadow-[0_1.4rem_3.2rem_rgb(15_23_42/0.14)]"
          draggable={false}
          src="/assets/brand/onepws-logo-black.png"
        />
      </motion.div>
    </article>
  );
}
