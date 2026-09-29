import { createRequire } from 'node:module';
import path from 'node:path';

import { defineConfig, devices } from '@playwright/test';

import type { PlaywrightTestConfig } from '@playwright/test';

export type VisualConfigOptions = {
  /** Port the production `next start` server listens on. Must not collide with the dev ports (3000/3001). */
  port: number;
  /** Directory containing the visual specs, relative to the app's playwright.config.ts. */
  testDir?: string;
};

/**
 * Shared Playwright config for visual regression of the Next.js apps.
 *
 * - Chromium only, one project per color scheme.
 * - Runs against a production build (`next start`) with `NEXT_PUBLIC_VISUAL_TEST=true`,
 *   which makes `<MotionConfig skipAnimations>` snap every Motion animation to its end state.
 * - Emulates `prefers-reduced-motion: reduce` and disables CSS/Web animations at capture time.
 *
 * The app must be built (`next build`) before running; the app's `test:visual` script does that.
 */
// Resolved through the package export so this works whether the app's config is loaded as ESM or CJS.
const screenshotStylePath = createRequire(path.join(process.cwd(), 'package.json')).resolve(
  '@repo/playwright-visual/screenshot.css',
);

export function createVisualConfig({ port, testDir = './e2e' }: VisualConfigOptions): PlaywrightTestConfig {
  const baseURL = `http://127.0.0.1:${port}`;

  return defineConfig({
    testDir,
    // Baselines live next to the specs: e2e/__snapshots__/<spec>/<name>-<project>-<platform>.png
    snapshotPathTemplate: '{testDir}/__snapshots__/{testFilePath}/{arg}-{projectName}-{platform}{ext}',
    outputDir: './test-results',
    fullyParallel: true,
    forbidOnly: true,
    retries: 0,
    reporter: 'list',
    timeout: 60_000,
    expect: {
      toHaveScreenshot: {
        animations: 'disabled',
        caret: 'hide',
        scale: 'css',
        stylePath: screenshotStylePath,
      },
    },
    use: {
      baseURL,
      locale: 'en-US',
      timezoneId: 'UTC',
      reducedMotion: 'reduce',
      trace: 'retain-on-failure',
    },
    projects: [
      {
        name: 'chromium-light',
        use: { ...devices['Desktop Chrome'], colorScheme: 'light' },
      },
      {
        name: 'chromium-dark',
        use: { ...devices['Desktop Chrome'], colorScheme: 'dark' },
      },
    ],
    webServer: {
      command: `pnpm exec next start -H 127.0.0.1 -p ${port}`,
      url: baseURL,
      // Always start a fresh server so the visual-test flag and the latest build are guaranteed.
      reuseExistingServer: false,
      timeout: 120_000,
      stdout: 'ignore',
      stderr: 'pipe',
      env: {
        NEXT_PUBLIC_VISUAL_TEST: 'true',
        NEXT_PUBLIC_SENTRY_ENABLED: 'false',
      },
    },
  });
}
