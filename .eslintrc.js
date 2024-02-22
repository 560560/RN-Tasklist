module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  extends: ['airbnb', 'airbnb/hooks', 'plugin:prettier/recommended'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['react', 'jsx-a11y', 'react-hooks', 'prettier', 'simple-import-sort'],
  rules: {
    quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: false }],
    'arrow-parens': [2, 'always'],
    'arrow-body-style': [2, 'as-needed'],
    'comma-dangle': [
      2,
      {
        arrays: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
        imports: 'always-multiline',
        objects: 'always-multiline',
      },
    ],

    'simple-import-sort/imports': [1],
    'import/imports-first': 0,
    'import/newline-after-import': 0,
    'import/no-dynamic-require': 0,
    'import/no-deprecated': 0,
    'import/export': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'import/no-useless-path-segments': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/namespace': 0,
    'import/default': 0,
    'import/named': 0,
    'import/no-cycle': 0,
    'import/no-duplicates': 0,
    'import/no-self-import': 0,
    'import/prefer-default-export': 0,
    'import/order': 0,
    'react/jsx-curly-spacing': 0,
    'jsx-a11y/aria-props': 2,
    'jsx-a11y/heading-has-content': 0,
    'jsx-a11y/href-no-hash': 0,
    'jsx-a11y/label-has-for': 2,
    'jsx-a11y/mouse-events-have-key-events': 2,
    'jsx-a11y/role-has-required-aria-props': 2,
    'jsx-a11y/role-supports-aria-props': 2,
    'jsx-a11y/anchor-is-valid': 0,
    'max-len': 0,
    'newline-per-chained-call': 0,
    'no-confusing-arrow': 0,
    'no-console': 1,
    'no-use-before-define': 0,
    'prefer-template': 2,
    'class-methods-use-this': 0,
    'max-classes-per-file': 0,
    'prefer-object-spread': 0,
    'prefer-promise-reject-errors': 0,
    'no-else-return': 0,
    'prefer-destructuring': 1,
    'no-restricted-globals': 0,
    'no-restricted-exports': 0,
    'default-param-last': 0,
    'react/jsx-no-useless-fragment': 1,
    'react/no-unstable-nested-components': 1,
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/prop-types': [1, { skipUndeclared: true }],
    'react/forbid-prop-types': 0,
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/prefer-stateless-function': [
      0,
      {
        ignorePureComponents: 0,
      },
    ],
    camelcase: [
      0,
      {
        properties: 'never',
      },
    ],
    'react/sort-comp': [
      0,
      {
        order: ['static-methods', 'lifecycle', 'everything-else', 'render'],
      },
    ],
    'react/jsx-filename-extension': 0,
    'react/jsx-no-target-blank': 0,
    'react/require-extension': 0,
    'react/self-closing-comp': 0,
    'require-yield': 0,
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': [
      1,
      {
        additionalHooks: 'useRecoilCallback',
      },
    ],
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-wrap-multilines': 0,
    'react/destructuring-assignment': 0,
    'react/static-property-placement': 0,
    'react/jsx-props-no-spreading': 0,
    'react/default-props-match-prop-types': 0,
    'react/jsx-curly-brace-presence': 1,
    'react/jsx-fragments': 1,
    'react/require-default-props': 1,
    'react/no-unused-state': 1,
    'react/state-in-constructor': 0,
    'react/button-has-type': 1,
    'react/display-name': 0,
    'lines-between-class-members': [1, 'always', { exceptAfterSingleLine: true }],
    'no-underscore-dangle': 'off',
  },
};
