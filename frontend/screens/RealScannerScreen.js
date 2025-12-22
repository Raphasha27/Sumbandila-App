import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function RealScannerScreen({ navigation }) {
    const { theme, isDarkMode } = useTheme();
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
        
        setTimeout(() => {
            navigation.navigate('Result', { 
                data: {
                    name: 'Scanned Institution', 
                    status: true, 
                    regNumber: data, 
                    type: 'education'
                }
            });
            setTimeout(() => setScanned(false), 2000); 
        }, 500);
    };

    if (!permission) return <View style={[styles.container, { backgroundColor: theme.colors.background }]} />; 

    if (!permission.granted) {
        return (
            <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <View style={[styles.messageBox, theme.shadows.default, { backgroundColor: theme.colors.surface }]}>
                    <Ionicons name="camera-outline" size={64} color={theme.colors.textLight} style={{marginBottom: 16}} />
                    <Text style={[styles.message, { color: theme.colors.text }]}>We need permission to access your camera to scan certificates.</Text>
                    <TouchableOpacity onPress={requestPermission} style={[styles.button, { backgroundColor: theme.colors.primary }]}>
                        <Text style={styles.buttonText}>Grant Permission</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelButton}>
                        <Text style={[styles.cancelText, { color: theme.colors.textLight }]}>Cancel</Text>
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
            
            <View style={styles.overlay}>
                <View style={styles.header}>
                     <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="close-circle" size={40} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Scan Result Code</Text>
                </View>

                <View style={styles.scanFrameContainer}>
                     <View style={[styles.scanFrame, { borderColor: theme.colors.primary }]} />
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
        borderRadius: 16,
        padding: 24,
        width: '85%',
        alignItems: 'center',
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 24,
    },
    button: {
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
    },
    footer: {
        height: 100,
    }
});

