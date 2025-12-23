import axios from 'axios';
import config from '../config';
const API_URL = config.apiBase;

export const verifyCode = async (scannedData) => {
    try {
        // Expected format: JSON string {"type": "doctor|school|lawyer", "id": "..."}
        // OR raw ID string implementation depending on requirements.
        // For MVP, we'll try to parse JSON, or fallback to a query.
        
        let type = 'doctor'; // default or detected
        let query = scannedData;

        try {
            const parsed = JSON.parse(scannedData);
            if (parsed.type && parsed.id) {
                type = parsed.type;
                query = parsed.id;
            }
        } catch (e) {
            // Not JSON, treat as raw query
            console.log('Scanned data is not JSON, using as raw query');
        }

        const response = await axios.get(`${API_URL}/api/verify`, {
            params: { type, q: query }
        });

        return response.data;
    } catch (error) {
        console.error('Verification error:', error);
        throw error;
    }
};
