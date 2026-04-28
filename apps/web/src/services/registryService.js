import { fuzzyMatch, normalizeSearch } from '../lib/search-utils';

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

    // Simulate different latencies: Education (Cached) is fast, Healthcare/Legal (Live) take longer
    const latency = category === 'Education' ? 800 : 1800;
    await new Promise(resolve => setTimeout(resolve, latency));

    const results = MOCK_DATA.providers.filter(p => {
      // Name match with Fuzzy Support
      const nameMatch = fuzzyMatch(q, p.name);
      
      // Exact matches for IDs
      const regMatch = (p.reg && p.reg.toLowerCase().includes(q)) ||
                       (p.emisNumber && p.emisNumber.toLowerCase().includes(q)) ||
                       (p.hpcsaNumber && p.hpcsaNumber.toLowerCase().includes(q)) ||
                       (p.lpcNumber && p.lpcNumber.toLowerCase().includes(q));

      // Course/Specialty match
      const courseMatch = (p.courses && p.courses.some(c => c.toLowerCase().includes(q))) ||
                          (p.specialization && p.specialization.toLowerCase().includes(q));

      return nameMatch || regMatch || courseMatch;
    });

    if (results.length > 0) {
      return results[0];
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
