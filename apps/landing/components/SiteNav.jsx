"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock, Menu, X } from "lucide-react";
import { useState } from "react";

export default function SiteNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/opportunities", label: "Opportunities" },
    { href: "/skills", label: "Skills & Dev" },
    { href: "/collaborations", label: "Collaborations" },
    { href: "/webinars", label: "Webinars" },
    { href: "/membership", label: "Membership" },
    { href: "/leadership", label: "Leadership" },
  ];

  return (
    <nav className="w-full bg-white px-6 md:px-12 py-3 flex justify-between items-center z-50 border-b border-slate-100 sticky top-0 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-3">
          {/* SA Flag Emblem */}
          <div className="relative w-9 h-7 overflow-hidden rounded-sm flex-shrink-0">
            <div className="absolute top-0 left-0 w-full h-1/3 bg-[#E03C31]" />
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-[#001489]" />
            <div className="absolute inset-0 flex items-center">
              <div className="w-4 h-full bg-[#007749] skew-y-[30deg] transform origin-left" />
              <div className="flex-1 h-[30%] bg-[#007749]" />
            </div>
            <div className="absolute left-0 top-0 w-0 h-0 border-t-[14px] border-b-[14px] border-l-[12px] border-transparent border-l-black" style={{top:'0', bottom:'0', margin:'auto'}} />
            <div className="absolute left-0 top-0 w-0 h-0 border-t-[14px] border-b-[14px] border-l-[10px] border-transparent border-l-[#FFB81C]" style={{top:'0', bottom:'0', margin:'auto'}} />
          </div>
          <div>
            <span className="text-[20px] font-black tracking-tighter text-slate-900 leading-none block">SUMBANDILA</span>
            <span className="text-[9px] font-bold text-[#0E3B29] tracking-widest uppercase">National Sentinel</span>
          </div>
        </Link>

        <div className="hidden lg:block w-px h-10 bg-slate-200 mx-2" />

        <div className="hidden lg:flex items-center gap-3">
          <div className="w-9 h-9 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center text-[18px]">🇿🇦</div>
          <div>
            <span className="text-[10px] font-black text-slate-900 tracking-widest uppercase block">Republic of South Africa</span>
            <span className="text-[9px] font-bold text-[#0E3B29] italic">Batho Pele • We Care. We Act.</span>
          </div>
        </div>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-[11px] font-black uppercase tracking-widest transition-colors ${
              pathname === link.href ? "text-[#007749]" : "text-slate-700 hover:text-[#007749]"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <Link href="/verify" className="text-[11px] font-black uppercase tracking-widest text-slate-700 hover:text-[#007749] transition-colors">
          Verify
        </Link>
        <Link href="/feedback" className="text-[11px] font-black uppercase tracking-widest text-slate-700 hover:text-[#007749] transition-colors">
          Feedback
        </Link>
        <Link href="/admin" className="px-5 py-2.5 rounded-xl bg-[#0E3B29] text-white flex items-center gap-2 text-[11px] font-black uppercase tracking-widest hover:bg-emerald-900 transition-all shadow-md">
          <Lock size={13} /> Admin Portal
        </Link>
      </div>

      {/* Mobile hamburger */}
      <button className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X size={22} className="text-slate-800" /> : <Menu size={22} className="text-slate-800" />}
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl z-50 flex flex-col p-6 gap-4">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
              className="text-[13px] font-black uppercase tracking-widest text-slate-800 py-2 border-b border-slate-100 hover:text-[#007749] transition-colors">
              {link.label}
            </Link>
          ))}
          <Link href="/verify" onClick={() => setMobileOpen(false)} className="text-[13px] font-black uppercase tracking-widest text-slate-800 py-2 border-b border-slate-100 hover:text-[#007749] transition-colors">Verify Institution</Link>
          <Link href="/feedback" onClick={() => setMobileOpen(false)} className="text-[13px] font-black uppercase tracking-widest text-slate-800 py-2 border-b border-slate-100 hover:text-[#007749] transition-colors">Feedback</Link>
          <Link href="/admin" onClick={() => setMobileOpen(false)} className="mt-2 px-5 py-3 rounded-xl bg-[#0E3B29] text-white flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest">
            <Lock size={13} /> Admin Portal
          </Link>
        </div>
      )}
    </nav>
  );
}
