import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function StatsCard({ icon, number, label, iconColor }) {
    const { theme } = useTheme();
    return (
        <View style={[styles.container, theme.shadows.card, { backgroundColor: theme.colors.surface }]}>
            <Ionicons name={icon} size={32} color={iconColor || theme.colors.primary} style={styles.icon} />
            <Text style={[styles.number, { color: theme.colors.text }]}>{number}</Text>
            <Text style={[styles.label, { color: theme.colors.textLight }]}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 16, // theme.borderRadius.l
        padding: 24, // theme.spacing.l
        alignItems: 'center',
        marginBottom: 16, // theme.spacing.m
        width: '100%',
    },
    icon: {
        marginBottom: 8, // theme.spacing.s
    },
    number: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    label: {
        fontSize: 14,
        textAlign: 'center',
    }
});

