import { motion } from 'framer-motion';
import { Home, TrendingUp, Search, User } from 'lucide-react';

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
    { id: 'trends', icon: TrendingUp, label: 'Top Charts' },
    { id: 'search-view', icon: Search, label: 'Search' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="glass-effect" style={{
      position: 'fixed',
      bottom: '20px',
      left: '16px',
      right: '16px',
      height: '76px',
      borderRadius: '28px',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '0 12px',
      maxWidth: '600px',
      margin: '0 auto',
      boxShadow: '0 15px 35px -5px rgba(0,0,0,0.1)'
    }}>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id || (active === 'home' && item.id === 'dashboard');
        
        return (
          <motion.div
            key={item.id}
            whileTap={{ scale: 0.9 }}
            onClick={() => onNav(item.id)}
            style={{ 
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              color: isActive ? '#007AFF' : '#94A3B8',
              transition: 'color 0.2s'
            }}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span style={{ fontSize: '10px', fontWeight: 800 }}>{item.label}</span>
          </motion.div>
        );
      })}
    </nav>
  );
};
