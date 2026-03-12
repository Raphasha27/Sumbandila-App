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

const RiskBadge = ({ risk }) => {
  const colors = {
    Low: { bg: '#DCFCE7', text: '#15803D', icon: CheckCircle },
    Medium: { bg: '#FEF9C3', text: '#A16207', icon: AlertTriangle },
    High: { bg: '#FEE2E2', text: '#DC2626', icon: AlertTriangle },
    Critical: { bg: '#450A0A', text: '#FCA5A5', icon: XCircle },
    Unknown: { bg: '#F1F5F9', text: '#64748B', icon: AlertTriangle },
  };
  const style = colors[risk] || colors.Unknown;
  const Icon = style.icon;
  return (
    <View style={[styles.riskBadge, { backgroundColor: style.bg }]}>
      <Icon size={14} color={style.text} />
      <Text style={[styles.riskText, { color: style.text }]}>{risk} Risk</Text>
    </View>
  );
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

      {/* Result Card */}
      {result && (
        <Animated.View style={[styles.resultCard, { opacity: fadeAnim }]}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultName}>{result.name || query}</Text>
            <RiskBadge risk={result.risk || 'Unknown'} />
          </View>

          <Text style={styles.statusLabel}>{result.status_label || result.status}</Text>

          <View style={styles.resultGrid}>
            {result.type && (
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>TYPE</Text>
                <Text style={styles.gridValue}>{result.type}</Text>
              </View>
            )}
            {result.authority && (
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>AUTHORITY</Text>
                <Text style={styles.gridValue}>{result.authority}</Text>
              </View>
            )}
            {result.registration_number && (
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>REG NUMBER</Text>
                <Text style={styles.gridValue}>{result.registration_number}</Text>
              </View>
            )}
            {result.province && (
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>PROVINCE</Text>
                <Text style={styles.gridValue}>{result.province}</Text>
              </View>
            )}
            {result.specialisation && (
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>SPECIALISATION</Text>
                <Text style={styles.gridValue}>{result.specialisation}</Text>
              </View>
            )}
            {result.fidelity_fund_status && (
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>FFC STATUS</Text>
                <Text style={styles.gridValue}>{result.fidelity_fund_status}</Text>
              </View>
            )}
          </View>

          {result.warning && (
            <View style={styles.warningBox}>
              <AlertTriangle size={16} color="#DC2626" />
              <Text style={styles.warningText}>{result.warning}</Text>
            </View>
          )}
        </Animated.View>
      )}

      {/* Tips */}
      {!result && !loading && (
        <View style={styles.tips}>
          <Text style={styles.tipsTitle}>What can you verify?</Text>
          {['🎓 Colleges & Universities (DHET/SAQA)', '🏥 Doctors & Specialists (HPCSA)', '⚖️ Lawyers & Advocates (LPC/FFC)', '🔬 Psychologists (Psytech SA)'].map(t => (
            <Text key={t} style={styles.tipItem}>{t}</Text>
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
  headerSub: { color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: '500' },
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
  resultCard: { margin: 20, backgroundColor: 'white', borderRadius: 24, padding: 24, elevation: 4, shadowColor: '#0056b3', shadowOpacity: 0.1, shadowRadius: 12 },
  resultHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  resultName: { fontSize: 20, fontWeight: '900', color: '#1E293B', flex: 1, marginRight: 12 },
  statusLabel: { fontSize: 15, fontWeight: '700', color: '#0056b3', marginBottom: 16 },
  resultGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  gridItem: { backgroundColor: '#F0F7FF', borderRadius: 12, padding: 12, minWidth: '45%' },
  gridLabel: { fontSize: 10, fontWeight: '800', color: '#64748B', letterSpacing: 1, textTransform: 'uppercase' },
  gridValue: { fontSize: 13, fontWeight: '700', color: '#1E293B', marginTop: 4 },
  riskBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  riskText: { fontSize: 11, fontWeight: '800' },
  warningBox: { flexDirection: 'row', gap: 10, backgroundColor: '#FEF2F2', borderRadius: 12, padding: 14, marginTop: 16, alignItems: 'flex-start' },
  warningText: { flex: 1, color: '#DC2626', fontSize: 13, fontWeight: '600' },
  tips: { margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 20 },
  tipsTitle: { fontSize: 16, fontWeight: '800', color: '#1E293B', marginBottom: 12 },
  tipItem: { fontSize: 14, color: '#475569', fontWeight: '600', marginBottom: 8 },
});
