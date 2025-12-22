import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { getTheme } from '../theme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const systemColorScheme = useColorScheme();
    const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

    useEffect(() => {
        setIsDarkMode(systemColorScheme === 'dark');
    }, [systemColorScheme]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const currentTheme = getTheme(isDarkMode);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme: currentTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
