import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  jwt: string | null;
  memberId: number | null;
  login: (jwt: string, memberId: number) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      jwt: null,
      memberId: null,
      login: (jwt, memberId) => set({ jwt, memberId }),
      logout: () => set({ jwt: null, memberId: null }),
    }),
    {
      name: 'userInfo',
      partialize: (state) => ({ jwt: state.jwt, memberId: state.memberId }),
    }
  )
);
