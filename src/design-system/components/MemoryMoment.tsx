import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePresentation } from "../../state/PresentationProvider";

export function MemoryMoment({
  children,
  active = false,
  holdMs = 900,
  lockInteraction = false,
}: {
  children: ReactNode;
  active?: boolean;
  holdMs?: number;
  lockInteraction?: boolean;
}) {
  const { state } = usePresentation();
  const duration = state.reducedMotion ? 0.01 : Math.min(1.2, holdMs / 1000);

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      className={lockInteraction ? "pointer-events-none" : ""}
      data-memory-moment={active ? "active" : "inactive"}
      initial={active ? { opacity: 0, scale: 1.018 } : false}
      transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
