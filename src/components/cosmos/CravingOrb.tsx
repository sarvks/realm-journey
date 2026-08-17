import { useRef, useState } from "react";
import { useJourney } from "./JourneyContext";

/** A light that recedes as the cursor approaches it. */
export function CravingOrb() {
  const box = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const { reduced } = useJourney();

  const move = (cx: number, cy: number) => {
    const el = box.current;
    if (!el || reduced) return;
    const r = el.getBoundingClientRect();
    const px = ((cx - r.left) / r.width) * 100;
    const py = ((cy - r.top) / r.height) * 100;
    const dx = pos.x - px;
    const dy = pos.y - py;
    const dist = Math.hypot(dx, dy);
    if (dist < 34) {
      const k = (34 - dist) / 34;
      setPos({
        x: Math.min(92, Math.max(8, pos.x + (dx / (dist || 1)) * 26 * k)),
        y: Math.min(86, Math.max(14, pos.y + (dy / (dist || 1)) * 20 * k)),
      });
    }
  };

  return (
    <figure
      ref={box}
      onMouseMove={(e) => move(e.clientX, e.clientY)}
      onTouchMove={(e) => e.touches[0] && move(e.touches[0].clientX, e.touches[0].clientY)}
      className="relative h-72 w-full overflow-hidden rounded-2xl border border-border bg-[radial-gradient(90%_70%_at_50%_100%,color-mix(in_oklab,var(--realm-a)_18%,transparent),transparent_70%)]"
    >
      <span
        aria-hidden
        style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
        className="absolute size-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_60px_18px_color-mix(in_oklab,var(--saffron)_45%,transparent)] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
      />
      <figcaption className="absolute inset-x-0 bottom-0 p-5 text-sm text-muted-foreground">
        Craving promises arrival while continually moving the destination.
        {reduced && <span className="block text-xs">(Motion reduced: the light remains still.)</span>}
      </figcaption>
    </figure>
  );
}
