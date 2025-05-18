# Sander Cokart - Monorepo

This monorepo contains all the code for sandercokart.com, including the main website, business site (codehouse), and API services. Built with modern web technologies and best practices.

## 🏗️ Project Structure

The project is organized as a Turborepo monorepo with the following structure:

```
sandercokart.com/
├── apps/
│   ├── main/           # Main website (Next.js) - YouTube focused
│   ├── codehouse/      # Business website (Next.js)
│   └── api/           # Backend API (Laravel)
├── packages/
│   ├── ui/            # Shared UI components (shadcn/ui)
│   ├── eslint-config/ # Shared ESLint configuration
│   ├── typescript-config/ # Shared TypeScript configuration
│   ├── i18n/          # Internationalization package
│   └── mail/          # Used to create email templates to be used for creating html for laravel mailables
└── scripts/           # Utility scripts for automation
```

## 🚀 Quick Start

1. **Prerequisites**
   - Node.js >= 20
   - pnpm >= 10.6.3
   - Docker and Docker Compose

2. **Installation**
   ```bash
   # Install dependencies
   pnpm install

   # Start development environment
   pnpm dev
   ```

3. **Development Ports**
   - Main Website: http://localhost:3000
   - Codehouse: http://localhost:3001
   - API: http://localhost:8080
   - Database: localhost:3306
   - Redis: localhost:6379
   - Mailp

## 🐳 Docker & Environment

### Backend Docker Setup

