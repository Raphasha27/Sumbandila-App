"use client";

import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import { Code2, GitBranch, MessageSquare, Plus, Users, MapPin, Search, ChevronRight, Activity } from "lucide-react";
import Link from "next/link";

export default function CollaborationsPage() {
  const projects = [
    {
      id: 1,
      title: "Township WiFi Mesh Network",
      location: "Alexandria, JHB",
      category: "Infrastructure",
      tech: ["Networking", "IoT", "Solar"],
      members: 12,
      status: "Active",
      description: "Building a decentralized, solar-powered mesh network to provide low-cost internet to township residents."
    },
    {
      id: 2,
      title: "Mobile Clinic Booking System",
      location: "Soweto, JHB",
      category: "Software",
      tech: ["Next.js", "Supabase", "PWA"],
      members: 8,
      status: "In Progress",
      description: "A lightweight web app to help residents book appointments at mobile health clinics and reduce wait times."
    },
    {
      id: 3,
      title: "Community Solar Garden",
      location: "Khayelitsha, CPT",
      category: "Energy",
      tech: ["Electrical Eng", "Smart Grid"],
      members: 15,
      status: "Planning",
      description: "Developing a community-owned solar farm to provide sustainable backup power during load-shedding."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col">
      <SiteNav />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 to-[#0E3B29] text-white py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
               <div className="lg:w-1/2">
                  <span className="inline-block px-4 py-1.5 bg-[#FFB81C] text-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 shadow-lg">
                     Youth-Led Infrastructure
                  </span>
                  <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">Collaborate. <span className="text-emerald-400">Build.</span><br />Impact.</h1>
                  <p className="text-xl text-white/70 font-medium mb-8">Join squads of developers, engineers, and creatives building real solutions for South African townships and rural communities.</p>
                  
                  <div className="flex gap-4">
                     <button className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-all shadow-xl">
                        Start a Project
                     </button>
                     <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white/20 transition-all">
                        Find a Squad
                     </button>
                  </div>
               </div>
               
               <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl">
                     <Activity className="text-emerald-400 mb-4" size={32} />
                     <h4 className="text-2xl font-black mb-1">85+</h4>
                     <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Active Projects</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl mt-8">
                     <Users className="text-blue-400 mb-4" size={32} />
                     <h4 className="text-2xl font-black mb-1">2,400</h4>
                     <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Contributors</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl -mt-8">
                     <Code2 className="text-[#FFB81C] mb-4" size={32} />
                     <h4 className="text-2xl font-black mb-1">12M+</h4>
                     <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Lines of Code</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl">
                     <MapPin className="text-red-400 mb-4" size={32} />
                     <h4 className="text-2xl font-black mb-1">15</h4>
                     <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Target Townships</p>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Search Bar */}
        <section className="max-w-6xl mx-auto px-6 -mt-10 relative z-20 mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-4 flex gap-4 border border-slate-100">
            <div className="flex-grow relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input type="text" placeholder="Search by tech stack, project name, or location..." className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#007749]" />
            </div>
            <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest">Filters</button>
          </div>
        </section>

        {/* Project Feed */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="flex items-center justify-between mb-10">
             <h2 className="text-2xl font-black text-slate-900">Featured Squad Projects</h2>
             <div className="flex gap-2">
                <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:border-[#007749] hover:text-[#007749] transition-all">All</button>
                <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:border-[#007749] hover:text-[#007749] transition-all">Trending</button>
                <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:border-[#007749] hover:text-[#007749] transition-all">Nearby</button>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group p-8 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 group-hover:bg-[#0E3B29] group-hover:text-white transition-colors">
                    {project.category === "Infrastructure" ? <GitBranch size={24} /> : <Code2 size={24} />}
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${project.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : project.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                    {project.status}
                  </span>
                </div>
                
                <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-[#007749] transition-colors">{project.title}</h3>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-4">
                  <MapPin size={14} /> {project.location}
                </div>
                
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map(t => (
                    <span key={t} className="px-2 py-1 bg-slate-50 text-slate-500 rounded-md text-[10px] font-bold border border-slate-100">{t}</span>
                  ))}
                </div>
                
                <div className="pt-6 border-t border-slate-50 flex items-center justify-between mt-auto">
                   <div className="flex -space-x-3">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                           <img src={`https://i.pravatar.cc/100?img=${i+project.id*5}`} alt="User" />
                        </div>
                      ))}
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                        +{project.members - 3}
                      </div>
                   </div>
                   <button className="flex items-center gap-2 text-[#007749] font-black text-xs uppercase tracking-widest group-hover:underline">
                      Join Squad <ChevronRight size={14} />
                   </button>
                </div>
              </div>
            ))}
            
            {/* Create New Card */}
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center group hover:border-[#007749] hover:bg-white transition-all cursor-pointer">
               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border border-slate-100 mb-4 group-hover:bg-[#007749] group-hover:text-white transition-all">
                  <Plus size={32} />
               </div>
               <h3 className="text-lg font-black text-slate-900 mb-1">Found a problem?</h3>
               <p className="text-xs font-bold text-slate-400 mb-6">Start a new squad and build the solution.</p>
               <button className="text-xs font-black text-[#007749] uppercase tracking-widest">Create Project</button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
