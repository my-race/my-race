import { create } from 'zustand';

interface WebUrlState {
  url: string | null;
  setUrl: (url: string) => void;
  resetUrl: () => void;
}

export const useWebUrlStore = create<WebUrlState>((set) => ({
  url: null,
  setUrl: (url) => set({ url }),
  resetUrl: () => set({ url: null }),
}));
