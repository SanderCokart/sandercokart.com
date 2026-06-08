import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/**/*.ts', 'src/**/*.tsx', '!src/**/*.test.ts'],
  format: ['esm'],
  dts: true,
  platform: 'neutral',
  unbundle: true,
  outExtensions() {
    return {
      js: '.js',
      dts: '.d.ts',
    };
  },
});
