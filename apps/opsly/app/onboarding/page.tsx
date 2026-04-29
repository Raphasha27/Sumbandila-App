"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Onboarding() {
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const createWorkspace = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("No authenticated user found. Please sign in again.");
      }

      const { error } = await supabase.from("organizations").insert({
        name,
        owner_id: user.id,
      });

      if (error) throw error;

      router.push("/dashboard");
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B1220] text-white">
      <div className="bg-[#111827] p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2">Name your workspace</h1>
        <p className="text-gray-400 mb-6 font-medium text-sm">
          What are you building? Give your team a central hub.
        </p>

        {errorMsg && <p className="text-red-500 mb-4 text-sm">{errorMsg}</p>}

        <div className="flex flex-col gap-4">
          <input
            placeholder="Workspace name (e.g. Acme Corp)"
            className="p-3 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500 transition-colors"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <button 
            onClick={createWorkspace} 
            disabled={!name.trim()}
            className="mt-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed font-semibold px-6 py-3 rounded transition-colors"
          >
            Create Workspace
          </button>
        </div>
      </div>
    </div>
  );
}
