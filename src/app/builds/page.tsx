import { matchups } from "@/data/matchups";

export default function BuildsPage() {
  const uniqueBuilds = new Map<
    string,
    { name: string; description: string; champions: string[] }
  >();

  for (const m of matchups) {
    const build = m.recommendedBuild;
    const existing = uniqueBuilds.get(build.name);
    if (existing) {
      existing.champions.push(m.champion);
    } else {
      uniqueBuilds.set(build.name, {
        name: build.name,
        description: build.description,
        champions: [m.champion],
      });
    }
  }

  const uniqueRunes = new Map<
    string,
    {
      keystone: string;
      primaryTree: string;
      secondaryTree: string;
      champions: string[];
    }
  >();

  for (const m of matchups) {
    const runes = m.recommendedRunes;
    const existing = uniqueRunes.get(runes.keystone);
    if (existing) {
      existing.champions.push(m.champion);
    } else {
      uniqueRunes.set(runes.keystone, {
        keystone: runes.keystone,
        primaryTree: runes.primaryTree,
        secondaryTree: runes.secondaryTree,
        champions: [m.champion],
      });
    }
  }

  return (
    <main className="mx-auto max-w-6xl flex-1 px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-zinc-100">Build Optimizer</h1>
        <p className="mt-2 text-zinc-400">
          Sett build paths and rune pages organized by matchup type. Pick the
          right setup for every game.
        </p>
      </div>

      {/* Rune Pages */}
      <section>
        <h2 className="text-xl font-bold text-zinc-100">Rune Pages</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {Array.from(uniqueRunes.values()).map((rune) => (
            <div
              key={rune.keystone}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
            >
              <h3 className="text-lg font-bold text-amber-400">
                {rune.keystone}
              </h3>
              <p className="text-sm text-zinc-400">
                {rune.primaryTree} / {rune.secondaryTree}
              </p>
              <div className="mt-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Use against
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {rune.champions.map((c) => (
                    <span
                      key={c}
                      className="rounded-md bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Build Paths */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-zinc-100">Build Paths</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {Array.from(uniqueBuilds.values()).map((build) => (
            <div
              key={build.name}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
            >
              <h3 className="text-lg font-bold text-amber-400">{build.name}</h3>
              <p className="text-sm text-zinc-400">{build.description}</p>
              <div className="mt-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Recommended vs
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {build.champions.map((c) => (
                    <span
                      key={c}
                      className="rounded-md bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
