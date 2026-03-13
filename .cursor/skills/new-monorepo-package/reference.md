# New Monorepo Package — Reference Index

This file indexes the detailed references for the **new-monorepo-package** skill. Load specific docs when you need deeper detail.

## Reference files

| File | When to use |
|------|-------------|
| [references/package-setup.md](references/package-setup.md) | Full `package.json` (exports, imports, React vs base), TypeScript and ESLint setup, verification steps |
| [references/turborepo-config.md](references/turborepo-config.md) | Root and package-level `turbo.json`, task dependencies, outputs, caching, env, inputs |
| [references/package-types.md](references/package-types.md) | TypeScript library, React component library, build-tool and config packages with examples |
| [references/best-practices.md](references/best-practices.md) | Naming, versioning, workspace deps, exports, scripts, source layout, testing |
| [references/troubleshooting.md](references/troubleshooting.md) | TypeScript, ESLint, Turborepo, dependencies, imports/exports — common issues and fixes |
| [references/context7-integration.md](references/context7-integration.md) | Optional Context7 MCP integration and `context7.json` for package docs |

## Turborepo deep dives

For task pipelines, caching, `--affected`, filtering, and package boundaries, use the **turborepo** skill and its reference index (e.g. `references/configuration/tasks.md`, `references/best-practices/packages.md`).

## Repo layout

- **packages/** — internal libraries; names like `@repo/<name>`.
- **apps/** — applications consuming packages.
- **pnpm-workspace.yaml** — `packages: ['apps/*', 'packages/*']`.
- **turbo.json** — root task definitions; packages inherit and can override via package-level `turbo.json`.

## Example packages

- `packages/i18n` — TypeScript/React library with exports and path imports.
- `packages/ui` — React component library (Tailwind, Radix, etc.).
- `packages/mail` — Build-tool package (e.g. email templates).
- `packages/typescript-config`, `packages/eslint-config` — Shared config packages.
