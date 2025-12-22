import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import CategoryCard from '../components/CategoryCard';
import StatsCard from '../components/StatsCard';

export default function HomeScreen({ navigation }) {
    const { theme, isDarkMode, toggleTheme } = useTheme();

    const navigateToVerification = (category) => {
        navigation.navigate('Scanner', { category }); 
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <StatusBar style="light" />
            <LinearGradient 
                colors={[theme.colors.gradientStart, theme.colors.gradientEnd]} 
                start={{ x: 0, y: 0 }} 
                end={{ x: 1, y: 0 }} 
                style={styles.header}
            >
                <SafeAreaView>
                    <View style={styles.headerContent}>
                        <View style={styles.headerTop}>
                            <View style={styles.titleRow}>
                                <Feather name="shield" size={32} color="white" />
                                <Text style={styles.headerTitle}>Sumbandila</Text>
                            </View>
                            <View style={styles.headerActions}>
                                <TouchableOpacity onPress={toggleTheme} style={styles.iconButton}>
                                    <Ionicons name={isDarkMode ? "sunny" : "moon"} size={24} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('RealScanner')} style={styles.iconButton}>
                                    <Ionicons name="qr-code-outline" size={24} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.iconButton}>
                                    <Feather name="user" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.headerSubtitle}>Verification in the palm of your hand</Text>
                    </View>
                </SafeAreaView>
            </LinearGradient>
            
            <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: 32 }]} showsVerticalScrollIndicator={false}>
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>What would you like to verify?</Text>
                <Text style={[styles.sectionSubtitle, { color: theme.colors.textLight }]}>Select a category to begin verification</Text>

                <View style={styles.categoriesContainer}>
                    <CategoryCard 
                        title="Education" 
                        subtitle="Schools, Colleges & Courses" 
                        icon="school-outline" 
                        color={theme.colors.education}
                        onPress={() => navigateToVerification('education')}
                    />
                    <CategoryCard 
                        title="Medical" 
                        subtitle="Doctors & Healthcare Professionals" 
                        icon="medkit-outline" 
                        color={theme.colors.medical}
                        onPress={() => navigateToVerification('medical')}
                    />
                     <CategoryCard 
                        title="Legal" 
                        subtitle="Lawyers & Legal Professionals" 
                        icon="scale-outline" 
                        color={theme.colors.legal}
                        onPress={() => navigateToVerification('legal')}
                    />
                </View>

                <View style={styles.statsContainer}>
                    <StatsCard 
                        icon="business-outline" 
                        number="2,450+" 
                        label="Registered Institutions" 
                        iconColor="#3B82F6"
                    />
                    <StatsCard 
                        icon="people-outline" 
                        number="45,000+" 
                        label="Verified Professionals" 
                        iconColor="#10B981"
                    />
                     <StatsCard 
                        icon="shield-checkmark-outline" 
                        number="100%" 
                        label="Official Data Sources" 
                        iconColor="#F97316"
                    />
                </View>
            </ScrollView>

            <TouchableOpacity 
                style={styles.fab}
                onPress={() => navigation.navigate('ChatSupport')}
            >
                <LinearGradient
                    colors={[theme.colors.primary, theme.colors.secondary]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.fabGradient}
                >
                    <Ionicons name="chatbubbles-outline" size={28} color="white" />
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingBottom: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10,
    },
    headerSubtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 5,
    },
    headerActions: {
        flexDirection: 'row',
    },
    iconButton: {
        marginLeft: 15,
        padding: 5,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 104,
    },
    fab: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 64,
        height: 64,
        borderRadius: 32,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    fabGradient: {
        flex: 1,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    sectionSubtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 24,
    },
    categoriesContainer: {
        marginBottom: 24,
    },
    statsContainer: {
        marginBottom: 24,
    }
});
