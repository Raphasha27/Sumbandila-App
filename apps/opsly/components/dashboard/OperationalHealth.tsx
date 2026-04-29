"use client";

export default function OperationalHealth() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Operational Health</h2>
        <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full border border-green-500/20 font-bold">Stable</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <HealthCard title="Compliance Status" value="OK" detail="Last audit: Today" color="text-green-400" />
        <HealthCard title="Security Status" value="Stable" detail="Real-time monitoring" color="text-blue-400" />
        <HealthCard title="Activity Level" value="Moderate" detail="+12% vs yesterday" color="text-yellow-400" />
        <HealthCard title="Pending Approvals" value="2" detail="Requires action" color="text-pink-400" />
      </div>
    </section>
  );
}

function HealthCard({ title, value, detail, color }: { title: string; value: string; detail: string; color: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.08] transition shadow-xl shadow-black/20">
      <p className="text-gray-400 text-xs font-medium mb-2">{title}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-[10px] text-gray-500 mt-2 font-medium italic">{detail}</p>
    </div>
  );
}
