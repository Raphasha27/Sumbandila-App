export default function ExecutionPanel() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl shadow-black/20">
      <h2 className="text-lg font-bold">Execution Monitoring</h2>
      <p className="text-gray-400 text-xs mt-2 font-medium">
        Track operational execution across projects and internal workflows.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <KPI label="Active Projects" value="12" />
        <KPI label="Completed Tasks" value="87" />
        <KPI label="Open Requests" value="14" />
        <KPI label="Blocked Workflows" value="2" />
      </div>

      <a href="/dashboard" className="block mt-6 hover:opacity-80 transition cursor-pointer">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 border-l-4 border-l-blue-500">
          <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">High Priority Action</p>
          <p className="text-sm font-bold mt-1 text-white">
            Security Governance Upgrade — Role Mapping Validation
          </p>
          <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] text-gray-500 font-medium italic">Due in 2 days • Compliance Team</span>
              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
          </div>
        </div>
      </a>
    </div>
  );
}

function KPI({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition">
      <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[2px]">{label}</p>
      <p className="text-2xl font-black mt-2 text-white">{value}</p>
    </div>
  );
}
