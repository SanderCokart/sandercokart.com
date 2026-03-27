import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    'rate-limit': './src/rate-limit.ts',
  },
  format: ['esm'],
  dts: true,
  platform: 'node',
  unbundle: true,
  outExtensions() {
    return {
      js: '.js',
      dts: '.d.ts',
    };
  },
});
