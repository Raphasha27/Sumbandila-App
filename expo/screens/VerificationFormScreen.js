import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
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
        <View style={styles.container}>
            <GradientHeader 
                title="Back to Categories" 
                showBack={true} 
                navigation={navigation}
                showProfile={true}
            />
            
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>{categoryTitle} Verification</Text>
                    
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder="Enter name or registration number"
                            style={styles.input}
                            value={query}
                            onChangeText={setQuery}
                            placeholderTextColor="#9CA3AF"
                        />
                        <Ionicons name="search" size={24} color="#9CA3AF" />
                    </View>

                    <TouchableOpacity 
                        style={styles.verifyButton} 
                        onPress={handleVerify}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color={theme.colors.text} /> // Using dark text on light button? Check design.
                            // Design calls for grey button with dark text "Verify Now"? Or primary button?
                            // Screenshot shows light grey button with dark grey text "Verify Now".
                        ) : (
                            <Text style={styles.verifyButtonText}>Verify Now</Text>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Sample Searches */}
                <View style={styles.samplesCard}>
                    <Text style={styles.samplesTitle}>Try these sample searches:</Text>
                    
                    <TouchableOpacity style={styles.sampleItem} onPress={() => fillSample('Boston City Campus')}>
                        <Text style={styles.sampleText}>Boston City Campus</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.sampleItem} onPress={() => fillSample('Damelin')}>
                        <Text style={styles.sampleText}>Damelin</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
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
        backgroundColor: 'white',
        borderRadius: 16,
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
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 56,
        marginBottom: 24,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: theme.colors.text,
        marginRight: 10,
    },
    verifyButton: {
        backgroundColor: '#E5E7EB', // Light grey matching screenshot
        borderRadius: 12,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
    },
    verifyButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#9CA3AF', // Grey text for disabled/idle state in screenshot? 
        // Or specific design color? Let's stick to darker grey if active.
        color: '#6B7280' 
    },
    samplesCard: {
        backgroundColor: 'white', // Or transparent? Screenshot looks like another card or just list
        // Screenshot shows a separate white card "Try these sample searches:"
        borderRadius: 16,
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
    sampleItem: {
        backgroundColor: '#F3F4F6',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
    },
    sampleText: {
        fontSize: 16,
        color: theme.colors.text,
    }
});
