---
name: env-nextjs
description: Validates and types environment variables in Next.js using @t3-oss/env-nextjs and Zod. Use when adding or changing env vars, configuring server vs client vars, or when the user mentions .env, NEXT_PUBLIC_, or env validation in Next.js.
---

# Environment Variables with @t3-oss/env-nextjs

Type-safe env validation: define `server`, `client`, and `shared` with Zod; map all keys in `runtimeEnv`. Server-only vars must not be accessed on the client (runtime error). Client-visible vars must use the `NEXT_PUBLIC_` prefix.

## Setup

Create `env.ts` (e.g. `src/env.ts`):

```typescript
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const server = {
  DATABASE_URL: z.string().url(),
  API_SECRET: z.string().min(1),
};

const client = {
  NEXT_PUBLIC_API_URL: z.string().url().optional(),
  NEXT_PUBLIC_ENV: z.enum(['development', 'production']).default('development'),
};

const shared = {
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
};

export const env = createEnv({
  client,
  server,
  shared,
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    API_SECRET: process.env.API_SECRET,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
    NODE_ENV: process.env.NODE_ENV,
  },
});
```

## Rules

1. **Every key in `server`, `client`, or `shared` must appear in `runtimeEnv`** — otherwise validation will fail.
2. **Server variables** — Only on server. Accessing them in client code throws at runtime.
3. **Client variables** — Use `NEXT_PUBLIC_` prefix; available on server and client.
4. **Shared** — Same value on both (e.g. `NODE_ENV`).
5. Use Zod for validation and transforms (e.g. `z.coerce.number()`, `.transform(s => s === 'true')` for booleans).

## Usage

```typescript
import { env } from '@/env';

// Server: all vars available
const dbUrl = env.DATABASE_URL;

// Client: only NEXT_PUBLIC_* and shared
const apiUrl = env.NEXT_PUBLIC_API_URL;
// env.DATABASE_URL → runtime error on client
```

## Options

- **emptyStringAsUndefined**: `createEnv({ emptyStringAsUndefined: true, ... })` — treats `""` as undefined.
- **Coercion**: `z.coerce.number()`, `z.coerce.boolean()` for string envs that should be numbers/booleans.

## Additional resources

- Zod patterns, external docs, and monorepo/runtime-env usage: [reference.md](reference.md)
- In-repo example: `apps/codehouse/src/env.ts`
