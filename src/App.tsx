import { Suspense, lazy } from 'react';
import { AppContextProvider, useAppContext } from './context/AppContext';
import { Header } from './components/ui/Header';
import { Footer } from './components/ui/Footer';
import { WelcomeView } from './views/WelcomeView';

// Lazy loading views for bundle optimization
const CatalogView = lazy(() =>
  import('./views/CatalogView').then((m) => ({ default: m.CatalogView }))
);
const AnalysisView = lazy(() =>
  import('./views/AnalysisView').then((m) => ({ default: m.AnalysisView }))
);
const WorkoutView = lazy(() =>
  import('./views/WorkoutView').then((m) => ({ default: m.WorkoutView }))
);

function AppLoadingScreen() {
  return (
    <div
      style={{
        width: '100%',
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        color: 'var(--color-on-background)'
      }}
    >
      <span
        className="material-symbols-outlined animate-spin"
        style={{ fontSize: '40px', color: 'var(--color-primary)' }}
      >
        spa
      </span>
      <span className="font-label-md" style={{ color: 'var(--color-on-surface-variant)' }}>
        Cargando espacio DrishtiPosture...
      </span>
    </div>
  );
}

function MainContent() {
  const { state } = useAppContext();

  return (
    <div id="app" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Suspense fallback={<AppLoadingScreen />}>
        {state.view === 'welcome' && <WelcomeView />}
        {state.view === 'catalog' && <CatalogView />}
        {state.view === 'analysis' && <AnalysisView />}
        {state.view === 'workout' && <WorkoutView />}
      </Suspense>
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <AppContextProvider>
      <MainContent />
    </AppContextProvider>
  );
}

export default App;
