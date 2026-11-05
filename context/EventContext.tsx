"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type EventContextValue = {
  savedIds: string[];
  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;
};

const EventContext = createContext<EventContextValue | null>(null);

export function EventProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = window.localStorage.getItem("campus-saved-events");
    if (saved) setSavedIds(JSON.parse(saved));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("campus-saved-events", JSON.stringify(savedIds));
  }, [savedIds]);

  const toggleSaved = (id: string) => {
    setSavedIds((current) =>
      current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id]
    );
  };

  return (
    <EventContext.Provider value={{ savedIds, toggleSaved, isSaved: (id) => savedIds.includes(id) }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) throw new Error("useEvents must be used inside EventProvider");
  return context;
}
