import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

export default function LandingScreen({ navigation }) {
    const { theme } = useTheme();

    // Animation values
    const logoPosition = useRef(new Animated.Value(-100)).current; // Start off-screen (top)
    const logoOpacity = useRef(new Animated.Value(0)).current;

    const textPosition = useRef(new Animated.Value(50)).current; // Start lower
    const textOpacity = useRef(new Animated.Value(0)).current;

    const buttonScale = useRef(new Animated.Value(0.8)).current;
    const buttonOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Sequence of animations
        Animated.sequence([
            // 1. Logo slides down and fades in
            Animated.parallel([
                Animated.timing(logoPosition, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                    easing: Easing.bounce,
                }),
                Animated.timing(logoOpacity, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]),
            // 2. Text slides up and fades in
            Animated.parallel([
                Animated.timing(textPosition, {
                    toValue: 0,
                    duration: 800,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.exp),
                }),
                Animated.timing(textOpacity, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]),
            // 3. Button pops in
            Animated.parallel([
                Animated.spring(buttonScale, {
                    toValue: 1,
                    friction: 5,
                    useNativeDriver: true,
                }),
                Animated.timing(buttonOpacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <LinearGradient
                colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
                style={styles.background}
            >
                <View style={styles.content}>
                    {/* Animated Logo */}
                    <Animated.View
                        style={[
                            styles.logoContainer,
                            {
                                opacity: logoOpacity,
                                transform: [{ translateY: logoPosition }]
                            }
                        ]}
                    >
                        <View style={styles.iconCircle}>
                            <Feather name="shield" size={64} color={theme.colors.primary} />
                        </View>
                    </Animated.View>

                    {/* Animated Text */}
                    <Animated.View
                        style={[
                            styles.textContainer,
                            {
                                opacity: textOpacity,
                                transform: [{ translateY: textPosition }]
                            }
                        ]}
                    >
                        <Text style={styles.appName}>Sumbandila</Text>
                        <Text style={styles.tagline}>Africa's Universal Trust & Verification Network</Text>
                    </Animated.View>

                    {/* Spacer */}
                    <View style={{ flex: 1 }} />

                    {/* Animated Button */}
                    <Animated.View
                        style={[
                            styles.buttonContainer,
                            {
                                opacity: buttonOpacity,
                                transform: [{ scale: buttonScale }]
                            }
                        ]}
                    >
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.replace('Login')}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.buttonText}>Get Verified</Text>
                            <Feather name="arrow-right" size={20} color={theme.colors.primary} />
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        paddingTop: 120, // Push content down a bit
    },
    logoContainer: {
        marginBottom: 24,
    },
    iconCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    textContainer: {
        alignItems: 'center',
    },
    appName: {
        fontSize: 42,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    tagline: {
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        lineHeight: 24,
    },
    buttonContainer: {
        width: '100%',
        marginBottom: 60,
    },
    button: {
        backgroundColor: 'white',
        paddingVertical: 18,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
    buttonText: {
        color: '#ea580c', // Primary color
        fontSize: 20,
        fontWeight: 'bold',
    },
});
