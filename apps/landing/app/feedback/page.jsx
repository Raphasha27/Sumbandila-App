"use client";

import Link from "next/link";
import { ChevronLeft, MessageSquare, AlertTriangle, CheckCircle, Send } from "lucide-react";
import { useState } from "react";

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => setSubmitted(true), 1000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      {/* Header */}
      <header className="bg-[#0E3B29] text-white pt-20 pb-16 px-6 relative overflow-hidden">
        {/* Ndebele Pattern Top */}
        <div className="absolute top-0 left-0 w-full h-2 flex" style={{ 
          backgroundImage: "repeating-linear-gradient(45deg, #FFB81C 0px, #FFB81C 5px, #007749 5px, #007749 10px, #E03C31 10px, #E03C31 15px, #002395 15px, #002395 20px)",
        }} />

        <div className="max-w-3xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 text-white/70 hover:text-white transition-colors mb-10 group">
            <ChevronLeft size={16} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[11px] font-black uppercase tracking-[0.1em]">Back to Portal</span>
          </Link>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1] mb-4">
            Complaints & Feedback
          </h1>
          <p className="text-white/80 font-semibold text-lg max-w-xl">
            Help us improve our services. Report fraudulent activity, lodge a complaint about a service, or provide general feedback.
          </p>
        </div>
      </header>

      {/* Form Section */}
      <main className="max-w-3xl mx-auto px-6 py-12 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-slate-100">
          
          {submitted ? (
            <div className="flex flex-col items-center text-center py-10">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle size={40} className="text-[#007749]" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">Submission Received</h2>
              <p className="text-slate-500 font-medium max-w-md mx-auto mb-8">
                Thank you for your feedback. If you provided an email or reference number, we will be in touch shortly.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="px-8 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors"
              >
                Submit Another Report
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">First Name</label>
                  <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#007749] focus:ring-1 focus:ring-[#007749]" placeholder="First Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Last Name</label>
                  <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#007749] focus:ring-1 focus:ring-[#007749]" placeholder="Last Name" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
                <input required type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#007749] focus:ring-1 focus:ring-[#007749]" placeholder="you@example.com" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Category</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#007749] focus:ring-1 focus:ring-[#007749] text-slate-700">
                  <option>General Feedback</option>
                  <option>Report Fraud / Scam</option>
                  <option>Service Complaint</option>
                  <option>Technical Issue</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Message</label>
                <textarea required rows={5} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#007749] focus:ring-1 focus:ring-[#007749]" placeholder="Please describe your issue or feedback in detail..."></textarea>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-4">
                <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
                <p className="text-xs text-amber-800 font-medium">
                  If you are reporting a fraudulent institution, please include as much detail as possible, including names, registration numbers (if any), and physical addresses.
                </p>
              </div>

              <button type="submit" className="w-full py-4 rounded-xl bg-[#007749] text-white font-bold tracking-widest text-sm uppercase hover:bg-[#0E3B29] transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-900/20">
                <Send size={18} /> Submit Report
              </button>

            </form>
          )}

        </div>
      </main>
    </div>
  );
}
