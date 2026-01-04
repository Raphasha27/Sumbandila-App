import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Platform,
  Share,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, FontAwesome5, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
// import * as Clipboard from 'expo-clipboard';

const { width } = Dimensions.get('window');

// Mock Wallet Data
const initialWalletData = [
  {
    id: 'w1',
    type: 'qualification',
    title: 'Bachelor of Science in IT',
    issuer: 'University of South Africa (UNISA)',
    issuerLogo: 'graduation-cap',
    dateIssued: '2023-12-15',
    expiryDate: 'N/A',
    status: 'Verified',
    color: ['#3b82f6', '#2563eb'],
    details: [
      { label: 'Student No', value: '61234567' },
      { label: 'Major', value: 'Software Engineering' },
      { label: 'Credits', value: '360' },
    ],
  },
  {
    id: 'w2',
    type: 'license',
    title: 'Professional Driver PDP',
    issuer: 'Department of Transport',
    issuerLogo: 'car',
    dateIssued: '2024-01-10',
    expiryDate: '2026-01-10',
    status: 'Verified',
    color: ['#10b981', '#059669'],
    details: [
      { label: 'License No', value: 'PDP-ZA-9988' },
      { label: 'Vehicle Class', value: 'B, C1' },
      { label: 'Restriction', value: 'None' },
    ],
  },
  {
    id: 'w3',
    type: 'clearance',
    title: 'Police Clearance Certificate',
    issuer: 'SAPS Criminal Record Center',
    issuerLogo: 'shield-check',
    dateIssued: '2025-05-20',
    expiryDate: '2026-05-20',
    status: 'Pending Renewal',
    color: ['#f59e0b', '#d97706'],
    details: [
      { label: 'Reference', value: 'CRC/2025/7782' },
      { label: 'Fingerprint Status', value: 'Confirmed' },
    ],
  },
];

