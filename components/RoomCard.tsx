"use client";

import Link from "next/link";
import { useEvents } from "@/context/EventContext";

type RoomSlot = {
  id: string;
  label: string;
};

type Room = {
  id: string;
  name: string;
  building: string;
  capacity: number;
  amenities: string[];
  image: string;
  timeSlots: RoomSlot[];
};

export default function RoomCard({ room }: { room: Room }) {
  const { bookings } = useEvents();

  const slotSummary = room.timeSlots.map((slot) => {
    const booked = bookings.filter((booking) => booking.roomId === room.id && booking.slotId === slot.id).length;
    const seatsLeft = Math.max(4 - booked, 0);

    return {
      ...slot,
      seatsLeft,
    };
  });

  const isAvailable = slotSummary.some((slot) => slot.seatsLeft > 0);

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/rooms/${room.id}`} className="block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={room.image} alt={`${room.name} room`} loading="lazy" className="h-52 w-full object-cover transition duration-500 group-hover:scale-105" />
      </Link>

      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">{room.building}</p>
            <Link href={`/rooms/${room.id}`}>
              <h2 className="mt-1 text-xl font-bold text-slate-900 transition group-hover:text-indigo-600">{room.name}</h2>
            </Link>
          </div>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-bold ${
              isAvailable ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
            }`}
          >
            {isAvailable ? "Available" : "Fully booked"}
          </span>
        </div>

        <div className="mb-4 flex items-center justify-between text-sm text-slate-600">
          <span>Capacity: {room.capacity}</span>
          <span>{room.amenities.length} amenities</span>
        </div>

        <div className="space-y-2 text-sm text-slate-600">
          {slotSummary.slice(0, 2).map((slot) => (
            <div key={slot.id} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
              <span>{slot.label}</span>
              <span className="font-semibold text-slate-800">{slot.seatsLeft} of 4 left</span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {room.amenities.slice(0, 2).map((amenity) => (
            <span key={amenity} className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
              {amenity}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
