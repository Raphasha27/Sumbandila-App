import Link from "next/link";
import { ShieldCheck, Lock, Smile, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="w-full bg-[#111827] relative pt-1">
      {/* Ndebele top band */}
      <div className="w-full h-2" style={{
        backgroundImage: "repeating-linear-gradient(90deg, #FFB81C 0px, #FFB81C 20px, #007749 20px, #007749 40px, #E03C31 40px, #E03C31 60px, #002395 60px, #002395 80px, #000 80px, #000 100px)",
      }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-white/10">

        <div className="flex items-start gap-3">
          <ShieldCheck size={24} className="text-emerald-500 mt-0.5 shrink-0" />
          <div>
            <span className="text-sm font-bold text-white block mb-1">Secure. Transparent. Trusted.</span>
            <span className="text-[10px] font-semibold text-slate-400">Your data is safe with us.</span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Lock size={24} className="text-blue-400 mt-0.5 shrink-0" />
          <div>
            <span className="text-sm font-bold text-white block mb-1">Accessible for All.</span>
            <span className="text-[10px] font-semibold text-slate-400">Easy to use. Easy to trust.</span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Smile size={24} className="text-amber-400 mt-0.5 shrink-0" />
          <div>
            <span className="text-sm font-bold text-white block mb-1">We Care. We Act.</span>
            <span className="text-[10px] font-semibold text-slate-400">Together we build a better SA.</span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-black text-white uppercase tracking-widest">Growth Ecosystem</span>
          <Link href="/opportunities" className="text-xs font-semibold text-slate-400 hover:text-emerald-500 transition-colors">Opportunities</Link>
          <Link href="/skills" className="text-xs font-semibold text-slate-400 hover:text-emerald-500 transition-colors">Skills Hub</Link>
          <Link href="/collaborations" className="text-xs font-semibold text-slate-400 hover:text-emerald-500 transition-colors">Collaborations</Link>
          <Link href="/webinars" className="text-xs font-semibold text-slate-400 hover:text-emerald-500 transition-colors">Live Webinars</Link>
          <Link href="/membership" className="text-xs font-semibold text-slate-400 hover:text-emerald-500 transition-colors">Membership Path</Link>
          <Link href="/admin" className="text-xs font-semibold text-slate-400 hover:text-emerald-500 transition-colors">Admin Portal</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row justify-between items-center gap-10 border-t border-white/5 mt-10">
        <div className="flex flex-col items-center md:items-start gap-4">
          <img 
            src="/sa-logo.png" 
            alt="Official Coat of Arms"
            className="h-16 w-auto brightness-0 invert opacity-40"
          />
          <div className="text-center md:text-left">
            <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-1">Government of South Africa</h4>
            <p className="text-[9px] font-bold text-white/20 italic max-w-xs">
              Sumbandila is an official initiative powered by the National Digital Infrastructure.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-3">
          <h4 className="text-sm font-black text-white uppercase tracking-tighter mb-2">EXPERIENCE ON MOBILE</h4>
          <div className="bg-white p-2 rounded-[28px] shadow-2xl relative overflow-hidden">
             <img 
               src="/qr-scan.png" 
               alt="National ID Scan" 
               className="w-20 h-20 object-cover rounded-2xl"
             />
          </div>
          <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.2em] mt-2">SCAN TO ACCESS THE HUB</span>
        </div>
    </div>


      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-slate-500 font-semibold">
          © 2026 Republic of South Africa — Sumbandila Growth Ecosystem. All Rights Reserved. &nbsp;|&nbsp;
          <Link href="/feedback" className="hover:text-emerald-500 transition-colors">Complaints & Feedback</Link>
        </p>
        <div className="flex items-center gap-5">
          <span className="text-xs text-slate-400 font-bold">Follow us</span>
          <div className="flex gap-4 text-slate-400">
            <Facebook size={16} className="hover:text-white cursor-pointer transition-colors" />
            <Twitter size={16} className="hover:text-white cursor-pointer transition-colors" />
            <Instagram size={16} className="hover:text-white cursor-pointer transition-colors" />
            <Youtube size={16} className="hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
}
