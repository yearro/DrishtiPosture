export type AppView = 'welcome' | 'catalog' | 'analysis';

export type ThemeMode = 'dark' | 'light';

export type AsanaDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface IAsana {
  id: string;
  sanskritName: string;
  englishName: string;
  spanishName: string;
  difficulty: AsanaDifficulty;
  category: string;
  description: string;
  alignmentPoints: string[];
  benefits: string[];
  imageUrl: string;
}

export interface IAlignmentMetric {
  name: string;
  score: number; // 0 to 100
  status: 'optimal' | 'warning' | 'critical';
  detail: string;
}

export interface AppState {
  view: AppView;
  theme: ThemeMode;
  activeAsana: IAsana | null;
  poseScore: number; // 0.0 to 1.0
  isScanning: boolean;
  noPersonDetected: boolean;
  liveFeedback: string | null;
  metrics: IAlignmentMetric[];
}

export type AppAction =
  | { type: 'SET_VIEW'; payload: AppView }
  | { type: 'SET_THEME'; payload: ThemeMode }
  | { type: 'TOGGLE_THEME' }
  | { type: 'SELECT_ASANA'; payload: IAsana }
  | { type: 'SET_POSE_SCORE'; payload: number }
  | { type: 'SET_SCANNING'; payload: boolean }
  | { type: 'SET_NO_PERSON_DETECTED'; payload: boolean }
  | { type: 'SET_LIVE_FEEDBACK'; payload: string | null }
  | { type: 'UPDATE_METRICS'; payload: IAlignmentMetric[] };
