import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/**/*.ts', '!src/**/*.test.ts'],
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
