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
      <header className={`pt-20 pb-16 px-6 transition-all duration-700`}>
          <div className="flex items-center justify-between mb-12">
            <Link href="/" className="inline-flex items-center gap-3 text-[#94A3B8] hover:text-white transition-colors group">
              <ChevronLeft size={16} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[11px] font-black uppercase tracking-[0.1em]">Back to Portal</span>
            </Link>
            <div className="flex items-center gap-4">
               <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">National Sentinel V6.0</span>
               <img 
                 src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Flag_of_South_Africa.svg/512px-Flag_of_South_Africa.svg.png" 
                 alt="RSA Flag" 
                 className="w-6 h-auto rounded-[2px] opacity-80"
               />
            </div>
          </div>
          
          <div className="flex items-center gap-5 mb-10">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
              <ShieldCheck size={28} className="text-emerald-400" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-[10px] font-black text-emerald-500/60 uppercase tracking-[0.3em] mb-1">Republic of South Africa</div>
              <h1 className="text-4xl font-black text-white tracking-tight leading-none">Instant Verification</h1>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#007749] via-[#FFB81C] to-[#E03C31] rounded-[26px] blur opacity-10 group-hover:opacity-20 transition-opacity" />
            <input
              className="relative w-full bg-[#0F172A] border border-[#1E293B] rounded-[24px] py-7 px-8 text-white font-medium text-lg outline-none focus:border-emerald-500/50 focus:ring-0 transition-all placeholder:text-[#475569] shadow-2xl"
              placeholder="Institution name or Reg Number..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
            />
            <button
              onClick={handleVerify}
              disabled={isVerifying}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-14 h-14 bg-emerald-500 rounded-[18px] flex items-center justify-center text-white hover:bg-emerald-600 transition-all disabled:opacity-50 shadow-lg shadow-emerald-500/20"
            >
              {isVerifying ? <Activity size={24} className="animate-spin" /> : <Search size={24} strokeWidth={2.5} />}
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <button className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-slate-400 hover:bg-white/10 hover:text-white transition-all">Education</button>
            <button className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-slate-400 hover:bg-white/10 hover:text-white transition-all">Healthcare</button>
            <button className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-slate-400 hover:bg-white/10 hover:text-white transition-all">Legal Services</button>
            <button className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-slate-400 hover:bg-white/10 hover:text-white transition-all">Sipho Audit</button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6">
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
              className="w-full flex flex-col items-center mt-20"
            >
              <div className="w-screen h-px bg-gradient-to-r from-transparent via-[#1E293B] to-transparent mb-20" />
              <div className="flex flex-col items-center gap-6 opacity-30">
                <Database size={56} strokeWidth={1} className="text-[#64748B]" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#64748B]">Secure National Registry Stream Active</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
