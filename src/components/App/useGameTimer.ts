import { MemoryGameStore } from "@/store/types";
import useMemoryGameStore from "@/store/useMemoryGameStore";
import { useEffect } from "react";

export default function useGameTimer() {
  const incrementTimer = useMemoryGameStore(
    (state: MemoryGameStore) => state.incrementTimer
  );
  useEffect(() => {
    const interval = setInterval(() => {
      incrementTimer();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [incrementTimer]);
}
