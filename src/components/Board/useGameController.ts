import { useShallow } from "zustand/react/shallow";

import useMemoryGameStore, {
  gameControllerSelector,
} from "@/store/useMemoryGameStore";
import useGameTimerStore, {
  startTimerSelector,
} from "@/store/useGameTimerStore";
import useMemoryCardsStore from "@/store/useMemoryCardsStore";

export default function useGameController() {
  const { score, flips, incrementFlips } = useMemoryGameStore(
    useShallow(gameControllerSelector)
  );
  const { cardClicked } = useMemoryCardsStore();

  const startTimer = useGameTimerStore(useShallow(startTimerSelector));

  const getOnCardClick = (i: number) => () => {
    startTimer();
    cardClicked(i);
    incrementFlips();
  };

  return {
    getOnCardClick,
    score,
    flips,
  };
}
