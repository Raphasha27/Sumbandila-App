import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, ShieldCheck, Database, Map, BarChart3, 
  Bell, UserCircle, Globe, LayoutGrid, ChevronRight,
  Cpu, FileCode, Workflow
} from 'lucide-react';
import { MOCK_DATA } from './lib/mock-data';

export default function Dashboard({ onVerify }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="sentinel-hub">
      <div className="hub-overlay" />
      
      {/* Top Navigation Bar */}
      <div style={{ width: '100%', maxWidth: '1400px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '50px', height: '50px', background: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <ShieldCheck size={32} />
          </div>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--primary-dark)' }}>SUMBANDILA</h1>
            <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>National Registry Sentinel</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '14px', fontWeight: 800 }}>Dakalo Mashau</p>
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#22C55E' }}>SECURE ACCESS ACTIVE</p>
          </div>
          <UserCircle size={48} color="var(--primary)" />
        </div>
      </div>

      <div className="hub-container">
        
        {/* CARD 1: HOME & VERIFICATION (CENTRAL) */}
        <motion.div className="sentinel-card home-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card-header">
            <h3>Home & Verification</h3>
            <Globe size={18} color="var(--primary)" />
          </div>
          <div className="search-registry">
            <h2 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '4px' }}>SEARCH REGISTRY</h2>
            <p style={{ fontSize: '12px', opacity: 0.8 }}>Access Vetted National Records</p>
            <div className="search-input-wrapper">
              <Search size={18} color="#94A3B8" />
              <input 
                type="text" 
                placeholder="Search Name or ID..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onVerify(searchQuery)}
              />
            </div>
          </div>
          <div className="card-content" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
               <div style={{ background: '#F1F5F9', padding: '16px', borderRadius: '16px', flex: 1 }}>
                  <ShieldCheck size={32} color="var(--primary)" style={{ marginBottom: '8px' }} />
                  <p style={{ fontSize: '12px', fontWeight: 800 }}>Verify School</p>
               </div>
               <div style={{ background: '#F1F5F9', padding: '16px', borderRadius: '16px', flex: 1 }}>
                  <Database size={32} color="var(--primary)" style={{ marginBottom: '8px' }} />
                  <p style={{ fontSize: '12px', fontWeight: 800 }}>Data Hub</p>
               </div>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--primary-dark)', marginBottom: '8px' }}>WELCOME TO <br/> SUMBANDILA</h2>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '32px' }}>
              Your secure gateway to official, verified information from verified government departments.
              <br/><br/>
              <span style={{ fontWeight: 800, fontSize: '10px' }}>(VETTED BY: DEPARTMENT OF BASIC EDUCATION & SA COUNCIL FOR EDUCATORS)</span>
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button className="btn-primary" onClick={() => onVerify(searchQuery)}>EXPLORE THE REGISTRY</button>
              <button className="btn-outline">JOIN AS A PROFESSIONAL</button>
            </div>
            <p style={{ marginTop: '24px', fontSize: '12px', fontWeight: 700, color: 'var(--primary)', cursor: 'pointer' }}>SUPPORT</p>
          </div>
        </motion.div>

        {/* CARD 2: DATA & COMPLIANCE */}
        <motion.div className="sentinel-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="card-header">
            <h3>Data & Compliance</h3>
            <Database size={18} color="var(--primary)" />
          </div>
          <div className="card-content">
            <div style={{ background: 'var(--primary-dark)', borderRadius: '16px', padding: '16px', color: 'white', marginBottom: '24px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 800 }}>DATA SOVEREIGNTY DASHBOARD</h4>
            </div>
            <div className="node-list">
              <div className="node-item">
                 <div>
                   <p style={{ fontSize: '12px', fontWeight: 800 }}>BLOCKCHAIN NODES (6)</p>
                   <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Status: Operational</p>
                 </div>
                 <div className="status" />
              </div>
              <div className="node-item">
                 <p style={{ fontSize: '12px', fontWeight: 800 }}>AUDIT TRAIL LOGS</p>
                 <ChevronRight size={16} color="#94A3B8" />
              </div>
              <div className="node-item">
                 <p style={{ fontSize: '12px', fontWeight: 800 }}>POLICY REPOSITORY</p>
                 <ChevronRight size={16} color="#94A3B8" />
              </div>
            </div>
            <div style={{ marginTop: '24px', padding: '16px', background: '#EFF6FF', borderRadius: '16px', border: '1px dashed var(--primary)' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary-dark)' }}>LATEST AUDIT: 2026-04-28 15:10 CAT</p>
              <p style={{ fontSize: '10px', color: 'var(--primary)' }}>Integrity Check Passed (99.9%)</p>
            </div>
          </div>
        </motion.div>

        {/* CARD 3: API & INTEGRATION MAP */}
        <motion.div className="sentinel-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="card-header">
            <h3>API & Assessor Map</h3>
            <Workflow size={18} color="var(--primary)" />
          </div>
          <div className="card-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', height: '200px', background: '#F1F5F9', borderRadius: '20px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <div style={{ width: '60px', height: '60px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', zIndex: 2 }}>
                <Cpu size={32} />
              </div>
              {/* Fake Node Lines */}
              <div style={{ position: 'absolute', width: '200px', height: '2px', background: 'var(--primary)', opacity: 0.2, transform: 'rotate(45deg)' }} />
              <div style={{ position: 'absolute', width: '200px', height: '2px', background: 'var(--primary)', opacity: 0.2, transform: 'rotate(-45deg)' }} />
              <div style={{ position: 'absolute', width: '200px', height: '2px', background: 'var(--primary)', opacity: 0.2 }} />
              <div style={{ position: 'absolute', width: '2px', height: '200px', background: 'var(--primary)', opacity: 0.2 }} />
            </div>
            <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary-dark)', marginBottom: '4px' }}>API INTEGRATION MAP</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '24px' }}>Visualizing secure handshake points across government departments.</p>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
               <div className="node-item" style={{ padding: '8px 12px' }}><p style={{ fontSize: '11px', fontWeight: 800 }}>DHET CORE API</p><div className="status" /></div>
               <div className="node-item" style={{ padding: '8px 12px' }}><p style={{ fontSize: '11px', fontWeight: 800 }}>HPCSA LIVE PORTAL</p><div className="status" /></div>
               <div className="node-item" style={{ padding: '8px 12px' }}><p style={{ fontSize: '11px', fontWeight: 800 }}>LPC SECURE HUB</p><div className="status" /></div>
            </div>
          </div>
        </motion.div>

        {/* CARD 4: QUALITY & ALERTS */}
        <motion.div className="sentinel-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="card-header">
            <h3>Quality & Alerts</h3>
            <Bell size={18} color="#EF4444" />
          </div>
          <div className="card-content">
            <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '16px' }}>DATA QUALITY ALERT SYSTEM</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
               <div style={{ background: '#FEF2F2', padding: '16px', borderRadius: '16px', borderLeft: '4px solid #EF4444' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <BarChart3 size={16} color="#EF4444" />
                    <p style={{ fontSize: '11px', fontWeight: 800, color: '#991B1B' }}>Anomalous Pattern Detected</p>
                  </div>
                  <p style={{ fontSize: '10px', color: '#B91C1C' }}>Unusual credential volume from Northern Cape Region. Investigating possible breach.</p>
               </div>
               <div style={{ background: '#FFFBEB', padding: '16px', borderRadius: '16px', borderLeft: '4px solid #F59E0B' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <Globe size={16} color="#F59E0B" />
                    <p style={{ fontSize: '11px', fontWeight: 800, color: '#92400E' }}>External Sync Delayed</p>
                  </div>
                  <p style={{ fontSize: '10px', color: '#B45309' }}>SANC portal undergoing maintenance. Real-time nurse verification offline for 1 hour.</p>
               </div>
            </div>
          </div>
        </motion.div>

        {/* CARD 5: TRENDS & ANALYTICS */}
        <motion.div className="sentinel-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="card-header">
            <h3>Verification Trends</h3>
            <BarChart3 size={18} color="var(--primary)" />
          </div>
          <div className="card-content">
            <p style={{ fontSize: '12px', fontWeight: 800, marginBottom: '16px' }}>REGIONAL VERIFICATION TRENDS</p>
            {/* Fake Heatmap Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px', marginBottom: '24px' }}>
               {[...Array(25)].map((_, i) => (
                 <div key={i} style={{ height: '30px', background: `rgba(37, 99, 235, ${Math.random()})`, borderRadius: '4px' }} />
               ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)' }}>
               <span>LOW DENSITY</span>
               <span>HIGH DENSITY</span>
            </div>
          </div>
        </motion.div>

        {/* CARD 6: SA NATIONAL SENTINEL HUB */}
        <motion.div className="sentinel-card" style={{ background: 'var(--primary-dark)', color: 'white' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <div className="card-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ width: '120px', height: '120px', border: '4px solid white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <div style={{ textAlign: 'center' }}>
                 <p style={{ fontSize: '24px', fontWeight: 900 }}>SA</p>
                 <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px' }}>NATIONAL SENTINEL</p>
                 <p style={{ fontSize: '14px', fontWeight: 900 }}>HUB</p>
              </div>
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '12px' }}>OFFICIAL REGISTRY CONTROL</h2>
            <p style={{ fontSize: '12px', opacity: 0.7, marginBottom: '32px' }}>2026 NATIONAL SENTINEL ADVISORY. <br/> (SA REGISTRATION 2026/001234/07)</p>
            <button className="btn-primary" style={{ background: 'white', color: 'var(--primary-dark)', width: '100%' }}>HUB SETTINGS</button>
          </div>
        </motion.div>

      </div>

      {/* Footer Branding */}
      <div style={{ marginTop: '60px', textAlign: 'center', paddingBottom: '40px' }}>
        <p style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-muted)' }}>© 2026 NATIONAL SENTINEL ADVISORY | POWERED BY SUMBANDILA</p>
      </div>
    </div>
  );
}
