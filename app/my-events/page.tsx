"use client";

import Link from "next/link";
import { events } from "@/data";
import { useEvents } from "@/context/EventContext";
import EventCard, { type CampusEvent } from "@/components/EventCard";

export default function MyEventsPage() {
  const { savedIds } = useEvents();
  const savedEvents = events.filter((event) => savedIds.includes(event.id));

  return (
    <main className="mx-auto min-h-[calc(100vh-73px)] max-w-6xl px-4 py-10">
      <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">Your schedule</p>
      <h1 className="mt-2 text-4xl font-extrabold">My Events</h1>

      {savedEvents.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {savedEvents.map((event) => <EventCard key={event.id} event={event as CampusEvent} />)}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-indigo-50 text-2xl text-indigo-600">♡</div>
          <h2 className="text-xl font-bold">No saved events yet</h2>
          <p className="mt-2 text-slate-500">Browse the board and save events you want to attend.</p>
          <Link href="/" className="mt-6 inline-block rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white hover:bg-indigo-700">
            Explore events
          </Link>
        </div>
      )}
    </main>
  );
}
