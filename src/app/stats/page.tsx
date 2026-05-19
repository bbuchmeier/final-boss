"use client";

import { useState } from "react";
import Link from "next/link";
import { profileIconUrl, championIconUrl, itemIconUrl } from "@/lib/ddragon";
import { matchups } from "@/data/matchups";
import { WinRateChart } from "@/components/WinRateChart";

type SummonerData = {
  account: { puuid: string; gameName: string; tagLine: string };
  summoner: { level: number; profileIconId: number };
  settMastery: { level: number; points: number } | null;
  ranked: {
    tier: string;
    rank: string;
    lp: number;
    wins: number;
    losses: number;
  } | null;
};

type RecentGame = {
  matchId: string;
  win: boolean;
  kills: number;
  deaths: number;
  assists: number;
  cs: number;
  csPerMin: number;
  opponentChampion: string;
  gameDuration: number;
  items: number[];
  runes: { primary: number; secondary: number };
  goldEarned: number;
  damageDealt: number;
  damageTaken: number;
  visionScore: number;
};

type MatchupStat = {
  champion: string;
  games: number;
  wins: number;
  losses: number;
  winRate: number;
  avgKills: number;
  avgDeaths: number;
  avgAssists: number;
  avgCsPerMin: number;
};

type MatchData = {
  overall: {
    games: number;
    wins: number;
    winRate: number;
    avgKDA: string;
    avgCsPerMin: number;
  };
  matchups: MatchupStat[];
  recentGames: RecentGame[];
};

const RUNE_NAMES: Record<number, string> = {
  8005: "Press the Attack",
  8008: "Lethal Tempo",
  8021: "Fleet Footwork",
  8010: "Conqueror",
  8437: "Grasp of the Undying",
  8439: "Aftershock",
  8465: "Guardian",
  8214: "Summon Aery",
  8229: "Arcane Comet",
  8230: "Phase Rush",
  8112: "Electrocute",
  8124: "Predator",
  8128: "Dark Harvest",
  9923: "Hail of Blades",
};

const TREE_NAMES: Record<number, string> = {
  8000: "Precision",
  8100: "Domination",
  8200: "Sorcery",
  8300: "Inspiration",
  8400: "Resolve",
};

