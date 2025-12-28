import axios from 'axios';
import config from '../config';
import { CacheService } from './cache';

const API_URL = config.apiBase;

export const getDashboardStats = async () => {
    try {
        console.log(`[Stats] Fetching from: ${API_URL}/api/stats`);
        const response = await axios.get(`${API_URL}/api/stats`);
        
        // Cache the stats
        await CacheService.cacheStats(response.data);
        
        return response.data;
    } catch (error) {
        console.error(`[Stats] Error fetching from ${API_URL}/api/stats:`, error.message);
        
        // Try to return cached stats
        const cachedStats = await CacheService.getCachedStats();
        if (cachedStats) {
            console.log('[Stats] Returning cached stats');
            return cachedStats;
        }
        
        throw error;
    }
};
