import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Phone, 
  Lock, 
  School, 
  Stethoscope, 
  Scale, 
  Wallet, 
  Search, 
  Bell, 
  Home, 
  FileText, 
  User,
  ChevronLeft,
  CheckCircle2,
  Info,
  QrCode,
  AlertTriangle,
  ExternalLink,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data - Expanded with realistic South African scenarios and location mapping
const MOCK_DATA = {
  providers: [
    // Education
    { 
      name: "Centurion Private College", 
      category: "Education", 
      type: "Private College", 
      status: "Accredited", 
      reg: "2024/EDU/0882", 
      body: "Dept of Education", 
      campuses: 3,
      locations: ["Centurion Central", "Pretoria CBD", "Midrand"],
      image: "campus_map_education_1770068936699.png",
      url: "https://centurioncollege.edu.za",
      date: "2024-11-20" 
    },
    { 
      name: "Pretoria Institute of Tech", 
      category: "Education", 
      type: "Higher Education", 
      status: "Verified", 
      reg: "2023/HTE/1029", 
      body: "DHET", 
      campuses: 1,
      locations: ["Hatfield, Pretoria"],
      image: "campus_map_education_1770068936699.png",
      url: "https://pit.ac.za",
      date: "2025-01-15" 
    },
    { 
      name: "Soshanguve High School", 
      category: "Education", 
      type: "Public School", 
      status: "Accredited", 
      reg: "2024/SCH/9921", 
      body: "Dept of Education", 
      campuses: 1,
      locations: ["Soshanguve Block L"],
      image: "school_aerial_view_1770069381011.png",
      url: "https://soshhigh.gov.za",
      date: "2025-01-10" 
    },
    { 
      name: "Richfield Graduate Institute", 
      category: "Education", 
      type: "Higher Education", 
      status: "Verified", 
      reg: "2021/HE07/008", 
      body: "DHET & CHE", 
      campuses: 8,
      locations: ["Durban Metro", "Johannesburg North", "Pretoria West", "Cape Town CBD", "Polokwane"],
      image: "campus_map_education_1770068936699.png",
      url: "https://richfield.ac.za",
      date: "2024-05-12" 
    },
    { 
      name: "Global Excellence Academy", 
      category: "Education", 
      type: "Private Academy", 
      status: "Unverified", 
      reg: "N/A", 
      body: "Unknown", 
      campuses: 0,
      locations: ["Remote/Online Only"],
      image: "campus_map_education_1770068936699.png", 
      date: "N/A" 
    },
    { 
      name: "Fast-Track Nursing School", 
      category: "Education", 
      type: "Nursing College", 
      status: "Expired", 
      reg: "2019/NUR/1102", 
      body: "SANC", 
      campuses: 1,
      locations: ["Sunnyside, Pretoria"],
      image: "campus_map_education_1770068936699.png",
      date: "2021-08-30" 
    },

    // Healthcare
    { 
      name: "Dr. Molapo & Associates", 
      category: "Healthcare", 
      type: "General Practitioner", 
      status: "Registered", 
      reg: "MP 0822192", 
      body: "HPCSA", 
      campuses: 2,
      locations: ["Brooklyn Medical Suite", "Menlo Park Clinic"],
      image: "specialist_medical_map_1770069395960.png",
      url: "https://molapo-medical.co.za",
      date: "2025-02-01" 
    },
    { 
      name: "Netcare Pretoria East Hospital", 
      category: "Healthcare", 
      type: "Private Hospital", 
      status: "Accredited", 
      reg: "P-7721-NET", 
      body: "DOH", 
      campuses: 1,
      locations: ["Garsfontein Rd, Pretoria"],
      image: "clinic_map_healthcare_1770069021563.png",
      url: "https://netcare.co.za/pretoria-east",
      date: "2024-12-01" 
    },
    { 
      name: "Dr. Sizwe Health Clinic", 
      category: "Healthcare", 
      type: "Medical Clinic", 
      status: "Registered", 
      reg: "MP 0112938", 
      body: "HPCSA", 
      campuses: 1,
      locations: ["Mamelodi West"],
      image: "clinic_map_healthcare_1770069021563.png",
      date: "2024-10-05" 
    },
    { 
      name: "Herbal Healing Center (CBD)", 
      category: "Healthcare", 
      type: "Alternative Medicine", 
      status: "Unverified", 
      reg: "N/A", 
      body: "None", 
      campuses: 1,
      locations: ["Street Vendor / Portable Suite"],
      image: "clinic_map_healthcare_1770069021563.png",
      date: "N/A" 
    },

    // Legal
    { 
      name: "Duma Legal Services", 
      category: "Legal", 
      type: "Law Firm", 
      status: "Good Standing", 
      reg: "LPC-2022-9910", 
      body: "Law Society of SA", 
      campuses: 1,
      locations: ["Pretoria Central"],
      image: "law_office_location_1770069074298.png",
      url: "https://dumalegal.co.za",
      date: "2024-12-10" 
    },
    { 
      name: "Mokoena Attorneys", 
      category: "Legal", 
      type: "Law Firm", 
      status: "Good Standing", 
      reg: "LPC-2023-1102", 
      body: "Law Society of SA", 
      campuses: 2,
      locations: ["Sandton Chambers", "Randburg"],
      image: "law_office_location_1770069074298.png",
      date: "2025-01-20" 
    },
    { 
      name: "Adams & Adams", 
      category: "Legal", 
      type: "Law Firm", 
      status: "Good Standing", 
      reg: "LPC-1908-0001", 
      body: "Law Society of SA", 
      campuses: 4,
      locations: ["Lynnwood, Pretoria", "Johannesburg North", "Cape Town", "Durban Metro"],
      image: "law_office_location_1770069074298.png",
      date: "2024-06-15" 
    },
    { 
      name: "Quick-Fix Law Associates", 
      category: "Legal", 
      type: "Legal Desk", 
      status: "Suspended", 
      reg: "LPC-2018-0055", 
      body: "Law Society of SA", 
      campuses: 1,
      locations: ["CBD Temporary Desk"],
      image: "law_office_location_1770069074298.png",
      date: "2023-02-14" 
    },

    // Finance
    { 
      name: "Zimele Finance", 
      category: "Finance", 
      type: "Financial Services", 
      status: "Registered FSP", 
      reg: "FSP-55210", 
      body: "FSCA", 
      campuses: 1,
      locations: ["Woodmead, Sandton"],
      image: "finance_hq_map_1770069364708.png",
      url: "https://zimelefinance.co.za",
      date: "2024-11-30" 
    },
    { 
      name: "Discovery Limited", 
      category: "Finance", 
      type: "Insurance Provider", 
      status: "Registered FSP", 
      reg: "FSP-18147", 
      body: "FSCA", 
      campuses: 5,
      locations: ["Sandton HQ", "Pretoria East", "Cape Town Waterfront", "Durban North", "Port Elizabeth"],
      image: "finance_hq_map_1770069364708.png",
      date: "2024-03-22" 
    },
    { 
      name: "Old Mutual RSA", 
      category: "Finance", 
      type: "Asset Management", 
      status: "Registered FSP", 
      reg: "FSP-703", 
      body: "FSCA", 
      campuses: 12,
      locations: ["Cape Town HQ", "Pinelands", "Johannesburg CBD", "Sandton", "Centurion"],
      image: "finance_hq_map_1770069364708.png",
      date: "2023-09-10" 
    }
  ]
};

