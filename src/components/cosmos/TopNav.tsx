import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useJourney } from "./JourneyContext";

const links = [
  { id: "cosmos", label: "Cosmos" },
  { id: "naraka", label: "Realms" },
  { id: "wheel", label: "Wheel of Life" },
  { id: "teachings", label: "Teachings" },
  { id: "traditions", label: "Traditions" },
  { id: "glossary", label: "Glossary" },
  { id: "sources", label: "Sources" },
];

export function TopNav() {
  const { meditating, toggleMeditation, sound, toggleSound } = useJourney();
  const [scrolled, setScrolled] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpenMobile(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: meditating ? 0 : 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled ? "glass" : "bg-transparent"
      } ${meditating ? "pointer-events-none" : ""}`}
    >
      <nav className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-3">
        <button onClick={() => go("top")} className="display text-base tracking-wide">
          The Worlds of Buddhism
        </button>

        <ul className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className="text-xs tracking-[0.16em] uppercase text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            aria-pressed={sound}
            aria-label={sound ? "Mute ambient sound" : "Enable ambient sound"}
            className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Sound {sound ? "♫" : "♪̸"}
          </button>
          <button
            onClick={toggleMeditation}
            aria-pressed={meditating}
            className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Meditation ◯
          </button>
          <button
            onClick={() => setOpenMobile((o) => !o)}
            aria-label="Open menu"
            aria-expanded={openMobile}
            className="rounded-full border border-border px-3 py-1.5 text-xs md:hidden"
          >
            ☰
          </button>
        </div>
      </nav>

      {openMobile && (
        <ul className="glass grid gap-1 px-5 pb-4 md:hidden">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className="w-full py-2 text-left text-sm tracking-wide text-muted-foreground"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </motion.header>
  );
}
