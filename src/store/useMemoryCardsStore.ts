import { StoreApi, UseBoundStore, create } from "zustand";

import { MemoryCardsState, MemoryCardsStore } from "@/store/types";
import "@/utils/shuffle";
import { getCards } from "@/api/cards";

const initialState: MemoryCardsState = {
  cards: [],
};

const useMemoryCardsStore: UseBoundStore<StoreApi<MemoryCardsStore>> = create(
  (set) => ({
    ...initialState,
    getCards: async () => {
      const cards = await getCards();
      set(() => ({
        cards,
      }));
    },
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
