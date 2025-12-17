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
    // data expected to be query string like "type=doctor&q=12345"
    navigation.navigate('Home', { scannedData: data });
    alert(`Scanned: ${data}`);
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
