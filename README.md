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
   - [Bun](https://bun.sh/) >= 1.2 (see root `package.json` `packageManager` for the pinned version)
   - Docker and Docker Compose

2. **Installation**

   ```bash
   # Install dependencies
   bun install

   # Start development environment
   bun run dev
   ```

3. **Development Ports**
   - Main Website: http://localhost:3000
   - Codehouse: http://localhost:3001
   - API: http://localhost:8080
   - Database: localhost:3306
   - Redis: localhost:6379
   - Mailpit: localhost:1025 (SMTP), localhost:8025 (UI)

## 📱 Exposing dev servers to LAN (WSL2)

The most reliable way to access WSL2 dev servers from your phone or LAN is to use **Mirrored Networking** (requires Windows 11 22H2 or higher). This avoids issues with WSL's IP changing on restart.

**1. Enable Mirrored Networking:**
In Windows, create or edit the file `%USERPROFILE%\.wslconfig` (e.g., `C:\Users\YourName\.wslconfig`) and add:
```ini
[wsl2]
networkingMode=mirrored
```

**2. Restart WSL:**
Open a standard PowerShell or Command Prompt and run:
```powershell
wsl --shutdown
```
*(Then open your WSL terminal again to restart it).*

**3. Allow Inbound Traffic (Run in PowerShell as Administrator):**
Run these commands to configure the Hyper-V and Windows firewalls to allow external traffic on your dev ports:

```powershell
# Allow inbound traffic to the WSL VM
Set-NetFirewallHyperVVMSetting -Name '{40E0AC32-46A5-438A-A0B2-2B479E8F2E90}' -DefaultInboundAction Allow

# Allow traffic through Windows Firewall for your dev ports
$ports = @(3000, 3001, 8080)
foreach ($port in $ports) {
  netsh advfirewall firewall add rule name="WSL Dev $port" dir=in action=allow protocol=TCP localport=$port
}
```

**4. Access from your phone:**
Find your Windows LAN IP by running `ipconfig` in PowerShell (look for the IPv4 Address under your Wi-Fi or Ethernet adapter, e.g., `192.168.2.5`).
Open `http://<YOUR_WINDOWS_IP>:3000` (main), `:3001` (codehouse), or `:8080` (API).

*(Note: If you previously used `netsh interface portproxy`, you can clear those old rules with `netsh interface portproxy reset`)*

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

- Uses [Bun](https://bun.sh/) for installs and workspace linking
- Workspace dependencies are managed through Turborepo (`workspaces` in root `package.json`)
- Package versions are locked in `bun.lock`

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
bun run --filter main script:your-script-name
# Or from within the app directory
bun run script:your-script-name
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
         "node ./scripts/automated-task.js" // Direct path reference
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
         "node ./scripts/automated-task.js" // For automated scripts
       ],
       "apps/your-app/**/*.mdx": [
         "node ./scripts/article-update.js" // Example of existing automated script
       ]
     }
   }
   ```

The existing pre-commit hook in `.husky/pre-commit` will automatically run lint-staged, which will execute your automated scripts on the specified files.

## 📦 Build & Deployment

```bash
# Build all packages and apps
bun run build

# Run linting
bun run lint

# Format code
bun run format

# Clean build artifacts
bun run clean
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

- When you run `bun run dev` in the root directory:
  1. It executes `turbo dev` (defined in root package.json)
  2. Turborepo then runs each workspace's `dev` script (unless filtered)
  3. Each app's dev script starts its development server
  4. All servers run in parallel by default

Example command chain:

```bash
# In root directory
bun run dev
# ↓ executes
turbo dev
# ↓ runs in each workspace
bun run dev
# ↓ starts development servers
bunx --bun next dev    # for Next.js apps (main, codehouse)
php artisan serve  # for Laravel API
```

You can target specific apps using filters:

```bash
# Run dev only for the main website
bun run --filter main dev

# Run dev for multiple specific apps
bun run --filter main --filter api dev
```

- Long-running tasks (like dev servers) use `persistent: true`
- Development tasks typically have `cache: false`

### Package Manager

The project uses Bun as the package manager, specified in root `package.json`:

```json
{
  "packageManager": "bun@1.3.11"
}
```

## 🤝 Contributing

1. Install dependencies with `bun install`
2. Create a new branch for your feature
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📝 License

Private repository - All rights reserved
