import React from 'react';
import type { IAsana, Difficulty, BodyZone } from '../../types/domain.types';
import { useAsanaCatalog } from '../../hooks/useAsanaCatalog';
import { AsanaCard } from './AsanaCard';
import styles from './AsanaCatalog.module.css';

export interface AsanaCatalogProps {
  selectedAsanaId?: string;
  onSelectAsana: (asana: IAsana) => void;
}

export function AsanaCatalog({
  selectedAsanaId,
  onSelectAsana,
}: AsanaCatalogProps) {
  const {
    selectedAsana,
    filters,
    filteredAsanas,
    selectAsana,
    updateFilters,
    resetFilters,
  } = useAsanaCatalog(selectedAsanaId);

  const activeSelectedId = selectedAsanaId ?? selectedAsana?.id;

  const handleCardSelect = (id: string) => {
    selectAsana(id);
    const found = filteredAsanas.find((a) => a.id === id);
    if (found) {
      onSelectAsana(found);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ query: e.target.value });
  };

  const handleDifficultyChange = (difficulty?: Difficulty) => {
    updateFilters({ difficulty });
  };

  const handleBodyZoneChange = (bodyZone?: BodyZone) => {
    updateFilters({ bodyZone });
  };

  const difficulties: { label: string; value?: Difficulty }[] = [
    { label: 'Todas' },
    { label: 'Principiante', value: 'beginner' },
    { label: 'Intermedio', value: 'intermediate' },
    { label: 'Avanzado', value: 'advanced' },
  ];

  const bodyZones: { label: string; value?: BodyZone }[] = [
    { label: 'Todas' },
    { label: 'Piernas', value: 'legs' },
    { label: 'Core', value: 'core' },
    { label: 'Brazos', value: 'arms' },
    { label: 'Hombros', value: 'shoulders' },
    { label: 'Caderas', value: 'hips' },
    { label: 'Equilibrio', value: 'balance' },
    { label: 'Columna', value: 'spine' },
  ];

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
      {/* Filtros y Búsqueda */}
      <div className={styles.filterPanel}>
        {/* Input de Búsqueda */}
        <div className={styles.searchWrapper}>
          <svg
            className={styles.searchIcon}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={filters.query || ''}
            onChange={handleSearchChange}
            placeholder="Buscar por nombre en español, inglés o sánscrito..."
            className={styles.searchInput}
            aria-label="Buscar asanas"
          />
        </div>

        {/* Filtro por Dificultad */}
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Dificultad</span>
          <div className={styles.filterChips}>
            {difficulties.map((diff) => {
              const isActive = filters.difficulty === diff.value;
              return (
                <button
                  key={diff.label}
                  type="button"
                  onClick={() => handleDifficultyChange(diff.value)}
                  className={[styles.chip, isActive ? styles.chipActive : '']
                    .filter(Boolean)
                    .join(' ')}
                  aria-pressed={isActive}
                >
                  {diff.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filtro por Zona Corporal */}
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Zona Corporal</span>
          <div className={styles.filterChips}>
            {bodyZones.map((zone) => {
              const isActive = filters.bodyZone === zone.value;
              return (
                <button
                  key={zone.label}
                  type="button"
                  onClick={() => handleBodyZoneChange(zone.value)}
                  className={[styles.chip, isActive ? styles.chipActive : '']
                    .filter(Boolean)
                    .join(' ')}
                  aria-pressed={isActive}
                >
                  {zone.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid de Asanas */}
      {filteredAsanas.length > 0 ? (
        <div
          role="listbox"
          aria-label="Catálogo de asanas"
          className={styles.grid}
        >
          {filteredAsanas.map((asana) => (
            <AsanaCard
              key={asana.id}
              asana={asana}
              isSelected={asana.id === activeSelectedId}
              onSelect={handleCardSelect}
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>
            No se encontraron asanas para los filtros seleccionados.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className={styles.resetButton}
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
