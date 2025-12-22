import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import GradientHeader from '../components/GradientHeader';
import { Ionicons } from '@expo/vector-icons';

export default function VerificationFormScreen({ route, navigation }) {
    const { theme, isDarkMode } = useTheme();
    const { category } = route.params || { category: 'education' }; // Default to education
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const getCategoryTitle = () => {
        switch(category) {
            case 'medical': return 'Medical Verification';
            case 'legal': return 'Legal Verification';
            default: return 'Education Verification';
        }
    };

    const handleVerify = async () => {
        if (!query.trim()) return;
        setLoading(true);
        try {
             setTimeout(() => {
                 setLoading(false);
                 navigation.navigate('Result', { 
                     data: {
                         name: query, 
                         status: true,
                         regNumber: '2001/HE07/006',
                         type: category
                     }
                 });
             }, 1000);

        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <GradientHeader title="Sumbandila" showBack={true} onBack={() => navigation.goBack()} />
            
            <View style={styles.content}>
                 <TouchableOpacity onPress={() => navigation.goBack()} style={styles.subBack}>
                    <Ionicons name="arrow-back" size={20} color={theme.colors.text} />
                    <Text style={[styles.subBackText, { color: theme.colors.text }]}>Back to Categories</Text>
                </TouchableOpacity>

                <View style={[styles.card, theme.shadows.default, { backgroundColor: theme.colors.surface }]}>
                    <Text style={[styles.cardTitle, { color: theme.colors.text }]}>{getCategoryTitle()}</Text>
                    
                    <View style={[styles.inputContainer, { borderColor: theme.colors.border, backgroundColor: isDarkMode ? theme.colors.background : '#FAFAFA' }]}>
                        <TextInput 
                            style={[styles.input, { color: theme.colors.text }]}
                            placeholder="Enter name or registration number"
                            placeholderTextColor={theme.colors.textLight}
                            value={query}
                            onChangeText={setQuery}
                        />
                        <Ionicons name="search" size={24} color={theme.colors.textLight} style={styles.searchIcon} />
                    </View>

                    <TouchableOpacity 
                        style={[styles.verifyButton, { backgroundColor: query.trim() ? theme.colors.primary : (isDarkMode ? theme.colors.background : '#E2E8F0') }]}
                        onPress={handleVerify}
                        disabled={loading || !query.trim()}
                    >
                        <Text style={[styles.verifyButtonText, { color: query.trim() ? 'white' : '#94A3B8' }]}>
                            {loading ? 'Verifying...' : 'Verify Now'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.card, theme.shadows.default, styles.sampleCard, { backgroundColor: theme.colors.surface }]}>
                    <Text style={[styles.sampleTitle, { color: theme.colors.text }]}>Try these sample searches:</Text>
                    
                    <TouchableOpacity style={[styles.sampleItem, { backgroundColor: isDarkMode ? theme.colors.background : '#F8FAFC' }]} onPress={() => setQuery("Boston City Campus")}>
                        <Text style={[styles.sampleText, { color: theme.colors.text }]}>Boston City Campus</Text>
                    </TouchableOpacity>
                     
                     <TouchableOpacity style={[styles.sampleItem, { backgroundColor: isDarkMode ? theme.colors.background : '#F8FAFC' }]} onPress={() => setQuery("Damelin")}>
                        <Text style={[styles.sampleText, { color: theme.colors.text }]}>Damelin</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 24,
    },
    subBack: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    subBackText: {
        marginLeft: 8,
        fontSize: 16,
    },
    card: {
        borderRadius: 16,
        padding: 24,
        marginBottom: 24,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 56,
        marginBottom: 24,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    searchIcon: {
        marginLeft: 8,
    },
    verifyButton: {
        borderRadius: 12,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    verifyButtonText: {
        fontSize: 18,
        fontWeight: '600',
    },
    sampleCard: {
        marginTop: 8,
    },
    sampleTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 16,
    },
    sampleItem: {
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
    },
    sampleText: {
        fontSize: 16,
    }
});