The Laravel API uses [serversideup/php](https://serversideup.net/open-source/docker-php/) images for optimized PHP-FPM and Nginx configuration:

```dockerfile
# Base image with PHP 8.3, FPM, and Nginx on Alpine
FROM serversideup/php:8.3-fpm-nginx-alpine AS base
```

Key features of our Docker setup:
- Uses Alpine-based images for smaller footprint
- Includes PHP-FPM and Nginx in a single container
- Optimized for Laravel applications
- Separate development and production stages
- Proper user permissions handling for development
- Production-ready security configurations

### Development vs Production

- **Development**: Uses `compose.override.yml` to expose ports directly so we can access the apps via localhost instead of using docker container hostnames.
  ```yaml
  services:
    api:
      ports:
        - 8080:8080
    codehouse:
      ports:
        - 3001:3000
    db:
      ports:
        - 3306:3306
    redis:
      ports:
        - 6379:6379
  ```

- **Production**: Uses Docker Compose for orchestration with proper scaling and proxy configuration

### Environment Files

Each app has its own `.env` file with specific configurations:

- `apps/main/.env` - Main website environment variables
- `apps/codehouse/.env` - Business website environment variables
- `apps/api/.env` - API environment variables

Each app also has a `.env.example` file with the required environment variables.

Important environment variables:
- `ENV` - Environment (development/production)
- `DATABASE_URL` - Database connection string
- `REDIS_URL` - Redis connection string
- `NEXT_PUBLIC_API_URL` - API endpoint for frontend apps

## 🌐 Internationalization (i18n)

The project uses a shared i18n package (`@repo/i18n`) for consistent translations across apps:

- Supports multiple locales (currently 'en' and 'nl')
- Uses `next-intl` for Next.js apps
- Includes Zod validation messages in multiple languages
- Provides shared components and utilities for i18n

## 🛠️ Development Tools

### Package Management
- Uses `pnpm` for efficient package management
- Workspace dependencies are managed through Turborepo
- Package versions are locked in `pnpm-lock.yaml`

### Code Quality
- **ESLint**: Shared configuration in `packages/eslint-config`
- **Prettier**: Code formatting with custom plugins:
  - `@ianvs/prettier-plugin-sort-imports`
  - `prettier-plugin-tailwindcss`
- **Husky**: Git hooks for pre-commit checks
- **lint-staged**: Runs linters on staged files

### Automation Scripts
Located in `scripts/`:
- `publish-article.js` - Publish articles

Each app can also have its own `scripts/` directory for app-specific automation tasks:
- `apps/main/scripts/` - Scripts for the main website
- `apps/codehouse/scripts/` - Scripts for the business website
- `apps/api/scripts/` - Scripts for the API

These app-specific scripts can be used for:
- Post-commit hooks and automation
- Data migration and seeding
- Content generation and management
- Custom deployment tasks
- Database maintenance
- Cache management

To run an app-specific script, use:
```bash
# From the root directory
pnpm --filter @repo/main run script:your-script-name
# Or from within the app directory
pnpm run script:your-script-name
```

### Configuring New Scripts

When creating new scripts that should run automatically on commit:

1. **Register in package.json**
   For scripts that you want to run manually, add them to the app's `package.json`:
   ```json
   {
     "scripts": {
       "script:manual-task": "node scripts/manual-task.js"
     }
   }
   ```

   For automated scripts that run via lint-staged, you can reference them directly by relative path:
   ```json
   {
     "lint-staged": {
       "apps/your-app/**/*.{js,jsx,ts,tsx}": [
         "eslint --fix",
         "prettier --write",
         "node ./scripts/automated-task.js"  // Direct path reference
       ]
     }
   }
   ```

2. **Add to lint-staged configuration**
   In the root `package.json`, add your automated script to the `lint-staged` configuration to specify which files should trigger it:
   ```json
   {
     "lint-staged": {
       "apps/your-app/**/*.{js,jsx,ts,tsx}": [
         "eslint --fix",
         "prettier --write",
         "node ./scripts/automated-task.js"  // For automated scripts
       ],
       "apps/your-app/**/*.mdx": [
         "node ./scripts/article-update.js"   // Example of existing automated script
       ]
     }
   }
   ```

The existing pre-commit hook in `.husky/pre-commit` will automatically run lint-staged, which will execute your automated scripts on the specified files.

## 📦 Build & Deployment

```bash
# Build all packages and apps
pnpm build

# Run linting
pnpm lint

# Format code
pnpm format

# Clean build artifacts
pnpm clean
```

## 🔧 Turborepo Configuration

The project uses Turborepo for efficient monorepo management:

### Task Configuration
Tasks are defined in `turbo.json` and can be run using `turbo run`. Each task can have:
- Dependencies on other tasks using `dependsOn`
- Output caching configuration
- Parallel execution settings
- Persistent mode for long-running tasks (like dev servers)

Example task configuration:
```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "dev": {
      "persistent": true,
      "cache": false
    },
    "lint": {
      "dependsOn": ["^build"],
      "outputs": []
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    }
  }
}
```

### Running Tasks
Tasks can be run in several ways:

1. **Using root package.json scripts**:
   ```json
   {
     "scripts": {
       "dev": "turbo run dev",
       "build": "turbo run build",
       "lint": "turbo run lint",
       "test": "turbo run test"
     }
   }
   ```

2. **Direct turbo commands**:
   ```bash
   # Run multiple tasks
   turbo run build lint test
   
   # Run tasks in specific workspaces
   turbo run build --filter=@repo/ui
   
   # Run tasks for changed packages
   turbo run build --filter=...[origin/main]
   ```

### Caching
- Build outputs are cached by default
- Cache is stored in `.turbo` directory (gitignored)
- Cache is keyed by task name, dependencies, and file contents
- Use `turbo run build --force` to bypass cache

### Development Workflow
- When you run `pnpm dev` in the root directory:
  1. It executes `turbo run dev` (defined in root package.json)
  2. Turborepo then runs `pnpm run dev` in each workspace (unless filtered)
  3. Each app's dev script starts its development server
  4. All servers run in parallel by default

Example command chain:
```bash
# In root directory
pnpm dev
# ↓ executes
turbo run dev
# ↓ runs in each workspace
pnpm run dev
# ↓ starts development servers
next dev    # for Next.js apps
php artisan serve  # for Laravel API
```

You can target specific apps using filters:
```bash
# Run dev only for the main website
pnpm dev --filter=@repo/main

# Run dev for multiple specific apps
pnpm dev --filter=@repo/main --filter=@repo/api
```

- Long-running tasks (like dev servers) use `persistent: true`
- Development tasks typically have `cache: false`

### Package Manager
The project uses pnpm as the package manager, specified in root `package.json`:
```json
{
  "packageManager": "pnpm@10.6.3"
}
```

## 🤝 Contributing

1. Install dependencies with `pnpm install`
2. Create a new branch for your feature
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📝 License

Private repository - All rights reserved 