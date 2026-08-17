import { useMemo, useState } from "react";
import { glossary } from "@/lib/cosmology";

const filters = ["All", "Sanskrit", "Pāli", "Mahāyāna", "Theravāda", "Vajrayāna"];

export function Glossary() {
  const [q, setQ] = useState("");
  const [f, setF] = useState("All");

  const items = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return glossary.filter((g) => {
      const matchQ =
        !needle ||
        g.term.toLowerCase().includes(needle) ||
        g.def.toLowerCase().includes(needle) ||
        g.script.includes(needle);
      const matchF =
        f === "All" ||
        g.lang.toLowerCase().includes(f.toLowerCase()) ||
        g.tradition.toLowerCase().includes(f.toLowerCase());
      return matchQ && matchF;
    });
  }, [q, f]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search terms…"
          aria-label="Search glossary"
          className="w-full max-w-xs rounded-full border border-input bg-transparent px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <div className="flex flex-wrap gap-2">
          {filters.map((x) => (
            <button
              key={x}
              onClick={() => setF(x)}
              aria-pressed={f === x}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                f === x ? "border-primary text-primary" : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {x}
            </button>
          ))}
        </div>
      </div>

      <dl className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((g) => (
          <div key={g.term} className="glass rounded-xl p-5">
            <dt className="flex items-baseline justify-between gap-3">
              <span className="text-xl">{g.term}</span>
              <span className="sanskrit text-lg">{g.script}</span>
            </dt>
            <dd className="mt-2 text-sm text-muted-foreground">{g.def}</dd>
            <dd className="mt-3 text-[0.68rem] tracking-widest uppercase text-muted-foreground/80">
              {g.lang} · {g.tradition}
            </dd>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-muted-foreground">No terms match that search.</p>}
      </dl>
    </div>
  );
}
