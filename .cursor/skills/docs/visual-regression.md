# Visual regression

Playwright compares full-page screenshots of `apps/main` and `apps/codehouse` only against PNGs committed next to the specs. `apps/api` is out of scope.

Agent workflow (commands, masks, snapshot updates) lives in the [visual-regression skill](../visual-regression/SKILL.md).

```bash
pnpm --filter main exec playwright install chromium --with-deps
pnpm test:visual
pnpm test:visual:update
```
