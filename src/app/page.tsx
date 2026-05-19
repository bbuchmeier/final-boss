import Link from "next/link";
import { matchups } from "@/data/matchups";
import { championIconUrl } from "@/lib/ddragon";

export default function Home() {
  const hardMatchups = matchups
    .filter((m) => m.difficultyScore >= 7)
    .slice(0, 3);
  const easyMatchups = matchups
    .filter((m) => m.difficultyScore <= 3)
    .slice(0, 3);

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-500">
            The Definitive Sett Companion
          </p>
          <h1 className="mt-4 text-5xl font-black tracking-tight text-zinc-50 sm:text-7xl">
            FINAL BOSS
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-400">
            Matchup guides, build optimization, and data-driven insights.
            Everything you need to dominate top lane as The Boss.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/matchups"
              className="rounded-lg bg-amber-500 px-6 py-3 text-sm font-bold text-zinc-950 transition-colors hover:bg-amber-400"
            >
              View Matchups
            </Link>
            <Link
              href="/builds"
              className="rounded-lg border border-zinc-700 px-6 py-3 text-sm font-bold text-zinc-300 transition-colors hover:border-amber-500/50 hover:text-amber-400"
            >
              Build Optimizer
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Glance */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Hardest Matchups */}
          <div>
            <h2 className="flex items-center gap-2 text-lg font-bold text-zinc-100">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Hardest Matchups
            </h2>
            <div className="mt-4 space-y-3">
              {hardMatchups.map((m) => (
                <Link
                  key={m.slug}
                  href={`/matchups/${m.slug}`}
                  className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 transition-all hover:border-red-500/30"
                >
                  <img
                    src={championIconUrl(m.champion)}
                    alt={m.champion}
                    className="h-8 w-8 rounded"
                  />
                  <span className="font-medium text-zinc-200">
                    {m.champion}
                  </span>
                  <span className="text-sm text-red-400">
                    {m.difficultyScore}/10
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Easiest Matchups */}
          <div>
            <h2 className="flex items-center gap-2 text-lg font-bold text-zinc-100">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Easiest Matchups
            </h2>
            <div className="mt-4 space-y-3">
              {easyMatchups.map((m) => (
                <Link
                  key={m.slug}
                  href={`/matchups/${m.slug}`}
                  className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 transition-all hover:border-emerald-500/30"
                >
                  <img
                    src={championIconUrl(m.champion)}
                    alt={m.champion}
                    className="h-8 w-8 rounded"
                  />
                  <span className="font-medium text-zinc-200">
                    {m.champion}
                  </span>
                  <span className="text-sm text-emerald-400">
                    {m.difficultyScore}/10
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-t border-zinc-800 bg-zinc-900/50">
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-8 px-6 py-12 text-center">
          <div>
            <p className="text-3xl font-black text-amber-400">
              {matchups.length}
            </p>
            <p className="mt-1 text-sm text-zinc-500">Matchup Guides</p>
          </div>
          <div>
            <p className="text-3xl font-black text-amber-400">
              {new Set(matchups.map((m) => m.recommendedRunes.keystone)).size}
            </p>
            <p className="mt-1 text-sm text-zinc-500">Rune Pages</p>
          </div>
          <div>
            <p className="text-3xl font-black text-amber-400">
              {new Set(matchups.map((m) => m.recommendedBuild.name)).size}
            </p>
            <p className="mt-1 text-sm text-zinc-500">Build Paths</p>
          </div>
        </div>
      </section>
    </main>
  );
}
