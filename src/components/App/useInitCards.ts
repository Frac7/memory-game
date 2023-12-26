import useCardsStore from "@/store/useCardsStore";
import { useEffect } from "react";

export default function useInitCards() {
  const { getCards, duplicateCards, shuffleCards, resetCards } =
    useCardsStore((state) => ({
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
