import { sources } from "@/lib/cosmology";

export function Sources() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {sources.map((g) => (
        <section key={g.group} className="glass rounded-xl p-6">
          <h3 className="text-xl">{g.group}</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {g.items.map((it) => (
              <li key={it} className="border-l border-border pl-3">
                {it}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
