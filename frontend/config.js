import { Platform } from 'react-native';

// For Android Emulator, use 'http://10.0.2.2:5000'
// For Physical Android Device, use your machine's LAN IP, e.g., 'http://192.168.1.50:5000'
// For Web, use 'http://localhost:5000'

// Local development server configuration
// For Android Emulator: use 10.0.2.2
// For Web: use localhost
// For iOS Simulator: use localhost
// For Android with `adb reverse tcp:5000 tcp:5000`, localhost works reliably.
const backendUrl = Platform.OS === 'web'
    ? 'http://localhost:4000'
    : 'http://localhost:4000'; // Works with adb reverse

export default {
    apiBase: backendUrl
};
