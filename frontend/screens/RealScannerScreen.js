import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

export default function RealScannerScreen({ navigation }) {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        if (!permission) {
            requestPermission();
        }
    }, [permission]);

    const handleBarCodeScanned = ({ type, data }) => {
        if (scanned) return;
        setScanned(true);
        // Simulate checking if the code is valid
        // Assuming data from QR is just an ID or JSON
        console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
        
        // Mock verification result based on scan
        setTimeout(() => {
            navigation.navigate('Result', { 
                data: {
                    name: 'Scanned Institution', 
                    status: true, 
                    regNumber: data, // Use scanned data as ID
                    type: 'education'
                }
            });
            // Reset scan state after navigation so we can scan again on return? 
            // Better typically to reset on mount or having a 'scan again' button, 
            // but for now this is fine as screens stack.
            setTimeout(() => setScanned(false), 2000); 
        }, 500);
    };

    if (!permission) return <View style={styles.container} />; // Loading

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <View style={[styles.messageBox, theme.shadows.default]}>
                    <Ionicons name="camera-outline" size={64} color={theme.colors.textLight} style={{marginBottom: 16}} />
                    <Text style={styles.message}>We need permission to access your camera to scan certificates.</Text>
                    <TouchableOpacity onPress={requestPermission} style={styles.button}>
                        <Text style={styles.buttonText}>Grant Permission</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton}>
                        <Text style={styles.cancelText}>Cancel</Text>
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
                barCodeScannerSettings={{
                    barCodeTypes: ["qr", "ean13"],
                }}
            />
            
            {/* Overlay */}
            <View style={styles.overlay}>
                <View style={styles.header}>
                     <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="close-circle" size={40} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Scan Result Code</Text>
                </View>

                <View style={styles.scanFrameContainer}>
                     <View style={styles.scanFrame} />
                     <Text style={styles.instructionText}>Align code within frame</Text>
                </View>

                <View style={styles.footer} />
            </View>
        </View>
    );
}

const { width } = Dimensions.get('window');
const frameSize = width * 0.7;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageBox: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        width: '85%',
        alignItems: 'center',
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        color: theme.colors.text,
        marginBottom: 24,
    },
    button: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginBottom: 12,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    cancelButton: {
        paddingVertical: 12,
        alignItems: 'center',
    },
    cancelText: {
        color: theme.colors.textLight,
        fontSize: 16,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        paddingTop: 50,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 16,
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    scanFrameContainer: {
        alignItems: 'center',
    },
    scanFrame: {
        width: frameSize,
        height: frameSize,
        borderWidth: 2,
        borderColor: theme.colors.primary, // Orange frame
        backgroundColor: 'transparent',
    },
    instructionText: {
        color: 'white',
        marginTop: 20,
        fontSize: 16,
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        overflow: 'hidden',
    },
    footer: {
        height: 100,
    }
});
