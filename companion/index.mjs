/**
 * Final Boss LCU Companion
 * Bridges the League of Legends client to the Next.js app via WebSocket.
 *
 * Usage: npm run companion
 */

import fs from "fs";
import { WebSocket, WebSocketServer } from "ws";

// ─── Config ───────────────────────────────────────────────────────────────────

const COMPANION_PORT = 3003;
const DDRAGON_VERSION = "16.10.1";

const LOCKFILE_PATHS = [
  "C:\\Riot Games\\League of Legends\\lockfile",
  "C:\\Program Files\\Riot Games\\League of Legends\\lockfile",
  "C:\\Program Files (x86)\\Riot Games\\League of Legends\\lockfile",
  // Add your custom path here if LoL is installed elsewhere:
  // "D:\\Games\\League of Legends\\lockfile",
];

// ─── State ────────────────────────────────────────────────────────────────────

let champIdToName = {}; // { 875: "Sett", 75: "Nasus", ... }
let lcuSocket = null;
let appClients = new Set();
let currentState = { connected: false, phase: "idle", champSelect: null };

// ─── Utilities ────────────────────────────────────────────────────────────────

function nameToSlug(name) {
  if (!name) return null;
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function broadcast(msg) {
  const payload = JSON.stringify(msg);
  for (const client of appClients) {
    if (client.readyState === WebSocket.OPEN) client.send(payload);
  }
}

function findLockfile() {
  for (const p of LOCKFILE_PATHS) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function parseLockfile(filePath) {
  const raw = fs.readFileSync(filePath, "utf8").trim();
  const parts = raw.split(":");
  // format: LeagueClient:PID:PORT:PASSWORD:PROTOCOL
  return { port: parts[2], password: parts[3] };
}

// ─── DDragon ──────────────────────────────────────────────────────────────────

async function buildChampMap() {
  try {
    const res = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/data/en_US/champion.json`
    );
    const json = await res.json();
    const map = {};
    for (const champ of Object.values(json.data)) {
      map[parseInt(champ.key)] = champ.name;
    }
    console.log(`[Companion] Loaded ${Object.keys(map).length} champions from DDragon`);
    return map;
  } catch (e) {
    console.error("[Companion] Failed to fetch champion data:", e.message);
    return {};
  }
}

// ─── LCU Event Handlers ───────────────────────────────────────────────────────

function handlePhase(phase) {
  currentState.phase = phase;
  broadcast({ type: "phase", phase });

  // Clear champ select data when leaving champ select
  if (phase !== "ChampSelect") {
    currentState.champSelect = null;
    broadcast({ type: "champSelect", data: null });
  }

  console.log(`[LCU] Phase: ${phase}`);
}

function handleChampSelect(session) {
  if (!session) return;

  const { localPlayerCellId, myTeam = [], theirTeam = [] } = session;

  // Find the local player
  const me = myTeam.find((p) => p.cellId === localPlayerCellId);
  const myChampId = me?.championId || me?.championPickIntent || 0;
  const myPosition = me?.assignedPosition || "unknown";

  // Map enemy picks — show both hovered (intent) and locked champions
  const enemies = theirTeam
    .map((p) => {
      const id = p.championId || p.championPickIntent || 0;
      if (!id) return null;
      const name = champIdToName[id] || null;
      return {
        championId: id,
        championName: name,
        slug: nameToSlug(name),
        locked: p.championId > 0,
      };
    })
    .filter(Boolean);

  const myName = champIdToName[myChampId] || null;

  const data = {
    myChampion: {
      id: myChampId,
      name: myName,
      slug: nameToSlug(myName),
    },
    myPosition,
    enemies,
  };

  currentState.champSelect = data;
  broadcast({ type: "champSelect", data });
}

// ─── LCU WebSocket ────────────────────────────────────────────────────────────

function connectToLCU({ port, password }) {
  if (lcuSocket) {
    try { lcuSocket.close(); } catch {}
    lcuSocket = null;
  }

  const url = `wss://127.0.0.1:${port}`;
  const auth = Buffer.from(`riot:${password}`).toString("base64");

  console.log(`[LCU] Connecting to ${url}...`);

  lcuSocket = new WebSocket(url, {
    headers: { Authorization: `Basic ${auth}` },
    rejectUnauthorized: false, // LCU uses a self-signed cert
  });

  lcuSocket.on("open", () => {
    console.log("[LCU] Connected ✓");
    currentState.connected = true;
    broadcast({ type: "status", connected: true });

    // Subscribe to the events we care about
    lcuSocket.send(JSON.stringify([5, "OnJsonApiEvent_lol-gameflow_v1_gameflow-phase"]));
    lcuSocket.send(JSON.stringify([5, "OnJsonApiEvent_lol-champ-select_v1_session"]));

    // Also fetch current phase immediately via REST
    fetchCurrentPhase({ port, password });
  });

  lcuSocket.on("message", (raw) => {
    try {
      const msg = JSON.parse(raw.toString());
      // WAMP event message type = 8
      if (!Array.isArray(msg) || msg[0] !== 8) return;
      const [, eventName, payload] = msg;

      if (eventName === "OnJsonApiEvent_lol-gameflow_v1_gameflow-phase") {
        handlePhase(payload.data);
      } else if (eventName === "OnJsonApiEvent_lol-champ-select_v1_session") {
        handleChampSelect(payload.data);
      }
    } catch {}
  });

  lcuSocket.on("close", () => {
    console.log("[LCU] Disconnected — will retry...");
    currentState.connected = false;
    currentState.phase = "idle";
    currentState.champSelect = null;
    lcuSocket = null;
    broadcast({ type: "status", connected: false });
    setTimeout(tryConnect, 3000);
  });

  lcuSocket.on("error", () => {
    // suppress — handled by close
  });
}

async function fetchCurrentPhase({ port, password }) {
  try {
    const auth = Buffer.from(`riot:${password}`).toString("base64");
    const res = await fetch(`https://127.0.0.1:${port}/lol-gameflow/v1/gameflow-phase`, {
      headers: { Authorization: `Basic ${auth}` },
      // @ts-ignore
      dispatcher: new (await import("undici")).Agent({ connect: { rejectUnauthorized: false } }),
    }).catch(() => null);

    if (res?.ok) {
      const phase = await res.json();
      handlePhase(phase);
    }
  } catch {}
}

// ─── Polling for lockfile ─────────────────────────────────────────────────────

function tryConnect() {
  const lockfilePath = findLockfile();

  if (!lockfilePath) {
    console.log("[Companion] Waiting for League of Legends client...");
    setTimeout(tryConnect, 2000);
    return;
  }

  try {
    const { port, password } = parseLockfile(lockfilePath);
    connectToLCU({ port, password });
  } catch (e) {
    console.error("[Companion] Error reading lockfile:", e.message);
    setTimeout(tryConnect, 2000);
  }
}

// ─── App WebSocket Server ─────────────────────────────────────────────────────

function startServer() {
  const wss = new WebSocketServer({ port: COMPANION_PORT });

  wss.on("connection", (ws) => {
    appClients.add(ws);
    console.log(`[Server] App connected (${appClients.size} clients)`);

    // Send current state immediately on connect
    ws.send(JSON.stringify({ type: "status", connected: currentState.connected }));
    if (currentState.phase !== "idle") {
      ws.send(JSON.stringify({ type: "phase", phase: currentState.phase }));
    }
    if (currentState.champSelect) {
      ws.send(JSON.stringify({ type: "champSelect", data: currentState.champSelect }));
    }

    ws.on("close", () => {
      appClients.delete(ws);
      console.log(`[Server] App disconnected (${appClients.size} clients)`);
    });
    ws.on("error", () => appClients.delete(ws));
  });

  wss.on("error", (e) => {
    if (e.code === "EADDRINUSE") {
      console.error(`[Server] Port ${COMPANION_PORT} is already in use. Is the companion already running?`);
      process.exit(1);
    }
  });

  console.log(`[Server] Listening on ws://localhost:${COMPANION_PORT}`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("╔══════════════════════════════════════╗");
  console.log("║  Final Boss LCU Companion            ║");
  console.log("╚══════════════════════════════════════╝");

  champIdToName = await buildChampMap();
  startServer();
  tryConnect();
}

main().catch(console.error);
