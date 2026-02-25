import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, Mic, Volume2, ShieldCheck, ChevronRight, MessageSquare } from 'lucide-react';
import { useRegistryStore } from '../store/useRegistryStore';
import { MOCK_DATA } from '../lib/mock-data';

const SiphoAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { aiMessages: messages, addAiMessage, clearAiMessages } = useRegistryStore();
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length <= 1) {
      const greeting = "Hello, I am Sipho from Sumbandila. How may I assist you today? You can ask me to verify a doctor, check a college, or help you with a scam investigation.";
      // We only add if the last message isn't already this greeting to avoid loops
      if (messages[0]?.text !== greeting) {
        addAiMessage({ role: 'assistant', text: greeting });
        speak(greeting);
      }
    }
  }, [isOpen]);

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.pitch = 1;
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-ZA';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      handleSend(transcript);
    };

    recognition.start();
  };

  const handleSend = useCallback((textOverride) => {
    const messageText = textOverride || input;
    if (!messageText.trim()) return;

    addAiMessage({ role: 'user', text: messageText });
    if (!textOverride) setInput('');

    // Smart Logic for Sipho
    setTimeout(() => {
      const lowerText = messageText.toLowerCase();
      let response = "";
      let options = [];

      if (lowerText.includes('scam') || lowerText.includes('investigat')) {
        response = "I understand. Security is our priority. Would you like to: 1. Report a new scam, 2. View active scam alerts, or 3. Speak to a legal advocate?";
        options = ["Report Scam", "View Alerts", "Legal Support"];
      } else if (lowerText.includes('doctor') || lowerText.includes('medical') || lowerText.includes('health')) {
        response = "I can help verify medical practitioners. Please provide the doctor's name or HPCSA number. Alternatively, would you like to see trusted hospitals nearby?";
        options = ["Verify HPCSA", "Trusted Hospitals", "RAF Specialists"];
      } else if (lowerText.includes('college') || lowerText.includes('uni') || lowerText.includes('school')) {
        response = "Checking accreditation is vital. Please give me the institution name. I can also help you: 1. Check DHET status, 2. Verify a degree, or 3. Report a bogus college.";
        options = ["Check DHET", "Verify Degree", "Report College"];
      } else if (lowerText.includes('option 1') || lowerText.includes('report a scam')) {
        response = "Opening the Anonymous Tip-off panel for you now. Please be as detailed as possible to help our investigators.";
      } else if (lowerText.includes('sim swap')) {
        response = "Sim swap fraud is rising in South Africa. Would you like me to: A. Lock your registry profile, B. Contact your service provider, or C. Check if your identity has been leaked?";
        options = ["Lock Profile", "Contact Provider", "Identity Check"];
      } else {
        response = "I've noted your request. As your Sumbandila assistant, I'm analyzing the national registry. How else can I help you protect your interests today?";
      }

      addAiMessage({
        role: 'assistant',
        text: response,
        options: options
      });
      speak(response);
    }, 1000);
  }, [input, addAiMessage]);

  return (
    <>
      {/* Main Sipho Trigger - Blue Voice Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '100px',
          right: '25px',
          zIndex: 1000,
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: isOpen ? '#1E293B' : 'var(--primary)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: '0 15px 45px rgba(37, 99, 235, 0.4)',
          border: '3px solid white'
        }}
      >
        {isOpen ? (
          <X color="white" size={30} />
        ) : (
          <div style={{ position: 'relative' }}>
            {isSpeaking && (
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                style={{
                  position: 'absolute',
                  inset: -10,
                  borderRadius: '50%',
                  background: 'white',
                  zIndex: -1
                }}
              />
            )}
            <Mic color="white" size={32} />
          </div>
        )}
      </motion.div>

      {/* Sipho Dialog Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            style={{
              position: 'fixed',
              bottom: '190px',
              right: '20px',
              width: 'calc(100% - 40px)',
              maxWidth: '400px',
              height: '580px',
              background: 'white',
              borderRadius: '35px',
              zIndex: 1001,
              boxShadow: '0 30px 70px rgba(0,0,0,0.2)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              border: '1px solid #F1F5F9'
            }}
          >
            {/* Sipho Header */}
            <div style={{
              background: 'var(--primary)',
              padding: '30px 24px',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '18px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid rgba(255,255,255,0.3)'
                }}>
                  <Bot size={32} color="white" />
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '-0.5px' }}>Sipho from Sumbandila</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '8px', height: '8px', background: '#4ADE80', borderRadius: '50%' }} />
                    <span style={{ fontSize: '12px', fontWeight: 700, opacity: 0.9 }}>AI Smart Assistant • Listening</span>
                  </div>
                </div>
              </div>

              {/* Visual Wave Decoration */}
              <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: '10px', background: 'white', borderRadius: '50% 50% 0 0' }} />
            </div>

            {/* Chat Context Area */}
            <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', background: '#F8FAFC' }}>
              {messages.map((m, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  style={{
                    alignSelf: m.role === 'assistant' ? 'flex-start' : 'flex-end',
                    maxWidth: '85%',
                  }}
                >
                  <div style={{
                    background: m.role === 'assistant' ? 'white' : 'var(--primary)',
                    color: m.role === 'assistant' ? '#1E293B' : 'white',
                    padding: '16px 20px',
                    borderRadius: m.role === 'assistant' ? '24px 24px 24px 6px' : '24px 24px 6px 24px',
                    fontSize: '15px',
                    fontWeight: 600,
                    lineHeight: 1.5,
                    boxShadow: m.role === 'assistant' ? '0 4px 15px rgba(0,0,0,0.05)' : '0 10px 20px rgba(37, 99, 235, 0.2)',
                    border: m.role === 'assistant' ? '1px solid #F1F5F9' : 'none'
                  }}>
                    {m.text}
                  </div>

                  {/* Smart Options for Sipho */}
                  {m.role === 'assistant' && m.options && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                      {m.options.map((opt, oi) => (
                        <button
                          key={oi}
                          onClick={() => handleSend(opt)}
                          style={{
                            padding: '10px 16px',
                            background: 'white',
                            border: '1.5px solid var(--primary)',
                            borderRadius: '100px',
                            fontSize: '12px',
                            fontWeight: 800,
                            color: 'var(--primary)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          {opt} <ChevronRight size={14} />
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Interactive Input/Voice Area */}
            <div style={{ padding: '24px', background: 'white', borderTop: '1px solid #F1F5F9' }}>
              <div style={{
                background: '#F1F5F9',
                borderRadius: '24px',
                padding: '8px 8px 8px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}>
                <input
                  type="text"
                  placeholder="Type or use the mic..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#334155'
                  }}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={startListening}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '16px',
                      background: isListening ? '#EF4444' : 'var(--primary)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  >
                    <Mic size={20} color="white" />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSend()}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '16px',
                      background: 'var(--primary)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  >
                    <Send size={20} color="white" />
                  </motion.button>
                </div>
              </div>

              {/* Listening Indicator */}
              {isListening && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                    style={{ fontSize: '11px', fontWeight: 900, color: '#EF4444', textTransform: 'uppercase', letterSpacing: '1px' }}
                  >
                    Sipho is Listening...
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SiphoAI;
