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
    initCards: async () => {
      const { fetchCards, duplicateCards, shuffleCards } = get();
      await fetchCards();
      duplicateCards();
      shuffleCards();
    },
    fetchCards: async () => {
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
    flipCardByIndex: (i: number) => {
      set((state: CardsState) => ({
        cards: state.cards.map((card, j) =>
          i === j ? { ...card, flipped: !card.flipped } : card
        ),
      }));
    },
    disableCardByIndex: (i: number) => {
      set((state: CardsState) => ({
        cards: state.cards.map((card, j) =>
          i === j ? { ...card, disabled: true } : card
        ),
      }));
    },
    resetCards: () => {
      set(initialState);
      get().initCards();
    },
  })
);

export default useCardsStore;

export const cardsSelector = (state: CardsStore) => state.cards;
export const initCardsSelector = (state: CardsStore) => state.initCards;
export const flippedCardsWithIndexSelector = (state: CardsStore) => {
  return state.cards
    .map((card, i) => ({ ...card, index: i }))
    .filter((card) => !card.disabled && card.flipped);
};
export const enabledCardsSelector = (state: CardsStore) => {
  return state.cards.filter((card) => !card.disabled);
};
