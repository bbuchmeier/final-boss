"use client";

type Game = { win: boolean; opponentChampion: string };

export function WinRateChart({ games }: { games: Game[] }) {
  if (games.length < 2) return null;

  const reversed = [...games].reverse();
  const points: { x: number; y: number; wr: number; label: string }[] = [];

  let wins = 0;
  for (let i = 0; i < reversed.length; i++) {
    if (reversed[i].win) wins++;
    const wr = (wins / (i + 1)) * 100;
    points.push({
      x: i,
      y: wr,
      wr,
      label: `${(i + 1)} games: ${wr.toFixed(0)}% vs ${reversed[i].opponentChampion}`,
    });
  }

  const width = 500;
  const height = 160;
  const padX = 40;
  const padY = 20;
  const chartW = width - padX * 2;
  const chartH = height - padY * 2;

  const maxGames = points.length - 1;

  function toSvg(i: number, wr: number) {
    const x = padX + (maxGames === 0 ? chartW / 2 : (i / maxGames) * chartW);
    const y = padY + chartH - (wr / 100) * chartH;
    return { x, y };
  }

  const pathD = points
    .map((p, i) => {
      const { x, y } = toSvg(p.x, p.y);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const areaD = `${pathD} L ${padX + chartW} ${padY + chartH} L ${padX} ${padY + chartH} Z`;

  const lastPoint = points[points.length - 1];
  const lastSvg = toSvg(lastPoint.x, lastPoint.y);
  const fiftyY = padY + chartH - (50 / 100) * chartH;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
      <h3 className="mb-3 text-sm font-bold text-zinc-100">
        Win Rate Trend
      </h3>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* 50% reference line */}
        <line
          x1={padX}
          y1={fiftyY}
          x2={padX + chartW}
          y2={fiftyY}
          stroke="#3f3f46"
          strokeDasharray="4 4"
          strokeWidth={1}
        />
        <text x={padX - 4} y={fiftyY + 4} textAnchor="end" fill="#71717a" fontSize={10}>
          50%
        </text>
        <text x={padX - 4} y={padY + 4} textAnchor="end" fill="#71717a" fontSize={10}>
          100%
        </text>
        <text x={padX - 4} y={padY + chartH + 4} textAnchor="end" fill="#71717a" fontSize={10}>
          0%
        </text>

        {/* Area fill */}
        <path
          d={areaD}
          fill="url(#wrGradient)"
          opacity={0.3}
        />

        {/* Line */}
        <path
          d={pathD}
          fill="none"
          stroke={lastPoint.wr >= 50 ? "#34d399" : "#f87171"}
          strokeWidth={2}
          strokeLinejoin="round"
        />

        {/* End dot */}
        <circle
          cx={lastSvg.x}
          cy={lastSvg.y}
          r={4}
          fill={lastPoint.wr >= 50 ? "#34d399" : "#f87171"}
        />
        <text
          x={lastSvg.x}
          y={lastSvg.y - 8}
          textAnchor="middle"
          fill={lastPoint.wr >= 50 ? "#34d399" : "#f87171"}
          fontSize={11}
          fontWeight="bold"
        >
          {lastPoint.wr.toFixed(0)}%
        </text>

        {/* Axis labels */}
        <text x={padX} y={height - 2} fill="#52525b" fontSize={9}>
          Oldest
        </text>
        <text x={padX + chartW} y={height - 2} textAnchor="end" fill="#52525b" fontSize={9}>
          Recent
        </text>

        {/* Gradient def */}
        <defs>
          <linearGradient id="wrGradient" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={lastPoint.wr >= 50 ? "#34d399" : "#f87171"}
              stopOpacity={0.4}
            />
            <stop
              offset="100%"
              stopColor={lastPoint.wr >= 50 ? "#34d399" : "#f87171"}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
      </svg>
      <p className="mt-2 text-center text-xs text-zinc-600">
        Cumulative win rate over {games.length} games
      </p>
    </div>
  );
}
