import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { theme } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import GradientHeader from '../components/GradientHeader';
import axios from 'axios';
import config from '../config';

export default function VerificationFormScreen({ route, navigation }) {
    // Default to Education if no param passed
    const { category = 'education', color = theme.colors.blue } = route.params || {};
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

    const handleVerify = async () => {
        if (!query.trim()) {
            Alert.alert('Error', 'Please enter a name or registration number');
            return;
        }

        setLoading(true);
        try {
            console.log(`Verifying ${category} provider: ${query}`);
            const res = await axios.post(`${config.apiBase}/verify`, { 
                provider_type: category, 
                provider_identifier: query 
            });
            navigation.navigate('Result', { result: res.data });
        } catch (e) {
            console.error(e);
            // Mock fallback for demo
            if (query.toLowerCase().includes('boston') || query.includes('2001')) {
                 navigation.navigate('Result', { result: {
                     valid: true,
                     name: 'Boston City Campus',
                     registration_number: '2001/HE07/006',
                     status: 'Registered',
                     accreditation: 'CHE Accredited',
                     courses: ['Business Management', 'IT', 'Marketing'],
                     valid_until: '2026-12-31'
                 }});
            } else {
                Alert.alert('Not Found', 'Could not verify this provider. Please check the details and try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const fillSample = (text) => setQuery(text);

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <GradientHeader 
                title="Back to Categories" 
                showBack={true} 
                navigation={navigation}
                showProfile={true}
            />
            
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>{categoryTitle} Verification</Text>
                    
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Enter name or registration number"
                            style={styles.input}
                            value={query}
                            onChangeText={setQuery}
                            placeholderTextColor={theme.colors.textSecondary}
                        />
                        <Ionicons name="search" size={24} color={theme.colors.textSecondary} />
                    </View>

                    <TouchableOpacity 
                        style={styles.verifyButton} 
                        onPress={handleVerify}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color={theme.colors.textSecondary} /> 
                        ) : (
                            <Text style={styles.verifyButtonText}>Verify Now</Text>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Sample Searches */}
                <View style={styles.samplesCard}>
                    <Text style={styles.samplesTitle}>Try these sample searches:</Text>
                    
                    <View style={styles.samplesContainer}>
                        <TouchableOpacity style={styles.sampleItem} onPress={() => fillSample('Boston City Campus')}>
                            <Text style={styles.sampleText}>Boston City Campus</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.sampleItem} onPress={() => fillSample('Damelin')}>
                            <Text style={styles.sampleText}>Damelin</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollContent: {
        padding: 20,
    },
    card: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.l,
        padding: 24,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.m,
        paddingHorizontal: 16,
        height: 56,
        marginBottom: 24,
        backgroundColor: theme.colors.background,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: theme.colors.text,
        marginRight: 10,
    },
    verifyButton: {
        backgroundColor: theme.colors.border, // Light grey matching design
        borderRadius: theme.borderRadius.m,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    verifyButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.textSecondary,
    },
    samplesCard: {
        backgroundColor: theme.colors.card,
        borderRadius: theme.borderRadius.l,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    samplesTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 16,
    },
    samplesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    sampleItem: {
        backgroundColor: theme.colors.background,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: theme.borderRadius.round,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    sampleText: {
        fontSize: 14,
        color: theme.colors.text,
        fontWeight: '500',
    }
});
