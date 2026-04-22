export default function CompliancePanel() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition shadow-xl shadow-black/20">
      <h2 className="text-lg font-bold">Compliance Monitoring</h2>
      <p className="text-gray-400 text-xs mt-2 font-medium">
        Governance posture tracking aligned with enterprise audit readiness.
      </p>

      <div className="mt-6">
        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Compliance Score</p>
        <p className="text-4xl font-black text-green-400 mt-2">92%</p>
        <p className="text-gray-500 text-[10px] mt-1 font-medium italic">
          High confidence. Minor role validation pending.
        </p>
      </div>

      <div className="mt-6 space-y-3 text-sm">
        <ComplianceRow label="Audit Trail Integrity" status="Verified" />
        <ComplianceRow label="Access Policy Review" status="Pending" />
        <ComplianceRow label="Data Retention Rules" status="Active" />
      </div>
    </div>
  );
}

function ComplianceRow({
  label,
  status,
}: {
  label: string;
  status: string;
}) {
  const color =
    status === "Verified"
      ? "text-green-400"
      : status === "Pending"
      ? "text-yellow-400"
      : "text-blue-400";

  return (
    <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3">
      <p className="text-gray-400 text-xs font-medium">{label}</p>
      <p className={`text-sm font-bold ${color}`}>{status}</p>
    </div>
  );
}
