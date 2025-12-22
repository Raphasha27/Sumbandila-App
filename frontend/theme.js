const commonColors = {
    primary: '#F97316', // Orange 500
    primaryLight: '#FB923C', // Orange 400
    primaryDark: '#EA580C', // Orange 600
    secondary: '#10B981', // Emerald 500
    secondaryLight: '#34D399', // Emerald 400
    
    // Gradients
    gradientStart: '#F97316',
    gradientEnd: '#22C55E',

    // Category Colors (Keep these vibrant in both modes)
    education: '#3B82F6', 
    medical: '#22C55E', 
    legal: '#A855F7', 

    success: '#10B981', 
    error: '#EF4444', 
    warning: '#F59E0B', 
    info: '#3B82F6', 
};

export const lightColors = {
    ...commonColors,
    background: '#F8FAFC', // Slate 50
    surface: '#FFFFFF',
    text: '#1F2937', // Gray 800
    textLight: '#6B7280', // Gray 500
    textInverse: '#FFFFFF',
    border: '#E2E8F0',
};

export const darkColors = {
    ...commonColors,
    background: '#0F172A', // Slate 900
    surface: '#1E293B',    // Slate 800
    text: '#F8FAFC',       // Slate 50
    textLight: '#94A3B8',  // Slate 400
    textInverse: '#FFFFFF',
    border: '#334155',     // Slate 700
};

export const theme = {
    spacing: {
        xs: 4,
        s: 8,
        m: 16,
        l: 24,
        xl: 32,
        xxl: 48,
    },
    borderRadius: {
        s: 8,
        m: 12,
        l: 16,
        xl: 24,
    },
    shadows: {
        default: {
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
        },
        hover: {
            shadowColor: '#F97316',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.2,
            shadowRadius: 16,
            elevation: 8,
        },
        card: {
             shadowColor: '#000000',
             shadowOffset: { width: 0, height: 2 },
             shadowOpacity: 0.05,
             shadowRadius: 4,
             elevation: 2,
        }
    },
    typography: {
        header: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#FFFFFF',
        },
        title: {
            fontSize: 20,
            fontWeight: '600',
        },
        body: {
            fontSize: 16,
        },
        caption: {
            fontSize: 14,
        }
    }
};

export const getTheme = (isDark) => ({
    ...theme,
    colors: isDark ? darkColors : lightColors,
});

