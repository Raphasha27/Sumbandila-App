"use client";

import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import { Video, Calendar, Clock, User, Play, ChevronRight, Share2, Bell } from "lucide-react";
import Link from "next/link";

export default function WebinarsPage() {
  const webinars = [
    {
      id: 1,
      title: "How to Get Hired in 30 Days",
      host: "Lindiwe Dlamini",
      role: "HR Director @ TechSA",
      date: "12 Oct 2026",
      time: "14:00 CAT",
      status: "Upcoming",
      description: "Master the art of CV writing, interview techniques, and personal branding in the digital age."
    },
    {
      id: 2,
      title: "Building a Tech Startup in a Township",
      host: "Sipho Mokoena",
      role: "Founder, Kasi Tech Hub",
      date: "15 Oct 2026",
      time: "11:00 CAT",
      status: "Upcoming",
      description: "Learn how to leverage local resources to build scalable tech solutions in any environment."
    },
    {
      id: 3,
      title: "Financial Literacy for Young Professionals",
      host: "Thabo Molefe",
      role: "Financial Advisor",
      date: "18 Oct 2026",
      time: "18:00 CAT",
      status: "Upcoming",
      description: "Managing your first salary, investing in SA, and building long-term wealth."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col">
      <SiteNav />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-[#E03C31] text-white py-20 px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-[80px] rounded-full" />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
               <div className="md:w-1/2">
                  <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">Live Learning & <span className="text-black">Events</span></h1>
                  <p className="text-xl text-white/80 font-medium mb-8">Join industry experts, leaders, and fellow youth for live sessions designed to accelerate your growth.</p>
                  <button className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-all shadow-xl flex items-center gap-2">
                     <Bell size={16} className="text-[#E03C31]" /> Notify Me of New Sessions
                  </button>
               </div>
               <div className="md:w-1/2 bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl relative">
                  <div className="absolute -top-4 -right-4 bg-[#FFB81C] text-slate-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">
                     Next Session in 2h 15m
                  </div>
                  <h4 className="text-sm font-black text-white/60 uppercase tracking-widest mb-2">Featured Session</h4>
                  <h3 className="text-2xl font-black mb-4">Navigating the 2026 Job Market</h3>
                  <div className="flex items-center gap-3 mb-6">
                     <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white overflow-hidden">
                        <img src="https://i.pravatar.cc/100?img=12" alt="Host" />
                     </div>
                     <div>
                        <p className="text-sm font-bold">Lindiwe Dlamini</p>
                        <p className="text-xs text-white/60">HR Director @ TechSA</p>
                     </div>
                  </div>
                  <button className="w-full py-4 bg-white text-[#E03C31] rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                     <Play size={16} fill="currentColor" /> Set Reminder
                  </button>
               </div>
            </div>
          </div>
        </section>

        {/* Schedule */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-center justify-between mb-12">
             <h2 className="text-3xl font-black text-slate-900">Upcoming Schedule</h2>
             <div className="flex gap-4">
                <button className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-[#E03C31] transition-colors underline decoration-2 underline-offset-8">Weekly</button>
                <button className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-[#E03C31] transition-colors">Monthly</button>
             </div>
          </div>

          <div className="space-y-6">
            {webinars.map((webinar) => (
              <div key={webinar.id} className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all group">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
                  <div className="lg:col-span-1">
                    <div className="flex items-center gap-4 text-[#E03C31]">
                       <Calendar size={20} />
                       <span className="text-lg font-black">{webinar.date}</span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-400 mt-1">
                       <Clock size={16} />
                       <span className="text-sm font-bold">{webinar.time}</span>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2">
                    <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-[#E03C31] transition-colors">{webinar.title}</h3>
                    <p className="text-sm text-slate-500 font-medium mb-4">{webinar.description}</p>
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden">
                          <img src={`https://i.pravatar.cc/100?img=${webinar.id + 20}`} alt="Host" />
                       </div>
                       <p className="text-xs font-bold text-slate-600">{webinar.host} <span className="text-slate-400 ml-1">• {webinar.role}</span></p>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-1 flex lg:flex-col items-center justify-center gap-4">
                    <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors">
                       Register Now
                    </button>
                    <div className="flex gap-4">
                       <button className="w-10 h-10 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#E03C31] hover:border-[#E03C31] transition-all">
                          <Share2 size={18} />
                       </button>
                       <button className="w-10 h-10 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#E03C31] hover:border-[#E03C31] transition-all">
                          <Bell size={18} />
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Watch Previous */}
        <section className="bg-slate-50 py-20 border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-6">
             <div className="flex items-end justify-between mb-12">
                <div>
                   <h2 className="text-3xl font-black text-slate-900 mb-2">Watch Previous Sessions</h2>
                   <p className="text-slate-500 font-bold">Missed a live event? Catch up on the archive.</p>
                </div>
                <button className="text-sm font-black text-[#E03C31] hover:underline uppercase tracking-widest">Explore Archive</button>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1,2,3].map(i => (
                  <div key={i} className="group cursor-pointer">
                     <div className="aspect-video bg-slate-200 rounded-3xl mb-4 relative overflow-hidden">
                        <img src={`https://images.unsplash.com/photo-${1515187029135 + i}-5e47c8130fc6?auto=format&fit=crop&q=80&w=600`} alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-all">
                           <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
                              <Play size={24} fill="currentColor" />
                           </div>
                        </div>
                     </div>
                     <h4 className="font-black text-slate-900 group-hover:text-[#E03C31] transition-colors">SA Youth Summit 2026 Recap</h4>
                     <p className="text-xs font-bold text-slate-400 mt-1">Published 2 weeks ago • 1.2k views</p>
                  </div>
                ))}
             </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
