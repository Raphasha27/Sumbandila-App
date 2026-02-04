import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ShieldCheck, QrCode, User } from 'lucide-react-native';

export default function App() {
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
      <View style={styles.bottomNav}>
        <User size={24} color="#6B7280" />
        <Text style={styles.navText}>Agent Profile v2.0</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
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
