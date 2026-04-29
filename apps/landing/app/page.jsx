"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ShieldCheck, CheckCircle2, Search, ArrowRight, 
  Building2, Users, Scale, Activity, Globe,
  Lock, Zap, Star, Code, Smartphone, Check,
  Database, TrendingUp, ShieldAlert, Cpu, ChevronRight
} from "lucide-react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="flex flex-col items-center bg-[#030712] selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Mesh Background */}
      <div className="fixed inset-0 mesh-gradient opacity-40 pointer-events-none" />

      {/* Navigation */}
      <nav className="w-full max-w-7xl px-6 py-8 flex justify-between items-center z-50">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/40">
            <ShieldCheck size={28} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter text-white leading-none">SUMBANDILA</span>
            <span className="text-[10px] font-black text-emerald-500 tracking-[0.4em] uppercase">National Sentinel</span>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex items-center gap-10 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]"
        >
          <Link href="#solutions" className="hover:text-white transition-colors">Solutions</Link>
          <Link href="#impact" className="hover:text-white transition-colors">National Impact</Link>
          <Link href="/admin" className="px-8 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-all backdrop-blur-md">Admin Portal</Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full max-w-7xl px-6 pt-24 pb-40 flex flex-col lg:flex-row items-center gap-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ opacity, scale }}
          className="lg:w-1/2 flex flex-col items-start text-left z-10"
        >
          <motion.div
            variants={itemVariants}
            className="mb-8 px-6 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 backdrop-blur-md"
          >
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">System Version 6.0 Live</span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.85] mb-8"
          >
            Unified <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600">Trust Layer</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-400 font-medium max-w-xl leading-relaxed mb-12"
          >
            The official national trust infrastructure for South Africa. Verify the legitimacy of institutions, healthcare professionals, and legal practitioners in real-time.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
          >
            <Link href="/verify" className="btn-primary group flex items-center justify-center gap-4">
              START VERIFICATION <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/admin" className="btn-secondary flex items-center justify-center gap-4">
              DASHBOARD ACCESS
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:w-1/2 w-full relative perspective-1000"
        >
          <div className="relative z-10 animate-float">
            <Image 
              src="/hero-dashboard.png" 
              alt="National Trust Dashboard" 
              width={800} 
              height={600} 
              className="rounded-[40px] shadow-2xl border border-white/10 backdrop-blur-2xl"
              priority
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/20 blur-[80px] rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 blur-[80px] rounded-full" />
        </motion.div>
      </section>

      {/* Bento Grid Solutions */}
      <section id="solutions" className="w-full max-w-7xl px-6 py-40">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-24"
        >
          <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-6">Multi-Sector Coverage</div>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-white max-w-4xl leading-tight">Consolidated National Registries</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 h-auto md:h-[600px]">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="md:col-span-3 glass-card p-12 rounded-[48px] flex flex-col justify-end"
          >
            <div className="w-16 h-16 bg-emerald-500/10 rounded-3xl flex items-center justify-center mb-8 border border-emerald-500/20">
              <Building2 size={32} className="text-emerald-500" />
            </div>
            <h3 className="text-3xl font-black text-white mb-4">Education Portal</h3>
            <p className="text-slate-400 font-medium leading-relaxed max-w-md">DHET-linked registry verifying accreditation status for private and public higher education institutions.</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="md:col-span-3 glass-card p-12 rounded-[48px] flex flex-col justify-end"
          >
            <div className="w-16 h-16 bg-blue-500/10 rounded-3xl flex items-center justify-center mb-8 border border-blue-500/20">
              <Users size={32} className="text-blue-500" />
            </div>
            <h3 className="text-3xl font-black text-white mb-4">Healthcare Sentinel</h3>
            <p className="text-slate-400 font-medium leading-relaxed max-w-md">Live validation of registered medical practitioners, clinics, and pharmacies via HPCSA protocols.</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="md:col-span-2 glass-card p-10 rounded-[48px] flex flex-col justify-center items-center text-center"
          >
            <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 border border-amber-500/20">
              <Scale size={28} className="text-amber-500" />
            </div>
            <h3 className="text-xl font-black text-white mb-2">Legal Practice</h3>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">LPC Records Sync</p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="md:col-span-4 glass-card p-10 rounded-[48px] flex items-center justify-between overflow-hidden relative"
          >
            <div className="z-10">
              <h3 className="text-3xl font-black text-white mb-2">Enterprise API</h3>
              <p className="text-slate-400 font-medium">Seamless integration for HR & Fintech.</p>
            </div>
            <div className="w-1/2 opacity-20 transform translate-x-10 translate-y-10">
              <Cpu size={200} className="text-white" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section id="impact" className="w-full max-w-7xl px-6 py-40 flex flex-col items-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 w-full max-w-5xl">
          {[
            { label: "Verifications", value: "1.2M+", color: "text-emerald-500" },
            { label: "Institutions", value: "38K+", color: "text-blue-500" },
            { label: "Fraud Blocked", value: "12K+", color: "text-red-500" },
            { label: "Uptime", value: "99.9%", color: "text-purple-500" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className={`text-6xl font-black ${stat.color} mb-4 tracking-tighter`}>{stat.value}</div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* API Preview / Code Section */}
      <section className="w-full max-w-7xl px-6 py-40">
        <div className="glass p-12 md:p-24 rounded-[64px] border-emerald-500/10 flex flex-col lg:flex-row gap-20 items-center overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[100px] rounded-full" />
          
          <div className="lg:w-1/2 text-left">
            <div className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-6">Developer First</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-8">Integrated Trust for Every System.</h2>
            <p className="text-lg text-slate-400 font-medium mb-10 leading-relaxed">
              Connect your HR portal, banking app, or government database directly to the national registry via our high-performance REST API.
            </p>
            <div className="flex gap-4">
              <button className="btn-primary">Get API Key</button>
              <button className="btn-secondary">View Docs</button>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="bg-slate-950/80 backdrop-blur-2xl rounded-[32px] p-10 border border-white/10 shadow-2xl">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest ml-4">Terminal — v1/verify</span>
              </div>
              <div className="font-mono text-sm space-y-4">
                <div className="flex gap-4">
                  <span className="text-slate-700">01</span>
                  <p className="text-blue-400">curl -X POST &quot;https://api.sumbandila.gov.za/v1/verify&quot; \</p>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-700">02</span>
                  <p className="text-blue-400 ml-8">-H &quot;Authorization: Bearer $SENTINEL_KEY&quot; \</p>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-700">03</span>
                  <p className="text-blue-400 ml-8">-d &apos;{"{"} &quot;query&quot;: &quot;MP-10294&quot; {"}"}&apos;</p>
                </div>
                <br />
                <div className="flex gap-4">
                  <span className="text-slate-700">04</span>
                  <p className="text-slate-500">// Result: [VERIFIED] Dr. Sipho M.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-7xl px-6 py-32 border-t border-white/5 flex flex-col md:flex-row justify-between items-start gap-20">
        <div className="flex flex-col max-w-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
              <ShieldCheck size={24} className="text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">SUMBANDILA</span>
          </div>
          <p className="text-slate-500 text-sm font-medium leading-relaxed">
            The National Trust Sentinel of South Africa. Ensuring institutional integrity and citizen protection through real-time registry verification.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-20">
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-black text-white uppercase tracking-widest">Platform</span>
            <Link href="#" className="text-xs font-bold text-slate-500 hover:text-emerald-500 transition-colors">Registry Engine</Link>
            <Link href="#" className="text-xs font-bold text-slate-500 hover:text-emerald-500 transition-colors">Enterprise API</Link>
            <Link href="#" className="text-xs font-bold text-slate-500 hover:text-emerald-500 transition-colors">Verification App</Link>
          </div>
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-black text-white uppercase tracking-widest">Resources</span>
            <Link href="#" className="text-xs font-bold text-slate-500 hover:text-emerald-500 transition-colors">Case Studies</Link>
            <Link href="#" className="text-xs font-bold text-slate-500 hover:text-emerald-500 transition-colors">Transparency Report</Link>
            <Link href="#" className="text-xs font-bold text-slate-500 hover:text-emerald-500 transition-colors">Help Center</Link>
          </div>
          <div className="flex flex-col gap-6">
            <span className="text-[10px] font-black text-white uppercase tracking-widest">Legal</span>
            <Link href="#" className="text-xs font-bold text-slate-500 hover:text-emerald-500 transition-colors">POPIA Policy</Link>
            <Link href="#" className="text-xs font-bold text-slate-500 hover:text-emerald-500 transition-colors">Terms of Service</Link>
            <Link href="#" className="text-xs font-bold text-slate-500 hover:text-emerald-500 transition-colors">Compliance</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
