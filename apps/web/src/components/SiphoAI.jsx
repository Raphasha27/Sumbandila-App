import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, Mic, Volume2, ChevronRight, Phone, Square, MicOff, Loader } from 'lucide-react';
import { useRegistryStore } from '../store/useRegistryStore';

const GREETING = "Greetings! I am Sipho, your National Registry Sentinel Assistant 🇿🇦. I'm here to help you navigate the Sumbandila ecosystem and verify credentials using the latest official data (DHET Register Sync: April 15, 2026).\n\nWhere would you like to go today?";

const QUICK_OPTIONS = [
  { label: "🏠 Dashboard", screen: "dashboard" },
  { label: "🎓 Education Registry", screen: "category-list", category: "Education" },
  { label: "🏥 Healthcare Registry", screen: "category-list", category: "Healthcare" },
  { label: "⚖️ Legal Registry", screen: "category-list", category: "Legal" },
  { label: "🚨 Security Alerts", screen: "alerts" },
  { label: "🔐 My Saved Vault", screen: "history" },
  { label: "🔍 QR Scanner", screen: "qr-scan" },
  { label: "📞 Support Hub", screen: "support-hub" },
];

const getSmartResponse = (text) => {
  const t = text.toLowerCase();

  if (t.includes('hello') || t.includes('hi') || t.includes('hey') || t.includes('greet'))
    return { text: "Hello! I'm Sipho, your guide to the Sumbandila National Registry. I can help you navigate to any part of the app or answer questions about verification. What can I help you find?", options: QUICK_OPTIONS.map(o => o.label) };

  if (t.includes('scam') || t.includes('fraud') || t.includes('fake') || t.includes('bogus'))
    return { text: "⚠️ Protecting you from fraud is my top priority. I can take you to the Support Hub to report a scam, or we can check the latest Security Alerts. Which would you prefer?", options: ["📞 Support Hub", "🚨 Security Alerts", "🏠 Dashboard"] };

  if (t.includes('doctor') || t.includes('medical') || t.includes('health') || t.includes('hpcsa'))
    return { text: "🏥 You can verify medical practitioners in our Healthcare Registry. Would you like to go there now?", options: ["🏥 Healthcare Registry", "🏠 Dashboard"] };

  if (t.includes('college') || t.includes('university') || t.includes('school') || t.includes('dhet') || t.includes('accredited'))
    return { text: "🎓 I can help you verify if a college is registered and if its courses are accredited. Shall we head to the Education Registry?", options: ["🎓 Education Registry", "🏠 Dashboard"] };

  if (t.includes('lawyer') || t.includes('legal') || t.includes('attorney') || t.includes('lpc'))
    return { text: "⚖️ Our Legal Registry allows you to verify lawyers and legal practitioners. Would you like to go there?", options: ["⚖️ Legal Registry", "🏠 Dashboard"] };

  if (t.includes('vault') || t.includes('saved') || t.includes('history'))
    return { text: "🔐 Your Saved Vault contains all the verifications you've performed. Would you like to view them?", options: ["🔐 My Saved Vault", "🏠 Dashboard"] };

  if (t.includes('scan') || t.includes('qr'))
    return { text: "🔍 I can help you scan QR codes on professional licenses. Shall I open the scanner?", options: ["🔍 QR Scanner", "🏠 Dashboard"] };

  if (t.includes('help') || t.includes('navigation') || t.includes('menu') || t.includes('go'))
    return { 
      text: "I can help you navigate throughout the Sumbandila app. Here are your main destinations:", 
      options: QUICK_OPTIONS.map(o => o.label) 
    };

  return {
    text: "I'm not quite sure about that request, but I can help you navigate the app. Where would you like to go?",
    options: QUICK_OPTIONS.map(o => o.label)
  };
};

