import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  QrCode,
  Building2,
  Home as HomeIcon,
  User as UserIcon,
  HelpCircle,
  Gavel,
  Key,
  Phone,
  Mail,
  ExternalLink,
  AlertCircle,
  Clock,
  FileText,
  Lock,
  Database,
  AlertTriangle,
  UserCircle
} from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { db } from './services/DatabaseService';

import { useRegistryStore } from './store/useRegistryStore';
import { RegistryService } from './services/registryService';

// Modular Components
import LoginScreen from './components/Auth/LoginScreen';
import Dashboard from './components/Dashboard/Dashboard';
import VerifyResult from './components/Verify/VerifyResult';
import Vault from './components/Vault/Vault';
import AssistanceRequest from './components/Support/AssistanceRequest';
import { BottomNav } from './components/Navigation';
import { MOCK_DATA } from './lib/mock-data';
import SiphoAI from './components/SiphoAI';
import PractitionerRegister from './components/PractitionerRegister';
import { SumbandilaLogo } from './components/Branding/Logo';

const SAFlag = () => (
  <div style={{ display: 'flex', gap: '2px', height: '6px', width: '100px', marginBottom: '12px' }}>
    <div style={{ flex: 1, background: '#E03C31' }} />
    <div style={{ flex: 1, background: '#007749' }} />
    <div style={{ flex: 1, background: '#002395' }} />
  </div>
);

