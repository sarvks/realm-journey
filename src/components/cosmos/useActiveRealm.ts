import { useEffect } from "react";
import { useJourney } from "./JourneyContext";
import type { RealmId } from "@/lib/cosmology";

const ids: (RealmId | "intro")[] = [
  "naraka",
  "preta",
  "animal",
  "human",
  "asura",
  "deva",
  "meru",
  "kama",
  "rupa",
  "arupa",
  "nirvana",
];

export function useActiveRealm() {
  const { setActive } = useJourney();
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((e): e is HTMLElement => Boolean(e));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id as RealmId);
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-20% 0px -20% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [setActive]);
}
