import { Platform } from 'react-native';

// Local development server configuration
// For Android Emulator: use 10.0.2.2
// For Web: use localhost
// For iOS Simulator: use localhost
const backendUrl = Platform.OS === 'web'
    ? 'http://localhost:5000'
    : Platform.OS === 'android'
    ? 'http://10.0.2.2:5000'  // Android Emulator
    : 'http://localhost:5000'; // iOS Simulator

export default {
    apiBase: backendUrl
};
