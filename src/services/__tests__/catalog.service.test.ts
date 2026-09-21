import { describe, it, expect } from 'vitest';
import { POSES_CATALOG } from '../../data/poses-catalog';
import { getAsanaById, searchAsanas, filterAsanas } from '../catalog.service';

describe('Catalog Service', () => {
  it('debe validar que POSES_CATALOG contiene al menos 20 asanas y cada una tiene al menos 3 jointRules', () => {
    expect(POSES_CATALOG.length).toBeGreaterThanOrEqual(20);
    POSES_CATALOG.forEach((asana) => {
      expect(asana.jointRules.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('debe obtener una asana por su ID con getAsanaById', () => {
    const treePose = getAsanaById(POSES_CATALOG, 'vrksasana');
    expect(treePose).toBeDefined();
    expect(treePose?.nameEs).toBe('Postura del Árbol');

    const nonexistent = getAsanaById(POSES_CATALOG, 'invalid-id');
    expect(nonexistent).toBeUndefined();
  });

  it('debe buscar asanas insensible a mayúsculas y acentos con searchAsanas', () => {
    const arbolResult = searchAsanas(POSES_CATALOG, 'Árbol');
    expect(arbolResult.some((a) => a.id === 'vrksasana')).toBe(true);

    const guerreroResult = searchAsanas(POSES_CATALOG, 'guerrero');
    expect(guerreroResult.length).toBeGreaterThanOrEqual(3);
  });

  it('debe filtrar asanas por dificultad y zona del cuerpo con filterAsanas', () => {
    const beginners = filterAsanas(POSES_CATALOG, { difficulty: 'beginner' });
    expect(beginners.every((a) => a.difficulty === 'beginner')).toBe(true);

    const balancePoses = filterAsanas(POSES_CATALOG, { bodyZone: 'balance' });
    expect(balancePoses.every((a) => a.bodyZones.includes('balance'))).toBe(true);
  });
});
