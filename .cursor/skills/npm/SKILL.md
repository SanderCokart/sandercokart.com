---
name: monorepo-commands
description: Guidelines for running Node.js and NPM commands in this Turborepo monorepo using PNPM package manager
---

# Running Node.js and NPM Commands in the Monorepo

This guide outlines how to properly run Node.js and NPM commands in this Turborepo monorepo, which uses PNPM as the package manager.

## Overview

This is a **Turborepo monorepo** that uses **PNPM** as the package manager. Key points:

- **Root-level commands**: Most commands should be run from the repository root
- **PNPM filter flag**: When targeting specific apps/packages, use `--filter` or `-F`
- **Turborepo tasks**: Use `turbo` for running tasks across the monorepo
- **Workspace structure**: Apps are in `apps/*`, packages are in `packages/*`

## Package Manager

**Always use PNPM** - never use `npm` or `yarn` directly. The repository is configured with:
- `packageManager: "pnpm@10.11.0"` in root `package.json`
- PNPM workspace configuration in `pnpm-workspace.yaml`

## Running Commands from Root

### Turborepo Tasks

Run tasks across all workspaces using Turborepo:

```bash
# Build all apps and packages
pnpm build
# or
turbo build

# Run dev servers for all apps
pnpm dev
# or
turbo dev

# Lint all workspaces
pnpm lint
# or
turbo lint

# Clean all workspaces
pnpm clean
# or
turbo clean
```

### Root-Level Scripts

The root `package.json` contains scripts that delegate to Turborepo:

```bash
pnpm build    # Runs turbo build
pnpm dev      # Runs turbo dev
pnpm lint     # Runs turbo lint
pnpm format   # Runs prettier
pnpm clean    # Runs turbo clean
```

## Targeting Specific Workspaces

### Using PNPM Filter Flag

When you need to run commands for a specific app or package, use PNPM's `--filter` (or `-F`) flag:

```bash
# Install a package in a specific workspace
pnpm add <package-name> --filter <workspace-name>

# Run a script in a specific workspace
pnpm --filter <workspace-name> <script-name>

# Run a command in a specific workspace
pnpm --filter <workspace-name> exec <command>
```

### Workspace Names

Workspace names are defined in each workspace's `package.json`:

- **Apps**: Use the app name (e.g., `codehouse`, `api`, `main`)
- **Packages**: Use the package name with `@repo/` prefix (e.g., `@repo/ui`, `@repo/i18n`)

Examples:
```bash
# Target the codehouse app
pnpm --filter codehouse dev

# Target a package
pnpm --filter @repo/ui build
```

### Filter Patterns

PNPM supports various filter patterns:

```bash
# Filter by directory pattern
pnpm --filter "./apps/codehouse" dev

# Filter by package name pattern
pnpm --filter "@repo/*" build

# Filter by directory name
pnpm --filter "codehouse" dev
```

## Installing Packages

### Installing in a Specific Workspace

**Always use the `--filter` flag** when installing packages to a specific workspace:

```bash
# Install a production dependency
pnpm add <package-name> --filter <workspace-name>

# Install a dev dependency
pnpm add -D <package-name> --filter <workspace-name>

# Install a peer dependency
pnpm add -P <package-name> --filter <workspace-name>
```

### Examples

```bash
# Install a package in the codehouse app
pnpm add framer-motion --filter codehouse

# Install a dev dependency in a package
pnpm add -D typescript --filter @repo/ui

# Install multiple packages
pnpm add react react-dom --filter codehouse
```

### Installing Workspace Dependencies

To install a workspace package as a dependency:

```bash
# Install a workspace package
pnpm add @repo/ui --filter codehouse

# PNPM automatically uses workspace protocol (workspace:*)
```

### Installing at Root Level

Only install root-level dependencies when they're needed for:
- Build tools (e.g., `turbo`, `prettier`, `husky`)
- Development tooling shared across all workspaces

```bash
# Install at root (rarely needed)
pnpm add -D -w <package-name>
```

The `-w` flag installs at the workspace root.

## Running Scripts

### Running Scripts in Specific Workspaces

```bash
# Run a script in a specific workspace
pnpm --filter <workspace-name> <script-name>

# Examples
pnpm --filter codehouse dev
pnpm --filter codehouse build
pnpm --filter codehouse lint
pnpm --filter @repo/ui build
```

### Running Scripts with Arguments

```bash
# Pass arguments to the script
pnpm --filter codehouse dev --port 3000

# Run with environment variables
NODE_ENV=production pnpm --filter codehouse build
```

### Running Multiple Workspaces

