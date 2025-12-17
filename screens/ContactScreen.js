import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    Platform,
    Linking,
    ScrollView,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const PHONE_NUMBER = '0781172470';
const WHATSAPP_NUMBER = '27781172470'; // International format for WhatsApp

export default function ContactScreen({ navigation }) {
    const { theme, isDarkMode } = useTheme();
    const styles = createStyles(theme);

    const handlePhoneCall = () => {
        const phoneUrl = `tel:${PHONE_NUMBER}`;
        Linking.canOpenURL(phoneUrl)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(phoneUrl);
                } else {
                    Alert.alert('Error', 'Phone calls are not supported on this device');
                }
            })
            .catch((err) => console.error('Error opening phone:', err));
    };

    const handleWhatsApp = () => {
        const whatsappUrl = `whatsapp://send?phone=${WHATSAPP_NUMBER}&text=Hello, I need assistance with Sumbandila verification.`;
        Linking.canOpenURL(whatsappUrl)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(whatsappUrl);
                } else {
                    Alert.alert('WhatsApp Not Installed', 'Please install WhatsApp to use this feature');
                }
            })
            .catch((err) => console.error('Error opening WhatsApp:', err));
    };

    const handleEmail = () => {
        const emailUrl = 'mailto:support@sumbandila.co.za?subject=Support Request&body=Hello, I need assistance with...';
        Linking.openURL(emailUrl).catch((err) => console.error('Error opening email:', err));
    };

    const handleSMS = () => {
        const smsUrl = `sms:${PHONE_NUMBER}`;
        Linking.openURL(smsUrl).catch((err) => console.error('Error opening SMS:', err));
    };

    return (
        <LinearGradient
            colors={[theme.colors.background, theme.colors.background]}
            style={styles.container}
        >
            {/* Header */}
            <LinearGradient
                colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.header}
            >
                <SafeAreaView>
                    <View style={styles.headerContent}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Feather name="arrow-left" size={24} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Contact Us</Text>
                        <View style={{ width: 40 }} />
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Hero Section */}
                <View style={styles.heroSection}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="headset" size={48} color={theme.colors.primary} />
                    </View>
                    <Text style={styles.heroTitle}>We're Here to Help</Text>
                    <Text style={styles.heroSubtitle}>
                        Get in touch with our support team for any questions about verification services
                    </Text>
                </View>

                {/* Main Call Card */}
                <TouchableOpacity onPress={handlePhoneCall} activeOpacity={0.9}>
                    <LinearGradient
                        colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.callCard}
                    >
                        <View style={styles.callIconWrapper}>
                            <Ionicons name="call" size={32} color={theme.colors.primary} />
                        </View>
                        <View style={styles.callInfo}>
                            <Text style={styles.callLabel}>Call Us Directly</Text>
                            <Text style={styles.callNumber}>{PHONE_NUMBER}</Text>
                            <Text style={styles.callHint}>Tap to call now</Text>
                        </View>
                        <Feather name="phone-call" size={24} color="white" />
                    </LinearGradient>
                </TouchableOpacity>

                {/* Contact Options Grid */}
                <Text style={styles.sectionTitle}>More Ways to Reach Us</Text>
                <View style={styles.optionsGrid}>
                    <TouchableOpacity style={styles.optionCard} onPress={handleWhatsApp}>
                        <View style={[styles.optionIcon, { backgroundColor: '#dcfce7' }]}>
                            <FontAwesome5 name="whatsapp" size={24} color="#16a34a" />
                        </View>
                        <Text style={styles.optionTitle}>WhatsApp</Text>
                        <Text style={styles.optionSubtitle}>Quick chat</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionCard} onPress={handleSMS}>
                        <View style={[styles.optionIcon, { backgroundColor: '#dbeafe' }]}>
                            <Ionicons name="chatbubble-ellipses" size={24} color="#2563eb" />
                        </View>
                        <Text style={styles.optionTitle}>SMS</Text>
                        <Text style={styles.optionSubtitle}>Text us</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.optionCard} onPress={handleEmail}>
                        <View style={[styles.optionIcon, { backgroundColor: '#fef3c7' }]}>
                            <Ionicons name="mail" size={24} color="#d97706" />
                        </View>
                        <Text style={styles.optionTitle}>Email</Text>
                        <Text style={styles.optionSubtitle}>Write to us</Text>
                    </TouchableOpacity>
                </View>

                {/* Business Hours */}
                <View style={styles.hoursCard}>
                    <View style={styles.hoursHeader}>
                        <Ionicons name="time-outline" size={24} color={theme.colors.primary} />
                        <Text style={styles.hoursTitle}>Operating Hours</Text>
                    </View>
                    <View style={styles.hoursList}>
                        <View style={styles.hoursRow}>
                            <Text style={styles.hoursDay}>Monday - Friday</Text>
                            <Text style={styles.hoursTime}>08:00 AM - 05:00 PM</Text>
                        </View>
                        <View style={styles.hoursDivider} />
                        <View style={styles.hoursRow}>
                            <Text style={styles.hoursDay}>Saturday</Text>
                            <Text style={styles.hoursTime}>09:00 AM - 01:00 PM</Text>
                        </View>
                        <View style={styles.hoursDivider} />
                        <View style={styles.hoursRow}>
                            <Text style={styles.hoursDay}>Sunday & Holidays</Text>
                            <Text style={styles.hoursTimeClosed}>Closed</Text>
                        </View>
                    </View>
                </View>

                {/* Location Info */}
                <View style={styles.locationCard}>
                    <View style={styles.locationHeader}>
                        <Ionicons name="location-outline" size={24} color={theme.colors.success} />
                        <Text style={styles.locationTitle}>Visit Us</Text>
                    </View>
                    <Text style={styles.locationAddress}>
                        Sumbandila Verification Services{'\n'}
                        Johannesburg, South Africa
                    </Text>
                </View>

                {/* Emergency Notice */}
                <View style={styles.noticeCard}>
                    <Feather name="alert-circle" size={20} color={theme.colors.info} />
                    <Text style={styles.noticeText}>
                        For urgent fraud reports, please call us directly or use the in-app reporting feature for fastest response.
                    </Text>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </LinearGradient>
    );
}

const createStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: Platform.OS === 'android' ? 40 : 20,
        paddingBottom: 16,
        paddingHorizontal: 16,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    scrollContent: {
        padding: 24,
    },
    heroSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    iconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: theme.colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 3,
        borderColor: theme.mode === 'dark' ? theme.colors.border : '#fed7aa',
    },
    heroTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginBottom: 8,
    },
    heroSubtitle: {
        fontSize: 16,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 24,
    },
    callCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 20,
        marginBottom: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    callIconWrapper: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    callInfo: {
        flex: 1,
    },
    callLabel: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        marginBottom: 4,
    },
    callNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 1,
    },
    callHint: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.7)',
        marginTop: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: theme.colors.text,
        marginBottom: 16,
    },
    optionsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    optionCard: {
        width: '31%',
        backgroundColor: theme.colors.surface,
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
    },
    optionIcon: {
        width: 56,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    optionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.text,
        marginBottom: 2,
    },
    optionSubtitle: {
        fontSize: 12,
        color: theme.colors.textSecondary,
    },
    hoursCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
    },
    hoursHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    hoursTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.text,
        marginLeft: 12,
    },
    hoursRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
    },
    hoursDay: {
        fontSize: 15,
        color: theme.colors.text,
    },
    hoursTime: {
        fontSize: 15,
        fontWeight: '600',
        color: theme.colors.success,
    },
    hoursTimeClosed: {
        fontSize: 15,
        fontWeight: '600',
        color: theme.colors.error,
    },
    hoursDivider: {
        height: 1,
        backgroundColor: theme.colors.border,
    },
    locationCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
    },
    locationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    locationTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.text,
        marginLeft: 12,
    },
    locationAddress: {
        fontSize: 15,
        color: theme.colors.textSecondary,
        lineHeight: 24,
    },
    noticeCard: {
        flexDirection: 'row',
        backgroundColor: theme.mode === 'dark' ? 'rgba(59, 130, 246, 0.2)' : '#eff6ff',
        padding: 16,
        borderRadius: 12,
        gap: 12,
    },
    noticeText: {
        flex: 1,
        fontSize: 14,
        color: theme.colors.info,
        lineHeight: 20,
    },
});
