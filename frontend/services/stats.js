import axios from 'axios';
import config from '../config';

const API_URL = config.apiBase;

export const getDashboardStats = async () => {
    try {
        console.log(`[Stats] Fetching from: ${API_URL}/api/stats`);
        const response = await axios.get(`${API_URL}/api/stats`);
        return response.data;
    } catch (error) {
        console.error(`[Stats] Error fetching from ${API_URL}/api/stats:`, error.message);
        throw error;
    }
};
