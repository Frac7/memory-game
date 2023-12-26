export interface Card {
  id: number;
  content: string;
  flipped?: boolean;
  disabled?: boolean;
}

export interface MemoryGameState {
  score: number;
  flips: number;
}

export interface MemoryGameStore extends MemoryGameState {
  incrementScore: (amount: number) => void;
  incrementFlips: () => void;
  handleFlip: (i: number) => void;
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
  flipCard: (i: number) => void;
  disableCard: (i: number) => void;
  getFlippedCards: () => (Card & { index: number })[];
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
