# Package Setup Guide

Complete guide for setting up `package.json`, TypeScript, and ESLint configuration.

## package.json Configuration

### Basic Structure

Every package needs a `package.json` with these required fields:

```json
{
  "name": "@repo/your-package-name",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "clean": "rm -rf node_modules"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "@types/node": "20.17.24",
    "typescript": "5.8.2"
  }
}
```

### Key Points

- **Name**: Use `@repo/` prefix for all package names
- **Version**: Set to `"0.0.0"` for all internal packages
- **Private**: Always set `private: true` to prevent accidental publishing
- **Dependencies**: Include `@repo/eslint-config` and `@repo/typescript-config` as devDependencies

### React Packages

For React packages, add React type definitions:

```json
{
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "@types/node": "20.17.24",
    "@types/react": "19.2.7",
    "@types/react-dom": "19.2.3",
    "typescript": "5.8.2"
  }
}
```

### Package Exports

For packages that export code, add an `exports` field:

```json
{
  "exports": {
    "./config": "./src/config.ts",
    "./components/*": "./src/components/*.tsx",
    "./utils/*": "./src/utils/*.ts"
  }
}
```

**Example from `packages/i18n`:**
```json
{
  "exports": {
    "./actions/*": "./src/actions/*.ts",
    "./components/*": "./src/components/*.tsx",
    "./config": "./src/config.ts",
    "./messages/*": "./src/messages/*.json",
    "./request": "./src/request.ts"
  }
}
```

### Path Imports

For packages using path imports, add an `imports` field:

```json
{
  "imports": {
    "#*": "./src/*"
  }
}
```

**Example from `packages/i18n`:**
```json
{
  "imports": {
    "#*": "./src/*"
  }
}
```

### Dependencies vs devDependencies

- **dependencies**: Runtime dependencies needed by the package
- **devDependencies**: Build tools, type definitions, and development dependencies

**Example:**
```json
{
  "dependencies": {
    "next": "15.2.2",
    "next-intl": "4.1.0",
    "zod": "3.24.2"
  },
  "devDependencies": {
    "@repo/typescript-config": "workspace:*",
    "@types/node": "20.17.24",
    "@types/react": "19.0.10"
  }
}
```

### Workspace Dependencies

When depending on other workspace packages, use the `workspace:*` protocol:

```json
{
  "devDependencies": {
    "@repo/ui": "workspace:*",
    "@repo/i18n": "workspace:*"
  }
}
```

PNPM automatically resolves `workspace:*` to the local workspace package.

## TypeScript Configuration

### React Packages

Create `tsconfig.json` extending from the React library config:

```json
{
  "extends": "@repo/typescript-config/react-library.json",
  "include": ["src"],
  "compilerOptions": {
    "outDir": "dist",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
```

### Non-React Packages

For non-React TypeScript packages:

```json
{
  "extends": "@repo/typescript-config/base.json",
  "include": ["src"],
  "compilerOptions": {
    "outDir": "dist",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
```

### Key Points

- Always extend from `@repo/typescript-config` base configs
- Use `react-library.json` for React packages, `base.json` for others
- Configure `outDir` if the package builds to a `dist` directory
- Set up path aliases for cleaner imports (e.g., `@/*` for `./src/*`)
- Strict mode is enabled in base configs

## ESLint Configuration

### React Packages

Create `eslint.config.js`:

```javascript
import { config } from '@repo/eslint-config/react-internal';

/** @type {import("eslint").Linter.Config} */
export default config;
```

### Non-React Packages

For non-React packages:

```javascript
import { config } from '@repo/eslint-config/base';

/** @type {import("eslint").Linter.Config} */
export default config;
```

### Key Points

- Use `react-internal` for React packages
- Use `base` for non-React packages
- The config is automatically applied when running `pnpm lint` from the root
- Keep config minimal - extend from shared configs

## Source Directory Structure

### Basic Structure

```bash
packages/your-package-name/
├── src/
│   └── index.ts
├── package.json
├── tsconfig.json
└── eslint.config.js
```

### React Components

```bash
packages/your-package-name/
├── src/
│   ├── components/
│   │   └── MyComponent.tsx
│   ├── hooks/
│   │   └── useMyHook.ts
│   └── lib/
│       └── utils.ts
├── package.json
├── tsconfig.json
└── eslint.config.js
```

### Utilities Package

```bash
packages/your-package-name/
├── src/
│   ├── utils/
│   │   └── format.ts
│   └── index.ts
├── package.json
├── tsconfig.json
└── eslint.config.js
```

## Verification

After setup, verify everything works:

### TypeScript Compilation

```bash
cd packages/your-package-name
npx tsc --noEmit
```

### ESLint

```bash
# From root
pnpm lint
```

### Import Test

Create a test file in another package:

```typescript
import { something } from '@repo/your-package-name';
```

If the import works, your package is properly configured.
