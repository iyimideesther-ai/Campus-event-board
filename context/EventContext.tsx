"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type Booking = {
  id: string;
  roomId: string;
  slotId: string;
  date: string;
  name: string;
  purpose: string;
  createdAt: string;
};

type EventContextValue = {
  savedIds: string[];
  toggleSaved: (id: string) => void;
  isSaved: (id: string) => boolean;
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, "id" | "createdAt">) => { ok: boolean; message?: string };
  cancelBooking: (bookingId: string) => void;
  getSeatsLeft: (roomId: string, slotId: string, date: string) => number;
  isSlotFull: (roomId: string, slotId: string, date: string) => boolean;
};

const STORAGE_KEY = "campus-room-bookings";
const EventContext = createContext<EventContextValue | null>(null);

export function EventProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("campus-saved-events");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setSavedIds(parsed.filter((id): id is string => typeof id === "string"));
      } catch {
        window.localStorage.removeItem("campus-saved-events");
      }
    }

    const storedBookings = window.localStorage.getItem(STORAGE_KEY);
    if (storedBookings) {
      try {
        const parsed = JSON.parse(storedBookings);
        if (Array.isArray(parsed)) {
          setBookings(parsed.filter((item): item is Booking => typeof item?.roomId === "string" && typeof item?.date === "string"));
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (hasLoaded) window.localStorage.setItem("campus-saved-events", JSON.stringify(savedIds));
  }, [hasLoaded, savedIds]);

  useEffect(() => {
    if (hasLoaded) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }, [hasLoaded, bookings]);

  const toggleSaved = (id: string) => {
    setSavedIds((current) =>
      current.includes(id) ? current.filter((savedId) => savedId !== id) : [...current, id]
    );
  };

  const addBooking = (bookingData: Omit<Booking, "id" | "createdAt">) => {
    const { roomId, slotId, date, name, purpose } = bookingData;
    if (!roomId || !slotId || !date || !name.trim() || !purpose.trim()) {
      return { ok: false, message: "Please complete all booking details." };
    }

    const existingForSlot = bookings.filter(
      (booking) => booking.roomId === roomId && booking.slotId === slotId && booking.date === date
    ).length;

    if (existingForSlot >= 4) {
      return { ok: false, message: "This slot is already full for the selected date." };
    }

    const newBooking: Booking = {
      id: `${roomId}-${slotId}-${date}-${Date.now()}`,
      ...bookingData,
      name: name.trim(),
      purpose: purpose.trim(),
      createdAt: new Date().toISOString(),
    };

    setBookings((current) => [...current, newBooking]);
    return { ok: true };
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((current) => current.filter((booking) => booking.id !== bookingId));
  };

  const getSeatsLeft = (roomId: string, slotId: string, date: string) => {
    const activeBookings = bookings.filter(
      (booking) => booking.roomId === roomId && booking.slotId === slotId && booking.date === date
    );
    return Math.max(4 - activeBookings.length, 0);
  };

  const isSlotFull = (roomId: string, slotId: string, date: string) => getSeatsLeft(roomId, slotId, date) === 0;

  const contextValue = useMemo<EventContextValue>(() => ({
    savedIds,
    toggleSaved,
    isSaved: (id) => savedIds.includes(id),
    bookings,
    addBooking,
    cancelBooking,
    getSeatsLeft,
    isSlotFull,
  }), [savedIds, bookings]);

  return <EventContext.Provider value={contextValue}>{children}</EventContext.Provider>;
}

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) throw new Error("useEvents must be used inside EventProvider");
  return context;
}
