export default function AccessControlPanel() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition shadow-xl shadow-black/20">
      <h2 className="text-lg font-bold">Access Control</h2>
      <p className="text-gray-400 text-xs mt-2 font-medium">
        Workforce access governance and permission enforcement.
      </p>

      <div className="mt-5 space-y-3 text-sm">
        <Row label="Admins" value="3" />
        <Row label="Managers" value="12" />
        <Row label="Standard Users" value="228" />
        <Row label="Access Violations" value="0" color="text-green-400" />
      </div>

      <a href="/admin" className="block w-full">
        <button className="mt-6 w-full bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95">
          Review Access Policies
        </button>
      </a>
    </div>
  );
}

function Row({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3">
      <p className="text-gray-400 text-xs font-medium">{label}</p>
      <p className={`text-sm font-bold ${color ?? "text-white"}`}>{value}</p>
    </div>
  );
}
