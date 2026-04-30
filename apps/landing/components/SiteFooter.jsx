"use client";

import Link from "next/link";
import { ShieldCheck, Lock, Smile, Facebook, Twitter, Instagram, Youtube, ChevronRight, GraduationCap, HandCoins, Search, HeartPulse, Lightbulb, Trophy, MapPin } from "lucide-react";
import { useState, useEffect } from "react";

const LANDMARKS = [
  {
    src: "/mandela-bridge.png",
    label: "Nelson Mandela Bridge",
    caption: "Johannesburg — City of Gold",
  },
  {
    src: "/union-buildings.png",
    label: "Union Buildings",
    caption: "Pretoria — Seat of Government",
  },
];

export default function SiteFooter() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % LANDMARKS.length), 6000);
    return () => clearInterval(t);
  }, []);

  const lm = LANDMARKS[slide];

  return (
    <footer className="w-full bg-[#111827] relative pt-1">
      {/* Ndebele top band */}
      <div
        className="w-full h-2"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg,#FFB81C 0px,#FFB81C 20px,#007749 20px,#007749 40px,#E03C31 40px,#E03C31 60px,#002395 60px,#002395 80px,#000 80px,#000 100px)",
        }}
      />

      {/* ── Trust pillars ── */}
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

      {/* ── Citizen Quick Services ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 border-b border-white/10">
        <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-6">Quick Citizen Services</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { label: "Apply NSFAS",        href: "/apply/nsfas",       Icon: GraduationCap, color: "text-emerald-400", bg: "bg-emerald-900/30" },
            { label: "SASSA Grants",       href: "/apply/sassa",       Icon: HandCoins,      color: "text-amber-400",  bg: "bg-amber-900/30"  },
            { label: "Verify Institution", href: "/verify",            Icon: ShieldCheck,    color: "text-blue-400",   bg: "bg-blue-900/30"   },
            { label: "Find a Clinic",      href: "/services/clinics",  Icon: HeartPulse,     color: "text-rose-400",   bg: "bg-rose-900/30"   },
            { label: "Skills & Courses",   href: "/skills",            Icon: Lightbulb,      color: "text-yellow-400", bg: "bg-yellow-900/30" },
            { label: "Job Opportunities",  href: "/opportunities",     Icon: Trophy,         color: "text-purple-400", bg: "bg-purple-900/30" },
          ].map(({ label, href, Icon, color, bg }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-4 text-center transition-all group"
            >
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon size={20} className={color} />
              </div>
              <span className="text-[10px] font-black text-white/60 group-hover:text-white uppercase tracking-wide transition-colors leading-tight">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Landmark + Coat of Arms ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row justify-between items-center gap-10 border-b border-white/5">

        {/* Coat of Arms block */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <img
            src="/sa-coat-of-arms.png"
            alt="Official South African Coat of Arms"
            className="h-24 w-auto object-contain drop-shadow-lg"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
          <div className="text-center md:text-left">
            <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-1">Government of South Africa</h4>
            <p className="text-[9px] font-bold text-white/20 italic max-w-xs">
              Sumbandila is an official initiative powered by the National Digital Infrastructure.
            </p>
          </div>
          <Link
            href="/membership"
            className="mt-2 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-md"
          >
            Apply Now <ChevronRight size={12} />
          </Link>
        </div>

        {/* Landmark slideshow + QR Code side by side */}
        <div className="flex flex-col sm:flex-row items-center gap-8">

          {/* Rotating landmark */}
          <div className="flex flex-col items-center gap-3">
            <h4 className="text-sm font-black text-white uppercase tracking-tighter mb-1">Our Nation, Our Pride</h4>
            <div className="relative w-64 h-40 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img
                key={lm.src}
                src={lm.src}
                alt={lm.label}
                className="w-full h-full object-cover transition-opacity duration-700"
                onError={(e) => { e.currentTarget.src = "/sa-logo.png"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <p className="text-xs font-black text-white leading-tight">{lm.label}</p>
                <p className="text-[9px] font-semibold text-white/60">{lm.caption}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {LANDMARKS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  className={`h-1.5 rounded-full transition-all ${i === slide ? "w-6 bg-emerald-500" : "w-1.5 bg-white/20"}`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center gap-3">
            <h4 className="text-sm font-black text-white uppercase tracking-tighter mb-1">Experience on Mobile</h4>
            <div className="bg-white p-3 rounded-[24px] shadow-2xl">
              <img
                src="/qr-scan.png"
                alt="Scan QR code to access Sumbandila"
                className="w-24 h-24 object-cover rounded-2xl"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Scan to Access the Hub</span>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-slate-500 font-semibold">
          © 2026 Republic of South Africa — Sumbandila Growth Ecosystem. All Rights Reserved. &nbsp;|&nbsp;
          <Link href="/feedback" className="hover:text-emerald-500 transition-colors">Complaints &amp; Feedback</Link>
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
