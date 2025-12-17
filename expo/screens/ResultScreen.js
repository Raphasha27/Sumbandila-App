import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '../constants/theme';
import GradientHeader from '../components/GradientHeader';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ResultScreen({ route, navigation }) {
  const { result } = route.params || {};

  if (!result) {
    return (
      <View style={styles.container}>
        <GradientHeader title="Verification Result" />
        <View style={styles.content}>
          <Text>No result data found.</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const isValid = result.status === 'Registered' || result.valid === true;
  const statusColor = isValid ? theme.colors.success : theme.colors.primary;

  return (
    <View style={styles.container}>
      <GradientHeader 
        title="Verification Result" 
        showBack={true} 
        navigation={navigation}
        showProfile={true}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          
          {/* Status Badge */}
          <View style={styles.statusContainer}>
             <Ionicons 
                name={isValid ? "checkmark-circle" : "alert-circle"} 
                size={64} 
                color={statusColor} 
             />
             <Text style={[styles.statusText, { color: statusColor }]}>
               {isValid ? 'Verified & Registered' : 'Not Verified'}
             </Text>
          </View>

          {/* Result Card */}
          <View style={styles.card}>
            <View style={styles.row}>
              <View>
                <Text style={styles.label}>Institution / Name</Text>
                <Text style={styles.value}>{result.name || 'Unknown'}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
               <View style={{flex:1}}>
                 <Text style={styles.label}>Registration Number</Text>
                 <Text style={styles.value}>{result.registration_number || 'N/A'}</Text>
               </View>
               <View style={styles.pill}>
                 <Text style={[styles.pillText, { color: statusColor }]}>{result.status || 'Unknown'}</Text>
               </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.row}>
              <View>
                <Text style={styles.label}>Accreditation</Text>
                <Text style={styles.value}>{result.accreditation || 'N/A'}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {result.courses && (
              <View style={styles.row}>
                <View>
                  <Text style={styles.label}>Accredited Courses</Text>
                  <View style={styles.tagsContainer}>
                    {result.courses.map((course, index) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{course}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )}

             <View style={styles.divider} />

             <View style={styles.row}>
               <View>
                 <Text style={styles.label}>Valid Until</Text>
                 <Text style={styles.value}>{result.valid_until || 'N/A'}</Text>
               </View>
             </View>

          </View>

          <View style={styles.infoBanner}>
            <Ionicons name="information-circle-outline" size={24} color={theme.colors.blue} />
            <Text style={styles.infoText}>
              This verification is based on official data sources. Always request original documentation for final confirmation.
            </Text>
          </View>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: theme.colors.primary }]} 
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>

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
  statusContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  statusText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: 4,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: '500',
  },
  pill: {
    backgroundColor: '#DEF7EC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  pillText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  tag: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#BFDBFE'
  },
  tagText: {
    color: theme.colors.blue,
    fontSize: 12,
  },
  infoBanner: {
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    color: theme.colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
