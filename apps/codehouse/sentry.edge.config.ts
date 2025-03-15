// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  environment: process.env.NEXT_PUBLIC_ENV,

  dsn: 'https://d6f287611c3dc58eacadf32eaabdaac4@o4506644789329920.ingest.us.sentry.io/4507957562310656',

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: process.env.NEXT_PUBLIC_ENV === 'production' ? 0.25 : 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
