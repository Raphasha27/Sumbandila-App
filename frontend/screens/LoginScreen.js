import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function LoginScreen({ navigation }) {
    const { theme, isDarkMode } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please enter your email and password');
            return;
        }

        setLoading(true);
        setError(null);
        
        try {
            setTimeout(() => {
                setLoading(false);
                const mockUser = {
                    email: email,
                    role: 'student', // simplified for demo
                };
                navigation.replace('Home', { user: mockUser });
            }, 1000);
        } catch (e) {
            setLoading(false);
            setError('Connection failed.');
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? theme.colors.background : '#FFFBF7' }]}>
            <StatusBar style={isDarkMode ? "light" : "dark"} />
            
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
                <ScrollView 
                    contentContainerStyle={styles.scrollContent} 
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.iconContainer}>
                         <View style={[styles.iconCircle, { backgroundColor: isDarkMode ? theme.colors.surface : '#FFEDD5', borderColor: theme.colors.border }]}>
                            <Ionicons name="person-outline" size={48} color={theme.colors.primary} />
                         </View>
                    </View>

                    <Text style={[styles.title, { color: theme.colors.text }]}>Welcome Back</Text>
                    <Text style={[styles.subtitle, { color: theme.colors.textLight }]}>Sign in to your Sumbandila account</Text>

                    {error && (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    )}

                    <View style={[styles.card, theme.shadows.default, { backgroundColor: theme.colors.surface }]}>
                        <Text style={[styles.label, { color: theme.colors.text }]}>Email Address</Text>
                        <View style={[styles.inputContainer, { borderColor: theme.colors.border, backgroundColor: isDarkMode ? theme.colors.background : '#F9FAFB' }]}>
                            <Ionicons name="mail-outline" size={20} color={theme.colors.textLight} style={styles.inputIcon} />
                            <TextInput 
                                style={[styles.input, { color: theme.colors.text }]}
                                placeholder="Enter your email"
                                placeholderTextColor={theme.colors.textLight}
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                            />
                        </View>

                        <Text style={[styles.label, { color: theme.colors.text }]}>Password</Text>
                        <View style={[styles.inputContainer, { borderColor: theme.colors.border, backgroundColor: isDarkMode ? theme.colors.background : '#F9FAFB' }]}>
                            <Ionicons name="lock-closed-outline" size={20} color={theme.colors.textLight} style={styles.inputIcon} />
                            <TextInput 
                                style={[styles.input, { color: theme.colors.text }]}
                                placeholder="Enter your password"
                                placeholderTextColor={theme.colors.textLight}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity 
                            style={[styles.loginButton, { backgroundColor: theme.colors.primaryDark }]}
                            onPress={handleLogin}
                        >
                            <Text style={styles.loginButtonText}>{loading ? 'Signing In...' : 'Sign In'}</Text>
                        </TouchableOpacity>

                        <View style={styles.divider}>
                            <View style={[styles.line, { backgroundColor: theme.colors.border }]} />
                            <Text style={styles.orText}>OR</Text>
                            <View style={[styles.line, { backgroundColor: theme.colors.border }]} />
                        </View>

                        <TouchableOpacity 
                            style={[styles.createAccountButton, { borderColor: theme.colors.border }]}
                            onPress={() => navigation.navigate('Register')}
                        >
                            <Text style={[styles.createAccountText, { color: theme.colors.text }]}>Create New Account</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    iconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 32,
    },
    errorContainer: {
        backgroundColor: '#FEE2E2',
        padding: 10,
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#FECACA',
    },
    errorText: {
        color: '#DC2626',
        textAlign: 'center',
        fontSize: 14,
    },
    card: {
        borderRadius: 24,
        padding: 24,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 50,
        marginBottom: 16,
    },
    inputIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    loginButton: {
        borderRadius: 12,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    line: {
        flex: 1,
        height: 1,
    },
    orText: {
        marginHorizontal: 16,
        color: '#9CA3AF',
        fontSize: 12,
    },
    createAccountButton: {
        borderWidth: 1,
        borderRadius: 12,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    createAccountText: {
        fontSize: 16,
        fontWeight: '600',
    }
});

