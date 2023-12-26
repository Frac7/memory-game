export interface Card {
  id: number;
  content: string;
}

export interface MemoryGameState {
  score: number;
  flips: number;
  timer: number;
}

export interface MemoryGameStore extends MemoryGameState {
  incrementScore: () => void;
  incrementTimer: () => void;
  incrementFlips: () => void;
  resetGame: () => void;
}

export interface MemoryCardsState {
  cards: Array<Card>;
}

export interface MemoryCardsStore extends MemoryCardsState {
  getCards: () => void;
  shuffleCards: () => void;
  duplicateCards: () => void;
}
