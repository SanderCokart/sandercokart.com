import type { Locator, Page } from '@playwright/test';

/** Elements tagged with this attribute hold values that change over time (relative dates, copyright years). */
export const VISUAL_MASK_SELECTOR = '[data-visual-mask]';

/**
 * Third-party media that is slow, rate-limited or changes independently of this codebase.
 * Requests are aborted so screenshots only depend on first-party content.
 */
const BLOCKED_HOSTS = [
  /(^|\.)youtube\.com$/,
  /(^|\.)youtube-nocookie\.com$/,
  /(^|\.)ytimg\.com$/,
  /(^|\.)googlevideo\.com$/,
  /(^|\.)ggpht\.com$/,
  /(^|\.)sentry\.io$/,
];

export async function blockExternalMedia(page: Page): Promise<void> {
  await page.route(
    url => BLOCKED_HOSTS.some(host => host.test(url.hostname)),
    route => route.abort('blockedbyclient'),
  );
}

/**
 * Bring the page into a deterministic state before a full-page screenshot.
 *
 * Full-page captures do not scroll, so `whileInView` animations and lazy images below the fold would never trigger.
 * We step through the page one viewport at a time (with instant scrolling to bypass `scroll-behavior: smooth`),
 * then return to the top so scroll-linked values (`useScroll`) are back at 0.
 */
export async function stabilize(page: Page): Promise<void> {
  await page.waitForLoadState('load');

  await page.evaluate(async () => {
    const nextFrame = () => new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    const sleep = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));
    const scrollTo = (top: number) => window.scrollTo({ top, left: 0, behavior: 'instant' });

    let y = 0;
    while (y < document.documentElement.scrollHeight) {
      scrollTo(y);
      // IntersectionObserver -> Motion -> React commit needs more than a couple of frames to settle.
      await nextFrame();
      await nextFrame();
      await sleep(100);
      y += window.innerHeight / 2;
    }
    scrollTo(0);

    await document.fonts.ready;
    await Promise.all(
      Array.from(document.images, img =>
        img.complete
          ? img.decode().catch(() => undefined)
          : new Promise(resolve => {
              img.addEventListener('load', resolve, { once: true });
              img.addEventListener('error', resolve, { once: true });
            }),
      ),
    );

    await nextFrame();
    await nextFrame();
  });
}

/** Default masks for dynamic content, plus any page-specific ones. */
export function dynamicMasks(page: Page, extra: Locator[] = []): Locator[] {
  return [page.locator(VISUAL_MASK_SELECTOR), ...extra];
}
