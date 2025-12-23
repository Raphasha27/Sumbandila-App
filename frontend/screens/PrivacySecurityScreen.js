import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import GradientHeader from '../components/GradientHeader';
import { Ionicons } from '@expo/vector-icons';

export default function PrivacySecurityScreen({ navigation }) {
    const { theme, isDarkMode } = useTheme();
    
    const Section = ({ title, icon, children }) => (
        <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.sectionHeader}>
                <Ionicons name={icon} size={24} color={theme.colors.primary} style={styles.icon} />
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>{title}</Text>
            </View>
            <View style={styles.sectionContent}>
                {children}
            </View>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <GradientHeader title="Trust Center" showBack={true} onBack={() => navigation.goBack()} />
            
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                
                <View style={[styles.introBox, { backgroundColor: isDarkMode ? 'rgba(16, 185, 129, 0.1)' : '#ECFDF5', borderColor: isDarkMode ? theme.colors.success : '#A7F3D0' }]}>
                    <Ionicons name="shield-checkmark" size={32} color={theme.colors.success} style={{marginBottom: 8}} />
                    <Text style={[styles.introTitle, { color: isDarkMode ? theme.colors.success : '#065F46' }]}>Your Trust is Our Priority</Text>
                    <Text style={[styles.introText, { color: isDarkMode ? theme.colors.text : '#047857' }]}>
                        Sumbandila is committed to protecting your data and ensuring the integrity of all verifications.
                    </Text>
                </View>

                <Section title="Data Privacy" icon="lock-closed-outline">
                    <Text style={[styles.text, { color: theme.colors.textLight }]}>
                        We collect minimal personal data required for account management. 
                        Verification queries are anonymous where possible.
                    </Text>
                </Section>

                <Section title="Verification" icon="ribbon-outline">
                     <Text style={[styles.text, { color: theme.colors.textLight }]}>
                        All data provided is sourced directly from official government registrars (DHET, HPCSA, LPC).
                    </Text>
                </Section>

                <TouchableOpacity style={styles.policyLink}>
                    <Text style={styles.linkText}>Read Full Privacy Policy</Text>
                    <Ionicons name="open-outline" size={16} color={theme.colors.primary} />
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 16,
        paddingBottom: 32,
    },
    introBox: {
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        marginBottom: 24,
        borderWidth: 1,
    },
    introTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    introText: {
        textAlign: 'center',
        fontSize: 14,
    },
    section: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    icon: {
        marginRight: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    sectionContent: {
        paddingLeft: 32,
    },
    text: {
        fontSize: 15,
        lineHeight: 22,
    },
    policyLink: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        padding: 16,
    },
    linkText: {
        color: '#F97316', // Primary
        fontSize: 16,
        fontWeight: '600',
        marginRight: 8,
    }
});

