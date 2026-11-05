"use client";

import { useEffect, useState } from "react";

export default function Countdown({ date, time }: { date: string; time: string }) {
  const [label, setLabel] = useState("Calculating...");

  useEffect(() => {
    const update = () => {
      const startTime = time.match(/(\d{1,2}:\d{2})\s*(AM|PM)/i);
      let hour = 12;
      let minute = 0;
      if (startTime) {
        const parts = startTime[1].split(":").map(Number);
        hour = parts[0] % 12;
        if (startTime[2].toUpperCase() === "PM") hour += 12;
        minute = parts[1];
      }
      const target = new Date(`${date}T00:00:00`);
      target.setHours(hour, minute, 0, 0);
      const difference = target.getTime() - Date.now();
      if (difference <= 0) {
        setLabel("Event has started");
        return;
      }
      const totalHours = Math.floor(difference / 36e5);
      const days = Math.floor(totalHours / 24);
      const hours = totalHours % 24;
      const minutes = Math.floor((difference % 36e5) / 60000);
      setLabel(`Starts in ${days > 0 ? `${days} day${days === 1 ? "" : "s"} ` : ""}${hours} hrs ${minutes} mins`);
    };
    update();
    const timer = window.setInterval(update, 60000);
    return () => window.clearInterval(timer);
  }, [date, time]);

  return <div className="rounded-xl bg-indigo-50 px-4 py-3 text-sm font-bold text-indigo-700">{label}</div>;
}
