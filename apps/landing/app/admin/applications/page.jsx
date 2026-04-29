"use client";

import { CheckSquare, Search, Filter } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AdminApplicationsPage() {
  const [search, setSearch] = useState("");

  const mockApplications = [
    { id: "APP-9824X", name: "Sipho Mokoena", service: "Youth Skills Funding", province: "Gauteng", status: "In Review", color: "text-blue-600 bg-blue-50 border-blue-200", date: "2026-04-29" },
    { id: "APP-7721Y", name: "Lerato Ndlovu", service: "NSFAS Application", province: "KZN", status: "Pending", color: "text-amber-600 bg-amber-50 border-amber-200", date: "2026-04-28" },
    { id: "APP-5510Z", name: "Johan van der Merwe", service: "Business Registration", province: "Western Cape", status: "Approved", color: "text-green-600 bg-green-50 border-green-200", date: "2026-04-27" },
    { id: "APP-3392A", name: "Naledi Khumalo", service: "Housing Grant", province: "Limpopo", status: "Rejected", color: "text-red-600 bg-red-50 border-red-200", date: "2026-04-27" },
    { id: "APP-2281B", name: "Thabo Mokoena", service: "Hospital Admission", province: "Gauteng", status: "In Review", color: "text-blue-600 bg-blue-50 border-blue-200", date: "2026-04-26" },
  ];

  const filtered = mockApplications.filter(app => 
    app.name.toLowerCase().includes(search.toLowerCase()) || 
    app.service.toLowerCase().includes(search.toLowerCase()) ||
    app.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2 flex items-center gap-3">
            <CheckSquare className="text-[#007749]" size={32} /> Applications Management
          </h1>
          <p className="text-slate-500 font-medium">Review, approve, reject, and monitor all citizen applications.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by ID, applicant name, or service..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 py-3 text-sm font-medium outline-none focus:border-[#007749] focus:bg-white transition-colors"
          />
        </div>
        <div className="relative md:w-64">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <select className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 py-3 text-sm font-medium outline-none focus:border-[#007749] appearance-none">
            <option>All Statuses</option>
            <option>Pending</option>
            <option>In Review</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Reference ID</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Applicant</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Service</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Province</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Date</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Status</th>
                <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-4 px-6 font-bold text-slate-900 text-sm">{app.id}</td>
                  <td className="py-4 px-6 font-bold text-slate-700 text-sm">{app.name}</td>
                  <td className="py-4 px-6 text-slate-600 font-medium text-sm">{app.service}</td>
                  <td className="py-4 px-6 text-slate-600 font-medium text-sm">{app.province}</td>
                  <td className="py-4 px-6 text-slate-500 font-medium text-sm">{app.date}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full border ${app.color}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link href={`/admin/applications/${app.id}`} className="inline-block text-xs font-bold bg-white border border-slate-200 px-4 py-2 rounded-lg hover:border-[#007749] hover:text-[#007749] shadow-sm transition-colors group-hover:bg-[#0E3B29] group-hover:text-white group-hover:border-[#0E3B29]">
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-500 font-medium">
                    No applications found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
