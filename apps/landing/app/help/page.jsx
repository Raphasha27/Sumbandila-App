"use client";

import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import { BookOpen, ShieldAlert, PhoneCall, HelpCircle } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col">
      <SiteNav />

      <main className="flex-grow max-w-5xl mx-auto px-6 py-14 w-full">
        <div className="mb-10 text-center">
          <div className="w-16 h-16 bg-[#007749]/10 text-[#007749] rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <HelpCircle size={32} />
          </div>
          <h2 className="text-4xl font-black text-slate-900">Help & Support</h2>
          <p className="text-slate-600 mt-4 font-medium text-lg max-w-2xl mx-auto">Get assistance, report fraud, or contact support through official channels.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm flex flex-col items-start group hover:border-[#007749] hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-blue-50 text-[#002395] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <BookOpen size={24} />
            </div>
            <h3 className="font-black text-xl text-slate-900 mb-2">Help Centre</h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 flex-grow">
              Find answers to common questions, step-by-step service guides, and application requirements.
            </p>
            <button className="bg-[#0E3B29] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-emerald-900 transition-colors shadow-md w-full sm:w-auto">
              Open Help Centre
            </button>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm flex flex-col items-start group hover:border-[#E03C31] hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-red-50 text-[#E03C31] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldAlert size={24} />
            </div>
            <h3 className="font-black text-xl text-slate-900 mb-2">Report a Scam</h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 flex-grow">
              Help protect communities by anonymously reporting suspicious institutions, bogus colleges, or corruption.
            </p>
            <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-md w-full sm:w-auto">
              Report Now
            </button>
          </div>
          
          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm flex flex-col items-start md:col-span-2 mt-4">
            <div className="flex items-center gap-4 mb-4 w-full">
              <div className="w-12 h-12 bg-amber-50 text-[#F59E0B] rounded-xl flex items-center justify-center shrink-0">
                <PhoneCall size={24} />
              </div>
              <div>
                <h3 className="font-black text-xl text-slate-900">National Hotlines</h3>
                <p className="text-slate-500 text-sm font-medium">Toll-free numbers for immediate assistance</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full mt-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Anti-Corruption</span>
                <span className="font-bold text-lg text-slate-900">0800 701 701</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Presidential Hotline</span>
                <span className="font-bold text-lg text-slate-900">17737</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">GBV Command Centre</span>
                <span className="font-bold text-lg text-slate-900">0800 428 428</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
