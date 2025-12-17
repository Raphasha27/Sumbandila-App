import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './context/ThemeContext';

// Screens
import ScannerScreen from './screens/ScannerScreen';
import LandingScreen from './screens/LandingScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import StudentDashboard from './screens/StudentDashboard';
import EventsScreen from './screens/EventsScreen';
import ChatScreen from './screens/ChatScreen';
import AdminDashboard from './screens/AdminDashboard';
import ReportFraudScreen from './screens/ReportFraudScreen';
import ProfileScreen from './screens/ProfileScreen';
import VerificationHistoryScreen from './screens/VerificationHistoryScreen';
import AIAssistantScreen from './screens/AIAssistantScreen';
import ContactScreen from './screens/ContactScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { isDarkMode } = useTheme();

  return (
    <>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
        {/* Onboarding */}
        <Stack.Screen name="Landing" component={LandingScreen} />

        {/* Auth Flow */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        {/* Student Flow */}
        <Stack.Screen name="Dashboard" component={StudentDashboard} />
        <Stack.Screen name="Events" component={EventsScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />

        {/* Public Flow */}
        <Stack.Screen name="PublicHome" component={HomeScreen} />
        <Stack.Screen name="Scanner" component={ScannerScreen} />
        <Stack.Screen name="ReportFraud" component={ReportFraudScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />

        {/* New Phase 1 Screens */}
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="VerificationHistory" component={VerificationHistoryScreen} />

        {/* AI Assistant & Contact */}
        <Stack.Screen name="AIAssistant" component={AIAssistantScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
      </Stack.Navigator>
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
