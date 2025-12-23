import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import * as Location from 'expo-location';
import axios from 'axios';
import config from '../config';

export default function HomeNearby({ navigation }) {
    const { theme } = useTheme();
    const [nearbyData, setNearbyData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setLoading(false);
                    return;
                }

                let loc = await Location.getCurrentPositionAsync({});
                const response = await axios.get(`${config.apiBase}/api/verify/nearby`, {
                    params: { lat: loc.coords.latitude, lng: loc.coords.longitude }
                });
                
                // Limit to 4 for home screen
                setNearbyData(response.data.slice(0, 4));
            } catch (error) {
                console.log('Home nearby error:', error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading || nearbyData.length === 0) return null;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: theme.colors.text }]}>Verified Nearby</Text>
                <TouchableOpacity onPress={() => navigation.navigate('NearbyVerification')}>
                    <Text style={[styles.seeAll, { color: theme.colors.primary }]}>See All</Text>
                </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.list}>
                {nearbyData.map((item) => (
                    <TouchableOpacity 
                        key={item.id} 
                        style={[styles.card, { backgroundColor: theme.colors.card }]}
                        onPress={() => navigation.navigate('Result', { data: item })}
                    >
                        <View style={[styles.iconBox, { backgroundColor: item.type === 'university' ? '#DBEAFE' : '#D1FAE5' }]}>
                            <Ionicons 
                                name={item.type === 'university' ? 'school' : 'medkit'} 
                                size={20} 
                                color={item.type === 'university' ? '#2563EB' : '#059669'} 
                            />
                        </View>
                        <Text style={[styles.name, { color: theme.colors.text }]} numberOfLines={1}>{item.name}</Text>
                        <View style={styles.badge}>
                            <Ionicons name="location-outline" size={10} color="white" />
                            <Text style={styles.distText}>{item.distance}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        paddingHorizontal: 0,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    seeAll: {
        fontSize: 14,
        fontWeight: '600',
    },
    list: {
        paddingRight: 16,
    },
    card: {
        width: 140,
        padding: 12,
        borderRadius: 16,
        marginRight: 12,
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    name: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    badge: {
        backgroundColor: '#3B82F6',
        borderRadius: 8,
        paddingHorizontal: 6,
        paddingVertical: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    distText: {
        color: 'white',
        fontSize: 10,
        marginLeft: 2,
        fontWeight: 'bold'
    }
});
