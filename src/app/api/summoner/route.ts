import { NextRequest, NextResponse } from "next/server";
import {
  getAccountByRiotId,
  getSummonerByPuuid,
  getChampionMastery,
  getRankedStats,
} from "@/lib/riot";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const gameName = searchParams.get("gameName");
  const tagLine = searchParams.get("tagLine") ?? "NA1";
  const platform = searchParams.get("platform") ?? "na1";

  if (!gameName) {
    return NextResponse.json(
      { error: "gameName is required" },
      { status: 400 }
    );
  }

  try {
    const account = await getAccountByRiotId(gameName, tagLine, platform);
    const summoner = await getSummonerByPuuid(account.puuid, platform);
    const mastery = await getChampionMastery(account.puuid, platform);
    const ranked = await getRankedStats(account.puuid, platform);

    const settMastery = mastery.find(
      (m: Record<string, unknown>) => m.championId === 875
    );

    const soloQ = ranked.find(
      (r: Record<string, unknown>) => r.queueType === "RANKED_SOLO_5x5"
    );

    return NextResponse.json({
      account: {
        puuid: account.puuid,
        gameName: account.gameName,
        tagLine: account.tagLine,
      },
      summoner: {
        level: summoner.summonerLevel,
        profileIconId: summoner.profileIconId,
      },
      settMastery: settMastery
        ? {
            level: settMastery.championLevel,
            points: settMastery.championPoints,
          }
        : null,
      ranked: soloQ
        ? {
            tier: soloQ.tier,
            rank: soloQ.rank,
            lp: soloQ.leaguePoints,
            wins: soloQ.wins,
            losses: soloQ.losses,
          }
        : null,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    const status = message.includes("404") ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
