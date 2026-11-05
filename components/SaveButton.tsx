"use client";

import { useEvents } from "@/context/EventContext";

export default function SaveButton({ eventId }: { eventId: string }) {
  const { isSaved, toggleSaved } = useEvents();
  const saved = isSaved(eventId);
  return (
    <button
      type="button"
      onClick={() => toggleSaved(eventId)}
      className={`w-full rounded-xl px-5 py-3 font-bold transition ${
        saved ? "bg-emerald-600 text-white" : "bg-indigo-600 text-white hover:bg-indigo-700"
      }`}
    >
      {saved ? "Saved to My Events ✓" : "Save this event"}
    </button>
  );
}
