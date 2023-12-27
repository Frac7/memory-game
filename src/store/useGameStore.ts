import { StoreApi, UseBoundStore, create } from "zustand";

import { GameState, GameStore } from "@/store/types";
import useCardsStore, {
  enabledCardsSelector,
  flippedCardsWithIndexSelector,
} from "./useCardsStore";
import { DECREASE_SCORE_AMOUNT, INCREASE_SCORE_AMOUNT } from "./constants";
import useTimerStore from "./useTimerStore";

const initialState: GameState = {
  score: 0,
  flips: 0,
  completed: false,
};

useTimerStore.subscribe((state) => {
  if (state.timer === 0) {
    useGameStore.getState().completeGame();
  }
});

const useGameStore: UseBoundStore<StoreApi<GameStore>> = create((set, get) => ({
  ...initialState,
  incrementScore: (amount: number) =>
    set((state: GameState) => ({ score: state.score + amount })),
  incrementFlips: () => set((state: GameState) => ({ flips: state.flips + 1 })),
  handleFlip: (i: number) => {
    const { startTimer, stopTimer } = useTimerStore.getState();
    startTimer();

    const cardsStore = useCardsStore.getState();
    const { flipCardByIndex, disableCardByIndex } = cardsStore;
    flipCardByIndex(i);

    const { incrementScore, incrementFlips, completeGame } = get();
    incrementFlips();

    const flippedCards = flippedCardsWithIndexSelector(useCardsStore.getState()); // Fresh value needed after the flip
    if (flippedCards.length !== 2) {
      return;
    }

    if (flippedCards[0].id !== flippedCards[1].id) {
      setTimeout(() => {
        flipCardByIndex(flippedCards[0].index);
        flipCardByIndex(flippedCards[1].index);
        incrementScore(DECREASE_SCORE_AMOUNT);
      }, 1000);
      return;
    }

    setTimeout(() => {
      disableCardByIndex(flippedCards[0].index);
      disableCardByIndex(flippedCards[1].index);
      incrementScore(INCREASE_SCORE_AMOUNT);

      const enabledCards = enabledCardsSelector(useCardsStore.getState()); // Fresh value needed after the disable
      if (enabledCards.length === 0) {
        stopTimer();
        completeGame();
      }
    }, 1000);
  },
  completeGame: () => set({ completed: true }),
  resetGame: () => set(initialState),
  restartGame: () => {
    useTimerStore.getState().resetTimer();
    useCardsStore.getState().resetCards();
    get().resetGame();
  },
}));

export default useGameStore;

export const gameControllerSelector = (state: GameStore) => ({
  score: state.score,
  flips: state.flips,
  handleFlip: state.handleFlip,
  incrementFlips: state.incrementFlips,
  restartGame: state.restartGame,
});
export const isCompletedSelector = (state: GameStore) => state.completed;
