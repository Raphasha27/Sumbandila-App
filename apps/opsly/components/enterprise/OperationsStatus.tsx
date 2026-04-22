export default function OperationsStatus() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition shadow-xl shadow-black/20">
      <h2 className="text-lg font-bold">Operations Status</h2>
      <p className="text-gray-400 text-xs mt-2 font-medium">
        Real-time operational stability across your workforce environment.
      </p>

      <div className="mt-5 space-y-3 text-sm">
        <StatusRow label="System Health" value="Stable" color="text-green-400" />
        <StatusRow
          label="Active Workforce"
          value="243 Online"
          color="text-blue-400"
        />
        <StatusRow
          label="Operational Alerts"
          value="0 Detected"
          color="text-green-400"
        />
        <StatusRow
          label="Pending Approvals"
          value="2 Waiting"
          color="text-yellow-400"
        />
      </div>
    </div>
  );
}

function StatusRow({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3">
      <p className="text-gray-400 text-xs font-medium">{label}</p>
      <p className={`text-sm font-bold ${color}`}>{value}</p>
    </div>
  );
}
