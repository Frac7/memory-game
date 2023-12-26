export interface Card {
  id: number;
  content: string;
}

export interface MemoryGameState {
  score: number;
  flips: number;
}

export interface MemoryGameStore extends MemoryGameState {
  incrementScore: () => void;
  incrementFlips: () => void;
  resetGame: () => void;
}

export interface MemoryCardsState {
  cards: Array<Card>;
}

export interface MemoryCardsStore extends MemoryCardsState {
  getCards: () => Promise<void>;
  shuffleCards: () => void;
  duplicateCards: () => void;
  resetCards: () => void;
}

export interface GameTimerState {
  timer: number;
  isActive: boolean;
  interval?: number;
}

export interface GameTimerStore extends GameTimerState {
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}
