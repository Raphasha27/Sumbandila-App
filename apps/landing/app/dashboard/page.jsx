"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ChevronLeft, History, ShieldCheck, Search, 
  Activity, ArrowUpRight, Database, Clock,
  CheckCircle2, ShieldAlert
} from "lucide-react";

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/history")
      .then((res) => res.json())
      .then((data) => {
        setHistory(data || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 pb-20">
      {/* Top Bar */}
      <nav className="w-full bg-slate-900/50 backdrop-blur-xl border-b border-white/5 px-6 py-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors">
              <ChevronLeft size={20} className="text-white" />
            </Link>
            <div className="flex flex-col">
              <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Citizen Access</div>
              <h1 className="text-xl font-black text-white tracking-tighter">Verification Dashboard</h1>
            </div>
          </div>
          <Link href="/verify" className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-xl transition-all shadow-lg shadow-blue-500/20">
            <Search size={18} className="text-white" />
            <span className="text-xs font-black text-white uppercase tracking-widest">New Verification</span>
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-black text-white tracking-tighter mb-2">Registry Audit Trail</h2>
            <p className="text-slate-400 font-medium leading-relaxed">View and manage your recent institutional and professional verifications.</p>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-4 rounded-3xl">
            <Clock size={20} className="text-blue-500" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Last Synced</span>
              <span className="text-sm font-bold text-white">Just Now</span>
            </div>
          </div>
        </div>

        {/* History Feed */}
        <div className="flex flex-col gap-6">
          {isLoading ? (
            <div className="glass p-20 rounded-[40px] flex flex-col items-center justify-center opacity-50 border-white/5">
              <Activity size={32} className="text-blue-500 animate-spin mb-4" />
              <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Syncing Audit Trail...</span>
            </div>
          ) : history.length > 0 ? (
            history.map((item, i) => {
              const isVerified = item.result?.status === 'VERIFIED';
              return (
                <motion.div
                  key={item.id || i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass p-6 md:p-8 rounded-[32px] border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center group hover:bg-white/5 transition-all"
                >
                  <div className="flex gap-6 items-center mb-4 md:mb-0">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-colors ${isVerified ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                      {isVerified ? <ShieldCheck size={28} className="text-emerald-500" /> : <ShieldAlert size={28} className="text-red-500" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-black text-white text-xl tracking-tight leading-none">{item.query}</span>
                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${isVerified ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}>
                          {item.result?.status || "NOT FOUND"}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-slate-500 flex items-center gap-2">
                        <Database size={12} /> {item.result?.source || "National Registry"} • {new Date(item.created_at).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-[10px] font-black text-white uppercase tracking-widest transition-all">
                      View Certificate
                    </button>
                    <button className="w-12 h-12 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center hover:bg-blue-500 transition-all group/btn">
                      <ArrowUpRight size={20} className="text-slate-400 group-hover/btn:text-white" />
                    </button>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="glass p-32 rounded-[64px] flex flex-col items-center justify-center border-dashed border-white/5 opacity-50">
              <History size={48} className="text-slate-600 mb-6" />
              <h3 className="text-xl font-black text-white mb-2 tracking-tight">No Verification History</h3>
              <p className="text-slate-500 font-medium mb-8">Start your first audit to populate this trail.</p>
              <Link href="/verify" className="px-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-xs font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all">
                Run Audit Now
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
