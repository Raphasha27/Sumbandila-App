import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Light theme colors
const lightTheme = {
    mode: 'light',
    colors: {
        primary: '#ea580c', // Orange (Sumbandila brand)
        primaryLight: '#fb923c',
        primaryDark: '#c2410c',
        secondary: '#16a34a', // Green (Sumbandila brand)
        secondaryLight: '#22c55e',
        secondaryDark: '#15803d',
        background: '#f8fafc',
        surface: '#ffffff',
        surfaceElevated: '#ffffff',
        text: '#1f2937',
        textSecondary: '#6b7280',
        textMuted: '#9ca3af',
        border: '#e5e7eb',
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',
        // Gradient colors
        gradientStart: '#ea580c',
        gradientEnd: '#16a34a',
    },
    shadows: {
        default: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        hover: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 6,
        },
    },
};

// Dark theme colors
const darkTheme = {
    mode: 'dark',
    colors: {
        primary: '#fb923c', // Lighter orange for dark mode
        primaryLight: '#fdba74',
        primaryDark: '#ea580c',
        secondary: '#22c55e', // Lighter green for dark mode
        secondaryLight: '#4ade80',
        secondaryDark: '#16a34a',
        background: '#0f172a',
        surface: '#1e293b',
        surfaceElevated: '#334155',
        text: '#f1f5f9',
        textSecondary: '#94a3b8',
        textMuted: '#64748b',
        border: '#334155',
        success: '#34D399',
        error: '#F87171',
        warning: '#FBBF24',
        info: '#60A5FA',
        // Gradient colors
        gradientStart: '#fb923c',
        gradientEnd: '#22c55e',
    },
    shadows: {
        default: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 3,
        },
        hover: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.4,
            shadowRadius: 8,
            elevation: 6,
        },
    },
};

const ThemeContext = createContext();

const THEME_STORAGE_KEY = '@sumbandila_theme';

export function ThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Load saved theme preference
    useEffect(() => {
        loadThemePreference();
    }, []);

    const loadThemePreference = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
            if (savedTheme !== null) {
                setIsDarkMode(savedTheme === 'dark');
            }
        } catch (error) {
            console.log('Error loading theme preference:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleTheme = async () => {
        try {
            const newMode = !isDarkMode;
            setIsDarkMode(newMode);
            await AsyncStorage.setItem(THEME_STORAGE_KEY, newMode ? 'dark' : 'light');
        } catch (error) {
            console.log('Error saving theme preference:', error);
        }
    };

    const theme = isDarkMode ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme, isLoading }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

// Export themes for direct access if needed
export { lightTheme, darkTheme };
