// API Configuration
export const API_URL = process.env.API_URL || 'http://localhost:8080';
export const PORT = process.env.PORT || 3001;
export const HOST = process.env.HOST ? `https://${process.env.HOST}` : `http://localhost:${PORT}`;

// Sentry Configuration
export const SENTRY_ENABLED = process.env.NEXT_PUBLIC_SENTRY === 'enabled' || false;
export const SENTRY_AUTH_TOKEN = process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN || undefined;

// CI Configuration
export const CI_ENABLED = process.env.CI === 'enabled' || false;

// Next.js Configuration
export const NEXT_OUTPUT = process.env.NEXT_OUTPUT || undefined;

// Node Configuration
export const NODE_ENV = process.env.NODE_ENV;
