const SETT_CHAMPION_ID = 875;

export type SettMatchStats = {
  matchId: string;
  win: boolean;
  kills: number;
  deaths: number;
  assists: number;
  cs: number;
  gameDuration: number;
  csPerMin: number;
  opponentChampion: string;
  opponentChampionId: number;
  items: number[];
  summoners: number[];
  runes: { primary: number; secondary: number };
  goldEarned: number;
  damageDealt: number;
  damageTaken: number;
  visionScore: number;
  lane: string;
};

export type MatchupStats = {
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

export function extractSettStats(matchData: Record<string, unknown>): SettMatchStats | null {
  const info = matchData.info as Record<string, unknown>;
  const participants = info.participants as Record<string, unknown>[];

  const sett = participants.find(
    (p) => (p.championId as number) === SETT_CHAMPION_ID
  );
  if (!sett) return null;

  const lane = sett.teamPosition as string || sett.individualPosition as string || "UNKNOWN";
  const gameDuration = info.gameDuration as number;
  const cs =
    (sett.totalMinionsKilled as number) +
    (sett.neutralMinionsKilled as number);

  let opponentChampion = "Unknown";
  let opponentChampionId = 0;
  const teamId = sett.teamId as number;
  const opponent = participants.find(
    (p) =>
      (p.teamId as number) !== teamId &&
      ((p.teamPosition as string) === lane || (p.individualPosition as string) === lane)
  );
  if (opponent) {
    opponentChampion = opponent.championName as string;
    opponentChampionId = opponent.championId as number;
  }

  const perks = sett.perks as Record<string, unknown>;
  const styles = perks.styles as Record<string, unknown>[];
  const primaryStyle = styles[0];
  const secondaryStyle = styles[1];
  const primarySelections = primaryStyle.selections as Record<string, unknown>[];
  const primaryKeystone = primarySelections[0].perk as number;
  const secondaryTreeStyle = secondaryStyle.style as number;

  return {
    matchId: (matchData.metadata as Record<string, unknown>).matchId as string,
    win: sett.win as boolean,
    kills: sett.kills as number,
    deaths: sett.deaths as number,
    assists: sett.assists as number,
    cs,
    gameDuration,
    csPerMin: gameDuration > 0 ? (cs / (gameDuration / 60)) : 0,
    opponentChampion,
    opponentChampionId,
    items: [
      sett.item0 as number,
      sett.item1 as number,
      sett.item2 as number,
      sett.item3 as number,
      sett.item4 as number,
      sett.item5 as number,
    ].filter((id) => id > 0),
    summoners: [sett.summoner1Id as number, sett.summoner2Id as number],
    runes: { primary: primaryKeystone, secondary: secondaryTreeStyle },
    goldEarned: sett.goldEarned as number,
    damageDealt: sett.totalDamageDealtToChampions as number,
    damageTaken: sett.totalDamageTaken as number,
    visionScore: sett.visionScore as number,
    lane,
  };
}

export function aggregateMatchupStats(
  matches: SettMatchStats[]
): MatchupStats[] {
  const grouped = new Map<string, SettMatchStats[]>();

  for (const m of matches) {
    const champ = m.opponentChampion;
    if (!grouped.has(champ)) grouped.set(champ, []);
    grouped.get(champ)!.push(m);
  }

  return Array.from(grouped.entries())
    .map(([champion, games]) => {
      const wins = games.filter((g) => g.win).length;
      return {
        champion,
        games: games.length,
        wins,
        losses: games.length - wins,
        winRate: (wins / games.length) * 100,
        avgKills:
          games.reduce((sum, g) => sum + g.kills, 0) / games.length,
        avgDeaths:
          games.reduce((sum, g) => sum + g.deaths, 0) / games.length,
        avgAssists:
          games.reduce((sum, g) => sum + g.assists, 0) / games.length,
        avgCsPerMin:
          games.reduce((sum, g) => sum + g.csPerMin, 0) / games.length,
      };
    })
    .sort((a, b) => b.games - a.games);
}

export function overallStats(matches: SettMatchStats[]) {
  if (matches.length === 0)
    return { games: 0, wins: 0, winRate: 0, avgKDA: "0/0/0", avgCsPerMin: 0 };

  const wins = matches.filter((m) => m.win).length;
  const avgK = matches.reduce((s, m) => s + m.kills, 0) / matches.length;
  const avgD = matches.reduce((s, m) => s + m.deaths, 0) / matches.length;
  const avgA = matches.reduce((s, m) => s + m.assists, 0) / matches.length;
  const avgCs = matches.reduce((s, m) => s + m.csPerMin, 0) / matches.length;

  return {
    games: matches.length,
    wins,
    winRate: (wins / matches.length) * 100,
    avgKDA: `${avgK.toFixed(1)}/${avgD.toFixed(1)}/${avgA.toFixed(1)}`,
    avgCsPerMin: avgCs,
  };
}
