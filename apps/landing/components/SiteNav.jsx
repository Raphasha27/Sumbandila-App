"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock, Menu, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/opportunities", label: "Opportunities" },
  { href: "/skills", label: "Skills & Dev" },
  { href: "/collaborations", label: "Collaborations" },
  { href: "/webinars", label: "Webinars" },
  { href: "/membership", label: "Membership" },
  { href: "/leadership", label: "Leadership" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href) => pathname === href;

  return (
    <nav className="w-full bg-white px-6 md:px-12 py-3 flex justify-between items-center z-50 border-b border-slate-100 sticky top-0 shadow-sm">

      {/* ── Logo ── */}
      <div className="flex items-center gap-5">
        <Link href="/" className="flex items-center gap-3 group">
          {/* Official South African Coat of Arms */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Coat_of_arms_of_South_Africa.svg/60px-Coat_of_arms_of_South_Africa.svg.png"
            alt="Republic of South Africa – Coat of Arms"
            className="h-10 w-auto group-hover:opacity-80 transition-opacity"
            draggable={false}
          />
          <div>
            <span className="text-[20px] font-black tracking-tighter text-slate-900 leading-none block">
              SUMBANDILA
            </span>
            <span className="text-[9px] font-bold text-[#0E3B29] tracking-widest uppercase">
              National Growth Ecosystem
            </span>
          </div>
        </Link>

        <div className="hidden lg:block w-px h-10 bg-slate-200 mx-2" />

        <div className="hidden lg:flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center text-lg">🇿🇦</div>
          <div>
            <span className="text-[10px] font-black text-slate-900 tracking-widest uppercase block">
              Republic of South Africa
            </span>
            <span className="text-[9px] font-bold text-[#0E3B29] italic">
              Batho Pele • We Care. We Act.
            </span>
          </div>
        </div>
      </div>

      {/* ── Desktop Links ── */}
      <div className="hidden md:flex items-center gap-6">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-[11px] font-black uppercase tracking-widest transition-colors ${
              isActive(link.href)
                ? "text-[#007749] border-b-2 border-[#007749] pb-0.5"
                : "text-slate-700 hover:text-[#007749]"
            }`}
          >
            {link.label}
          </Link>
        ))}

        <Link
          href="/verify"
          className={`text-[11px] font-black uppercase tracking-widest transition-colors ${
            isActive("/verify")
              ? "text-[#007749] border-b-2 border-[#007749] pb-0.5"
              : "text-slate-700 hover:text-[#007749]"
          }`}
        >
          Verify
        </Link>

        <Link
          href="/feedback"
          className={`text-[11px] font-black uppercase tracking-widest transition-colors ${
            isActive("/feedback")
              ? "text-[#007749] border-b-2 border-[#007749] pb-0.5"
              : "text-slate-700 hover:text-[#007749]"
          }`}
        >
          Feedback
        </Link>

        <Link
          href="/admin/login"
          className="px-5 py-2.5 rounded-xl bg-[#0E3B29] text-white flex items-center gap-2 text-[11px] font-black uppercase tracking-widest hover:bg-emerald-900 transition-all shadow-md"
        >
          <Lock size={13} /> Admin Portal
        </Link>
      </div>

      {/* ── Mobile hamburger ── */}
      <button
        className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen
          ? <X size={22} className="text-slate-800" />
          : <Menu size={22} className="text-slate-800" />
        }
      </button>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl z-50 flex flex-col p-6 gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-[13px] font-black uppercase tracking-widest py-2 border-b border-slate-100 transition-colors ${
                isActive(link.href) ? "text-[#007749]" : "text-slate-800 hover:text-[#007749]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/verify"
            onClick={() => setMobileOpen(false)}
            className="text-[13px] font-black uppercase tracking-widest text-slate-800 py-2 border-b border-slate-100 hover:text-[#007749] transition-colors"
          >
            Verify Institution
          </Link>
          <Link
            href="/feedback"
            onClick={() => setMobileOpen(false)}
            className="text-[13px] font-black uppercase tracking-widest text-slate-800 py-2 border-b border-slate-100 hover:text-[#007749] transition-colors"
          >
            Feedback
          </Link>
          <Link
            href="/admin/login"
            onClick={() => setMobileOpen(false)}
            className="mt-2 px-5 py-3 rounded-xl bg-[#0E3B29] text-white flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest"
          >
            <Lock size={13} /> Admin Portal
          </Link>
        </div>
      )}
    </nav>
  );
}
