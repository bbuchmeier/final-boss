"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { matchups, getMatchup } from "@/data/matchups";
import { championIconUrl } from "@/lib/ddragon";
import { DifficultyBadge } from "@/components/DifficultyBadge";

const COMPANION_WS = "ws://localhost:3003";

type Enemy = {
  championId: number;
  championName: string | null;
  slug: string | null;
  locked: boolean;
};

type ChampSelectData = {
  myChampion: { id: number; name: string | null; slug: string | null };
  myPosition: string;
  enemies: Enemy[];
};

type LiveState = {
  wsStatus: "connecting" | "open" | "closed";
  lcuConnected: boolean;
  phase: string;
  champSelect: ChampSelectData | null;
};

const PHASE_LABELS: Record<string, string> = {
  None: "No active game",
  Lobby: "In lobby",
  Matchmaking: "In queue",
  ReadyCheck: "Ready check!",
  ChampSelect: "Champion Select",
  GameStart: "Game starting...",
  InProgress: "In game",
  WaitingForStats: "Post-game",
  PreEndOfGame: "Post-game",
  EndOfGame: "End of game",
  idle: "Waiting...",
};

const PHASE_COLORS: Record<string, string> = {
  ChampSelect: "text-amber-400",
  InProgress: "text-emerald-400",
  ReadyCheck: "text-blue-400",
};

