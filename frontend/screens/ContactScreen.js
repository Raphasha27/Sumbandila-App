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
const WHATSAPP_NUMBER = '27781172470';

export default function ContactScreen({ navigation }) {
    const { theme, isDarkMode } = useTheme();

    const handleAction = (url, errorMsg) => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) Linking.openURL(url);
            else Alert.alert('Error', errorMsg);
        }).catch(err => console.error(err));
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <LinearGradient colors={isDarkMode ? [theme.colors.background, theme.colors.background] : ['#ea580c', '#16a34a']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.header}>
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
                <View style={styles.heroSection}>
                    <View style={[styles.iconCircle, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
                        <Ionicons name="headset" size={48} color={theme.colors.primary} />
                    </View>
                    <Text style={[styles.heroTitle, { color: theme.colors.text }]}>We're Here to Help</Text>
                    <Text style={[styles.heroSubtitle, { color: theme.colors.textLight }]}>Get in touch with our support team</Text>
                </View>

                <TouchableOpacity onPress={() => handleAction(`tel:${PHONE_NUMBER}`, 'Not supported')}>
                    <LinearGradient colors={[theme.colors.primary, theme.colors.secondary]} style={styles.callCard}>
                        <View style={styles.callIconWrapper}>
                            <Ionicons name="call" size={32} color={theme.colors.primary} />
                        </View>
                        <View style={styles.callInfo}>
                            <Text style={styles.callLabel}>Call Us Directly</Text>
                            <Text style={styles.callNumber}>{PHONE_NUMBER}</Text>
                        </View>
                        <Feather name="phone-call" size={24} color="white" />
                    </LinearGradient>
                </TouchableOpacity>

                <View style={styles.optionsGrid}>
                    <TouchableOpacity style={[styles.optionCard, { backgroundColor: theme.colors.surface }]} onPress={() => handleAction(`whatsapp://send?phone=${WHATSAPP_NUMBER}`, 'WhatsApp not installed')}>
                        <View style={[styles.optionIcon, { backgroundColor: '#dcfce7' }]}>
                            <FontAwesome5 name="whatsapp" size={24} color="#16a34a" />
                        </View>
                        <Text style={[styles.optionTitle, { color: theme.colors.text }]}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.optionCard, { backgroundColor: theme.colors.surface }]} onPress={() => handleAction(`mailto:support@sumbandila.co.za`, 'Email not configured')}>
                        <View style={[styles.optionIcon, { backgroundColor: '#fef3c7' }]}>
                            <Ionicons name="mail" size={24} color="#d97706" />
                        </View>
                        <Text style={[styles.optionTitle, { color: theme.colors.text }]}>Email</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.hoursCard, { backgroundColor: theme.colors.surface }]}>
                    <Text style={[styles.hoursTitle, { color: theme.colors.text }]}>Business Hours</Text>
                    <View style={styles.hoursRow}>
                        <Text style={[styles.hoursDay, { color: theme.colors.textLight }]}>Mon - Fri</Text>
                        <Text style={[styles.hoursTime, { color: theme.colors.success }]}>08:00 - 17:00</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { paddingBottom: 16, paddingHorizontal: 16 },
    headerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: 'white' },
    scrollContent: { padding: 24 },
    heroSection: { alignItems: 'center', marginBottom: 32 },
    iconCircle: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 16, borderWidth: 1 },
    heroTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
    heroSubtitle: { fontSize: 16, textAlign: 'center' },
    callCard: { flexDirection: 'row', alignItems: 'center', padding: 20, borderRadius: 20, marginBottom: 32 },
    callIconWrapper: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    callInfo: { flex: 1 },
    callLabel: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 4 },
    callNumber: { fontSize: 24, fontWeight: 'bold', color: 'white' },
    optionsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
    optionCard: { width: '48%', padding: 16, borderRadius: 16, alignItems: 'center', elevation: 2 },
    optionIcon: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
    optionTitle: { fontSize: 14, fontWeight: '600' },
    hoursCard: { borderRadius: 16, padding: 20, elevation: 2 },
    hoursTitle: { fontSize: 18, fontWeight: '600', marginBottom: 16 },
    hoursRow: { flexDirection: 'row', justifyContent: 'space-between' },
    hoursDay: { fontSize: 15 },
    hoursTime: { fontSize: 15, fontWeight: '600' }
});

