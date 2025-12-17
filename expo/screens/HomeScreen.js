import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { theme } from '../constants/theme';
import GradientHeader from '../components/GradientHeader';
import StatCard from '../components/StatCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <GradientHeader 
        title="Verification in the palm of your hand" 
        showProfile={true} 
      />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.colors.primary} />
        }
      >
        <View style={styles.content}>
          
          {/* Main Action Card - Legal (Purple) from screenshot, or category entry */}
          <TouchableOpacity 
            style={[styles.heroCard, { backgroundColor: theme.colors.purple }]}
            onPress={() => navigation.navigate('Verify')}
            activeOpacity={0.9}
          >
            <View style={styles.heroContent}>
              <Text style={styles.heroIcon}>⚖️</Text>
              <Text style={styles.heroTitle}>Legal</Text>
              <Text style={styles.heroSubtitle}>Lawyers & Legal Professionals</Text>
            </View>
          </TouchableOpacity>

          {/* Stats Grid */}
          <StatCard 
            icon="business-outline" 
            count="2,450+" 
            label="Registered Institutions" 
            iconColor={theme.colors.blue}
          />
          
          <StatCard 
            icon="people-outline" 
            count="45,000+" 
            label="Verified Professionals" 
            iconColor={theme.colors.success}
          />
          
          <StatCard 
            icon="shield-checkmark-outline" 
            count="100%" 
            label="Official Data Sources" 
            iconColor={theme.colors.primary}
          />

          <View style={{ height: 20 }} />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  content: {
    padding: 20,
    marginTop: -20, // Pull up to overlap header slightly if desired, or just standard padding
  },
  heroCard: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroIcon: {
    fontSize: 40,
    marginBottom: 8,
    color: 'white'
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  }
});
