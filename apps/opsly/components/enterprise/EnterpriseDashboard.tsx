import EnterpriseSidebar from "@/components/enterprise/EnterpriseSidebar";
import EnterpriseTopbar from "@/components/enterprise/EnterpriseTopbar";
import OperationsStatus from "@/components/enterprise/OperationsStatus";
import CompliancePanel from "@/components/enterprise/CompliancePanel";
import AuditFeed from "@/components/enterprise/AuditFeed";
import AccessControlPanel from "@/components/enterprise/AccessControlPanel";
import ExecutionPanel from "@/components/enterprise/ExecutionPanel";

export default function EnterpriseDashboard() {
  return (
    <div className="min-h-screen bg-[#050A14] text-white flex">
      <EnterpriseSidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <EnterpriseTopbar />

        <div className="flex-1 overflow-y-auto px-10 py-8 space-y-8 custom-scrollbar">
          {/* PURPOSE HEADER */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white shadow-sm">
              Enterprise Operations Overview
            </h1>
            <p className="text-gray-400 mt-2 max-w-3xl font-medium leading-relaxed">
              Opsly provides operational visibility, workforce governance, and
              audit-grade accountability for South African enterprises managing
              distributed teams.
            </p>
          </div>

          {/* TOP PURPOSE PANELS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <OperationsStatus />
            <CompliancePanel />
            <AccessControlPanel />
          </div>

          {/* MID PANELS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ExecutionPanel />
            <AuditFeed />
          </div>
        </div>
      </div>
    </div>
  );
}
