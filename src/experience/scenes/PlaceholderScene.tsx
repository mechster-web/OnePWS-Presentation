import { motion } from "framer-motion";
import type { SceneComponentProps } from "./SceneTypes";

export function PlaceholderScene({ chapter }: SceneComponentProps) {
  return (
    <article className="relative h-full w-full overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,#ffffff_0%,#eef2f5_52%,#ffffff_100%)]" />
      <div className="absolute inset-0 control-grid opacity-25" />
      <section className="absolute scene-content-safe grid items-center">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[48rem]"
          initial={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.42 }}
        >
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-control-warm">
            {chapter.sceneType}
          </p>
          <h1 className="scene-title mt-6 max-w-[13ch] text-balance">{chapter.headline}</h1>
          <p className="scene-support mt-7 max-w-3xl">{chapter.supportingMessage}</p>
        </motion.div>
      </section>
    </article>
  );
}
