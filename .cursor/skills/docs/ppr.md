# Partial Prerendering (PPR) - `apps/codehouse`

`cacheComponents: true` in `apps/codehouse/next.config.ts` (Next.js 16). The shell (locale, env script, intl messages) streams per request; page bodies are cached behind `'use cache'`. Why, build-output symbols and the footer-year trade-off: [ppr-background.md](ppr-background.md).

Docs: [Cache Components](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents) · [`'use cache'`](https://nextjs.org/docs/app/api-reference/directives/use-cache) · [next-intl setup](https://next-intl.dev/docs/routing/setup)

## How locale flows

- `src/i18n/request.ts` reads the `[locale]` segment with `next/root-params` (`rootParams.locale()`), validates it with `hasLocale`, and calls `notFound()` for unknown locales. Explicit `locale` overrides (Server Actions, Route Handlers) win.
- Layouts and components get the locale with `await getLocale()` from `next-intl/server`. **Do not** await `params` for the locale and **do not** add `setRequestLocale` — root params replace both.
- `[locale]/layout.tsx` keeps `generateStaticParams()` returning every locale.

## Layout tree

```
[locale]/layout.tsx  RootLayout
└── Suspense (fallback: RootLayoutFallback, lang = routing.defaultLocale)
    └── LocalizedRootLayout      await getLocale() → <html lang>
        ├── <head> EnvScript     runtime env, request-time
        └── GlobalProviders
            ├── ServerProviders  ThemeProvider → Suspense → IntlProvider (getMessages)
            │   └── ClientProviders
            ├── SiteHeader
            ├── (root|routes/*)/layout.tsx → CachedPageContent ('use cache') → page.tsx
            └── Footer           server; year via client CopyrightMessage
```

Route layouts are one line of logic:

```tsx
// (routes)/<route>/layout.tsx
export default async function RouteLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  return <CachedPageContent locale={locale}>{children}</CachedPageContent>;
}
```

`CachedPageContent` (`[locale]/_ppr/cached-page-content.tsx`) is `'use cache'` + `cacheLife('hours')` + `cacheTag(\`page-${locale}\`)`. Invalidate with `revalidateTag('page-en')`.

## Rules

Do:

- Copy an existing route layout (`consumer`, `open-source`) for a new route.
- Use `getTranslations` in Server Components, `useTranslations` in Client Components.
- Put request-time work (`cookies`, `headers`, `connection`, uncached `await`) behind `Suspense`, or move it into a client component.
- After structural changes, `pnpm --filter codehouse build` and check `.next/prerender-manifest.json` shows `PARTIALLY_STATIC` + a revalidate time.

Don't:

- Use `new Date()` in a Server Component without `connection()` — the build fails. Use a client component (see `CopyrightMessage`).
- Block the root layout with an uncached `await` outside `Suspense`.
- Wrap static components (`SiteHeader`, server `getTranslations` sections) in `Suspense` "just in case", or add fake holes to change the CLI symbol. `ƒ` with `PARTIALLY_STATIC` in the manifest is fine.
- Remove `cacheComponents` / `'use cache'` to "fix" a build symbol.
- Treat `suppressHydrationWarning` as a fix for dynamic-API errors; it only covers hydration attribute mismatches.
- Mount `ThemeProvider` in `layout.tsx` — see [themes.md](themes.md).

## Suspense: required vs not

| Location | Suspense? | Why |
| --- | --- | --- |
| `LocalizedRootLayout` | Yes, in `RootLayout` | Locale is request-time |
| `EnvScript` | Yes (inside the streamed `<head>`) | Runtime env |
| `IntlProvider` / `getMessages()` | Yes, in `ServerProviders` | Messages load per request |
| `SiteHeader`, `Footer`, `Address` | No | Server translations are static per locale |
| `CachedPageContent` | No | `'use cache'` instead |

## Touchpoints

| File | Responsibility |
| --- | --- |
| `apps/codehouse/next.config.ts` | `cacheComponents: true` |
| `src/app/[locale]/layout.tsx` | Shell split, fallback `lang`, `generateStaticParams` |
| `src/i18n/request.ts` | Locale from `next/root-params`, 404 on unknown locale |
| `src/i18n/routing.ts`, `src/i18n/config.ts` | `locales`, `defaultLocale` |
| `src/providers/server.server-providers.tsx` | `ThemeProvider` + Suspense-wrapped `getMessages` |
| `src/app/[locale]/_ppr/cached-page-content.tsx` | Shared `'use cache'` wrapper |
| `src/app/[locale]/(root|routes/*)/layout.tsx` | `getLocale` + `CachedPageContent` |
| `src/app/[locale]/(components)/footer.tsx`, `copyright-message.tsx` | Server footer, client year |

i18n keys and the message script: [translations skill](../translations/SKILL.md).
