# Troubleshooting

Common issues when creating packages and their solutions.

## TypeScript Issues

### TypeScript can't find `@repo/typescript-config`

**Problem:** TypeScript errors about missing `@repo/typescript-config` module.

**Possible causes:**
- Package not in `devDependencies`
- `pnpm install` not run
- Package not properly linked in workspace

**Solutions:**

1. **Ensure it's in devDependencies:**
   ```json
   {
     "devDependencies": {
       "@repo/typescript-config": "workspace:*"
     }
   }
   ```

2. **Run pnpm install from root:**
   ```bash
   pnpm install
   ```

3. **Verify package exists:**
   ```bash
   ls packages/typescript-config
   ```

### TypeScript compilation errors

**Problem:** TypeScript reports errors when compiling.

**Solutions:**

1. **Check tsconfig.json extends:**
   ```json
   {
     "extends": "@repo/typescript-config/react-library.json"
   }
   ```

2. **Verify TypeScript version:**
   ```json
   {
     "devDependencies": {
       "typescript": "5.8.2"
     }
   }
   ```

3. **Check for missing type definitions:**
   ```json
   {
     "devDependencies": {
       "@types/node": "20.17.24",
       "@types/react": "19.2.7"
     }
   }
   ```

## ESLint Issues

### ESLint errors about missing config

**Problem:** ESLint can't find `@repo/eslint-config`.

**Solutions:**

1. **Ensure it's in devDependencies:**
   ```json
   {
     "devDependencies": {
       "@repo/eslint-config": "workspace:*"
     }
   }
   ```

2. **Verify eslint.config.js exists:**
   ```javascript
   import { config } from '@repo/eslint-config/react-internal';
   export default config;
   ```

3. **Run pnpm install:**
   ```bash
   pnpm install
   ```

### ESLint not running

**Problem:** ESLint doesn't run for the package.

**Solutions:**

1. **Check package.json has lint script (optional):**
   ```json
   {
     "scripts": {
       "lint": "eslint ."
     }
   }
   ```

2. **Run from root:**
   ```bash
   pnpm lint
   ```

   ESLint should run for all packages automatically.

## Turborepo Issues

### Turborepo doesn't recognize the package

**Problem:** Package doesn't appear in Turborepo tasks.

**Solutions:**

1. **Verify package.json exists:**
   ```bash
   ls packages/your-package/package.json
   ```

2. **Check pnpm-workspace.yaml includes packages:**
   ```yaml
   packages:
     - "packages/*"
   ```

3. **Verify package is in packages/ directory:**
   ```bash
   ls packages/
   ```

4. **Run pnpm install:**
   ```bash
   pnpm install
   ```

### Build outputs not cached

**Problem:** Build outputs aren't being cached by Turborepo.

**Solutions:**

1. **Specify outputs in turbo.json:**
   ```json
   {
     "tasks": {
       "build": {
         "outputs": ["dist/**"]
       }
     }
   }
   ```

2. **Verify output directory exists after build:**
   ```bash
   pnpm build
   ls dist/
   ```

3. **Check turbo.json syntax:**
   ```bash
   # Validate JSON
   cat turbo.json | jq .
   ```

### Task dependencies not working

**Problem:** Package builds before its dependencies.

**Solutions:**

1. **Add dependsOn with ^ prefix:**
   ```json
   {
     "tasks": {
       "build": {
         "dependsOn": ["^build"]
       }
     }
   }
   ```

2. **For package-specific dependencies:**
   ```json
   {
     "tasks": {
       "my-package#build": {
         "dependsOn": ["@repo/ui#build", "^build"]
       }
     }
   }
   ```

## Dependency Issues

### Dependencies not resolving

**Problem:** Can't import from workspace packages.

**Solutions:**

1. **Use workspace protocol:**
   ```json
   {
     "dependencies": {
       "@repo/ui": "workspace:*"
     }
   }
   ```

2. **Run pnpm install from root:**
   ```bash
   pnpm install
   ```

3. **Verify package name matches:**
   ```json
   {
     "name": "@repo/ui"  // Must match exactly
   }
   ```

### Module not found errors

**Problem:** Import errors for workspace packages.

**Solutions:**

1. **Check package exports field:**
   ```json
   {
     "exports": {
       "./components/*": "./src/components/*.tsx"
     }
   }
   ```

2. **Verify import path matches exports:**
   ```typescript
   // If exports is "./components/*"
   import { Button } from '@repo/ui/components/Button';
   ```

3. **Check package.json name:**
   ```json
   {
     "name": "@repo/ui"  // Must match import
   }
   ```

## Package.json Issues

### Invalid package.json

**Problem:** Package.json has syntax errors.

**Solutions:**

1. **Validate JSON:**
   ```bash
   cat package.json | jq .
   ```

2. **Check for common errors:**
   - Trailing commas
   - Missing quotes
   - Invalid field names

3. **Use a JSON validator:**
   - Online JSON validators
   - VS Code JSON validation

### Package not found in workspace

**Problem:** Package doesn't appear in workspace.

**Solutions:**

1. **Verify pnpm-workspace.yaml:**
   ```yaml
   packages:
     - "packages/*"
   ```

2. **Check package location:**
   ```bash
   # Should be in packages/ directory
   ls packages/your-package
   ```

3. **Run pnpm install:**
   ```bash
   pnpm install
   ```

## Import/Export Issues

### Exports not working

**Problem:** Can't import from package exports.

**Solutions:**

1. **Verify exports field:**
   ```json
   {
     "exports": {
       "./components/*": "./src/components/*.tsx"
     }
   }
   ```

2. **Check file paths exist:**
   ```bash
   ls src/components/
   ```

3. **Verify import path:**
   ```typescript
   // Match exports exactly
   import { Button } from '@repo/ui/components/Button';
   ```

### Type exports not found

**Problem:** TypeScript can't find exported types.

**Solutions:**

1. **Export types explicitly:**
   ```typescript
   export type { MyComponentProps } from './MyComponent';
   ```

2. **Include types in exports:**
   ```json
   {
     "exports": {
       "./components/*": {
         "types": "./src/components/*.tsx",
         "default": "./src/components/*.tsx"
       }
     }
   }
   ```

## Verification Steps

When troubleshooting, verify:

1. **Package structure:**
   ```bash
   ls packages/your-package/
   # Should have: package.json, tsconfig.json, eslint.config.js, src/
   ```

2. **Dependencies installed:**
   ```bash
   pnpm install
   ```

3. **TypeScript compiles:**
   ```bash
   cd packages/your-package
   npx tsc --noEmit
   ```

4. **ESLint passes:**
   ```bash
   pnpm lint
   ```

5. **Package can be imported:**
   ```typescript
   // In another package
   import { something } from '@repo/your-package';
   ```

## Getting Help

If issues persist:

1. Check existing packages (`packages/i18n`, `packages/ui`) for reference
2. Review [Turborepo Documentation](https://turborepo.com/docs)
3. Check [PNPM Workspace Documentation](https://pnpm.io/workspaces)
4. Verify all configuration files match working packages
