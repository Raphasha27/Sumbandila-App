import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, TextInput, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Shield, Lock, Mail, ChevronRight, User } from 'lucide-react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  // State: 'splash' | 'login' | 'dashboard'
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  }, []);

  const handleBiometricAuth = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Verify Identity to Login',
        fallbackLabel: 'Use Password',
      });
      if (result.success) {
        setCurrentScreen('dashboard');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = () => {
    // 🔐 Mock Credential Validation
    const isValidMock = (email.toLowerCase() === 'admin@sumbandila.com' && password === 'admin123');
    
    if (isValidMock) {
      setCurrentScreen('dashboard');
      // Clear credentials for security on next session
      setEmail('');
      setPassword('');
    } else {
        Alert.alert(
            'Access Denied', 
            'Invalid credentials. \nTry: admin@sumbandila.com / admin123'
        );
    }
  };

  // Force splash screen on mount ensures "Get Started" is compulsory
  useEffect(() => {
     setCurrentScreen('splash');
  }, []);

  // --- SCREEN: SPLASH (Gradient) ---
  if (currentScreen === 'splash') {
    return (
      <LinearGradient
        // Approximate Orange (#E65100) to Green (#4CAF50) based on screenshots
        colors={['#E65100', '#F57C00', '#43A047', '#2E7D32']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradientContainer}
      >
        <StatusBar style="light" />
        
        <View style={styles.splashContent}>
          <View style={styles.logoCircle}>
            <Shield size={64} color="#E65100" strokeWidth={2.5} />
          </View>
          
          <Text style={styles.splashTitle}>Sumbandila</Text>
          <Text style={styles.splashSubtitle}>Verification in the palm of your hand</Text>
        </View>

        <TouchableOpacity 
          style={styles.whiteButton}
          onPress={() => setCurrentScreen('login')}
        >
          <Text style={styles.whiteButtonText}>Get Verified</Text>
          <ChevronRight size={20} color="#E65100" />
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  // --- SCREEN: LOGIN (White Card) ---
  if (currentScreen === 'login') {
    return (
      <View style={styles.loginContainer}>
        <StatusBar style="dark" />
        
        {/* Header Section */}
        <View style={styles.loginHeader}>
          <TouchableOpacity onPress={() => setCurrentScreen('splash')} style={styles.backButton}>
             <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            style={{ flex: 1, justifyContent: 'center' }}
        >
            <View style={styles.contentContainer}>
                <View style={styles.iconCircle}>
                    <User size={40} color="#E65100" />
                </View>
                
                <Text style={styles.loginTitleText}>Welcome Back</Text>
                <Text style={styles.loginSubtitleText}>Sign in to your Sumbandila account</Text>

                <View style={styles.card}>
                    <Text style={styles.label}>Email Address</Text>
                    <View style={styles.inputContainer}>
                        <Mail size={20} color="#94A3B8" style={{ marginRight: 10 }} />
                        <TextInput 
                            style={styles.input}
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                        />
                    </View>

                    <Text style={styles.label}>Password</Text>
                    <View style={styles.inputContainer}>
                        <Lock size={20} color="#94A3B8" style={{ marginRight: 10 }} />
                        <TextInput 
                            style={styles.input}
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Sign In</Text>
                    </TouchableOpacity>

                    <Text style={styles.orText}>OR</Text>

                    <TouchableOpacity style={styles.outlineButton}>
                        <Text style={styles.outlineButtonText}>Create New Account</Text>
                    </TouchableOpacity>
                </View>

                {/* Demo Filler */}
                <Text style={styles.demoText}>
                    Test Credentials (Tap to Fill){'\n'}
                    Admin: admin@sumbandila.com / admin123
                </Text>
            </View>
        </KeyboardAvoidingView>
      </View>
    );
  }

  // --- SCREEN: DASHBOARD (Enhanced Field Agent View) ---
  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.dashHeader}>
         <View>
            <Text style={styles.dashGreeting}>Welcome back,</Text>
            <Text style={styles.dashTitle}>Sentinel Agent</Text>
         </View>
         <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => setCurrentScreen('splash')}
         >
            <User size={20} color="#E65100" />
         </TouchableOpacity>
      </View>

      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Card */}
        <View style={styles.statusCard}>
           <View style={styles.statusIconWrap}>
              <Shield size={32} color="white" />
           </View>
           <View style={{ flex: 1 }}>
              <Text style={styles.statusTitle}>Agent Verified</Text>
              <Text style={styles.statusSub}>Level 5 Clearance • Active</Text>
           </View>
           <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>LIVE</Text>
           </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsRow}>
           <View style={styles.statCard}>
              <Text style={styles.statValue}>45k+</Text>
              <Text style={styles.statLabel}>Verified</Text>
           </View>
           <View style={styles.statCard}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Today</Text>
           </View>
           <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: '#2E7D32' }]}>98%</Text>
              <Text style={styles.statLabel}>Success</Text>
           </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <TouchableOpacity style={styles.actionCard}>
           <View style={[styles.actionIcon, { backgroundColor: '#FFF3E0' }]}>
              <Shield size={24} color="#E65100" />
           </View>
           <View style={{ flex: 1 }}>
              <Text style={styles.actionTitle}>Scan QR Seal</Text>
              <Text style={styles.actionSub}>Verify institution instantly</Text>
           </View>
           <ChevronRight size={20} color="#CBD5E1" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
           <View style={[styles.actionIcon, { backgroundColor: '#E8F5E9' }]}>
              <Mail size={24} color="#2E7D32" />
           </View>
           <View style={{ flex: 1 }}>
              <Text style={styles.actionTitle}>Search Registry</Text>
              <Text style={styles.actionSub}>Browse all providers</Text>
           </View>
           <ChevronRight size={20} color="#CBD5E1" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
           <View style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]}>
              <Lock size={24} color="#1976D2" />
           </View>
           <View style={{ flex: 1 }}>
              <Text style={styles.actionTitle}>Verification History</Text>
              <Text style={styles.actionSub}>View past audits</Text>
           </View>
           <ChevronRight size={20} color="#CBD5E1" />
        </TouchableOpacity>

        {/* Sign Out */}
        <TouchableOpacity 
           style={styles.signOutButton}
           onPress={() => setCurrentScreen('splash')}
        >
           <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
      
      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
         <TouchableOpacity style={styles.navItem}>
            <Shield size={22} color="#E65100" />
            <Text style={[styles.navLabel, { color: '#E65100' }]}>Home</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.navItem}>
            <Mail size={22} color="#94A3B8" />
            <Text style={styles.navLabel}>Search</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.navItem}>
            <Lock size={22} color="#94A3B8" />
            <Text style={styles.navLabel}>History</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.navItem}>
            <User size={22} color="#94A3B8" />
            <Text style={styles.navLabel}>Profile</Text>
         </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // SPLASH
  gradientContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
  },
  logoCircle: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 5 },
      elevation: 5,
  },
  splashContent: {
      alignItems: 'center',
      marginTop: 80,
  },
  splashTitle: {
      fontSize: 36,
      fontWeight: '800',
      color: 'white',
      marginBottom: 8,
  },
  splashSubtitle: {
      fontSize: 16,
      color: 'rgba(255,255,255,0.9)',
      textAlign: 'center',
      maxWidth: '80%',
      fontWeight: '500',
  },
  whiteButton: {
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 30,
      gap: 8,
      marginBottom: 40,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 5,
      width: '80%',
      justifyContent: 'center',
  },
  whiteButtonText: {
      color: '#E65100',
      fontSize: 18,
      fontWeight: 'bold',
  },

  // LOGIN
  loginContainer: {
      flex: 1,
      backgroundColor: '#F8FAFC', // Light background like screenshots
  },
  loginHeader: {
      paddingTop: 50,
      paddingHorizontal: 20,
  },
  backButton: {
      padding: 10,
  },
  backText: {
      fontSize: 16,
      color: '#333',
  },
  contentContainer: {
      alignItems: 'center',
      paddingHorizontal: 24,
      width: '100%',
  },
  iconCircle: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: '#FFF3E0', // Light orange
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
  },
  loginTitleText: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#1E293B',
      marginBottom: 8,
  },
  loginSubtitleText: {
      fontSize: 14,
      color: '#64748B',
      marginBottom: 32,
  },
  card: {
      backgroundColor: 'white',
      width: '100%',
      borderRadius: 20,
      padding: 24,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 15,
      elevation: 3,
  },
  label: {
      fontSize: 14,
      fontWeight: '600',
      color: '#334155',
      marginBottom: 8,
  },
  inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F1F5F9',
      borderRadius: 12,
      paddingHorizontal: 16,
      height: 50,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: '#E2E8F0',
  },
  input: {
      flex: 1,
      fontSize: 16,
      color: '#333',
  },
  loginButton: {
      backgroundColor: '#D84315', // Deep Orange
      height: 50,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
  },
  loginButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
  },
  orText: {
      textAlign: 'center',
      color: '#94A3B8',
      fontSize: 12,
      marginBottom: 20,
  },
  outlineButton: {
      borderWidth: 1,
      borderColor: '#E2E8F0',
      height: 50,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
  },
  outlineButtonText: {
      color: '#334155',
      fontSize: 16,
      fontWeight: '600',
  },
  demoText: {
      marginTop: 30,
      textAlign: 'center',
      color: '#CBD5E1',
      fontSize: 12,
  },

  // DASHBOARD
  dashboardContainer: {
      flex: 1,
      backgroundColor: '#F8FAFC',
  },
  dashHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingTop: 20,
      paddingBottom: 16,
  },
  dashGreeting: {
      fontSize: 14,
      color: '#64748B',
      fontWeight: '500',
  },
  dashTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#1E293B',
  },
  profileButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: '#FFF3E0',
      justifyContent: 'center',
      alignItems: 'center',
  },
  statusCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#E65100',
      marginHorizontal: 24,
      padding: 20,
      borderRadius: 20,
      marginBottom: 20,
  },
  statusIconWrap: {
      width: 56,
      height: 56,
      borderRadius: 16,
      backgroundColor: 'rgba(255,255,255,0.2)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
  },
  statusTitle: {
      fontSize: 18,
      fontWeight: '800',
      color: 'white',
  },
  statusSub: {
      fontSize: 13,
      color: 'rgba(255,255,255,0.8)',
      marginTop: 2,
  },
  statusBadge: {
      backgroundColor: '#4CAF50',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 8,
  },
  statusBadgeText: {
      color: 'white',
      fontSize: 11,
      fontWeight: '800',
  },
  statsRow: {
      flexDirection: 'row',
      paddingHorizontal: 24,
      gap: 12,
      marginBottom: 24,
  },
  statCard: {
      flex: 1,
      backgroundColor: 'white',
      padding: 16,
      borderRadius: 16,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#F1F5F9',
  },
  statValue: {
      fontSize: 24,
      fontWeight: '800',
      color: '#1E293B',
  },
  statLabel: {
      fontSize: 12,
      color: '#94A3B8',
      fontWeight: '600',
      marginTop: 4,
  },
  sectionTitle: {
      fontSize: 18,
      fontWeight: '800',
      color: '#1E293B',
      paddingHorizontal: 24,
      marginBottom: 16,
  },
  actionCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      marginHorizontal: 24,
      paddingHorizontal: 16,
      paddingVertical: 18,
      borderRadius: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: '#F1F5F9',
  },
  actionIcon: {
      width: 48,
      height: 48,
      borderRadius: 14,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 14,
  },
  actionTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: '#1E293B',
  },
  actionSub: {
      fontSize: 13,
      color: '#94A3B8',
      marginTop: 2,
  },
  signOutButton: {
      marginTop: 20,
      marginHorizontal: 24,
      paddingVertical: 14,
      backgroundColor: '#FEE2E2',
      borderRadius: 14,
      alignItems: 'center',
  },
  signOutText: {
      color: '#DC2626',
      fontWeight: '700',
  },
  bottomNav: {
      flexDirection: 'row',
      backgroundColor: 'white',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderTopWidth: 1,
      borderTopColor: '#F1F5F9',
  },
  navItem: {
      flex: 1,
      alignItems: 'center',
      gap: 4,
  },
  navLabel: {
      fontSize: 11,
      fontWeight: '600',
      color: '#94A3B8',
  },

});
