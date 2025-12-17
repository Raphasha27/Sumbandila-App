import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { theme } from '../theme';
import GradientHeader from '../components/GradientHeader';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
    // Mock user data - in real app would come from context/auth
    const user = {
        name: 'Rapha Sha',
        email: 'admin@sumbandila.com',
        role: 'Administrator',
        id: 'ADM-2025-001'
    };

    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return (
        <View style={styles.container}>
            <GradientHeader title="My Profile" showBack={true} onBack={() => navigation.goBack()} />
            
            <ScrollView contentContainerStyle={styles.content}>
                
                <View style={styles.avatarContainer}>
                    <View style={styles.avatarCircle}>
                        <Ionicons name="person" size={64} color="white" />
                    </View>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userRole}>{user.role}</Text>
                </View>

                <View style={[styles.card, theme.shadows.default]}>
                    <Text style={styles.sectionTitle}>Verification History</Text>
                    
                    <View style={styles.historyItem}>
                        <View style={[styles.historyIcon, {backgroundColor: 'rgba(16, 185, 129, 0.1)'}]}>
                            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                        </View>
                        <View style={styles.historyInfo}>
                            <Text style={styles.historyTitle}>Dr. Sarah Smith</Text>
                            <Text style={styles.historySubtitle}>Medical • Verified • Today</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.historyItem}>
                         <View style={[styles.historyIcon, {backgroundColor: 'rgba(59, 130, 246, 0.1)'}]}>
                            <Ionicons name="checkmark-circle" size={20} color="#3B82F6" />
                        </View>
                         <View style={styles.historyInfo}>
                            <Text style={styles.historyTitle}>Dozal School</Text>
                            <Text style={styles.historySubtitle}>Education • Verified • Yesterday</Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.card, theme.shadows.default]}>
                    <Text style={styles.sectionTitle}>Personal Information</Text>
                    
                    <View style={styles.row}>
                        <View style={styles.iconBox}>
                            <Ionicons name="mail-outline" size={20} color={theme.colors.primary} />
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={styles.label}>Email Address</Text>
                            <Text style={styles.value}>{user.email}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <View style={styles.iconBox}>
                            <Ionicons name="id-card-outline" size={20} color={theme.colors.primary} />
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={styles.label}>User ID</Text>
                            <Text style={styles.value}>{user.id}</Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.card, theme.shadows.default]}>
                    <TouchableOpacity style={styles.menuItem}>
                        <Ionicons name="settings-outline" size={24} color={theme.colors.text} />
                        <Text style={styles.menuText}>Settings</Text>
                        <Ionicons name="chevron-forward" size={24} color={theme.colors.textLight} />
                    </TouchableOpacity>
                    
                    <View style={styles.divider} />

                    <TouchableOpacity 
                        style={styles.menuItem} 
                        onPress={() => navigation.navigate('PrivacySecurity')}
                    >
                        <Ionicons name="shield-half-outline" size={24} color={theme.colors.text} />
                        <Text style={styles.menuText}>Privacy & Security</Text>
                        <Ionicons name="chevron-forward" size={24} color={theme.colors.textLight} />
                    </TouchableOpacity>

                    <View style={styles.divider} />

                     <TouchableOpacity style={styles.menuItem}>
                        <Ionicons name="help-circle-outline" size={24} color={theme.colors.text} />
                        <Text style={styles.menuText}>Help & Support</Text>
                        <Ionicons name="chevron-forward" size={24} color={theme.colors.textLight} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        padding: theme.spacing.m,
        paddingBottom: theme.spacing.xl,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: theme.spacing.l,
        marginTop: -theme.spacing.xl, // overlap header slightly
    },
    avatarCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: 'white',
        marginBottom: theme.spacing.s,
        ...theme.shadows.default,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    userRole: {
        fontSize: 16,
        color: theme.colors.textLight,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: theme.borderRadius.l,
        padding: theme.spacing.l,
        marginBottom: theme.spacing.m,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: theme.spacing.m,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF7ED',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.m,
    },
    infoContent: {
        flex: 1,
    },
    label: {
        fontSize: 12,
        color: theme.colors.textLight,
        marginBottom: 2,
    },
    value: {
        fontSize: 16,
        color: theme.colors.text,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.border,
        marginVertical: theme.spacing.m,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
    },
    menuText: {
        flex: 1,
        fontSize: 16,
        color: theme.colors.text,
        marginLeft: theme.spacing.m,
    },
    logoutButton: {
        backgroundColor: '#FEE2E2',
        borderRadius: theme.borderRadius.m,
        padding: theme.spacing.m,
        alignItems: 'center',
        marginTop: theme.spacing.s,
    },
    logoutText: {
        color: '#DC2626',
        fontSize: 16,
        fontWeight: 'bold',
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
    },
    historyIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.m,
    },
    historyInfo: {
        flex: 1,
    },
    historyTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text,
    },
    historySubtitle: {
        fontSize: 12,
        color: theme.colors.textLight,
        marginTop: 2,
    }
});
