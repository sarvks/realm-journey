import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const layers = [
  { id: "arupa", label: "Formless Realms", y: 44, w: 120, note: "Four attainments beyond materiality — shown here only as a boundary of the diagram." },
  { id: "rupa", label: "Form Realms (Brahmā worlds)", y: 84, w: 170, note: "Correlated with the four dhyānas; refined materiality." },
  { id: "heavens", label: "Higher desire heavens", y: 124, w: 210, note: "Yāma, Tuṣita, Nirmāṇarati, Paranirmitavaśavartin — described as floating above Meru's summit." },
  { id: "summit", label: "Trāyastriṃśa — the Heaven of Thirty-Three", y: 168, w: 130, note: "At Meru's summit, ruled by Śakra; the assembly of thirty-three devas." },
  { id: "slopes", label: "Cāturmahārājika & asura domains", y: 216, w: 190, note: "The Four Great Kings on Meru's terraces; asuras traditionally below, contesting the summit." },
  { id: "continents", label: "Four continents & the great ocean", y: 268, w: 300, note: "Jambudvīpa (south) is the human continent, alongside Pūrvavideha, Aparagodānīya and Uttarakuru." },
  { id: "lower", label: "Preta, animal and Naraka realms", y: 312, w: 240, note: "Described below and within the earth beneath Jambudvīpa." },
];

export function MountMeru() {
  const [rot, setRot] = useState(18);
  const [zoom, setZoom] = useState(1);
  const [sel, setSel] = useState<string>("continents");
  const [mode, setMode] = useState<"traditional" | "symbolic">("traditional");
  const active = layers.find((l) => l.id === sel)!;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_20rem]">
      <div className="relative">
        <div className="overflow-hidden rounded-2xl border border-border bg-[radial-gradient(80%_60%_at_50%_30%,color-mix(in_oklab,var(--realm-a)_22%,transparent),transparent_70%)]">
          <motion.svg
            viewBox="0 0 400 360"
            className="w-full"
            role="img"
            aria-label="Mount Meru cosmological diagram"
            animate={{ rotateY: rot, scale: zoom }}
            transition={{ type: "spring", stiffness: 60, damping: 18 }}
            style={{ transformPerspective: 900 }}
          >
            {layers.map((l) => {
              const on = sel === l.id;
              return (
                <g
                  key={l.id}
                  onClick={() => setSel(l.id)}
                  tabIndex={0}
                  role="button"
                  aria-label={l.label}
                  onKeyDown={(e) => e.key === "Enter" && setSel(l.id)}
                  className="cursor-pointer outline-none"
                >
                  <ellipse
                    cx="200"
                    cy={l.y}
                    rx={l.w / 2}
                    ry={l.w / 11}
                    fill={on ? "color-mix(in oklab, var(--saffron) 30%, transparent)" : "color-mix(in oklab, var(--lapis) 22%, transparent)"}
                    stroke={on ? "var(--saffron)" : "color-mix(in oklab, var(--foreground) 25%, transparent)"}
                    strokeWidth="0.8"
                    className="transition-all duration-700"
                  />
                  <text x={200 + l.w / 2 + 10} y={l.y + 3} fontSize="8" fill="var(--foreground)" opacity={on ? 1 : 0.5}>
                    {l.label}
                  </text>
                </g>
              );
            })}
            {/* the mountain */}
            <path
              d="M170 300 L152 190 L200 150 L248 190 L230 300 Z"
              fill="color-mix(in oklab, var(--saffron) 18%, transparent)"
              stroke="var(--saffron)"
              strokeOpacity="0.6"
            />
            <line x1="200" y1="30" x2="200" y2="330" stroke="var(--saffron)" strokeOpacity="0.25" strokeDasharray="3 6" />
          </motion.svg>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
          <label className="flex items-center gap-2 text-muted-foreground">
            Rotate
            <input
              type="range"
              min={-45}
              max={45}
              value={rot}
              onChange={(e) => setRot(Number(e.target.value))}
              className="w-32 accent-[var(--saffron)]"
              aria-label="Rotate diagram"
            />
          </label>
          <label className="flex items-center gap-2 text-muted-foreground">
            Zoom
            <input
              type="range"
              min={0.8}
              max={1.6}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-32 accent-[var(--saffron)]"
              aria-label="Zoom diagram"
            />
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <div className="inline-flex rounded-full border border-border p-1 text-xs">
          {(["traditional", "symbolic"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={`rounded-full px-3 py-1.5 transition-colors ${
                mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {m === "traditional" ? "Traditional Cosmology" : "Symbolic Interpretation"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={sel + mode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6 }}
            className="glass rounded-xl p-6"
          >
            <h3 className="text-xl">{active.label}</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              {mode === "traditional"
                ? active.note
                : "Read symbolically, this level describes a configuration of mind rather than a location: the Meru diagram becomes a map of states available to any practitioner. Many teachers hold both readings simultaneously; neither is presented here as replacing the other."}
            </p>
            <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
              Source: Vasubandhu, Abhidharmakośabhāṣya III; Tibetan lam-rim commentaries. The Kālacakra tradition
              describes a different model.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
