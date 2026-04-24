// @ts-ignore
import React from 'react';
// @ts-ignore
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const PassportScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Sentinel Passport</Text>
                <Text style={styles.subtitle}>Sovereign Professional Identity</Text>
            </View>

            <View style={styles.passportCard}>
                <View style={styles.topSection}>
                    <View style={styles.photoBox}>
                        <Text style={styles.photoPlaceholder}>Photo</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <Text style={styles.name}>Dr Jane Smith</Text>
                        <Text style={styles.regNo}>HPCSA-12345</Text>
                        <View style={styles.trustBadge}>
                            <Text style={styles.trustText}>✓ REGISTERED</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.middleSection}>
                    <Text style={styles.label}>National Authority</Text>
                    <Text style={styles.value}>Medical & Dental Council (HPCSA)</Text>
                    
                    <Text style={[styles.label, {marginTop: 15}]}>Verified Category</Text>
                    <Text style={styles.value}>General Medical Practitioner</Text>

                    <Text style={[styles.label, {marginTop: 15}]}>Integrity Fingerprint</Text>
                    <Text style={styles.fingerprint}>0x7f92...b3c5</Text>
                </View>

                <View style={styles.qrSection}>
                    <View style={styles.qrPlaceholder}>
                        <Text style={{color: '#8b949e', fontSize: 10}}>Sentinel QR Verification</Text>
                    </View>
                    <Text style={styles.scanText}>Scan to verify real-time status</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.exportBtn}>
                <Text style={styles.exportBtnText}>Share Digital Credentials</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.walletBtn}>
                <Text style={styles.walletBtnText}>Add to Apple/Google Wallet</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0d1117', padding: 20 },
    header: { marginTop: 40, marginBottom: 30 },
    title: { color: '#58a6ff', fontSize: 28, fontWeight: '800' },
    subtitle: { color: '#8b949e', fontSize: 16 },
    passportCard: {
        backgroundColor: '#161b22',
        borderRadius: 24,
        padding: 25,
        borderWidth: 1,
        borderColor: '#30363d',
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 20,
    },
    topSection: { flexDirection: 'row', gap: 20, marginBottom: 25 },
    photoBox: { width: 80, height: 100, backgroundColor: '#0d1117', borderRadius: 12, borderContent: 'center', alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', borderWidth: 1, borderColor: '#30363d' },
    photoPlaceholder: { color: '#30363d', fontSize: 10 },
    infoBox: { flex: 1, justifyContent: 'center' },
    name: { color: '#fff', fontSize: 20, fontWeight: '800' },
    regNo: { color: '#58a6ff', fontSize: 14, fontWeight: '600' },
    trustBadge: { backgroundColor: 'rgba(63, 185, 80, 0.15)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginTop: 8, alignSelf: 'flex-start' },
    trustText: { color: '#3fb950', fontSize: 10, fontWeight: '800' },
    middleSection: { marginBottom: 25 },
    label: { color: '#8b949e', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1 },
    value: { color: '#fff', fontSize: 16, fontWeight: '600', marginTop: 3 },
    fingerprint: { color: '#3fb950', fontFamily: 'monospace', fontSize: 12, marginTop: 5 },
    qrSection: { alignItems: 'center', paddingTop: 20, borderTopWidth: 1, borderTopColor: '#30363d' },
    qrPlaceholder: { width: 100, height: 100, backgroundColor: '#fff', borderRadius: 12, padding: 10, alignItems: 'center', justifyContent: 'center' },
    scanText: { color: '#8b949e', fontSize: 12, marginTop: 10 },
    exportBtn: { backgroundColor: '#30363d', borderRadius: 12, padding: 18, alignItems: 'center', marginTop: 25 },
    exportBtnText: { color: '#fff', fontWeight: '700' },
    walletBtn: { backgroundColor: '#fff', borderRadius: 12, padding: 18, alignItems: 'center', marginTop: 12, marginBottom: 40 },
    walletBtnText: { color: '#0d1117', fontWeight: '800' }
});

export default PassportScreen;
