import React from 'react';
import { View, Text, StyleSheet, Image, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GradientHeader({ title, subtitle, showProfile = false, showBack = false, navigation }) {
  return (
    <LinearGradient
      colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.topRow}>
            <View style={styles.leftRow}>
              {showBack && (
                <Ionicons 
                  name="arrow-back" 
                  size={24} 
                  color="white" 
                  onPress={() => navigation.goBack()} 
                  style={{ marginRight: 10 }}
                />
              )}
              <Image source={require('../assets/icon.png')} style={styles.icon} />
              <Text style={styles.brandTitle}>Sumbandila</Text>
            </View>
            
            {showProfile && (
              <View style={styles.rightRow}>
                <Ionicons name="qr-code-outline" size={24} color="white" style={styles.headerIcon} />
                <Ionicons name="person-outline" size={24} color="white" style={styles.headerIcon} />
              </View>
            )}
          </View>
          
          {(title || subtitle) && (
            <View style={styles.textContainer}>
              {title && <Text style={styles.title}>{title}</Text>}
              {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  safeArea: {
    backgroundColor: 'transparent',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 10,
    resizeMode: 'contain',
    tintColor: 'white'
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerIcon: {
    marginLeft: 15,
  },
  textContainer: {
    marginTop: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  }
});
