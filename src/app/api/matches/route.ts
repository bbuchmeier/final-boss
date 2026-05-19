import { NextRequest, NextResponse } from "next/server";
import { getMatchIds, getMatch } from "@/lib/riot";
import {
  extractSettStats,
  aggregateMatchupStats,
  overallStats,
} from "@/lib/analysis";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const puuid = searchParams.get("puuid");
  const platform = searchParams.get("platform") ?? "na1";
  const count = Math.min(Number(searchParams.get("count") ?? "20"), 50);

  if (!puuid) {
    return NextResponse.json({ error: "puuid is required" }, { status: 400 });
  }

  try {
    const matchIds: string[] = await getMatchIds(puuid, platform, count);

    const matchPromises = matchIds.map((id: string) =>
      getMatch(id, platform).catch(() => null)
    );
    const matchResults = await Promise.all(matchPromises);

    const settGames = matchResults
      .filter((m): m is Record<string, unknown> => m !== null)
      .map(extractSettStats)
      .filter((s): s is NonNullable<typeof s> => s !== null);

    return NextResponse.json({
      overall: overallStats(settGames),
      matchups: aggregateMatchupStats(settGames),
      recentGames: settGames.slice(0, 10),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
