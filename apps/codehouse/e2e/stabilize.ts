import type { Page } from '@playwright/test';

/** Wait for fonts and images so screenshot diffs are not flaky. */
export async function stabilize(page: Page): Promise<void> {
  await page.waitForLoadState('load');
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      [...document.images].map(img =>
        img.complete
          ? undefined
          : new Promise<void>(resolve => {
              img.addEventListener('load', () => resolve(), { once: true });
              img.addEventListener('error', () => resolve(), { once: true });
            }),
      ),
    );
  });
}
