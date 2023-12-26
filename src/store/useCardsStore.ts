import { StoreApi, UseBoundStore, create } from "zustand";

import { CardsState, CardsStore } from "@/store/types";
import "@/utils/shuffle";
import { getCards } from "@/api/cards";

const initialState: CardsState = {
  cards: [],
};

const useCardsStore: UseBoundStore<StoreApi<CardsStore>> = create(
  (set, get) => ({
    ...initialState,
    getCards: async () => {
      const cards = await getCards();
      set(() => ({
        cards,
      }));
    },
    shuffleCards: () =>
      set((state: CardsState) => ({
        cards: state.cards.shuffle(),
      })),
    duplicateCards: () =>
      set((state: CardsState) => ({
        cards: state.cards.concat(state.cards),
      })),
    flipCard: (i: number) => {
      set((state: CardsState) => ({
        cards: state.cards.map((card, j) =>
          i === j ? { ...card, flipped: !card.flipped } : card
        ),
      }));
    },
    disableCard: (i: number) => {
      set((state: CardsState) => ({
        cards: state.cards.map((card, j) =>
          i === j ? { ...card, disabled: true } : card
        ),
      }));
    },
    getFlippedCardsWithIndex: () => {
      return get()
        .cards.map((card, i) => ({ ...card, index: i }))
        .filter((card) => !card.disabled && card.flipped);
    },
    resetCards: () => set(initialState),
  })
);

export default useCardsStore;

export const cardsSelector = (state: CardsState) => state.cards;
