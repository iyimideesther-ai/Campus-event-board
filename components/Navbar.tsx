"use client";

import Link from "next/link";
import { useEvents } from "@/context/EventContext";

export default function Navbar() {
  const { savedIds } = useEvents();
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" aria-label="Campus Event Board home" className="flex items-center gap-2 font-bold text-slate-900">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-lg text-white">C</span>
          Campus Board
        </Link>
        <div className="flex items-center gap-5 text-sm font-semibold">
          <Link href="/" className="text-slate-600 hover:text-indigo-600">Explore</Link>
          <Link href="/my-events" className="rounded-full bg-indigo-50 px-4 py-2 text-indigo-700 hover:bg-indigo-100">
            My Events <span className="ml-1 rounded-full bg-indigo-600 px-2 py-0.5 text-xs text-white">{savedIds.length}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
