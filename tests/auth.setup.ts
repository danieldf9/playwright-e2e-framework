import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByPlaceholder('Email').fill(process.env.TEST_USER_EMAIL || 'testuser@example.com');
  await page.getByPlaceholder('Password').fill(process.env.TEST_USER_PASSWORD || 'Password123!');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await page.waitForURL('/');
  await expect(page.locator('nav.navbar')).toBeVisible();

  await page.context().storageState({ path: authFile });
});
