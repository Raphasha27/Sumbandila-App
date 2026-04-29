import { motion } from 'framer-motion';
import { ShieldCheck, Calendar, ArrowRight, Trash2, FileText } from 'lucide-react';
import { BottomNav } from '../Navigation';
import { useRegistryStore } from '../../store/useRegistryStore';

export default function Vault({ onViewCert }) {
  const {
    vault: vaultItems,
    removeFromVault: onRemove,
    clearVault: onClear,
    setScreen
  } = useRegistryStore();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="screen"
      style={{ paddingBottom: '120px' }}
    >
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px', marginTop: '20px' }}>
        <h3 style={{ fontWeight: 900, fontSize: '36px', color: 'var(--primary)', letterSpacing: '-2px' }}>Secure Vault</h3>
        {vaultItems.length > 0 && (
          <button
            onClick={onClear}
            style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', border: 'none', padding: '10px 18px', borderRadius: '14px', fontSize: '13px', fontWeight: 800, cursor: 'pointer' }}
          >
            Purge Vault
          </button>
        )}
      </header>

      {vaultItems.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh', textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'var(--surface-secondary)', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '24px', opacity: 0.5 }}>
            <FileText size={32} color="var(--text-muted)" />
          </div>
          <h4 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary)' }}>Vault is Empty</h4>
          <p style={{ color: 'var(--text-muted)', maxWidth: '280px', marginTop: '8px', fontWeight: 500 }}>Verified institutions you save will appear here for quick access.</p>
        </div>
      ) : (
        <div className="grid-layout grid-layout-2">
          {vaultItems.map((item, i) => (
            <motion.div
              key={item.id || i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="premium-card"
              style={{ padding: '28px', background: 'white', border: '1px solid rgba(0,0,0,0.03)' }}
            >
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: 'var(--surface-secondary)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <ShieldCheck size={24} color="var(--primary)" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 900, fontSize: '18px', color: 'var(--primary)' }}>{item.name}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 600, marginTop: '2px' }}>{item.body}</div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
                    <Calendar size={14} color="var(--text-muted)" />
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>VERIFIED: {item.savedAt || 'Recently'}</span>
                  </div>
                </div>
                <div className="status-badge status-verified">
                  ACTIVE
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button
                  className="primary-btn"
                  style={{ flex: 1, height: '52px', fontSize: '14px' }}
                  onClick={() => onViewCert(item)}
                >
                  View Passport <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                </button>
                <button
                  style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'rgba(239, 68, 68, 0.05)', color: 'var(--error)', border: '1px solid rgba(239, 68, 68, 0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                  onClick={() => onRemove(item.id || i)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <BottomNav active="history" onNav={setScreen} />
    </motion.div>
  );
}
