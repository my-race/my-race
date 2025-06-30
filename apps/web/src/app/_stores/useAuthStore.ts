import { create } from "zustand";

type AuthState = {
  user: { name: string } | null;
  setUser: (u: AuthState["user"]) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
