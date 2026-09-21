import React from 'react';
import { useAppContext } from '../context/AppContext';
import { AsanaCatalog } from '../components/catalog/AsanaCatalog';
import { AsanaReferencePanel } from '../components/catalog/AsanaReferencePanel';
import type { IAsana } from '../types/domain.types';
import styles from './CatalogView.module.css';

export const CatalogView: React.FC = () => {
  const { state, selectAsana, setView } = useAppContext();

  const handleSelectAsana = (asana: IAsana) => {
    selectAsana(asana as any);
  };

  const handleStartAnalysis = () => {
    setView('analysis');
  };

  const activeAsana: IAsana | null = (state.activeAsana as unknown as IAsana) || null;

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
          )}
        </div>
      </div>
    </main>
  );
};
