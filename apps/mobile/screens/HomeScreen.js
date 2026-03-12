/**
 * HomeScreen — Sumbandila V3
 * Landing dashboard showing quick actions and stats.
 */
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Shield, Search, Flag, CheckCircle, AlertTriangle } from 'lucide-react-native';

const QUICK_ACTIONS = [
  { label: 'Verify College', icon: Shield, screen: 'Verify', color: '#0056b3' },
  { label: 'Verify Doctor', icon: CheckCircle, screen: 'Verify', color: '#059669' },
  { label: 'Verify Lawyer', icon: CheckCircle, screen: 'Verify', color: '#7C3AED' },
  { label: 'Report Fraud', icon: Flag, screen: 'Report', color: '#DC2626' },
];

const STATS = [
  { label: 'Institutions Verified', value: '12,400+' },
  { label: 'Professionals Listed', value: '8,200+' },
  { label: 'Fraud Alerts', value: '340+' },
  { label: 'Provinces Covered', value: '9 / 9' },
];

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero */}
      <LinearGradient colors={['#0056b3', '#002b5c']} style={styles.hero}>
        <Shield size={40} color="white" />
        <Text style={styles.heroTitle}>Sumbandila</Text>
        <Text style={styles.heroTagline}>Digital trust for education, healthcare{'\n'}and professional services.</Text>
        <TouchableOpacity
          style={styles.heroBtn}
          onPress={() => navigation.navigate('Verify')}
        >
          <Search size={18} color="#0056b3" />
          <Text style={styles.heroBtnText}>Verify Now</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Stats */}
      <View style={styles.statsGrid}>
        {STATS.map(s => (
          <View key={s.label} style={styles.statCard}>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        {QUICK_ACTIONS.map(a => {
          const Icon = a.icon;
          return (
            <TouchableOpacity
              key={a.label}
              style={[styles.actionCard, { borderTopColor: a.color }]}
              onPress={() => navigation.navigate(a.screen)}
            >
              <Icon size={24} color={a.color} />
              <Text style={styles.actionLabel}>{a.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Warning Banner */}
      <View style={styles.warningBanner}>
        <AlertTriangle size={18} color="#92400E" />
        <Text style={styles.warningText}>
          Recently deregistered: Damelin, City Varsity, Lyceum.{'\n'}
          Always verify before paying tuition fees.
        </Text>
      </View>

      {/* V3 Feature Badge */}
      <View style={styles.v3Badge}>
        <Text style={styles.v3Text}>🛡️ Sumbandila V3 — AI Verification Platform</Text>
        <Text style={styles.v3Sub}>Trust Score • Fraud Detection • 5-Language Support</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  hero: { padding: 40, paddingTop: 64, alignItems: 'center', gap: 10 },
  heroTitle: { color: 'white', fontSize: 32, fontWeight: '900', marginTop: 8 },
  heroTagline: { color: 'rgba(255,255,255,0.85)', fontSize: 14, textAlign: 'center', lineHeight: 22 },
  heroBtn: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'white', paddingHorizontal: 28, paddingVertical: 14, borderRadius: 50, marginTop: 20 },
  heroBtnText: { color: '#0056b3', fontSize: 16, fontWeight: '800' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { backgroundColor: 'white', borderRadius: 16, padding: 16, width: '47%', elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6 },
  statValue: { fontSize: 22, fontWeight: '900', color: '#0056b3' },
  statLabel: { fontSize: 11, fontWeight: '700', color: '#64748B', marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#1E293B', marginHorizontal: 16, marginBottom: 12 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 12 },
  actionCard: { backgroundColor: 'white', borderRadius: 16, padding: 18, width: '47%', borderTopWidth: 3, elevation: 2, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6 },
  actionLabel: { fontSize: 13, fontWeight: '700', color: '#1E293B', marginTop: 10 },
  warningBanner: { flexDirection: 'row', gap: 10, backgroundColor: '#FEF3C7', borderRadius: 16, margin: 16, padding: 16, alignItems: 'flex-start' },
  warningText: { flex: 1, fontSize: 13, color: '#92400E', fontWeight: '600', lineHeight: 20 },
  v3Badge: { backgroundColor: '#0056b3', margin: 16, borderRadius: 16, padding: 20, alignItems: 'center', marginBottom: 40 },
  v3Text: { color: 'white', fontSize: 14, fontWeight: '800' },
  v3Sub: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 4 },
});
