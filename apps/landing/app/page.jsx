"use client";

import { Search, ChevronRight, GraduationCap, HandCoins, HeartPulse, ShieldCheck, Activity, Users, Globe, BookOpen, Star, Sparkles, MapPin, Briefcase, PlayCircle, Scale, Lightbulb, Trophy } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import SiphoFloatingAssistant from "../components/SiphoFloatingAssistant";

const HERO_SLIDES = [
  { src: "/mandela-bridge.png",      caption: "Nelson Mandela Bridge — Johannesburg" },
  { src: "/union-buildings.png",     caption: "Union Buildings — Pretoria" },
  { src: "/sa-youth.png",            caption: "South African Youth — Our Future" },
  { src: "/elderly-food-parcels.png",caption: "Batho Pele — Caring for Our Elders" },
  { src: "/diverse-community.png",   caption: "Ubuntu — United in Growth" },
];

export default function LandingPage() {
  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setHeroSlide((s) => (s + 1) % HERO_SLIDES.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-emerald-500/30">
      <SiteNav />
      <SiphoFloatingAssistant />

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">

        {/* ── Rotating background images ── */}
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === heroSlide ? 1 : 0 }}
          >
            <img
              src={slide.src}
              alt={slide.caption}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        {/* Ndebele colour band at top */}
        <div className="absolute top-0 left-0 w-full h-1.5 z-20" style={{
          backgroundImage: "repeating-linear-gradient(90deg,#FFB81C 0px,#FFB81C 20px,#007749 20px,#007749 40px,#E03C31 40px,#E03C31 60px,#002395 60px,#002395 80px,#000 80px,#000 100px)",
        }} />

        {/* ── Content ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32 w-full flex flex-col lg:flex-row items-center gap-16">

          {/* Left — text */}
          <div className="w-full lg:w-3/5">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
              <Sparkles size={16} className="text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">National Youth Growth Ecosystem 2026</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.95] text-white mb-8 drop-shadow-xl">
              Grow with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-[#FFB81C]">
                Sumbandila.
              </span>
            </h1>

            <p className="text-xl md:text-2xl font-semibold text-white/80 mb-12 max-w-2xl leading-relaxed">
              The official gateway to verified opportunities, skills, and national services for the youth of South Africa.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/opportunities" className="px-8 py-4 rounded-xl bg-emerald-600 text-white font-bold tracking-widest text-xs uppercase hover:bg-emerald-500 transition-all flex items-center gap-3 shadow-xl">
                <Search size={18} /> EXPLORE OPPORTUNITIES
              </Link>
              <Link href="/membership" className="px-8 py-4 rounded-xl bg-white/10 border border-white/30 backdrop-blur-sm text-white font-bold tracking-widest text-xs uppercase hover:bg-white/20 transition-all flex items-center gap-3">
                <Users size={18} /> JOIN THE COMMUNITY
              </Link>
            </div>

            {/* Slide caption + dots */}
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {HERO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setHeroSlide(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === heroSlide ? "w-8 bg-emerald-400" : "w-2 bg-white/30"
                    }`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
              <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">
                {HERO_SLIDES[heroSlide].caption}
              </span>
            </div>
          </div>

          {/* Right — Live Registry Pulse card */}
          <div className="w-full lg:w-2/5">
            <div className="relative">
              <div className="absolute -inset-4 bg-emerald-500/20 blur-2xl rounded-full" />
              <div className="relative bg-white/10 backdrop-blur-xl p-8 rounded-[40px] shadow-2xl border border-white/20">
                <div className="flex items-center justify-between mb-8">
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Live Registry Pulse</div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] font-bold text-emerald-400">CONNECTED</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    { label: "Verified Institutions", value: "4,208",  icon: ShieldCheck, color: "text-emerald-400" },
                    { label: "Opportunities Listed",  value: "12,450", icon: Briefcase,   color: "text-blue-300" },
                    { label: "Youth Registered",      value: "1.2M+",  icon: Users,       color: "text-rose-400" },
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <stat.icon size={20} className={stat.color} />
                        <span className="text-sm font-black text-white">{stat.label}</span>
                      </div>
                      <span className="text-lg font-black text-white tracking-tighter">{stat.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-white/10 text-center">
                  <Link href="/verify" className="text-[10px] font-black text-emerald-400 uppercase tracking-widest hover:underline">
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

      {/* ── AWARENESS & NATIONAL UPDATES ── */}
      <section className="bg-slate-950 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
            <div>
              <span className="text-[10px] font-black text-rose-400 uppercase tracking-[0.3em] mb-3 block">SA Awareness Hub</span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Stay Informed.<br/>Stay Safe.</h2>
            </div>
            <p className="text-white/50 font-semibold max-w-md text-sm leading-relaxed">
              Critical awareness campaigns, national events, and health updates for all South Africans — in one place.
            </p>
          </div>

          {/* Awareness Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">

            {/* HIV/AIDS */}
            <div className="relative rounded-[28px] bg-gradient-to-br from-red-950/80 to-rose-900/40 border border-rose-800/40 p-7 overflow-hidden group hover:border-rose-600/60 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/10 rounded-full -translate-y-8 translate-x-8" />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/20 flex items-center justify-center mb-5">
                  <HeartPulse size={24} className="text-rose-400" />
                </div>
                <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest mb-2 block">Health Awareness</span>
                <h3 className="text-xl font-black text-white mb-3">HIV & AIDS Awareness</h3>
                <p className="text-sm text-white/60 font-medium leading-relaxed mb-5">
                  South Africa has the world's largest HIV programme. Know your status — free testing is available at all public clinics. Treatment is free. Early detection saves lives.
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {["Free Testing", "Free ARVs", "All Clinics"].map(t => (
                    <span key={t} className="px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[10px] font-black uppercase">{t}</span>
                  ))}
                </div>
                <Link href="/services/clinics" className="text-[11px] font-black text-rose-400 uppercase tracking-widest hover:underline flex items-center gap-1">
                  Find a Testing Centre <ChevronRight size={12} />
                </Link>
              </div>
            </div>

            {/* TB Awareness */}
            <div className="relative rounded-[28px] bg-gradient-to-br from-orange-950/80 to-amber-900/40 border border-amber-800/40 p-7 overflow-hidden group hover:border-amber-600/60 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/10 rounded-full -translate-y-8 translate-x-8" />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center mb-5">
                  <Activity size={24} className="text-amber-400" />
                </div>
                <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest mb-2 block">Health Awareness</span>
                <h3 className="text-xl font-black text-white mb-3">TB Awareness</h3>
                <p className="text-sm text-white/60 font-medium leading-relaxed mb-5">
                  SA has one of the highest TB rates globally. If you have a persistent cough for 2+ weeks, visit your nearest clinic. TB is curable with free medication available nationwide.
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {["Free Treatment", "Curable", "Clinics Nationwide"].map(t => (
                    <span key={t} className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-black uppercase">{t}</span>
                  ))}
                </div>
                <Link href="/services/clinics" className="text-[11px] font-black text-amber-400 uppercase tracking-widest hover:underline flex items-center gap-1">
                  Find a Clinic <ChevronRight size={12} />
                </Link>
              </div>
            </div>

            {/* GBV */}
            <div className="relative rounded-[28px] bg-gradient-to-br from-purple-950/80 to-violet-900/40 border border-violet-800/40 p-7 overflow-hidden group hover:border-violet-600/60 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 rounded-full -translate-y-8 translate-x-8" />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-violet-500/20 flex items-center justify-center mb-5">
                  <ShieldCheck size={24} className="text-violet-400" />
                </div>
                <span className="text-[9px] font-black text-violet-400 uppercase tracking-widest mb-2 block">Safety Awareness</span>
                <h3 className="text-xl font-black text-white mb-3">GBV & Safety</h3>
                <p className="text-sm text-white/60 font-medium leading-relaxed mb-5">
                  Gender-Based Violence affects millions of South Africans. You are not alone. Report abuse, access shelters, and connect with legal support. GBV Helpline: <span className="text-violet-300 font-black">0800 428 428</span>
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {["24/7 Helpline", "Legal Aid", "Shelters"].map(t => (
                    <span key={t} className="px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 text-[10px] font-black uppercase">{t}</span>
                  ))}
                </div>
                <a href="tel:0800428428" className="text-[11px] font-black text-violet-400 uppercase tracking-widest hover:underline flex items-center gap-1">
                  Call 0800 428 428 <ChevronRight size={12} />
                </a>
              </div>
            </div>

            {/* Mental Health */}
            <div className="relative rounded-[28px] bg-gradient-to-br from-blue-950/80 to-sky-900/40 border border-sky-800/40 p-7 overflow-hidden group hover:border-sky-600/60 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-600/10 rounded-full -translate-y-8 translate-x-8" />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/20 flex items-center justify-center mb-5">
                  <Globe size={24} className="text-sky-400" />
                </div>
                <span className="text-[9px] font-black text-sky-400 uppercase tracking-widest mb-2 block">Youth Wellbeing</span>
                <h3 className="text-xl font-black text-white mb-3">Mental Health Matters</h3>
                <p className="text-sm text-white/60 font-medium leading-relaxed mb-5">
                  1 in 6 South Africans suffer from depression or anxiety. Free counselling is available at public health facilities. SADAG helpline: <span className="text-sky-300 font-black">0800 567 567</span>
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {["Free Counselling", "Youth Focus", "24/7 Support"].map(t => (
                    <span key={t} className="px-3 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300 text-[10px] font-black uppercase">{t}</span>
                  ))}
                </div>
                <a href="tel:0800567567" className="text-[11px] font-black text-sky-400 uppercase tracking-widest hover:underline flex items-center gap-1">
                  Call SADAG 0800 567 567 <ChevronRight size={12} />
                </a>
              </div>
            </div>

            {/* National Events */}
            <div className="relative rounded-[28px] bg-gradient-to-br from-emerald-950/80 to-green-900/40 border border-emerald-800/40 p-7 overflow-hidden group hover:border-emerald-600/60 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/10 rounded-full -translate-y-8 translate-x-8" />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-5">
                  <Star size={24} className="text-emerald-400" />
                </div>
                <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest mb-2 block">National Calendar</span>
                <h3 className="text-xl font-black text-white mb-3">Key SA Dates 2026</h3>
                <div className="flex flex-col gap-3 mb-5">
                  {[
                    { date: "27 Apr", event: "Freedom Day — National Holiday" },
                    { date: "1 May",  event: "Workers' Day — Labour Rights" },
                    { date: "16 Jun", event: "Youth Day — Soweto Uprising" },
                    { date: "9 Aug",  event: "National Women's Day" },
                  ].map(({ date, event }) => (
                    <div key={date} className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-emerald-400 min-w-[48px]">{date}</span>
                      <span className="text-xs font-semibold text-white/70">{event}</span>
                    </div>
                  ))}
                </div>
                <Link href="/opportunities" className="text-[11px] font-black text-emerald-400 uppercase tracking-widest hover:underline flex items-center gap-1">
                  View All Events <ChevronRight size={12} />
                </Link>
              </div>
            </div>

            {/* Load Shedding & Utilities */}
            <div className="relative rounded-[28px] bg-gradient-to-br from-yellow-950/80 to-yellow-900/40 border border-yellow-800/40 p-7 overflow-hidden group hover:border-yellow-600/60 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-600/10 rounded-full -translate-y-8 translate-x-8" />
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 flex items-center justify-center mb-5">
                  <Lightbulb size={24} className="text-yellow-400" />
                </div>
                <span className="text-[9px] font-black text-yellow-400 uppercase tracking-widest mb-2 block">Utilities Alert</span>
                <h3 className="text-xl font-black text-white mb-3">Load Shedding & Water</h3>
                <p className="text-sm text-white/60 font-medium leading-relaxed mb-5">
                  Track load shedding schedules for your area, water outage notifications, and infrastructure updates directly from municipal authorities in real time.
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {["Eskom Schedule", "Water Outages", "Your Area"].map(t => (
                    <span key={t} className="px-3 py-1 rounded-full bg-yellow-500/15 border border-yellow-500/30 text-yellow-300 text-[10px] font-black uppercase">{t}</span>
                  ))}
                </div>
                <Link href="/services" className="text-[11px] font-black text-yellow-400 uppercase tracking-widest hover:underline flex items-center gap-1">
                  Check Status <ChevronRight size={12} />
                </Link>
              </div>
            </div>

          </div>

          {/* Emergency numbers strip */}
          <div className="rounded-[20px] bg-white/5 border border-white/10 p-6">
            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-5">Emergency Numbers — South Africa</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {[
                { label: "Police",         number: "10111",       color: "text-blue-400"    },
                { label: "Ambulance",      number: "10177",       color: "text-rose-400"    },
                { label: "Fire & Rescue",  number: "0800 111 990",color: "text-orange-400"  },
                { label: "GBV Helpline",   number: "0800 428 428",color: "text-violet-400"  },
                { label: "Childline SA",   number: "0800 055 555",color: "text-emerald-400" },
                { label: "SADAG Mental",   number: "0800 567 567",color: "text-sky-400"     },
              ].map(({ label, number, color }) => (
                <a key={label} href={`tel:${number.replace(/\s/g,"")}`} className="flex flex-col gap-1 group">
                  <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">{label}</span>
                  <span className={`text-lg font-black ${color} group-hover:underline`}>{number}</span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── PEOPLE OF SOUTH AFRICA ── */}
      <section className="bg-[#0E3B29] py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-3 block">Ubuntu — I am because we are</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">Built For Every South African</h2>
            <p className="text-white/60 font-semibold max-w-2xl mx-auto text-lg leading-relaxed">
              From the youth finding their first opportunity, to the elderly receiving the support they deserve — Sumbandila is here for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Youth card */}
            <div className="relative rounded-[32px] overflow-hidden group h-96 shadow-2xl">
              <img
                src="/sa-youth.png"
                alt="South African youth collaborating"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-7">
                <span className="inline-block mb-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-black uppercase tracking-widest">Youth First</span>
                <h3 className="text-xl font-black text-white mb-2 leading-tight">Young, Bold & Verified</h3>
                <p className="text-xs font-semibold text-white/60 mb-4 leading-relaxed">
                  Access skills, bursaries, and jobs — all in one verified, trusted platform designed for the next generation.
                </p>
                <a href="/opportunities" className="inline-flex items-center gap-1 text-emerald-400 text-[10px] font-black uppercase tracking-widest hover:underline">
                  Explore Opportunities →
                </a>
              </div>
            </div>

            {/* Elderly / food parcels card */}
            <div className="relative rounded-[32px] overflow-hidden group h-96 shadow-2xl">
              <img
                src="/elderly-food-parcels.png"
                alt="Elderly South Africans receiving food parcels"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-7">
                <span className="inline-block mb-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[10px] font-black uppercase tracking-widest">Batho Pele</span>
                <h3 className="text-xl font-black text-white mb-2 leading-tight">Caring for Our Elders</h3>
                <p className="text-xs font-semibold text-white/60 mb-4 leading-relaxed">
                  Connecting pensioners and vulnerable citizens to SASSA grants, food relief programmes, and community support.
                </p>
                <a href="/apply/sassa" className="inline-flex items-center gap-1 text-amber-400 text-[10px] font-black uppercase tracking-widest hover:underline">
                  Apply for SASSA →
                </a>
              </div>
            </div>

            {/* Diverse community card */}
            <div className="relative rounded-[32px] overflow-hidden group h-96 shadow-2xl">
              <img
                src="/diverse-community.png"
                alt="Diverse South Africans talking together"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-7">
                <span className="inline-block mb-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-400 text-[10px] font-black uppercase tracking-widest">One Nation</span>
                <h3 className="text-xl font-black text-white mb-2 leading-tight">United in Growth</h3>
                <p className="text-xs font-semibold text-white/60 mb-4 leading-relaxed">
                  A platform built on ubuntu — where every race, language, and community works together towards a stronger South Africa.
                </p>
                <a href="/membership" className="inline-flex items-center gap-1 text-blue-400 text-[10px] font-black uppercase tracking-widest hover:underline">
                  Join the Community →
                </a>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-12">
            {[
              { value: "1.2M+", label: "Youth Registered",    Icon: Users,       color: "text-emerald-400" },
              { value: "4,208", label: "Verified Institutions", Icon: ShieldCheck, color: "text-blue-400"    },
              { value: "11",    label: "Official Languages",   Icon: Globe,       color: "text-amber-400"   },
              { value: "9",     label: "Provinces Covered",    Icon: MapPin,      color: "text-rose-400"    },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center gap-3">
                <s.Icon size={28} className={s.color} />
                <span className="text-3xl font-black text-white tracking-tighter">{s.value}</span>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{s.label}</span>
              </div>
            ))}          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
