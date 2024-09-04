/*
 * This is a custom ESLint configuration
 * It is meant to override react rules
 */

module.exports = {
  plugins: ['react'],
  rules: {
    'react/jsx-sort-props': [
      'warn',
      {
        callbacksLast: true,
        ignoreCase: true,
        noSortAlphabetically: false,
        reservedFirst: true,
        shorthandFirst: true,
        shorthandLast: false,
      },
    ],
    'react/self-closing-comp': [
      'warn',
      {
        component: true,
        html: true,
      },
    ],
    'react/jsx-props-no-multi-spaces': 'warn',
    'react/jsx-no-useless-fragment': 'warn',
    'react/jsx-pascal-case': 'warn',
    'react/jsx-wrap-multilines': [
      'warn',
      {
        arrow: 'parens',
        assignment: 'parens',
        condition: 'ignore',
        declaration: 'parens',
        logical: 'ignore',
        prop: 'ignore',
        return: 'parens',
      },
    ],
    'react-hooks/exhaustive-deps': 'off',
  },
};
