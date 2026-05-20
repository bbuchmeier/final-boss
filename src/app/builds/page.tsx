"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { matchups } from "@/data/matchups";
import { championIconUrl } from "@/lib/ddragon";
import type { Matchup, Difficulty } from "@/lib/types";

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  Easy: "text-emerald-400",
  Medium: "text-yellow-400",
  Hard: "text-orange-400",
  Counter: "text-red-400",
};

// Aggregate info about each unique build path
function aggregateBuilds(list: Matchup[]) {
  const map = new Map<
    string,
    {
      coreKey: string;
      coreItems: string[];
      boots: string[];
      starters: string[];
      situational: string[];
      keystones: string[];
      champions: { name: string; slug: string; difficulty: Difficulty; score: number }[];
      descriptions: string[];
      skillOrders: string[];
    }
  >();

  for (const m of list) {
    const b = m.recommendedBuild;
    const coreKey = b.coreItems.join(" → ");
    const existing = map.get(coreKey);
    const champ = { name: m.champion, slug: m.slug, difficulty: m.difficulty, score: m.difficultyScore };

    if (existing) {
      existing.champions.push(champ);
      if (!existing.boots.includes(b.boots)) existing.boots.push(b.boots);
      if (!existing.starters.includes(b.startingItems[0])) existing.starters.push(b.startingItems[0]);
      for (const s of b.situationalItems) {
        if (!existing.situational.includes(s)) existing.situational.push(s);
      }
      if (!existing.keystones.includes(m.recommendedRunes.keystone)) {
        existing.keystones.push(m.recommendedRunes.keystone);
      }
      if (!existing.descriptions.includes(b.description)) existing.descriptions.push(b.description);
      if (!existing.skillOrders.includes(b.skillOrder)) existing.skillOrders.push(b.skillOrder);
    } else {
      map.set(coreKey, {
        coreKey,
        coreItems: b.coreItems,
        boots: [b.boots],
        starters: [b.startingItems[0]],
        situational: [...b.situationalItems],
        keystones: [m.recommendedRunes.keystone],
        champions: [champ],
        descriptions: [b.description],
        skillOrders: [b.skillOrder],
      });
    }
  }

  return Array.from(map.values()).sort((a, b) => b.champions.length - a.champions.length);
}

