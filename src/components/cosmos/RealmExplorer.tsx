import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { realms, type RealmId } from "@/lib/cosmology";

const extra: Record<string, { label: string; sanskrit: string; script: string; summary: string; cosmological: string; philosophical: string; traditions: string; related: string; source: string; mentalState: string }> = {
  rupa: {
    label: "Form Realms",
    sanskrit: "Rūpadhātu",
    script: "रूपधातु",
    summary: "Brahmā worlds of refined materiality, correlated with the four dhyānas.",
    cosmological: "Sixteen or seventeen heavens depending on the school, including the five Pure Abodes (Śuddhāvāsa) where non-returners are said to complete the path.",
    philosophical: "Cosmology and meditation converge: the map of worlds doubles as a map of attainable states of consciousness.",
    traditions: "Enumerations differ between Theravāda Abhidhamma and Sarvāstivāda Abhidharma.",
    related: "Jhāna, dhyāna, the Pure Abodes",
    mentalState: "Absorbed, luminous, still",
    source: "Visuddhimagga IV–X; Abhidharmakośa III",
  },
  arupa: {
    label: "Formless Realms",
    sanskrit: "Arūpadhātu",
    script: "अरूपधातु",
    summary: "Four attainments without materiality: infinite space, infinite consciousness, nothingness, neither perception nor non-perception.",
    cosmological: "Lifespans described in tens of thousands of aeons; no location, since there is no form to be located.",
    philosophical: "The Buddha's own teachers are said to have taught the last two; the biography makes the point that these attainments, however refined, are not liberation.",
    traditions: "Shared across traditions with consistent enumeration.",
    related: "Ariyapariyesanā Sutta, samādhi, cessation",
    mentalState: "Subtle, spacious, nearly featureless",
    source: "MN 26, Ariyapariyesanā Sutta; Abhidharmakośa VIII",
  },
  nirvana: {
    label: "Nirvāṇa",
    sanskrit: "Nirvāṇa / Nibbāna",
    script: "निर्वाण",
    summary: "Not a realm. The extinguishing of craving, aversion and ignorance; the end of the cycle.",
    cosmological: "Deliberately outside the cosmological hierarchy — traditions resist locating it anywhere on the map.",
    philosophical: "Described mostly by negation: unborn, unmade, unconditioned. Mahāyāna adds the non-abiding nirvāṇa of the bodhisattva, who neither remains in Saṃsāra by compulsion nor withdraws from it.",
    traditions: "Universal, with substantial doctrinal differences in interpretation.",
    related: "Cessation (nirodha), the third noble truth, awakening",
    mentalState: "Freedom; the absence of compulsion",
    source: "Udāna 8.3; Nāgārjuna, Mūlamadhyamakakārikā 25",
  },
};

const nodes: { id: string; label: string; note?: string }[] = [
  { id: "nirvana", label: "NIRVĀṆA", note: "Not represented as a conventional realm" },
  { id: "arupa", label: "FORMLESS REALMS" },
  { id: "rupa", label: "FORM REALMS" },
  { id: "deva", label: "DEVA WORLDS" },
  { id: "asura", label: "ASURA" },
  { id: "human", label: "HUMAN" },
  { id: "animal", label: "ANIMAL" },
  { id: "preta", label: "PRETA" },
  { id: "naraka", label: "NARAKA" },
];

export function RealmExplorer() {
  const [sel, setSel] = useState<string | null>("human");
  const data = sel
    ? (extra[sel] ?? {
        ...realms.find((r) => r.id === (sel as RealmId))!,
      })
    : null;

  return (
    <div className="grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)]">
      <ol className="relative mx-auto flex w-full max-w-xs flex-col gap-4">
        <span aria-hidden className="absolute left-[9px] top-3 bottom-3 w-px bg-gradient-to-b from-primary/10 via-primary/40 to-primary/10" />
        {nodes.map((n) => {
          const on = sel === n.id;
          return (
            <li key={n.id}>
              <button
                onClick={() => setSel(n.id)}
                aria-pressed={on}
                className="group flex w-full items-center gap-4 text-left"
              >
                <span
                  className={`relative block size-[19px] shrink-0 rounded-full border transition-all duration-500 ${
                    on ? "border-primary bg-primary/30" : "border-border bg-background group-hover:border-primary/60"
                  }`}
                >
                  {on && <span className="absolute -inset-1.5 animate-glow rounded-full bg-primary/25 blur-md" />}
                </span>
                <span className={`text-xs tracking-[0.2em] ${on ? "text-foreground" : "text-muted-foreground"}`}>
                  {n.label}
                  {n.note && <span className="block text-[0.62rem] tracking-normal opacity-70">{n.note}</span>}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <AnimatePresence mode="wait">
        {data && (
          <motion.article
            key={sel}
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="glass rounded-2xl p-8"
          >
            <h3 className="text-4xl">{data.label}</h3>
            <p className="sanskrit mt-1 text-2xl">{data.script}</p>
            <p className="eyebrow mt-1">{data.sanskrit}</p>
            <p className="mt-5 text-base text-muted-foreground">{data.summary}</p>
            <dl className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <dt className="eyebrow mb-1">Associated mental condition</dt>
                <dd className="text-sm">{data.mentalState}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-1">Relevant traditions</dt>
                <dd className="text-sm">{data.traditions}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-1">Cosmological interpretation</dt>
                <dd className="text-sm text-muted-foreground">{data.cosmological}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-1">Philosophical interpretation</dt>
                <dd className="text-sm text-muted-foreground">{data.philosophical}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-1">Related teachings</dt>
                <dd className="text-sm text-muted-foreground">{data.related}</dd>
              </div>
              <div>
                <dt className="eyebrow mb-1">Source</dt>
                <dd className="text-sm text-muted-foreground">{data.source}</dd>
              </div>
            </dl>
          </motion.article>
        )}
      </AnimatePresence>
    </div>
  );
}