```bash
# Run script in multiple workspaces
pnpm --filter "codehouse" --filter "@repo/ui" build

# Or use pattern matching
pnpm --filter "@repo/*" build
```

## Common Commands

### Development

```bash
# Start all dev servers
pnpm dev

# Start specific app
pnpm --filter codehouse dev

# Start with specific port
pnpm --filter codehouse dev --port 3000
```

### Building

```bash
# Build all workspaces
pnpm build

# Build specific workspace
pnpm --filter codehouse build

# Build in production mode
NODE_ENV=production pnpm --filter codehouse build
```

### Linting and Formatting

```bash
# Lint all workspaces
pnpm lint

# Lint specific workspace
pnpm --filter codehouse lint

# Format all files
pnpm format
```

### Installing Dependencies

```bash
# Install all dependencies (from root)
pnpm install

# Install dependencies for specific workspace
pnpm install --filter codehouse

# Add new package to specific workspace
pnpm add <package> --filter codehouse
```

### Running Node Commands

```bash
# Run node command in specific workspace
pnpm --filter codehouse exec node --version

# Run npx command in specific workspace
pnpm --filter codehouse exec npx <command>
```

## Best Practices

1. **Always run from root**: Unless you're specifically working within a workspace directory, run commands from the repository root.

2. **Use filter flag for workspace-specific operations**: When installing packages or running scripts for a specific workspace, always use `--filter`.

3. **Use Turborepo for multi-workspace tasks**: Use `pnpm build`, `pnpm dev`, etc. (which delegate to Turborepo) for running tasks across multiple workspaces.

4. **Install dependencies at root first**: After adding new packages, run `pnpm install` from root to ensure workspace linking works correctly.

5. **Use workspace protocol**: When referencing internal packages, PNPM automatically uses `workspace:*` protocol - don't manually change this.

6. **Check workspace names**: Verify the workspace name in `package.json` before using `--filter`.

## Common Patterns

### Pattern 1: Adding a New Package to an App

```bash
# 1. Add the package
pnpm add <package-name> --filter codehouse

# 2. Install dependencies (if needed)
pnpm install

# 3. Use the package in your code
```

### Pattern 2: Running a Script in Development

```bash
# Run dev server for specific app
pnpm --filter codehouse dev

# Or use turbo directly
turbo dev --filter=codehouse
```

### Pattern 3: Building for Production

```bash
# Build all workspaces
pnpm build

# Or build specific workspace
pnpm --filter codehouse build
```

### Pattern 4: Installing Workspace Package

```bash
# In codehouse app, install @repo/ui package
pnpm add @repo/ui --filter codehouse

# PNPM automatically resolves to workspace:*
```

## Troubleshooting

### Issue: Package not found after installation

**Solution**: Run `pnpm install` from root to ensure workspace linking:
```bash
pnpm install
```

### Issue: Filter not working

**Solution**: Check the workspace name in the target `package.json`:
```bash
# Check package.json name field
cat apps/codehouse/package.json | grep '"name"'
```

### Issue: Workspace dependency not resolving

**Solution**: Ensure the workspace package is properly configured and run `pnpm install`:
```bash
pnpm install
```

### Issue: Command not found in workspace

**Solution**: Ensure the script exists in the workspace's `package.json`:
```bash
# Check available scripts
cat apps/codehouse/package.json | grep '"scripts"'
```

## Workspace Structure Reference

```
sandercokart.com/
├── apps/
│   ├── codehouse/     # Next.js app
│   ├── api/           # Laravel API
│   └── main/          # Other app
├── packages/
│   ├── ui/            # @repo/ui
│   ├── i18n/          # @repo/i18n
│   └── ...            # Other packages
├── package.json       # Root package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## Quick Reference

| Task | Command |
|------|---------|
| Install all dependencies | `pnpm install` |
| Add package to workspace | `pnpm add <pkg> --filter <workspace>` |
| Run script in workspace | `pnpm --filter <workspace> <script>` |
| Build all | `pnpm build` |
| Build workspace | `pnpm --filter <workspace> build` |
| Dev all | `pnpm dev` |
| Dev workspace | `pnpm --filter <workspace> dev` |
| Lint all | `pnpm lint` |
| Lint workspace | `pnpm --filter <workspace> lint` |

## References

- [PNPM Workspace Documentation](https://pnpm.io/workspaces)
- [PNPM Filter Documentation](https://pnpm.io/filtering)
- [Turborepo Documentation](https://turborepo.com/docs)
- Root `package.json` for available scripts
- `pnpm-workspace.yaml` for workspace configuration
