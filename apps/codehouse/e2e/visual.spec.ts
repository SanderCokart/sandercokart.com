import { expect, test } from '@playwright/test';

import { stabilize } from './stabilize';

const routes = [
  { name: 'home', path: '/en' },
  { name: 'commercial', path: '/en/commercial' },
  { name: 'freelance', path: '/en/freelance' },
  { name: 'consumer', path: '/en/consumer' },
] as const;

for (const route of routes) {
  test(route.name, async ({ page }) => {
    await page.goto(route.path);
    await stabilize(page);
    await expect(page).toHaveScreenshot(`${route.name}.png`, {
      fullPage: true,
      mask: [page.locator('#footer-copyright')],
    });
  });
}
