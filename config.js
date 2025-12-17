import Constants from 'expo-constants';
import { Platform } from 'react-native';

const getBackendUrl = () => {
    if (Platform.OS === 'web') return 'http://localhost:5000';

    // For physical devices, use the IP address of the machine running Expo
    const hostUri = Constants.expoConfig?.hostUri;
    if (hostUri) {
        const ipAddress = hostUri.split(':')[0];
        return `http://${ipAddress}:5000`;
    }

    // Fallback for emulator if hostUri is missing
    return 'http://10.0.2.2:5000';
};

const backendUrl = getBackendUrl();

export default {
    apiBase: backendUrl
};
