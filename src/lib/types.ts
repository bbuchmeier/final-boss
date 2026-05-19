export type Difficulty = "Easy" | "Medium" | "Hard" | "Counter";

export type RunePage = {
  keystone: string;
  primaryTree: string;
  primaryRunes: string[];
  secondaryTree: string;
  secondaryRunes: string[];
  statShards: string[];
};

export type BuildPath = {
  name: string;
  description: string;
  startingItems: string[];
  coreItems: string[];
  situationalItems: string[];
  boots: string;
  skillOrder: string;
};

export type Matchup = {
  champion: string;
  slug: string;
  difficulty: Difficulty;
  difficultyScore: number; // 1-10
  lanePhase: string;
  keyTips: string[];
  powerspikes: string[];
  threats: string[];
  recommendedRunes: RunePage;
  recommendedBuild: BuildPath;
  summonerSpells: string[];
  tags: string[];
};
