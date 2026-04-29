import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, ShieldCheck, Database, Star, ChevronRight,
  School, Stethoscope, Briefcase, TrendingUp,
  ShieldAlert, Activity, ClipboardCheck, Users,
  Globe, LayoutGrid, CheckCircle2, Phone, ArrowRight,
  Gavel, Award, HeartPulse, Scale
} from 'lucide-react';
import { MOCK_DATA } from '../../lib/mock-data';

export default function Dashboard({ onVerify, onSelectCategory }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      onVerify(searchQuery);
    }
  };

  return (
    <div className="screen" style={{ background: 'var(--bg-main)', paddingBottom: '100px' }}>
      {/* Header */}
      <div style={{ padding: '32px 20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.8px', color: 'white' }}>Hello, Koketso 👋</h1>
          <p style={{ fontSize: '14px', color: '#94A3B8', fontWeight: 600 }}>National Registry Oversight</p>
        </div>
        <motion.div 
          whileTap={{ scale: 0.9 }}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '16px',
            background: 'var(--card-bg)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <Users size={22} color="#10B981" />
        </motion.div>
      </div>

      {/* Verification Search Bar */}
      <div style={{ padding: '0 20px 32px' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search by name or registration number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            style={{
              width: '100%',
              padding: '20px 56px 20px 24px',
              borderRadius: '20px',
              border: '1px solid var(--border)',
              background: 'var(--card-bg)',
              fontSize: '16px',
              fontWeight: 600,
              outline: 'none',
              color: 'white',
              boxShadow: 'var(--shadow)'
            }}
          />
          <div 
            onClick={() => onVerify(searchQuery)}
            style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', width: '40px', height: '40px', borderRadius: '12px', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <Search size={20} color="white" />
          </div>
        </div>
      </div>

      {/* Main Registry Modules */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 900, color: 'white' }}>Registry Sentinels</h2>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#10B981', cursor: 'pointer' }}>Real-time Audit</span>
        </div>
        <div className="grid-layout grid-layout-2" style={{ padding: '0 20px' }}>
          {[
            { id: 'Education', title: "Education", icon: School, color: "#10B981", count: "Private Colleges & Schools" },
            { id: 'Healthcare', title: "Healthcare", icon: Stethoscope, color: "#3B82F6", count: "Medical Practitioners" },
            { id: 'Legal', title: "Legal Services", icon: Gavel, color: "#F59E0B", count: "Legal Council" },
            { id: 'Other', title: "Other Services", icon: LayoutGrid, color: "#94A3B8", count: "Coming Soon" }
          ].map((app, i) => (
            <motion.div 
              key={i}
              whileTap={{ scale: 0.98 }}
              onClick={() => app.id !== 'Other' && onSelectCategory(app.id)}
              style={{
                background: 'var(--card-bg)',
                borderRadius: '28px',
                padding: '24px',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                opacity: app.id === 'Other' ? 0.6 : 1
              }}
            >
              <div style={{
                width: '56px',
                height: '56px',
                background: `${app.color}15`,
                borderRadius: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${app.color}30`
              }}>
                <app.icon size={28} color={app.color} />
              </div>
              <div>
                <div style={{ fontWeight: 900, fontSize: '16px', color: 'white', marginBottom: '4px' }}>{app.title}</div>
                <div style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>{app.count}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Public Safety Scam Tracker */}
      <div style={{ padding: '0 20px', marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={20} color="#EF4444" />
            <h2 style={{ fontSize: '20px', fontWeight: 900, color: 'white' }}>Scam Tracker</h2>
          </div>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#EF4444' }}>Live Alerts</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {MOCK_DATA.alerts.slice(0, 2).map((alert, i) => (
            <motion.div 
              key={i}
              style={{
                background: 'rgba(239, 68, 68, 0.05)',
                padding: '20px',
                borderRadius: '24px',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                display: 'flex',
                gap: '16px'
              }}
            >
              <div style={{ width: '4px', height: 'auto', background: '#EF4444', borderRadius: '2px' }} />
              <div>
                <div style={{ fontSize: '15px', fontWeight: 900, color: '#FCA5A5', marginBottom: '4px' }}>{alert.title}</div>
                <p style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.5, fontWeight: 500 }}>{alert.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trusted Resources */}
      <div style={{ padding: '0 20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 900, color: 'white', marginBottom: '16px' }}>Official Resources</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {MOCK_DATA.officialResources.Education.slice(0, 2).map((res, i) => (
            <motion.div 
              key={i}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open(res.url, '_blank')}
              style={{
                background: 'var(--card-bg)',
                padding: '18px 20px',
                borderRadius: '20px',
                border: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Globe size={18} color="#94A3B8" />
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}>{res.name}</span>
              </div>
              <ArrowRight size={16} color="#94A3B8" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
