"use client";

import SiteNav from "../../../components/SiteNav";
import SiteFooter from "../../../components/SiteFooter";
import { MapPin, Phone, MessageCircle, Clock, CheckCircle2, ChevronRight, AlertCircle, FileText } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ServiceDetailsPage() {
  const params = useParams();
  
  // Mock data based on ID
  const service = {
    id: params.id,
    name: params.id === "1" ? "Chris Hani Baragwanath Hospital" : "Legal Aid South Africa",
    category: params.id === "1" ? "Healthcare" : "Legal Aid",
    location: "Soweto, Johannesburg, Gauteng",
    verified: true,
    phone: "011 933 0000",
    whatsapp: "+27 60 000 0000",
    hours: "Mon - Sun (24 Hours)",
    requirements: [
      "Original ID Document",
      "Proof of Residence (not older than 3 months)",
      "Clinic Card or Referral Letter"
    ],
    description: "This facility is a major public service centre providing critical support to communities. As a verified national provider, it adheres to the Batho Pele principles of service delivery. Services include emergency care, specialized support, and public welfare programmes."
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col">
      <SiteNav />

      <main className="flex-grow max-w-6xl mx-auto px-6 py-14 w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
          <Link href="/explore" className="hover:text-[#007749] transition-colors">Explore</Link>
          <ChevronRight size={14} />
          <span className="text-[#007749]">{service.category}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">{service.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-slate-600 font-medium text-sm">
              <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg"><MapPin size={16} /> {service.location}</span>
              {service.verified && (
                <span className="flex items-center gap-1.5 bg-green-50 text-[#007749] px-3 py-1.5 rounded-lg border border-green-200 font-bold uppercase tracking-widest text-[10px]">
                  <CheckCircle2 size={14} /> Verified National Provider
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-3 shrink-0">
            <button className="bg-[#0E3B29] text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest shadow-md hover:bg-emerald-900 transition-colors">
              Start Application
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 mb-4">Overview</h2>
              <p className="text-slate-600 font-medium leading-relaxed">{service.description}</p>
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
              <h2 className="text-2xl font-black text-slate-900 mb-6">Requirements</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
                <AlertCircle className="text-[#F59E0B] shrink-0 mt-0.5" size={20} />
                <p className="text-sm font-semibold text-amber-900">Please ensure you bring original copies of the following documents to avoid delays.</p>
              </div>
              <ul className="space-y-3">
                {service.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-700 font-medium bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <FileText size={18} className="text-slate-400" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#007749] via-[#FFB81C] to-[#E03C31]" />
              <h3 className="text-xl font-black mb-6">Contact Info</h3>
              
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <Phone className="text-slate-400 shrink-0 mt-1" size={18} />
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Call Centre</span>
                    <span className="font-semibold text-sm">{service.phone}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="text-slate-400 shrink-0 mt-1" size={18} />
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">WhatsApp Support</span>
                    <span className="font-semibold text-sm">{service.whatsapp}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="text-slate-400 shrink-0 mt-1" size={18} />
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Operating Hours</span>
                    <span className="font-semibold text-sm">{service.hours}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <button className="bg-white text-slate-900 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-colors">
                  Call Now
                </button>
                <button className="bg-[#007749] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#0E3B29] transition-colors">
                  Get Directions
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
