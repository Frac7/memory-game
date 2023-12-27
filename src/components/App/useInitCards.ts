import useCardsStore, { initCardsSelector } from "@/store/useCardsStore";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export default function useInitCards() {
  const initCards = useCardsStore(useShallow(initCardsSelector));

  useEffect(() => {
    initCards();
  }, [initCards]);
}
