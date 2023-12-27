export interface Card {
  id: number;
  content: string;
  flipped?: boolean;
  disabled?: boolean;
}

export interface GameState {
  score: number;
  flips: number;
  completed: boolean;
}

export interface GameStore extends GameState {
  incrementScore: (amount: number) => void;
  incrementFlips: () => void;
  handleFlip: (i: number) => void;
  resetGame: () => void;
  restartGame: () => void;
  completeGame: () => void;
}

export interface CardsState {
  cards: Array<Card>;
}

export interface CardsStore extends CardsState {
  initCards: () => Promise<void>;
  getCards: () => Promise<void>;
  shuffleCards: () => void;
  duplicateCards: () => void;
  resetCards: () => void;
  flipCard: (i: number) => void;
  disableCard: (i: number) => void;
  getFlippedCardsWithIndex: () => (Card & { index: number })[];
  getEnabledCards: () => Card[];
}

export interface TimerState {
  timer: number;
  isActive: boolean;
  interval?: number;
}

export interface TimerStore extends TimerState {
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}
