import { expectPageScreenshot, test } from '@repo/playwright-visual';

const locales = ['en', 'nl'] as const;
const routes = [
  { name: 'home', path: '' },
  { name: 'commercial', path: '/commercial' },
  { name: 'freelance', path: '/freelance' },
  { name: 'consumer', path: '/consumer' },
] as const;

for (const locale of locales) {
  for (const route of routes) {
    test(`${route.name} (${locale})`, async ({ page }) => {
      await expectPageScreenshot(page, `/${locale}${route.path}`, `${route.name}-${locale}`);
    });
  }
}
