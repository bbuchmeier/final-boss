import { Matchup } from "@/lib/types";

function runesFromKeystone(
  keystone: string,
  primaryRunes: string[],
  secondaryTree: string,
  secondaryRunes: string[],
  statShards: string[] = ["Attack Speed", "Adaptive Force", "Flat HP"]
) {
  const treeMap: Record<string, string> = {
    "Press the Attack": "Precision",
    "Lethal Tempo": "Precision",
    "Fleet Footwork": "Precision",
    Conqueror: "Precision",
    "Grasp of the Undying": "Precision",
    "Phase Rush": "Sorcery",
  };
  return {
    keystone,
    primaryTree: treeMap[keystone] ?? "Precision",
    primaryRunes,
    secondaryTree,
    secondaryRunes,
    statShards,
  };
}

function bruiserBuild(
  starter: string,
  boots: string,
  core: string[],
  situational: string[],
  description: string
) {
  return {
    name:
      core[0] === "Stridebreaker" && core.includes("Black Cleaver")
        ? "Standard Bruiser"
        : core[0] === "Stridebreaker"
          ? "Stridebreaker Rush"
          : "Situational Build",
    description,
    startingItems: [starter, "Health Potion"],
    coreItems: core,
    situationalItems: situational,
    boots,
    skillOrder: "Q > W > E",
  };
}

