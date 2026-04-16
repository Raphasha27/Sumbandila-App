import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  FileText, 
  Plus, 
  Download, 
  Share2, 
  Sparkles,
  Search,
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function TeacherPortal() {
  const [activeTab, setActiveTab] = useState('classes');
  
  const TABS = [
    { id: 'classes', label: 'My Classes', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'gradebook', label: 'Gradebook', icon: BookOpen },
    { id: 'ai-tools', label: 'AI Tools', icon: Sparkles },
  ];

  return (
    <div style={{ paddingBottom: '100px' }}>
      <header style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#111827', marginBottom: '8px' }}>Teacher Portal</h2>
        <p style={{ color: '#6B7280', fontWeight: 600 }}>Manage your students, grades and AI-generated materials.</p>
      </header>

      {/* Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        background: '#F1F5F9', 
        padding: '6px', 
        borderRadius: '20px',
        marginBottom: '32px',
        overflowX: 'auto',
        scrollbarWidth: 'none'
      }}>
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                borderRadius: '16px',
                border: 'none',
                background: isActive ? 'white' : 'transparent',
                color: isActive ? 'var(--primary)' : '#64748B',
                fontWeight: isActive ? 800 : 700,
                fontSize: '14px',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'classes' && <ClassesView />}
        {activeTab === 'attendance' && <AttendanceView />}
        {activeTab === 'gradebook' && <GradebookView />}
        {activeTab === 'ai-tools' && <AiToolsView />}
      </motion.div>
    </div>
  );
}

function ClassesView() {
  const CLASSES = [
    { id: 1, name: 'Grade 10 Mathematics', students: 34, lastActivity: '2 hours ago' },
    { id: 2, name: 'Grade 11 Physical Science', students: 28, lastActivity: 'Yesterday' },
    { id: 3, name: 'Grade 12 Life Sciences', students: 31, lastActivity: '3 days ago' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h3 style={{ fontWeight: 800, fontSize: '18px' }}>Active Classes</h3>
        <button style={{ 
          background: 'var(--primary)', 
          color: 'white', 
          border: 'none', 
          padding: '8px 16px', 
          borderRadius: '12px', 
          fontSize: '13px', 
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <Plus size={16} /> ADD CLASS
        </button>
      </div>

      {CLASSES.map(cls => (
        <div key={cls.id} className="premium-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '4px' }}>{cls.name}</h4>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', color: '#64748B', fontSize: '13px', fontWeight: 600 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={14} /> {cls.students} Students</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Calendar size={14} /> {cls.lastActivity}</span>
            </div>
          </div>
          <ChevronRight size={20} color="#CBD5E1" />
        </div>
      ))}
    </div>
  );
}

function AttendanceView() {
  return (
    <div style={{ background: 'white', borderRadius: '32px', padding: '32px', border: '1px solid #F1F5F9', textAlign: 'center' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: '#F0F9FF', margin: '0 auto 24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Calendar size={40} color="var(--primary)" />
      </div>
      <h3 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '12px' }}>Roll Call System</h3>
      <p style={{ color: '#64748B', lineHeight: 1.6, marginBottom: '32px' }}>Select a class to start recording attendance. Data will be instantly synced to the National Registry.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button style={{ padding: '20px', borderRadius: '20px', background: '#F8FAFC', border: '1px solid #E2E8F0', fontWeight: 800, textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Grade 10 Mathematics</span>
          <span style={{ color: 'var(--primary)', fontSize: '12px' }}>MARK TODAY</span>
        </button>
        <button style={{ padding: '20px', borderRadius: '20px', background: '#F8FAFC', border: '1px solid #E2E8F0', fontWeight: 800, textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Grade 11 Physical Science</span>
          <span style={{ color: 'var(--primary)', fontSize: '12px' }}>MARK TODAY</span>
        </button>
      </div>
    </div>
  );
}

function GradebookView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="premium-card" style={{ padding: '24px', background: 'var(--bg-gradient)', color: 'white' }}>
        <h4 style={{ fontSize: '14px', fontWeight: 800, opacity: 0.9, textTransform: 'uppercase', marginBottom: '8px' }}>Class Performance</h4>
        <div style={{ fontSize: '32px', fontWeight: 900 }}>74.2% AVG</div>
        <p style={{ fontSize: '12px', marginTop: '12px', color: 'rgba(255,255,255,0.8)' }}>↑ 4.1% from last term across all monitored subjects.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ background: 'white', padding: '20px', borderRadius: '24px', border: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#F1F5F9', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 900 }}>{i}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: '15px' }}>Term {i} Final Assessment</div>
              <div style={{ fontSize: '12px', color: '#64748B', fontWeight: 600 }}>Due: 24 May 2026</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 900, fontSize: '16px', color: 'var(--primary)' }}>{70 + i * 5}%</div>
              <div style={{ fontSize: '10px', color: '#10B981', fontWeight: 800 }}>COMPLETE</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AiToolsView() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const startGen = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowResult(true);
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <section>
        <div style={{ padding: '24px', borderRadius: '32px', background: '#F0F7FF', border: '2px solid #DBEAFE', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Sparkles size={24} color="var(--primary)" />
            <h3 style={{ fontSize: '18px', fontWeight: 900 }}>AI Worksheet Generator</h3>
          </div>
          <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.6, marginBottom: '24px' }}>
            Generate custom worksheets with marking memos based on the current CAPS curriculum. 
          </p>

          {!showResult ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Topic</label>
                <input placeholder="e.g. Euclidean Geometry" style={{ width: '100%', padding: '14px', borderRadius: '14px', border: '1px solid #E2E8F0', outline: 'none', fontWeight: 600 }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Grade</label>
                  <select style={{ width: '100%', padding: '14px', borderRadius: '14px', border: '1px solid #E2E8F0', outline: 'none', fontWeight: 600, background: 'white' }}>
                    <option>Grade 10</option>
                    <option>Grade 11</option>
                    <option>Grade 12</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px', display: 'block' }}>Difficulty</label>
                  <select style={{ width: '100%', padding: '14px', borderRadius: '14px', border: '1px solid #E2E8F0', outline: 'none', fontWeight: 600, background: 'white' }}>
                    <option>Standard</option>
                    <option>Challenge</option>
                    <option>Remedial</option>
                  </select>
                </div>
              </div>
              <button 
                onClick={startGen}
                disabled={isGenerating}
                style={{ 
                  marginTop: '12px',
                  background: 'var(--primary)', 
                  color: 'white', 
                  border: 'none', 
                  padding: '18px', 
                  borderRadius: '16px', 
                  fontWeight: 900, 
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px'
                }}
              >
                {isGenerating ? 'ANALYZING CURRICULUM...' : (
                  <>GENERATE WORKSHEET <Sparkles size={18} /></>
                )}
              </button>
            </div>
          ) : (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ background: 'white', padding: '24px', borderRadius: '24px', border: '1px solid var(--primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#10B981', marginBottom: '16px' }}>
                <CheckCircle2 size={20} />
                <span style={{ fontWeight: 800, fontSize: '14px' }}>WORKHEET GENERATED SUCCESSFULLY</span>
              </div>
              <div style={{ fontSize: '18px', fontWeight: 900, marginBottom: '24px' }}>Topic: Euclidean Geometry (Gr 10)</div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={{ flex: 1, padding: '14px', borderRadius: '14px', background: 'var(--primary)', color: 'white', border: 'none', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Download size={18} /> PDF
                </button>
                <button style={{ flex: 1, padding: '14px', borderRadius: '14px', background: '#F8FAFC', color: 'var(--primary)', border: '1px solid #E2E8F0', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Share2 size={18} /> SHARE
                </button>
              </div>
              <button 
                onClick={() => setShowResult(false)}
                style={{ width: '100%', background: 'transparent', border: 'none', color: '#64748B', fontSize: '12px', fontWeight: 700, marginTop: '20px', cursor: 'pointer' }}
              >
                Start Over
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <section>
        <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '20px' }}>Marking Memo Assistant</h4>
        <div style={{ padding: '24px', borderRadius: '28px', border: '1px dotted #CBD5E1', textAlign: 'center' }}>
          <FileText size={32} color="#94A3B8" style={{ marginBottom: '16px' }} />
          <p style={{ color: '#64748B', fontSize: '13px', fontWeight: 600 }}>Drag and drop a student script to auto-generate a marking memo or score prediction.</p>
          <button style={{ marginTop: '16px', background: 'white', border: '1px solid #E2E8F0', padding: '10px 20px', borderRadius: '12px', fontSize: '12px', fontWeight: 800, cursor: 'pointer' }}>UPLOAD SCRIPT</button>
        </div>
      </section>
    </div>
  );
}
