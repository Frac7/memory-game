import { StoreApi, UseBoundStore, create } from "zustand";

import { TimerState, TimerStore } from "@/store/types";
import "@/utils/shuffle";
import { INITIAL_TIMER } from "./constants";

const initialState: TimerState = {
  timer: INITIAL_TIMER,
  isActive: false,
};

const useTimerStore: UseBoundStore<StoreApi<TimerStore>> = create(
  (set, get) => ({
    ...initialState,
    startTimer: () => {
      const isActive = get().isActive;
      if (!isActive) {
        const interval = setInterval(() => {
          const timer = get().timer;
          if (timer > 0) {
            set({ timer: timer - 1 });
          }
        }, 1000);

        set({
          isActive: true,
          interval,
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

export default useTimerStore;

export const timerSelector = (state: TimerStore) => ({
  timer: state.timer,
  stopTimer: state.stopTimer,
  startTimer: state.startTimer,
  isActive: state.isActive,
});