export default function BuildsPage() {
  const [selectedChamp, setSelectedChamp] = useState<string>("");
  const [search, setSearch] = useState("");
  const [compareSlug, setCompareSlug] = useState<string>("");

  const sorted = useMemo(
    () => [...matchups].sort((a, b) => a.champion.localeCompare(b.champion)),
    []
  );

  const filtered = useMemo(
    () =>
      search.trim()
        ? sorted.filter((m) =>
            m.champion.toLowerCase().includes(search.toLowerCase())
          )
        : sorted,
    [search, sorted]
  );

  const selected = useMemo(
    () => matchups.find((m) => m.slug === selectedChamp) ?? null,
    [selectedChamp]
  );

  const compareTarget = useMemo(
    () => (compareSlug ? matchups.find((m) => m.slug === compareSlug) ?? null : null),
    [compareSlug]
  );

  const buildAggregations = useMemo(() => aggregateBuilds(matchups), []);

  return (
    <main className="mx-auto max-w-6xl flex-1 px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-zinc-100">Build Optimizer</h1>
        <p className="mt-2 text-zinc-400">
          Select your lane opponent to get the optimal runes, items, and
          summoner spells. Compare builds side-by-side.
        </p>
      </div>

      {/* Champion Selector */}
      <div className="mb-8">
        <label className="mb-2 block text-sm font-semibold text-zinc-300">
          Who are you laning against?
        </label>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search champions..."
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
          {selected && (
            <button
              onClick={() => {
                setSelectedChamp("");
                setSearch("");
                setCompareSlug("");
              }}
              className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm text-zinc-400 transition-colors hover:border-red-500/50 hover:text-red-400"
            >
              Clear
            </button>
          )}
        </div>

        {/* Champion Grid Picker */}
        {!selected && (
          <div className="mt-3 grid grid-cols-6 gap-2 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12">
            {filtered.map((m) => (
              <button
                key={m.slug}
                onClick={() => {
                  setSelectedChamp(m.slug);
                  setSearch("");
                }}
                className="group flex flex-col items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900 p-2 transition-all hover:border-amber-500/50 hover:bg-zinc-800"
              >
                <img
                  src={championIconUrl(m.champion)}
                  alt={m.champion}
                  className="h-10 w-10 rounded"
                />
                <span className="text-[10px] font-medium text-zinc-500 group-hover:text-zinc-300 truncate w-full text-center">
                  {m.champion}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected Build Output */}
      {selected && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
            <img
              src={championIconUrl("Sett")}
              alt="Sett"
              className="h-14 w-14 rounded-lg border-2 border-amber-500"
            />
            <span className="text-2xl font-black text-zinc-500">vs</span>
            <img
              src={championIconUrl(selected.champion)}
              alt={selected.champion}
              className="h-14 w-14 rounded-lg border-2 border-zinc-600"
            />
            <div className="flex-1">
              <h2 className="text-xl font-black text-zinc-100">
                vs {selected.champion}
              </h2>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-bold ${DIFFICULTY_COLORS[selected.difficulty]}`}>
                  {selected.difficulty} ({selected.difficultyScore}/10)
                </span>
                <Link
                  href={`/matchups/${selected.slug}`}
                  className="text-xs text-amber-500 hover:text-amber-400"
                >
                  Full matchup guide &rarr;
                </Link>
              </div>
            </div>
            {/* Compare picker */}
            <div>
              <select
                value={compareSlug}
                onChange={(e) => setCompareSlug(e.target.value)}
                className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-zinc-300 outline-none focus:border-amber-500"
              >
                <option value="">Compare with...</option>
                {sorted
                  .filter((m) => m.slug !== selected.slug)
                  .map((m) => (
                    <option key={m.slug} value={m.slug}>
                      vs {m.champion}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Build Details - possibly side by side */}
          <div className={`grid gap-6 ${compareTarget ? "lg:grid-cols-2" : ""}`}>
            <BuildPanel matchup={selected} />
            {compareTarget && <BuildPanel matchup={compareTarget} isCompare />}
          </div>
        </div>
      )}

      {/* Build Path Overview (when nothing selected) */}
      {!selected && (
        <section className="mt-4">
          <h2 className="text-xl font-bold text-zinc-100">Build Paths Overview</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Core item paths across all matchups, sorted by frequency
          </p>
          <div className="mt-4 space-y-4">
            {buildAggregations.map((agg) => (
              <div
                key={agg.coreKey}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      {agg.coreItems.map((item, i) => (
                        <span key={item} className="flex items-center gap-1.5">
                          <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-sm font-medium text-amber-400">
                            {item}
                          </span>
                          {i < agg.coreItems.length - 1 && (
                            <span className="text-zinc-600">&rarr;</span>
                          )}
                        </span>
                      ))}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-zinc-500">
                      <span>Boots: {agg.boots.join(", ")}</span>
                      <span>&middot;</span>
                      <span>Keystones: {agg.keystones.join(", ")}</span>
                      <span>&middot;</span>
                      <span>Skill: {[...new Set(agg.skillOrders)].join(", ")}</span>
                    </div>
                  </div>
                  <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400">
                    {agg.champions.length} matchup{agg.champions.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* Situational items */}
                <div className="mt-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600">
                    Situational:
                  </span>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {agg.situational.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Champions using this build */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {agg.champions.map((c) => (
                    <button
                      key={c.slug}
                      onClick={() => {
                        setSelectedChamp(c.slug);
                        setSearch("");
                      }}
                      className="flex items-center gap-1.5 rounded-md bg-zinc-800 px-2 py-1 text-xs transition-colors hover:bg-zinc-700"
                    >
                      <img
                        src={championIconUrl(c.name)}
                        alt={c.name}
                        className="h-4 w-4 rounded"
                      />
                      <span className={DIFFICULTY_COLORS[c.difficulty]}>
                        {c.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

/* ─── Build Panel Component ─── */

function BuildPanel({
  matchup,
  isCompare = false,
}: {
  matchup: Matchup;
  isCompare?: boolean;
}) {
  const b = matchup.recommendedBuild;
  const r = matchup.recommendedRunes;

  return (
    <div className={`space-y-4 ${isCompare ? "border-l border-zinc-800 pl-6" : ""}`}>
      {isCompare && (
        <div className="flex items-center gap-3">
          <img
            src={championIconUrl(matchup.champion)}
            alt={matchup.champion}
            className="h-10 w-10 rounded-lg"
          />
          <div>
            <h3 className="font-bold text-zinc-100">vs {matchup.champion}</h3>
            <span className={`text-sm ${DIFFICULTY_COLORS[matchup.difficulty]}`}>
              {matchup.difficulty} ({matchup.difficultyScore}/10)
            </span>
          </div>
        </div>
      )}

      {/* Summoner Spells */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Summoner Spells
        </h3>
        <div className="mt-2 flex gap-2">
          {matchup.summonerSpells.map((spell) => (
            <span
              key={spell}
              className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-sm font-bold text-amber-400"
            >
              {spell}
            </span>
          ))}
        </div>
      </div>

      {/* Runes */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Runes
        </h3>
        <div className="mt-3 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-amber-400">{r.primaryTree}</p>
            <p className="mt-1 text-base font-black text-zinc-100">{r.keystone}</p>
            <ul className="mt-2 space-y-1">
              {r.primaryRunes.map((rune) => (
                <li key={rune} className="flex items-center gap-1.5 text-sm text-zinc-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  {rune}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-amber-400">{r.secondaryTree}</p>
            <ul className="mt-2 space-y-1">
              {r.secondaryRunes.map((rune) => (
                <li key={rune} className="flex items-center gap-1.5 text-sm text-zinc-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
                  {rune}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs font-semibold text-amber-400">Stat Shards</p>
            <ul className="mt-1 space-y-0.5">
              {r.statShards.map((shard) => (
                <li key={shard} className="text-xs text-zinc-500">
                  {shard}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Build Path
          </h3>
          <span className="rounded-md bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
            {b.skillOrder}
          </span>
        </div>

        {/* Starting */}
        <div className="mt-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
            Start
          </p>
          <div className="mt-1 flex gap-2">
            {b.startingItems.map((item) => (
              <span
                key={item}
                className="rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-sm text-zinc-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Boots */}
        <div className="mt-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
            Boots
          </p>
          <div className="mt-1">
            <span className="rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-sm text-zinc-300">
              {b.boots}
            </span>
          </div>
        </div>

        {/* Core flow */}
        <div className="mt-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
            Core Items
          </p>
          <div className="mt-1.5 flex items-center gap-2">
            {b.coreItems.map((item, i) => (
              <span key={item} className="flex items-center gap-2">
                <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-sm font-bold text-amber-400">
                  {item}
                </span>
                {i < b.coreItems.length - 1 && (
                  <span className="text-zinc-600">&rarr;</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Situational */}
        <div className="mt-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
            Situational
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {b.situationalItems.map((item) => (
              <span
                key={item}
                className="rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-sm text-zinc-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="mt-3 text-sm italic text-zinc-500">{b.description}</p>
      </div>
    </div>
  );
}