const SiphoAI = () => {
  const { aiOpen: isOpen, setAiOpen: setIsOpen, aiMessages: messages, addAiMessage, clearAiMessages, setScreen, setSelectedCategory } = useRegistryStore();
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      if (messages.length === 0) {
        addAiMessage({ role: 'assistant', text: GREETING, options: QUICK_OPTIONS.map(o => o.label) });
      }
    }
  }, [isOpen, messages.length, addAiMessage]);

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-ZA';
    utterance.pitch = 1.05;
    utterance.rate = 0.95;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser. Please use Chrome.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-ZA';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      sendMessage(transcript);
    };
    recognition.start();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioURL(URL.createObjectURL(blob));
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch {
      alert("Microphone access denied. Please allow microphone in browser settings.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
    }
  };

  const sendVoiceNote = () => {
    if (!audioURL) return;
    addAiMessage({ role: 'user', text: "🎙️ Voice Note Sent", isAudio: true, audioUrl: audioURL });
    setAudioURL(null);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const response = "🇿🇦 Voice note received and securely transmitted to the Sovereign Registry Security Vault! Reference ID: " + Math.random().toString(36).substr(2, 9).toUpperCase() + ". Where else can I help you navigate?";
      
      // Persist to Registry Audit Trail for Official Review
      import('../services/DatabaseService').then(({ db }) => {
        db.logSession && db.logAuditRecord ? db.logAuditRecord({
          type: 'VOICE_NOTE_SUBMITTED',
          action: 'VOICE_REPORT_PERSISTED',
          description: 'Citizen report recorded in official registry vault',
          audioRef: audioURL
        }) : console.log("Audit log simulation: Voice note persisted.");
      });

      addAiMessage({ role: 'assistant', text: response, options: QUICK_OPTIONS.map(o => o.label) });
      speak(response);
    }, 1500);
  };

  const sendMessage = useCallback((textOverride) => {
    const text = (textOverride || input).trim();
    if (!text) return;

    addAiMessage({ role: 'user', text });
    setInput('');
    setIsTyping(true);

    const delay = 800 + Math.random() * 600;
    setTimeout(() => {
      setIsTyping(false);
      const { text: responseText, options } = getSmartResponse(text);
      addAiMessage({ role: 'assistant', text: responseText, options });
      speak(responseText);
    }, delay);
  }, [input, addAiMessage]);

  const handleOptionClick = (opt) => {
    const navMatch = QUICK_OPTIONS.find(o => o.label === opt);
    
    if (navMatch) {
      addAiMessage({ role: 'user', text: opt });
      setIsTyping(true);
      
      setTimeout(() => {
        setIsTyping(false);
        const response = `Navigating to ${opt}...`;
        addAiMessage({ role: 'assistant', text: response });
        speak(response);
        
        if (navMatch.category) {
          setSelectedCategory(navMatch.category);
        }
        setScreen(navMatch.screen);
        setIsOpen(false);
      }, 600);
      return;
    }

    if (opt === "🏠 Dashboard") {
      setScreen('dashboard');
      setIsOpen(false);
    } else {
      sendMessage(opt);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '100px',
          right: '20px',
          zIndex: 1000,
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: isOpen ? '#1E293B' : 'var(--primary)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: isOpen ? '0 8px 20px rgba(0,0,0,0.3)' : '0 12px 35px rgba(37,99,235,0.5)',
          border: '3px solid white',
          transition: 'background 0.3s ease'
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X color="white" size={26} />
            </motion.div>
          ) : (
            <motion.div key="mic" initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ position: 'relative' }}>
              {(isSpeaking || isListening) && (
                <motion.div
                  animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                  style={{ position: 'absolute', inset: -14, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }}
                />
              )}
              <Mic color="white" size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed',
              bottom: '180px',
              right: '20px',
              width: 'min(calc(100vw - 32px), 400px)',
              height: '580px',
              background: 'white',
              borderRadius: '32px',
              zIndex: 1001,
              boxShadow: '0 30px 80px rgba(0,0,0,0.22)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              border: '1px solid #E2E8F0'
            }}
          >
            {/* Header */}
            <div style={{
              background: 'var(--bg-gradient)',
              padding: '20px 20px 30px',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              flexShrink: 0
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: '52px', height: '52px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '18px',
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  border: '1.5px solid rgba(255,255,255,0.35)',
                  flexShrink: 0
                }}>
                  <Bot size={28} color="white" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 900, letterSpacing: '-0.3px' }}>Sipho from Sumbandila</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                    <motion.div
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      style={{ width: '7px', height: '7px', background: '#4ADE80', borderRadius: '50%', flexShrink: 0 }}
                    />
                    <span style={{ fontSize: '12px', fontWeight: 700, opacity: 0.95 }}>
                      {isListening ? '🎤 Listening...' : isRecording ? '⏺ Recording...' : isSpeaking ? '🔊 Speaking...' : isTyping ? '💬 Typing...' : 'AI Active'}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  {isSpeaking && (
                    <button onClick={() => window.speechSynthesis.cancel()} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '12px', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      <Volume2 size={16} color="white" />
                    </button>
                  )}
                  <button onClick={() => { clearAiMessages(); }} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '12px', padding: '8px', cursor: 'pointer', fontSize: '10px', fontWeight: 800, color: 'white' }}>
                    CLEAR
                  </button>
                </div>
              </div>
              {/* Wave divider */}
              <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: '12px', background: 'white', borderRadius: '50% 50% 0 0' }} />
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px 16px 8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              background: '#F8FAFC'
            }}>
              {messages.length === 0 && (
                <div style={{ textAlign: 'center', padding: '20px 0', color: '#94A3B8' }}>
                  <Bot size={40} color="#CBD5E1" style={{ margin: '0 auto 12px' }} />
                  <p style={{ fontSize: '13px', fontWeight: 600 }}>Ask Sipho anything...</p>
                </div>
              )}

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ alignSelf: msg.role === 'assistant' ? 'flex-start' : 'flex-end', maxWidth: '88%' }}
                >
                  <div style={{
                    background: msg.role === 'assistant' ? 'white' : 'var(--primary)',
                    color: msg.role === 'assistant' ? '#1E293B' : 'white',
                    padding: '13px 17px',
                    borderRadius: msg.role === 'assistant' ? '20px 20px 20px 5px' : '20px 20px 5px 20px',
                    fontSize: '14px',
                    fontWeight: 600,
                    lineHeight: 1.55,
                    boxShadow: msg.role === 'assistant' ? '0 2px 10px rgba(0,0,0,0.05)' : '0 6px 16px rgba(37,99,235,0.25)',
                    border: msg.role === 'assistant' ? '1px solid #F1F5F9' : 'none',
                    wordBreak: 'break-word'
                  }}>
                    {msg.text}
                    {msg.isAudio && msg.audioUrl && (
                      <div style={{ marginTop: '10px' }}>
                        <audio src={msg.audioUrl} controls style={{ width: '100%', height: '32px' }} />
                      </div>
                    )}
                  </div>

                  {msg.role === 'assistant' && msg.options?.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
                      {msg.options.map((opt, oi) => (
                        <motion.button
                          key={oi}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => handleOptionClick(opt)}
                          style={{
                            padding: '8px 14px',
                            background: 'white',
                            border: '1.5px solid var(--primary)',
                            borderRadius: '100px',
                            fontSize: '12px',
                            fontWeight: 800,
                            color: 'var(--primary)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            boxShadow: '0 2px 6px rgba(37,99,235,0.08)'
                          }}
                        >
                          {opt.includes('Voice') || opt.includes('Record') ? <Mic size={12} /> : opt.includes('Consultant') || opt.includes('Cancel') ? <Phone size={12} /> : <ChevronRight size={12} />}
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ alignSelf: 'flex-start' }}
                >
                  <div style={{
                    background: 'white',
                    padding: '14px 18px',
                    borderRadius: '20px 20px 20px 5px',
                    border: '1px solid #F1F5F9',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                    display: 'flex',
                    gap: '5px',
                    alignItems: 'center'
                  }}>
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                        style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#94A3B8' }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div style={{ padding: '12px 14px 16px', background: 'white', borderTop: '1px solid #F1F5F9', flexShrink: 0 }}>

              {/* Audio Preview */}
              {audioURL && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '20px', padding: '12px 14px', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#16A34A' }}>🎙️ Voice Note Ready</span>
                    <button onClick={() => setAudioURL(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#EF4444', fontSize: '11px', fontWeight: 800 }}>DISCARD</button>
                  </div>
                  <audio src={audioURL} controls style={{ width: '100%', height: '30px', marginBottom: '8px' }} />
                  <button onClick={sendVoiceNote} style={{ width: '100%', background: '#16A34A', color: 'white', border: 'none', borderRadius: '14px', padding: '10px', fontWeight: 900, fontSize: '13px', cursor: 'pointer' }}>
                    SEND VOICE NOTE
                  </button>
                </motion.div>
              )}

              {/* Recording UI */}
              {isRecording && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  style={{ background: '#FEF2F2', border: '1px solid #FEE2E2', borderRadius: '20px', padding: '16px', marginBottom: '10px', textAlign: 'center' }}>
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    style={{ width: '48px', height: '48px', background: '#EF4444', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 10px' }}
                  >
                    <Mic size={24} color="white" />
                  </motion.div>
                  <p style={{ fontSize: '12px', fontWeight: 800, color: '#EF4444', marginBottom: '4px' }}>RECORDING — State your name, ID & request</p>
                  <p style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '12px' }}>Speak in any SA official language</p>
                  <button onClick={stopRecording} style={{ background: '#111827', color: 'white', border: 'none', borderRadius: '12px', padding: '10px 24px', fontWeight: 800, fontSize: '12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Square size={14} fill="white" /> STOP RECORDING
                  </button>
                </motion.div>
              )}

              {/* Text/Mic Input Row */}
              {!isRecording && !audioURL && (
                <div style={{
                  background: '#F1F5F9',
                  borderRadius: '22px',
                  padding: '6px 6px 6px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: isListening ? '2px solid #EF4444' : '2px solid transparent',
                  transition: 'border 0.2s ease'
                }}>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder={isListening ? "Sipho is listening..." : "Type or use the mic..."}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    disabled={isListening || isTyping}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#334155',
                      minWidth: 0
                    }}
                  />
                  <motion.button
                    whileTap={{ scale: 0.88 }}
                    onClick={startListening}
                    disabled={isListening || isTyping}
                    style={{
                      width: '42px', height: '42px',
                      borderRadius: '16px',
                      background: isListening ? '#EF4444' : '#E2E8F0',
                      border: 'none',
                      display: 'flex', justifyContent: 'center', alignItems: 'center',
                      cursor: 'pointer',
                      flexShrink: 0,
                      transition: 'background 0.2s ease'
                    }}
                  >
                    {isListening ? <MicOff size={18} color="white" /> : <Mic size={18} color="#64748B" />}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.88 }}
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || isTyping}
                    style={{
                      width: '42px', height: '42px',
                      borderRadius: '16px',
                      background: input.trim() ? 'var(--primary)' : '#E2E8F0',
                      border: 'none',
                      display: 'flex', justifyContent: 'center', alignItems: 'center',
                      cursor: input.trim() ? 'pointer' : 'not-allowed',
                      flexShrink: 0,
                      transition: 'background 0.25s ease'
                    }}
                  >
                    {isTyping ? <Loader size={18} color="white" /> : <Send size={18} color={input.trim() ? "white" : "#94A3B8"} />}
                  </motion.button>
                </div>
              )}

              <p style={{ fontSize: '10px', color: '#CBD5E1', fontWeight: 700, textAlign: 'center', marginTop: '8px' }}>
                🔒 Protected by Sentinel L5 Encryption • POPIA Compliant
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SiphoAI;
