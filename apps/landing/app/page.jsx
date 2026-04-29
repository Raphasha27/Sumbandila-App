"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ShieldCheck, CheckCircle2, Search, ArrowRight, 
  Building2, Users, Scale, Activity, Globe,
  Lock, Zap, Star, Code, Smartphone, Check,
  Database, TrendingUp, ShieldAlert, Cpu
} from "lucide-react";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Navigation / Header */}
      <nav className="w-full max-w-7xl px-6 py-8 flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <ShieldCheck size={24} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-white leading-none">SUMBANDILA</span>
            <span className="text-[10px] font-bold text-emerald-500 tracking-widest uppercase">National Sentinel</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-400 uppercase tracking-widest">
          <Link href="#solutions" className="hover:text-emerald-500 transition-colors">Solutions</Link>
          <Link href="#impact" className="hover:text-emerald-500 transition-colors">National Impact</Link>
          <Link href="/admin" className="text-white/80 border border-white/10 px-6 py-2 rounded-full hover:bg-white/5 transition-all">Admin Access</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full max-w-7xl px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 px-6 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2"
        >
          <Activity size={14} className="text-emerald-500 animate-pulse" />
          <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">V5 Deployment Active</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[0.9] max-w-4xl"
        >
          National Trust <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Infrastructure</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-10 text-lg md:text-2xl text-slate-200 font-medium max-w-3xl leading-relaxed"
        >
          Sumbandila is a national trust infrastructure layer designed to verify the legitimacy of institutions, professionals, and public services across South Africa in real time using a unified registry system.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-6 mt-12 w-full sm:w-auto"
        >
          <Link href="/verify" className="btn-primary group flex items-center justify-center gap-3">
            START VERIFICATION <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/admin" className="btn-secondary flex items-center justify-center gap-3">
            GOVERNMENT DASHBOARD
          </Link>
        </motion.div>

        {/* Floating Metrics */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 w-full border-t border-white/5 pt-12"
        >
          <div className="flex flex-col">
            <span className="text-3xl font-black text-white">1.2k+</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Institutions</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-black text-emerald-500">100%</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Official Data</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-black text-white">87k+</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Professionals</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-black text-blue-500">24/7</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Audit Stream</span>
          </div>
        </motion.div>
      </section>

      {/* How it Works Section */}
      <section className="w-full max-w-7xl px-6 py-32 flex flex-col items-center">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-4">Protocol Workflow</div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">How National Verification Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {[
            { step: "01", title: "National Query", desc: "Citizens or enterprises search any institution, practitioner or service instantly via our unified gateway.", icon: Search },
            { step: "02", title: "Registry Match", desc: "Our engine cross-references real-time data hashes against DHET, HPCSA, and other official national databases.", icon: Database },
            { step: "03", title: "Trust Scoring", desc: "AI algorithms analyze historical standing and compliance to assign a risk-weighted trust index in real time.", icon: Activity }
          ].map((item, i) => (
            <div key={i} className="relative p-10 rounded-[40px] bg-white/[0.02] border border-white/5 flex flex-col items-start overflow-hidden group">
              <div className="absolute top-8 right-10 text-6xl font-black text-white/5 group-hover:text-emerald-500/10 transition-colors">{item.step}</div>
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-8 border border-emerald-500/20">
                <item.icon size={24} className="text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{item.title}</h3>
              <p className="text-slate-400 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* National Impact Dashboard */}
      <section id="impact" className="w-full max-w-7xl px-6 py-32 bg-emerald-500/[0.03] rounded-[64px] border border-emerald-500/10 mb-32">
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">National Impact Overview</h2>
          <p className="text-slate-400 font-medium mt-4">Real-time metrics from the unified trust layer.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: "Verifications Processed", value: "1.2M+", icon: CheckCircle2, color: "text-emerald-500" },
            { label: "Institutions Registered", value: "38K+", icon: Building2, color: "text-blue-500" },
            { label: "Fraud Cases Flagged", value: "12K+", icon: ShieldAlert, color: "text-red-500" },
            { label: "System Reliability", value: "99.8%", icon: TrendingUp, color: "text-purple-500" }
          ].map((stat, i) => (
            <div key={i} className="glass p-8 rounded-[32px] flex flex-col items-center text-center">
              <div className={`mb-6 ${stat.color}`}>
                <stat.icon size={32} />
              </div>
              <div className="text-4xl font-black text-white mb-2 tracking-tighter">{stat.value}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Government-Ready Section */}
      <section className="w-full max-w-7xl px-6 py-32 flex flex-col lg:flex-row gap-20 items-center">
        <div className="lg:w-1/2">
          <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-4">Infrastructure Standard</div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-8 leading-[0.95]">Built for National Infrastructure</h2>
          <p className="text-lg text-slate-400 font-medium mb-12 leading-relaxed">
            Sumbandila is engineered to handle the scale and security requirements of government agencies and multi-national enterprises.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: "Unified Registry Layer", desc: "Combines education, healthcare, and legal verification into one system." },
              { title: "Audit-Ready Logs", desc: "Every verification is logged for transparency and total accountability." },
              { title: "AI Trust Scoring", desc: "Detects anomalies and assigns risk levels in real time." },
              { title: "Enterprise API", desc: "Designed for seamless integration with HR and gov systems." }
            ].map((feat, i) => (
              <div key={i} className="flex gap-4">
                <div className="mt-1 w-5 h-5 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-blue-500" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-tight mb-1">{feat.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2 w-full glass p-8 rounded-[48px] border-blue-500/10">
          <div className="bg-slate-950 rounded-[32px] p-8 border border-white/5 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-amber-500/50" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
            </div>
            <div className="font-mono text-sm space-y-2">
              <p className="text-blue-400">POST /api/v1/national/verify</p>
              <p className="text-slate-500">{"{"}</p>
              <p className="text-emerald-400 ml-4">&quot;query&quot;: &quot;Sumbandila Inst of Tech&quot;,</p>
              <p className="text-emerald-400 ml-4">&quot;sector&quot;: &quot;EDUCATION&quot;</p>
              <p className="text-slate-500">{"}"}</p>
              <br />
              <p className="text-slate-400">// Response</p>
              <p className="text-slate-500">{"{"}</p>
              <p className="text-amber-400 ml-4">&quot;status&quot;: &quot;VERIFIED&quot;,</p>
              <p className="text-amber-400 ml-4">&quot;risk_score&quot;: 98,</p>
              <p className="text-amber-400 ml-4">&quot;registry&quot;: &quot;DHET-2026-SA&quot;</p>
              <p className="text-slate-500">{"}"}</p>
            </div>
            <div className="absolute bottom-0 right-0 p-8 opacity-10">
              <Cpu size={120} className="text-white" />
            </div>
          </div>
          <div className="mt-8 flex items-center justify-between px-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Service Status</span>
              <span className="text-xs font-bold text-emerald-500">Node Cluster Active</span>
            </div>
            <button className="text-[10px] font-black text-white bg-blue-500 px-4 py-2 rounded-lg uppercase tracking-widest">API Documentation</button>
          </div>
        </div>
      </section>

      {/* Real-World Use Cases */}
      <section className="w-full max-w-7xl px-6 py-32 bg-slate-900/30 rounded-[64px] border border-white/5 mb-32">
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">Institutional Impact</h2>
          <p className="text-slate-400 font-medium mt-4">Solving the trust deficit across the South African ecosystem.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "For Students", icon: Star, desc: "Verify if a college is fully accredited before enrolling to protect your future and finances." },
            { title: "For Employers", icon: ShieldCheck, desc: "Instantly validate candidate qualifications and professional standing before final hiring decisions." },
            { title: "For Citizens", icon: Globe, desc: "Confirm that doctors, lawyers, and essential services are legitimate and in good standing with the law." }
          ].map((use, i) => (
            <div key={i} className="glass p-10 rounded-[40px] flex flex-col items-start text-left hover:bg-white/5 transition-all">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-8">
                <use.icon size={24} className="text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{use.title}</h3>
              <p className="text-slate-400 font-medium leading-relaxed">{use.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-7xl px-6 py-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck size={24} className="text-emerald-500" />
            <span className="text-xl font-black tracking-tighter text-white leading-none">SUMBANDILA</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">© 2026 National Sentinel Advisory. Republic of South Africa.</p>
        </div>
        <div className="flex gap-12 text-xs font-black text-slate-500 uppercase tracking-widest">
          <Link href="#" className="hover:text-emerald-500 transition-colors">Privacy & POPIA</Link>
          <Link href="#" className="hover:text-emerald-500 transition-colors">Terms of Registry</Link>
          <Link href="#" className="hover:text-emerald-500 transition-colors">Help Desk</Link>
        </div>
      </footer>
    </div>
  );
}