export const matchups: Matchup[] = [
  // ===== A to F =====
  {
    champion: "Aatrox",
    slug: "aatrox",
    difficulty: "Medium",
    difficultyScore: 5,
    lanePhase:
      "Flash E to insec Aatrox under your turret when he Qs you there. You can also grab him during his Q animation with E then flash R him into tower. With Ghost, chase him down at level 2 when he's around 60% HP. Walk into his Q hitboxes to avoid sweetspot damage.",
    keyTips: [
      "Flash E under tower for insec when he Qs you at turret",
      "E grab him mid-Q animation to cancel his combo",
      "Pop Ghost at level 2 to chase him down if he's ~60% HP",
      "R > AA > QQ > AA > E > W is your main all-in combo",
      "Q MS > Stridebreaker > QQ > AA > E > W > R with Stridebreaker",
    ],
    powerspikes: [
      "Level 2 — with Ghost you can run him down",
      "Level 6 — R gives strong all-in potential",
      "Stridebreaker — gap close makes combo much easier",
    ],
    threats: [
      "His Q sweetspots — walk inside them",
      "His W pull if you get hit — save E to escape",
      "Post-6 sustain with his ult",
    ],
    recommendedRunes: runesFromKeystone(
      "Press the Attack",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Shield Bash", "Second Wind"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Death's Dance", "Sterak's Gage", "Guardian Angel"],
      "All-in burst with PTA to punish Aatrox"
    ),
    summonerSpells: ["Flash", "Ghost"],
    tags: ["bruiser", "skill-matchup"],
  },
  {
    champion: "Akali",
    slug: "akali",
    difficulty: "Medium",
    difficultyScore: 5,
    lanePhase:
      "Get priority level 1 with E, make a trade, then get level 2 first. Pop Ghost and auto her until she's out of range, then grab with E and combo AA > Q > AA. When she uses shroud at 60% HP, walk up with Ghost and chase — use E after she uses her E dash, then run her down.",
    keyTips: [
      "Get prio level 1, then all-in at level 2 with Ghost",
      "When she uses shroud at 60% HP, Ghost and chase her down",
      "Wait for her E dash before using your E grab",
      "Stridebreaker makes chasing through shroud much easier",
      "Flash E > R insec under turret if she Qs you there at 50% HP",
    ],
    powerspikes: [
      "Level 2 — strong all-in with Ghost if you got prio",
      "Level 6 — R gives kill threat if she's ~60% HP",
      "Stridebreaker — the slow catches her reliably through shroud",
    ],
    threats: [
      "Her shroud makes her untargetable to autos",
      "Her E dash gives her escape tools",
      "Post-6 burst if she lands E on you",
    ],
    recommendedRunes: runesFromKeystone(
      "Press the Attack",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Mercury's Treads",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Spirit Visage", "Death's Dance", "Maw of Malmortius"],
      "Sustained damage to chase Akali through shroud"
    ),
    summonerSpells: ["Flash", "Ghost"],
    tags: ["assassin", "skill-matchup", "mobile"],
  },
  {
    champion: "Ambessa",
    slug: "ambessa",
    difficulty: "Medium",
    difficultyScore: 5,
    lanePhase:
      "Wait for her to use Q1 + Q2, then walk up with E > AA > AA. Trade pattern: wait for Q1 + Q2, walk up with Q MS > AA > AA > E > W. When she's 60% HP and used Q1 + Q2, pop Ghost > Q MS > R > QQ > AA > E > W for the kill — wave must be near your tower.",
    keyTips: [
      "Punish after she uses Q1 + Q2 — her main trading tools",
      "E > AA > AA when she wastes her Qs",
      "Q MS > AA > AA > E > W is the trade pattern",
      "All-in at 60% HP when her Qs are down near your tower",
      "Ghost for running her down, Ignite for hyper-aggressive kills",
    ],
    powerspikes: [
      "Level 3 — full combo outtrades when her Qs are down",
      "Level 6 — R > QQ > AA > E > W is lethal at 60%",
      "Stridebreaker — catches her after Q dashes",
    ],
    threats: [
      "Her Q combo burst if you eat both",
      "Her mobility with Q dashes",
      "Her shield from passive",
    ],
    recommendedRunes: runesFromKeystone(
      "Press the Attack",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Death's Dance", "Dead Man's Plate", "Guardian Angel"],
      "Burst trades when Ambessa wastes cooldowns"
    ),
    summonerSpells: ["Flash", "Ignite"],
    tags: ["bruiser", "skill-matchup"],
  },
  {
    champion: "Aurora",
    slug: "aurora",
    difficulty: "Medium",
    difficultyScore: 5,
    lanePhase:
      "Sidestep her Q and E as much as possible. Use W before she recasts second Q to take less damage. Be patient before using E to bait her jump away first. When she uses R, wait until she's close to the edge then R her out.",
    keyTips: [
      "Sidestep Q and E — her main poke tools",
      "W before her second Q recast to mitigate damage",
      "Bait her jump before using your E",
      "When she Rs, wait for her to reach the edge then R her out",
      "Fleet Footwork helps sustain through her poke",
    ],
    powerspikes: [
      "Level 6 — R can counter her ultimate by pushing her out",
      "Stridebreaker — gap close to catch her",
      "Spectre's Cowl — reduces magic poke",
    ],
    threats: [
      "Her Q poke in lane",
      "Her E repositioning",
      "Her R zone control in teamfights",
    ],
    recommendedRunes: runesFromKeystone(
      "Fleet Footwork",
      ["Legend: Alacrity", "Absorb Life", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Shield",
      "Mercury's Treads",
      ["Stridebreaker", "Spirit Visage", "Sterak's Gage"],
      ["Force of Nature", "Death's Dance", "Maw of Malmortius"],
      "Sustain through poke, engage when she wastes cooldowns"
    ),
    summonerSpells: ["Flash", "Teleport"],
    tags: ["ap-mage", "poke", "survive-lane"],
  },
  {
    champion: "Briar",
    slug: "briar",
    difficulty: "Easy",
    difficultyScore: 3,
    lanePhase:
      "Get level 2-3 and fight her. Punch her, reset with Q, Ignite, then at ~70% grit use E > W. Short trade pattern: Q > E > AA > AA, when she screams press W. At level 6: punch > reset with Q > E > W > R > Ignite.",
    keyTips: [
      "Get level 2-3 and just fight her — you outtrade hard",
      "Q > E > AA > AA, then W when she screams",
      "At 70% HP: E > AA > QQ > R > Ignite > AA",
      "Stridebreaker > sidestep her scream > QQ > AA > E > W > R",
      "Bone Plating helps absorb her burst",
    ],
    powerspikes: [
      "Level 2-3 — you outstat her hard",
      "Level 6 — full combo with R and Ignite is lethal",
      "Stridebreaker — slow helps land full combo",
    ],
    threats: [
      "Her scream (W) if you don't sidestep",
      "Her lifesteal in extended fights",
      "Jungle ganks when you're extended trading",
    ],
    recommendedRunes: runesFromKeystone(
      "Press the Attack",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Bone Plating", "Shield Bash"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Death's Dance", "Guardian Angel", "Randuin's Omen"],
      "Aggressive all-in build to bully Briar"
    ),
    summonerSpells: ["Flash", "Ignite"],
    tags: ["bruiser", "sett-favored", "all-in"],
  },
  {
    champion: "Camille",
    slug: "camille",
    difficulty: "Medium",
    difficultyScore: 5,
    lanePhase:
      "Get prio first, make successful trades, then pop Ghost and all-in with autos > QQ > finish with E > W. When she's 60-70% HP, pop Ghost and auto, reset with Q, E > W when you have grit, wait for her jump then R and punch to death. When she jumps on you, AA > QQ > E > W — stun with minions to guarantee W damage.",
    keyTips: [
      "Stun her with E near minions to guarantee W true damage",
      "If no minions, keep autoing and use W as last resort for shield",
      "Pop Ghost for all-ins after getting prio",
      "Wait for her E jump before committing your R",
      "At 60-70% HP: Ghost > AA > Q reset > E > W > R",
    ],
    powerspikes: [
      "Level 3 — full combo outtrades her",
      "Level 6 — R after her E jump is very strong",
      "Stridebreaker — slow helps land E > W combo",
    ],
    threats: [
      "Her E hookshot engages and escapes",
      "Her Q2 true damage in extended fights",
      "Her R trapping you in 1v1 without minions for E stun",
    ],
    recommendedRunes: runesFromKeystone(
      "Conqueror",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Death's Dance", "Randuin's Omen", "Guardian Angel"],
      "Extended trade build to out-sustain Camille"
    ),
    summonerSpells: ["Flash", "Ghost"],
    tags: ["bruiser", "skill-matchup", "mobile"],
  },
  {
    champion: "Cassiopeia",
    slug: "cassiopeia",
    difficulty: "Easy",
    difficultyScore: 3,
    lanePhase:
      "You outstat her in melee range. Look for E grabs and all-in trades. She's immobile so your E is easy to land. Ghost lets you chase her down if she tries to kite. Be careful not to face her when she ults.",
    keyTips: [
      "E grab is easy to land — she has no dash",
      "Ghost to run her down when you engage",
      "Don't face her during her R to avoid the stun",
      "Flash E for surprise engages",
      "She's squishy — one full combo can kill",
    ],
    powerspikes: [
      "Level 2-3 — you outtrade in melee",
      "Level 6 — R gives strong all-in",
      "Stridebreaker — slow makes her immobility worse",
    ],
    threats: [
      "Her R stun if you face her",
      "Her sustained DPS with E spam if you can't reach her",
      "Her W grounding zone preventing your engage",
    ],
    recommendedRunes: runesFromKeystone(
      "Press the Attack",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Mercury's Treads",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Force of Nature", "Sterak's Gage", "Maw of Malmortius"],
      "Gap close and burst the immobile mage"
    ),
    summonerSpells: ["Flash", "Ghost"],
    tags: ["ap-mage", "sett-favored", "immobile"],
  },
  {
    champion: "Cho'Gath",
    slug: "chogath",
    difficulty: "Easy",
    difficultyScore: 3,
    lanePhase:
      "Slow push first and second wave, make 1-2 trades, get Cho to ~40% HP, get level 3 and look for a dive. Sidestep/bait his knock ups then Ghost > Stridebreaker > AA > Q > AA > AA > sidestep knock up > E > W > R. In teamfights, R Cho into the enemy team then E > W.",
    keyTips: [
      "Slow push waves 1-2, trade, then dive at level 3 if he's ~40%",
      "Sidestep/bait his Q knock up before going in",
      "Ghost > Stridebreaker > AA > QQ > E > W > R combo",
      "R him into enemy team in teamfights for massive disruption",
      "Dodge knock ups by walking unpredictably",
    ],
    powerspikes: [
      "Level 3 — dive potential if he's low from trades",
      "Level 6 — R into his team is devastating",
      "Stridebreaker — gap close + slow for combo",
    ],
    threats: [
      "His Q knock up can interrupt your engage",
      "His R execute — don't get complacent at low HP",
      "His E slow in extended trades",
    ],
    recommendedRunes: runesFromKeystone(
      "Conqueror",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Mercury's Treads",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Black Cleaver", "Spirit Visage", "Death's Dance"],
      "Sustained damage to bully the big void creature"
    ),
    summonerSpells: ["Flash", "Ghost"],
    tags: ["tank", "sett-favored", "dive-potential"],
  },
  {
    champion: "Darius",
    slug: "darius",
    difficulty: "Medium",
    difficultyScore: 5,
    lanePhase:
      "If he starts W, you start W level 1 — trade back with autos and W, then Ignite and burn his flash or W flash behind him for a kill. If he starts Q, you start E and punch him. You win if you have more minions. At 60% HP: E > AA > QQ > AA > Ignite > R for the kill. If he's under your turret bullying, let him stack bleed then E grab > flash R under turret.",
    keyTips: [
      "Match his level 1 — if he starts W, you start W and trade back",
      "Never let him get 5 passive stacks — short trade and disengage",
      "At 60% HP: E > AA > QQ > AA > Ignite > R = kill",
      "Flash R insec under turret if he bullies you there",
      "He uses E > Q, you use R > AA > QQ to win",
    ],
    powerspikes: [
      "Level 1 — you can match his aggression",
      "Level 6 — all-in potential with Ignite at 60% HP",
      "BOTRK — massive dueling spike",
    ],
    threats: [
      "His passive at 5 stacks — never let him fully stack",
      "Ghost + E pull combo — respect his engage range",
      "Jungle ganks — Darius with numbers advantage is deadly",
    ],
    recommendedRunes: runesFromKeystone(
      "Press the Attack",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Dead Man's Plate", "Death's Dance", "Guardian Angel"],
      "Short trade burst with PTA to avoid passive stacks"
    ),
    summonerSpells: ["Flash", "Ignite"],
    tags: ["juggernaut", "skill-matchup"],
  },
  {
    champion: "Dr. Mundo",
    slug: "dr-mundo",
    difficulty: "Easy",
    difficultyScore: 3,
    lanePhase:
      "Start E and break his passive, then another E trade. Get him to ~40% HP, crash 3rd wave, then kill with a dive — escape with W/flash. Even if you die, it's worth as he loses a lot of minions. In teamfights, R him into his team then E > W for massive damage.",
    keyTips: [
      "Start E to break his passive early",
      "E trade repeatedly — he can't outtrade you",
      "Crash 3rd wave and dive at ~40% HP",
      "Even a 1-for-1 dive is worth it — he loses tons of CS",
      "R him into enemy team in teamfights",
    ],
    powerspikes: [
      "Level 1 — E breaks passive and wins trades",
      "Level 3 — dive potential at ~40% HP",
      "Level 6 — R for teamfight disruption",
    ],
    threats: [
      "His post-6 healing with R",
      "His cleaver poke if you don't dodge",
      "His tankiness scaling into late game",
    ],
    recommendedRunes: runesFromKeystone(
      "Conqueror",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Shield Bash", "Second Wind"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Black Cleaver", "Spirit Visage", "Thornmail"],
      "Sustained DPS to cut through Mundo's regen"
    ),
    summonerSpells: ["Flash", "Ghost"],
    tags: ["tank", "sett-favored", "dive-potential"],
  },
  {
    champion: "Fiora",
    slug: "fiora",
    difficulty: "Hard",
    difficultyScore: 7,
    lanePhase:
      "If Fiora hits you level 1, hit her back with autos and W to win the trade. Slow push first and second wave, look for good trades, crash 3rd wave. If she's ~50% HP, dive: auto > Q > Ignite > E > W. When she dashes with Q to poke at 60% HP, R her into her minions then Ignite > AA > QQ > E > W.",
    keyTips: [
      "Trade back level 1 with autos + W — you win",
      "Slow push waves 1-2, crash wave 3, look for dive at ~50% HP",
      "R her into her minion wave for the slow then Ignite combo",
      "AA > AA > QQ > E (near minions) > W > Ignite > R on all-in",
      "Dive: auto > Q > Ignite > E > W",
    ],
    powerspikes: [
      "Level 1 — you win the trade with W",
      "Level 3 — crash wave and dive potential",
      "Level 6 — R combo is lethal at 60%",
    ],
    threats: [
      "Her W parry can stun you and block your W",
      "Her passive vitals shred your HP",
      "Her Q poke and disengage",
    ],
    recommendedRunes: runesFromKeystone(
      "Press the Attack",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Shield Bash", "Second Wind"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Randuin's Omen", "Death's Dance", "Guardian Angel"],
      "Aggressive trades to punish Fiora before she scales"
    ),
    summonerSpells: ["Flash", "Ignite"],
    tags: ["duelist", "hard-matchup", "dive-potential"],
  },
  // ===== G to K =====
  {
    champion: "Gangplank",
    slug: "gangplank",
    difficulty: "Medium",
    difficultyScore: 5,
    lanePhase:
      "If he disrespects you early and fights level 1, punch him until he's out of auto range then E and keep punching. He either has to recall or risk getting dove. At 70% HP near your turret, pop Ghost > QQ > E > AA all the way to his turret. If he uses Orange, R him and auto to death then E > W. If he doesn't Orange, Ghost and punch > Q reset > E > W, then when he eats Orange you R.",
    keyTips: [
      "Punish any disrespect level 1 — chase with E when out of auto range",
      "Pop Ghost at 70% HP near your turret and run him down",
      "Track his Orange — R after he uses it",
      "If he doesn't Orange: Ghost > punch > Q > E > W, then R after Orange",
      "He's very squishy — one combo can kill",
    ],
    powerspikes: [
      "Level 1 — you outstat him hard in melee",
      "Level 6 — R combo after he uses Orange",
      "Stridebreaker — easy gap close to reach him",
    ],
    threats: [
      "His barrel combos for poke",
      "His Orange cleanses your E stun",
      "His scaling if you let him farm freely",
    ],
    recommendedRunes: runesFromKeystone(
      "Press the Attack",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Shield Bash", "Second Wind"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Death's Dance", "Guardian Angel", "Black Cleaver"],
      "Aggressive lane build to shut GP down early"
    ),
    summonerSpells: ["Flash", "Ignite"],
    tags: ["scaling", "skill-matchup"],
  },
  {
    champion: "Garen",
    slug: "garen",
    difficulty: "Easy",
    difficultyScore: 2,
    lanePhase:
      "Walk up level 1 and punch him repeatedly. When he backs out of auto range, E and keep punching until he flashes. Get prio, get level 2, same steps: punch > E > punch > QQ > Ignite = kill. At level 3: punch > QQ > punch > E > W = kill. If he uses W, wait 2 seconds before using E to guarantee W true damage lands. If he has Phase Rush, wait until the buff is halfway through then R — your R slow lets you chase him down.",
    keyTips: [
      "Full aggression level 1 — punch until he runs, then E",
      "Level 2: punch > E > punch > QQ > Ignite = kill",
      "Wait 2 seconds after his W before using your E for guaranteed W damage",
      "If he has Phase Rush, R when the buff is half expired",
      "Keep trading to prevent his passive from healing",
    ],
    powerspikes: [
      "Level 1 — you outstat him hard",
      "Level 2 — kill potential with Ignite",
      "Level 3 — full combo outtrades his entire kit",
    ],
    threats: [
      "His passive regen if you let him sit back",
      "His W tenacity + shield timing your E",
      "His R execute — don't get complacent",
    ],
    recommendedRunes: runesFromKeystone(
      "Press the Attack",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Shield Bash", "Second Wind"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Black Cleaver", "Death's Dance", "Dead Man's Plate"],
      "Full aggression build to bully Garen"
    ),
    summonerSpells: ["Flash", "Ignite"],
    tags: ["juggernaut", "sett-favored", "easy-lane"],
  },
  {
    champion: "Gnar",
    slug: "gnar",
    difficulty: "Medium",
    difficultyScore: 5,
    lanePhase:
      "Cheese from bush level 1 with E grab > AA > AA for a good trade. Get prio and level 2 first, level up Q, walk up with Q > E > QQ > AA to chunk him to ~30%. Push 3rd wave, get level 3, sit under his turret and combo Q > E > W > Q for the kill — one turret shot gives enough grit for ~150 true damage. When he transforms to mini Gnar, use Q > Stridebreaker, wait for his jump, chase > E > QQ > R.",
    keyTips: [
      "Cheese from bush level 1 — E grab for free trade",
      "Level 2: Q > E > QQ > AA chunks him to ~30%",
      "Level 3 dive: Q > E > W > Q under his turret",
      "Wait for him to transform to mini Gnar before all-inning",
      "Ghost > Q > R, let him jump, chase > E > QQ to finish",
    ],
    powerspikes: [
      "Level 1 — bush cheese with E",
      "Level 2 — Q + E combo chunks hard",
      "Level 3 — dive potential under his turret",
    ],
    threats: [
      "Mega Gnar stun combo near walls",
      "His kiting in mini form if you don't have Ghost/Stridebreaker",
      "His boomerang poke keeping you low",
    ],
    recommendedRunes: runesFromKeystone(
      "Conqueror",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Sterak's Gage", "Dead Man's Plate"],
      ["Blade of the Ruined King", "Death's Dance", "Guardian Angel"],
      "Gap close to catch mini Gnar"
    ),
    summonerSpells: ["Flash", "Ghost"],
    tags: ["ranged", "skill-matchup", "form-dependent"],
  },
  {
    champion: "Gwen",
    slug: "gwen",
    difficulty: "Medium",
    difficultyScore: 5,
    lanePhase:
      "If she goes aggressive level 1, punch her until she runs, E when out of auto range, and keep punching. Get level 2 first: AA > E > AA > QQ > finish with autos + Ignite if below 50%. At 50% HP: AA > E > AA > QQ > Ignite > AA > W + flash inside her circle to damage her through the mist.",
    keyTips: [
      "Punish aggressive level 1 — E when she runs",
      "Level 2: AA > E > AA > QQ > Ignite if below 50%",
      "Flash inside her W circle to hit W true damage through mist",
      "She's squishy early — all-in windows are frequent",
      "Keep pressure so she can't scale for free",
    ],
    powerspikes: [
      "Level 1 — you outstat her in melee",
      "Level 2 — kill potential with E + Q combo",
      "Level 6 — all-in with full combo",
    ],
    threats: [
      "Her W mist blocks your W if you don't flash in",
      "Her Q true damage in extended trades late",
      "Her scaling — she outscales you if left alone",
    ],
    recommendedRunes: runesFromKeystone(
      "Conqueror",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Death's Dance", "Randuin's Omen", "Guardian Angel"],
      "Aggressive early build to shut Gwen down"
    ),
    summonerSpells: ["Flash", "Ignite"],
    tags: ["ap-bruiser", "skill-matchup", "scaling"],
  },
  {
    champion: "Gragas",
    slug: "gragas",
    difficulty: "Medium",
    difficultyScore: 5,
    lanePhase:
      "Get a Grasp stack, then E > Q Grasp auto > finish trade with W. After Hullbreaker, get HB stack + Grasp > E > Q auto for massive damage. Trade pattern: E > QQ > finish with W. If he body slams you at 60% HP, R him to disable it then AA > QQ > E > W > Ignite. If he body slams under turret, E stun > flash R insec.",
    keyTips: [
      "Grasp > E > Q auto > W is your trade pattern",
      "R cancels his body slam engage — time it right",
      "E stun > flash R insec if he body slams under turret",
      "Hullbreaker stacks + Grasp trades are very strong",
      "E > QQ > finish with W for short trades",
    ],
    powerspikes: [
      "Level 3 — Grasp trades start chunking",
      "Hullbreaker — split push threat with Grasp stacking",
      "Stridebreaker — gap close for E > W combo",
    ],
    threats: [
      "His body slam engage",
      "His barrel burst combo",
      "His R disengage pushing you away",
    ],
    recommendedRunes: runesFromKeystone(
      "Press the Attack",
      ["Triumph", "Legend: Alacrity", "Cut Down"],
      "Resolve",
      ["Second Wind", "Revitalize"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Shield",
      "Mercury's Treads",
      ["Stridebreaker", "Sterak's Gage", "Spirit Visage"],
      ["Hullbreaker", "Force of Nature", "Death's Dance"],
      "Sustained trades with Grasp stacking"
    ),
    summonerSpells: ["Flash", "Ignite"],
    tags: ["ap-bruiser", "skill-matchup"],
  },
  {
    champion: "Heimerdinger",
    slug: "heimerdinger",
    difficulty: "Hard",
    difficultyScore: 7,
    lanePhase:
      "Cheese from bush level 1 and punch him to ~60% HP. Trade pattern: Q > E > QQ > finish with W, stun him with mini turrets. Ghost up > Q > E > QQ > AA to death. With Stridebreaker: Ghost > Q > Stridebreaker > QQ > sidestep blue bomb > E > W > R.",
    keyTips: [
      "Bush cheese level 1 for big trade",
      "Q > E > QQ > W is the trade pattern",
      "Ghost makes running him down possible",
      "Sidestep his blue bomb (E stun) at all costs",
      "Stridebreaker + Ghost > QQ > E > W > R",
    ],
    powerspikes: [
      "Level 1 — bush cheese to ~60% HP",
      "Level 6 — Ghost + R all-in",
      "Stridebreaker — gap close through turrets",
    ],
    threats: [
      "His turret zone control",
      "His E stun (blue bomb) — sidestep or you die",
      "His empowered R turret in all-ins",
    ],
    recommendedRunes: runesFromKeystone(
      "Fleet Footwork",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Shield",
      "Mercury's Treads",
      ["Stridebreaker", "Spirit Visage", "Sterak's Gage"],
      ["Force of Nature", "Death's Dance", "Maw of Malmortius"],
      "Survive poke, then all-in with Ghost"
    ),
    summonerSpells: ["Flash", "Ghost"],
    tags: ["ranged", "poke", "zone-control"],
  },
  {
    champion: "Illaoi",
    slug: "illaoi",
    difficulty: "Medium",
    difficultyScore: 5,
    lanePhase:
      "Move between autos and dodge tentacle slams to win trades. When she Qs to CS a minion, walk up with Q > E > QQ. If she's under your turret, look for insec potential. Sidestep her E — if you dodge it, walk up and punch her freely. E > AA > QQ > R > AA and pop Ghost for MS to sidestep her E tentacle.",
    keyTips: [
      "Move between autos to dodge tentacle slams",
      "Punish her Q animation — walk up with Q > E > QQ",
      "Sidestep her E — if she misses, all-in freely",
      "Ghost gives MS to dodge tentacles during fights",
      "Never fight her inside her R unless you dodged E",
    ],
    powerspikes: [
      "Level 3 — trade when she misses E",
      "Level 6 — R insec potential at turret",
      "BOTRK — dueling power to fight through tentacles",
    ],
    threats: [
      "Her E soul grab — dodge it or lose the trade",
      "Her R in fights with multiple tentacles",
      "Her healing from tentacle slams",
    ],
    recommendedRunes: runesFromKeystone(
      "Conqueror",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Bone Plating", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Death's Dance", "Black Cleaver", "Guardian Angel"],
      "Sustained damage to fight through tentacles"
    ),
    summonerSpells: ["Flash", "Ghost"],
    tags: ["juggernaut", "skill-matchup", "dodge-dependent"],
  },
  {
    champion: "Irelia",
    slug: "irelia",
    difficulty: "Easy",
    difficultyScore: 3,
    lanePhase:
      "If she starts Q and uses it on minions, punch her hard and use E when she runs away. When she fights you and uses her E stun, sidestep it as it gives her two Q resets — then AA > QQ > E > W. At 60% HP: E > AA > QQ > Ignite > R > AA until death, W as last resort.",
    keyTips: [
      "Punish her when she Qs minions — she can't fight back",
      "Sidestep her E stun — it gives her two Q resets",
      "AA > QQ > E > W after dodging her stun",
      "At 60% HP: E > AA > QQ > Ignite > R > AA",
      "W as last resort for shield in extended trades",
    ],
    powerspikes: [
      "Level 1 — punish her Q on minions hard",
      "Level 3 — full combo outtrades if she misses stun",
      "Level 6 — kill potential with Ignite at 60%",
    ],
    threats: [
      "Her E stun into full Q resets",
      "Her passive at full stacks in minion waves",
      "Her Q sustain with BOTRK",
    ],
    recommendedRunes: runesFromKeystone(
      "Press the Attack",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Death's Dance", "Randuin's Omen", "Guardian Angel"],
      "All-in burst to punish Irelia's mistakes"
    ),
    summonerSpells: ["Flash", "Ignite"],
    tags: ["bruiser", "sett-favored", "all-in"],
  },
  {
    champion: "Jax",
    slug: "jax",
    difficulty: "Medium",
    difficultyScore: 5,
    lanePhase:
      "When he presses E (Counter Strike), you press E — you dodge his stun. Trade pattern: E > QQ. If he jumps on you with Q at 60-70% HP and stuns you, pop Ghost after stun wears off > E > AA > QQ > AA all the way until kill. At 70% HP under turret: E > flash > R insec. With Stridebreaker: he jumps with Q, you E and use Stridebreaker to slow him and walk out, then Q back in and E > punch him down.",
    keyTips: [
      "Press your E when he presses his E — you dodge the stun",
      "E > QQ is the core trade pattern",
      "Pop Ghost after his stun wears off to chase",
      "E > flash > R insec under turret at 70%",
      "Stridebreaker slow lets you disengage and re-engage around his E",
    ],
    powerspikes: [
      "Level 1 — E dodges his stun",
      "Level 6 — R insec potential",
      "Stridebreaker — play around his E cooldown",
    ],
    threats: [
      "His Counter Strike dodge + stun",
      "His scaling — he outscales you",
      "His Q gap close + R stats in extended fights",
    ],
    recommendedRunes: runesFromKeystone(
      "Conqueror",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Death's Dance", "Randuin's Omen", "Guardian Angel"],
      "Trade around his E cooldown"
    ),
    summonerSpells: ["Flash", "Ghost"],
    tags: ["bruiser", "skill-matchup", "scaling"],
  },
  {
    champion: "Jayce",
    slug: "jayce",
    difficulty: "Counter",
    difficultyScore: 9,
    lanePhase:
      "Extremely hard matchup. When he switches to ranged form at 60% HP, R > AA > QQ > E > W for the kill. If he bullies you under turret with ranged at 50% HP, flash E > R insec under your turret. Trade pattern: Q for MS > E > AA. When he jumps into hammer form to hit you, E > W to trade back.",
    keyTips: [
      "R him when he's in ranged form at 60% HP",
      "Flash E > R insec under turret when he bullies you there",
      "Q for MS > E > AA is the trade pattern to get in",
      "E > W to trade back when he jumps into hammer form",
      "TP for safe lane, Ignite for aggressive play",
    ],
    powerspikes: [
      "Level 6 — R punishes his ranged form",
      "Stridebreaker — gap close to reach him",
      "Spectre's Cowl — if he's running AP poke",
    ],
    threats: [
      "His ranged poke keeps you low constantly",
      "His E knockback in hammer form creates distance",
      "His Q+E poke combo from range",
    ],
    recommendedRunes: runesFromKeystone(
      "Conqueror",
      ["Absorb Life", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Shield",
      "Plated Steelcaps",
      ["Stridebreaker", "Sterak's Gage", "Death's Dance"],
      ["Dead Man's Plate", "Guardian Angel", "Blade of the Ruined King"],
      "Survive poke, look for all-in when he mispositions"
    ),
    summonerSpells: ["Flash", "Teleport"],
    tags: ["ranged", "counter", "survive-lane"],
  },
  {
    champion: "Kayle",
    slug: "kayle",
    difficulty: "Easy",
    difficultyScore: 2,
    lanePhase:
      "You beat her pre-6 — just fight her. Post-6 with Phage + Ghost, all-in at 70% HP: Q > R > QQ > AA > AA > E > W. Auto minion > Q MS > Stridebreaker > E > QQ > AA for trades. Blow her up with E > W > R combo before she can use her ultimate to go invulnerable.",
    keyTips: [
      "She can't fight you pre-6 at all — full aggression",
      "Post-6 with Phage + Ghost: Q > R > QQ > AA > E > W",
      "E > W > R combo fast to kill before she ults herself",
      "Q > Stridebreaker > QQ > AA > AA > E > W > R",
      "Don't let her scale for free — freeze and zone",
    ],
    powerspikes: [
      "Level 1-5 — she's helpless against you",
      "Phage — enough to all-in post-6",
      "Stridebreaker — guaranteed gap close",
    ],
    threats: [
      "Her R invulnerability can waste your combo",
      "Her scaling — she becomes a monster late",
      "Her W movement speed for escaping",
    ],
    recommendedRunes: runesFromKeystone(
      "Press the Attack",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Death's Dance", "Guardian Angel", "Black Cleaver"],
      "Aggressive build to end the game before she scales"
    ),
    summonerSpells: ["Flash", "Ghost"],
    tags: ["scaling", "sett-favored", "easy-lane"],
  },
  {
    champion: "Kennen",
    slug: "kennen",
    difficulty: "Counter",
    difficultyScore: 9,
    lanePhase:
      "Very hard matchup. Look for flash E > R insec under your turret when he's at 70% HP with two minions. Trade back with W when he autos you. In teamfights, R him away from your team when he engages with his R. Play for farm and TP plays.",
    keyTips: [
      "Flash E > R insec under turret at 70% HP",
      "Trade back with W when he pokes you",
      "R him away from team when he Rs in teamfights",
      "Fleet Footwork for sustain in lane",
      "TP for safe lane and map plays",
    ],
    powerspikes: [
      "Level 6 — R insec potential",
      "Spectre's Cowl — reduces his poke",
      "Stridebreaker — gap close to reach him",
    ],
    threats: [
      "His ranged auto poke",
      "His passive stun from 3 marks",
      "His R teamfight engage",
    ],
    recommendedRunes: runesFromKeystone(
      "Fleet Footwork",
      ["Absorb Life", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Tenacity"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Shield",
      "Mercury's Treads",
      ["Stridebreaker", "Spirit Visage", "Sterak's Gage"],
      ["Force of Nature", "Maw of Malmortius", "Death's Dance"],
      "Survive poke, look for flash insec opportunities"
    ),
    summonerSpells: ["Flash", "Teleport"],
    tags: ["ranged", "counter", "survive-lane"],
  },
  {
    champion: "Kled",
    slug: "kled",
    difficulty: "Medium",
    difficultyScore: 5,
    lanePhase:
      "Start W level 1: AA > AA > W when you have grit > back off. Auto him until he falls off Skaarl then E > W > Ignite = kill. AA > QQ > AA, move between autos to sidestep his Q, hit until dismount then E > W. Mountless Kled at 40% HP: Geishu special — AA minion > flash > E > AA > QQ.",
    keyTips: [
      "Start W level 1 for early grit trade",
      "Fight until he dismounts, then E > W > Ignite for the kill",
      "Move between autos to sidestep his Q hook",
      "Mountless Kled at 40%: flash > E > AA > QQ",
      "AA > QQ > AA until dismount > E > W > R",
    ],
    powerspikes: [
      "Level 1 — W start for grit trade",
      "Level 3 — fight until dismount",
      "Level 6 — R finisher after dismount",
    ],
    threats: [
      "His Q hook tether",
      "His remount burst healing",
      "His R engage from range",
    ],
    recommendedRunes: runesFromKeystone(
      "Conqueror",
      ["Triumph", "Legend: Alacrity", "Cut Down"],
      "Resolve",
      ["Bone Plating", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Death's Dance", "Black Cleaver", "Guardian Angel"],
      "Sustained damage to force dismount then burst"
    ),
    summonerSpells: ["Flash", "Ignite"],
    tags: ["bruiser", "skill-matchup", "all-in"],
  },
  {
    champion: "K'Sante",
    slug: "ksante",
    difficulty: "Easy",
    difficultyScore: 3,
    lanePhase:
      "Cheese from bush level 1 and beat him. Wait until he's close to minions then E > AA > QQ. Stay away from walls — he can't kill you without wall stun. When he uses All-Out form, wait until he charges W then AA > QQ > E > W > R = kill.",
    keyTips: [
      "Cheese from bush level 1 — you outstat him",
      "E > AA > QQ when near minions for stun",
      "Stay away from walls — no wall stun = no kill",
      "In All-Out: wait for his W charge > AA > QQ > E > W > R",
      "Grasp for short trades, PTA for aggressive kills",
    ],
    powerspikes: [
      "Level 1 — bush cheese",
      "Level 3 — E > AA > QQ trade chunks him",
      "BOTRK — shreds his HP pool",
    ],
    threats: [
      "His wall stun combo — stay away from walls",
      "His All-Out form damage",
      "His W shield tanking your burst",
    ],
    recommendedRunes: runesFromKeystone(
      "Grasp of the Undying",
      ["Shield Bash", "Second Wind", "Overgrowth"],
      "Precision",
      ["Legend: Alacrity", "Triumph"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Black Cleaver", "Death's Dance", "Guardian Angel"],
      "Short Grasp trades or aggressive PTA all-ins"
    ),
    summonerSpells: ["Flash", "Teleport"],
    tags: ["tank", "sett-favored", "wall-dependent"],
  },
  // ===== L to P =====
  {
    champion: "Lillia",
    slug: "lillia",
    difficulty: "Easy",
    difficultyScore: 3,
    lanePhase:
      "Auto minion for Fleet proc > Q MS > E > QQ > finish trade with W. At 60% HP: auto for Fleet > Ghost > Q > QQ > AA > E > AA > kill with W if grit. If she ults you, keep punching her then R > AA > QQ > E > W. With Stridebreaker: auto minion > Q > Stridebreaker > E > QQ > AA > R > QQ = kill.",
    keyTips: [
      "Fleet proc off minion > Q MS > E > QQ > W trade pattern",
      "Ghost to run her down at 60% HP",
      "If she ults you, keep punching — R > AA > QQ > E > W",
      "Stridebreaker > Q > E > QQ > R combo",
      "She's squishy — one combo kills",
    ],
    powerspikes: [
      "Level 3 — Fleet trade pattern chunks her",
      "Level 6 — R punishes her ult engage",
      "Stridebreaker — gap close catch",
    ],
    threats: [
      "Her movement speed making her hard to catch",
      "Her sleep ultimate",
      "Her Q poke whittling you down",
    ],
    recommendedRunes: runesFromKeystone(
      "Fleet Footwork",
      ["Absorb Life", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Mercury's Treads",
      ["Stridebreaker", "Sterak's Gage", "Spirit Visage"],
      ["Force of Nature", "Death's Dance", "Blade of the Ruined King"],
      "Gap close to catch the speedy deer"
    ),
    summonerSpells: ["Flash", "Ghost"],
    tags: ["ap-bruiser", "sett-favored", "mobile"],
  },
  {
    champion: "Malphite",
    slug: "malphite",
    difficulty: "Easy",
    difficultyScore: 3,
    lanePhase:
      "Pre-6/before reset: E > AA > QQ > finish with W. After he buys Steelcaps/armor, trade pattern shifts to AA > QQ > E > W > back off. If he's below 50% at level 2-3, look for dive angle. Play super aggressive early and beat him if he goes close to minions.",
    keyTips: [
      "E > AA > QQ > W trade pattern early",
      "AA > QQ > E > W after he buys armor",
      "Dive at 50% HP level 2-3",
      "Full aggression if he walks near minions",
      "He can't trade back early — zone him from CS",
    ],
    powerspikes: [
      "Level 1-3 — you bully him freely",
      "Level 6 — respect his R but you still win all-in",
      "BOTRK — shreds his armor stacking",
    ],
    threats: [
      "His R engage — very hard to dodge",
      "His armor stacking reducing your damage",
      "His Q poke + slow",
    ],
    recommendedRunes: runesFromKeystone(
      "Conqueror",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Health Scaling"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Mercury's Treads",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Sterak's Gage", "Death's Dance", "Guardian Angel"],
      "Armor shred to cut through his stacking"
    ),
    summonerSpells: ["Flash", "Teleport"],
    tags: ["tank", "sett-favored", "easy-lane"],
  },
  {
    champion: "Maokai",
    slug: "maokai",
    difficulty: "Easy",
    difficultyScore: 2,
    lanePhase:
      "Walk up in lane, E grab, AA as much as you can to win trade. Only use W after stunning with E. If he gets to 40% HP, look for a dive.",
    keyTips: [
      "E > AA as much as possible for trades",
      "Only W after you stun with E",
      "Dive at ~40% HP — he's squishy early",
      "Zone him from CS — he can't trade back",
      "He outscales in teamfights — end early",
    ],
    powerspikes: [
      "Level 1-3 — you bully him completely",
      "Level 6 — R gives kill potential",
      "BOTRK — cuts through his HP pool",
    ],
    threats: [
      "His passive healing sustain",
      "His W root into tower aggro",
      "His teamfight CC chain late game",
    ],
    recommendedRunes: runesFromKeystone(
      "Conqueror",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Health Scaling"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Mercury's Treads",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Black Cleaver", "Spirit Visage", "Death's Dance"],
      "Sustained damage to bully the tree"
    ),
    summonerSpells: ["Flash", "Teleport"],
    tags: ["tank", "sett-favored", "easy-lane"],
  },
  {
    champion: "Mordekaiser",
    slug: "mordekaiser",
    difficulty: "Medium",
    difficultyScore: 5,
    lanePhase:
      "Cheese from bush level 1 for AA > AA > E when out of range > AA to chunk him to ~40%. Get grit then AA > AA > E > W when he's low to kill without him using his shield. If he uses E on minions, tank it then Q MS > E > QQ > AA to win the trade. When he uses R, listen for the sound and watch the hand animation, then R at the same time to cancel it — AA > QQ > AA > Ignite > E > W.",
    keyTips: [
      "Bush cheese level 1 chunks him to ~40%",
      "Kill with E > W before he can use shield",
      "Punish when he wastes E on minions",
      "R at the same time as his R to cancel Death Realm",
      "Dive at ~50% HP — he's immobile",
    ],
    powerspikes: [
      "Level 1 — bush cheese",
      "Level 6 — R cancels his R if timed right",
      "BOTRK — wins the 1v1 in Death Realm",
    ],
    threats: [
      "His E pull into Q combo",
      "Death Realm isolating you",
      "His passive DoT in extended trades",
    ],
    recommendedRunes: runesFromKeystone(
      "Press the Attack",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Shield",
      "Mercury's Treads",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Force of Nature", "Sterak's Gage", "Death's Dance"],
      "Anti-AP build to win inside Death Realm"
    ),
    summonerSpells: ["Flash", "Ignite"],
    tags: ["ap-bruiser", "skill-matchup", "death-realm"],
  },
  {
    champion: "Nasus",
    slug: "nasus",
    difficulty: "Easy",
    difficultyScore: 2,
    lanePhase:
      "Hyper aggressive levels 1-3, get prio, cheat recall if no trade opportunity, or dive if he's at ~50% HP. After BOTRK: wait for him to bonk a minion then E > AA > QQ > Ignite > R = kill. Side lane: AA > QQ > AA as much as possible, full grit then E > W > R.",
    keyTips: [
      "Hyper aggressive early levels 1-3",
      "Cheat recall or dive at ~50% HP",
      "After BOTRK: E > AA > QQ > Ignite > R when he bonks minion",
      "Full grit combo: E > W > R in side lane",
      "Don't let him stack for free — freeze and zone",
    ],
    powerspikes: [
      "Level 1-3 — you bully him completely",
      "BOTRK — massive kill threat",
      "Stridebreaker — catches him when he tries to walk away",
    ],
    threats: [
      "His W wither cripples your DPS",
      "His scaling with stacks — don't let him free farm",
      "His R stats in extended fights late game",
    ],
    recommendedRunes: runesFromKeystone(
      "Press the Attack",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Health Scaling"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Mercury's Treads",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Black Cleaver", "Death's Dance", "Guardian Angel"],
      "Aggressive early to deny Nasus stacks"
    ),
    summonerSpells: ["Flash", "Ignite"],
    tags: ["scaling", "sett-favored", "easy-lane"],
  },
  {
    champion: "Olaf",
    slug: "olaf",
    difficulty: "Medium",
    difficultyScore: 5,
    lanePhase:
      "When he throws axe, you have a ~6 second window to walk up and punch him. At level 2-3, fight him with autos until full grit then E > W — make sure to stun to guarantee W landing. Post-6: respect his ultimate and don't fight outside your turret range without W.",
    keyTips: [
      "6-second window when he throws axe — walk up and punch",
      "Fight with autos until full grit then E > W",
      "Stun with E to guarantee W damage lands",
      "Respect his R — don't fight outside turret range without W",
      "Ignite reduces his healing significantly",
    ],
    powerspikes: [
      "Level 2-3 — grit combo E > W wins trades",
      "Level 6 — respect his R but you can still outplay",
      "BOTRK — dueling spike",
    ],
    threats: [
      "His R makes him CC immune — your E stun is useless",
      "His axe throw + auto spam DPS",
      "His lifesteal at low HP",
    ],
    recommendedRunes: runesFromKeystone(
      "Conqueror",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Death's Dance", "Thornmail", "Guardian Angel"],
      "Sustained trades with grit combo"
    ),
    summonerSpells: ["Flash", "Ignite"],
    tags: ["bruiser", "skill-matchup"],
  },
  {
    champion: "Ornn",
    slug: "ornn",
    difficulty: "Medium",
    difficultyScore: 5,
    lanePhase:
      "Zone him level 1: AA > AA > AA > E when out of auto range > AA. Sidestep his W breath then AA > E > AA > QQ. When he uses W, use your W to mitigate and trade back. When he uses R1, use your R to cancel his R2. Walk up with Q > bait his W > E > QQ > finish with W.",
    keyTips: [
      "Zone level 1 with autos and E",
      "Sidestep his W breath then AA > E > AA > QQ",
      "Your W mitigates his W breath damage",
      "R cancels his R2 follow-up charge",
      "Bait his W > E > QQ > finish with W",
    ],
    powerspikes: [
      "Level 1 — you zone him from CS",
      "Level 6 — R cancels his R2",
      "BOTRK — cuts through his innate tankiness",
    ],
    threats: [
      "His W breath + Brittle proc",
      "His R teamfight engage",
      "His item upgrades outscaling you",
    ],
    recommendedRunes: runesFromKeystone(
      "Conqueror",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Health Scaling"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Mercury's Treads",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Black Cleaver", "Spirit Visage", "Death's Dance"],
      "Sustained damage to bully the forge god"
    ),
    summonerSpells: ["Flash", "Teleport"],
    tags: ["tank", "skill-matchup"],
  },
  {
    champion: "Pantheon",
    slug: "pantheon",
    difficulty: "Hard",
    difficultyScore: 7,
    lanePhase:
      "Start E level 1 to get prio. Get level 2 first: E > AA > QQ > AA > force flash or kill. When he presses W from a distance, R > AA > QQ > E > W. At 60% HP: R > AA > QQ > AA > E > W. Side lane: AA > QQ > E > W > R — stun minions with E.",
    keyTips: [
      "E start level 1 for prio",
      "Level 2 first: E > AA > QQ > AA = kill or flash",
      "R when he W engages from distance",
      "At 60% HP: R > AA > QQ > AA > E > W",
      "Stun near minions with E for guaranteed W",
    ],
    powerspikes: [
      "Level 2 — you get prio and kill threat",
      "Level 6 — R counters his W engage",
      "Stridebreaker — gap close after his disengage",
    ],
    threats: [
      "His W point-click stun engage",
      "His empowered Q poke",
      "His E shield blocking your W damage",
    ],
    recommendedRunes: runesFromKeystone(
      "Conqueror",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Death's Dance", "Guardian Angel", "Black Cleaver"],
      "Sustained trades to outscale Pantheon"
    ),
    summonerSpells: ["Flash", "Ghost"],
    tags: ["bruiser", "hard-matchup", "early-game"],
  },
  {
    champion: "Poppy",
    slug: "poppy",
    difficulty: "Medium",
    difficultyScore: 5,
    lanePhase:
      "Trade pattern: E > AA > QQ > W. You can bait her stun by sticking to a wall then R her > AA > QQ > E > W. When she uses Q, sidestep Q2 then AA > QQ.",
    keyTips: [
      "E > AA > QQ > W trade pattern",
      "Bait her wall stun then R > AA > QQ > E > W",
      "Sidestep her Q2 then punish with AA > QQ",
      "Her W blocks your R dash if timed — be aware",
      "Stay away from walls to avoid her E stun",
    ],
    powerspikes: [
      "Level 3 — trade pattern chunks her",
      "Level 6 — R potential after baiting her stun",
      "Stridebreaker — gap close and slow",
    ],
    threats: [
      "Her W blocking your R engage",
      "Her E wall stun",
      "Her R knocking you away",
    ],
    recommendedRunes: runesFromKeystone(
      "Conqueror",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Black Cleaver", "Death's Dance", "Guardian Angel"],
      "Sustained damage against the yordle tank"
    ),
    summonerSpells: ["Flash", "Teleport"],
    tags: ["tank", "skill-matchup"],
  },
  // ===== Q to S =====
  {
    champion: "Quinn",
    slug: "quinn",
    difficulty: "Hard",
    difficultyScore: 7,
    lanePhase:
      "Hit minion for Fleet MS > tap Q for MS > E > QQ > finish trade with W while running back as she jumps on you. When she presses her E vault, you press R > Ghost > AA > QQ > E > W. Early on at 70% HP when she uses E, Ghost > Q MS > E > QQ > AA to death.",
    keyTips: [
      "Fleet MS > Q MS > E > QQ > W while she vaults back",
      "R when she uses E vault — punish her engage",
      "Ghost > Q MS > E > QQ > AA when she Es at 70%",
      "Fleet Footwork for sustain through her poke",
      "Bush control helps avoid her auto harass",
    ],
    powerspikes: [
      "Level 6 — R punishes her E vault",
      "Stridebreaker — gap close to catch her",
      "Tabis — reduces auto poke damage",
    ],
    threats: [
      "Her ranged auto poke",
      "Her E vault creating distance",
      "Her blind (Q) negating your autos",
    ],
    recommendedRunes: runesFromKeystone(
      "Fleet Footwork",
      ["Absorb Life", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Shield",
      "Plated Steelcaps",
      ["Stridebreaker", "Sterak's Gage", "Dead Man's Plate"],
      ["Death's Dance", "Blade of the Ruined King", "Guardian Angel"],
      "Survive poke, all-in when she wastes E"
    ),
    summonerSpells: ["Flash", "Ghost"],
    tags: ["ranged", "hard-matchup", "survive-lane"],
  },
  {
    champion: "Rek'Sai",
    slug: "reksai",
    difficulty: "Easy",
    difficultyScore: 3,
    lanePhase:
      "Trade pattern: E > AA > QQ. When she fights you: AA > QQ > AA > grit > E > W > Ignite > R. Straightforward matchup — you outstat her.",
    keyTips: [
      "E > AA > QQ is the core trade pattern",
      "Full fight: AA > QQ > AA > grit > E > W > Ignite > R",
      "You outstat her — just trade aggressively",
      "She has no sustain in lane — trades stick",
      "PTA for burst trades",
    ],
    powerspikes: [
      "Level 1 — you outstat her",
      "Level 3 — full combo outtrades",
      "Level 6 — R gives kill pressure",
    ],
    threats: [
      "Her knock up from burrow",
      "Her R execute true damage",
      "Jungle roams — she may roam if losing lane",
    ],
    recommendedRunes: runesFromKeystone(
      "Press the Attack",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Death's Dance", "Guardian Angel", "Black Cleaver"],
      "Aggressive all-in build"
    ),
    summonerSpells: ["Flash", "Ignite"],
    tags: ["bruiser", "sett-favored", "all-in"],
  },
  {
    champion: "Renekton",
    slug: "renekton",
    difficulty: "Hard",
    difficultyScore: 7,
    lanePhase:
      "No fury Renekton is not a champion — AA > QQ > E > W. No dash Renekton — AA > QQ > E > W. No stun Renekton — E > AA > QQ. Trade levels 1 and 2, look for kill by level 3 with Ignite or cheat recall.",
    keyTips: [
      "Punish when he has no fury — he can't trade back",
      "Punish when his dash is down — AA > QQ > E > W",
      "Punish when his stun is down — E > AA > QQ",
      "Trade levels 1-2, kill at level 3 with Ignite",
      "Track his fury bar — empty fury = free trade",
    ],
    powerspikes: [
      "Level 1-2 — trade before he has fury",
      "Level 3 — kill potential with Ignite",
      "BOTRK — dueling spike to match him",
    ],
    threats: [
      "His empowered W stun combo with fury",
      "His double dash engage/disengage",
      "His R stats in all-ins",
    ],
    recommendedRunes: runesFromKeystone(
      "Press the Attack",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Death's Dance", "Guardian Angel", "Black Cleaver"],
      "Burst trades when Renekton lacks fury"
    ),
    summonerSpells: ["Flash", "Ignite"],
    tags: ["bruiser", "hard-matchup", "fury-dependent"],
  },
  {
    champion: "Rengar",
    slug: "rengar",
    difficulty: "Medium",
    difficultyScore: 5,
    lanePhase:
      "Cheese from 3rd bush level 1: AA > AA, he runs away, E > AA. Trade pattern: E > AA > QQ > AA. At 60% HP with no ferocity bars: E > AA > QQ > R > Ignite = kill. At 60% with bars: E > AA > QQ > AA > AA until he uses W, then R > AA > QQ. Stay away from bushes and push wave into his tower to neutralize him.",
    keyTips: [
      "Cheese from 3rd bush level 1",
      "E > AA > QQ > AA trade pattern",
      "At 60% no bars: E > AA > QQ > R > Ignite",
      "Wait for his W before using R",
      "Push wave into tower — Rengar is useless without bushes",
    ],
    powerspikes: [
      "Level 1 — bush cheese",
      "Level 6 — R finisher after he uses W",
      "BOTRK — dueling power",
    ],
    threats: [
      "His bush leap engage",
      "His W healing and CC cleanse with ferocity",
      "His burst from empowered Q",
    ],
    recommendedRunes: runesFromKeystone(
      "Press the Attack",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Bone Plating", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Death's Dance", "Guardian Angel", "Randuin's Omen"],
      "Push and deny bush control"
    ),
    summonerSpells: ["Flash", "Ignite"],
    tags: ["assassin", "skill-matchup", "bush-dependent"],
  },
  {
    champion: "Riven",
    slug: "riven",
    difficulty: "Hard",
    difficultyScore: 7,
    lanePhase:
      "Trade pattern: E > QQ. At 60% HP with no dash and no stun, that's your all-in window with Ghost + R. With Stridebreaker: when she goes for 3rd Q, Stridebreaker > Q > chase her dash > E > QQ and back off. Respect her all-in potential. Don't give Riven kills — no snowball = you win fights when even = you win the game.",
    keyTips: [
      "E > QQ is the core trade pattern",
      "All-in at 60% when her dash AND stun are both down",
      "Stridebreaker catches her after 3rd Q",
      "Don't give kills — even Riven loses to even Sett",
      "Respect her all-in — she snowballs extremely hard",
    ],
    powerspikes: [
      "Level 1 — E > QQ trade works early",
      "Stridebreaker — catches her dashes",
      "Level 6 — Ghost + R at 60% without her cooldowns",
    ],
    threats: [
      "Her full combo burst with R2 execute",
      "Her mobility with Q and E dashes",
      "Her snowball potential — one kill can spiral",
    ],
    recommendedRunes: runesFromKeystone(
      "Press the Attack",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Unflinching", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Death's Dance", "Randuin's Omen", "Guardian Angel"],
      "Short trades, don't let her snowball"
    ),
    summonerSpells: ["Flash", "Ghost"],
    tags: ["bruiser", "hard-matchup", "snowball"],
  },
  {
    champion: "Rumble",
    slug: "rumble",
    difficulty: "Medium",
    difficultyScore: 5,
    lanePhase:
      "Bully him level 1. Level 2 take W and fight — wait for full grit then E > W. Trade pattern: E (stun) > AA > QQ > AA > W while backing away. At level 6, Rumble 60% HP in middle of lane: Ghost > E > AA > QQ > AA > R > AA > finish with W. With Stridebreaker: Q MS > Stridebreaker > QQ > AA > AA > E > W > R.",
    keyTips: [
      "Bully level 1 — he can't trade back",
      "E stun > AA > QQ > AA > W while backing away",
      "Ghost all-in at 60% HP: E > AA > QQ > R > W",
      "Stridebreaker: Q > Stride > QQ > AA > E > W > R",
      "Don't stand in his R (Equalizer) path",
    ],
    powerspikes: [
      "Level 1 — you bully him",
      "Level 6 — Ghost all-in is lethal at 60%",
      "Stridebreaker — gap close for full combo",
    ],
    threats: [
      "His flamespitter DPS in trades",
      "His R Equalizer zone in teamfights",
      "His danger zone passive enhancing abilities",
    ],
    recommendedRunes: runesFromKeystone(
      "Conqueror",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Shield",
      "Mercury's Treads",
      ["Stridebreaker", "Spirit Visage", "Sterak's Gage"],
      ["Force of Nature", "Death's Dance", "Blade of the Ruined King"],
      "MR to handle his magic DPS"
    ),
    summonerSpells: ["Flash", "Ghost"],
    tags: ["ap-bruiser", "skill-matchup"],
  },
  {
    champion: "Shen",
    slug: "shen",
    difficulty: "Easy",
    difficultyScore: 3,
    lanePhase:
      "Aggressive level 1: AA > AA > E when out of auto range > AA. If he uses his spirit blade zone, don't press Q — keep distance so he can't taunt you, then AA > QQ > E > W. If he taunts aggressively, AA > AA until circle expires, then QQ > AA > E > W. Ping teammates about his R presence after level 6. At 60% HP if he taunts: AA > R out of his circle > AA > QQ > E > W.",
    keyTips: [
      "Aggressive level 1 — zone with autos + E",
      "Don't Q into his spirit blade zone — stay back",
      "Punish aggressive taunts: AA until circle expires > QQ > E > W",
      "Ping team when his R is up — global pressure",
      "R out of his spirit blade zone at 60%",
    ],
    powerspikes: [
      "Level 1 — you outstat him",
      "Level 3 — full combo outtrades",
      "Level 6 — kill pressure, but watch for his R leaving lane",
    ],
    threats: [
      "His spirit blade empowered autos",
      "His taunt under tower",
      "His R leaving lane to help teammates",
    ],
    recommendedRunes: runesFromKeystone(
      "Press the Attack",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Bone Plating", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Health Scaling"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Death's Dance", "Hullbreaker", "Guardian Angel"],
      "Push and punish his R roams"
    ),
    summonerSpells: ["Flash", "Ignite"],
    tags: ["tank", "sett-favored", "map-pressure"],
  },
  {
    champion: "Singed",
    slug: "singed",
    difficulty: "Easy",
    difficultyScore: 3,
    lanePhase:
      "Walk with minion wave level 1 to prevent proxy. Full aggressive level 1, get level 2 first, and kill. If he flips you, press Q for MS > E > QQ > AA > W for a good trade. Post-6: predict his flip and R at the same time > AA > QQ > E > AA > finish with W.",
    keyTips: [
      "Walk with wave level 1 to prevent proxy",
      "Full aggression level 1 — get level 2 kill",
      "Q MS > E > QQ > AA > W after he flips you",
      "R at same time as his flip post-6",
      "Don't chase him through poison — let him come to you",
    ],
    powerspikes: [
      "Level 1-2 — kill potential with aggression",
      "Level 6 — R counters his flip",
      "Stridebreaker — catches him",
    ],
    threats: [
      "His poison trail if you chase",
      "His proxy farming behind your turret",
      "His flip + root combo with his W",
    ],
    recommendedRunes: runesFromKeystone(
      "Conqueror",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Mercury's Treads",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Spirit Visage", "Death's Dance", "Force of Nature"],
      "Catch and kill the mad chemist"
    ),
    summonerSpells: ["Flash", "Teleport"],
    tags: ["tank", "sett-favored", "proxy"],
  },
  {
    champion: "Sion",
    slug: "sion",
    difficulty: "Easy",
    difficultyScore: 3,
    lanePhase:
      "Cheese from 3rd bush level 1: AA > AA > E when out of AA range > AA. Stay away from bushes after. When he walks for a minion, E > AA > QQ. At 60% HP: E > AA > QQ > R > AA.",
    keyTips: [
      "3rd bush cheese level 1",
      "Stay away from bushes — avoid his surprise Q",
      "E > AA > QQ when he walks for CS",
      "At 60% HP: E > AA > QQ > R > AA",
      "He's easy to dive — immobile without R",
    ],
    powerspikes: [
      "Level 1 — bush cheese",
      "Level 3 — E > AA > QQ chunks hard",
      "Level 6 — R gives kill pressure",
    ],
    threats: [
      "His fully charged Q from bush",
      "His R engage from range",
      "His zombie passive after death",
    ],
    recommendedRunes: runesFromKeystone(
      "Conqueror",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Health Scaling"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Black Cleaver", "Death's Dance", "Hullbreaker"],
      "Sustained damage to bully the undead juggernaut"
    ),
    summonerSpells: ["Flash", "Teleport"],
    tags: ["tank", "sett-favored", "easy-lane"],
  },
  {
    champion: "Smolder",
    slug: "smolder",
    difficulty: "Medium",
    difficultyScore: 5,
    lanePhase:
      "Trade pattern: auto for Fleet MS > Q MS > E > AA. Second pattern: auto for Fleet MS > Q MS > bait Smolder's E > wait for your next Q and trade back with W. At 60% HP with wave pushing towards you: Fleet MS > Q MS > Ghost > R > AA until death. With Stridebreaker: Fleet MS > Q MS > Stride > E > AA > AA > W.",
    keyTips: [
      "Fleet MS > Q MS > E > AA trade pattern",
      "Bait his E before committing combos",
      "Ghost > R > AA at 60% HP when wave is pushing to you",
      "Stridebreaker: Fleet > Q > Stride > E > AA > W",
      "Don't let him scale for free — trade often",
    ],
    powerspikes: [
      "Level 6 — R gives gap close for all-in",
      "Stridebreaker — catches him reliably",
      "Fleet procs — sustain through poke",
    ],
    threats: [
      "His ranged poke in lane",
      "His E escape dash",
      "His scaling with stacks",
    ],
    recommendedRunes: runesFromKeystone(
      "Fleet Footwork",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Shield",
      "Plated Steelcaps",
      ["Stridebreaker", "Sterak's Gage", "Dead Man's Plate"],
      ["Death's Dance", "Blade of the Ruined King", "Guardian Angel"],
      "Gap close to catch the baby dragon"
    ),
    summonerSpells: ["Flash", "Ghost"],
    tags: ["ranged", "scaling", "skill-matchup"],
  },
  // ===== T to V =====
  {
    champion: "Tahm Kench",
    slug: "tahm-kench",
    difficulty: "Easy",
    difficultyScore: 3,
    lanePhase:
      "When he walks for minions, E > AA > QQ. Stay inside your minion wave to avoid getting licked (Q). At 60% HP: Q MS > E > QQ > AA > AA, wait until he jumps, then R > AA > Ignite = kill. Ult him into his team in teamfights to win fights.",
    keyTips: [
      "E > AA > QQ when he walks for CS",
      "Stay inside minion wave to block his Q lick",
      "At 60%: Q > E > QQ > wait for jump > R > Ignite",
      "R him into enemy team in teamfights",
      "He's tanky but you outdamage with PTA",
    ],
    powerspikes: [
      "Level 3 — E > QQ trade chunks him",
      "Level 6 — R after his W jump",
      "BOTRK — shreds his massive HP pool",
    ],
    threats: [
      "His Q poke and stun at 3 stacks",
      "His W devour saving allies",
      "His grey health sustain",
    ],
    recommendedRunes: runesFromKeystone(
      "Press the Attack",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Mercury's Treads",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Black Cleaver", "Death's Dance", "Guardian Angel"],
      "HP shred to cut through the river king"
    ),
    summonerSpells: ["Flash", "Ignite"],
    tags: ["tank", "sett-favored"],
  },
  {
    champion: "Teemo",
    slug: "teemo",
    difficulty: "Medium",
    difficultyScore: 5,
    lanePhase:
      "Hit minion for Fleet MS > Q MS > E > QQ = good trade, finish with W. If he hits you under tower, flash E > R insec under your turret = kill. At 60% HP in mid lane: Ghost > R > AA > QQ > E > W = kill.",
    keyTips: [
      "Fleet MS > Q MS > E > QQ > finish with W",
      "Flash E > R insec under turret when he pokes there",
      "Ghost > R > AA > QQ > E > W at 60% HP",
      "Fleet Footwork + Second Wind for sustain",
      "Tenacity stat shard helps vs his blind",
    ],
    powerspikes: [
      "Level 6 — R gives gap close for all-in",
      "Stridebreaker — catches him reliably",
      "Spectre's Cowl — reduces his poke",
    ],
    threats: [
      "His blind negating your autos",
      "His W movement speed for kiting",
      "Post-6 shroom zone control",
    ],
    recommendedRunes: runesFromKeystone(
      "Fleet Footwork",
      ["Absorb Life", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Tenacity"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Shield",
      "Mercury's Treads",
      ["Stridebreaker", "Spirit Visage", "Sterak's Gage"],
      ["Force of Nature", "Blade of the Ruined King", "Death's Dance"],
      "Sustain through poke, all-in when Fleet is up"
    ),
    summonerSpells: ["Flash", "Ghost"],
    tags: ["ranged", "poke", "skill-matchup"],
  },
  {
    champion: "Trundle",
    slug: "trundle",
    difficulty: "Easy",
    difficultyScore: 3,
    lanePhase:
      "When he walks up for minions, E > AA > QQ = good trade. At 60% HP post-6: E > AA > QQ > Ignite > R > AA > finish with W. Be careful: one death = lose all platings + tower. Pay attention to jungle threat. Always land E + W or you lose the fight.",
    keyTips: [
      "E > AA > QQ when he walks for CS",
      "At 60% post-6: E > AA > QQ > Ignite > R > W",
      "One death = he takes everything — don't die",
      "Must land E + W combo or you lose fights",
      "Watch for jungle ganks — he sets up well",
    ],
    powerspikes: [
      "Level 3 — E > QQ trade chunks",
      "Level 6 — kill potential with Ignite at 60%",
      "BOTRK — dueling power",
    ],
    threats: [
      "His R stealing your stats",
      "His pillar trapping you for ganks",
      "His split push threat if you die once",
    ],
    recommendedRunes: runesFromKeystone(
      "Press the Attack",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Bone Plating", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Death's Dance", "Thornmail", "Guardian Angel"],
      "Burst trades to avoid his stat steal"
    ),
    summonerSpells: ["Flash", "Ignite"],
    tags: ["bruiser", "sett-favored", "split-push"],
  },
  {
    champion: "Tryndamere",
    slug: "tryndamere",
    difficulty: "Easy",
    difficultyScore: 3,
    lanePhase:
      "Trade pattern: E > AA > QQ. If he all-ins: AA > QQ > AA > E > W > Ignite = kill. At 20% HP with grit: flash W angle — even if he has R, he can't react to it. Use R to force his R on low HP then dive. Make distance while trading — don't take E damage when he disengages.",
    keyTips: [
      "E > AA > QQ trade pattern",
      "All-in: AA > QQ > AA > E > W > Ignite",
      "Flash W at 20% HP — he can't react even with R",
      "R to force his R, then finish after it expires",
      "Keep distance so his E disengage doesn't hit you",
    ],
    powerspikes: [
      "Level 1 — E > AA > QQ trades well",
      "Level 6 — R forces his R, then finish",
      "BOTRK — massive dueling power",
    ],
    threats: [
      "His R making him unkillable for 5 seconds",
      "His crit RNG early game",
      "His E disengage hitting you as he leaves",
    ],
    recommendedRunes: runesFromKeystone(
      "Press the Attack",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Bone Plating", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Randuin's Omen", "Death's Dance", "Guardian Angel"],
      "Burst him and force his R"
    ),
    summonerSpells: ["Flash", "Ignite"],
    tags: ["bruiser", "sett-favored", "all-in"],
  },
  {
    champion: "Udyr",
    slug: "udyr",
    difficulty: "Medium",
    difficultyScore: 5,
    lanePhase:
      "If he starts phoenix form level 1: AA > AA > E > AA. Get level 2: E > AA > QQ > AA > Ignite = kill. Once he has bear form, respect his healing + shield. If he phoenix Rs you under your tower at 60% HP: E grab > flash R insec under tower. Main priority is clearing waves under tower, not necessarily killing Udyr.",
    keyTips: [
      "Punish phoenix form level 1: AA > AA > E > AA",
      "Level 2: E > AA > QQ > Ignite = kill",
      "Respect his bear form healing + shield",
      "E > flash > R insec under tower at 60%",
      "Focus on wave clear — killing Udyr is secondary",
    ],
    powerspikes: [
      "Level 2 — kill potential with Ignite",
      "Level 6 — insec potential under tower",
      "BOTRK — cuts through his sustain",
    ],
    threats: [
      "His bear form sustain + shield",
      "His phoenix form DPS",
      "His mobility with bear form MS",
    ],
    recommendedRunes: runesFromKeystone(
      "Press the Attack",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Mercury's Treads",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Spirit Visage", "Death's Dance", "Thornmail"],
      "Sustained damage to match Udyr's DPS"
    ),
    summonerSpells: ["Flash", "Ignite"],
    tags: ["bruiser", "skill-matchup"],
  },
  {
    champion: "Urgot",
    slug: "urgot",
    difficulty: "Medium",
    difficultyScore: 5,
    lanePhase:
      "Start lane by walking up to bait his E, sidestep it, then AA > AA > E when out of auto range to win trade. Trade pattern: E > AA > QQ. At 60% HP in middle of lane: E > AA > QQ > Ghost > AA > AA > QQ > finish with W. When Urgot tries to jump, look at his shield then R > AA > QQ > AA > E > W = win.",
    keyTips: [
      "Bait his E flip, sidestep, then punish with autos",
      "E > AA > QQ trade pattern",
      "At 60%: E > QQ > Ghost > AA > finish with W",
      "R when he engages with E — turns the fight",
      "Sidestep his E is key to winning",
    ],
    powerspikes: [
      "Level 1 — bait and punish his E",
      "Level 6 — R counters his E engage",
      "BOTRK — shreds his HP",
    ],
    threats: [
      "His E flip engage",
      "His passive shotgun legs DPS",
      "His R execute if you get low",
    ],
    recommendedRunes: runesFromKeystone(
      "Conqueror",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Death's Dance", "Black Cleaver", "Guardian Angel"],
      "Sustained trades to outfight the crab"
    ),
    summonerSpells: ["Flash", "Ghost"],
    tags: ["bruiser", "skill-matchup"],
  },
  {
    champion: "Vayne",
    slug: "vayne",
    difficulty: "Counter",
    difficultyScore: 10,
    lanePhase:
      "One of Sett's hardest matchups — consider banning. Work on CS and staying even. Look for flash E > R insec at level 6 only if she's 60% HP. Otherwise, only farm and play safe. You don't win this lane without jungle help.",
    keyTips: [
      "Consider banning this champion",
      "Focus on farming and staying even",
      "Flash E > R insec at 60% HP is your only kill window",
      "Only farm and play safe — don't force fights",
      "Call for jungle help — she's squishy if CC'd",
    ],
    powerspikes: [
      "Level 6 — R insec is your only play",
      "Stridebreaker — slow helps catch her",
      "Tabis — reduces auto damage",
    ],
    threats: [
      "Her Condemn cancels your R and E engage",
      "Silver Bolts true damage — can't itemize against it",
      "Her R + Q stealth kiting",
    ],
    recommendedRunes: runesFromKeystone(
      "Fleet Footwork",
      ["Absorb Life", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Shield",
      "Plated Steelcaps",
      ["Stridebreaker", "Dead Man's Plate", "Force of Nature"],
      ["Randuin's Omen", "Sterak's Gage", "Gargoyle Stoneplate"],
      "Survive lane and look for one insec opportunity"
    ),
    summonerSpells: ["Flash", "Teleport"],
    tags: ["ranged", "counter", "survive-lane"],
  },
  {
    champion: "Vladimir",
    slug: "vladimir",
    difficulty: "Medium",
    difficultyScore: 5,
    lanePhase:
      "Cheese from 3rd bush level 1: AA > E > AA. Level 2: E > AA > QQ for a good trade. Auto as much as possible before using W to force his blood pool. With ult at 60% HP: R > AA > QQ > Ignite > E > W after he uses pool. BOTRK angle: E > AA > QQ > Ignite > R for 100-0 all-in potential.",
    keyTips: [
      "3rd bush cheese level 1: AA > E > AA",
      "E > AA > QQ trade at level 2",
      "Force his blood pool with autos before using W",
      "R > AA > QQ > Ignite > E > W after pool at 60%",
      "BOTRK: E > AA > QQ > Ignite > R for 100-0",
    ],
    powerspikes: [
      "Level 1 — bush cheese",
      "Level 6 — R combo after forcing pool",
      "BOTRK — 100-0 all-in potential",
    ],
    threats: [
      "His blood pool dodging your combo",
      "His Q sustain in lane",
      "His scaling — he becomes a teamfight monster",
    ],
    recommendedRunes: runesFromKeystone(
      "Press the Attack",
      ["Absorb Life", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Mercury's Treads",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Maw of Malmortius", "Death's Dance", "Sterak's Gage"],
      "Burst to force pool then finish"
    ),
    summonerSpells: ["Flash", "Ignite"],
    tags: ["ap-mage", "skill-matchup", "scaling"],
  },
  {
    champion: "Volibear",
    slug: "volibear",
    difficulty: "Easy",
    difficultyScore: 3,
    lanePhase:
      "Aggressive level 1: AA > AA > E when out of range > dodge his lightning > AA = win trade. Get level 2: E > AA > QQ > Ignite = kill. At 40% HP: flash > E > QQ > Ignite = kill. When he uses E > Q > W combo: AA > QQ > E > W > Ignite = kill. Post-6 when he runs at you with Q and presses E, wait until he's about to hit you then R > AA > QQ > E > W > Ignite. If he jumps under tower, stay calm: AA > QQ > E > W > R.",
    keyTips: [
      "Aggressive level 1 — dodge his lightning circle",
      "Level 2: E > AA > QQ > Ignite = kill",
      "R when he Q charges at you post-6",
      "Stay calm if he tower dives — AA > QQ > E > W > R",
      "If he runs back, let him — don't waste W",
    ],
    powerspikes: [
      "Level 1 — you outstat him in melee",
      "Level 2 — kill potential with Ignite",
      "Level 6 — R counters his Q charge",
    ],
    threats: [
      "His Q stun + E combo burst",
      "His W healing at low HP",
      "His R tower disable for dives",
    ],
    recommendedRunes: runesFromKeystone(
      "Press the Attack",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Unflinching", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Death's Dance", "Spirit Visage", "Guardian Angel"],
      "Aggressive all-in to dominate the bear"
    ),
    summonerSpells: ["Flash", "Ignite"],
    tags: ["juggernaut", "sett-favored", "all-in"],
  },
  // ===== W to Z =====
  {
    champion: "Warwick",
    slug: "warwick",
    difficulty: "Easy",
    difficultyScore: 3,
    lanePhase:
      "Start W level 1: AA > AA > AA > W after he bites to trade back. Level 2: AA > AA > AA > get grit > E > W > Ignite = kill. Level 6: E > AA > QQ, wait until 50% HP. At 50% HP: AA > QQ > E > W > R > Ignite = kill.",
    keyTips: [
      "Start W level 1 — trade back after his bite",
      "Level 2: get grit > E > W > Ignite = kill",
      "Level 6: E > AA > QQ, wait for 50% HP",
      "AA > QQ > E > W > R > Ignite at 50%",
      "Bone Plating absorbs his burst",
    ],
    powerspikes: [
      "Level 1 — W start trades back well",
      "Level 2 — grit combo with Ignite kills",
      "Level 6 — R finisher combo",
    ],
    threats: [
      "His Q sustain on hit",
      "His W attack speed at low HP",
      "His R suppression",
    ],
    recommendedRunes: runesFromKeystone(
      "Press the Attack",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Bone Plating", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Thornmail", "Death's Dance", "Guardian Angel"],
      "Burst trades to beat the wolf"
    ),
    summonerSpells: ["Flash", "Ignite"],
    tags: ["bruiser", "sett-favored", "all-in"],
  },
  {
    champion: "Wukong",
    slug: "wukong",
    difficulty: "Hard",
    difficultyScore: 7,
    lanePhase:
      "If he fights level 1, hit back and get mid grit then W to trade back. Short trades: E > AA > QQ. If he ults: AA > QQ > Ignite > E > W > R the real one — you can identify the real Wukong with Ignite tick. You can R his clone into the real champion. If you're 70% HP near his turret post-6, DO NOT trade — he can kill you.",
    keyTips: [
      "W trade back at level 1 when you have grit",
      "E > AA > QQ short trade pattern",
      "Ignite reveals the real Wukong during his clone",
      "R his clone into the real one",
      "Don't trade near his turret at 70% HP post-6",
    ],
    powerspikes: [
      "Level 1 — W trade with grit",
      "Level 3 — short trade pattern",
      "Stridebreaker — catches him after clone",
    ],
    threats: [
      "His clone juking your combo",
      "His double R knock-up",
      "His burst combo if he snowballs",
    ],
    recommendedRunes: runesFromKeystone(
      "Press the Attack",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Bone Plating", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Death's Dance", "Randuin's Omen", "Guardian Angel"],
      "Short trades — don't let him snowball"
    ),
    summonerSpells: ["Flash", "Ignite"],
    tags: ["bruiser", "hard-matchup", "clone"],
  },
  {
    champion: "Yasuo",
    slug: "yasuo",
    difficulty: "Easy",
    difficultyScore: 3,
    lanePhase:
      "Can start W or E — full aggressive level 1, you're way stronger and win thanks to Conqueror. Respect Yasuo in big minion waves. AA > QQ > AA > E > W — use E stun to guarantee W damage. When he has tornado, R at the same time to dodge the knock-up then AA > QQ = kill.",
    keyTips: [
      "Full aggression level 1 — Conqueror wins the fight",
      "Respect his damage in big minion waves",
      "AA > QQ > AA > E stun > W for guaranteed damage",
      "R at same time as his tornado to dodge knock-up",
      "He's squishy — one combo kills",
    ],
    powerspikes: [
      "Level 1 — Conqueror outtrades him",
      "Level 3 — full combo wins easily",
      "Level 6 — R dodges his tornado",
    ],
    threats: [
      "His tornado knock-up into R",
      "His damage in big minion waves with E dashes",
      "His windwall blocking nothing (but can block your team's stuff)",
    ],
    recommendedRunes: runesFromKeystone(
      "Conqueror",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Death's Dance", "Randuin's Omen", "Guardian Angel"],
      "Aggressive all-in to dominate the samurai"
    ),
    summonerSpells: ["Flash", "Ghost"],
    tags: ["bruiser", "sett-favored", "all-in"],
  },
  {
    champion: "Yone",
    slug: "yone",
    difficulty: "Medium",
    difficultyScore: 5,
    lanePhase:
      "Aggressive level 1: AA > AA > E > AA. Trade pattern: E > AA > QQ. Don't chase Yone in his E spirit form — sidestep his Qs instead. At 60% HP: Ghost > AA > QQ > AA > AA > E > W = kill while sidestepping 1-2 Qs. With ult: E > AA > QQ > Ghost > AA > wait for his R > use R to counter. With BOTRK: E > AA > QQ = half his HP, then look for all-in or dive.",
    keyTips: [
      "Aggressive level 1: AA > AA > E > AA",
      "E > AA > QQ trade pattern",
      "Don't chase his E spirit — let him come back",
      "Wait for his R, then counter with your R",
      "BOTRK: E > AA > QQ halves his HP",
    ],
    powerspikes: [
      "Level 1 — you outstat him",
      "Level 6 — R counters his R",
      "BOTRK — E > QQ chunks half HP",
    ],
    threats: [
      "His E spirit form trading",
      "His R knock-up engage",
      "His scaling with crit items",
    ],
    recommendedRunes: runesFromKeystone(
      "Press the Attack",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Death's Dance", "Randuin's Omen", "Guardian Angel"],
      "Aggressive trades to deny his scaling"
    ),
    summonerSpells: ["Flash", "Ghost"],
    tags: ["bruiser", "skill-matchup", "scaling"],
  },
  {
    champion: "Yorick",
    slug: "yorick",
    difficulty: "Easy",
    difficultyScore: 3,
    lanePhase:
      "Cheese from bush level 1: AA > AA > E > AA. Get level 2: E > AA > QQ trade pattern. At 50% HP under turret, get level 3 for dive window. Get level 6, wait until he pushes towards you, make one trade then Ghost > R > AA > QQ > E > AA > finish with W = kill. Kill Yorick, push wave to tier 2, then rotate around the map.",
    keyTips: [
      "Bush cheese level 1: AA > AA > E > AA",
      "E > AA > QQ trade pattern at level 2",
      "Dive at ~50% HP when level 3",
      "Ghost > R > AA > QQ > E > W at level 6",
      "Kill him then push to tier 2 and roam",
    ],
    powerspikes: [
      "Level 1 — bush cheese",
      "Level 3 — dive window at 50%",
      "Level 6 — Ghost + R all-in",
    ],
    threats: [
      "His wall cage trapping you",
      "His Maiden split push pressure",
      "His ghouls DPS if you eat the cage",
    ],
    recommendedRunes: runesFromKeystone(
      "Conqueror",
      ["Triumph", "Legend: Alacrity", "Last Stand"],
      "Resolve",
      ["Second Wind", "Shield Bash"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Plated Steelcaps",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Hullbreaker", "Death's Dance", "Guardian Angel"],
      "Kill and push — match his split push"
    ),
    summonerSpells: ["Flash", "Ghost"],
    tags: ["bruiser", "sett-favored", "split-push"],
  },
  {
    champion: "Zac",
    slug: "zac",
    difficulty: "Medium",
    difficultyScore: 5,
    lanePhase:
      "Level 1 play aggressive and zone from minions: AA > AA > E > AA. Level 2: E > AA > QQ > AA. Post-6 when he jumps on you: AA > AA > Ghost > AA > E > W > R > AA. When he uses ult: AA > QQ > AA > E > W > wait until he jumps > R.",
    keyTips: [
      "Zone him from minions level 1",
      "E > AA > QQ > AA at level 2",
      "Ghost > AA > E > W > R when he jumps on you post-6",
      "Wait for his R jump to finish, then R him",
      "Step on his blobs to deny healing",
    ],
    powerspikes: [
      "Level 1-2 — you bully him early",
      "Level 6 — R after his R jump",
      "BOTRK — shreds his HP pool",
    ],
    threats: [
      "His E engage from range",
      "His R knock-up chain in teamfights",
      "His passive revive blobs",
    ],
    recommendedRunes: runesFromKeystone(
      "Conqueror",
      ["Triumph", "Legend: Alacrity", "Cut Down"],
      "Resolve",
      ["Second Wind", "Revitalize"],
      ["Attack Speed", "Adaptive Force", "Flat HP"]
    ),
    recommendedBuild: bruiserBuild(
      "Doran's Blade",
      "Mercury's Treads",
      ["Stridebreaker", "Black Cleaver", "Bloodmail"],
      ["Spirit Visage", "Black Cleaver", "Guardian Angel"],
      "HP shred to cut through the blob"
    ),
    summonerSpells: ["Flash", "Ghost"],
    tags: ["tank", "skill-matchup"],
  },
];

export function getMatchup(slug: string): Matchup | undefined {
  return matchups.find((m) => m.slug === slug);
}

export function getMatchupsByDifficulty(difficulty: string): Matchup[] {
  return matchups.filter((m) => m.difficulty === difficulty);
}
