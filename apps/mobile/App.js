/**
 * Sumbandila V3 – App.js (Expo Go entry point)
 * Thin wrapper — just mounts the navigator.
 * All screen logic lives in screens/ and navigation/.
 */
import 'react-native-gesture-handler'; // Must be first import
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AppNavigator />
    </>
  );
}
