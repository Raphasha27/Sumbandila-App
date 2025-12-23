import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import config from '../config';

const screenWidth = Dimensions.get('window').width;

export default function CrimeAnalyticsScreen({ navigation }) {
    const { theme } = useTheme();
    const [loading, setLoading] = useState(true);
    const [scamData, setScamData] = useState(null);
    const [provincialData, setProvincialData] = useState([]);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const [scamRes, provRes] = await Promise.all([
                axios.get(`${config.apiBase}/api/analytics/scams`),
                axios.get(`${config.apiBase}/api/analytics/provinces`)
            ]);
            setScamData(scamRes.data);
            setProvincialData(provRes.data);
        } catch (error) {
            console.error('Analytics fetch error:', error);
            Alert.alert('Error', 'Failed to load analytics data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalytics();
    }, []);

    if (loading) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={[styles.loadingText, { color: theme.colors.text }]}>Loading Analytics...</Text>
            </View>
        );
    }

    const chartConfig = {
        backgroundGradientFrom: theme.colors.card,
        backgroundGradientTo: theme.colors.card,
        color: (opacity = 1) => `rgba(249, 115, 22, ${opacity})`, // Primary color
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false,
        labelColor: (opacity = 1) => theme.colors.textLight,
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <LinearGradient
                colors={[theme.colors.error, '#DC2626']}
                style={styles.header}
            >
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Crime Analytics</Text>
                    <Text style={styles.headerSubtitle}>Real-time Fraud & Scam Monitoring</Text>
                </View>
            </LinearGradient>

            <View style={styles.content}>
                {/* Alert Banner */}
                <View style={[styles.alertCard, { backgroundColor: '#FEF2F2', borderColor: '#FECACA' }]}>
                    <Ionicons name="warning" size={24} color="#DC2626" />
                    <View style={styles.alertTextContainer}>
                        <Text style={[styles.alertTitle, { color: '#991B1B' }]}>High Alert: Gauteng</Text>
                        <Text style={[styles.alertBody, { color: '#B91C1C' }]}>Spike in fake institution registrations reported in Johannesburg area.</Text>
                    </View>
                </View>

                {/* Fraud Trends */}
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Fraud Trends (6 Months)</Text>
                <LineChart
                    data={{
                        labels: scamData?.trends?.labels || [],
                        datasets: [{ data: scamData?.trends?.datasets[0]?.data || [] }]
                    }}
                    width={screenWidth - 32}
                    height={220}
                    chartConfig={chartConfig}
                    bezier
                    style={styles.chart}
                />

                {/* Provincial Breakdown */}
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Reports by Province</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <BarChart
                        data={{
                            labels: provincialData.slice(0, 5).map(p => p.province.substring(0, 3)),
                            datasets: [{ data: provincialData.slice(0, 5).map(p => p.fraud_reports_count) }]
                        }}
                        width={screenWidth - 32}
                        height={220}
                        yAxisLabel=""
                        chartConfig={{
                            ...chartConfig,
                            color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`, // Red for danger
                        }}
                        style={styles.chart}
                    />
                </ScrollView>

                {/* Fraud Types */}
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Fraud Types</Text>
                <PieChart
                    data={scamData?.fraudTypes || []}
                    width={screenWidth - 32}
                    height={220}
                    chartConfig={chartConfig}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                    absolute
                />

                {/* Recent Reports List */}
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Reports</Text>
                {scamData?.recentReports?.map((report, index) => (
                    <View key={index} style={[styles.reportCard, { backgroundColor: theme.colors.card }]}>
                        <View style={styles.reportHeader}>
                            <Text style={[styles.reportType, { color: theme.colors.error }]}>{report.fraud_type}</Text>
                            <Text style={[styles.reportDate, { color: theme.colors.textLight }]}>
                                {new Date(report.created_at).toLocaleDateString()}
                            </Text>
                        </View>
                        <Text style={[styles.reportEntity, { color: theme.colors.text }]}>{report.entity_name}</Text>
                        <Text style={[styles.reportDesc, { color: theme.colors.textLight }]} numberOfLines={2}>
                            {report.description}
                        </Text>
                        <View style={styles.locationBadge}>
                            <Ionicons name="location-outline" size={12} color={theme.colors.textLight} />
                            <Text style={[styles.locationText, { color: theme.colors.textLight }]}>
                                {report.city}, {report.province}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
    },
    header: {
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 14,
        marginTop: 5,
    },
    content: {
        padding: 16,
    },
    alertCard: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 24,
    },
    alertTextContainer: {
        marginLeft: 12,
        flex: 1,
    },
    alertTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    alertBody: {
        fontSize: 14,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 8,
    },
    chart: {
        marginBottom: 24,
        borderRadius: 16,
    },
    reportCard: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    reportHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    reportType: {
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    reportDate: {
        fontSize: 12,
    },
    reportEntity: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    reportDesc: {
        fontSize: 14,
        marginBottom: 8,
    },
    locationBadge: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        fontSize: 12,
        marginLeft: 4,
    },
});
