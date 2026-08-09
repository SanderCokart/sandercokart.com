# Theme management (`@wrksz/themes`)

Dark/light mode for Next.js apps. Class-based theming via `.dark` on `<html>`.

## Why `@wrksz/themes` instead of `next-themes`

This monorepo uses [`@wrksz/themes`](https://themes.wrksz.dev/) instead of [`next-themes`](https://github.com/pacocoursey/next-themes).

`next-themes` is effectively abandoned for modern Next.js/React stacks: no meaningful maintenance on React 19 and Next.js 16 issues, dozens of open issues and unmerged PRs, and known bugs that block safe upgrades. `@wrksz/themes` is a near drop-in replacement built for Next.js 16+ and React 19+, with the same `useTheme` shape and actively maintained releases.

**Do not add `next-themes` back.** Use `@wrksz/themes` for new work and when touching theme code.

### What stays the same

For day-to-day UI work, behavior is intentionally familiar:

| Concern               | Both libraries                                                               |
| --------------------- | ---------------------------------------------------------------------------- |
| `useTheme()`          | `theme`, `resolvedTheme`, `setTheme`, `systemTheme`, `forcedTheme`, `themes` |
| Class-based dark mode | `attribute="class"` toggles `.dark` on `<html>` (Tailwind/shadcn)            |
| System preference     | `enableSystem` + `defaultTheme="system"`                                     |
| Default persistence   | `localStorage` (unless `storage` is changed)                                 |
| Transition flash      | `disableTransitionOnChange` suppresses transitions on toggle                 |

`ThemeToggle` and `Toaster` work the same way from a component author's perspective.

### Setup difference (important)

|                    | `next-themes`                           | `@wrksz/themes` (this repo)                                        |
| ------------------ | --------------------------------------- | ------------------------------------------------------------------ |
| Provider import    | `"next-themes"`                         | `@wrksz/themes/next` via `@repo/ui/components/theme-provider`      |
| Provider type      | Client Component (`"use client"`)       | Async **Server Component**                                         |
| Typical mount      | Inside `providers.tsx` client wrapper   | Server file: `layout.tsx` or `server.*-providers.tsx` preferably   |
| Script injection   | Inline in React tree (React 19 warning) | `useServerInsertedHTML` (no warning)                               |
| State subscription | Legacy pattern                          | `useSyncExternalStore` (correct with React 19 / `cacheComponents`) |

We still centralize defaults in `@repo/ui/components/theme-provider`, but the implementation is a server provider - not a `"use client"` re-export like the old `next-themes` wrapper.

### Bugs fixed in `@wrksz/themes`

These are real production issues in `next-themes` that `@wrksz/themes` addresses:

| Bug                                                    | `next-themes`       | `@wrksz/themes`                            |
| ------------------------------------------------------ | ------------------- | ------------------------------------------ |
| React 19 inline `<script>` warning                     | Unresolved          | Fixed via `useServerInsertedHTML`          |
| `__name` minification error in production builds       | Unresolved          | Fixed                                      |
| Stale theme with React 19 `cacheComponents` / Activity | Unresolved          | Fixed via `useSyncExternalStore`           |
| Multiple classes per theme - old classes left on DOM   | Broken removal      | Fixed (proper class cleanup)               |
| Nested `ThemeProvider` instances                       | Shared global state | Per-instance store (`ClientThemeProvider`) |

### Behavioral API differences

Same props exist, but a few callbacks and options behave differently or are richer:

**`onThemeChange`**

- `next-themes`: always fires the **resolved** value (`"light"` / `"dark"`), even when `setTheme("system")` was called.
- `@wrksz/themes`: fires the **selected** value (may be `"system"`). OS preference changes while theme is `"system"` still fire with the resolved value.

If persisting theme server-side via `onThemeChange`, handle `"system"` explicitly:

```tsx
onThemeChange={(theme) => {
  if (theme !== 'system') saveTheme(theme);
}}
```

**`disableTransitionOnChange`**

- `next-themes`: boolean only - disables all transitions.
- `@wrksz/themes`: `boolean | string` - pass a CSS `transition` value to suppress only specific properties (e.g. `"background-color 0s, color 0s"`) while keeping motion elsewhere.

### Features only in `@wrksz/themes`

Not enabled in our shared defaults today, but available without switching libraries:

| Feature                   | Prop / API                 | Why it matters                                 |
| ------------------------- | -------------------------- | ---------------------------------------------- |
| Zero-flash SSR            | `storage="cookie"`         | Theme known on first paint, no FOUC            |
| SSR + cross-tab sync      | `storage="hybrid"`         | Cookie for SSR, `localStorage` mirror for tabs |
| Tab-scoped persistence    | `storage="sessionStorage"` | Theme resets when tab closes                   |
| Opt out of persistence    | `storage="none"`           | Forced/scoped previews                         |
| Server-seeded theme       | `initialTheme`             | DB/user preference on first mount              |
| Always follow OS          | `followSystem`             | Ignore stored choice, track system             |
| Safari/PWA chrome         | `themeColor`               | Updates `<meta name="theme-color">`            |
| Read theme outside React  | `getTheme()`               | Middleware, RSC, edge - sync or async          |
| Typed custom themes       | `createThemes(...)`        | Inferred union on `useTheme` / `setTheme`      |
| Theme-change side effects | `useThemeEffect(...)`      | Run logic after mount on theme changes         |

### Summary

`@wrksz/themes` matches `next-themes` for the common path (toggle dark mode, read `resolvedTheme`, persist in `localStorage`) but is better suited to this stack because it is maintained for Next.js 16 / React 19, fixes known upstream bugs, mounts correctly as a server provider, and adds SSR-aware storage and server-side theme reads without extra boilerplate.

Docs: [themes.wrksz.dev](https://themes.wrksz.dev/) · Migration: [themes.wrksz.dev/docs/migration](https://themes.wrksz.dev/docs/migration)

## Package layout

| Workspace        | Role                                                                                           |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| `@repo/ui`       | Owns `@wrksz/themes`, shared `ThemeProvider` defaults, client hooks (`ThemeToggle`, `Toaster`) |
| `apps/main`, `apps/codehouse` | Mount `@repo/ui/components/theme-provider` in `server.server-providers.tsx` |

Bump the library with `pnpm add @wrksz/themes@<version> --filter @repo/ui`.

## Shared provider (`@repo/ui`)

Default dark-mode settings live in one place so every frontend behaves the same:

```tsx
// packages/ui/src/components/theme-provider.tsx
import { ThemeProvider } from '@wrksz/themes/next';

// attribute="class", defaultTheme="system", enableSystem, disableTransitionOnChange
```

Apps import the wrapper - **do not** import `@wrksz/themes/next` directly for the root provider.

Both apps mount `ThemeProvider` in `server.server-providers.tsx` - not in `layout.tsx`.

**`main`:**

```tsx
// apps/main/src/providers/server.server-providers.tsx
import { ThemeProvider } from '@repo/ui/components/theme-provider';

export const ServerProviders = async ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
```

**`codehouse`** (also wraps `NextIntlClientProvider`):

```tsx
// apps/codehouse/src/providers/server.server-providers.tsx
import { ThemeProvider } from '@repo/ui/components/theme-provider';

export const ServerProviders = async ({ children }) => {
  const messages = await getMessages();
  return (
    <ThemeProvider>
      <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
    </ThemeProvider>
  );
};
```

Layouts import `GlobalProviders` from `server.global-providers.tsx` only.

`suppressHydrationWarning` on `<html>` is required.

Overriding provider props per app is **discouraged**. Only pass props when an app has a genuine, documented reason to diverge from the shared defaults.

`ThemeProvider` is an **async Server Component** - mount it in a server file (`layout.tsx` or `server.*-providers.tsx`), not inside a `"use client"` wrapper.

## Provider hierarchy

Both apps use the same three-file provider split. `ThemeProvider` never lives in `layout.tsx`.

### `main`

```
layout.tsx
└── GlobalProviders
    └── ServerProviders    ← server (ThemeProvider)
        └── ClientProviders ← client (BlogViewProvider)
            └── Header + page content
```

### `codehouse`

```
layout.tsx
└── GlobalProviders
    └── ServerProviders    ← server (ThemeProvider → NextIntlClientProvider)
        └── ClientProviders ← client (empty passthrough today)
            └── page content + Footer
```

| File | Layer | Role |
|------|-------|------|
| `apps/*/src/**/layout.tsx` | Server | HTML shell, fonts, metadata - imports `GlobalProviders` only |
| `apps/*/src/providers/server.global-providers.tsx` | Server | Composes `ServerProviders` → `ClientProviders` |
| `apps/*/src/providers/server.server-providers.tsx` | Server | `ThemeProvider` (+ `NextIntlClientProvider` in codehouse) |
| `apps/main/src/providers/client.client-providers.tsx` | Client | `BlogViewProvider` |
| `apps/codehouse/src/providers/client.client-providers.tsx` | Client | Reserved for client-only providers |

## Client hooks

Client components in `@repo/ui` use `@wrksz/themes/client`:

```tsx
'use client';

import { useTheme } from '@wrksz/themes/client';

const { theme, resolvedTheme, setTheme } = useTheme();
```

| Import                               | Use for                                                              |
| ------------------------------------ | -------------------------------------------------------------------- |
| `@repo/ui/components/theme-provider` | Root `ThemeProvider` in a server file (preferred)                    |
| `@wrksz/themes/next`                 | `getTheme()` in middleware or RSC only - not the root provider       |
| `@wrksz/themes/client`               | `useTheme`, `useThemeValue`, `useThemeEffect`, `ClientThemeProvider` |

For a nested provider inside a Client Component, use `ClientThemeProvider` from `@wrksz/themes/client`.

## Default configuration

Set in `@repo/ui/components/theme-provider`:

| Prop                        | Value      | Effect                                                   |
| --------------------------- | ---------- | -------------------------------------------------------- |
| `attribute`                 | `"class"`  | Toggles `.dark` on `<html>` (Tailwind/shadcn convention) |
| `defaultTheme`              | `"system"` | Respects OS preference when no stored choice             |
| `enableSystem`              | `true`     | Enables `prefers-color-scheme`                           |
| `disableTransitionOnChange` | `true`     | Avoids flash of animated colors on toggle                |

Storage defaults to `localStorage`. To change defaults, edit `theme-provider.tsx` in `@repo/ui` - not individual app layouts.

## Monorepo touchpoints

| File                                                       | Responsibility                          |
| ---------------------------------------------------------- | --------------------------------------- |
| `packages/ui/src/components/theme-provider.tsx`            | Shared defaults; single source of truth |
| `apps/main/src/providers/server.server-providers.tsx`      | Mounts `<ThemeProvider>`                |
| `apps/codehouse/src/providers/server.server-providers.tsx` | Mounts `<ThemeProvider>`                |
| `apps/main/src/providers/client.client-providers.tsx`      | `BlogViewProvider`                      |
| `apps/codehouse/src/providers/client.client-providers.tsx` | Client provider slot (empty)            |
| `packages/ui/src/components/header/theme-toggle.tsx`       | Header toggle                           |
| `packages/ui/src/components/shadcn/sonner.tsx`             | Toasts follow `theme`                   |

## Adding theme UI in a new app

1. Ensure the app depends on `@repo/ui` (transitively pulls in `@wrksz/themes`).
2. Add the three-file provider split: `server.global-providers.tsx`, `server.server-providers.tsx`, `client.client-providers.tsx`.
3. Mount `<ThemeProvider>` in `server.server-providers.tsx` - not in `layout.tsx`.
4. Keep `client.client-providers.tsx` even when empty, for future client-only providers.
5. Reuse `ThemeToggle` or `Toaster` from `@repo/ui` as needed.

## Migrating from `next-themes`

1. Remove `next-themes`; add `@wrksz/themes` to `@repo/ui` only.
2. Use `@repo/ui/components/theme-provider` in a server file - not a `"use client"` wrapper.
3. Change `useTheme` imports to `@wrksz/themes/client` in client components.

See **Behavioral API differences** above for `onThemeChange` and `disableTransitionOnChange`.

## Optional features (not enabled by default)

Change defaults in `theme-provider.tsx` if adopting monorepo-wide:

- `storage="cookie"` - zero-flash SSR
- `storage="hybrid"` - cookie + cross-tab sync
- `getTheme()` - read theme in middleware or RSC
- `initialTheme` - server-provided override on mount
- `themeColor` - update `<meta name="theme-color">`
- `createThemes(...)` - typed theme union for custom theme names
