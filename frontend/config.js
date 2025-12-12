import { Platform } from 'react-native';

// For Android Emulator, use 'http://10.0.2.2:5000'
// For Physical Android Device, use your machine's LAN IP, e.g., 'http://192.168.1.50:5000'
// For Web, use 'http://localhost:5000'

const backendUrl = Platform.OS === 'web'
    ? 'http://localhost:5000'
    : 'https://sumbandila-app-production.up.railway.app'; // Railway Backend

export default {
    apiBase: backendUrl
};
