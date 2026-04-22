"use client";

import { useEffect, useState } from "react";
import { getSafeAuth } from "@/lib/supabase";

export default function EnterpriseTopbar() {
  const [email, setEmail] = useState("demo@opsly.io");

  useEffect(() => {
    const fetchUser = async () => {
      const auth = getSafeAuth();
      const { data: { user } } = await auth.getUser();
      if (user?.email) setEmail(user.email);
    };
    fetchUser();
  }, []);

  return (
    <header className="w-full px-10 py-5 flex items-center justify-between border-b border-white/10 bg-[#050A14]">
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
        <p className="text-gray-400 text-xs font-medium tracking-tight">
          Opsly Governance Stable — No incidents detected
        </p>
      </div>

      <div className="flex items-center gap-4">
        <p className="text-gray-400 text-sm font-medium">{email}</p>

        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-blue-500/20 hover:opacity-90 transition active:scale-95">
          Upgrade to Pro
        </button>
      </div>
    </header>
  );
}
