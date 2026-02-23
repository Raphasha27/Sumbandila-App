'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, ArrowRight, ChevronLeft, User as UserIcon, Mail } from 'lucide-react';

export default function LoginScreen({ onLogin, onBack, onShowAbout }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="screen"
      style={{ background: 'var(--surface-secondary)', padding: '0' }}
    >
      <header style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={onBack}>
        <div style={{ background: 'white', padding: '10px', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <ChevronLeft size={20} color="#1F2937" />
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px', marginTop: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
          <div className="logo-container" style={{ background: 'var(--bg-gradient)', boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}>
            <ShieldCheck size={48} color="white" strokeWidth={2.5} />
          </div>
          <img
            src="https://sahistory.org.za/sites/default/files/styles/saho_medium/public/article_image/coat_of_arms_of_south_africa_1.png?itok=9sBtHWJU"
            alt="Coat of Arms"
            style={{ height: '64px', width: 'auto' }}
          />
        </div>
      </div>

      <h2 style={{ fontSize: '36px', fontWeight: 900, color: '#0F172A', marginBottom: '8px', letterSpacing: '-1px' }}>Sentinel Access</h2>
      <p style={{ color: '#64748B', fontSize: '17px', fontWeight: 600, marginBottom: '48px' }}>Authorized Personnel Only</p>

      <div style={{ width: '100%', maxWidth: '400px', background: 'white', padding: '32px', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.03)', border: '1px solid #F1F5F9' }}>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontWeight: 800, fontSize: '12px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Registry Email</label>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: '#F8FAFC',
            borderRadius: '16px',
            padding: '18px 20px',
            border: '1px solid #E2E8F0'
          }}>
            <Mail size={18} color="#94A3B8" style={{ marginRight: '12px' }} />
            <input
              type="email"
              placeholder="sentinel@sumbandila.com"
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '16px', color: '#0F172A', fontWeight: 600 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <label style={{ display: 'block', fontWeight: 800, fontSize: '12px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Sentinel Key</label>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: '#F8FAFC',
            borderRadius: '16px',
            padding: '18px 20px',
            border: '1px solid #E2E8F0'
          }}>
            <Lock size={18} color="#94A3B8" style={{ marginRight: '12px' }} />
            <input
              type="password"
              placeholder="••••••••"
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '16px', color: '#0F172A', fontWeight: 600 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={() => onLogin({ email, password })}
          className="primary-btn"
          style={{
            width: '100%',
            background: 'var(--bg-gradient)',
            height: '64px',
            fontSize: '18px',
            fontWeight: 800,
            boxShadow: '0 10px 25px rgba(230, 81, 0, 0.2)'
          }}
        >
          Authenticate Sentinel <ArrowRight size={20} />
        </button>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <p style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
            Securing South African Registry Databases
          </p>
        </div>
      </div>

      <div style={{ marginTop: '48px', textAlign: 'center' }}>
        <p
          onClick={() => { setEmail('admin@sumbandila.com'); setPassword('admin123'); }}
          style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' }}
        >
          Load Debug Clearance (admin123)
        </p>
      </div>
    </div>
    </motion.div >
  );
}
