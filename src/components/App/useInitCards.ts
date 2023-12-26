import useMemoryCardsStore from "@/store/useMemoryCardsStore";
import { useEffect } from "react";

export default function useInitCards() {
  const { getCards, duplicateCards, shuffleCards } = useMemoryCardsStore(
    (state) => ({
      getCards: state.getCards,
      duplicateCards: state.duplicateCards,
      shuffleCards: state.shuffleCards,
    })
  );

  useEffect(() => {
    getCards();
    duplicateCards();
    shuffleCards();
  }, [getCards, duplicateCards, shuffleCards]);
}
