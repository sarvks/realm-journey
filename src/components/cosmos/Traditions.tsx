import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { traditionsData } from "@/lib/cosmology";

export function Traditions() {
  const [tab, setTab] = useState(traditionsData[0]!.id);
  const current = traditionsData.find((t) => t.id === tab) ?? traditionsData[0]!;


  return (
    <div>
      <div role="tablist" aria-label="Buddhist traditions" className="flex flex-wrap gap-2">
        {traditionsData.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full border px-4 py-2 text-xs tracking-[0.14em] uppercase transition-colors ${
              tab === t.id
                ? "border-primary bg-primary/15 text-foreground"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          role="tabpanel"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass mt-6 rounded-2xl p-8"
        >
          <h3 className="text-3xl">{current.label}</h3>
          <p className="mt-4 max-w-3xl text-base text-muted-foreground">{current.text}</p>
          <p className="mt-5 border-l-2 border-primary/50 pl-4 text-sm">
            <span className="eyebrow mr-2">Where it differs</span>
            {current.differs}
          </p>
        </motion.div>
      </AnimatePresence>
      <p className="mt-6 max-w-2xl text-xs text-muted-foreground">
        Buddhism has no single agreed cosmological map. These summaries describe emphases within broad traditions,
        and individual schools and teachers vary further.
      </p>
    </div>
  );
}
