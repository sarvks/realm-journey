import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { CosmicParticles } from "./CosmicParticles";
import { useJourney } from "./JourneyContext";

interface Props {
  id: string;
  palette: string;
  particles?: "stars" | "embers" | "snow" | "dust" | "motes";
  density?: number;
  children: ReactNode;
  layers?: ReactNode;
  className?: string;
}

/**
 * A realm scene: scroll-linked atmosphere, parallax fog, particle field.
 * Sections crossfade into one another rather than cutting.
 */
export function RealmScene({ id, palette, particles = "stars", density = 1, children, layers, className }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { reduced } = useJourney();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const fade = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0]);
  const fogY = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["12%", "-12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1.12, 1]);

  return (
    <section
      id={id}
      ref={ref}
      className={`relative isolate overflow-hidden ${palette} ${className ?? "min-h-screen"}`}
    >
      <motion.div style={{ opacity: fade, scale }} className="pointer-events-none absolute inset-0 atmosphere" />
      <motion.div style={{ y: fogY }} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(70%_60%_at_50%_100%,color-mix(in_oklab,var(--realm-a)_28%,transparent),transparent_70%)] animate-drift" />
      </motion.div>
      <CosmicParticles mode={particles} density={density} />
      {layers}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      <div className="relative z-10">{children}</div>
    </section>
  );
}

export function RealmTitle({
  eyebrow,
  title,
  script,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  script?: string;
  subtitle?: string;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-3xl"
    >
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="text-5xl leading-[1.05] sm:text-7xl">{title}</h2>
      {script && <p className="sanskrit mt-3 text-3xl">{script}</p>}
      {subtitle && <p className="mt-4 text-lg text-muted-foreground sm:text-xl">{subtitle}</p>}
    </motion.header>
  );
}

export function Card({
  children,
  source,
  className,
}: {
  children: ReactNode;
  source?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`glass hide-in-meditation rounded-xl p-6 ${className ?? ""}`}
    >
      {children}
      {source && (
        <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">Source: {source}</p>
      )}
    </motion.div>
  );
}
