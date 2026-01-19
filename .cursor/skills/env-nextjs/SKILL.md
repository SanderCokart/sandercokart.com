---
name: env-nextjs
description: Guidelines for working with environment variables in Next.js applications using @t3-oss/env-nextjs
---

# Environment Variables with @t3-oss/env-nextjs

This guide covers how to work with environment variables in Next.js applications using `@t3-oss/env-nextjs` for type-safe validation.

## Overview

`@t3-oss/env-nextjs` provides type-safe environment variable validation using Zod schemas. It separates server-side and client-side variables, preventing accidental exposure of sensitive data.

## Basic Setup

Create an `env.ts` file (typically in `src/env.ts`) with the following structure:

```typescript
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const server = {
  // Server-side variables (not exposed to client)
  DATABASE_URL: z.string().url(),
  API_SECRET: z.string().min(1),
};

const client = {
  // Client-side variables (must be prefixed with NEXT_PUBLIC_)
  NEXT_PUBLIC_API_URL: z.string().url().optional(),
  NEXT_PUBLIC_ENV: z.enum(['development', 'production']).default('development'),
};

const shared = {
  // Variables available on both server and client
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
};

export const env = createEnv({
  client,
  server,
  shared,
  runtimeEnv: {
    // Map all variables to process.env
    DATABASE_URL: process.env.DATABASE_URL,
    API_SECRET: process.env.API_SECRET,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
    NODE_ENV: process.env.NODE_ENV,
  },
});
```

## Key Concepts

### Server vs Client Variables

- **Server variables**: Only available on the server. Accessing them on the client throws a runtime error.
- **Client variables**: Must be prefixed with `NEXT_PUBLIC_` and are available on both server and client.
- **Shared variables**: Available on both server and client (e.g., `NODE_ENV`).

### Zod Validation

Use Zod schemas to validate and transform environment variables:

```typescript
const server = {
  // String validation
  API_KEY: z.string().min(1),
  
  // URL validation
  API_URL: z.string().url(),
  
  // Enum validation
  ENVIRONMENT: z.enum(['development', 'production']),
  
  // Optional variables
  OPTIONAL_VAR: z.string().optional(),
  
  // Default values
  PORT: z.coerce.number().default(3000),
  
  // Transformations
  ENABLED: z
    .enum(['true', 'false'])
    .default('false')
    .transform(s => s === 'true'),
};
```

## Usage

Import and use the validated environment variables:

```typescript
import { env } from '@/env';

// Server-side usage (in API routes, server components, etc.)
const dbUrl = env.DATABASE_URL; // ✅ Works
const apiSecret = env.API_SECRET; // ✅ Works

// Client-side usage (in client components)
const apiUrl = env.NEXT_PUBLIC_API_URL; // ✅ Works
const dbUrl = env.DATABASE_URL; // ❌ Runtime error!
```

## Best Practices

1. **Always include in `runtimeEnv`**: Every variable defined in `server`, `client`, or `shared` must be mapped in `runtimeEnv`.

2. **Use appropriate validation**: Choose Zod schemas that match your variable's expected type and format.

3. **Separate concerns**: Keep server variables separate from client variables to prevent accidental exposure.

4. **Use defaults when appropriate**: Provide sensible defaults for optional variables.

5. **Transform when needed**: Use Zod's `transform` method to convert string environment variables to other types (booleans, numbers, etc.).

## Common Patterns

### Empty String as Undefined

```typescript
export const env = createEnv({
  emptyStringAsUndefined: true, // Treats empty strings as undefined
  // ... rest of config
});
```

### Type Coercion

```typescript
const server = {
  PORT: z.coerce.number(), // Converts string to number
  ENABLED: z.coerce.boolean(), // Converts string to boolean
};
```

## References

- [T3 Stack Documentation](https://create.t3.gg/en/usage/env-variables)
- [@t3-oss/env-nextjs GitHub](https://github.com/t3-oss/env-nextjs)
- Example: `apps/codehouse/src/env.ts`
