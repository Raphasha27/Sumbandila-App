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

export default function App() {
  const {
    user, setUser, logout,
    activeScreen: screen, setScreen,
    vault, addToVault, removeFromVault, clearVault,
    searchQuery, setSearchQuery
  } = useRegistryStore();

  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [verifyStep, setVerifyStep] = useState('input');
  const [isLoading, setIsLoading] = useState(false);

  // 🛡️ Mandatory Splash Force: Ensures "Get Started" is the entry point every time
  useEffect(() => {
    setScreen('splash');
    console.log("🛡️ Entry Point Reset: Enforcing Get Started Screen");
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
              background: 'var(--bg-gradient)',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 24px', maxWidth: '500px' }}>
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                  width: '120px',
                  height: '120px',
                  background: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '32px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                }}
              >
                <ShieldCheck size={64} color="var(--primary-orange)" strokeWidth={2.5} />
              </motion.div>

              <h1 style={{ color: 'white', fontSize: '48px', fontWeight: 900, marginBottom: '12px', letterSpacing: '-1px' }}>Sumbandila</h1>
              <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: '20px', fontWeight: 600, marginBottom: '24px', lineHeight: 1.4 }}>
                Verification in the palm of your hand
              </p>

              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '24px', borderRadius: '24px', marginBottom: '64px', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }}>
                <p style={{ color: 'white', fontSize: '15px', fontWeight: 500, lineHeight: 1.6 }}>
                  Verify Private Colleges, Schools, Medical Doctors, and Legal Practitioners registered with South African national authorities.
                </p>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setScreen('login')}
                style={{
                  background: 'white',
                  color: 'var(--primary-orange)',
                  padding: '22px 64px',
                  borderRadius: '100px',
                  fontSize: '20px',
                  fontWeight: 900,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.15)'
                }}
              >
                Get Started <ArrowRight size={24} />
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
      </AnimatePresence>
    </div>
  );
}
