import useCardsStore from "@/store/useCardsStore";
import { useEffect } from "react";

export default function useInitCards() {
  const { initCards } = useCardsStore((state) => ({
    initCards: state.initCards,
  }));

  useEffect(() => {
    initCards();
  }, [initCards]);
}
