import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, AlertTriangle, ChevronLeft, Star, ShieldAlert, Download, Activity, Globe, Database } from 'lucide-react';
import { MOCK_DATA } from '../../lib/mock-data';
import { RegistryCertService } from '../../services/RegistryCertificateService';
import { calculateTrustScore } from '../../lib/trustAI';

export default function VerifyResult({ provider, step, onBack, onSave }) {
  if (step === 'processing') {
    return (
      <div className="screen" style={{ background: 'var(--bg-main)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '24px' }}>
        <div style={{ position: 'relative' }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            style={{ width: '100px', height: '100px', border: '3px solid rgba(16, 185, 129, 0.1)', borderTopColor: '#10B981', borderRadius: '50%' }}
          />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <Activity size={32} color="#10B981" />
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'var(--text-main)', fontSize: '24px', fontWeight: 900, letterSpacing: '-0.5px' }}>Integrity Pulse Check</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginTop: '8px' }}>Scanning National Registry Hashes...</p>
        </div>
      </div>
    );
  }

  const trustData = calculateTrustScore(provider);
  const isVerified = provider.status === 'VERIFIED';
  const riskColor = trustData.color;

  const recommendations = MOCK_DATA.trustedRecommendations[provider.category] || [];

  return (
    <div className="screen" style={{ background: 'var(--bg-main)', padding: '0', paddingBottom: '120px' }}>
      {/* Official RSA Header */}
      <header style={{
        background: isVerified ? 'linear-gradient(135deg, #0B1120 0%, #1E293B 100%)' : 'linear-gradient(135deg, #450A0A 0%, #7F1D1D 100%)',
        padding: '32px 20px 60px',
        borderBottom: `1px solid ${isVerified ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
        position: 'relative'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <motion.div 
            whileTap={{ scale: 0.95 }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} 
            onClick={onBack}
          >
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ChevronLeft size={24} color="white" />
            </div>
            <div>
              <div style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#94A3B8' }}>Republic of South Africa</div>
              <h1 style={{ fontSize: '18px', fontWeight: 900, color: 'white' }}>Sentinel <span style={{ color: '#10B981' }}>Registry</span></h1>
            </div>
          </motion.div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Flag_of_South_Africa.svg/512px-Flag_of_South_Africa.svg.png"
              alt="South Africa Flag"
              style={{ height: '24px', width: 'auto', borderRadius: '3px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}
            />
            <ShieldCheck size={24} color={isVerified ? '#10B981' : '#EF4444'} />
          </div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              background: isVerified ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              padding: '8px 16px',
              borderRadius: '100px',
              border: `1px solid ${isVerified ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
              color: isVerified ? '#10B981' : '#FCA5A5',
              fontSize: '13px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            {isVerified ? <CheckCircle2 size={16} /> : <ShieldAlert size={16} />}
            {isVerified ? 'Official Data Match Verified' : 'Critical Integrity Warning'}
          </motion.div>
        </div>
      </header>

      <div style={{ padding: '0 20px' }}>
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            background: 'var(--card-bg)',
            borderRadius: '32px',
            padding: '32px',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow)',
            position: 'relative',
            marginTop: '-32px'
          }}
        >
          {/* AI Trust Score Metric */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
            <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                <motion.circle 
                  cx="60" cy="60" r="54" 
                  fill="none" 
                  stroke={riskColor} 
                  strokeWidth="8" 
                  strokeDasharray="339.29"
                  initial={{ strokeDashoffset: 339.29 }}
                  animate={{ strokeDashoffset: 339.29 - (339.29 * trustData.score) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div style={{ position: 'absolute', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 900, color: 'white' }}>{trustData.score}</div>
                <div style={{ fontSize: '10px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase' }}>Trust Score</div>
              </div>
            </div>
          </div>

          {/* Institutional Branding */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Institutional Entity</div>
            <h2 style={{ fontSize: '26px', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-0.5px' }}>{provider.name}</h2>
            <div style={{ fontSize: '15px', color: 'var(--text-muted)', fontWeight: 600, marginTop: '6px' }}>{provider.type} • {provider.location || 'National'}</div>
          </div>

          {/* Core Verification Data */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid var(--border)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>Registry ID</div>
              <div style={{ fontSize: '16px', fontWeight: 900, color: '#10B981' }}>
                {provider.emisNumber || provider.hpcsaNumber || provider.lpcNumber || provider.reg}
              </div>
            </div>
            <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid var(--border)' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>Auth Body</div>
              <div style={{ fontSize: '16px', fontWeight: 900, color: 'var(--text-main)' }}>{provider.body}</div>
            </div>
          </div>

          <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid var(--border)', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase' }}>Official Status</div>
              <div style={{ fontSize: '11px', color: riskColor, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{trustData.level} Profile</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontSize: '20px', fontWeight: 900, color: 'white' }}>{provider.status}</div>
              {provider.standing && (
                <div style={{ background: '#10B981', color: 'white', padding: '4px 12px', borderRadius: '100px', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }}>
                  {provider.standing}
                </div>
              )}
            </div>
          </div>

          {/* Accredited Courses / Expertise */}
          {(provider.courses || provider.expertise || provider.specialization) && (
            <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid var(--border)', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Database size={16} color="#3B82F6" />
                <div style={{ color: 'var(--text-muted)', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase' }}>Accredited Registry Records</div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(provider.courses || [provider.expertise || provider.specialization]).map((item, idx) => (
                  <span key={idx} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#60A5FA', padding: '8px 14px', borderRadius: '12px', fontSize: '13px', fontWeight: 700, border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* AI Analysis Card */}
          <div style={{
            background: `${riskColor}10`,
            padding: '24px',
            borderRadius: '24px',
            border: `1px solid ${riskColor}30`,
            position: 'relative'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <Activity size={18} color={riskColor} />
              <h4 style={{ color: riskColor, fontWeight: 900, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sipho AI Sentinel Audit</h4>
            </div>
            <p style={{ color: 'var(--text-main)', fontSize: '14px', fontWeight: 500, lineHeight: 1.6, opacity: 0.9 }}>
              {trustData.analysis}
            </p>
          </div>

          {!isVerified && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              padding: '24px',
              borderRadius: '24px',
              marginTop: '24px',
              border: '1px solid rgba(239, 68, 68, 0.3)'
            }}>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                <ShieldAlert size={28} color="#EF4444" style={{ flexShrink: 0 }} />
                <h4 style={{ color: '#EF4444', fontWeight: 900, fontSize: '18px' }}>Protection Protocol</h4>
              </div>
              <p style={{ color: '#FCA5A5', fontSize: '14px', fontWeight: 600, lineHeight: 1.6, marginBottom: '20px' }}>
                Avoid this entity. We recommend these officially vetted alternatives for your protection:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {recommendations.map((rec, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Star size={18} fill="#F59E0B" color="#F59E0B" />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '14px', color: 'white' }}>{rec.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>{rec.type} • {rec.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
          {isVerified && (
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => onSave(provider)}
              style={{ padding: '20px', background: '#10B981', color: 'white', borderRadius: '20px', border: 'none', fontSize: '17px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', boxShadow: '0 8px 25px rgba(16, 185, 129, 0.2)' }}
            >
              <ShieldCheck size={22} /> Save to Sentinel Vault
            </motion.button>
          )}

          {isVerified && (
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => RegistryCertService.generateCertificate(provider)}
              style={{ padding: '18px', background: 'rgba(255,255,255,0.05)', color: 'white', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '16px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
            >
              <Download size={20} /> Download Official PDF
            </motion.button>
          )}
          
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onBack}
            style={{ padding: '18px', background: 'transparent', color: '#94A3B8', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '16px', fontWeight: 700, cursor: 'pointer' }}
          >
            Auditor Home
          </motion.button>
        </div>

        <div style={{ marginTop: '40px', textAlign: 'center', opacity: 0.4 }}>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Sumbandila: Digital Integrity for South Africa
          </p>
        </div>
      </div>
    </div>
  );
}

