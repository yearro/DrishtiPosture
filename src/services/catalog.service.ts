import type { IAsana, Difficulty, BodyZone } from '../types/domain.types';

export interface AsanaFilters {
  difficulty?: Difficulty;
  bodyZone?: BodyZone;
  query?: string;
}

const normalizeText = (text: string): string => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
};

export function getAsanaById(
  catalog: readonly IAsana[],
  id: string
): IAsana | undefined {
  return catalog.find((asana) => asana.id === id);
}

export function searchAsanas(
  catalog: readonly IAsana[],
  query: string
): IAsana[] {
  const normalizedQuery = normalizeText(query.trim());

  if (!normalizedQuery) {
    return [...catalog];
  }

  return catalog.filter((asana) => {
    const nameEs = normalizeText(asana.nameEs);
    const nameEn = normalizeText(asana.nameEn);
    const nameSanskrit = normalizeText(asana.nameSanskrit);
    const description = normalizeText(asana.description);

    return (
      nameEs.includes(normalizedQuery) ||
      nameEn.includes(normalizedQuery) ||
      nameSanskrit.includes(normalizedQuery) ||
      description.includes(normalizedQuery)
    );
  });
}

export function filterAsanas(
  catalog: readonly IAsana[],
  filters: AsanaFilters
): IAsana[] {
  let result: IAsana[] = [...catalog];

  if (filters.query) {
    result = searchAsanas(result, filters.query);
  }

  if (filters.difficulty) {
    result = result.filter((asana) => asana.difficulty === filters.difficulty);
  }

  if (filters.bodyZone) {
    result = result.filter((asana) =>
      asana.bodyZones.includes(filters.bodyZone as BodyZone)
    );
  }

  return result;
}
