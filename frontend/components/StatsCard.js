import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

export default function StatsCard({ icon, number, label, iconColor }) {
    return (
        <View style={[styles.container, theme.shadows.card]}>
            <Ionicons name={icon} size={32} color={iconColor || theme.colors.primary} style={styles.icon} />
            <Text style={styles.number}>{number}</Text>
            <Text style={styles.label}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: theme.borderRadius.l,
        padding: theme.spacing.l,
        alignItems: 'center',
        marginBottom: theme.spacing.m,
        width: '100%',
    },
    icon: {
        marginBottom: theme.spacing.s,
    },
    number: {
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 4,
    },
    label: {
        fontSize: 14,
        color: theme.colors.textLight,
        textAlign: 'center',
    }
});
