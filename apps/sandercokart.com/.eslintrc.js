/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/next.js'],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['postcss.config.js', 'tailwind.config.js', '*.d.ts', 'src/**/*.js'],
  parserOptions: {
    project: true,
  },
};
