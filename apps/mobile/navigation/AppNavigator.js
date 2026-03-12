/**
 * Sumbandila V3 – App Navigator
 * Bottom Tab navigation wrapping the core screens.
 * Stack navigator used for Verify → Result flow.
 * Compatible with Expo Go (no native modules required).
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Shield, Search, Flag, User } from 'lucide-react-native';

import HomeScreen from '../screens/HomeScreen';
import VerifyScreen from '../screens/VerifyScreen';
import ResultScreen from '../screens/ResultScreen';
import ReportScreen from '../screens/ReportScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const VerifyStack = createNativeStackNavigator();

const BLUE = '#0056b3';
const GREY = '#94A3B8';

/** Stack: Verify → Result (keeps result separate from tabs) */
function VerifyStackNavigator() {
  return (
    <VerifyStack.Navigator screenOptions={{ headerShown: false }}>
      <VerifyStack.Screen name="VerifySearch" component={VerifyScreen} />
      <VerifyStack.Screen name="Result" component={ResultScreen} />
    </VerifyStack.Navigator>
  );
}

/** Root bottom tab navigator */
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: BLUE,
          tabBarInactiveTintColor: GREY,
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopColor: '#E2E8F0',
            paddingBottom: 8,
            paddingTop: 6,
            height: 64,
          },
          tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarIcon: ({ color }) => <Shield size={22} color={color} />, tabBarLabel: 'Home' }}
        />
        <Tab.Screen
          name="Verify"
          component={VerifyStackNavigator}
          options={{ tabBarIcon: ({ color }) => <Search size={22} color={color} />, tabBarLabel: 'Verify' }}
        />
        <Tab.Screen
          name="Report"
          component={ReportScreen}
          options={{ tabBarIcon: ({ color }) => <Flag size={22} color={color} />, tabBarLabel: 'Report' }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ tabBarIcon: ({ color }) => <User size={22} color={color} />, tabBarLabel: 'Profile' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
