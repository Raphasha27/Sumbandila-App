import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X, Bot, MessageSquare, ShieldCheck, ChevronRight } from 'lucide-react';
import { useRegistryStore } from '../store/useRegistryStore';

const SumbandilaAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { aiMessages: messages, addAiMessage } = useRegistryStore();
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    addAiMessage({ role: 'user', text: input });
    setInput('');

    // Mock AI response logic
    setTimeout(() => {
      let aiResponse = "I'm checking the national database for that. Would you like me to cross-reference the accreditation status of a specific school or medical practitioner?";

      const lowerInput = input.toLowerCase();
      if (lowerInput.includes('doctor') || lowerInput.includes('medical')) {
        const medRecs = MOCK_DATA.trustedRecommendations.Healthcare.map(r => r.name).join(', ');
        aiResponse = `I can help you verify doctors via the HPCSA registry. If you're looking for verified facilities, I highly recommend ${medRecs}.`;
      } else if (lowerInput.includes('school') || lowerInput.includes('college') || lowerInput.includes('education')) {
        const eduRecs = MOCK_DATA.trustedRecommendations.Education.map(r => r.name).join(', ');
        aiResponse = `I have access to the DHET records. For guaranteed accreditation, consider ${eduRecs}. Which institution are you investigating?`;
      } else if (lowerInput.includes('legal') || lowerInput.includes('lawyer')) {
        const legRecs = MOCK_DATA.trustedRecommendations.Legal.map(r => r.name).join(', ');
        aiResponse = `I can verify legal practitioners through the LPC. Some of the most trusted firms in our database include ${legRecs}.`;
      } else if (lowerInput.includes('risk') || lowerInput.includes('safe') || lowerInput.includes('scam')) {
        aiResponse = "My latest Sentinel Alert indicates a 1.2% increase in bogus college registrations this month. Always look for the 'Sentinel Verified' badge. If an institution isn't found, I'll recommend trusted alternatives automatically.";
      }

      addAiMessage({ role: 'assistant', text: aiResponse });
    }, 1000);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.div
        drag
        dragConstraints={{ left: -300, right: 0, top: -500, bottom: 0 }}
        style={{
          position: 'fixed',
          bottom: '100px',
          right: '20px',
          zIndex: 1000
        }}
      >
        <div
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '24px',
            background: isOpen ? '#374151' : 'var(--bg-gradient)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            border: '2px solid rgba(255,255,255,0.2)'
          }}
        >
          {isOpen ? <X color="white" size={28} /> : <Sparkles color="white" size={28} />}
        </div>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{
              position: 'fixed',
              bottom: '180px',
              right: '20px',
              width: 'calc(100% - 40px)',
              maxWidth: '380px',
              height: '500px',
              background: 'white',
              borderRadius: '32px',
              zIndex: 1001,
              boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              border: '1px solid #F3F4F6'
            }}
          >
            {/* AI Header */}
            <div style={{ background: 'var(--bg-gradient)', padding: '24px', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Bot size={24} color="white" />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800 }}>Sumbandila AI</h3>
                  <div style={{ fontStyle: 'italic', fontSize: '11px', opacity: 0.9, fontWeight: 600 }}>Sentinel Assistant • Active</div>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', background: '#FDFCFB' }}>
              {messages.map((m, i) => (
                <motion.div
                  initial={{ opacity: 0, x: m.role === 'assistant' ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  style={{
                    alignSelf: m.role === 'assistant' ? 'flex-start' : 'flex-end',
                    maxWidth: '85%',
                    background: m.role === 'assistant' ? 'white' : 'var(--primary-orange)',
                    color: m.role === 'assistant' ? '#374151' : 'white',
                    padding: '14px 18px',
                    borderRadius: m.role === 'assistant' ? '20px 20px 20px 4px' : '20px 20px 4px 20px',
                    fontSize: '14px',
                    fontWeight: 600,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                    border: m.role === 'assistant' ? '1px solid #F3F4F6' : 'none'
                  }}
                >
                  {m.text}
                </motion.div>
              ))}
            </div>

            {/* Input Area */}
            <div style={{ padding: '20px', background: 'white', borderTop: '1px solid #F3F4F6' }}>
              <div style={{
                background: '#F3F4F6',
                borderRadius: '100px',
                padding: '6px 6px 6px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <input
                  type="text"
                  placeholder="Ask Sentinel AI..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#374151'
                  }}
                />
                <div
                  onClick={handleSend}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'var(--primary-orange)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Send size={18} color="white" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SumbandilaAI;
