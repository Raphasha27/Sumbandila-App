import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, ShieldCheck, Lock, CheckCircle2, ExternalLink } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, plan }) {
    const [step, setStep] = useState('payment'); // payment, processing, success

    if (!isOpen) return null;

    const handlePayment = (e) => {
        e.preventDefault();
        setStep('processing');
        // Simulate secure verification with national gateway
        setTimeout(() => {
            setStep('success');
        }, 2500);
    };

    const plans = {
        auditor: {
            name: "Individual Auditor",
            price: "R99",
            features: ["Unlimited Verifications", "Sentinel Vault Storage", "Email Alerts"]
        },
        entity: {
            name: "Institutional Entity",
            price: "R499",
            features: ["Full API Access", "Compliance Monitoring", "Bulk Verification", "Admin Dashboard"]
        },
        donation: {
            name: "Registry Expansion Fund",
            price: "Custom",
            features: ["Non-profit Contribution", "Community Impact", "Infrastructure Support"]
        }
    };

    const currentPlan = plans[plan] || plans.auditor;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(12px)',
                    zIndex: 3000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px'
                }}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    style={{
                        background: 'white',
                        width: '100%',
                        maxWidth: '480px',
                        borderRadius: '36px',
                        overflow: 'hidden',
                        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.6)'
                    }}
                >
                    {/* Header */}
                    <div style={{ background: 'var(--bg-gradient)', padding: '24px 32px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <ShieldCheck size={24} />
                            <h3 style={{ fontSize: '18px', fontWeight: 900, letterSpacing: '-0.5px' }}>Secure Gateway</h3>
                        </div>
                        <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}>
                            <X size={18} />
                        </button>
                    </div>

                    <div style={{ padding: '32px' }}>
                        {step === 'payment' && (
                            <>
                                <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: '20px', marginBottom: '24px', border: '1px solid #E2E8F0' }}>
                                    <div style={{ fontSize: '12px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>Selected Plan</div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ fontSize: '20px', fontWeight: 900, color: '#1E293B' }}>{currentPlan.name}</div>
                                        <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--primary)' }}>{currentPlan.price}</div>
                                    </div>
                                </div>

                                <form onSubmit={handlePayment} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div>
                                        <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Payment Method</label>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                            <div style={{ border: '2px solid var(--primary)', background: '#EFF6FF', padding: '12px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyCenter: 'center', gap: '8px', cursor: 'pointer' }}>
                                                <CreditCard size={18} color="var(--primary)" />
                                                <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary)' }}>South African Card</span>
                                            </div>
                                            <div style={{ border: '1px solid #E2E8F0', padding: '12px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyCenter: 'center', gap: '8px', opacity: 0.6, cursor: 'not-allowed' }}>
                                                <ExternalLink size={18} color="#64748B" />
                                                <span style={{ fontSize: '13px', fontWeight: 800, color: '#64748B' }}>Instant EFT</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <input
                                            required
                                            placeholder="Card Number"
                                            style={{ width: '100%', padding: '16px', borderRadius: '16px', border: '1px solid #E2E8F0', background: '#F8FAFC', fontWeight: 600, fontSize: '15px' }}
                                        />
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                        <input
                                            required
                                            placeholder="MM / YY"
                                            style={{ width: '100%', padding: '16px', borderRadius: '16px', border: '1px solid #E2E8F0', background: '#F8FAFC', fontWeight: 600, fontSize: '15px' }}
                                        />
                                        <input
                                            required
                                            placeholder="CVV"
                                            style={{ width: '100%', padding: '16px', borderRadius: '16px', border: '1px solid #E2E8F0', background: '#F8FAFC', fontWeight: 600, fontSize: '15px' }}
                                        />
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', background: '#F0FDF4', padding: '12px', borderRadius: '12px' }}>
                                        <Lock size={14} />
                                        <span style={{ fontSize: '11px', fontWeight: 800 }}>End-to-End SSL Encrypted Processing</span>
                                    </div>

                                    <button
                                        type="submit"
                                        className="primary-btn"
                                        style={{ marginTop: '12px' }}
                                    >
                                        Authorize {currentPlan.name}
                                    </button>
                                </form>
                            </>
                        )}

                        {step === 'processing' && (
                            <div style={{ padding: '60px 0', textAlign: 'center' }}>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    style={{ width: '64px', height: '64px', borderRadius: '50%', border: '4px solid #F1F5F9', borderTopColor: 'var(--primary)', margin: '0 auto 24px' }}
                                />
                                <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#1E293B' }}>Securing Transaction...</h4>
                                <p style={{ color: '#64748B', marginTop: '8px', fontSize: '14px', fontWeight: 600 }}>Connecting to the National Payment Gateway</p>
                            </div>
                        )}

                        {step === 'success' && (
                            <div style={{ padding: '40px 0', textAlign: 'center' }}>
                                <div style={{ width: '80px', height: '80px', background: '#DCFCE7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                                    <CheckCircle2 size={48} color="#15803D" />
                                </div>
                                <h4 style={{ fontSize: '24px', fontWeight: 900, color: '#1E293B' }}>Payment Successful</h4>
                                <p style={{ color: '#64748B', marginTop: '12px', lineHeight: 1.6, fontWeight: 600 }}>
                                    {plan === 'donation'
                                        ? "Thank you for your generous contribution to the Registry Expansion Fund. Your support helps protect our nation's integrity."
                                        : `Your ${currentPlan.name} plan is now active. A digital receipt has been sent to your registry email.`}
                                </p>

                                <button
                                    onClick={onClose}
                                    style={{ marginTop: '32px', width: '100%', padding: '16px', borderRadius: '16px', border: '1px solid #E2E8F0', background: 'white', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                                >
                                    Return to Sentinel
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
