import Link from "next/link";
import { notFound } from "next/navigation";
import { rooms } from "@/data";
import BookingForm from "@/components/BookingForm";

export function generateStaticParams() {
  return rooms.map((room) => ({ id: room.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const room = rooms.find((item) => item.id === id);

  return {
    title: room?.name ?? "Room Not Found",
    description: room ? `${room.name} in ${room.building} with ${room.capacity} seats.` : "The requested room could not be found.",
  };
}

export default async function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const room = rooms.find((item) => item.id === id);

  if (!room) notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600">
        ← Back to rooms
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={room.image} alt={room.name} className="h-72 w-full object-cover sm:h-96" />

          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">{room.building}</p>
                <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">{room.name}</h1>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700">Available</span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Capacity</p>
                <p className="mt-2 text-xl font-bold text-slate-900">{room.capacity} seats</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Building</p>
                <p className="mt-2 text-lg font-bold text-slate-900">{room.building}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Amenities</p>
                <p className="mt-2 text-lg font-bold text-slate-900">{room.amenities.length}</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-bold text-slate-900">Amenities</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {room.amenities.map((amenity) => (
                  <span key={amenity} className="rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-bold text-slate-900">Time slots</h2>
              <div className="mt-4 space-y-3">
                {room.timeSlots.map((slot) => (
                  <div key={slot.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <span className="font-medium text-slate-700">{slot.label}</span>
                    <span className="text-sm font-bold text-slate-500">Open</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

        <BookingForm room={room} />
      </div>
    </main>
  );
}
