"use client";

import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import { Award, Zap, Star, ShieldCheck, Trophy, Target, Heart, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function MembershipPage() {
  const levels = [
    {
      id: "starter",
      name: "🌱 Starter",
      requirement: "New Registration",
      benefits: ["Access to basic opportunities", "Weekly newsletter", "Verified digital ID"],
      color: "border-slate-200",
      bg: "bg-slate-50",
      iconColor: "text-slate-400"
    },
    {
      id: "active",
      name: "🚀 Active Member",
      requirement: "Complete 1 Course + 1 Application",
      benefits: ["Priority application status", "Access to live webinars", "Skill gap analysis report"],
      color: "border-emerald-200",
      bg: "bg-emerald-50",
      iconColor: "text-emerald-500"
    },
    {
      id: "contributor",
      name: "🏅 Contributor",
      requirement: "Help 5 Peers + Complete 3 Projects",
      benefits: ["Membership in elite squads", "Exclusive networking events", "Verified skill endorsements"],
      color: "border-blue-200",
      bg: "bg-blue-50",
      iconColor: "text-blue-500"
    },
    {
      id: "leader",
      name: "👑 Leader",
      requirement: "Mentorship + Running Programs",
      benefits: ["Direct government advisory roles", "Sponsorship for own projects", "Lifetime impact award"],
      color: "border-amber-200",
      bg: "bg-amber-50",
      iconColor: "text-amber-500"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col">
      <SiteNav />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-slate-900 text-white py-24 px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFB81C]/10 blur-[100px] rounded-full" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
             <span className="inline-block px-4 py-1.5 bg-[#FFB81C] text-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 shadow-lg">
                The Path to Leadership
             </span>
             <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">Grow Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007749] via-[#FFB81C] to-[#E03C31]">Legacy.</span></h1>
             <p className="text-xl text-white/70 font-medium mb-12">Sumbandila isn't just a platform—it's a journey. Level up your profile, earn impact points, and unlock opportunities that change lives.</p>
             
             <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-center gap-12">
                <div className="text-center">
                   <h4 className="text-4xl font-black mb-1">78</h4>
                   <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Avg. Growth Score</p>
                </div>
                <div className="h-12 w-px bg-white/10 hidden md:block" />
                <div className="text-center">
                   <h4 className="text-4xl font-black mb-1">1.2M</h4>
                   <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Active Members</p>
                </div>
                <div className="h-12 w-px bg-white/10 hidden md:block" />
                <div className="text-center">
                   <h4 className="text-4xl font-black mb-1">South Africa</h4>
                   <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Impact Zone</p>
                </div>
             </div>
          </div>
        </section>

        {/* Levels Grid */}
        <section className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-black text-slate-900 mb-4">Membership Levels</h2>
             <p className="text-slate-500 font-bold max-w-xl mx-auto">Track your progress and unlock high-tier rewards as you contribute to the ecosystem.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {levels.map((level) => (
              <div key={level.id} className={`bg-white border-2 ${level.color} rounded-3xl p-8 shadow-sm flex flex-col group hover:shadow-xl transition-all`}>
                <div className={`w-16 h-16 ${level.bg} ${level.iconColor} rounded-2xl flex items-center justify-center mb-6 border border-transparent group-hover:border-current transition-colors`}>
                   {level.id === 'starter' && <Sparkles size={32} />}
                   {level.id === 'active' && <Zap size={32} />}
                   {level.id === 'contributor' && <Award size={32} />}
                   {level.id === 'leader' && <Trophy size={32} />}
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 mb-2">{level.name}</h3>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Requirement: {level.requirement}</p>
                
                <ul className="space-y-3 mb-8 flex-grow">
                   {level.benefits.map((benefit, idx) => (
                     <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                        <ShieldCheck className={`${level.iconColor} shrink-0 mt-0.5`} size={16} />
                        {benefit}
                     </li>
                   ))}
                </ul>
                
                <button className={`w-full py-4 ${level.bg} ${level.iconColor} rounded-xl font-black text-[10px] uppercase tracking-widest hover:brightness-95 transition-all`}>
                   View Path
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Gamification / Points */}
        <section className="bg-white py-24 border-y border-slate-100">
          <div className="max-w-6xl mx-auto px-6">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative">
                   <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-100 rounded-full blur-3xl opacity-50" />
                   <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">Earn Impact Points & <span className="text-[#E03C31]">Recognition</span></h2>
                   <p className="text-lg text-slate-600 font-medium mb-10 leading-relaxed">Everything you do on Sumbandila contributes to your Growth Score. Whether you're learning, building projects, or helping others, your impact is measured and rewarded.</p>
                   
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                         <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg"><Zap size={20} /></div>
                         <div>
                            <h4 className="font-black text-slate-900 text-sm">Action Points</h4>
                            <p className="text-xs text-slate-500 font-bold">Earned for apps & courses.</p>
                         </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                         <div className="w-10 h-10 bg-blue-500 text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg"><Heart size={20} /></div>
                         <div>
                            <h4 className="font-black text-slate-900 text-sm">Civic Points</h4>
                            <p className="text-xs text-slate-500 font-bold">Earned for community help.</p>
                         </div>
                      </div>
                   </div>
                </div>
                
                <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB81C] blur-[60px] opacity-20" />
                   <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 rounded-full border-4 border-emerald-500/30 p-1">
                         <img src="https://i.pravatar.cc/100?img=52" className="w-full h-full rounded-full object-cover" />
                      </div>
                      <div>
                         <h3 className="text-2xl font-black">Sipho Mokoena</h3>
                         <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Active Member • Gauteng</p>
                      </div>
                   </div>
                   
                   <div className="space-y-6">
                      <div>
                         <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-2 text-white/50">
                            <span>Growth Progress</span>
                            <span className="text-white">78/100</span>
                         </div>
                         <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-emerald-500 to-green-400 w-[78%]" />
                         </div>
                      </div>
                      
                      <div className="pt-6 border-t border-white/10">
                         <h4 className="text-sm font-black mb-4 uppercase tracking-widest text-white/30">Recent Achievements</h4>
                         <div className="flex gap-3">
                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10" title="Course Master"><Target size={20} className="text-blue-400" /></div>
                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10" title="Fast Starter"><Zap size={20} className="text-amber-400" /></div>
                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10" title="Community Hero"><Heart size={20} className="text-red-400" /></div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
