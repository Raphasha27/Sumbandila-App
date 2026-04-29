"use client";

import SiteNav from "../../../components/SiteNav";
import SiteFooter from "../../../components/SiteFooter";
import Link from "next/link";
import { HandCoins, CheckCircle2, ChevronRight, AlertCircle, ExternalLink, Phone } from "lucide-react";

const GRANTS = [
  { name: "Older Persons Grant", amount: "R2,180/month", eligible: "Men 65+ / Women 60+ with no income" },
  { name: "Disability Grant", amount: "R2,180/month", eligible: "18–59 yrs, medically disabled and unable to work" },
  { name: "Child Support Grant", amount: "R530/month", eligible: "Primary caregiver of a child under 18" },
  { name: "Social Relief of Distress (SRD)", amount: "R370/month", eligible: "Unemployed persons aged 18–59 with no income" },
  { name: "Foster Child Grant", amount: "R1,100/month", eligible: "Court-ordered foster parents" },
  { name: "Care Dependency Grant", amount: "R2,180/month", eligible: "Parent/caregiver of severely disabled child" },
];

const STEPS = [
  { num: "01", title: "Check Eligibility", desc: "Use the SASSA eligibility checker at sassa.gov.za to confirm which grant you qualify for." },
  { num: "02", title: "Gather Documents", desc: "SA ID or Birth Certificate, proof of income, bank account details, and any medical reports if applicable." },
  { num: "03", title: "Apply In-Person or Online", desc: "Visit your nearest SASSA office or apply for the SRD grant online at srd.sassa.gov.za." },
  { num: "04", title: "Track & Receive", desc: "Check your application status online or via the SASSA WhatsApp helpline (082 046 8553)." },
];

export default function ApplySASSAPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col">
      <SiteNav />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-[#0E3B29] text-white py-16 px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/10 blur-[100px] rounded-full" />
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                <HandCoins size={28} />
              </div>
              <div>
                <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-1">Social Security</p>
                <h1 className="text-4xl font-black tracking-tight">Apply for SASSA Grants</h1>
              </div>
            </div>
            <p className="text-xl text-white/80 font-medium max-w-2xl">
              The South African Social Security Agency (SASSA) provides grants to eligible South Africans in need of financial support.
            </p>
          </div>
        </section>

        {/* Helpline Banner */}
        <div className="bg-[#FFB81C] py-3 px-6">
          <div className="max-w-4xl mx-auto flex items-center gap-3">
            <Phone size={18} className="text-slate-900 shrink-0" />
            <p className="text-sm font-bold text-slate-900">
              SASSA Toll-Free Helpline: <strong>0800 60 10 11</strong> (Mon–Fri, 08:00–16:00)
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-16">

          {/* Available Grants */}
          <div className="mb-16">
            <h2 className="text-2xl font-black text-slate-900 mb-8">Available Grants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GRANTS.map((grant) => (
                <div key={grant.name} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-start gap-4">
                  <CheckCircle2 size={20} className="text-[#007749] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-black text-slate-900 mb-1">{grant.name}</h3>
                    <p className="text-lg font-black text-[#007749] mb-1">{grant.amount}</p>
                    <p className="text-xs font-medium text-slate-500">{grant.eligible}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="mb-16">
            <h2 className="text-2xl font-black text-slate-900 mb-8">How to Apply</h2>
            <div className="space-y-4">
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

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://srd.sassa.gov.za"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-5 bg-[#007749] hover:bg-[#0E3B29] text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg text-sm uppercase tracking-widest"
            >
              Apply for SRD Grant <ExternalLink size={16} />
            </a>
            <a
              href="https://www.sassa.gov.za"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-5 bg-white border-2 border-slate-200 text-slate-800 font-black rounded-2xl flex items-center justify-center gap-3 hover:border-[#007749] transition-all text-sm uppercase tracking-widest"
            >
              Visit SASSA Official Site <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
