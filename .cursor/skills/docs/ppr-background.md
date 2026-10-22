# PPR background - `apps/codehouse`

Why codehouse uses PPR and how to read the build output. Day-to-day rules are in [ppr.md](ppr.md).

## Why codehouse uses PPR

Codehouse has a **request-dependent shell** (locale from `[locale]`, theme script, i18n messages) and **mostly static page content** (marketing sections, translations keyed by locale).

Without PPR, awaiting `params` or `getMessages()` in the root layout forces the entire page dynamic. With `cacheComponents: true`:

- The **shell streams** at request time (locale, env script, intl provider).
- **Page bodies** prerender behind `'use cache'` and revalidate on a schedule (`cacheLife('hours')`).

This matches Next.js 16's recommended model: dynamic boundaries behind `Suspense`, static work in Cache Components.

## Build output symbols

After `pnpm build` in `apps/codehouse`:

```
○  (Static)             prerendered as static content
◐  (Partial Prerender)  prerendered as static HTML with dynamic server-streamed content
ƒ  (Dynamic)            server-rendered on demand
```

Example output (from the original PPR branch; re-check after `pnpm build`):

| Route | CLI symbol | Manifest `renderingMode` | Revalidate |
| ----- | ---------- | ------------------------ | ---------- |
| `/[locale]` (root) | ƒ | `PARTIALLY_STATIC` | 1h |
| `/[locale]/consumer` | ƒ | `PARTIALLY_STATIC` | 1h |
| `/[locale]/freelance` | ƒ | `PARTIALLY_STATIC` | 1h |
| `/[locale]/commercial` | ƒ | `PARTIALLY_STATIC` | 1h |
| `/[locale]/[...rest]` | ◐ | `PARTIALLY_STATIC` | - |

**Key insight:** CLI symbol and manifest mode can disagree. **`ƒ` does not mean PPR is broken.** It means Next.js did not emit a prerendered `.html` shell artifact for that route at build time. The manifest still records `PARTIALLY_STATIC` + `experimentalPPR: true` + cache revalidation - PPR is active.

Commercial shows `ƒ` because its page tree is minimal static RSC (`<h1>Business Solutions</h1>`) with no client streaming holes - not because of a misconfiguration. **Do not add fake Suspense or client components just to get `◐`.**

Inspect details in `.next/prerender-manifest.json` after build.

## Footer copyright - client vs server dynamic

`cacheComponents` rejects `new Date()` in Server Components unless request-time context is established first (`connection()`, `cookies()`, etc.).

| Approach | When to use |
| -------- | ----------- |
| **Client `CopyrightMessage`** (current) | Year computed in browser via `new Date().getFullYear()` - no build error, no Suspense, no `connection()` |
| **Server `await connection()` then `new Date()`** | Keep copyright in RSC; adds a dynamic hole - only if you need server-rendered year |
| **`suppressHydrationWarning`** | Hydration mismatch only - **does not** fix `cacheComponents` dynamic API errors |

Current implementation:

```tsx
// copyright-message.tsx - 'use client'
export function CopyrightMessage() {
  const t = useTranslations('Footer');
  const date = new Date().getFullYear();
  return t('Copyright_message', { date });
}
```

`Footer` itself stays an async Server Component. `Address` uses `getTranslations('Footer')` at the server level - no Suspense needed, because the locale comes from `next/root-params`.

## `suppressHydrationWarning` is not a PPR tool

It only silences client/server attribute mismatches during hydration (theme class on `<html>`). It does not satisfy `cacheComponents` rules for `new Date()` or other dynamic APIs.
