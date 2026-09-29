import { defineConfig, devices } from '@playwright/test';

import type { PlaywrightTestConfig } from '@playwright/test';

/**
 * Shared Playwright config for visual regression of the Next.js apps: Chromium, one project per color scheme,
 * against a production `next start` (build first) with `NEXT_PUBLIC_VISUAL_TEST=true` so Motion skips animations.
 *
 * @param port Must not collide with the dev ports (3000/3001).
 */
export function createVisualConfig({ port }: { port: number }): PlaywrightTestConfig {
  const baseURL = `http://127.0.0.1:${port}`;

  return defineConfig({
    testDir: './e2e',
    // Baselines live next to the specs: e2e/__snapshots__/<spec>/<name>-<project>-<platform>.png
    snapshotPathTemplate: '{testDir}/__snapshots__/{testFilePath}/{arg}-{projectName}-{platform}{ext}',
    fullyParallel: true,
    expect: { toHaveScreenshot: { animations: 'disabled', caret: 'hide' } },
    use: { baseURL, timezoneId: 'UTC', reducedMotion: 'reduce' },
    projects: [
      { name: 'chromium-light', use: { ...devices['Desktop Chrome'], colorScheme: 'light' } },
      { name: 'chromium-dark', use: { ...devices['Desktop Chrome'], colorScheme: 'dark' } },
    ],
    webServer: {
      command: `pnpm exec next start -H 127.0.0.1 -p ${port}`,
      url: baseURL,
      // Always start a fresh server so the visual-test flag and the latest build are guaranteed.
      reuseExistingServer: false,
      env: { NEXT_PUBLIC_VISUAL_TEST: 'true', NEXT_PUBLIC_SENTRY_ENABLED: 'false' },
    },
  });
}
