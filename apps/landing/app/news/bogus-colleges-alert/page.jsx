"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ShieldAlert, Calendar, User, ArrowRight } from "lucide-react";

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
            <span className="px-3 py-1 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full text-[10px] font-black uppercase tracking-widest">
              Official Alert
            </span>
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
              <Calendar size={14} /> 12 Jan 2026
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
              <User size={14} /> Registry Sentinel Updates
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1] mb-6">
            Beware of Bogus Colleges As The 2026 Academic Year Nears
          </h1>

          <p className="text-lg text-slate-400 font-medium leading-relaxed">
            Protect your future. Ensure you verify higher education institutions before registering to avoid unrecognized credentials and fraudulent qualifications.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6">
        <article className="glass p-8 md:p-12 rounded-[40px] border-white/10 space-y-8 text-slate-300 font-medium leading-relaxed">
          
          <p>
            With the recent release of final matric results, thousands of learners across South Africa are actively seeking institutions of higher learning to shape their futures. However, the Department of Higher Education and Training (DHET) strongly advises students to exercise caution, as not all institutions operate legally or hold valid accreditation.
          </p>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <div className="flex items-start gap-4">
              <ShieldAlert size={24} className="text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-white font-black text-lg mb-2">The Danger of Unregistered Institutions</h3>
                <p className="text-sm">
                  Registering with a fraudulent or "bogus" college often results in students obtaining credentials that are entirely unrecognized by the DHET or the South African Qualifications Authority (SAQA). This renders the qualification useless for employment or further studies.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight mt-10 mb-4">
            How to Protect Yourself
          </h2>

          <p>
            The government has made significant strides in identifying and shutting down illegitimate colleges, but many are still under investigation. Particular attention is being placed on illegal online course providers and private entities falsely posing as nursing or medical colleges.
          </p>

          <ul className="space-y-4 my-6">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
              <span><strong>Verify Online:</strong> Always check the institution's registration status using the official national online registers before making any payments.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
              <span><strong>Assess Professionalism:</strong> Evaluate the college's physical or digital infrastructure. A lack of basic professional standards is an immediate red flag.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
              <span><strong>Request References:</strong> Ask the institution to connect you with verified alumni to gain a better understanding of the quality of their programs.</span>
            </li>
          </ul>

          <h2 className="text-2xl font-black text-white tracking-tight mt-10 mb-4">
            What to Do If You Fall Victim
          </h2>

          <p>
            If you suspect you have been scammed by a bogus institution, it is critical to report them to the DHET and open a case with the South African Police Service (SAPS). 
          </p>
          <p>
            For financial recourse, if the fees paid are under the threshold (approximately R20,000), you can approach the Small Claims Court for a refund. For larger amounts, it is advisable to seek legal counsel.
          </p>

          <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 mt-10">
            <h4 className="text-emerald-500 font-black uppercase tracking-widest text-sm mb-3">Take Action</h4>
            <p className="text-sm mb-6">
              Use the Sumbandila National Sentinel platform to instantly verify the accreditation status of any education, healthcare, or legal institution.
            </p>
            <Link href="/verify" className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl transition-colors">
              Verify an Institution Now <ArrowRight size={18} />
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
