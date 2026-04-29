import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, ArrowRight, Download, Search, 
  AlertTriangle, CheckCircle2, Star, Users, 
  Globe, Zap, ShieldAlert, BarChart3, Lock,
  ChevronRight, Facebook, Twitter, Instagram, Linkedin,
  School, Stethoscope, Gavel, HeartPulse
} from 'lucide-react';

export default function LandingPage({ onGetStarted, onLogin }) {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div style={{ background: 'var(--bg-main)', color: 'var(--text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* A) Navbar */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 5%',
        position: 'sticky',
        top: 0,
        background: 'rgba(11, 17, 32, 0.8)',
        backdropFilter: 'blur(12px)',
        zIndex: 1000,
        borderBottom: '1px solid var(--border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: '#10B981', padding: '8px', borderRadius: '12px' }}>
            <ShieldCheck color="white" size={24} />
          </div>
          <span style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '-1px' }}>Sumbandila</span>
        </div>
        
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }} className="hide-mobile">
          {['Home', 'How It Works', 'Categories', 'Pricing'].map(link => (
            <span key={link} style={{ fontSize: '14px', fontWeight: 600, color: '#94A3B8', cursor: 'pointer', transition: '0.3s' }}>{link}</span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <button onClick={onLogin} style={{ background: 'transparent', border: 'none', color: 'white', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>Login</button>
          <button 
            onClick={onGetStarted}
            style={{ 
              background: '#10B981', 
              color: 'white', 
              padding: '12px 24px', 
              borderRadius: '12px', 
              border: 'none', 
              fontWeight: 800, 
              fontSize: '14px', 
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(16, 185, 129, 0.2)'
            }}
          >
            Verify Now
          </button>
        </div>
      </nav>

      {/* B) Hero Section */}
      <header style={{ padding: '100px 5% 120px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ 
          position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)',
          zIndex: 0
        }} />
        
        <motion.div {...fadeInUp} style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.1)', 
            padding: '8px 20px', borderRadius: '100px', border: '1px solid rgba(16, 185, 129, 0.2)',
            color: '#10B981', fontSize: '13px', fontWeight: 800, marginBottom: '32px'
          }}>
            <Zap size={14} /> NEW: March 2026 Registry Update Live
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '60px', alignItems: 'center', textAlign: 'left' }}>
            <div>
              <h1 style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1.1, marginBottom: '24px' }}>
                Verification in the <br/> <span style={{ color: '#10B981' }}>Palm of Your Hand</span>
              </h1>
              <p style={{ fontSize: '18px', color: '#94A3B8', maxWidth: '600px', lineHeight: 1.6, fontWeight: 500, marginBottom: '40px' }}>
                Sumbandila helps you instantly verify whether a school, college, doctor, or lawyer is officially registered and accredited in South Africa.
              </p>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0' }}>
                {["Verify institutions & professionals instantly", "Protect yourself from fraud and fake qualifications", "Trusted verification from regulatory sources"].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', fontWeight: 700, fontSize: '15px' }}>
                    <ShieldCheck size={18} color="#10B981" /> {item}
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', gap: '20px' }}>
                <button 
                  onClick={onGetStarted}
                  style={{ 
                    background: '#10B981', color: 'white', padding: '18px 32px', borderRadius: '16px', border: 'none', 
                    fontWeight: 900, fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px',
                    boxShadow: '0 20px 40px rgba(16, 185, 129, 0.2)'
                  }}
                >
                  Start Verification <ArrowRight size={20} />
                </button>
              </div>
            </div>

            {/* Quick Verification Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              style={{ 
                background: 'var(--card-bg)', padding: '40px', borderRadius: '32px', border: '1px solid var(--border)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.4)', textAlign: 'left'
              }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '8px' }}>Quick Verification</h3>
              <p style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '24px', fontWeight: 500 }}>Search by name or registration number.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input 
                  type="text" 
                  placeholder="Enter name or reg number..." 
                  style={{ 
                    width: '100%', padding: '16px', borderRadius: '14px', border: '1px solid var(--border)', 
                    background: 'rgba(255,255,255,0.03)', color: 'white', outline: 'none', fontWeight: 600
                  }} 
                />
                <button 
                  onClick={onGetStarted}
                  style={{ 
                    width: '100%', padding: '18px', borderRadius: '14px', background: '#10B981', color: 'white', 
                    border: 'none', fontWeight: 900, fontSize: '16px', cursor: 'pointer'
                  }}
                >
                  Verify Now
                </button>
              </div>
              <p style={{ marginTop: '20px', fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Lock size={12} /> Secure verification powered by trusted registries.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </header>

      {/* C) Trust / Stats Section */}
      <section style={{ padding: '80px 5%', background: 'rgba(11, 17, 32, 0.5)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '48px' }}>Helping Communities Stay Safe</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
            {[
              { label: "Verified Institutions", val: "1000+", icon: School },
              { label: "Verified Professionals", val: "5000+", icon: Users },
              { label: "Fast Results", val: "Seconds", icon: Zap },
              { label: "Prevention Made Easy", val: "100%", icon: ShieldCheck }
            ].map((stat, i) => (
              <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }} style={{ padding: '32px', background: 'var(--card-bg)', borderRadius: '24px', border: '1px solid var(--border)' }}>
                <div style={{ color: '#10B981', marginBottom: '16px' }}><stat.icon size={32} /></div>
                <div style={{ fontSize: '32px', fontWeight: 900, marginBottom: '8px' }}>{stat.val}</div>
                <div style={{ fontSize: '14px', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* D) Problem Section */}
      <section style={{ padding: '120px 5%' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center' }}>
          <motion.div {...fadeInUp}>
            <div style={{ color: '#EF4444', fontWeight: 900, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>The Crisis</div>
            <h2 style={{ fontSize: '42px', fontWeight: 900, marginBottom: '24px', lineHeight: 1.1 }}>Fraud is Growing in South Africa</h2>
            <p style={{ fontSize: '18px', color: '#94A3B8', lineHeight: 1.6, marginBottom: '32px' }}>
              Fake colleges, unregistered doctors, and illegal legal practitioners continue to harm citizens every year. Many people lose money, time, and sometimes even their lives due to unverified service providers.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                "Fake qualifications and certificates",
                "Unregistered private colleges",
                "Scam doctors and illegal clinics",
                "Fraud legal services and fake attorneys"
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <AlertTriangle size={20} color="#EF4444" />
                  <span style={{ fontWeight: 600, color: '#FCA5A5' }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div {...fadeInUp} style={{ position: 'relative' }}>
            <div style={{ 
              width: '100%', height: '400px', background: 'var(--card-bg)', borderRadius: '32px', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
            }}>
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <ShieldAlert size={80} color="#EF4444" style={{ marginBottom: '24px' }} />
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#94A3B8' }}>REPORTED FRAUD ATTEMPTS</div>
                <div style={{ fontSize: '48px', fontWeight: 900, color: 'white' }}>84,201</div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#EF4444', marginTop: '8px' }}>+12% INCREASE SINCE 2025</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* E) Solution Section */}
      <section style={{ padding: '120px 5%', background: 'rgba(16, 185, 129, 0.02)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: 900, marginBottom: '24px' }}>Sumbandila Solves This Instantly</h2>
            <p style={{ fontSize: '18px', color: '#94A3B8', maxWidth: '600px', margin: '0 auto' }}>
              A digital verification platform that allows anyone to confirm legitimacy before paying or signing up.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {[
              { title: "Education Verification", text: "Check if a school/college is registered and if courses are accredited.", icon: School, color: "#10B981" },
              { title: "Doctor Verification", text: "Confirm HPCSA registration and practice status.", icon: Stethoscope, color: "#3B82F6" },
              { title: "Lawyer Verification", text: "Verify legal professionals through the correct law regulatory structures.", icon: Gavel, color: "#F59E0B" },
              { title: "Report Fraud", text: "Report suspicious institutions and professionals directly in the app.", icon: ShieldAlert, color: "#EF4444" }
            ].map((sol, i) => (
              <motion.div key={i} {...fadeInUp} style={{ padding: '40px', background: 'var(--card-bg)', borderRadius: '32px', border: '1px solid var(--border)' }}>
                <div style={{ width: '60px', height: '60px', background: `${sol.color}15`, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <sol.icon color={sol.color} size={32} />
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '16px' }}>{sol.title}</h3>
                <p style={{ color: '#94A3B8', lineHeight: 1.6, fontWeight: 500 }}>{sol.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* F) How It Works Section */}
      <section style={{ padding: '120px 5%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '42px', fontWeight: 900, textAlign: 'center', marginBottom: '80px' }}>How It Works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '48px', position: 'relative' }}>
            {[
              { step: "01", title: "Search", text: "Type the name or registration number of the institution or professional.", icon: Search },
              { step: "02", title: "Verify", text: "Sumbandila checks the registration records and accreditation status.", icon: Activity },
              { step: "03", title: "View Results", text: "You get instant status: Verified / Not Verified / Suspicious.", icon: CheckCircle2 },
              { step: "04", title: "Take Action", text: "Download proof, share results, or report fraud.", icon: ShieldCheck }
            ].map((step, i) => (
              <motion.div key={i} {...fadeInUp} transition={{ delay: i * 0.1 }}>
                <div style={{ fontSize: '64px', fontWeight: 900, color: 'rgba(16, 185, 129, 0.1)', marginBottom: '-30px', marginLeft: '-10px' }}>{step.step}</div>
                <div style={{ background: 'var(--card-bg)', padding: '32px', borderRadius: '24px', border: '1px solid var(--border)', position: 'relative', zIndex: 1 }}>
                  <div style={{ color: '#10B981', marginBottom: '20px' }}><step.icon size={28} /></div>
                  <h3 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '12px' }}>{step.title}</h3>
                  <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: 1.6 }}>{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* I) Pricing Section */}
      <section style={{ padding: '120px 5%', background: 'rgba(11, 17, 32, 0.5)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: '42px', fontWeight: 900, marginBottom: '24px' }}>Simple Pricing for Everyone</h2>
            <p style={{ fontSize: '18px', color: '#94A3B8' }}>Choose the plan that fits your needs.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {/* Free Plan */}
            <motion.div {...fadeInUp} style={{ padding: '48px', background: 'var(--card-bg)', borderRadius: '32px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '8px' }}>Free Plan</h3>
              <div style={{ fontSize: '48px', fontWeight: 900, marginBottom: '32px' }}>R0 <span style={{ fontSize: '16px', color: '#94A3B8' }}>/ month</span></div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', flex: 1 }}>
                {["Basic verification search", "View verified/unverified status", "Limited searches per day"].map((feat, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', color: '#94A3B8', fontWeight: 600 }}>
                    <CheckCircle2 size={18} color="#10B981" /> {feat}
                  </li>
                ))}
              </ul>
              <button onClick={onGetStarted} style={{ width: '100%', padding: '18px', borderRadius: '12px', border: '1px solid var(--border)', background: 'transparent', color: 'white', fontWeight: 800, cursor: 'pointer' }}>Get Started Free</button>
            </motion.div>

            {/* Premium Plan */}
            <motion.div {...fadeInUp} style={{ padding: '48px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '32px', border: '2px solid #10B981', display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '24px', right: '24px', background: '#10B981', color: 'white', padding: '4px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 900 }}>POPULAR</div>
              <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '8px' }}>Premium Citizen</h3>
              <div style={{ fontSize: '48px', fontWeight: 900, marginBottom: '32px' }}>R29 <span style={{ fontSize: '16px', color: '#94A3B8' }}>/ month</span></div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', flex: 1 }}>
                {["Unlimited verifications", "PDF proof download", "Full history & saved providers", "Fraud alerts"].map((feat, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', color: 'white', fontWeight: 700 }}>
                    <CheckCircle2 size={18} color="#10B981" /> {feat}
                  </li>
                ))}
              </ul>
              <button onClick={onGetStarted} style={{ width: '100%', padding: '18px', borderRadius: '12px', border: 'none', background: '#10B981', color: 'white', fontWeight: 900, cursor: 'pointer', boxShadow: '0 10px 20px rgba(16, 185, 129, 0.2)' }}>Upgrade Now</button>
            </motion.div>

            {/* Business Plan */}
            <motion.div {...fadeInUp} style={{ padding: '48px', background: 'var(--card-bg)', borderRadius: '32px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '8px' }}>Business Plan</h3>
              <div style={{ fontSize: '48px', fontWeight: 900, marginBottom: '32px' }}>Custom</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', flex: 1 }}>
                {["Bulk verification", "API Access", "Team accounts", "Reports & dashboards"].map((feat, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', color: '#94A3B8', fontWeight: 600 }}>
                    <CheckCircle2 size={18} color="#10B981" /> {feat}
                  </li>
                ))}
              </ul>
              <button style={{ width: '100%', padding: '18px', borderRadius: '12px', border: '1px solid var(--border)', background: 'transparent', color: 'white', fontWeight: 800, cursor: 'pointer' }}>Contact Sales</button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* J) Call To Action Section */}
      <section style={{ padding: '100px 5%', textAlign: 'center' }}>
        <motion.div {...fadeInUp} style={{ maxWidth: '800px', margin: '0 auto', background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', padding: '80px 40px', borderRadius: '48px', color: 'white' }}>
          <h2 style={{ fontSize: '48px', fontWeight: 900, marginBottom: '24px', letterSpacing: '-1.5px' }}>Verify Before You Trust</h2>
          <p style={{ fontSize: '20px', fontWeight: 600, marginBottom: '48px', opacity: 0.9 }}>Don’t risk your money, health, or future. Use Sumbandila today.</p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={onGetStarted}
              style={{ background: 'white', color: '#10B981', padding: '20px 40px', borderRadius: '16px', border: 'none', fontWeight: 900, fontSize: '18px', cursor: 'pointer' }}
            >
              ✅ Verify Now
            </button>
            <button style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '20px 40px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.3)', fontWeight: 800, fontSize: '18px', cursor: 'pointer' }}>
              📲 Download App
            </button>
          </div>
        </motion.div>
      </section>

      {/* K) Footer */}
      <footer style={{ padding: '80px 5% 40px', borderTop: '1px solid var(--border)', background: '#0B1120' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', marginBottom: '80px' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ background: '#10B981', padding: '8px', borderRadius: '12px' }}>
                  <ShieldCheck color="white" size={24} />
                </div>
                <span style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '-1px' }}>Sumbandila</span>
              </div>
              <p style={{ color: '#94A3B8', lineHeight: 1.6, maxWidth: '300px' }}>
                Empowering South Africans with instant, reliable verification for a safer future.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '24px', color: 'white' }}>Platform</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#94A3B8', fontWeight: 600 }}>
                <span>How It Works</span>
                <span>Categories</span>
                <span>Pricing</span>
                <span>Report Fraud</span>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '24px', color: 'white' }}>Company</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#94A3B8', fontWeight: 600 }}>
                <span>About Us</span>
                <span>Contact</span>
                <span>Terms of Service</span>
                <span>Privacy Policy</span>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '24px', color: 'white' }}>Contact</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: '#94A3B8', fontWeight: 600 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Mail size={16} /> support@sumbandila.co.za</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Phone size={16} /> +27 12 345 6789</div>
                <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                  <Facebook size={20} /> <Twitter size={20} /> <Instagram size={20} /> <Linkedin size={20} />
                </div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', borderTop: '1px solid var(--border)', paddingTop: '40px', color: '#64748B', fontSize: '14px', fontWeight: 600 }}>
            © 2026 Sumbandila. All rights reserved. Fighting Corruption through Digital Integrity.
          </div>
        </div>
      </footer>
    </div>
  );
}
