"use client";

import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import Link from "next/link";
import { Users, Star, ChevronRight, Globe, BookOpen, Award, ArrowRight, ShieldCheck } from "lucide-react";

const MENTORS = [
  {
    name: "Thandi Mokoena",
    role: "Civic Tech Leader",
    org: "Digital SA Initiative",
    area: "Entrepreneurship",
    color: "bg-blue-50 text-[#002395]",
  },
  {
    name: "Johan Pieterse",
    role: "Youth Policy Advisor",
    org: "Department of Youth Development",
    area: "Policy & Governance",
    color: "bg-green-50 text-[#007749]",
  },
  {
    name: "Naledi Dlamini",
    role: "AgriTech Founder",
    org: "Rural Growth Hub",
    area: "Agriculture & Innovation",
    color: "bg-amber-50 text-[#F59E0B]",
  },
  {
    name: "Dr. Sipho Khumalo",
    role: "STEM Educator",
    org: "National Science Foundation",
    area: "STEM & Research",
    color: "bg-red-50 text-[#E03C31]",
  },
];

const PROGRAMS = [
  {
    title: "Rising Leaders Fellowship",
    duration: "6 Months",
    seats: "200 available",
    description: "An intensive cohort programme pairing young leaders with senior public and private sector executives.",
    tags: ["Mentorship", "Executive Access", "Paid Stipend"],
    href: "/opportunities",
  },
  {
    title: "Civic Innovation Lab",
    duration: "3 Months",
    seats: "80 available",
    description: "Co-design solutions to real South African challenges alongside government agencies and NGOs.",
    tags: ["Problem-Solving", "Collaboration", "Impact"],
    href: "/opportunities",
  },
  {
    title: "National Oratory Challenge",
    duration: "Ongoing",
    seats: "Open Enrollment",
    description: "Build public speaking and advocacy skills through regional and national competitions.",
    tags: ["Communication", "Advocacy", "Prizes"],
    href: "/opportunities",
  },
];

export default function LeadershipPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col">
      <SiteNav />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-[#002395] text-white py-20 px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full" />
          <div className="max-w-6xl mx-auto relative z-10 text-center">
            <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
              Leadership & Mentorship Hub
            </span>
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
              Lead South Africa's <span className="text-[#FFB81C]">Future.</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium mb-10">
              Connect with mentors, join leadership programmes, and develop the skills to drive national change — for youth aged 18–35.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/opportunities" className="px-8 py-4 bg-[#FFB81C] text-slate-900 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-lg">
                Apply to a Programme
              </Link>
              <Link href="/membership" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all">
                Join the Community
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="bg-[#0E3B29] py-4">
          <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center md:justify-between gap-6 text-white font-black text-xs uppercase tracking-widest">
            <span className="flex items-center gap-2"><Users size={16} className="text-emerald-400" /> 14,000+ Youth Leaders</span>
            <span className="flex items-center gap-2"><Star size={16} className="text-[#FFB81C]" /> 320+ Active Mentors</span>
            <span className="flex items-center gap-2"><Globe size={16} className="text-blue-400" /> All 9 Provinces</span>
            <span className="flex items-center gap-2"><Award size={16} className="text-amber-400" /> 85% Placement Rate</span>
          </div>
        </section>

        {/* Featured Programmes */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[10px] font-black text-[#007749] uppercase tracking-[0.3em] mb-2 block">Active Programmes</span>
              <h2 className="text-3xl font-black text-slate-900">Open Enrolment Now</h2>
            </div>
            <Link href="/opportunities" className="text-sm font-black text-[#007749] hover:underline uppercase tracking-widest flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROGRAMS.map((prog, i) => (
              <div key={i} className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all p-8 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-black text-[#002395] uppercase tracking-widest">{prog.duration}</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">{prog.seats}</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{prog.title}</h3>
                <p className="text-sm font-medium text-slate-500 mb-6 flex-grow">{prog.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {prog.tags.map((t) => (
                    <span key={t} className="text-[10px] font-bold text-slate-400 border border-slate-100 px-2 py-1 rounded-md">{t}</span>
                  ))}
                </div>
                <Link href={prog.href} className="w-full py-3 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest text-center hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                  Apply Now <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Mentors */}
        <section className="bg-white py-20 border-y border-slate-100">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-[10px] font-black text-[#007749] uppercase tracking-[0.3em] mb-2 block">Expert Network</span>
              <h2 className="text-3xl font-black text-slate-900">Meet Your Mentors</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {MENTORS.map((m, i) => (
                <div key={i} className="bg-slate-50 rounded-3xl p-6 border border-slate-100 hover:shadow-md transition-all group">
                  <div className={`w-14 h-14 ${m.color} rounded-2xl flex items-center justify-center text-2xl font-black mb-4`}>
                    {m.name.charAt(0)}
                  </div>
                  <h4 className="font-black text-slate-900 mb-1">{m.name}</h4>
                  <p className="text-xs font-bold text-slate-500 mb-1">{m.role}</p>
                  <p className="text-xs font-semibold text-slate-400 mb-4">{m.org}</p>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#007749] bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                    {m.area}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="bg-[#0E3B29] rounded-[40px] p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#007749] via-[#FFB81C] to-[#E03C31]" />
            <ShieldCheck size={48} className="text-emerald-400 mx-auto mb-6" />
            <h2 className="text-4xl font-black mb-4">Ready to Lead?</h2>
            <p className="text-white/70 font-medium mb-8 max-w-lg mx-auto">
              Join thousands of young South Africans already building their leadership legacy through Sumbandila.
            </p>
            <Link href="/membership" className="inline-flex items-center gap-3 px-10 py-4 bg-[#FFB81C] text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-yellow-400 transition-all shadow-xl">
              Become a Member <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
