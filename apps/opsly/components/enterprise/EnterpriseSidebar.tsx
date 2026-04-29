export default function EnterpriseSidebar() {
  const navItems = [
    { label: "Overview", active: true },
    { label: "Operations", active: false },
    { label: "Audit Logs", active: false },
    { label: "Access Control", active: false },
    { label: "Projects", active: false },
    { label: "Billing", active: false },
    { label: "Settings", active: false },
  ];

  return (
    <aside className="w-[270px] border-r border-white/10 bg-[#050A14] px-6 py-6 flex flex-col hidden md:flex shrink-0">
      <div className="flex items-center gap-2 mb-2">
         <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">O</div>
         <div className="text-xl font-bold tracking-wide">OPSLY</div>
      </div>

      <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest ml-1">
        Enterprise Operations OS
      </p>

      <div className="mt-10">
        <p className="text-gray-500 text-[10px] mb-4 font-bold uppercase tracking-[2px]">Workspace Control</p>

        <nav className="space-y-1 text-sm">
          {navItems.map((item) => (
            <a
              key={item.label}
              className={`block px-3 py-2.5 rounded-lg transition-all ${
                item.active 
                  ? "text-white font-semibold bg-white/5 shadow-sm" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
              href={item.label === "Audit Logs" ? "/admin" : item.label === "Overview" ? "/dashboard" : "/dashboard"}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4 rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
        <p className="text-gray-500 text-[10px] font-bold uppercase mb-2">Active Workspace</p>
        <p className="text-sm font-semibold text-white">Ubuntu Financial Services</p>
        <div className="flex items-center gap-2 mt-2">
           <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
           <p className="text-gray-400 text-[10px] font-medium tracking-tight">Johannesburg, SA</p>
        </div>
      </div>
    </aside>
  );
}
