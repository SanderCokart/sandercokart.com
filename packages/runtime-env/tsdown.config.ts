import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    index: './src/index.ts',
    'env-script': './src/env-script.tsx',
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
