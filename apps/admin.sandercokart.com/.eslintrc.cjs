/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['.*.js', '.*.cjs', 'routeTree.gen.ts', '*.d.ts', 'vite.config.*'],
  parserOptions: {
    project: true,
  },
};
