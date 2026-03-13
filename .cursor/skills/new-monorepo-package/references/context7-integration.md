# Context7 Integration

Guide for integrating Context7 MCP server for up-to-date documentation and version tracking in packages.

## What is Context7?

Context7 is an MCP (Model Context Protocol) server that provides up-to-date documentation and prevents outdated or hallucinated API information. It crawls your package documentation and makes it available to AI agents with version tracking.

## Why Use Context7?

- **Up-to-date docs**: Always get the latest documentation
- **Version tracking**: Access documentation for specific versions
- **Prevents hallucinations**: Reduces incorrect API information
- **Better AI assistance**: Agents have accurate context about your packages

## Setting Up Context7

### 1. Create context7.json

Create a `context7.json` file in your package root:

```json
{
  "$schema": "https://context7.com/schema/context7.json",
  "projectTitle": "Your Package Name",
  "description": "Brief description of what this package does",
  "excludeFolders": ["dist", "build", "node_modules", ".next"],
  "excludeFiles": ["*.test.ts", "*.spec.ts"],
  "previousVersions": [
    { "tag": "v0.1.0" },
    { "tag": "v0.2.0" }
  ]
}
```

### 2. Configuration Fields

#### projectTitle

The display name for your package in Context7.

```json
{
  "projectTitle": "UI Component Library"
}
```

#### description

Brief description of the package's purpose.

```json
{
  "description": "Shared React components and utilities for the application"
}
```

#### excludeFolders

Folders to exclude from documentation crawling. Typically includes:
- Build outputs: `dist`, `build`, `.next`
- Dependencies: `node_modules`
- Cache directories: `.turbo`, `.cache`

```json
{
  "excludeFolders": ["dist", "build", "node_modules", ".next", ".turbo"]
}
```

#### excludeFiles

File patterns to exclude from documentation.

```json
{
  "excludeFiles": ["*.test.ts", "*.spec.ts", "*.test.tsx", "*.spec.tsx"]
}
```

#### previousVersions

List of previous version tags for version-specific documentation.

```json
{
  "previousVersions": [
    { "tag": "v0.1.0" },
    { "tag": "v0.2.0" },
    { "tag": "v1.0.0" }
  ]
}
```

## Package-Specific Configuration

### For TypeScript Libraries

```json
{
  "$schema": "https://context7.com/schema/context7.json",
  "projectTitle": "i18n Utilities",
  "description": "Internationalization utilities and React components",
  "excludeFolders": ["dist", "node_modules", ".turbo"],
  "excludeFiles": ["*.test.ts", "*.spec.ts"],
  "previousVersions": []
}
```

### For React Component Libraries

```json
{
  "$schema": "https://context7.com/schema/context7.json",
  "projectTitle": "UI Component Library",
  "description": "Shared React components built with Radix UI and Tailwind",
  "excludeFolders": ["dist", "node_modules", ".next", ".turbo"],
  "excludeFiles": ["*.test.tsx", "*.spec.tsx", "*.stories.tsx"],
  "previousVersions": []
}
```

### For Build Tool Packages

```json
{
  "$schema": "https://context7.com/schema/context7.json",
  "projectTitle": "Email Templates",
  "description": "React Email templates and build tooling",
  "excludeFolders": ["dist", "build", "node_modules", ".turbo"],
  "excludeFiles": ["*.test.ts"],
  "previousVersions": []
}
```

## Adding Library to Context7

### 1. Submit Library

After creating `context7.json`, submit your library to Context7:

1. Go to Context7 UI
2. Add new library
3. Point to your package repository
4. Context7 will crawl and index your documentation

### 2. Version Management

When publishing new versions:

1. Update `previousVersions` in `context7.json`:
   ```json
   {
     "previousVersions": [
       { "tag": "v0.1.0" },
       { "tag": "v0.2.0" },
       { "tag": "v0.3.0" }  // New version
     ]
   }
   ```

2. Trigger refresh in Context7 UI or via API
3. Context7 will index the new version

## Using Context7 in Skills

### Referencing Context7

When creating skills that reference packages, mention Context7 integration:

```markdown
This package is integrated with Context7 for up-to-date documentation.
Use the Context7 MCP server to get the latest API information.
```

### Best Practices

1. **Keep context7.json updated**: Update `previousVersions` when releasing
2. **Exclude build artifacts**: Don't index `dist`, `build`, etc.
3. **Exclude tests**: Don't index test files
4. **Clear descriptions**: Help Context7 understand your package
5. **Version tags**: Use semantic versioning tags

## Integration Checklist

When setting up Context7 for a package:

- [ ] Create `context7.json` in package root
- [ ] Set `projectTitle` to package display name
- [ ] Add clear `description`
- [ ] Exclude build folders (`dist`, `build`, etc.)
- [ ] Exclude test files (`*.test.ts`, `*.spec.ts`)
- [ ] Add `previousVersions` if package has version history
- [ ] Submit library to Context7 UI
- [ ] Verify documentation is indexed
- [ ] Update `previousVersions` when releasing new versions

## Example: Complete context7.json

```json
{
  "$schema": "https://context7.com/schema/context7.json",
  "projectTitle": "UI Component Library",
  "description": "Shared React components built with Radix UI, Tailwind CSS, and React Hook Form. Includes form components, dialogs, dropdowns, and more.",
  "excludeFolders": [
    "dist",
    "build",
    "node_modules",
    ".next",
    ".turbo",
    ".cache"
  ],
  "excludeFiles": [
    "*.test.ts",
    "*.test.tsx",
    "*.spec.ts",
    "*.spec.tsx",
    "*.stories.tsx"
  ],
  "previousVersions": [
    { "tag": "v0.1.0" },
    { "tag": "v0.2.0" }
  ]
}
```

## Troubleshooting

### Documentation not updating

**Problem:** Context7 shows outdated documentation.

**Solution:**
1. Trigger a refresh in Context7 UI
2. Verify `context7.json` is in package root
3. Check that files aren't excluded incorrectly

### Too much noise in docs

**Problem:** Context7 indexes irrelevant files.

**Solution:**
1. Add more patterns to `excludeFiles`
2. Add build/cache folders to `excludeFolders`
3. Review what's being indexed

### Version not found

**Problem:** Can't access documentation for a specific version.

**Solution:**
1. Ensure version tag exists in repository
2. Add to `previousVersions` in `context7.json`
3. Trigger Context7 refresh

## References

- [Context7 Documentation](https://context7.com/docs)
- [Adding Libraries to Context7](https://context7.com/docs/adding-libraries)
- [Context7 TypeScript SDK](https://context7.com/docs/sdks/ts/getting-started)
- [MCP Protocol](https://modelcontextprotocol.io)
