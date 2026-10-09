import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { AppState, AppAction, ThemeMode, AppView, IAsana, IWorkoutEntry } from '../types/app.types';
import { ASANA_CATALOG } from '../data/asanaData';

const LOCAL_STORAGE_THEME_KEY = 'drishti:theme';

const getInitialTheme = (): ThemeMode => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as ThemeMode | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
  }
  return 'dark'; // Dark theme default as per specification
};

const initialState: AppState = {
  view: 'welcome',
  theme: getInitialTheme(),
  activeAsana: ASANA_CATALOG[0], // Default to Vrksasana
  poseScore: 1.0,
  isScanning: false,
  noPersonDetected: false,
  liveFeedback: 'Alinea tu postura en el encuadre para comenzar el análisis.',
  metrics: [
    { name: 'Extensión Espinal', score: 94, status: 'optimal', detail: 'Alineación vertebral recomendada' },
    { name: 'Distribución de Peso', score: 88, status: 'optimal', detail: 'Peso nivelado en el pie de apoyo' },
    { name: 'Nivel de Caderas', score: 72, status: 'warning', detail: 'Desciende ligeramente la cadera izquierda' }
  ],
  workout: {
    entries: [],
    currentIndex: 0,
  },
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, view: action.payload };

    case 'SET_THEME':
      return { ...state, theme: action.payload };

    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' };

    case 'SELECT_ASANA':
      return { ...state, activeAsana: action.payload };

    case 'SET_POSE_SCORE':
      return { ...state, poseScore: action.payload };

    case 'SET_SCANNING':
      return { ...state, isScanning: action.payload };

    case 'SET_NO_PERSON_DETECTED':
      return { ...state, noPersonDetected: action.payload };

    case 'SET_LIVE_FEEDBACK':
      return { ...state, liveFeedback: action.payload };

    case 'UPDATE_METRICS':
      return { ...state, metrics: action.payload };

    case 'ADD_TO_WORKOUT':
      return {
        ...state,
        workout: {
          ...state.workout,
          entries: [...state.workout.entries, action.payload],
        },
      };

    case 'REMOVE_FROM_WORKOUT':
      return {
        ...state,
        workout: {
          entries: state.workout.entries.filter((_, i) => i !== action.payload),
          currentIndex: Math.min(state.workout.currentIndex, state.workout.entries.length - 2),
        },
      };

    case 'SET_WORKOUT_INDEX':
      return {
        ...state,
        workout: { ...state.workout, currentIndex: action.payload },
      };

    case 'CLEAR_WORKOUT':
      return {
        ...state,
        workout: { entries: [], currentIndex: 0 },
      };

    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  setView: (view: AppView) => void;
  toggleTheme: () => void;
  selectAsana: (asana: IAsana) => void;
  setScanning: (isScanning: boolean) => void;
  addToWorkout: (entry: IWorkoutEntry) => void;
  removeFromWorkout: (index: number) => void;
  setWorkoutIndex: (index: number) => void;
  clearWorkout: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Sync theme attribute on <html> element and persist in localStorage
  useEffect(() => {
    document.documentElement.dataset.theme = state.theme;
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, state.theme);
  }, [state.theme]);

  const setView = (view: AppView) => dispatch({ type: 'SET_VIEW', payload: view });
  const toggleTheme = () => dispatch({ type: 'TOGGLE_THEME' });
  const selectAsana = (asana: IAsana) => dispatch({ type: 'SELECT_ASANA', payload: asana });
  const setScanning = (isScanning: boolean) => dispatch({ type: 'SET_SCANNING', payload: isScanning });
  const addToWorkout = (entry: IWorkoutEntry) => dispatch({ type: 'ADD_TO_WORKOUT', payload: entry });
  const removeFromWorkout = (index: number) => dispatch({ type: 'REMOVE_FROM_WORKOUT', payload: index });
  const setWorkoutIndex = (index: number) => dispatch({ type: 'SET_WORKOUT_INDEX', payload: index });
  const clearWorkout = () => dispatch({ type: 'CLEAR_WORKOUT' });

  return (
    <AppContext.Provider value={{ state, dispatch, setView, toggleTheme, selectAsana, setScanning, addToWorkout, removeFromWorkout, setWorkoutIndex, clearWorkout }}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = (): AppContextValue => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe ser utilizado dentro de un AppContextProvider');
  }
  return context;
};
