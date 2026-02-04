import { MOCK_DATA } from '../lib/mock-data';

/**
 * RegistryService
 * Mimics a backend API for the South African national registries.
 * In a real-world scenario, this would interface with DHET, HPCSA, and LPC endpoints.
 */
export const RegistryService = {
  /**
   * Performs a high-integrity search across all registries.
   * @param {string} query The search term (Institution name, Dr. Name, etc.)
   */
  async search(query) {
    if (!query.trim()) return null;
    
    // Simulate network latency for authentic full-stack feel
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const results = MOCK_DATA.providers.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    
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
      return {
        name: MOCK_DATA.auth.admin.name, 
        email: MOCK_DATA.auth.admin.email,
        avatar: MOCK_DATA.auth.admin.avatar,
        mobile: MOCK_DATA.auth.admin.mobile
      };
    }
    throw new Error('Invalid Registry Credentials');
  }
};
