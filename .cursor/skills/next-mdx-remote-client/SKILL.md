---
name: next-mdx-remote-client
description: Comprehensive guidelines for working with next-mdx-remote-client in Next.js applications, covering both App Router (RSC) and Pages Router (CSR).
---

# next-mdx-remote-client Guidelines

`next-mdx-remote-client` is a modern, feature-rich alternative to `next-mdx-remote`, supporting MDX v3 and providing strict isolation between server and client concerns.

## Installation

```bash
# For React 19 (Next.js 15+)
pnpm add next-mdx-remote-client@2

# For React 18 (Next.js 13/14)
pnpm add next-mdx-remote-client@1
```

## App Router (RSC) Usage

In the App Router, always use the `next-mdx-remote-client/rsc` subpath.

### 1. MDXRemote Component (Recommended)

Use `MDXRemote` for standard rendering. It handles compilation and rendering in one step.

```tsx
import { Suspense } from 'react';
import { MDXRemote } from 'next-mdx-remote-client/rsc';

export default async function Page({ source }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MDXRemote
        source={source}
        options={{ parseFrontmatter: true }}
        components={components}
        onError={(error) => <ErrorComponent error={error} />}
      />
    </Suspense>
  );
}
```

### 2. evaluate Function

Use `evaluate` when you need access to `frontmatter`, `exports` (via `mod`), or `scope` directly in your JSX.

```tsx
import { Suspense } from 'react';
import { evaluate } from 'next-mdx-remote-client/rsc';

export default async function Page({ source }) {
  const { content, frontmatter, mod, scope, error } = await evaluate({
    source,
    options: { parseFrontmatter: true },
    components,
  });

  if (error) return <ErrorComponent error={error} />;

  return (
    <>
      <h1>{frontmatter.title}</h1>
      <Suspense fallback={<div>Loading...</div>}>
        {content}
      </Suspense>
    </>
  );
}
```

## Pages Router (CSR) Usage

The Pages Router requires a two-step process: `serialize` on the server and `MDXClient` (or `hydrate`) on the client.

### 1. Server-side Serialization

```typescript
// pages/blog/[slug].ts
import { serialize } from 'next-mdx-remote-client/serialize';

export async function getStaticProps() {
  const mdxSource = await serialize({
    source: '# Hello World',
    options: { parseFrontmatter: true }
  });
  return { props: { mdxSource } };
}
```

### 2. Client-side Rendering

```tsx
import { MDXClient } from 'next-mdx-remote-client/csr';

export default function Post({ mdxSource }) {
  if ('error' in mdxSource) return <ErrorComponent error={mdxSource.error} />;
  
  return <MDXClient {...mdxSource} components={components} />;
}
```

## Key Features & Options

### Frontmatter & Scope
- **`parseFrontmatter: true`**: Enables YAML frontmatter parsing.
- **`scope`**: Pass arbitrary data to the MDX context (e.g., `{ name: 'Sander' }` allows `{name}` in MDX).
- **`vfileDataIntoScope`**: Pass data from remark/rehype plugins (like TOC) into the MDX scope.
  - `vfileDataIntoScope: "toc"` copies `vfile.data.toc` to `scope.toc`.

### Error Handling
- **RSC**: Use the `onError` prop in `MDXRemote` or the `error` object returned by `evaluate`.
- **CSR**: Check `if ('error' in mdxSource)` after serialization.
- **Note**: `evaluate` and `MDXRemote` catch syntax errors during compilation, but runtime errors during rendering still require a React Error Boundary.

### Components
- **`wrapper`**: A special component key that wraps the entire MDX content.
- **`MDXProvider`**: Only works in the **Pages Router**. In RSC, you must pass components directly to `evaluate` or `MDXRemote`.

### Lazy Hydration (CSR Only)
Use `MDXClientLazy` or `hydrateLazy` to defer hydration until the browser is idle, improving initial load performance.

## Best Practices

1. **Suspense**: Always wrap `MDXRemote` or the `content` from `evaluate` in a `<Suspense>` block to handle the asynchronous nature of RSC rendering.
2. **Isolation**: Keep server-side logic in `rsc` and client-side logic in `csr`.
3. **Type Safety**: Use the exported types (`MDXComponents`, `EvaluateOptions`, `SerializeResult`, etc.) for better DX.
4. **Imports/Exports**: `next-mdx-remote-client` supports `import` and `export` statements in MDX. Use `disableImports` or `disableExports` in options if security is a concern.
5. **getFrontmatter**: Use the `getFrontmatter` utility from `next-mdx-remote-client/utils` to extract metadata without full compilation (useful for listing pages).
