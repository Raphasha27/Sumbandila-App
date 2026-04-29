"use client";

import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import { Send, Mic, Sparkles, MessageSquare } from "lucide-react";

export default function SiphoAIPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col">
      <SiteNav />

      <main className="flex-grow max-w-4xl mx-auto px-6 py-14 w-full">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-[#007749] to-[#0E3B29] rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg transform rotate-3">
            <Sparkles size={36} className="text-white transform -rotate-3" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Sipho AI Assistance</h2>
          <p className="text-slate-600 font-medium text-lg max-w-2xl mx-auto">Ask questions, get guidance, and simplify government processes in any official South African language.</p>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-sm relative overflow-hidden">
          {/* Top Pattern */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#007749] via-[#FFB81C] to-[#E03C31]" />
          
          {/* Chat Interface Mockup */}
          <div className="flex flex-col gap-6 mb-10 h-[350px] overflow-y-auto pr-4 custom-scrollbar">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#0E3B29] rounded-xl shrink-0 flex items-center justify-center text-white font-bold shadow-lg">S</div>
              <div className="bg-slate-50 p-5 rounded-3xl rounded-tl-none border border-slate-100 max-w-[80%]">
                <p className="text-slate-700 font-medium text-sm leading-relaxed">Sawubona! I'm Sipho, your National Sentinel Assistant. I have direct access to the latest DHET, HPCSA, and LPC registry snapshots. How can I protect your interests today?</p>
              </div>
            </div>

            <div className="flex items-start gap-4 flex-row-reverse">
              <div className="w-10 h-10 bg-slate-200 rounded-xl shrink-0 flex items-center justify-center text-slate-600 font-bold">You</div>
              <div className="bg-[#007749] p-5 rounded-3xl rounded-tr-none text-white shadow-md max-w-[80%]">
                <p className="font-medium text-sm">Is "Global Tech Academy" in Sandton a registered college? They're asking for a R5000 registration fee today.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#0E3B29] rounded-xl shrink-0 flex items-center justify-center text-white font-bold shadow-lg">S</div>
              <div className="bg-slate-50 p-5 rounded-3xl rounded-tl-none border border-slate-100 max-w-[80%]">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldAlert size={16} className="text-red-500" />
                  <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Audit Alert: High Risk</span>
                </div>
                <p className="text-slate-700 font-medium text-sm leading-relaxed mb-4">
                  I've scanned the 2026 DHET PHEI Register. "Global Tech Academy" is **not** listed as a registered institution. 
                </p>
                <div className="bg-red-50 border border-red-100 p-4 rounded-2xl mb-4">
                  <p className="text-xs text-red-800 font-bold">Recommendation: Do not pay any fees. Legitimate colleges must provide a DHET registration number which can be verified here.</p>
                </div>
                <button className="text-[10px] font-black text-[#007749] uppercase tracking-widest hover:underline flex items-center gap-1">
                  View Similar Verified Colleges <ChevronRight size={12} />
                </button>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="relative mb-8">
            <textarea
              className="w-full border-2 border-slate-100 bg-slate-50 rounded-2xl px-6 py-5 pr-32 min-h-[140px] focus:ring-0 focus:border-[#007749] focus:bg-white outline-none font-medium text-slate-700 resize-none transition-all shadow-inner"
              placeholder="Type your question or paste a registration number..."
            />
            
            <div className="absolute bottom-4 right-4 flex gap-3">
              <button className="w-12 h-12 bg-white border border-slate-200 text-slate-600 rounded-xl hover:text-[#E03C31] hover:border-[#E03C31] transition-colors flex items-center justify-center shadow-sm group">
                <Mic size={20} className="group-hover:scale-110 transition-transform" />
              </button>
              <button className="w-12 h-12 bg-[#007749] text-white rounded-xl hover:bg-[#0E3B29] transition-all flex items-center justify-center shadow-lg shadow-green-900/20 group">
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest mr-3 py-2 flex items-center gap-2">
              <MessageSquare size={14} /> Common Audits:
            </span>
            <button className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-600 text-xs font-bold rounded-xl transition-colors">Verify Dr. Surname</button>
            <button className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-600 text-xs font-bold rounded-xl transition-colors">NSFAS Appeal Status</button>
            <button className="px-5 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-600 text-xs font-bold rounded-xl transition-colors">Home Affairs ID Tracking</button>
          </div>
        </div>

        {/* Sentinel Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Database size={20} />
            </div>
            <h4 className="font-black text-slate-900 mb-2">Registry Access</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">Sipho cross-checks DHET, HPCSA, and LPC databases in milliseconds.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
              <ShieldCheck size={20} />
            </div>
            <h4 className="font-black text-slate-900 mb-2">Fraud Analysis</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">Rule-based engines identify fake accreditation patterns and clone sites.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-4">
              <Globe size={20} />
            </div>
            <h4 className="font-black text-slate-900 mb-2">Multilingual</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">Full NLP support for all 11 official South African languages.</p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
