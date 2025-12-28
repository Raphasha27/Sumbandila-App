import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Share, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { CacheService } from '../services/cache';

export default function VerificationHistoryScreen({ navigation }) {
    const { theme, isDarkMode } = useTheme();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        setLoading(true);
        const data = await CacheService.getVerificationHistory();
        setHistory(data);
        setLoading(false);
    };

    const shareResult = async (item) => {
        try {
            const statusIcon = item.status ? '✅' : '⚠️';
            const message = `${statusIcon} Sumbandila Verification Result\n\n` +
                `Name: ${item.name}\n` +
                `Type: ${item.type}\n` +
                `Status: ${item.status ? 'Verified' : 'Not Verified'}\n` +
                `Details: ${item.details || 'N/A'}\n\n` +
                `Verified via Sumbandila App`;

            await Share.share({ message });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const clearHistory = () => {
        Alert.alert(
            'Clear History',
            'Are you sure you want to clear all verification history?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Clear',
                    style: 'destructive',
                    onPress: async () => {
                        await CacheService.clearVerificationHistory();
                        setHistory([]);
                    },
                },
            ]
        );
    };

    const renderItem = ({ item }) => {
        const date = new Date(item.timestamp).toLocaleDateString();
        const time = new Date(item.timestamp).toLocaleTimeString();

        return (
            <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
                <View style={styles.cardHeader}>
                    <View style={[styles.statusBadge, { backgroundColor: item.status ? '#10B98120' : '#EF444420' }]}>
                        <Ionicons name={item.status ? 'checkmark-circle' : 'alert-circle'} size={16} color={item.status ? '#10B981' : '#EF4444'} />
                        <Text style={[styles.statusText, { color: item.status ? '#10B981' : '#EF4444' }]}>
                            {item.status ? 'Verified' : 'Not Verified'}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => shareResult(item)}>
                        <Ionicons name="share-outline" size={20} color={theme.colors.primary} />
                    </TouchableOpacity>
                </View>
                
                <Text style={[styles.name, { color: theme.colors.text }]}>{item.name}</Text>
                <Text style={[styles.type, { color: theme.colors.textSecondary }]}>{item.type}</Text>
                
                {item.details && (
                    <Text style={[styles.details, { color: theme.colors.textLight }]}>{item.details}</Text>
                )}
                
                <Text style={[styles.time, { color: theme.colors.textLight }]}>
                    {date} at {time}
                </Text>
            </View>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <LinearGradient colors={[theme.colors.primary, theme.colors.secondary]} style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Verification History</Text>
                    <TouchableOpacity onPress={clearHistory} style={styles.clearBtn}>
                        <Ionicons name="trash-outline" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            {loading ? (
                <View style={styles.emptyContainer}>
                    <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>Loading...</Text>
                </View>
            ) : history.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="folder-open-outline" size={64} color={theme.colors.textLight} />
                    <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>No verification history yet</Text>
                    <Text style={[styles.emptySubtext, { color: theme.colors.textLight }]}>
                        Your verification results will appear here
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={history}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { padding: 20, paddingTop: 50 },
    headerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: 'white', flex: 1, textAlign: 'center' },
    backBtn: { padding: 5 },
    clearBtn: { padding: 5 },
    list: { padding: 20 },
    card: { padding: 16, borderRadius: 16, marginBottom: 16, borderWidth: 1 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12 },
    statusText: { fontSize: 12, fontWeight: 'bold', marginLeft: 4 },
    name: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
    type: { fontSize: 14, textTransform: 'capitalize', marginBottom: 8 },
    details: { fontSize: 13, marginBottom: 8, lineHeight: 18 },
    time: { fontSize: 11 },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
    emptyText: { fontSize: 18, fontWeight: '600', marginTop: 16, marginBottom: 8 },
    emptySubtext: { fontSize: 14, textAlign: 'center' },
});
