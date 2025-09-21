import { create } from 'zustand';

type ScrollState = {
  canScrollUp: boolean;
  canScrollDown: boolean;
  setCanScrollUp: (canScrollUp: boolean) => void;
  setCanScrollDown: (canScrollDown: boolean) => void;
};

export const useScrollStore = create<ScrollState>((set) => ({
  canScrollUp: false,
  canScrollDown: false,
  setCanScrollUp: (canScrollUp) => set({ canScrollUp }),
  setCanScrollDown: (canScrollDown) => set({ canScrollDown }),
}));