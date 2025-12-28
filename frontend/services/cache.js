import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEYS = {
  VERIFICATION_HISTORY: '@sumbandila/verification_history',
  STATS: '@sumbandila/stats',
  ALERTS: '@sumbandila/alerts',
};

const MAX_HISTORY_ITEMS = 50;

export const CacheService = {
  // Verification History
  async addVerificationToHistory(verification) {
    try {
      const history = await this.getVerificationHistory();
      const newHistory = [
        {
          ...verification,
          timestamp: Date.now(),
          id: `${verification.type}_${Date.now()}`,
        },
        ...history,
      ].slice(0, MAX_HISTORY_ITEMS);
      
      await AsyncStorage.setItem(
        CACHE_KEYS.VERIFICATION_HISTORY,
        JSON.stringify(newHistory)
      );
      return newHistory;
    } catch (error) {
      console.error('Error adding to verification history:', error);
      return [];
    }
  },

  async getVerificationHistory() {
    try {
      const data = await AsyncStorage.getItem(CACHE_KEYS.VERIFICATION_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting verification history:', error);
      return [];
    }
  },

  async clearVerificationHistory() {
    try {
      await AsyncStorage.removeItem(CACHE_KEYS.VERIFICATION_HISTORY);
    } catch (error) {
      console.error('Error clearing verification history:', error);
    }
  },

  // Stats Caching
  async cacheStats(stats) {
    try {
      await AsyncStorage.setItem(
        CACHE_KEYS.STATS,
        JSON.stringify({ ...stats, cachedAt: Date.now() })
      );
    } catch (error) {
      console.error('Error caching stats:', error);
    }
  },

  async getCachedStats() {
    try {
      const data = await AsyncStorage.getItem(CACHE_KEYS.STATS);
      if (!data) return null;
      
      const cached = JSON.parse(data);
      const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
      
      if (Date.now() - cached.cachedAt > CACHE_DURATION) {
        return null; // Cache expired
      }
      
      return cached;
    } catch (error) {
      console.error('Error getting cached stats:', error);
      return null;
    }
  },

  // Alerts Caching
  async cacheAlerts(alerts) {
    try {
      await AsyncStorage.setItem(
        CACHE_KEYS.ALERTS,
        JSON.stringify({ alerts, cachedAt: Date.now() })
      );
    } catch (error) {
      console.error('Error caching alerts:', error);
    }
  },

  async getCachedAlerts() {
    try {
      const data = await AsyncStorage.getItem(CACHE_KEYS.ALERTS);
      if (!data) return null;
      
      const cached = JSON.parse(data);
      const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
      
      if (Date.now() - cached.cachedAt > CACHE_DURATION) {
        return null;
      }
      
      return cached.alerts;
    } catch (error) {
      console.error('Error getting cached alerts:', error);
      return null;
    }
  },
};
