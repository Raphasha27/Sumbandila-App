"use client";

import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import { Search, MapPin, Filter, Briefcase, GraduationCap, Building2, Clock, ChevronRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function OpportunitiesPage() {
  const [search, setSearch] = useState("");

  const opportunities = [
    {
      id: 1,
      title: "Junior Full-Stack Developer",
      company: "Sumbandila Tech Hub",
      type: "Internship",
      location: "Gauteng / Remote",
      stipend: "R8,500 pm",
      tags: ["React", "Node.js", "Python"],
      deadline: "15 Oct 2026",
      category: "Tech"
    },
    {
      id: 2,
      title: "Youth Skills Training: Digital Marketing",
      company: "Department of Communications",
      type: "Learnership",
      location: "Western Cape",
      stipend: "R5,000 pm",
      tags: ["Social Media", "SEO", "Content"],
      deadline: "20 Oct 2026",
      category: "Skills"
    },
    {
      id: 3,
      title: "Agriculture Innovation Lead",
      company: "Rural Dev Agency",
      type: "Full-Time",
      location: "Limpopo",
      stipend: "Competitive",
      tags: ["AgriTech", "Management"],
      deadline: "12 Oct 2026",
      category: "Growth"
    },
    {
      id: 4,
      title: "Cloud Infrastructure Support",
      company: "SITA South Africa",
      type: "Contract",
      location: "Pretoria",
      stipend: "R12,000 pm",
      tags: ["AWS", "Azure", "Linux"],
      deadline: "30 Oct 2026",
      category: "Tech"
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col">
      <SiteNav />

      <main className="flex-grow">
        {/* Banner Section */}
        <section className="bg-[#0E3B29] text-white py-16 px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full" />
          <div className="max-w-6xl mx-auto relative z-10">
            <h1 className="text-4xl md:text-5xl font-black mb-4">Opportunity Marketplace</h1>
            <p className="text-xl text-white/80 max-w-2xl font-medium">Verified jobs, learnerships, and programs tailored for South Africa's youth (18-35).</p>
          </div>
        </section>

        {/* Search & Filter Bar */}
        <section className="max-w-6xl mx-auto px-6 -mt-10 relative z-20 mb-12">
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-4 flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search jobs, skills, or companies..." 
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold outline-none ring-2 ring-transparent focus:ring-[#007749] transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors">
                <Filter size={16} /> Filters
              </button>
            </div>
          </div>
        </section>

        {/* Opportunities List */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Results */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">Active Opportunities ({opportunities.length})</h2>
              </div>
              
              <div className="space-y-4">
                {opportunities.map((opp) => (
                  <div key={opp.id} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer relative overflow-hidden">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 shrink-0">
                          {opp.category === "Tech" ? <Briefcase className="text-blue-600" /> : <GraduationCap className="text-emerald-600" />}
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-slate-900 mb-1 group-hover:text-[#007749] transition-colors">{opp.title}</h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 font-bold">
                            <span className="flex items-center gap-1"><Building2 size={14} /> {opp.company}</span>
                            <span className="flex items-center gap-1 text-[#007749]"><CheckCircle2 size={14} /> Verified</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-[10px] font-black uppercase tracking-widest border border-slate-200">
                          {opp.type}
                        </span>
                        <p className="mt-2 text-sm font-black text-slate-900">{opp.stipend}</p>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
                      <div className="flex flex-wrap gap-2">
                        {opp.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-bold text-slate-400 border border-slate-100 px-2 py-1 rounded-md">{tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                          <MapPin size={14} /> {opp.location}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                          <Clock size={14} /> Deadline: {opp.deadline}
                        </span>
                        <ChevronRight className="text-[#007749] opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Trending / Spotlight */}
            <div className="space-y-8">
              <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#007749] via-[#FFB81C] to-[#E03C31]" />
                <h3 className="text-xl font-black mb-4">Spotlight Program</h3>
                <p className="text-sm font-medium text-white/70 mb-6">The National Digital Skills Initiative is now accepting applications for the 2026 intake. 50,000 slots available nationwide.</p>
                <button className="w-full py-4 bg-[#007749] text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#0E3B29] transition-colors shadow-lg">
                  Learn More & Apply
                </button>
              </div>

              <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
                <h3 className="text-lg font-black text-slate-900 mb-6">Trending Sectors</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 cursor-pointer transition-colors">
                    <span className="text-sm font-bold text-slate-700">Software Development</span>
                    <span className="text-xs font-black text-[#007749] bg-green-50 px-2 py-1 rounded">High</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 cursor-pointer transition-colors">
                    <span className="text-sm font-bold text-slate-700">Agri-Processing</span>
                    <span className="text-xs font-black text-amber-600 bg-amber-50 px-2 py-1 rounded">Rising</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 cursor-pointer transition-colors">
                    <span className="text-sm font-bold text-slate-700">Renewable Energy</span>
                    <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-1 rounded">High</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
