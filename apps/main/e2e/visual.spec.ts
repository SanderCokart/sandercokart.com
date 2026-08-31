import { expect, test } from '@playwright/test';

import { stabilize } from './stabilize';

test('home', async ({ page }) => {
  await page.goto('/');
  await stabilize(page);
  await expect(page).toHaveScreenshot('home.png', {
    fullPage: true,
    mask: [page.getByTestId('article-time-ago')],
  });
});
