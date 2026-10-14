import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/server.ts'],
  format: ['esm'],
  dts: false,
  platform: 'node',
  unbundle: true,
  outExtensions() {
    return {
      js: '.js',
    };
  },
});