export default function LivePage() {
  const [live, setLive] = useState<LiveState>({
    wsStatus: "connecting",
    lcuConnected: false,
    phase: "idle",
    champSelect: null,
  });
  const [selectedEnemy, setSelectedEnemy] = useState<string | null>(null);

  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      const msg = JSON.parse(event.data);

      if (msg.type === "status") {
        setLive((prev) => ({ ...prev, lcuConnected: msg.connected }));
        if (!msg.connected) {
          setLive((prev) => ({ ...prev, champSelect: null, phase: "idle" }));
          setSelectedEnemy(null);
        }
      } else if (msg.type === "phase") {
        setLive((prev) => ({ ...prev, phase: msg.phase }));
        if (msg.phase !== "ChampSelect") setSelectedEnemy(null);
      } else if (msg.type === "champSelect") {
        setLive((prev) => ({ ...prev, champSelect: msg.data }));
        if (!msg.data) setSelectedEnemy(null);
      }
    } catch {}
  }, []);

  useEffect(() => {
    let ws: WebSocket;
    let retryTimeout: ReturnType<typeof setTimeout>;

    function connect() {
      setLive((prev) => ({ ...prev, wsStatus: "connecting" }));
      ws = new WebSocket(COMPANION_WS);

      ws.onopen = () => setLive((prev) => ({ ...prev, wsStatus: "open" }));
      ws.onmessage = handleMessage;
      ws.onclose = () => {
        setLive((prev) => ({
          ...prev,
          wsStatus: "closed",
          lcuConnected: false,
        }));
        retryTimeout = setTimeout(connect, 3000);
      };
      ws.onerror = () => {};
    }

    connect();
    return () => {
      clearTimeout(retryTimeout);
      ws?.close();
    };
  }, [handleMessage]);

  // Auto-select if only one enemy or a top-laner gets locked
  useEffect(() => {
    if (!live.champSelect) return;
    const locked = live.champSelect.enemies.filter((e) => e.locked && e.slug);
    if (locked.length === 1 && !selectedEnemy) {
      setSelectedEnemy(locked[0].slug);
    }
  }, [live.champSelect, selectedEnemy]);

  const selectedMatchup = selectedEnemy ? getMatchup(selectedEnemy) : null;

  return (
    <main className="mx-auto max-w-6xl flex-1 px-6 py-12">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-zinc-100">Live</h1>
          <p className="mt-1 text-zinc-400">
            Real-time champion select integration
          </p>
        </div>

        {/* Status pill */}
        <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2">
          <span
            className={`h-2 w-2 rounded-full ${
              live.wsStatus === "closed"
                ? "bg-zinc-600"
                : live.lcuConnected
                  ? "bg-emerald-500 shadow-[0_0_6px_#10b981]"
                  : "bg-yellow-500 animate-pulse"
            }`}
          />
          <span className="text-xs font-medium text-zinc-300">
            {live.wsStatus === "closed"
              ? "Companion offline"
              : live.lcuConnected
                ? (PHASE_COLORS[live.phase]
                    ? <span className={PHASE_COLORS[live.phase]}>{PHASE_LABELS[live.phase] ?? live.phase}</span>
                    : (PHASE_LABELS[live.phase] ?? live.phase))
                : "League client not detected"}
          </span>
        </div>
      </div>

      {/* Companion not running */}
      {live.wsStatus === "closed" && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800">
            <span className="text-3xl">🔌</span>
          </div>
          <h2 className="text-lg font-bold text-zinc-100">Companion not running</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Start the companion script in a terminal to enable live features.
          </p>
          <div className="mx-auto mt-4 max-w-sm rounded-lg bg-zinc-800 p-3 text-left">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              In your project directory, run:
            </p>
            <code className="mt-1 block text-sm text-amber-400">npm run companion</code>
          </div>
          <p className="mt-4 text-xs text-zinc-600">
            Retrying every 3 seconds...
          </p>
        </div>
      )}

      {/* Connected, waiting for champ select */}
      {live.wsStatus === "open" && live.lcuConnected && live.phase !== "ChampSelect" && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center">
          <img
            src={championIconUrl("Sett")}
            alt="Sett"
            className="mx-auto h-20 w-20 rounded-xl opacity-40"
          />
          <p className="mt-4 text-lg font-bold text-zinc-300">
            {PHASE_LABELS[live.phase] ?? live.phase}
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            This page will update automatically when champion select starts.
          </p>
        </div>
      )}

      {/* Waiting for League to open */}
      {live.wsStatus === "open" && !live.lcuConnected && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800">
            <span className="animate-spin text-3xl">⚙️</span>
          </div>
          <h2 className="text-lg font-bold text-zinc-100">Waiting for League of Legends</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Open your League client to connect.
          </p>
        </div>
      )}

      {/* Champion Select Active */}
      {live.phase === "ChampSelect" && live.champSelect && (
        <div className="space-y-6">
          {/* My champion */}
          <div className="flex items-center gap-4 rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-4">
            <div className="flex items-center gap-3">
              {live.champSelect.myChampion.id > 0 ? (
                <img
                  src={championIconUrl(live.champSelect.myChampion.name ?? "Sett")}
                  alt={live.champSelect.myChampion.name ?? ""}
                  className="h-12 w-12 rounded-lg border-2 border-amber-500"
                />
              ) : (
                <div className="h-12 w-12 rounded-lg border-2 border-dashed border-zinc-700 bg-zinc-800" />
              )}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Your Pick
                </p>
                <p className="font-bold text-zinc-100">
                  {live.champSelect.myChampion.name ?? "Hovering..."}
                </p>
                {live.champSelect.myPosition && live.champSelect.myPosition !== "unknown" && (
                  <p className="text-xs capitalize text-amber-400">
                    {live.champSelect.myPosition}
                  </p>
                )}
              </div>
            </div>
            <span className="ml-4 text-2xl font-black text-zinc-600">vs</span>
          </div>

          {/* Enemy picks */}
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
              Enemy Team — click your lane opponent
            </h2>
            {live.champSelect.enemies.length === 0 ? (
              <p className="text-sm text-zinc-600">
                Waiting for enemy picks...
              </p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {live.champSelect.enemies.map((enemy, i) => {
                  const isSelected = selectedEnemy === enemy.slug;
                  const hasMatchup = enemy.slug && getMatchup(enemy.slug);

                  return (
                    <button
                      key={i}
                      onClick={() =>
                        enemy.slug && setSelectedEnemy(isSelected ? null : enemy.slug)
                      }
                      className={`flex items-center gap-2 rounded-xl border p-3 transition-all ${
                        isSelected
                          ? "border-amber-500 bg-amber-500/10"
                          : enemy.locked
                            ? "border-zinc-600 bg-zinc-900 hover:border-zinc-400"
                            : "border-dashed border-zinc-700 bg-zinc-900/50 opacity-60 hover:opacity-100"
                      }`}
                    >
                      {enemy.championName ? (
                        <img
                          src={championIconUrl(enemy.championName)}
                          alt={enemy.championName}
                          className="h-12 w-12 rounded-lg"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-lg bg-zinc-800" />
                      )}
                      <div className="text-left">
                        <p className="text-sm font-bold text-zinc-100">
                          {enemy.championName ?? "Unknown"}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {enemy.locked ? "Locked" : "Hovering"}
                        </p>
                        {hasMatchup && (
                          <p className="text-xs text-amber-500">Has guide</p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Matchup Panel */}
          {selectedMatchup && (
            <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={championIconUrl("Sett")}
                      alt="Sett"
                      className="h-14 w-14 rounded-lg border-2 border-amber-500"
                    />
                  </div>
                  <span className="text-xl font-black text-zinc-600">vs</span>
                  <img
                    src={championIconUrl(selectedMatchup.champion)}
                    alt={selectedMatchup.champion}
                    className="h-14 w-14 rounded-lg border-2 border-zinc-600"
                  />
                  <div>
                    <h2 className="text-xl font-black text-zinc-100">
                      {selectedMatchup.champion}
                    </h2>
                    <div className="flex items-center gap-2">
                      <DifficultyBadge difficulty={selectedMatchup.difficulty} />
                      <span className="text-sm text-zinc-500">
                        {selectedMatchup.difficultyScore}/10
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {selectedMatchup.summonerSpells.map((spell) => (
                    <span
                      key={spell}
                      className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-sm font-bold text-amber-400"
                    >
                      {spell}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick tips */}
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Key Tips
                  </h3>
                  <ul className="mt-2 space-y-1.5">
                    {selectedMatchup.keyTips.slice(0, 4).map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                        <span className="text-zinc-300">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  {/* Runes */}
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      Runes
                    </h3>
                    <p className="mt-1 text-sm font-bold text-amber-400">
                      {selectedMatchup.recommendedRunes.keystone}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {selectedMatchup.recommendedRunes.primaryTree} /{" "}
                      {selectedMatchup.recommendedRunes.secondaryTree}
                    </p>
                  </div>

                  {/* Build */}
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      Core Items
                    </h3>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      {selectedMatchup.recommendedBuild.coreItems.map((item, i) => (
                        <span key={item} className="flex items-center gap-1.5">
                          <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-400">
                            {item}
                          </span>
                          {i < selectedMatchup.recommendedBuild.coreItems.length - 1 && (
                            <span className="text-zinc-700">&rarr;</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Threats */}
              <div className="mt-4 border-t border-zinc-800 pt-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-red-500">
                  Watch out for
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedMatchup.threats.map((threat, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-400"
                    >
                      {threat}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href={`/matchups/${selectedMatchup.slug}`}
                className="mt-4 block rounded-lg bg-amber-500 py-2.5 text-center text-sm font-bold text-zinc-950 transition-colors hover:bg-amber-400"
                target="_blank"
              >
                Open Full Guide ↗
              </Link>
            </div>
          )}

          {/* Selected enemy has no guide */}
          {selectedEnemy && !selectedMatchup && (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center">
              <p className="text-zinc-400">No guide found for this champion.</p>
              <Link href="/matchups" className="mt-2 block text-sm text-amber-500 hover:text-amber-400">
                Browse all matchups &rarr;
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Bottom hint */}
      {live.wsStatus !== "closed" && (
        <p className="mt-8 text-xs text-zinc-700">
          Tip: keep this tab open during champion select for instant matchup lookup.
          The page updates automatically as picks come in.
        </p>
      )}
    </main>
  );
}
