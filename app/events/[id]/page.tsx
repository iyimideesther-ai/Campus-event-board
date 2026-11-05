import Link from "next/link";
import { notFound } from "next/navigation";
import { events } from "@/data";
import Countdown from "@/components/Countdown";
import SaveButton from "@/components/SaveButton";

const categoryStyles: Record<string, string> = {
  Tech: "bg-blue-100 text-blue-700",
  Sports: "bg-emerald-100 text-emerald-700",
  Faith: "bg-violet-100 text-violet-700",
  Social: "bg-orange-100 text-orange-700",
};

export function generateStaticParams() {
  return events.map((event) => ({ id: event.id }));
}

export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = events.find((item) => item.id === id);
  if (!event) notFound();

  const date = new Date(`${event.date}T12:00:00`);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600">
        ← Back to events
      </Link>
      <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={event.image} alt="" className="h-72 w-full object-cover sm:h-96" />
        <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[1fr_280px]">
          <div>
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${categoryStyles[event.category]}`}>
              {event.category}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold text-slate-950 sm:text-4xl">{event.title}</h1>
            <p className="mt-5 leading-7 text-slate-600">{event.description}</p>
          </div>
          <aside className="space-y-4 rounded-2xl bg-slate-50 p-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Date</p>
              <p className="mt-1 font-bold">{date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Time</p>
              <p className="mt-1 font-bold">{event.time}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Venue</p>
              <p className="mt-1 font-bold">{event.venue}</p>
            </div>
            <Countdown date={event.date} time={event.time} />
            <SaveButton eventId={event.id} />
          </aside>
        </div>
      </article>
    </main>
  );
}
