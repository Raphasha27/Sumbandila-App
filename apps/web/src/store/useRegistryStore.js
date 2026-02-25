import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useRegistryStore = create(
  persist(
    (set) => ({
      user: null,
      vault: [],
      searchQuery: '',
      activeScreen: 'splash',
      notifications: [],
      integrityPulse: 98.4,
      selectedCategory: 'Education',
      aiMessages: [{
        id: 1,
        role: 'assistant',
        text: 'Welcome to the Registry Sentinel. I am your AI compliance assistant. How can I help you verify today?'
      }],

      setUser: (user) => set({ user, activeScreen: user ? 'dashboard' : 'splash' }),
      logout: () => {
        localStorage.removeItem('sumbandila_user');
        set({ user: null, activeScreen: 'splash' });
      },

      addNotification: (note) => set((state) => ({
        notifications: [{ id: Date.now(), ...note }, ...state.notifications].slice(0, 5)
      })),
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),

      updateIntegrity: () => set(() => ({
        integrityPulse: Number((98.2 + Math.random() * 0.4).toFixed(2))
      })),

      addAiMessage: (msg) => set((state) => ({
        aiMessages: [...state.aiMessages, { id: Date.now(), ...msg }]
      })),
      clearAiMessages: () => set({
        aiMessages: [{
          id: Date.now(),
          role: 'assistant',
          text: 'Registry logs cleared. Initializing new security session. How can I assist?'
        }]
      }),

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
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      aiOpen: false,
      setAiOpen: (open) => set({ aiOpen: open }),
    }),
    {
      name: 'sumbandila-storage',
      partialize: (state) => ({
        user: state.user,
        vault: state.vault,
        searchQuery: state.searchQuery,
        aiMessages: state.aiMessages
      }),
    }
  )
);
