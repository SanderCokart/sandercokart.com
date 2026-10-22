---
name: turbo-cache
description: Turbo remote cache shared between local builds and Dokploy's Docker builds (Vercel Remote Cache). Use when a Dokploy build is slow or reports cache misses, when changing turbo.json env/inputs, the Dockerfiles, or build secrets, or when the pre-push prebuild fails or skips.
---

# Turbo remote cache (local ↔ Dokploy)

Pushing builds the Dokploy apps locally first, so Dokploy's Docker build replays them from Vercel Remote Cache instead of rebuilding.

| Push to | Hook runs | Env file |
| --- | --- | --- |
| `development` | `pnpm prebuild:staging` | `apps/{codehouse,main}/.envx.staging` |
| `main` | `pnpm prebuild:production` | `apps/{codehouse,main}/.envx.production` |

[`scripts/turbo-prebuild.mjs`](../../../scripts/turbo-prebuild.mjs) (`.husky/pre-push`) builds each app with `turbo run build --filter=<app>` in a **clean env**. It skips, without blocking the push, when the pushed commit isn't `HEAD`, the tree is dirty, or the `.envx` can't be decrypted. A failed build blocks the push. Bypass: `SKIP_TURBO_PREBUILD=1 git push`.

## Why the hash matches the server

Turbo hashes source inputs plus the values of `build.env` in `turbo.json`. Dokploy's build env is only:

- build secrets `SENTRY_AUTH_TOKEN`, `TURBO_TOKEN`, `TURBO_TEAM` (mapped by `apps/*/scripts/docker-build.sh`)
- `NEXT_OUTPUT=standalone` from the Dockerfile

No build args, no `.env` file, none of the runtime env. So:

- The prebuild passes exactly those (plus `PATH`/`HOME`). A variable from your shell that matches `build.env` changes the hash and causes a miss.
- `SENTRY_AUTH_TOKEN` must be identical locally and on Dokploy. Refresh with `pnpm env:<env>:pull` after changing it.
- `TURBO_TOKEN` / `TURBO_TEAM` are **not** in `build.env`; Turbo reads them itself. Never add credentials to the hash.
- `.env*` files are excluded from `inputs`.
- Turbo version: Dockerfiles run `turbo prune` with the root `package.json` version; the build uses the installed one. Never `pnpm dlx turbo` unpinned.

Adding a variable that changes build output: add it to `build.env` **and** make it exist identically in both places (Dockerfile `ENV` or a Dokploy build secret, plus the prebuild's env), or every build misses.

## Verify

```bash
node .cursor/skills/dokploy/scripts/dokploy.mjs logs codehouse staging --tail 3000 | grep -E "Remote caching|cache (hit|miss)|Cached:"
```

Expect `Remote caching enabled` and `cache hit, replaying`. `Remote caching disabled (TURBO_TOKEN set without TURBO_TEAM)` means the app's build secrets don't resolve; use `${{project.TURBO_TEAM}}` / `${{project.TURBO_TOKEN}}` like staging `main`.

Compare hashes without building: `pnpm exec turbo build --filter=codehouse --dry=json` and read `tasks[].hash` for `codehouse#build`.

## Limits (Vercel Remote Cache, free, fair use)

Hobby: 100 GB uploads/month, **100 artifact requests/minute**. Pro: 1 TB, 10,000/min. Artifacts expire after 7 days. One app build is ~7–10 requests and ~6–17 MB, so build per push, never per commit, and don't loop builds in scripts.
