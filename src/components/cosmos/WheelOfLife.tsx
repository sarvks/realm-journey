import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { realms, poisons, nidanas } from "@/lib/cosmology";
import { useJourney } from "./JourneyContext";

const order = ["deva", "asura", "human", "animal", "preta", "naraka"] as const;

function polar(cx: number, cy: number, r: number, deg: number) {
  const a = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
}

function segment(cx: number, cy: number, r0: number, r1: number, a0: number, a1: number) {
  const [x0, y0] = polar(cx, cy, r1, a0);
  const [x1, y1] = polar(cx, cy, r1, a1);
  const [x2, y2] = polar(cx, cy, r0, a1);
  const [x3, y3] = polar(cx, cy, r0, a0);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M${x0} ${y0} A${r1} ${r1} 0 ${large} 1 ${x1} ${y1} L${x2} ${y2} A${r0} ${r0} 0 ${large} 0 ${x3} ${y3} Z`;
}

export function WheelOfLife() {
  const { reduced } = useJourney();
  const [hover, setHover] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>("human");
  const [link, setLink] = useState<number | null>(null);
  const [scholar, setScholar] = useState(false);

  const realmInfo = realms.find((r) => r.id === selected);
  const nid = nidanas.find((n) => n.n === link);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="relative mx-auto w-full max-w-[38rem]">
        <svg viewBox="0 0 400 400" className="w-full" role="img" aria-label="Interactive Wheel of Becoming">
          <defs>
            <radialGradient id="hubGlow">
              <stop offset="0%" stopColor="var(--saffron)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--saffron)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* outer rim: twelve links */}
          <g className={reduced ? "" : "animate-spin-slow"} style={{ transformOrigin: "200px 200px" }}>
            {nidanas.map((n, i) => {
              const a0 = (i * 360) / 12;
              const a1 = a0 + 360 / 12 - 1.2;
              return (
                <path
                  key={n.n}
                  d={segment(200, 200, 158, 186, a0, a1)}
                  fill={link === n.n ? "var(--saffron)" : "color-mix(in oklab, var(--lapis) 45%, transparent)"}
                  opacity={link === n.n ? 0.85 : 0.5}
                  stroke="color-mix(in oklab, var(--foreground) 18%, transparent)"
                  strokeWidth="0.5"
                  onMouseEnter={() => setLink(n.n)}
                  onFocus={() => setLink(n.n)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Link ${n.n}: ${n.en}`}
                  className="cursor-pointer outline-none transition-opacity duration-500"
                />
              );
            })}
          </g>

          {/* six realms */}
          {order.map((id, i) => {
            const a0 = (i * 360) / 6;
            const a1 = a0 + 60 - 1;
            const on = hover === id || selected === id;
            const [lx, ly] = polar(200, 200, 116, a0 + 30);
            return (
              <g key={id}>
                <path
                  d={segment(200, 200, 66, 152, a0, a1)}
                  fill={on ? "color-mix(in oklab, var(--saffron) 32%, transparent)" : "color-mix(in oklab, var(--ink) 70%, transparent)"}
                  stroke="color-mix(in oklab, var(--foreground) 22%, transparent)"
                  strokeWidth="0.7"
                  className="cursor-pointer transition-all duration-500"
                  onMouseEnter={() => setHover(id)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => setSelected(id)}
                  tabIndex={0}
                  role="button"
                  aria-label={realms.find((r) => r.id === id)?.label}
                  onKeyDown={(e) => e.key === "Enter" && setSelected(id)}
                />
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  className="pointer-events-none select-none"
                  fill="var(--foreground)"
                  fontSize="9"
                  letterSpacing="1.6"
                  opacity={on ? 1 : 0.62}
                >
                  {realms.find((r) => r.id === id)?.label.toUpperCase()}
                </text>
              </g>
            );
          })}

          {/* hub: three poisons */}
          <circle cx="200" cy="200" r="62" fill="url(#hubGlow)" opacity="0.5" />
          <circle cx="200" cy="200" r="52" fill="color-mix(in oklab, var(--ink) 85%, transparent)" stroke="var(--saffron)" strokeOpacity="0.5" />
          {poisons.map((p, i) => {
            const [px, py] = polar(200, 200, 26, i * 120 + 30);
            return (
              <g key={p.id}>
                <circle
                  cx={px}
                  cy={py}
                  r="17"
                  fill={hover === p.id ? "var(--vermilion)" : "color-mix(in oklab, var(--vermilion) 45%, transparent)"}
                  className="cursor-pointer transition-all duration-500"
                  onMouseEnter={() => setHover(p.id)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => setSelected(p.id)}
                  tabIndex={0}
                  role="button"
                  aria-label={p.label}
                  onKeyDown={(e) => e.key === "Enter" && setSelected(p.id)}
                />
                <text x={px} y={py + 3} textAnchor="middle" fontSize="7" fill="var(--foreground)" className="pointer-events-none">
                  {p.label.split(" ")[0]}
                </text>
              </g>
            );
          })}
        </svg>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Hover or focus any ring: hub (three poisons), six realms, outer rim (twelve links).
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="eyebrow">Explanation</p>
          <button
            onClick={() => setScholar((s) => !s)}
            aria-pressed={scholar}
            className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:text-foreground"
          >
            Scholar mode {scholar ? "on" : "off"}
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${selected}-${link}-${scholar}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
            className="glass space-y-4 rounded-xl p-6"
          >
            {realmInfo && (
              <div>
                <h3 className="text-2xl">{realmInfo.label}</h3>
                <p className="sanskrit text-lg">{realmInfo.script}</p>
                <p className="mt-2 text-sm text-muted-foreground">{realmInfo.summary}</p>
                {scholar && <p className="mt-3 text-sm text-muted-foreground">{realmInfo.cosmological}</p>}
                <p className="mt-3 text-xs text-muted-foreground">Source: {realmInfo.source}</p>
              </div>
            )}
            {poisons.find((p) => p.id === selected) && (
              <div>
                {(() => {
                  const p = poisons.find((x) => x.id === selected)!;
                  return (
                    <>
                      <h3 className="text-2xl">{p.label}</h3>
                      <p className="sanskrit text-lg">{p.sanskrit}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
                      {scholar && <p className="mt-2 text-xs text-muted-foreground">{p.animal}</p>}
                    </>
                  );
                })()}
              </div>
            )}
            {nid && (
              <div className="border-t border-border pt-4">
                <p className="eyebrow mb-1">Link {nid.n} of 12</p>
                <h4 className="text-xl">{nid.en}</h4>
                <p className="sanskrit text-sm">
                  {nid.pali} · {nid.sanskrit}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{scholar ? nid.deep : nid.plain}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
