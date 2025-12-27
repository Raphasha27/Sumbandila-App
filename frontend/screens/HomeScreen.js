import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, RefreshControl, ActivityIndicator, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import CategoryCard from '../components/CategoryCard';
import StatsCard from '../components/StatsCard';
import SearchBar from '../components/SearchBar';
import QuickActionButton from '../components/QuickActionButton';
import HomeAnalytics from '../components/HomeAnalytics';
import HomeNearby from '../components/HomeNearby';
import { getDashboardStats } from '../services/stats';
import axios from 'axios';
import config from '../config';

export default function HomeScreen({ navigation }) {
    const { theme, isDarkMode, toggleTheme } = useTheme();
    const [stats, setStats] = useState({ institutions: 0, professionals: 0, dataSources: 0 });
    const [scamData, setScamData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);

    const fetchStats = async (showLoader = true) => {
        try {
            if (showLoader) setLoading(true);
            setError(null);
            setError(null);
            
            const [statsData, scamRes] = await Promise.all([
                getDashboardStats(),
                axios.get(`${config.apiBase}/api/analytics/scams`).catch(err => ({ data: null }))
            ]);

            setStats(statsData);
            setScamData(scamRes.data);
        } catch (error) {
            console.log('Failed to fetch stats:', error);
            setError('Unable to load stats. Pull down to retry.');
            // Set default values on error
            setStats({ institutions: 0, professionals: 0, dataSources: 100 });
        } finally {
            if (showLoader) setLoading(false);
        }
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchStats(false);
        setRefreshing(false);
    }, []);

    useEffect(() => {
        fetchStats();
    }, []);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigation.navigate('Scanner', { 
                category: 'education', 
                initialQuery: searchQuery 
            });
        }
    };

    const navigateToVerification = (category) => {
        navigation.navigate('Scanner', { category }); 
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <StatusBar style="light" />
            <LinearGradient 
                colors={[theme.colors.gradientStart, theme.colors.gradientEnd]} 
                start={{ x: 0, y: 0 }} 
                end={{ x: 1, y: 0 }} 
                style={styles.header}
            >
                <SafeAreaView>
                    <View style={styles.headerContent}>
                        <View style={styles.headerTop}>
                            <View style={styles.titleRow}>
                                <Feather name="shield" size={32} color="white" />
                                <Text style={styles.headerTitle}>Sumbandila</Text>
                            </View>
                            <View style={styles.headerActions}>
                                <TouchableOpacity onPress={toggleTheme} style={styles.iconButton}>
                                    <Ionicons name={isDarkMode ? "sunny" : "moon"} size={24} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('RealScanner')} style={styles.iconButton}>
                                    <Ionicons name="qr-code-outline" size={24} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.iconButton}>
                                    <Feather name="user" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.headerSubtitle}>Verification in the palm of your hand</Text>
                    </View>
                </SafeAreaView>
            </LinearGradient>
            
            {/* Main Scrollable Content */}
            <ScrollView 
                contentContainerStyle={[styles.scrollContent, { paddingTop: 16 }]} 
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.colors.primary} />
                }
            >
                {/* Search Bar */}
                <SearchBar 
                    placeholder="Search institutions, doctors, lawyers..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSearch={handleSearch}
                />

                {/* Loading Indicator */}
                {loading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={theme.colors.primary} />
                        <Text style={[styles.loadingText, { color: theme.colors.textLight }]}>Loading dashboard...</Text>
                    </View>
                )}

                {/* Error Message */}
                {error && !loading && (
                    <View style={[styles.errorContainer, { backgroundColor: theme.colors.error + '20' }]}>
                        <Ionicons name="alert-circle-outline" size={24} color={theme.colors.error} />
                        <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text>
                    </View>
                )}

                {/* Fraud Alert Banner */}
                <TouchableOpacity 
                    style={[styles.fraudAlert, { backgroundColor: '#FEF2F2', borderColor: '#FECACA' }]}
                    onPress={() => navigation.navigate('CrimeAnalytics')}
                >
                    <View style={styles.fraudAlertContent}>
                        <Ionicons name="warning" size={24} color="#DC2626" />
                        <View style={styles.fraudAlertText}>
                            <Text style={[styles.fraudAlertTitle, { color: '#991B1B' }]}>Crime Alert: CBD Area</Text>
                            <Text style={[styles.fraudAlertBody, { color: '#B91C1C' }]}>High report of fake colleges. Tap to view map.</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#991B1B" />
                    </View>
                </TouchableOpacity>

                {/* Embedded Analytics */}
                <HomeAnalytics data={scamData} />
                
                {/* Embedded Nearby Places */}
                <View style={{ paddingHorizontal: 20 }}>
                    <HomeNearby navigation={navigation} />
                </View>

                {/* Quick Actions */}
                <View style={styles.quickActionsContainer}>
                    <Text style={[styles.sectionLabel, { color: theme.colors.text }]}>Quick Actions</Text>
                    <View style={styles.quickActionsRow}>
                        <QuickActionButton 
                            icon="stats-chart"
                            label="Crime Stats"
                            colors={['#EF4444', '#B91C1C']}
                            onPress={() => navigation.navigate('CrimeAnalytics')}
                        />
                        <QuickActionButton 
                            icon="location"
                            label="Nearby"
                            colors={['#3B82F6', '#2563EB']}
                            onPress={() => navigation.navigate('NearbyVerification')}
                        />
                        <QuickActionButton 
                            icon="qr-code-outline"
                            label="Scan QR"
                            colors={['#8B5CF6', '#7C3AED']}
                            onPress={() => navigation.navigate('RealScanner')}
                        />
                        <QuickActionButton 
                            icon="shield-checkmark-outline"
                            label="Verify"
                            colors={['#10B981', '#059669']}
                            onPress={() => navigation.navigate('Scanner')}
                        />
                        <QuickActionButton 
                            icon="alert-circle-outline"
                            label="Report"
                            colors={['#F59E0B', '#D97706']}
                            onPress={() => navigation.navigate('ReportFraud')}
                        />
                        <QuickActionButton 
                            icon="help-circle-outline"
                            label="Help"
                            colors={['#6366F1', '#4F46E5']}
                            onPress={() => navigation.navigate('ChatSupport')}
                        />
                    </View>
                </View>

                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Verification Categories</Text>
                <Text style={[styles.sectionSubtitle, { color: theme.colors.textLight }]}>Select a category to begin verification</Text>

                <View style={styles.categoriesContainer}>
                    <CategoryCard 
                        title="Education" 
                        subtitle="Schools, Colleges & Courses" 
                        icon="school-outline" 
                        color={theme.colors.education}
                        onPress={() => navigateToVerification('education')}
                    />
                    <CategoryCard 
                        title="Medical" 
                        subtitle="Doctors & Healthcare Professionals" 
                        icon="medkit-outline" 
                        color={theme.colors.medical}
                        onPress={() => navigateToVerification('medical')}
                    />
                     <CategoryCard 
                        title="Legal" 
                        subtitle="Lawyers & Legal Professionals" 
                        icon="scale-outline" 
                        color={theme.colors.legal}
                        onPress={() => navigateToVerification('legal')}
                    />
                </View>

                <View style={styles.statsContainer}>
                    <StatsCard 
                        icon="business-outline" 
                        number={stats.institutions.toLocaleString() + "+"} 
                        label="Registered Institutions" 
                        iconColor="#3B82F6"
                    />
                    <StatsCard 
                        icon="people-outline" 
                        number={stats.professionals.toLocaleString() + "+"} 
                        label="Verified Professionals" 
                        iconColor="#10B981"
                    />
                     <StatsCard 
                        icon="shield-checkmark-outline" 
                        number={stats.dataSources.toLocaleString() + "%"} 
                        label="Official Data Sources" 
                        iconColor="#F97316"
                    />
                </View>
            </ScrollView>

            <TouchableOpacity 
                style={styles.fab}
                onPress={() => navigation.navigate('ChatSupport')}
            >
                <LinearGradient
                    colors={[theme.colors.primary, theme.colors.secondary]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.fabGradient}
                >
                    <Ionicons name="chatbubbles-outline" size={28} color="white" />
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingBottom: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10,
    },
    headerSubtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 5,
    },
    headerActions: {
        flexDirection: 'row',
    },
    iconButton: {
        marginLeft: 15,
        padding: 5,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 104,
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 64,
        height: 64,
        borderRadius: 32,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    fabGradient: {
        flex: 1,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 90,
    },
    sectionSubtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 24,
    },
    categoriesContainer: {
        marginBottom: 24,
    },
    statsContainer: {
        marginBottom: 24,
    },
    loadingContainer: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 12,
        padding: 16,
        borderRadius: 12,
    },
    errorText: {
        flex: 1,
        marginLeft: 12,
        fontSize: 14,
    },
    quickActionsContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        marginBottom: 24,
    },
    sectionLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    quickActionsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    fraudAlert: {
        marginHorizontal: 20,
        marginBottom: 16,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderLeftWidth: 4, 
    },
    fraudAlertContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fraudAlertText: {
        flex: 1,
        marginLeft: 12,
    },
    fraudAlertTitle: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 2,
    },
    fraudAlertBody: {
        fontSize: 12,
    },
});
