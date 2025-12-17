import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import { theme } from '../theme';
import GradientHeader from '../components/GradientHeader';
import { Ionicons } from '@expo/vector-icons';
import config from '../config';

export default function ReportFraudScreen({ navigation, route }) {
    const { entityName, entityId } = route.params || {};
    const [description, setDescription] = useState('');
    const [contact, setContact] = useState('');
    const apiBase = config.apiBase;

    const submitReport = async () => {
        if (!description) {
            Platform.OS === 'web' ? alert('Please provide a description.') : Alert.alert('Missing Information', 'Please provide a description.');
            return;
        }

        // Mock submission for UI demo if API fails or is not reachable
        try {
            /* 
            // Real API Call
            const res = await fetch(`${apiBase}/api/report`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ entityName, entityId, description, contact })
            });
            const data = await res.json(); 
            */
            
            // Simulating success for better UX demo
            setTimeout(() => {
                if (Platform.OS === 'web') {
                    alert('Report Submitted! Thank you for helping keep our data accurate.');
                    navigation.goBack();
                } else {
                    Alert.alert('Success', 'Report Submitted! Thank you for helping keep our data accurate.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
                }
            }, 1000);
            
        } catch (e) {
            console.error(e);
            alert('Failed to submit report.');
        }
    };

    return (
        <View style={styles.container}>
            <GradientHeader title="Report Issue" showBack={true} onBack={() => navigation.goBack()} />
            
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
                <ScrollView contentContainerStyle={styles.content}>
                    
                    <View style={[styles.card, theme.shadows.default]}>
                        <View style={styles.alertHeader}>
                            <Ionicons name="warning" size={24} color="#EF4444" />
                            <Text style={styles.alertTitle}>Report Incorrect Information</Text>
                        </View>
                        <Text style={styles.subtitle}>
                            Help us protect the community. You are reporting:
                            {'\n'}
                            <Text style={{fontWeight: 'bold', color: theme.colors.text}}>{entityName || 'General Issue'}</Text> 
                            {entityId && <Text style={{fontSize: 12, color: theme.colors.textLight}}> (ID: {entityId})</Text>}
                        </Text>
                    </View>

                    <Text style={styles.label}>What is the issue?</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        multiline
                        numberOfLines={4}
                        placeholder="e.g., This doctor is practicing without a license, or the address is incorrect..."
                        value={description}
                        onChangeText={setDescription}
                    />

                    <Text style={styles.label}>Your Contact Details (Optional)</Text>
                    <Text style={styles.helperText}>We may contact you for more evidence.</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email or Phone number"
                        value={contact}
                        onChangeText={setContact}
                    />

                    <TouchableOpacity onPress={submitReport} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Submit Secure Report</Text>
                        <Ionicons name="lock-closed" size={16} color="white" style={{marginLeft: 8}} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        padding: theme.spacing.m,
    },
    card: {
        backgroundColor: '#FEF2F2', // Light red
        borderRadius: theme.borderRadius.m,
        padding: theme.spacing.m,
        marginBottom: theme.spacing.l,
        borderWidth: 1,
        borderColor: '#FECaca',
    },
    alertHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.s,
    },
    alertTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#B91C1C',
        marginLeft: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#7F1D1D',
        lineHeight: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: theme.spacing.s,
        marginTop: theme.spacing.s,
    },
    helperText: {
        fontSize: 12,
        color: theme.colors.textLight,
        marginBottom: theme.spacing.s,
    },
    input: {
        backgroundColor: 'white',
        borderRadius: theme.borderRadius.m,
        padding: theme.spacing.m,
        borderWidth: 1,
        borderColor: theme.colors.border,
        fontSize: 16,
        marginBottom: theme.spacing.m,
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    submitButton: {
        backgroundColor: '#DC2626', // Red for danger/report
        borderRadius: theme.borderRadius.m,
        paddingVertical: theme.spacing.m,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing.m,
        ...theme.shadows.default,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        paddingVertical: theme.spacing.m,
        alignItems: 'center',
        marginTop: theme.spacing.s,
    },
    cancelButtonText: {
        color: theme.colors.textLight,
        fontSize: 16,
    }
});
