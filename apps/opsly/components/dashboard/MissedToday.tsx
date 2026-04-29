"use client";

import { useEffect, useState } from "react";
import { getSafeDB } from "@/lib/supabase";

export default function MissedToday() {
  const [events, setEvents] = useState([
    { type: "Signup", time: "Just now" },
    { type: "Workspace Created", time: "Just now" }
  ]);

  useEffect(() => {
    const fetchEvents = async () => {
      const db = getSafeDB();
      const { data } = await db.from("activities").select("*").limit(2);
      if (data?.length) {
        setEvents(data.map((e: any) => ({ 
          type: e.type, 
          time: new Date(e.created_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        })));
      }
    };
    fetchEvents();
  }, []);

  return (
    <section className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-6">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <span className="text-yellow-400">⚡</span>
        What you missed today
      </h2>

      <div className="mt-5 space-y-3">
        {events.map((event, i) => (
          <EventRow key={i} label={`Recent event: ${event.type}`} time={event.time} />
        ))}
      </div>
    </section>
  );
}

function EventRow({ label, time }: { label: string; time: string }) {
  return (
    <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-4">
      <p className="text-sm text-gray-200">{label}</p>
      <p className="text-xs text-gray-500">{time}</p>
    </div>
  );
}
