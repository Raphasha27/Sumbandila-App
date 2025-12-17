import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { theme } from '../theme';
import GradientHeader from '../components/GradientHeader';
import { Ionicons } from '@expo/vector-icons';

export default function ResultScreen({ route, navigation }) {
    const { data } = route.params || { 
        data: { 
            name: 'Boston City Campus', 
            status: true, 
            regNumber: '2001/HE07/006',
            type: 'education'
        } 
    };

    const isVerified = data.status;

    return (
        <View style={styles.container}>
             <GradientHeader title="Sumbandila" showBack={true} onBack={() => navigation.goBack()} />
             
             <ScrollView contentContainerStyle={styles.content}>
                 
                <View style={[styles.card, theme.shadows.default, styles.mainCard]}>
                    <View style={styles.headerRow}>
                        <View style={[styles.iconContainer, { borderColor: isVerified ? theme.colors.success : theme.colors.error }]}>
                            <Ionicons 
                                name={isVerified ? "checkmark-circle-outline" : "close-circle-outline"} 
                                size={40} 
                                color={isVerified ? theme.colors.success : theme.colors.error} 
                            />
                        </View>
                        <View style={styles.headerText}>
                            <Text style={styles.statusTitle}>{isVerified ? 'Verified & Registered' : 'Registration Not Found'}</Text>
                            <Text style={styles.statusSubtitle}>{isVerified ? 'Valid registration confirmed' : 'This entity does not appear in our registry'}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Name</Text>
                        <Text style={styles.value}>{data.name}</Text>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Text style={styles.label}>Registration Number</Text>
                            <Text style={styles.value}>{data.regNumber || 'N/A'}</Text>
                        </View>
                        <View style={styles.col}>
                            <Text style={styles.label}>Status</Text>
                            <View style={[styles.badge, { backgroundColor: isVerified ? '#DCFCE7' : '#FEE2E2' }]}>
                                <Text style={[styles.badgeText, { color: isVerified ? '#15803D' : '#991B1B' }]}>
                                    {isVerified ? 'Registered' : 'Unregistered'}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Accreditation</Text>
                        <Text style={styles.value}>CHE Accredited</Text>
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Accredited Courses</Text>
                        <View style={styles.tags}>
                            <View style={styles.tag}><Text style={styles.tagText}>Business Management</Text></View>
                            <View style={styles.tag}><Text style={styles.tagText}>IT</Text></View>
                            <View style={styles.tag}><Text style={styles.tagText}>Marketing</Text></View>
                        </View>
                    </View>

                     <View style={styles.fieldGroup}>
                        <Text style={styles.label}>Valid Until</Text>
                        <Text style={styles.value}>2026-12-31</Text>
                    </View>

                    <View style={styles.infoBox}>
                         <Ionicons name="information-circle-outline" size={24} color="#1E40AF" style={{marginRight: 8}} />
                         <Text style={styles.infoText}>
                            Always verify credentials directly with the institution or professional before making important decisions.
                         </Text>
                    </View>

                </View>

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
    },
    card: {
        backgroundColor: 'white',
        borderRadius: theme.borderRadius.l,
        padding: theme.spacing.l,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    mainCard: {
        // Additional styles if needed
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.m,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.m,
    },
    headerText: {
        flex: 1,
    },
    statusTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    statusSubtitle: {
        fontSize: 14,
        color: theme.colors.textLight,
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.border,
        marginVertical: theme.spacing.m,
    },
    fieldGroup: {
        marginBottom: theme.spacing.m,
    },
    label: {
        fontSize: 14,
        color: theme.colors.textLight,
        marginBottom: 4,
    },
    value: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.text,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.m,
    },
    col: {
        flex: 1,
    },
    badge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
    },
    badgeText: {
        fontSize: 14,
        fontWeight: '600',
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tag: {
        backgroundColor: '#EFF6FF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    tagText: {
        color: '#1E40AF',
        fontSize: 14,
    },
    infoBox: {
        backgroundColor: '#EFF6FF',
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.m,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: theme.spacing.s,
    },
    infoText: {
        color: '#1E3A8A',
        fontSize: 14,
        flex: 1,
        lineHeight: 20,
    }
});
