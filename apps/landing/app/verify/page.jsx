"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ShieldCheck, Search, ChevronLeft, Activity, 
  CheckCircle2, ShieldAlert, Download, Globe,
  ArrowRight, Star, Database
} from "lucide-react";
import { calculateTrustScore } from "../../lib/trustAI";

export default function Verify() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  async function handleVerify() {
    if (!query.trim()) return;
    
    setIsVerifying(true);
    setResult(null);

    try {
      const res = await fetch("/api/national-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      // Simulate real-world scanning delay for effect
      setTimeout(() => {
        setResult(data.result);
        setIsVerifying(false);
      }, 1500);
    } catch (err) {
      console.error(err);
      setIsVerifying(false);
    }
  }

  const trustData = result ? calculateTrustScore(result) : null;
  const isVerified = result?.status === 'VERIFIED';
  const riskColor = trustData?.color || "#94A3B8";

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-200 pb-20">
      {/* Header */}
      <header className={`pt-12 pb-24 px-6 border-b border-white/5 transition-all duration-700 ${isVerified ? 'bg-emerald-950/20' : result ? 'bg-red-950/20' : 'bg-transparent'}`}>
        <div className="max-w-xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group">
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-widest">Back to Portal</span>
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
              <ShieldCheck size={28} className="text-emerald-500" />
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">National Registry</div>
              <h1 className="text-3xl font-black text-white tracking-tighter">Instant Verification</h1>
            </div>
          </div>

          <div className="relative">
            <input
              className="w-full bg-slate-900/80 border border-white/10 rounded-2xl py-5 px-6 text-white font-bold text-lg outline-none focus:border-emerald-500/50 focus:ring-8 focus:ring-emerald-500/5 transition-all placeholder:text-slate-600"
              placeholder="Institution name or Reg Number..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
            />
            <button
              onClick={handleVerify}
              disabled={isVerifying}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white hover:bg-emerald-600 transition-colors disabled:opacity-50"
            >
              {isVerifying ? <Activity size={20} className="animate-spin" /> : <Search size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-6 -mt-12">
        <AnimatePresence mode="wait">
          {isVerifying && (
            <motion.div 
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

          {result && !isVerifying && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-8 md:p-10 rounded-[40px] border-white/10"
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
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-slate-400">{result.type}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${isVerified ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                    {result.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 p-5 rounded-3xl border border-white/5">
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Registry ID</div>
                  <div className="text-sm font-bold text-white truncate">{result.regNumber || "NONE"}</div>
                </div>
                <div className="bg-white/5 p-5 rounded-3xl border border-white/5">
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Source Agency</div>
                  <div className="text-sm font-bold text-white truncate">{result.source}</div>
                </div>
              </div>

              <div className={`p-6 rounded-3xl border mb-10 transition-colors ${isVerified ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-red-500/5 border-red-500/10'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <Activity size={18} className={isVerified ? 'text-emerald-500' : 'text-red-500'} />
                  <h4 className={`text-sm font-black uppercase tracking-widest ${isVerified ? 'text-emerald-500' : 'text-red-500'}`}>Sentinel Audit</h4>
                </div>
                <p className="text-sm font-medium text-slate-300 leading-relaxed">
                  {trustData.analysis}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {isVerified && (
                  <button className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-emerald-500/20">
                    <Download size={20} /> GENERATE CERTIFICATE
                  </button>
                )}
                <button 
                  onClick={() => setResult(null)}
                  className="w-full py-5 bg-white/5 hover:bg-white/10 text-slate-400 font-bold rounded-2xl transition-all"
                >
                  NEW SEARCH
                </button>
              </div>
            </motion.div>
          )}

          {!result && !isVerifying && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-center pt-10"
            >
              <div className="flex flex-col items-center gap-6 opacity-40">
                <Database size={64} className="text-slate-600" />
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-600">Secure National Registry Stream Active</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
