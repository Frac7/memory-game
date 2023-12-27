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

export type GameStore = GameState & GameActions;

export interface GameActions {
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

export type CardsStore = CardsState & CardsActions;

export interface CardsActions {
  initCards: () => Promise<void>;
  fetchCards: () => Promise<void>;
  shuffleCards: () => void;
  duplicateCards: () => void;
  resetCards: () => void;
  flipCardByIndex: (i: number) => void;
  disableCardByIndex: (i: number) => void;
}

export interface TimerState {
  timer: number;
  isActive: boolean;
  interval?: number;
}

export type TimerStore = TimerState & TimerActions;

export interface TimerActions {
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}