function getDifficultyExpectation(champion: string): {
  found: boolean;
  difficulty: string;
  score: number;
  slug: string;
} {
  const m = matchups.find(
    (m) =>
      m.champion.toLowerCase() === champion.toLowerCase() ||
      m.slug === champion.toLowerCase().replace(/[' ]/g, "")
  );
  if (!m)
    return { found: false, difficulty: "Unknown", score: 5, slug: "" };
  return {
    found: true,
    difficulty: m.difficulty,
    score: m.difficultyScore,
    slug: m.slug,
  };
}

function getInsight(
  stat: MatchupStat
): { type: "good" | "warning" | "danger"; message: string } | null {
  const expected = getDifficultyExpectation(stat.champion);
  if (!expected.found) return null;

  if (expected.score <= 3 && stat.winRate < 50) {
    return {
      type: "danger",
      message: `Should be easy (${expected.difficulty}) but you're ${stat.winRate.toFixed(0)}% WR — check the guide`,
    };
  }
  if (expected.score >= 7 && stat.winRate >= 60) {
    return {
      type: "good",
      message: `Outperforming! This is rated ${expected.difficulty} but you're ${stat.winRate.toFixed(0)}% WR`,
    };
  }
  if (expected.score >= 7 && stat.winRate < 40 && stat.games >= 3) {
    return {
      type: "warning",
      message: `Tough matchup (${expected.difficulty}) and you're struggling — review the guide tips`,
    };
  }
  return null;
}

export default function StatsPage() {
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("NA1");
  const [summoner, setSummoner] = useState<SummonerData | null>(null);
  const [matches, setMatches] = useState<MatchData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedGame, setExpandedGame] = useState<string | null>(null);

  async function lookupSummoner() {
    if (!gameName.trim()) return;
    setLoading(true);
    setError("");
    setSummoner(null);
    setMatches(null);

    try {
      const res = await fetch(
        `/api/summoner?gameName=${encodeURIComponent(gameName)}&tagLine=${encodeURIComponent(tagLine)}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSummoner(data);

      const matchRes = await fetch(
        `/api/matches?puuid=${data.account.puuid}&count=20`
      );
      const matchData = await matchRes.json();
      if (!matchRes.ok) throw new Error(matchData.error);
      setMatches(matchData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  const hasApiKey = !error.includes("RIOT_API_KEY");

  return (
    <main className="mx-auto max-w-6xl flex-1 px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-zinc-100">Your Sett Stats</h1>
        <p className="mt-2 text-zinc-400">
          Look up your ranked Sett performance. See win rates per matchup,
          identify weak spots, and compare against the guide.
        </p>
      </div>

      {/* Search */}
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Summoner Name"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && lookupSummoner()}
          className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 placeholder-zinc-500 outline-none focus:border-amber-500"
        />
        <input
          type="text"
          placeholder="Tag (NA1)"
          value={tagLine}
          onChange={(e) => setTagLine(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && lookupSummoner()}
          className="w-28 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-zinc-100 placeholder-zinc-500 outline-none focus:border-amber-500"
        />
        <button
          onClick={lookupSummoner}
          disabled={loading}
          className="rounded-lg bg-amber-500 px-6 py-3 text-sm font-bold text-zinc-950 transition-colors hover:bg-amber-400 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Look Up"}
        </button>
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-4">
          {!hasApiKey ? (
            <div>
              <p className="font-medium text-red-400">
                Riot API key not configured
              </p>
              <p className="mt-1 text-sm text-zinc-400">
                Create a <code className="text-zinc-300">.env.local</code> file
                in the project root with:
              </p>
              <pre className="mt-2 rounded bg-zinc-900 p-2 text-sm text-zinc-300">
                RIOT_API_KEY=RGAPI-your-key-here
              </pre>
            </div>
          ) : (
            <p className="text-red-400">{error}</p>
          )}
        </div>
      )}

      {/* Summoner Profile */}
      {summoner && (
        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="flex items-center gap-4">
            <img
              src={profileIconUrl(summoner.summoner.profileIconId)}
              alt="Profile"
              className="h-16 w-16 rounded-lg"
            />
            <div>
              <h2 className="text-xl font-bold text-zinc-100">
                {summoner.account.gameName}
                <span className="text-zinc-500">
                  #{summoner.account.tagLine}
                </span>
              </h2>
              <p className="text-sm text-zinc-400">
                Level {summoner.summoner.level}
              </p>
            </div>
            <div className="ml-auto flex items-center gap-6">
              {summoner.settMastery && (
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <img
                      src={championIconUrl("Sett")}
                      alt="Sett"
                      className="h-8 w-8 rounded"
                    />
                    <div>
                      <p className="text-sm font-bold text-amber-400">
                        M{summoner.settMastery.level}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {summoner.settMastery.points.toLocaleString()} pts
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {summoner.ranked && (
                <div className="text-right">
                  <p className="text-lg font-bold text-amber-400">
                    {summoner.ranked.tier} {summoner.ranked.rank}
                  </p>
                  <p className="text-sm text-zinc-400">
                    {summoner.ranked.lp} LP &middot; {summoner.ranked.wins}W{" "}
                    {summoner.ranked.losses}L
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Match Data */}
      {matches && (
        <>
          {/* Overall Stats */}
          <div className="mt-8 grid grid-cols-4 gap-4">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-center">
              <p className="text-2xl font-black text-amber-400">
                {matches.overall.games}
              </p>
              <p className="text-xs text-zinc-500">Sett Games</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-center">
              <p
                className={`text-2xl font-black ${matches.overall.winRate >= 50 ? "text-emerald-400" : "text-red-400"}`}
              >
                {matches.overall.winRate.toFixed(1)}%
              </p>
              <p className="text-xs text-zinc-500">Win Rate</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-center">
              <p className="text-2xl font-black text-zinc-100">
                {matches.overall.avgKDA}
              </p>
              <p className="text-xs text-zinc-500">Avg KDA</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-center">
              <p className="text-2xl font-black text-zinc-100">
                {matches.overall.avgCsPerMin.toFixed(1)}
              </p>
              <p className="text-xs text-zinc-500">CS/min</p>
            </div>
          </div>

          {/* Win Rate Trend */}
          {matches.recentGames.length >= 2 && (
            <div className="mt-8">
              <WinRateChart games={matches.recentGames} />
            </div>
          )}

          {/* Matchup Stats with Cross-Referencing */}
          {matches.matchups.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-bold text-zinc-100">
                Win Rate by Matchup
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                Compared against the matchup guide — highlights where your
                performance doesn&apos;t match expected difficulty
              </p>
              <div className="mt-4 space-y-2">
                {matches.matchups.map((m) => {
                  const expected = getDifficultyExpectation(m.champion);
                  const insight = getInsight(m);
                  return (
                    <div key={m.champion}>
                      <Link
                        href={
                          expected.found
                            ? `/matchups/${expected.slug}`
                            : "/matchups"
                        }
                        className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 transition-all hover:border-amber-500/30"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={championIconUrl(m.champion)}
                            alt={m.champion}
                            className="h-8 w-8 rounded"
                          />
                          <div>
                            <span className="font-medium text-zinc-200">
                              vs {m.champion}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-zinc-500">
                                {m.games} game{m.games !== 1 ? "s" : ""}
                              </span>
                              {expected.found && (
                                <span
                                  className={`text-xs ${
                                    expected.score <= 3
                                      ? "text-emerald-500"
                                      : expected.score >= 7
                                        ? "text-red-500"
                                        : "text-yellow-500"
                                  }`}
                                >
                                  Guide: {expected.difficulty}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-zinc-400">
                            {m.avgKills.toFixed(1)}/{m.avgDeaths.toFixed(1)}/
                            {m.avgAssists.toFixed(1)}
                          </span>
                          {/* Win rate bar */}
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-16 overflow-hidden rounded-full bg-zinc-700">
                              <div
                                className={`h-full rounded-full ${m.winRate >= 50 ? "bg-emerald-500" : "bg-red-500"}`}
                                style={{ width: `${m.winRate}%` }}
                              />
                            </div>
                            <span
                              className={`text-sm font-bold ${m.winRate >= 50 ? "text-emerald-400" : "text-red-400"}`}
                            >
                              {m.winRate.toFixed(0)}%
                            </span>
                          </div>
                          <span className="text-xs text-zinc-500">
                            {m.wins}W {m.losses}L
                          </span>
                        </div>
                      </Link>
                      {insight && (
                        <div
                          className={`mt-1 ml-11 rounded-md px-3 py-1.5 text-xs ${
                            insight.type === "good"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : insight.type === "warning"
                                ? "bg-yellow-500/10 text-yellow-400"
                                : "bg-red-500/10 text-red-400"
                          }`}
                        >
                          {insight.type === "good" ? "+" : insight.type === "danger" ? "!" : "~"}{" "}
                          {insight.message}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Recent Games with Deep Dive */}
          {matches.recentGames.length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-bold text-zinc-100">
                Recent Sett Games
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                Click a game to see items, runes, and damage breakdown
              </p>
              <div className="mt-4 space-y-2">
                {matches.recentGames.map((game) => {
                  const isExpanded = expandedGame === game.matchId;
                  const kda =
                    game.deaths === 0
                      ? "Perfect"
                      : ((game.kills + game.assists) / game.deaths).toFixed(
                          2
                        );
                  return (
                    <div key={game.matchId}>
                      <button
                        onClick={() =>
                          setExpandedGame(isExpanded ? null : game.matchId)
                        }
                        className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-all ${
                          game.win
                            ? "border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40"
                            : "border-red-500/20 bg-red-500/5 hover:border-red-500/40"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-10 text-sm font-bold ${game.win ? "text-emerald-400" : "text-red-400"}`}
                          >
                            {game.win ? "WIN" : "LOSS"}
                          </span>
                          <img
                            src={championIconUrl(game.opponentChampion)}
                            alt={game.opponentChampion}
                            className="h-8 w-8 rounded"
                          />
                          <span className="text-zinc-300">
                            vs {game.opponentChampion}
                          </span>
                        </div>
                        <div className="flex items-center gap-5">
                          <span className="text-sm font-medium text-zinc-200">
                            {game.kills}/{game.deaths}/{game.assists}
                          </span>
                          <span className="text-xs text-zinc-500">
                            {kda} KDA
                          </span>
                          <span className="text-xs text-zinc-500">
                            {game.csPerMin.toFixed(1)} CS/m
                          </span>
                          <span className="text-xs text-zinc-500">
                            {Math.floor(game.gameDuration / 60)}m
                          </span>
                          <span className="text-xs text-zinc-600">
                            {isExpanded ? "▲" : "▼"}
                          </span>
                        </div>
                      </button>

                      {/* Expanded Deep Dive */}
                      {isExpanded && (
                        <div className="mt-1 rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                          <div className="grid grid-cols-3 gap-6">
                            {/* Items */}
                            <div>
                              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                Items Built
                              </h4>
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {game.items.map((itemId, i) => (
                                  <img
                                    key={i}
                                    src={itemIconUrl(itemId)}
                                    alt={`Item ${itemId}`}
                                    className="h-9 w-9 rounded border border-zinc-700"
                                  />
                                ))}
                              </div>
                            </div>

                            {/* Runes */}
                            <div>
                              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                Runes
                              </h4>
                              <div className="mt-2 space-y-1">
                                <p className="text-sm text-amber-400">
                                  {RUNE_NAMES[game.runes.primary] ??
                                    `Keystone ${game.runes.primary}`}
                                </p>
                                <p className="text-xs text-zinc-400">
                                  Secondary:{" "}
                                  {TREE_NAMES[game.runes.secondary] ??
                                    `Tree ${game.runes.secondary}`}
                                </p>
                              </div>
                            </div>

                            {/* Stats */}
                            <div>
                              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                Performance
                              </h4>
                              <div className="mt-2 space-y-1.5">
                                <div className="flex justify-between text-sm">
                                  <span className="text-zinc-500">Gold</span>
                                  <span className="text-zinc-300">
                                    {game.goldEarned.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-zinc-500">
                                    Damage Dealt
                                  </span>
                                  <span className="text-zinc-300">
                                    {game.damageDealt.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-zinc-500">
                                    Damage Taken
                                  </span>
                                  <span className="text-zinc-300">
                                    {game.damageTaken.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-zinc-500">Vision</span>
                                  <span className="text-zinc-300">
                                    {game.visionScore}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Damage Bar */}
                          <div className="mt-4 border-t border-zinc-800 pt-3">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                              Damage Dealt vs Taken
                            </h4>
                            <div className="mt-2 flex gap-2">
                              <div className="flex-1">
                                <div className="flex items-center justify-between text-xs text-zinc-500">
                                  <span>Dealt</span>
                                  <span>
                                    {game.damageDealt.toLocaleString()}
                                  </span>
                                </div>
                                <div className="mt-1 h-3 overflow-hidden rounded-full bg-zinc-800">
                                  <div
                                    className="h-full rounded-full bg-amber-500"
                                    style={{
                                      width: `${(game.damageDealt / Math.max(game.damageDealt, game.damageTaken)) * 100}%`,
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between text-xs text-zinc-500">
                                  <span>Taken</span>
                                  <span>
                                    {game.damageTaken.toLocaleString()}
                                  </span>
                                </div>
                                <div className="mt-1 h-3 overflow-hidden rounded-full bg-zinc-800">
                                  <div
                                    className="h-full rounded-full bg-red-500"
                                    style={{
                                      width: `${(game.damageTaken / Math.max(game.damageDealt, game.damageTaken)) * 100}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </>
      )}

      {/* Empty state */}
      {!summoner && !loading && !error && (
        <div className="mt-16 text-center">
          <img
            src={championIconUrl("Sett")}
            alt="Sett"
            className="mx-auto h-24 w-24 rounded-xl opacity-30"
          />
          <p className="mt-4 text-lg text-zinc-500">
            Enter your Riot ID above to see your Sett performance
          </p>
          <p className="mt-2 text-sm text-zinc-600">
            Pulls your last 20 ranked Sett games and cross-references with
            the matchup guide
          </p>
        </div>
      )}
    </main>
  );
}
