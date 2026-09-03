import { test, expect } from '@playwright/test';

test.describe('Módulo de Cámara (CAM)', () => {
  test('CAM-01: Activación exitosa de la cámara', async ({ page, context }) => {
    await context.grantPermissions(['camera']);
    await page.goto('http://localhost:5173/');

    // Navegar a Análisis si está en bienvenida
    const startBtn = page.getByRole('button', { name: /Comenzar análisis|Iniciar análisis/i });
    if (await startBtn.isVisible()) {
      await startBtn.click();
    }

    // Presionar Iniciar análisis de cámara
    const cameraBtn = page.getByRole('button', { name: /Activar cámara para análisis de postura/i });
    await expect(cameraBtn).toBeVisible();
    await cameraBtn.click();

    // Elemento video debe estar en DOM
    const video = page.locator('video[aria-label="Stream de video de cámara para análisis de postura"]');
    await expect(video).toBeVisible();
  });

  test('CAM-02: Permiso de cámara denegado muestra el banner de error', async ({ page, context }) => {
    await context.clearPermissions();
    await page.goto('http://localhost:5173/');

    const cameraBtn = page.getByRole('button', { name: /Activar cámara para análisis de postura/i });
    if (await cameraBtn.isVisible()) {
      await cameraBtn.click();
    }

    // Banner alert de error visible con mensaje amigable
    const alert = page.getByRole('alert');
    await expect(alert).toBeVisible();
    await expect(alert).toContainText(/Permiso|cámara/i);
  });
});
