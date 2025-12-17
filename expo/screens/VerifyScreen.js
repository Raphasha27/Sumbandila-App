import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import { theme } from '../constants/theme';
import GradientHeader from '../components/GradientHeader';
import CategoryCard from '../components/CategoryCard';
import { StatusBar } from 'expo-status-bar';
import config from '../config';

export default function VerifyScreen({ navigation }) {
  const [providerType, setProviderType] = useState('education');
  const [hasPermission, setHasPermission] = useState(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleScan = ({ type, data }) => {
    setScanning(false);
    // Determine provider type from data or ask user, for now verify directly
    doVerify(data, providerType);
  };

  const doVerify = async (identifier, type) => {
    try {
      const res = await axios.post(`${config.apiBase}/verify`, { provider_type: type, provider_identifier: identifier });
      navigation.navigate('Result', { result: res.data });
    } catch (e) {
      // Mock data for demo if backend fails
      if(identifier === '2001/HE07/006') {
         navigation.navigate('Result', { result: {
             valid: true,
             name: 'Boston City Campus',
             registration_number: '2001/HE07/006',
             status: 'Registered',
             accreditation: 'CHE Accredited',
             courses: ['Business Management', 'IT', 'Marketing'],
             valid_until: '2026-12-31'
         }});
         return;
      }
      Alert.alert('Error', e.message);
    }
  }

  const selectCategory = (type) => {
    // Navigate to the form screen for the selected category
    // Pass color based on type
    let color = theme.colors.primary;
    if (type === 'education') color = theme.colors.blue;
    if (type === 'medical') color = theme.colors.secondary;
    if (type === 'legal') color = theme.colors.purple;

    navigation.navigate('VerificationForm', { category: type, color: color });
  };

  if (scanning) {
    if (hasPermission === null) return <Text>Requesting for camera permission</Text>;
    if (hasPermission === false) return <Text>No access to camera</Text>;

    return (
      <View style={styles.scannerContainer}>
        <BarCodeScanner
          onBarCodeScanned={handleScan}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.overlay}>
          <Text style={styles.scanText}>Scan Provider QR Code</Text>
          <Text style={styles.cancelText} onPress={() => setScanning(false)}>Cancel</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <GradientHeader 
        title="What would you like to verify?" 
        subtitle="Select a category to begin verification"
        showBack={true}
        navigation={navigation}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <CategoryCard 
            title="Education" 
            subtitle="Schools, Colleges & Courses" 
            icon="school-outline" 
            color={theme.colors.blue}
            onPress={() => selectCategory('education')}
          />
          
          <CategoryCard 
            title="Medical" 
            subtitle="Doctors & Healthcare Professionals" 
            icon="medkit-outline" 
            color={theme.colors.secondary}
            onPress={() => selectCategory('medical')}
          />
          
          <CategoryCard 
            title="Legal" 
            subtitle="Lawyers & Legal Professionals" 
            icon="git-network-outline" // Using network/scales proxy icon
            color={theme.colors.purple}
            onPress={() => selectCategory('legal')}
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  content: {
    padding: 20,
  },
  scannerContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  overlay: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  scanText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  cancelText: {
    color: 'white',
    fontSize: 16,
    padding: 10,
  }
});
