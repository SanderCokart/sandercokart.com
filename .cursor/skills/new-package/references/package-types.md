# Package Types & Examples

Different types of packages in the monorepo with real examples and configurations.

## TypeScript Library Package

A pure TypeScript library with no React dependencies.

### Example: `packages/i18n`

**package.json:**
```json
{
  "name": "@repo/i18n",
  "version": "0.0.0",
  "private": true,
  "imports": {
    "#*": "./src/*"
  },
  "exports": {
    "./actions/*": "./src/actions/*.ts",
    "./components/*": "./src/components/*.tsx",
    "./config": "./src/config.ts",
    "./messages/*": "./src/messages/*.json",
    "./request": "./src/request.ts"
  },
  "dependencies": {
    "next": "15.2.2",
    "next-intl": "4.1.0",
    "zod": "3.24.2"
  },
  "devDependencies": {
    "@repo/typescript-config": "workspace:*",
    "@types/node": "20.17.24",
    "@types/react": "19.0.10",
    "@types/react-dom": "19.0.4"
  }
}
```

**tsconfig.json:**
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

**Characteristics:**
- May not need a build step if using TypeScript directly
- Exports TypeScript files or compiled JavaScript
- Can include React components but doesn't require React as a dependency
- Uses `exports` field for explicit exports

## React Component Library

A package that exports React components and hooks.

### Example: `packages/ui`

**package.json:**
```json
{
  "name": "@repo/ui",
  "version": "0.0.0",
  "private": true,
  "exports": {
    "./globals.css": "./src/styles/globals.css",
    "./postcss.config": "./postcss.config.mjs",
    "./lib/*": "./src/lib/*.ts",
    "./components/*": "./src/components/*.tsx",
    "./hooks/*": "./src/hooks/*.ts"
  },
  "scripts": {
    "lint": "eslint . --max-warnings 0",
    "generate:component": "turbo gen react-component",
    "clean": "rm -rf node_modules"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/i18n": "workspace:*",
    "@repo/typescript-config": "workspace:*",
    "@tailwindcss/postcss": "4.0.14",
    "@turbo/gen": "^2.4.4",
    "@types/eslint": "9.6.1",
    "@types/node": "20.17.24",
    "@types/react": "19.2.7",
    "@types/react-dom": "19.2.3",
    "eslint": "9.22.0",
    "next-themes": "0.4.6",
    "react": "19.2.3",
    "tailwindcss": "4.0.14",
    "typescript": "5.8.2"
  },
  "dependencies": {
    "@hookform/resolvers": "4.1.3",
    "@radix-ui/react-aspect-ratio": "^1.1.2",
    "@radix-ui/react-checkbox": "^1.3.2",
    "class-variance-authority": "0.7.1",
    "clsx": "2.1.1",
    "framer-motion": "12.23.12",
    "lucide-react": "^0.482.0",
    "react-dom": "^19.2.3",
    "react-hook-form": "^7.56.4",
    "zod": "3.24.2"
  }
}
```

**tsconfig.json:**
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

**eslint.config.js:**
```javascript
import { config } from '@repo/eslint-config/react-internal';

/** @type {import("eslint").Linter.Config} */
export default config;
```

**Characteristics:**
- Exports React components, hooks, and utilities
- Uses React and React DOM as dependencies
- May include CSS/styling (Tailwind, etc.)
- Uses `react-library.json` TypeScript config
- Uses `react-internal` ESLint config

## Build Tool Package

A package that includes custom build scripts or tooling.

### Example: `packages/mail`

**Characteristics:**
- Uses `react-library.json` TypeScript config
- Has custom build script (e.g., `email build`)
- Build outputs need to be added to `turbo.json` outputs
- May use specialized build tools (react-email, etc.)

## Configuration Package

A package that provides shared configuration.

### Example: `packages/typescript-config`

**Characteristics:**
- Exports TypeScript configuration files
- Used by other packages via `extends`
- Minimal dependencies
- No build step needed

### Example: `packages/eslint-config`

**Characteristics:**
- Exports ESLint configuration
- Used by other packages
- Minimal dependencies
- No build step needed

## Choosing the Right Type

### Use TypeScript Library when:
- Package doesn't need React
- Exports utilities, types, or pure functions
- May be used in Node.js or browser contexts

### Use React Component Library when:
- Package exports React components
- Needs React and React DOM
- Includes UI components or hooks

### Use Build Tool Package when:
- Package has custom build processes
- Uses specialized build tools
- Produces build artifacts

### Use Configuration Package when:
- Package provides shared configs
- Used by other packages via `extends`
- No runtime code needed

## Package Structure Examples

### TypeScript Library Structure

```
packages/my-utils/
├── src/
│   ├── utils/
│   │   ├── format.ts
│   │   └── validate.ts
│   └── index.ts
├── package.json
├── tsconfig.json
└── eslint.config.js
```

### React Component Library Structure

```
packages/my-ui/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── Button.test.tsx
│   │   └── Card/
│   │       └── Card.tsx
│   ├── hooks/
│   │   └── useTheme.ts
│   └── lib/
│       └── utils.ts
├── package.json
├── tsconfig.json
└── eslint.config.js
```

## Real Package References

- **`packages/i18n`**: TypeScript library with React components
- **`packages/ui`**: React component library
- **`packages/mail`**: Build tool package
- **`packages/typescript-config`**: Configuration package
- **`packages/eslint-config`**: Configuration package

Use these as references when creating similar packages.
