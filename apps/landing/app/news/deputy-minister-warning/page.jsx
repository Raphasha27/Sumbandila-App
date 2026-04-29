"use client";

import Link from "next/link";
import { ChevronLeft, ShieldAlert, Calendar, User, ArrowRight, Building2, Scale } from "lucide-react";

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
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full text-[10px] font-black uppercase tracking-widest">
              Government Advisory
            </span>
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
              <Calendar size={14} /> 26 Jan 2026
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
              <User size={14} /> National Authority
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1] mb-6">
            Deputy Minister Appeals to Parents: Beware Bogus Colleges Exploiting Desperate Students
          </h1>

          <p className="text-lg text-slate-400 font-medium leading-relaxed">
            Unregistered private institutions are preying on the shortage of public university placements. The Department of Higher Education uncovers severe criminal ties to these fraudulent operations.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6">
        <article className="glass p-8 md:p-12 rounded-[40px] border-white/10 space-y-8 text-slate-300 font-medium leading-relaxed">
          
          <p>
            Due to significant space constraints in public universities and TVET colleges, many prospective students turn to private institutions to continue their education. Unfortunately, opportunistic "bogus" colleges are exploiting this desperation.
          </p>

          <p>
            Dr. Mimmy Gondwe, Deputy Minister of Higher Education and Training (DHET), has spearheaded multiple intergovernmental campaigns to expose these unregistered entities. These illegal colleges offer programs that fail to meet the mandatory standards set by the South African Qualifications Authority (SAQA), the Council on Higher Education (CHE), and the Quality Council for Trades & Occupations (QCTO).
          </p>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl my-8">
            <h3 className="text-white font-black text-lg mb-4 flex items-center gap-3">
              <Building2 className="text-blue-400" size={24} /> Official Advice for Parents and Learners
            </h3>
            <p className="mb-4">
              During a recent oversight visit, Dr. Gondwe emphasized that there are only about 146 legally registered private higher education institutions on the official DHET list. She shared crucial criteria to evaluate an institution:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 flex-shrink-0" />
                <span>Verify official <strong>registration and accreditation</strong> credentials.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 flex-shrink-0" />
                <span>Assess the quality of teaching facilities, such as libraries and lecture rooms.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 flex-shrink-0" />
                <span>Review the nature of any contractual agreements before signing.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 flex-shrink-0" />
                <span>Demand proof of the teaching staff's professional qualifications.</span>
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight mt-10 mb-4">
            A Front for Criminal Activity
          </h2>

          <p>
            While students are the primary victims, the state has identified a deeply concerning trend: these bogus colleges often operate as fronts for broader criminal syndicates.
          </p>

          <p>
            Working in tandem with the South African Police Service (SAPS) and the Department of Home Affairs, the DHET has uncovered that some of these fake institutions are involved in the flouting of immigration and labor laws, and even money laundering. 
          </p>

          <p>
            A recent example is the shutdown of the "Mhlabuhlangene School of African Medicine" in KwaZulu-Natal. The institution operated entirely without DHET registration, illegally charging students between R8,500 and R18,500 for fabricated diplomas and doctorates in "African Medicine" and "Healing Science."
          </p>

          <h2 className="text-2xl font-black text-white tracking-tight mt-10 mb-4 flex items-center gap-3">
            <Scale className="text-emerald-500" size={28} /> Legal Recourse and Refunds
          </h2>

          <p>
            For families who have already paid enrollment fees to these fraudulent operators, the department's powers for direct refunds are unfortunately limited. Dr. Gondwe strongly advises victims to approach the Small Claims Court or the Consumer Ombudsman to pursue their funds through official legal channels.
          </p>

          <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 mt-10">
            <h4 className="text-emerald-500 font-black uppercase tracking-widest text-sm mb-3">Verify Instantly</h4>
            <p className="text-sm mb-6">
              Do not leave your future to chance. Verify if your college is among the 146 officially registered private institutions directly through our central national registry.
            </p>
            <Link href="/verify" className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-500/20">
              Run Sentinel Registry Check <ArrowRight size={18} />
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
