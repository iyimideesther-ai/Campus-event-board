import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[calc(100vh-73px)] place-items-center px-4 text-center">
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">404</p>
        <h1 className="mt-3 text-3xl font-extrabold">Event not found</h1>
        <p className="mt-2 text-slate-500">This event may no longer be available.</p>
        <Link href="/" className="mt-6 inline-block rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white">
          Back to events
        </Link>
      </div>
    </main>
  );
}
