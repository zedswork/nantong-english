import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { API_ENDPOINTS } from '../config/api';
import api from '../services/api';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const data = await api.post(API_ENDPOINTS.login, { email, password });
          set({ user: data.user, token: data.token, isLoading: false });
          return data;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      register: async (email, password, name) => {
        set({ isLoading: true, error: null });
        try {
          const data = await api.post(API_ENDPOINTS.register, { email, password, name });
          set({ user: data.user, token: data.token, isLoading: false });
          return data;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({ user: null, token: null, error: null });
      },

      fetchUser: async () => {
        if (!get().token) return;
        try {
          const data = await api.get(API_ENDPOINTS.me);
          set({ user: data.user });
        } catch (error) {
          // Token invalid, clear auth
          set({ user: null, token: null });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
);
