import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

export default function CategoryCard({ title, subtitle, icon, color, onPress }) {
    return (
        <TouchableOpacity 
            activeOpacity={0.9} 
            onPress={onPress}
            style={[styles.container, theme.shadows.hover]}
        >
            <LinearGradient
                colors={[color, color]} // Can be gradient if we want, currently solid color as per new design request or gradient style in screenshot? Screenshot looks like solid or subtle gradient.
                // Let's use the color passed, maybe lighten it slightly for a gradient effect if desired later.
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
        borderRadius: theme.borderRadius.l,
        marginBottom: theme.spacing.m,
        height: 160,
        overflow: 'hidden',
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.l,
    },
    content: {
        alignItems: 'center',
    },
    icon: {
        marginBottom: theme.spacing.s,
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
