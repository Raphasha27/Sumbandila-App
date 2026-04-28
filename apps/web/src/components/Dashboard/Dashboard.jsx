import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, ShieldCheck, Database, Map, BarChart3, 
  Bell, UserCircle, Globe, LayoutGrid, ChevronRight,
  Cpu, FileCode, Workflow, School, FileText, CheckCircle2,
  AlertTriangle, Settings, HelpCircle, LogOut, TrendingUp,
  ShieldAlert, Activity, ClipboardCheck, Users
} from 'lucide-react';
import { MOCK_DATA } from '../../lib/mock-data';

// --- SENTINEL MODULES ---

const WelcomePortal = ({ onEnter }) => (
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '24px' }}>
    <p style={{ fontSize: '10px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '8px' }}>GET STARTED</p>
    <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#111827', marginBottom: '16px' }}>WELCOME TO <br/> SUMBANDILA <CheckCircle2 size={20} color="#22C55E" /></h2>
    <p style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.6, marginBottom: '24px' }}>
      Your secure gateway to official, verified information from verified government departments.
    </p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
      <button onClick={onEnter} style={{ background: 'white', border: '2px solid #E2E8F0', padding: '12px', borderRadius: '10px', fontWeight: 800, fontSize: '11px' }}>EXPLORE THE REGISTRY</button>
      <button style={{ background: '#1E40AF', color: 'white', border: 'none', padding: '12px', borderRadius: '100px', fontWeight: 800, fontSize: '11px' }}>JOIN AS A PROFESSIONAL</button>
    </div>
  </div>
);

