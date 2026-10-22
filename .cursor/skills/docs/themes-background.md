# Themes background: `@wrksz/themes` vs `next-themes`

History and comparison. Day-to-day rules are in [themes.md](themes.md).

## Why `@wrksz/themes` instead of `next-themes`

This monorepo uses [`@wrksz/themes`](https://themes.wrksz.dev/) instead of [`next-themes`](https://github.com/pacocoursey/next-themes).

`next-themes` is effectively abandoned for modern Next.js/React stacks: no meaningful maintenance on React 19 and Next.js 16 issues, dozens of open issues and unmerged PRs, and known bugs that block safe upgrades. `@wrksz/themes` is a near drop-in replacement built for Next.js 16+ and React 19+, with the same `useTheme` shape and actively maintained releases.

**Do not add `next-themes` back.** Use `@wrksz/themes` for new work and when touching theme code.

## What stays the same

For day-to-day UI work, behavior is intentionally familiar:

| Concern               | Both libraries                                                               |
| --------------------- | ---------------------------------------------------------------------------- |
| `useTheme()`          | `theme`, `resolvedTheme`, `setTheme`, `systemTheme`, `forcedTheme`, `themes` |
| Class-based dark mode | `attribute="class"` toggles `.dark` on `<html>` (Tailwind/shadcn)            |
| System preference     | `enableSystem` + `defaultTheme="system"`                                     |
| Default persistence   | `localStorage` (unless `storage` is changed)                                 |
| Transition flash      | `disableTransitionOnChange` suppresses transitions on toggle                 |

`ThemeToggle` and `Toaster` work the same way from a component author's perspective.

## Setup difference (important)

|                    | `next-themes`                           | `@wrksz/themes` (this repo)                                        |
| ------------------ | --------------------------------------- | ------------------------------------------------------------------ |
| Provider import    | `"next-themes"`                         | `@wrksz/themes/next` via `@repo/ui/components/theme-provider`      |
| Provider type      | Client Component (`"use client"`)       | Async **Server Component**                                         |
| Typical mount      | Inside `providers.tsx` client wrapper   | Server file: `layout.tsx` or `server.*-providers.tsx` preferably   |
| Script injection   | Inline in React tree (React 19 warning) | `useServerInsertedHTML` (no warning)                               |
| State subscription | Legacy pattern                          | `useSyncExternalStore` (correct with React 19 / `cacheComponents`) |

We still centralize defaults in `@repo/ui/components/theme-provider`, but the implementation is a server provider - not a `"use client"` re-export like the old `next-themes` wrapper.

## Bugs fixed in `@wrksz/themes`

These are real production issues in `next-themes` that `@wrksz/themes` addresses:

| Bug                                                    | `next-themes`       | `@wrksz/themes`                            |
| ------------------------------------------------------ | ------------------- | ------------------------------------------ |
| React 19 inline `<script>` warning                     | Unresolved          | Fixed via `useServerInsertedHTML`          |
| `__name` minification error in production builds       | Unresolved          | Fixed                                      |
| Stale theme with React 19 `cacheComponents` / Activity | Unresolved          | Fixed via `useSyncExternalStore`           |
| Multiple classes per theme - old classes left on DOM   | Broken removal      | Fixed (proper class cleanup)               |
| Nested `ThemeProvider` instances                       | Shared global state | Per-instance store (`ClientThemeProvider`) |

## Behavioral API differences

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

## Features only in `@wrksz/themes`

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

## Summary

`@wrksz/themes` matches `next-themes` for the common path (toggle dark mode, read `resolvedTheme`, persist in `localStorage`) but is better suited to this stack because it is maintained for Next.js 16 / React 19, fixes known upstream bugs, mounts correctly as a server provider, and adds SSR-aware storage and server-side theme reads without extra boilerplate.

Docs: [themes.wrksz.dev](https://themes.wrksz.dev/) · Migration: [themes.wrksz.dev/docs/migration](https://themes.wrksz.dev/docs/migration)

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
