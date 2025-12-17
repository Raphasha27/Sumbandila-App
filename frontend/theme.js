export const theme = {
    colors: {
        primary: '#F97316', // Orange 500
        primaryLight: '#FB923C', // Orange 400
        primaryDark: '#EA580C', // Orange 600
        secondary: '#10B981', // Emerald 500
        secondaryLight: '#34D399', // Emerald 400
        
        // Gradients
        gradientStart: '#F97316',
        gradientEnd: '#22C55E',

        // Category Colors
        education: '#3B82F6', // Blue 500
        medical: '#22C55E', // Green 500
        legal: '#A855F7', // Purple 500

        background: '#F8FAFC', // Slate 50
        surface: '#FFFFFF',
        text: '#1F2937', // Gray 800
        textLight: '#6B7280', // Gray 500
        textInverse: '#FFFFFF',
        
        success: '#10B981', 
        error: '#EF4444', 
        warning: '#F59E0B', 
        info: '#3B82F6', 
        border: '#E2E8F0',
    },
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
            shadowColor: '#64748B',
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
             shadowColor: '#94A3B8',
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
            color: '#1F2937',
        },
        body: {
            fontSize: 16,
            color: '#4B5563',
        },
        caption: {
            fontSize: 14,
            color: '#9CA3AF',
        }
    }
};
