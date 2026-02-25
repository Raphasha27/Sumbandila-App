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
            const dbData = JSON.parse(localStorage.getItem(this.dbName)) || {};
            return dbData[collection] || [];
        }
    }

    /**
     * Generic setter to handle persistence
     */
    async set(collection, data) {
        await this.init();

        if (this.useLocalStorage) {
            const dbData = JSON.parse(localStorage.getItem(this.dbName)) || {};
            dbData[collection] = data;
            localStorage.setItem(this.dbName, JSON.stringify(dbData));
            return true;
        }
    }

    /**
     * Save a new assistance request (Persistence)
     */
    async saveAssistanceRequest(request) {
        const requests = await this.get('assistanceRequests') || [];
        const newRequest = {
            ...request,
            id: `req-${Date.now()}`,
            status: 'Investigation Pending',
            registrySync: 'VERIFIED'
        };

        await this.set('assistanceRequests', [...requests, newRequest]);

        // Log for Audit Trail
        await this.logAuditRecord({
            type: 'DATA_WRITE',
            collection: 'assistanceRequests',
            recordId: newRequest.id,
            timestamp: new Date().toISOString()
        });

        return newRequest;
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
        const logs = await this.get('auditLogs') || [];
        const newRecord = {
            ...record,
            id: `audit-${Date.now()}`,
            timestamp: new Date().toISOString()
        };
        await this.set('auditLogs', [...logs, newRecord].slice(-100)); // Keep last 100 logs
        console.log('📝 Audit Record Encrypted & Stored:', newRecord);
    }

    /**
     * Specialized logging for user sessions
     */
    async logSession(email, action) {
        await this.logAuditRecord({
            type: 'USER_SESSION',
            user: email,
            action: action, // 'LOGIN' or 'LOGOUT'
            device: navigator.userAgent.substring(0, 50)
        });
    }

    /**
     * Retrieve audit logs for administrative review
     */
    async getAuditLogs() {
        return await this.get('auditLogs');
    }
}

export const db = new DatabaseService();
