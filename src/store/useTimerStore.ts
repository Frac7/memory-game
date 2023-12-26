import { StoreApi, UseBoundStore, create } from "zustand";

import { TimerState, TimerStore } from "@/store/types";
import "@/utils/shuffle";

const initialState: TimerState = {
  timer: 0,
  isActive: false,
};

const useTimerStore: UseBoundStore<StoreApi<TimerStore>> = create(
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

export default useTimerStore;

export const timerSelector = (state: TimerStore) => ({
  timer: state.timer,
  stopTimer: state.stopTimer,
  resetTimer: state.resetTimer,
  startTimer: state.startTimer,
  isActive: state.isActive,
});
