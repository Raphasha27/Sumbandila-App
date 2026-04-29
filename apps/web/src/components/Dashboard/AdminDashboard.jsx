import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Database, AlertTriangle, Users, 
  Activity, BarChart3, Lock, ChevronLeft, 
  Search, FileText, CheckCircle2, XCircle
} from 'lucide-react';

export default function AdminDashboard({ onBack }) {
  const stats = [
    { title: "Education Registry", count: "1,248", sub: "Institutions Registered", icon: Database, color: "#3B82F6" },
    { title: "Healthcare Registry", count: "87,331", sub: "Vetted Professionals", icon: Users, color: "#10B981" },
    { title: "Legal Registry", count: "12,009", sub: "Active Practitioners", icon: BarChart3, color: "#7C3AED" }
  ];

  const recentAlerts = [
    { entity: "Fake Law Consultants", location: "Gauteng", reason: "Fraudulent LPC Numbers", time: "2h ago", severity: "High" },
    { entity: "Metro Tech Academy", location: "Western Cape", reason: "Expired Accreditation", time: "5h ago", severity: "Medium" },
    { entity: "Dr. Fakewell", location: "Online / Unknown", reason: "Impersonation", time: "1d ago", severity: "Critical" }
  ];

  return (
    <div className="screen" style={{ background: '#0B1120', paddingBottom: '100px' }}>
      {/* Admin Header */}
      <div style={{ background: 'linear-gradient(180deg, #1E293B 0%, #0B1120 100%)', padding: '40px 24px 32px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <motion.div 
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <ChevronLeft size={20} color="white" />
          </motion.div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#10B981', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>National Oversight</div>
            <h1 style={{ fontSize: '24px', fontWeight: 900, color: 'white', margin: 0 }}>Sentinel Command Center</h1>
          </div>
        </div>

        <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '12px 16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Activity size={18} color="#10B981" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#10B981' }}>System Status: Operational • All Registries Synced</span>
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        {/* Stats Grid */}
        <div className="grid-layout grid-layout-3" style={{ marginBottom: '32px' }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ background: '#1E293B', padding: '24px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <stat.icon size={22} color={stat.color} />
              </div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: 'white', marginBottom: '4px' }}>{stat.count}</div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: 'white', opacity: 0.9 }}>{stat.title}</div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#94A3B8' }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Fraud Triage */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 900, color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={20} color="#EF4444" />
              Critical Fraud Triage
            </h2>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#EF4444', background: 'rgba(239, 68, 68, 0.1)', padding: '4px 12px', borderRadius: '100px' }}>3 Action Required</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentAlerts.map((alert, i) => (
              <div key={i} style={{ background: '#1E293B', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: alert.severity === 'Critical' ? '#EF4444' : alert.severity === 'High' ? '#F59E0B' : '#3B82F6' }} />
                  <div>
                    <div style={{ fontWeight: 800, color: 'white', fontSize: '15px' }}>{alert.entity}</div>
                    <div style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>{alert.reason} • {alert.location}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#EF4444', marginBottom: '4px' }}>BLOCK PENDING</div>
                  <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>{alert.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 900, color: 'white', marginBottom: '16px' }}>System Administration</h2>
          <div className="grid-layout grid-layout-2">
            {[
              { title: "Manual Validation", icon: CheckCircle2, sub: "Review pending registrations" },
              { title: "Registry Sync", icon: Database, sub: "Trigger external portal scrape" },
              { title: "Audit Log Export", icon: FileText, sub: "Generate POPIA compliant reports" },
              { title: "Security Lockdown", icon: Lock, sub: "Suspend suspicious blocks" }
            ].map((action, i) => (
              <motion.div
                key={i}
                whileTap={{ scale: 0.98 }}
                style={{ background: '#1E293B', padding: '20px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <action.icon size={18} color="#10B981" />
                  <span style={{ fontWeight: 800, color: 'white', fontSize: '14px' }}>{action.title}</span>
                </div>
                <p style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600, margin: 0 }}>{action.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
