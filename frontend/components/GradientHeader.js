import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function GradientHeader({ title, subtitle, showProfile = false, showBack = false, onBack }) {
    const navigation = useNavigation();
    const { theme, isDarkMode, toggleTheme } = useTheme();

    return (
        <LinearGradient
            colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.container, { borderBottomLeftRadius: theme.borderRadius.xl, borderBottomRightRadius: theme.borderRadius.xl }]}
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.content}>
                    <View style={styles.leftContainer}>
                        {showBack && (
                            <TouchableOpacity onPress={onBack} style={styles.backButton}>
                                <Ionicons name="arrow-back" size={24} color="white" />
                            </TouchableOpacity>
                        )}
                        {!showBack && <Ionicons name="shield-checkmark" size={32} color="white" style={styles.logo} />}
                        
                        <View>
                            <Text style={[styles.title, theme.typography.header, { fontSize: 28 }]}>{title || 'Sumbandila'}</Text>
                            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                        </View>
                    </View>

                    <View style={styles.rightContainer}>
                        <TouchableOpacity style={styles.iconButton} onPress={toggleTheme}>
                            <Ionicons name={isDarkMode ? "sunny" : "moon"} size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('RealScanner')}>
                            <Ionicons name="qr-code-outline" size={24} color="white" />
                        </TouchableOpacity>
                        {showProfile && (
                            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Profile')}>
                                <Ionicons name="person-outline" size={24} color="white" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 24, // theme.spacing.l
        marginBottom: 16, // theme.spacing.m
    },
    safeArea: {
        backgroundColor: 'transparent',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24, // theme.spacing.l
        paddingTop: Platform.OS === 'android' ? 32 : 8,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16, // theme.spacing.m
    },
    backButton: {
        marginRight: 8, // theme.spacing.s
    },
    logo: {
        marginRight: 8, // theme.spacing.s
    },
    title: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    subtitle: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 14,
        marginTop: 2,
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16, // theme.spacing.m
    },
    iconButton: {
        padding: 4, // theme.spacing.xs
    }
});

