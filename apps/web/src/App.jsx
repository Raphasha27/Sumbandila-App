import React, { useState, useEffect } from 'react';
console.log("App Component Mounting...");
import { AnimatePresence, motion } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  QrCode,
  Building2
} from 'lucide-react';

import { useRegistryStore } from './store/useRegistryStore';
import { RegistryService } from './services/registryService';

// Modular Components
import LoginScreen from './components/Auth/LoginScreen';
import Dashboard from './components/Dashboard/Dashboard';
import VerifyResult from './components/Verify/VerifyResult';
import Vault from './components/Vault/Vault';
import { BottomNav } from './components/Navigation';
import { MOCK_DATA } from './lib/mock-data';
import SumbandilaAI from './components/SumbandilaAI';

const SAFlag = () => (
  <div style={{ display: 'flex', gap: '2px', height: '6px', width: '100px', marginBottom: '12px' }}>
    <div style={{ flex: 1, background: '#E03C31' }} />
    <div style={{ flex: 1, background: '#007749' }} />
    <div style={{ flex: 1, background: '#002395' }} />
  </div>
);

const OfficialBanner = () => (
  <div style={{ background: 'white', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', width: '100%', position: 'sticky', top: 0, zIndex: 100 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC' }}>
        <ShieldCheck size={24} color="#007749" />
      </div>
      <div style={{ textAlign: 'left' }}>
        <div style={{ fontSize: '10px', fontWeight: 900, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Republic of South Africa</div>
        <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>National Registry Sentinel</div>
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/South_African_Coat_of_Arms.svg/320px-South_African_Coat_of_Arms.svg.png" alt="Coat of Arms" style={{ height: '32px', opacity: 0.9 }} />
      <div style={{ display: 'flex', gap: '3px', height: '18px', width: '24px', flexDirection: 'column' }}>
        <div style={{ flex: 1, background: '#E03C31' }} />
        <div style={{ flex: 1, background: '#007749' }} />
        <div style={{ flex: 1, background: '#002395' }} />
      </div>
    </div>
  </div>
);

export default function App() {
  const {
    user, setUser, logout,
    searchQuery, setSearchQuery,
    vault, addToVault,
    aiMessages, addAiMessage, clearAiMessages,
    integrityPulse, updateIntegrity,
    activeScreen: screen,
    setScreen
  } = useRegistryStore();

  const [isLoading, setIsLoading] = useState(false);
  const [verifyStep, setVerifyStep] = useState('input');

  // 🛡️ Mandatory Splash Force: Ensures "Get Started" is the entry point every time
  useEffect(() => {
    // Only set to splash if there is no user session
    if (!user) {
      setScreen('splash');
    }
    console.log("🛡️ Entry Point Reset: Enforcing State Integrity");
  }, []);

  const handleLogin = async (credentials) => {
    try {
      setIsLoading(true);
      const userData = await RegistryService.login(credentials.email, credentials.password);
      setUser(userData);
    } catch (e) {
      alert("Invalid Registry Credentials. Use: admin@sumbandila.com / admin123");
    } finally {
      setIsLoading(false);
    }
  };

  const startVerification = async (providerName) => {
    if (!providerName.trim()) return;
    setVerifyStep('processing');
    setScreen('verify');

    const provider = await RegistryService.search(providerName);
    setSelectedProvider(provider);
    setVerifyStep('result');
  };

  if (isLoading) return <div style={{ background: 'var(--bg-gradient)', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800 }}>Authenticating Sentinel Access...</div>;

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {screen === 'splash' && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="screen"
            style={{
              padding: 0,
              background: 'white',
              justifyContent: 'flex-start',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <OfficialBanner />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '40px 24px', maxWidth: '500px', zIndex: 10 }}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ width: '100%', borderRadius: '60px', overflow: 'hidden', marginBottom: '48px', boxShadow: '0 40px 80px rgba(0,0,0,0.12)', position: 'relative' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop"
                  alt="Graduation"
                  style={{ width: '100%', height: '320px', objectFit: 'cover' }}
                />
              </motion.div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '40px' }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/South_African_Coat_of_Arms.svg/512px-South_African_Coat_of_Arms.svg.png" alt="Coat of Arms" style={{ height: '48px' }} />
                <SAFlag />
              </div>

              <h1 style={{ color: '#0F172A', fontSize: '48px', fontWeight: 900, marginBottom: '16px', letterSpacing: '-2px' }}>
                Welcome!
              </h1>

              <p style={{ color: '#64748B', fontSize: '16px', fontWeight: 600, marginBottom: '32px', lineHeight: 1.6 }}>
                Sumbandila Sentinel assists with the verification of official registrations and learning institutions.
              </p>

              <div style={{ background: '#F8FAFC', padding: '32px 24px', borderRadius: '32px', marginBottom: '48px', border: '1px solid #F1F5F9', width: '100%', maxWidth: '440px' }}>
                <p style={{ color: '#475569', fontSize: '14px', fontWeight: 600, lineHeight: 1.6 }}>
                  Exposing bogus institutions and unaccredited professionals operating illegally in South Africa.
                </p>
              </div>

              <motion.button
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setScreen('login')}
                style={{
                  background: 'var(--primary-orange)',
                  color: 'white',
                  padding: '24px',
                  borderRadius: '28px',
                  fontSize: '18px',
                  fontWeight: 900,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: '0 20px 40px rgba(249, 115, 22, 0.25)',
                  width: '100%',
                  maxWidth: '440px',
                  justifyContent: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                GET STARTED <ArrowRight size={22} />
              </motion.button>

              <button
                onClick={() => setScreen('how-it-works')}
                style={{ marginTop: '24px', background: 'transparent', border: 'none', color: '#64748B', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}
              >
                Learn More About Our Mission
              </button>

              <div style={{ marginTop: 'auto', paddingTop: '40px', borderTop: '1px solid #F1F5F9', width: '100%', display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '10px', fontWeight: 800, color: '#94A3B8' }}>© 2026 NATIONAL SENTINEL ADVISORY</div>
              </div>
            </div>
          </motion.div>
        )}

        {screen === 'how-it-works' && (
          <motion.div key="how" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="screen" style={{ background: 'white', padding: 0 }}>
            <div style={{ background: 'var(--bg-gradient)', padding: '60px 24px', color: 'white' }}>
              <div onClick={() => setScreen('splash')} style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.2)', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', marginBottom: '24px' }}>
                <ChevronLeft size={24} />
              </div>
              <h2 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '12px' }}>Protecting Integrity</h2>
              <p style={{ opacity: 0.9, fontSize: '16px', fontWeight: 500 }}>Combatting bogus institutions and fake qualifications in South Africa.</p>
            </div>

            <div style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ padding: '8px', background: '#FEF2F2', borderRadius: '10px' }}><ShieldCheck size={20} color="#EF4444" /></div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827' }}>The Challenge</h3>
                </div>
                <p style={{ color: '#4B5563', fontSize: '15px', lineHeight: 1.6 }}>
                  In South Africa there is a challenge of unregistered institutions operating illegally and offering unaccredited courses which lead to fake qualifications.
                </p>
              </section>

              <section style={{ background: '#F8FAFC', padding: '24px', borderRadius: '24px', border: '1px solid #F1F5F9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ padding: '8px', background: '#EFF6FF', borderRadius: '10px' }}><Building2 size={20} color="#3B82F6" /></div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827' }}>Our Mission</h3>
                </div>
                <p style={{ color: '#4B5563', fontSize: '15px', lineHeight: 1.6 }}>
                  Our mission is to assist with tracking down, investigating and shutting down bogus institutions. We aim to expose bogus institutions operating illegally and also expose accredited institutions offering unaccredited courses.
                </p>
              </section>

              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ padding: '8px', background: '#F0FDF4', borderRadius: '10px' }}><CheckCircle2 size={20} color="#22C55E" /></div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827' }}>Verification & Reporting</h3>
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', padding: 0 }}>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', color: '#4B5563', fontSize: '14px' }}>
                    <div style={{ marginTop: '4px', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary-orange)', flexShrink: 0 }} />
                    Students and the public can easily verify the legitimacy of an institution.
                  </li>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', color: '#4B5563', fontSize: '14px' }}>
                    <div style={{ marginTop: '4px', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary-orange)', flexShrink: 0 }} />
                    Verify short courses and online courses across Education, Health, and Legal.
                  </li>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', color: '#4B5563', fontSize: '14px' }}>
                    <div style={{ marginTop: '4px', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary-orange)', flexShrink: 0 }} />
                    Report bogus institutions or unaccredited courses securely and anonymously.
                  </li>
                </ul>
              </section>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setScreen('splash')}
                style={{
                  marginTop: '16px',
                  background: '#111827',
                  color: 'white',
                  padding: '20px',
                  borderRadius: '20px',
                  border: 'none',
                  fontWeight: 800,
                  width: '100%',
                  cursor: 'pointer'
                }}
              >
                GO BACK
              </motion.button>
            </div>
          </motion.div>
        )}

        {screen === 'login' && (
          <LoginScreen
            onLogin={handleLogin}
            onBack={() => setScreen('splash')}
            onShowAbout={() => setScreen('how-it-works')}
          />
        )}

        {screen === 'dashboard' && (
          <Dashboard
            user={user}
            onVerify={startVerification}
            onSelectCategory={(cat) => { setSelectedCategory(cat); setScreen('category-list'); }}
            onNav={(id) => setScreen(id)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )}

        {screen === 'category-list' && (
          <motion.div key="cat-list" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="screen" style={{ background: '#FDFCFB', paddingBottom: '120px' }}>
            <header style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '32px', width: '100%', padding: '24px 20px' }}>
              <div onClick={() => setScreen('dashboard')} style={{ padding: '12px', background: 'white', borderRadius: '14px', cursor: 'pointer', display: 'flex', border: '1px solid #E5E7EB', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', marginBottom: '16px' }}>
                <ChevronLeft size={24} color="#111827" />
              </div>
              <div>
                <h3 style={{ fontWeight: 800, fontSize: '28px', color: '#111827', letterSpacing: '-0.5px' }}>{selectedCategory} Registry</h3>
                <p style={{ color: '#6B7280', fontSize: '14px', fontWeight: 500 }}>Official South African Database</p>
              </div>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '0 20px' }}>
              {MOCK_DATA.providers.filter(p => p.category === selectedCategory).map((p, i) => {
                const isVerified = !['Unverified', 'Expired', 'Suspended', 'De-registered'].includes(p.status);
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={i}
                    style={{
                      background: 'white',
                      borderRadius: '24px',
                      padding: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                      border: isVerified ? '1px solid #F3F4F6' : '1px solid #FFCDD2',
                      textAlign: 'left'
                    }}
                    onClick={() => startVerification(p.name)}
                  >
                    <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: isVerified ? '#F9FAFB' : '#FFEBEE', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #F3F4F6' }}>
                      <Building2 size={24} color={isVerified ? 'var(--primary-orange)' : '#D32F2F'} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: '18px', color: '#111827', marginBottom: '2px' }}>{p.name}</div>
                      <div style={{ fontSize: '13px', color: '#6B7280', fontWeight: 600 }}>{p.type} • {p.body}</div>
                    </div>
                    <div style={{
                      background: isVerified ? '#E8F5E9' : '#FFEBEE',
                      color: isVerified ? '#2E7D32' : '#D32F2F',
                      padding: '6px 14px',
                      borderRadius: '100px',
                      fontSize: '12px',
                      fontWeight: 800
                    }}>
                      {p.status}
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <BottomNav active="home" onNav={(id) => setScreen(id)} />
          </motion.div>
        )}

        {screen === 'qr-scan' && (
          <motion.div key="qr" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="screen" style={{ background: '#000', padding: 0 }}>
            <div style={{ position: 'relative', height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', top: '40px', left: '20px', right: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
                <div onClick={() => setScreen('dashboard')} style={{ padding: '12px', background: 'rgba(255,255,255,0.2)', borderRadius: '16px', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
                  <ChevronLeft size={24} color="white" />
                </div>
                <h3 style={{ color: 'white', fontWeight: 800 }}>Scan Digital Seal</h3>
                <div style={{ width: '48px' }} />
              </div>

              {/* Scanner Frame */}
              <div style={{ position: 'relative', width: '280px', height: '280px' }}>
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  style={{ position: 'absolute', inset: 0, border: '4px solid var(--primary-orange)', borderRadius: '40px' }}
                />
                <motion.div
                  animate={{ y: [0, 280, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  style={{ position: 'absolute', top: 0, left: '20px', right: '20px', height: '4px', background: 'var(--primary-orange)', boxShadow: '0 0 15px var(--primary-orange)', zIndex: 5 }}
                />
              </div>

              <div style={{ position: 'absolute', bottom: '120px', textAlign: 'center', padding: '0 40px' }}>
                <p style={{ color: 'white', fontSize: '16px', fontWeight: 600, opacity: 0.8 }}>
                  Align the institution's digital QR seal within the frame to verify registration.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {screen === 'verify' && (
          <VerifyResult
            provider={selectedProvider}
            step={verifyStep}
            onBack={() => setScreen('dashboard')}
            onViewCert={() => setScreen('cert')}
            onSave={addToVault}
          />
        )}

        {screen === 'history' && (
          <Vault
            vaultItems={vault}
            onRemove={removeFromVault}
            onClear={clearVault}
            onViewCert={(p) => { setSelectedProvider(p); setScreen('cert'); }}
            onNav={(id) => setScreen(id)}
          />
        )}

        {screen === 'cert' && selectedProvider && (
          <motion.div key="cert" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="screen" style={{ background: 'var(--surface-secondary)', justifyContent: 'center', paddingBottom: '120px' }}>
            <div className="cert-card-premium" style={{ maxWidth: '640px', margin: '0 auto', width: '100%', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
                <div style={{ background: 'var(--primary-dark)', color: 'white', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 900, letterSpacing: '2px' }}>SENTINEL AUTHORITY V2.0</div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', fontWeight: 900, color: 'var(--primary-dark)' }}>REPUBLIC OF SOUTH AFRICA</div>
                  <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>GOVERNMENT CRYPTOGRAPHIC SEAL</div>
                </div>
              </div>

              <div style={{ textAlign: 'center', margin: '72px 0', position: 'relative', zIndex: 2 }}>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '4px', fontWeight: 800 }}>This serves to officially validate that</p>
                <h2 style={{ fontSize: '42px', fontWeight: 900, margin: '28px 0', color: 'var(--primary-dark)', letterSpacing: '-2px', lineHeight: 1 }}>{selectedProvider.name}</h2>
                <p style={{ fontSize: '15px', color: 'var(--text-main)', lineHeight: 1.8, maxWidth: '400px', margin: '0 auto', fontWeight: 500 }}>
                  is recognized as an <strong>OFFICIALLY AUTHENTICATED PROVIDER</strong> with a verified status of <strong>{selectedProvider.status}</strong> within the national registry databases.
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 2, paddingTop: '48px', borderTop: '2px solid #F1F5F9' }}>
                <div style={{ background: 'white', padding: '16px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 8px 16px rgba(0,0,0,0.05)' }}>
                  <QrCode size={64} color="var(--primary-dark)" />
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'flex-end', color: 'var(--success)', marginBottom: '8px' }}>
                    <CheckCircle2 size={24} strokeWidth={3} />
                    <span style={{ fontSize: '14px', fontWeight: 900 }}>DIGITALLY AUTHENTICATED</span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, fontFamily: 'monospace', letterSpacing: '1px' }}>CERT_BLOCK_ID: {Math.random().toString(36).substring(2, 11).toUpperCase()}_ZA_SENTINEL</div>
                </div>
              </div>

              <div className="cert-seal" style={{ opacity: 0.08 }}>
                <ShieldCheck size={180} />
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="primary-btn"
              style={{ marginTop: '56px', maxWidth: '360px', alignSelf: 'center', height: '68px', fontSize: '18px' }}
              onClick={() => setScreen('dashboard')}
            >
              Return to Control Panel
            </motion.button>
          </motion.div>
        )}

        {screen === 'profile' && (
          <motion.div key="profile" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="screen" style={{ background: '#FDFCFB', paddingBottom: '120px' }}>
            <header style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', padding: '24px 20px' }}>
              <div onClick={() => setScreen('dashboard')} style={{ padding: '12px', background: 'white', borderRadius: '14px', cursor: 'pointer', border: '1px solid #E5E7EB' }}>
                <ChevronLeft size={24} color="#111827" />
              </div>
              <h3 style={{ fontWeight: 800, fontSize: '28px', color: '#111827' }}>Sentinel Identity</h3>
            </header>

            <div style={{ padding: '0 20px' }}>
              <div style={{ background: 'white', borderRadius: '32px', padding: '48px 24px', border: '1px solid #F3F4F6', textAlign: 'center', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', width: '100%' }}>
                <div style={{ width: '120px', height: '120px', borderRadius: '40px', background: 'var(--bg-gradient)', margin: '0 auto 24px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '48px', color: 'white', fontWeight: 900, boxShadow: '0 15px 30px rgba(230, 81, 0, 0.2)' }}>{user?.avatar}</div>
                <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#111827' }}>{user?.name}</h2>
                <p style={{ color: '#6B7280', fontWeight: 700, fontSize: '16px', marginTop: '4px' }}>Authorized Registry Agent</p>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#E8F5E9', padding: '10px 20px', borderRadius: '100px', marginTop: '24px' }}>
                  <ShieldCheck size={18} color="#2E7D32" strokeWidth={3} />
                  <span style={{ color: '#2E7D32', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>High Clearance (Level 5)</span>
                </div>
              </div>

              <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ background: 'white', padding: '24px', borderRadius: '24px', border: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#6B7280', fontWeight: 700, fontSize: '14px' }}>Registration Email</span>
                  <span style={{ color: '#111827', fontWeight: 800, fontSize: '15px' }}>{user?.email}</span>
                </div>
                <div style={{ background: 'white', padding: '24px', borderRadius: '24px', border: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#6B7280', fontWeight: 700, fontSize: '14px' }}>Contact Number</span>
                  <span style={{ color: '#111827', fontWeight: 800, fontSize: '15px' }}>{user?.mobile}</span>
                </div>
              </div>

              <button
                onClick={logout}
                style={{
                  marginTop: '40px',
                  width: '100%',
                  background: 'white',
                  color: 'var(--error)',
                  padding: '20px',
                  borderRadius: '20px',
                  border: '2px solid rgba(239, 68, 68, 0.1)',
                  fontSize: '16px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Sign Out of Registry
              </button>
            </div>
            <BottomNav active="profile" onNav={(s) => setScreen(s)} />
          </motion.div>
        )}
        {user && screen !== 'splash' && screen !== 'login' && (
          <SumbandilaAI />
        )}
        {screen === 'alerts' && (
          <motion.div key="alerts" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="screen" style={{ background: '#FDFCFB', paddingBottom: '120px' }}>
            <header style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', padding: '24px 20px' }}>
              <div onClick={() => setScreen('dashboard')} style={{ padding: '12px', background: 'white', borderRadius: '14px', cursor: 'pointer', border: '1px solid #E5E7EB' }}>
                <ChevronLeft size={24} color="#111827" />
              </div>
              <h3 style={{ fontWeight: 800, fontSize: '28px', color: '#111827' }}>Security Alerts</h3>
            </header>
            <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {MOCK_DATA.securityAlerts.map(alert => (
                <div key={alert.id} style={{ padding: '24px', borderRadius: '28px', background: alert.type === 'Critical' ? '#FEF2F2' : '#FFFBEB', border: `1px solid ${alert.type === 'Critical' ? '#FECACA' : '#FEF3C7'}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <ShieldCheck size={20} color={alert.type === 'Critical' ? '#EF4444' : '#F59E0B'} />
                    <span style={{ fontWeight: 900, fontSize: '13px', color: alert.type === 'Critical' ? '#991B1B' : '#92400E', textTransform: 'uppercase' }}>{alert.type} Alert</span>
                  </div>
                  <p style={{ fontWeight: 600, color: '#374151', lineHeight: 1.5 }}>{alert.text}</p>
                </div>
              ))}
            </div>
            <BottomNav active="home" onNav={(s) => setScreen(s)} />
          </motion.div>
        )}

        {screen === 'news' && (
          <motion.div key="news" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="screen" style={{ background: '#FDFCFB', paddingBottom: '120px' }}>
            <header style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', padding: '24px 20px' }}>
              <div onClick={() => setScreen('dashboard')} style={{ padding: '12px', background: 'white', borderRadius: '14px', cursor: 'pointer', border: '1px solid #E5E7EB' }}>
                <ChevronLeft size={24} color="#111827" />
              </div>
              <h3 style={{ fontWeight: 800, fontSize: '28px', color: '#111827' }}>Registry News</h3>
            </header>
            <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {MOCK_DATA.registryNews.map(news => (
                <div key={news.id} className="premium-card" style={{ padding: '24px', background: 'white' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary-orange)', marginBottom: '8px' }}>{news.source} • {news.date}</div>
                  <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#111827', marginBottom: '8px' }}>{news.title}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6B7280', fontSize: '13px', fontWeight: 600 }}>
                    <ArrowRight size={14} /> Read Full Report
                  </div>
                </div>
              ))}
            </div>
            <BottomNav active="home" onNav={(s) => setScreen(s)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
