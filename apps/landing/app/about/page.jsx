"use client";

import Link from "next/link";
import { ChevronLeft, ShieldCheck, Users, MapPin, Smile } from "lucide-react";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-emerald-500/30 flex flex-col">
      <SiteNav />

      <main className="flex-grow">
        {/* Header */}
        <header className="bg-[#0E3B29] text-white pt-16 pb-20 px-6 relative overflow-hidden">
          {/* Ndebele Pattern Top */}
          <div className="absolute top-0 left-0 w-full h-2 flex" style={{ 
            backgroundImage: "repeating-linear-gradient(45deg, #FFB81C 0px, #FFB81C 5px, #007749 5px, #007749 10px, #E03C31 10px, #E03C31 15px, #002395 15px, #002395 20px)",
          }} />

          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6">
              About Sumbandila Sentinel
            </h1>
            <p className="text-white/80 font-semibold text-lg md:text-xl max-w-2xl mx-auto">
              Empowering South Africans through verified, accessible, and transparent government digital services.
            </p>
          </div>
        </header>

        {/* Content */}
        <section className="max-w-4xl mx-auto px-6 py-16 -mt-10 relative z-20">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-slate-100 flex flex-col gap-10">
            
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-4" id="batho-pele">Our Mission: Batho Pele</h2>
              <p className="text-slate-600 font-medium leading-relaxed mb-4">
                "Batho Pele" translates to "People First." The Sumbandila National Sentinel was built on this exact principle. We believe that accessing government services, verifying the legitimacy of institutions, and securing vital support should be seamless and transparent for every South African.
              </p>
              <p className="text-slate-600 font-medium leading-relaxed">
                Our platform aggregates crucial services across all nine provinces, ensuring that no matter where you are, you have the power of the national registry at your fingertips.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-3">
                <ShieldCheck size={32} className="text-[#007749]" />
                <h3 className="font-black text-slate-900 text-lg">National Integrity</h3>
                <p className="text-sm font-medium text-slate-500">
                  We maintain strict verification standards to protect citizens from bogus institutions and fraudulent service providers.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-3">
                <Users size={32} className="text-[#002395]" />
                <h3 className="font-black text-slate-900 text-lg">Community Empowerment</h3>
                <p className="text-sm font-medium text-slate-500">
                  By digitizing and streamlining access to grants, healthcare, and education, we empower communities to thrive.
                </p>
              </div>
            </div>

          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
