import { test as base, expect } from '@playwright/test';

import type { Page } from '@playwright/test';

export { createVisualConfig } from './config';
export { expect };

/** Playwright `test` with third-party video requests (slow, change independently of this repo) aborted. */
export const test = base.extend<{ blockMedia: void }>({
  blockMedia: [
    async ({ page }, use) => {
      await page.route(
        url => /(youtube(-nocookie)?|ytimg|googlevideo|ggpht)\.com$/.test(url.hostname),
        route => route.abort('blockedbyclient'),
      );
      await use();
    },
    { auto: true },
  ],
});

/**
 * Full-page captures do not scroll, so `whileInView` sections and lazy images below the fold would never trigger.
 * Step through the page with instant scrolling (bypasses `scroll-behavior: smooth`); the 100ms per step gives Motion
 * time to register its in-view observers after hydration. Then return to the top so `useScroll` values are 0.
 */
async function stabilize(page: Page): Promise<void> {
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight / 2) {
      window.scrollTo({ top: y, behavior: 'instant' });
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    await Promise.all([document.fonts.ready, ...Array.from(document.images, img => img.decode().catch(() => {}))]);
  });
  // Masked relative timestamps ("about 5 years ago") change length over time; pin their box so the mask is stable.
  await page.addStyleTag({
    content: `[data-visual-mask='relative-time'] { inline-size: 10rem !important; overflow: hidden !important; white-space: nowrap !important; }`,
  });
}

/** Navigate, stabilize and compare a full-page screenshot with `[data-visual-mask]` elements masked. */
export async function expectPageScreenshot(page: Page, path: string, name: string): Promise<void> {
  const response = await page.goto(path);
  expect(response?.ok(), `GET ${path} returned ${response?.status()}`).toBe(true);
  await stabilize(page);
  await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true, mask: [page.locator('[data-visual-mask]')] });
}
