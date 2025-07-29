import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      accessToken: null,
      isAuthenticated: false,
      login: (accessToken) => set({ accessToken, isAuthenticated: true }),
      logout: () => set({ accessToken: null, isAuthenticated: false }),
    }),
    {
      name: 'userInfo',
      partialize: (state) => ({
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
