"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Mic, Send, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function SiphoFloatingAssistant() {
  const [open, setOpen] = useState(false);
  const popupRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Popup Panel */}
      <AnimatePresence>
        {open && (
          <motion.div 
            ref={popupRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[340px] bg-white border border-slate-100 rounded-3xl shadow-2xl overflow-hidden flex flex-col origin-bottom-right"
          >
            {/* Header */}
            <div className="bg-[#0E3B29] text-white p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 flex" style={{ backgroundImage: "repeating-linear-gradient(45deg, #FFB81C 0px, #FFB81C 5px, #007749 5px, #007749 10px, #E03C31 10px, #E03C31 15px, #002395 15px, #002395 20px)" }} />
              <div className="flex justify-between items-start z-10 relative mt-2">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                    <Sparkles size={20} className="text-[#FFB81C]" />
                  </div>
                  <div>
                    <h3 className="font-black text-base leading-tight">Sipho AI</h3>
                    <p className="text-[10px] font-bold text-white/70 tracking-widest uppercase">National Assistant</p>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full p-1.5">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col gap-4">
              <div className="relative">
                <input
                  placeholder="Ask Sipho in any language..."
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 pr-12 text-sm font-medium text-slate-700 outline-none focus:border-[#007749] focus:bg-white transition-all"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#007749] p-2">
                  <Send size={16} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button className="bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-lg py-2.5 text-xs font-bold text-slate-600 transition-colors">NSFAS Help</button>
                <button className="bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-lg py-2.5 text-xs font-bold text-slate-600 transition-colors">SASSA Grant</button>
                <button className="bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-lg py-2.5 text-xs font-bold text-slate-600 transition-colors">Find Clinic</button>
                <button className="bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-lg py-2.5 text-xs font-bold text-slate-600 transition-colors">Home Affairs</button>
              </div>

              <div className="flex gap-2 mt-2">
                <Link href="/sipho-ai" onClick={() => setOpen(false)} className="flex-1 bg-white border-2 border-[#0E3B29] text-[#0E3B29] py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest text-center hover:bg-slate-50 transition-colors">
                  Open Hub
                </Link>
                <button className="flex-1 bg-slate-900 text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
                  <Mic size={14} /> Voice
                </button>
              </div>
            </div>

            <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
              Batho Pele • Official Verified Guidance
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform hover:scale-105 ${open ? 'bg-slate-900 text-white rotate-90' : 'bg-[#007749] text-white shadow-[#007749]/30'}`}
      >
        {open ? <X size={24} className="-rotate-90" /> : <MessageSquare size={28} />}
      </button>
    </div>
  );
}
