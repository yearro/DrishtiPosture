import { describe, it, expect } from 'vitest';
import { calculateAngle } from '../geometry.utils';

describe('geometry.utils > calculateAngle', () => {
  it('debe calcular correctamente un ángulo recto (90°)', () => {
    const a = { x: 0, y: 1 };
    const b = { x: 0, y: 0 }; // Vértice
    const c = { x: 1, y: 0 };

    const result = calculateAngle(a, b, c);
    expect(result).toBe(90.0);
  });

  it('debe calcular correctamente un ángulo llano (180°)', () => {
    const a = { x: 0, y: 0 };
    const b = { x: 1, y: 0 }; // Vértice
    const c = { x: 2, y: 0 };

    const result = calculateAngle(a, b, c);
    expect(result).toBe(180.0);
  });

  it('debe calcular correctamente un ángulo agudo de 45°', () => {
    const a = { x: 1, y: 1 };
    const b = { x: 0, y: 0 }; // Vértice
    const c = { x: 1, y: 0 };

    const result = calculateAngle(a, b, c);
    expect(result).toBe(45.0);
  });

  it('debe calcular correctamente un ángulo obtuso de 135°', () => {
    const a = { x: -1, y: 1 };
    const b = { x: 0, y: 0 }; // Vértice
    const c = { x: 1, y: 0 };

    const result = calculateAngle(a, b, c);
    expect(result).toBe(135.0);
  });

  it('debe manejar casos degenerados (puntos superpuestos) retornando 0 sin lanzar excepciones', () => {
    const a = { x: 0, y: 0 };
    const b = { x: 0, y: 0 }; // Vértice superpuesto con A
    const c = { x: 1, y: 0 };

    const result = calculateAngle(a, b, c);
    expect(result).toBe(0);
  });

  it('debe ser insensible al orden de A y C (simetría del ángulo)', () => {
    const a = { x: 0.2, y: 0.8 };
    const b = { x: 0.5, y: 0.5 };
    const c = { x: 0.8, y: 0.2 };

    const angleABC = calculateAngle(a, b, c);
    const angleCBA = calculateAngle(c, b, a);

    expect(angleABC).toBe(angleCBA);
  });
});
