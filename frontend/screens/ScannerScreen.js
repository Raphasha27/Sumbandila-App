import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { verifyCode } from '../services/verification';

export default function ScannerScreen({ navigation }) {
    const { theme, isDarkMode } = useTheme();
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!permission) {
            requestPermission();
        }
    }, [permission]);

    const handleBarCodeScanned = async ({ data }) => {
        setScanned(true);
        setLoading(true);
        try {
            console.log('Scanned data:', data);
            const result = await verifyCode(data);
            navigation.navigate('Result', { data: result });
        } catch (error) {
            console.error(error);
            Alert.alert(
                "Verification Failed",
                "Unable to verify this code. It may be invalid or you are offline.",
                [{ text: "OK", onPress: () => setScanned(false) }]
            );
        } finally {
            setLoading(false);
        }
    };

    if (!permission) return <View style={{ flex: 1, backgroundColor: theme.colors.background }} />;

    if (!permission.granted) {
        return (
            <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <View style={[styles.permissionBox, { backgroundColor: theme.colors.surface }]}>
                    <MaterialCommunityIcons name="camera-off" size={64} color={theme.colors.textLight} />
                    <Text style={[styles.permissionText, { color: theme.colors.text }]}>Camera permission is required to scan codes</Text>
                    <TouchableOpacity onPress={requestPermission} style={[styles.btn, { backgroundColor: theme.colors.primary }]}>
                        <Text style={styles.btnText}>Grant Permission</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={StyleSheet.absoluteFillObject}
                facing="back"
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            />
            
            {loading && (
                <View style={[styles.loadingOverlay, { backgroundColor: 'rgba(0,0,0,0.7)' }]}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                    <Text style={{ color: 'white', marginTop: 10 }}>Verifying...</Text>
                </View>
            )}
            
            <SafeAreaView style={styles.overlay}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Feather name="x" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Scan Code</Text>
                    <View style={{ width: 40 }} />
                </View>

                <View style={styles.scannerFrameContainer}>
                    <View style={styles.scannerFrame}>
                        <View style={[styles.corner, styles.topLeft]} />
                        <View style={[styles.corner, styles.topRight]} />
                        <View style={[styles.corner, styles.bottomLeft]} />
                        <View style={[styles.corner, styles.bottomRight]} />
                    </View>
                    <Text style={styles.hint}>Align code within the frame</Text>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center' },
    permissionBox: { margin: 24, padding: 32, borderRadius: 24, alignItems: 'center', elevation: 4 },
    permissionText: { fontSize: 16, textAlign: 'center', marginVertical: 20, lineHeight: 24 },
    btn: { paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12 },
    btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
    backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: 'white' },
    scannerFrameContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    scannerFrame: { width: 250, height: 250, position: 'relative' },
    corner: { position: 'absolute', width: 40, height: 40, borderColor: '#16a34a', borderWidth: 4 },
    topLeft: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
    topRight: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
    bottomLeft: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
    bottomRight: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
    hint: { color: 'white', marginTop: 32, fontSize: 16, fontWeight: '500', backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
    loadingOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', zIndex: 10 }
});

