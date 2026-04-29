"use client";

import { ShieldCheck, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">
      {/* Left side - Branding */}
      <div className="w-full md:w-5/12 bg-[#0E3B29] text-white p-12 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 flex" style={{ backgroundImage: "repeating-linear-gradient(45deg, #FFB81C 0px, #FFB81C 5px, #007749 5px, #007749 10px, #E03C31 10px, #E03C31 15px, #002395 15px, #002395 20px)" }} />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0px, #fff 2px, transparent 2px, transparent 12px)", backgroundSize: "20px 20px" }} />
        
        <div className="relative z-10">
          <Link href="/" className="inline-block mb-12 opacity-80 hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">← Back to Public Site</span>
          </Link>
          
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 border border-white/20">
            <ShieldCheck size={32} className="text-[#FFB81C]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">National<br />Sentinel<br />Admin Portal</h1>
          <p className="text-white/70 font-medium max-w-sm mt-6 leading-relaxed">
            Authorized access only. This system is monitored by the Republic of South Africa cyber security framework.
          </p>
        </div>

        <div className="relative z-10 mt-12">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">Batho Pele • People First</p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full md:w-7/12 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-200/50">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-slate-50 text-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200">
              <Lock size={20} />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Secure Login</h2>
            <p className="text-slate-500 font-medium text-sm mt-2">Enter your official credentials to continue.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Email Address</label>
              <input 
                type="email" 
                defaultValue="admin@sumbandila.co.za"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[#007749] focus:bg-white transition-colors"
                required
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">Password</label>
                <a href="#" className="text-[10px] font-bold text-[#007749] hover:underline">Forgot?</a>
              </div>
              <input 
                type="password" 
                defaultValue="********"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-[#007749] focus:bg-white transition-colors"
                required
              />
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full bg-[#0E3B29] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest shadow-md hover:bg-emerald-900 transition-colors flex items-center justify-center gap-2">
                <ShieldCheck size={16} /> Authenticate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
