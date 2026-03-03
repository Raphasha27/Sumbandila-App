import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, Flag, CheckCircle2 } from 'lucide-react';

export default function ReportModal({ isOpen, onClose }) {
    const [step, setStep] = useState('form');
    const [formData, setFormData] = useState({
        name: '',
        type: 'Bogus College',
        description: '',
        location: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setStep('submitting');
        setTimeout(() => {
            setStep('success');
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(15, 23, 42, 0.8)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 2000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    style={{
                        background: 'white',
                        width: '100%',
                        maxWidth: '500px',
                        borderRadius: '32px',
                        overflow: 'hidden',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    {/* Header */}
                    <div style={{ background: 'var(--bg-gradient)', padding: '24px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <ShieldAlert size={24} />
                            <h3 style={{ fontSize: '20px', fontWeight: 900 }}>Secure Report</h3>
                        </div>
                        <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}>
                            <X size={20} />
                        </button>
                    </div>

                    <div style={{ padding: '32px' }}>
                        {step === 'form' && (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <label style={{ fontSize: '13px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Entity Name</label>
                                    <input
                                        required
                                        placeholder="e.g. Fake Degree Academy"
                                        style={{ width: '100%', padding: '16px', borderRadius: '16px', border: '1px solid #E2E8F0', background: '#F8FAFC', fontWeight: 600 }}
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label style={{ fontSize: '13px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Violation Type</label>
                                    <select
                                        style={{ width: '100%', padding: '16px', borderRadius: '16px', border: '1px solid #E2E8F0', background: '#F8FAFC', fontWeight: 600 }}
                                        value={formData.type}
                                        onChange={e => setFormData({ ...formData, type: e.target.value })}
                                    >
                                        <option>Bogus College/School</option>
                                        <option>Unregistered Medical Practitioner</option>
                                        <option>Fraudulent Lawyer</option>
                                        <option>Fake Accreditation Documents</option>
                                        <option>Corruption/Bribery</option>
                                    </select>
                                </div>

                                <div>
                                    <label style={{ fontSize: '13px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Brief Description</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Describe the suspicious activity..."
                                        style={{ width: '100%', padding: '16px', borderRadius: '16px', border: '1px solid #E2E8F0', background: '#F8FAFC', fontWeight: 600, resize: 'none' }}
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="primary-btn"
                                    style={{ background: '#EF4444', marginTop: '12px' }}
                                >
                                    <Flag size={20} /> Submit Anonymous Report
                                </button>
                                <p style={{ textAlign: 'center', fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>Your identity is protected by end-to-end encryption.</p>
                            </form>
                        )}

                        {step === 'submitting' && (
                            <div style={{ padding: '60px 0', textAlign: 'center' }}>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                    style={{ width: '64px', height: '64px', borderRadius: '50%', border: '4px solid #F1F5F9', borderTopColor: '#EF4444', margin: '0 auto 24px' }}
                                />
                                <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#1E293B' }}>Transmitting to Authorities...</h4>
                                <p style={{ color: '#64748B', marginTop: '8px' }}>Routing through secure Sentinel nodes</p>
                            </div>
                        )}

                        {step === 'success' && (
                            <div style={{ padding: '40px 0', textAlign: 'center' }}>
                                <div style={{ width: '80px', height: '80px', background: '#DCFCE7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                                    <CheckCircle2 size={48} color="#15803D" />
                                </div>
                                <h4 style={{ fontSize: '24px', fontWeight: 900, color: '#1E293B' }}>Report Filed</h4>
                                <p style={{ color: '#64748B', marginTop: '12px', lineHeight: 1.6 }}>Thank you for helping us fight corruption. Your report has been logged and assigned to the national investigation unit.</p>

                                <button
                                    onClick={onClose}
                                    style={{ marginTop: '32px', width: '100%', padding: '16px', borderRadius: '16px', border: '1px solid #E2E8F0', background: 'white', fontWeight: 800, cursor: 'pointer' }}
                                >
                                    Close Secure Panel
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
