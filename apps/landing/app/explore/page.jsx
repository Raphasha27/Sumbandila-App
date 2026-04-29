"use client";

import { Search, MapPin, CheckCircle2, ChevronRight } from "lucide-react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";

const services = [
  { name: "Chris Hani Baragwanath Hospital", location: "Soweto, Gauteng", verified: true },
  { name: "Legal Aid SA", location: "Johannesburg, Gauteng", verified: true },
  { name: "SASSA Office", location: "Polokwane, Limpopo", verified: true },
  { name: "Home Affairs", location: "Pretoria, Gauteng", verified: true },
];

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col">
      <SiteNav />

      <main className="flex-grow max-w-7xl mx-auto px-6 py-14 w-full">
        <div>
          <h2 className="text-4xl font-black text-slate-900">Explore Services</h2>
          <p className="text-slate-600 mt-2 font-medium text-lg">Search verified services near you.</p>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mt-8 flex flex-col md:flex-row gap-4">
          <div className="relative w-full flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              className="w-full border-none bg-slate-50 px-12 py-4 rounded-xl focus:ring-2 focus:ring-[#007749] outline-none font-medium"
              placeholder="Search clinics, grants, IDs, jobs..."
            />
          </div>
          <select className="bg-slate-50 border-none px-4 py-4 rounded-xl w-full md:w-64 font-medium text-slate-700 outline-none focus:ring-2 focus:ring-[#007749]">
            <option>Select Province</option>
            <option>Gauteng</option>
            <option>KwaZulu-Natal</option>
            <option>Western Cape</option>
            <option>Limpopo</option>
          </select>
          <button className="bg-[#0E3B29] text-white px-8 py-4 rounded-xl hover:bg-emerald-900 font-bold tracking-widest text-xs uppercase shadow-md transition-colors whitespace-nowrap">
            Search
          </button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4">
          {services.map((s) => (
            <div
              key={s.name}
              className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="mb-4 sm:mb-0">
                <h3 className="text-xl font-black text-slate-900">{s.name}</h3>
                <div className="flex items-center gap-2 mt-2 text-slate-500 font-medium">
                  <MapPin size={16} /> {s.location}
                </div>
              </div>

              <div className="flex items-center gap-4">
                {s.verified && (
                  <span className="text-xs px-3 py-1.5 rounded-full bg-green-50 text-[#007749] font-bold border border-green-200 flex items-center gap-1 uppercase tracking-widest">
                    <CheckCircle2 size={14} /> Verified
                  </span>
                )}
                <button className="bg-white border-2 border-slate-200 text-slate-900 px-6 py-2 rounded-xl font-bold text-sm hover:border-[#007749] hover:text-[#007749] transition-colors group-hover:shadow-sm">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
