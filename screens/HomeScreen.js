import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Platform, Dimensions, Share, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, FontAwesome5, FontAwesome, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';
import VerificationHistoryService from '../services/VerificationHistoryService';

// Mock database (Move to a separate file in production)
const mockDatabase = {
  education: [
    {
      name: "Boston City Campus",
      regNumber: "2001/HE07/006",
      status: "Registered",
      accreditation: "CHE Accredited",
      courses: ["Business Management", "IT", "Marketing"],
      validUntil: "2026-12-31"
    },
    {
      name: "Damelin",
      regNumber: "1998/HE08/001",
      status: "Registered",
      accreditation: "QCTO Accredited",
      courses: ["Accounting", "IT", "Hospitality"],
      validUntil: "2027-06-30"
    }
  ],
  medical: [
    {
      name: "Dr. Thabo Mbeki",
      regNumber: "MP0123456",
      status: "Registered",
      specialty: "General Practitioner",
      council: "HPCSA",
      validUntil: "2026-03-31"
    },
    {
      name: "Dr. Sarah Johnson",
      regNumber: "MP0234567",
      status: "Registered",
      specialty: "Pediatrician",
      council: "HPCSA",
      validUntil: "2027-01-15"
    }
  ],
  legal: [
    {
      name: "Advocate John Daniels",
      regNumber: "ADV12345",
      status: "Registered",
      specialty: "Criminal Law",
      council: "General Council of the Bar",
      validUntil: "2026-08-30"
    }
  ],
  construction: [
    {
      name: "Mokoka Constructions",
      regNumber: "CIDB7788",
      status: "Verified",
      specialty: "Civil Engineering",
      council: "CIDB Grade 7PE",
      validUntil: "2027-04-12"
    }
  ],
  transport: [
    {
      name: "Jackson Zulu",
      regNumber: "TX4455",
      status: "Verified",
      specialty: "PDP Class B, C1",
      council: "SAPS Criminal Record: Clear",
      validUntil: "2026-11-20"
    }
  ],
  tenders: [
    {
      name: "AfroTech Solutions",
      regNumber: "REG9988",
      status: "Compliant",
      specialty: "IT Services",
      council: "Tax Status: Compliant",
      validUntil: "2025-12-31"
    }
  ],
  panafrican: [
    {
      name: "University of Nairobi",
      regNumber: "UON-KE-01",
      status: "Verified",
      specialty: "Public University (Kenya)",
      council: "CUE Accredited",
      validUntil: "2028-01-01"
    }
  ]
};

const categories = [
  { id: 'education', name: 'Education', iconFamily: FontAwesome5, iconName: 'graduation-cap', colorKey: 'info', description: 'Schools, Colleges & Courses' },
  { id: 'medical', name: 'Medical', iconFamily: FontAwesome5, iconName: 'stethoscope', colorKey: 'success', description: 'Doctors & Healthcare Professionals' },
  { id: 'legal', name: 'Legal', iconFamily: MaterialCommunityIcons, iconName: 'scale-balance', colorKey: 'secondary', description: 'Lawyers & Legal Professionals' },
  { id: 'wallet', name: 'IdentityPass', iconFamily: Ionicons, iconName: 'wallet-outline', colorKey: 'primary', description: 'Your Verified Identity' },
  // { id: 'construction', name: 'BuildSafe', iconFamily: FontAwesome5, iconName: 'hammer', colorKey: 'warning', description: 'Contractors & Engineers' },
  // { id: 'transport', name: 'RideCheck', iconFamily: FontAwesome5, iconName: 'car', colorKey: 'error', description: 'Taxi, Uber & Bolt Drivers' },
  // { id: 'tenders', name: 'TenderShield', iconFamily: MaterialCommunityIcons, iconName: 'file-certificate', colorKey: 'info', description: 'Company & Tax Compliance' },
  // { id: 'panafrican', name: 'African Network', iconFamily: FontAwesome5, iconName: 'globe-africa', colorKey: 'success', description: 'Cross-border Verification' },
  // { id: 'b2b', name: 'TrustAfrica B2B', iconFamily: MaterialCommunityIcons, iconName: 'office-building', colorKey: 'secondary', description: 'Enterprise Verification API' }
];

