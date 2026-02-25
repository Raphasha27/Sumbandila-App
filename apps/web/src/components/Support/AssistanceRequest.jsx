import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft,
    Home as HomeIcon,
    Send,
    ShieldCheck,
    Scale,
    Stethoscope,
    MessageSquare,
    AlertCircle,
    ArrowRight,
    CheckCircle2
} from 'lucide-react';
import { db } from '../../services/DatabaseService';

export default function AssistanceRequest({ onBack, onHome, user }) {
    const [formData, setFormData] = useState({
        category: 'Scam Support',
        details: '',
        contactPreference: 'email'
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await db.logAuditRecord({
            type: 'ASSISTANCE_REQUEST',
            user: user.email,
            category: formData.category,
            timestamp: new Date().toISOString()
        });
        setSubmitted(true);
    };

    const recommendations = [
        {
            title: "RAF Claims Guidance",
            icon: <Scale size={20} color="#3B82F6" />,
            text: "Unsure which doctor to visit for an RAF claim? We provide a list of HPCSA vetted specialists.",
            bg: "#EFF6FF"
        },
        {
            title: "Recovery Investigation",
            icon: <ShieldCheck size={20} color="#10B981" />,
            text: "If you've been scammed by a bogus college, we help compile evidence for official SAPS cases.",
            bg: "#ECFDF5"
        }
    ];

    if (submitted) {
        return (
            <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', background: '#E8F5E9', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 24px' }}>
                    <CheckCircle2 size={40} color="#2E7D32" />
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#111827', marginBottom: '12px' }}>Request Received</h2>
                <p style={{ color: '#6B7280', lineHeight: 1.6, marginBottom: '32px' }}>
                    Your story has been assigned to a Sentinel Case Officer. We will review your details and contact you via {user.email} within 24 hours.
                </p>
                <button className="primary-btn" onClick={onHome}>Return Home</button>
            </div>
        );
    }

    return (
        <div style={{ background: '#FDFCFB', minHeight: '100vh' }}>
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', padding: '24px 20px', background: 'white', borderBottom: '1px solid #F1F5F9' }}>
                <div onClick={onBack} style={{ padding: '10px', background: '#F8FAFC', borderRadius: '12px', cursor: 'pointer', border: '1px solid #E2E8F0' }}>
                    <ChevronLeft size={20} color="#111827" />
                </div>
                <h3 style={{ fontWeight: 800, fontSize: '20px', color: '#111827' }}>Support & Justice</h3>
                <div onClick={onHome} style={{ padding: '10px', background: '#F8FAFC', borderRadius: '12px', cursor: 'pointer', border: '1px solid #E2E8F0' }}>
                    <HomeIcon size={20} color="#111827" />
                </div>
            </header>

            <div style={{ padding: '0 20px 40px' }}>
                <div style={{ background: 'var(--bg-gradient)', padding: '24px', borderRadius: '24px', color: 'white', marginBottom: '32px', boxShadow: '0 10px 30px rgba(37, 99, 235, 0.2)' }}>
                    <h4 style={{ fontWeight: 800, fontSize: '18px', marginBottom: '8px' }}>Sentinel Advocacy Program</h4>
                    <p style={{ fontSize: '14px', opacity: 0.9, lineHeight: 1.5 }}>
                        We help vulnerable citizens fight back against scammers and unaccredited institutions. Share your story, and we'll guide you to justice.
                    </p>
                </div>

                <section style={{ marginBottom: '32px' }}>
                    <h4 style={{ fontWeight: 800, color: '#111827', marginBottom: '16px', fontSize: '15px', textTransform: 'uppercase' }}>Expert Recommendations</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {recommendations.map((rec, i) => (
                            <div key={i} style={{ background: rec.bg, padding: '20px', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.03)', display: 'flex', gap: '16px' }}>
                                <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                                    {rec.icon}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 800, color: '#111827', marginBottom: '4px' }}>{rec.title}</div>
                                    <p style={{ fontSize: '13px', color: '#4B5563', lineHeight: 1.5 }}>{rec.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <form onSubmit={handleSubmit} style={{ background: 'white', padding: '24px', borderRadius: '32px', border: '1px solid #F3F4F6' }}>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', marginBottom: '12px' }}>How can we help you?</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            style={{ width: '100%', padding: '16px', borderRadius: '16px', border: '1px solid #E5E7EB', background: '#F9FAFB', fontWeight: 600 }}
                        >
                            <option>Scam Investigation</option>
                            <option>RAF Claim Assistance</option>
                            <option>Accreditation Guidance</option>
                            <option>Institution Dispute</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', marginBottom: '12px' }}>Share your story</label>
                        <textarea
                            required
                            placeholder="Tell us what happened or what help you need..."
                            value={formData.details}
                            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                            style={{ width: '100%', height: '140px', padding: '16px', borderRadius: '16px', border: '1px solid #E5E7EB', background: '#F9FAFB', fontWeight: 500, lineHeight: 1.5, resize: 'none' }}
                        />
                    </div>

                    <div style={{ marginBottom: '32px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px', background: '#FEF2F2', borderRadius: '16px', border: '1px solid #FEE2E2' }}>
                            <AlertCircle size={18} color="#EF4444" />
                            <span style={{ fontSize: '12px', color: '#991B1B', fontWeight: 700 }}>Your information is protected by L5 Sentinel Privacy.</span>
                        </div>
                    </div>

                    <button type="submit" className="primary-btn" style={{ width: '100%', height: '60px' }}>
                        Submit for Assistance <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
}
