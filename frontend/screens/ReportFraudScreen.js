import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import GradientHeader from '../components/GradientHeader';
import { Ionicons } from '@expo/vector-icons';

export default function ReportFraudScreen({ navigation, route }) {
    const { theme, isDarkMode } = useTheme();
    const { entityName, entityId } = route.params || {};
    const [description, setDescription] = useState('');
    const [contact, setContact] = useState('');

    const submitReport = async () => {
        if (!description) {
            alert('Please provide a description.');
            return;
        }

        setTimeout(() => {
            alert('Report Submitted! Thank you for helping keep our data accurate.');
            navigation.goBack();
        }, 1000);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <GradientHeader title="Report Issue" showBack={true} onBack={() => navigation.goBack()} />
            
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
                <ScrollView 
                    contentContainerStyle={styles.content} 
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    
                    <View style={[styles.card, { backgroundColor: isDarkMode ? 'rgba(239, 68, 68, 0.1)' : '#FEF2F2', borderColor: isDarkMode ? theme.colors.error : '#FECaca' }]}>
                        <View style={styles.alertHeader}>
                            <Ionicons name="warning" size={24} color="#EF4444" />
                            <Text style={styles.alertTitle}>Report Incorrect Information</Text>
                        </View>
                        <Text style={[styles.subtitle, { color: isDarkMode ? theme.colors.text : '#7F1D1D' }]}>
                            Help us protect the community. You are reporting:
                            {'\n'}
                            <Text style={{fontWeight: 'bold', color: theme.colors.text}}>{entityName || 'General Issue'}</Text> 
                            {entityId && <Text style={{fontSize: 12, color: theme.colors.textLight}}> (ID: {entityId})</Text>}
                        </Text>
                    </View>

                    <Text style={[styles.label, { color: theme.colors.text }]}>What is the issue?</Text>
                    <TextInput
                        style={[styles.input, styles.textArea, { backgroundColor: theme.colors.surface, color: theme.colors.text, borderColor: theme.colors.border }]}
                        multiline
                        placeholder="e.g., This doctor is practicing without a license..."
                        placeholderTextColor={theme.colors.textLight}
                        value={description}
                        onChangeText={setDescription}
                    />

                    <Text style={[styles.label, { color: theme.colors.text }]}>Your Contact Details (Optional)</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: theme.colors.surface, color: theme.colors.text, borderColor: theme.colors.border }]}
                        placeholder="Email or Phone number"
                        placeholderTextColor={theme.colors.textLight}
                        value={contact}
                        onChangeText={setContact}
                    />

                    <TouchableOpacity onPress={submitReport} style={[styles.submitButton, { backgroundColor: '#DC2626' }]}>
                        <Text style={styles.submitButtonText}>Submit Secure Report</Text>
                        <Ionicons name="lock-closed" size={16} color="white" style={{marginLeft: 8}} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton}>
                        <Text style={[styles.cancelButtonText, { color: theme.colors.textLight }]}>Cancel</Text>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
    card: {
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
    },
    alertHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    alertTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#B91C1C',
        marginLeft: 8,
    },
    subtitle: {
        fontSize: 14,
        lineHeight: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        fontSize: 16,
        marginBottom: 16,
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    submitButton: {
        borderRadius: 12,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 8,
    },
    cancelButtonText: {
        fontSize: 16,
    }
});

