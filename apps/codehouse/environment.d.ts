declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_URL: string;
      CI: 'enabled' | 'disabled';
      HOST: string;
      NEXT_PUBLIC_SENTRY: 'enabled' | 'disabled';
      NODE_ENV: 'development' | 'production';
      PORT: string;
    }
  }
}

export {};
