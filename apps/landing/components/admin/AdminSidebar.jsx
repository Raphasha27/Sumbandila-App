"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, CheckSquare, ShieldCheck, LogOut } from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/applications", label: "Applications", icon: CheckSquare },
    { href: "/admin/providers", label: "Providers", icon: ShieldCheck },
    { href: "/admin/audit", label: "Audit Logs", icon: FileText },
  ];

  return (
    <aside className="w-72 bg-[#0E3B29] text-white min-h-screen flex flex-col shadow-2xl relative z-20">
      {/* Brand Header */}
      <div className="px-6 py-8 border-b border-white/10">
        <h2 className="text-2xl font-black tracking-tighter text-white">SUMBANDILA</h2>
        <p className="text-[10px] text-[#FFB81C] font-bold uppercase tracking-widest mt-1">National Sentinel Admin</p>
      </div>

      {/* Navigation */}
      <nav className="flex-grow px-4 py-8 space-y-2">
        {links.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors ${
                isActive ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <link.icon size={18} className={isActive ? "text-[#FFB81C]" : ""} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Status */}
      <div className="p-6 border-t border-white/10">
        <div className="bg-black/20 rounded-xl p-4 mb-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 mb-1">System Status</p>
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Secure & Live
          </div>
        </div>
        <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
          <LogOut size={14} /> Exit Portal
        </Link>
      </div>
    </aside>
  );
}
