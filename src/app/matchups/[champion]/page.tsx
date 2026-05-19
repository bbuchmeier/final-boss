import { notFound } from "next/navigation";
import Link from "next/link";
import { matchups, getMatchup } from "@/data/matchups";
import { DifficultyBadge } from "@/components/DifficultyBadge";
import { championIconUrl } from "@/lib/ddragon";

export function generateStaticParams() {
  return matchups.map((m) => ({ champion: m.slug }));
}

export default async function MatchupPage({
  params,
}: {
  params: Promise<{ champion: string }>;
}) {
  const { champion } = await params;
  const matchup = getMatchup(champion);

  if (!matchup) notFound();

  return (
    <main className="mx-auto max-w-4xl flex-1 px-6 py-12">
      <Link
        href="/matchups"
        className="text-sm text-zinc-500 transition-colors hover:text-amber-400"
      >
        &larr; All Matchups
      </Link>

      {/* Header */}
      <div className="mt-6 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={championIconUrl("Sett")}
              alt="Sett"
              className="h-16 w-16 rounded-lg border-2 border-amber-500"
            />
            <span className="absolute -bottom-1 -right-1 rounded bg-amber-500 px-1.5 py-0.5 text-[10px] font-bold text-zinc-950">
              SETT
            </span>
          </div>
          <span className="text-2xl font-black text-zinc-500">vs</span>
          <div className="relative">
            <img
              src={championIconUrl(matchup.champion)}
              alt={matchup.champion}
              className="h-16 w-16 rounded-lg border-2 border-zinc-600"
            />
          </div>
          <div>
            <h1 className="text-3xl font-black text-zinc-100">
              {matchup.champion}
            </h1>
            <div className="mt-2 flex items-center gap-3">
              <DifficultyBadge difficulty={matchup.difficulty} />
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 w-3 first:rounded-l-full last:rounded-r-full ${
                        i < matchup.difficultyScore
                          ? "bg-amber-500"
                          : "bg-zinc-700"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-zinc-500">
                  {matchup.difficultyScore}/10
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {matchup.summonerSpells.map((spell) => (
            <span
              key={spell}
              className="rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-300"
            >
              {spell}
            </span>
          ))}
        </div>
      </div>

      {/* Lane Phase */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-zinc-100">Lane Phase</h2>
        <p className="mt-2 leading-relaxed text-zinc-400">
          {matchup.lanePhase}
        </p>
      </section>

      {/* Key Tips */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-zinc-100">Key Tips</h2>
        <ul className="mt-3 space-y-2">
          {matchup.keyTips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              <span className="text-zinc-300">{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Power Spikes & Threats */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h2 className="font-bold text-emerald-400">Power Spikes</h2>
          <ul className="mt-3 space-y-2">
            {matchup.powerspikes.map((spike, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span className="text-zinc-300">{spike}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <h2 className="font-bold text-red-400">Threats</h2>
          <ul className="mt-3 space-y-2">
            {matchup.threats.map((threat, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                <span className="text-zinc-300">{threat}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Runes */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-zinc-100">Recommended Runes</h2>
        <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-amber-400">
                {matchup.recommendedRunes.primaryTree}
              </h3>
              <p className="mt-1 text-lg font-bold text-zinc-100">
                {matchup.recommendedRunes.keystone}
              </p>
              <ul className="mt-2 space-y-1">
                {matchup.recommendedRunes.primaryRunes.map((rune) => (
                  <li key={rune} className="text-sm text-zinc-400">
                    {rune}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-amber-400">
                {matchup.recommendedRunes.secondaryTree}
              </h3>
              <ul className="mt-2 space-y-1">
                {matchup.recommendedRunes.secondaryRunes.map((rune) => (
                  <li key={rune} className="text-sm text-zinc-400">
                    {rune}
                  </li>
                ))}
              </ul>
              <h3 className="mt-4 text-sm font-semibold text-amber-400">
                Stat Shards
              </h3>
              <ul className="mt-1 space-y-1">
                {matchup.recommendedRunes.statShards.map((shard) => (
                  <li key={shard} className="text-sm text-zinc-400">
                    {shard}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Build */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-zinc-100">Recommended Build</h2>
        <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-zinc-100">
                {matchup.recommendedBuild.name}
              </h3>
              <p className="text-sm text-zinc-400">
                {matchup.recommendedBuild.description}
              </p>
            </div>
            <span className="rounded-md bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-300">
              {matchup.recommendedBuild.skillOrder}
            </span>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Starting Items
              </h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {matchup.recommendedBuild.startingItems.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-sm text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Boots
              </h4>
              <div className="mt-2">
                <span className="rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-sm text-zinc-300">
                  {matchup.recommendedBuild.boots}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Core Items
            </h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {matchup.recommendedBuild.coreItems.map((item, i) => (
                <span key={item} className="flex items-center gap-2">
                  <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-sm font-medium text-amber-400">
                    {item}
                  </span>
                  {i < matchup.recommendedBuild.coreItems.length - 1 && (
                    <span className="text-zinc-600">&rarr;</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Situational
            </h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {matchup.recommendedBuild.situationalItems.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-sm text-zinc-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
