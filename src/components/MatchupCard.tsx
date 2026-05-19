import Link from "next/link";
import { Matchup } from "@/lib/types";
import { DifficultyBadge } from "./DifficultyBadge";
import { championIconUrl } from "@/lib/ddragon";

export function MatchupCard({
  matchup,
  isFavorite,
  onToggleFavorite,
}: {
  matchup: Matchup;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}) {
  return (
    <div className="group relative">
      <Link
        href={`/matchups/${matchup.slug}`}
        className="block rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition-all hover:border-amber-500/50 hover:bg-zinc-800/80"
      >
        <div className="flex items-center gap-3">
          <img
            src={championIconUrl(matchup.champion)}
            alt={matchup.champion}
            className="h-10 w-10 rounded-lg"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-zinc-100 group-hover:text-amber-400 transition-colors">
                {matchup.champion}
              </h3>
              <DifficultyBadge difficulty={matchup.difficulty} />
            </div>
            <div className="mt-1 flex items-center gap-3">
              <div className="flex">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-2.5 first:rounded-l-full last:rounded-r-full ${
                      i < matchup.difficultyScore
                        ? "bg-amber-500"
                        : "bg-zinc-700"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-zinc-500">
                {matchup.difficultyScore}/10
              </span>
            </div>
          </div>
        </div>
        <p className="mt-3 line-clamp-2 text-sm text-zinc-400">
          {matchup.lanePhase}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {matchup.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-500"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-xs text-zinc-600">
            {matchup.recommendedRunes.keystone}
          </span>
        </div>
      </Link>
      {onToggleFavorite && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800/80 text-sm transition-all hover:bg-zinc-700"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? (
            <span className="text-amber-400">&#9733;</span>
          ) : (
            <span className="text-zinc-500 group-hover:text-zinc-300">&#9734;</span>
          )}
        </button>
      )}
    </div>
  );
}
