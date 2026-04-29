"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ShieldCheck, CheckCircle2, Search, ArrowRight, 
  Building2, Users, Scale, Activity, Globe,
  Lock, Zap, Star
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
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-10 text-lg md:text-xl text-slate-400 font-medium max-w-2xl leading-relaxed"
        >
          Sumbandila is South Africa&apos;s unified verification layer. Protecting citizens by instantly validating educational institutions, healthcare professionals, and legal practitioners.
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

      {/* Solutions Section */}
      <section id="solutions" className="w-full max-w-7xl px-6 py-32 bg-slate-900/30 rounded-[64px] border border-white/5 mb-32">
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">A Unified Registry</h2>
          <p className="text-slate-400 font-medium mt-4">Multi-sector verification consolidated into a single trust layer.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Education", icon: Building2, color: "text-emerald-500", bg: "bg-emerald-500/10", desc: "DHET linked registry for private and public higher education institutions." },
            { title: "Healthcare", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10", desc: "HPCSA validated database of registered medical practitioners and clinics." },
            { title: "Legal", icon: Scale, color: "text-amber-500", bg: "bg-amber-500/10", desc: "Official Legal Practice Council records of attorneys and law firms." }
          ].map((sol, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="glass p-10 rounded-[40px] flex flex-col items-start text-left group transition-all hover:border-white/20"
            >
              <div className={`w-16 h-16 ${sol.bg} rounded-[20px] flex items-center justify-center mb-8`}>
                <sol.icon size={32} className={sol.color} />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">{sol.title}</h3>
              <p className="text-slate-400 font-medium leading-relaxed">{sol.desc}</p>
              <div className="mt-8 flex items-center gap-2 text-white/50 font-bold text-sm tracking-widest uppercase">
                Explore Module <ArrowRight size={14} />
              </div>
            </motion.div>
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
