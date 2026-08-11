import { motion } from "framer-motion";

export function LoadingScreen() {
  return (
    <main className="grid min-h-dvh place-items-center overflow-hidden bg-control-black text-control-text">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(207,31,43,0.10),transparent_32%)]" />
      <section className="relative w-[min(720px,86vw)]">
        <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-control-warm/70 to-transparent" />
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 14 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-[0.42em] text-control-warm">OnePWS Private Limited</p>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-normal md:text-6xl">
            Initialising control-room experience
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-control-muted md:text-base">
            Preparing the OnePWS control-room experience.
          </p>
        </motion.div>
        <div className="mt-10 h-1 w-full overflow-hidden bg-control-line">
          <motion.div
            animate={{ x: ["-100%", "0%"] }}
            className="h-full w-full bg-control-warm"
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </section>
    </main>
  );
}
