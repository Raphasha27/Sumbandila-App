import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import config from '../config';

export default function NearbyVerificationScreen({ navigation }) {
    const { theme } = useTheme();
    const [location, setLocation] = useState(null);
    const [nearbyEntities, setNearbyEntities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [permissionStatus, setPermissionStatus] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                setPermissionStatus(status);
                
                if (status !== 'granted') {
                    Alert.alert('Permission to access location was denied');
                    setLoading(false);
                    return;
                }

                let loc = await Location.getCurrentPositionAsync({});
                setLocation(loc);
                fetchNearby(loc.coords.latitude, loc.coords.longitude);
            } catch (error) {
                console.error('Location error:', error);
                setLoading(false);
            }
        })();
    }, []);

    const fetchNearby = async (lat, lng) => {
        try {
            const response = await axios.get(`${config.apiBase}/api/verify/nearby`, {
                params: { lat, lng }
            });
            setNearbyEntities(response.data);
        } catch (error) {
            console.error('Error fetching nearby:', error);
            Alert.alert('Error', 'Failed to find nearby verified institutions');
        } finally {
            setLoading(false);
        }
    };

    const renderEntity = ({ item }) => (
        <TouchableOpacity 
            style={[styles.card, { backgroundColor: theme.colors.card }]}
            onPress={() => navigation.navigate('Result', { data: item })}
        >
            <View style={styles.iconContainer}>
                <Ionicons 
                    name={item.type === 'university' ? 'school' : 'medkit'} 
                    size={24} 
                    color={theme.colors.primary} 
                />
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.headerRow}>
                    <Text style={[styles.name, { color: theme.colors.text }]}>{item.name}</Text>
                    {item.verified && (
                        <Ionicons name="checkmark-circle" size={16} color={theme.colors.success} />
                    )}
                </View>
                <Text style={[styles.type, { color: theme.colors.textLight }]}>{item.type}</Text>
                <View style={styles.distanceBadge}>
                    <Ionicons name="navigate-outline" size={12} color="white" />
                    <Text style={styles.distanceText}>{item.distance}</Text>
                </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.textLight} />
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={[styles.centerContainer, { backgroundColor: theme.colors.background }]}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={[styles.loadingText, { color: theme.colors.text }]}>Finding nearby verified places...</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
                <Text style={styles.headerTitle}>Nearby Verified</Text>
                <Text style={styles.headerSubtitle}>Safe institutions near you</Text>
            </View>

            {permissionStatus !== 'granted' ? (
                <View style={styles.centerContainer}>
                    <Ionicons name="location-outline" size={64} color={theme.colors.textLight} />
                    <Text style={[styles.message, { color: theme.colors.text }]}>Location permission required</Text>
                    <TouchableOpacity 
                        style={[styles.button, { backgroundColor: theme.colors.primary }]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.buttonText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={nearbyEntities}
                    renderItem={renderEntity}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={[styles.emptyText, { color: theme.colors.textLight }]}>
                                No verified institutions found nearby.
                            </Text>
                        </View>
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
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
    listContent: {
        padding: 16,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    infoContainer: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        marginRight: 6,
    },
    type: {
        fontSize: 14,
        textTransform: 'capitalize',
        marginBottom: 8,
    },
    distanceBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3B82F6',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    distanceText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
    },
    message: {
        fontSize: 18,
        marginVertical: 16,
    },
    button: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
    }
});
