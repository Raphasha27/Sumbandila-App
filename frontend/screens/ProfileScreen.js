import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import GradientHeader from '../components/GradientHeader';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
    const { theme, isDarkMode } = useTheme();
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
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <GradientHeader title="My Profile" showBack={true} onBack={() => navigation.goBack()} />
            
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                
                <View style={styles.avatarContainer}>
                    <View style={[styles.avatarCircle, { backgroundColor: theme.colors.primary, borderColor: theme.colors.surface }]}>
                        <Ionicons name="person" size={64} color="white" />
                    </View>
                    <Text style={[styles.userName, { color: theme.colors.text }]}>{user.name}</Text>
                    <Text style={[styles.userRole, { color: theme.colors.textLight }]}>{user.role}</Text>
                </View>

                <View style={[styles.card, theme.shadows.default, { backgroundColor: theme.colors.surface }]}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Verification History</Text>
                    
                    <View style={styles.historyItem}>
                        <View style={[styles.historyIcon, {backgroundColor: 'rgba(16, 185, 129, 0.1)'}]}>
                            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                        </View>
                        <View style={styles.historyInfo}>
                            <Text style={[styles.historyTitle, { color: theme.colors.text }]}>Dr. Sarah Smith</Text>
                            <Text style={[styles.historySubtitle, { color: theme.colors.textLight }]}>Medical • Verified • Today</Text>
                        </View>
                    </View>

                    <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

                    <View style={styles.historyItem}>
                         <View style={[styles.historyIcon, {backgroundColor: 'rgba(59, 130, 246, 0.1)'}]}>
                            <Ionicons name="checkmark-circle" size={20} color="#3B82F6" />
                        </View>
                         <View style={styles.historyInfo}>
                            <Text style={[styles.historyTitle, { color: theme.colors.text }]}>Dozal School</Text>
                            <Text style={[styles.historySubtitle, { color: theme.colors.textLight }]}>Education • Verified • Yesterday</Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.card, theme.shadows.default, { backgroundColor: theme.colors.surface }]}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Personal Information</Text>
                    
                    <View style={styles.row}>
                        <View style={[styles.iconBox, { backgroundColor: isDarkMode ? theme.colors.background : '#FFF7ED' }]}>
                            <Ionicons name="mail-outline" size={20} color={theme.colors.primary} />
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={[styles.label, { color: theme.colors.textLight }]}>Email Address</Text>
                            <Text style={[styles.value, { color: theme.colors.text }]}>{user.email}</Text>
                        </View>
                    </View>

                    <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

                    <View style={styles.row}>
                        <View style={[styles.iconBox, { backgroundColor: isDarkMode ? theme.colors.background : '#FFF7ED' }]}>
                            <Ionicons name="id-card-outline" size={20} color={theme.colors.primary} />
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={[styles.label, { color: theme.colors.textLight }]}>User ID</Text>
                            <Text style={[styles.value, { color: theme.colors.text }]}>{user.id}</Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.card, theme.shadows.default, { backgroundColor: theme.colors.surface }]}>
                    <TouchableOpacity style={styles.menuItem}>
                        <Ionicons name="settings-outline" size={24} color={theme.colors.text} />
                        <Text style={[styles.menuText, { color: theme.colors.text }]}>Settings</Text>
                        <Ionicons name="chevron-forward" size={24} color={theme.colors.textLight} />
                    </TouchableOpacity>
                    
                    <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

                    <TouchableOpacity 
                        style={styles.menuItem} 
                        onPress={() => navigation.navigate('PrivacySecurity')}
                    >
                        <Ionicons name="shield-half-outline" size={24} color={theme.colors.text} />
                        <Text style={[styles.menuText, { color: theme.colors.text }]}>Privacy & Security</Text>
                        <Ionicons name="chevron-forward" size={24} color={theme.colors.textLight} />
                    </TouchableOpacity>

                     <TouchableOpacity 
                        style={styles.menuItem}
                        onPress={() => navigation.navigate('AIAssistant')}
                     >
                        <Ionicons name="chatbubbles-outline" size={24} color={theme.colors.text} />
                        <Text style={[styles.menuText, { color: theme.colors.text }]}>AI Assistant</Text>
                        <Ionicons name="chevron-forward" size={24} color={theme.colors.textLight} />
                    </TouchableOpacity>

                    <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />

                     <TouchableOpacity 
                        style={styles.menuItem}
                        onPress={() => navigation.navigate('Contact')}
                     >
                        <Ionicons name="help-circle-outline" size={24} color={theme.colors.text} />
                        <Text style={[styles.menuText, { color: theme.colors.text }]}>Help & Support</Text>
                        <Ionicons name="chevron-forward" size={24} color={theme.colors.textLight} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={[styles.logoutButton, { backgroundColor: isDarkMode ? 'rgba(239, 68, 68, 0.2)' : '#FEE2E2' }]} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 16,
        paddingBottom: 32,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 24,
        marginTop: -32, 
    },
    avatarCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        marginBottom: 8,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    userRole: {
        fontSize: 16,
    },
    card: {
        borderRadius: 16,
        padding: 24,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    infoContent: {
        flex: 1,
    },
    label: {
        fontSize: 12,
        marginBottom: 2,
    },
    value: {
        fontSize: 16,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        marginVertical: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
    },
    menuText: {
        flex: 1,
        fontSize: 16,
        marginLeft: 16,
    },
    logoutButton: {
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginTop: 8,
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
        marginRight: 16,
    },
    historyInfo: {
        flex: 1,
    },
    historyTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    historySubtitle: {
        fontSize: 12,
        marginTop: 2,
    }
});

