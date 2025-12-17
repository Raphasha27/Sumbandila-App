import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import config from '../config';

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('0612345678');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  const doLogin = async () => {
    if (!phone || !password) {
      Alert.alert('Error', 'Please enter both phone and password');
      return;
    }

    setLoading(true);
    try {
      // Use configured backend URL
      const res = await axios.post(`${config.apiBase}/login`, { phone, password });
      if (res.data.access_token) {
        // Alert.alert('Logged in', 'Token: ' + res.data.access_token);
        navigation.navigate('Verify');
      }
    } catch (e) {
      console.error(e);
      // For demo purposes, if backend fails, navigate anyway if using test credentials
      if (phone === '0612345678' && password === '123456') {
         navigation.navigate('Verify');
      } else {
        Alert.alert('Login failed', e?.response?.data?.detail || e.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFF5F0', '#E8F5E9']} // Light peach to light mint
        style={styles.background}
      />
      
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Header with Back Button */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
                <Text style={styles.backText}>Back</Text>
              </TouchableOpacity>
            </View>

            {/* Avatar Icon */}
            <View style={styles.avatarContainer}>
              <View style={styles.avatarCircle}>
                <Ionicons name="person-outline" size={40} color={theme.colors.primary} />
              </View>
            </View>

            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to your Sumbandila account</Text>

            {/* Login Form Card */}
            <View style={styles.card}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="call-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput 
                  placeholder="Enter your phone number" 
                  style={styles.input} 
                  value={phone} 
                  onChangeText={setPhone} 
                  keyboardType="phone-pad"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
                <TextInput 
                  placeholder="Enter your password" 
                  style={styles.input} 
                  value={password} 
                  onChangeText={setPassword} 
                  secureTextEntry
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <TouchableOpacity 
                style={styles.loginButton} 
                onPress={doLogin}
                activeOpacity={0.8}
                disabled={loading}
              >
                <Text style={styles.loginButtonText}>{loading ? 'Signing In...' : 'Sign In'}</Text>
              </TouchableOpacity>

              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              <TouchableOpacity style={styles.createAccountButton} activeOpacity={0.8}>
                <Text style={styles.createAccountText}>Create New Account</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Test Credentials (Tap to Fill)</Text>
              <TouchableOpacity onPress={() => { setPhone('0612345678'); setPassword('123456'); }}>
                <Text style={styles.credentialsText}>User: 0612345678 / 123456</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 16,
    marginLeft: 8,
    color: theme.colors.text,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF0E6', // Light orange
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 16,
    backgroundColor: '#FAFAFA',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text,
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#9CA3AF',
    fontSize: 14,
  },
  createAccountButton: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccountText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginTop: 'auto',
    paddingBottom: 20,
  },
  footerText: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginBottom: 4,
  },
  credentialsText: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontStyle: 'italic',
  }
});
