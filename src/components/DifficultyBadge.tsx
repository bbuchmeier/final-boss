import { Difficulty } from "@/lib/types";

const colors: Record<Difficulty, string> = {
  Easy: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Hard: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Counter: "bg-red-500/20 text-red-400 border-red-500/30",
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold ${colors[difficulty]}`}
    >
      {difficulty}
    </span>
  );
}
