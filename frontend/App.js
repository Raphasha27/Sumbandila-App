import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Screens
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import VerificationFormScreen from './screens/VerificationFormScreen';
import ResultScreen from './screens/ResultScreen';
import ProfileScreen from './screens/ProfileScreen';
import RealScannerScreen from './screens/RealScannerScreen';
import ChatSupportScreen from './screens/ChatSupportScreen';
import PrivacySecurityScreen from './screens/PrivacySecurityScreen';

// Legacy/Other Screens
import StudentDashboard from './screens/StudentDashboard';
import EventsScreen from './screens/EventsScreen';
import ChatScreen from './screens/ChatScreen';
import AdminDashboard from './screens/AdminDashboard';
import ReportFraudScreen from './screens/ReportFraudScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        
        {/* Auth */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        {/* Main App Flow */}
        <Stack.Screen name="Home" component={HomeScreen} />
        
        {/* Verification Logic */}
        <Stack.Screen name="Scanner" component={VerificationFormScreen} />
        <Stack.Screen name="RealScanner" component={RealScannerScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        
        {/* User Profile & Support */}
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ChatSupport" component={ChatSupportScreen} />
        <Stack.Screen name="PrivacySecurity" component={PrivacySecurityScreen} />

        {/* Other Features */}
        <Stack.Screen name="Dashboard" component={StudentDashboard} />
        <Stack.Screen name="Events" component={EventsScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="ReportFraud" component={ReportFraudScreen} />
        
        {/* Legacy aliases */}
        <Stack.Screen name="PublicHome" component={HomeScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
