---
name: new-monorepo-package
description: Creates and configures new internal packages in a Turborepo monorepo with TypeScript, ESLint, PNPM workspace, and Turbo task pipelines. Use when adding a package under packages/, creating internal libraries, sharing code between apps, or when the user mentions new package, monorepo package, or Turborepo package.
---

# New Monorepo Package (Turborepo)

Step-by-step guide for adding packages to the `packages/` directory of this Turborepo monorepo. For task pipelines, caching, and `turbo.json` behavior, rely on the **turborepo** skill.

## Principles

- **Package tasks, not root tasks**: Add scripts in each package's `package.json`; root only delegates via `turbo run <task>`.
- **Use `turbo run` in scripts**: In root `package.json` and CI, use `turbo run build` (not `turbo build`).
- **Workspace protocol**: Internal deps use `workspace:*`. PNPM resolves from `pnpm-workspace.yaml` (`packages/*`, `apps/*`).
- **Shared configs**: Use `@repo/typescript-config` and `@repo/eslint-config`; avoid duplicating config.

## Quick Start

### 1. Create directory

```bash
mkdir -p packages/your-package-name
cd packages/your-package-name
```

Use **kebab-case** for the directory name (e.g. `my-utils`, not `myUtils`).

### 2. package.json

Minimal shape:

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

- Name: `@repo/<kebab-name>`.
- Internal packages: `"version": "0.0.0"`, `"private": true`.
- Add a `build` script if the package emits artifacts (e.g. `"build": "tsc"`). Add `lint` if you want package-level lint (e.g. `"lint": "eslint ."`).

See [references/package-setup.md](references/package-setup.md) for exports, `imports`, and React vs non-React deps.

### 3. TypeScript

Create `tsconfig.json`:

**React packages:**

```json
{
  "extends": "@repo/typescript-config/react-library.json",
  "include": ["src"],
  "compilerOptions": {
    "outDir": "dist",
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

**Non-React packages:**

```json
{
  "extends": "@repo/typescript-config/base.json",
  "include": ["src"],
  "compilerOptions": {
    "outDir": "dist",
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

### 4. ESLint

Create `eslint.config.js`:

**React:** `import { config } from '@repo/eslint-config/react-internal';`  
**Non-React:** `import { config } from '@repo/eslint-config/base';`

```javascript
/** @type {import("eslint").Linter.Config} */
export default config;
```

### 5. Source layout

```bash
mkdir -p src
# Optional: src/components, src/utils, src/hooks
```

### 6. Turborepo

- Root `turbo.json` already defines `build`, `lint`, `dev`, `clean`. If your package has **build outputs**, ensure the root `build` task’s `outputs` include them (e.g. `dist/**`). Usually no change needed.
- For package-specific task config (e.g. different `outputs` or `dependsOn`), add a `turbo.json` in the package with `"extends": ["//"]` and override the task. Prefer this over cluttering root `turbo.json`.

See [references/turborepo-config.md](references/turborepo-config.md).

### 7. Install and verify

From repo root:

```bash
pnpm install
```

Then:

```bash
cd packages/your-package-name && npx tsc --noEmit
pnpm lint
turbo run build
```

Confirm the package can be imported from another app/package via `@repo/your-package-name` (and exports, if defined).

## Package types and examples

- **TypeScript library** (e.g. `packages/i18n`): utilities, types, optional React; `exports` and maybe `imports` in `package.json`.
- **React component library** (e.g. `packages/ui`): React components/hooks; `@repo/typescript-config/react-library.json`, `@repo/eslint-config/react-internal`.
- **Config packages** (e.g. `packages/typescript-config`, `packages/eslint-config`): no build step; consumed via `extends`.

Details and examples: [references/package-types.md](references/package-types.md).

## Reference docs

For an index and when to use each file, see [reference.md](reference.md).

| Doc | Purpose |
|-----|---------|
| [references/package-setup.md](references/package-setup.md) | Full `package.json`, exports, TypeScript, ESLint, verification |
| [references/turborepo-config.md](references/turborepo-config.md) | Tasks, outputs, caching, package-level `turbo.json` |
| [references/package-types.md](references/package-types.md) | Library vs React vs config packages with examples |
| [references/best-practices.md](references/best-practices.md) | Naming, versioning, dependencies, structure |
| [references/troubleshooting.md](references/troubleshooting.md) | Common failures and fixes |
| [references/context7-integration.md](references/context7-integration.md) | Optional Context7 MCP / docs indexing |

## Checklist

- [ ] Directory under `packages/` with kebab-case name
- [ ] `package.json`: `@repo/<name>`, `private: true`, `version: "0.0.0"`
- [ ] `@repo/eslint-config` and `@repo/typescript-config` in devDependencies
- [ ] `tsconfig.json` extends correct `@repo/typescript-config` base
- [ ] `eslint.config.js` uses correct `@repo/eslint-config` preset
- [ ] `src/` created; add `build`/`lint` scripts if needed
- [ ] Root `turbo.json` covers build outputs (or package-level `turbo.json` if needed)
- [ ] `pnpm install`; `tsc --noEmit` and `pnpm lint` pass; package importable

## Related skills and docs

- **turborepo** skill: task pipelines, `dependsOn`, `outputs`, caching, `--affected`, package boundaries.
- **npm** skill: PNPM commands and workspace usage in this repo.

## External references

- [Turborepo – Creating internal packages](https://turbo.build/repo/docs/crafting-your-repository/creating-an-internal-package)
- [Turborepo – Package configurations](https://turbo.build/repo/docs/reference/package-configurations)
- [Turborepo – Reference](https://turbo.build/repo/docs)
- [PNPM – Workspaces](https://pnpm.io/workspaces)
- In-repo examples: `packages/i18n`, `packages/ui`, `packages/mail`
