import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function StudentDashboard({ navigation, route }) {
    const { theme, isDarkMode } = useTheme();
    const { user } = route.params || {};

    const getTimeGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <StatusBar barStyle="light-content" />
            <LinearGradient colors={[theme.colors.primary, theme.colors.primary]} style={styles.headerBackground}>
                <View style={styles.headerContent}>
                    <View>
                        <Text style={styles.greetingSub}>{getTimeGreeting()},</Text>
                        <Text style={styles.greetingMain}>{user?.name || 'Student'}</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.replace('Login')} style={styles.logoutBtn}>
                        <Ionicons name="log-out-outline" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.contentContainer}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
                    <View style={styles.grid}>
                        <TouchableOpacity style={[styles.actionCard, { backgroundColor: theme.colors.surface }]}>
                            <LinearGradient colors={['#EC4899', '#DB2777']} style={styles.iconBox}>
                                <Ionicons name="calendar" size={24} color="white" />
                            </LinearGradient>
                            <Text style={[styles.actionText, { color: theme.colors.text }]}>Events</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.actionCard, { backgroundColor: theme.colors.surface }]}>
                            <LinearGradient colors={['#10B981', '#059669']} style={styles.iconBox}>
                                <Ionicons name="stats-chart" size={24} color="white" />
                            </LinearGradient>
                            <Text style={[styles.actionText, { color: theme.colors.text }]}>Grades</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('ChatSupport')} style={[styles.actionCard, { backgroundColor: theme.colors.surface }]}>
                            <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.iconBox}>
                                <Ionicons name="chatbubbles" size={24} color="white" />
                            </LinearGradient>
                            <Text style={[styles.actionText, { color: theme.colors.text }]}>Support</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.sectionTitle, { color: theme.colors.text, marginTop: 24 }]}>Recent Activities</Text>
                    <View style={[styles.resourceCard, { backgroundColor: theme.colors.surface }]}>
                        <View style={[styles.resourceIcon, { backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : '#E0E7FF' }]}>
                            <MaterialCommunityIcons name="file-document" size={24} color={theme.colors.primary} />
                        </View>
                        <View style={styles.resourceInfo}>
                            <Text style={[styles.resourceTitle, { color: theme.colors.text }]}>Academic Transcript</Text>
                            <Text style={[styles.resourceType, { color: theme.colors.textLight }]}>PDF Document</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={theme.colors.textLight} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    headerBackground: { paddingTop: 60, paddingBottom: 40, paddingHorizontal: 24, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
    headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    greetingSub: { fontSize: 16, color: 'rgba(255,255,255,0.8)', fontWeight: '500' },
    greetingMain: { fontSize: 28, color: 'white', fontWeight: 'bold' },
    logoutBtn: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 10, borderRadius: 12 },
    contentContainer: { paddingHorizontal: 20 },
    scrollContent: { paddingBottom: 40 },
    sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16, marginTop: 24 },
    grid: { flexDirection: 'row', justifyContent: 'space-between' },
    actionCard: { width: '31%', paddingVertical: 20, borderRadius: 20, alignItems: 'center', elevation: 2 },
    iconBox: { width: 50, height: 50, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
    actionText: { fontWeight: '600', fontSize: 14 },
    resourceCard: { flexDirection: 'row', padding: 16, borderRadius: 16, marginBottom: 12, alignItems: 'center', elevation: 2 },
    resourceIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    resourceInfo: { flex: 1 },
    resourceTitle: { fontWeight: '600', fontSize: 16, marginBottom: 4 },
    resourceType: { fontSize: 13 }
});

