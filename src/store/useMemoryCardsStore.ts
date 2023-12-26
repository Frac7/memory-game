import { StoreApi, UseBoundStore, create } from "zustand";

import { MemoryCardsState, MemoryCardsStore } from "@/store/types";
import "@/utils/shuffle";
import { getCards } from "@/api/cards";

const initialState: MemoryCardsState = {
  cards: [],
};

const useMemoryCardsStore: UseBoundStore<StoreApi<MemoryCardsStore>> = create(
  (set, get) => ({
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
    flipCard: (i: number) => {
      set((state: MemoryCardsState) => ({
        cards: state.cards.map((card, j) =>
          i === j ? { ...card, flipped: !card.flipped } : card
        ),
      }));
    },
    disableCard: (i: number) => {
      set((state: MemoryCardsState) => ({
        cards: state.cards.map((card, j) =>
          i === j ? { ...card, disabled: true } : card
        ),
      }));
    },
    getFlippedCards: () => {
      return get()
        .cards.map((card, i) => ({ ...card, index: i }))
        .filter((card) => !card.disabled && card.flipped);
    },
    resetCards: () => set(initialState),
  })
);

export default useMemoryCardsStore;

export const cardsSelector = (state: MemoryCardsState) => state.cards;
