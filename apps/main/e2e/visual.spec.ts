import { expectPageScreenshot, test } from '@repo/playwright-visual';

test('home', async ({ page }) => {
  await expectPageScreenshot(page, '/', 'home');
});