const SearchRegistry = () => (
  <div style={{ height: '100%' }}>
    <div style={{ background: '#1E40AF', padding: '20px', color: 'white', borderRadius: '16px 16px 0 0' }}>
      <h3 style={{ fontSize: '14px', fontWeight: 900, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '1px' }}>SEARCH REGISTRY</h3>
    </div>
    <div style={{ padding: '20px' }}>
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <input type="text" placeholder="Search Vetted Records" style={{ width: '100%', padding: '10px 16px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '13px' }} />
        <Search size={16} color="#94A3B8" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
          <School size={24} color="#1E40AF" style={{ marginBottom: '8px' }} />
          <div style={{ fontSize: '11px', fontWeight: 800 }}>Verify School</div>
        </div>
        <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
          <UserCircle size={24} color="#1E40AF" style={{ marginBottom: '8px' }} />
          <div style={{ fontSize: '11px', fontWeight: 800 }}>Verify Professional</div>
        </div>
      </div>
    </div>
  </div>
);

const ApiMap = () => (
  <div style={{ height: '100%' }}>
    <div style={{ background: '#1E40AF', padding: '20px', color: 'white', borderRadius: '16px 16px 0 0' }}>
      <h3 style={{ fontSize: '14px', fontWeight: 900, textAlign: 'center', textTransform: 'uppercase' }}>API INTEGRATION MAP</h3>
    </div>
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: '180px', height: '180px', margin: '20px 0' }}>
        <Database size={48} color="#1E40AF" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
        {/* Connection Lines Simulation */}
        {[0, 60, 120, 180, 240, 300].map(deg => (
          <div key={deg} style={{ position: 'absolute', top: '50%', left: '50%', width: '80px', height: '1px', background: '#CBD5E1', transform: `rotate(${deg}deg) translateX(40px)` }} />
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: '9px', fontWeight: 800, color: '#64748B' }}>Secure APIs</div>
        <div style={{ fontSize: '9px', fontWeight: 800, color: '#64748B' }}>Real-time Sync</div>
        <div style={{ fontSize: '9px', fontWeight: 800, color: '#64748B' }}>Reliable Data</div>
      </div>
    </div>
  </div>
);

const RegionalTrends = () => (
  <div style={{ height: '100%' }}>
    <div style={{ background: '#1E40AF', padding: '20px', color: 'white', borderRadius: '16px 16px 0 0' }}>
      <h3 style={{ fontSize: '14px', fontWeight: 900, textAlign: 'center', textTransform: 'uppercase' }}>REGIONAL VERIFICATION TRENDS</h3>
    </div>
    <div style={{ padding: '16px' }}>
      {['South Provinces', 'North Provinces', 'East Provinces'].map(region => (
        <div key={region} style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, marginBottom: '8px' }}>{region}</div>
          <div style={{ display: 'flex', gap: '2px', height: '30px' }}>
             {[...Array(12)].map((_, i) => (
               <div key={i} style={{ flex: 1, background: i % 3 === 0 ? '#EF4444' : i % 2 === 0 ? '#F59E0B' : '#10B981', borderRadius: '2px' }} />
             ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const DevTracker = () => (
  <div style={{ height: '100%' }}>
    <div style={{ background: '#1E40AF', padding: '20px', color: 'white', borderRadius: '16px 16px 0 0' }}>
      <h3 style={{ fontSize: '14px', fontWeight: 900, textAlign: 'center', textTransform: 'uppercase' }}>PROFESSIONAL DEV. TRACKER</h3>
    </div>
    <div style={{ padding: '20px' }}>
      {[
        { label: 'SACE REGISTRATION', val: 75, color: '#22C55E' },
        { label: 'VERIFICATION LEVEL', val: 60, color: '#3B82F6' },
        { label: 'CPD POINTS', val: 40, color: '#F59E0B' },
        { label: 'COMPLIANCE', val: 90, color: '#6366F1' }
      ].map(item => (
        <div key={item.label} style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', fontWeight: 800, marginBottom: '4px' }}>
            <span>{item.label}</span>
            <CheckCircle2 size={12} color={item.color} />
          </div>
          <div style={{ height: '6px', background: '#F1F5F9', borderRadius: '100px', overflow: 'hidden' }}>
            <div style={{ width: `${item.val}%`, height: '100%', background: item.color }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ComplianceRegistry = () => (
  <div style={{ height: '100%' }}>
    <div style={{ background: '#1E40AF', padding: '20px', color: 'white', borderRadius: '16px 16px 0 0' }}>
      <h3 style={{ fontSize: '14px', fontWeight: 900, textAlign: 'center', textTransform: 'uppercase' }}>POLICY & COMPLIANCE REGISTRY</h3>
    </div>
    <div style={{ padding: '20px' }}>
      {[
        'REGULATORY STANDARDS', 'DATA PROTECTION', 'AUDIT TRAILS',
        'RISK MANAGEMENT', 'ACCESS CONTROL', 'LEGAL FRAMEWORK'
      ].map(policy => (
        <div key={policy} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <CheckCircle2 size={14} color="#22C55E" />
          <span style={{ fontSize: '10px', fontWeight: 700, color: '#334155' }}>{policy}</span>
        </div>
      ))}
      <div style={{ marginTop: '16px', background: '#1E40AF', color: 'white', padding: '10px', borderRadius: '8px', textAlign: 'center', fontSize: '10px', fontWeight: 800 }}>
        ALIGNED TO SA GOVERNMENT STANDARDS
      </div>
    </div>
  </div>
);

const AssessorPortal = () => (
  <div style={{ height: '100%' }}>
    <div style={{ background: '#1E40AF', padding: '20px', color: 'white', borderRadius: '16px 16px 0 0' }}>
      <h3 style={{ fontSize: '14px', fontWeight: 900, textAlign: 'center', textTransform: 'uppercase' }}>ACCREDITED ASSESSORS PORTAL</h3>
    </div>
    <div style={{ padding: '20px' }}>
      {[
        { icon: <Database size={16}/>, label: 'DBE/SAQA Standards' },
        { icon: <Users size={16}/>, label: 'Community Focused' },
        { icon: <Activity size={16}/>, label: 'Wider Recognition' },
        { icon: <School size={16}/>, label: 'Work with Institutions' }
      ].map(item => (
        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
          {item.icon}
          <span style={{ fontSize: '11px', fontWeight: 700 }}>{item.label}</span>
        </div>
      ))}
    </div>
  </div>
);

const QualityAlerts = () => (
  <div style={{ height: '100%' }}>
    <div style={{ background: '#1E40AF', padding: '20px', color: 'white', borderRadius: '16px 16px 0 0' }}>
      <h3 style={{ fontSize: '14px', fontWeight: 900, textAlign: 'center', textTransform: 'uppercase' }}>DATA QUALITY ALERT SYSTEM</h3>
    </div>
    <div style={{ padding: '20px' }}>
      {[
        'REAL-TIME INSIGHT TICKETS',
        'DATA QUALITY FLAGS',
        'AUTO-NOTIFICATIONS',
        'ANALYTICS DASHBOARD'
      ].map(alert => (
        <div key={alert} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #F1F5F9' }}>
          <span style={{ fontSize: '11px', fontWeight: 800 }}>{alert}</span>
          <AlertTriangle size={14} color="#EF4444" />
        </div>
      ))}
      <div style={{ marginTop: '16px', background: '#1E40AF', color: 'white', padding: '12px', borderRadius: '8px', textAlign: 'center', fontSize: '11px', fontWeight: 900 }}>
        BETTER DATA. BETTER DECISIONS.
      </div>
    </div>
  </div>
);

// --- MAIN DASHBOARD ---

export default function Dashboard({ onVerify }) {
  const [activeModule, setActiveModule] = useState(null);

  const modules = [
    { id: 'welcome', component: <WelcomePortal onEnter={() => setActiveModule('search')} />, title: 'Home' },
    { id: 'search', component: <SearchRegistry />, title: 'Search' },
    { id: 'api', component: <ApiMap />, title: 'API Integration' },
    { id: 'trends', component: <RegionalTrends />, title: 'Regional Trends' },
    { id: 'tracker', component: <DevTracker />, title: 'Professional Tracker' },
    { id: 'compliance', component: <ComplianceRegistry />, title: 'Compliance' },
    { id: 'assessors', component: <AssessorPortal />, title: 'Assessors' },
    { id: 'alerts', component: <QualityAlerts />, title: 'Quality Alerts' }
  ];

  return (
    <div className="hub-container" style={{ 
      minHeight: '100vh', 
      background: '#F8FAFC', 
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
      {/* Responsive Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '24px',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%'
      }}>
        {modules.map((mod) => (
          <motion.div
            key={mod.id}
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
            style={{ 
              background: 'white', 
              borderRadius: '24px', 
              overflow: 'hidden', 
              boxShadow: '0 10px 20px rgba(0,0,0,0.04)',
              border: '1px solid #F1F5F9',
              minHeight: '380px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {mod.component}
            <div style={{ marginTop: 'auto', padding: '16px', textAlign: 'center', borderTop: '1px solid #F1F5F9' }}>
               <span style={{ fontSize: '11px', fontWeight: 800, color: '#1E40AF', textTransform: 'uppercase', cursor: 'pointer', textDecoration: 'underline' }}>SUPPORT</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Responsive Footer Info */}
      <div style={{ textAlign: 'center', padding: '40px 0', borderTop: '1px solid #E2E8F0', marginTop: 'auto' }}>
        <p style={{ fontSize: '10px', fontWeight: 800, color: '#94A3B8', marginBottom: '4px' }}>© 2026 NATIONAL SENTINEL ADVISORY</p>
        <p style={{ fontSize: '9px', fontWeight: 700, color: '#CBD5E1' }}>(SA REGISTRATION 2026/001234/07)</p>
      </div>
    </div>
  );
}
