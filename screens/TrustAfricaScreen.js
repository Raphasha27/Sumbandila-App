import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

const pricingPlans = [
  { name: 'Starter', price: 'R499', features: ['50 Verifications/mo', 'Email Support', 'Basic API Access'], color: ['#3b82f6', '#2563eb'] },
  { name: 'Business', price: 'R1,999', features: ['250 Verifications/mo', 'Priority Support', 'Full API + Webhooks', 'Custom Branding'], color: ['#8b5cf6', '#7c3aed'], popular: true },
  { name: 'Enterprise', price: 'Custom', features: ['Unlimited Checks', 'Dedicated Account Manager', 'SLA Guarantees', 'On-premise Deployment'], color: ['#1f2937', '#111827'] },
];

export default function TrustAfricaScreen({ navigation }) {
  const { theme, isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [apiSearch, setApiSearch] = useState('');

  const styles = createStyles(theme, isDarkMode);

  const DashboardStats = () => (
    <View style={styles.statsGrid}>
      <View style={styles.statBox}>
        <Text style={styles.statLabel}>Total Verifications</Text>
        <Text style={styles.statValue}>1,284</Text>
        <Text style={styles.statTrend}>+12% this month</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={styles.statLabel}>Active Employees</Text>
        <Text style={styles.statValue}>452</Text>
        <Text style={styles.statTrend}>98% Verified</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={styles.statLabel}>API Health</Text>
        <Text style={[styles.statValue, { color: theme.colors.success }]}>99.9%</Text>
        <Text style={styles.statTrend}>Latency: 140ms</Text>
      </View>
    </View>
  );

  const ApiKeyCard = () => (
    <View style={styles.apiCard}>
      <View style={styles.apiHeader}>
        <Text style={styles.apiTitle}>Production API Key</Text>
        <TouchableOpacity>
          <Feather name="copy" size={18} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.keyContainer}>
        <Text style={styles.apiKey}>ta_live_51MvK7SBhL9XXXXXXXXXXXXXXXXXX</Text>
      </View>
      <Text style={styles.apiNote}>Last rotated: 2 days ago</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.secondary, theme.colors.primary]}
        style={styles.header}
      >
        <SafeAreaView edges={['top']}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Feather name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitle}>TrustAfrica B2B</Text>
              <Text style={styles.headerSubtitle}>Enterprise Verification Portal</Text>
            </View>
            <TouchableOpacity style={styles.backButton}>
              <Feather name="settings" size={22} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <View style={styles.tabBar}>
        {['dashboard', 'verification', 'api', 'billing'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {activeTab === 'dashboard' && (
          <>
            <Text style={styles.sectionTitle}>Business Overview</Text>
            <DashboardStats />
            
            <Text style={styles.sectionTitle}>Recent Bulk Verifications</Text>
            <View style={styles.bulkList}>
              {[
                { name: 'Batch_March_Graduates.csv', date: '2026-03-01', status: 'Completed', count: 156 },
                { name: 'New_Hire_Vetting_Q1.csv', date: '2026-02-15', status: 'Processing', count: 42 },
              ].map((batch, i) => (
                <View key={i} style={styles.batchItem}>
                  <MaterialCommunityIcons name="file-document-outline" size={24} color={theme.colors.primary} />
                  <View style={styles.batchInfo}>
                    <Text style={styles.batchName}>{batch.name}</Text>
                    <Text style={styles.batchDate}>{batch.date} • {batch.count} records</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: batch.status === 'Completed' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(59, 130, 246, 0.1)' }]}>
                    <Text style={[styles.statusText, { color: batch.status === 'Completed' ? theme.colors.success : theme.colors.primary }]}>{batch.status}</Text>
                  </View>
                </View>
              ))}
            </View>
            
            <TouchableOpacity style={styles.uploadButton}>
              <Feather name="upload" size={20} color="white" />
              <Text style={styles.uploadButtonText}>Upload Bulk CSV for Verification</Text>
            </TouchableOpacity>
          </>
        )}

        {activeTab === 'api' && (
          <>
            <Text style={styles.sectionTitle}>Developer Settings</Text>
            <ApiKeyCard />
            
            <Text style={styles.sectionTitle}>API Endpoints</Text>
            <View style={styles.endpointCard}>
              <View style={styles.methodBadge}><Text style={styles.methodText}>GET</Text></View>
              <Text style={styles.endpointUrl}>/v1/verify/employee</Text>
            </View>
            <View style={styles.endpointCard}>
              <View style={[styles.methodBadge, { backgroundColor: theme.colors.success }]}><Text style={styles.methodText}>POST</Text></View>
              <Text style={styles.endpointUrl}>/v1/verify/bulk</Text>
            </View>
            
            <TouchableOpacity style={styles.docButton}>
              <Text style={styles.docButtonText}>View API Documentation</Text>
              <Feather name="external-link" size={16} color={theme.colors.primary} />
            </TouchableOpacity>
          </>
        )}

        {activeTab === 'billing' && (
          <>
            <Text style={styles.sectionTitle}>Subscription Plans</Text>
            {pricingPlans.map((plan, i) => (
              <View key={i} style={styles.planCard}>
                <LinearGradient colors={plan.color} style={styles.planHeader}>
                  <Text style={styles.planName}>{plan.name}</Text>
                  <Text style={styles.planPrice}>{plan.price}<Text style={styles.planPeriod}>/mo</Text></Text>
                </LinearGradient>
                <View style={styles.planBody}>
                  {plan.features.map((feature, j) => (
                    <View key={j} style={styles.featureItem}>
                      <Feather name="check" size={16} color={theme.colors.success} />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                  <TouchableOpacity style={[styles.planButton, plan.popular && { backgroundColor: theme.colors.primary }]}>
                    <Text style={[styles.planButtonText, plan.popular && { color: 'white' }]}>
                      {plan.popular ? 'Current Plan' : 'Upgrade Now'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const createStyles = (theme, isDarkMode) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: { paddingBottom: 20 },
  headerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 40 : 10 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: 'white' },
  headerSubtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 13 },
  tabBar: { flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 12, backgroundColor: theme.colors.surface, gap: 10 },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: theme.colors.background, borderWidth: 1, borderColor: theme.colors.border },
  activeTab: { backgroundColor: theme.colors.secondary, borderColor: theme.colors.secondary },
  tabText: { fontSize: 13, color: theme.colors.textSecondary, fontWeight: '500' },
  activeTabText: { color: 'white', fontWeight: 'bold' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.text, marginBottom: 16, marginTop: 10 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  statBox: { width: (width - 52) / 2, backgroundColor: theme.colors.surface, padding: 16, borderRadius: 16, ...theme.shadows.default, borderWidth: isDarkMode ? 1 : 0, borderColor: theme.colors.border },
  statLabel: { fontSize: 12, color: theme.colors.textSecondary, marginBottom: 4 },
  statValue: { fontSize: 24, fontWeight: 'bold', color: theme.colors.text },
  statTrend: { fontSize: 11, color: theme.colors.success, marginTop: 4 },
  bulkList: { gap: 12, marginBottom: 20 },
  batchItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.surface, padding: 16, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border },
  batchInfo: { flex: 1, marginLeft: 12 },
  batchName: { fontSize: 14, fontWeight: 'bold', color: theme.colors.text },
  batchDate: { fontSize: 12, color: theme.colors.textSecondary },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: 'bold' },
  uploadButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.primary, padding: 16, borderRadius: 12, gap: 10, marginTop: 10 },
  uploadButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  apiCard: { backgroundColor: theme.colors.surface, padding: 20, borderRadius: 16, ...theme.shadows.default, borderLeftWidth: 4, borderLeftColor: theme.colors.primary },
  apiHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  apiTitle: { fontSize: 15, fontWeight: 'bold', color: theme.colors.text },
  keyContainer: { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : '#f3f4f6', padding: 12, borderRadius: 8 },
  apiKey: { fontSize: 13, color: theme.colors.text, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' },
  apiNote: { fontSize: 11, color: theme.colors.textMuted, marginTop: 8 },
  endpointCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.surface, padding: 16, borderRadius: 12, marginTop: 8, gap: 12 },
  methodBadge: { backgroundColor: theme.colors.primary, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  methodText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  endpointUrl: { fontSize: 14, color: theme.colors.text, fontWeight: '500' },
  docButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20, gap: 8 },
  docButtonText: { color: theme.colors.primary, fontWeight: 'bold' },
  planCard: { backgroundColor: theme.colors.surface, borderRadius: 20, overflow: 'hidden', marginBottom: 20, ...theme.shadows.default },
  planHeader: { padding: 24, alignItems: 'center' },
  planName: { color: 'white', fontSize: 16, fontWeight: 'bold', opacity: 0.9 },
  planPrice: { color: 'white', fontSize: 32, fontWeight: 'bold', marginTop: 4 },
  planPeriod: { fontSize: 14, fontWeight: 'normal' },
  planBody: { padding: 24, gap: 16 },
  featureItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  featureText: { fontSize: 14, color: theme.colors.textSecondary },
  planButton: { paddingVertical: 14, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: theme.colors.border, marginTop: 8 },
  planButtonText: { fontWeight: 'bold', color: theme.colors.text },
});