export default function IdentityWalletScreen({ navigation }) {
  const { theme, isDarkMode } = useTheme();
  const [walletItems, setWalletItems] = useState(initialWalletData);
  const [activeTab, setActiveTab] = useState('all');
  const scrollY = new Animated.Value(0);

  const styles = createStyles(theme, isDarkMode);

  const filterItems = (tab) => {
    setActiveTab(tab);
    if (tab === 'all') {
      setWalletItems(initialWalletData);
    } else {
      setWalletItems(initialWalletData.filter((item) => item.type === tab));
    }
  };

  const handleShareProfile = async () => {
    try {
      await Share.share({
        message: 'View my verified IdentityPass profile: https://sumbandila.io/v/raphasha_verified',
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const copyToClipboard = async (text) => {
    // await Clipboard.setStringAsync(text);
    // Alert.alert('Copied', 'Linked copied to clipboard!');
    // Fallback or placeholder:
    console.log('Copy to clipboard:', text);
  };

  const CredentialCard = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.cardWrapper}
        activeOpacity={0.9}
        onPress={() => {}}
      >
        <LinearGradient
          colors={item.color}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.cardHeader}>
            <View style={styles.issuerRow}>
              <View style={styles.iconContainer}>
                {item.type === 'qualification' ? (
                  <FontAwesome5 name={item.issuerLogo} size={20} color="white" />
                ) : (
                  <MaterialCommunityIcons name={item.issuerLogo} size={24} color="white" />
                )}
              </View>
              <View style={styles.issuerInfo}>
                <Text style={styles.issuerName}>{item.issuer}</Text>
                <Text style={styles.credentialType}>{item.type.toUpperCase()}</Text>
              </View>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>

          <Text style={styles.credentialTitle}>{item.title}</Text>

          <View style={styles.detailsGrid}>
            {item.details.map((detail, index) => (
              <View key={index} style={styles.detailItem}>
                <Text style={styles.detailLabel}>{detail.label}</Text>
                <Text style={styles.detailValue}>{detail.value}</Text>
              </View>
            ))}
          </View>

          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.footerLabel}>Issued</Text>
              <Text style={styles.footerValue}>{item.dateIssued}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.footerLabel}>Expires</Text>
              <Text style={styles.footerValue}>{item.expiryDate}</Text>
            </View>
          </View>

          <View style={styles.qrIconOverlay}>
            <Ionicons name="qr-code-outline" size={32} color="rgba(255,255,255,0.3)" />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
        style={styles.header}
      >
        <SafeAreaView edges={['top']}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Feather name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>IdentityPass Wallet</Text>
            <TouchableOpacity onPress={handleShareProfile} style={styles.backButton}>
              <Feather name="share-2" size={22} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Card */}
        <View style={styles.profileSection}>
          <View style={styles.profileCard}>
            <View style={styles.avatarRow}>
              <Image
                source={{ uri: 'https://ui-avatars.com/api/?name=User&background=3b82f6&color=fff&size=128' }}
                style={styles.avatar}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.userName}>Raphasha Mokoka</Text>
                <View style={styles.verifiedBadge}>
                  <Ionicons name="shield-checkmark" size={16} color={theme.colors.success} />
                  <Text style={styles.verifiedText}>Fully Verified Profile</Text>
                </View>
              </View>
            </View>

            <View style={styles.profileStats}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>8</Text>
                <Text style={styles.statLabel}>Credentials</Text>
              </View>
              <View style={[styles.stat, styles.statBorder]}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Verifications</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>Gold</Text>
                <Text style={styles.statLabel}>Trust Score</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.qrButton}>
              <Ionicons name="qr-code" size={20} color="white" />
              <Text style={styles.qrButtonText}>Share Trust QR Code</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab Bar */}
        <View style={styles.tabBarWrapper}>
          <View style={styles.tabBar}>
            {['all', 'qualification', 'license', 'clearance'].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => filterItems(tab)}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Wallet Items */}
        <View style={styles.itemsContainer}>
          {walletItems.map((item) => (
            <CredentialCard key={item.id} item={item} />
          ))}

          <TouchableOpacity style={styles.addCredential}>
            <Feather name="plus-circle" size={24} color={theme.colors.primary} />
            <Text style={styles.addCredentialText}>Add Verified Credential</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerInfo}>
          <Feather name="lock" size={14} color={theme.colors.textMuted} />
          <Text style={styles.footerInfoText}>
            Your data is encrypted and self-sovereign. Only you choose who sees it.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const createStyles = (theme, isDarkMode) =>
  StyleSheet.create({
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
      paddingTop: Platform.OS === 'android' ? 40 : 10,
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
      textAlign: 'center',
    },
    scrollContent: {
      paddingBottom: 40,
    },
    profileSection: {
      padding: 20,
      marginTop: -20,
    },
    profileCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 24,
      padding: 24,
      ...theme.shadows.default,
      borderWidth: isDarkMode ? 1 : 0,
      borderColor: theme.colors.border,
    },
    avatarRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
    },
    avatar: {
      width: 64,
      height: 64,
      borderRadius: 32,
      marginRight: 16,
    },
    userName: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: 4,
    },
    verifiedBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    verifiedText: {
      fontSize: 14,
      color: theme.colors.success,
      fontWeight: '600',
    },
    profileStats: {
      flexDirection: 'row',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
      paddingVertical: 16,
      marginBottom: 24,
    },
    stat: {
      flex: 1,
      alignItems: 'center',
    },
    statBorder: {
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: theme.colors.border,
    },
    statValue: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.text,
    },
    statLabel: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    qrButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.primary,
      paddingVertical: 14,
      borderRadius: 14,
      gap: 8,
    },
    qrButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
    tabBarWrapper: {
      backgroundColor: theme.colors.background,
      paddingVertical: 10,
    },
    tabBar: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      gap: 12,
    },
    tab: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    activeTab: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    tabText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      fontWeight: '500',
    },
    activeTabText: {
      color: 'white',
      fontWeight: 'bold',
    },
    itemsContainer: {
      padding: 20,
      gap: 20,
    },
    cardWrapper: {
      borderRadius: 20,
      ...theme.shadows.hover,
    },
    card: {
      padding: 24,
      borderRadius: 20,
      overflow: 'hidden',
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 20,
    },
    issuerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      flex: 1,
    },
    iconContainer: {
      width: 44,
      height: 44,
      borderRadius: 12,
      backgroundColor: 'rgba(255,255,255,0.2)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    issuerInfo: {
      flex: 1,
    },
    issuerName: {
      color: 'rgba(255,255,255,0.9)',
      fontSize: 14,
      fontWeight: '600',
    },
    credentialType: {
      color: 'rgba(255,255,255,0.7)',
      fontSize: 10,
      fontWeight: 'bold',
      letterSpacing: 1,
      marginTop: 2,
    },
    statusBadge: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 8,
    },
    statusText: {
      color: 'white',
      fontSize: 11,
      fontWeight: 'bold',
    },
    credentialTitle: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    detailsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 16,
      marginBottom: 20,
      paddingVertical: 16,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: 'rgba(255,255,255,0.2)',
    },
    detailItem: {
      width: '45%',
    },
    detailLabel: {
      color: 'rgba(255,255,255,0.6)',
      fontSize: 11,
      marginBottom: 4,
    },
    detailValue: {
      color: 'white',
      fontSize: 14,
      fontWeight: '600',
    },
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    footerLabel: {
      color: 'rgba(255,255,255,0.6)',
      fontSize: 11,
      marginBottom: 2,
    },
    footerValue: {
      color: 'white',
      fontSize: 13,
      fontWeight: '600',
    },
    qrIconOverlay: {
      position: 'absolute',
      bottom: -10,
      right: -10,
    },
    addCredential: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20,
      borderWidth: 2,
      borderStyle: 'dashed',
      borderColor: theme.colors.border,
      borderRadius: 20,
      gap: 12,
    },
    addCredentialText: {
      color: theme.colors.primary,
      fontSize: 16,
      fontWeight: 'bold',
    },
    footerInfo: {
      flexDirection: 'row',
      paddingHorizontal: 40,
      marginTop: 20,
      gap: 10,
      alignItems: 'center',
    },
    footerInfoText: {
      color: theme.colors.textMuted,
      fontSize: 12,
      lineHeight: 18,
      textAlign: 'center',
      flex: 1,
    },
  });
