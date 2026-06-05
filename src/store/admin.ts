import { create } from 'zustand';

interface AdminStore {
  isAuthenticated: boolean;
  user: any | null;
  setAuthenticated: (value: boolean) => void;
  setUser: (user: any) => void;
  logout: () => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
  isAuthenticated: false,
  user: null,
  setAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
  setUser: (user: any) => set({ user }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));
