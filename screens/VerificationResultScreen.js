import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function VerificationResultScreen({ route, navigation }) {
    const { theme } = useTheme();
    const { hash } = route.params || {}; // The certificate hash from QR code
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        verifyCertificate();
    }, []);

    const verifyCertificate = async () => {
        // Simulate network delay for "Scanning Blockchain/Database" effect
        setTimeout(() => {
            if (hash === 'invalid') {
                setError('Certificate fingerprint not found or revoked.');
                setLoading(false);
            } else {
                // Mock Success Result (matches the Issuer logic we just built)
                setResult({
                    status: 'VALID',
                    studentName: 'John Doe',
                    studentId: '9501015800088',
                    course: 'Diploma in Information Technology',
                    institution: 'Pretoria Technical College',
                    awardDate: '2023-11-15',
                    hash: hash || 'a3f9c2...8d2',
                    signedBy: 'Sumbandila National Registry CA'
                });
                setLoading(false);
            }
        }, 2000);

        // In real implementation:
        /*
        try {
            const response = await fetch(`${config.apiBase}/api/verify/cert/${hash}`);
            const data = await response.json();
            if (data.valid) setResult(data);
            else setError(data.message);
        } catch (e) { setError('Network Error'); }
        */
    };

    if (loading) {
        return (
            <View style={[styles.container, { backgroundColor: theme.colors.background, justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={{ marginTop: 20, color: theme.colors.textSecondary, fontSize: 16 }}>Verifying Digital Signature...</Text>
                <Text style={{ marginTop: 8, color: theme.colors.textMuted, fontSize: 12 }}>Checking against National Registry</Text>
            </View>
        );
    }

    const isValid = result?.status === 'VALID';

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <LinearGradient
                colors={isValid ? ['#10B981', '#059669'] : ['#EF4444', '#B91C1C']}
                style={styles.header}
            >
                <View style={styles.iconCircle}>
                    <Ionicons name={isValid ? "checkmark" : "close"} size={48} color={isValid ? "#10B981" : "#EF4444"} />
                </View>
                <Text style={styles.headerTitle}>{isValid ? 'VERIFIED' : 'INVALID'}</Text>
                <Text style={styles.headerSubtitle}>
                    {isValid ? 'This certificate is authentic and valid.' : 'This certificate could not be verified.'}
                </Text>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.content}>
                {isValid ? (
                    <>
                        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
                            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>FULL NAME</Text>
                            <Text style={[styles.value, { color: theme.colors.text }]}>{result.studentName}</Text>
                            
                            <View style={styles.divider} />
                            
                            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>QUALIFICATION</Text>
                            <Text style={[styles.value, { color: theme.colors.text }]}>{result.course}</Text>

                            <View style={styles.divider} />

                            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>AWARDED BY</Text>
                            <Text style={[styles.value, { color: theme.colors.text }]}>{result.institution}</Text>

                            <View style={styles.divider} />

                            <View style={styles.row}>
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.label, { color: theme.colors.textSecondary }]}>DATE</Text>
                                    <Text style={[styles.value, { color: theme.colors.text }]}>{result.awardDate}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.label, { color: theme.colors.textSecondary }]}>ID NUMBER</Text>
                                    <Text style={[styles.value, { color: theme.colors.text }]}>{result.studentId}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={[styles.card, { backgroundColor: theme.colors.surface, marginTop: 16 }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                                <MaterialIcons name="security" size={20} color={theme.colors.primary} />
                                <Text style={[styles.cardTitle, { color: theme.colors.primary, marginLeft: 8 }]}>Cryptographic Proof</Text>
                            </View>
                            
                            <Text style={[styles.label, { color: theme.colors.textSecondary }]}>DIGITAL FINGERPRINT (HASH)</Text>
                            <Text style={[styles.hash, { color: theme.colors.textMuted }]}>{result.hash}</Text>
                            
                            <Text style={[styles.label, { color: theme.colors.textSecondary, marginTop: 12 }]}>SIGNED BY</Text>
                            <Text style={[styles.footerText, { color: theme.colors.text }]}>{result.signedBy}</Text>
                        </View>
                    </>
                ) : (
                    <View style={[styles.card, { backgroundColor: theme.colors.surface, alignItems: 'center', padding: 32 }]}>
                        <Ionicons name="warning-outline" size={48} color={theme.colors.error} />
                        <Text style={[styles.errorText, { color: theme.colors.error }]}>{error || 'Unknown Error'}</Text>
                        <Text style={[styles.instruction, { color: theme.colors.textSecondary }]}>
                            Please contact the issuing institution directly for verification.
                        </Text>
                    </View>
                )}

                <TouchableOpacity 
                    style={[styles.btn, { backgroundColor: theme.colors.primary }]}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.btnText}>Done</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { alignItems: 'center', paddingVertical: 40, paddingHorizontal: 20, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
    iconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
    headerTitle: { fontSize: 24, fontWeight: 'bold', color: 'white', letterSpacing: 2 },
    headerSubtitle: { color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginTop: 8 },
    content: { padding: 20 },
    card: { borderRadius: 16, padding: 20, elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
    cardTitle: { fontSize: 16, fontWeight: 'bold' },
    label: { fontSize: 12, fontWeight: 'bold', letterSpacing: 1, marginBottom: 4 },
    value: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
    divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 12 },
    row: { flexDirection: 'row' },
    hash: { fontSize: 10, fontFamily: 'monospace' },
    footerText: { fontSize: 14, fontWeight: '500' },
    errorText: { fontSize: 18, fontWeight: 'bold', marginTop: 16, textAlign: 'center' },
    instruction: { textAlign: 'center', marginTop: 12 },
    btn: { marginTop: 24, padding: 16, borderRadius: 12, alignItems: 'center' },
    btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});
