export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface GameState {
  currentQuestion: number;
  score: number;
  isGameOver: boolean;
}