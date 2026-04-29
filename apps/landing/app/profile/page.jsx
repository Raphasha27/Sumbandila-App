"use client";

import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import { Download, RefreshCw, User, ShieldCheck, MapPin, Hash } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col">
      <SiteNav />

      <main className="flex-grow max-w-5xl mx-auto px-6 py-14 w-full">
        <div className="mb-10">
          <h2 className="text-4xl font-black text-slate-900">My Profile</h2>
          <p className="text-slate-600 mt-2 font-medium text-lg">Your unified citizen identity and service access profile.</p>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
              <User size={32} />
            </div>
            <div>
              <h3 className="font-black text-2xl text-slate-900">Thabo Mokoena</h3>
              <span className="inline-flex items-center gap-1 mt-2 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest bg-green-50 text-[#007749] border border-green-200">
                <ShieldCheck size={12} /> Verified Citizen
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><User size={14} /> Full Name</span>
              <span className="font-black text-lg text-slate-900">Thabo Mokoena</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><MapPin size={14} /> Province</span>
              <span className="font-black text-lg text-slate-900">Gauteng</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Hash size={14} /> ID Number</span>
              <span className="font-black text-lg text-slate-900">920101 **** 08 2</span>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><ShieldCheck size={14} /> Verification Level</span>
              <span className="font-black text-lg text-slate-900">Level 3 (Biometric)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-100">
            <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 flex-1 shadow-md">
              <Download size={16} /> Download Proof of ID
            </button>
            <button className="bg-white border-2 border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:border-[#0E3B29] hover:text-[#0E3B29] transition-colors flex items-center justify-center gap-2 flex-1">
              <RefreshCw size={16} /> Update Documents
            </button>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
