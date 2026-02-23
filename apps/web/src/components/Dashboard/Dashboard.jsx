import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, School, Stethoscope, Scale, Wallet, Star, ShieldCheck, Info, FileText, QrCode, User as UserIcon, Building2, Users2, Mic, TrendingUp, Globe, AlertCircle, Activity, Sparkles, Minimize2, ArrowRight, ExternalLink } from 'lucide-react';
import { CategoryCard, BottomNav } from '../Navigation';
import { MOCK_DATA } from '../../lib/mock-data';
import { useRegistryStore } from '../../store/useRegistryStore';
import ReportModal from '../Report/ReportModal';

export default function Dashboard({ onVerify, onSelectCategory }) {
  const [isReportOpen, setIsReportOpen] = React.useState(false);
  const [activeView, setActiveView] = React.useState(null); // 'alerts', 'news', 'profile', 'scanner'
  const {
    user,
    onNav,
    searchQuery,
    setSearchQuery,
    setScreen,
    integrityPulse,
    updateIntegrity
  } = useRegistryStore();

  const handleVoiceCommand = () => {
    const commands = ["Verifying Wits University...", "Scanning legal documents...", "Checking HPCSA database...", "Searching for accredited colleges..."];
    const random = commands[Math.floor(Math.random() * commands.length)];
    alert(`🎙️ Voice Recognition Active: "${random}"`);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      updateIntegrity();
    }, 5000);
    return () => clearInterval(interval);
  }, [updateIntegrity]);
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
        padding: '12px 20px 48px',
        borderRadius: '0 0 40px 40px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}>
        {/* Scanning Line Animation */}
        <div className="scanning-line" />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          {/* 🟢 Live Sync Badge - Centered Top */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px',
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
            <div onClick={() => setActiveView('alerts')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', width: '60px' }}>
              <TrendingUp size={20} color="white" />
              <span style={{ fontSize: '10px', fontWeight: 800, opacity: 0.9 }}>Alerts</span>
            </div>
            <div onClick={() => setActiveView('news')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', width: '60px' }}>
              <Globe size={20} color="white" />
              <span style={{ fontSize: '10px', fontWeight: 800, opacity: 0.9 }}>News</span>
            </div>
          </div>
        </div>

        {/* Refined Modern Search Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', maxWidth: '440px' }}>
            <div style={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              borderRadius: '100px',
              display: 'flex',
              alignItems: 'center',
              padding: '0 20px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              height: '56px'
            }}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onVerify(searchQuery)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 500,
                  textAlign: 'center'
                }}
              />
              <Search
                size={20}
                color="white"
                style={{ cursor: 'pointer', marginLeft: '12px', opacity: 0.8 }}
                onClick={() => onVerify(searchQuery)}
              />
            </div>

            <div
              onClick={handleVoiceCommand}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'var(--primary-orange)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(230, 81, 0, 0.3)',
                flexShrink: 0
              }}
            >
              <Mic size={22} color="white" />
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '32px 20px' }}>

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
            <div style={{ color: '#3B82F6', fontSize: '18px', fontWeight: 900 }}>2.4k+</div>
            <div style={{ color: '#9CA3AF', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }}>Edu Hubs</div>
          </div>
          <div style={{ background: 'white', padding: '16px 8px', borderRadius: '20px', border: '1px solid #F3F4F6', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
            <div style={{ color: '#10B981', fontSize: '18px', fontWeight: 900 }}>45k+</div>
            <div style={{ color: '#9CA3AF', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }}>Pro Vetted</div>
          </div>
          <div style={{ background: 'white', padding: '16px 8px', borderRadius: '20px', border: '1px solid #F3F4F6', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
            <div style={{ color: '#E65100', fontSize: '18px', fontWeight: 900 }}>100%</div>
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
            <h3 style={{ fontWeight: 800, color: '#111827', fontSize: '20px' }}>Citizens' Voices</h3>
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
                  "{t.text}"
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

      <BottomNav active="home" onNav={setScreen} />

      {/* View Overlays */}
      <AnimatePresence>
        {activeView && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'white',
              zIndex: 2000,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#FFF7ED', padding: '10px', borderRadius: '16px' }}>
                  {activeView === 'scanner' && <QrCode color="var(--primary-orange)" />}
                  {activeView === 'profile' && <UserIcon color="var(--primary-orange)" />}
                  {activeView === 'alerts' && <TrendingUp color="var(--primary-orange)" />}
                  {activeView === 'news' && <Globe color="var(--primary-orange)" />}
                </div>
                <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#0F172A', textTransform: 'capitalize' }}>{activeView} Center</h2>
              </div>
              <button
                onClick={() => setActiveView(null)}
                style={{ background: '#F8FAFC', border: 'none', padding: '12px', borderRadius: '16px', cursor: 'pointer' }}
              >
                <Minimize2 size={24} color="#64748B" />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
              {activeView === 'scanner' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
                  <div style={{ width: '300px', height: '300px', border: '2px solid var(--primary-orange)', borderRadius: '48px', position: 'relative', marginBottom: '40px', overflow: 'hidden' }}>
                    <div className="scanning-line" style={{ animationDuration: '2s' }} />
                    <div style={{ position: 'absolute', inset: '40px', border: '2px dashed rgba(249, 115, 22, 0.3)', borderRadius: '32px' }} />
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '16px', color: '#0F172A' }}>Initialize Scanning</h3>
                  <p style={{ color: '#64748B', maxWidth: '300px', fontSize: '16px', lineHeight: 1.5 }}>Point your camera at a Sentinel ID or official QR code to perform a real-time integrity check.</p>
                </div>
              )}

              {activeView === 'profile' && (
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
                    <div style={{ width: '120px', height: '120px', background: 'var(--bg-gradient)', borderRadius: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '40px', fontWeight: 900, marginBottom: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                      {MOCK_DATA.auth.admin.avatar}
                    </div>
                    <h3 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '8px', color: '#0F172A' }}>{MOCK_DATA.auth.admin.name}</h3>
                    <div className="status-badge status-verified" style={{ padding: '6px 16px', fontSize: '12px' }}>L5 Sentinel Clearance</div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ padding: '24px', background: '#F8FAFC', borderRadius: '28px', border: '1px solid #F1F5F9' }}>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '1px' }}>Registry ID</div>
                      <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '17px' }}>SENTINEL-ZA-7790</div>
                    </div>
                    <div style={{ padding: '24px', background: '#F8FAFC', borderRadius: '28px', border: '1px solid #F1F5F9' }}>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '1px' }}>Security Email</div>
                      <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '17px' }}>{MOCK_DATA.auth.admin.email}</div>
                    </div>
                    <div style={{ padding: '24px', background: '#F8FAFC', borderRadius: '28px', border: '1px solid #F1F5F9' }}>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '1px' }}>Active Session</div>
                      <div style={{ fontWeight: 800, color: '#0F172A', fontSize: '17px' }}>Authenticated Device: Primary Hub</div>
                    </div>
                  </div>
                </div>
              )}

              {activeView === 'alerts' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {MOCK_DATA.securityAlerts.map(alert => (
                    <motion.div
                      key={alert.id}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      style={{ padding: '24px', borderRadius: '28px', background: alert.type === 'Critical' ? '#FEF2F2' : '#FFFBEB', border: `1px solid ${alert.type === 'Critical' ? '#FECACA' : '#FEF3C7'}` }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                        <AlertCircle size={20} color={alert.type === 'Critical' ? '#EF4444' : '#F59E0B'} />
                        <span style={{ fontWeight: 900, fontSize: '13px', color: alert.type === 'Critical' ? '#991B1B' : '#92400E', textTransform: 'uppercase', letterSpacing: '1px' }}>{alert.type} Security Log</span>
                      </div>
                      <p style={{ fontSize: '16px', fontWeight: 600, color: '#374151', lineHeight: 1.6 }}>{alert.text}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeView === 'news' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {MOCK_DATA.registryNews.map(news => (
                    <motion.div
                      key={news.id}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="premium-card"
                      style={{ padding: '24px' }}
                    >
                      <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary-orange)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '1px' }}>{news.source}</div>
                      <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A', marginBottom: '10px' }}>{news.title}</h4>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#64748B', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Activity size={14} /> {news.date}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
    </motion.div>
  );
}
