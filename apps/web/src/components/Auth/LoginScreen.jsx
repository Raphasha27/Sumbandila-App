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
        background: 'var(--bg-main)',
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
            background: 'var(--card-bg)',
            padding: '12px',
            borderRadius: '16px',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <ChevronLeft size={20} color="white" />
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
                background: '#10B981',
                border: '3px solid var(--card-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
              }}
            >
              <CheckCircle2 size={16} color="white" strokeWidth={3} />
            </motion.div>
          </div>
          <div style={{ width: '2px', height: '70px', background: 'var(--border)', borderRadius: '2px' }} />
          <div style={{
            background: 'linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)',
            boxShadow: '0 15px 30px rgba(30, 64, 175, 0.2)',
            width: '64px',
            height: '64px',
            borderRadius: '18px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <ShieldCheck size={36} color="white" strokeWidth={2.5} />
          </div>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <div style={{ fontSize: '12px', fontWeight: 900, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '8px' }}>
            Republic of South Africa
          </div>
          <h2 style={{ fontSize: '32px', fontWeight: 900, color: 'white', marginBottom: '8px', letterSpacing: '-1.2px', lineHeight: 1.1 }}>
            Login
          </h2>
          <p style={{ color: '#64748B', fontSize: '15px', fontWeight: 600 }}>Access Hub: Authorized Personnel Only</p>
        </div>

        <div style={{ width: '100%', background: 'var(--card-bg)', padding: '40px 32px', borderRadius: '32px', boxShadow: 'var(--shadow)', border: '1px solid var(--border)' }}>
          <div style={{ marginBottom: '24px', textAlign: 'left' }}>
            <label style={{ display: 'block', fontWeight: 800, fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Email Address</label>
            <div className="input-field-container" style={{ position: 'relative', display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <div style={{ paddingLeft: '16px', display: 'flex', alignItems: 'center' }}>
                <Mail size={18} color="#94A3B8" />
              </div>
              <input
                type="email"
                placeholder="sentinel@sumbandila.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ flex: 1, padding: '16px', background: 'transparent', border: 'none', color: 'white', outline: 'none', fontWeight: 600 }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '32px', textAlign: 'left' }}>
            <label style={{ display: 'block', fontWeight: 800, fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Password</label>
            <div className="input-field-container" style={{ position: 'relative', display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <div style={{ paddingLeft: '16px', display: 'flex', alignItems: 'center' }}>
                <Lock size={18} color="#94A3B8" />
              </div>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ flex: 1, padding: '16px', background: 'transparent', border: 'none', color: 'white', outline: 'none', fontWeight: 600 }}
              />
            </div>
          </div>

          <button
            onClick={() => onLogin({ email, password })}
            style={{
              width: '100%',
              height: '64px',
              background: '#10B981',
              color: 'white',
              borderRadius: '20px',
              border: 'none',
              fontSize: '17px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              boxShadow: '0 8px 25px rgba(16, 185, 129, 0.2)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '16px'
            }}
          >
            Login <ArrowRight size={20} />
          </button>

          <button
            style={{
              width: '100%',
              height: '64px',
              background: 'transparent',
              color: 'white',
              borderRadius: '20px',
              border: '1px solid var(--border)',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}
          >
            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" style={{ height: '20px' }} />
            Continue with Google
          </button>

          <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 700, cursor: 'pointer' }}>Forgot Password?</span>
            <span style={{ fontSize: '13px', color: '#10B981', fontWeight: 800, cursor: 'pointer' }}>Create Account</span>
          </div>
        </div>

        <button
          onClick={() => { setEmail('admin@sumbandila.com'); setPassword('admin123'); }}
          style={{
            marginTop: '32px',
            background: 'transparent',
            border: 'none',
            color: '#10B981',
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
