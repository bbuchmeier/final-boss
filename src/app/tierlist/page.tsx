"use client";

import { useState } from "react";
import Link from "next/link";
import { matchups } from "@/data/matchups";
import { championIconUrl } from "@/lib/ddragon";
import { useFavorites } from "@/lib/useFavorites";

type Tier = "S" | "A" | "B" | "C" | "D";

function getTier(score: number): Tier {
  if (score <= 2) return "S";
  if (score <= 4) return "A";
  if (score <= 6) return "B";
  if (score <= 8) return "C";
  return "D";
}

const TIER_META: Record<Tier, { label: string; color: string; bg: string; border: string; description: string }> = {
  S: { label: "S", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", description: "Free lanes — Sett dominates" },
  A: { label: "A", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", description: "Favored — Sett has clear advantages" },
  B: { label: "B", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30", description: "Skill matchups — even with good play" },
  C: { label: "C", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30", description: "Tough — requires matchup knowledge" },
  D: { label: "D", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30", description: "Counters — uphill battle" },
};

const TIERS: Tier[] = ["S", "A", "B", "C", "D"];

export default function TierListPage() {
  const { isFavorite, toggle } = useFavorites();
  const [hoveredChamp, setHoveredChamp] = useState<string | null>(null);

  const grouped = TIERS.map((tier) => ({
    tier,
    meta: TIER_META[tier],
    champions: matchups
      .filter((m) => getTier(m.difficultyScore) === tier)
      .sort((a, b) => a.difficultyScore - b.difficultyScore),
  }));

  const hovered = hoveredChamp
    ? matchups.find((m) => m.slug === hoveredChamp)
    : null;

  return (
    <main className="mx-auto max-w-6xl flex-1 px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-zinc-100">Tier List</h1>
        <p className="mt-2 text-zinc-400">
          All top lane matchups ranked by difficulty. S-tier = easiest for Sett,
          D-tier = hardest counters.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          {grouped.map(({ tier, meta, champions }) => (
            <div
              key={tier}
              className={`rounded-xl border ${meta.border} ${meta.bg} p-4`}
            >
              <div className="mb-3 flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-lg text-xl font-black ${meta.color} bg-zinc-950/50`}
                >
                  {meta.label}
                </span>
                <div>
                  <p className={`text-sm font-bold ${meta.color}`}>
                    Tier {meta.label}
                  </p>
                  <p className="text-xs text-zinc-500">{meta.description}</p>
                </div>
                <span className="ml-auto text-xs text-zinc-600">
                  {champions.length} champion{champions.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {champions.map((m) => (
                  <div
                    key={m.slug}
                    className="group relative"
                    onMouseEnter={() => setHoveredChamp(m.slug)}
                    onMouseLeave={() => setHoveredChamp(null)}
                  >
                    <Link
                      href={`/matchups/${m.slug}`}
                      className="flex items-center gap-2 rounded-lg border border-zinc-700/50 bg-zinc-900/80 px-3 py-2 transition-all hover:border-amber-500/50 hover:bg-zinc-800"
                    >
                      <img
                        src={championIconUrl(m.champion)}
                        alt={m.champion}
                        className="h-8 w-8 rounded"
                      />
                      <span className="text-sm font-medium text-zinc-200">
                        {m.champion}
                      </span>
                      <span className="text-xs text-zinc-600">
                        {m.difficultyScore}
                      </span>
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggle(m.slug);
                      }}
                      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-800 text-xs opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      {isFavorite(m.slug) ? (
                        <span className="text-amber-400">&#9733;</span>
                      ) : (
                        <span className="text-zinc-500">&#9734;</span>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Hover Detail Panel */}
        <div className="hidden lg:block">
          <div className="sticky top-20 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            {hovered ? (
              <>
                <div className="flex items-center gap-3">
                  <img
                    src={championIconUrl(hovered.champion)}
                    alt={hovered.champion}
                    className="h-12 w-12 rounded-lg"
                  />
                  <div>
                    <h3 className="font-bold text-zinc-100">
                      {hovered.champion}
                    </h3>
                    <p className="text-sm text-zinc-500">
                      {hovered.difficulty} &middot; {hovered.difficultyScore}/10
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400 line-clamp-4">
                  {hovered.lanePhase}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {hovered.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-3 border-t border-zinc-800 pt-3">
                  <p className="text-xs text-zinc-500">
                    <span className="text-amber-400">
                      {hovered.recommendedRunes.keystone}
                    </span>{" "}
                    &middot; {hovered.recommendedBuild.name}
                  </p>
                </div>
                <Link
                  href={`/matchups/${hovered.slug}`}
                  className="mt-3 block rounded-lg bg-amber-500/10 py-2 text-center text-sm font-bold text-amber-400 transition-colors hover:bg-amber-500/20"
                >
                  View Full Guide
                </Link>
              </>
            ) : (
              <div className="text-center text-sm text-zinc-600">
                <p>Hover a champion to see details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
