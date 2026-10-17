import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/server.ts'],
  format: ['esm'],
  dts: false,
  platform: 'node',
  unbundle: false,
  deps: {
    // Inline workspace + npm deps so the Docker runner is a single JS file.
    alwaysBundle: () => true,
    onlyBundle: false,
  },
  outExtensions() {
    return {
      js: '.js',
    };
  },
});
