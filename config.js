import { Platform } from 'react-native';

// For Android Emulator, use 'http://10.0.2.2:4000'
// For Physical Android Device, use your machine's LAN IP
// For Web, use 'http://localhost:4000'

// Default to localhost for now, works with adb reverse
const backendUrl = Platform.OS === 'web'
    ? 'http://localhost:4000'
    : 'http://localhost:4000';

export default {
    apiBase: backendUrl
};
