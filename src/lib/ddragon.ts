const DDRAGON_VERSION = "16.10.1";
const BASE = `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}`;

const CHAMPION_ID_MAP: Record<string, string> = {
  Aatrox: "Aatrox",
  Akali: "Akali",
  Ambessa: "Ambessa",
  Aurora: "Aurora",
  Briar: "Briar",
  Camille: "Camille",
  Cassiopeia: "Cassiopeia",
  "Cho'Gath": "Chogath",
  Darius: "Darius",
  "Dr. Mundo": "DrMundo",
  Fiora: "Fiora",
  Gangplank: "Gangplank",
  Garen: "Garen",
  Gnar: "Gnar",
  Gwen: "Gwen",
  Gragas: "Gragas",
  Heimerdinger: "Heimerdinger",
  Illaoi: "Illaoi",
  Irelia: "Irelia",
  Jax: "Jax",
  Jayce: "Jayce",
  Kayle: "Kayle",
  Kennen: "Kennen",
  Kled: "Kled",
  "K'Sante": "KSante",
  Lillia: "Lillia",
  Malphite: "Malphite",
  Maokai: "Maokai",
  Mordekaiser: "Mordekaiser",
  Nasus: "Nasus",
  Olaf: "Olaf",
  Ornn: "Ornn",
  Pantheon: "Pantheon",
  Poppy: "Poppy",
  Quinn: "Quinn",
  "Rek'Sai": "RekSai",
  Renekton: "Renekton",
  Rengar: "Rengar",
  Riven: "Riven",
  Rumble: "Rumble",
  Sett: "Sett",
  Shen: "Shen",
  Singed: "Singed",
  Sion: "Sion",
  Smolder: "Smolder",
  "Tahm Kench": "TahmKench",
  Teemo: "Teemo",
  Trundle: "Trundle",
  Tryndamere: "Tryndamere",
  Udyr: "Udyr",
  Urgot: "Urgot",
  Vayne: "Vayne",
  Vladimir: "Vladimir",
  Volibear: "Volibear",
  Warwick: "Warwick",
  Wukong: "MonkeyKing",
  Yasuo: "Yasuo",
  Yone: "Yone",
  Yorick: "Yorick",
  Zac: "Zac",
};

export function championIconUrl(championName: string): string {
  const id = CHAMPION_ID_MAP[championName] ?? championName.replace(/[' .]/g, "");
  return `${BASE}/img/champion/${id}.png`;
}

export function itemIconUrl(itemId: number): string {
  return `${BASE}/img/item/${itemId}.png`;
}

export function profileIconUrl(iconId: number): string {
  return `${BASE}/img/profileicon/${iconId}.png`;
}

export { DDRAGON_VERSION };
