/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/react.js'],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['postcss.config.*', 'tailwind.config.*', '*.d.ts', 'vite.config.*'],
  parserOptions: {
    project: true,
  },
};
