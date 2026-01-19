// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

import { env } from '@/src/env';

Sentry.init({
  enabled: env.NEXT_PUBLIC_SENTRY_ENABLED,

  environment: env.NEXT_PUBLIC_ENV,

  dsn: 'https://d6f287611c3dc58eacadf32eaabdaac4@o4506644789329920.ingest.us.sentry.io/4507957562310656',

  // Add optional integrations for additional features
  integrations: [
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
      maskAllInputs: false,
    }),
  ],

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: env.NEXT_PUBLIC_ENV === 'production' ? 0.25 : 1,

  // Define how likely Replay events are sampled.
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // Define how likely Replay events are sampled when an error occurs.
  replaysOnErrorSampleRate: 0.1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // If sendDefaultPii is true, Sentry will infer the IP address of users' devices to events
  sendDefaultPii: true,
});
