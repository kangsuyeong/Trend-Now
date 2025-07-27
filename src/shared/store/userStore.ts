import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  accessToken: string | null;
  memberId: number | null;
  login: (accessToken: string, memberId: number) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      accessToken: '',
      memberId: null,
      login: (accessToken, memberId) => set({ accessToken, memberId }),
      logout: () => set({ accessToken: null, memberId: null }),
    }),
    {
      name: 'userInfo',
      partialize: (state) => ({ accessToken: state.accessToken, memberId: state.memberId }),
    }
  )
);
