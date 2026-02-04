import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, School, Stethoscope, Scale, Wallet, Star, ShieldCheck, Info, FileText, QrCode, User as UserIcon, Building2, Users2, Mic, TrendingUp, Globe, AlertCircle, Activity, Sparkles, Minimize2 } from 'lucide-react';
import { CategoryCard } from '../Navigation';
import { MOCK_DATA } from '../../lib/mock-data';
import SumbandilaAI from '../SumbandilaAI';

export default function Dashboard({ user, onVerify, onSelectCategory, onNav, onSearchChange, searchQuery }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="dashboard-container"
      style={{ background: '#FDFCFB', minHeight: '100vh', paddingBottom: '40px' }}
    >
      {/* Header */}
      <div style={{ 
        background: 'var(--bg-gradient)', 
        padding: '24px 20px 48px', 
        borderRadius: '0 0 32px 32px',
        color: 'white',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '40px', height: '40px', border: '2.5px solid white', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ShieldCheck size={28} color="white" strokeWidth={2.5} />
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.5px' }}>Sumbandila</h1>
          </div>
          <p style={{ opacity: 0.9, fontSize: '15px', fontWeight: 500 }}>Verification in the palm of your hand</p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', background: 'rgba(255,255,255,0.15)', padding: '6px 16px', borderRadius: '100px', backdropFilter: 'blur(10px)' }}>
            <motion.div 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ADE80' }} 
            />
            <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Registry Live Sync</span>
          </div>
          
          <div style={{ display: 'flex', gap: '24px', marginTop: '16px', background: 'rgba(255,255,255,0.1)', padding: '12px 24px', borderRadius: '20px', backdropFilter: 'blur(5px)' }}>
            <div onClick={() => onNav('qr-scan')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
               <QrCode size={20} color="white" />
               <span style={{ fontSize: '11px', fontWeight: 700, opacity: 0.9 }}>Scanner</span>
            </div>
            <div onClick={() => onNav('profile')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
               <UserIcon size={20} color="white" />
               <span style={{ fontSize: '11px', fontWeight: 700, opacity: 0.9 }}>Profile</span>
            </div>
            <div onClick={() => alert('Monitoring emerging high-risk entities...')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
               <TrendingUp size={20} color="white" />
               <span style={{ fontSize: '11px', fontWeight: 700, opacity: 0.9 }}>Alerts</span>
            </div>
            <div onClick={() => alert('Fetching latest registry news...')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
               <Globe size={20} color="white" />
               <span style={{ fontSize: '11px', fontWeight: 700, opacity: 0.9 }}>News</span>
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
                onChange={(e) => onSearchChange(e.target.value)}
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

            <div style={{ 
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
            }}>
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

        {/* Real-time Ticker / Recent Activity */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontWeight: 800, color: '#111827', fontSize: '18px' }}>Global Auditing Activity</h3>
            <Activity size={20} color="var(--primary-orange)" />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { text: "Verified 'Boston City Campus' in Pretoria", time: "2 min ago", type: "edu" },
              { text: "Security Alert: Bogus College detected in JHB", time: "15 min ago", type: "alert" },
              { text: "Dr. Thabo Mokoena's HPCSA status confirmed", time: "52 min ago", type: "med" }
            ].map((item, i) => (
              <div key={i} style={{ 
                background: 'white', 
                padding: '16px 20px', 
                borderRadius: '20px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '16px',
                border: '1px solid #F3F4F6',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
              }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.type === 'alert' ? '#EF4444' : '#10B981' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#374151', textAlign: 'left' }}>{item.text}</div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#9CA3AF', textAlign: 'left' }}>{item.time}</div>
                </div>
              </div>
            ))}
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
               <div style={{ color: 'var(--primary-orange)', fontSize: '24px', fontWeight: 900 }}>98.4%</div>
            </div>
            <div style={{ background: 'white', padding: '20px', borderRadius: '24px', border: '1px solid #F3F4F6', textAlign: 'center' }}>
               <div style={{ color: '#6B7280', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Vetted Today</div>
               <div style={{ color: '#111827', fontSize: '24px', fontWeight: 900 }}>1,248</div>
            </div>
          </div>
        </div>

        {/* Report Feature */}
        <button 
          onClick={() => alert('Opening Sentinel Secure Reporting channel...')}
          style={{
            width: '100%',
            background: 'white',
            color: '#111827',
            padding: '24px',
            borderRadius: '24px',
            border: '2px dashed #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            cursor: 'pointer'
          }}
        >
          <AlertCircle size={22} color="#EF4444" />
          <span style={{ fontWeight: 800, fontSize: '16px' }}>Report Suspicious Entity</span>
        </button>
      </div>

      <SumbandilaAI />
    </motion.div>
  );
}
