import { StoreApi, UseBoundStore, create } from "zustand";

import { MemoryCardsState, MemoryCardsStore } from "@/store/types";
import "@/utils/shuffle";

const initialState: MemoryCardsState = {
  cards: [],
};

const useMemoryCardsStore: UseBoundStore<StoreApi<MemoryCardsStore>> = create(
  (set) => ({
    ...initialState,
    getCards: () =>
      set(() => ({
        cards: Array(5)
          .fill(0)
          .map((_, i) => ({
            id: i,
            content: (Math.random() * 100).toFixed(0),
          })),
      })),
    shuffleCards: () =>
      set((state: MemoryCardsState) => ({
        cards: state.cards.shuffle(),
      })),
    duplicateCards: () =>
      set((state: MemoryCardsState) => ({
        cards: state.cards.concat(state.cards),
      })),
    resetCards: () => set(initialState),
  })
);

export default useMemoryCardsStore;

export const cardsSelector = (state: MemoryCardsState) => state.cards;
