import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { theme } from '../theme';
import GradientHeader from '../components/GradientHeader';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { config } from '../config';

// Reusing the 'ScannerScreen' file or creating a new VerificationFormScreen?
// The user has 'VerificationFormScreen.js' in the open docs list in context, 
// but App.js navigated to 'Scanner'. 
// I'll assume I should update 'VerificationFormScreen.js' and maybe update App.js or assume 'Scanner' was refactored.
// Let's write to VerificationFormScreen.js as it's the most descriptive.

export default function VerificationFormScreen({ route, navigation }) {
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
            // Simulate API call or real one
             // const response = await axios.get(`${config.API_URL}/api/verify?type=${category === 'education' ? 'school' : category === 'medical' ? 'doctor' : 'lawyer'}&q=${query}`);
             
             // Mock delay
             setTimeout(() => {
                 setLoading(false);
                 // Mock result for demo
                 navigation.navigate('Result', { 
                     data: {
                         name: query, // Use input as name
                         status: true,
                         regNumber: '2001/HE07/006',
                         type: category
                     }
                 });
             }, 1000);

        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <GradientHeader title="Sumbandila" showBack={true} onBack={() => navigation.goBack()} />
            
            <View style={styles.content}>
                 <TouchableOpacity onPress={() => navigation.goBack()} style={styles.subBack}>
                    <Ionicons name="arrow-back" size={20} color={theme.colors.text} />
                    <Text style={styles.subBackText}>Back to Categories</Text>
                </TouchableOpacity>

                <View style={[styles.card, theme.shadows.default]}>
                    <Text style={styles.cardTitle}>{getCategoryTitle()}</Text>
                    
                    <View style={styles.inputContainer}>
                        <TextInput 
                            style={styles.input}
                            placeholder="Enter name or registration number"
                            value={query}
                            onChangeText={setQuery}
                        />
                        <Ionicons name="search" size={24} color={theme.colors.textLight} style={styles.searchIcon} />
                    </View>

                    <TouchableOpacity 
                        style={styles.verifyButton}
                        onPress={handleVerify}
                        disabled={loading}
                    >
                        <Text style={styles.verifyButtonText}>{loading ? 'Verifying...' : 'Verify Now'}</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.card, theme.shadows.default, styles.sampleCard]}>
                    <Text style={styles.sampleTitle}>Try these sample searches:</Text>
                    
                    <TouchableOpacity style={styles.sampleItem} onPress={() => setQuery("Boston City Campus")}>
                        <Text style={styles.sampleText}>Boston City Campus</Text>
                    </TouchableOpacity>
                     
                     <TouchableOpacity style={styles.sampleItem} onPress={() => setQuery("Damelin")}>
                        <Text style={styles.sampleText}>Damelin</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        padding: theme.spacing.l,
    },
    subBack: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.m,
    },
    subBackText: {
        marginLeft: 8,
        fontSize: 16,
        color: theme.colors.text,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: theme.borderRadius.l,
        padding: theme.spacing.l,
        marginBottom: theme.spacing.l,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: theme.spacing.l,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.m,
        paddingHorizontal: theme.spacing.m,
        height: 56,
        marginBottom: theme.spacing.l,
         backgroundColor: '#FAFAFA'
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: theme.colors.text,
    },
    searchIcon: {
        marginLeft: theme.spacing.s,
    },
    verifyButton: {
        backgroundColor: '#E2E8F0', // Light gray as per screenshot (or maybe it fills color when active?)
        // Screenshot shows gray button "Verify Now". It might turn colored when input is filled.
        // Let's use gray for now as inactive state or default.
        borderRadius: theme.borderRadius.m,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    verifyButtonText: {
        color: '#94A3B8', // Gray text
        fontSize: 18,
        fontWeight: '600',
    },
    sampleCard: {
        marginTop: theme.spacing.s,
    },
    sampleTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: theme.spacing.m,
    },
    sampleItem: {
        backgroundColor: '#F8FAFC',
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.s,
        marginBottom: theme.spacing.s,
    },
    sampleText: {
        color: theme.colors.text,
        fontSize: 16,
    }
});
