import { StoreApi, UseBoundStore, create } from "zustand";

import { MemoryGameState, MemoryGameStore } from "@/store/types";

const initialState: MemoryGameState = {
  score: 0,
  flips: 0,
};

const useMemoryGameStore: UseBoundStore<StoreApi<MemoryGameStore>> = create(
  (set) => ({
    ...initialState,
    incrementScore: () =>
      set((state: MemoryGameState) => ({ score: state.score + 1 })),
    incrementFlips: () =>
      set((state: MemoryGameState) => ({ flips: state.flips + 1 })),
    resetGame: () => set(initialState),
  })
);

export default useMemoryGameStore;

export const gameControllerSelector = (state: MemoryGameState) => ({
  score: state.score,
  flips: state.flips,
});
