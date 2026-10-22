# Theme management (`@wrksz/themes`)

Dark/light mode for the Next apps: class-based, `.dark` on `<html>`. Why this library, the `next-themes` comparison, migration notes and unused features: [themes-background.md](themes-background.md).

## Rules

- **Never add `next-themes`.** `@wrksz/themes` is a dependency of `@repo/ui` only (`pnpm add @wrksz/themes@<version> --filter @repo/ui`).
- Root provider: import `ThemeProvider` from `@repo/ui/components/theme-provider`, never `@wrksz/themes/next` directly.
- `ThemeProvider` is an **async Server Component**. Mount it in `src/providers/server.server-providers.tsx` — not in `layout.tsx`, not in a `"use client"` wrapper.
- Layouts import `GlobalProviders` from `server.global-providers.tsx` only, and keep `suppressHydrationWarning` on `<html>`.
- Change defaults in `packages/ui/src/components/theme-provider.tsx`, not per app. Per-app props need a documented reason.
- Client code: `useTheme`, `useThemeValue`, `useThemeEffect`, `ClientThemeProvider` (nested providers) from `@wrksz/themes/client`.
- `getTheme()` from `@wrksz/themes/next` only in middleware or RSC.
- `onThemeChange` fires the **selected** value, which can be `"system"` — handle it before persisting.

## Defaults (`@repo/ui/components/theme-provider`)

`attribute="class"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`. Storage: `localStorage`.

## Provider hierarchy (both apps)

```
layout.tsx
└── GlobalProviders            server.global-providers.tsx
    └── ServerProviders        server.server-providers.tsx  ← ThemeProvider (+ NextIntlClientProvider in codehouse)
        └── ClientProviders    client.client-providers.tsx  ← BlogViewProvider in main; empty slot in codehouse
            └── page content
```

```tsx
// apps/codehouse/src/providers/server.server-providers.tsx
export async function ServerProviders({ children }) {
  return (
    <ThemeProvider>
      <Suspense fallback={null}>
        <IntlProvider>{children}</IntlProvider> {/* getMessages → NextIntlClientProvider */}
      </Suspense>
    </ThemeProvider>
  );
}
```

## Touchpoints

| File | Responsibility |
| --- | --- |
| `packages/ui/src/components/theme-provider.tsx` | Shared defaults; single source of truth |
| `apps/{main,codehouse}/src/providers/server.server-providers.tsx` | Mounts `<ThemeProvider>` |
| `apps/{main,codehouse}/src/providers/client.client-providers.tsx` | Client-only providers |
| `packages/ui/src/components/header/theme-toggle.tsx` | Header toggle |
| `packages/ui/src/components/shadcn/sonner.tsx` | Toasts follow `theme` |

## New app

1. Depend on `@repo/ui`.
2. Add the three provider files above; keep `client.client-providers.tsx` even when empty.
3. Mount `<ThemeProvider>` in `server.server-providers.tsx`; reuse `ThemeToggle` / `Toaster` from `@repo/ui`.
