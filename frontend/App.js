import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, Text, View, TouchableOpacity, TextInput, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ScannerScreen from './screens/ScannerScreen';
import HomeScreen from './screens/HomeScreen';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import StudentDashboard from './screens/StudentDashboard';
import EventsScreen from './screens/EventsScreen';
import ChatScreen from './screens/ChatScreen';
import AdminDashboard from './screens/AdminDashboard';
import ReportFraudScreen from './screens/ReportFraudScreen';
import AIAssistantScreen from './screens/AIAssistantScreen';
import ContactScreen from './screens/ContactScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="PublicHome" screenOptions={{ headerShown: false }}>
        {/* Auth Flow */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        {/* Student Flow */}
        <Stack.Screen name="Dashboard" component={StudentDashboard} />
        <Stack.Screen name="Events" component={EventsScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />

        {/* Public Flow (Legacy) - Renamed route for clarity */}
        <Stack.Screen name="PublicHome" component={HomeScreen} />
        <Stack.Screen name="Scanner" component={ScannerScreen} />
        <Stack.Screen name="ReportFraud" component={ReportFraudScreen} />

        {/* AI Assistant & Contact */}
        <Stack.Screen name="AIAssistant" component={AIAssistantScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />

        {/* Keep original Home name for compatibility if needed, but Login is now entry */}
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
