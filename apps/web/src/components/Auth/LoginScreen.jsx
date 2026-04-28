'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, ArrowRight, ChevronLeft, Mail, CheckCircle2, Mic } from 'lucide-react';
import { SumbandilaLogo } from '../Branding/Logo';

export default function LoginScreen({ onLogin, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const startVoiceInput = (field) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-ZA';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase().replace(/\s/g, '');
      if (field === 'email') {
        // Simple heuristic for email: replace 'at' with '@' if common
        const formatted = transcript.replace(/at/g, '@');
        setEmail(formatted);
      } else {
        setPassword(transcript);
      }
    };

    recognition.start();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="screen"
      style={{
        background: 'var(--surface-secondary)',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}
    >
      <header style={{ position: 'fixed', top: 0, left: 0, padding: '24px', width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
        <button
          onClick={onBack}
          style={{
            background: 'white',
            padding: '12px',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <ChevronLeft size={20} color="#1F2937" />
        </button>
      </header>

      <div style={{ width: '100%', maxWidth: '440px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '40px' }}>
          {/* Professional Logo */}
          <div style={{ position: 'relative', width: '110px', height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SumbandilaLogo size={100} />
            
            {/* Verified badge dot */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
              style={{
                position: 'absolute',
                bottom: '0px',
                right: '0px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#4ADE80',
                border: '3px solid white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
              }}
            >
              <CheckCircle2 size={16} color="white" strokeWidth={3} />
            </motion.div>
          </div>
          <div style={{ width: '2px', height: '70px', background: 'rgba(0,0,0,0.06)', borderRadius: '2px' }} />
          <div style={{
            background: 'var(--bg-gradient)',
            boxShadow: '0 15px 30px rgba(37, 99, 235, 0.2)',
            width: '64px',
            height: '64px',
            borderRadius: '18px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <ShieldCheck size={36} color="white" strokeWidth={2.5} />
          </div>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <div style={{ fontSize: '13px', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '8px' }}>
            Republic of South Africa
          </div>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--text-main)', marginBottom: '8px', letterSpacing: '-1.2px', lineHeight: 1.1 }}>
            National Registry <span style={{ color: 'var(--primary-orange)' }}>Sentinel</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', fontWeight: 600 }}>Access Hub: Authorized Personnel Only</p>
        </div>

        <div style={{ width: '100%', background: 'white', padding: '40px 32px', borderRadius: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.08)', border: '1px solid #F1F5F9' }}>
          <div style={{ marginBottom: '24px', textAlign: 'left' }}>
            <label style={{ display: 'block', fontWeight: 800, fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Registry Email</label>
            <div className="input-field-container" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Mail size={18} color="#94A3B8" />
              <input
                type="email"
                placeholder="sentinel@sumbandila.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ flex: 1, paddingRight: '40px' }}
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => startVoiceInput('email')}
                style={{ position: 'absolute', right: '12px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <Mic size={18} color="var(--primary)" />
              </motion.button>
            </div>
          </div>

          <div style={{ marginBottom: '32px', textAlign: 'left' }}>
            <label style={{ display: 'block', fontWeight: 800, fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Sentinel Key</label>
            <div className="input-field-container" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Lock size={18} color="#94A3B8" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ flex: 1, paddingRight: '40px' }}
              />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => startVoiceInput('password')}
                style={{ position: 'absolute', right: '12px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <Mic size={18} color="var(--primary)" />
              </motion.button>
            </div>
          </div>

          <button
            onClick={() => onLogin({ email, password })}
            className="primary-btn"
            style={{
              height: '64px',
              fontSize: '17px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            Authenticate <ArrowRight size={20} />
          </button>

          <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '32px' }}>
            Securing Sovereign Registry Data
          </p>
        </div>

        <button
          onClick={() => { setEmail('admin@sumbandila.com'); setPassword('admin123'); }}
          style={{
            marginTop: '32px',
            background: 'transparent',
            border: 'none',
            color: 'var(--primary)',
            fontWeight: 800,
            fontSize: '13px',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          Load Debug Clearance
        </button>
      </div>
    </motion.div>
  );
}
