"use client";

import { useState } from "react";

export default function InvitePanel() {
  const [inviteLink, setInviteLink] = useState("");

  const handleGenerate = () => {
    // In a real app, this would hit /api/invite
    const mockLink = `https://opsly.app/join/${Math.random().toString(36).substring(7)}`;
    setInviteLink(mockLink);
  };

  return (
    <section className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-2xl p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]"></div>
      
      <h2 className="text-xl font-bold">Invite your team to collaborate</h2>

      <p className="text-gray-400 mt-2 max-w-2xl leading-relaxed">
        Opsly thrives on teamwork. Invite 2 members to lock in your free tier
        configuration instantly.
      </p>

      {!inviteLink ? (
        <button 
          onClick={handleGenerate}
          className="mt-6 bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/20 active:scale-95"
        >
          Generate Invite Link
        </button>
      ) : (
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            readOnly
            value={inviteLink}
            className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 w-full max-w-md text-sm font-mono text-blue-400 outline-none"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(inviteLink);
              alert("Link copied!");
            }}
            className="bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-xl text-sm font-medium transition"
          >
            Copy Link
          </button>
        </div>
      )}
    </section>
  );
}
