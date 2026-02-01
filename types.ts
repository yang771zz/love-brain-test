
export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface Option {
  id: string;
  text: string;
  score: number;
}

export interface TestResult {
  score: number;
  level: string;
  nickname: string;
  description: string;
  advice: string;
  warning: string;
}

export enum AppState {
  HOME = 'HOME',
  QUIZ = 'QUIZ',
  ANALYZING = 'ANALYZING',
  RESULT = 'RESULT'
}
