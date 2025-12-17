import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';

import config from '../config';

export default function ReportFraudScreen({ navigation, route }) {
    const { entityName, entityId } = route.params || {};
    const [description, setDescription] = useState('');
    const [contact, setContact] = useState('');
    const apiBase = config.apiBase;

    const submitReport = async () => {
        if (!description) {
            alert('Please provide a description.');
            return;
        }

        try {
            const res = await fetch(`${apiBase}/api/report`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ entityName, entityId, description, contact })
            });
            const data = await res.json();
            if (data.success) {
                if (Platform.OS === 'web') {
                    alert('Report Submitted! Thank you for helping keep our data accurate.');
                    navigation.goBack();
                } else {
                    Alert.alert('Success', 'Report Submitted!', [{ text: 'OK', onPress: () => navigation.goBack() }]);
                }
            }
        } catch (e) {
            console.error(e);
            alert('Failed to submit report.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Report Incorrect Information</Text>
            <Text style={styles.subtitle}>Help us verify: {entityName || 'Unknown Entity'} ({entityId})</Text>

            <Text style={styles.label}>What is incorrect or fraudulent?</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                multiline
                numberOfLines={4}
                placeholder="e.g., Address is wrong, Doctor is not registered..."
                value={description}
                onChangeText={setDescription}
            />

            <Text style={styles.label}>Your Contact Details (Optional)</Text>
            <TextInput
                style={styles.input}
                placeholder="Email or Phone number"
                value={contact}
                onChangeText={setContact}
            />

            <TouchableOpacity onPress={submitReport} style={styles.button}>
                <Text style={styles.buttonText}>Submit Report</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelBtn}>
                <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: '#fff' },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8, color: '#d32f2f' },
    subtitle: { fontSize: 16, color: '#666', marginBottom: 24 },
    label: { fontWeight: '600', marginBottom: 8, color: '#333' },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 16, backgroundColor: '#f9f9f9' },
    textArea: { height: 100, textAlignVertical: 'top' },
    button: { backgroundColor: '#d32f2f', padding: 16, borderRadius: 8, alignItems: 'center' },
    buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    cancelBtn: { marginTop: 16, alignItems: 'center' },
    cancelText: { color: '#666' }
});
