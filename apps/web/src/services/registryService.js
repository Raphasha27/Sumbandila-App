import { fuzzyMatch, normalizeSearch } from '../lib/search-utils';
import { MOCK_DATA } from '../lib/mock-data';
import { db } from './DatabaseService';

/**
 * RegistryService
 * Mimics a backend API for the South African national registries.
 */
export const RegistryService = {
  /**
   * Performs a high-integrity search across all registries.
   * Uses 'Hybrid-Cached' logic for speed and 'Live' fallback simulation.
   */
  async search(query, category = 'Education') {
    const q = normalizeSearch(query);
    if (!q) return null;

    // SANC Security Check: Nursing requires ID or SANC Ref (Numeric/Specific)
    if (category === 'Healthcare' && q.length < 5 && !/\d/.test(q)) {
      throw new Error("Nursing verification (SANC) requires an ID Number or SANC Reference Number for security.");
    }

    // Simulate different latencies: Education (Cached) is fast, Healthcare/Legal (Live) take longer
    const latency = category === 'Education' ? 800 : 1800;
    await new Promise(resolve => setTimeout(resolve, latency));

    const results = MOCK_DATA.providers.filter(p => {
      // Name match with Fuzzy Support (Skip for strict ID-only SANC searches)
      const nameMatch = category === 'Education' ? fuzzyMatch(q, p.name) : p.name.toLowerCase().includes(q);
      
      // Exact matches for IDs (EMIS, SANC, HPCSA, LPC)
      const regMatch = (p.reg && p.reg.toLowerCase().includes(q)) ||
                       (p.emisNumber && p.emisNumber.toLowerCase().includes(q)) ||
                       (p.hpcsaNumber && p.hpcsaNumber.toLowerCase().includes(q)) ||
                       (p.lpcNumber && p.lpcNumber.toLowerCase().includes(q));

      return nameMatch || regMatch;
    });

    if (results.length > 0) {
      const result = results[0];
      
      // 1. Expiry Check
      if (result.validUntil && new Date(result.validUntil) < new Date()) {
        result.status = 'Expired';
        result.sentinelAlert = "RED ALERT: Registration has expired. This entity is no longer authorized to operate.";
      }

      // 2. Scope of Practice Check (Medical)
      if (result.category === 'Healthcare' && result.type === 'General Practitioner' && result.specialization?.includes('Surgery')) {
        result.sentinelAlert = "YELLOW WARNING: Practitioner is a GP but performing specialized surgery. Verify scope with HPCSA.";
      }

      // 3. Sentinel Red Flag (Institution vs Course)
      if (result.category === 'Education' && result.institutionRegistration === 'Registered' && result.courseAccreditation === 'NOT ACCREDITED') {
        result.sentinelAlert = "YELLOW WARNING: Institution is registered, but this course is NOT accredited.";
      }
      
      return result;
    }

    // Return high-risk/unverified entity profile if no match is found
    return {
      name: query,
      type: 'Unknown Entity',
      status: 'Unverified',
      reg: `ID_NOT_FOUND_${Math.floor(Math.random() * 1000)}`,
      body: 'External Registry',
      risk: 'High'
    };
  },

  /**
   * Validates administrative credentials against the National Registry Database.
   */
  async login(email, password) {
    await new Promise(resolve => setTimeout(resolve, 800));

    if (email === MOCK_DATA.auth.admin.email && password === MOCK_DATA.auth.admin.password) {
      const user = {
        name: MOCK_DATA.auth.admin.name,
        email: MOCK_DATA.auth.admin.email,
        avatar: MOCK_DATA.auth.admin.avatar,
        mobile: MOCK_DATA.auth.admin.mobile
      };
      await db.logSession(email, 'LOGIN');
      return user;
    }
    throw new Error('Invalid Registry Credentials');
  }
};
