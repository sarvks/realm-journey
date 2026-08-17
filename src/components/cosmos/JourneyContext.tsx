import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { RealmId } from "@/lib/cosmology";

interface JourneyState {
  meditating: boolean;
  toggleMeditation: () => void;
  sound: boolean;
  toggleSound: () => void;
  active: RealmId | "intro";
  setActive: (id: RealmId | "intro") => void;
  reduced: boolean;
  quality: "cinematic" | "standard" | "lite";
}

const Ctx = createContext<JourneyState | null>(null);

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [meditating, setMeditating] = useState(false);
  const [sound, setSound] = useState(false);
  const [active, setActive] = useState<RealmId | "intro">("intro");
  const [reduced, setReduced] = useState(false);
  const [quality, setQuality] = useState<"cinematic" | "standard" | "lite">("standard");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);

    const w = window.innerWidth;
    const cores = navigator.hardwareConcurrency ?? 4;
    setQuality(w < 780 || cores <= 4 ? "lite" : w > 1400 && cores >= 8 ? "cinematic" : "standard");

    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("meditating", meditating);
  }, [meditating]);

  const value = useMemo(
    () => ({
      meditating,
      toggleMeditation: () => setMeditating((m) => !m),
      sound,
      toggleSound: () => setSound((s) => !s),
      active,
      setActive,
      reduced,
      quality,
    }),
    [meditating, sound, active, reduced, quality],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useJourney() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useJourney must be used inside JourneyProvider");
  return ctx;
}
