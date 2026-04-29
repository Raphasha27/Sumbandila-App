import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, CheckCircle2, ShieldCheck, Upload, User, Building2,
  Stethoscope, Scale, GraduationCap, FileText, Phone, Mail, MapPin,
  AlertCircle, Star, Clock, Award
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const PROFESSION_TYPES = [
  { id: 'doctor', label: 'Medical Doctor / Specialist', icon: Stethoscope, body: 'HPCSA', color: '#10B981', ref: 'MP Number (e.g. MP 0488271)' },
  { id: 'lawyer', label: 'Attorney / Advocate', icon: Scale, body: 'Legal Practice Council', color: '#3B82F6', ref: 'LPC Number' },
  { id: 'educator', label: 'Educational Institution', icon: GraduationCap, body: 'DHET / CHE / SAQA', color: '#F59E0B', ref: 'EMIS / Registration Number' },
  { id: 'psychologist', label: 'Psychologist / Therapist', icon: User, body: 'HPCSA (Psych Board)', color: '#8B5CF6', ref: 'PS Number' },
  { id: 'accountant', label: 'Accountant / Auditor', icon: FileText, body: 'SAICA / IRBA', color: '#EF4444', ref: 'Membership Number' },
  { id: 'engineer', label: 'Professional Engineer', icon: Building2, body: 'ECSA', color: '#06B6D4', ref: 'ECSA Registration Number' },
];

const PROVINCES = ['Gauteng','Western Cape','KwaZulu-Natal','Eastern Cape','Limpopo','Mpumalanga','North West','Free State','Northern Cape'];

const STEPS = ['Choose Profession','Personal Details','Registration Proof','Review & Submit'];

