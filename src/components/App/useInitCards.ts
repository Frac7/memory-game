import useMemoryCardsStore from "@/store/useMemoryCardsStore";
import { useEffect } from "react";

export default function useInitCards() {
  const { getCards, duplicateCards, shuffleCards, resetCards } =
    useMemoryCardsStore((state) => ({
      getCards: state.getCards,
      duplicateCards: state.duplicateCards,
      shuffleCards: state.shuffleCards,
      resetCards: state.resetCards,
    }));

  useEffect(() => {
    getCards().then(() => {
      duplicateCards();
      shuffleCards();
    });

    return () => {
      resetCards();
    };
  }, [getCards, duplicateCards, shuffleCards, resetCards]);
}
