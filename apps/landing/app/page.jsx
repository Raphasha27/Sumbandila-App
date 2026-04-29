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
      
      {/* Light Theme Government Navigation */}
      <nav className="w-full bg-white px-6 md:px-12 py-4 flex justify-between items-center z-50">
        <div className="flex items-center gap-8">
          {/* SA Flag & Sumbandila Logo */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <div className="flex">
                <div className="w-4 h-3 bg-red-600 skew-x-12" />
                <div className="w-4 h-3 bg-blue-600 -skew-x-12" />
              </div>
              <div className="flex">
                <div className="w-4 h-3 bg-green-600 skew-x-12" />
                <div className="w-4 h-3 bg-yellow-400 -skew-x-12" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-tighter text-slate-900 leading-none">SUMBANDILA</span>
              <span className="text-[10px] font-bold text-slate-600 tracking-widest uppercase">National Sentinel</span>
              <span className="text-[8px] font-medium text-slate-500 mt-1">Building a trusted South Africa, together.</span>
            </div>
          </div>
          
          <div className="hidden lg:block w-px h-10 bg-slate-200 mx-2" />

          {/* Coat of Arms (Simplified) */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="w-8 h-10 bg-amber-500 rounded-t-full flex items-center justify-center">
              <ShieldCheck size={16} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-900 tracking-widest uppercase">Republic of South Africa</span>
              <span className="text-[9px] font-medium text-slate-600 italic">Batho Pele • We Care. We Act.</span>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-[11px] font-black text-slate-800 uppercase tracking-widest">
          <Link href="#solutions" className="hover:text-emerald-600 transition-colors">Solutions</Link>
          <Link href="#impact" className="hover:text-emerald-600 transition-colors">National Impact</Link>
          <Link href="#about" className="hover:text-emerald-600 transition-colors">About Us</Link>
          <Link href="/admin" className="px-5 py-3 rounded-lg bg-[#0E3B29] text-white flex items-center gap-2 hover:bg-emerald-900 transition-all">
            <Lock size={14} /> Admin Portal
          </Link>
          <div className="flex items-center gap-1 cursor-pointer">
            <span className="text-lg">🇿🇦</span> ZA ˅
          </div>
        </div>
      </nav>

      {/* Ndebele Pattern Divider */}
      <div className="w-full h-3 flex" style={{ background: "repeating-linear-gradient(45deg, #E63946 0px, #E63946 10px, #F1FAEE 10px, #F1FAEE 20px, #1D3557 20px, #1D3557 30px, #457B9D 30px, #457B9D 40px, #F4A261 40px, #F4A261 50px)" }} />
      <div className="w-full h-1 bg-[#0E3B29]" />

      {/* Hero Section with Background Image */}
      <section className="relative w-full min-h-[85vh] flex flex-col justify-center px-6 md:px-12 py-20 overflow-hidden">
        {/* Background Image (Table Mountain Placeholder) */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=2000&q=80')" }}
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0B1120] via-[#0B1120]/80 to-transparent" />
        
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:w-1/2 flex flex-col items-start text-left"
          >
            <motion.div
              variants={itemVariants}
              className="mb-6 px-4 py-1.5 rounded-full bg-[#0E3B29]/80 border border-emerald-500/20 flex items-center gap-2 backdrop-blur-md"
            >
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">System Version 6.0 Live</span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] mb-6"
            >
              <span className="text-white">Unified</span> <br />
              <span className="text-emerald-500">Trust for</span> <br />
              <span className="text-amber-400">South Africa</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-base md:text-lg text-slate-300 font-medium max-w-lg leading-relaxed mb-10"
            >
              The official national trust infrastructure for South Africa. Verify the legitimacy of institutions, healthcare professionals, and legal practitioners in real-time.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Link href="/verify" className="px-6 py-3.5 rounded-lg bg-emerald-600 text-white font-bold tracking-widest text-sm uppercase hover:bg-emerald-500 transition-all flex items-center justify-center gap-3">
                <ShieldCheck size={18} /> START VERIFICATION <ChevronRight size={18} />
              </Link>
              <Link href="/admin" className="px-6 py-3.5 rounded-lg border-2 border-white/20 text-white font-bold tracking-widest text-sm uppercase hover:bg-white/10 transition-all flex items-center justify-center gap-3 backdrop-blur-sm">
                <Activity size={18} /> DASHBOARD ACCESS
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-1/2 w-full flex justify-end"
          >
            <Image 
              src="/hero-dashboard.png" 
              alt="National Trust Dashboard" 
              width={700} 
              height={500} 
              className="rounded-2xl shadow-2xl border border-white/10"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* White Bottom Info Bar */}
      <section className="w-full bg-white px-6 md:px-12 py-8 border-b border-slate-200">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: Lock, title: "Secure. Transparent. Trusted.", desc: "Built for every South African." },
            { icon: CheckCircle2, title: "Protecting Identities", desc: "Securing our communities." },
            { icon: Globe, title: "Batho Pele in Action", desc: "People first, always." },
            { icon: Star, title: "Proudly South African", desc: "Developed for Mzansi." }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="text-slate-400">
                <item.icon size={32} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900">{item.title}</span>
                <span className="text-xs font-medium text-slate-500">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Clean Dark Bento Grid Solutions */}
      <section id="solutions" className="w-full max-w-7xl px-6 py-32 bg-[#0B1120]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-24 pt-10">
          
          {/* Education Portal */}
          <div className="flex flex-col items-start">
            <div className="w-14 h-14 bg-[#062F21] rounded-2xl flex items-center justify-center mb-6">
              <Building2 size={24} className="text-[#10B981]" />
            </div>
            <h3 className="text-[32px] font-black text-white mb-4 tracking-tight">Education Portal</h3>
            <p className="text-[#94A3B8] text-base font-medium leading-relaxed max-w-[90%]">
              DHET-linked registry verifying accreditation status for private and public higher education institutions.
            </p>
          </div>

          {/* Healthcare Sentinel */}
          <div className="flex flex-col items-start">
            <div className="w-14 h-14 bg-[#0F2942] rounded-2xl flex items-center justify-center mb-6">
              <Users size={24} className="text-[#3B82F6]" />
            </div>
            <h3 className="text-[32px] font-black text-white mb-4 tracking-tight">Healthcare Sentinel</h3>
            <p className="text-[#94A3B8] text-base font-medium leading-relaxed max-w-[90%]">
              Live validation of registered medical practitioners, clinics, and pharmacies via HPCSA protocols.
            </p>
          </div>

          {/* Legal Practice */}
          <div className="flex flex-col items-center text-center mt-12 md:mt-0">
            <div className="w-14 h-14 bg-[#3B2610] rounded-2xl flex items-center justify-center mb-6">
              <Scale size={24} className="text-[#F59E0B]" />
            </div>
            <h3 className="text-xl font-black text-white mb-3">Legal Practice</h3>
            <p className="text-[#64748B] text-xs font-bold uppercase tracking-[0.2em]">
              LPC RECORDS SYNC
            </p>
          </div>

          {/* Enterprise API */}
          <div className="flex items-center justify-between relative mt-12 md:mt-0">
            <div className="flex flex-col items-start z-10">
              <h3 className="text-[32px] font-black text-white mb-2 tracking-tight">Enterprise API</h3>
              <p className="text-[#94A3B8] text-base font-medium">
                Seamless integration for HR & Fintech.
              </p>
            </div>
            <div className="absolute right-0 -bottom-8 opacity-20 pointer-events-none">
              <Cpu size={240} className="text-[#64748B]" strokeWidth={1} />
            </div>
          </div>

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
              <div className={`text-[64px] font-black ${stat.color} mb-3 tracking-tight`}>{stat.value}</div>
              <div className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.25em]">{stat.label}</div>
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
