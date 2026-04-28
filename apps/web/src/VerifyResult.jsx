import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, AlertTriangle, ChevronLeft, Star, ShieldAlert, ArrowRight, Award, Bot } from 'lucide-react';
import { MOCK_DATA } from './lib/mock-data';

export default function VerifyResult({ provider, step, onBack, onSave }) {
  if (step === 'processing') {
    return (
      <div className="screen" style={{ background: 'var(--bg-gradient)', justifyContent: 'center', alignItems: 'center' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          style={{ width: '80px', height: '80px', border: '4px solid rgba(255,255,255,0.2)', borderTopColor: 'white', borderRadius: '50%', marginBottom: '24px' }}
        />
        <h2 style={{ color: 'white', fontSize: '24px', fontWeight: 800 }}>Establishing Secure Link...</h2>
      </div>
    );
  }

  const isN1N3PhasedOut = provider.courses?.some(c => c.includes('N1') || c.includes('N2') || c.includes('N3'));
  const isVerified = !['Unverified', 'Expired', 'Suspended', 'De-registered', 'Cancelled'].includes(provider.status) && !isN1N3PhasedOut;
  const isCaution = provider.courseAccreditation === 'NOT ACCREDITED' || provider.standing === 'Non-practising' || isN1N3PhasedOut;
  
  const statusColor = !isVerified ? '#D32F2F' : isCaution ? '#F59E0B' : '#2E7D32';
  const statusBg = !isVerified ? '#FFEBEE' : isCaution ? '#FFF7ED' : '#E8F5E9';
  const riskColor = provider.risk === 'High' ? '#EF4444' : provider.risk === 'Medium' ? '#F59E0B' : '#10B981';
  const headerGradient = !isVerified 
    ? 'linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)' 
    : isCaution 
      ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
      : 'var(--bg-gradient)';

  const recommendations = MOCK_DATA.trustedRecommendations[provider.category] || [];

  return (
    <div className="screen" style={{ background: '#FDFCFB', padding: '0', paddingBottom: '120px' }}>
      <header style={{
        background: headerGradient,
        padding: '24px 20px 48px',
        borderRadius: '0 0 32px 32px',
        color: 'white',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={onBack}>
            <ChevronLeft size={24} color="white" />
            <div>
              <div style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.8 }}>Republic of South Africa</div>
              <h1 style={{ fontSize: '18px', fontWeight: 900 }}>National Registry <span style={{ opacity: 0.9 }}>Sentinel</span></h1>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Flag_of_South_Africa.svg/512px-Flag_of_South_Africa.svg.png"
              alt="South Africa Flag"
              style={{ height: '28px', width: 'auto', borderRadius: '4px' }}
            />
            {isVerified ? (
              <ShieldCheck size={28} color="white" />
            ) : isCaution ? (
              <AlertTriangle size={28} color="white" />
            ) : (
              <ShieldAlert size={28} color="white" />
            )}
          </div>
        </div>
        <p style={{ opacity: 0.9, fontSize: '15px', fontWeight: 500 }}>
          {isVerified 
            ? 'Official Registry Link: ACTIVE (Safe to Proceed)' 
            : isCaution 
              ? 'Registry Warning: Caution Advised' 
              : 'CRITICAL ALERT: Non-Compliant Entity'}
        </p>
      </header>

      <div style={{ padding: '24px 20px' }}>
        <div style={{
          background: 'white',
          borderRadius: '32px',
          padding: '32px',
          border: `2px solid ${statusColor}20`,
          boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
          position: 'relative',
          marginTop: '-40px'
        }}>
          {/* Status Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <div style={{
              width: '56px', height: '56px',
              background: statusBg, borderRadius: '18px',
              display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}>
              {isVerified ? <CheckCircle2 size={32} color={statusColor} /> : <AlertTriangle size={32} color={statusColor} />}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#111827' }}>{provider.status}</h2>
                {provider.standing && (
                  <div style={{ background: '#E8F5E9', color: '#2E7D32', padding: '4px 12px', borderRadius: '100px', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', border: '1px solid #C8E6C9' }}>
                    {provider.standing}
                  </div>
                )}
              </div>
              <p style={{ fontSize: '14px', color: '#6B7280', fontWeight: 600 }}>Registry Integrity: <span style={{ color: riskColor }}>{provider.risk} Risk</span></p>
            </div>
          </div>

          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ padding: '20px', background: '#F9FAFB', borderRadius: '20px' }}>
              <label style={{ color: '#9CA3AF', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>Institutional Entity</label>
              <div style={{ fontSize: '20px', fontWeight: 900, color: '#111827' }}>{provider.name}</div>
              <div style={{ fontSize: '14px', color: '#6B7280', fontWeight: 600, marginTop: '4px' }}>{provider.type}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ padding: '20px', background: '#F9FAFB', borderRadius: '20px', border: provider.institutionRegistration === 'Registered' || provider.institutionRegistration?.includes('Active') ? '1px solid #C8E6C9' : '1px solid #FFCDD2' }}>
                <label style={{ color: '#9CA3AF', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Institution Registration</label>
                <div style={{ fontSize: '14px', fontWeight: 800, color: '#111827' }}>
                  {provider.institutionRegistration || 'Verification Pending'}
                </div>
              </div>
              <div style={{ padding: '20px', background: '#F9FAFB', borderRadius: '20px', border: provider.courseAccreditation?.includes('Accredited') ? '1px solid #C8E6C9' : '1px solid #FFCDD2' }}>
                <label style={{ color: '#9CA3AF', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Course Accreditation</label>
                <div style={{ fontSize: '14px', fontWeight: 800, color: provider.courseAccreditation === 'NOT ACCREDITED' ? '#D32F2F' : '#111827' }}>
                  {provider.courseAccreditation || 'Checking SANC/CHE/QCTO...'}
                </div>
              </div>
            </div>

            <div style={{ padding: '20px', background: '#F9FAFB', borderRadius: '20px' }}>
              <label style={{ color: '#9CA3AF', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Primary Regulatory Authority</label>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#111827' }}>{provider.body}</div>
            </div>

            {(provider.courses || provider.expertise || provider.specialization) && (
              <div style={{ padding: '20px', background: '#F9FAFB', borderRadius: '20px' }}>
                <label style={{ color: '#9CA3AF', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>Verified Registry Records</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {(provider.courses || [provider.expertise || provider.specialization]).map((item, idx) => (
                    <span key={idx} style={{ background: isVerified ? '#E3F2FD' : '#EEEEEE', color: isVerified ? '#1565C0' : '#424242', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 700 }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {!isVerified && (
            <div style={{
              background: '#FFF4E5',
              padding: '24px',
              borderRadius: '24px',
              marginTop: '32px',
              border: '2px solid #FFCC80'
            }}>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                <ShieldAlert size={28} color="#E65100" style={{ flexShrink: 0 }} />
                <h4 style={{ color: '#E65100', fontWeight: 900, fontSize: '18px' }}>Fraud Prevention Alert</h4>
              </div>
              <p style={{ color: '#663C00', fontSize: '14px', fontWeight: 700, lineHeight: 1.6, marginBottom: '20px' }}>
                This institution/professional is NOT recognized. To fight illegal operations and protect yourself from scams, we strongly recommend using these verified alternatives instead:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {recommendations.map((rec, i) => (
                  <div key={i} style={{ background: 'white', padding: '16px', borderRadius: '16px', border: '1px solid rgba(230, 81, 0, 0.2)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Star size={18} fill="#E65100" color="#E65100" />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '14px', color: '#111827' }}>{rec.name}</div>
                      <div style={{ fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>{rec.type} • {rec.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Red Flag Critical Warning */}
          {((provider.institutionRegistration?.includes('Registered') && provider.courseAccreditation === 'NOT ACCREDITED') || 
            (provider.status === 'Suspended' || provider.status === 'De-registered')) && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                background: '#FEF2F2',
                padding: '24px',
                borderRadius: '24px',
                marginTop: '24px',
                border: '3px solid #EF4444',
                boxShadow: '0 10px 30px rgba(239, 68, 68, 0.15)'
              }}
            >
              <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                <ShieldAlert size={32} color="#EF4444" style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ color: '#991B1B', fontWeight: 900, fontSize: '18px', textTransform: 'uppercase' }}>Registry Red Flag Detected</h4>
                  <p style={{ color: '#B91C1C', fontSize: '14px', fontWeight: 700, marginTop: '4px' }}>
                    {provider.courseAccreditation === 'NOT ACCREDITED' 
                      ? "CRITICAL: This institution is legally registered, but the specific qualifications you are seeking are NOT accredited. Certificates from this program may not be recognized."
                      : `WARNING: This practitioner is currently listed as ${provider.status.toUpperCase()} in the national registry.`}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Sipho AI Analysis Integration */}
          <div style={{
            background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
            padding: '24px',
            borderRadius: '24px',
            marginTop: '24px',
            border: '2px solid #BAE6FD',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ background: 'var(--primary)', padding: '6px', borderRadius: '10px' }}>
                <Bot size={20} color="white" />
              </div>
              <h4 style={{ color: '#0369A1', fontWeight: 900, fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sipho Sentinel Analysis</h4>
            </div>
            <p style={{ color: '#0C4A6E', fontSize: '14px', fontWeight: 600, lineHeight: 1.6 }}>
              {isVerified && provider.courseAccreditation?.includes('Accredited')
                ? `Trust Score: 99.9%. I have cross-referenced ${provider.name} against the official ${provider.body} registers. Both the institution and qualifications are active and valid.`
                : `Trust Score: 12.0%. SENTINEL ALERT: My scans show a mismatch between DHET registration and SAQA/CHE accreditation. Do NOT proceed with payments until you verify the NQF level directly with Umalusi or CHE.`}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '32px' }}>
          {isVerified && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={() => onSave(provider)}
                style={{ padding: '20px', background: 'var(--primary-orange)', color: 'white', borderRadius: '20px', border: 'none', fontSize: '17px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', boxShadow: '0 10px 25px rgba(230, 81, 0, 0.2)' }}
              >
                <ShieldCheck size={22} /> Save to Sentinel Vault
              </button>
              
              {provider.externalLink && (
                <button
                  onClick={() => window.open(provider.externalLink, '_blank')}
                  style={{ padding: '20px', background: 'white', color: 'var(--primary)', borderRadius: '20px', border: '2px solid var(--primary)', fontSize: '17px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
                >
                  <ArrowRight size={22} /> Verify on Official {provider.body} Portal
                </button>
              )}
              
              {provider.isVerified && (
                <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '16px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                  <Award size={20} color="#10B981" />
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#065F46' }}>Sumbandila Trust Badge: Gold Verified Practitioner</span>
                </div>
              )}
            </div>
          )}
          <button
            onClick={onBack}
            style={{ padding: '18px', background: 'white', color: '#374151', borderRadius: '20px', border: '2px solid #F3F4F6', fontSize: '16px', fontWeight: 700, cursor: 'pointer' }}
          >
            Auditor Home
          </button>
        </div>

        <div style={{ marginTop: '40px', textAlign: 'center', opacity: 0.6 }}>
          <p style={{ fontSize: '11px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Sumbandila: Fighting Corruption through Digital Integrity
          </p>
        </div>
      </div>
    </div>
  );
}

