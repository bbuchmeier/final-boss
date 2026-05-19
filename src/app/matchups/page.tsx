"use client";

import { useState, useMemo } from "react";
import { matchups } from "@/data/matchups";
import { MatchupCard } from "@/components/MatchupCard";
import { useFavorites } from "@/lib/useFavorites";
import type { Difficulty } from "@/lib/types";

const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard", "Counter"];

const ALL_TAGS = Array.from(
  new Set(matchups.flatMap((m) => m.tags))
).sort();

export default function MatchupsPage() {
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "All">("All");
  const [tagFilter, setTagFilter] = useState<string>("All");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { isFavorite, toggle, favorites } = useFavorites();

  const filtered = useMemo(() => {
    let result = [...matchups];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.champion.toLowerCase().includes(q) ||
          m.tags.some((t) => t.includes(q)) ||
          m.recommendedRunes.keystone.toLowerCase().includes(q)
      );
    }

    if (difficultyFilter !== "All") {
      result = result.filter((m) => m.difficulty === difficultyFilter);
    }

    if (tagFilter !== "All") {
      result = result.filter((m) => m.tags.includes(tagFilter));
    }

    if (showFavoritesOnly) {
      result = result.filter((m) => favorites.has(m.slug));
    }

    return result.sort((a, b) => b.difficultyScore - a.difficultyScore);
  }, [search, difficultyFilter, tagFilter, showFavoritesOnly, favorites]);

  const favoriteMatchups = useMemo(
    () => matchups.filter((m) => favorites.has(m.slug)),
    [favorites]
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

      {/* Search & Filters */}
      <div className="mb-6 space-y-3">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search champions, tags, or keystones..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 pl-10 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-amber-500"
            />
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`flex items-center gap-1.5 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
              showFavoritesOnly
                ? "border-amber-500/50 bg-amber-500/10 text-amber-400"
                : "border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-amber-500/30 hover:text-amber-400"
            }`}
          >
            <span>{showFavoritesOnly ? "★" : "☆"}</span>
            Favorites
            {favorites.size > 0 && (
              <span className="rounded-full bg-amber-500/20 px-1.5 text-xs text-amber-400">
                {favorites.size}
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Difficulty chips */}
          <button
            onClick={() => setDifficultyFilter("All")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              difficultyFilter === "All"
                ? "bg-amber-500 text-zinc-950"
                : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            All Difficulties
          </button>
          {DIFFICULTIES.map((d) => (
            <button
              key={d}
              onClick={() =>
                setDifficultyFilter(difficultyFilter === d ? "All" : d)
              }
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                difficultyFilter === d
                  ? d === "Easy"
                    ? "bg-emerald-500 text-zinc-950"
                    : d === "Medium"
                      ? "bg-yellow-500 text-zinc-950"
                      : d === "Hard"
                        ? "bg-orange-500 text-zinc-950"
                        : "bg-red-500 text-zinc-950"
                  : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {d}
            </button>
          ))}

          <span className="mx-1 self-center text-zinc-700">|</span>

          {/* Tag filter */}
          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs text-zinc-400 outline-none focus:border-amber-500"
          >
            <option value="All">All Tags</option>
            {ALL_TAGS.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="mb-4 text-sm text-zinc-500">
        {filtered.length} matchup{filtered.length !== 1 ? "s" : ""}
        {search && ` matching "${search}"`}
        {showFavoritesOnly && " in favorites"}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((matchup) => (
            <MatchupCard
              key={matchup.slug}
              matchup={matchup}
              isFavorite={isFavorite(matchup.slug)}
              onToggleFavorite={() => toggle(matchup.slug)}
            />
          ))}
        </div>
      ) : (
        <div className="mt-12 text-center">
          <p className="text-lg text-zinc-500">No matchups found</p>
          <p className="mt-1 text-sm text-zinc-600">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </main>
  );
}
