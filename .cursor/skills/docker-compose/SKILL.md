---
name: docker-compose
description: Guidelines for running Docker Compose commands in this monorepo project with development and production profiles
---

# Docker Compose in the Monorepo

This guide outlines how to properly run Docker Compose v2 commands in this monorepo project, which uses Docker Compose profiles for development and production environments.

## Overview

This project uses **Docker Compose v2** with a **monorepo structure** and **profiles** for different environments:

- **Root-level commands**: All Docker Compose commands must be run from the repository root
- **Profiles**: `development` and `production` profiles control which services run
- **Override file**: Development uses `compose.override.yml.example` (copy to `compose.override.yml`)
- **Traefik proxy**: Production uses Traefik for reverse proxy and SSL termination
- **Direct ports**: Development exposes services directly on host ports

## File Structure

```
sandercokart.com/
├── docker-compose.yml           # Main compose file (includes app services)
├── compose.override.yml.example # Development override (copy to compose.override.yml)
└── apps/
    ├── proxy/docker-compose.yml  # Traefik proxy (production)
    ├── codehouse/docker-compose.yml  # Next.js app
    └── api/docker-compose.yml     # Laravel API + database services
```

## Service Architecture

### Production Environment (Traefik Proxy)
- **Traefik**: Reverse proxy with SSL termination and load balancing
- **Domains**: Services accessible via subdomains (api.sandercokart.com, codehouse.sandercokart.com)
- **SSL**: Automatic SSL certificates via Let's Encrypt and Cloudflare DNS
- **No direct port exposure**: All traffic goes through Traefik on ports 80/443

### Development Environment (Direct Ports)
- **No Traefik**: Services expose ports directly to host
- **Local access**: Access services via localhost with specific ports
- **Hot reload**: Development builds with live reloading enabled

## Development Services & Ports

When using the development profile with `compose.override.yml`, services run on these ports:

| Service | Port | Description | Access URL |
|---------|------|-------------|------------|
| **api** | 8080 | Laravel API | http://localhost:8080 |
| **codehouse** | 3001 | Next.js frontend | http://localhost:3001 |
| **db** | 3306 | MariaDB database | localhost:3306 |
| **redis** | 6379 | Redis cache/queue | localhost:6379 |
| **mailpit** | 8025 | Email testing | http://localhost:8025 |

## Setting Up Development Environment

### 1. Copy Override File
```bash
# Copy the development override file
cp compose.override.yml.example compose.override.yml
```

### 2. Set Environment Variables
Ensure all required environment files exist:
```bash
# Check required .env files
ls -la apps/api/.env
ls -la apps/codehouse/.env
```

## Running Commands

### Development Environment

```bash
# Start all development services
docker compose --profile development up

# Start specific service
docker compose --profile development up api

# Start in background
docker compose --profile development up -d

# Stop all services
docker compose down

# View logs
docker compose logs

# View logs for specific service
docker compose logs api

# Rebuild and restart
docker compose --profile development up --build

# Rebuild specific service
docker compose --profile development up --build api
```

### Production Environment

```bash
# Start production services (includes Traefik)
docker compose --profile production up -d

# Start with proxy dashboard
docker compose --profile production up -d proxy

# View Traefik dashboard (if enabled)
# Access at: https://traefik.sandercokart.com
```

### Database Operations

```bash
# Access database directly
docker compose exec db mysql -u root -p

# Run Laravel migrations/artisan
docker compose exec api php artisan migrate

# Run Laravel tests
docker compose exec api php artisan test

# Access Redis CLI
docker compose exec redis redis-cli -a "$(cat apps/api/secrets/REDIS_PASSWORD.secret)"
```

## Docker Compose Profiles

### Development Profile
Services included: `api`, `codehouse`, `db`, `redis`, `mailpit`
- Direct port exposure
- Development builds with hot reload
- Mailpit for email testing
- No Traefik proxy

