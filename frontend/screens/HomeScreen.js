import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { theme } from '../theme';
import GradientHeader from '../components/GradientHeader';
import CategoryCard from '../components/CategoryCard';
import StatsCard from '../components/StatsCard';

export default function HomeScreen({ navigation }) {
    
    const navigateToVerification = (category) => {
        navigation.navigate('Scanner', { category }); 
        // Note: Using 'Scanner' route for now as per App.js stack, but typically we'd rename this to 'VerificationForm'
        // The user screenshots imply a form based verification, not just scanner. 
        // I should probably rename/fix the route in a real refactor, but for UI match 'Scanner' screen will be updated to be the form.
    };

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

                <View style={styles.categoriesContainer}>
                    <CategoryCard 
                        title="Education" 
                        subtitle="Schools, Colleges & Courses" 
                        icon="school-outline" 
                        color={theme.colors.education}
                        onPress={() => navigateToVerification('education')}
                    />
                    <CategoryCard 
                        title="Medical" 
                        subtitle="Doctors & Healthcare Professionals" 
                        icon="medkit-outline" 
                        color={theme.colors.medical}
                        onPress={() => navigateToVerification('medical')}
                    />
                     <CategoryCard 
                        title="Legal" 
                        subtitle="Lawyers & Legal Professionals" 
                        icon="scale-outline" 
                        color={theme.colors.legal}
                        onPress={() => navigateToVerification('legal')}
                    />
                </View>

                <View style={styles.statsContainer}>
                    <StatsCard 
                        icon="business-outline" 
                        number="2,450+" 
                        label="Registered Institutions" 
                        iconColor="#3B82F6"
                    />
                    <StatsCard 
                        icon="people-outline" 
                        number="45,000+" 
                        label="Verified Professionals" 
                        iconColor="#10B981"
                    />
                     <StatsCard 
                        icon="shield-checkmark-outline" 
                        number="100%" 
                        label="Official Data Sources" 
                        iconColor="#F97316"
                    />
                </View>

            </ScrollView>

            <TouchableOpacity 
                style={styles.fab}
                onPress={() => navigation.navigate('ChatSupport')}
            >
                <LinearGradient
                    colors={[theme.colors.primary, theme.colors.secondary]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.fabGradient}
                >
                    <Ionicons name="chatbubbles-outline" size={28} color="white" />
                </LinearGradient>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollContent: {
        paddingHorizontal: theme.spacing.l,
        paddingBottom: theme.spacing.xl + 80, // Extra padding for FAB
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 64,
        height: 64,
        borderRadius: 32,
        ...theme.shadows.hover,
    },
    fabGradient: {
        flex: 1,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.colors.text,
        textAlign: 'center',
        marginTop: theme.spacing.s,
    },
    sectionSubtitle: {
        fontSize: 16,
        color: theme.colors.textLight,
        textAlign: 'center',
        marginBottom: theme.spacing.l,
    },
    categoriesContainer: {
        marginBottom: theme.spacing.l,
    },
    statsContainer: {
        marginBottom: theme.spacing.l,
    }
});
