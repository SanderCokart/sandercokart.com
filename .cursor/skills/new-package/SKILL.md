---
name: new-package
description: Guidelines for creating a new package in the monorepo with proper Turborepo, TypeScript, and ESLint configuration. Use when creating or updating packages in the monorepo.
---

# Creating a New Package in the Monorepo

This guide helps you create new packages in the `packages/` directory of this Turborepo monorepo with proper configuration and best practices.

## Overview

When creating a new package, you need to:
1. Create the package directory structure
2. Set up `package.json` with proper dependencies
3. Configure TypeScript using `@repo/typescript-config`
4. Configure ESLint using `@repo/eslint-config`
5. Update `turbo.json` if the package has build outputs
6. Ensure the package follows monorepo conventions

## Quick Start

### 1. Create Directory

```bash
mkdir -p packages/your-package-name
cd packages/your-package-name
```

**Important:** Use kebab-case for directory names (e.g., `my-package`, not `myPackage`).

### 2. Initialize package.json

Create `package.json` with the basic structure:

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

See [Package Setup Guide](references/package-setup.md) for complete configuration details.

### 3. Configure TypeScript

Create `tsconfig.json` extending from shared configs:

**For React packages:**
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
  }
}
```

**For non-React packages:**
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
  }
}
```

### 4. Configure ESLint

Create `eslint.config.js`:

**For React packages:**
```javascript
import { config } from '@repo/eslint-config/react-internal';

/** @type {import("eslint").Linter.Config} */
export default config;
```

**For non-React packages:**
```javascript
import { config } from '@repo/eslint-config/base';

/** @type {import("eslint").Linter.Config} */
export default config;
```

### 5. Create Source Structure

```bash
mkdir -p src
# For React components:
mkdir -p src/components
# For utilities:
mkdir -p src/utils
```

### 6. Install Dependencies

From the monorepo root:
```bash
pnpm install
```

### 7. Verify Setup

```bash
# Check TypeScript
cd packages/your-package-name
npx tsc --noEmit

# Check ESLint (from root)
pnpm lint

# Check Turborepo tasks (from root)
turbo build
turbo lint
```

## Turborepo Configuration

If your package has build outputs, you may need to update the root `turbo.json`. See [Turborepo Configuration](references/turborepo-config.md) for details.

## Package Types

This monorepo includes several package types:
- **TypeScript Library**: `packages/i18n`
- **React Component Library**: `packages/ui`
- **Build Tool Package**: `packages/mail`

See [Package Types & Examples](references/package-types.md) for detailed examples and configurations.

## Reference Documentation

This skill includes detailed reference files:

- **[Package Setup Guide](references/package-setup.md)**: Complete `package.json`, TypeScript, and ESLint configuration
- **[Turborepo Configuration](references/turborepo-config.md)**: Turborepo-specific setup, task configuration, and caching
- **[Package Types & Examples](references/package-types.md)**: Different package types with real examples from the monorepo
- **[Best Practices](references/best-practices.md)**: Naming conventions, versioning, dependencies, and more
- **[Troubleshooting](references/troubleshooting.md)**: Common issues and solutions
- **[Context7 Integration](references/context7-integration.md)**: Setting up Context7 for documentation and version tracking

## Checklist

When creating a new package, ensure:

- [ ] Package directory created in `packages/` with kebab-case name
- [ ] `package.json` created with `@repo/` name prefix
- [ ] `@repo/eslint-config` and `@repo/typescript-config` in devDependencies
- [ ] `tsconfig.json` extends from appropriate `@repo/typescript-config` config
- [ ] `eslint.config.js` extends from appropriate `@repo/eslint-config` config
- [ ] Source directory structure created
- [ ] `turbo.json` updated if package has build outputs
- [ ] Dependencies installed (`pnpm install`)
- [ ] TypeScript compiles without errors
- [ ] ESLint passes
- [ ] Package can be imported by other packages

## External References

- [Turborepo Documentation](https://turborepo.com/docs)
- [Turborepo Package Configurations](https://turborepo.com/docs/reference/package-configurations)
- [Turborepo Creating Internal Packages](https://turborepo.com/docs/crafting-your-repository/creating-an-internal-package)
- Existing packages: `packages/i18n`, `packages/mail`, `packages/ui` for examples
