import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const stages = [
  { label: "Birth", text: "Arriving without choosing. Traditional texts treat birth itself as the entry point of the whole mass of suffering — and of the opportunity." },
  { label: "Childhood", text: "Conditioning begins: preference, aversion, and the first sense of a continuous self." },
  { label: "Youth", text: "Strength and appetite. Texts describe this as when urgency is easiest to postpone." },
  { label: "Adulthood", text: "Work, relationship, responsibility. Ethical action (śīla) here shapes what follows." },
  { label: "Ageing", text: "One of the divine messengers: a visible reminder that conditions do not hold." },
  { label: "Death", text: "Not the end of the process in classical Buddhist thought, but a transition within it." },
  { label: "?", text: "What continues? Traditions answer differently — a stream of conditions, not an unchanging self." },
];

export function HumanTimeline() {
  const [i, setI] = useState(0);
  const s = stages[i]!;

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex flex-wrap items-center gap-2">
        {stages.map((st, idx) => (
          <button
            key={st.label}
            onClick={() => setI(idx)}
            aria-pressed={i === idx}
            className={`rounded-full border px-3 py-1.5 text-xs transition-all duration-500 ${
              i === idx ? "border-primary text-primary" : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {st.label}
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-end gap-6">
        <svg viewBox="0 0 60 90" className="h-28 shrink-0" aria-hidden>
          <motion.g
            animate={{
              scale: 0.55 + i * 0.08,
              opacity: i >= 6 ? 0.15 : i === 5 ? 0.4 : 1,
              y: i >= 4 ? 6 : 0,
            }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "30px 88px" }}
          >
            <circle cx="30" cy="18" r="9" fill="var(--saffron)" opacity="0.8" />
            <path d="M30 28 L30 62 M30 36 L14 50 M30 36 L46 50 M30 62 L18 88 M30 62 L42 88" stroke="var(--saffron)" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.75" />
          </motion.g>
        </svg>
        <AnimatePresence mode="wait">
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6 }}
          >
            <h4 className="text-2xl">{s.label}</h4>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">{s.text}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
