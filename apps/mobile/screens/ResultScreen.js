/**
 * ResultScreen — Sumbandila V3
 * Displays the full verification result with Trust Score, risk level, and fraud signals.
 * Receives `data` via navigation route params from VerifyScreen.
 */
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Share } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckCircle, AlertTriangle, XCircle, Shield, Share2, Flag } from 'lucide-react-native';

function TrustScoreMeter({ score }) {
  const color = score >= 90 ? '#15803D' : score >= 70 ? '#D97706' : score >= 40 ? '#DC2626' : '#7F1D1D';
  const label = score >= 90 ? 'Highly Trusted' : score >= 70 ? 'Likely Legitimate' : score >= 40 ? 'Suspicious' : 'High Risk';
  return (
    <View style={styles.trustMeter}>
      <Text style={styles.trustTitle}>V3 Trust Score</Text>
      <Text style={[styles.trustScore, { color }]}>{score}%</Text>
      <View style={styles.trustBar}>
        <View style={[styles.trustFill, { width: `${score}%`, backgroundColor: color }]} />
      </View>
      <Text style={[styles.trustLabel, { color }]}>{label}</Text>
    </View>
  );
}

function StatusIcon({ risk }) {
  const icons = {
    Low: { Icon: CheckCircle, color: '#15803D' },
    Medium: { Icon: AlertTriangle, color: '#D97706' },
    High: { Icon: AlertTriangle, color: '#DC2626' },
    Critical: { Icon: XCircle, color: '#7F1D1D' },
  };
  const { Icon, color } = icons[risk] || icons.High;
  return <Icon size={28} color={color} />;
}

export default function ResultScreen({ route, navigation }) {
  const { data } = route.params || { data: {} };

  // Derive trust score from fraud_score (inverted and scaled)
  const fraudScore = data.fraud_score ?? null;
  const trustScore = fraudScore !== null ? Math.round((1 - fraudScore) * 100) : data.trust_score ?? 85;

  const shareResult = async () => {
    await Share.share({
      message: `🛡️ Sumbandila Verification\n\n${data.name || 'Unknown'}\nStatus: ${data.status || 'Unknown'}\nAuthority: ${data.authority || 'Unknown'}\nTrust Score: ${trustScore}%\n\nVerified via Sumbandila — Africa's Digital Trust Platform`,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={data.risk === 'Critical' || data.risk === 'High' ? ['#7F1D1D', '#991B1B'] : ['#0056b3', '#003d80']}
        style={styles.header}
      >
        <StatusIcon risk={data.risk || 'Low'} />
        <Text style={styles.entityName}>{data.name || 'Unknown Entity'}</Text>
        <Text style={styles.entityType}>{data.type || data.profession || 'Registry Search'}</Text>
      </LinearGradient>

      <View style={styles.content}>
        {/* Trust Score */}
        <TrustScoreMeter score={trustScore} />

        {/* Status Label */}
        {data.status_label && (
          <View style={styles.statusBox}>
            <Text style={styles.statusText}>{data.status_label}</Text>
          </View>
        )}

        {/* Detail Grid */}
        <View style={styles.grid}>
          {[
            { label: 'STATUS', value: data.status },
            { label: 'AUTHORITY', value: data.authority },
            { label: 'REG NUMBER', value: data.registration_number },
            { label: 'PROVINCE', value: data.province },
            { label: 'SPECIALISATION', value: data.specialisation },
            { label: 'FFC STATUS', value: data.fidelity_fund_status },
            { label: 'HPCSA REG', value: data.hpcsa_number },
            { label: 'LPC REG', value: data.lpc_number },
            { label: 'NQF LEVEL', value: data.nqf_level },
            { label: 'SAQA ID', value: data.saqa_id },
          ]
            .filter(item => item.value)
            .map(item => (
              <View key={item.label} style={styles.gridItem}>
                <Text style={styles.gridLabel}>{item.label}</Text>
                <Text style={styles.gridValue}>{item.value}</Text>
              </View>
            ))}
        </View>

        {/* Fraud signals */}
        {data.signals_triggered?.length > 0 && (
          <View style={styles.signalsBox}>
            <Text style={styles.signalsTitle}>⚠️ Risk Signals Detected</Text>
            {data.signals_triggered.map(s => (
              <Text key={s} style={styles.signalItem}>• {s}</Text>
            ))}
          </View>
        )}

        {/* Warning */}
        {data.warning && (
          <View style={styles.warningBox}>
            <AlertTriangle size={16} color="#DC2626" />
            <Text style={styles.warningText}>{data.warning}</Text>
          </View>
        )}

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.shareBtn} onPress={shareResult}>
            <Share2 size={18} color="#0056b3" />
            <Text style={styles.shareBtnText}>Share Result</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reportBtn} onPress={() => navigation.navigate('Report')}>
            <Flag size={18} color="#DC2626" />
            <Text style={styles.reportBtnText}>Report Fraud</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>← Search Again</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { padding: 40, paddingTop: 64, alignItems: 'center', gap: 12 },
  entityName: { color: 'white', fontSize: 24, fontWeight: '900', textAlign: 'center', marginTop: 8 },
  entityType: { color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: '600' },
  content: { padding: 20 },
  trustMeter: { backgroundColor: 'white', borderRadius: 20, padding: 24, marginBottom: 16, elevation: 3, shadowColor: '#0056b3', shadowOpacity: 0.1, shadowRadius: 10, alignItems: 'center' },
  trustTitle: { fontSize: 12, fontWeight: '800', color: '#64748B', textTransform: 'uppercase', letterSpacing: 1 },
  trustScore: { fontSize: 56, fontWeight: '900', marginVertical: 8 },
  trustBar: { width: '100%', height: 8, backgroundColor: '#E2E8F0', borderRadius: 4, overflow: 'hidden' },
  trustFill: { height: '100%', borderRadius: 4 },
  trustLabel: { fontSize: 14, fontWeight: '700', marginTop: 8 },
  statusBox: { backgroundColor: '#F0F7FF', borderRadius: 14, padding: 16, marginBottom: 16 },
  statusText: { fontSize: 15, fontWeight: '700', color: '#0056b3', textAlign: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 },
  gridItem: { backgroundColor: 'white', borderRadius: 12, padding: 14, minWidth: '47%', elevation: 1 },
  gridLabel: { fontSize: 10, fontWeight: '800', color: '#94A3B8', letterSpacing: 1 },
  gridValue: { fontSize: 13, fontWeight: '700', color: '#1E293B', marginTop: 4 },
  signalsBox: { backgroundColor: '#FEF3C7', borderRadius: 14, padding: 16, marginBottom: 16 },
  signalsTitle: { fontSize: 14, fontWeight: '800', color: '#92400E', marginBottom: 8 },
  signalItem: { fontSize: 13, color: '#92400E', fontWeight: '600', marginBottom: 4 },
  warningBox: { flexDirection: 'row', gap: 10, backgroundColor: '#FEF2F2', borderRadius: 14, padding: 14, marginBottom: 16, alignItems: 'flex-start' },
  warningText: { flex: 1, color: '#DC2626', fontSize: 13, fontWeight: '600' },
  actions: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  shareBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#EFF6FF', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#BFDBFE' },
  shareBtnText: { color: '#0056b3', fontWeight: '700' },
  reportBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#FEF2F2', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#FECACA' },
  reportBtnText: { color: '#DC2626', fontWeight: '700' },
  backBtn: { padding: 16, alignItems: 'center', marginBottom: 40 },
  backBtnText: { color: '#64748B', fontWeight: '700', fontSize: 15 },
});
