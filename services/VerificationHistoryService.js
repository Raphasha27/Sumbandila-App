import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_STORAGE_KEY = '@sumbandila_verification_history';
const MAX_HISTORY_ITEMS = 50;

/**
 * Verification History Service
 * Stores and retrieves verification search history locally
 */

export const VerificationHistoryService = {
    /**
     * Get all verification history items
     * @returns {Promise<Array>} Array of history items
     */
    async getHistory() {
        try {
            const history = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);
            return history ? JSON.parse(history) : [];
        } catch (error) {
            console.log('Error getting verification history:', error);
            return [];
        }
    },

    /**
     * Add a new verification to history
     * @param {Object} verification - The verification result to save
     * @param {string} verification.query - Search query
     * @param {string} verification.category - Category (education, medical, legal)
     * @param {Object} verification.result - The verification result data
     * @param {boolean} verification.isVerified - Whether entity was verified
     */
    async addToHistory(verification) {
        try {
            const history = await this.getHistory();

            const newItem = {
                id: Date.now().toString(),
                query: verification.query,
                category: verification.category,
                result: verification.result,
                isVerified: verification.isVerified,
                timestamp: new Date().toISOString(),
            };

            // Add to beginning of array
            history.unshift(newItem);

            // Limit history size
            if (history.length > MAX_HISTORY_ITEMS) {
                history.pop();
            }

            await AsyncStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
            return newItem;
        } catch (error) {
            console.log('Error adding to verification history:', error);
            return null;
        }
    },

    /**
     * Remove a specific item from history
     * @param {string} id - The item ID to remove
     */
    async removeFromHistory(id) {
        try {
            const history = await this.getHistory();
            const filtered = history.filter(item => item.id !== id);
            await AsyncStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(filtered));
            return true;
        } catch (error) {
            console.log('Error removing from verification history:', error);
            return false;
        }
    },

    /**
     * Clear all verification history
     */
    async clearHistory() {
        try {
            await AsyncStorage.removeItem(HISTORY_STORAGE_KEY);
            return true;
        } catch (error) {
            console.log('Error clearing verification history:', error);
            return false;
        }
    },

    /**
     * Get history filtered by category
     * @param {string} category - Category to filter by
     */
    async getHistoryByCategory(category) {
        const history = await this.getHistory();
        return history.filter(item => item.category === category);
    },

    /**
     * Get recent history (last 5 items)
     */
    async getRecentHistory() {
        const history = await this.getHistory();
        return history.slice(0, 5);
    },
};

export default VerificationHistoryService;
