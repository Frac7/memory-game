import { StoreApi, UseBoundStore, create } from "zustand";

import { GameState, GameStore } from "@/store/types";
import useCardsStore from "./useCardsStore";
import { DECREASE_SCORE_AMOUNT, INCREASE_SCORE_AMOUNT } from "./constants";
import useTimerStore, { startTimerSelector } from "./useTimerStore";

const initialState: GameState = {
  score: 0,
  flips: 0,
};

const useGameStore: UseBoundStore<StoreApi<GameStore>> = create(
  (set, get) => ({
    ...initialState,
    incrementScore: (amount: number) =>
      set((state: GameState) => ({ score: state.score + amount })),
    incrementFlips: () =>
      set((state: GameState) => ({ flips: state.flips + 1 })),
    handleFlip: (i: number) => {
      const startTimer = startTimerSelector(useTimerStore.getState());
      startTimer();

      const { getFlippedCardsWithIndex, flipCard, disableCard } =
        useCardsStore.getState();
      flipCard(i);

      const { incrementScore, incrementFlips } = get();
      incrementFlips();

      const flippedCards = getFlippedCardsWithIndex();
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

export default useGameStore;

export const gameControllerSelector = (state: GameStore) => ({
  score: state.score,
  flips: state.flips,
  handleFlip: state.handleFlip,
  incrementFlips: state.incrementFlips,
});
