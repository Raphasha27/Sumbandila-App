"use client";

import Link from "next/link";
import { ChevronLeft, Search, ChevronRight, GraduationCap, HeartPulse, Scale, Briefcase, HandCoins, Store, Home, Bus } from "lucide-react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";

export default function ServicesPage() {
  const categories = [
    { id: "education", title: "Education", desc: "NSFAS, Bursaries, Colleges", icon: GraduationCap, color: "text-[#007749]", bg: "bg-green-50" },
    { id: "healthcare", title: "Healthcare", desc: "Clinics, Hospitals", icon: HeartPulse, color: "text-[#E03C31]", bg: "bg-red-50" },
    { id: "legal", title: "Legal Aid", desc: "Legal Support, Rights", icon: Scale, color: "text-[#F59E0B]", bg: "bg-amber-50" },
    { id: "jobs", title: "Jobs & Skills", desc: "Jobs, Learnerships", icon: Briefcase, color: "text-[#002395]", bg: "bg-blue-50" },
    { id: "grants", title: "Grants & Relief", desc: "SASSA, Financial Support", icon: HandCoins, color: "text-[#007749]", bg: "bg-green-50" },
    { id: "business", title: "Business Support", desc: "Register, Funding", icon: Store, color: "text-[#002395]", bg: "bg-blue-50" },
    { id: "housing", title: "Housing", desc: "Housing Support, Applications", icon: Home, color: "text-[#F59E0B]", bg: "bg-amber-50" },
    { id: "transport", title: "Transport", desc: "Licenses, Permits", icon: Bus, color: "text-[#007749]", bg: "bg-green-50" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-emerald-500/30 flex flex-col">
      <SiteNav />

      <main className="flex-grow">
        {/* Header */}
        <header className="bg-[#0E3B29] text-white pt-12 pb-16 px-6 relative overflow-hidden">
          {/* Ndebele Pattern Top */}
          <div className="absolute top-0 left-0 w-full h-2 flex" style={{ 
            backgroundImage: "repeating-linear-gradient(45deg, #FFB81C 0px, #FFB81C 5px, #007749 5px, #007749 10px, #E03C31 10px, #E03C31 15px, #002395 15px, #002395 20px)",
          }} />

          <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-1/2">
              <Link href="/" className="inline-flex items-center gap-3 text-white/70 hover:text-white transition-colors mb-8 group">
                <ChevronLeft size={16} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-[11px] font-black uppercase tracking-[0.1em]">Back to Home</span>
              </Link>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1] mb-4">
                Find Services
              </h1>
              <p className="text-white/80 font-semibold text-lg max-w-xl">
                Browse our directory of government services, opportunities, and community support programs.
              </p>
            </div>
            
            <div className="w-full md:w-1/2 flex justify-end">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search for any service..." 
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-slate-900 border-none shadow-lg focus:ring-2 focus:ring-[#007749] outline-none font-medium"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Categories Grid */}
        <section className="max-w-6xl mx-auto px-6 py-12 -mt-8 relative z-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/category/${cat.id}`} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group flex flex-col">
                <div className={`w-12 h-12 ${cat.bg} ${cat.color} rounded-xl flex items-center justify-center mb-4`}>
                  <cat.icon size={24} />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-1">{cat.title}</h3>
                <p className="text-xs font-semibold text-slate-500 mb-4 flex-grow">{cat.desc}</p>
                <div className={`flex justify-end ${cat.color} group-hover:translate-x-1 transition-transform`}>
                  <ChevronRight size={20} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
