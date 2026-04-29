"use client";

import { Search, ChevronRight, GraduationCap, HandCoins, HeartPulse, ShieldCheck, Activity, Users, Globe, BookOpen, Star, Sparkles, MapPin, Briefcase, PlayCircle, Scale } from "lucide-react";
import Link from "next/link";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import SiphoFloatingAssistant from "../components/SiphoFloatingAssistant";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-emerald-500/30">
      <SiteNav />
      <SiphoFloatingAssistant />

      {/* ── HERO SECTION ── */}
      <section className="relative pt-24 pb-32 px-6 md:px-12 overflow-hidden bg-white">
        {/* Ndebele-inspired background elements */}
        <div className="absolute top-0 left-0 w-full h-1 flex" style={{ 
          backgroundImage: "repeating-linear-gradient(90deg, #FFB81C 0px, #FFB81C 20px, #007749 20px, #007749 40px, #E03C31 40px, #E03C31 60px, #002395 60px, #002395 80px, #000 80px, #000 100px)",
        }} />
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <div className="w-full lg:w-3/5">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-8 animate-fade-in">
              <Sparkles size={16} className="text-[#007749]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#007749]">National Youth Growth Ecosystem 2026</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.95] text-slate-900 mb-8">
              Grow with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007749] to-[#002395]">Sumbandila.</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-semibold text-slate-600 mb-12 max-w-2xl leading-relaxed">
              The official gateway to verified opportunities, skills, and national services for the youth of South Africa.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/opportunities" className="px-8 py-4 rounded-xl bg-[#007749] text-white font-bold tracking-widest text-xs uppercase hover:bg-[#0E3B29] transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-900/20">
                <Search size={18} /> EXPLORE OPPORTUNITIES
              </Link>
              <Link href="/membership" className="px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold tracking-widest text-xs uppercase hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-sm">
                <Users size={18} /> JOIN THE COMMUNITY
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-2/5">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#007749]/20 to-[#002395]/20 blur-2xl rounded-full" />
              <div className="relative bg-white p-8 rounded-[40px] shadow-2xl border border-slate-100">
                <div className="flex items-center justify-between mb-8">
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Live Registry Pulse</div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-bold text-emerald-600">CONNECTED</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {[
                    { label: "Verified Institutions", value: "4,208", icon: ShieldCheck, color: "text-[#007749]" },
                    { label: "Opportunities Listed", value: "12,450", icon: Briefcase, color: "text-[#002395]" },
                    { label: "Youth Registered", value: "1.2M+", icon: Users, color: "text-[#E03C31]" },
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <stat.icon size={20} className={stat.color} />
                        <span className="text-sm font-black text-slate-900">{stat.label}</span>
                      </div>
                      <span className="text-lg font-black text-slate-900 tracking-tighter">{stat.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-slate-100 text-center">
                   <Link href="/verify" className="text-[10px] font-black text-[#007749] uppercase tracking-widest hover:underline">
                      Launch National Verification Engine →
                   </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[10px] font-black text-[#007749] uppercase tracking-[0.3em] mb-2 block">The Ecosystem</span>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">One Platform, Endless Pathways.</h2>
          </div>
          <Link href="/services" className="text-sm font-black text-[#007749] hover:underline uppercase tracking-widest flex items-center gap-1">
             View All Services <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { id: "tech", label: "Tech & Digital", icon: Globe, color: "bg-blue-50 text-blue-600", desc: "Software, Data & AI" },
            { id: "skills", label: "Skills Hub", icon: BookOpen, color: "bg-emerald-50 text-[#007749]", desc: "TVET & Certifications" },
            { id: "rural", label: "Rural Growth", icon: MapPin, color: "bg-amber-50 text-amber-600", desc: "Agri & Community" },
            { id: "webinars", label: "Webinars", icon: PlayCircle, color: "bg-purple-50 text-purple-600", desc: "Live Learning" },
            { id: "business", label: "Business Hub", icon: Briefcase, color: "bg-slate-100 text-slate-900", desc: "Grants & Startups" },
            { id: "creative", label: "Creative Arts", icon: Sparkles, color: "bg-rose-50 text-rose-600", desc: "Media & Design" },
            { id: "leadership", label: "Leadership", icon: Users, color: "bg-indigo-50 text-indigo-600", desc: "Mentorship & Gov" },
            { id: "social", label: "Social Good", icon: HeartPulse, color: "bg-green-50 text-green-600", desc: "NGOs & Impact" },
          ].map((cat, i) => (
            <Link key={i} href={cat.id === "leadership" ? "/leadership" : `/category/${cat.id}`} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all group flex flex-col">
              <div className={`w-12 h-12 ${cat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <cat.icon size={24} />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1">{cat.label}</h3>
              <p className="text-xs font-medium text-slate-500 mb-4">{cat.desc}</p>
              <div className="mt-auto flex items-center gap-1 text-[10px] font-black text-[#007749] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                 Explore <ChevronRight size={10} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── POPULAR SERVICES ── */}
      <section className="bg-white py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1">
            <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 p-8">
                <Activity size={40} className="text-[#FFB81C] opacity-20" />
              </div>
              <h3 className="text-3xl font-black mb-6">Popular Services</h3>
              <p className="text-white/60 font-medium mb-8">
                The most accessed government services by youth this month.
              </p>
              <div className="flex items-center gap-2 text-xs font-black text-[#FFB81C] uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB81C] animate-pulse" />
                Live Demand Data
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-100 p-10">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-black text-slate-900">Recommended for You</h3>
              <Link href="/services" className="text-xs font-bold text-[#007749] hover:underline">View all</Link>
            </div>
            
            <div className="flex flex-col gap-2">
              <Link href="/apply/nsfas" className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-colors group border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-50 text-[#007749] flex items-center justify-center">
                    <GraduationCap size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-900">Apply for NSFAS</span>
                    <span className="text-xs font-semibold text-slate-500">Financial aid for students</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-400 group-hover:text-[#007749] transition-colors" />
              </Link>
              
              <Link href="/services/clinics" className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-colors group border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-50 text-[#E03C31] flex items-center justify-center">
                    <HeartPulse size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-900">Find a Clinic Near You</span>
                    <span className="text-xs font-semibold text-slate-500">Search public health facilities</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-400 group-hover:text-[#E03C31] transition-colors" />
              </Link>

              <Link href="/apply/sassa" className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-colors group border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-50 text-[#007749] flex items-center justify-center">
                    <HandCoins size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-slate-900">Apply for SASSA Grants</span>
                    <span className="text-xs font-semibold text-slate-500">Check eligibility & apply</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-400 group-hover:text-[#007749] transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="text-center mb-16">
          <span className="text-[10px] font-black text-[#007749] uppercase tracking-[0.3em] mb-2 block">National Growth Pathway</span>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">How it Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-px border-t-2 border-dashed border-slate-200 z-0" />
          
          <div className="flex flex-col items-center text-center relative z-10">
            <div className="w-20 h-20 bg-white rounded-3xl shadow-xl border border-slate-100 flex items-center justify-center text-3xl font-black text-[#007749] mb-6">1</div>
            <h3 className="text-xl font-black text-slate-900 mb-3">Verify Status</h3>
            <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-xs">
              Verify institutions, practitioners, or your credentials in seconds with our National Sentinel.
            </p>
          </div>

          <div className="flex flex-col items-center text-center relative z-10">
            <div className="w-20 h-20 bg-[#007749] rounded-3xl shadow-xl shadow-green-900/20 flex items-center justify-center text-3xl font-black text-white mb-6">2</div>
            <h3 className="text-xl font-black text-slate-900 mb-3">Apply for Growth</h3>
            <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-xs">
              Discover verified opportunities — from NSFAS and SASSA to skills bursaries and leadership hubs.
            </p>
          </div>

          <div className="flex flex-col items-center text-center relative z-10">
            <div className="w-20 h-20 bg-white rounded-3xl shadow-xl border border-slate-100 flex items-center justify-center text-3xl font-black text-[#002395] mb-6">3</div>
            <h3 className="text-xl font-black text-slate-900 mb-3">Scale Future</h3>
            <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-xs">
              Connect with mentors, track applications, and unlock national membership benefits for sustained success.
            </p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <Link href="/membership" className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-2xl">
            GET STARTED NOW <ChevronRight size={18} />
          </Link>
        </div>
      </section>

      {/* ── BOTTM CARDS ── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 border-t border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-[40px] p-10 shadow-lg border border-slate-100 flex flex-col justify-between relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-slate-900 mb-4">Registry Pulse</h3>
              <p className="text-sm font-semibold text-slate-700 max-w-xs mb-8">
                Get real-time updates on opportunities, deadlines and important announcements across the nation.
              </p>
              <Link href="/membership" className="px-6 py-3 rounded-xl bg-[#007749] text-white font-bold tracking-widest text-xs uppercase hover:bg-[#0E3B29] transition-all shadow-md inline-block text-center">
                SUBSCRIBE FOR UPDATES
              </Link>
            </div>
            <div className="absolute right-0 bottom-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
              <Activity size={160} />
            </div>
          </div>

          <div className="bg-[#0E3B29] rounded-[40px] p-10 shadow-lg flex flex-col justify-between relative overflow-hidden text-white group">
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-4">Batho Pele in Action</h3>
              <p className="text-sm font-semibold text-white/80 max-w-xs mb-8">
                Putting people first by delivering services with care, respect, and national integrity.
              </p>
              <Link href="/about" className="inline-block px-6 py-3 rounded-xl bg-transparent border-2 border-white/30 text-white font-bold tracking-widest text-xs uppercase hover:bg-white hover:text-[#0E3B29] transition-all">
                LEARN MORE
              </Link>
            </div>
            <div className="absolute right-[-20px] bottom-[-20px] p-8 opacity-10 group-hover:scale-110 transition-transform">
              <Users size={180} />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
