"use client";

import { useMemo, useState } from "react";
import { rooms } from "@/data";
import RoomCard from "@/components/RoomCard";

const buildingOptions = ["All", ...Array.from(new Set(rooms.map((room) => room.building)))];
const capacityOptions = [
  { label: "Any capacity", value: 0 },
  { label: "8+ seats", value: 8 },
  { label: "12+ seats", value: 12 },
  { label: "16+ seats", value: 16 },
  { label: "20+ seats", value: 20 },
];

export default function RoomsPage() {
  const [query, setQuery] = useState("");
  const [building, setBuilding] = useState("All");
  const [capacity, setCapacity] = useState(0);

  const filteredRooms = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return rooms.filter((room) => {
      const matchesName = room.name.toLowerCase().includes(normalizedQuery);
      const matchesBuilding = building === "All" || room.building === building;
      const matchesCapacity = room.capacity >= capacity;
      return matchesName && matchesBuilding && matchesCapacity;
    });
  }, [building, capacity, query]);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-slate-950 px-4 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-indigo-300">Room booking</p>
          <h1 className="max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">Find a space for your next campus project.</h1>
          <p className="mt-4 max-w-xl text-slate-200">Browse available rooms and reserve a seat for your next study session or meeting.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[1.2fr_0.8fr_0.7fr]">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search rooms by name"
            aria-label="Search rooms by name"
            className="h-12 rounded-xl border border-slate-300 px-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />
          <select
            value={building}
            onChange={(event) => setBuilding(event.target.value)}
            aria-label="Filter by building"
            className="h-12 rounded-xl border border-slate-300 bg-white px-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          >
            {buildingOptions.map((option) => (
              <option key={option} value={option}>{option === "All" ? "All buildings" : option}</option>
            ))}
          </select>
          <select
            value={capacity}
            onChange={(event) => setCapacity(Number(event.target.value))}
            aria-label="Filter by minimum capacity"
            className="h-12 rounded-xl border border-slate-300 bg-white px-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          >
            {capacityOptions.map((option) => (
              <option key={option.label} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {filteredRooms.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredRooms.map((room) => <RoomCard key={room.id} room={room} />)}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-16 text-center shadow-sm">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-slate-100 text-2xl">⌕</div>
            <h2 className="text-xl font-bold text-slate-900">No rooms match your search</h2>
            <p className="mt-2 text-sm text-slate-500">Try another room name, building, or capacity filter.</p>
          </div>
        )}
      </section>
    </main>
  );
}