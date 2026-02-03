import React from 'react';
import { motion } from 'framer-motion';
import { Home as HomeIcon, FileText, User as UserIcon } from 'lucide-react';

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
  const navItems = [
    { id: 'dashboard', icon: HomeIcon, label: 'Portal', activeId: 'home' },
    { id: 'history', icon: FileText, label: 'Vault', activeId: 'history' },
    { id: 'profile', icon: UserIcon, label: 'Identity', activeId: 'profile' }
  ];

  return (
    <div className="glass-effect" style={{ 
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
      zIndex: 1000,
      boxShadow: '0 15px 35px -5px rgba(0,0,0,0.1)'
    }}>
      {navItems.map((item) => {
        const isActive = active === item.activeId;
        return (
          <div 
            key={item.id} 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '6px',
              cursor: 'pointer',
              position: 'relative'
            }} 
            onClick={() => onNav(item.id)}
          >
            {isActive && (
              <motion.div 
                layoutId="nav-glow"
                style={{ 
                  position: 'absolute', 
                  top: '-12px', 
                  width: '32px', 
                  height: '4px', 
                  background: 'var(--primary)', 
                  borderRadius: '100px' 
                }} 
              />
            )}
            <item.icon 
              size={22} 
              color={isActive ? 'var(--primary-orange)' : 'var(--text-muted)'} 
              strokeWidth={isActive ? 3 : 2}
              style={{ transition: 'all 0.3s ease' }}
            />
            <span style={{ 
              fontSize: '10px', 
              fontWeight:isActive ? 900 : 700, 
              color: isActive ? 'var(--primary-orange)' : 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.8px',
              marginTop: '4px'
            }}>
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
