import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function EventsScreen({ navigation }) {
    const { theme, isDarkMode } = useTheme();
    const [events, setEvents] = useState([
        { id: 1, title: 'Annual Science Fair', date: '2023-12-15', time: '09:00 AM', location: 'Main Hall' },
        { id: 2, title: 'Parent-Teacher Meeting', date: '2023-12-18', time: '02:00 PM', location: 'Section B' }
    ]);

    const renderEvent = ({ item }) => (
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
            <View style={[styles.dateContainer, { backgroundColor: isDarkMode ? theme.colors.primary : '#E3F2FD' }]}>
                <Text style={[styles.dateDay, { color: isDarkMode ? 'white' : theme.colors.primary }]}>{item.date.split('-')[2]}</Text>
                <Text style={[styles.dateMonth, { color: isDarkMode ? 'white' : theme.colors.primary }]}>DEC</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={[styles.title, { color: theme.colors.text }]}>{item.title}</Text>
                <Text style={[styles.time, { color: theme.colors.textLight }]}>{item.time} • {item.location}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.border} />
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <SafeAreaView style={[styles.header, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Feather name="arrow-left" size={24} color={theme.colors.text} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: theme.colors.text }]}>School Events</Text>
                    <View style={{ width: 40 }} />
                </View>
            </SafeAreaView>

            <FlatList
                data={events}
                renderItem={renderEvent}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { borderBottomWidth: 1 },
    headerContent: { height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },
    list: { padding: 16 },
    card: { flexDirection: 'row', padding: 16, borderRadius: 16, marginBottom: 12, alignItems: 'center', elevation: 2 },
    dateContainer: { padding: 10, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 16, width: 60 },
    dateDay: { fontSize: 20, fontWeight: 'bold' },
    dateMonth: { fontSize: 12, fontWeight: 'bold' },
    infoContainer: { flex: 1, justifyContent: 'center' },
    title: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
    time: { fontSize: 13 }
});

