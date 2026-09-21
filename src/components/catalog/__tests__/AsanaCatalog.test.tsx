import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AsanaCatalog } from '../AsanaCatalog';

describe('AsanaCatalog Component', () => {
  it('debe renderizar el input de búsqueda y las tarjetas de asanas', () => {
    const handleSelect = vi.fn();
    render(<AsanaCatalog onSelectAsana={handleSelect} />);

    const searchInput = screen.getByPlaceholderText(/Buscar por nombre/i);
    expect(searchInput).toBeDefined();

    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeDefined();

    const options = screen.getAllByRole('option');
    expect(options.length).toBeGreaterThanOrEqual(20);
  });

  it('debe filtrar las asanas al escribir en el campo de búsqueda', () => {
    const handleSelect = vi.fn();
    render(<AsanaCatalog onSelectAsana={handleSelect} />);

    const searchInput = screen.getByPlaceholderText(/Buscar por nombre/i);
    fireEvent.change(searchInput, { target: { value: 'Árbol' } });

    const options = screen.getAllByRole('option');
    expect(options.length).toBe(1);
    expect(screen.getByText('Postura del Árbol')).toBeDefined();
  });

  it('debe mostrar estado vacío cuando no hay coincidencias', () => {
    const handleSelect = vi.fn();
    render(<AsanaCatalog onSelectAsana={handleSelect} />);

    const searchInput = screen.getByPlaceholderText(/Buscar por nombre/i);
    fireEvent.change(searchInput, { target: { value: 'nonexistentasana1234' } });

    expect(screen.getByText(/No se encontraron asanas/i)).toBeDefined();
  });

  it('debe llamar a onSelectAsana cuando se hace clic en una tarjeta', () => {
    const handleSelect = vi.fn();
    render(<AsanaCatalog onSelectAsana={handleSelect} />);

    const options = screen.getAllByRole('option');
    fireEvent.click(options[0]);

    expect(handleSelect).toHaveBeenCalledTimes(1);
  });
});
