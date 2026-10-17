<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": false` in the root `turbo.json` or `turbo.jsonc` to opt out; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->

# Repo map

pnpm workspaces + Turborepo. Filter by the `name` in each workspace `package.json`.

## Apps

| pnpm name | Path | Role |
| --- | --- | --- |
| `main` | `apps/main` | Next.js — articles / YouTube companion |
| `codehouse` | `apps/codehouse` | Next.js — business site |
| `api` | `apps/api` | Laravel API |
| `mail-renderer` | `apps/mail-renderer` | React Email HTTP sidecar |

```bash
pnpm --filter main dev
pnpm --filter codehouse lint
pnpm --filter @repo/ui lint
```

## Packages

- `@repo/ui` — consume **source** (`packages/ui/src`). Next apps transpile it.
- `@repo/toolbox`, `@repo/mail`, `@repo/runtime-env` — consume **`dist/`**. Turbo `^build` must run first.
- `@repo/eslint-config`, `@repo/typescript-config`, `@repo/playwright-visual` — shared tooling.

i18n lives in `apps/codehouse/messages` + `next-intl`, not a shared package. See [`.cursor/skills/translations/SKILL.md`](.cursor/skills/translations/SKILL.md).

Mail templates: `@repo/mail`. HTML is rendered by `apps/mail-renderer`.

## Imports and images

- Next apps: `@/*` → `./src/*`. Rewrite `@/src/foo` as `@/foo`.
- Do **not** import from `public/`. URL files use `/...` strings (`/banners/foo.webp`, `/ads.txt`, `/icon.png`).
- UI images the bundler should hash (`next/image` static import) live in an `images/` folder next to the page or section that uses them. If several routes share a file (brand logos), keep **one copy** at the nearest shared parent — do not duplicate per page.

## Skills

Do not merge the two trees; `.agents/skills` is upstream CLI content and would be overwritten on update.

- `.cursor/skills/*` — docs, translations, pest-testing, env-nextjs, git-commit, npm, quick-start, secrets, dokploy, …
- `.agents/skills/*` — turborepo, shadcn, date-fns

Glossary, themes, PPR, and Tailwind: [`.cursor/skills/docs/SKILL.md`](.cursor/skills/docs/SKILL.md).

