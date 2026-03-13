import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, ActivityIndicator, Alert, Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Shield, Search, AlertTriangle, CheckCircle, XCircle } from 'lucide-react-native';

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000';

const TRANSLATIONS = {
  en: { placeholder: 'Search doctor, lawyer or college...', verify: 'Verify Now', checking: 'Checking registry...' },
  zu: { placeholder: 'Sesha ngokwakho...', verify: 'Hlola Manje', checking: 'Hlola irejista...' },
  af: { placeholder: 'Soek dokter, prokureur of kollege...', verify: 'Verifieer Nou', checking: 'Registry nagaan...' },
};

export default function VerifyScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('en');
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const verify = async () => {
    if (!query.trim() || query.length < 2) {
      Alert.alert('Search Required', 'Please enter at least 2 characters to search.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/v1/verify/?q=${encodeURIComponent(query)}&lang=${lang}`);
      const data = await res.json();
      navigation.navigate('Result', { data });
    } catch {
      // Fallback mock when API not reachable
      navigation.navigate('Result', {
        data: {
          name: query,
          status: 'Unverified',
          status_label: '❓ Not found in National Registry',
          type: 'Unknown',
          authority: 'Sumbandila Sentinel',
          risk: 'High',
          trust_score: 20,
          warning: 'This entity could not be verified. Do not pay any fees until confirmed through official channels.',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      {/* Header */}
      <LinearGradient colors={['#0056b3', '#003d80']} style={styles.header}>
        <Shield size={32} color="white" />
        <Text style={styles.headerTitle}>Verify Instantly</Text>
        <Text style={styles.headerSub}>Search doctors, lawyers or colleges</Text>
      </LinearGradient>

      {/* Language Switcher */}
      <View style={styles.langRow}>
        {Object.keys(TRANSLATIONS).map(l => (
          <TouchableOpacity
            key={l}
            style={[styles.langBtn, lang === l && styles.langBtnActive]}
            onPress={() => setLang(l)}
          >
            <Text style={[styles.langLabel, lang === l && styles.langLabelActive]}>
              {l.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#94A3B8" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder={t.placeholder}
          placeholderTextColor="#94A3B8"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={verify}
          returnKeyType="search"
        />
      </View>

      <TouchableOpacity style={styles.verifyBtn} onPress={verify} disabled={loading}>
        <LinearGradient colors={['#0056b3', '#003d80']} style={styles.verifyBtnGrad}>
          {loading
            ? <ActivityIndicator color="white" />
            : <Text style={styles.verifyBtnText}>{t.verify}</Text>
          }
        </LinearGradient>
      </TouchableOpacity>

      {loading && (
        <Text style={styles.loadingText}>{t.checking}</Text>
      )}

      {/* Verification Instructions or Tips */}
      {!loading && (
        <View style={styles.tips}>
          <Text style={styles.tipsTitle}>What can you verify?</Text>
          {['🎓 Colleges & Universities (DHET/SAQA)', '🏥 Doctors & Specialists (HPCSA)', '⚖️ Lawyers & Advocates (LPC/FFC)', '🔬 Psychologists (Psytech SA)'].map(item => (
            <Text key={item} style={styles.tipItem}>{item}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { padding: 32, paddingTop: 60, alignItems: 'center', gap: 8 },
  headerTitle: { color: 'white', fontSize: 26, fontWeight: '900', marginTop: 8 },
  headerSub: { color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: '500' },
  langRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, padding: 16 },
  langBtn: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, backgroundColor: '#E2E8F0' },
  langBtnActive: { backgroundColor: '#0056b3' },
  langLabel: { fontSize: 12, fontWeight: '700', color: '#64748B' },
  langLabelActive: { color: 'white' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 16, marginHorizontal: 20, paddingHorizontal: 16, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8 },
  searchIcon: { marginRight: 10 },
  input: { flex: 1, paddingVertical: 16, fontSize: 16, color: '#1E293B' },
  verifyBtn: { marginHorizontal: 20, marginTop: 12, borderRadius: 16, overflow: 'hidden' },
  verifyBtnGrad: { padding: 18, alignItems: 'center' },
  verifyBtnText: { color: 'white', fontSize: 17, fontWeight: '800' },
  loadingText: { textAlign: 'center', color: '#64748B', marginTop: 12, fontWeight: '600' },
  tips: { margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 20, marginTop: 40 },
  tipsTitle: { fontSize: 16, fontWeight: '800', color: '#1E293B', marginBottom: 12 },
  tipItem: { fontSize: 14, color: '#475569', fontWeight: '600', marginBottom: 8 },
});
