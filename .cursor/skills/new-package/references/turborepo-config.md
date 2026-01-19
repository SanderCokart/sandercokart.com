# Turborepo Configuration

Complete guide for configuring packages in Turborepo, including task configuration, caching, and dependencies.

## Understanding Turborepo Tasks

Turborepo runs tasks defined in `package.json` scripts across the monorepo. Tasks are configured in the root `turbo.json` file.

## Root turbo.json Configuration

The root `turbo.json` defines task pipelines for all packages:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "ui": "tui",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "env": ["NODE_ENV"],
      "inputs": ["$TURBO_DEFAULT$", ".env*"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "clean": {
      "dependsOn": ["^clean"],
      "cache": false
    }
  }
}
```

## Task Dependencies

### Build Tasks

Build tasks should depend on dependencies' build tasks:

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

The `^` prefix means "dependencies' build tasks must complete first."

### Package-Specific Build Dependencies

You can specify package-specific dependencies:

```json
{
  "tasks": {
    "codehouse#build": {
      "dependsOn": ["@repo/runtime-env#build", "^build"]
    }
  }
}
```

This means `codehouse`'s build depends on `@repo/runtime-env`'s build completing first.

## Output Caching

### Defining Outputs

For tasks that produce files, specify output directories:

```json
{
  "tasks": {
    "build": {
      "outputs": [".next/**", "dist/**", "!.next/cache/**"]
    }
  }
}
```

**Important:** Turborepo caches outputs. If outputs aren't specified, caching won't work properly.

### Common Output Patterns

- `dist/**` - Built distribution files
- `.next/**` - Next.js build output
- `!.next/cache/**` - Exclude Next.js cache from outputs
- `build/**` - Build directory

## Task Configuration Options

### Cache Configuration

```json
{
  "tasks": {
    "build": {
      "cache": true  // Default: true
    },
    "dev": {
      "cache": false  // Don't cache dev tasks
    }
  }
}
```

### Persistent Tasks

For long-running tasks like dev servers:

```json
{
  "tasks": {
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

### Environment Variables

Specify which environment variables affect task execution:

```json
{
  "tasks": {
    "build": {
      "env": ["NODE_ENV", "API_URL"]
    }
  }
}
```

### Input Files

Specify which files affect task execution:

```json
{
  "tasks": {
    "build": {
      "inputs": ["$TURBO_DEFAULT$", ".env*", "src/**"]
    }
  }
}
```

## Package-Level turbo.json

For package-specific task configuration, create a `turbo.json` in the package directory:

```json
{
  "extends": ["//"],
  "tasks": {
    "build": {
      "dependsOn": ["compile"],
      "outputs": ["dist/**"]
    },
    "compile": {
      "outputs": ["lib/**"]
    }
  }
}
```

The `"extends": ["//"]` means "extend from root config."

## Common Task Configurations

### Build Task

```json
{
  "build": {
    "dependsOn": ["^build"],
    "outputs": ["dist/**"],
    "env": ["NODE_ENV"]
  }
}
```

### Lint Task

```json
{
  "lint": {
    "dependsOn": ["^lint"]
  }
}
```

### Dev Task

```json
{
  "dev": {
    "cache": false,
    "persistent": true
  }
}
```

### Test Task

```json
{
  "test": {
    "dependsOn": ["^build"],
    "outputs": ["coverage/**"]
  }
}
```

### Clean Task

```json
{
  "clean": {
    "dependsOn": ["^clean"],
    "cache": false
  }
}
```

## When to Update turbo.json

Update the root `turbo.json` when:

1. **Package has build outputs**: Add output directories to the `build` task's `outputs` array
2. **Package needs custom task**: Add package-specific task configuration
3. **Package has special dependencies**: Add package-specific `dependsOn` rules

**Example:** If your package builds to `dist/`, ensure `"dist/**"` is in the `build` task's `outputs` array.

## Workspace Configuration

Turborepo automatically discovers packages from your workspace configuration. Ensure your package is included in `pnpm-workspace.yaml`:

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

If your package is in `packages/`, it's automatically included.

## Best Practices

1. **Always specify outputs**: For build tasks, always specify output directories
2. **Use `^` prefix**: For dependency tasks, use `^build`, `^lint`, etc.
3. **Don't cache dev tasks**: Set `"cache": false` for dev servers
4. **Mark persistent tasks**: Use `"persistent": true` for long-running tasks
5. **Package-specific configs**: Use package-level `turbo.json` for package-specific needs

## Troubleshooting

### Build outputs not cached

**Problem:** Build outputs aren't being cached.

**Solution:** Ensure output directories are specified in the `outputs` array:

```json
{
  "tasks": {
    "build": {
      "outputs": ["dist/**"]
    }
  }
}
```

### Task runs when it shouldn't

**Problem:** Task runs even when nothing changed.

**Solution:** Check `inputs` configuration - ensure it includes all files that affect the task.

### Dependencies not building first

**Problem:** Package builds before its dependencies.

**Solution:** Add `"dependsOn": ["^build"]` to ensure dependencies build first.
