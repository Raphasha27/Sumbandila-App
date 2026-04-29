"use client";

import { Activity, Users, ShieldAlert, CheckSquare, BarChart3, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const stats = [
    { label: "Youth Registered", value: "1.2M", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Active Learners", value: "540K", icon: Activity, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Jobs Filled", value: "120K", icon: CheckSquare, color: "text-green-500", bg: "bg-green-50" },
    { label: "Programs & Hubs", value: "405", icon: BarChart3, color: "text-amber-500", bg: "bg-amber-50" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 mb-2">National Dashboard</h1>
        <p className="text-slate-500 font-medium">System monitoring and service verification analytics.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.bg} ${s.color}`}>
                <s.icon size={20} />
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 mb-1">{s.label}</p>
              <h3 className="text-3xl font-black text-slate-900">{s.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Applications Panel */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black text-slate-900">Recent Applications</h2>
            <Link href="/admin/applications" className="text-sm font-bold text-[#007749] flex items-center hover:underline">
              View All <ChevronRight size={16} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Applicant</th>
                  <th className="pb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Service</th>
                  <th className="pb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Status</th>
                  <th className="pb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { name: "Sipho Mokoena", service: "Youth Skills Funding", status: "In Review", color: "text-blue-600 bg-blue-50 border-blue-200" },
                  { name: "Lerato Ndlovu", service: "NSFAS Application", status: "Pending", color: "text-amber-600 bg-amber-50 border-amber-200" },
                  { name: "Johan van der Merwe", service: "Business Registration", status: "Approved", color: "text-green-600 bg-green-50 border-green-200" },
                  { name: "Naledi Khumalo", service: "Housing Grant", status: "Rejected", color: "text-red-600 bg-red-50 border-red-200" },
                ].map((app, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 font-bold text-slate-900 text-sm">{app.name}</td>
                    <td className="py-4 text-slate-600 font-medium text-sm">{app.service}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border ${app.color}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <Link href={`/admin/applications/demo-${i}`} className="text-xs font-bold bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:border-[#007749] hover:text-[#007749] transition-colors">
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-md relative overflow-hidden flex flex-col">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#007749] via-[#FFB81C] to-[#E03C31]" />
          <h2 className="text-xl font-black mb-6 flex items-center gap-2"><BarChart3 size={20} className="text-[#FFB81C]" /> System Health</h2>
          
          <div className="flex-grow space-y-6">
            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/50 mb-2">
                <span>Verification Engine</span>
                <span className="text-emerald-400">99.9%</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full w-[99.9%]" />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/50 mb-2">
                <span>Database Sync</span>
                <span className="text-emerald-400">Optimal</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full w-full" />
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mt-8">
              <p className="text-xs font-bold text-white/70 leading-relaxed">
                All national verification services are currently operational. Fraud detection models are running at normal capacity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
