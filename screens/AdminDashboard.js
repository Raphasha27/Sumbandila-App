import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, FlatList, TouchableOpacity, Alert } from 'react-native';

import config from '../config';

export default function AdminDashboard({ navigation, route }) {
    const { user, token } = route.params || {};
    const [users, setUsers] = useState([]);
    const apiBase = config.apiBase;

    useEffect(() => {
        if (!token) {
            // If strictly enforcing auth, you might want to redirect here
            // But for demo bypass compatibility, we'll try fetching anyway or show empty
            console.log("AdminDashboard: No token provided");
        }

        fetch(`${apiBase}/api/users`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    throw new Error('Unauthorized');
                }
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    console.log("AdminDashboard: Received non-array data", data);
                }
            })
            .catch(err => {
                console.error("Fetch error:", err);
                if (err.message === 'Unauthorized') {
                    Alert.alert("Session Expired", "Please login again.");
                    navigation.replace('Login');
                }
            });
    }, [token]);

    const renderStudent = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.name ? item.name[0].toUpperCase() : '?'}</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name || 'Unknown'}</Text>
                <Text style={styles.email}>{item.email}</Text>
                {item.studentId ? <Text style={styles.sid}>ID: {item.studentId}</Text> : null}
            </View>
            <TouchableOpacity style={styles.actionBtn}>
                <Text style={styles.actionText}>Manage</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Admin Panel</Text>
                    <Text style={styles.subGreeting}>Welcome, {user?.name || 'Admin'}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.replace('Login')} style={styles.logoutBtn}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Registered Students</Text>
                {users.length === 0 ? (
                    <Text style={{ textAlign: 'center', marginTop: 20, color: '#888' }}>
                        No students found or loading...
                    </Text>
                ) : (
                    <FlatList
                        data={users}
                        renderItem={renderStudent}
                        keyExtractor={item => item.id.toString()}
                        contentContainerStyle={styles.list}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f2f5' },
    header: { padding: 24, paddingTop: 60, backgroundColor: '#1a1a1a', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    greeting: { fontSize: 24, fontWeight: 'bold', color: 'white' },
    subGreeting: { fontSize: 16, color: '#ccc' },
    logoutBtn: { padding: 8, backgroundColor: '#333', borderRadius: 8 },
    logoutText: { color: '#ff6b6b', fontWeight: '600' },
    content: { flex: 1, padding: 20 },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 16 },
    card: { backgroundColor: 'white', flexDirection: 'row', padding: 16, borderRadius: 12, marginBottom: 12, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
    avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#e3f2fd', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    avatarText: { fontSize: 20, fontWeight: 'bold', color: '#0066cc' },
    name: { fontSize: 16, fontWeight: '600', color: '#333' },
    email: { color: '#666', fontSize: 14 },
    sid: { color: '#888', fontSize: 12, marginTop: 2 },
    actionBtn: { padding: 8, backgroundColor: '#f0f2f5', borderRadius: 8 },
    actionText: { color: '#333', fontSize: 13, fontWeight: '500' }
});
