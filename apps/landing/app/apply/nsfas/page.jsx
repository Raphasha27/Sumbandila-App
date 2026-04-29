"use client";

import SiteNav from "../../../components/SiteNav";
import SiteFooter from "../../../components/SiteFooter";
import Link from "next/link";
import { GraduationCap, CheckCircle2, ChevronRight, Clock, AlertCircle, ExternalLink, ArrowRight } from "lucide-react";

const STEPS = [
  { num: "01", title: "Check Eligibility", desc: "You must be a South African citizen enrolled or planning to enrol at a public HEI or TVET college." },
  { num: "02", title: "Create a myNSFAS Account", desc: "Register on the official myNSFAS portal at nsfas.org.za using your SA ID number." },
  { num: "03", title: "Complete the Application", desc: "Fill in your household income details and upload supporting documents (ID, proof of income, etc.)." },
  { num: "04", title: "Submit & Track", desc: "Submit your application and track its status on the myNSFAS portal or via the NSFAS WhatsApp line." },
];

export default function ApplyNSFASPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col">
      <SiteNav />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-[#007749] text-white py-16 px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/10 blur-[100px] rounded-full" />
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                <GraduationCap size={28} />
              </div>
              <div>
                <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">Financial Aid</p>
                <h1 className="text-4xl font-black tracking-tight">Apply for NSFAS</h1>
              </div>
            </div>
            <p className="text-xl text-white/80 font-medium max-w-2xl">
              The National Student Financial Aid Scheme funds qualifying South African students at public universities and TVET colleges.
            </p>
          </div>
        </section>

        {/* Alert Banner */}
        <div className="bg-[#FFB81C] py-3 px-6">
          <div className="max-w-4xl mx-auto flex items-center gap-3">
            <AlertCircle size={18} className="text-slate-900 shrink-0" />
            <p className="text-sm font-bold text-slate-900">
              Applications for the 2026 academic year are open. Deadline: <strong>30 November 2025</strong>.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Steps */}
          <div className="mb-16">
            <h2 className="text-2xl font-black text-slate-900 mb-8">How to Apply</h2>
            <div className="space-y-6">
              {STEPS.map((step) => (
                <div key={step.num} className="flex gap-6 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                  <div className="w-14 h-14 bg-emerald-50 text-[#007749] rounded-2xl flex items-center justify-center font-black text-lg shrink-0 border border-emerald-100">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 mb-1">{step.title}</h3>
                    <p className="text-sm font-medium text-slate-500">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Eligibility Requirements</h2>
            <div className="space-y-3">
              {[
                "South African citizen or permanent resident",
                "Combined household income below R350,000 per year",
                "Enrolled (or accepted) at a public university or TVET college",
                "Not in receipt of other full bursaries",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#007749] shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://www.nsfas.org.za/content/how-to-apply.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-5 bg-[#007749] hover:bg-[#0E3B29] text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg text-sm uppercase tracking-widest"
            >
              Apply on myNSFAS <ExternalLink size={16} />
            </a>
            <Link href="/verify" className="flex-1 py-5 bg-white border-2 border-slate-200 text-slate-800 font-black rounded-2xl flex items-center justify-center gap-3 hover:border-[#007749] transition-all text-sm uppercase tracking-widest">
              Verify Your Institution <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
