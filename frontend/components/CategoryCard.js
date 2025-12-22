import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function CategoryCard({ title, subtitle, icon, color, onPress }) {
    const { theme } = useTheme();
    return (
        <TouchableOpacity 
            activeOpacity={0.9} 
            onPress={onPress}
            style={[styles.container, theme.shadows.hover, { borderRadius: theme.borderRadius.l, marginBottom: theme.spacing.m }]}
        >
            <LinearGradient
                colors={[color, color]} 
                style={styles.gradient}
            >
                <View style={styles.content}>
                    <Ionicons name={icon} size={48} color="white" style={styles.icon} />
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 160,
        overflow: 'hidden',
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24, // theme.spacing.l
    },
    content: {
        alignItems: 'center',
    },
    icon: {
        marginBottom: 8, // theme.spacing.s
    },
    title: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    subtitle: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 14,
        textAlign: 'center',
    }
});

