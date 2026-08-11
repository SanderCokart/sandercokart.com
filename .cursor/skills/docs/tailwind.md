# Tailwind conventions

## Important modifier

Prefer the **suffix** important form (`utility!`) over the legacy prefix form (`!utility`).

```diff
- !opacity-100
+ opacity-100!
```

Same for other utilities, e.g. `leading-none!`, `border-primary!`, `font-digital!`.

Do not confuse with CSS `!important` in stylesheets or TypeScript `!` (non-null / negation)—only Tailwind class tokens.
