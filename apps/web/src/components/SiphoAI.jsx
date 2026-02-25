import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, Mic, Volume2, ShieldCheck, ChevronRight, MessageSquare, Phone, Play, Square, Trash2 } from 'lucide-react';
import { useRegistryStore } from '../store/useRegistryStore';
import { MOCK_DATA } from '../lib/mock-data';

const SiphoAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { aiMessages: messages, addAiMessage, clearAiMessages, setScreen } = useRegistryStore();
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length <= 1) {
      const greeting = "Hello, I am Sipho from Sumbandila. Your safety and the community's integrity are my priorities. How may I assist you? You can ask me to verify student registration, check accredited law services, or help with a medical investigation.";
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

  // MediaRecorder for Voice Notes
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Could not access microphone for Voice Note.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleSendVoiceNote = () => {
    if (!audioURL) return;
    addAiMessage({
      role: 'user',
      text: "Voice Note attached 🎙️",
      isAudio: true,
      audioUrl: audioURL
    });
    setAudioURL(null);

    setTimeout(() => {
      const response = "Internalizing your voice note... 🇿🇦 Our team supports all official South African languages. We have received your request including your personal details. A Sumbandila consultant will analyze your recording and respond to you immediately or within 24 hours. Is there anything else I can help you with?";
      addAiMessage({
        role: 'assistant',
        text: response,
        options: ["Talk to Consultant", "Report Scam", "General Help"]
      });
      speak(response);
    }, 1200);
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
        response = "I understand. Security is our priority. Would you like to: 1. Report a new scam via voice, 2. View active scam alerts, or 3. Speak to a live consultant?";
        options = ["Talk to Consultant", "Record Voice Report", "View Alerts"];
      } else if (lowerText.includes('consultant') || lowerText.includes('speak to') || lowerText.includes('live help')) {
        response = "Connecting you to an available Registry Sentinel Consultant... Please hold while we establish a secure line. Would you like to leave a voice note in the meantime?";
        options = ["Leave Voice Note", "Cancel Call"];
      } else if (lowerText.includes('doctor') || lowerText.includes('medical') || lowerText.includes('health')) {
        response = "I can help verify medical practitioners. Please provide the doctor's name or HPCSA number. I can also connect you to our healthcare compliance team.";
        options = ["Talk to Consultant", "Verify HPCSA", "Trusted Hospitals"];
      } else if (lowerText.includes('college') || lowerText.includes('uni') || lowerText.includes('school')) {
        response = "Checking accreditation is vital. Please give me the institution name. I can also help you verify a degree or report a bogus college via voice note.";
        options = ["Leave Voice Note", "Check DHET", "Verify Degree"];
      } else if (lowerText.includes('sim swap')) {
        response = "Sim swap fraud is rising in South Africa. I recommend locking your registry profile immediately. Would you like me to connect you to our fraud department?";
        options = ["Talk to Consultant", "Lock Profile", "Identity Check"];
      } else if (lowerText.includes('legal') || lowerText.includes('law') || lowerText.includes('court') || lowerText.includes('lawyer')) {
        response = "Verifying legal practitioners is essential for justice. I can check the LPC register for you or connect you with our Legal Excellence Hub for vetted services.";
        options = ["Verify Lawyer", "Law Hub", "Talk to Consultant"];
      } else if (lowerText.includes('student') || lowerText.includes('register') || lowerText.includes('admission')) {
        response = "Student safety is our priority. Before paying any registration fees, let's verify the institution's DHET status and course accreditation.";
        options = ["Verify College", "Student Support", "Report Bogus Campus"];
      } else if (lowerText.includes('subscription') || lowerText.includes('pay') || lowerText.includes('premium')) {
        response = "We offer premium plans for auditors (R99/mo) and entities (R499/mo) in South African Rands. These provide unlimited verifications. Would you like to view the comparison table?";
        options = ["Auditor Plan", "Entity Plan", "Payment Help"];
      } else if (lowerText.includes('donate') || lowerText.includes('fund') || lowerText.includes('support')) {
        response = "Thank you for supporting digital integrity in South Africa. Our Registry Expansion Fund is currently 65% funded. Would you like to make a contribution or see our impact report?";
        options = ["Donate Now", "View Impact", "Funding Goals"];
      } else {
        response = "I've noted your request. As your Sumbandila assistant, I'm analyzing the national registry. Is there anything specific you'd like to report? You can even use the mic to record a detailed request.";
        options = ["Leave Voice Note", "Talk to Consultant", "Report Scam"];
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
            {(isSpeaking || isListening || isRecording) && (
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
                    <span style={{ fontSize: '12px', fontWeight: 700, opacity: 0.9 }}>
                      {isListening ? 'Listening...' : isRecording ? 'Recording Voice Note...' : 'AI Active'}
                    </span>
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
                    {m.isAudio && (
                      <div style={{ marginTop: '10px' }}>
                        <audio src={m.audioUrl} controls style={{ width: '100%', height: '35px' }} />
                      </div>
                    )}
                  </div>

                  {/* Smart Options for Sipho */}
                  {m.role === 'assistant' && m.options && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                      {m.options.map((opt, oi) => (
                        <button
                          key={oi}
                          onClick={() => {
                            if (opt === "Record Voice Report" || opt === "Leave Voice Note") {
                              startRecording();
                            } else if (opt === "Talk to Consultant") {
                              handleSend("Speak to a consultant");
                              setTimeout(() => setScreen('help'), 1500);
                            } else if (opt === "Report Scam" || opt === "Law Hub" || opt === "Student Support" || opt === "Health Hub") {
                              handleSend(`Accessing ${opt}...`);
                              setTimeout(() => setScreen('help'), 1500);
                            } else if (opt === "Verify Lawyer") {
                              handleSend("Verifying legal practitioner...");
                              setTimeout(() => setScreen('category-list'), 1500); // Assuming Legal category
                            } else if (opt === "Verify College") {
                              handleSend("Verifying educational institution...");
                              setTimeout(() => setScreen('category-list'), 1500);
                            } else if (opt === "Donate Now") {
                              handleSend("How can I donate?");
                            } else {
                              handleSend(opt);
                            }
                          }}
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
                          {opt === "Talk to Consultant" ? <Phone size={14} /> : opt.includes('Voice') ? <Mic size={14} /> : <ChevronRight size={14} />}
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Interactive Input/Voice Area */}
            <div style={{ padding: '24px', background: 'white', borderTop: '1px solid #F1F5F9' }}>
              {audioURL ? (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  style={{
                    background: '#F1F5F9',
                    padding: '15px',
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary)' }}>Recorded Voice Note</span>
                    <Trash2 size={18} color="#EF4444" style={{ cursor: 'pointer' }} onClick={() => setAudioURL(null)} />
                  </div>
                  <audio src={audioURL} controls style={{ width: '100%', height: '35px' }} />
                  <button
                    onClick={handleSendVoiceNote}
                    style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '12px', borderRadius: '14px', fontWeight: 900, cursor: 'pointer' }}
                  >
                    SEND VOICE NOTE
                  </button>
                </motion.div>
              ) : isRecording ? (
                <div style={{
                  background: '#FEF2F2',
                  padding: '24px',
                  borderRadius: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '15px'
                }}>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    style={{ width: '60px', height: '60px', background: '#EF4444', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Mic size={30} color="white" />
                  </motion.div>
                  <div style={{ fontWeight: 900, color: '#EF4444', fontSize: '14px', letterSpacing: '1px', textAlign: 'center' }}>
                    PLEASE STATE YOUR NAME, DETAILS & REQUEST...
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textAlign: 'center' }}>
                    Speak in any of the 11 official SA languages.
                  </div>
                  <button
                    onClick={stopRecording}
                    style={{ background: '#111827', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '12px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <Square size={16} fill="white" /> STOP & SAVE
                  </button>
                </div>
              ) : (
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
              )}

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
