import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function AdminDashboard({ navigation, route }) {
    const { theme, isDarkMode } = useTheme();
    const { user } = route.params || {};
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', studentId: 'ST123' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', studentId: 'ST456' }
    ]);

    const renderStudent = ({ item }) => (
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
            <View style={[styles.avatar, { backgroundColor: isDarkMode ? theme.colors.primary : '#E3F2FD' }]}>
                <Text style={[styles.avatarText, { color: isDarkMode ? 'white' : '#0066CC' }]}>{item.name[0]}</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={[styles.name, { color: theme.colors.text }]}>{item.name}</Text>
                <Text style={[styles.email, { color: theme.colors.textLight }]}>{item.email}</Text>
                {item.studentId ? <Text style={[styles.sid, { color: theme.colors.textLight }]}>ID: {item.studentId}</Text> : null}
            </View>
            <TouchableOpacity style={[styles.actionBtn, { backgroundColor: isDarkMode ? theme.colors.background : '#F0F2F5' }]}>
                <Text style={[styles.actionText, { color: theme.colors.text }]}>Manage</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <StatusBar barStyle="light-content" />
            <View style={[styles.header, { backgroundColor: isDarkMode ? theme.colors.surface : '#1A1A1A', borderBottomWidth: 1, borderBottomColor: theme.colors.border }]}>
                <View>
                    <Text style={styles.greeting}>Admin Panel</Text>
                    <Text style={styles.subGreeting}>Welcome, {user?.name || 'Admin'}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.replace('Login')} style={styles.logoutBtn}>
                    <Ionicons name="log-out-outline" size={24} color="#FF6B6B" />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Registered Students</Text>
                <FlatList
                    data={users}
                    renderItem={renderStudent}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { padding: 24, paddingTop: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    greeting: { fontSize: 24, fontWeight: 'bold', color: 'white' },
    subGreeting: { fontSize: 16, color: '#CCC' },
    logoutBtn: { padding: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12 },
    content: { flex: 1, padding: 20 },
    sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
    card: { flexDirection: 'row', padding: 16, borderRadius: 16, marginBottom: 12, alignItems: 'center', elevation: 2 },
    avatar: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    avatarText: { fontSize: 20, fontWeight: 'bold' },
    name: { fontSize: 16, fontWeight: '600' },
    email: { fontSize: 14 },
    sid: { fontSize: 12, marginTop: 2 },
    actionBtn: { padding: 8, borderRadius: 8 },
    actionText: { fontSize: 13, fontWeight: '500' },
    list: { paddingBottom: 24 }
});

