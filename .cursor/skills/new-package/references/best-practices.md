# Best Practices

Guidelines for creating and maintaining packages in the monorepo.

## Naming Conventions

### Package Directory

- Use **kebab-case** for directory names
- Be descriptive but concise
- Examples: `my-package`, `ui-components`, `data-utils`

**Good:**
- `ui-components`
- `data-utils`
- `email-templates`

**Bad:**
- `uiComponents` (camelCase)
- `UI_COMPONENTS` (SCREAMING_SNAKE_CASE)
- `ui_components` (snake_case)

### Package Name

- Use `@repo/` prefix for all package names
- Match directory name (kebab-case)
- Examples: `@repo/ui-components`, `@repo/data-utils`

**Format:** `@repo/{directory-name}`

## Version Management

### Internal Packages

- Use `"0.0.0"` for all internal packages
- Don't increment versions for internal packages
- Versioning is only relevant for published packages

### Workspace Dependencies

- Always use `workspace:*` protocol for internal dependencies
- PNPM automatically resolves to local workspace packages
- Don't use version numbers for workspace dependencies

**Example:**
```json
{
  "devDependencies": {
    "@repo/ui": "workspace:*",
    "@repo/i18n": "workspace:*"
  }
}
```

## TypeScript Configuration

### Always Extend Shared Configs

- Use `@repo/typescript-config` configs
- Don't duplicate configuration
- Extend from base configs and override only what's needed

**Good:**
```json
{
  "extends": "@repo/typescript-config/react-library.json",
  "include": ["src"]
}
```

**Bad:**
```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    // ... many other options
  }
}
```

### Path Aliases

- Use path aliases for cleaner imports
- Common pattern: `@/*` for `./src/*`

**Example:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## ESLint Configuration

### Extend Shared Configs

- Always use `@repo/eslint-config` configs
- Keep config minimal
- Don't duplicate rules

**Good:**
```javascript
import { config } from '@repo/eslint-config/react-internal';
export default config;
```

**Bad:**
```javascript
export default {
  rules: {
    // ... many rules duplicated from shared config
  }
};
```

## Package Exports

### Use Explicit Exports

- Define `exports` field in `package.json`
- Be explicit about what's exported
- Use path patterns for directory exports

**Example:**
```json
{
  "exports": {
    "./components/*": "./src/components/*.tsx",
    "./utils/*": "./src/utils/*.ts",
    "./config": "./src/config.ts"
  }
}
```

### Path Imports

- Use `imports` field for internal path imports
- Common pattern: `#*` for `./src/*`

**Example:**
```json
{
  "imports": {
    "#*": "./src/*"
  }
}
```

## Dependencies

### Runtime vs Dev Dependencies

- **dependencies**: Code needed at runtime
- **devDependencies**: Build tools, type definitions, development tools

**Example:**
```json
{
  "dependencies": {
    "react": "19.2.3",
    "zod": "3.24.2"
  },
  "devDependencies": {
    "@repo/typescript-config": "workspace:*",
    "@types/react": "19.2.7",
    "typescript": "5.8.2"
  }
}
```

### Workspace Dependencies

- Use `workspace:*` for internal packages
- Don't use version numbers
- PNPM automatically resolves to local packages

## Turborepo Configuration

### Build Tasks

- Always use `dependsOn: ["^build"]` for build tasks
- Specify `outputs` for build tasks to enable caching
- Use `^` prefix for dependency tasks

**Example:**
```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    }
  }
}
```

### Task Configuration

- Don't cache dev tasks (`"cache": false`)
- Mark persistent tasks (`"persistent": true`)
- Specify outputs for cacheable tasks

## Scripts

### Standard Scripts

Include a `clean` script in every package:

```json
{
  "scripts": {
    "clean": "rm -rf node_modules"
  }
}
```

### Package-Specific Scripts

Add scripts as needed for package-specific tasks:

```json
{
  "scripts": {
    "build": "tsc",
    "test": "vitest",
    "lint": "eslint ."
  }
}
```

## Source Organization

### Directory Structure

- Keep source in `src/` directory
- Organize by feature or type
- Use consistent naming

**Example:**
```
src/
├── components/
├── hooks/
├── utils/
└── types/
```

### File Naming

- Use kebab-case for files: `my-component.tsx`
- Use PascalCase for React components: `MyComponent.tsx`
- Use camelCase for utilities: `formatDate.ts`

## Documentation

### README

- Include a README.md in each package
- Document what the package does
- Include usage examples
- Document exports

### Code Comments

- Use JSDoc for exported functions
- Document complex logic
- Keep comments up to date

## Testing

### Test Structure

- Co-locate tests with source files
- Use `.test.ts` or `.spec.ts` extensions
- Or use a `__tests__` directory

**Example:**
```
src/
├── utils/
│   ├── format.ts
│   └── format.test.ts
```

## Common Patterns

### Re-export Pattern

Create an `index.ts` that re-exports from subdirectories:

```typescript
export * from './components';
export * from './utils';
export * from './hooks';
```

### Type Exports

Export types alongside implementations:

```typescript
export { MyComponent } from './MyComponent';
export type { MyComponentProps } from './MyComponent';
```

## Checklist

When creating a package, follow these practices:

- [ ] Use kebab-case for directory and package name
- [ ] Use `@repo/` prefix for package name
- [ ] Set version to `"0.0.0"`
- [ ] Set `private: true`
- [ ] Extend from shared TypeScript configs
- [ ] Extend from shared ESLint configs
- [ ] Use `workspace:*` for internal dependencies
- [ ] Define `exports` field if exporting code
- [ ] Include `clean` script
- [ ] Organize source in `src/` directory
- [ ] Add README.md with documentation
