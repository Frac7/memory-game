import { StoreApi, UseBoundStore, create } from "zustand";

import { MemoryGameState, MemoryGameStore } from "@/store/types";
import useMemoryCardsStore from "./useMemoryCardsStore";
import { DECREASE_SCORE_AMOUNT, INCREASE_SCORE_AMOUNT } from "./constants";
import useGameTimerStore, { startTimerSelector } from "./useGameTimerStore";

const initialState: MemoryGameState = {
  score: 0,
  flips: 0,
};

const useMemoryGameStore: UseBoundStore<StoreApi<MemoryGameStore>> = create(
  (set, get) => ({
    ...initialState,
    incrementScore: (amount: number) =>
      set((state: MemoryGameState) => ({ score: state.score + amount })),
    incrementFlips: () =>
      set((state: MemoryGameState) => ({ flips: state.flips + 1 })),
    handleFlip: (i: number) => {
      const startTimer = startTimerSelector(useGameTimerStore.getState());
      startTimer();

      const { getFlippedCards, flipCard, disableCard } =
        useMemoryCardsStore.getState();
      flipCard(i);

      const { incrementScore, incrementFlips } = get();
      incrementFlips();

      const flippedCards = getFlippedCards();
      if (flippedCards.length !== 2) {
        return;
      }

      if (flippedCards[0].id === flippedCards[1].id) {
        setTimeout(() => {
          disableCard(flippedCards[0].index);
          disableCard(flippedCards[1].index);
          incrementScore(INCREASE_SCORE_AMOUNT);
        }, 1500);
        return;
      }

      setTimeout(() => {
        flipCard(flippedCards[0].index);
        flipCard(flippedCards[1].index);
        incrementScore(DECREASE_SCORE_AMOUNT);
      }, 1500);
    },
    resetGame: () => set(initialState),
  })
);

export default useMemoryGameStore;

export const gameControllerSelector = (state: MemoryGameStore) => ({
  score: state.score,
  flips: state.flips,
  handleFlip: state.handleFlip,
  incrementFlips: state.incrementFlips,
});
