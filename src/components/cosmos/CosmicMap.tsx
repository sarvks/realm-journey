import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { mapNodes } from "@/lib/cosmology";
import { useJourney } from "./JourneyContext";

export function CosmicMap() {
  const { active, meditating } = useJourney();
  const [open, setOpen] = useState(true);
  const dissolved = active === "nirvana" || meditating;

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {!dissolved && (
        <motion.nav
          aria-label="Cosmic map"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
        >
          <button
            onClick={() => setOpen((o) => !o)}
            className="eyebrow mb-3 block w-full text-right hover:text-foreground"
            aria-expanded={open}
          >
            Cosmic Map {open ? "◉" : "◎"}
          </button>
          {open && (
            <ol className="relative flex flex-col items-end gap-3 pr-4">
              <span
                aria-hidden
                className="absolute right-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent"
              />
              {mapNodes.map((n) => {
                const on = active === n.id;
                return (
                  <li key={n.id}>
                    <button
                      onClick={() => go(n.id)}
                      className="group flex items-center gap-3 text-right"
                      aria-current={on ? "true" : undefined}
                    >
                      <span
                        className={`text-[0.62rem] tracking-[0.2em] transition-all duration-500 ${
                          on
                            ? "text-primary opacity-100"
                            : "text-muted-foreground opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        {n.label}
                      </span>
                      <span
                        className={`relative block size-[7px] rounded-full transition-all duration-700 ${
                          on ? "scale-150 bg-primary" : "bg-foreground/35 group-hover:bg-foreground/70"
                        }`}
                      >
                        {on && (
                          <span className="absolute -inset-2 animate-glow rounded-full bg-primary/30 blur-[6px]" />
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          )}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
