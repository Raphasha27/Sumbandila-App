"use client";

import Link from "next/link";
import { ChevronRight, ShieldCheck, HeartPulse, GraduationCap, Scale, Briefcase, Home, Landmark, Building2, Car } from "lucide-react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import Image from "next/image";

export default function SolutionsPage() {
  const solutions = [
    { id: "healthcare", title: "Healthcare Verification", desc: "Verify clinics, doctors, and health programs.", icon: HeartPulse, color: "text-[#E03C31]", bg: "bg-red-50" },
    { id: "education", title: "Education Opportunities", desc: "NSFAS, Bursaries, and TVET Colleges.", icon: GraduationCap, color: "text-[#007749]", bg: "bg-green-50" },
    { id: "legal", title: "Legal Aid Access", desc: "Find legal support and know your rights.", icon: Scale, color: "text-[#F59E0B]", bg: "bg-amber-50" },
    { id: "gov", title: "Government Services", desc: "Home Affairs, SARS, and licensing.", icon: Landmark, color: "text-[#002395]", bg: "bg-blue-50" },
    { id: "jobs", title: "Jobs & Skills", desc: "Learnerships, EPWP, and training.", icon: Briefcase, color: "text-[#007749]", bg: "bg-green-50" },
    { id: "housing", title: "Housing & Municipal", desc: "RDP housing, municipal faults, support.", icon: Home, color: "text-[#E03C31]", bg: "bg-red-50" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col">
      <SiteNav />

      <main className="flex-grow">
        {/* Header */}
        <header className="bg-[#0E3B29] text-white pt-16 pb-20 px-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 flex" style={{ backgroundImage: "repeating-linear-gradient(45deg, #FFB81C 0px, #FFB81C 5px, #007749 5px, #007749 10px, #E03C31 10px, #E03C31 15px, #002395 15px, #002395 20px)" }} />
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-black mb-4">Sumbandila Solutions</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium">Explore everything the national sentinel platform has to offer for South African citizens.</p>
          </div>
        </header>

        {/* Grid */}
        <section className="max-w-6xl mx-auto px-6 py-12 -mt-10 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {solutions.map((sol) => (
              <Link key={sol.id} href={`/category/${sol.id}`} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg transition-all group">
                <div className={`w-14 h-14 ${sol.bg} ${sol.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <sol.icon size={28} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">{sol.title}</h3>
                <p className="text-sm font-semibold text-slate-500 mb-6">{sol.desc}</p>
                <div className="flex items-center text-sm font-bold text-slate-400 group-hover:text-[#007749] transition-colors uppercase tracking-wider">
                  Explore <ChevronRight size={16} className="ml-1" />
                </div>
              </Link>
            ))}
          </div>

          {/* Trusted Partners */}
          <div className="text-center bg-white p-12 rounded-3xl border border-slate-100">
            <h3 className="text-lg font-black text-slate-400 uppercase tracking-widest mb-8">Trusted by South African Institutions</h3>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale">
              <div className="flex items-center gap-2 font-black text-2xl"><Building2 /> Home Affairs</div>
              <div className="flex items-center gap-2 font-black text-2xl"><ShieldCheck /> SAPS</div>
              <div className="flex items-center gap-2 font-black text-2xl"><HeartPulse /> Dept of Health</div>
              <div className="flex items-center gap-2 font-black text-2xl"><GraduationCap /> DHET</div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
