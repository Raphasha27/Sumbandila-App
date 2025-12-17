import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Platform, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, FontAwesome5, FontAwesome, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

// Mock database
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
    },
    {
      name: "Attorney Nomsa Dlamini",
      regNumber: "ATT67890",
      status: "Registered",
      specialty: "Commercial Law",
      council: "Law Society of South Africa",
      validUntil: "2027-02-28"
    }
  ]
};

const categories = [
  { id: 'education', name: 'Education', iconFamily: FontAwesome5, iconName: 'graduation-cap', colors: ['#3b82f6', '#2563eb'], description: 'Schools, Colleges & Courses' },
  { id: 'medical', name: 'Medical', iconFamily: FontAwesome5, iconName: 'stethoscope', colors: ['#22c55e', '#16a34a'], description: 'Doctors & Healthcare Professionals' },
  { id: 'legal', name: 'Legal', iconFamily: MaterialCommunityIcons, iconName: 'scale-balance', colors: ['#a855f7', '#9333ea'], description: 'Lawyers & Legal Professionals' }
];

export default function HomeScreen({ navigation }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim() || !activeCategory) return;

    setIsSearching(true);
    setTimeout(() => {
      const results = mockDatabase[activeCategory].filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.regNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results.length > 0 ? results[0] : 'not_found');
      setIsSearching(false);
    }, 800);
  };

  const ResultCard = ({ result }) => {
    if (result === 'not_found') {
      return (
        <View style={[styles.card, styles.notFoundCard]}>
          <View style={styles.cardHeader}>
            <Feather name="x-circle" size={32} color="#ef4444" />
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
          <Feather name="check-circle" size={32} color="#22c55e" />
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

        <View style={styles.warningBox}>
          <Feather name="alert-circle" size={20} color="#1e40af" style={{ marginTop: 2 }} />
          <Text style={styles.warningText}>
            Always verify credentials directly with the institution or professional before making important decisions.
          </Text>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient colors={['#fff7ed', '#ffffff', '#f0fdf4']} style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <LinearGradient colors={['#ea580c', '#16a34a']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.header}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <View style={styles.headerTop}>
              <View style={styles.titleRow}>
                <Feather name="shield" size={32} color="white" />
                <Text style={styles.headerTitle}>Sumbandila</Text>
              </View>
              <View style={styles.headerActions}>
                <TouchableOpacity onPress={() => navigation.navigate('AIAssistant')} style={styles.iconButton}>
                  <Ionicons name="sparkles" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Contact')} style={styles.iconButton}>
                  <Ionicons name="call-outline" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Scanner')} style={styles.iconButton}>
                  <Ionicons name="qr-code-outline" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.iconButton}>
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
            <Text style={styles.sectionTitle}>What would you like to verify?</Text>
            <Text style={styles.sectionSubtitle}>Select a category to begin verification</Text>

            <View style={styles.grid}>
              {categories.map(cat => {
                const IconFamily = cat.iconFamily;
                return (
                  <TouchableOpacity
                    key={cat.id}
                    onPress={() => setActiveCategory(cat.id)}
                    style={styles.categoryCardWrapper}
                    activeOpacity={0.9}
                  >
                    <LinearGradient
                      colors={cat.colors}
                      style={styles.categoryCard}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <IconFamily name={cat.iconName} size={48} color="white" style={{ marginBottom: 16 }} />
                      <Text style={styles.categoryName}>{cat.name}</Text>
                      <Text style={styles.categoryDescription}>{cat.description}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Stats Section */}
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <FontAwesome name="building" size={32} color="#2563eb" style={styles.statIcon} />
                <Text style={styles.statValue}>2,450+</Text>
                <Text style={styles.statLabel}>Registered Institutions</Text>
              </View>
              <View style={styles.statCard}>
                <Feather name="users" size={32} color="#16a34a" style={styles.statIcon} />
                <Text style={styles.statValue}>45,000+</Text>
                <Text style={styles.statLabel}>Verified Professionals</Text>
              </View>
              <View style={styles.statCard}>
                <Feather name="shield" size={32} color="#ea580c" style={styles.statIcon} />
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
              <Feather name="arrow-left" size={20} color="#4b5563" />
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
                  placeholderTextColor="#9ca3af"
                  onSubmitEditing={handleSearch}
                />
                <Feather name="search" size={24} color="#9ca3af" style={styles.searchIcon} />
              </View>

              <TouchableOpacity
                onPress={handleSearch}
                disabled={!searchQuery.trim() || isSearching}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={searchQuery.trim() && !isSearching ? ['#ea580c', '#16a34a'] : ['#e5e7eb', '#e5e7eb']}
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    paddingBottom: 24,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContent: { paddingBottom: 10 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerActions: { flexDirection: 'row', gap: 16 },
  iconButton: { padding: 4 },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: 'white', marginLeft: 12 },
  headerSubtitle: { color: '#ffedd5', fontSize: 16 },

  scrollContent: { padding: 24, paddingBottom: 40 },

  sectionTitle: { fontSize: 24, fontWeight: 'bold', color: '#1f2937', marginBottom: 8 },
  sectionSubtitle: { color: '#4b5563', marginBottom: 32, fontSize: 16 },

  grid: { gap: 24 },
  categoryCardWrapper: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  categoryCard: {
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
  },
  categoryName: { fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 8 },
  categoryDescription: { color: 'rgba(255,255,255,0.9)', fontSize: 14, textAlign: 'center' },

  statsContainer: { marginTop: 48, gap: 16 },
  statCard: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: { marginBottom: 8 },
  statValue: { fontSize: 30, fontWeight: 'bold', color: '#1f2937' },
  statLabel: { color: '#4b5563', fontSize: 14 },

  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  backButtonText: { color: '#4b5563', marginLeft: 8, fontSize: 16, fontWeight: '500' },

  searchContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  searchHeader: { fontSize: 24, fontWeight: 'bold', color: '#1f2937', marginBottom: 16 },
  inputWrapper: { position: 'relative', marginBottom: 16 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 50,
    fontSize: 16,
    color: '#1f2937',
  },
  searchIcon: { position: 'absolute', right: 16, top: 16 },
  searchButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  searchButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  disabledButton: { opacity: 1 },
  disabledButtonText: { color: '#9ca3af' },

  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  notFoundCard: { borderColor: '#fecaca' },
  successCard: { borderColor: '#bbf7d0' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#1f2937', marginLeft: 12 },
  cardSubtitle: { fontSize: 14, color: '#6b7280', marginLeft: 12 },
  cardText: { color: '#4b5563', fontSize: 16 },

  cardBody: { gap: 16 },
  row: { flexDirection: 'row', gap: 16 },
  fieldGroup: { marginBottom: 8 },
  label: { fontSize: 14, color: '#6b7280', marginBottom: 4 },
  value: { fontSize: 18, fontWeight: '600', color: '#1f2937' },

  badge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  badgeText: { color: '#15803d', fontWeight: 'btold', fontSize: 14 },

  tagContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 },
  tag: { backgroundColor: '#eff6ff', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 100 },
  tagText: { color: '#1d4ed8', fontSize: 14 },

  warningBox: {
    marginTop: 24,
    backgroundColor: '#eff6ff',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 12,
  },
  warningText: { color: '#1e40af', fontSize: 14, flex: 1, lineHeight: 20 },

  sampleSearches: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sampleTitle: { fontSize: 16, fontWeight: 'bold', color: '#1f2937', marginBottom: 12 },
  sampleList: { gap: 8 },
  sampleItem: { paddingVertical: 12, paddingHorizontal: 16, backgroundColor: '#f9fafb', borderRadius: 8 },
  sampleText: { color: '#374151', fontSize: 16 },

  reportButton: { marginTop: 16, padding: 12, borderWidth: 1, borderColor: '#ef4444', borderRadius: 8, alignItems: 'center' },
  reportButtonText: { color: '#ef4444', fontWeight: 'bold' },
});
