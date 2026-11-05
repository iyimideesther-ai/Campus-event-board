"use client";

import Link from "next/link";
import { useEvents } from "@/context/EventContext";

export type CampusEvent = {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  image: string;
  description: string;
};

const categoryStyles: Record<string, string> = {
  Tech: "bg-blue-100 text-blue-700",
  Sports: "bg-emerald-100 text-emerald-700",
  Faith: "bg-violet-100 text-violet-700",
  Social: "bg-orange-100 text-orange-700",
};

export default function EventCard({ event }: { event: CampusEvent }) {
  const { isSaved, toggleSaved } = useEvents();
  const saved = isSaved(event.id);

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/events/${event.id}`} className="block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={event.image} alt="" className="h-48 w-full object-cover transition duration-500 group-hover:scale-105" />
      </Link>
      <div className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${categoryStyles[event.category]}`}>
            {event.category}
          </span>
          <span className="text-xs font-semibold text-slate-500">
            {new Date(`${event.date}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </span>
        </div>
        <Link href={`/events/${event.id}`}>
          <h2 className="text-lg font-bold text-slate-900 transition group-hover:text-indigo-600">{event.title}</h2>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">{event.description}</p>
        <p className="mt-4 text-xs font-medium text-slate-500">{event.time} · {event.venue}</p>
        <button
          type="button"
          onClick={() => toggleSaved(event.id)}
          className={`mt-4 w-full rounded-xl border px-4 py-2.5 text-sm font-bold transition ${
            saved ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-300 text-slate-700 hover:border-indigo-600 hover:text-indigo-600"
          }`}
        >
          {saved ? "Saved ✓" : "Save event"}
        </button>
      </div>
    </article>
  );
}
