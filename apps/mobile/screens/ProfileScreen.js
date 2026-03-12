/**
 * ProfileScreen — Sumbandila V3
 * Shows app info, language settings, legal contacts, and version.
 */
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Shield, Globe, Phone, ExternalLink } from 'lucide-react-native';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'zu', name: 'isiZulu' },
  { code: 'af', name: 'Afrikaans' },
  { code: 'nso', name: 'Sepedi' },
  { code: 'ts', name: 'Xitsonga' },
];

const CONTACTS = [
  { name: 'DHET Helpline', detail: '0800 872 222', type: 'phone' },
  { name: 'LPC Gauteng', detail: '012 338 5800', type: 'phone' },
  { name: 'HPCSA', detail: '012 338 9300', type: 'phone' },
  { name: 'SAPS Crime Stop', detail: '08600 10111', type: 'phone' },
  { name: 'SAQA Verify', detail: 'https://www.saqa.org.za', type: 'url' },
  { name: 'LPC Verify', detail: 'https://lpc.org.za', type: 'url' },
];

export default function ProfileScreen() {
  const [activeLang, setActiveLang] = useState('en');

  const open = (contact) => {
    if (contact.type === 'phone') {
      Linking.openURL(`tel:${contact.detail.replace(/\s/g, '')}`);
    } else {
      Linking.openURL(contact.detail);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient colors={['#0056b3', '#002b5c']} style={styles.header}>
        <Shield size={36} color="white" />
        <Text style={styles.headerTitle}>Sumbandila V3</Text>
        <Text style={styles.headerSub}>AI Verification Platform</Text>
        <View style={styles.versionBadge}>
          <Text style={styles.versionText}>v3.0.0 — Expo Go Build</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Language */}
        <Text style={styles.sectionTitle}>Preferred Language</Text>
        <View style={styles.langGrid}>
          {LANGUAGES.map(l => (
            <TouchableOpacity
              key={l.code}
              style={[styles.langBtn, activeLang === l.code && styles.langBtnActive]}
              onPress={() => setActiveLang(l.code)}
            >
              <Text style={[styles.langText, activeLang === l.code && styles.langTextActive]}>
                {l.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Official Contacts */}
        <Text style={styles.sectionTitle}>Official Verification Contacts</Text>
        {CONTACTS.map(c => (
          <TouchableOpacity key={c.name} style={styles.contactRow} onPress={() => open(c)}>
            <View style={styles.contactIcon}>
              {c.type === 'phone' ? <Phone size={16} color="#0056b3" /> : <Globe size={16} color="#0056b3" />}
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{c.name}</Text>
              <Text style={styles.contactDetail}>{c.detail}</Text>
            </View>
            <ExternalLink size={14} color="#94A3B8" />
          </TouchableOpacity>
        ))}

        {/* About */}
        <View style={styles.aboutBox}>
          <Text style={styles.aboutTitle}>About Sumbandila</Text>
          <Text style={styles.aboutText}>
            Sumbandila is a national verification platform that helps South Africans instantly verify
            colleges, doctors, lawyers, and other professionals before paying fees or making important decisions.{'\n\n'}
            Built on sovereign intelligence — powered by DHET, HPCSA, LPC, and SAQA data.
          </Text>
        </View>

        <Text style={styles.footer}>© 2026 Sumbandila Registry Sentinel · All rights reserved</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { padding: 40, paddingTop: 64, alignItems: 'center', gap: 8 },
  headerTitle: { color: 'white', fontSize: 28, fontWeight: '900', marginTop: 10 },
  headerSub: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },
  versionBadge: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 6, marginTop: 10 },
  versionText: { color: 'white', fontSize: 12, fontWeight: '700' },
  content: { padding: 20 },
  sectionTitle: { fontSize: 13, fontWeight: '800', color: '#64748B', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, marginTop: 20 },
  langGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  langBtn: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, backgroundColor: 'white', borderWidth: 1, borderColor: '#E2E8F0' },
  langBtnActive: { backgroundColor: '#0056b3', borderColor: '#0056b3' },
  langText: { fontSize: 13, fontWeight: '700', color: '#475569' },
  langTextActive: { color: 'white' },
  contactRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 14, padding: 16, marginBottom: 10, elevation: 1, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4 },
  contactIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  contactInfo: { flex: 1 },
  contactName: { fontSize: 14, fontWeight: '700', color: '#1E293B' },
  contactDetail: { fontSize: 12, color: '#64748B', fontWeight: '600', marginTop: 2 },
  aboutBox: { backgroundColor: 'white', borderRadius: 16, padding: 20, marginTop: 8 },
  aboutTitle: { fontSize: 15, fontWeight: '800', color: '#1E293B', marginBottom: 10 },
  aboutText: { fontSize: 13, color: '#475569', lineHeight: 22 },
  footer: { textAlign: 'center', color: '#94A3B8', fontSize: 11, marginTop: 24, marginBottom: 40 },
});
