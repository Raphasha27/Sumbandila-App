export default function AuditFeed() {
  const logs = [
    {
      event: "User role updated",
      detail: "Compliance Officer granted elevated access",
      time: "5 min ago",
      status: "verified",
    },
    {
      event: "New project created",
      detail: "Retail rollout program launched in Gauteng",
      time: "18 min ago",
      status: "verified",
    },
    {
      event: "Access review required",
      detail: "2 users pending role validation",
      time: "1 hour ago",
      status: "pending",
    },
    {
      event: "Audit checkpoint completed",
      detail: "System governance snapshot stored securely",
      time: "3 hours ago",
      status: "verified",
    },
  ];

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl shadow-black/20">
      <h2 className="text-lg font-bold">Audit Activity Feed</h2>
      <p className="text-gray-400 text-xs mt-2 font-medium">
        Immutable audit logs for compliance and operational transparency.
      </p>

      <div className="mt-6 space-y-3">
        {logs.map((log, index) => (
          <div
            key={index}
            className="flex items-start justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-4 hover:border-white/20 transition"
          >
            <div>
              <p className="text-sm font-bold text-white">{log.event}</p>
              <p className="text-gray-400 text-xs mt-1 font-medium">{log.detail}</p>
            </div>

            <div className="text-right">
              <p className="text-[10px] text-gray-500 font-bold">{log.time}</p>
              <p
                className={`text-[10px] font-black mt-1 uppercase tracking-tighter ${
                  log.status === "verified"
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                {log.status}
              </p>
            </div>
          </div>
        ))}
      </div>

      <a href="/admin" className="block w-full">
        <button className="mt-6 w-full bg-white/5 hover:bg-white/10 border border-white/10 transition px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest active:scale-[0.98]">
          View Full Audit Logs
        </button>
      </a>
    </div>
  );
}
