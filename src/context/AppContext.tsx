import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { AppState, AppAction, ThemeMode, AppView, IAsana } from '../types/app.types';
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
  ]
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

  return (
    <AppContext.Provider value={{ state, dispatch, setView, toggleTheme, selectAsana, setScanning }}>
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
