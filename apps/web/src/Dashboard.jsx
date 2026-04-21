import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, School, Stethoscope, Scale, Star, ShieldCheck, QrCode, User as UserIcon, Building2, TrendingUp, Globe, AlertCircle, ExternalLink, ShieldAlert, ArrowRight, Heart, Coins, Navigation2, Radar, Bot } from 'lucide-react';
import { CategoryCard, BottomNav } from '../Navigation';
import { MOCK_DATA } from '../../lib/mock-data';
import { useRegistryStore } from '../../store/useRegistryStore';
import ReportModal from '../Report/ReportModal';
import CheckoutModal from './CheckoutModal';

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
      <div style={{
        background: 'var(--bg-gradient)',
        padding: '24px 20px 48px',
        borderRadius: '0 0 40px 40px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}>
        <div className="scanning-line" />

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', width: '100%', marginBottom: '32px' }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Flag_of_South_Africa.svg/512px-Flag_of_South_Africa.svg.png"
            alt="South Africa Flag"
            style={{ height: '44px', width: 'auto', borderRadius: '6px' }}
          />
          <div style={{ textAlign: 'left', borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, opacity: 0.9, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'white' }}>Republic of South Africa</div>
            <div style={{ fontSize: '26px', fontWeight: 900, marginTop: '2px', lineHeight: 1.1, color: 'white' }}>National Registry Sentinel</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          {/* 🟢 Live Sync Badge - Centered Top */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '24px',
            background: 'rgba(255,255,255,0.15)',
            padding: '4px 12px',
            borderRadius: '100px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ADE80' }}
            />
            <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1.2px' }}>Registry Live Sync</span>
          </div>

          {/* Action Row - Consolidated Card */}
          <div style={{
            display: 'flex',
            gap: '20px',
            marginBottom: '24px',
            background: 'rgba(255,255,255,0.1)',
            padding: '12px 20px',
            borderRadius: '24px',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div onClick={() => onNav('qr-scan')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', width: '60px' }}>
              <QrCode size={20} color="white" />
              <span style={{ fontSize: '10px', fontWeight: 800, opacity: 0.9 }}>Scanner</span>
            </div>
            <div onClick={() => onNav('profile')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', width: '60px' }}>
              <UserIcon size={20} color="white" />
              <span style={{ fontSize: '10px', fontWeight: 800, opacity: 0.9 }}>Profile</span>
            </div>
            <div onClick={() => onNav('alerts')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', width: '60px' }}>
              <TrendingUp size={20} color="white" />
              <span style={{ fontSize: '10px', fontWeight: 800, opacity: 0.9 }}>Alerts</span>
            </div>
            <div onClick={() => onNav('news')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', width: '60px' }}>
              <Globe size={20} color="white" />
              <span style={{ fontSize: '10px', fontWeight: 800, opacity: 0.9 }}>News</span>
            </div>
          </div>
        </div>

        {/* Refined Modern Search Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '8px' }}>
          <div style={{
            flex: 1,
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            borderRadius: '100px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 24px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            height: '56px',
            width: '100%'
          }}>
            <input
              type="text"
              placeholder="Search ID, Name, Medical/Legal Reg, Course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onVerify(searchQuery)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                width: '100%',
                color: 'white',
                fontSize: '15px',
                fontWeight: 600,
                textAlign: 'left'
              }}
            />
            <Search
              size={22}
              color="white"
              style={{ cursor: 'pointer', opacity: 0.9 }}
              onClick={() => onVerify(searchQuery)}
            />
          </div>
        </div>
      </div>

      <div style={{ padding: '32px 20px' }}>

        {/* Quick Voice Access - Sipho AI */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            background: 'white',
            borderRadius: '28px',
            padding: '24px',
            marginBottom: '32px',
            border: '2px solid #F1F5F9',
            boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ position: 'absolute', top: 0, right: 0, height: '4px', width: '100%', background: 'linear-gradient(90deg, #3B82F6, #6366F1)' }} />
          <div style={{ width: '56px', height: '56px', background: 'var(--primary)', borderRadius: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
            <Bot size={28} color="white" />
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '15px', fontWeight: 900, color: '#111827', marginBottom: '4px' }}>Speak to Sipho</h4>
            <p style={{ fontSize: '13px', color: '#64748B', fontWeight: 600, lineHeight: 1.4 }}>
              Record a voice note in your preferred language.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => useRegistryStore.getState().setAiOpen(true)}
            style={{ padding: '10px 16px', borderRadius: '14px', background: 'var(--primary)', border: 'none', color: 'white', fontSize: '12px', fontWeight: 800, cursor: 'pointer' }}
          >
            RECORD
          </motion.button>
        </motion.div>

        {/* Sipho Security Briefing - AI Action Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            background: 'white',
            borderRadius: '28px',
            padding: '24px',
            marginBottom: '32px',
            border: '2px solid #F1F5F9',
            boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ position: 'absolute', top: 0, right: 0, height: '4px', width: '100%', background: 'linear-gradient(90deg, #3B82F6, #6366F1)' }} />
          <div style={{ width: '56px', height: '56px', background: 'var(--primary)', borderRadius: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
            <Bot size={28} color="white" />
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '15px', fontWeight: 900, color: '#111827', marginBottom: '4px' }}>Executive Briefing</h4>
            <p style={{ fontSize: '13px', color: '#64748B', fontWeight: 600, lineHeight: 1.4 }}>
              Sipho has flagged <span style={{ color: '#EF4444', fontWeight: 800 }}>3 new bogus colleges</span> in Gauteng this morning.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ padding: '10px 16px', borderRadius: '14px', background: '#F1F5F9', border: 'none', color: '#111827', fontSize: '12px', fontWeight: 800, cursor: 'pointer' }}
          >
            Read Report
          </motion.button>
        </motion.div>

        {/* Sentinel Danger Zone Tracker */}
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

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>What would you like to verify?</h2>
          <p style={{ color: '#6B7280', fontSize: '15px', fontWeight: 500, marginBottom: '24px' }}>Select a category to begin verification</p>
        </div>

        {/* Category Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
          <CategoryCard
            icon={<School color="white" size={32} />}
            label="Education"
            sublabel="Schools, Colleges & Courses"
            bg="linear-gradient(135deg, #3B82F6, #2563EB)"
            onClick={() => onSelectCategory('Education')}
          />
          <CategoryCard
            icon={<Stethoscope color="white" size={32} />}
            label="Medical"
            sublabel="Doctors & Healthcare Professionals"
            bg="linear-gradient(135deg, #10B981, #059669)"
            onClick={() => onSelectCategory('Healthcare')}
          />
          <CategoryCard
            icon={<Scale color="white" size={32} />}
            label="Legal"
            sublabel="Lawyers & Legal Professionals"
            bg="linear-gradient(135deg, #8B5CF6, #7C3AED)"
            onClick={() => onSelectCategory('Legal')}
          />
        </div>

        {/* Justice & Support Hub Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => onNav('help')}
          style={{
            background: 'var(--bg-gradient)',
            borderRadius: '32px',
            padding: '24px',
            marginBottom: '40px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            cursor: 'pointer',
            boxShadow: '0 15px 35px rgba(37, 99, 235, 0.25)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.1 }}>
            <Scale size={120} color="white" />
          </div>
          <div style={{ width: '60px', height: '60px', borderRadius: '20px', background: 'rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
            <Scale size={32} color="white" />
          </div>
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '4px' }}>Support & Justice Hub</h4>
            <p style={{ fontSize: '13px', opacity: 0.9, lineHeight: 1.4, fontWeight: 500 }}>
              Scammed or Need Help? Verify Student Registration, Law Services, Healthcare Compliance, and more. Protecting our community together.
            </p>
          </div>
          <ArrowRight size={20} style={{ marginLeft: 'auto', flexShrink: 0 }} />
        </motion.div>

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
