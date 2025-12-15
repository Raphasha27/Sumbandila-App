import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import config from '../config';
import { storeToken, storeUser } from '../utils/auth';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const apiBase = config.apiBase;

    // Quick fill for testing
    const fillAdmin = () => {
        setEmail('admin@sumbandila.com');
        setPassword('admin123');
    };

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${apiBase}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            setLoading(false);

            if (data.success && data.token) {
                // Store JWT token and user data
                await storeToken(data.token);
                await storeUser(data.user);

                // Navigate based on role
                if (data.user.role === 'admin') {
                    navigation.replace('AdminDashboard', { user: data.user });
                } else {
                    navigation.replace('Dashboard', { user: data.user });
                }
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (e) {
            setLoading(false);
            setError('Connection failed. Please check your internet or try again later.');
        }
    };

    return (
        <LinearGradient colors={['#fff7ed', '#ffffff', '#f0fdf4']} style={styles.container}>
            <StatusBar style="dark" />
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardView}
                >
                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Feather name="arrow-left" size={24} color="#4b5563" />
                            <Text style={styles.backText}>Back</Text>
                        </TouchableOpacity>

                        <View style={styles.headerSection}>
                            <View style={styles.iconCircle}>
                                <Feather name="user" size={40} color="#ea580c" />
                            </View>
                            <Text style={styles.title}>Welcome Back</Text>
                            <Text style={styles.subtitle}>Sign in to your Sumbandila account</Text>
                        </View>

                        <View style={styles.formCard}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Email Address</Text>
                                <View style={styles.inputWrapper}>
                                    <Feather name="mail" size={20} color="#9ca3af" style={styles.inputIcon} />
                                    <TextInput
                                        placeholder="Enter your email"
                                        value={email}
                                        onChangeText={setEmail}
                                        style={styles.input}
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                        placeholderTextColor="#9ca3af"
                                    />
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Password</Text>
                                <View style={styles.inputWrapper}>
                                    <Feather name="lock" size={20} color="#9ca3af" style={styles.inputIcon} />
                                    <TextInput
                                        placeholder="Enter your password"
                                        value={password}
                                        onChangeText={setPassword}
                                        style={styles.input}
                                        secureTextEntry
                                        placeholderTextColor="#9ca3af"
                                    />
                                </View>
                            </View>

                            {error ? (
                                <View style={styles.errorBox}>
                                    <Feather name="alert-circle" size={16} color="#dc2626" />
                                    <Text style={styles.errorText}>{error}</Text>
                                </View>
                            ) : null}

                            <TouchableOpacity
                                onPress={handleLogin}
                                style={styles.loginButton}
                                activeOpacity={0.8}
                                disabled={loading}
                            >
                                <LinearGradient
                                    colors={['#ea580c', '#c2410c']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.gradientButton}
                                >
                                    <Text style={styles.loginButtonText}>{loading ? 'Signing In...' : 'Sign In'}</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <View style={styles.divider}>
                                <View style={styles.line} />
                                <Text style={styles.orText}>OR</Text>
                                <View style={styles.line} />
                            </View>

                            <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.registerButton}>
                                <Text style={styles.registerText}>Create New Account</Text>
                            </TouchableOpacity>

                        </View>

                        {/* Test Credentials Helper */}
                        <TouchableOpacity onPress={fillAdmin} style={styles.testCreds}>
                            <Text style={styles.testCredsTitle}>Test Credentials (Tap to Fill)</Text>
                            <Text style={styles.testCredsText}>Admin: admin@sumbandila.com / admin123</Text>
                        </TouchableOpacity>

                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    safeArea: { flex: 1 },
    keyboardView: { flex: 1 },
    scrollContent: { padding: 24, flexGrow: 1, justifyContent: 'center' },

    backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, alignSelf: 'flex-start' },
    backText: { fontSize: 16, color: '#4b5563', marginLeft: 8 },

    headerSection: { alignItems: 'center', marginBottom: 32 },
    iconCircle: {
        width: 80, height: 80, borderRadius: 40, backgroundColor: '#ffedd5',
        justifyContent: 'center', alignItems: 'center', marginBottom: 16
    },
    title: { fontSize: 28, fontWeight: 'bold', color: '#1f2937', marginBottom: 8 },
    subtitle: { fontSize: 16, color: '#6b7280', textAlign: 'center' },

    formCard: {
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
    inputGroup: { marginBottom: 20 },
    label: { fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 },
    inputWrapper: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12,
        paddingHorizontal: 16, height: 56
    },
    inputIcon: { marginRight: 12 },
    input: { flex: 1, fontSize: 16, color: '#1f2937' },

    errorBox: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#fef2f2',
        padding: 12, borderRadius: 8, marginBottom: 16, gap: 8
    },
    errorText: { color: '#dc2626', fontSize: 14, flex: 1 },

    loginButton: { borderRadius: 12, overflow: 'hidden', marginBottom: 20 },
    gradientButton: { paddingVertical: 16, alignItems: 'center' },
    loginButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },

    divider: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    line: { flex: 1, height: 1, backgroundColor: '#e5e7eb' },
    orText: { marginHorizontal: 16, color: '#9ca3af', fontSize: 14 },

    registerButton: {
        paddingVertical: 16, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 12, alignItems: 'center'
    },
    registerText: { color: '#4b5563', fontSize: 16, fontWeight: '600' },

    testCreds: { alignItems: 'center', padding: 16, opacity: 0.6 },
    testCredsTitle: { fontSize: 12, fontWeight: 'bold', color: '#6b7280', marginBottom: 4 },
    testCredsText: { fontSize: 12, color: '#9ca3af' },
});
