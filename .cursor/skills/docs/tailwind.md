# Tailwind conventions

Use Tailwind CSS **v4.3+** CSS-first setup (`@import "tailwindcss"`, `@theme`, `@plugin`, `@utility`).

## Package versions

Keep these aligned across workspaces (`apps/codehouse`, `apps/main`, `packages/ui`, root):

- `tailwindcss` + `@tailwindcss/postcss`
- `@tailwindcss/typography` (in `@repo/ui`)
- `prettier-plugin-tailwindcss` (root)

Do not add `autoprefixer` or `postcss-import` for Tailwind — v4 handles imports and vendor prefixes via `@tailwindcss/postcss`.

## Important modifier

Prefer the **suffix** important form (`utility!`) over the legacy prefix form (`!utility`).

```diff
- !opacity-100
+ opacity-100!
```

Same for other utilities, e.g. `leading-none!`, `border-primary!`, `font-digital!`.

Do not confuse with CSS `!important` in stylesheets or TypeScript `!` (non-null / negation)—only Tailwind class tokens.

## Preferred class forms

Prefer current v4 names / syntax when writing new classes:

| Avoid | Prefer |
| --- | --- |
| `bg-gradient-to-*` | `bg-linear-to-*` |
| `max-w-screen-*` | `max-w-(--breakpoint-*)` |
| `theme(spacing.*)` in arbitrary values | `(--spacing(*))` |
| `grid-rows-[1fr,1fr]` | `grid-rows-[1fr_1fr]` |
| `[&:has(...)]:` | `has-[...]:` where equivalent |

When upgrading, run `@tailwindcss/upgrade` from each Tailwind workspace and review the diff (especially dynamic CSS variables like `border-(--color-border)`).
