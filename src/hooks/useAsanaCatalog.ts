import { useState, useMemo, useCallback } from 'react';
import type { IAsana } from '../types/domain.types';
import { POSES_CATALOG } from '../data/poses-catalog';
import {
  filterAsanas,
  getAsanaById,
  type AsanaFilters,
} from '../services/catalog.service';

export interface UseAsanaCatalogReturn {
  selectedAsana: IAsana | null;
  filters: AsanaFilters;
  filteredAsanas: IAsana[];
  selectAsana: (id: string) => void;
  updateFilters: (newFilters: Partial<AsanaFilters>) => void;
  resetFilters: () => void;
}

export function useAsanaCatalog(
  initialAsanaId?: string
): UseAsanaCatalogReturn {
  const [selectedAsana, setSelectedAsana] = useState<IAsana | null>(() => {
    if (initialAsanaId) {
      return getAsanaById(POSES_CATALOG, initialAsanaId) ?? POSES_CATALOG[0] ?? null;
    }
    return POSES_CATALOG[0] ?? null;
  });

  const [filters, setFilters] = useState<AsanaFilters>({});

  const filteredAsanas = useMemo(() => {
    return filterAsanas(POSES_CATALOG, filters);
  }, [filters]);

  const selectAsana = useCallback((id: string) => {
    const asana = getAsanaById(POSES_CATALOG, id);
    if (asana) {
      setSelectedAsana(asana);
    }
  }, []);

  const updateFilters = useCallback((newFilters: Partial<AsanaFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({});
  }, []);

  return {
    selectedAsana,
    filters,
    filteredAsanas,
    selectAsana,
    updateFilters,
    resetFilters,
  };
}
