import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'sumbandila_jwt_token';
const USER_KEY = 'sumbandila_user';

/**
 * Store authentication token
 */
export const storeToken = async (token) => {
    try {
        await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
        console.error('Error storing token:', error);
    }
};

/**
 * Get authentication token
 */
export const getToken = async () => {
    try {
        return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
        console.error('Error getting token:', error);
        return null;
    }
};

/**
 * Store user data
 */
export const storeUser = async (user) => {
    try {
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
        console.error('Error storing user:', error);
    }
};

/**
 * Get user data
 */
export const getUser = async () => {
    try {
        const userStr = await AsyncStorage.getItem(USER_KEY);
        return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
        console.error('Error getting user:', error);
        return null;
    }
};

/**
 * Clear all auth data (logout)
 */
export const clearAuth = async () => {
    try {
        await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
    } catch (error) {
        console.error('Error clearing auth:', error);
    }
};

/**
 * Make authenticated API request with JWT token
 */
export const authenticatedFetch = async (url, options = {}) => {
    const token = await getToken();

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return fetch(url, {
        ...options,
        headers
    });
};
