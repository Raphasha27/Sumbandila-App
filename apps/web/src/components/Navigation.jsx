import { motion } from 'framer-motion';
import { Home, TrendingUp, Search, User, Bot, Bell, Plus } from 'lucide-react';

export const CategoryCard = ({ icon, label, sublabel, bg, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -4 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    style={{
      background: bg,
      borderRadius: '24px',
      padding: '32px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
      cursor: 'pointer',
      boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
      color: 'white',
      width: '100%',
      textAlign: 'center'
    }}
  >
    <div style={{
      width: '72px',
      height: '72px',
      background: 'rgba(255,255,255,0.2)',
      borderRadius: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '4px'
    }}>
      {icon}
    </div>
    <div>
      <div style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '4px' }}>{label}</div>
      <div style={{ fontSize: '15px', fontWeight: 500, opacity: 0.9 }}>{sublabel}</div>
    </div>
  </motion.div>
);



export const BottomNav = ({ active, onNav }) => {
  const items = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'search-view', icon: Search, label: 'Verify' },
    { id: 'sipho-ai', icon: Bot, label: 'Sipho AI', isFab: true },
    { id: 'vault', icon: Bell, label: 'Alerts' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: '0',
      left: '0',
      right: '0',
      height: '84px',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '0 12px 20px',
      background: 'rgba(11, 17, 32, 0.95)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      zIndex: 1000
    }}>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id || (active === 'home' && item.id === 'dashboard');
        
        if (item.isFab) {
          return (
            <div
              key={item.id}
              onClick={() => onNav(item.id)}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                top: '-16px',
                cursor: 'pointer',
                zIndex: 2
              }}
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '28px',
                  background: '#10B981',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)'
                }}
              >
                <Icon size={28} color="white" />
              </motion.div>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#94A3B8', marginTop: '6px' }}>{item.label}</span>
            </div>
          );
        }

        return (
          <div
            key={item.id}
            onClick={() => onNav(item.id)}
            style={{ 
              position: 'relative',
              flex: 1,
              height: '56px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              zIndex: 1
            }}
          >
            <motion.div
              animate={{
                color: isActive ? '#3B82F6' : '#64748B'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <motion.span 
                animate={{ 
                  opacity: isActive ? 1 : 0.8,
                  fontWeight: isActive ? 800 : 600
                }}
                style={{ fontSize: '10px', letterSpacing: '0.2px' }}
              >
                {item.label}
              </motion.span>
            </motion.div>
          </div>
        );
      })}
    </nav>
  );
};

