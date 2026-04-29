"use client";

import Link from "next/link";
import { ChevronLeft, ShieldAlert, Calendar, User, ArrowRight, AlertTriangle } from "lucide-react";

export default function NewsArticle() {
  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-200 pb-20">
      {/* Header */}
      <header className="pt-20 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-3 text-[#94A3B8] hover:text-white transition-colors mb-12 group">
            <ChevronLeft size={16} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[11px] font-black uppercase tracking-[0.1em]">Back to Portal</span>
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full text-[10px] font-black uppercase tracking-widest">
              Critical Warning
            </span>
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
              <Calendar size={14} /> 11 Jan 2026
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
              <User size={14} /> Sentinel Advisory Board
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1] mb-6">
            Red Alert: "Bogus" Universities Threaten South African Students
          </h1>

          <p className="text-lg text-slate-400 font-medium leading-relaxed">
            Predatory institutions continue to resurface, offering worthless degrees. Here is how to navigate the regulatory framework and verify your institution before paying.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6">
        <article className="glass p-8 md:p-12 rounded-[40px] border-white/10 space-y-8 text-slate-300 font-medium leading-relaxed">
          
          <p>
            As thousands of young South Africans secure university placements for the 2026 academic year, a severe warning has been issued by education experts regarding the rise of unregistered and "bogus" institutions.
          </p>

          <p>
            These predatory operations often rebrand and reappear despite nationwide crackdowns, leaving unsuspecting students with qualifications that hold no value with employers or the government. The Council on Higher Education (CHE) has reiterated the importance of vigilance during this critical enrollment period.
          </p>

          <div className="bg-amber-500/5 border border-amber-500/20 p-6 rounded-2xl">
            <div className="flex items-start gap-4">
              <AlertTriangle size={24} className="text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white font-black text-lg mb-2">Recent Crackdowns: Institutions Under Fire</h3>
                <p className="text-sm mb-3">
                  The government is enforcing strict compliance. In late 2025, a Notice of Intent to Cancel registration was issued for several well-known private institutions, including <strong>Damelin</strong>, <strong>City Varsity</strong>, and <strong>ICESA City Campus</strong>.
                </p>
                <p className="text-sm">
                  The cited reasons included a prolonged pattern of non-compliance, missing annual reports, financial instability, and significant operational failures. Students affected by these actions are being supported through administrative transitions.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight mt-10 mb-4">
            The Higher Education "Gold Standard"
          </h2>

          <p>
            To protect your educational investment, it is crucial to understand the South African regulatory framework. Any legitimate institution must align with these three pillars:
          </p>

          <ul className="space-y-4 my-6">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
              <span><strong>DHET:</strong> The Department of Higher Education and Training is the primary body where all private institutions must be legally registered.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
              <span><strong>CHE:</strong> The Council on Higher Education ensures every academic program meets rigorous national quality standards.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
              <span><strong>SAQA:</strong> The South African Qualifications Authority maintains the final database (NQF) where all valid, accredited qualifications are officially listed.</span>
            </li>
          </ul>

          <h2 className="text-2xl font-black text-white tracking-tight mt-10 mb-4">
            How to Verify Before You Pay
          </h2>

          <p>
            Before signing any contracts or paying registration fees, take the following steps:
          </p>
          
          <ul className="list-decimal pl-5 space-y-2 mb-6">
            <li><strong>Check the DHET Register:</strong> Ensure the private college is legally registered.</li>
            <li><strong>Verify via SAQA:</strong> Search for the specific qualification. If it is not on the National Qualifications Framework (NQF), it is invalid.</li>
            <li><strong>Beware of Red Flags:</strong> Treat "remote control" learning without a verified physical site or health and safety compliance as highly suspicious.</li>
          </ul>

          <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 mt-10">
            <h4 className="text-emerald-500 font-black uppercase tracking-widest text-sm mb-3">Instant Verification</h4>
            <p className="text-sm mb-6">
              Don't risk your future. Use the Sumbandila National Sentinel platform to instantly cross-reference institutional accreditation against official DHET and SAQA databases.
            </p>
            <Link href="/verify" className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-500/20">
              Launch Verification Engine <ArrowRight size={18} />
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
