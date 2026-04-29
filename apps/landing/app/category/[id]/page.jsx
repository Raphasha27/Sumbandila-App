"use client";

import { use } from "react";
import Link from "next/link";
import { ChevronLeft, Search, ChevronRight, FileText, Globe } from "lucide-react";
import SiteNav from "../../../components/SiteNav";
import SiteFooter from "../../../components/SiteFooter";

export default function CategoryPage({ params }) {
  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const id = unwrappedParams?.id || "category";
  
  // Format the ID to a title
  const title = id.charAt(0).toUpperCase() + id.slice(1).replace("-", " ");

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
              <Link href="/services" className="inline-flex items-center gap-3 text-white/70 hover:text-white transition-colors mb-8 group">
                <ChevronLeft size={16} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-[11px] font-black uppercase tracking-[0.1em]">Back to Services</span>
              </Link>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1] mb-4">
                {title} Services
              </h1>
              <p className="text-white/80 font-semibold text-lg max-w-xl">
                Find official government applications, forms, and tools related to {title.toLowerCase()}.
              </p>
            </div>
          </div>
        </header>

        {/* Dummy Service Items */}
        <section className="max-w-6xl mx-auto px-6 py-12 -mt-8 relative z-20">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col gap-4">
            
            <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-colors group border border-slate-100 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-black text-slate-900">General Application Form</span>
                  <span className="text-sm font-medium text-slate-500">Apply online or download the PDF form.</span>
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-400 group-hover:text-[#007749] transition-colors" />
            </div>

            <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-colors group border border-slate-100 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
                  <Globe size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-black text-slate-900">National {title} Portal</span>
                  <span className="text-sm font-medium text-slate-500">Access the central management portal.</span>
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-400 group-hover:text-[#007749] transition-colors" />
            </div>

          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
