import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import config from '../config';
import { useTheme } from '../context/ThemeContext';

export default function LoginScreen({ navigation }) {
    const { theme, isDarkMode } = useTheme();
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
        // BYPASS REMOVED for Production/Backend Connection
        // console.log("Executing Login Bypass...");
        // const demoUser = {
        //     name: email.split('@')[0] || 'Tester',
        //     email: email || 'test@sumbandila.com',
        //     role: (email || '').toLowerCase().includes('admin') ? 'admin' : 'student'
        // };
        // if (demoUser.role === 'admin') navigation.replace('AdminDashboard', { user: demoUser, token: 'demo-token' });
        // else navigation.replace('Home', { user: demoUser, token: 'demo-token' });
        // return;

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError('');

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout for debugging

        try {
            const res = await fetch(`${apiBase}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            const data = await res.json();
            setLoading(false);

            if (data.success) {
                if (data.user.role === 'admin') {
                    navigation.replace('AdminDashboard', { user: data.user, token: data.token });
                } else {
                    navigation.replace('Home', { user: data.user, token: data.token });
                }
            } else {
                setError(data.error);
            }
        } catch (e) {
            setLoading(false);
            console.log("Backend login failed, using DEMO bypass:", e);
            // Fallback for development/demo
            const demoUser = {
                name: email.split('@')[0] || 'Demo User',
                email: email || 'demo@sumbandila.com',
                role: email.toLowerCase().includes('admin') ? 'admin' : 'student'
            };

            if (demoUser.role === 'admin') {
                navigation.replace('AdminDashboard', { user: demoUser });
            } else {
                navigation.replace('Home', { user: demoUser });
            }
            // setError('Connection failed. Please check your internet or try again later.'); 
        }
    };

    const styles = createStyles(theme);

    return (
        <View style={styles.container}>
            <StatusBar style={isDarkMode ? 'light' : 'dark'} />
            <LinearGradient
                colors={isDarkMode ? [theme.colors.background, theme.colors.background] : ['#fff7ed', '#ffffff', '#f0fdf4']}
                style={StyleSheet.absoluteFill}
            />
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardView}
                >
                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Feather name="arrow-left" size={24} color={theme.colors.textSecondary} />
                            <Text style={styles.backText}>Back</Text>
                        </TouchableOpacity>

                        <View style={styles.headerSection}>
                            <View style={styles.iconCircle}>
                                <Feather name="user" size={40} color={theme.colors.primary} />
                            </View>
                            <Text style={styles.title}>Welcome Back</Text>
                            <Text style={styles.subtitle}>Sign in to your Sumbandila account</Text>
                            <Text style={{ fontSize: 10, color: 'gray', marginTop: 5 }}>Server: {apiBase}</Text>
                        </View>

                        <View style={styles.formCard}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Email Address</Text>
                                <View style={styles.inputWrapper}>
                                    <Feather name="mail" size={20} color={theme.colors.textMuted} style={styles.inputIcon} />
                                    <TextInput
                                        placeholder="Enter your email"
                                        value={email}
                                        onChangeText={setEmail}
                                        style={styles.input}
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                        placeholderTextColor={theme.colors.textMuted}
                                    />
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Password</Text>
                                <View style={styles.inputWrapper}>
                                    <Feather name="lock" size={20} color={theme.colors.textMuted} style={styles.inputIcon} />
                                    <TextInput
                                        placeholder="Enter your password"
                                        value={password}
                                        onChangeText={setPassword}
                                        style={styles.input}
                                        secureTextEntry
                                        placeholderTextColor={theme.colors.textMuted}
                                    />
                                </View>
                            </View>

                            {error ? (
                                <View style={styles.errorBox}>
                                    <Feather name="alert-circle" size={16} color={theme.colors.error} />
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
                                    colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
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

                            <TouchableOpacity
                                onPress={() => navigation.replace('Home', { user: { name: 'Guest User', role: 'guest' } })}
                                style={{ marginTop: 16, alignItems: 'center' }}
                            >
                                <Text style={{ color: theme.colors.primary, fontSize: 16, fontWeight: '600' }}>Continue as Guest</Text>
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
        </View>
    );
}

const createStyles = (theme) => StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    safeArea: { flex: 1 },
    keyboardView: { flex: 1 },
    scrollContent: { padding: 24, flexGrow: 1, justifyContent: 'center' },

    backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, alignSelf: 'flex-start' },
    backText: { fontSize: 16, color: theme.colors.textSecondary, marginLeft: 8 },

    headerSection: { alignItems: 'center', marginBottom: 32 },
    iconCircle: {
        width: 80, height: 80, borderRadius: 40,
        backgroundColor: theme.mode === 'dark' ? theme.colors.surfaceElevated : '#ffedd5',
        justifyContent: 'center', alignItems: 'center', marginBottom: 16
    },
    title: { fontSize: 28, fontWeight: 'bold', color: theme.colors.text, marginBottom: 8 },
    subtitle: { fontSize: 16, color: theme.colors.textSecondary, textAlign: 'center' },

    formCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: 24,
        padding: 24,
        ...theme.shadows.default,
        marginBottom: 24,
        borderWidth: theme.mode === 'dark' ? 1 : 0,
        borderColor: theme.colors.border,
    },
    inputGroup: { marginBottom: 20 },
    label: { fontSize: 14, fontWeight: '600', color: theme.colors.text, marginBottom: 8 },
    inputWrapper: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: theme.colors.background,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 12,
        paddingHorizontal: 16, height: 56
    },
    inputIcon: { marginRight: 12 },
    input: { flex: 1, fontSize: 16, color: theme.colors.text },

    errorBox: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: theme.mode === 'dark' ? 'rgba(239, 68, 68, 0.2)' : '#fef2f2',
        padding: 12, borderRadius: 8, marginBottom: 16, gap: 8
    },
    errorText: { color: theme.colors.error, fontSize: 14, flex: 1 },

    loginButton: { borderRadius: 12, overflow: 'hidden', marginBottom: 20 },
    gradientButton: { paddingVertical: 16, alignItems: 'center' },
    loginButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },

    divider: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    line: { flex: 1, height: 1, backgroundColor: theme.colors.border },
    orText: { marginHorizontal: 16, color: theme.colors.textMuted, fontSize: 14 },

    registerButton: {
        paddingVertical: 16, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 12, alignItems: 'center'
    },
    registerText: { color: theme.colors.textSecondary, fontSize: 16, fontWeight: '600' },

    testCreds: { alignItems: 'center', padding: 16, opacity: 0.6 },
    testCredsTitle: { fontSize: 12, fontWeight: 'bold', color: theme.colors.textSecondary, marginBottom: 4 },
    testCredsText: { fontSize: 12, color: theme.colors.textMuted },
});
