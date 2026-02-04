import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ShieldCheck, QrCode, User, Fingerprint, Lock } from 'lucide-react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  }, []);

  const handleBiometricAuth = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Sentinel Identity Verification',
        fallbackLabel: 'Use Passcode',
        disableDeviceFallback: false,
      });

      if (result.success) {
        setIsAuthenticated(true);
      } else {
        Alert.alert('Authentication Failed', 'Secure access denied.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during authentication.');
    }
  };

  if (!isAuthenticated) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <StatusBar style="light" />
        <View style={styles.loginLogo}>
          <ShieldCheck size={80} color="#E65100" />
        </View>
        <Text style={styles.loginTitle}>Sentinel Mobile Authority</Text>
        <Text style={styles.loginSubtitle}>LEVEL 5 CLEARANCE REQUIRED</Text>
        
        <TouchableOpacity style={styles.authButton} onPress={handleBiometricAuth}>
          <Fingerprint size={32} color="white" />
          <Text style={styles.authButtonText}>Verify Identity</Text>
        </TouchableOpacity>
        
        <Text style={styles.securityText}>
          <Lock size={12} color="#94A3B8" /> Secured by Government Cryptographic Seal
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoBox}>
          <ShieldCheck size={32} color="#E65100" />
          <Text style={styles.logoText}>Sumbandila</Text>
        </View>
        <Text style={styles.subtitle}>Sentinel Mobile Authority</Text>
      </View>

      {/* Main Action */}
      <View style={styles.content}>
        <TouchableOpacity style={styles.scanButton}>
          <QrCode size={40} color="white" />
          <Text style={styles.scanText}>Scan Registry Seal</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Bar */}
      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>Vetted</Text>
          <Text style={styles.statLabel}>45k+</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>Pulse</Text>
          <Text style={[styles.statLabel, { color: '#4ADE80' }]}>LIVE</Text>
        </View>
      </View>

      {/* Bottom Nav Mock */}
      <TouchableOpacity 
        style={styles.bottomNav}
        onPress={() => setIsAuthenticated(false)}
      >
        <User size={24} color="#6B7280" />
        <Text style={styles.navText}>Agent Profile (Sign Out)</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  loginLogo: {
    marginBottom: 32,
    shadowColor: '#E65100',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  loginTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
  },
  loginSubtitle: {
    color: '#E65100',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 2,
    marginTop: 8,
    marginBottom: 48,
  },
  authButton: {
    backgroundColor: '#E65100',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#E65100',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  authButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
  },
  securityText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 24,
    opacity: 0.6,
  },
  header: {
    padding: 24,
    alignItems: 'center',
    marginTop: 40,
  },
  logoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoText: {
    color: 'white',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -1,
  },
  subtitle: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scanButton: {
    backgroundColor: '#E65100',
    width: '100%',
    height: 180,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#E65100',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  scanText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
  },
  statsBar: {
    flexDirection: 'row',
    padding: 24,
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '800',
  },
  statLabel: {
    color: 'white',
    fontSize: 18,
    fontWeight: '900',
  },
  bottomNav: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  navText: {
    color: '#94A3B8',
    fontWeight: '700',
  }
});