export default function PractitionerRegister({ onBack }) {
  const [step, setStep] = useState(0);
  const [profession, setProfession] = useState(null);
  const [form, setForm] = useState({ name:'', surname:'', email:'', phone:'', province:'', city:'', practice:'', regNumber:'', yearsExp:'', bio:'' });
  const [docs, setDocs] = useState({ id: null, proof: null, certificate: null });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validateStep1 = () => {
    const e = {};
    if (!form.name) e.name = 'Required';
    if (!form.surname) e.surname = 'Required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone) e.phone = 'Required';
    if (!form.province) e.province = 'Required';
    if (!form.regNumber) e.regNumber = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 1 && !validateStep1()) return;
    setStep(s => Math.min(s + 1, 3));
  };

  const handleSubmit = async () => {
    const application = {
      id: `APP-${Date.now()}`,
      profession: profession.label,
      body: profession.body,
      ...form,
      submittedAt: new Date().toISOString(),
      status: 'Under Review'
    };

    // 1. Always save to LocalStorage for immediate pitch feedback
    const existing = JSON.parse(localStorage.getItem('sumbandila_applications') || '[]');
    localStorage.setItem('sumbandila_applications', JSON.stringify([...existing, application]));

    // 2. Optional: Save to Supabase if client is initialized
    if (supabase) {
      try {
        const { error } = await supabase
          .from('practitioner_applications')
          .insert([application]);
        if (error) console.warn("Supabase Sync Error:", error.message);
      } catch (err) {
        console.warn("Supabase Connection Failed:", err);
      }
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="screen" style={{ background: 'white', justifyContent: 'center', alignItems: 'center', padding: '40px 24px', textAlign: 'center' }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} style={{ width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg,#10B981,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
          <CheckCircle2 size={50} color="white" strokeWidth={2.5} />
        </motion.div>
        <h2 style={{ fontSize: 28, fontWeight: 900, color: '#111827', marginBottom: 12 }}>Application Submitted!</h2>
        <p style={{ color: '#6B7280', fontSize: 15, lineHeight: 1.7, maxWidth: 340, margin: '0 auto 16px' }}>
          Your practitioner profile is now <strong>under review</strong>. Our team will verify your credentials with <strong>{profession?.body}</strong> and contact you within <strong>3–5 business days</strong>.
        </p>
        <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 20, padding: '20px 24px', marginBottom: 32, maxWidth: 340, margin: '0 auto 32px' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#065F46' }}>✅ Once approved, your verified profile will appear on the Sumbandila Trust Network, visible to thousands of South Africans seeking safe, verified professionals.</p>
        </div>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[{ icon: Clock, label: '3–5 Day Review' },{ icon: ShieldCheck, label: 'Credential Check' },{ icon: Star, label: 'Trust Badge' },{ icon: Award, label: 'Listed Profile' }].map(({ icon: Icon, label }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon size={20} color="#10B981" /></div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#6B7280' }}>{label}</span>
            </div>
          ))}
        </div>
        <motion.button whileTap={{ scale: 0.97 }} onClick={onBack} style={{ marginTop: 40, background: '#111827', color: 'white', padding: '18px 40px', borderRadius: 20, border: 'none', fontWeight: 800, fontSize: 15, cursor: 'pointer', width: '100%', maxWidth: 340 }}>
          Return to Dashboard
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="screen" style={{ background: '#FAFAFA', paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg,#1E3A5F,#0056B3)', padding: '28px 20px 24px', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <div onClick={onBack} style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <ChevronLeft size={22} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 900, margin: 0 }}>Join Trust Network</h2>
            <p style={{ margin: 0, fontSize: 12, opacity: 0.8 }}>Register as a Verified Practitioner</p>
          </div>
        </div>
        {/* Step Indicator */}
        <div style={{ display: 'flex', gap: 6 }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{ flex: 1 }}>
              <div style={{ height: 4, borderRadius: 4, background: i <= step ? 'white' : 'rgba(255,255,255,0.25)', transition: 'background 0.3s' }} />
              <div style={{ fontSize: 9, fontWeight: 700, color: i <= step ? 'white' : 'rgba(255,255,255,0.5)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '24px 20px' }}>
        <AnimatePresence mode="wait">

          {/* STEP 0: Choose Profession */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: '#111827', marginBottom: 8 }}>What is your profession?</h3>
              <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 24 }}>Select the category that best describes your professional service.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {PROFESSION_TYPES.map(p => {
                  const Icon = p.icon;
                  const selected = profession?.id === p.id;
                  return (
                    <motion.div key={p.id} whileTap={{ scale: 0.98 }} onClick={() => setProfession(p)}
                      style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 20px', borderRadius: 20, background: selected ? `${p.color}10` : 'white', border: `2px solid ${selected ? p.color : '#F3F4F6'}`, cursor: 'pointer', transition: 'all 0.2s', boxShadow: selected ? `0 4px 20px ${p.color}25` : '0 2px 8px rgba(0,0,0,0.04)' }}>
                      <div style={{ width: 48, height: 48, borderRadius: 14, background: selected ? p.color : '#F9FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={24} color={selected ? 'white' : p.color} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 800, fontSize: 15, color: '#111827' }}>{p.label}</div>
                        <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 600, marginTop: 2 }}>Regulated by {p.body}</div>
                      </div>
                      {selected && <CheckCircle2 size={22} color={p.color} />}
                    </motion.div>
                  );
                })}
              </div>
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => profession && setStep(1)} style={{ marginTop: 28, width: '100%', padding: '18px', background: profession ? '#111827' : '#E5E7EB', color: profession ? 'white' : '#9CA3AF', border: 'none', borderRadius: 18, fontWeight: 900, fontSize: 16, cursor: profession ? 'pointer' : 'not-allowed' }}>
                Continue →
              </motion.button>
            </motion.div>
          )}

          {/* STEP 1: Personal & Professional Details */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: `${profession.color}15`, border: `1px solid ${profession.color}40`, padding: '12px 16px', borderRadius: 16, marginBottom: 24 }}>
                <ShieldCheck size={18} color={profession.color} />
                <span style={{ fontSize: 13, fontWeight: 700, color: profession.color }}>{profession.label} · {profession.body}</span>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 900, color: '#111827', marginBottom: 20 }}>Your Details</h3>
              <div className="grid-layout grid-layout-2" style={{ gap: 16 }}>
                {[
                  { key: 'name', label: 'First Name', icon: User, placeholder: 'e.g. Sipho' },
                  { key: 'surname', label: 'Surname', icon: User, placeholder: 'e.g. Dlamini' },
                  { key: 'email', label: 'Professional Email', icon: Mail, placeholder: 'doctor@practice.co.za', type: 'email' },
                  { key: 'phone', label: 'Contact Number', icon: Phone, placeholder: '+27 82 123 4567', type: 'tel' },
                  { key: 'practice', label: 'Practice / Institution Name', icon: Building2, placeholder: 'e.g. Dlamini & Associates' },
                  { key: 'city', label: 'City / Town', icon: MapPin, placeholder: 'e.g. Johannesburg' },
                  { key: 'regNumber', label: profession.ref, icon: FileText, placeholder: 'Official registration number' },
                  { key: 'yearsExp', label: 'Years of Experience', icon: Award, placeholder: 'e.g. 12', type: 'number' },
                ].map(({ key, label, icon: Icon, placeholder, type = 'text' }) => (
                  <div key={key}>
                    <label style={{ fontSize: 11, fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6, display: 'block' }}>{label}</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'white', border: `1.5px solid ${errors[key] ? '#EF4444' : '#E5E7EB'}`, borderRadius: 14, padding: '14px 16px' }}>
                      <Icon size={16} color={errors[key] ? '#EF4444' : '#9CA3AF'} />
                      <input type={type} value={form[key]} onChange={e => update(key, e.target.value)} placeholder={placeholder}
                        style={{ border: 'none', outline: 'none', flex: 1, fontSize: 14, fontWeight: 600, color: '#111827', background: 'transparent' }} />
                    </div>
                    {errors[key] && <p style={{ color: '#EF4444', fontSize: 11, fontWeight: 700, marginTop: 4 }}>{errors[key]}</p>}
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: 11, fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6, display: 'block' }}>Province</label>
                  <div style={{ background: 'white', border: '1.5px solid #E5E7EB', borderRadius: 14, padding: '14px 16px' }}>
                    <select value={form.province} onChange={e => update('province', e.target.value)} style={{ border: 'none', outline: 'none', width: '100%', fontSize: 14, fontWeight: 600, color: form.province ? '#111827' : '#9CA3AF', background: 'transparent' }}>
                      <option value="">Select Province</option>
                      {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 800, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6, display: 'block' }}>Short Bio / Service Description</label>
                  <div style={{ background: 'white', border: '1.5px solid #E5E7EB', borderRadius: 14, padding: '14px 16px' }}>
                    <textarea value={form.bio} onChange={e => update('bio', e.target.value)} placeholder="Briefly describe your services and expertise (max 200 words)..." rows={3}
                      style={{ border: 'none', outline: 'none', width: '100%', fontSize: 14, fontWeight: 600, color: '#111827', background: 'transparent', resize: 'none' }} />
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                <button onClick={() => setStep(0)} style={{ flex: 1, padding: '16px', background: '#F3F4F6', color: '#374151', border: 'none', borderRadius: 16, fontWeight: 800, cursor: 'pointer' }}>Back</button>
                <motion.button whileTap={{ scale: 0.97 }} onClick={next} style={{ flex: 2, padding: '16px', background: '#111827', color: 'white', border: 'none', borderRadius: 16, fontWeight: 800, cursor: 'pointer', fontSize: 15 }}>Continue →</motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Document Upload */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h3 style={{ fontSize: 20, fontWeight: 900, color: '#111827', marginBottom: 8 }}>Upload Documents</h3>
              <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 16, padding: '14px 16px', marginBottom: 24, display: 'flex', gap: 10 }}>
                <AlertCircle size={18} color="#F59E0B" style={{ flexShrink: 0, marginTop: 2 }} />
                <p style={{ fontSize: 13, color: '#92400E', fontWeight: 600, margin: 0 }}>All documents are encrypted and stored securely. They are used <strong>only</strong> for verification against {profession?.body} records.</p>
              </div>
              {[
                { key: 'id', label: 'South African ID / Passport', desc: 'Clear photo or scan of your valid ID document' },
                { key: 'proof', label: `${profession?.body} Registration Certificate`, desc: `Your current registration certificate issued by ${profession?.body}` },
                { key: 'certificate', label: 'Highest Qualification Certificate', desc: 'Certified copy of your professional degree or diploma' },
              ].map(({ key, label, desc }) => (
                <div key={key} style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 800, color: '#111827', marginBottom: 6, display: 'block' }}>{label}</label>
                  <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 8 }}>{desc}</p>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', background: docs[key] ? '#F0FDF4' : 'white', border: `2px dashed ${docs[key] ? '#10B981' : '#D1D5DB'}`, borderRadius: 16, cursor: 'pointer', transition: 'all 0.2s' }}>
                    <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => setDocs(d => ({ ...d, [key]: e.target.files[0] }))} style={{ display: 'none' }} />
                    {docs[key] ? <CheckCircle2 size={22} color="#10B981" /> : <Upload size={22} color="#9CA3AF" />}
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: docs[key] ? '#065F46' : '#374151' }}>{docs[key] ? docs[key].name : 'Tap to upload file'}</div>
                      <div style={{ fontSize: 11, color: '#9CA3AF' }}>PDF, JPG or PNG (max 5MB)</div>
                    </div>
                  </label>
                </div>
              ))}
              <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                <button onClick={() => setStep(1)} style={{ flex: 1, padding: '16px', background: '#F3F4F6', color: '#374151', border: 'none', borderRadius: 16, fontWeight: 800, cursor: 'pointer' }}>Back</button>
                <motion.button whileTap={{ scale: 0.97 }} onClick={next} style={{ flex: 2, padding: '16px', background: '#111827', color: 'white', border: 'none', borderRadius: 16, fontWeight: 800, cursor: 'pointer', fontSize: 15 }}>Review Application →</motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Review & Submit */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h3 style={{ fontSize: 20, fontWeight: 900, color: '#111827', marginBottom: 8 }}>Review & Submit</h3>
              <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 24 }}>Please confirm your details before submitting.</p>
              <div style={{ background: 'white', borderRadius: 24, padding: '24px', border: '1px solid #F3F4F6', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid #F9FAFB' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 18, background: `${profession.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <profession.icon size={28} color={profession.color} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: 17, color: '#111827' }}>{form.name} {form.surname}</div>
                    <div style={{ fontSize: 13, color: '#6B7280', fontWeight: 600 }}>{profession.label}</div>
                  </div>
                </div>
                {[
                  ['Email', form.email], ['Phone', form.phone], ['Province', form.province], ['City', form.city],
                  ['Practice', form.practice], ['Reg. Number', form.regNumber], ['Experience', `${form.yearsExp} years`],
                ].map(([k, v]) => v && (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F9FAFB' }}>
                    <span style={{ fontSize: 13, color: '#9CA3AF', fontWeight: 700 }}>{k}</span>
                    <span style={{ fontSize: 13, color: '#111827', fontWeight: 800, textAlign: 'right', maxWidth: '60%' }}>{v}</span>
                  </div>
                ))}
                <div style={{ marginTop: 16, padding: '12px 0', borderTop: '1px solid #F9FAFB' }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#9CA3AF', marginBottom: 8 }}>DOCUMENTS ATTACHED</div>
                  {Object.entries(docs).map(([k, f]) => (
                    <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      {f ? <CheckCircle2 size={14} color="#10B981" /> : <AlertCircle size={14} color="#F59E0B" />}
                      <span style={{ fontSize: 12, fontWeight: 600, color: f ? '#065F46' : '#92400E' }}>{f ? f.name : `${k.toUpperCase()} — Not uploaded`}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 16, padding: '14px 16px', marginBottom: 24 }}>
                <p style={{ fontSize: 12, color: '#1E40AF', fontWeight: 700, margin: 0 }}>
                  By submitting, you confirm that all information is accurate and you consent to Sumbandila verifying your credentials with {profession?.body}. False information may result in legal action.
                </p>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={() => setStep(2)} style={{ flex: 1, padding: '16px', background: '#F3F4F6', color: '#374151', border: 'none', borderRadius: 16, fontWeight: 800, cursor: 'pointer' }}>Back</button>
                <motion.button whileTap={{ scale: 0.97 }} onClick={handleSubmit}
                  style={{ flex: 2, padding: '16px', background: 'linear-gradient(135deg,#10B981,#059669)', color: 'white', border: 'none', borderRadius: 16, fontWeight: 900, cursor: 'pointer', fontSize: 15, boxShadow: '0 10px 25px rgba(16,185,129,0.35)' }}>
                  ✅ Submit Application
                </motion.button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  );
}
