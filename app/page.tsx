"use client";

import { useMemo, useState } from "react";
import { events } from "@/data";
import EventCard, { type CampusEvent } from "@/components/EventCard";

const categories = ["All", "Tech", "Sports", "Faith", "Social"];

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("soonest");

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => category === "All" || event.category === category)
      .filter((event) => event.title.toLowerCase().includes(query.toLowerCase().trim()))
      .sort((a, b) => sort === "soonest"
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date));
  }, [category, query, sort]);

  return (
    <main>
      <section className="bg-indigo-950 px-4 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-indigo-300">What&apos;s happening</p>
          <h1 className="max-w-2xl text-4xl font-extrabold sm:text-5xl">Discover your next campus experience.</h1>
          <p className="mt-4 max-w-xl text-indigo-100">Events made for learning, playing, giving, and belonging.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_auto_auto]">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search events by title..."
            aria-label="Search events by title"
            className="h-11 rounded-xl border border-slate-300 px-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
          <select aria-label="Sort events by date" value={sort} onChange={(event) => setSort(event.target.value)} className="h-11 rounded-xl border border-slate-300 px-3 outline-none">
            <option value="soonest">Soonest first</option>
            <option value="latest">Latest first</option>
          </select>
          <div className="hidden text-right md:block md:w-1 md:bg-slate-100" />
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                category === item ? "bg-indigo-600 text-white shadow-md" : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => <EventCard key={event.id} event={event as CampusEvent} />)}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-16 text-center">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-slate-100 text-2xl">⌕</div>
            <h2 className="text-xl font-bold">No events found</h2>
            <p className="mt-2 text-sm text-slate-500">Try another title or category.</p>
          </div>
        )}
      </section>
    </main>
  );
}
