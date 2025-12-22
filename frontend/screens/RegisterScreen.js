import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, ScrollView, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';

export default function RegisterScreen({ navigation }) {
    const { theme, isDarkMode } = useTheme();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [studentId, setStudentId] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!name || !email || !password) {
            setError('Please fill in all required fields');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigation.replace('Home', { user: { name, email, role: 'student' } });
        }, 1500);
    };

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? theme.colors.background : '#FFFBF7' }]}>
            <StatusBar style={isDarkMode ? "light" : "dark"} />
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Feather name="arrow-left" size={24} color={theme.colors.text} />
                            <Text style={[styles.backText, { color: theme.colors.text }]}>Back</Text>
                        </TouchableOpacity>

                        <View style={styles.headerSection}>
                            <View style={[styles.iconCircle, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, borderWidth: 1 }]}>
                                <Feather name="user-plus" size={40} color={theme.colors.primary} />
                            </View>
                            <Text style={[styles.title, { color: theme.colors.text }]}>Create Account</Text>
                            <Text style={[styles.subtitle, { color: theme.colors.textLight }]}>Join the student community</Text>
                        </View>

                        <View style={[styles.formCard, { backgroundColor: theme.colors.surface }]}>
                            <View style={styles.inputGroup}>
                                <Text style={[styles.label, { color: theme.colors.text }]}>Full Name</Text>
                                <View style={[styles.inputWrapper, { backgroundColor: isDarkMode ? theme.colors.background : '#F9FAFB', borderColor: theme.colors.border }]}>
                                    <Feather name="user" size={20} color={theme.colors.textLight} style={styles.inputIcon} />
                                    <TextInput
                                        placeholder="Enter your full name"
                                        placeholderTextColor={theme.colors.textLight}
                                        value={name}
                                        onChangeText={setName}
                                        style={[styles.input, { color: theme.colors.text }]}
                                    />
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={[styles.label, { color: theme.colors.text }]}>Email Address</Text>
                                <View style={[styles.inputWrapper, { backgroundColor: isDarkMode ? theme.colors.background : '#F9FAFB', borderColor: theme.colors.border }]}>
                                    <Feather name="mail" size={20} color={theme.colors.textLight} style={styles.inputIcon} />
                                    <TextInput
                                        placeholder="Enter your email"
                                        placeholderTextColor={theme.colors.textLight}
                                        value={email}
                                        onChangeText={setEmail}
                                        style={[styles.input, { color: theme.colors.text }]}
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                    />
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={[styles.label, { color: theme.colors.text }]}>Password</Text>
                                <View style={[styles.inputWrapper, { backgroundColor: isDarkMode ? theme.colors.background : '#F9FAFB', borderColor: theme.colors.border }]}>
                                    <Feather name="lock" size={20} color={theme.colors.textLight} style={styles.inputIcon} />
                                    <TextInput
                                        placeholder="Choose a password"
                                        placeholderTextColor={theme.colors.textLight}
                                        value={password}
                                        onChangeText={setPassword}
                                        style={[styles.input, { color: theme.colors.text }]}
                                        secureTextEntry
                                    />
                                </View>
                            </View>

                            {error ? <Text style={styles.errorText}>{error}</Text> : null}

                            <TouchableOpacity onPress={handleRegister} disabled={loading}>
                                <LinearGradient colors={[theme.colors.primary, theme.colors.secondary]} style={styles.registerButton}>
                                    <Text style={styles.registerButtonText}>{loading ? 'Creating Account...' : 'Register'}</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.loginLinkButton}>
                                <Text style={[styles.loginLinkText, { color: theme.colors.textLight }]}>Already have an account? <Text style={[styles.boldLink, { color: theme.colors.primary }]}>Sign In</Text></Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    safeArea: { flex: 1 },
    keyboardView: { flex: 1 },
    scrollContent: { padding: 24, flexGrow: 1, justifyContent: 'center' },
    backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
    backText: { fontSize: 16, marginLeft: 8 },
    headerSection: { alignItems: 'center', marginBottom: 32 },
    iconCircle: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
    subtitle: { fontSize: 16, textAlign: 'center' },
    formCard: { borderRadius: 24, padding: 24, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12 },
    inputGroup: { marginBottom: 20 },
    label: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
    inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, height: 56 },
    inputIcon: { marginRight: 12 },
    input: { flex: 1, fontSize: 16 },
    errorText: { color: '#dc2626', fontSize: 14, marginBottom: 16, textAlign: 'center' },
    registerButton: { paddingVertical: 16, alignItems: 'center', borderRadius: 12 },
    registerButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
    loginLinkButton: { marginTop: 24, alignItems: 'center' },
    loginLinkText: { fontSize: 15 },
    boldLink: { fontWeight: 'bold' }
});

