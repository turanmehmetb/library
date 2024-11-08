import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { rules: {
    'spaced-comment': ['error', 'always'],
    'semi': ['error', 'always'],
    'semi-spacing': 'error',
    'no-extra-semi': 'error',
    'no-unexpected-multiline': 'error',
    'comma-style': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'indent': ['error', 2, { 'ignoredNodes': ['PropertyDefinition'] }],
    'space-infix-ops': 'error',
    'space-before-blocks': 'error',
    'brace-style': ['error', 'stroustrup', { 'allowSingleLine': true }],
    'arrow-spacing': 'error',
    'space-before-function-paren': [
      'error',
      {
        'anonymous': 'never',
        'named': 'never',
        'asyncArrow': 'always',
      },
    ],
    'newline-per-chained-call': 'error',
    'space-in-parens': 'error',
    'array-bracket-spacing': 'error',
    'object-curly-spacing': ['error', 'always'],
    'comma-spacing': 'error',
    'block-spacing': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'no-new-object': 'error',
    'no-new-func': 'error',
    'prefer-object-spread': 'error',
    'no-array-constructor': 'error',
    'array-callback-return': 'error',
    'quotes': ['error', 'single'],
    'prefer-template': 'error',
    'template-curly-spacing': 'error',
    'prefer-spread': 'error',
    'no-duplicate-imports': 'error',
    'no-import-assign': 'error',
    'operator-linebreak': 'error',
    'eqeqeq': 'error',
    'no-nested-ternary': 'error',
    'no-unneeded-ternary': 'error',
    'no-case-declarations': 'error',
    'no-mixed-operators': 'error',
    'no-else-return': 'error',
    'no-whitespace-before-property': 'error',
    'key-spacing': 'error',
    'func-call-spacing': 'error',
    'no-new-wrappers': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { 'args': 'none' }],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    '@nx/enforce-module-boundaries': 'off',
  } },
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];