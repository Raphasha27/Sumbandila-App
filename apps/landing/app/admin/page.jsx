"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ChevronLeft, Database, Users, BarChart3, 
  AlertTriangle, Activity, CheckCircle2, Lock,
  ShieldCheck, ShieldAlert, FileText, ArrowUpRight
} from "lucide-react";

export default function Admin() {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/reports")
      .then((res) => res.json())
      .then((data) => {
        setReports(data || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const stats = [
    { title: "Education Registry", count: "1,248", sub: "Institutions Registered", icon: Database, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Healthcare Registry", count: "87,331", sub: "Vetted Professionals", icon: Users, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Legal Registry", count: "12,009", sub: "Active Practitioners", icon: BarChart3, color: "text-purple-500", bg: "bg-purple-500/10" }
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 pb-20">
      {/* Admin Top Bar */}
      <nav className="w-full bg-slate-900/50 backdrop-blur-xl border-b border-white/5 px-6 py-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors">
              <ChevronLeft size={20} className="text-white" />
            </Link>
            <div className="flex flex-col">
              <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">Government Oversight</div>
              <h1 className="text-xl font-black text-white tracking-tighter">Sentinel Command Center</h1>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">System Operational</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-[32px] border-white/5 flex flex-col items-start"
            >
              <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mb-6`}>
                <stat.icon size={24} className={stat.color} />
              </div>
              <div className="text-4xl font-black text-white mb-1 tracking-tighter">{stat.count}</div>
              <div className="text-sm font-bold text-slate-300">{stat.title}</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Fraud Triage Section */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-white flex items-center gap-3">
                <AlertTriangle size={24} className="text-red-500" />
                Critical Fraud Triage
              </h2>
              <button className="text-xs font-black text-slate-500 hover:text-white uppercase tracking-widest transition-colors">View All Archive</button>
            </div>

            <div className="flex flex-col gap-4">
              {isLoading ? (
                <div className="glass p-20 rounded-[32px] flex flex-col items-center justify-center opacity-50">
                  <Activity size={32} className="text-slate-600 animate-spin mb-4" />
                  <span className="text-xs font-black text-slate-600 uppercase tracking-widest">Syncing Live Reports...</span>
                </div>
              ) : reports.length > 0 ? (
                reports.map((report, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass p-6 rounded-3xl border-white/5 flex justify-between items-center group hover:bg-white/5 transition-all"
                  >
                    <div className="flex gap-5 items-center">
                      <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center border border-red-500/10">
                        <ShieldAlert size={24} className="text-red-500" />
                      </div>
                      <div>
                        <div className="font-black text-white text-lg tracking-tight">{report.target_name}</div>
                        <div className="text-xs font-bold text-slate-500">{report.reason} • {new Date(report.created_at).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${report.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-500'}`}>
                        {report.status}
                      </span>
                      <button className="text-slate-600 group-hover:text-white transition-colors">
                        <ArrowUpRight size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="glass p-20 rounded-[32px] flex flex-col items-center justify-center opacity-50 border-dashed">
                  <CheckCircle2 size={32} className="text-emerald-500/30 mb-4" />
                  <span className="text-xs font-black text-slate-600 uppercase tracking-widest">No Active Fraud Reports</span>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Admin Tools */}
          <div className="flex flex-col gap-8">
            <section className="glass p-8 rounded-[40px] border-white/5">
              <h3 className="text-lg font-black text-white mb-6 flex items-center gap-2">
                <Lock size={18} className="text-emerald-500" />
                Admin Protocols
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  { title: "Manual Validation", icon: CheckCircle2, sub: "Review pending status" },
                  { title: "Registry Sync", icon: Database, sub: "Trigger portal scrape" },
                  { title: "POPIA Audit Export", icon: FileText, sub: "Generate data report" },
                  { title: "System Lockdown", icon: ShieldAlert, sub: "Suspend critical nodes" }
                ].map((tool, i) => (
                  <button key={i} className="w-full p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-left flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                      <tool.icon size={18} className="text-slate-400 group-hover:text-emerald-500" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-white uppercase tracking-tight">{tool.title}</div>
                      <div className="text-[10px] font-bold text-slate-500">{tool.sub}</div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="glass p-8 rounded-[40px] border-emerald-500/10 bg-emerald-500/[0.02]">
              <div className="flex items-center gap-3 mb-4">
                <Activity size={20} className="text-emerald-500" />
                <h3 className="text-lg font-black text-white tracking-tight">Intelligence Pulse</h3>
              </div>
              <p className="text-sm font-medium text-slate-400 leading-relaxed mb-6">
                Sentinel AI is currently monitoring 123k+ registry hashes. Data consistency is currently at 99.8% across all provincial nodes.
              </p>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '99.8%' }}
                  className="h-full bg-emerald-500"
                />
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
