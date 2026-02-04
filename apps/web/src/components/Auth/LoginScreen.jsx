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
      style={{ background: '#FFFFFF', padding: '0' }}
    >
      <header style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={onBack}>
        <ChevronLeft size={24} color="#1F2937" />
        <span style={{ fontWeight: 600, fontSize: '18px' }}>Back</span>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px', marginTop: '20px' }}>
        <div style={{ 
          width: '100px', 
          height: '100px', 
          background: '#FFF7ED', 
          borderRadius: '50%', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <UserIcon size={48} color="#E65100" />
        </div>

        <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>Welcome Back</h2>
        <p style={{ color: '#6B7280', fontSize: '16px', marginBottom: '40px' }}>Sign in to your Sumbandila account</p>

        <div style={{ width: '100%', maxWidth: '400px' }}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '14px', marginBottom: '10px' }}>Email Address</label>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              background: '#F9FAFB', 
              borderRadius: '16px', 
              padding: '16px',
              border: '1px solid #F3F4F6'
            }}>
              <Mail size={20} color="#9CA3AF" style={{ marginRight: '12px' }} />
              <input 
                type="email" 
                placeholder="Enter your email" 
                style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '16px', color: '#111827' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '14px', marginBottom: '10px' }}>Password</label>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              background: '#F9FAFB', 
              borderRadius: '16px', 
              padding: '16px',
              border: '1px solid #F3F4F6'
            }}>
              <Lock size={20} color="#9CA3AF" style={{ marginRight: '12px' }} />
              <input 
                type="password" 
                placeholder="Enter your password" 
                style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '16px', color: '#111827' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            onClick={() => onLogin({ email, password })}
            style={{ 
              width: '100%', 
              background: '#D84315', 
              color: 'white', 
              padding: '18px', 
              borderRadius: '16px', 
              border: 'none', 
              fontSize: '18px', 
              fontWeight: 700,
              cursor: 'pointer',
              marginBottom: '24px'
            }}
          >
            Sign In
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ flex: 1, height: '1px', background: '#F3F4F6' }} />
            <span style={{ color: '#9CA3AF', fontSize: '14px', fontWeight: 600 }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: '#F3F4F6' }} />
          </div>

          <button 
            style={{ 
              width: '100%', 
              background: 'white', 
              color: '#374151', 
              padding: '18px', 
              borderRadius: '16px', 
              border: '1px solid #E5E7EB', 
              fontSize: '16px', 
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Create New Account
          </button>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <p style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 600, marginBottom: '8px' }}>Test Credentials (Tap to Fill)</p>
            <p style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 500 }}>Admin: admin@sumbandila.com / admin123</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
