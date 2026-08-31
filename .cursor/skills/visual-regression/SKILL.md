---
name: visual-regression
description: >-
  Playwright screenshot comparison for Next.js apps (main, codehouse). Use when
  adding or changing UI, layout, styling, themes, or routes; when writing visual
  tests; or when updating snapshots after intentional visual changes.
---

# Visual regression (Playwright)

Page screenshots for `apps/main` and `apps/codehouse`. There is no Storybook/Chromatic setup. Do not add Pest visual tests for this; the Laravel API has no marketing UI.

## Layout

- Config: `apps/<app>/playwright.config.ts`
- Specs: `apps/<app>/e2e/visual.spec.ts`
- Baselines: `apps/<app>/e2e/visual.spec.ts-snapshots/` (committed)
- Reports: `playwright-report/` and `test-results/` (gitignored)

Projects: Chromium **light** and **dark** (`prefers-color-scheme`, matches `@wrksz/themes` `defaultTheme="system"`).

## Commands

From the repo root:

```bash
pnpm exec playwright install chromium   # once per machine
pnpm test:visual                        # compare against committed snapshots
pnpm test:visual:update                 # rewrite snapshots after intentional UI changes
pnpm --filter main test:visual
pnpm --filter codehouse test:visual
```

`test:visual` depends on `build`, then Playwright starts `next start` unless a server is already on the app port (`reuseExistingServer` when `CI` is unset). Override the origin with `PLAYWRIGHT_BASE_URL`.

Install browsers from an app that has `@playwright/test`:

```bash
pnpm --filter main exec playwright install chromium --with-deps
```

## Writing tests

- Prefer full-page `toHaveScreenshot` on stable routes.
- Call `stabilize(page)` (fonts + `networkidle`) before the screenshot.
- Mask content that changes on its own (copyright year: `#footer-copyright`, relative article dates: `[data-testid=article-time-ago]`).
- Keep `animations: 'disabled'` (already in config).
- Add a route when you introduce a new marketing page, not for every tiny component.

## Failures

A failed run means pixels moved vs the committed PNG.

1. Open `apps/<app>/playwright-report` (or the CI artifact).
2. If the diff is the change you meant to make, run `pnpm test:visual:update` and commit the new PNGs.
3. If it is not, fix the UI (or tighten a mask) and re-run without `--update-snapshots`.

Do not raise `maxDiffPixelRatio` to hide a real regression.
