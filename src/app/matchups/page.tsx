import { matchups } from "@/data/matchups";
import { MatchupCard } from "@/components/MatchupCard";

export default function MatchupsPage() {
  const sorted = [...matchups].sort(
    (a, b) => b.difficultyScore - a.difficultyScore
  );

  return (
    <main className="mx-auto max-w-6xl flex-1 px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-zinc-100">Sett Matchups</h1>
        <p className="mt-2 text-zinc-400">
          Every top lane matchup, ranked by difficulty. Click a matchup for the
          full breakdown — lane phase strategy, runes, builds, and key tips.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((matchup) => (
          <MatchupCard key={matchup.slug} matchup={matchup} />
        ))}
      </div>
    </main>
  );
}
