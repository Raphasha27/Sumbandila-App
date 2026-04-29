"use client";

import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import { Building2, Users, FileCheck, ShieldAlert, TrendingUp } from "lucide-react";

export default function NationalImpactPage() {
  const provinces = [
    { name: "Gauteng", value: "32%", color: "bg-[#007749]" },
    { name: "KwaZulu-Natal", value: "21%", color: "bg-[#FFB81C]" },
    { name: "Western Cape", value: "14%", color: "bg-[#E03C31]" },
    { name: "Eastern Cape", value: "11%", color: "bg-[#002395]" },
    { name: "Limpopo", value: "9%", color: "bg-[#007749]" },
    { name: "Mpumalanga", value: "6%", color: "bg-[#FFB81C]" },
    { name: "North West", value: "4%", color: "bg-[#E03C31]" },
    { name: "Free State", value: "2%", color: "bg-[#002395]" },
    { name: "Northern Cape", value: "1%", color: "bg-[#007749]" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col">
      <SiteNav />

      <main className="flex-grow">
        {/* Header */}
        <header className="bg-slate-900 text-white pt-16 pb-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0px, #fff 2px, transparent 2px, transparent 12px)", backgroundSize: "20px 20px" }} />
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-black mb-4">National Impact</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium">Real-time national insights on service delivery and trust verification.</p>
          </div>
        </header>

        {/* Stats Strip */}
        <section className="max-w-6xl mx-auto px-6 -mt-12 relative z-20 mb-16">
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="flex flex-col items-center md:items-start md:pl-4">
              <div className="w-12 h-12 bg-green-50 text-[#007749] rounded-xl flex items-center justify-center mb-4"><Building2 size={24} /></div>
              <span className="text-3xl font-black text-slate-900 mb-1">78,412</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Verified Institutions</span>
            </div>
            <div className="flex flex-col items-center md:items-start md:pl-8">
              <div className="w-12 h-12 bg-amber-50 text-[#F59E0B] rounded-xl flex items-center justify-center mb-4"><Users size={24} /></div>
              <span className="text-3xl font-black text-slate-900 mb-1">4.2M+</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Citizens</span>
            </div>
            <div className="flex flex-col items-center md:items-start md:pl-8">
              <div className="w-12 h-12 bg-blue-50 text-[#002395] rounded-xl flex items-center justify-center mb-4"><FileCheck size={24} /></div>
              <span className="text-3xl font-black text-slate-900 mb-1">742K</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Apps Processed</span>
            </div>
            <div className="flex flex-col items-center md:items-start md:pl-8">
              <div className="w-12 h-12 bg-red-50 text-[#E03C31] rounded-xl flex items-center justify-center mb-4"><ShieldAlert size={24} /></div>
              <span className="text-3xl font-black text-slate-900 mb-1">19.3K</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fraud Alerts</span>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 mb-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Heatmap/Provinces */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
              <TrendingUp className="text-[#007749]" size={28} />
              <div>
                <h3 className="text-2xl font-black text-slate-900">Provincial Activity</h3>
                <p className="text-sm font-semibold text-slate-500">Verification distribution across provinces</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {provinces.map((p) => (
                <div key={p.name} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center text-center group hover:border-[#007749] transition-colors">
                  <span className="text-2xl font-black text-slate-900 mb-2">{p.value}</span>
                  <div className={`w-8 h-1 rounded-full ${p.color} mb-3`} />
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{p.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Priorities */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col">
            <h3 className="text-xl font-black text-slate-900 mb-2">National Priorities</h3>
            <p className="text-sm font-semibold text-slate-500 mb-8">Key service areas currently monitored.</p>

            <div className="space-y-4 flex-grow">
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl border border-green-100">
                <span className="font-bold text-slate-700">Healthcare</span>
                <span className="text-xs px-2 py-1 bg-[#007749] text-white rounded font-bold uppercase tracking-widest">High</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl border border-green-100">
                <span className="font-bold text-slate-700">Education</span>
                <span className="text-xs px-2 py-1 bg-[#007749] text-white rounded font-bold uppercase tracking-widest">High</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-amber-50 rounded-xl border border-amber-100">
                <span className="font-bold text-slate-700">Grants</span>
                <span className="text-xs px-2 py-1 bg-[#F59E0B] text-white rounded font-bold uppercase tracking-widest">Medium</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-amber-50 rounded-xl border border-amber-100">
                <span className="font-bold text-slate-700">Housing</span>
                <span className="text-xs px-2 py-1 bg-[#F59E0B] text-white rounded font-bold uppercase tracking-widest">Medium</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
