import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft,
    Home as HomeIcon,
    Send,
    ShieldCheck,
    Scale,
    Stethoscope,
    AlertCircle,
    ArrowRight,
    CheckCircle2,
    Building2,
    School,
    Bot,
    Mic,
    Heart,
    MessageSquareText
} from 'lucide-react';
import { db } from '../../services/DatabaseService';

import { MOCK_DATA } from '../../lib/mock-data';

export default function AssistanceRequest({ onBack, onHome, user }) {
    const [formData, setFormData] = useState({
        category: 'Scam Support',
        details: '',
        contactPreference: 'email'
    });
    const [submitted, setSubmitted] = useState(false);
    const [view, setView] = useState('hub'); // 'hub' or 'raf-search'
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await db.saveAssistanceRequest({
            user: user.email,
            category: formData.category,
            details: formData.details,
            timestamp: new Date().toISOString()
        });
        setSubmitted(true);
    };

    const rafDoctors = MOCK_DATA.providers.filter(p => p.status === 'RAF Accredited');
    const filteredDoctors = rafDoctors.filter(d =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const recommendations = [
        {
            title: "Student Protection",
            icon: <School size={20} color="#F59E0B" />,
            text: "Verify DHET registration before paying fees. We help students verify private colleges and report bogus campus operations.",
            bg: "#FFFBEB",
            actionLabel: "Verify College",
            onAction: () => onHome() // Redirect to dashboard for verification
        },
        {
            title: "Legal Excellence Hub",
            icon: <Scale size={20} color="#3B82F6" />,
            text: "Finding accredited law services is critical. We connect you with vetted legal practitioners registered with the LPC.",
            bg: "#EFF6FF"
        },
        {
            title: "Health Compliance",
            icon: <Stethoscope size={20} color="#EF4444" />,
            text: "Protecting community health by verifying HPCSA practitioners and identifying illegal medical facilities.",
            bg: "#FEF2F2"
        },
        {
            title: "RAF Claims Guidance",
            icon: <ShieldCheck size={20} color="#10B981" />,
            text: "Unsure which doctor to visit for an RAF claim? Use our search tool to find HPCSA & RAF vetted specialists.",
            bg: "#ECFDF5",
            actionLabel: "Search RAF Doctors",
            onAction: () => setView('raf-search')
        },
        {
            title: "GBV & Safety Support",
            icon: <Heart size={20} color="#EC4899" />,
            text: "Direct link to victim support services. We provide a safe, confidential space to report GBV and seek emergency guidance.",
            bg: "#FDF2F8",
            actionLabel: "Report GBV",
            onAction: () => setFormData({ ...formData, category: 'GBV Support' })
        },
        {
            title: "Anti-Bullying Hub",
            icon: <MessageSquareText size={20} color="#8B5CF6" />,
            text: "Protecting students and professionals from cyber bullying and workplace harassment. Report incidents for advocacy.",
            bg: "#F5F3FF",
            actionLabel: "Report Bullying",
            onAction: () => setFormData({ ...formData, category: 'Bullying & Harassment' })
        },
        {
            title: "Sipho AI Assistant",
            icon: <Bot size={20} color="var(--primary)" />,
            text: "Prefer to speak your story? Sipho can record your voice and translate it for our team in any SA language.",
            bg: "#EEF2FF",
            actionLabel: "Speak with Sipho",
            onAction: () => alert("Sipho AI is active at the bottom right of your screen. Tap the blue Mic button!")
        }
    ];

    if (view === 'raf-search') {
        return (
            <div style={{ background: '#FDFCFB', minHeight: '100vh' }}>
                <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', padding: '24px 20px', background: 'white', borderBottom: '1px solid #F1F5F9' }}>
                    <div onClick={() => setView('hub')} style={{ padding: '10px', background: '#F8FAFC', borderRadius: '12px', cursor: 'pointer', border: '1px solid #E2E8F0' }}>
                        <ChevronLeft size={20} color="#111827" />
                    </div>
                    <h3 style={{ fontWeight: 800, fontSize: '18px', color: '#111827' }}>RAF Accredited Specialists</h3>
                    <div style={{ width: '40px' }} />
                </header>

                <div style={{ padding: '0 20px' }}>
                    <div style={{ position: 'relative', marginBottom: '24px' }}>
                        <input
                            type="text"
                            placeholder="Search by name, specialty, or city..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '18px 20px',
                                borderRadius: '20px',
                                border: '2px solid #E2E8F0',
                                background: 'white',
                                fontSize: '15px',
                                fontWeight: 600,
                                outline: 'none',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {filteredDoctors.map((doc) => (
                            <motion.div
                                key={doc.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{
                                    background: 'white',
                                    borderRadius: '24px',
                                    padding: '20px',
                                    border: '1px solid #F3F4F6',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.02)'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                    <div>
                                        <h4 style={{ fontWeight: 800, color: '#111827', fontSize: '17px' }}>{doc.name}</h4>
                                        <div style={{ color: 'var(--primary)', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase' }}>{doc.type}</div>
                                    </div>
                                    <div style={{ background: '#E0F2FE', color: '#0369A1', padding: '4px 10px', borderRadius: '8px', fontSize: '10px', fontWeight: 900 }}>VETTED</div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#4B5563' }}>
                                        <Stethoscope size={16} /> {doc.specialization}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#4B5563' }}>
                                        <Building2 size={16} /> {doc.location}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
                                    <div style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 600 }}>HPCSA: {doc.reg}</div>
                                    <button
                                        onClick={() => {
                                            setFormData({ ...formData, category: 'RAF Claim Assistance', details: `I am interested in consulting with ${doc.name} for an RAF claim.` });
                                            setView('hub');
                                        }}
                                        style={{ background: 'var(--primary)', color: 'white', padding: '8px 16px', borderRadius: '12px', border: 'none', fontSize: '12px', fontWeight: 800, cursor: 'pointer' }}
                                    >
                                        Select Specialist
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

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
                        We help vulnerable citizens fight back against scammers and unaccredited institutions. Share your story, and we&apos;ll guide you to justice.
                    </p>
                </div>

                <section style={{ marginBottom: '32px' }}>
                    <h4 style={{ fontWeight: 800, color: '#111827', marginBottom: '16px', fontSize: '15px', textTransform: 'uppercase' }}>Expert Recommendations</h4>
                    <div className="grid-layout grid-layout-2" style={{ gap: '12px' }}>
                        {recommendations.map((rec, i) => (
                            <div key={i} style={{ background: rec.bg, padding: '20px', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0, boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                                        {rec.icon}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 800, color: '#111827', marginBottom: '4px' }}>{rec.title}</div>
                                        <p style={{ fontSize: '13px', color: '#4B5563', lineHeight: 1.5, fontWeight: 500 }}>{rec.text}</p>
                                    </div>
                                </div>
                                {rec.onAction && (
                                    <button
                                        onClick={rec.onAction}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '12px',
                                            background: 'white',
                                            border: '1.5px solid var(--primary)',
                                            color: 'var(--primary)',
                                            fontWeight: 800,
                                            fontSize: '12px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        {rec.actionLabel} <ArrowRight size={14} />
                                    </button>
                                )}
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
                            <option>Student Registration Support</option>
                            <option>Legal Service Verification</option>
                            <option>Healthcare Compliance</option>
                            <option>Fraud & Cyber Attacks</option>
                            <option>GBV Support</option>
                            <option>Bullying & Harassment</option>
                            <option>Scam Investigation</option>
                            <option>RAF Claim Assistance</option>
                            <option>Institution Dispute</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', marginBottom: '12px' }}>Share your story</label>
                        <div style={{ position: 'relative' }}>
                            <textarea
                                required
                                placeholder="Tell us what happened or what help you need..."
                                value={formData.details}
                                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                                style={{ width: '100%', height: '140px', padding: '16px', paddingRight: '60px', borderRadius: '16px', border: '1px solid #E5E7EB', background: '#F9FAFB', fontWeight: 500, lineHeight: 1.5, resize: 'none' }}
                            />
                            <motion.button
                                type="button"
                                whileTap={{ scale: 0.9 }}
                                onClick={() => {
                                    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                                    if (!SpeechRecognition) {
                                        alert("Voice recognition is not supported in this browser.");
                                        return;
                                    }
                                    const recognition = new SpeechRecognition();
                                    recognition.lang = 'en-ZA';
                                    recognition.onresult = (event) => {
                                        const transcript = event.results[0][0].transcript;
                                        setFormData({ ...formData, details: formData.details ? formData.details + ' ' + transcript : transcript });
                                    };
                                    recognition.start();
                                }}
                                style={{
                                    position: 'absolute',
                                    top: '12px',
                                    right: '12px',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '12px',
                                    background: 'var(--primary)',
                                    border: 'none',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
                                }}
                            >
                                <Mic size={20} color="white" />
                            </motion.button>
                        </div>
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
