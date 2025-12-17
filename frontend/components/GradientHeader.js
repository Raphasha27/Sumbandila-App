import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function GradientHeader({ title, subtitle, showProfile = false, showBack = false, onBack }) {
    const navigation = useNavigation();

    return (
        <LinearGradient
            colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.container}
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
                            <Text style={styles.title}>{title || 'Sumbandila'}</Text>
                            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                        </View>
                    </View>

                    <View style={styles.rightContainer}>
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
        paddingBottom: theme.spacing.l,
        borderBottomLeftRadius: theme.borderRadius.xl,
        borderBottomRightRadius: theme.borderRadius.xl,
        marginBottom: theme.spacing.m,
    },
    safeArea: {
        backgroundColor: 'transparent',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.l,
        paddingTop: Platform.OS === 'android' ? theme.spacing.xl : theme.spacing.s,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.m,
    },
    backButton: {
        marginRight: theme.spacing.s,
    },
    logo: {
        marginRight: theme.spacing.s,
    },
    title: {
        ...theme.typography.header,
        fontSize: 28,
    },
    subtitle: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 14,
        marginTop: 2,
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.m,
    },
    iconButton: {
        padding: theme.spacing.xs,
    }
});
