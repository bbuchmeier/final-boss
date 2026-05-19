import Link from "next/link";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">&#x1F94A;</span>
          <span className="text-xl font-black tracking-tight text-amber-400">
            FINAL BOSS
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/matchups"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-amber-400"
          >
            Matchups
          </Link>
          <Link
            href="/builds"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-amber-400"
          >
            Builds
          </Link>
          <Link
            href="/stats"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-amber-400"
          >
            My Stats
          </Link>
        </div>
      </div>
    </nav>
  );
}
