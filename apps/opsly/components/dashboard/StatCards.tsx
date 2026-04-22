"use client";

import { useEffect, useState } from "react";
import { getSafeDB } from "@/lib/supabase";

export default function StatCards() {
  const [stats, setStats] = useState({
    members: 1,
    projects: 1,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const db = getSafeDB();
      const { count: membersCount } = await db.from("profiles").select("*", { count: "exact", head: true });
      const { count: projectsCount } = await db.from("projects").select("*", { count: "exact", head: true });
      
      setStats({
        members: membersCount || 1,
        projects: projectsCount || 1,
      });
    };
    fetchStats();
  }, []);

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <p className="text-gray-400 text-sm font-medium">Team Members</p>
        <div className="mt-3 flex items-end gap-2">
          <p className="text-3xl font-bold">{stats.members}</p>
          <p className="text-gray-500 text-sm mb-1">/ 3 Free</p>
        </div>

        <a href="#" className="text-blue-400 text-sm mt-3 inline-block hover:underline transition">
          Add 2 more free
        </a>
      </Card>

      <Card>
        <p className="text-gray-400 text-sm font-medium">Active Projects</p>
        <p className="text-3xl font-bold mt-3">{stats.projects}</p>
      </Card>

      <Card>
        <p className="text-gray-400 text-sm font-medium">Billing Tier</p>
        <p className="text-3xl font-bold mt-3 text-green-400 tracking-tight">Free</p>
        <p className="text-gray-500 text-sm mt-1">Auto-scales safely</p>
      </Card>
    </section>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl shadow-black/20 hover:bg-white/[0.07] transition cursor-default">
      {children}
    </div>
  );
}
