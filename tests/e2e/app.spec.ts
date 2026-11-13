import { expect, test } from '@playwright/test';

test('membuka halaman ringkasan aplikasi', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('ion-title').first()).toContainText('Prakiraan Cuaca Jakarta');
});
