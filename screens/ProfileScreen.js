import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    Image,
    Switch,
    Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import VerificationHistoryService from '../services/VerificationHistoryService';

export default function ProfileScreen({ navigation, route }) {
    const { theme, isDarkMode, toggleTheme } = useTheme();
    const { user } = route.params || {};
    const [recentVerifications, setRecentVerifications] = useState([]);

    useEffect(() => {
        loadRecentVerifications();
    }, []);

    const loadRecentVerifications = async () => {
        const recent = await VerificationHistoryService.getRecentHistory();
        setRecentVerifications(recent);
    };

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: () => navigation.replace('Landing')
                },
            ]
        );
    };

    const styles = createStyles(theme);

    const menuItems = [
        {
            icon: 'clock',
            label: 'Verification History',
            description: `${recentVerifications.length} recent searches`,
            onPress: () => navigation.navigate('VerificationHistory'),
        },
        {
            icon: 'award',
            label: 'IdentityPass Wallet',
            description: 'Your verified credentials',
            onPress: () => navigation.navigate('IdentityWallet'),
        },
        {
            icon: 'bookmark',
            label: 'Watchlist',
            description: 'Entities you\'re monitoring',
            onPress: () => Alert.alert('Coming Soon', 'Watchlist feature will be available in Phase 3'),
        },
        {
            icon: 'bell',
            label: 'Notifications',
            description: 'Manage push notifications',
            onPress: () => Alert.alert('Coming Soon', 'Notifications will be available in Phase 2'),
        },
        {
            icon: 'globe',
            label: 'Language',
            description: 'English',
            onPress: () => Alert.alert('Coming Soon', 'Multi-language support will be available in Phase 4'),
        },
        {
            icon: 'help-circle',
            label: 'Help & Support',
            description: 'FAQs and contact us',
            onPress: () => Alert.alert('Help', 'Contact support at help@sumbandila.co.za'),
        },
        {
            icon: 'info',
            label: 'About',
            description: 'Version 1.0.0',
            onPress: () => Alert.alert('Sumbandila', 'Version 1.0.0\n\nVerification in the palm of your hand.'),
        },
    ];

    return (
        <View style={styles.container}>
            {/* Header */}
            <LinearGradient
                colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.header}
            >
                <SafeAreaView edges={['top']}>
                    <View style={styles.headerContent}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.backButton}
                        >
                            <Feather name="arrow-left" size={24} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Profile</Text>
                        <View style={{ width: 40 }} />
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <LinearGradient
                            colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
                            style={styles.avatar}
                        >
                            <Text style={styles.avatarText}>
                                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                            </Text>
                        </LinearGradient>
                    </View>
                    <Text style={styles.userName}>{user?.name || 'Guest User'}</Text>
                    <Text style={styles.userEmail}>{user?.email || 'Not logged in'}</Text>
                    {user?.studentId && (
                        <View style={styles.badgeContainer}>
                            <View style={styles.badge}>
                                <Feather name="check-circle" size={14} color={theme.colors.success} />
                                <Text style={styles.badgeText}>Student ID: {user.studentId}</Text>
                            </View>
                        </View>
                    )}
                </View>

                {/* Theme Toggle */}
                <View style={styles.themeCard}>
                    <View style={styles.themeLeft}>
                        <Ionicons
                            name={isDarkMode ? 'moon' : 'sunny'}
                            size={24}
                            color={theme.colors.primary}
                        />
                        <View style={styles.themeText}>
                            <Text style={styles.themeTitle}>Dark Mode</Text>
                            <Text style={styles.themeDescription}>
                                {isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
                            </Text>
                        </View>
                    </View>
                    <Switch
                        value={isDarkMode}
                        onValueChange={toggleTheme}
                        trackColor={{
                            false: theme.colors.border,
                            true: theme.colors.primaryLight
                        }}
                        thumbColor={isDarkMode ? theme.colors.primary : '#f4f3f4'}
                    />
                </View>

                {/* Menu Items */}
                <View style={styles.menuCard}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.menuItem,
                                index < menuItems.length - 1 && styles.menuItemBorder
                            ]}
                            onPress={item.onPress}
                        >
                            <View style={styles.menuIcon}>
                                <Feather name={item.icon} size={22} color={theme.colors.primary} />
                            </View>
                            <View style={styles.menuContent}>
                                <Text style={styles.menuLabel}>{item.label}</Text>
                                <Text style={styles.menuDescription}>{item.description}</Text>
                            </View>
                            <Feather name="chevron-right" size={20} color={theme.colors.textMuted} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Logout Button */}
                {user && (
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Feather name="log-out" size={20} color={theme.colors.error} />
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                )}

                <View style={styles.bottomPadding} />
            </ScrollView>
        </View>
    );
}

const createStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        paddingBottom: 20,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? 40 : 0,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    profileCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        marginBottom: 16,
        ...theme.shadows.default,
    },
    avatarContainer: {
        marginBottom: 16,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: theme.colors.textSecondary,
        marginBottom: 12,
    },
    badgeContainer: {
        marginTop: 8,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
    },
    badgeText: {
        fontSize: 12,
        color: theme.colors.textSecondary,
    },
    themeCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        ...theme.shadows.default,
    },
    themeLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    themeText: {},
    themeTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.text,
    },
    themeDescription: {
        fontSize: 13,
        color: theme.colors.textSecondary,
        marginTop: 2,
    },
    menuCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 20,
        ...theme.shadows.default,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    menuItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    menuIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    menuContent: {
        flex: 1,
    },
    menuLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: theme.colors.text,
    },
    menuDescription: {
        fontSize: 13,
        color: theme.colors.textSecondary,
        marginTop: 2,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.surface,
        borderRadius: 12,
        padding: 16,
        gap: 8,
        borderWidth: 1,
        borderColor: theme.colors.error,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.error,
    },
    bottomPadding: {
        height: 40,
    },
});
