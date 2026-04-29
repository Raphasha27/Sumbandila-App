"use client";

import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import { MessageSquare, Eye } from "lucide-react";

export default function ApplicationsPage() {
  const applications = [
    { title: "NSFAS Funding 2026", status: "In Review" },
    { title: "SASSA SRD Grant", status: "Submitted" },
    { title: "CIPC Business Registration", status: "Approved" },
    { title: "Housing Support Application", status: "Pending" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-800 border-green-200";
      case "Rejected": return "bg-red-100 text-red-800 border-red-200";
      case "In Review": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-amber-100 text-amber-800 border-amber-200";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex flex-col">
      <SiteNav />

      <main className="flex-grow max-w-7xl mx-auto px-6 py-14 w-full">
        <div>
          <h2 className="text-4xl font-black text-slate-900">My Applications</h2>
          <p className="text-slate-600 mt-2 font-medium text-lg">Track your submitted applications in real-time.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {applications.map((app) => (
            <div key={app.title} className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-black text-xl text-slate-900 leading-tight pr-4">{app.title}</h3>
                <span className={`inline-block text-[10px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest border shrink-0 ${getStatusColor(app.status)}`}>
                  {app.status}
                </span>
              </div>

              {/* Progress Bar Mock */}
              <div className="w-full bg-slate-100 h-2 rounded-full mb-8 overflow-hidden">
                <div className={`h-full rounded-full ${app.status === 'Approved' ? 'bg-green-500 w-full' : app.status === 'In Review' ? 'bg-blue-500 w-2/3' : app.status === 'Submitted' ? 'bg-amber-500 w-1/3' : 'bg-slate-300 w-1/4'}`}></div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-white border-2 border-slate-200 text-slate-700 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:border-[#007749] hover:text-[#007749] transition-colors flex items-center justify-center gap-2 flex-1">
                  <Eye size={16} /> View Details
                </button>
                <button className="bg-slate-900 text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 flex-1">
                  <MessageSquare size={16} /> Ask Sipho
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
