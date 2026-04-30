"use client";

import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import { Target, ChevronRight, Video, Users, Briefcase, GraduationCap, ArrowUpRight, MonitorSmartphone, Activity, ShieldCheck, ShieldAlert, Zap, Star, Award, Trophy } from "lucide-react";
import Link from "next/link";

export default function UserDashboardPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col">
      <SiteNav />

      <main className="flex-grow max-w-6xl mx-auto px-6 py-14 w-full">
        {/* Header Section */}
        <div className="bg-slate-900 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#FFB81C]/20 blur-[50px] rounded-full pointer-events-none" />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 🇿🇦 SUMBANDILA GROWTH ECOSYSTEM
              </p>
              <h1 className="text-4xl font-black mb-1">👋 Welcome, Sipho</h1>
              <p className="text-white/70 font-medium">Your personal growth and opportunity engine.</p>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-2xl p-6 flex items-center gap-6 backdrop-blur-sm">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-white/10" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                  <path className="text-emerald-400" strokeDasharray="78, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-black text-white">78</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">Growth Score</p>
                <p className="font-bold flex items-center gap-2 text-sm">
                  <Target size={16} className="text-[#FFB81C]" /> Next Step:
                </p>
                <Link href="/opportunities" className="text-emerald-400 font-bold text-sm hover:underline flex items-center gap-1">
                  Apply for Internship <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Integrity Pulse: Live Verification Stream */}
            <div className="bg-slate-900 rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black flex items-center gap-2">
                  <Activity className="text-emerald-400 animate-pulse" size={22} /> Integrity Pulse
                </h2>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400/60 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">Live Sync Active</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                      <ShieldCheck className="text-emerald-400" size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">University of Pretoria</h4>
                      <p className="text-[10px] text-white/50 uppercase tracking-widest">Verified • 2 mins ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-emerald-400">SECURE</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center border border-red-500/30">
                      <ShieldAlert className="text-red-400" size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">Dameline (Cancelled)</h4>
                      <p className="text-[10px] text-white/50 uppercase tracking-widest">Flagged • 15 mins ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-red-400">BLOCKED</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl opacity-60">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                      <Users className="text-blue-400" size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">HPCSA: Dr. S. Ndlovu</h4>
                      <p className="text-[10px] text-white/50 uppercase tracking-widest">Practising • 1 hour ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-blue-400">ACTIVE</span>
                  </div>
                </div>
              </div>
              
              <Link href="/verify" className="mt-6 w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all border border-white/10">
                Run New Audit <ChevronRight size={14} />
              </Link>
            </div>

            {/* Opportunities */}
            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Briefcase className="text-[#007749]" size={22} /> Opportunities Near You
                </h2>
                <Link href="/opportunities" className="text-xs font-bold text-[#007749] hover:underline uppercase tracking-widest">View All</Link>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl group hover:border-[#007749] transition-colors">
                  <div>
                    <h3 className="font-bold text-slate-900">Youth Skills Programme</h3>
                    <p className="text-xs text-slate-500 font-medium">Gauteng Provincial Government</p>
                  </div>
                  <button className="bg-white border border-slate-200 text-slate-800 px-4 py-2 rounded-xl text-xs font-bold group-hover:bg-[#007749] group-hover:text-white group-hover:border-[#007749] transition-colors">Apply</button>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl group hover:border-[#007749] transition-colors">
                  <div>
                    <h3 className="font-bold text-slate-900">Junior Developer Internship</h3>
                    <p className="text-xs text-slate-500 font-medium">TechHub South Africa</p>
                  </div>
                  <button className="bg-white border border-slate-200 text-slate-800 px-4 py-2 rounded-xl text-xs font-bold group-hover:bg-[#007749] group-hover:text-white group-hover:border-[#007749] transition-colors">Apply</button>
                </div>
              </div>
            </div>
          </div>

          {/* Side Column */}
          <div className="space-y-8">
            
            {/* Digital Identity Card */}
            <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-900/40 group">
              {/* National Gradient Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#007749] via-[#FFB81C] to-[#E03C31]" />
              
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full border-4 border-emerald-500/30 p-1 group-hover:scale-105 transition-transform">
                    <img src="https://i.pravatar.cc/150?u=sipho" className="w-full h-full rounded-full object-cover" alt="Profile" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-xl shadow-lg border-4 border-slate-900">
                    <ShieldCheck size={16} />
                  </div>
                </div>
                
                <h3 className="text-2xl font-black mb-1">Sipho Mokoena</h3>
                <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-6">RSA-ID: 980429XXXX081</p>
                
                <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                      <Zap size={12} /> Rocket Level
                    </span>
                    <span className="text-xs font-black">78/100 XP</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[78%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  </div>
                </div>
                
                <div className="flex gap-4 w-full">
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3">
                    <p className="text-[9px] font-black text-white/30 uppercase mb-1">Badges</p>
                    <div className="flex justify-center gap-1">
                      <Star size={14} className="text-amber-400" />
                      <Award size={14} className="text-blue-400" />
                      <Trophy size={14} className="text-emerald-400" />
                    </div>
                  </div>
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3">
                    <p className="text-[9px] font-black text-white/30 uppercase mb-1">Status</p>
                    <p className="text-[11px] font-black text-emerald-400 uppercase">Verified</p>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all">
                Manage Identity
              </button>
            </div>

            {/* Registry Alerts */}
            <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center border border-red-100">
                  <ShieldAlert size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Registry Alerts</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Scam Tracking</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { title: "DHET Fake College List", status: "CRITICAL", color: "text-red-600 bg-red-50" },
                  { title: "Job Offer Deposit Scam", status: "ACTIVE", color: "text-amber-600 bg-amber-50" },
                  { title: "Verification API Outage", status: "RESOLVED", color: "text-emerald-600 bg-emerald-50" },
                ].map((alert, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group cursor-pointer hover:border-slate-200 transition-colors">
                    <div className="max-w-[70%]">
                      <p className="text-xs font-black text-slate-900 group-hover:text-[#007749] transition-colors">{alert.title}</p>
                      <p className="text-[9px] font-bold text-slate-400 mt-1">Updated 2h ago</p>
                    </div>
                    <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${alert.color}`}>
                      {alert.status}
                    </span>
                  </div>
                ))}
              </div>

              <button className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10">
                View All Alerts
              </button>
            </div>

            {/* Upcoming Webinars */}
            <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100">
                  <Video size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Webinar Hub</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Knowledge</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4 items-start p-3 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer">
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex flex-col items-center justify-center shrink-0 border border-red-100">
                    <span className="text-[9px] font-black text-red-500 uppercase">Oct</span>
                    <span className="text-lg font-black text-red-700 leading-none">12</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 leading-tight">Mastering Your Growth Path</h3>
                    <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-1 font-black">45 mins • Live</p>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-700 hover:bg-slate-100 transition-colors">
                Open Webinar Schedule
              </button>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
