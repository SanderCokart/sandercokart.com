# env-nextjs - Reference

## Zod patterns

Use Zod schemas for validation and transformation:

```typescript
const server = {
  API_KEY: z.string().min(1),
  API_URL: z.string().url(),
  ENVIRONMENT: z.enum(['development', 'production']),
  OPTIONAL_VAR: z.string().optional(),
  PORT: z.coerce.number().default(3000),
  ENABLED: z
    .enum(['true', 'false'])
    .default('false')
    .transform(s => s === 'true'),
};
```

- **Optional**: `.optional()` or `.default(value)`
- **Numbers**: `z.coerce.number()` (string → number)
- **Booleans**: `.enum(['true','false']).transform(s => s === 'true')` or `z.coerce.boolean()`
- **URLs**: `z.string().url()` or `z.url()` (Zod 3.23+)

## Monorepo / runtime-env bridge

Developer guide: [`packages/runtime-env/README.md`](../../../packages/runtime-env/README.md).

In setups where client env vars are injected at runtime (e.g. SSR/hydration from `window.__ENV`), use a runtime getter in `runtimeEnv` for client and shared keys instead of `process.env` directly. Example in this repo: `apps/codehouse/src/env.ts` uses `getRuntimeEnv()` from `@repo/runtime-env` for `NEXT_PUBLIC_*` and `NODE_ENV` so the same validated `env` object works on server and client.

Mount `<EnvScript />` from `@repo/runtime-env/env-script` in the root layout `<head>`. It awaits `connection()`, injects only `NEXT_PUBLIC_*` plus `NODE_ENV` via a native blocking `<script>` (not `next/script`), and includes its own Suspense boundary.

For localStorage HTML attributes that must be set before first paint (FOUC), define each preference with `createPreference`, collect them on one `preferences` object, and spread `{...preferences}` onto `PreferenceScripts` and `PreferenceProviders`. Components still call `usePreference` with the individual config. Do not duplicate storage keys in a hand-written inline script.

## External links

- [T3 Stack - Env variables](https://create.t3.gg/en/usage/env-variables)
- [@t3-oss/env-nextjs GitHub](https://github.com/t3-oss/env-nextjs)
