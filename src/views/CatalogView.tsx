import { useAppContext } from '../context/AppContext';
import { AsanaCatalog } from '../components/catalog/AsanaCatalog';
import { AsanaReferencePanel } from '../components/catalog/AsanaReferencePanel';
import type { IAsana } from '../types/app.types';
import styles from './CatalogView.module.css';

export function CatalogView() {
  const { state, selectAsana, setView, addToWorkout } = useAppContext();

  const activeAsana = state.activeAsana ?? null;

  const handleSelectAsana = (asana: IAsana) => {
    selectAsana(asana);
  };

  const handleStartAnalysis = () => {
    setView('analysis');
  };

  const handleAddToWorkout = () => {
    if (activeAsana) {
      addToWorkout({ asanaId: activeAsana.id, nameEs: activeAsana.nameEs });
    }
  };

  const isInWorkout = activeAsana
    ? state.workout.entries.some((e) => e.asanaId === activeAsana.id)
    : false;

  return (
    <main className={`animate-fade-in ${styles.page}`}>
      {/* Header */}
      <div className={styles.header}>
        <span className={`font-label-md ${styles.eyebrow}`}>
          Selección de Práctica
        </span>
        <h1 className={`font-headline-xl ${styles.title}`}>
          Catálogo de Asanas
        </h1>
        <p className={`font-body-md ${styles.description}`}>
          Explora y selecciona una postura del catálogo para comenzar la
          evaluación de alineación postural en tiempo real.
        </p>
      </div>

      {/* Grid Layout: Catalog on Left, Reference Panel on Right */}
      <div className={styles.layout}>
        <AsanaCatalog
          selectedAsanaId={activeAsana?.id}
          onSelectAsana={handleSelectAsana}
        />

        <div className={styles.sidebar}>
          <AsanaReferencePanel asana={activeAsana} />

          {activeAsana && (
            <>
              <button
                type="button"
                onClick={handleStartAnalysis}
                className={styles.startButton}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: '22px' }}
                  aria-hidden="true"
                >
                  center_focus_strong
                </span>
                <span>Iniciar Análisis en Vivo</span>
              </button>

              <button
                type="button"
                onClick={handleAddToWorkout}
                disabled={isInWorkout}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '14px 24px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: isInWorkout ? 'var(--color-surface-container)' : 'var(--color-secondary-container)',
                  border: '1px solid var(--color-outline-variant)',
                  color: isInWorkout ? 'var(--color-on-surface-variant)' : 'var(--color-on-secondary-container)',
                  fontSize: 'var(--font-size-label-md)',
                  fontWeight: 600,
                  cursor: isInWorkout ? 'default' : 'pointer',
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: '22px' }}
                  aria-hidden="true"
                >
                  {isInWorkout ? 'check_circle' : 'add_circle'}
                </span>
                <span>{isInWorkout ? 'Agregada al entrenamiento' : 'Añadir al entrenamiento'}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
};
