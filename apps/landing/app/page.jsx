"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  ChevronRight, Search, MapPin, MonitorSmartphone, GraduationCap,
  Video, Users, Rocket, Palette, HeartHandshake, ShieldCheck, Bus,
  Check, Lock, Facebook, Twitter, Instagram, Youtube, Smile,
  HeartPulse, HandCoins, Activity, Globe, Sparkles, ArrowRight
} from "lucide-react";

import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";

export default function HomeLanding() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-emerald-500/30">
      
      <SiteNav />

      {/* Ndebele Pattern Divider */}
      <div className="w-full h-4 flex" style={{ 
        backgroundImage: "repeating-linear-gradient(45deg, #000 0px, #000 10px, #fff 10px, #fff 12px, #E03C31 12px, #E03C31 22px, #fff 22px, #fff 24px, #007749 24px, #007749 34px, #fff 34px, #fff 36px, #002395 36px, #002395 46px, #fff 46px, #fff 48px, #FFB81C 48px, #FFB81C 58px)",
        backgroundSize: "80px 100%"
      }} />

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-slate-100 min-h-[600px] flex items-center">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1577934421111-c918c57a9170?auto=format&fit=crop&q=80&w=2000"
            alt="Johannesburg Skyline" 
            fill 
            className="object-cover opacity-20"
            priority
          />
          {/* Fading gradient to blend the image */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/90 to-transparent w-full md:w-2/3" />
        </div>
        
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-20 flex flex-col lg:flex-row items-center justify-between gap-12 z-10 relative">
          
          {/* Left Text */}
          <div className="lg:w-5/12 flex flex-col items-start text-left">
            <h1 className="text-5xl md:text-[64px] font-black tracking-tighter leading-[1.05] mb-6 text-slate-900 relative">
              Empower the<br />youth.<br />
              <span className="text-[#007749]">Build</span><br />
              <span className="text-[#F59E0B]">Tomorrow.</span>
              {/* SA Flag Underline */}
              <div className="absolute -bottom-4 left-0 h-1.5 flex w-48">
                <div className="h-full bg-[#007749] w-1/4"></div>
                <div className="h-full bg-[#F59E0B] w-1/4"></div>
                <div className="h-full bg-[#E03C31] w-1/4"></div>
                <div className="h-full bg-[#002395] w-1/4"></div>
                <div className="h-full bg-black w-1/4"></div>
              </div>
            </h1>

            <p className="text-base md:text-lg text-slate-600 font-bold max-w-md leading-relaxed mb-10 mt-6">
              A national ecosystem connecting South African youth (18-35) with skills, tech infrastructure, webinars, and cross-sector collaborations to defeat unemployment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/opportunities" className="px-8 py-4 rounded-xl bg-[#007749] text-white font-bold tracking-widest text-xs uppercase hover:bg-[#0E3B29] transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-900/20">
                <Search size={18} /> EXPLORE OPPORTUNITIES
              </Link>
              <Link href="/membership" className="px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-800 font-bold tracking-widest text-xs uppercase hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-sm">
                <Users size={18} /> JOIN THE COMMUNITY
              </Link>
            </div>
          </div>

          {/* Right Grid of Services */}
          <div className="lg:w-7/12 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {/* Watermark Pattern */}
            <div className="absolute inset-0 z-[-1] opacity-[0.03] pointer-events-none" style={{ 
              backgroundImage: "repeating-linear-gradient(45deg, #000 0px, #000 20px, transparent 20px, transparent 40px)",
              backgroundSize: "60px 60px"
            }} />
            
            {/* Tech & Developers */}
            <Link href="/category/tech" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group flex flex-col">
              <div className="w-12 h-12 bg-blue-50 text-[#002395] rounded-xl flex items-center justify-center mb-4">
                <MonitorSmartphone size={24} />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1">Tech & Devs</h3>
              <p className="text-xs font-semibold text-slate-500 mb-4 flex-grow">Infrastructure, Coding, Hackathons</p>
              <div className="flex justify-end text-[#002395] group-hover:translate-x-1 transition-transform">
                <ChevronRight size={20} />
              </div>
            </Link>

            {/* Skills & TVET */}
            <Link href="/category/skills" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group flex flex-col">
              <div className="w-12 h-12 bg-green-50 text-[#007749] rounded-xl flex items-center justify-center mb-4">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1">Skills Dev</h3>
              <p className="text-xs font-semibold text-slate-500 mb-4 flex-grow">Learnerships, TVET, Upskilling</p>
              <div className="flex justify-end text-[#007749] group-hover:translate-x-1 transition-transform">
                <ChevronRight size={20} />
              </div>
            </Link>

            {/* Rural & Township */}
            <Link href="/category/rural" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group flex flex-col">
              <div className="w-12 h-12 bg-amber-50 text-[#F59E0B] rounded-xl flex items-center justify-center mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1">Townships</h3>
              <p className="text-xs font-semibold text-slate-500 mb-4 flex-grow">Rural Inclusion, Local Biz</p>
              <div className="flex justify-end text-[#F59E0B] group-hover:translate-x-1 transition-transform">
                <ChevronRight size={20} />
              </div>
            </Link>

            {/* Webinars & Collabs */}
            <Link href="/category/webinars" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group flex flex-col">
              <div className="w-12 h-12 bg-red-50 text-[#E03C31] rounded-xl flex items-center justify-center mb-4">
                <Video size={24} />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1">Webinars</h3>
              <p className="text-xs font-semibold text-slate-500 mb-4 flex-grow">Global Talks, Partnerships</p>
              <div className="flex justify-end text-[#E03C31] group-hover:translate-x-1 transition-transform">
                <ChevronRight size={20} />
              </div>
            </Link>

            {/* Entrepreneurship */}
            <Link href="/category/business" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group flex flex-col">
              <div className="w-12 h-12 bg-green-50 text-[#007749] rounded-xl flex items-center justify-center mb-4">
                <Rocket size={24} />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1">Founders</h3>
              <p className="text-xs font-semibold text-slate-500 mb-4 flex-grow">Startup Funding, Incubation</p>
              <div className="flex justify-end text-[#007749] group-hover:translate-x-1 transition-transform">
                <ChevronRight size={20} />
              </div>
            </Link>

            {/* Creative Economy */}
            <Link href="/category/creative" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group flex flex-col">
              <div className="w-12 h-12 bg-amber-50 text-[#F59E0B] rounded-xl flex items-center justify-center mb-4">
                <Palette size={24} />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1">Creatives</h3>
              <p className="text-xs font-semibold text-slate-500 mb-4 flex-grow">Arts, Media, Entertainment</p>
              <div className="flex justify-end text-[#F59E0B] group-hover:translate-x-1 transition-transform">
                <ChevronRight size={20} />
              </div>
            </Link>

            {/* Leadership */}
            <Link href="/leadership" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group flex flex-col">
              <div className="w-12 h-12 bg-blue-50 text-[#002395] rounded-xl flex items-center justify-center mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1">Leadership</h3>
              <p className="text-xs font-semibold text-slate-500 mb-4 flex-grow">Mentorship, Future Paving</p>
              <div className="flex justify-end text-[#002395] group-hover:translate-x-1 transition-transform">
                <ChevronRight size={20} />
              </div>
            </Link>

            {/* Social Impact */}
            <Link href="/category/social" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group flex flex-col">
              <div className="w-12 h-12 bg-red-50 text-[#E03C31] rounded-xl flex items-center justify-center mb-4">
                <HeartHandshake size={24} />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1">Social Dev</h3>
              <p className="text-xs font-semibold text-slate-500 mb-4 flex-grow">Community Growth, NGO</p>
              <div className="flex justify-end text-[#E03C31] group-hover:translate-x-1 transition-transform">
                <ChevronRight size={20} />
              </div>
            </Link>

            {/* Transport */}
            <Link href="/category/transport" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group flex flex-col">
              <div className="w-12 h-12 bg-green-50 text-[#007749] rounded-xl flex items-center justify-center mb-4">
                <Bus size={24} />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1">Transport</h3>
              <p className="text-xs font-semibold text-slate-500 mb-4 flex-grow">Licenses, Permits, Transport Services</p>
              <div className="flex justify-end text-[#007749] group-hover:translate-x-1 transition-transform">
                <ChevronRight size={20} />
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* National Verification Pillars */}
      <section className="w-full bg-[#F8FAFC] py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="max-w-2xl">
              <span className="text-[10px] font-black text-[#007749] uppercase tracking-[0.3em] mb-4 block">National Infrastructure</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">The Three Pillars of <span className="text-[#007749]">Digital Integrity.</span></h2>
            </div>
            <p className="text-slate-500 font-bold max-w-sm">
              Sumbandila aggregates data from South Africa's primary regulatory bodies to ensure your safety and trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Education Pillar */}
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 group hover:shadow-xl hover:-translate-y-2 transition-all">
              <div className="w-16 h-16 bg-blue-50 text-[#002395] rounded-2xl flex items-center justify-center mb-8 border border-blue-100">
                <GraduationCap size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Education</h3>
              <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                Verify Private Higher Education Institutions (PHEIs) and TVET colleges. Check SAQA ID and NQF levels.
              </p>
              <div className="flex flex-col gap-3 pt-6 border-t border-slate-50">
                <div className="flex items-center gap-3 text-xs font-black text-slate-400 uppercase tracking-widest">
                   <ShieldCheck size={16} className="text-[#007749]" /> Authority: DHET / CHE
                </div>
                <div className="flex items-center gap-3 text-xs font-black text-slate-400 uppercase tracking-widest">
                   <Check size={16} className="text-[#007749]" /> SAQA Accredited
                </div>
              </div>
            </div>

            {/* Healthcare Pillar */}
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 group hover:shadow-xl hover:-translate-y-2 transition-all">
              <div className="w-16 h-16 bg-red-50 text-[#E03C31] rounded-2xl flex items-center justify-center mb-8 border border-red-100">
                <HeartPulse size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Healthcare</h3>
              <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                Verify GP and Specialist registrations. Check professional standing and hospital affiliation status.
              </p>
              <div className="flex flex-col gap-3 pt-6 border-t border-slate-50">
                <div className="flex items-center gap-3 text-xs font-black text-slate-400 uppercase tracking-widest">
                   <ShieldCheck size={16} className="text-[#E03C31]" /> Authority: HPCSA
                </div>
                <div className="flex items-center gap-3 text-xs font-black text-slate-400 uppercase tracking-widest">
                   <Check size={16} className="text-[#E03C31]" /> Licensed Practice
                </div>
              </div>
            </div>

            {/* Legal Pillar */}
            <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 group hover:shadow-xl hover:-translate-y-2 transition-all">
              <div className="w-16 h-16 bg-amber-50 text-[#F59E0B] rounded-2xl flex items-center justify-center mb-8 border border-amber-100">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">Legal Services</h3>
              <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                Verify Attorney and Advocate standing. Check Fidelity Fund Certificates (FFC) and LPC numbers.
              </p>
              <div className="flex flex-col gap-3 pt-6 border-t border-slate-50">
                <div className="flex items-center gap-3 text-xs font-black text-slate-400 uppercase tracking-widest">
                   <ShieldCheck size={16} className="text-[#F59E0B]" /> Authority: LPC
                </div>
                <div className="flex items-center gap-3 text-xs font-black text-slate-400 uppercase tracking-widest">
                   <Check size={16} className="text-[#F59E0B]" /> FFC Compliant
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Registry Pulse Ticker */}
      <div className="w-full bg-slate-900 border-y border-white/5 py-3 overflow-hidden whitespace-nowrap flex items-center relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-900 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-900 to-transparent z-10" />
        
        <div className="flex animate-marquee gap-12 items-center">
          {[
            { name: "University of Johannesburg", status: "VERIFIED", time: "Just now" },
            { name: "HPCSA: Dr. M. Sibeko", status: "ACTIVE", time: "1m ago" },
            { name: "LPC: Adv. R. Pillay", status: "SECURE", time: "4m ago" },
            { name: "Damelin", status: "CANCELLED", time: "12m ago" },
            { name: "City Varsity", status: "CANCELLED", time: "15m ago" },
            { name: "Rhodes University", status: "VERIFIED", time: "22m ago" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Audit:</span>
              <span className="text-xs font-bold text-white/90">{item.name}</span>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded ${item.status === 'CANCELLED' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                {item.status}
              </span>
              <span className="text-[9px] font-bold text-white/20">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dark Green Stats Banner */}
      <section className="w-full bg-[#0E3B29] py-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/5 blur-[80px] rounded-full" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
          
          <div className="flex flex-col items-center md:items-start gap-2 pt-6 md:pt-0">
            <div className="flex items-center gap-3">
               <Users size={24} className="text-emerald-400" />
               <span className="text-3xl font-black text-white tracking-tighter">1.8M+</span>
            </div>
            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-9">Active Citizens</span>
          </div>

          <div className="flex flex-col items-center md:items-start gap-2 pt-8 md:pt-0 md:pl-12">
            <div className="flex items-center gap-3">
               <ShieldCheck size={24} className="text-emerald-400" />
               <span className="text-3xl font-black text-white tracking-tighter">98.2%</span>
            </div>
            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-9">Trust Rating</span>
          </div>

          <div className="flex flex-col items-center md:items-start gap-2 pt-8 md:pt-0 md:pl-12">
            <div className="flex items-center gap-3">
               <Activity size={24} className="text-emerald-400" />
               <span className="text-3xl font-black text-white tracking-tighter">Real-Time</span>
            </div>
            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-9">Registry Sync</span>
          </div>

          <div className="flex flex-col items-center md:items-start gap-2 pt-8 md:pt-0 md:pl-12">
            <div className="flex items-center gap-3">
               <Globe size={24} className="text-emerald-400" />
               <span className="text-3xl font-black text-white tracking-tighter">National</span>
            </div>
            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-9">Coverage</span>
          </div>

        </div>
      </section>

      {/* Sipho AI Section */}
      <section className="w-full bg-white py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-50/50 blur-[100px] rounded-full z-0" />
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-100">
                AI Powered Compliance
              </span>
              <h2 className="text-5xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
                Meet Sipho.<br />Your National <span className="text-[#007749]">Guide.</span>
              </h2>
              <p className="text-lg text-slate-600 font-medium mb-10 leading-relaxed max-w-lg">
                Sipho AI simplifies complex government processes, provides instant accreditation checks, and guides you through opportunities in any official South African language.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center shrink-0 border border-slate-100"><Sparkles size={20} className="text-[#F59E0B]" /></div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm">Language Agnostic</h4>
                    <p className="text-xs text-slate-500 font-bold">Ask questions in isiZulu, Sepedi, Afrikaans or English.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center shrink-0 border border-slate-100"><ShieldCheck size={20} className="text-[#007749]" /></div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm">Regulatory Proof</h4>
                    <p className="text-xs text-slate-500 font-bold">Direct cross-referencing with DHET and SAQA databases.</p>
                  </div>
                </div>
              </div>
              
              <Link href="/sipho-ai" className="mt-12 inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 group">
                Talk to Sipho <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
          <div className="relative lg:block hidden">
            <div className="bg-slate-900 rounded-[40px] p-8 shadow-2xl relative overflow-hidden border border-white/5">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#007749] via-[#FFB81C] to-[#E03C31]" />
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                  <Sparkles size={24} className="text-[#FFB81C]" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Sipho AI</h3>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Always Active</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10 max-w-[85%]">
                  <p className="text-sm text-white/80 font-medium">Sawubona! How can I help you verify your institution today?</p>
                </div>
                <div className="bg-[#007749] p-4 rounded-2xl rounded-tr-none border border-emerald-400/20 max-w-[85%] ml-auto">
                  <p className="text-sm text-white font-medium">Is Damelin still a registered college?</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10 max-w-[85%]">
                  <p className="text-sm text-white/80 font-medium">⚠️ Registration Alert: Damelin (and subsidiaries) registration was cancelled by DHET. Use caution.</p>
                </div>
              </div>
            </div>
            {/* Floating badges */}
            <div className="absolute -bottom-10 -right-10 bg-[#FFB81C] p-6 rounded-3xl shadow-xl transform rotate-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white"><Activity size={20} /></div>
                <div>
                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Trust Index</p>
                  <p className="text-2xl font-black text-slate-900">99.4%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Content Area */}
      <section className="w-full bg-[#F8FAFC] py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Popular Services Card */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col">
            <div className="flex justify-between items-end mb-6">
              <h3 className="text-xl font-black text-slate-900">Popular Services</h3>
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

          {/* Stay Informed Card */}
          <div className="bg-[#FEF3C7] rounded-3xl p-8 shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="z-10 relative">
              <h3 className="text-2xl font-black text-slate-900 mb-3">Stay Informed</h3>
              <p className="text-sm font-semibold text-slate-700 max-w-[200px] mb-8">
                Get updates on opportunities, deadlines and important announcements.
              </p>
              <Link href="/membership" className="px-6 py-3 rounded-xl bg-[#007749] text-white font-bold tracking-widest text-xs uppercase hover:bg-[#0E3B29] transition-all shadow-md inline-block text-center">
                SUBSCRIBE FOR UPDATES
              </Link>
            </div>
            {/* Waving Flag Graphic Placeholder */}
            <div className="absolute right-[-20px] bottom-10 opacity-90 z-0">
               {/* Decorative SA Flag vector shape */}
               <svg width="180" height="120" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-12">
                <path d="M0 0H100V60H0V0Z" fill="#E03C31"/>
                <path d="M0 30L30 30L100 30" stroke="white" strokeWidth="12"/>
                <path d="M0 60L50 30L100 0" stroke="white" strokeWidth="12"/>
                <path d="M0 0L50 30L100 60" stroke="white" strokeWidth="12"/>
                <path d="M0 60L50 30L100 0" stroke="#007749" strokeWidth="8"/>
                <path d="M0 0L50 30L100 60" stroke="#007749" strokeWidth="8"/>
                <path d="M0 30L30 30L100 30" stroke="#007749" strokeWidth="8"/>
                <path d="M0 0V60L40 30L0 0Z" fill="black"/>
                <path d="M0 5V55L33 30L0 5Z" fill="#FFB81C"/>
              </svg>
            </div>
          </div>

          {/* Batho Pele in Action Card */}
          <div className="bg-[#0E3B29] rounded-3xl p-8 shadow-sm flex flex-col justify-between relative overflow-hidden text-white">
            <div className="z-10 relative">
              <h3 className="text-2xl font-black mb-3">Batho Pele in Action</h3>
              <p className="text-sm font-semibold text-white/80 max-w-[200px] mb-8">
                Putting people first by delivering services with care, respect and integrity.
              </p>
              <Link href="/about" className="inline-block px-6 py-3 rounded-xl bg-transparent border-2 border-white/30 text-white font-bold tracking-widest text-xs uppercase hover:bg-white hover:text-[#0E3B29] transition-all">
                LEARN MORE
              </Link>
            </div>
            {/* Outline illustration of people */}
            <div className="absolute right-[-10px] bottom-0 opacity-40 z-0">
               <Users size={180} strokeWidth={0.5} className="text-white" />
            </div>
          </div>

        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
