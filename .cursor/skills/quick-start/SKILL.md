---
name: quick-start
description: Quickly prepare this repository for local development. Use when setting up the project on a new machine, refreshing local environments, starting Docker services, or when the user asks to get the development stack running.
---

# Quick Start

Run the bundled parallel setup helper from the repository root:

```bash
bash .cursor/skills/quick-start/scripts/parallel-setup.sh
```

Before running it, provide the encrypted environment keys in the shell:

```bash
export DOTENV_PRIVATE_KEY_DOCKER='...'
export DOTENV_PRIVATE_KEY_LOCAL='...'
```

The script:

1. Trusts and installs the versions declared by `mise.toml` and `package.json`.
2. Starts Docker Desktop while JavaScript dependencies install in parallel.
3. Decrypts the API Docker environment and both frontend local environments in parallel.
4. Installs API Composer dependencies locally when a compatible Composer/PHP is available; otherwise it uses the PHP 8.5 API container to populate the host-mounted `apps/api/vendor` directory.
5. Starts the top-level development Compose stack with the local override.
6. Verifies the API health endpoint and container status.

Do not run `pnpm dev` from this skill. The user can start an app afterward, for example:

```bash
pnpm --filter codehouse dev
```

Never write private keys into the repository, skill files, logs, or command output.
