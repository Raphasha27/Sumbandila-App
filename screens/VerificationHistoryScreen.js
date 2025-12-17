import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    RefreshControl,
    Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import VerificationHistoryService from '../services/VerificationHistoryService';

const categoryIcons = {
    education: { family: FontAwesome5, name: 'graduation-cap', color: '#3b82f6' },
    medical: { family: FontAwesome5, name: 'stethoscope', color: '#22c55e' },
    legal: { family: MaterialCommunityIcons, name: 'scale-balance', color: '#a855f7' },
};

export default function VerificationHistoryScreen({ navigation }) {
    const { theme } = useTheme();
    const [history, setHistory] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        const data = await VerificationHistoryService.getHistory();
        setHistory(data);
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await loadHistory();
        setRefreshing(false);
    }, []);

    const handleDelete = (id) => {
        Alert.alert(
            'Delete Entry',
            'Are you sure you want to remove this from your history?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        await VerificationHistoryService.removeFromHistory(id);
                        await loadHistory();
                    },
                },
            ]
        );
    };

    const handleClearAll = () => {
        Alert.alert(
            'Clear History',
            'Are you sure you want to clear all verification history?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Clear All',
                    style: 'destructive',
                    onPress: async () => {
                        await VerificationHistoryService.clearHistory();
                        setHistory([]);
                    },
                },
            ]
        );
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    };

    const filteredHistory = filter === 'all'
        ? history
        : history.filter(item => item.category === filter);

    const styles = createStyles(theme);

    const FilterButton = ({ value, label }) => (
        <TouchableOpacity
            style={[styles.filterButton, filter === value && styles.filterButtonActive]}
            onPress={() => setFilter(value)}
        >
            <Text style={[styles.filterText, filter === value && styles.filterTextActive]}>
                {label}
            </Text>
        </TouchableOpacity>
    );

    const HistoryItem = ({ item }) => {
        const categoryInfo = categoryIcons[item.category] || categoryIcons.education;
        const IconComponent = categoryInfo.family;

        return (
            <View style={styles.historyCard}>
                <View style={styles.historyHeader}>
                    <View style={[styles.categoryBadge, { backgroundColor: categoryInfo.color + '20' }]}>
                        <IconComponent name={categoryInfo.name} size={16} color={categoryInfo.color} />
                    </View>
                    <Text style={styles.timestamp}>{formatDate(item.timestamp)}</Text>
                </View>

                <Text style={styles.queryText}>{item.query}</Text>

                <View style={styles.resultRow}>
                    {item.isVerified ? (
                        <View style={styles.verifiedBadge}>
                            <Feather name="check-circle" size={14} color="#16a34a" />
                            <Text style={styles.verifiedText}>Verified</Text>
                        </View>
                    ) : (
                        <View style={styles.notFoundBadge}>
                            <Feather name="x-circle" size={14} color="#ef4444" />
                            <Text style={styles.notFoundText}>Not Found</Text>
                        </View>
                    )}

                    {item.result?.name && (
                        <Text style={styles.resultName} numberOfLines={1}>
                            {item.result.name}
                        </Text>
                    )}
                </View>

                <View style={styles.actionRow}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('PublicHome')}
                    >
                        <Feather name="refresh-cw" size={16} color={theme.colors.primary} />
                        <Text style={styles.actionText}>Re-verify</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleDelete(item.id)}
                    >
                        <Feather name="trash-2" size={16} color={theme.colors.error} />
                        <Text style={[styles.actionText, { color: theme.colors.error }]}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <LinearGradient
                colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.header}
            >
                <SafeAreaView edges={['top']}>
                    <View style={styles.headerContent}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.backButton}
                        >
                            <Feather name="arrow-left" size={24} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Verification History</Text>
                        {history.length > 0 ? (
                            <TouchableOpacity onPress={handleClearAll} style={styles.clearButton}>
                                <Feather name="trash-2" size={20} color="white" />
                            </TouchableOpacity>
                        ) : (
                            <View style={{ width: 40 }} />
                        )}
                    </View>
                </SafeAreaView>
            </LinearGradient>

            {/* Filter Tabs */}
            <View style={styles.filterContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <FilterButton value="all" label="All" />
                    <FilterButton value="education" label="Education" />
                    <FilterButton value="medical" label="Medical" />
                    <FilterButton value="legal" label="Legal" />
                </ScrollView>
            </View>

            {/* History List */}
            <ScrollView
                style={styles.content}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={theme.colors.primary}
                    />
                }
                showsVerticalScrollIndicator={false}
            >
                {filteredHistory.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Feather name="clock" size={64} color={theme.colors.textMuted} />
                        <Text style={styles.emptyTitle}>No History Yet</Text>
                        <Text style={styles.emptyDescription}>
                            Your verification searches will appear here
                        </Text>
                        <TouchableOpacity
                            style={styles.emptyButton}
                            onPress={() => navigation.navigate('PublicHome')}
                        >
                            <LinearGradient
                                colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.emptyButtonGradient}
                            >
                                <Text style={styles.emptyButtonText}>Start Verifying</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        <Text style={styles.resultCount}>
                            {filteredHistory.length} {filteredHistory.length === 1 ? 'result' : 'results'}
                        </Text>
                        {filteredHistory.map((item) => (
                            <HistoryItem key={item.id} item={item} />
                        ))}
                        <View style={styles.bottomPadding} />
                    </>
                )}
            </ScrollView>
        </View>
    );
}

const createStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        paddingBottom: 20,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? 40 : 0,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    clearButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterContainer: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    filterButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: theme.colors.background,
        marginRight: 8,
    },
    filterButtonActive: {
        backgroundColor: theme.colors.primary,
    },
    filterText: {
        fontSize: 14,
        fontWeight: '500',
        color: theme.colors.textSecondary,
    },
    filterTextActive: {
        color: 'white',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    resultCount: {
        fontSize: 14,
        color: theme.colors.textSecondary,
        marginBottom: 12,
    },
    historyCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        ...theme.shadows.default,
    },
    historyHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    categoryBadge: {
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timestamp: {
        fontSize: 12,
        color: theme.colors.textMuted,
    },
    queryText: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: 8,
    },
    resultRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#dcfce7',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    verifiedText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#16a34a',
    },
    notFoundBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#fee2e2',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    notFoundText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#ef4444',
    },
    resultName: {
        flex: 1,
        fontSize: 14,
        color: theme.colors.textSecondary,
    },
    actionRow: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        paddingTop: 12,
        gap: 20,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    actionText: {
        fontSize: 14,
        fontWeight: '500',
        color: theme.colors.primary,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 80,
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginTop: 20,
    },
    emptyDescription: {
        fontSize: 14,
        color: theme.colors.textSecondary,
        marginTop: 8,
        textAlign: 'center',
    },
    emptyButton: {
        marginTop: 24,
    },
    emptyButtonGradient: {
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 12,
    },
    emptyButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    bottomPadding: {
        height: 40,
    },
});
