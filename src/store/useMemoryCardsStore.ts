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
      const cards = get().cards;
      const isFlipped = cards[i].flipped;

      const indexOtherFlipped = cards.findIndex((card) => card.flipped);

      set((state: MemoryCardsState) => ({
        cards: state.cards.map((card, j) =>
          i === j ? { ...card, flipped: !isFlipped } : card
        ),
      }));

      if (indexOtherFlipped !== -1) {
        if (cards[i].id === cards[indexOtherFlipped].id) {
          const disableCard = get().disableCard;
          disableCard(i);
          disableCard(indexOtherFlipped);
        }
      }
    },
    disableCard: (i: number) => {
      const cards = get().cards;
      cards[i].disabled = true;
    },
    resetCards: () => set(initialState),
  })
);

export default useMemoryCardsStore;

export const cardsSelector = (state: MemoryCardsState) => state.cards;
