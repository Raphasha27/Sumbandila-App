import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import config from '../config';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        // Implement real login logic later
        // For now, simple navigation for demo
        setLoading(true);
        setTimeout(() => {
            setLoading(false);

            if (data.success) {
                if (data.user.role === 'admin') {
                    navigation.replace('AdminDashboard', { user: data.user });
                } else {
                    navigation.replace('Dashboard', { user: data.user });
                }
            } else {
                setError(data.error);
            }
        } catch (e) {
            setLoading(false);
            setError('Connection failed. Please check your internet or try again later.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                 <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
                
                <View style={styles.iconContainer}>
                     <View style={styles.iconCircle}>
                        <Ionicons name="person-outline" size={48} color={theme.colors.primary} />
                     </View>
                </View>

                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Sign in to your Sumbandila account</Text>

                <View style={[styles.card, theme.shadows.default]}>
                    <Text style={styles.label}>Email Address</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="mail-outline" size={20} color={theme.colors.textLight} style={styles.inputIcon} />
                        <TextInput 
                            style={styles.input}
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    </View>

                    <Text style={styles.label}>Password</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed-outline" size={20} color={theme.colors.textLight} style={styles.inputIcon} />
                        <TextInput 
                            style={styles.input}
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity 
                        style={[styles.loginButton, theme.shadows.default]}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        <Text style={styles.loginButtonText}>{loading ? 'Signing In...' : 'Sign In'}</Text>
                    </TouchableOpacity>

                    <View style={styles.divider}>
                        <View style={styles.line} />
                        <Text style={styles.orText}>OR</Text>
                        <View style={styles.line} />
                    </View>

                    <TouchableOpacity 
                        style={styles.createAccountButton}
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.createAccountText}>Create New Account</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.demoCredentials}>
                    <Text style={styles.demoText}>Test Credentials (Tap to Fill)</Text>
                    <TouchableOpacity onPress={() => { setEmail('admin@sumbandila.com'); setPassword('admin123'); }}>
                         <Text style={styles.demoSubText}>Admin: admin@sumbandila.com / admin123</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFBF7', // Very light orange tint or white
    },
    header: {
        paddingHorizontal: theme.spacing.m,
        paddingTop: theme.spacing.s,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        marginLeft: 4,
        fontSize: 16,
        color: theme.colors.text,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: theme.spacing.l,
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
    },
    iconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FFEDD5', // Light orange
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFF', // White border ring
    },
    title: {
        ...theme.typography.header,
        color: theme.colors.text,
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        ...theme.typography.body,
        textAlign: 'center',
        color: theme.colors.textLight,
        marginBottom: theme.spacing.xl,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.l,
        marginBottom: theme.spacing.xl,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: 8,
        marginTop: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.m,
        paddingHorizontal: theme.spacing.m,
        height: 50,
        backgroundColor: '#F9FAFB',
        marginBottom: theme.spacing.m,
    },
    inputIcon: {
        marginRight: theme.spacing.s,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: theme.colors.text,
    },
    loginButton: {
        backgroundColor: '#EA580C', // Deep Orange
        borderRadius: theme.borderRadius.m,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing.m,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: theme.spacing.l,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: theme.colors.border,
    },
    orText: {
        marginHorizontal: theme.spacing.m,
        color: theme.colors.textLight,
        fontSize: 12,
    },
    createAccountButton: {
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.m,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    createAccountText: {
        color: theme.colors.text,
        fontSize: 16,
        fontWeight: '600',
    },
    demoCredentials: {
        alignItems: 'center',
        marginTop: theme.spacing.m,
    },
    demoText: {
        fontSize: 12,
        color: theme.colors.textLight,
        marginBottom: 4,
    },
    demoSubText: {
        fontSize: 10,
        color: theme.colors.textLight,
    }
});
