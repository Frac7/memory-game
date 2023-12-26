import { StoreApi, UseBoundStore, create } from "zustand";

import { GameTimerState, GameTimerStore } from "@/store/types";
import "@/utils/shuffle";

const initialState: GameTimerState = {
  timer: 0,
  isActive: false,
};

const useGameTimerStore: UseBoundStore<StoreApi<GameTimerStore>> = create(
  (set, get) => ({
    ...initialState,
    startTimer: () => {
      const isActive = get().isActive;
      if (!isActive) {
        set({
          isActive: true,
          interval: setInterval(() => {
            set({ timer: get().timer + 1 });
          }, 1000),
        });
      }
    },
    stopTimer: () => {
      const isActive = get().isActive;
      if (isActive) {
        set({ isActive: false });
        const interval = get().interval;
        clearInterval(interval);
      }
    },
    resetTimer: () => {
      get().stopTimer();
      set(initialState);
    },
  })
);

export default useGameTimerStore;

export const startTimerSelector = (state: GameTimerStore) => state.startTimer;
export const timerSelector = (state: GameTimerStore) => ({
  timer: state.timer,
  stopTimer: state.stopTimer,
  resetTimer: state.resetTimer,
  startTimer: state.startTimer,
  isActive: state.isActive,
});
