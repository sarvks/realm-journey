import { AnimatePresence, motion } from "motion/react";
import { useJourney } from "./JourneyContext";

export function MeditationOverlay() {
  const { meditating, toggleMeditation } = useJourney();
  return (
    <AnimatePresence>
      {meditating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4 }}
          className="pointer-events-none fixed inset-0 z-[60] flex flex-col items-center justify-end pb-16"
        >
          <div className="relative mb-8 size-24">
            <span className="absolute inset-0 animate-breathe rounded-full border border-primary/60" />
            <span className="absolute inset-0 animate-breathe rounded-full bg-primary/10 blur-xl" />
          </div>
          <p className="eyebrow mb-4">Breathe</p>
          <button
            onClick={toggleMeditation}
            className="pointer-events-auto rounded-full border border-border px-4 py-2 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground"
          >
            Leave meditation
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
