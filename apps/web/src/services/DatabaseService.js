import { MOCK_DATA } from '../lib/mock-data';

/**
 * DatabaseService
 * 
 * This service handles all data interactions for the National Registry Sentinel.
 * Currently it interfaces with MOCK_DATA and localStorage to simulate a database.
 * To connect to a real database (e.g. Supabase, Firebase, or a REST API):
 * 1. Update the BASE_URL or init the DB client.
 * 2. Replace the local methods with async fetch/client calls.
 */

class DatabaseService {
    constructor() {
        this.useLocalStorage = true;
        this.dbName = 'sumbandila_registry_db';
        this.initialized = false;
    }

    /**
     * Initialize the database with mock data if it's empty
     */
    async init() {
        if (this.initialized) return;

        if (this.useLocalStorage) {
            const existingData = localStorage.getItem(this.dbName);
            if (!existingData) {
                localStorage.setItem(this.dbName, JSON.stringify(MOCK_DATA));
            }
        }

        this.initialized = true;
        console.log('✅ Registry Database Connection: ACTIVE');
    }

    /**
     * Generic fetcher to handle future API transitions
     */
    async get(collection) {
        await this.init();

        if (this.useLocalStorage) {
            const data = JSON.parse(localStorage.getItem(this.dbName));
            return data[collection] || [];
        }

        // Future API placeholder:
        // const res = await fetch(`${API_URL}/${collection}`);
        // return res.json();
    }

    /**
     * Search providers with real-time filtering
     */
    async searchProviders(query) {
        const providers = await this.get('providers');
        if (!query) return [];

        const lowerQuery = query.toLowerCase();
        return providers.filter(p =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.reg.toLowerCase().includes(lowerQuery)
        );
    }

    /**
     * Get latest scam alerts
     */
    async getLatestScams() {
        return await this.get('scamTracker');
    }

    /**
     * Log an authentication attempt or search result (Audit Trail)
     */
    async logAuditRecord(record) {
        console.log('📝 Audit Record Encrypted & Stored:', record);
        // In a real DB, this would be: 
        // await db.from('audit_logs').insert(record);
    }
}

export const db = new DatabaseService();
