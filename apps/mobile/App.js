/**
 * Sumbandila V3 – App.js (Expo Go entry point)
 * Thin wrapper — just mounts the navigator.
 * All screen logic lives in screens/ and navigation/.
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  console.log('🧪 Absolute Minimal App Starting...');
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sumbandila Mobile Test</Text>
      <Text style={styles.sub}>Testing Absolute Minimum Render</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0056b3', alignItems: 'center', justifyContent: 'center', padding: 20 },
  text: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  sub: { color: 'rgba(255,255,255,0.7)', fontSize: 16, marginTop: 10, textAlign: 'center' },
});
