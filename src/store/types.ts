export interface Card {
  id: number;
  content: string;
}

export interface MemoryGameState {
  score: number;
  flips: number;
  timer: number;
  cards: Array<Card>;
}

export interface MemoryGameStore extends MemoryGameState {
  incrementScore: () => void;
  incrementTimer: () => void;
  incrementFlips: () => void;
  resetGame: () => void;
}
