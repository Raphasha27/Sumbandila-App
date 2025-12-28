import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import config from '../config';

export default function CommunityAlertsScreen({ navigation }) {
    const { theme, isDarkMode } = useTheme();
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [newAlert, setNewAlert] = useState({ title: '', location: '', description: '', category: 'scam' });
    const [refreshing, setRefreshing] = useState(false);

    const categories = [
        { id: 'scam', label: 'Scam', icon: 'exclamation-circle', color: '#EF4444' },
        { id: 'theft', label: 'Theft', icon: 'hand-holding-usd', color: '#F59E0B' },
        { id: 'suspicious', label: 'Suspicious', icon: 'user-secret', color: '#3B82F6' },
        { id: 'other', label: 'Other', icon: 'info-circle', color: '#6B7280' }
    ];

    const fetchAlerts = async () => {
        try {
            const res = await axios.get(`${config.apiBase}/api/alerts`);
            setAlerts(res.data);
        } catch (error) {
            console.log('Error fetching alerts:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchAlerts();
    }, []);

    const handlePostAlert = async () => {
        if (!newAlert.title || !newAlert.description || !newAlert.location) {
            Alert.alert('Missing Fields', 'Please fill in all fields.');
            return;
        }

        try {
            await axios.post(`${config.apiBase}/api/alerts`, newAlert);
            Alert.alert('Success', 'Alert posted to the community!');
            setModalVisible(false);
            setNewAlert({ title: '', location: '', description: '', category: 'scam' });
            fetchAlerts();
        } catch (error) {
            Alert.alert('Error', 'Failed to post alert.');
        }
    };

    const renderAlert = ({ item }) => {
        const cat = categories.find(c => c.id === item.category) || categories[3];
        const date = new Date(item.created_at).toLocaleDateString();

        return (
            <View style={[styles.card, { backgroundColor: theme.colors.surface, shadowColor: theme.colors.shadow }]}>
                <View style={styles.cardHeader}>
                    <View style={[styles.categoryBadge, { backgroundColor: cat.color + '20' }]}>
                        <FontAwesome5 name={cat.icon} size={12} color={cat.color} />
                        <Text style={[styles.categoryText, { color: cat.color }]}>{cat.label}</Text>
                    </View>
                    <Text style={[styles.date, { color: theme.colors.textSecondary }]}>{date}</Text>
                </View>
                <Text style={[styles.title, { color: theme.colors.text }]}>{item.title}</Text>
                <Text style={[styles.description, { color: theme.colors.textSecondary }]}>{item.description}</Text>
                <View style={styles.locationRow}>
                    <Ionicons name="location-outline" size={16} color={theme.colors.textSecondary} />
                    <Text style={[styles.location, { color: theme.colors.textSecondary }]}>{item.location}</Text>
                </View>
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
                    <Text style={styles.headerTitle}>Community Alerts</Text>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addBtn}>
                        <Ionicons name="add" size={24} color={theme.colors.primary} />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            {loading ? (
                <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    data={alerts}
                    renderItem={renderAlert}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.list}
                    refreshing={refreshing}
                    onRefresh={() => { setRefreshing(true); fetchAlerts(); }}
                    ListEmptyComponent={<Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>No alerts found.</Text>}
                />
            )}

            {/* Post Modal */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
                        <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Report Incident</Text>
                        
                        <TextInput 
                            placeholder="Title (e.g., Fake Agent)" 
                            style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]} 
                            placeholderTextColor={theme.colors.textLight}
                            value={newAlert.title}
                            onChangeText={t => setNewAlert({...newAlert, title: t})}
                        />
                         <TextInput 
                            placeholder="Location (e.g., Hatfield Plaza)" 
                            style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]} 
                            placeholderTextColor={theme.colors.textLight}
                            value={newAlert.location}
                            onChangeText={t => setNewAlert({...newAlert, location: t})}
                        />
                        <TextInput 
                            placeholder="Description" 
                            multiline
                            style={[styles.input, styles.textArea, { color: theme.colors.text, borderColor: theme.colors.border }]} 
                            placeholderTextColor={theme.colors.textLight}
                            value={newAlert.description}
                            onChangeText={t => setNewAlert({...newAlert, description: t})}
                        />

                        {/* Category Selector */}
                        <View style={styles.catRow}>
                            {categories.map(cat => (
                                <TouchableOpacity 
                                    key={cat.id} 
                                    style={[styles.catOption, newAlert.category === cat.id && { backgroundColor: cat.color + '30', borderColor: cat.color }]}
                                    onPress={() => setNewAlert({...newAlert, category: cat.id})}
                                >
                                    <View style={[styles.dot, { backgroundColor: cat.color }]} />
                                    <Text style={{ color: theme.colors.text, fontSize: 12 }}>{cat.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={styles.modalActions}>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelBtn}>
                                <Text style={{ color: theme.colors.textSecondary }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handlePostAlert} style={[styles.submitBtn, { backgroundColor: theme.colors.primary }]}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Post Alert</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { padding: 20, paddingTop: 50, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
    headerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: 'white' },
    backBtn: { padding: 5 },
    addBtn: { backgroundColor: 'white', padding: 8, borderRadius: 12 },
    list: { padding: 20 },
    card: { padding: 16, borderRadius: 16, marginBottom: 16, elevation: 3, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    categoryBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    categoryText: { fontSize: 12, fontWeight: 'bold', marginLeft: 4 },
    date: { fontSize: 12 },
    title: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
    description: { fontSize: 14, marginBottom: 8, lineHeight: 20 },
    locationRow: { flexDirection: 'row', alignItems: 'center' },
    location: { fontSize: 12, marginLeft: 4 },
    emptyText: { textAlign: 'center', marginTop: 40, fontSize: 16 },
    
    modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
    modalContent: { borderRadius: 24, padding: 24 },
    modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
    input: { borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 12, fontSize: 16 },
    textArea: { height: 100, textAlignVertical: 'top' },
    modalActions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 16 },
    cancelBtn: { padding: 12, marginRight: 12 },
    submitBtn: { padding: 12, paddingHorizontal: 24, borderRadius: 12 },
    catRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
    catOption: { flexDirection: 'row', alignItems: 'center', padding: 6, borderWidth: 1, borderColor: 'transparent', borderRadius: 8 },
    dot: { width: 8, height: 8, borderRadius: 4, marginRight: 4 }
});