### Production Profile
Services included: `api`, `codehouse`, `db`, `redis`, `proxy`
- Traefik reverse proxy
- SSL termination
- Domain-based routing
- No direct port exposure (except Traefik's 80/443)

## Common Development Workflows

### Starting Development
```bash
# 1. Ensure override file exists
cp compose.override.yml.example compose.override.yml

# 2. Start all services
docker compose --profile development up -d

# 3. Check services are running
docker compose ps

# 4. View logs if needed
docker compose logs -f
```

### Working with the API
```bash
# Access API container shell
docker compose exec api bash

# Run Laravel commands
docker compose exec api php artisan migrate:fresh --seed
docker compose exec api php artisan test

# View API logs
docker compose logs -f api
```

### Working with the Frontend
```bash
# Access frontend container (if needed)
docker compose exec codehouse sh

# View frontend logs
docker compose logs -f codehouse

# Rebuild frontend after dependency changes
docker compose --profile development up --build codehouse
```

### Database Development
```bash
# Access database
docker compose exec db mysql -u root -p -D your_database_name

# Reset database
docker compose exec api php artisan migrate:fresh --seed

# Create backup
docker compose exec db mysqldump -u root -p your_database_name > backup.sql
```

## Production Deployment

### Prerequisites
- Domain configured with DNS pointing to server
- Cloudflare account with API token
- SSL certificates will be automatically provisioned

### Deploying to Production
```bash
# 1. Ensure production secrets are set
# (Real values, not placeholders)

# 2. Start production services
docker compose --profile production up -d

# 3. Check Traefik dashboard
# Access: https://traefik.sandercokart.com

# 4. Verify services
curl -k https://api.sandercokart.com/health
curl -k https://codehouse.sandercokart.com
```

## Troubleshooting

### Service Won't Start
```bash
# Check logs
docker compose logs <service-name>

# Check service status
docker compose ps

# Restart specific service
docker compose restart <service-name>
```

### Port Conflicts
```bash
# Check what's using ports
lsof -i :8080
lsof -i :3001
lsof -i :3306

# Or on Linux
netstat -tulpn | grep :8080
```

### Database Connection Issues
```bash
# Test database connection
docker compose exec api php artisan tinker
# Then in tinker: DB::connection()->getPdo();

# Check database logs
docker compose logs db

# Reset database
docker compose exec api php artisan migrate:fresh
```

### Traefik Issues
```bash
# Check Traefik logs
docker compose logs proxy

# Access Traefik dashboard (if configured)
# https://traefik.sandercokart.com

# Test routing
curl -H "Host: api.sandercokart.com" http://localhost
```

## Environment Variables

### API Environment Variables
Required in `apps/api/.env`:
- `DB_DATABASE`: Database name
- `DB_HOST`: Database host (usually `db`)
- `USER_ID` and `GROUP_ID`: For file permissions

### Codehouse Environment Variables
Required in `apps/codehouse/.env`:
- `NEXT_PUBLIC_API_URL`: API URL (dev: `http://localhost:8080`, prod: `https://api.sandercokart.com`)
- `NEXT_PUBLIC_ENV`: Environment name
- `NEXT_PUBLIC_SENTRY_ENABLED`: Enable Sentry error tracking

## Best Practices

1. **Always run from root**: Never run `docker compose` from inside app directories
2. **Use profiles**: Always specify `--profile development` or `--profile production`
3. **Development first**: Test changes in development before deploying to production
4. **Check logs**: Use `docker compose logs` to debug issues
5. **Clean rebuilds**: Use `--build` flag when Dockerfile changes
6. **Environment isolation**: Keep development and production environments separate

## Profile Index

| Profile | Services | Use Case | Ports | Proxy |
|---------|----------|----------|-------|-------|
| **development** | api, codehouse, db, redis, mailpit | Local development | Direct (8080, 3001, 3306, 6379, 8025) | None |
| **production** | api, codehouse, db, redis, proxy | Live deployment | Traefik (80, 443) | Traefik |

## Quick Reference

| Task | Development Command | Production Command |
|------|---------------------|-------------------|
| Start all services | `docker compose --profile development up -d` | `docker compose --profile production up -d` |
| Stop all services | `docker compose down` | `docker compose down` |
| View logs | `docker compose logs` | `docker compose logs` |
| Rebuild all | `docker compose --profile development up --build` | `docker compose --profile production up --build` |
| Access API shell | `docker compose exec api bash` | `docker compose exec api bash` |
| Run migrations | `docker compose exec api php artisan migrate` | `docker compose exec api php artisan migrate` |
| Access database | `docker compose exec db mysql -u root -p` | `docker compose exec db mysql -u root -p` |

## References

- Main `docker-compose.yml` - Service orchestration
- `compose.override.yml.example` - Development configuration template
- `apps/*/docker-compose.yml` - Individual service configurations
- `apps/*/Dockerfile` - Container build instructions
- `apps/*/secrets/` - Secret management directories
- [Docker Compose v2 Documentation](https://docs.docker.com/compose/) - Official Docker Compose documentation