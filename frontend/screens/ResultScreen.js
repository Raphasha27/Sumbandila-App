import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import GradientHeader from '../components/GradientHeader';
import { Ionicons } from '@expo/vector-icons';

export default function ResultScreen({ route, navigation }) {
    const { theme, isDarkMode } = useTheme();
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
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
             <GradientHeader title="Sumbandila" showBack={true} onBack={() => navigation.goBack()} />
             
             <ScrollView contentContainerStyle={styles.content}>
                 
                <View style={[styles.card, theme.shadows.default, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
                    <View style={styles.headerRow}>
                        <View style={[styles.iconContainer, { borderColor: isVerified ? theme.colors.success : theme.colors.error }]}>
                            <Ionicons 
                                name={isVerified ? "checkmark-circle-outline" : "close-circle-outline"} 
                                size={40} 
                                color={isVerified ? theme.colors.success : theme.colors.error} 
                            />
                        </View>
                        <View style={styles.headerText}>
                            <Text style={[styles.statusTitle, { color: theme.colors.text }]}>{isVerified ? 'Verified & Registered' : 'Registration Not Found'}</Text>
                            <Text style={[styles.statusSubtitle, { color: theme.colors.textLight }]}>{isVerified ? 'Valid registration confirmed' : 'This entity does not appear in our registry'}</Text>
                        </View>
                    </View>

                    <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

                    <View style={styles.fieldGroup}>
                        <Text style={[styles.label, { color: theme.colors.textLight }]}>Name</Text>
                        <Text style={[styles.value, { color: theme.colors.text }]}>{data.name}</Text>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Text style={[styles.label, { color: theme.colors.textLight }]}>Registration Number</Text>
                            <Text style={[styles.value, { color: theme.colors.text }]}>{data.regNumber || 'N/A'}</Text>
                        </View>
                        <View style={styles.col}>
                            <Text style={[styles.label, { color: theme.colors.textLight }]}>Status</Text>
                            <View style={[styles.badge, { backgroundColor: isVerified ? (isDarkMode ? 'rgba(21, 128, 61, 0.2)' : '#DCFCE7') : (isDarkMode ? 'rgba(185, 27, 27, 0.2)' : '#FEE2E2') }]}>
                                <Text style={[styles.badgeText, { color: isVerified ? '#10B981' : '#EF4444' }]}>
                                    {isVerified ? 'Registered' : 'Unregistered'}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={[styles.label, { color: theme.colors.textLight }]}>Accreditation</Text>
                        <Text style={[styles.value, { color: theme.colors.text }]}>CHE Accredited</Text>
                    </View>

                    <View style={styles.fieldGroup}>
                        <Text style={[styles.label, { color: theme.colors.textLight }]}>Accredited Courses</Text>
                        <View style={styles.tags}>
                            <View style={[styles.tag, { backgroundColor: isDarkMode ? theme.colors.background : '#EFF6FF' }]}><Text style={[styles.tagText, { color: isDarkMode ? theme.colors.primary : '#1E40AF' }]}>Business Management</Text></View>
                            <View style={[styles.tag, { backgroundColor: isDarkMode ? theme.colors.background : '#EFF6FF' }]}><Text style={[styles.tagText, { color: isDarkMode ? theme.colors.primary : '#1E40AF' }]}>IT</Text></View>
                            <View style={[styles.tag, { backgroundColor: isDarkMode ? theme.colors.background : '#EFF6FF' }]}><Text style={[styles.tagText, { color: isDarkMode ? theme.colors.primary : '#1E40AF' }]}>Marketing</Text></View>
                        </View>
                    </View>

                     <View style={styles.fieldGroup}>
                        <Text style={[styles.label, { color: theme.colors.textLight }]}>Valid Until</Text>
                        <Text style={[styles.value, { color: theme.colors.text }]}>2026-12-31</Text>
                    </View>

                    <View style={[styles.infoBox, { backgroundColor: isDarkMode ? theme.colors.background : '#EFF6FF' }]}>
                         <Ionicons name="information-circle-outline" size={24} color={isDarkMode ? theme.colors.primary : '#1E40AF'} style={{marginRight: 8}} />
                         <Text style={[styles.infoText, { color: isDarkMode ? theme.colors.text : '#1E3A8A' }]}>
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
    },
    content: {
        padding: 16,
    },
    card: {
        borderRadius: 16,
        padding: 24,
        borderWidth: 1,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    headerText: {
        flex: 1,
    },
    statusTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    statusSubtitle: {
        fontSize: 14,
    },
    divider: {
        height: 1,
        marginVertical: 16,
    },
    fieldGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        marginBottom: 4,
    },
    value: {
        fontSize: 18,
        fontWeight: '600',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
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
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    tagText: {
        fontSize: 14,
    },
    infoBox: {
        padding: 16,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 8,
    },
    infoText: {
        fontSize: 14,
        flex: 1,
        lineHeight: 20,
    }
});

