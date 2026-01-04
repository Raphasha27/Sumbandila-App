import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function ScannerScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    
    // Check if it's a Sumbandila Digital Certificate
    if (data.includes('/verify/')) {
        // Extract hash from URL: https://sumbandila.co.za/verify/a3f9...
        const hash = data.split('/verify/')[1];
        if (hash) {
            navigation.navigate('VerificationResult', { hash });
            return;
        }
    }

    // Also accept raw hash strings (for demo purposes) if length is 64 chars (SHA-256)
    if (data.length === 64 && /^[0-9a-fA-F]+$/.test(data)) {
         navigation.navigate('VerificationResult', { hash: data });
         return;
    }

    // Default: Navigate Home with data (for existing lookups)
    navigation.navigate('Home', { scannedData: data });
    // removed alert to make it smoother
  };

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.btn}>
          <Text style={styles.text}>Grant Permission</Text>
        </TouchableOpacity>
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
      <View style={{ position: 'absolute', bottom: 40, left: 20, right: 20 }}>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}><Text style={{ color: '#fff' }}>Cancel</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  btn: { backgroundColor: '#111', padding: 12, alignItems: 'center', borderRadius: 8 },
  text: { fontSize: 18, fontWeight: 'bold', color: 'white' }
})
