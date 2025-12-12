import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import config from '../config';
import { theme } from '../theme';

export default function StudentDashboard({ navigation, route }) {
    const { user } = route.params || {};
    const [resources, setResources] = useState([]);
    const apiBase = config.apiBase;

    useEffect(() => {
        fetch(`${apiBase}/api/resources`)
            .then(res => res.json())
            .then(data => setResources(data))
            .catch(err => console.error(err));
    }, []);

    const getTimeGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={[theme.colors.primary, theme.colors.primaryDark]}
                style={styles.headerBackground}
            >
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

            <View style={styles.contentContainer}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                    {/* Quick Actions Grid */}
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.grid}>
                        <TouchableOpacity onPress={() => navigation.navigate('Events')} style={styles.actionCard}>
                            <LinearGradient colors={['#EC4899', '#DB2777']} style={styles.iconBox}>
                                <Ionicons name="calendar" size={24} color="white" />
                            </LinearGradient>
                            <Text style={styles.actionText}>Calendar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionCard}>
                            <LinearGradient colors={['#10B981', '#059669']} style={styles.iconBox}>
                                <Ionicons name="stats-chart" size={24} color="white" />
                            </LinearGradient>
                            <Text style={styles.actionText}>Grades</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Chat', { user })} style={styles.actionCard}>
                            <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.iconBox}>
                                <Ionicons name="chatbubbles" size={24} color="white" />
                            </LinearGradient>
                            <Text style={styles.actionText}>Chat</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Upcoming Event Hero Card */}
                    <Text style={styles.sectionTitle}>Up Next</Text>
                    <TouchableOpacity style={styles.heroCard}>
                        <LinearGradient
                            colors={[theme.colors.secondary, '#BE185D']}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                            style={styles.heroGradient}
                        >
                            <View style={styles.heroContent}>
                                <View style={styles.dateBox}>
                                    <Text style={styles.dateDay}>12</Text>
                                    <Text style={styles.dateMonth}>DEC</Text>
                                </View>
                                <View style={styles.eventInfo}>
                                    <Text style={styles.heroTitle}>Science Fair Registration</Text>
                                    <View style={styles.heroDetailRow}>
                                        <Ionicons name="time-outline" size={16} color="rgba(255,255,255,0.9)" />
                                        <Text style={styles.heroDetailText}>09:00 AM</Text>
                                    </View>
                                    <View style={styles.heroDetailRow}>
                                        <Ionicons name="location-outline" size={16} color="rgba(255,255,255,0.9)" />
                                        <Text style={styles.heroDetailText}>Main Hall</Text>
                                    </View>
                                </View>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Resources List */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Latest Resources</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    {resources.map((item, index) => (
                        <TouchableOpacity key={item.id} style={styles.resourceCard} activeOpacity={0.7}>
                            <View style={[styles.resourceIcon, { backgroundColor: index % 2 === 0 ? '#E0E7FF' : '#FCE7F3' }]}>
                                <MaterialCommunityIcons
                                    name={item.type === 'PDF' ? 'file-pdf-box' : item.type === 'Video' ? 'play-circle' : 'file-document'}
                                    size={24}
                                    color={index % 2 === 0 ? theme.colors.primary : theme.colors.secondary}
                                />
                            </View>
                            <View style={styles.resourceInfo}>
                                <Text style={styles.resourceTitle}>{item.title}</Text>
                                <Text style={styles.resourceType}>{item.type}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
                        </TouchableOpacity>
                    ))}

                    <View style={{ height: 40 }} />
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    headerBackground: {
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 24,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    greetingSub: { fontSize: 16, color: 'rgba(255,255,255,0.8)', fontWeight: '500' },
    greetingMain: { fontSize: 28, color: 'white', fontWeight: 'bold' },
    logoutBtn: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: 10,
        borderRadius: 12,
    },
    contentContainer: {
        flex: 1,
        marginTop: -20,
        paddingHorizontal: 20,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: theme.colors.text,
        marginBottom: 16,
        marginTop: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 16,
    },
    seeAll: {
        color: theme.colors.primary,
        fontWeight: '600',
    },
    grid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionCard: {
        backgroundColor: 'white',
        width: '31%',
        paddingVertical: 20,
        borderRadius: 20,
        alignItems: 'center',
        ...theme.shadows.default,
    },
    iconBox: {
        width: 50,
        height: 50,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    actionText: {
        fontWeight: '600',
        color: theme.colors.text,
        fontSize: 14,
    },
    heroCard: {
        borderRadius: 24,
        overflow: 'hidden',
        ...theme.shadows.hover,
    },
    heroGradient: {
        padding: 20,
    },
    heroContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateBox: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 16,
        padding: 12,
        alignItems: 'center',
        marginRight: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    dateDay: { fontSize: 24, fontWeight: 'bold', color: 'white' },
    dateMonth: { fontSize: 12, color: 'rgba(255,255,255,0.9)', fontWeight: '600' },
    eventInfo: { flex: 1 },
    heroTitle: { fontSize: 18, fontWeight: 'bold', color: 'white', marginBottom: 8 },
    heroDetailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
    heroDetailText: { color: 'rgba(255,255,255,0.9)', fontSize: 14, marginLeft: 6 },
    resourceCard: {
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        alignItems: 'center',
        ...theme.shadows.default,
    },
    resourceIcon: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    resourceInfo: { flex: 1 },
    resourceTitle: { fontWeight: '600', color: theme.colors.text, fontSize: 16, marginBottom: 4 },
    resourceType: { color: theme.colors.textLight, fontSize: 13 },
});
