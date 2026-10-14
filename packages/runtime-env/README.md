# `@repo/runtime-env`

Runtime helpers for Next.js App Router apps in this monorepo.

Use this package when you need:

1. **Public env on the client at request time** — not baked into the client bundle at build time. Server copies `NEXT_PUBLIC_*` and `NODE_ENV` into `window.__ENV`. Client code reads that snapshot through `getRuntimeEnv()`.
2. **LocalStorage preferences that must exist before first paint** — for example a `data-*` attribute that CSS keys off. One config drives the blocking head script, the React provider, and the hook.

Apps consume **`dist/`**. Turbo’s `^build` runs this package before Next apps. After changing sources here, rebuild (`pnpm --filter @repo/runtime-env build`) or rely on the workspace `dev` pipeline.

Next apps should keep `@repo/runtime-env` in `transpilePackages`.

## Imports

| Import | Use |
| --- | --- |
| `@repo/runtime-env` | `getRuntimeEnv()` in `src/env.ts` (`runtimeEnv` for client/shared keys) |
| `@repo/runtime-env/env-script` | `<EnvScript />` in the **root layout `<head>`** |
| `@repo/runtime-env/preference` | `createPreference`, `PreferenceScripts`, `PreferenceProviders`, `usePreference` |

Do **not** use `next/script` (`beforeInteractive` or otherwise) for these inline scripts. Native blocking `<script>` tags are required so third-party tags in `<head>` cannot cause a hydration mismatch.

Do **not** put third-party loaders (AdSense, analytics) as raw/async scripts in `<head>` next to these. Load them with `next/script` `afterInteractive` or `lazyOnload` in `<body>`.

Keep `suppressHydrationWarning` on `<html>` (already required for theming).

---

## 1. Runtime environment

### Why

Next inlines `NEXT_PUBLIC_*` at **build** time. This repo swaps env files at runtime (dotenvx, Docker). `EnvScript` reads `process.env` on the **request**, writes `window.__ENV`, and `getRuntimeEnv()` uses that on the client so `createEnv()` sees the live values.

Only `NEXT_PUBLIC_*` and `NODE_ENV` are injected. Server secrets never go in the script.

### Layout

Mount once in the root layout `<head>`. `EnvScript` already wraps `connection()` in its own `<Suspense>` — do not add another boundary just for it.

```tsx
import { EnvScript } from '@repo/runtime-env/env-script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <EnvScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

In this repo: `apps/main/src/app/layout.tsx` and `apps/codehouse/src/app/[locale]/layout.tsx`.

### Validated `env` object

Wire **client and shared** keys through `getRuntimeEnv()`. Keep **server** keys on `process.env`.

```ts
import { getRuntimeEnv } from '@repo/runtime-env';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_ENV: z.enum(['development', 'production', 'staging']).default('development'),
    // …
  },
  server: {
    SITE_URL: z.url(),
    // …
  },
  shared: {
    NODE_ENV: z.enum(['development', 'production']).default('development'),
  },
  runtimeEnv: {
    SITE_URL: process.env.SITE_URL,
    NEXT_PUBLIC_ENV: getRuntimeEnv().NEXT_PUBLIC_ENV,
    NODE_ENV: getRuntimeEnv().NODE_ENV,
  },
});
```

Then `import { env } from '@/env'` on both server and client. Accessing a server key from a client component still throws (t3-env).

### What you should see

In the document:

```html
<script id="runtime-env">window.__ENV = {"NODE_ENV":"development","NEXT_PUBLIC_ENV":"development"};</script>
```

If a `NEXT_PUBLIC_*` key is missing here, it was not on `process.env` when the request ran. `EnvScript` does not invent keys from your Zod schema. Confirm the app’s `.env` (or dotenvx decrypt) is loaded into that process.

---

## 2. LocalStorage HTML preferences (optional)

Use this when CSS or markup must know a user choice **before paint** (FOUC). Theme (dark/light) stays on `@wrksz/themes` — do not reimplement it here.

### Define preferences, then spread one object

`createPreference` validates a single config. Put every config on one `preferences` object. Spread that object onto the head scripts **and** the client providers. Adding a preference means adding a key to that object — not editing layout or providers.

```ts
// src/preferences.ts
import { createPreference } from '@repo/runtime-env/preference';

const blogView = createPreference({
  storageKey: 'blog-view-preference',
  attribute: 'data-blog-view',
  defaultValue: 'blog',
  values: ['blog', 'video'],
});

export const preferences = {
  blogView,
};
```

`createPreference` requires a non-empty `storageKey` / `attribute` / `values`, and `defaultValue` must be one of `values`. Optional `id` defaults to `storageKey`. Duplicate `storageKey` or `attribute` values throw at render.

### Head and providers

```tsx
import { PreferenceScripts } from '@repo/runtime-env/preference';
import { preferences } from '@/preferences';

<head>
  <PreferenceScripts {...preferences} />
  <EnvScript />
</head>
```

```tsx
'use client';

import { PreferenceProviders } from '@repo/runtime-env/preference';
import { preferences } from '@/preferences';

<PreferenceProviders {...preferences}>{children}</PreferenceProviders>
```

Each config becomes a blocking script that reads `localStorage`, keeps the value only if it is in `values`, otherwise uses `defaultValue`, then sets `document.documentElement.setAttribute(attribute, value)`.

Style against the attribute:

```css
html[data-blog-view='video'] .flippable-card {
  /* …
}
```

`setValue` writes React state, `localStorage`, and the document attribute together.

### Hook

Read a single config off the same object.

```tsx
'use client';

import { usePreference } from '@repo/runtime-env/preference';
import { preferences } from '@/preferences';

const { value, setValue } = usePreference(preferences.blogView);
```

`usePreference` throws if it is used outside the matching provider (matched by `storageKey`).

---

## Checklist for a new Next app

1. Depend on `@repo/runtime-env` (`workspace:*`) and list it in `transpilePackages`.
2. Add `<EnvScript />` to the root layout `<head>`.
3. Point `createEnv` `runtimeEnv` client/shared keys at `getRuntimeEnv()`.
4. Keep `suppressHydrationWarning` on `<html>`.
5. If you need FOUC preferences: define them in `preferences.ts`, spread `{...preferences}` onto `PreferenceScripts` and `PreferenceProviders`. Components call `usePreference(preferences.blogView)`.
6. Keep third-party scripts out of `<head>` until after hydration (`afterInteractive` / `lazyOnload`).

## What not to do

- Do not use `next/script` for env or preference inline scripts.
- Do not duplicate the storage key in a hand-written `<script>` in the layout.
- Do not list preferences separately in the layout and in client providers — put them on one `preferences` object and spread `{...preferences}`.
- Do not export `blogView.Script` / `blogView.Provider` from a factory — import `PreferenceScripts` and `PreferenceProviders` from this package.
- Do not inject server secrets. Only `NEXT_PUBLIC_*` and `NODE_ENV` are allowed.
- Do not replace `@wrksz/themes` with a preference for dark mode.