const App = () => {
  const [screen, setScreen] = useState('splash');
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [verifyStep, setVerifyStep] = useState('input'); // input, processing, result
  const [acceptedLegal, setAcceptedLegal] = useState(false);

  // Removed automatic splash timer as requested

  const handleLogin = () => {
    setUser({ 
      name: 'Dakalo Mashau', 
      mobile: '+27 83 123 4567',
      email: 'dakalo.m@sumbandila.org',
      avatar: 'D'
    });
    setScreen('dashboard');
  };

  const MOCK_HISTORY = [
    { name: 'Centurion Private College', date: 'Feb 02, 2026', status: 'Accredited', type: 'Education' },
    { name: 'Dr. Molapo & Associates', date: 'Jan 28, 2026', status: 'Verified', type: 'Healthcare' },
    { name: 'Mokoena Attorneys', date: 'Jan 15, 2026', status: 'In Good Standing', type: 'Legal' }
  ];

  const startVerification = (providerName) => {
    const found = MOCK_DATA.providers.find(p => p.name.toLowerCase().includes(providerName.toLowerCase()));
    setVerifyStep('processing');
    setScreen('verify');
    
    setTimeout(() => {
      const defaultImages = {
        'Education': 'campus_map_education_1770068936699.png',
        'Healthcare': 'clinic_map_healthcare_1770069021563.png',
        'Legal': 'law_office_location_1770069074298.png',
        'Finance': 'finance_hq_map_1770069364708.png'
      };
      
      const defaultUrls = {
        'Education': 'https://www.education.gov.za',
        'Healthcare': 'https://www.hpcsa.co.za',
        'Legal': 'https://www.lpc.org.za',
        'Finance': 'https://www.fsca.co.za'
      };
      
      setSelectedProvider(found || { 
        name: providerName, 
        category: selectedCategory || 'Services',
        type: 'Private Provider', 
        status: 'Unverified', 
        reg: 'N/A', 
        body: 'Unknown',
        locations: ['Search location'],
        campuses: 0,
        image: defaultImages[selectedCategory] || 'campus_map_education_1770068936699.png',
        url: defaultUrls[selectedCategory] || 'https://www.google.com',
        date: 'N/A'
      });
      setVerifyStep('result');
    }, 4000);
  };

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {screen === 'splash' && (
          <motion.div 
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="screen landing-scroll"
            style={{ padding: 0, overflowY: 'auto', height: '100vh', background: 'white' }}
          >
            {/* Splash Fold */}
            <div className="splash-screen" style={{ height: '100vh', minHeight: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
              <motion.div 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="logo-container"
              >
                <div className="logo-inner">
                  <ShieldCheck size={32} color="white" />
                </div>
              </motion.div>
              <h1 className="logo-text">Sumbandila</h1>
              <p className="tagline" style={{ marginBottom: '32px' }}>Verification in the palm of your hand</p>
              <div style={{ maxWidth: '320px', background: '#F7FAFC', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '16px', marginBottom: '24px', textAlign: 'left' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <input 
                    type="checkbox" 
                    id="legal-check" 
                    style={{ marginTop: '4px', cursor: 'pointer' }}
                    checked={acceptedLegal}
                    onChange={(e) => setAcceptedLegal(e.target.checked)}
                  />
                  <label htmlFor="legal-check" style={{ fontSize: '11px', color: '#718096', fontWeight: 600, lineHeight: 1.4, cursor: 'pointer' }}>
                    I acknowledge that this is an <strong>Official Government Tool</strong>. I understand that Misrepresentation of credentials is a criminal offense under the Legal Practice and Higher Education Acts.
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', alignItems: 'center', marginBottom: '40px' }}>
                <motion.button 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="primary-btn" 
                  style={{ 
                    maxWidth: '280px', 
                    background: acceptedLegal ? 'var(--accent)' : '#A0AEC0', 
                    color: 'var(--primary)',
                    cursor: acceptedLegal ? 'pointer' : 'not-allowed',
                    opacity: acceptedLegal ? 1 : 0.7
                  }}
                  onClick={() => acceptedLegal && setScreen('login')}
                >
                  Get Started
                </motion.button>
              </div>
              
            </div>

          </motion.div>
        )}

        {screen === 'how-it-works' && (
          <motion.div 
            key="how-it-works"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="screen landing-scroll"
            style={{ padding: 0, overflowY: 'auto', height: '100vh', background: 'white' }}
          >
            <div id="how-it-works-content" style={{ padding: '40px 24px 60px' }}>
              <div style={{ background: 'var(--primary)', borderRadius: '24px', padding: '48px 24px', textAlign: 'center', marginBottom: '32px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at top right, rgba(214, 158, 46, 0.1), transparent)', pointerEvents: 'none' }}></div>
                <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '16px', marginBottom: '24px' }}>
                  <ShieldCheck size={40} color="var(--accent)" />
                </div>
                <h2 style={{ color: 'white', fontSize: '28px', fontWeight: 800, marginBottom: '16px' }}>Verification in your palm</h2>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '15px', lineHeight: 1.6, maxWidth: '280px', margin: '0 auto' }}>
                  The Sumbandila App empowers the public to instantly verify professional services.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', padding: '0 8px' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ width: '48px', height: '48px', background: '#EBF8FF', borderRadius: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                    <School color="#3182CE" size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary)', marginBottom: '8px' }}>Education</h4>
                    <p style={{ fontSize: '14px', color: '#718096', lineHeight: 1.5, fontWeight: 500 }}>
                      Verify if private colleges or schools are registered with the Department of Education. Ensure courses are accredited by the relevant education authorities.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ width: '48px', height: '48px', background: '#FFF5F5', borderRadius: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                    <Stethoscope color="#E53E3E" size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary)', marginBottom: '8px' }}>Healthcare</h4>
                    <p style={{ fontSize: '14px', color: '#718096', lineHeight: 1.5, fontWeight: 500 }}>
                      Confirm if a medical professional is officially registered with the Medical Council of South Africa (HPCSA).
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ width: '48px', height: '48px', background: '#FAF5FF', borderRadius: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                    <Scale color="#805AD5" size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary)', marginBottom: '8px' }}>Legal</h4>
                    <p style={{ fontSize: '14px', color: '#718096', lineHeight: 1.5, fontWeight: 500 }}>
                      Verify if lawyers are registered with the Law Society and are in good standing to practice.
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ margin: '40px 0 32px', background: '#F7FAFC', padding: '24px', borderRadius: '20px', textAlign: 'center', border: '1px solid #E2E8F0' }}>
                <p style={{ fontSize: '13px', color: '#718096', lineHeight: 1.6, fontWeight: 600 }}>
                  Sumbandila provides a secure, direct link to official professional records for real-time verification.
                </p>
              </div>

              <button 
                className="primary-btn" 
                onClick={() => setScreen('login')}
              >
                Back to Sign In
              </button>
            </div>
          </motion.div>
        )}

        {screen === 'login' && (
          <motion.div 
            key="login"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="screen"
          >
            <div className="auth-header">
              <h2>Welcome Back</h2>
              <p>Secure login with your mobile number</p>
            </div>
            <div className="input-group" style={{ textAlign: 'center' }}>
              <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)', marginBottom: '12px', display: 'block' }}>Mobile Number</label>
              <div style={{ background: '#F7FAFC', borderRadius: '16px', height: '56px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #E2E8F0', padding: '0 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Phone size={18} color="#A0AEC0" />
                  <input 
                    type="tel" 
                    placeholder="+27 00 000 0000" 
                    style={{ background: 'transparent', border: 'none', textAlign: 'left', width: '160px', fontSize: '16px', fontWeight: 500, padding: 0, color: 'var(--primary)' }}
                  />
                </div>
              </div>
            </div>
            <div className="input-group" style={{ textAlign: 'center' }}>
              <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)', marginBottom: '12px', display: 'block' }}>Password</label>
              <div style={{ background: '#F7FAFC', borderRadius: '16px', height: '56px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #E2E8F0', padding: '0 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Lock size={18} color="#A0AEC0" />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    style={{ background: 'transparent', border: 'none', textAlign: 'left', width: '160px', fontSize: '16px', fontWeight: 500, padding: 0, color: 'var(--primary)' }}
                  />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', alignItems: 'center', marginTop: '24px' }}>
              <button className="primary-btn" onClick={handleLogin}>Sign In</button>
              <button 
                className="secondary-btn" 
                style={{ width: '100%', background: 'rgba(214, 158, 46, 0.1)', color: 'var(--accent)', border: '1px solid var(--accent)', padding: '16px', borderRadius: '12px', fontWeight: 700 }}
                onClick={() => setScreen('how-it-works')}
              >
                Learn More
              </button>
            </div>
          </motion.div>
        )}

        {screen === 'dashboard' && (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="screen"
          >
            <div style={{ background: 'linear-gradient(180deg, #F7FAFC 0%, #FFFFFF 100%)', margin: '-24px -24px 0', padding: '32px 24px 40px', borderRadius: '0 0 40px 40px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
              <header className="app-header" style={{ marginBottom: '40px', position: 'relative' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: '100%' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '20px', background: 'var(--primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 800, fontSize: '20px', boxShadow: '0 8px 16px rgba(26, 54, 93, 0.15)' }}>
                    {user?.name?.charAt(0) || 'D'}
                  </div>
                  <div className="user-greeting" style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '14px', color: '#718096', fontWeight: 500 }}>Welcome back,</span>
                    <h4 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--primary)', marginTop: '4px' }}>{user?.name || 'Dakalo Mashau'}</h4>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginTop: '8px', background: 'rgba(214, 158, 46, 0.1)', padding: '4px 12px', borderRadius: '100px', width: 'fit-content', margin: '8px auto 0' }}>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="var(--accent)" color="var(--accent)" />)}
                      </div>
                      <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--accent)', marginLeft: '4px' }}>5/5 TRUSTED SYSTEM</span>
                    </div>
                  </div>
                </div>
                <div style={{ position: 'absolute', top: '0', right: '0', padding: '12px', background: 'white', borderRadius: '12px', border: '1px solid #E2E8F0', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
                  <Bell size={20} color="var(--primary)" />
                </div>
              </header>

              <div className="search-section" style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--primary)', marginBottom: '24px', letterSpacing: '-0.5px' }}>What do you want to verify?</h3>
                <div className="search-bar-container" style={{ background: 'white', borderRadius: '20px', height: '64px', boxShadow: '0 15px 35px rgba(26, 54, 93, 0.08)', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '0 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input 
                      type="text" 
                      placeholder="Search schools, clinics, lawyers..." 
                      style={{ background: 'transparent', border: 'none', textAlign: 'left', width: '260px', fontSize: '16px', fontWeight: 500, padding: 0, color: 'var(--primary)' }}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && startVerification(searchQuery)}
                    />
                    <Search size={20} style={{ color: '#A0AEC0', flexShrink: 0 }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="categories">
              <CategoryCard icon={<School color="#3182CE" size={28} />} label="Education" bg="#EBF8FF" onClick={() => { setSelectedCategory('Education'); setScreen('category-list'); }} />
              <CategoryCard icon={<Stethoscope color="#E53E3E" size={28} />} label="Healthcare" bg="#FFF5F5" onClick={() => { setSelectedCategory('Healthcare'); setScreen('category-list'); }} />
              <CategoryCard icon={<Scale color="#805AD5" size={28} />} label="Legal" bg="#FAF5FF" onClick={() => { setSelectedCategory('Legal'); setScreen('category-list'); }} />
              <CategoryCard icon={<Wallet color="#38A169" size={28} />} label="Finance" bg="#F0FFF4" onClick={() => { setSelectedCategory('Finance'); setScreen('category-list'); }} />
            </div>

            <div style={{ margin: '32px 0', background: '#FFF5F5', padding: '24px', borderRadius: '32px', border: '1px solid #FED7D7', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.1 }}>
                <AlertTriangle size={80} color="#E53E3E" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <AlertTriangle size={20} color="#E53E3E" />
                <h4 style={{ color: '#C53030', fontWeight: 800, margin: 0 }}>Fraud & Scam Alerts</h4>
              </div>
              <p style={{ fontSize: '14px', color: '#9B2C2C', fontWeight: 600, lineHeight: 1.5, marginBottom: '0' }}>
                Warning: New unaccredited "nursing schools" reported in Pretoria CBD. Always verify accreditation before paying any fees.
              </p>
            </div>

            <h4 style={{ margin: '32px 0 20px', fontSize: '20px', textAlign: 'center' }}>Recently Vetted</h4>
            <div className="vetted-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '100px' }}>
              {MOCK_DATA.providers.slice(0, 3).map((p, i) => (
                <div key={i} className="vetted-card" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px', background: '#F7FAFC', borderRadius: '24px', border: '1px solid #E2E8F0', cursor: 'pointer', position: 'relative' }} onClick={() => startVerification(p.name)}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '56px', height: '56px', background: 'white', borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', flexShrink: 0 }}>
                      {p.type.includes('Education') ? <School color="#3182CE" /> : p.type.includes('Health') ? <Stethoscope color="#E53E3E" /> : <Scale color="#805AD5" />}
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 800, fontSize: '18px', color: 'var(--primary)', marginBottom: '4px' }}>{p.name}</div>
                      <div style={{ fontSize: '14px', color: '#718096', fontWeight: 600 }}>{p.type} • <span style={{ color: '#38A169' }}>{p.status}</span></div>
                    </div>
                  </div>
                  <CheckCircle2 color="#38A169" size={24} style={{ position: 'absolute', right: '20px' }} />
                </div>
              ))}
            </div>

            <BottomNav active="home" onNav={(s) => setScreen(s)} />
            <div style={{ position: 'fixed', bottom: '80px', left: 0, right: 0, textAlign: 'center', padding: '8px', background: '#F7FAFC', borderTop: '1px solid #E2E8F0', zIndex: 90 }}>
              <p style={{ fontSize: '9px', fontWeight: 800, color: '#A0AEC0', letterSpacing: '1px' }}>OFFICIAL GOVT USE ONLY • POPIA COMPLIANT</p>
            </div>
          </motion.div>
        )}

        {screen === 'history' && (
          <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="screen">
            <header style={{ marginBottom: '32px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary)' }}>Verification History</h2>
              <p style={{ color: '#718096', fontSize: '14px', marginTop: '4px' }}>Your recent institutional checks</p>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {MOCK_HISTORY.map((item, idx) => (
                <div key={idx} style={{ background: '#F7FAFC', border: '1px solid #E2E8F0', padding: '20px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', background: 'white', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
                    {item.type === 'Education' ? <School size={20} color="#3182CE" /> : item.type === 'Healthcare' ? <Stethoscope size={20} color="#E53E3E" /> : <Scale size={20} color="#805AD5" />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '16px' }}>{item.name}</div>
                    <div style={{ color: '#718096', fontSize: '12px', fontWeight: 600 }}>Verified on {item.date}</div>
                  </div>
                  <div style={{ color: '#38A169', fontWeight: 800, fontSize: '12px' }}>{item.status}</div>
                </div>
              ))}
            </div>
            <BottomNav active="history" onNav={(s) => setScreen(s)} />
          </motion.div>
        )}

        {screen === 'profile' && (
          <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="screen">
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '35px', background: 'var(--primary)', margin: '0 auto 24px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '36px', color: 'white', fontWeight: 800, boxShadow: '0 15px 30px rgba(26, 54, 93, 0.2)' }}>
                {user?.avatar || 'D'}
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary)' }}>{user?.name}</h2>
              <p style={{ color: '#718096', fontWeight: 600 }}>{user?.mobile}</p>
            </div>

            <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ background: 'white', padding: '20px', borderRadius: '20px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#718096', fontWeight: 600 }}>Account Status</span>
                <span style={{ color: '#38A169', fontWeight: 800 }}>Verified Citizen</span>
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '20px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#718096', fontWeight: 600 }}>Email Address</span>
                <span style={{ fontWeight: 700 }}>{user?.email}</span>
              </div>
              <div style={{ background: 'white', padding: '20px', borderRadius: '20px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#718096', fontWeight: 600 }}>Security Pin</span>
                <span style={{ fontWeight: 700 }}>••••</span>
              </div>
            </div>

            <button className="primary-btn" style={{ marginTop: '40px', background: '#FFF5F5', color: '#E53E3E', border: '1px solid #FED7D7', boxShadow: 'none' }} onClick={() => { setUser(null); setScreen('splash'); }}>
              Sign Out
            </button>
            <BottomNav active="profile" onNav={(s) => setScreen(s)} />
          </motion.div>
        )}

        {screen === 'category-list' && (
          <motion.div key="cat-list" initial={{ x: 500 }} animate={{ x: 0 }} className="screen">
            <header style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <ChevronLeft onClick={() => setScreen('dashboard')} style={{ cursor: 'pointer' }} />
              <h4 style={{ fontWeight: 700 }}>{selectedCategory} Providers</h4>
            </header>

            <div className="provider-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {MOCK_DATA.providers
                .filter(p => p.category === selectedCategory)
                .map((p, i) => (
                <div key={i} className="vetted-card" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px', background: '#F7FAFC', borderRadius: '24px', border: '1px solid #E2E8F0', cursor: 'pointer', position: 'relative' }} onClick={() => startVerification(p.name)}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 800, fontSize: '18px', color: 'var(--primary)', marginBottom: '4px' }}>{p.name}</div>
                    <div style={{ fontSize: '14px', color: '#718096', fontWeight: 600 }}>
                      {p.type} • <span style={{ color: ['Unverified', 'Expired', 'Suspended'].includes(p.status) ? '#E53E3E' : '#38A169' }}>{p.status}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: ['Unverified', 'Expired', 'Suspended'].includes(p.status) ? '#E53E3E' : 'var(--accent)', marginTop: '8px', fontWeight: 700 }}>
                      {['Unverified', 'Expired', 'Suspended'].includes(p.status) ? 'VIEW DETAILS' : 'VERIFY NOW'}
                    </div>
                  </div>
                  <div style={{ position: 'absolute', right: '24px', color: ['Unverified', 'Expired', 'Suspended'].includes(p.status) ? '#E53E3E' : 'var(--primary)', opacity: 0.5 }}>
                    <ChevronLeft style={{ transform: 'rotate(180deg)' }} size={24} />
                  </div>
                </div>
              ))}
              
              {MOCK_DATA.providers.filter(p => p.type.toLowerCase().includes(selectedCategory.toLowerCase())).length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>
                  <Info size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                  <p>No verified providers found in this category yet.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {screen === 'how-it-works' && (
          <motion.div key="how" initial={{ y: 500 }} animate={{ y: 0 }} className="screen">
            <header style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <ChevronLeft onClick={() => setScreen('dashboard')} style={{ cursor: 'pointer' }} />
              <h4 style={{ fontWeight: 700 }}>About Sumbandila</h4>
            </header>
            
            <div style={{ overflowY: 'auto', paddingBottom: '100px' }}>
              <div style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #1a3a6d 100%)', padding: '32px', borderRadius: '24px', marginBottom: '32px', color: 'white', textAlign: 'center' }}>
                <ShieldCheck size={48} color="var(--accent)" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '22px', marginBottom: '12px' }}>Verification in your palm</h3>
                <p style={{ fontSize: '15px', opacity: 0.9, lineHeight: '1.6' }}>
                  The Sumbandila App empowers the public to instantly verify professional services.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ background: '#EBF8FF', padding: '14px', borderRadius: '16px', height: 'fit-content' }}><School color="#3182CE" /></div>
                  <div>
                    <h5 style={{ fontWeight: 700, fontSize: '17px', marginBottom: '4px' }}>Education</h5>
                    <p style={{ fontSize: '14px', color: '#4A5568', lineHeight: '1.5' }}>
                      Verify if private colleges or schools are registered with the Department of Education. Ensure courses are accredited by the relevant education authorities.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ background: '#FFF5F5', padding: '14px', borderRadius: '16px', height: 'fit-content' }}><Stethoscope color="#E53E3E" /></div>
                  <div>
                    <h5 style={{ fontWeight: 700, fontSize: '17px', marginBottom: '4px' }}>Healthcare</h5>
                    <p style={{ fontSize: '14px', color: '#4A5568', lineHeight: '1.5' }}>
                      Confirm if a medical professional is officially registered with the Medical Council of South Africa (HPCSA).
                    </p>
                  </div>
                </div>

                <div style={{ background: '#E53E3E', padding: '24px', borderRadius: '24px', color: 'white' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <AlertTriangle size={24} color="#F7FAFC" />
                    <h5 style={{ fontWeight: 800, margin: 0, fontSize: '18px' }}>Spotting Fake Institutions</h5>
                  </div>
                  <ul style={{ paddingLeft: '20px', fontSize: '14px', lineHeight: 1.8, fontWeight: 500 }}>
                    <li>No valid registry code / N-Code</li>
                    <li>Pressure to pay "registration fees" immediately</li>
                    <li>Physical address doesn't match official maps</li>
                    <li>Unprofessional "WhatsApp-only" communication</li>
                  </ul>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ background: '#FAF5FF', padding: '14px', borderRadius: '16px', height: 'fit-content' }}><Scale color="#805AD5" /></div>
                  <div>
                    <h5 style={{ fontWeight: 700, fontSize: '17px', marginBottom: '4px' }}>Legal</h5>
                    <p style={{ fontSize: '14px', color: '#4A5568', lineHeight: '1.5' }}>
                      Verify if lawyers are registered with the Law Society and are in good standing to practice.
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '40px', padding: '24px', background: '#F7FAFC', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                <p style={{ fontSize: '13px', color: '#718096', textAlign: 'center', fontStyle: 'italic' }}>
                  Sumbandila provides a secure, direct link to official professional records for real-time verification.
                </p>
              </div>
            </div>

            <button className="primary-btn" style={{ position: 'fixed', bottom: '24px', left: '24px', right: '24px', width: 'calc(100% - 48px)' }} onClick={() => setScreen('dashboard')}>Start Verifying</button>
          </motion.div>
        )}

        {screen === 'verify' && (
          <motion.div key="verify" className="screen">
             <header style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <ChevronLeft onClick={() => setScreen('dashboard')} />
              <h4 style={{ fontWeight: 700 }}>Verification Process</h4>
            </header>

            {verifyStep === 'processing' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  style={{ marginBottom: '40px' }}
                >
                  <ShieldCheck size={64} color="#1A365D" />
                </motion.div>
                <h3>Consulting Registries...</h3>
                <p style={{ color: '#718096' }}>Verifying accreditation with relevant authorities.</p>
              </div>
            )}

            {verifyStep === 'result' && selectedProvider && (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <div style={{ background: '#F7FAFC', borderRadius: '24px', padding: '32px', textAlign: 'center', position: 'relative', marginTop: '40px', border: '1px solid #E2E8F0' }}>
                   <div style={{ width: '80px', height: '80px', background: ['Unverified', 'Expired', 'Suspended'].includes(selectedProvider.status) ? '#E53E3E' : '#38A169', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)', color: 'white', boxShadow: '0 8px 15px rgba(0,0,0,0.1)' }}>
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 style={{ marginTop: '24px', color: 'var(--primary)', fontSize: '24px' }}>{selectedProvider.name}</h2>
                  <p style={{ fontWeight: 700, color: '#718096', marginTop: '8px' }}>{selectedProvider.type} • {selectedProvider.body}</p>
                  
                  {selectedProvider.image && (
                    <div style={{ 
                      position: 'relative', 
                      width: '100%', 
                      height: '240px', 
                      borderRadius: '24px', 
                      overflow: 'hidden', 
                      marginBottom: '32px',
                      border: '2px solid #E2E8F0',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                    }}>
                      <img 
                        src={`./${selectedProvider.image}`} 
                        alt="Location Map" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <div style={{ 
                        position: 'absolute', 
                        bottom: 0, 
                        left: 0, 
                        right: 0, 
                        background: 'linear-gradient(transparent, rgba(26, 54, 93, 0.9))', 
                        padding: '16px', 
                        textAlign: 'left' 
                      }}>
                        <p style={{ color: 'white', fontSize: '10px', fontWeight: 800, marginBottom: '4px', letterSpacing: '1px' }}>OFFICIAL REGISTRY MAPPING</p>
                        <h4 style={{ color: 'var(--accent)', fontSize: '14px', fontWeight: 700 }}>{selectedProvider.locations[0]}</h4>
                      </div>
                    </div>
                  )}

                  <div style={{ margin: '0 0 24px', background: 'white', padding: '24px', borderRadius: '24px', border: '1px solid #E2E8F0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #F7FAFC' }}>
                      <span style={{ color: '#718096', fontWeight: 600 }}>Verification Status</span>
                      <span style={{ fontWeight: 800, color: ['Unverified', 'Expired', 'Suspended'].includes(selectedProvider.status) ? '#E53E3E' : '#38A169' }}>{selectedProvider.status}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #F7FAFC' }}>
                      <span style={{ color: '#718096', fontWeight: 600 }}>Active Sites</span>
                      <span style={{ fontWeight: 800 }}>{selectedProvider.campuses} Locations</span>
                    </div>
                    <div style={{ paddingTop: '16px', textAlign: 'left' }}>
                      <span style={{ color: '#718096', fontWeight: 600, display: 'block', marginBottom: '12px' }}>Verified Service Points:</span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {selectedProvider.locations.map((loc, idx) => (
                          <span key={idx} style={{ background: '#F7FAFC', color: '#1A365D', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, border: '1px solid #E2E8F0' }}>{loc}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '32px', background: '#F0FFF4', padding: '20px', borderRadius: '24px', border: '1px solid #C6F6D5' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <div style={{ background: '#38A169', padding: '8px', borderRadius: '10px' }}>
                        <ShieldCheck size={20} color="white" />
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '14px', fontWeight: 800, color: '#22543D' }}>Secure Anti-Scam Link</div>
                        <div style={{ fontSize: '11px', color: '#2F855A', fontWeight: 600 }}>Verified Official Portal</div>
                      </div>
                    </div>
                    <button 
                      className="primary-btn" 
                      style={{ background: '#38A169', fontSize: '14px', height: '48px', boxShadow: '0 4px 12px rgba(56, 161, 105, 0.2)' }}
                      onClick={() => window.open(selectedProvider.url, '_blank')}
                    >
                      Visit Official Site
                    </button>
                    <p style={{ fontSize: '10px', color: '#2F855A', marginTop: '12px', fontWeight: 600, fontStyle: 'italic' }}>
                      Warning: Always ensure the URL matches the official domain provided here to avoid online scams.
                    </p>
                  </div>

                  {['Unverified', 'Expired', 'Suspended'].includes(selectedProvider.status) && (
                    <div style={{ background: '#FFF5F5', padding: '24px', borderRadius: '24px', border: '1px solid #FED7D7', marginBottom: '32px', textAlign: 'left' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <AlertTriangle size={24} color="#E53E3E" />
                        <h4 style={{ fontWeight: 800, color: '#C53030', margin: 0 }}>Safety Alert</h4>
                      </div>
                      <p style={{ fontSize: '13px', color: '#9B2C2C', fontWeight: 600, lineHeight: 1.6 }}>
                        This institution has no active accreditation. Avoid paying any fees or sharing personal documents. Fake schools often use similar names to real ones.
                      </p>
                    </div>
                  )}

                  <button 
                    className="primary-btn" 
                    onClick={() => setScreen('cert')}
                    disabled={['Unverified', 'Expired', 'Suspended'].includes(selectedProvider.status)}
                    style={{ opacity: ['Unverified', 'Expired', 'Suspended'].includes(selectedProvider.status) ? 0.5 : 1 }}
                  >
                    {['Unverified', 'Expired', 'Suspended'].includes(selectedProvider.status) ? 'Verification Failed' : 'View Digital Certificate'}
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {screen === 'cert' && selectedProvider && (
          <div className="screen" style={{ background: '#F7FAFC' }}>
             <header style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <ChevronLeft onClick={() => setScreen('dashboard')} />
              <h4 style={{ fontWeight: 700 }}>Certificate</h4>
            </header>
            
            <div className="certificate-view">
              <div className="cert-border">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{ background: '#1A365D', color: 'white', padding: '6px 14px', borderRadius: '4px', fontSize: '11px', fontWeight: 800 }}>SUMBANDILA</div>
                  <div style={{ fontSize: '11px', textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, color: 'var(--primary)' }}>CERTIFICATE OF VERIFICATION</div>
                    <div style={{ color: '#D69E2E', fontWeight: 700 }}>Official Registry Status</div>
                  </div>
                </div>

                <div style={{ textAlign: 'center', margin: '40px 0' }}>
                  <p style={{ fontSize: '11px', color: '#718096' }}>This is to certify that</p>
                  <h2 style={{ fontSize: '20px', margin: '15px 0' }}>{selectedProvider.name.toUpperCase()}</h2>
                  <p style={{ fontSize: '11px', lineHeight: 1.6 }}>Successfully authenticated via the <strong>Software Implemented Certification System</strong>.</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '40px' }}>
                  <QrCode size={48} />
                  <div style={{ textAlign: 'right', color: '#38A169' }}>
                    <CheckCircle2 size={32} style={{ display: 'inline' }} />
                    <div style={{ fontSize: '10px', fontWeight: 800 }}>DIGITALLY SIGNED</div>
                  </div>
                </div>
              </div>
            </div>
            <button className="primary-btn" style={{ marginTop: '32px' }} onClick={() => setScreen('dashboard')}>Done</button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CategoryCard = ({ icon, label, bg, onClick }) => (
  <div className="cat-card" onClick={onClick}>
    <div className="cat-icon" style={{ background: bg }}>{icon}</div>
    <span>{label}</span>
  </div>
);

const BottomNav = ({ active, onNav }) => (
  <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', height: '80px', background: 'white', display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderTop: '1px solid #E2E8F0', padding: '0 24px', zIndex: 100 }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: active === 'home' ? 'var(--primary)' : '#718096', cursor: 'pointer' }} onClick={() => onNav('dashboard')}>
      <Home size={24} style={{ opacity: active === 'home' ? 1 : 0.6 }} />
      <span style={{ fontSize: '10px', marginTop: '4px', fontWeight: active === 'home' ? 800 : 500 }}>Home</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: active === 'history' ? 'var(--primary)' : '#718096', cursor: 'pointer' }} onClick={() => onNav('history')}>
      <FileText size={24} style={{ opacity: active === 'history' ? 1 : 0.6 }} />
      <span style={{ fontSize: '10px', marginTop: '4px', fontWeight: active === 'history' ? 800 : 500 }}>History</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: active === 'profile' ? 'var(--primary)' : '#718096', cursor: 'pointer' }} onClick={() => onNav('profile')}>
      <User size={24} style={{ opacity: active === 'profile' ? 1 : 0.6 }} />
      <span style={{ fontSize: '10px', marginTop: '4px', fontWeight: active === 'profile' ? 800 : 500 }}>Profile</span>
    </div>
  </div>
);

const SystemDiagram = () => (
  <div className="system-diagram">
    <svg viewBox="0 0 200 150" className="diagram-svg">
      {/* Infrastructure nodes based on Figure 1 */}
      <circle cx="100" cy="30" r="15" className="diagram-node" />
      <text x="100" y="33" textAnchor="middle" className="diagram-text">18</text>
      <text x="100" y="55" textAnchor="middle" style={{ fontSize: '8px' }}>Server</text>

      <rect x="20" y="70" width="30" height="20" className="diagram-node" />
      <text x="35" y="83" textAnchor="middle" className="diagram-text">12</text>
      <text x="35" y="100" textAnchor="middle" style={{ fontSize: '8px' }}>Mobile</text>

      <rect x="150" y="70" width="30" height="20" className="diagram-node" />
      <text x="165" y="83" textAnchor="middle" className="diagram-text">14</text>
      <text x="165" y="100" textAnchor="middle" style={{ fontSize: '8px' }}>Admin</text>

      <path d="M70 120 L130 120 L100 90 Z" className="diagram-node" />
      <text x="100" y="115" textAnchor="middle" className="diagram-text">11</text>
      <text x="100" y="135" textAnchor="middle" style={{ fontSize: '8px' }}>Registry</text>

      {/* Connection Lines */}
      <line x1="100" y1="45" x2="35" y2="70" stroke="#1A365D" strokeDasharray="4" />
      <line x1="100" y1="45" x2="165" y2="70" stroke="#1A365D" strokeDasharray="4" />
      <line x1="100" y1="45" x2="100" y2="90" stroke="#1A365D" strokeDasharray="4" />
    </svg>
  </div>
);

export default App;
