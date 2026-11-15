"use client";

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
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

type FormErrors = {
  name: string;
  purpose: string;
  date: string;
  slot: string;
  submit: string;
};

export default function BookingForm({ room }: { room: Room }) {
  const { addBooking, getSeatsLeft } = useEvents();
  const [minimumDate, setMinimumDate] = useState("");
  const [form, setForm] = useState({ name: "", purpose: "", date: "", slotId: room.timeSlots[0]?.id ?? "" });
  const [errors, setErrors] = useState<FormErrors>({ name: "", purpose: "", date: "", slot: "", submit: "" });
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setMinimumDate(new Date().toISOString().split("T")[0]);
  }, []);

  const slotStatus = useMemo(() => {
    return room.timeSlots.map((slot) => {
      const seatsLeft = form.date ? getSeatsLeft(room.id, slot.id, form.date) : 4;
      return {
        ...slot,
        seatsLeft,
        isFull: form.date ? seatsLeft === 0 : false,
      };
    });
  }, [form.date, getSeatsLeft, room.id, room.timeSlots]);

  const handleFieldChange = (field: "name" | "purpose" | "date" | "slotId", value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next: FormErrors = { ...current };
      if (field === "slotId") {
        next.slot = "";
      } else {
        next[field] = "";
      }
      next.submit = "";
      return next;
    });
    setSuccess("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FormErrors = {
      name: !form.name.trim() ? "Please enter your name." : "",
      purpose: !form.purpose.trim() ? "Please state the booking purpose." : "",
      date: !form.date ? "Please choose a booking date." : "",
      slot: !form.slotId ? "Please pick a time slot." : "",
      submit: "",
    };

    if (form.date && form.slotId) {
      const seatsLeft = getSeatsLeft(room.id, form.slotId, form.date);
      if (seatsLeft === 0) {
        nextErrors.slot = "This time slot is fully booked for that date.";
      }
    }

    if (Object.values(nextErrors).some(Boolean)) {
      setErrors(nextErrors);
      return;
    }

    const result = addBooking({
      roomId: room.id,
      slotId: form.slotId,
      date: form.date,
      name: form.name,
      purpose: form.purpose,
    });

    if (!result.ok) {
      setErrors((current) => ({ ...current, submit: result.message || "Unable to book this room right now." }));
      return;
    }

    setSuccess("Booking confirmed. Your reservation has been added to My Bookings.");
    setForm({ name: "", purpose: "", date: "", slotId: room.timeSlots[0]?.id ?? "" });
    setErrors({ name: "", purpose: "", date: "", slot: "", submit: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-indigo-600">Book this room</p>
        <h3 className="mt-2 text-2xl font-bold text-slate-900">Reserve a seat</h3>
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">Your name</label>
          <input
            id="name"
            value={form.name}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleFieldChange("name", event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-3 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            placeholder="Ava Johnson"
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name ? <p className="mt-2 text-sm text-rose-600">{errors.name}</p> : null}
        </div>

        <div>
          <label htmlFor="purpose" className="mb-2 block text-sm font-medium text-slate-700">Purpose</label>
          <textarea
            id="purpose"
            value={form.purpose}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => handleFieldChange("purpose", event.target.value)}
            rows={3}
            className="w-full rounded-xl border border-slate-300 px-3 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            placeholder="Team project review"
            aria-invalid={Boolean(errors.purpose)}
          />
          {errors.purpose ? <p className="mt-2 text-sm text-rose-600">{errors.purpose}</p> : null}
        </div>

        <div>
          <label htmlFor="date" className="mb-2 block text-sm font-medium text-slate-700">Date</label>
          <input
            id="date"
            type="date"
            min={minimumDate}
            value={form.date}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleFieldChange("date", event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-3 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            aria-invalid={Boolean(errors.date)}
          />
          {errors.date ? <p className="mt-2 text-sm text-rose-600">{errors.date}</p> : null}
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-slate-700">Time slot</p>
          <div className="space-y-2">
            {slotStatus.map((slot) => (
              <label
                key={slot.id}
                className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 transition ${
                  form.slotId === slot.id ? "border-indigo-500 bg-indigo-50" : "border-slate-200 hover:border-indigo-300"
                } ${slot.isFull ? "opacity-60" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="slot"
                    value={slot.id}
                    checked={form.slotId === slot.id}
                    onChange={() => handleFieldChange("slotId", slot.id)}
                    disabled={slot.isFull}
                    className="h-4 w-4 accent-indigo-600"
                  />
                  <span className="font-medium text-slate-700">{slot.label}</span>
                </div>
                <span className={`text-xs font-bold ${slot.seatsLeft === 0 ? "text-rose-600" : "text-emerald-600"}`}>
                  {slot.seatsLeft === 0 ? "Full" : `${slot.seatsLeft} of 4 seats left`}
                </span>
              </label>
            ))}
          </div>
          {errors.slot ? <p className="mt-2 text-sm text-rose-600">{errors.slot}</p> : null}
        </div>
      </div>

      {errors.submit ? <p className="mt-4 text-sm text-rose-600">{errors.submit}</p> : null}
      {success ? <p className="mt-4 text-sm font-medium text-emerald-600">{success}</p> : null}

      <button type="submit" className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-3 font-bold text-white transition hover:bg-indigo-700">
        Confirm booking
      </button>
    </form>
  );
}
