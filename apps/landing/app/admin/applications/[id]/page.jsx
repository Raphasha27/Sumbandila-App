"use client";

import { useParams } from "next/navigation";
import { ShieldCheck, Download, Check, X, AlertTriangle, FileText, Activity, MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AdminApplicationDetailPage() {
  const params = useParams();
  const id = params.id;

  const [activeTab, setActiveTab] = useState("audit");
  const [status, setStatus] = useState("IN REVIEW");

  const app = {
    id: id,
    name: "Sipho Mokoena",
    email: "sipho.m@example.com",
    phone: "082 555 1234",
    province: "Gauteng",
    service: "Youth Skills Funding",
    reason: "Applying for the 2026 digital skills learnership programme to advance my software development career. I have completed my matric and have attached my results.",
    aiScore: 82,
    aiRisk: "LOW",
    date: "2026-04-29",
  };

  const auditLogs = [
    { action: "STATUS_CHANGED: IN REVIEW", admin: "System Auto-Assign", date: "2026-04-29 11:05" },
    { action: "APPLICATION_SUBMITTED", admin: "Citizen Portal", date: "2026-04-29 11:02" }
  ];

  const timeline = [
    { state: "In Review", time: "11:05 AM" },
    { state: "Submitted", time: "11:02 AM" },
    { state: "Draft Created", time: "10:45 AM" }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">
        <Link href="/admin/applications" className="hover:text-[#007749] transition-colors">Applications</Link>
        <span>/</span>
        <span className="text-slate-600">{id}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MAIN PANEL (2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Header Card */}
          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-black text-slate-900 mb-2">{app.name}</h1>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Ref: {id}</p>
            </div>
            <div className={`px-4 py-2 rounded-xl border-2 text-sm font-black uppercase tracking-widest ${
              status === "APPROVED" ? "border-green-200 bg-green-50 text-green-700" :
              status === "REJECTED" ? "border-red-200 bg-red-50 text-red-700" :
              "border-blue-200 bg-blue-50 text-blue-700"
            }`}>
              {status}
            </div>
          </div>

          {/* AI Eligibility Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none" />
            <h2 className="text-white font-black text-lg flex items-center gap-2 mb-6">
              <ShieldCheck className="text-emerald-400" /> AI Eligibility Assessment
            </h2>
            
            <div className="flex items-center gap-8">
              <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-white/10" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path className="text-emerald-400" strokeDasharray={`${app.aiScore}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-xl font-black text-white">{app.aiScore}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Risk Level:</span>
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-black tracking-widest">LOW</span>
                </div>
                <p className="text-sm font-medium text-white/70 leading-relaxed">
                  Applicant's details match Home Affairs registry. No prior fraud flags detected. Province matches service area. Recommended for approval.
                </p>
              </div>
            </div>
          </div>

          {/* Applicant Info Section */}
          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
            <h2 className="text-lg font-black text-slate-900 mb-6 border-b border-slate-100 pb-4">Applicant Details</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0"><Mail size={16} className="text-slate-400" /></div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</span>
                  <span className="font-semibold text-slate-900 text-sm">{app.email}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0"><Phone size={16} className="text-slate-400" /></div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone Number</span>
                  <span className="font-semibold text-slate-900 text-sm">{app.phone}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0"><MapPin size={16} className="text-slate-400" /></div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Province</span>
                  <span className="font-semibold text-slate-900 text-sm">{app.province}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center border border-green-100 shrink-0"><FileText size={16} className="text-[#007749]" /></div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target Program</span>
                  <span className="font-bold text-[#0E3B29] text-sm">{app.service}</span>
                </div>
              </div>
            </div>

            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Motivation / Reason</span>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-sm text-slate-700 leading-relaxed font-medium">{app.reason}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-wrap gap-4">
            <button onClick={() => setStatus("APPROVED")} className="flex-1 bg-[#007749] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest shadow-md hover:bg-[#0E3B29] transition-colors flex items-center justify-center gap-2 min-w-[140px]">
              <Check size={16} /> Approve
            </button>
            <button onClick={() => setStatus("REJECTED")} className="flex-1 bg-red-600 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest shadow-md hover:bg-red-800 transition-colors flex items-center justify-center gap-2 min-w-[140px]">
              <X size={16} /> Reject
            </button>
            <button className="flex-1 bg-slate-900 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest shadow-md hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 min-w-[140px]">
              <Download size={16} /> Export PDF
            </button>
          </div>
        </div>

        {/* SIDE PANEL (1 col) */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-100 rounded-3xl shadow-sm h-full flex flex-col overflow-hidden sticky top-28">
            
            {/* Tabs Row */}
            <div className="flex border-b border-slate-100 bg-slate-50/50">
              <button 
                onClick={() => setActiveTab("audit")}
                className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-colors ${activeTab === "audit" ? "text-[#007749] border-b-2 border-[#007749] bg-white" : "text-slate-500 hover:bg-white"}`}
              >
                Audit
              </button>
              <button 
                onClick={() => setActiveTab("timeline")}
                className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-colors ${activeTab === "timeline" ? "text-[#007749] border-b-2 border-[#007749] bg-white" : "text-slate-500 hover:bg-white"}`}
              >
                Timeline
              </button>
              <button 
                onClick={() => setActiveTab("insights")}
                className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-colors ${activeTab === "insights" ? "text-[#007749] border-b-2 border-[#007749] bg-white" : "text-slate-500 hover:bg-white"}`}
              >
                Insights
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6 flex-grow overflow-y-auto max-h-[600px]">
              
              {activeTab === "audit" && (
                <div className="space-y-6">
                  {status === "APPROVED" && (
                    <div className="border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">STATUS_CHANGED: APPROVED</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-500">Admin Gauteng (SUPER_ADMIN)</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-1">Just now</p>
                    </div>
                  )}
                  {status === "REJECTED" && (
                    <div className="border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">STATUS_CHANGED: REJECTED</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-500">Admin Gauteng (SUPER_ADMIN)</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-1">Just now</p>
                    </div>
                  )}
                  {auditLogs.map((log, i) => (
                    <div key={i} className="border-b border-slate-100 pb-4 last:border-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-slate-300" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">{log.action}</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-500">{log.admin}</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-1">{log.date}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "timeline" && (
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                  {timeline.map((item, i) => (
                    <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white bg-slate-300 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2" />
                      <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl border border-slate-100 bg-slate-50 shadow-sm">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-bold text-slate-900 text-sm">{item.state}</div>
                        </div>
                        <div className="text-slate-500 text-xs font-semibold">{item.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "insights" && (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="text-blue-600" size={16} />
                      <span className="text-xs font-black uppercase tracking-widest text-blue-900">Workload Insight</span>
                    </div>
                    <p className="text-xs font-semibold text-blue-800 leading-relaxed">
                      Application falls within normal peak hour volume. No anomalous submission patterns detected from this IP address.
                    </p>
                  </div>
                  <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="text-amber-600" size={16} />
                      <span className="text-xs font-black uppercase tracking-widest text-amber-900">Anomaly Check</span>
                    </div>
                    <p className="text-xs font-semibold text-amber-800 leading-relaxed">
                      ID number age verification matches stated birth year. Province is consistent with the selected service location.
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
