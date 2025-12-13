import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, ScrollView, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import config from '../config';

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [studentId, setStudentId] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const apiBase = config.apiBase;

    const handleRegister = async () => {
        if (!name || !email || !password) {
            setError('Please fill in all required fields');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${apiBase}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, studentId })
            });
            const data = await res.json();
            setLoading(false);

            if (data.success) {
                navigation.replace('Dashboard', { user: data.user });
            } else {
                setError(data.error);
            }
        } catch (e) {
            setLoading(false);
            setError('Connection failed. Please check your internet.');
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
                                <Feather name="user-plus" size={40} color="#16a34a" />
                            </View>
                            <Text style={styles.title}>Create Account</Text>
                            <Text style={styles.subtitle}>Join the student community</Text>
                        </View>

                        <View style={styles.formCard}>

                            {/* Full Name */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Full Name</Text>
                                <View style={styles.inputWrapper}>
                                    <Feather name="user" size={20} color="#9ca3af" style={styles.inputIcon} />
                                    <TextInput
                                        placeholder="Enter your full name"
                                        value={name}
                                        onChangeText={setName}
                                        style={styles.input}
                                        placeholderTextColor="#9ca3af"
                                    />
                                </View>
                            </View>

                            {/* Student ID */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Student ID <Text style={styles.optional}>(Optional)</Text></Text>
                                <View style={styles.inputWrapper}>
                                    <Feather name="credit-card" size={20} color="#9ca3af" style={styles.inputIcon} />
                                    <TextInput
                                        placeholder="Enter Student ID"
                                        value={studentId}
                                        onChangeText={setStudentId}
                                        style={styles.input}
                                        placeholderTextColor="#9ca3af"
                                    />
                                </View>
                            </View>

                            {/* Email */}
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

                            {/* Password */}
                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Password</Text>
                                <View style={styles.inputWrapper}>
                                    <Feather name="lock" size={20} color="#9ca3af" style={styles.inputIcon} />
                                    <TextInput
                                        placeholder="Choose a password"
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
                                onPress={handleRegister}
                                style={styles.registerButton}
                                activeOpacity={0.8}
                                disabled={loading}
                            >
                                <LinearGradient
                                    colors={['#16a34a', '#15803d']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.gradientButton}
                                >
                                    <Text style={styles.registerButtonText}>{loading ? 'Creating Account...' : 'Register'}</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <View style={styles.divider}>
                                <View style={styles.line} />
                                <Text style={styles.orText}>OR</Text>
                                <View style={styles.line} />
                            </View>

                            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.loginLinkButton}>
                                <Text style={styles.loginLinkText}>Already have an account? <Text style={styles.boldLink}>Sign In</Text></Text>
                            </TouchableOpacity>

                        </View>
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
        width: 80, height: 80, borderRadius: 40, backgroundColor: '#dcfce7',
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
    optional: { color: '#9ca3af', fontWeight: '400' },
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

    registerButton: { borderRadius: 12, overflow: 'hidden', marginBottom: 20 },
    gradientButton: { paddingVertical: 16, alignItems: 'center' },
    registerButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },

    divider: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    line: { flex: 1, height: 1, backgroundColor: '#e5e7eb' },
    orText: { marginHorizontal: 16, color: '#9ca3af', fontSize: 14 },

    loginLinkButton: { alignItems: 'center', padding: 8 },
    loginLinkText: { color: '#4b5563', fontSize: 15 },
    boldLink: { color: '#16a34a', fontWeight: 'bold' },
});
