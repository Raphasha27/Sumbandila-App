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
    // Simulating login
    if (email && password) {
      setCurrentScreen('dashboard');
    } else {
        // Fallback or demo mode if empty
        handleBiometricAuth();
    }
  };

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

  // --- SCREEN: DASHBOARD (Reusing previous tactical view but lighter) ---
  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <StatusBar style="dark" />
      <View style={styles.dashHeader}>
         <Text style={styles.dashTitle}>Sumbandila</Text>
         <TouchableOpacity onPress={() => setCurrentScreen('splash')}>
            <User size={24} color="#333" />
         </TouchableOpacity>
      </View>
      
      <View style={styles.dashContent}>
         <View style={styles.verifiedCard}>
             <Shield size={48} color="#2E7D32" />
             <Text style={styles.verifiedTitle}>Agent Verified</Text>
             <Text style={styles.verifiedSub}>Access Granted to Registry</Text>
         </View>
         
         <TouchableOpacity 
            style={styles.signOutButton}
            onPress={() => setCurrentScreen('splash')}
         >
            <Text style={styles.signOutText}>Sign Out</Text>
         </TouchableOpacity>
      </View>
      
      <View style={styles.bottomBar}>
          <Text style={{ color: '#666' }}>Ready to Scan</Text>
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
      padding: 24,
      marginTop: 20,
  },
  dashTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#E65100',
  },
  dashContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
  },
  verifiedCard: {
      backgroundColor: 'white',
      padding: 40,
      borderRadius: 30,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 20,
      width: '100%',
  },
  verifiedTitle: {
      fontSize: 24,
      fontWeight: '800',
      color: '#1E293B',
      marginTop: 20,
  },
  verifiedSub: {
      fontSize: 16,
      color: '#2E7D32',
      marginTop: 8,
      fontWeight: '600',
  },
  signOutButton: {
      marginTop: 30,
      paddingVertical: 12,
      paddingHorizontal: 30,
      backgroundColor: '#F1F5F9',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#CBD5E1',
  },
  signOutText: {
      color: '#64748B',
      fontWeight: '600',
  },
  bottomBar: {
      padding: 20,
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: '#E2E8F0',
  }

});
