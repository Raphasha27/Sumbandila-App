import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useRegistryStore = create(
  persist(
    (set) => ({
      user: null,
      vault: [],
      searchQuery: '',
      activeScreen: 'splash',
      
      setUser: (user) => set({ user, activeScreen: user ? 'dashboard' : 'splash' }),
      logout: () => {
        localStorage.removeItem('sumbandila_user');
        set({ user: null, activeScreen: 'splash' });
      },
      
      addToVault: (provider) => set((state) => {
        if (state.vault.some((item) => item.name === provider.name)) return state;
        const newItem = {
          ...provider,
          id: Date.now(),
          savedAt: new Date().toLocaleDateString('en-ZA', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
          }),
        };
        return { vault: [newItem, ...state.vault] };
      }),
      
      removeFromVault: (id) => set((state) => ({
        vault: state.vault.filter((item) => (item.id || item.name) !== id),
      })),
      
      clearVault: () => set({ vault: [] }),
      
      setSearchQuery: (query) => set({ searchQuery: query }),
      setScreen: (screen) => set({ activeScreen: screen }),
    }),
    {
      name: 'sumbandila-storage',
    }
  )
);
