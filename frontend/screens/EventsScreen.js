
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, FlatList, TouchableOpacity } from 'react-native';

import config from '../config';

export default function EventsScreen() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiBase = config.apiBase;

    useEffect(() => {
        fetch(`${apiBase} /api/events`)
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(err => console.error(err));
    }, []);

    const renderEvent = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.dateContainer}>
                <Text style={styles.dateDay}>{item.date.split('-')[2]}</Text>
                <Text style={styles.dateMonth}>DEC</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.time}>{item.time} • {item.location}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>School Events</Text>
            </View>
            <FlatList
                data={events}
                renderItem={renderEvent}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa' },
    header: { padding: 20, paddingTop: 50, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee', flexDirection: 'row', alignItems: 'center' },
    backButton: { marginRight: 16 },
    backText: { fontSize: 16, color: '#0066cc', fontWeight: '600' },
    headerTitle: { fontSize: 20, fontWeight: 'bold' },
    list: { padding: 20 },
    card: { backgroundColor: 'white', flexDirection: 'row', padding: 16, borderRadius: 12, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
    dateContainer: { backgroundColor: '#e3f2fd', padding: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: 16, width: 60 },
    dateDay: { fontSize: 20, fontWeight: 'bold', color: '#0066cc' },
    dateMonth: { fontSize: 12, color: '#0066cc', fontWeight: 'bold' },
    infoContainer: { flex: 1, justifyContent: 'center' },
    title: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 4 },
    time: { color: '#666', fontSize: 13 }
});
