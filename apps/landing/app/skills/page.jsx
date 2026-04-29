"use client";

import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import { GraduationCap, Play, Clock, Star, BookOpen, Laptop, Briefcase, Award, ChevronRight, Users } from "lucide-react";
import Link from "next/link";

export default function SkillsPage() {
  const courses = [
    {
      id: 1,
      title: "Introduction to Full-Stack Web Dev",
      provider: "Sumbandila Academy",
      duration: "12 Weeks",
      rating: 4.9,
      students: "2.4k",
      category: "Tech",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600",
      isFree: true
    },
    {
      id: 2,
      title: "Modern Agricultural Business",
      provider: "AgriSouth Hub",
      duration: "8 Weeks",
      rating: 4.7,
      students: "1.8k",
      category: "Business",
      image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=600",
      isFree: false
    },
    {
      id: 3,
      title: "Digital Marketing Masterclass",
      provider: "Social Impact Media",
      duration: "6 Weeks",
      rating: 4.8,
      students: "3.2k",
      category: "Marketing",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
      isFree: true
    },
    {
      id: 4,
      title: "Leadership & Civic Engagement",
      provider: "National Youth Council",
      duration: "4 Weeks",
      rating: 5.0,
      students: "900",
      category: "Leadership",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600",
      isFree: true
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col">
      <SiteNav />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-slate-900 text-white py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#007749_0%,_transparent_50%)]" />
          </div>
          
          <div className="max-w-6xl mx-auto relative z-10 text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">Skills & Learning <span className="text-[#F59E0B]">Hub</span></h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-medium mb-10">Upskill yourself with industry-recognized courses, certifications, and hands-on training built for the South African economy.</p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 bg-[#007749] text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#0E3B29] transition-all shadow-lg shadow-green-900/40">
                Browse All Courses
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white/20 transition-all">
                My Learning Dashboard
              </button>
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="bg-[#FFB81C] py-4">
           <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center md:justify-between gap-6 text-slate-900 font-black text-xs uppercase tracking-widest">
              <span className="flex items-center gap-2"><BookOpen size={16} /> 450+ Active Courses</span>
              <span className="flex items-center gap-2"><Users size={16} /> 540k Learners</span>
              <span className="flex items-center gap-2"><Award size={16} /> 120k Certificates Issued</span>
              <span className="flex items-center gap-2"><Laptop size={16} /> Desktop & Mobile Ready</span>
           </div>
        </section>

        {/* Learning Paths */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-2">Featured Learning Paths</h2>
              <p className="text-slate-500 font-bold">Curated sequences to take you from beginner to job-ready.</p>
            </div>
            <Link href="/paths" className="text-sm font-black text-[#007749] hover:underline uppercase tracking-widest">View All Paths</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden flex flex-col">
                <div className="h-40 relative overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${course.isFree ? 'bg-green-500 text-white border-green-400' : 'bg-slate-900 text-white border-slate-800'}`}>
                      {course.isFree ? 'FREE' : 'SPONSORED'}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <p className="text-[10px] font-black text-[#007749] uppercase tracking-widest mb-2">{course.category}</p>
                  <h3 className="text-lg font-black text-slate-900 mb-2 leading-tight group-hover:text-[#007749] transition-colors">{course.title}</h3>
                  <p className="text-xs font-bold text-slate-500 mb-4">{course.provider}</p>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                      <span className="flex items-center gap-1"><Clock size={14} /> {course.duration}</span>
                      <span className="flex items-center gap-1"><Star size={14} className="text-amber-500 fill-amber-500" /> {course.rating}</span>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-900 group-hover:bg-[#007749] group-hover:text-white transition-all">
                      <Play size={14} fill="currentColor" className="ml-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Professional Certifications */}
        <section className="bg-white py-20 border-y border-slate-100">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             <div>
                <h2 className="text-4xl font-black text-slate-900 mb-6 leading-tight">Earn Industry-Recognized <span className="text-[#002395]">Certifications</span></h2>
                <p className="text-lg text-slate-600 font-medium mb-8">Our certifications are verified by major South African employers and international tech partners, ensuring your profile stands out in the job market.</p>
                
                <div className="space-y-4 mb-10">
                   <div className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-green-100 text-[#007749] rounded-full flex items-center justify-center shrink-0 mt-1"><ChevronRight size={14} /></div>
                      <p className="font-bold text-slate-700 underline decoration-[#007749]/30">Automated integration with LinkedIn & Sumbandila Profiles</p>
                   </div>
                   <div className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-green-100 text-[#007749] rounded-full flex items-center justify-center shrink-0 mt-1"><ChevronRight size={14} /></div>
                      <p className="font-bold text-slate-700 underline decoration-[#007749]/30">Verifiable credentials powered by National Registry</p>
                   </div>
                </div>
                
                <button className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-xl">
                   Explore Certifications
                </button>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-slate-50 rounded-3xl p-8 flex flex-col items-center justify-center text-center border border-slate-100">
                   <Laptop size={48} className="text-blue-600 mb-4" />
                   <h4 className="font-black text-slate-900">Tech</h4>
                </div>
                <div className="aspect-square bg-slate-50 rounded-3xl p-8 flex flex-col items-center justify-center text-center border border-slate-100 mt-8">
                   <Briefcase size={48} className="text-emerald-600 mb-4" />
                   <h4 className="font-black text-slate-900">Trade</h4>
                </div>
                <div className="aspect-square bg-slate-50 rounded-3xl p-8 flex flex-col items-center justify-center text-center border border-slate-100 -mt-8">
                   <GraduationCap size={48} className="text-amber-600 mb-4" />
                   <h4 className="font-black text-slate-900">Academic</h4>
                </div>
                <div className="aspect-square bg-slate-50 rounded-3xl p-8 flex flex-col items-center justify-center text-center border border-slate-100">
                   <Award size={48} className="text-red-600 mb-4" />
                   <h4 className="font-black text-slate-900">Skills</h4>
                </div>
             </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
