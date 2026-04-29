"use client";

import Link from "next/link";
import { ChevronLeft, MapPin, HeartPulse, Search, Phone, Clock } from "lucide-react";
import SiteNav from "../../../components/SiteNav";
import SiteFooter from "../../../components/SiteFooter";

export default function ClinicsMap() {
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

          <div className="max-w-6xl mx-auto relative z-10">
            <Link href="/" className="inline-flex items-center gap-3 text-white/70 hover:text-white transition-colors mb-8 group">
              <ChevronLeft size={16} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[11px] font-black uppercase tracking-[0.1em]">Back to Home</span>
            </Link>

            <div className="flex items-center justify-between flex-wrap gap-6">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-red-500/20 text-red-300 border border-red-500/20 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <HeartPulse size={12} /> Healthcare
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1] mb-2">
                  Find a Clinic Near You
                </h1>
                <p className="text-white/80 font-semibold text-lg max-w-xl">
                  Locate public health facilities, hospitals, and specialized clinics across South Africa.
                </p>
              </div>
              
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search by city, province, or postal code..." 
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-slate-900 border-none shadow-lg focus:ring-2 focus:ring-[#007749] outline-none font-medium"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content Section */}
        <section className="max-w-6xl mx-auto px-6 py-12 -mt-8 relative z-20 flex flex-col lg:flex-row gap-8">
          
          {/* List Sidebar */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-3 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-[#E03C31]">
              <div className="flex justify-between items-start">
                <h3 className="font-black text-slate-900 text-lg">Charlotte Maxeke Hospital</h3>
                <span className="text-[10px] font-bold text-[#007749] bg-green-50 px-2 py-1 rounded">Open Now</span>
              </div>
              <div className="flex items-start gap-2 text-slate-500 text-sm font-medium">
                <MapPin size={16} className="shrink-0 mt-0.5 text-slate-400" />
                <p>Jubilee Rd, Parktown, Johannesburg, 2193</p>
              </div>
              <div className="flex items-center gap-6 mt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <Phone size={14} className="text-slate-400" /> 011 488 4911
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <Clock size={14} className="text-slate-400" /> 24 Hours
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-3 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-transparent hover:border-l-[#E03C31]">
              <div className="flex justify-between items-start">
                <h3 className="font-black text-slate-900 text-lg">Hillbrow Community Health</h3>
                <span className="text-[10px] font-bold text-[#007749] bg-green-50 px-2 py-1 rounded">Open Now</span>
              </div>
              <div className="flex items-start gap-2 text-slate-500 text-sm font-medium">
                <MapPin size={16} className="shrink-0 mt-0.5 text-slate-400" />
                <p>Smit St & Klein St, Hillbrow, Johannesburg</p>
              </div>
              <div className="flex items-center gap-6 mt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <Phone size={14} className="text-slate-400" /> 011 488 4911
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <Clock size={14} className="text-slate-400" /> 07:00 - 18:00
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-3 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-transparent hover:border-l-[#E03C31]">
              <div className="flex justify-between items-start">
                <h3 className="font-black text-slate-900 text-lg">Alex Clinic</h3>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">Closed</span>
              </div>
              <div className="flex items-start gap-2 text-slate-500 text-sm font-medium">
                <MapPin size={16} className="shrink-0 mt-0.5 text-slate-400" />
                <p>33 Arkwright Ave, Wynberg, Johannesburg</p>
              </div>
              <div className="flex items-center gap-6 mt-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <Phone size={14} className="text-slate-400" /> 011 488 4911
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <Clock size={14} className="text-slate-400" /> 08:00 - 16:00
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Area */}
          <div className="w-full lg:w-2/3 h-[500px] lg:h-[600px] bg-slate-200 rounded-3xl overflow-hidden shadow-inner border-4 border-white relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114584.72659613673!2d27.940562507851382!3d-26.17150532726322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950c68f0406a51%3A0x238ac9d9b1d34041!2sJohannesburg!5e0!3m2!1sen!2sza!4v1700000000000!5m2!1sen!2sza" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
          </div>

        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
