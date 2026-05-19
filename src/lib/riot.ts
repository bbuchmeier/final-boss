function getApiKey(): string {
  const key = process.env.RIOT_API_KEY ?? "";
  if (!key) throw new Error("RIOT_API_KEY is not configured");
  return key;
}

const REGION_ROUTING: Record<string, string> = {
  na1: "americas",
  euw1: "europe",
  eun1: "europe",
  kr: "asia",
  br1: "americas",
  la1: "americas",
  la2: "americas",
  oc1: "sea",
  tr1: "europe",
  ru: "europe",
  jp1: "asia",
  ph2: "sea",
  sg2: "sea",
  th2: "sea",
  tw2: "sea",
  vn2: "sea",
};

function regionRoute(platform: string): string {
  return REGION_ROUTING[platform] ?? "americas";
}

async function riotFetch(url: string) {
  const key = getApiKey();
  const res = await fetch(url, {
    headers: { "X-Riot-Token": key },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Riot API ${res.status}: ${text}`);
  }
  return res.json();
}

export async function getAccountByRiotId(
  gameName: string,
  tagLine: string,
  platform = "na1"
) {
  const region = regionRoute(platform);
  return riotFetch(
    `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`
  );
}

export async function getSummonerByPuuid(puuid: string, platform = "na1") {
  return riotFetch(
    `https://${platform}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`
  );
}

export async function getChampionMastery(
  puuid: string,
  platform = "na1"
) {
  return riotFetch(
    `https://${platform}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}`
  );
}

export async function getMatchIds(
  puuid: string,
  platform = "na1",
  count = 20,
  queue = 420
) {
  const region = regionRoute(platform);
  return riotFetch(
    `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=${queue}&count=${count}`
  );
}

export async function getMatch(matchId: string, platform = "na1") {
  const region = regionRoute(platform);
  return riotFetch(
    `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}`
  );
}

export async function getRankedStats(
  puuid: string,
  platform = "na1"
) {
  return riotFetch(
    `https://${platform}.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`
  );
}
