const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use with
 * Library packages.
 */

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    // Base
    'eslint:recommended',
    // Custom
    './typescript',
    './react',
    // Prettier and turbo should be last
    'prettier',
    'turbo',
  ],
  plugins: ['only-warn'],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: ['.*.js', 'node_modules/', 'dist/'],
  overrides: [
    {
      files: ['*.js?(x)', '*.ts?(x)'],
    },
  ],
};
