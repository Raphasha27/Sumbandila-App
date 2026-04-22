"use client";

import { useEffect, useState } from "react";
import { getSafeAuth } from "@/lib/supabase";

export default function Topbar() {
  const [userEmail, setUserEmail] = useState("demo@opsly.io");

  useEffect(() => {
    const fetchUser = async () => {
      const auth = getSafeAuth();
      const { data: { user } } = await auth.getUser();
      if (user?.email) setUserEmail(user.email);
    };
    fetchUser();
  }, []);

  return (
    <header className="w-full px-10 py-5 flex items-center justify-end border-b border-white/10 bg-[#050A14]">
      <div className="flex items-center gap-4">
        <p className="text-gray-400 text-sm font-medium">{userEmail}</p>

        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-blue-500/20 hover:opacity-90 transition">
          Upgrade to Pro
        </button>
      </div>
    </header>
  );
}
