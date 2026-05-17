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

From a fresh machine (no Node, no pnpm, no mise), run:

```bash
git clone <repo-url>
cd sandercokart.com
bash ./scripts/setup.sh
pnpm --filter codehouse dev
```

If you already have pnpm available, you can run:

```bash
pnpm setup
```

The `setup` command is safe to rerun and handles already-installed tooling.

**Prerequisites:** Docker and Docker Compose (for the API and databases).

### Development Ports
   - Main Website: http://localhost:3000
   - Codehouse: http://localhost:3001
   - API: http://localhost:8080
   - Database: localhost:3306
   - Redis: localhost:6379
   - Mailpit: localhost:1025 (SMTP), localhost:8025 (UI)

## 🧰 Environment setup

This project uses:

- **[mise](https://mise.jdx.dev/)** to install Node and pnpm from `package.json` (via `mise.toml` settings)
- root `setup` script to automate the full bootstrap flow

### One-command setup (recommended)

From the repository root:

```bash
bash ./scripts/setup.sh
```

What it does:

1. Installs mise if missing (Linux/macOS/WSL)
2. Adds mise activation to `~/.bashrc` (idempotent)
3. Activates mise in the current shell
4. Trusts this repo's `mise.toml`
5. Installs Node and pnpm from `package.json` (`devEngines.runtime` and `packageManager`)
6. Refreshes mise shims (`mise reshim`) so `pnpm`/`pnpx` shims are available
7. Installs workspace dependencies with pinned pnpm

If pnpm is already available in your shell, the same flow is exposed as:

```bash
pnpm setup
```

### Manual setup (fallback)

Use this if you prefer explicit steps.

#### 1. Install mise

Pick the method that fits your OS. Official docs: [installing mise](https://mise.jdx.dev/installing-mise.html).

**Linux / macOS / WSL:**

```bash
curl https://mise.run | sh
```

**Homebrew (macOS / Linux):**

```bash
brew install mise
```

**Windows (PowerShell):**

```powershell
winget install jdx.mise
```

Verify the install (use the full path if `mise` is not on your PATH yet):

```bash
mise --version
# or: ~/.local/bin/mise --version
```

#### 2. Activate mise in bash (one-time)

Activation makes `node`, `pnpm`, and other tools from `package.json` available automatically when you `cd` into this project. Add this to `~/.bashrc`—see [`mise activate`](https://mise.jdx.dev/cli/activate.html#mise-activate) for details. **Restart your terminal** afterward.

```bash
echo 'eval "$(mise activate bash)"' >> ~/.bashrc
```

If `mise` is not on your `PATH` yet, use the full path: `eval "$(~/.local/bin/mise activate bash)"`.

Check that everything is wired correctly:

```bash
mise doctor
```

#### 3. Install project tools

From the repository root, the first time you use this project, mise may ask you to **trust** `mise.toml`. Trust this repo's config:

```bash
mise trust
```

Install the tool versions declared in `package.json`:

```bash
mise install
```

Confirm Node and pnpm match what the repo expects:

```bash
node -v    # should match devEngines.runtime in package.json (e.g. v22.19.0)
pnpm -v    # should match packageManager in package.json (e.g. 10.32.1)
```

Install JavaScript dependencies:

```bash
pnpm install
```

Start Codehouse:

```bash
pnpm --filter codehouse dev
```

### Day-to-day workflow

After the one-time setup above, from the repository root you usually only need:

```bash
pnpm install   # when dependencies or lockfile change
pnpm --filter codehouse dev
```

If you pull changes that bump Node or pnpm in `package.json`, run `mise install` again.

### Troubleshooting

| Problem | What to try |
|---------|-------------|
| `mise: command not found` | Install mise (step 1) or use `~/.local/bin/mise` |
| `node: command not found` after `mise install` | Add `mise activate bash` to `~/.bashrc` (step 2) and open a **new** terminal |
| Prompt: `mise.toml is not trusted` | Run `mise trust` in the repo root |
| Wrong Node version | Run `mise install` in the repo root; check `node -v` against `package.json` `devEngines.runtime` |
| Wrong pnpm version | Run `bash ./scripts/setup.sh`, or `mise install && mise reshim`; check `pnpm -v` against `package.json` `packageManager` |
| `mise doctor`: shims are missing | Run `mise reshim` (the setup script already does this) |
| `pnpm: command not found` after `mise install` | Run `mise reshim`, then open a new terminal in the repo |
| Still on nvm / fnm / old Node managers | Disable or uninstall them for this repo; mise should manage Node and pnpm here |
| General mise issues | Run `mise doctor` and see [mise troubleshooting](https://mise.jdx.dev/troubleshooting.html) |

### Coming from Volta?

This repo no longer uses Volta. Uninstall it locally ([Volta uninstall guide](https://docs.volta.sh/advanced/uninstall)), then run `bash ./scripts/setup.sh`. You do not need a global Node install from nodejs.org if mise is activated.

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

### Runtime versions

Node and pnpm are pinned for the whole monorepo. See [Environment setup](#environment-setup) for install steps and troubleshooting.

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

Node and pnpm are pinned in root `package.json` (`devEngines.runtime` and `packageManager`). Mise reads those fields; Turbo and other tooling use `packageManager` directly.

## 🤝 Contributing

1. Complete [Environment setup](#environment-setup) if you have not already
2. Run `mise install`, then `pnpm install`
3. Create a new branch for your feature
4. Make your changes
5. Run tests and linting
6. Submit a pull request

## 📝 License

Private repository - All rights reserved