export default function HomeScreen({ navigation, route }) {
  const { theme, isDarkMode } = useTheme();
  const { user } = route.params || {};
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Generate styles based on current theme
  const styles = createStyles(theme);

  const handleSearch = async () => {
    if (!searchQuery.trim() || !activeCategory) return;

    setIsSearching(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const results = mockDatabase[activeCategory].filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.regNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const resultData = results.length > 0 ? results[0] : null;
    const isVerified = !!resultData;

    setSearchResults(isVerified ? resultData : 'not_found');
    setIsSearching(false);

    // Save to history
    await VerificationHistoryService.addToHistory({
      query: searchQuery,
      category: activeCategory,
      result: resultData,
      isVerified: isVerified
    });
  };

  const handleShare = async (result) => {
    try {
      await Share.share({
        message: `I just verified ${result.name} on Sumbandila! ✅\nStatus: ${result.status}\nReg No: ${result.regNumber}\n\nVerify yours at sumbandila.co.za`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const ResultCard = ({ result }) => {
    if (result === 'not_found') {
      return (
        <View style={[styles.card, styles.notFoundCard]}>
          <View style={styles.cardHeader}>
            <Feather name="x-circle" size={32} color={theme.colors.error} />
            <Text style={styles.cardTitle}>Not Found</Text>
          </View>
          <Text style={styles.cardText}>No matching records found. Please verify the name or registration number.</Text>

          <TouchableOpacity
            style={styles.reportButton}
            onPress={() => navigation.navigate('ReportFraud', { entityName: searchQuery })}
          >
            <Text style={styles.reportButtonText}>Report as Fraud / Incorrect</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={[styles.card, styles.successCard]}>
        <View style={styles.cardHeader}>
          <Feather name="check-circle" size={32} color={theme.colors.success} />
          <View>
            <Text style={styles.cardTitle}>Verified & Registered</Text>
            <Text style={styles.cardSubtitle}>Valid registration confirmed</Text>
          </View>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{result.name}</Text>
          </View>

          <View style={styles.row}>
            <View style={[styles.fieldGroup, { flex: 1 }]}>
              <Text style={styles.label}>Registration Number</Text>
              <Text style={styles.value}>{result.regNumber}</Text>
            </View>
            <View style={[styles.fieldGroup, { flex: 1 }]}>
              <Text style={styles.label}>Status</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{result.status}</Text>
              </View>
            </View>
          </View>

          {result.specialty && (
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Specialty</Text>
              <Text style={styles.value}>{result.specialty}</Text>
            </View>
          )}

          {result.accreditation && (
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Accreditation</Text>
              <Text style={styles.value}>{result.accreditation}</Text>
            </View>
          )}

          {result.courses && (
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Accredited Courses</Text>
              <View style={styles.tagContainer}>
                {result.courses.map((course, idx) => (
                  <View key={idx} style={styles.tag}>
                    <Text style={styles.tagText}>{course}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {result.council && (
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Registered With</Text>
              <Text style={styles.value}>{result.council}</Text>
            </View>
          )}

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Valid Until</Text>
            <Text style={styles.value}>{result.validUntil}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => handleShare(result)}
        >
          <Feather name="share-2" size={18} color="white" />
          <Text style={styles.shareButtonText}>Share Verification</Text>
        </TouchableOpacity>

        <View style={styles.warningBox}>
          <Feather name="alert-circle" size={20} color={theme.colors.info} style={{ marginTop: 2 }} />
          <Text style={styles.warningText}>
            Always verify credentials directly with the institution or professional before making important decisions.
          </Text>
        </View>
      </View>
    );
  };

  const SafetyAlert = () => (
    <View style={styles.alertContainer}>
      <LinearGradient
        colors={['rgba(249, 115, 22, 0.1)', 'rgba(249, 115, 22, 0.05)']}
        style={styles.alertGradient}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
      >
        <View style={styles.alertHeader}>
          <View style={styles.alertBadge}>
            <Feather name="alert-triangle" size={14} color="#EA580C" />
            <Text style={styles.alertBadgeText}>SCAM ALERT</Text>
          </View>
          <Text style={styles.alertDate}>Just now</Text>
        </View>
        <Text style={styles.alertTitle}>Fake "Free Laptop" Registration</Text>
        <Text style={styles.alertBody}>
          Scammers are posing as NSFAS officials offering free laptops. Do not pay any "delivery fees". Official communication comes only from nsfas.org.za.
        </Text>
      </LinearGradient>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      {/* Header */}
      <LinearGradient
        colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <SafeAreaView>
          <View style={styles.headerContent}>
            <View style={styles.headerTop}>
              <View style={styles.titleRow}>
                <Feather name="shield" size={32} color="white" />
                <View>
                  <Text style={[styles.headerTitle, { marginBottom: 0 }]}>{user && user.role !== 'guest' && user.name ? `Hi, ${user.name}` : 'Sumbandila'}</Text>
                  {user && user.role !== 'guest' && <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, marginLeft: 12 }}>Student ID: {user.studentNo || '21800432'}</Text>}
                </View>
              </View>
              <View style={styles.headerActions}>
                <TouchableOpacity onPress={() => navigation.navigate('Scanner')} style={styles.iconButton}>
                  <Ionicons name="qr-code-outline" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Profile', { user })} style={styles.iconButton}>
                  <Feather name="user" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.headerSubtitle}>Verification in the palm of your hand</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {!activeCategory ? (
          /* Category Selection */
          <View>
            <SafetyAlert />
            <Text style={styles.sectionTitle}>What would you like to verify?</Text>
            <Text style={styles.sectionSubtitle}>Select a category to begin verification</Text>

            <View style={styles.grid}>
              {categories.map(cat => {
                const IconFamily = cat.iconFamily;
                // Use theme colors but keep brand identity
                const cardColors = isDarkMode
                  ? [theme.colors.surfaceElevated, theme.colors.surface]
                  : (cat.colorKey === 'info' ? ['#3b82f6', '#2563eb'] : cat.colorKey === 'success' ? ['#22c55e', '#16a34a'] : ['#a855f7', '#9333ea']);

                return (
                  <TouchableOpacity
                    key={cat.id}
                    onPress={() => {
                      if (cat.id === 'wallet') {
                        navigation.navigate('IdentityWallet');
                      } else if (cat.id === 'b2b') {
                        navigation.navigate('TrustAfrica');
                      } else {
                        setActiveCategory(cat.id);
                      }
                    }}
                    style={styles.categoryCardWrapper}
                    activeOpacity={0.9}
                  >
                    <LinearGradient
                      colors={cardColors}
                      style={styles.categoryCard}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <IconFamily
                        name={cat.iconName}
                        size={48}
                        color={isDarkMode ? theme.colors[cat.colorKey] : "white"}
                        style={{ marginBottom: 16 }}
                      />
                      <Text style={[styles.categoryName, isDarkMode && { color: theme.colors.text }]}>
                        {cat.name}
                      </Text>
                      <Text style={[styles.categoryDescription, isDarkMode && { color: theme.colors.textSecondary }]}>
                        {cat.description}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Stats Section */}
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <FontAwesome name="building" size={32} color={theme.colors.info} style={styles.statIcon} />
                <Text style={styles.statValue}>2,450+</Text>
                <Text style={styles.statLabel}>Registered Institutions</Text>
              </View>
              <View style={styles.statCard}>
                <Feather name="users" size={32} color={theme.colors.success} style={styles.statIcon} />
                <Text style={styles.statValue}>45,000+</Text>
                <Text style={styles.statLabel}>Verified Professionals</Text>
              </View>
              <View style={styles.statCard}>
                <Feather name="shield" size={32} color={theme.colors.primary} style={styles.statIcon} />
                <Text style={styles.statValue}>100%</Text>
                <Text style={styles.statLabel}>Official Data Sources</Text>
              </View>
            </View>
          </View>
        ) : (
          /* Search Interface */
          <View>
            <TouchableOpacity
              onPress={() => {
                setActiveCategory(null);
                setSearchQuery('');
                setSearchResults(null);
              }}
              style={styles.backButton}
            >
              <Feather name="arrow-left" size={20} color={theme.colors.textSecondary} />
              <Text style={styles.backButtonText}>Back to Categories</Text>
            </TouchableOpacity>

            <View style={styles.searchContainer}>
              <Text style={styles.searchHeader}>
                {categories.find(c => c.id === activeCategory)?.name} Verification
              </Text>

              <View style={styles.inputWrapper}>
                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Enter name or registration number..."
                  style={styles.input}
                  placeholderTextColor={theme.colors.textMuted}
                  onSubmitEditing={handleSearch}
                />
                <Feather name="search" size={24} color={theme.colors.textMuted} style={styles.searchIcon} />
              </View>

              <TouchableOpacity
                onPress={handleSearch}
                disabled={!searchQuery.trim() || isSearching}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={searchQuery.trim() && !isSearching
                    ? [theme.colors.gradientStart, theme.colors.gradientEnd]
                    : [theme.colors.border, theme.colors.border]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.searchButton, (!searchQuery.trim() || isSearching) && styles.disabledButton]}
                >
                  <Text style={[styles.searchButtonText, (!searchQuery.trim() || isSearching) && styles.disabledButtonText]}>
                    {isSearching ? 'Searching...' : 'Verify Now'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Search Results */}
            {searchResults && <ResultCard result={searchResults} />}

            {/* Sample searches */}
            {!searchResults && (
              <View style={styles.sampleSearches}>
                <Text style={styles.sampleTitle}>Try these sample searches:</Text>
                <View style={styles.sampleList}>
                  {activeCategory === 'education' && (
                    <>
                      <TouchableOpacity onPress={() => { setSearchQuery('Boston City Campus'); handleSearch(); }} style={styles.sampleItem}>
                        <Text style={styles.sampleText}>Boston City Campus</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => { setSearchQuery('Damelin'); handleSearch(); }} style={styles.sampleItem}>
                        <Text style={styles.sampleText}>Damelin</Text>
                      </TouchableOpacity>
                    </>
                  )}
                  {activeCategory === 'medical' && (
                    <>
                      <TouchableOpacity onPress={() => { setSearchQuery('Dr. Thabo Mbeki'); handleSearch(); }} style={styles.sampleItem}>
                        <Text style={styles.sampleText}>Dr. Thabo Mbeki</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => { setSearchQuery('MP0234567'); handleSearch(); }} style={styles.sampleItem}>
                        <Text style={styles.sampleText}>MP0234567</Text>
                      </TouchableOpacity>
                    </>
                  )}
                  {activeCategory === 'legal' && (
                    <>
                      <TouchableOpacity onPress={() => { setSearchQuery('Advocate John Daniels'); handleSearch(); }} style={styles.sampleItem}>
                        <Text style={styles.sampleText}>Advocate John Daniels</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => { setSearchQuery('Attorney Nomsa Dlamini'); handleSearch(); }} style={styles.sampleItem}>
                        <Text style={styles.sampleText}>Attorney Nomsa Dlamini</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* AI Assistant FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Chat', { user })}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={[theme.colors.secondary, theme.colors.primary]}
          style={styles.fabGradient}
        >
          <MaterialCommunityIcons name="robot" size={28} color="white" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  header: {
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    paddingBottom: 24,
    paddingHorizontal: 24,
    ...theme.shadows.default,
  },
  headerContent: { paddingBottom: 10 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerActions: { flexDirection: 'row', gap: 16 },
  iconButton: { padding: 4 },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: 'white', marginLeft: 12 },
  headerSubtitle: { color: 'rgba(255,255,255,0.9)', fontSize: 16 },

  scrollContent: { padding: 24, paddingBottom: 40 },

  sectionTitle: { fontSize: 24, fontWeight: 'bold', color: theme.colors.text, marginBottom: 8 },
  sectionSubtitle: { color: theme.colors.textSecondary, marginBottom: 32, fontSize: 16 },

  grid: { gap: 24 },
  categoryCardWrapper: {
    borderRadius: 16,
    ...theme.shadows.default,
  },
  categoryCard: {
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: theme.mode === 'dark' ? 1 : 0,
    borderColor: theme.colors.border,
  },
  categoryName: { fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 8 },
  categoryDescription: { color: 'rgba(255,255,255,0.9)', fontSize: 14, textAlign: 'center' },

  statsContainer: { marginTop: 48, gap: 16 },
  statCard: {
    backgroundColor: theme.colors.surface,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    ...theme.shadows.default,
    borderWidth: theme.mode === 'dark' ? 1 : 0,
    borderColor: theme.colors.border,
  },
  statIcon: { marginBottom: 8 },
  statValue: { fontSize: 30, fontWeight: 'bold', color: theme.colors.text },
  statLabel: { color: theme.colors.textSecondary, fontSize: 14 },

  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  backButtonText: { color: theme.colors.textSecondary, marginLeft: 8, fontSize: 16, fontWeight: '500' },

  searchContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    ...theme.shadows.default,
    borderWidth: theme.mode === 'dark' ? 1 : 0,
    borderColor: theme.colors.border,
  },
  searchHeader: { fontSize: 24, fontWeight: 'bold', color: theme.colors.text, marginBottom: 16 },
  inputWrapper: { position: 'relative', marginBottom: 16 },
  input: {
    backgroundColor: theme.colors.background,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderRadius: 12,
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 50,
    fontSize: 16,
    color: theme.colors.text,
  },
  searchIcon: { position: 'absolute', right: 16, top: 16 },
  searchButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  searchButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  disabledButton: { opacity: 1 },
  disabledButtonText: { color: theme.colors.textMuted },

  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    marginBottom: 24,
    ...theme.shadows.default,
    borderColor: theme.colors.border,
  },
  notFoundCard: { borderColor: theme.colors.error },
  successCard: { borderColor: theme.colors.success },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: theme.colors.text, marginLeft: 12 },
  cardSubtitle: { fontSize: 14, color: theme.colors.textSecondary, marginLeft: 12 },
  cardText: { color: theme.colors.textSecondary, fontSize: 16 },

  cardBody: { gap: 16 },
  row: { flexDirection: 'row', gap: 16 },
  fieldGroup: { marginBottom: 8 },
  label: { fontSize: 14, color: theme.colors.textSecondary, marginBottom: 4 },
  value: { fontSize: 18, fontWeight: '600', color: theme.colors.text },

  badge: {
    backgroundColor: theme.mode === 'dark' ? 'rgba(34, 197, 94, 0.2)' : '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  badgeText: { color: theme.colors.success, fontWeight: 'bold', fontSize: 14 },

  tagContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  tag: {
    backgroundColor: theme.mode === 'dark' ? 'rgba(59, 130, 246, 0.2)' : '#eff6ff',
    paddingHorizontal: 12, paddingVertical: 4, borderRadius: 100
  },
  tagText: { color: theme.colors.info, fontSize: 14 },

  warningBox: {
    marginTop: 24,
    backgroundColor: theme.mode === 'dark' ? 'rgba(59, 130, 246, 0.2)' : '#eff6ff',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 12,
  },
  warningText: { color: theme.colors.info, fontSize: 14, flex: 1, lineHeight: 20 },

  sampleSearches: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 24,
    ...theme.shadows.default,
    borderWidth: theme.mode === 'dark' ? 1 : 0,
    borderColor: theme.colors.border,
  },
  sampleTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.text, marginBottom: 12 },
  sampleList: { gap: 8 },
  sampleItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.background,
    borderRadius: 8
  },
  sampleText: { color: theme.colors.text, fontSize: 16 },

  reportButton: { marginTop: 16, padding: 12, borderWidth: 1, borderColor: theme.colors.error, borderRadius: 8, alignItems: 'center' },
  reportButtonText: { color: theme.colors.error, fontWeight: 'bold' },

  shareButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: theme.colors.primary, padding: 12, borderRadius: 12,
    marginTop: 24, gap: 8
  },
  shareButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  alertContainer: { marginBottom: 32 },
  alertGradient: { padding: 16, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(249, 115, 22, 0.2)' },
  alertHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  alertBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(234, 88, 12, 0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  alertBadgeText: { color: '#EA580C', fontSize: 12, fontWeight: 'bold' },
  alertDate: { color: theme.colors.textSecondary, fontSize: 12 },
  alertTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.text, marginBottom: 4 },
  alertBody: { fontSize: 14, color: theme.colors.textSecondary, lineHeight: 20 },

  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    ...theme.shadows.hover,
  },
  fabGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
