import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Alert, Modal, TextInput } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function AdminDashboard({ navigation, route }) {
    const { theme, isDarkMode } = useTheme();
    const { user } = route.params || {};
    const [activeTab, setActiveTab] = useState('overview'); // overview, institutions, professionals
    const [modalVisible, setModalVisible] = useState(false);
    const [newItemType, setNewItemType] = useState('institution'); // institution or professional
    const [newItemName, setNewItemName] = useState('');
    const [newItemReg, setNewItemReg] = useState('');
    const [newItemCourse, setNewItemCourse] = useState('');

    // Mock Data for Admin
    const stats = {
        institutions: 2450,
        professionals: 45200,
        pending: 12,
        flagged: 5
    };

    const recentActions = [
        { id: 1, action: 'Added Institution', target: 'Pretoria Technical College', time: '2 mins ago', icon: 'business' },
        { id: 2, action: 'Verified Professional', target: 'Dr. Sarah Smith', time: '15 mins ago', icon: 'person' },
        { id: 3, action: 'Flagged Profile', target: 'Fake University Inc.', time: '1 hour ago', icon: 'alert-circle', color: '#EF4444' },
    ];

    const handleAddItem = () => {
        setModalVisible(true);
    };

    const StatusCard = ({ title, value, icon, color }) => (
        <View style={[styles.statCard, { backgroundColor: theme.colors.surface }]}>
            <View style={[styles.iconBox, { backgroundColor: color + '20' }]}>
                <Ionicons name={icon} size={24} color={color} />
            </View>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{value}</Text>
            <Text style={[styles.statTitle, { color: theme.colors.textSecondary }]}>{title}</Text>
        </View>
    );

    const handleSave = async () => {
        if (!newItemType || !newItemName || ((newItemType !== 'certificate' && !newItemReg) || (newItemType === 'certificate' && (!newItemReg || !newItemCourse)))) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        try {
            if (newItemType === 'certificate') {
                 // Call the backend endpoint
                 /*
                 await fetch(`${config.apiBase}/api/certify`, {
                     method: 'POST',
                     body: JSON.stringify({ studentName: newItemName, studentId: newItemReg, course: newItemCourse })
                 });
                 */
                // SIMULATION
                Alert.alert('Success', `Digital Certificate Issued for ${newItemName}\n\nHash: a3f9...8d2\nSigned: YES`);
            } else {
                Alert.alert('Success', `New ${newItemType} "${newItemName}" added to the National Registry.`);
            }

            setModalVisible(false);
            setNewItemName('');
            setNewItemReg('');
            setNewItemCourse('');
            
        } catch (error) {
            Alert.alert('Error', 'Failed to add record');
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            {/* Header */}
            <LinearGradient
                colors={[theme.colors.surface, theme.colors.surface]}
                style={styles.header}
            >
                <View style={styles.headerTop}>
                    <View>
                        <Text style={[styles.roleLabel, { color: theme.colors.primary }]}>SUPER ADMIN</Text>
                        <Text style={[styles.greeting, { color: theme.colors.text }]}>Dashboard</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.replace('Login')} style={styles.logoutBtn}>
                        <Ionicons name="log-out-outline" size={24} color={theme.colors.error} />
                    </TouchableOpacity>
                </View>

                {/* Quick Stats */}
                <View style={styles.statsGrid}>
                    <StatusCard title="Institutions" value="2,451" icon="school" color="#3B82F6" />
                    <StatusCard title="Professionals" value="45.2k" icon="medkit" color="#10B981" />
                    <StatusCard title="Pending" value="12" icon="time" color="#F59E0B" />
                    <StatusCard title="Flagged" value="5" icon="warning" color="#EF4444" />
                </View>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Actions */}
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
                <View style={styles.actionRow}>
                    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.colors.primary }]} onPress={() => { setNewItemType('institution'); handleAddItem(); }}>
                        <Ionicons name="add-circle" size={20} color="white" />
                        <Text style={styles.actionBtnText}>Add Institution</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.colors.secondary }]} onPress={() => { setNewItemType('professional'); handleAddItem(); }}>
                        <Ionicons name="person-add" size={20} color="white" />
                        <Text style={styles.actionBtnText}>Add Professional</Text>
                    </TouchableOpacity>
                </View>

                {/* NEW: Issue Certificate Action */}
                <View style={[styles.actionRow, { marginTop: 12 }]}>
                    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#8B5CF6', flexDirection: 'row', justifyContent: 'center' }]} onPress={() => { setNewItemType('certificate'); handleAddItem(); }}>
                        <Ionicons name="ribbon" size={20} color="white" style={{ marginRight: 8 }} />
                        <Text style={styles.actionBtnText}>Issue Digital Credential</Text>
                    </TouchableOpacity>
                </View>

                {/* Recent Activity */}
                <Text style={[styles.sectionTitle, { color: theme.colors.text, marginTop: 24 }]}>Recent Audit Logs</Text>
                {recentActions.map(item => (
                    <View key={item.id} style={[styles.logItem, { backgroundColor: theme.colors.surface }]}>
                        <Ionicons name={item.icon} size={24} color={item.color || theme.colors.textSecondary} />
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={[styles.logAction, { color: theme.colors.text }]}>{item.action}</Text>
                            <Text style={[styles.logTarget, { color: theme.colors.textSecondary }]}>{item.target}</Text>
                        </View>
                        <Text style={[styles.logTime, { color: theme.colors.textMuted }]}>{item.time}</Text>
                    </View>
                ))}
            </ScrollView>

            {/* Simple Modal for Adding Data */}
            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
                        <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                            {newItemType === 'certificate' ? 'Issue Digital Certificate' : `Add New ${newItemType === 'institution' ? 'Institution' : 'Professional'}`}
                        </Text>
                        
                        <TextInput 
                            placeholder={newItemType === 'institution' ? "Institution Name" : (newItemType === 'certificate' ? "Student Full Name" : "Professional Full Name")}
                            placeholderTextColor={theme.colors.textMuted}
                            style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
                            value={newItemName}
                            onChangeText={setNewItemName}
                        />

                        {/* ID / Reg Number Input */}
                        <TextInput 
                            placeholder={newItemType === 'certificate' ? "Student Identity Number" : "Registration Number"}
                            placeholderTextColor={theme.colors.textMuted}
                            style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
                            value={newItemReg}
                            onChangeText={setNewItemReg}
                        />

                        {/* Course Name Input (Only for Certificates) */}
                        {newItemType === 'certificate' && (
                             <TextInput 
                                placeholder="Course / Qualification Name"
                                placeholderTextColor={theme.colors.textMuted}
                                style={[styles.input, { color: theme.colors.text, borderColor: theme.colors.border }]}
                                value={newItemCourse}
                                onChangeText={setNewItemCourse}
                            />
                        )}
                        
                        <View style={styles.modalActions}>
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ padding: 12 }}>
                                <Text style={{ color: theme.colors.textSecondary }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSave} style={[styles.saveBtn, { backgroundColor: theme.colors.primary }]}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                    {newItemType === 'certificate' ? 'Issue & Sign' : 'Save Record'}
                                </Text>
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
    header: { padding: 24, paddingTop: 60, paddingBottom: 24, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
    headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
    roleLabel: { fontSize: 12, fontWeight: 'bold', letterSpacing: 1 },
    greeting: { fontSize: 28, fontWeight: 'bold' },
    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
    statCard: { width: '48%', padding: 16, borderRadius: 16, alignItems: 'center', elevation: 2 },
    iconBox: { padding: 8, borderRadius: 100, marginBottom: 8 },
    statValue: { fontSize: 20, fontWeight: 'bold', marginBottom: 2 },
    statTitle: { fontSize: 12 },
    content: { padding: 24 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
    actionRow: { flexDirection: 'row', gap: 12 },
    actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 16, borderRadius: 12, gap: 8 },
    actionBtnText: { color: 'white', fontWeight: '600' },
    logItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 12 },
    logAction: { fontWeight: '600', fontSize: 14 },
    logTarget: { fontSize: 12 },
    logTime: { fontSize: 12 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 24 },
    modalContent: { padding: 24, borderRadius: 24 },
    modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
    input: { borderWidth: 1, padding: 12, borderRadius: 12, marginBottom: 12 },
    modalActions: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 12 },
    saveBtn: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12, marginLeft: 12 }
});

