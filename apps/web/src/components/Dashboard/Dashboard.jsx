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

export default function Dashboard({ onVerify }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      onVerify(searchQuery);
    }
  };

  return (
    <div className="screen" style={{ background: 'white', paddingBottom: '100px' }}>
      {/* Header */}
      <div style={{ padding: '32px 20px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.5px' }}>Registry Portal</h1>
          <p style={{ fontSize: '14px', color: '#64748B', fontWeight: 600 }}>Welcome to the Trust Network</p>
        </div>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: '#F1F5F9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}>
          <Users size={22} color="#1E40AF" />
        </div>
      </div>

      {/* Search Section */}
      <div style={{ padding: '0 20px 32px' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search institutions or professionals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            style={{
              width: '100%',
              padding: '16px 48px 16px 20px',
              borderRadius: '16px',
              border: 'none',
              background: '#F1F5F9',
              fontSize: '15px',
              fontWeight: 600,
              outline: 'none',
              color: '#111827'
            }}
          />
          <Search 
            size={20} 
            color="#94A3B8" 
            style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
            onClick={() => onVerify(searchQuery)}
          />
        </div>
      </div>

      {/* Apps for You */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800 }}>Explore Registries</h2>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#007AFF', cursor: 'pointer' }}>See All</span>
        </div>
        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', padding: '0 20px 16px', scrollbarWidth: 'none' }}>
          {[
            { title: "Verify Doctor", icon: Stethoscope, color: "#10B981", sub: "Check HPCSA status" },
            { title: "Check School", icon: School, color: "#3B82F6", sub: "Confirm accreditation" },
            { title: "Legal Council", icon: Gavel, color: "#8B5CF6", sub: "Verify LPC status" },
            { title: "Social Services", icon: HeartPulse, color: "#EC4899", sub: "SACSSP verification" }
          ].map((app, i) => (
            <motion.div 
              key={i}
              whileTap={{ scale: 0.95 }}
              onClick={() => onVerify(app.title)}
              style={{
                minWidth: '160px',
                background: 'white',
                borderRadius: '24px',
                padding: '20px',
                border: '1px solid #F1F5F9',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                background: `${app.color}15`,
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <app.icon size={24} color={app.color} />
              </div>
              <div style={{ fontWeight: 800, fontSize: '15px', marginBottom: '4px' }}>{app.title}</div>
              <div style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>{app.sub}</div>
              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={10} fill="#F59E0B" color="#F59E0B" />
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#64748B' }}>4.9 • Official</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Top Charts */}
      <div style={{ padding: '0 20px', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '16px' }}>Top Verifications</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { name: "Doctor Verification", icon: Stethoscope, color: "#10B981" },
            { name: "School Accreditation", icon: School, color: "#3B82F6" },
            { name: "Legal Practitioner Check", icon: Scale, color: "#6366F1" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileTap={{ scale: 0.98 }}
              style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}
            >
              <span style={{ fontSize: '18px', fontWeight: 900, color: '#CBD5E1', width: '20px' }}>{i + 1}</span>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: '#F8FAFC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #F1F5F9'
              }}>
                <item.icon size={24} color={item.color} />
              </div>
              <div style={{ flex: 1, paddingBottom: '16px', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '15px' }}>{item.name}</div>
                  <div style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>Registry L5 Security</div>
                </div>
                <button style={{
                  background: '#F1F5F9',
                  color: '#007AFF',
                  border: 'none',
                  borderRadius: '100px',
                  padding: '6px 16px',
                  fontWeight: 900,
                  fontSize: '12px'
                }}>ACCESS</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Suggested for You */}
      <div style={{ padding: '0 20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '16px' }}>Suggested for You</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[
            { title: "Talent Marketplace", icon: Award, sub: "Discover verified experts" },
            { title: "Compliance Portal", icon: ShieldCheck, sub: "Institutional checks" }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'linear-gradient(135deg, #F8FAFC, #FFFFFF)',
                padding: '20px',
                borderRadius: '24px',
                border: '1px solid #F1F5F9',
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: '#1E40AF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px'
              }}>
                <item.icon size={20} color="white" />
              </div>
              <div style={{ fontWeight: 800, fontSize: '14px', marginBottom: '4px' }}>{item.title}</div>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>{item.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
}
