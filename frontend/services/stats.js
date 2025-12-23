import axios from 'axios';
import config from '../config';

const API_URL = config.apiBase;

export const getDashboardStats = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/stats`);
        return response.data;
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        throw error;
    }
};
