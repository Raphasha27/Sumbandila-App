// @ts-ignore
import React, { useState } from 'react';
// @ts-ignore
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const VerifyScreen = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleVerify = () => {
    // Simulated API call to the Sentinel Backend
    if (query.includes('Jane Smith')) {
      setResult({
        name: 'Dr Jane Smith',
        status: 'Verified & Registered',
        trustScore: 98,
        hash: '0x7f92e3a...b7c8d9e'
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sentinel Verify</Text>
        <Text style={styles.subtitle}>Sovereign Identity Registry</Text>
      </View>

      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          placeholder="Name or HPCSA Number"
          placeholderTextColor="#8b949e"
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>Check Trust Registry</Text>
        </TouchableOpacity>
      </View>

      {result && (
        <View style={styles.resultCard}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{result.trustScore}% TRUST</Text>
          </View>
          <Text style={styles.resultName}>{result.name}</Text>
          <Text style={styles.resultStatus}>✓ {result.status}</Text>
          
          <View style={styles.hashContainer}>
            <Text style={styles.hashLabel}>Blockchain Fingerprint:</Text>
            <Text style={styles.hashText}>{result.hash}</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d1117', padding: 20 },
  header: { marginTop: 40, marginBottom: 30 },
  title: { color: '#58a6ff', fontSize: 28, fontWeight: '800' },
  subtitle: { color: '#8b949e', fontSize: 16 },
  searchSection: { marginBottom: 30 },
  input: { 
    backgroundColor: '#161b22', 
    borderWidth: 1, 
    borderColor: '#30363d', 
    borderRadius: 12, 
    padding: 15, 
    color: '#fff',
    marginBottom: 15
  },
  button: { 
    backgroundColor: '#58a6ff', 
    borderRadius: 12, 
    padding: 18, 
    alignItems: 'center' 
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  resultCard: { 
    backgroundColor: '#161b22', 
    borderRadius: 20, 
    padding: 25, 
    borderWidth: 1, 
    borderColor: '#30363d' 
  },
  badge: { 
    backgroundColor: 'rgba(255,157,0,0.15)', 
    paddingHorizontal: 12, 
    paddingVertical: 4, 
    borderRadius: 20, 
    alignSelf: 'flex-start',
    marginBottom: 10
  },
  badgeText: { color: '#FF9D00', fontWeight: '800', fontSize: 12 },
  resultName: { color: '#fff', fontSize: 22, fontWeight: '700' },
  resultStatus: { color: '#3fb950', fontSize: 16, fontWeight: '600', marginTop: 5 },
  hashContainer: { marginTop: 20, paddingTop: 20, borderTopWidth: 1, borderTopColor: '#30363d' },
  hashLabel: { color: '#8b949e', fontSize: 12, marginBottom: 5 },
  hashText: { color: '#3fb950', fontFamily: 'monospace', fontSize: 12 }
});

export default VerifyScreen;
