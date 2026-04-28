import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, School, Stethoscope, Scale, Star, ShieldCheck, QrCode, User as UserIcon, Building2, TrendingUp, Globe, AlertCircle, ExternalLink, ShieldAlert, ArrowRight, Heart, Coins, Navigation2, Radar, Bot, GraduationCap, Activity, ChevronRight, History, Mic, CheckCircle2 } from 'lucide-react';
import { CategoryCard, BottomNav } from '../Navigation';
import { MOCK_DATA } from '../../lib/mock-data';
import { useRegistryStore } from '../../store/useRegistryStore';
import ReportModal from '../Report/ReportModal';
import CheckoutModal from './CheckoutModal';
import { SumbandilaLogo } from '../Branding/Logo';

export default function Dashboard({ onVerify, onSelectCategory, onNav }) {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState('auditor');
  const [isTracking, setIsTracking] = useState(false);
  const [trackerStatus, setTrackerStatus] = useState('Standby');
  const {
    searchQuery,
    setSearchQuery,
    integrityPulse,
    updateIntegrity
  } = useRegistryStore();


  useEffect(() => {
    const interval = setInterval(() => {
      updateIntegrity();
    }, 5000);
    return () => clearInterval(interval);
  }, [updateIntegrity]);

  const toggleTracker = () => {
    if (!isTracking) {
      if ("geolocation" in navigator) {
        setTrackerStatus('Initializing GPS...');
        navigator.geolocation.getCurrentPosition(
          () => {
            setIsTracking(true);
            setTrackerStatus('Sentinel Active');
            alert("Sentinel Tracker Activated. We will alert you if you enter high-fraud 'Danger Zones'.");
          },
          () => {
            alert("Please enable location services to use the Danger Zone Tracker.");
            setTrackerStatus('Standby');
          }
        );
      }
    } else {
      setIsTracking(false);
      setTrackerStatus('Standby');
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="dashboard-container registry-grid-bg"
      style={{ background: '#FDFCFB', minHeight: '100vh', paddingBottom: '80px' }}
    >
      {/* Header */}
      {/* Official Registry Header */}
      <div style={{
        background: 'var(--bg-gradient)',
        padding: '28px 20px 48px',
        borderRadius: '0 0 40px 40px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}>
        <div className="scanning-line" />

        {/* 🇿🇦 Consistent SA National Branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', width: '100%', marginBottom: '28px' }}>
          <div style={{ background: 'white', padding: '4px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
            <SumbandilaLogo size={48} />
          </div>
          <div style={{ textAlign: 'left', borderLeft: '1px solid rgba(255,255,255,0.3)', paddingLeft: '20px' }}>
            <div style={{ fontSize: '11px', fontWeight: 900, opacity: 0.9, textTransform: 'uppercase', letterSpacing: '2px', color: 'white' }}>Republic of South Africa</div>
            <div style={{ fontSize: '24px', fontWeight: 900, marginTop: '2px', lineHeight: 1.1, color: 'white', letterSpacing: '-0.5px' }}>National Registry Sentinel</div>
          </div>
        </div>

        {/* Personalized Welcome */}
        <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', padding: '20px', borderRadius: '28px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '24px', textAlign: 'left', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 900, color: 'var(--primary)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>
              {user?.avatar || '👤'}
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 900, color: 'white', margin: 0 }}>Molo, {user?.name.split(' ')[0] || 'Citizen'}!</h2>
              <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>Registry Status: <span style={{ color: '#4ADE80' }}>Secure & Vetted</span></p>
            </div>
          </div>
        </div>

        {/* Integrated Official Search */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', gap: '12px' }}>
          <div style={{
            flex: 1,
            background: 'white',
            borderRadius: '100px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 24px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            height: '60px',
            border: '2px solid transparent'
          }}>
            <Search size={22} color="var(--primary)" style={{ opacity: 0.7 }} />
            <input
              type="text"
              placeholder="Search Name, ID or Registration Number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onVerify(searchQuery)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                width: '100%',
                color: '#1E293B',
                fontSize: '16px',
                fontWeight: 600,
                textAlign: 'left',
                paddingLeft: '16px'
              }}
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => alert("📷 Initializing Sentinel QR Scanner...\n\nPoint your camera at the HPCSA Digital Practitioner Card or LPC Fidelity Certificate to verify instantly.")}
            style={{
              width: '60px',
              height: '60px',
              background: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--primary)'
            }}
          >
            <QrCode size={24} />
          </motion.button>
        </div>
      </div>

      {/* 📡 SENTINEL PULSE TICKER: Live Registry Connectivity */}
      <div style={{
        background: '#1E293B',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ADE80', boxShadow: '0 0 10px #4ADE80' }} />
          <span style={{ color: 'white', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px' }}>DHET SYNC: MARCH 23, 2026</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ADE80', boxShadow: '0 0 10px #4ADE80' }} />
          <span style={{ color: 'white', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px' }}>HPCSA: LIVE LINK ACTIVE</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ADE80', boxShadow: '0 0 10px #4ADE80' }} />
          <span style={{ color: 'white', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px' }}>LPC: UNIFIED SEARCH ONLINE</span>
        </div>
      </div>

      <div style={{ padding: '24px 20px' }}>
        {/* 🇿🇦 PRIMARY ACTIONS: Categories */}
        <div style={{ textAlign: 'left', marginBottom: '32px', marginTop: '8px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#111827', marginBottom: '8px' }}>What would you like to verify?</h2>
          <p style={{ color: '#64748B', fontSize: '15px', fontWeight: 600 }}>Select a category to begin official verification</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '40px' }}>
          {[
            { id: 'Education', icon: GraduationCap, color: '#2563EB', bg: '#EFF6FF', label: 'Education', desc: 'Schools & Colleges' },
            { id: 'Medical', icon: Activity, color: '#059669', bg: '#ECFDF5', label: 'Medical', desc: 'Doctors & Clinics' },
            { id: 'Legal', icon: Scale, color: '#7C3AED', bg: '#F5F3FF', label: 'Legal', desc: 'Lawyers & Firms' },
            { id: 'Support', icon: ShieldAlert, color: '#DC2626', bg: '#FEF2F2', label: 'Justice Hub', desc: 'Scammed? Help' }
          ].map((cat) => (
            <motion.div
              key={cat.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => cat.id === 'Support' ? onNav('support-hub') : onSelectCategory(cat.id)}
              style={{
                background: 'white',
                padding: '24px 20px',
                borderRadius: '28px',
                border: '1px solid #F1F5F9',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
              }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <cat.icon size={24} color={cat.color} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '17px', color: '#111827' }}>{cat.label}</div>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, marginTop: '2px' }}>{cat.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 📊 SECURITY INSIGHTS */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#111827' }}>Security Insights</h3>
              <p style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>National Registry Health Status</p>
            </div>
            <div style={{ padding: '8px 16px', background: '#F0FDF4', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E' }} />
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#166534' }}>LIVE STATUS</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <div style={{ background: 'white', padding: '16px', borderRadius: '24px', border: '1px solid #F1F5F9' }}>
              <div style={{ fontSize: '10px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '4px' }}>Integrity Score</div>
              <div style={{ fontSize: '22px', fontWeight: 900, color: 'var(--primary)' }}>98.28%</div>
            </div>
            <div style={{ background: 'white', padding: '16px', borderRadius: '24px', border: '1px solid #F1F5F9' }}>
              <div style={{ fontSize: '10px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '4px' }}>Vetted Today</div>
              <div style={{ fontSize: '22px', fontWeight: 900, color: '#059669' }}>1,248</div>
            </div>
            <div style={{ background: 'white', padding: '16px', borderRadius: '24px', border: '1px solid #F1F5F9' }}>
              <div style={{ fontSize: '10px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '4px' }}>Pro Vetted</div>
              <div style={{ fontSize: '22px', fontWeight: 900, color: 'var(--primary-orange)' }}>45k+</div>
            </div>
          </div>
        </div>

        {/* 🚨 SENTINEL SCAM TRACKER */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#111827' }}>Sentinel Scam Tracker</h3>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#DC2626', textTransform: 'uppercase', letterSpacing: '1px' }}>Live Alerts</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {MOCK_DATA.alerts?.map((alert) => (
              <div key={alert.id} style={{ background: 'white', padding: '20px', borderRadius: '24px', border: '1px solid #FEE2E2', borderLeft: '6px solid #DC2626' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 900, color: '#DC2626', textTransform: 'uppercase' }}>{alert.category} · {alert.risk} Risk</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8' }}>{alert.date}</span>
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>{alert.title}</h4>
                <p style={{ fontSize: '13px', color: '#4B5563', lineHeight: 1.5, marginBottom: '12px' }}>{alert.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Source: {alert.source}</div>
                  <button style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: 800, fontSize: '12px', cursor: 'pointer' }}>View Alert</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🚀 Pitch Highlight: Live Registry Scraper Simulation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
            borderRadius: '28px',
            padding: '24px',
            marginBottom: '32px',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '56px', height: '56px', background: 'rgba(255,255,255,0.1)', borderRadius: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
              <Radar size={28} color="#38BDF8" />
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '16px', fontWeight: 900, color: 'white', marginBottom: '4px' }}>Live Portal Scraper</h4>
              <p style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600, lineHeight: 1.4 }}>
                Synchronize with DHET, HPCSA, and LPC databases in real-time.
              </p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                alert("🚀 Initializing Sentinel Scrape Engine...\n\n1. Connecting to DHET 'Bogus Colleges' Register...\n2. Cross-referencing HPCSA Active Practitioners...\n3. Auditing LPC Fidelity Fund Certificates...\n\n✅ Sync Complete: 12 New Alerts Found.");
              }}
              style={{
                padding: '12px 20px',
                borderRadius: '16px',
                background: '#38BDF8',
                border: 'none',
                color: '#0F172A',
                fontSize: '12px',
                fontWeight: 900,
                cursor: 'pointer'
              }}
            >
              RUN SYNC
            </motion.button>
          </div>
        </motion.div>

        {/* 🏛️ OFFICIAL RESOURCE HUB */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            background: isTracking ? '#FEF2F2' : '#F8FAFC',
            borderRadius: '28px',
            padding: '24px',
            marginBottom: '32px',
            border: isTracking ? '2px solid #FEE2E2' : '2px solid #F1F5F9',
            boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {isTracking && (
            <motion.div
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, #EF4444 0%, transparent 70%)' }}
            />
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', position: 'relative', zIndex: 1 }}>
            <div style={{
              width: '56px',
              height: '56px',
              background: isTracking ? '#EF4444' : 'var(--primary)',
              borderRadius: '18px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
            }}>
              {isTracking ? <Radar size={28} color="white" /> : <Navigation2 size={28} color="white" />}
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '16px', fontWeight: 900, color: '#111827', marginBottom: '4px' }}>Danger Zone Tracker</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '8px', height: '8px', background: isTracking ? '#EF4444' : '#94A3B8', borderRadius: '50%' }} />
                <span style={{ fontSize: '11px', fontWeight: 800, color: isTracking ? '#B91C1C' : '#64748B', textTransform: 'uppercase' }}>{trackerStatus}</span>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleTracker}
              style={{
                padding: '12px 20px',
                borderRadius: '16px',
                background: isTracking ? '#111827' : 'var(--primary)',
                border: 'none',
                color: 'white',
                fontSize: '12px',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              {isTracking ? 'DEACTIVATE' : 'ACTIVATE'}
            </motion.button>
          </div>

          {isTracking && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              style={{ marginTop: '20px', padding: '16px', background: 'white', borderRadius: '20px', border: '1px solid #FEE2E2' }}
            >
              <div style={{ fontSize: '12px', color: '#111827', fontWeight: 800, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldAlert size={14} color="#EF4444" />
                Real-time Fraud Awareness
              </div>
              <p style={{ fontSize: '11px', color: '#64748B', lineHeight: 1.5, fontWeight: 600 }}>
                Sentinel is monitoring your coordinates. High-risk &apos;Bogus College&apos; clusters detected in <span style={{ color: '#111827', fontWeight: 800 }}>Braamfontein, JHB</span> and <span style={{ color: '#111827', fontWeight: 800 }}>Pretoria Central</span>. Stay alert.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Live Registry Activity Map Simulation */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: '#F0F9FF', padding: '10px', borderRadius: '16px' }}>
                <Globe size={24} color="var(--primary)" />
              </div>
              <h3 style={{ fontWeight: 800, color: '#111827', fontSize: '20px' }}>Registry Heatmap</h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#E8F5E9', padding: '6px 14px', borderRadius: '100px' }}>
              <div style={{ width: '8px', height: '8px', background: '#4ADE80', borderRadius: '50%' }} />
              <span style={{ fontSize: '11px', fontWeight: 900, color: '#166534' }}>LIVE</span>
            </div>
          </div>

          <div style={{
            height: '220px',
            background: '#F1F5F9',
            borderRadius: '35px',
            position: 'relative',
            overflow: 'hidden',
            border: '2px solid white',
            boxShadow: '0 20px 50px rgba(0,0,0,0.05)'
          }}>
            {/* Simple Mock Map Shape (South Africa) */}
            <div style={{
              position: 'absolute',
              inset: '20px',
              opacity: 0.05,
              backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Map_of_South_Africa_%28provinces%29.svg/1200px-Map_of_South_Africa_%28provinces%29.svg.png")',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }} />

            {/* Simulated Live Pings */}
            {[
              { top: '30%', left: '70%', label: 'Gauteng', color: '#EF4444' },
              { top: '60%', left: '80%', label: 'KZN', color: '#3B82F6' },
              { top: '80%', left: '30%', label: 'Western Cape', color: '#10B981' }
            ].map((ping, idx) => (
              <motion.div
                key={idx}
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 2, delay: idx * 0.5 }}
                style={{
                  position: 'absolute',
                  top: ping.top,
                  left: ping.left,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <div style={{ width: '12px', height: '12px', background: ping.color, borderRadius: '50%', border: '2px solid white', boxShadow: `0 0 10px ${ping.color}` }} />
                <span style={{ position: 'absolute', top: '15px', whiteSpace: 'nowrap', fontSize: '9px', fontWeight: 900, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{ping.label}</span>
              </motion.div>
            ))}

            {/* Activity Ticker Overlay */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'rgba(255,255,255,0.9)',
              padding: '12px 20px',
              backdropFilter: 'blur(10px)',
              borderTop: '1px solid rgba(0,0,0,0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <TrendingUp size={16} color="var(--primary)" />
              <div style={{ flex: 1, fontSize: '11px', fontWeight: 800, color: '#334155' }}>
                <motion.div
                  animate={{ y: [20, 0, 0, -20] }}
                  transition={{ repeat: Infinity, duration: 3, times: [0, 0.1, 0.9, 1] }}
                >
                  NEW VERIFICATION: Netcare Rosebank Hospital • Gauteng
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Support & Sustainability Hub */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ background: '#FFF1F2', padding: '10px', borderRadius: '16px' }}>
              <Heart size={24} color="#E11D48" fill="#E11D48" />
            </div>
            <h3 style={{ fontWeight: 800, color: '#111827', fontSize: '20px' }}>Support & Sustainability</h3>
          </div>

          {/* Subscription Plans */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div className="premium-card" style={{ padding: '20px', background: 'white' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#6366F1', textTransform: 'uppercase', marginBottom: '8px' }}>Individual Auditor</div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#111827' }}>R99<span style={{ fontSize: '14px', fontWeight: 600, color: '#6B7280' }}>/mo</span></div>
              <p style={{ fontSize: '11px', color: '#6B7280', marginTop: '8px', fontWeight: 600 }}>Unlimted verifications & vault storage.</p>
              <button
                onClick={() => { setCheckoutPlan('auditor'); setIsCheckoutOpen(true); }}
                style={{ width: '100%', marginTop: '16px', padding: '10px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', fontSize: '12px', fontWeight: 800, color: '#111827', cursor: 'pointer' }}
              >
                Subscribe
              </button>
            </div>
            <div className="premium-card" style={{ padding: '20px', background: 'white', border: '2px solid var(--primary)' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '8px' }}>Institutional Entity</div>
              <div style={{ fontSize: '24px', fontWeight: 900, color: '#111827' }}>R499<span style={{ fontSize: '14px', fontWeight: 600, color: '#6B7280' }}>/mo</span></div>
              <p style={{ fontSize: '11px', color: '#6B7280', marginTop: '8px', fontWeight: 600 }}>API access & compliance monitoring.</p>
              <button
                onClick={() => { setCheckoutPlan('entity'); setIsCheckoutOpen(true); }}
                style={{ width: '100%', marginTop: '16px', padding: '10px', background: 'var(--primary)', border: 'none', borderRadius: '12px', fontSize: '12px', fontWeight: 800, color: 'white', cursor: 'pointer' }}
              >
                Go Pro
              </button>
            </div>
          </div>

          {/* Donations & Funding */}
          <div style={{ background: '#F8FAFC', borderRadius: '32px', padding: '24px', border: '1px solid #F1F5F9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Coins size={20} color="var(--primary-orange)" />
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#111827' }}>Registry Expansion Fund</div>
            </div>

            <div style={{ width: '100%', height: '8px', background: '#E2E8F0', borderRadius: '4px', marginBottom: '12px', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '65%' }}
                style={{ height: '100%', background: 'linear-gradient(90deg, var(--primary-orange), #FB923C)', borderRadius: '4px' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, color: '#64748B', marginBottom: '20px' }}>
              <span>65% Funded (R1.3M)</span>
              <span>Target: R2.0M</span>
            </div>

            <button
              onClick={() => { setCheckoutPlan('donation'); setIsCheckoutOpen(true); }}
              style={{
                width: '100%',
                padding: '16px',
                background: 'white',
                border: '2px solid #F1F5F9',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
              }}
            >
              <Heart size={18} color="#E11D48" />
              <span style={{ fontWeight: 800, color: '#334155' }}>Make a One-time Donation (ZAR)</span>
            </button>
          </div>
        </div>

        {/* Official Registry Resources */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ background: '#FFF7ED', padding: '10px', borderRadius: '16px' }}>
              <Building2 size={24} color="var(--primary-orange)" />
            </div>
            <h3 style={{ fontWeight: 800, color: '#111827', fontSize: '20px' }}>Official Resources</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
            {Object.entries(MOCK_DATA.officialResources).map(([category, resources]) => (
              <div key={category} className="premium-card" style={{ padding: '24px' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary-orange)', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '1px' }}>{category} Authorities</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {resources.map((res, i) => (
                    <a
                      key={i}
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glow-on-hover"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textDecoration: 'none',
                        color: '#374151',
                        fontSize: '15px',
                        fontWeight: 700,
                        padding: '16px',
                        background: '#F8FAFC',
                        borderRadius: '16px',
                        border: '1px solid #F1F5F9',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <span>{res.name}</span>
                      <ExternalLink size={18} color="#94A3B8" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Registry Footprint Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '32px' }}>
          <div style={{ background: 'white', padding: '16px 8px', borderRadius: '20px', border: '1px solid #F3F4F6', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
            <div style={{ color: 'var(--primary)', fontSize: '18px', fontWeight: 900 }}>2.4k+</div>
            <div style={{ color: '#9CA3AF', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }}>Edu Hubs</div>
          </div>
          <div style={{ background: 'white', padding: '16px 8px', borderRadius: '20px', border: '1px solid #F3F4F6', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
            <div style={{ color: '#10B981', fontSize: '18px', fontWeight: 900 }}>45k+</div>
            <div style={{ color: '#9CA3AF', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }}>Pro Vetted</div>
          </div>
          <div style={{ background: 'white', padding: '16px 8px', borderRadius: '20px', border: '1px solid #F3F4F6', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
            <div style={{ color: 'var(--primary)', fontSize: '18px', fontWeight: 900 }}>100%</div>
            <div style={{ color: '#9CA3AF', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }}>Registry</div>
          </div>
        </div>

        {/* Registry Insights Card */}
        <div style={{ background: '#F9FAFB', borderRadius: '32px', padding: '24px', marginBottom: '32px', border: '1px solid #F3F4F6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontWeight: 800, color: '#111827', fontSize: '18px' }}>Security Insights</h3>
            <div style={{ background: '#E8F5E9', color: '#2E7D32', padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 800 }}>LIVE STATUS</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: 'white', padding: '20px', borderRadius: '24px', border: '1px solid #F3F4F6', textAlign: 'center' }}>
              <div style={{ color: '#6B7280', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Integrity Score</div>
              <motion.div
                key={integrityPulse}
                initial={{ opacity: 0.5, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ color: 'var(--primary-orange)', fontSize: '24px', fontWeight: 900 }}
              >
                {integrityPulse}%
              </motion.div>
            </div>
            <div style={{ background: 'white', padding: '20px', borderRadius: '24px', border: '1px solid #F3F4F6', textAlign: 'center' }}>
              <div style={{ color: '#6B7280', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Vetted Today</div>
              <div style={{ color: '#111827', fontSize: '24px', fontWeight: 900 }}>1,248</div>
            </div>
          </div>
        </div>

        {/* Sentinel Scam Tracker Section */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ background: '#FEF2F2', padding: '10px', borderRadius: '16px' }}>
              <ShieldAlert size={24} color="#EF4444" />
            </div>
            <h3 style={{ fontWeight: 800, color: '#111827', fontSize: '20px' }}>Sentinel Scam Tracker</h3>
            <div style={{ marginLeft: 'auto', background: '#EF4444', color: 'white', padding: '4px 12px', borderRadius: '100px', fontSize: '11px', fontWeight: 900 }}>LIVE ALERTS</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {MOCK_DATA.scamTracker.map((scam) => (
              <motion.div
                key={scam.id}
                whileHover={{ y: -4 }}
                style={{
                  background: 'white',
                  borderRadius: '28px',
                  padding: '24px',
                  border: '1px solid #F3F4F6',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.02)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: scam.riskLevel === 'Critical' ? '#EF4444' : '#F59E0B' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', color: 'var(--primary)', background: '#E0F2FE', padding: '4px 10px', borderRadius: '6px', marginBottom: '8px', display: 'inline-block' }}>
                      {scam.department}
                    </span>
                    <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#111827' }}>{scam.title}</h4>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: scam.riskLevel === 'Critical' ? '#EF4444' : '#F59E0B' }}>
                      {scam.riskLevel} RISK
                    </div>
                  </div>
                </div>

                <p style={{ color: '#4B5563', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
                  {scam.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 600 }}>
                    Source: <span style={{ color: '#4B5563', fontWeight: 800 }}>{scam.source}</span>
                  </div>
                  <a
                    href={scam.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '12px',
                      fontWeight: 800,
                      color: 'var(--primary)',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    View Alert <ExternalLink size={14} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Report Feature */}
        <button
          onClick={() => setIsReportOpen(true)}
          className="glow-on-hover"
          style={{
            width: '100%',
            background: 'white',
            color: '#111827',
            padding: '28px',
            borderRadius: '28px',
            border: '2px dashed #EF4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          <AlertCircle size={24} color="#EF4444" />
          <span style={{ fontWeight: 800, fontSize: '18px' }}>Report Suspicious Entity</span>
        </button>
        {/* Community Impact / Testimonials */}
        <div style={{ marginTop: '48px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ background: '#EEF2FF', padding: '10px', borderRadius: '16px' }}>
              <Star size={24} color="#4F46E5" fill="#4F46E5" />
            </div>
            <h3 style={{ fontWeight: 800, color: '#111827', fontSize: '20px' }}>Citizens&apos; Voices</h3>
          </div>

          <div style={{ display: 'flex', overflowX: 'auto', gap: '20px', paddingBottom: '20px', paddingRight: '20px', scrollbarWidth: 'none' }}>
            {MOCK_DATA.testimonials.map((t) => (
              <motion.div
                key={t.id}
                whileHover={{ y: -5 }}
                style={{
                  minWidth: '300px',
                  background: 'white',
                  borderRadius: '28px',
                  padding: '24px',
                  border: '1px solid #F3F4F6',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
                  <img src={t.image} alt={t.name} style={{ width: '48px', height: '48px', borderRadius: '16px', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: 800, color: '#111827', fontSize: '15px' }}>{t.name}</div>
                    <div style={{ color: '#9CA3AF', fontSize: '12px', fontWeight: 600 }}>{t.location}</div>
                  </div>
                </div>
                <p style={{ color: '#4B5563', fontSize: '14px', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '20px' }}>
                  &quot;{t.text}&quot;
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#F0F9FF', color: '#0369A1', padding: '6px 12px', borderRadius: '100px', fontSize: '11px', fontWeight: 800 }}>
                  <ShieldCheck size={14} />
                  {t.impact}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav active="home" onNav={onNav} />

      <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} plan={checkoutPlan} />
    </motion.div>
  );
}
