"use client";

import Link from "next/link";
import { rooms } from "@/data";
import { useEvents } from "@/context/EventContext";

const formatDateLabel = (value: string) => {
  const [year, month, day] = value.split("-");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${monthNames[Number(month) - 1]} ${Number(day)}, ${year}`;
};

export default function MyBookingsPage() {
  const { bookings, cancelBooking } = useEvents();

  const bookingList = bookings
    .map((booking) => {
      const room = rooms.find((item) => item.id === booking.roomId);
      const slot = room?.timeSlots.find((item) => item.id === booking.slotId);

      if (!room || !slot) {
        return null;
      }

      return {
        ...booking,
        room,
        slot,
      };
    })
    .filter((booking): booking is NonNullable<typeof booking> => booking !== null)
    .sort((a, b) => (a.date > b.date ? 1 : -1));

  return (
    <main className="mx-auto min-h-[calc(100vh-73px)] max-w-6xl px-4 py-10">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">Your schedule</p>
      <h1 className="mt-2 text-4xl font-extrabold text-slate-900">My Bookings</h1>

      {bookingList.length > 0 ? (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {bookingList.map((booking) => (
            <div key={booking.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">{booking.room.building}</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">{booking.room.name}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => cancelBooking(booking.id)}
                  className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-sm font-bold text-rose-700 transition hover:bg-rose-100"
                >
                  Cancel
                </button>
              </div>

              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                  <span className="font-medium">Date</span>
                  <span className="font-bold text-slate-800">{formatDateLabel(booking.date)}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                  <span className="font-medium">Time</span>
                  <span className="font-bold text-slate-800">{booking.slot.label}</span>
                </div>
                <div className="rounded-xl bg-slate-50 px-3 py-2">
                  <span className="block font-medium text-slate-600">Booked by</span>
                  <span className="mt-1 block font-bold text-slate-800">{booking.name}</span>
                </div>
                <div className="rounded-xl bg-slate-50 px-3 py-2">
                  <span className="block font-medium text-slate-600">Purpose</span>
                  <span className="mt-1 block font-bold text-slate-800">{booking.purpose}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-indigo-50 text-2xl text-indigo-600">✓</div>
          <h2 className="text-xl font-bold text-slate-900">No bookings yet</h2>
          <p className="mt-2 text-slate-500">Reserve a room from the home page to see it here.</p>
          <Link href="/" className="mt-6 inline-block rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white hover:bg-indigo-700">
            Browse rooms
          </Link>
        </div>
      )}
    </main>
  );
}
