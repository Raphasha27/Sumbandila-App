"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ShieldCheck, Search, ChevronLeft, Activity,
  CheckCircle2, ShieldAlert, Download, Globe,
  ArrowRight, Database
} from "lucide-react";
import { calculateTrustScore } from "../../lib/trustAI";

const CATEGORIES = [
  { label: "Education", placeholder: "Search DHET institution..." },
  { label: "Healthcare", placeholder: "Search HPCSA practitioner..." },
  { label: "Legal Services", placeholder: "Search LPC attorney..." },
  { label: "Sipho Audit", placeholder: "Ask Sipho to audit an entity..." },
];

export default function Verify() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [result, setResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState(null);

  const placeholder = activeCategory
    ? CATEGORIES.find((c) => c.label === activeCategory)?.placeholder
    : "Institution name or registration number...";

  async function handleVerify() {
    if (!query.trim()) return;
    setIsVerifying(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/national-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setTimeout(() => {
        setResult(data.result);
        setIsVerifying(false);
      }, 1500);
    } catch (err) {
      console.error(err);
      setError("Verification service unavailable. Please try again.");
      setIsVerifying(false);
    }
  }

  function handleCategoryClick(cat) {
    setActiveCategory(cat === activeCategory ? null : cat);
    setResult(null);
    setQuery("");
  }

  const trustData = result ? calculateTrustScore(result) : null;
  const isVerified = result?.status === "VERIFIED";
  const riskColor = trustData?.color || "#94A3B8";

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-200 pb-20">

      {/* ───────── HEADER ───────── */}
      <header className="pt-20 pb-16 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Top bar */}
          <div className="flex items-center justify-between mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-[#94A3B8] hover:text-white transition-colors group"
            >
              <ChevronLeft size={16} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[11px] font-black uppercase tracking-[0.1em]">Back to Portal</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
                National Sentinel V6.0
              </span>
              {/* Official SA Coat of Arms */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Coat_of_arms_of_South_Africa.svg/60px-Coat_of_arms_of_South_Africa.svg.png"
                alt="Republic of South Africa Coat of Arms"
                className="h-8 w-auto opacity-90"
              />
            </div>
          </div>

          {/* Title */}
          <div className="flex items-center gap-5 mb-10">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
              <ShieldCheck size={28} className="text-emerald-400" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-[10px] font-black text-emerald-500/60 uppercase tracking-[0.3em] mb-1">
                Republic of South Africa
              </div>
              <h1 className="text-4xl font-black text-white tracking-tight leading-none">
                Instant Verification
              </h1>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#007749] via-[#FFB81C] to-[#E03C31] rounded-[26px] blur opacity-10 group-hover:opacity-20 transition-opacity" />
            <input
              className="relative w-full bg-[#0F172A] border border-[#1E293B] rounded-[24px] py-7 px-8 text-white font-medium text-lg outline-none focus:border-emerald-500/50 transition-all placeholder:text-[#475569] shadow-2xl"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleVerify()}
            />
            <button
              onClick={handleVerify}
              disabled={isVerifying || !query.trim()}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-14 h-14 bg-emerald-500 rounded-[18px] flex items-center justify-center text-white hover:bg-emerald-600 transition-all disabled:opacity-40 shadow-lg shadow-emerald-500/20"
            >
              {isVerifying
                ? <Activity size={24} className="animate-spin" />
                : <Search size={24} strokeWidth={2.5} />
              }
            </button>
          </div>

          {/* Category filter chips */}
          <div className="flex flex-wrap gap-3 mt-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => handleCategoryClick(cat.label)}
                className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${
                  activeCategory === cat.label
                    ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
                    : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>
      </header>

      {/* ───────── MAIN RESULTS ───────── */}
      <main className="max-w-3xl mx-auto px-6">

        {/* Error state */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold">
            ⚠ {error}
          </div>
        )}

        <AnimatePresence mode="wait">

          {/* Scanning loader */}
          {isVerifying && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass p-12 rounded-[40px] text-center flex flex-col items-center"
            >
              <div className="relative w-20 h-20 mb-6">
                <div className="absolute inset-0 border-4 border-emerald-500/10 rounded-full" />
                <div className="absolute inset-0 border-4 border-t-emerald-500 rounded-full animate-spin" />
              </div>
              <h2 className="text-xl font-black text-white mb-2">Scanning Registries</h2>
              <p className="text-slate-400 font-medium">Cross-referencing DHET, HPCSA, and LPC databases...</p>
            </motion.div>
          )}

          {/* Result card */}
          {result && !isVerifying && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-8 md:p-10 rounded-[40px]"
            >
              {/* Trust Score Ring */}
              <div className="flex justify-center mb-10">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="58" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                    <motion.circle
                      cx="64" cy="64" r="58" fill="none" stroke={riskColor} strokeWidth="8"
                      strokeDasharray="364.4"
                      initial={{ strokeDashoffset: 364.4 }}
                      animate={{ strokeDashoffset: 364.4 - (364.4 * trustData.score) / 100 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <div className="text-4xl font-black text-white">{trustData.score}</div>
                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Trust Index</div>
                  </div>
                </div>
              </div>

              <div className="text-center mb-10">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Authenticated Entity</div>
                <h2 className="text-3xl font-black text-white tracking-tighter mb-2">{result.name}</h2>
                <div className="flex items-center justify-center gap-2">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-slate-400">
                    {result.type || result.category || "Entity"}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                    isVerified
                      ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                      : "bg-red-500/10 text-red-500 border border-red-500/20"
                  }`}>
                    {result.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 p-5 rounded-3xl border border-white/5">
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Registry ID</div>
                  <div className="text-sm font-bold text-white truncate">{result.regNumber || "N/A"}</div>
                </div>
                <div className="bg-white/5 p-5 rounded-3xl border border-white/5">
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Source Agency</div>
                  <div className="text-sm font-bold text-white truncate">{result.source || "National Registry"}</div>
                </div>
              </div>

              <div className={`p-6 rounded-3xl border mb-10 ${
                isVerified ? "bg-emerald-500/5 border-emerald-500/10" : "bg-red-500/5 border-red-500/10"
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <Activity size={18} className={isVerified ? "text-emerald-500" : "text-red-500"} />
                  <h4 className={`text-sm font-black uppercase tracking-widest ${
                    isVerified ? "text-emerald-500" : "text-red-500"
                  }`}>Sentinel Audit</h4>
                </div>
                <p className="text-sm font-medium text-slate-300 leading-relaxed">{trustData.analysis}</p>
              </div>

              <div className="flex flex-col gap-4">
                {isVerified && (
                  <button className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-emerald-500/20">
                    <Download size={20} /> GENERATE CERTIFICATE
                  </button>
                )}
                <button
                  onClick={() => { setResult(null); setQuery(""); }}
                  className="w-full py-5 bg-white/5 hover:bg-white/10 text-slate-400 font-bold rounded-2xl transition-all"
                >
                  NEW SEARCH
                </button>
              </div>
            </motion.div>
          )}

          {/* Idle state */}
          {!result && !isVerifying && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full flex flex-col items-center mt-16"
            >
              <div className="flex flex-col items-center gap-6 opacity-30">
                <Database size={56} strokeWidth={1} className="text-[#64748B]" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#64748B]">
                  Secure National Registry Stream Active
                </p>
              </div>

              {/* Quick-start examples */}
              <div className="mt-12 w-full opacity-60">
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest text-center mb-4">
                  Try a quick search
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {["Boston City Campus", "Rhodes University", "HPCSA", "LPC"].map((ex) => (
                    <button
                      key={ex}
                      onClick={() => { setQuery(ex); }}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
