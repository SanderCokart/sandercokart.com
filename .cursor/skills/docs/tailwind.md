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

## Custom CSS and animation

Reach for these in order; stop at the first that fits.

1. **Tailwind utilities**, including arbitrary values and properties (`[--accent-ink:oklch(from_var(--accent)_0.5_c_h)]`) and custom variants declared in the app's `globals.css` (e.g. codehouse `short:` for `height < 56rem`).
2. **tw-animate-css** (already imported by `@repo/ui` themes) for entrances: `fade-in slide-in-from-bottom-4 animation-duration-500 ease-snap fill-mode-both motion-safe:animate-in`.
   - Use `animation-duration-*`, not `duration-*`, and `motion-safe:` on `animate-in` only.
   - `delay-*`, `duration-*` and `ease-*` are also Tailwind core utilities with the same names, and those set the matching `transition-*` property. So `delay-500` delays hover transitions as well as the entrance. On an element that has hover transitions, set the delay inline (`style={{ animationDelay }}`). `ease-*` there also changes the hover easing; that is usually fine.
3. **`@utility` in a theme** for an effect several components share (`type-on`, `type-on-caret` in `packages/ui/src/themes/default.css`).
4. **A CSS Module** next to the component (`segment-logo.module.css`) when selectors have to work together and a class list would hide that:
   - pseudo-elements, or a parent's `:hover` / `:focus-visible` driving children (`service-cta.module.css`);
   - several animations in one `animation` list, or `animation-timeline` / `animation-range`, which have no utilities and must follow the `animation` shorthand (`chapters.module.css`, `previews.module.css`);
   - gradients or shadows too long to read as a class.

   Module rules:
   - camelCase class names, combined with utilities through `cn(styles.x, '…')`.
   - Read theme tokens as variables (`var(--color-brand-violet)`, `var(--ease-snap)`), not hex values. Tokens a module needs must be in `@theme static` so they are emitted even if no utility uses them.
   - No `@apply` (it would need `@reference`).
   - Theme switches with `:global(.dark) .x`.
   - Module CSS is not in a cascade layer, so it beats Tailwind utilities on the same element. Only rely on that deliberately and say so in a comment (`selling-points.module.css` replaces the label look on phones).
   - Keep layout and typography in Tailwind classes; the module holds only the coordinated part.

Do not add global, unscoped component stylesheets (`import './foo.css'`). `globals.css` is for the theme import, theme extensions, custom variants and the body background.

Motion (`motion/react`) stays the tool for JavaScript-driven animation: staggered variants (`lib/hero-reveal.ts`), enter/exit with `AnimatePresence`, and values tied to scroll position (`useScroll`).

Performance: do not put `mask`, `filter` or `backdrop-filter` on page-tall layers; Chrome repaints them through an offscreen buffer while scrolling. A plain `background` on `body` is the cheapest option.
