import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import AuditLog from "@/components/dashboard/MissedToday";
import OperationalHealth from "@/components/dashboard/OperationalHealth";
import StatCards from "@/components/dashboard/StatCards";
import InvitePanel from "@/components/dashboard/InvitePanel";

export default function DashboardShell() {
  return (
    <div className="min-h-screen bg-[#050A14] text-white flex">
      <Sidebar />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar />

        <div className="flex-1 overflow-y-auto px-10 py-8 space-y-10 custom-scrollbar">
          <header>
            <h1 className="text-3xl font-bold tracking-tight">Enterprise Operations Overview</h1>
            <p className="text-gray-400 mt-2 text-sm max-w-2xl font-medium">
              Monitor workforce access, activity, and execution in real-time. Secure workspace governance for South African organizations.
            </p>
          </header>

          <OperationalHealth />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
               <section>
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Work Execution</h2>
                <StatCards />
              </section>
              
              <section>
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Governance & Access</h2>
                <InvitePanel />
              </section>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Audit Log Feed</h2>
                <AuditLog />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
