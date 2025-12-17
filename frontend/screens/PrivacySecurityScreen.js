import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '../theme';
import GradientHeader from '../components/GradientHeader';
import { Ionicons } from '@expo/vector-icons';

export default function PrivacySecurityScreen({ navigation }) {
    
    const Section = ({ title, icon, children }) => (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Ionicons name={icon} size={24} color={theme.colors.primary} style={styles.icon} />
                <Text style={styles.sectionTitle}>{title}</Text>
            </View>
            <View style={styles.sectionContent}>
                {children}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <GradientHeader title="Trust Center" showBack={true} onBack={() => navigation.goBack()} />
            
            <ScrollView contentContainerStyle={styles.content}>
                
                <View style={styles.introBox}>
                    <Ionicons name="shield-checkmark" size={32} color={theme.colors.success} style={{marginBottom: 8}} />
                    <Text style={styles.introTitle}>Your Trust is Our Priority</Text>
                    <Text style={styles.introText}>
                        Sumbandila is committed to protecting your data and ensuring the integrity of all verifications.
                    </Text>
                </View>

                <Section title="Data Privacy" icon="lock-closed-outline">
                    <Text style={styles.text}>
                        We collect minimal personal data required for account management. 
                        Verification queries are anonymous where possible.
                        We do not sell your personal data to third parties.
                    </Text>
                </Section>

                <Section title="Verification Integrity" icon="ribbon-outline">
                     <Text style={styles.text}>
                        All data provided by Sumbandila is sourced directly from official government registrars (DHET, HPCSA, LPC).
                        Our algorithms constantly cross-reference these sources to ensure accuracy.
                    </Text>
                </Section>

                <Section title="Security Measures" icon="server-outline">
                     <Text style={styles.text}>
                        - End-to-end encryption for all sensitive data transfers.
                        - Regular security audits by independent firms.
                        - Secure data centers compliant with international standards.
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
        backgroundColor: theme.colors.background,
    },
    content: {
        padding: theme.spacing.m,
        paddingBottom: theme.spacing.xl,
    },
    introBox: {
        backgroundColor: '#ECFDF5', // Light green
        borderRadius: theme.borderRadius.l,
        padding: theme.spacing.l,
        alignItems: 'center',
        marginBottom: theme.spacing.l,
        borderWidth: 1,
        borderColor: '#A7F3D0',
    },
    introTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#065F46',
        marginBottom: 4,
    },
    introText: {
        textAlign: 'center',
        color: '#047857',
        fontSize: 14,
    },
    section: {
        backgroundColor: 'white',
        borderRadius: theme.borderRadius.l,
        padding: theme.spacing.m,
        marginBottom: theme.spacing.m,
        ...theme.shadows.default,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.s,
    },
    icon: {
        marginRight: theme.spacing.s,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.text,
    },
    sectionContent: {
        paddingLeft: 32, // align with text start
    },
    text: {
        fontSize: 15,
        color: theme.colors.textLight,
        lineHeight: 22,
    },
    policyLink: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: theme.spacing.m,
        padding: theme.spacing.m,
    },
    linkText: {
        color: theme.colors.primary,
        fontSize: 16,
        fontWeight: '600',
        marginRight: 8,
    }
});
