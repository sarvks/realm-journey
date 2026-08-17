import { useEffect, useRef } from "react";
import { useJourney } from "./JourneyContext";

type Mode = "stars" | "embers" | "snow" | "dust" | "motes";

interface Props {
  mode?: Mode;
  density?: number;
  className?: string;
}

/** GPU-light canvas particle field. Counts scale with device quality. */
export function CosmicParticles({ mode = "stars", density = 1, className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const { reduced, quality, meditating } = useJourney();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, quality === "lite" ? 1.25 : 2);
    let w = 0;
    let h = 0;

    const base = quality === "lite" ? 34 : quality === "standard" ? 70 : 110;
    const count = Math.round(base * density);

    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number; t: number };
    let ps: P[] = [];

    const seed = () => {
      ps = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * (mode === "stars" ? 1.4 : 2.4) + 0.3,
        vx: (Math.random() - 0.5) * (mode === "snow" ? 0.25 : 0.12),
        vy:
          mode === "embers"
            ? -(Math.random() * 0.5 + 0.15)
            : mode === "snow"
              ? Math.random() * 0.35 + 0.08
              : (Math.random() - 0.5) * 0.08,
        a: Math.random() * 0.6 + 0.2,
        t: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const color = getComputedStyle(canvas).getPropertyValue("color") || "#fff";
    let raf = 0;
    const slow = reduced || meditating ? 0.25 : 1;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.t += 0.01 * slow;
        p.x += p.vx * slow;
        p.y += p.vy * slow;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        const twinkle = mode === "stars" ? 0.5 + 0.5 * Math.sin(p.t * 2) : 1;
        ctx.globalAlpha = p.a * twinkle * (meditating ? 0.5 : 1);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    if (reduced) {
      draw();
      cancelAnimationFrame(raf);
      // static single frame
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        ctx.globalAlpha = p.a;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [mode, density, reduced, quality, meditating]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={className ?? "pointer-events-none absolute inset-0 h-full w-full text-realm opacity-70"}
    />
  );
}