const OfficialBanner = () => (
  <div style={{
    background: 'white',
    padding: '12px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    borderBottom: '1px solid #F1F5F9',
    boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <img 
        src="https://upload.wikimedia.org/wikipedia/en/thumb/2/22/Coat_of_arms_of_South_Africa.svg/1200px-Coat_of_arms_of_South_Africa.svg.png" 
        style={{ height: '32px', width: 'auto' }} 
        alt="RSA Coat of Arms" 
      />
      <div style={{ textAlign: 'left' }}>
        <div style={{ fontSize: '10px', fontWeight: 800, color: '#111827', lineHeight: 1.2 }}>Sumbandila:</div>
        <div style={{ fontSize: '11px', fontWeight: 900, color: '#1E40AF', letterSpacing: '-0.2px' }}>National Registry Sentinel</div>
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1E40AF', padding: '6px 12px', borderRadius: '100px' }}>
      <span style={{ fontSize: '9px', fontWeight: 800, color: 'white', letterSpacing: '0.5px' }}>MEMBER PORTAL</span>
      <UserCircle size={16} color="white" />
    </div>
  </div>
);

export default function App() {
  // eslint-disable-next-line react-hooks/purity
  const certBlockId = useMemo(() => Math.random().toString(36).substring(2, 11).toUpperCase(), []);

  const {
    user, setUser,
    searchQuery, setSearchQuery,
    vault, addToVault, removeFromVault, clearVault,
    activeScreen: screen,
    setScreen,
    logout: storeLogout
  } = useRegistryStore();

  const logout = async () => {
    if (user) await db.logSession(user.email, 'LOGOUT');
    storeLogout();
  };

  const [isLoading, setIsLoading] = useState(false);
  const [verifyStep, setVerifyStep] = useState('input');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const { selectedCategory, setSelectedCategory } = useRegistryStore();

  // 🛡️ Mandatory Onboarding Flow: Splash -> Login -> Dashboard
  useEffect(() => {
    if (!user && screen !== 'splash' && screen !== 'login') {
      setScreen('splash');
    }
  }, [user, screen, setScreen]);

  const handleGetStarted = () => setScreen('login');
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setScreen('dashboard');
  };
  const handleBackToSplash = () => setScreen('splash');

  useEffect(() => {
    if (screen === 'audit-logs' && user?.email === 'admin@sumbandila.com') {
      db.getAuditLogs().then(logs => {
        // Log auditing logic here if needed
        console.log("Audit logs sync:", logs.length);
      });
    }
  }, [screen, user]);

  const handleLogin = async (credentials) => {
    try {
      setIsLoading(true);
      const userData = await RegistryService.login(credentials.email, credentials.password);
      setUser(userData);
    } catch {
      alert("Invalid Registry Credentials. Use: admin@sumbandila.com / admin123");
    } finally {
      setIsLoading(false);
    }
  };

  const startVerification = async (providerName) => {
    if (!providerName || !providerName.trim()) return;
    setVerifyStep('processing');
    setScreen('verify');

    try {
      const provider = await RegistryService.search(providerName);
      setSelectedProvider(provider);
      setVerifyStep('result');
    } catch (error) {
      console.error("Verification failed:", error);
      setScreen('dashboard');
    }
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

            <div style={{ width: '100%', background: '#1E40AF', padding: '24px 20px', color: 'white', textAlign: 'center', position: 'relative' }}>
               <h2 style={{ fontSize: '18px', fontWeight: 900, letterSpacing: '1px', marginBottom: '16px', textTransform: 'uppercase' }}>SEARCH REGISTRY</h2>
               <div style={{ position: 'relative', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                 <input 
                   type="text" 
                   placeholder="Search Vetted Records" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && handleGetStarted()}
                   style={{ width: '100%', padding: '12px 20px', borderRadius: '12px', border: 'none', background: 'white', color: '#111827', fontSize: '14px', fontWeight: 600 }}
                 />
                 <Search size={18} color="#94A3B8" style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)' }} />
               </div>
            </div>

            <div style={{ flex: 1, width: '100%', padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', zIndex: 10, overflowY: 'auto' }}>
              
              {/* Quick Action Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%', maxWidth: '440px', marginBottom: '40px' }}>
                <div onClick={handleGetStarted} style={{ background: 'white', padding: '24px 16px', borderRadius: '20px', border: '1px solid #F1F5F9', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <School size={32} color="#1E40AF" />
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#111827' }}>Verify School</span>
                </div>
                <div style={{ background: 'white', padding: '24px 16px', borderRadius: '20px', border: '1px solid #F1F5F9', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', opacity: 0.6 }}>
                  <FileText size={32} color="#1E40AF" />
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#111827' }}>Assessor Logs</span>
                </div>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <img 
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/2/22/Coat_of_arms_of_South_Africa.svg/1200px-Coat_of_arms_of_South_Africa.svg.png" 
                  style={{ height: '80px', width: 'auto', marginBottom: '24px' }} 
                  alt="RSA Coat of Arms Large" 
                />
                <p style={{ fontSize: '12px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '1px' }}>GET STARTED</p>
                <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#111827', lineHeight: 1.1, marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  WELCOME TO <br/> SUMBANDILA <CheckCircle2 size={24} color="#22C55E" fill="#22C55E22" />
                </h1>
                <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: 1.6, fontWeight: 500, maxWidth: '320px', margin: '0 auto' }}>
                  Your secure gateway to official, verified information from verified government departments.
                </p>
                <p style={{ fontSize: '10px', fontWeight: 800, color: '#111827', marginTop: '12px', textTransform: 'uppercase' }}>
                  (VETTED BY: DEPARTMENT OF BASIC EDUCATION & <br/> SA COUNCIL FOR EDUCATORS)
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '440px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={handleGetStarted}
                    style={{ background: 'white', border: '2px solid #E2E8F0', color: '#111827', padding: '16px', borderRadius: '12px', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', cursor: 'pointer' }}
                  >
                    EXPLORE THE REGISTRY
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setScreen('practitioner-register')}
                    style={{ background: '#1E40AF', border: 'none', color: 'white', padding: '16px', borderRadius: '12px', fontWeight: 800, fontSize: '12px', textTransform: 'uppercase', cursor: 'pointer' }}
                  >
                    JOIN AS A PROFESSIONAL
                  </motion.button>
                </div>
                <button
                  onClick={() => setScreen('how-it-works')}
                  style={{ background: 'transparent', border: 'none', color: '#1E40AF', fontWeight: 800, fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  SUPPORT
                </button>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '40px', borderTop: '1px solid #F1F5F9', width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                <div style={{ fontSize: '10px', fontWeight: 800, color: '#94A3B8' }}>© 2026 NATIONAL SENTINEL ADVISORY.</div>
                <div style={{ fontSize: '9px', fontWeight: 700, color: '#CBD5E1' }}>(SA REGISTRATION 2026/001234/07)</div>
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
            onLogin={handleLoginSuccess}
            onBack={handleBackToSplash}
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
                      <div style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 800, textTransform: 'uppercase', marginTop: '4px', letterSpacing: '0.5px' }}>
                        {p.category === 'Education' ? `EMIS: ${p.emisNumber || 'N/A'}` : p.category === 'Healthcare' ? `HPCSA: ${p.hpcsaNumber || 'N/A'}` : `LPC: ${p.lpcNumber || 'N/A'}`}
                      </div>
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
                <h3 style={{ color: 'white', fontWeight: 800 }}>Sipho AI Scanner</h3>
                <div style={{ width: '48px' }} />
              </div>

              {/* Scanner Frame */}
              <div style={{ position: 'relative', width: '85%', height: '400px', cursor: 'pointer' }} onClick={() => {
                alert("Sipho AI Analysis: Document detected. It appears to be an invoice from an unregistered entity demanding 'Enrollment Fees'. Match found with 3 other reported scams.");
                setScreen('dashboard');
              }}>
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.02, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  style={{ position: 'absolute', inset: 0, border: '4px solid var(--primary)', borderRadius: '24px' }}
                />
                <motion.div
                  animate={{ y: [0, 400, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                  style={{ position: 'absolute', top: 0, left: '10px', right: '10px', height: '4px', background: '#3B82F6', boxShadow: '0 0 20px #3B82F6', zIndex: 5 }}
                />

                {/* Visual corners */}
                <div style={{ position: 'absolute', top: -4, left: -4, width: '40px', height: '40px', borderTop: '4px solid white', borderLeft: '4px solid white', borderRadius: '28px 0 0 0' }} />
                <div style={{ position: 'absolute', top: -4, right: -4, width: '40px', height: '40px', borderTop: '4px solid white', borderRight: '4px solid white', borderRadius: '0 28px 0 0' }} />
                <div style={{ position: 'absolute', bottom: -4, left: -4, width: '40px', height: '40px', borderBottom: '4px solid white', borderLeft: '4px solid white', borderRadius: '0 0 0 28px' }} />
                <div style={{ position: 'absolute', bottom: -4, right: -4, width: '40px', height: '40px', borderBottom: '4px solid white', borderRight: '4px solid white', borderRadius: '0 0 28px 0' }} />
              </div>

              <div style={{ position: 'absolute', bottom: '80px', textAlign: 'center', padding: '0 30px', width: '100%' }}>
                <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '16px 20px', borderRadius: '20px', display: 'inline-block' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
                    <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ width: '8px', height: '8px', background: '#4ADE80', borderRadius: '50%' }} />
                    <span style={{ color: 'white', fontWeight: 900, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>AI SCAN ACTIVE</span>
                  </div>
                  <p style={{ color: 'white', fontSize: '14px', fontWeight: 600, opacity: 0.9 }}>
                    Align an invoice, ID, or QR seal. Tap screen to simulate AI fraud analysis.
                  </p>
                </div>
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
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, fontFamily: 'monospace', letterSpacing: '1px' }}>CERT_BLOCK_ID: {certBlockId}_ZA_SENTINEL</div>
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
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', padding: '24px 20px', background: 'white', borderBottom: '1px solid #F1F5F9' }}>
              <div onClick={() => setScreen('dashboard')} style={{ padding: '10px', background: '#F8FAFC', borderRadius: '12px', cursor: 'pointer', border: '1px solid #E2E8F0' }}>
                <ChevronLeft size={20} color="#111827" />
              </div>
              <h3 style={{ fontWeight: 800, fontSize: '20px', color: '#111827' }}>Sentinel Identity</h3>
              <div onClick={() => setScreen('dashboard')} style={{ padding: '10px', background: '#F8FAFC', borderRadius: '12px', cursor: 'pointer', border: '1px solid #E2E8F0' }}>
                <HomeIcon size={20} color="#111827" />
              </div>
            </header>

            <div style={{ padding: '0 20px' }}>
              <div style={{ background: 'white', borderRadius: '32px', padding: '48px 24px', border: '1px solid #F3F4F6', textAlign: 'center', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', width: '100%' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '32px', background: 'var(--bg-gradient)', margin: '0 auto 24px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px', color: 'white', fontWeight: 900, boxShadow: '0 15px 30px rgba(37, 99, 235, 0.2)' }}>{user?.avatar}</div>
                <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#111827' }}>{user?.name}</h2>
                <p style={{ color: '#6B7280', fontWeight: 700, fontSize: '15px' }}>Authorized Registry Agent</p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#E0F2FE', padding: '8px 16px', borderRadius: '100px', marginTop: '16px' }}>
                  <ShieldCheck size={16} color="var(--primary)" strokeWidth={3} />
                  <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '11px', textTransform: 'uppercase' }}>Clearance Level 5</span>
                </div>
              </div>

              <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  onClick={() => setScreen('profile-details')}
                  style={{ background: 'white', padding: '20px', borderRadius: '24px', border: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ padding: '8px', background: '#F0F9FF', borderRadius: '10px' }}><UserIcon size={20} color="var(--primary)" /></div>
                    <span style={{ color: '#111827', fontWeight: 700 }}>Personal Details</span>
                  </div>
                  <ChevronRight size={20} color="#94A3B8" />
                </button>
                <button
                  onClick={() => setScreen('privacy')}
                  style={{ background: 'white', padding: '20px', borderRadius: '24px', border: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ padding: '8px', background: '#F0F9FF', borderRadius: '10px' }}><ShieldCheck size={20} color="var(--primary)" /></div>
                    <span style={{ color: '#111827', fontWeight: 700 }}>Privacy & POPIA</span>
                  </div>
                  <ChevronRight size={20} color="#94A3B8" />
                </button>
                <button
                  onClick={() => setScreen('terms')}
                  style={{ background: 'white', padding: '20px', borderRadius: '24px', border: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ padding: '8px', background: '#F0F9FF', borderRadius: '10px' }}><Gavel size={20} color="var(--primary)" /></div>
                    <span style={{ color: '#111827', fontWeight: 700 }}>Terms of Service</span>
                  </div>
                  <ChevronRight size={20} color="#94A3B8" />
                </button>
                {user?.email === 'admin@sumbandila.com' && (
                  <button
                    onClick={() => setScreen('audit-logs')}
                    style={{ background: '#FFF7ED', padding: '20px', borderRadius: '24px', border: '1px solid #FFEDD5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ padding: '8px', background: '#FFEDD5', borderRadius: '10px' }}><Key size={20} color="#F59E0B" /></div>
                      <span style={{ color: '#92400E', fontWeight: 800 }}>Sentinel Audit Logs</span>
                    </div>
                    <ChevronRight size={20} color="#F59E0B" />
                  </button>
                )}
                <button
                  onClick={() => setScreen('help')}
                  style={{ background: 'white', padding: '20px', borderRadius: '24px', border: '1px solid #F3F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ padding: '8px', background: '#F0F9FF', borderRadius: '10px' }}><HelpCircle size={20} color="var(--primary)" /></div>
                    <span style={{ color: '#111827', fontWeight: 700 }}>How can we help?</span>
                  </div>
                  <ChevronRight size={20} color="#94A3B8" />
                </button>
              </div>

              <button
                onClick={logout}
                className="secondary-btn"
                style={{ marginTop: '32px', color: 'var(--error)', borderColor: 'rgba(239, 68, 68, 0.2)', height: '64px' }}
              >
                Sign Out of Registry
              </button>
            </div>
            <BottomNav active="profile" onNav={(s) => setScreen(s)} />
          </motion.div>
        )}

        {screen === 'profile-details' && (
          <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="screen" style={{ background: '#FDFCFB' }}>
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', padding: '24px 20px', background: 'white', borderBottom: '1px solid #F1F5F9' }}>
              <div onClick={() => setScreen('profile')} style={{ padding: '10px', background: '#F8FAFC', borderRadius: '12px', cursor: 'pointer', border: '1px solid #E2E8F0' }}>
                <ChevronLeft size={20} color="#111827" />
              </div>
              <h3 style={{ fontWeight: 800, fontSize: '20px', color: '#111827' }}>Personal Details</h3>
              <div onClick={() => setScreen('dashboard')} style={{ padding: '10px', background: '#F8FAFC', borderRadius: '12px', cursor: 'pointer', border: '1px solid #E2E8F0' }}>
                <HomeIcon size={20} color="#111827" />
              </div>
            </header>
            <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'white', padding: '24px', borderRadius: '24px', border: '1px solid #F3F4F6' }}>
                <label style={{ color: '#6B7280', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Full Legal Name</label>
                <div style={{ color: '#111827', fontWeight: 800, fontSize: '16px' }}>{user?.name}</div>
              </div>
              <div style={{ background: 'white', padding: '24px', borderRadius: '24px', border: '1px solid #F3F4F6' }}>
                <label style={{ color: '#6B7280', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Registry Email</label>
                <div style={{ color: '#111827', fontWeight: 800, fontSize: '16px' }}>{user?.email}</div>
              </div>
              <div style={{ background: 'white', padding: '24px', borderRadius: '24px', border: '1px solid #F3F4F6' }}>
                <label style={{ color: '#6B7280', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Mobile Number</label>
                <div style={{ color: '#111827', fontWeight: 800, fontSize: '16px' }}>{user?.mobile}</div>
              </div>
            </div>
          </motion.div>
        )}

        {screen === 'help' && (
          <motion.div key="help" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="screen">
            <AssistanceRequest
              user={user}
              onBack={() => setScreen('profile')}
              onHome={() => setScreen('dashboard')}
            />
          </motion.div>
        )}

        {screen === 'alerts' && (
          <motion.div key="alerts" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="screen" style={{ background: '#FDFCFB', paddingBottom: '120px' }}>
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', padding: '24px 20px', background: 'white', borderBottom: '1px solid #F1F5F9' }}>
              <div onClick={() => setScreen('dashboard')} style={{ padding: '10px', background: '#F8FAFC', borderRadius: '12px', cursor: 'pointer', border: '1px solid #E2E8F0' }}>
                <ChevronLeft size={20} color="#111827" />
              </div>
              <h3 style={{ fontWeight: 800, fontSize: '20px', color: '#111827' }}>Security Alerts</h3>
              <div onClick={() => setScreen('dashboard')} style={{ padding: '10px', background: '#F8FAFC', borderRadius: '12px', cursor: 'pointer', border: '1px solid #E2E8F0' }}>
                <HomeIcon size={20} color="#111827" />
              </div>
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
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', padding: '24px 20px', background: 'white', borderBottom: '1px solid #F1F5F9' }}>
              <div onClick={() => setScreen('dashboard')} style={{ padding: '10px', background: '#F8FAFC', borderRadius: '12px', cursor: 'pointer', border: '1px solid #E2E8F0' }}>
                <ChevronLeft size={20} color="#111827" />
              </div>
              <h3 style={{ fontWeight: 800, fontSize: '20px', color: '#111827' }}>Registry News</h3>
              <div onClick={() => setScreen('dashboard')} style={{ padding: '10px', background: '#F8FAFC', borderRadius: '12px', cursor: 'pointer', border: '1px solid #E2E8F0' }}>
                <HomeIcon size={20} color="#111827" />
              </div>
            </header>
            <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {MOCK_DATA.registryNews.map(news => (
                <div key={news.id} className="premium-card" style={{ padding: '24px', background: 'white' }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary)', marginBottom: '8px' }}>{news.source} • {news.date}</div>
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
        {screen === 'practitioner-register' && (
          <PractitionerRegister onBack={() => setScreen(user ? 'dashboard' : 'splash')} />
        )}

        {screen === 'support-hub' && (
          <motion.div key="support-hub" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="screen" style={{ background: '#FDFCFB', padding: 0, paddingBottom: '80px' }}>
            <div style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)', padding: '28px 20px 48px', borderRadius: '0 0 40px 40px', color: 'white', position: 'relative', overflow: 'hidden' }}>
              <div onClick={() => setScreen('dashboard')} style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginBottom: 20 }}>
                <ChevronLeft size={22} color="white" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                <div style={{ width: 56, height: 56, borderRadius: 18, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Gavel size={28} color="white" />
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Republic of South Africa</div>
                  <h2 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>Support & Justice Hub</h2>
                </div>
              </div>
              <p style={{ fontSize: 14, opacity: 0.85, lineHeight: 1.6 }}>Scammed or need help? Report fraud, access emergency contacts, and connect with official authorities.</p>
            </div>

            <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Emergency Contacts */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <div style={{ background: '#FEF2F2', padding: 8, borderRadius: 10 }}><AlertTriangle size={20} color="#EF4444" /></div>
                  <h3 style={{ fontWeight: 800, color: '#111827', fontSize: 16 }}>Emergency Contacts</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { name: 'SAPS Crime Stop', number: '08600 10111', icon: Phone, color: '#EF4444' },
                    { name: 'DHET Helpline (Toll-Free)', number: '0800 872 222', icon: Phone, color: '#3B82F6' },
                    { name: 'LPC Complaints (GP/NW)', number: '012 338 5800', icon: Phone, color: '#7C3AED' },
                    { name: 'HPCSA Complaints', number: '012 338 9300', icon: Phone, color: '#10B981' },
                  ].map(({ name, number, icon: Icon, color }) => (
                    <a key={name} href={`tel:${number.replace(/\s/g, '')}`} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', background: 'white', borderRadius: 20, border: '1px solid #F3F4F6', textDecoration: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                      <div style={{ width: 44, height: 44, borderRadius: 14, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={20} color={color} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 800, fontSize: 14, color: '#111827' }}>{name}</div>
                        <div style={{ fontSize: 13, color, fontWeight: 700 }}>{number}</div>
                      </div>
                      <ArrowRight size={16} color="#94A3B8" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Online Reporting */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <div style={{ background: '#EFF6FF', padding: 8, borderRadius: 10 }}><AlertCircle size={20} color="#3B82F6" /></div>
                  <h3 style={{ fontWeight: 800, color: '#111827', fontSize: 16 }}>Official Reporting Portals</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { name: 'DHET — Report Bogus Colleges', url: 'https://www.dhet.gov.za/', email: 'callcentre@dhet.gov.za' },
                    { name: 'SARS — Report Phishing & Scams', url: 'https://www.sars.gov.za/targeting-tax-crime/scams-and-phishing/' },
                    { name: 'LPC — Report Unregistered Attorneys', url: 'https://lpc.org.za/public-alerts/', email: 'info@lpc.org.za' },
                    { name: 'HPCSA — Report Fake Practitioners', url: 'https://www.hpcsa.co.za/', email: 'hpcsa@hpcsa.co.za' },
                  ].map(({ name, url, email }) => (
                    <a key={name} href={url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', background: 'white', borderRadius: 20, border: '1px solid #F3F4F6', textDecoration: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                      <div style={{ width: 44, height: 44, borderRadius: 14, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <ExternalLink size={20} color="#3B82F6" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 800, fontSize: 13, color: '#111827' }}>{name}</div>
                        {email && <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 600, marginTop: 2 }}>{email}</div>}
                      </div>
                      <ArrowRight size={16} color="#94A3B8" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Report via Sumbandila */}
              <div style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)', borderRadius: 28, padding: 24, color: 'white' }}>
                <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 8 }}>📩 File an Anonymous Report</div>
                <p style={{ fontSize: 13, opacity: 0.9, lineHeight: 1.6, marginBottom: 16 }}>Submit a confidential report directly through Sumbandila. Your identity is protected under POPIA.</p>
                <button onClick={() => setScreen('help')} style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '12px 20px', borderRadius: 16, fontWeight: 800, fontSize: 13, cursor: 'pointer', width: '100%' }}>
                  Open Report Form →
                </button>
              </div>

            </div>
            <BottomNav active="home" onNav={(s) => setScreen(s)} />
          </motion.div>
        )}

        {screen === 'audit-logs' && user?.email === 'admin@sumbandila.com' && (
          <motion.div key="audit-logs" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="screen" style={{ background: '#0F172A', padding: 0, paddingBottom: '40px' }}>
            <div style={{ padding: '28px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div onClick={() => setScreen('profile')} style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <ChevronLeft size={22} color="white" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: '#F59E0B', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>ADMIN ONLY</div>
                  <h2 style={{ fontSize: 20, fontWeight: 900, color: 'white', margin: 0 }}>Sentinel Audit Logs</h2>
                </div>
                <Database size={22} color="#4ADE80" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', padding: '8px 14px', borderRadius: 100, width: 'fit-content' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ADE80' }} />
                <span style={{ fontSize: 11, fontWeight: 800, color: '#4ADE80', textTransform: 'uppercase', letterSpacing: '1px' }}>Live System Log</span>
              </div>
            </div>

            <div style={{ padding: '20px' }}>
              {[
                { time: '10:24:01', type: 'AUTH', msg: `LOGIN: ${user?.name} — admin@sumbandila.com`, level: 'info' },
                { time: '10:22:18', type: 'VERIFY', msg: 'SEARCH: "Damelin" — Result: DEREGISTERED (Critical)', level: 'warn' },
                { time: '10:19:44', type: 'REPORT', msg: 'REPORT FILED: Pretoria Global Institute — Anonymous', level: 'warn' },
                { time: '10:15:03', type: 'VAULT', msg: 'VAULT SAVE: Netcare Rosebank Hospital by admin', level: 'info' },
                { time: '10:11:30', type: 'ALERT', msg: 'SECURITY: Failed login attempt from unknown IP', level: 'error' },
                { time: '10:08:12', type: 'SYNC', msg: 'DB SYNC: 1,248 new records from DHET portal', level: 'info' },
                { time: '09:55:00', type: 'AUTH', msg: 'SESSION EXPIRED: citizen@test.co.za — auto logout', level: 'info' },
                { time: '09:42:11', type: 'ALERT', msg: 'FRAUD FLAG: "Rosselli Legal" — 3 community reports', level: 'error' },
              ].map((log, i) => {
                const colors = { info: '#4ADE80', warn: '#F59E0B', error: '#EF4444' };
                const color = colors[log.level];
                return (
                  <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#475569', flexShrink: 0, paddingTop: 2 }}>{log.time}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                        <span style={{ fontSize: 9, fontWeight: 900, color, background: `${color}20`, padding: '2px 6px', borderRadius: 4 }}>{log.type}</span>
                      </div>
                      <div style={{ fontFamily: 'monospace', fontSize: 12, color: color, lineHeight: 1.4 }}>{log.msg}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {screen === 'privacy' && (
          <motion.div key="privacy" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="screen" style={{ background: '#FDFCFB', padding: 0, paddingBottom: '60px' }}>
            <div style={{ background: 'var(--bg-gradient)', padding: '28px 20px 36px', color: 'white' }}>
              <div onClick={() => setScreen('profile')} style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginBottom: 20 }}>
                <ChevronLeft size={22} color="white" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Lock size={28} color="white" />
                <h2 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>Privacy & POPIA</h2>
              </div>
              <p style={{ fontSize: 13, opacity: 0.85, marginTop: 8 }}>How we protect your data under the Protection of Personal Information Act.</p>
            </div>
            <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { title: 'What We Collect', icon: Database, body: 'We collect only the minimum data needed: your name, email, and search history within this session. No biometric data is stored without explicit consent.' },
                { title: 'How We Use Your Data', icon: FileText, body: 'Data is used exclusively to verify institutions and professionals against official South African registries (DHET, HPCSA, LPC, SAQA). It is never sold or shared with third parties.' },
                { title: 'Your Rights (POPIA)', icon: ShieldCheck, body: 'Under the Protection of Personal Information Act (POPIA, Act 4 of 2013), you have the right to access, correct, and request deletion of your personal information at any time.' },
                { title: 'Data Security', icon: Lock, body: 'All data is encrypted in transit (TLS 1.3) and at rest. Session data is stored locally on your device. Our servers are hosted in South Africa, in compliance with POPIA geographic requirements.' },
                { title: 'Contact Our Information Officer', icon: Mail, body: 'For privacy concerns or data requests, contact our designated POPIA Information Officer at: privacy@sumbandila.com' },
              ].map(({ title, icon: Icon, body }) => (
                <div key={title} style={{ background: 'white', borderRadius: 24, padding: '20px', border: '1px solid #F3F4F6', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <div style={{ padding: 8, background: '#EFF6FF', borderRadius: 10 }}><Icon size={18} color="var(--primary)" /></div>
                    <div style={{ fontWeight: 800, fontSize: 15, color: '#111827' }}>{title}</div>
                  </div>
                  <p style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.7, fontWeight: 500 }}>{body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {screen === 'terms' && (
          <motion.div key="terms" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="screen" style={{ background: '#FDFCFB', padding: 0, paddingBottom: '60px' }}>
            <div style={{ background: 'linear-gradient(135deg, #111827, #1F2937)', padding: '28px 20px 36px', color: 'white' }}>
              <div onClick={() => setScreen('profile')} style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginBottom: 20 }}>
                <ChevronLeft size={22} color="white" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Gavel size={28} color="white" />
                <h2 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>Terms of Service</h2>
              </div>
              <p style={{ fontSize: 13, opacity: 0.85, marginTop: 8 }}>Last updated: 1 January 2026 · Governed by South African Law</p>
            </div>
            <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { num: '1', title: 'Acceptance of Terms', body: 'By accessing and using the Sumbandila National Registry Sentinel platform, you agree to be bound by these Terms of Service and all applicable South African laws and regulations.' },
                { num: '2', title: 'Nature of Information', body: 'Sumbandila provides verification information sourced from official South African registries (DHET, HPCSA, LPC, SAQA). This information is provided for reference only and does not constitute legal advice.' },
                { num: '3', title: 'Accuracy Disclaimer', body: 'While we strive for accuracy, registry databases may not reflect real-time changes. Always cross-reference critical decisions with the relevant official body directly.' },
                { num: '4', title: 'Prohibited Use', body: 'You may not use this platform for fraudulent verification, impersonation of verified entities, mass automated scraping, or any purpose that violates the Electronic Communications and Transactions Act.' },
                { num: '5', title: 'Limitation of Liability', body: 'Sumbandila and its operators are not liable for any loss or damage arising from reliance on information provided through this platform. Use of this platform is at your own risk.' },
                { num: '6', title: 'Governing Law', body: 'These terms are governed by the laws of the Republic of South Africa. Any disputes shall be resolved in the South Gauteng High Court, Johannesburg.' },
              ].map(({ num, title, body }) => (
                <div key={num} style={{ background: 'white', borderRadius: 20, padding: '20px', border: '1px solid #F3F4F6' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: '#111827', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, flexShrink: 0 }}>{num}</div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 15, color: '#111827', marginBottom: 6 }}>{title}</div>
                      <p style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.7, fontWeight: 500 }}>{body}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ textAlign: 'center', padding: '16px', fontSize: 12, color: '#9CA3AF', fontWeight: 600 }}>© 2026 National Sentinel Advisory · Republic of South Africa</div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
      <SiphoAI />
      <Analytics />
    </div>
  );
}
