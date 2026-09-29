import { test as base, expect } from '@playwright/test';

import type { Locator, Page } from '@playwright/test';

import { blockExternalMedia, dynamicMasks, stabilize } from './stabilize';

export { createVisualConfig } from './config';
export { blockExternalMedia, dynamicMasks, stabilize, VISUAL_MASK_SELECTOR } from './stabilize';
export { expect };

/** Playwright `test` with unstable third-party media blocked on every page. */
export const test = base.extend<{ blockMedia: void }>({
  blockMedia: [
    async ({ page }, use) => {
      await blockExternalMedia(page);
      await use();
    },
    { auto: true },
  ],
});

/** Navigate, stabilize and compare a full-page screenshot with dynamic regions masked. */
export async function expectPageScreenshot(
  page: Page,
  path: string,
  name: string,
  options: { mask?: Locator[] } = {},
): Promise<void> {
  const response = await page.goto(path);
  expect(response?.ok(), `GET ${path} returned ${response?.status()}`).toBe(true);
  await stabilize(page);
  await expect(page).toHaveScreenshot(`${name}.png`, {
    fullPage: true,
    mask: dynamicMasks(page, options.mask),
  });
}
