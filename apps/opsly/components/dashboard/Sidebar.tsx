export default function Sidebar() {
  const menuItems = [
    { label: "Overview", active: true },
    { label: "Operations", active: false },
    { label: "Audit Logs", active: false },
    { label: "Projects", active: false },
    { label: "Access Control", active: false },
    { label: "Billing", active: false },
    { label: "Settings", active: false },
  ];

  return (
    <aside className="w-[260px] border-r border-white/10 bg-[#050A14] px-6 py-6 hidden md:block shrink-0">
      <div className="flex items-center gap-2 mb-10">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">O</div>
        <div className="text-xl font-bold tracking-wide">OPSLY</div>
      </div>

      <div>
        <p className="text-gray-500 text-[10px] mb-4 font-bold uppercase tracking-[2px]">Enterprise Governance</p>

        <nav className="space-y-1 text-sm">
          {menuItems.map((item) => (
            <a
              key={item.label}
              className={`block px-3 py-2.5 rounded-lg transition-all ${
                item.active 
                  ? "text-white font-semibold bg-white/5 shadow-sm" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
              href="#"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-auto pt-10">
        <div className="p-4 bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border border-blue-500/20 rounded-xl">
          <p className="text-[10px] font-bold text-blue-400 uppercase mb-2">Security Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-xs text-gray-300">Workspace Secure</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
