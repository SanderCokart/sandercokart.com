---
name: npm
description: Guidelines for running Node.js and package-manager commands in PNPM workspaces and Turborepo monorepos. Use when running npm/pnpm/yarn commands, adding packages, running scripts, installing dependencies, or working in apps/ or packages/.
---

# PNPM & Monorepo Commands

Use **PNPM** only—never `npm` or `yarn`. Run commands from the **repo root** unless you have a reason to be in a workspace.

## Core rules

1. **Install everything**: `pnpm install` (from root).
2. **Add a package to a workspace**: `pnpm add <pkg> --filter <workspace>` (use `-D` for dev).
3. **Run a script in a workspace**: `pnpm --filter <workspace> <script>` (e.g. `pnpm --filter codehouse dev`).
4. **Root/turbo scripts**: `pnpm build`, `pnpm dev`, `pnpm lint` etc. run via Turborepo for all or configured workspaces.

Workspace name = the `"name"` in that workspace’s `package.json` (e.g. app name or `@repo/package-name`).

## Quick reference

| Task | Command |
|------|--------|
| Install deps | `pnpm install` |
| Add to workspace | `pnpm add <pkg> --filter <workspace>` |
| Run script | `pnpm --filter <workspace> <script>` |
| Run in workspace | `pnpm --filter <workspace> exec <cmd>` |
| Root script (all) | `pnpm build` / `pnpm dev` / `pnpm lint` |

## Optional details

- **Filter by path**: `pnpm --filter "./apps/foo" dev`.
- **Multiple workspaces**: `pnpm --filter "@repo/*" build`.
- **Add workspace dependency**: `pnpm add @repo/ui --filter my-app` (PNPM uses `workspace:*`).
- **Root-only install** (rare): `pnpm add -D -w <pkg>`.

Resolve "package not found" or filter issues by running `pnpm install` from root and checking the workspace `package.json` `"name"` field.
